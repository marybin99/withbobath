import type { NextApiRequest, NextApiResponse } from "next";
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import type { NoticeData } from "@/data/notice";

interface QnaRow {
  id: number;
  title: string;
  author: string;
  created_at: string;
  is_private: boolean;
  content?: string;
  password_hash?: string | null;
  pin_failures?: number;
  pin_locked_until?: string | null;
}

const toPost = (row: QnaRow, unlocked = false): NoticeData => ({
  id: row.id,
  title: row.title,
  author: row.author,
  content: !row.is_private || unlocked ? row.content ?? "" : "",
  isPrivate: row.is_private,
  date: new Date(row.created_at).toLocaleDateString("sv-SE", {
    timeZone: "Asia/Seoul",
  }),
});

const validId = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value > 0;

const validText = (value: unknown, maxLength: number): value is string =>
  typeof value === "string" && value.trim().length > 0 && value.trim().length <= maxLength;

const EDIT_TOKEN_LIFETIME_MS = 60 * 60 * 1000;

const createEditToken = (id: number, secret: string) => {
  const payload = `${id}.${Date.now() + EDIT_TOKEN_LIFETIME_MS}`;
  const signature = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${signature}`;
};

const hasValidEditToken = (token: unknown, id: number, secret: string) => {
  if (typeof token !== "string") return false;
  const match = /^(\d+)\.(\d+)\.([a-f0-9]{64})$/.exec(token);
  if (!match || Number(match[1]) !== id || Number(match[2]) <= Date.now()) return false;
  const signature = createHmac("sha256", secret)
    .update(`${match[1]}.${match[2]}`)
    .digest();
  return timingSafeEqual(signature, Buffer.from(match[3], "hex"));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET" && req.method !== "POST" && req.method !== "PATCH") {
    res.setHeader("Allow", "GET, POST, PATCH");
    return res.status(405).json({ error: "지원하지 않는 요청입니다." });
  }

  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) {
    return res.status(503).json({ error: "질문 게시판이 아직 설정되지 않았습니다." });
  }

  const endpoint = `${url.replace(/\/$/, "")}/rest/v1/qna_posts`;
  const headers = { apikey: secretKey, "Content-Type": "application/json" };

  const readRows = async (select: string, id?: number): Promise<QnaRow[]> => {
    const params = new URLSearchParams({ select });
    if (id) {
      params.set("id", `eq.${id}`);
      params.set("limit", "1");
    } else {
      params.set("order", "created_at.desc,id.desc");
    }
    const response = await fetch(`${endpoint}?${params}`, { headers });
    if (!response.ok) throw new Error("Database read failed");
    return response.json();
  };

  const updateRow = async (id: number, values: Record<string, unknown>) => {
    const response = await fetch(`${endpoint}?id=eq.${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(values),
    });
    if (!response.ok) throw new Error("Database update failed");
  };

  const getProtectedRow = async (id: number) => {
    const rows = await readRows(
      "id,title,author,content,created_at,is_private,password_hash,pin_failures,pin_locked_until",
      id
    );
    return rows[0];
  };

  const verifyPin = async (row: QnaRow, pin: string) => {
    if (row.pin_locked_until && Date.parse(row.pin_locked_until) > Date.now()) {
      return "locked" as const;
    }

    const [salt, storedHex] = (row.password_hash ?? "").split(":");
    const stored = Buffer.from(storedHex ?? "", "hex");
    const entered = salt ? scryptSync(pin, salt, 64) : Buffer.alloc(0);
    const matched = stored.length === 64 && timingSafeEqual(entered, stored);

    if (!matched) {
      const failures = (row.pin_failures ?? 0) + 1;
      await updateRow(row.id, {
        pin_failures: failures >= 5 ? 0 : failures,
        pin_locked_until:
          failures >= 5 ? new Date(Date.now() + 15 * 60 * 1000).toISOString() : null,
      });
      return "invalid" as const;
    }

    if (row.pin_failures || row.pin_locked_until) {
      await updateRow(row.id, { pin_failures: 0, pin_locked_until: null });
    }
    return "valid" as const;
  };

  try {
    if (req.method === "GET") {
      const { id } = req.query;
      if (id === undefined) {
        const rows = await readRows("id,title,author,created_at,is_private");
        return res.status(200).json(rows.map((row) => ({ ...toPost(row), content: "" })));
      }
      if (typeof id !== "string" || !/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
        return res.status(400).json({ error: "올바르지 않은 질문 번호입니다." });
      }
      const rows = await readRows("id,title,author,content,created_at,is_private", Number(id));
      return rows.length
        ? res.status(200).json(toPost(rows[0]))
        : res.status(404).json({ error: "해당 질문을 찾을 수 없습니다." });
    }

    const body = req.body;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({ error: "입력 내용을 확인해 주세요." });
    }

    if (req.method === "POST" && body.action === "unlock") {
      if (!validId(body.id)) return res.status(400).json({ error: "올바르지 않은 질문 번호입니다." });
      const row = await getProtectedRow(body.id);
      if (!row) return res.status(404).json({ error: "해당 질문을 찾을 수 없습니다." });
      if (!row.is_private) return res.status(400).json({ error: "비밀글이 아닙니다." });

      if (hasValidEditToken(body.editToken, row.id, secretKey)) {
        return res.status(200).json(toPost(row, true));
      }
      if (body.editToken !== undefined && body.password === undefined) {
        return res.status(401).json({ error: "인증 시간이 만료되었습니다. 비밀번호를 다시 입력해 주세요." });
      }
      if (typeof body.password !== "string" || !/^\d{4}$/.test(body.password)) {
        return res.status(400).json({ error: "비밀번호는 숫자 4자리로 입력해 주세요." });
      }
      const result = await verifyPin(row, body.password);
      if (result === "locked") return res.status(429).json({ error: "비밀번호 입력 횟수를 초과했습니다. 15분 후 다시 시도해 주세요." });
      if (result === "invalid") return res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
      return res.status(200).json({ ...toPost(row, true), editToken: createEditToken(row.id, secretKey) });
    }

    if (req.method === "PATCH") {
      if (
        !validId(body.id) ||
        !validText(body.title, 120) ||
        !validText(body.content, 5000)
      ) {
        return res.status(400).json({ error: "입력 내용을 확인해 주세요." });
      }
      const row = await getProtectedRow(body.id);
      if (!row) return res.status(404).json({ error: "해당 질문을 찾을 수 없습니다." });
      if (!row.is_private) return res.status(403).json({ error: "이 질문은 수정할 수 없습니다." });

      if (!hasValidEditToken(body.editToken, row.id, secretKey)) {
        if (body.editToken !== undefined && body.password === undefined) {
          return res.status(401).json({ error: "인증 시간이 만료되었습니다. 비밀번호를 다시 입력해 주세요." });
        }
        if (typeof body.password !== "string" || !/^\d{4}$/.test(body.password)) {
          return res.status(400).json({ error: "비밀번호는 숫자 4자리로 입력해 주세요." });
        }
        const result = await verifyPin(row, body.password);
        if (result === "locked") return res.status(429).json({ error: "비밀번호 입력 횟수를 초과했습니다. 15분 후 다시 시도해 주세요." });
        if (result === "invalid") return res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
      }

      await updateRow(row.id, { title: body.title.trim(), content: body.content.trim() });
      return res.status(200).json({ id: row.id });
    }

    if (
      !validText(body.title, 120) ||
      !validText(body.author, 30) ||
      !validText(body.content, 5000) ||
      typeof body.isPrivate !== "boolean" ||
      (body.isPrivate && (typeof body.password !== "string" || !/^\d{4}$/.test(body.password)))
    ) {
      return res.status(400).json({ error: "입력 내용과 글자 수를 확인해 주세요." });
    }

    let passwordHash: string | null = null;
    if (body.isPrivate) {
      const salt = randomBytes(16).toString("hex");
      passwordHash = `${salt}:${scryptSync(body.password, salt, 64).toString("hex")}`;
    }

    const response = await fetch(`${endpoint}?select=id`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=representation" },
      body: JSON.stringify({
        title: body.title.trim(),
        author: body.author.trim(),
        content: body.content.trim(),
        is_private: body.isPrivate,
        password_hash: passwordHash,
      }),
    });
    if (!response.ok) throw new Error("Database insert failed");

    const rows = (await response.json()) as Pick<QnaRow, "id">[];
    if (!rows.length) throw new Error("Missing inserted row");
    return res.status(201).json({ id: rows[0].id });
  } catch {
    return res.status(502).json({ error: "연결에 문제가 생겼습니다. 다시 시도해 주세요." });
  }
}

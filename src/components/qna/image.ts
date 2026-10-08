export const MAX_QNA_IMAGE_BYTES = 3 * 1024 * 1024;
export const QNA_IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/gif";
export const QNA_IMAGE_ERROR =
  "이미지는 JPG, PNG, WebP, GIF 파일만 첨부할 수 있으며 3MB 이하여야 합니다.";

export const isValidQnaImage = (file: File) =>
  ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) &&
  file.size > 0 &&
  file.size <= MAX_QNA_IMAGE_BYTES;

export const readQnaImage = (file: File) =>
  new Promise<{ contentType: string; base64: string }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("이미지를 읽지 못했습니다."));
        return;
      }
      resolve({ contentType: file.type, base64: result.slice(result.indexOf(",") + 1) });
    };
    reader.onerror = () => reject(new Error("이미지를 읽지 못했습니다."));
    reader.readAsDataURL(file);
  });

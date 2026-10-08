alter table public.qna_posts
  add column if not exists is_private boolean not null default false,
  add column if not exists pin_failures integer not null default 0,
  add column if not exists pin_locked_until timestamptz;

-- 기존 글은 모두 비밀번호를 입력해 작성했으므로 비밀글로 전환합니다.
update public.qna_posts
set is_private = true
where password_hash is not null;

alter table public.qna_posts
  alter column password_hash drop not null;

alter table public.qna_posts
  add constraint qna_posts_private_password_check
  check (is_private = (password_hash is not null));

grant update on public.qna_posts to service_role;

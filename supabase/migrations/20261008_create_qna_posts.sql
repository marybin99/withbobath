create table if not exists public.qna_posts (
  id bigint generated always as identity primary key,
  title text not null check (char_length(title) between 1 and 120),
  author text not null check (char_length(author) between 1 and 30),
  content text not null check (char_length(content) between 1 and 5000),
  password_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists qna_posts_created_at_idx
  on public.qna_posts (created_at desc, id desc);

alter table public.qna_posts enable row level security;
revoke all on public.qna_posts from anon, authenticated;
grant select, insert on public.qna_posts to service_role;
grant usage, select on sequence public.qna_posts_id_seq to service_role;

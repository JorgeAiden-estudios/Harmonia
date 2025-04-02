create table public.liked_songs (
  user_id uuid not null,
  created_at timestamp with time zone not null default now(),
  song_id bigint not null,
  constraint liked_songs_pkey primary key (user_id, song_id),
  constraint liked_songs_song_id_fkey foreign KEY (song_id) references songs (id) on update CASCADE on delete CASCADE,
  constraint liked_songs_user_id_fkey foreign KEY (user_id) references users (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;

create policy "Enable read access for all users"

on "public"."liked_songs"
as PERMISSIVE
for SELECT
to public
using (
    true
);

create policy "Enable insert for authenticated users only"
on "public"."liked_songs"
as PERMISSIVE
for INSERT
to authenticated
with check (
    true
);

create policy "Enable delete for users based on user_id"
on "public"."liked_songs"
as PERMISSIVE
for DELETE
to public
using (
    true
);
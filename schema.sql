-- Allow anyone (anon) to delete profiles for demo/testing
drop policy if exists "Anyone can delete" on public.profiles;
create policy "Anyone can delete"
on public.profiles for delete
to anon
using ( true );

-- Allow anyone (anon) to insert profiles for demo/testing
drop policy if exists "Anyone can insert" on public.profiles;
create policy "Anyone can insert"
on public.profiles for insert
to anon
with check ( true );
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  headline text,
  bio text,
  github_url text,
  linkedin_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
create policy "Public profiles are viewable by everyone"
on public.profiles for select
to authenticated, anon
using ( true );

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles for insert
to authenticated
with check ( true );

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using ( true );
-- Create the profiles table
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  headline text,
  bio text,
  github_url text,
  linkedin_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
-- Enable RLS
alter table public.profiles enable row level security;

-- Create a policy that allows anyone to read profiles
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
create policy "Public profiles are viewable by everyone"
on public.profiles for select
to authenticated, anon
using ( true );

-- Create a policy that allows only authenticated users to insert/update their own profile
-- Note: This is a simplified policy for the "Gold Master" demo. 
-- In a real app, you'd likely link 'id' to auth.users.id
drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles for insert
to authenticated
with check ( true );

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using ( true );


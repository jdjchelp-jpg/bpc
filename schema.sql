-- Create the countdowns table
create table countdowns (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  target_date timestamp with time zone not null,
  theme text default 'default',
  country text,
  is_public boolean default true
);

-- Enable Row Level Security (RLS)
alter table countdowns enable row level security;

-- Create a policy that allows anyone to read public countdowns
create policy "Public countdowns are viewable by everyone"
  on countdowns for select
  using ( is_public = true );

-- Create a policy that allows anyone to insert (for demo purposes)
-- In a real app, you'd want to restrict this to authenticated users
create policy "Anyone can create countdowns"
  on countdowns for insert
  with check ( true );

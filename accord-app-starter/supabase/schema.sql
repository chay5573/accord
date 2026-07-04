-- Accord MVP schema draft. Designed for standard Postgres portability.

create table if not exists brokerages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists teams (
  id uuid primary key default gen_random_uuid(),
  brokerage_id uuid references brokerages(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists user_profiles (
  id uuid primary key,
  brokerage_id uuid references brokerages(id),
  team_id uuid references teams(id),
  display_name text,
  email text not null,
  license_number text,
  created_at timestamptz not null default now()
);

create table if not exists office_profiles (
  id uuid primary key default gen_random_uuid(),
  brokerage_id uuid references brokerages(id),
  team_id uuid references teams(id),
  owner_user_id uuid references user_profiles(id),
  state_code text not null default 'UT',
  contract_defaults jsonb not null default '{}',
  preferred_vendors jsonb not null default '{}',
  required_forms jsonb not null default '[]',
  office_playbook jsonb not null default '[]',
  folder_structure jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  brokerage_id uuid references brokerages(id),
  team_id uuid references teams(id),
  owner_user_id uuid references user_profiles(id) not null,
  office_profile_id uuid references office_profiles(id),
  transaction_type text not null,
  status text not null default 'draft',
  property_address text,
  buyer_names text[] not null default '{}',
  seller_name text,
  representation text,
  deal_terms jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid references transactions(id) on delete cascade,
  transcript text,
  recording_storage_path text,
  consent_confirmed boolean not null default false,
  consent_note text,
  created_by uuid references user_profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists form_templates (
  id uuid primary key default gen_random_uuid(),
  state_code text not null,
  form_code text not null,
  name text not null,
  version text not null,
  source text not null default 'accord_library',
  template_storage_path text,
  field_map jsonb not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(state_code, form_code, version)
);

create table if not exists contract_packages (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid references transactions(id) on delete cascade,
  status text not null default 'draft',
  form_template_ids uuid[] not null default '{}',
  package_storage_path text,
  approved_by uuid references user_profiles(id),
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists audit_events (
  id uuid primary key default gen_random_uuid(),
  brokerage_id uuid references brokerages(id),
  team_id uuid references teams(id),
  transaction_id uuid references transactions(id),
  actor_user_id uuid references user_profiles(id),
  event_type text not null,
  event_summary text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists retention_policies (
  id uuid primary key default gen_random_uuid(),
  brokerage_id uuid references brokerages(id),
  team_id uuid references teams(id),
  recording_retention text not null default 'delete_after_transcription',
  transcript_retention text not null default 'keep_with_transaction_file',
  transaction_file_retention text not null default 'archive_indefinitely',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

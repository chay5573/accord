# Accord Database

## Approach

Use standard PostgreSQL in Supabase for the MVP. The schema is the durable record of business state; provider-specific auth and storage identifiers are integrations. Migrations must be versioned, reviewed, reversible where practical, and tested against tenant isolation.

The current `supabase/schema.sql` is a useful draft, not a production-ready model.

## Core model

- `organizations`: brokerage accounts and policy boundary.
- `teams`: optional subdivisions of an organization.
- `users` / `profiles`: normalized application identity linked to the auth provider.
- `memberships`: user-to-organization/team roles with lifecycle and invitation state.
- `office_profiles`: scoped defaults, vendors, required forms, and playbook versions.
- `transactions`: canonical deal container, owner, organization scope, type, and lifecycle.
- `transaction_parties`: normalized people/entities and their deal roles.
- `transaction_terms`: validated structured terms with provenance and review state.
- `conversations`: consent reference, transcript/recording metadata, and processing state.
- `consent_records`: disclosure, participants, confirmation method, confirmer, and time.
- `documents`: logical file identity, classification, storage version, and lifecycle.
- `form_templates` / `form_template_versions`: form metadata, licensing, effective dates, and immutable versions.
- `form_field_mappings`: versioned mapping from canonical data to template fields.
- `contract_packages` / `package_versions`: selected forms, generated artifacts, and status.
- `approvals`: immutable approval snapshots and invalidation reason.
- `audit_events`: append-only security and workflow history.
- `retention_policies` / `legal_holds`: lifecycle rules and deletion exceptions.
- `external_connections` / `sync_items`: OneDrive authorization metadata and sync state.

## Tenancy

Every tenant-owned row should carry an organization boundary directly or through a reliably enforced parent. Agent-only accounts still receive an account/tenant boundary rather than relying on null organization fields. Team scope narrows visibility but does not replace the organization boundary.

Apply row-level security to all exposed tables and test attempts to read, mutate, reference, or infer another tenant’s rows. Service-role access is reserved for narrowly scoped server jobs.

## Data integrity

- Use enums or constrained lookup values for lifecycle states.
- Add foreign keys, uniqueness rules, and check constraints.
- Store money as integer minor units plus currency, not floating point.
- Store timestamps in UTC and retain the transaction’s relevant local timezone.
- Keep mutable current state separate from immutable versions and approvals.
- Use JSONB for genuinely variable policy or provider metadata, not as a shortcut around modeling queryable fields.
- Use optimistic concurrency/version columns for material edits.

## Provenance

Each extracted term should retain source type, source ID, excerpt/location where permitted, model/run ID, confidence, authoring user, and review state. Approved values must point to an immutable snapshot so later edits cannot rewrite history.

## Audit design

Audit events are append-only and include actor, effective tenant, transaction, action, target, correlation ID, timestamp, and safe metadata. Avoid storing document bodies, transcripts, credentials, or sensitive raw values in audit metadata.

## Migration notes from the starter draft

Before production, add memberships, explicit account boundaries for solo agents, consent records, document/version tables, approval snapshots, normalized parties/terms, sync state, indexes, RLS policies, and updated-at behavior. Replace UUID arrays such as `form_template_ids` with relational join tables to preserve order, version, and referential integrity.

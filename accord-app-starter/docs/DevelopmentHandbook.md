# Accord Development Handbook

## Working agreement

Build Accord in small, reviewable slices that preserve trust. Product, design, engineering, compliance, and form operations share responsibility for legally consequential workflows.

## Local setup

The starter uses Next.js, React, TypeScript, Zod, and Supabase.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Use supported runtime versions documented in the repository once pinned. Never commit `.env.local`, service-role keys, customer records, real transcripts, or licensed forms without approved repository handling.

## Project boundaries

- `app/`: routes and server/UI composition.
- `components/`: reusable presentation components.
- `lib/services/`: application use cases and policy orchestration.
- `lib/providers.ts`: provider-neutral contracts; split by domain as they grow.
- `lib/schema.ts`: canonical validation types; evolve through versioned migrations.
- `supabase/`: database migrations, policies, and local setup.
- `docs/`: product and engineering source of truth.

Keep provider SDKs in adapters. UI code calls application services or server endpoints. Keep privileged access, AI, transcription, and document generation off the client.

## Change workflow

1. Start from a documented user outcome and acceptance criteria.
2. Identify tenancy, authorization, privacy, audit, and failure implications.
3. Update decisions/schema/docs when behavior or contracts change.
4. Implement the smallest vertical slice.
5. Add automated tests and representative fixtures.
6. Review accessibility, copy, empty/error states, and observability.
7. Verify with synthetic data and complete the pull-request checklist.

## Engineering standards

- Use strict TypeScript and runtime validation at trust boundaries.
- Pin dependencies and commit the lockfile before production work.
- Prefer domain names over vendor names in application interfaces.
- Make material workflows idempotent and safe to retry.
- Use UTC timestamps, explicit timezones, integer money values, and immutable versions.
- Return safe user errors; retain correlation IDs for support.
- Do not log secrets, transcripts, document bodies, or sensitive field values.

## Testing expectations

- Unit tests for domain rules, schemas, formatting, and approval invalidation.
- Integration tests for services, provider adapters, migrations, and row-level security.
- End-to-end tests for consent, extraction review, approval, generation, permissions, retention, and Settings workflows.
- Form fixture and rendered visual tests for every active template version.
- AI evaluations for every model, prompt, schema, or extraction-rule change.
- Accessibility checks plus keyboard and screen-reader spot testing.

## Definition of done

A change is complete when behavior and failure states are implemented; authorization and tenant isolation are tested; audit and privacy effects are addressed; accessible UX and copy are reviewed; documentation and migrations are current; telemetry is safe; and rollback/recovery is understood.

For contract-affecting changes, also require form-version traceability, representative rendering QA, and product/compliance sign-off.

## Environments and releases

Use separate local, preview, staging, and production projects with no shared credentials or customer data. Apply migrations through automation, run checks before promotion, and deploy risky workflow changes behind flags. Document rollback steps and never roll back a database by deleting customer state.

## Security response

Report suspected exposure immediately through the designated private channel. Preserve evidence, rotate affected credentials, limit further access, and follow the incident plan. Do not paste customer content or secrets into public issues or chat tools.

## Documentation ownership

Documentation changes with the product. `Decisions.md` records durable choices; specialized docs describe current intent. When code and docs disagree, resolve the discrepancy in the same change rather than treating documentation as historical commentary.

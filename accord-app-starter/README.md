# Accord App Starter

This is the first scalable web-app scaffold for Accord, a transaction intelligence platform for premium real estate professionals.

## Start Here

Before making any change, read [`AGENTS.md`](./AGENTS.md). It defines the required startup sequence, architecture boundaries, AI rules, security expectations, and task-completion requirements for developers and AI assistants.

The [`docs`](./docs) folder is the project source of truth. Begin with:

1. [`docs/ProductPhilosophy.md`](./docs/ProductPhilosophy.md), Accord's product North Star.
2. [`docs/IdealUserJourney.md`](./docs/IdealUserJourney.md), the intended Capture → Prepare → Manage workflow.
3. [`docs/Sprint.md`](./docs/Sprint.md) for current scope and phase.
4. [`docs/ProductBacklog.md`](./docs/ProductBacklog.md) for friction-prioritized work.
5. [`docs/CODEX_ROLE.md`](./docs/CODEX_ROLE.md) for AI engineering responsibilities.
6. The relevant architecture, compliance, AI, forms, UX, brand, and development documents before changing those domains.

Future features must be evaluated against the Product Philosophy's friction budget: at most five manual decisions, 15–20 clicks, three minutes after the conversation, typing near zero, and 90%+ information inferred.

## Current Status

Accord is at the **mock-data MVP foundation** stage. The project governance foundation is complete, and the mock-data MVP spine is the next eligible phase. No real AI, storage, authentication, OneDrive, transcription, or PDF integration should be added unless explicitly requested.

The active mock direction is opportunity-first: Start Listening, Quick Capture, AI Inbox, Drafts, then Deal Desk. External activity remains a signal until agent review.

## Stack Direction
- Next.js + React
- Supabase MVP for auth, Postgres, and storage
- Architecture intentionally portable to AWS/custom later
- Accord Cloud storage first, optional OneDrive sync later
- AI layer and PDF/form engine separated from UI

## Included MVP Screens
- Deal Desk dashboard
- Office Profile onboarding
- New Transaction flow
- Transaction workspace with transcript intake, extraction review, recommended forms, and approval workflow
- Contract Library settings
- Privacy & Compliance settings
- Quick Capture recovery and opportunity review
- AI Timeline and Activity Inbox
- E-Signature and Inbox Integrations settings mocks

## Portable Architecture
See `docs/Architecture.md`.

Core rule: UI calls Accord services/API routes, not Supabase business logic directly. Supabase is the first provider implementation, not the permanent architecture.

Provider abstraction is mandatory. UI and domain logic must not be tightly coupled to Supabase, OneDrive, AI, transcription, or PDF vendors. Business logic belongs in Accord services/domain layers, with provider-specific behavior isolated in adapters.

Provider contracts live in:
- `lib/providers.ts`
- `lib/services/transactionService.ts`
- `lib/supabaseClient.ts`

Database draft:
- `supabase/schema.sql`

## Compliance Principles Built Into Product
- Recording consent gate before audio capture
- Role-based access model
- Agent approval before contract generation
- Audit trail for AI suggestions and edits
- Retention settings for recordings/transcripts
- Sensitive-document handling planned

## Run Locally
```bash
npm install
cp .env.example .env.local
npm run dev
```

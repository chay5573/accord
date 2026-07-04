# Accord App Starter

This is the first scalable web-app scaffold for Accord, a transaction intelligence platform for premium real estate professionals.

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

## Portable Architecture
See `docs/Architecture.md`.

Core rule: UI calls Accord services/API routes, not Supabase business logic directly. Supabase is the first provider implementation, not the permanent architecture.

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

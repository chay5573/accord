# Accord Architecture

## Architectural direction

Accord is a web-first modular monolith for the MVP. Next.js supplies the application surface, while server-side application services own business workflows. Supabase is the first infrastructure implementation, not the domain architecture.

```text
Web UI
  -> server actions / API routes
    -> application services and policy checks
      -> domain models and provider interfaces
        -> Supabase Auth, Postgres, Storage
        -> AI, transcription, and PDF providers
        -> optional OneDrive sync adapter
```

## Dependency rules

- UI components do not contain authorization, approval, form-selection, or retention policy logic.
- UI code does not call provider SDKs for business operations.
- Application services orchestrate use cases, authorization, validation, and audit events.
- Domain types remain provider-neutral.
- Provider adapters translate between Accord contracts and external services.
- Secrets, AI calls, privileged database access, and document generation stay server-side.

The existing `lib/providers.ts` and `lib/services/transactionService.ts` point in this direction. Direct use of `lib/supabaseClient.ts` should remain an infrastructure concern as the application grows.

## MVP components

- Next.js and React web application.
- Supabase Auth with normalized Accord identities and roles.
- Standard Postgres schema in Supabase.
- Supabase Storage behind an Accord storage interface.
- AI extraction and recommendation adapters.
- Versioned form mapping and PDF generation engine.
- Append-only audit event service.
- Background job boundary for transcription, document generation, and sync.
- Provider-neutral Transaction Memory boundary for separately authorized, redacted learning cases.
- Provider-neutral e-signature boundary for approved package handoff, verified events, completed-document import, and final review.
- Client-education policy boundary that limits future answers to explicitly approved client-visible sources.

## Tenancy and authorization

The tenancy hierarchy is brokerage -> team -> user, while transactions have explicit ownership and scoped collaborators. Agent-only accounts may have no brokerage or team. Authorization must evaluate user, membership, role, resource scope, and action; role names alone are insufficient.

Use database row-level security as defense in depth for the MVP. Keep the policy model expressible in application code so it can move to another Postgres host or service architecture.

## Storage and synchronization

Accord Cloud is canonical. Store object metadata and logical document identity in Postgres; keep binary content behind `StorageProvider`. OneDrive is an optional outbound/bidirectional adapter with explicit connection, folder mapping, sync status, retries, and conflict handling. It must not silently overwrite the Accord version.

## Portability guardrails

- Prefer standard SQL and Postgres capabilities.
- Do not place core business rules solely in Supabase triggers or edge functions.
- Keep auth claims normalized to Accord roles and memberships.
- Give stored objects stable logical IDs rather than exposing provider paths as identity.
- Wrap AI, storage, transcription, PDF, email, and sync vendors.
- Wrap verified fact sources—including county, assessor, MLS, listing, brokerage-record, and uploaded-file search—behind `VerifiedLookupProvider`.
- Export tenant data and audit history in documented formats.

## Observability and reliability

Every request and background job should carry a correlation ID. Capture structured logs, job state, provider latency, errors, and audit-relevant outcomes without logging contract contents or secrets. Generation and sync operations must be idempotent and retry-safe.

## Delivery posture

Start as a modular monolith. Split services only when security, load, deployment cadence, or ownership creates a demonstrated need. Portability does not require premature microservices.

## Verified lookup boundary

Verified Lookup is a future application service, not a UI-side web request. The service receives a user-approved, transaction-scoped lookup request and calls a provider adapter. Results return field path, value, source type/name/reference, retrieval time, and confidence. Application services enforce authorization, approval policy, data minimization, provenance, and audit events before a result can enter review. MVP screens use suggestions and synthetic results only; no live external system is connected.

## Transaction Memory boundary

`TransactionMemoryProvider` separates case listing/import, analysis, redaction, training approval/removal, field provenance, document comparison, and office-pattern summaries from infrastructure. Application services—not UI or provider adapters—enforce tenant ownership, authority, consent, retention, redaction, audit, and approval gates.

The provider contract supports future `listTrainingCases()`, `importTransactionCase()`, `analyzeTransactionCase()`, `redactTransactionCase()`, `approveForTraining()`, `removeFromTraining()`, `getFieldProvenance()`, `compareDocumentVersions()`, `buildOfficePatternSummary()`, `listSensitiveDataFindings()`, and `getTrainingAuditTrail()` operations. These methods define capability boundaries only; the MVP has no implementation.

The transaction archive and Training Library are separate stores/logical domains. Archive objects do not become retrievable learning material by default. Training representations reference immutable source/version identities while keeping raw restricted artifacts behind narrower permissions. No provider implementation exists in the MVP.

## E-signature boundary

`ESignatureProvider` normalizes DocuSign, Dotloop, future providers, and a possible Accord Sign. It supports `listProviders()`, `getProviderConnectionStatus()`, `connectProvider()`, `disconnectProvider()`, `createSignaturePacket()`, `openProviderReview()`, `sendSignaturePacket()`, `getSignatureStatus()`, `handleSignatureWebhook()`, `importCompletedDocuments()`, `voidSignaturePacket()`, and `getAuditTrail()`.

Application services enforce current package approval, tenant authorization, preferred-provider policy, idempotency, final review, and external-sharing gates. OAuth and provider credentials remain server-side. Webhook handlers verify authenticity and normalize provider events before state changes. UI components use domain statuses and never provider SDKs. The MVP exposes synthetic connection and packet states only.

## Client education boundary

`ClientEducationProvider` is a future policy-controlled retrieval boundary. Operations include `listClientVisibleDocuments()`, `askClientQuestion()`, `getEducationRecommendations()`, `listEducationContent()`, `logClientQuestion()`, `approveClientVisibleDocument()`, and `revokeClientPortalAccess()`.

An application policy service filters client-visible documents and approved Education Library material before retrieval. Client questions and answers cannot mutate transaction, contract, or signature state. No client authentication or AI implementation exists in the MVP.

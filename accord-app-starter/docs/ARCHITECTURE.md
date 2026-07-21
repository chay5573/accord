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

Activity synchronization extends the same interface with `listSignaturePackets()`, `syncSignatureEvents()`, `classifySignatureSignal()`, and `linkSignaturePacketToOpportunity()`. Provider events become attributable opportunity signals and AI Timeline events; they do not become contract facts. Completed packets create final-review tasks before external sharing.

## Review package boundary

Review & Send consumes a normalized review model. `ReviewPackage`, `ReviewDocument`, `FormSchema`, `FormSection`, `FormFieldDefinition`, `GeneratedFormField`, `FieldSelection`, `AddendumProvision`, `FieldSourceReference`, `FieldReviewStatus`, and `PackageReadiness` feed Needs Attention, All Fields Review, editable Paperwork, generated-document requests, and transcript/source links from the same underlying records. UI components must not keep independent duplicate values for the same form field or provision.

Review interaction adds provider-neutral `PackageStatus`, `FieldApproval`, `FieldRevision`, and `ReviewNavigationState` concepts. Package statuses are mutually exclusive: `needs_attention`, `ready_to_approve`, `ready_to_send`, `draft_saved`, and `sent_for_signatures`. Field review states are `missing`, `conflicting`, `needs_approval`, `approved`, `edited_and_approved`, `rejected`, and `optional_review`. A field edit invalidates its prior approved state; Save & Approve records both the revision and the new approval snapshot.

Needs Attention, All Fields Review, Paperwork, readiness calculations, and future generation requests resolve the same item identity. Runtime editor drafts are separate from persisted review status so typing cannot silently approve, re-sort, or remove a queue item. Approval commits the new value, revision, approval event, and status together. Navigation state may retain the package, originating surface, review item, document, page, source segment, and prior scroll position, but it does not duplicate contract values. Document anchors must be stable unique IDs derived from package, document, page, section, and field identities.

Every generated document field must map to an official form field, option, checkbox, signature assignment, or provision before production. Representative mock schemas are acceptable during prototyping only when the UI visibly states that official licensed form ingestion, versioning, validation, and mapping remain incomplete.

## Uploaded paperwork review boundary

`DocumentReviewProvider` separates confidential file intake and document analysis from Review & Send UI. Its provider-neutral operations include `uploadDocuments()`, `startDocumentReview()`, `compareAgainstTransaction()`, `listIssues()`, `resolveIssue()`, `prepareCorrection()`, and `getDocumentLocation()`.

The normalized model uses `UploadedPaperworkPackage`, `UploadedDocument`, `DocumentReviewJob`, `DocumentReviewIssue`, `DocumentIssueSeverity`, `DocumentFieldComparison`, and stable document locations. Application services must enforce tenant authorization, file safety, retention, audit, approved-transaction comparison scope, and human decisions. Provider output is a review suggestion and cannot alter an uploaded file, approved transaction fact, contract field, or document package silently. The current implementation is synthetic UI state only; no file is uploaded, parsed, stored, or analyzed by a provider.

Production comparison depends on official, authorized, versioned form schemas with complete coordinate and option mapping. A provider may identify likely discrepancies, but Accord must not claim legal-form completeness or compliance based on representative mock schemas or model output alone.

## Opportunity and inbox boundaries

`Opportunity` is the pre-transaction work container. It can begin from a conversation, recap, transcript, document, inbox signal, e-signature event, calendar event, CRM event, or reconstructed memory. It preserves capture inputs, signals, missing facts, reconstruction, draft readiness, and timeline events without requiring a transaction ID. Deal Desk becomes the canonical tracking layer after drafting or explicit save.

`InboxProvider` normalizes Gmail, Outlook/Microsoft 365, and any approved IMAP fallback. It supports `listProviders()`, `getConnectionStatus()`, `connectInbox()`, `disconnectInbox()`, `listMonitoredFolders()`, `updateMonitoredFolders()`, `searchMessages()`, `getMessage()`, `listAttachments()`, `importAttachment()`, `classifyMessageSignal()`, `linkMessageToOpportunity()`, and `getInboxAuditTrail()`.

Inbox adapters never write contract fields. Application services enforce OAuth scope, mailbox selection, tenant authorization, retention, audit, classification, opportunity matching, and human approval before evidence promotion. MVP fixtures perform no mailbox or provider calls.

## Client education boundary

`ClientEducationProvider` is a future policy-controlled retrieval boundary. Operations include `listClientVisibleDocuments()`, `askClientQuestion()`, `getEducationRecommendations()`, `listEducationContent()`, `logClientQuestion()`, `approveClientVisibleDocument()`, and `revokeClientPortalAccess()`.

An application policy service filters client-visible documents and approved Education Library material before retrieval. Client questions and answers cannot mutate transaction, contract, or signature state. No client authentication or AI implementation exists in the MVP.

Accord Guide expands this boundary with `getContentForTransactionStage()`, `getInlineContractExplanation()`, `answerClientQuestion()`, `getPersonalizedAnswer()`, `recommendVideos()`, `queueAnswerForAgentReview()`, `approveClientVisibleFact()`, and `revokeClientVisibleFact()`. Recommendation policy considers transaction stage, forms, approaching deadlines, client role, question history, jurisdiction, and signature status. Live AI remains a separate provider implementation; the application policy filters approved facts and governed content first.

## Teach Accord provider boundary

Teach Accord stores explainable preferences, rules, and office playbook items. It is not direct model training and must not let agents silently alter AI behavior.

Future `TeachAccordProvider` implementations should support `listRules()`, `suggestRule()`, `approveRule()`, `disableRule()`, and `getRuleAuditTrail()`.

Each rule records category, text, scope (`personal`, `team`, `brokerage`), status (`suggested`, `approved`, `disabled`), source, reviewer, and audit history. Accord may suggest rules based on repeated behavior, but broader application requires authorized approval.

Review & Send uses these rules as attributable defaults only; contract fields still require evidence, visible status, and agent approval before signature.

## Storage destinations and local export

Accord storage remains provider-neutral. Future implementations may support Accord Cloud, OneDrive sync, and local computer/export folder workflows behind provider interfaces.

`StorageProvider` continues to represent managed object storage. A future `LocalFileExportProvider` may prepare downloadable exports, suggest folder names, and check whether a desktop companion is available. Browser-only apps generally cannot silently write to arbitrary local folders; local saving may require downloads, the File System Access API with user-selected folders where supported, or a desktop companion.

No MVP mock writes to the local filesystem, connects OneDrive, or changes the canonical Accord Cloud storage model.

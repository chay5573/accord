# Accord Product Backlog

This backlog describes ordered product areas, not authorization to implement everything listed. Current work is governed by `/docs/Sprint.md`. Within each section, items are roughly ordered by dependency and risk.

## Project Constitution / Governance

- [x] Establish repository startup instructions in `/AGENTS.md`.
- [x] Define the Codex engineering role and priority order.
- [x] Adopt Accord's AI constitution.
- [x] Define the security engineering standard.
- [x] Organize the product backlog and current sprint.
- [ ] Add pull-request and issue templates aligned with the definition of done.
- [ ] Assign owners and review cadence for architecture, security, compliance, forms, and AI evaluations.

## MVP Spine

- [x] Confirm mock-data domain fixtures and state vocabulary.
- [x] Connect capture, post-capture review, dashboard, onboarding, new transaction, and transaction workspace into one coherent mock journey.
- [x] Make Start Conversation the primary entry point with unassigned capture and Needs Review queues.
- [x] Add mock Deal Desk Review with prioritized issues, missing facts, draft readiness, and form approval states.
- [ ] Add predictable loading, empty, success, and failure states beyond the current mock review states.
- [ ] Add baseline automated tests and accessibility checks.
- [ ] Keep all Phase 2 work provider-free; no real integrations without a separate explicit task.

## Opportunity-First Workflow

- [x] Define opportunity, capture, reconstruction, missing-fact, activity-signal, integration, and AI Timeline contracts.
- [x] Add mock Quick Capture recovery, opportunity review, AI Timeline, and Activity Inbox.
- [ ] Define service policies for opportunity matching, evidence promotion, draft readiness, interruption recovery, and Deal Desk conversion.
- [ ] Add automated accessibility and state-transition tests.

## Inbox Integration

- [x] Define provider-neutral inbox contracts, security rules, monitored scopes, message classifications, attachments, and audit records.
- [x] Add mock Inbox Integrations Settings and synthetic activity signals.
- [ ] Evaluate Gmail and Microsoft OAuth scopes, webhooks/subscriptions, retention, deletion, and vendor terms.
- [ ] Evaluate IMAP only as a constrained fallback.
- [ ] Implement providers only after privacy/security approval and tenant-isolation testing.

## AI Timeline / Activity Inbox

- [x] Add source-, confidence-, evidence-, and action-aware timeline events to opportunity and transaction views.
- [x] Add external activity triage actions without automatic fact promotion.
- [ ] Define deduplication, ordering, reconciliation, client visibility approval, and immutable audit behavior.

## Onboarding

- [ ] Define agent, team, and brokerage account setup flows.
- [x] Capture Office Profile identity, defaults, preferred vendors, and playbook rules in the mock flow.
- [ ] Clarify scope, inheritance, override, and approval of organization defaults.
- [ ] Support save/resume and review before activation.

## Transactions

- [x] Add human-reviewed mock transaction creation/attachment suggestions after conversation capture.
- [ ] Create the canonical transaction container and ownership context.
- [ ] Define lifecycle and approval state machines.
- [ ] Support parties, representation, property, terms, deadlines, collaborators, and review status.
- [ ] Preserve immutable versions of material terms and approvals.
- [ ] Add broker and transaction-coordinator workflows after agent workflow validation.

## AI Extraction

- [x] Show likely transaction, suggested parties/property/type, missing facts, confidence, and source snippets in post-capture review.
- [ ] Define traceable field output: value, confidence, source snippet, source file, timestamp/location, run version, and review state.
- [x] Build transcript paste and manual-entry mock flows first.
- [x] Present incomplete, low-confidence, and conflicting fields explicitly in the mock review.
- [ ] Add deterministic schema validation and approval invalidation.
- [ ] Establish synthetic Utah evaluation data and release thresholds.
- [ ] Select and integrate providers only after privacy and vendor review.
- [x] Add mock Verified Lookup suggestions with provenance and user-approval rules.
- [ ] Implement `VerifiedLookupProvider` adapters only after source authorization, licensing, privacy, and security review.

## Contract/Form Engine

- [ ] Confirm Utah form licensing and exact MVP form set.
- [ ] Define immutable template versions and canonical field mappings.
- [x] Build mock recommended-package checklist with reasons.
- [x] Represent agent approval and blocker gates before draft package generation in the mock Deal Desk Review.
- [ ] Add rendered fixture and visual regression tests.
- [ ] Keep Contract Library administration in Settings.

## Files & Storage

- [ ] Define logical document model, versions, classifications, and permissions.
- [ ] Define Accord Cloud folder conventions and canonical-source behavior.
- [ ] Add upload safety, signed access, audit, retention, and secure deletion requirements.
- [ ] Implement storage through `StorageProvider` only when explicitly scheduled.
- [ ] Define export, account closure, backup, and restore behavior.

## Privacy & Compliance

- [ ] Complete threat model and data-flow inventory.
- [ ] Validate Utah recording-consent workflow with qualified counsel.
- [x] Model person-scoped consent status, type, dates, source, and jurisdiction in mock data with a visible non-recording fallback.
- [ ] Implement server-enforced consent-on-file validation without relying on blanket consent.
- [ ] Define role/resource authorization matrix and tenant isolation tests.
- [ ] Implement append-only audit events and administrative review.
- [ ] Define retention, deletion, legal hold, and data-subject request workflows.
- [ ] Prepare privacy notice, terms, DPA, subprocessors, and incident procedures.

## Transaction Memory

- [x] Define archive vs Training Library, consent/authority, redaction, provenance, retention, deletion, and audit requirements.
- [x] Add provider-neutral Transaction Memory domain types and interface.
- [x] Add mock Transaction Memory Settings and case-review screens.
- [ ] Validate lawful bases, brokerage ownership, client authorization, and cross-jurisdiction requirements with counsel.
- [ ] Design production redaction evaluation, re-identification testing, and dependent-pattern withdrawal.
- [ ] Implement providers only after security, privacy, retention, export, and deletion controls are approved.

## E-Signature Provider Integration

- [x] Define provider-neutral packet, recipient, document, status, event, completed-document, connection, and audit contracts.
- [x] Add mock preferred-provider Settings and draft-package/Deal Desk status surfaces.
- [x] Add mock packet activity sync, opportunity linking, timeline events, and final-review task signals.
- [ ] Validate DocuSign and Dotloop APIs, licensing, OAuth scopes, webhook verification, data regions, retention, and exit behavior.
- [ ] Implement provider adapters only after security review and approval/send/final-review service policies are tested.
- [ ] Consider Accord Sign only after external-provider workflow evidence supports an in-house signature product.

## Signing Explanation Layer

- [x] Document approved-source retrieval, sourced answers, agent oversight, professional-advice limits, and signing-time education.
- [x] Define provider-neutral client education and explanation types/contracts.
- [ ] Design policy enforcement and adversarial tests that prevent internal or cross-tenant source disclosure.
- [ ] Implement only after client permissions, identity, retention, and AI evaluation requirements are approved.

## Client Portal / Education Library

- [x] Add a future/off-by-default mock administrative preview.
- [ ] Define client identity, invitations, expiration, revocation, messaging, accessibility, and audit workflows.
- [ ] Govern versioned articles/videos by topic, stage, form, section, client role, and jurisdiction.
- [ ] Build client UI only in a separately approved future phase.

## Accord Guide

- [x] Define transaction-, stage-, role-, jurisdiction-, and document-aware education contracts.
- [x] Add mock client roadmap, personalized sourced answer, governed video recommendations, agent preview, and review queue.
- [x] Add mock Explain This Document experience with inline help markers and Ask Your Agent escalation.
- [x] Add client-visible fact controls, content governance, multilingual metadata, unlock rules, and analytics placeholders.
- [ ] Validate Utah content and scripts with brokerage compliance and qualified counsel.
- [ ] Define production permission enforcement, recommendation policy tests, translation review, analytics minimization, and AI safety evaluations.
- [ ] Add live client authentication, AI, video delivery, or analytics only in a separately approved phase.

## Supabase Integration

- [ ] Finalize portable Postgres schema and migrations.
- [ ] Implement Supabase adapters for auth, database access, and storage behind Accord interfaces.
- [ ] Add row-level security as defense in depth and test tenant isolation.
- [ ] Keep service-role credentials server-side and provider logic out of UI/domain layers.
- [ ] Document migration/export path to AWS or custom infrastructure.

## OneDrive Integration

- [ ] Validate user and organization use cases and supported Microsoft account types.
- [ ] Decide sync direction, folder mapping, conflict policy, and canonical-version behavior.
- [ ] Complete OAuth scope and vendor security review.
- [ ] Implement through a sync provider with retries, status, audit, disconnect, and deletion behavior.
- [ ] Make OneDrive optional; Accord Cloud remains canonical.

## Future Integrations

- [x] Establish the mock provider-neutral e-signature foundation; live providers remain unevaluated/unconnected.
- [ ] Evaluate transaction-management, CRM, MLS, title, lender, calendar, and email integrations.
- [ ] Require documented permissions, data flows, provider abstraction, security review, and exit plan for each integration.

## Future Features

- [ ] Brokerage review queues, policy exceptions, and operational reporting.
- [ ] Deadline and obligation intelligence with source traceability.
- [ ] Controlled office-rule learning with authorized activation.
- [ ] Additional transaction types for builders and investors.
- [ ] Additional states after licensing, legal review, mapping, and evaluation.
- [ ] Native mobile experience only if validated usage supports it.
- [ ] Client Portal with approved transaction summaries, sourced education answers, deadlines, next steps, and agent follow-up.
- [ ] Approved Education Library with articles/videos tagged by topic, transaction stage, and form section.

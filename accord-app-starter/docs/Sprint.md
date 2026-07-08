# Current Sprint

## Sprint goal

> Establish Accord's project governance and build the mock-data MVP spine.

The sprint has two sequential phases. Phase 2 must not begin until the Phase 1 gate is satisfied.

## Phase 1 — Governance/docs foundation

- [x] `/AGENTS.md` — mandatory startup sequence, architecture boundaries, and change discipline.
- [x] `/docs/CODEX_ROLE.md` — engineering role, priorities, risk reporting, and completion expectations.
- [x] `/docs/AI_PRINCIPLES.md` — human approval, uncertainty, traceability, privacy, and AI safety rules.
- [x] `/docs/SECURITY.md` — security implementation controls and future readiness.
- [x] `/docs/ProductBacklog.md` — ordered product areas and integration boundaries.
- [x] `/docs/Sprint.md` — current goal, phase gate, scope, and acceptance criteria.

### Phase 1 acceptance criteria

- Every required file exists and uses consistent product, architecture, security, and AI rules.
- `AGENTS.md` directs future sessions to the sprint, backlog, role, and relevant domain documents.
- Provider independence and service/domain ownership are explicit.
- Human approval before draft package generation and field-level source traceability are explicit.
- Security covers secrets, access control, consent, audit, retention, secure deletion, and future program needs.
- README points contributors to the governance layer and current status.
- No application features or real provider integrations were added during Phase 1.

**Phase 1 status:** Complete. Phase 2 is eligible to begin only in a later task that explicitly requests feature work.

## Phase 2 — Mock-data MVP spine

Status: **In progress — mock spine, lint, TypeScript, production build, and local route verification complete; responsive visual checks and baseline automated tests remain**

- [x] Dashboard
- [x] Onboarding flow
- [x] New transaction flow
- [x] Transaction workspace
- [x] Transcript input
- [x] Extracted terms review
- [x] Draft package checklist
- [x] Capture-first dashboard and persistent Start Conversation navigation
- [x] Mock Start Conversation and post-capture review flow
- [x] Person-scoped consent-on-file mock model and recording gate
- [x] Deal Desk Review queue, item evidence/actions, and Missing Facts workflow
- [x] Draft readiness with separate blockers and warnings
- [x] Recommended MVP forms with reason, missing fields, and approval status
- [x] Mock Verified Lookup suggestions and provider-neutral contract
- [x] Transaction Memory architecture, privacy constitution, domain types, and provider-neutral contract
- [x] Mock Transaction Memory Settings and prior-case review
- [x] Future Client Portal and Education Library documented without implementation
- [x] Mock E-Signature provider architecture, Settings, package handoff, and Deal Desk return status
- [x] Signing Explanation Layer contracts and future/off-by-default Client Portal / Education preview
- [x] Transaction Memory ownership/audit contract expansion
- [x] Product Philosophy and opportunity-first domain foundation
- [x] Quick Capture recovery, opportunity review, AI Timeline, and Activity Inbox mocks
- [x] Inbox provider-neutral architecture and Settings mock
- [x] E-signature activity synchronization and final-review signal mocks
- [x] Accord Guide governed domain, agent preview, transaction roadmap, personalized answer, and recommendation mocks
- [x] Explain This Document mock with inline helpers, citations, video recommendations, and agent escalation
- [x] Client-visible fact controls, content governance, multilingual readiness, and analytics placeholders
- [x] First UX simplification sprint: five-item navigation, inference-first Capture, consolidated Prepare, and attention-first Manage

Implementation uses typed synthetic fixtures and contains no live provider integrations. The local production build and eight-page route journey, including Quick Capture and Deal Desk Review, have been verified. Phase 2 remains open until responsive visual behavior and baseline automated checks are complete.

The MVP spine is capture-first: a conversation may lead to a human-reviewed transaction creation or attachment decision. Manual New Transaction remains available as a secondary path. Consent on file is contextual evidence and never blanket permission; recording remains blocked until the current participants and context are confirmed.

Deal Desk Review is the required mock bridge from captured facts to draft preparation. It prioritizes consent, missing/uncertain facts, form decisions, and readiness while preserving source evidence and human decisions. Verified Lookup remains a mock suggestion only; no external source is queried and no result can enter a contract without agent approval.

Transaction Memory remains an administrative mock only. Archive inclusion never implies training eligibility; case authority, redaction, retention, provenance, and human approval are explicit gates. The Client Portal and Education Library are future documented concepts and are not implemented in this sprint.

E-signature work is architecture and mock UI only. No packet is transmitted: package approval gates provider review, signed documents return to Deal Desk for final review, and external sharing remains a separate human action. The Client Portal / Education preview is disabled and contains no login, messaging, retrieval, or live AI.

The MVP spine is now opportunity-first. Captures, recaps, and external activity may produce unassigned opportunities and prepared drafts before a transaction exists. The AI Timeline and Activity Inbox preserve signals, provenance, uncertainty, and human decisions. No live inbox, e-signature, calendar, CRM, lookup, AI, or storage provider is connected.

Accord Guide is a future/off-by-default mock layer. It personalizes education only from approved client-visible facts and governed Accord-produced content, supports agent preview, and escalates advice or judgment questions. No client authentication, live AI, video hosting, analytics, signature, PDF, or storage integration exists.

The first simplification sprint reduced the primary information architecture to Capture, Prepare, Manage / Deal Desk, Client Portal, and Settings. Capture no longer asks destination, transaction, or conversation-type questions. Prepare consolidates draft review behind progressive disclosure. Manage leads with one urgent action and collapses new activity and secondary modules.

### Phase 2 constraints

- Use mock/synthetic data only.
- Do not add real AI, storage, auth, transcription, OneDrive, or PDF integrations without an explicit request.
- Preserve provider boundaries even in mock implementations.
- Keep AI output editable, visibly uncertain when appropriate, and traceable in the mock data model.
- Keep package generation behind explicit agent approval.
- Include basic tests and accessible states as each vertical slice is implemented.

### Phase 2 completion target

An agent can navigate a coherent mock journey from dashboard through onboarding and transaction creation to transcript review, extracted-term review, agent approval, and a draft package checklist. No real contract package is generated or sent.

## Explicitly out of scope for this sprint

- Production Supabase integration.
- Real AI or transcription calls.
- Recording capture.
- PDF generation or licensed form ingestion.
- OneDrive synchronization.
- Live e-signature, inbox/email, calendar, CRM, MLS, or transaction-management integrations. Provider-neutral mocks are permitted by this task.
- Production deployment or compliance certification.

## Product Philosophy Validation

Every future sprint summary must report:

- Clicks removed or added across Capture → Prepare → Manage.
- Typing removed or added.
- Facts Accord now infers safely, plus remaining unnecessary questions.
- Whether each changed screen has one obvious primary action.
- Expected impact on the three-minute conversation-to-signature goal.
- Red Pen Test findings and controls/content removed or deferred.
- Whether the resulting interface remains calm and uses progressive disclosure.
- Any required security, consent, compliance, or human-approval friction and how it is offset elsewhere.

Sprint acceptance criteria must use the Friction Budget from `/docs/ProductPhilosophy.md`, not feature count, as the primary UX measure.

## Current workflow simplification result

- [x] Primary navigation now reflects **Record -> Review & Send -> Coordinate -> Settings**.
- [x] Client Portal / Accord Guide is contextual inside Coordinate and transaction detail as Client View / Client Experience.
- [x] Review & Send is the main contract-field review surface with field status, confidence, document/section reference, evidence links, transcript, and mock signature progression.
- [x] Teach Accord is represented as explainable preferences/rules with personal/team/brokerage scope and suggested/approved/disabled status.
- [x] Accord remains transaction-centric and explicitly not a CRM.
- [x] Client View simplification: transaction-home layout, approved documents, client to-dos, Ask Accord mock chat, viewer-first Document Help, and Coordinate client-activity visibility.
- [x] UX polish pass: Record mode-specific actions, calmer Review & Send field/source layout, Coordinate command center with monthly calendar and customization placeholder, and mock Storage & Files preferences.
- [x] UX correction pass: row-level needs-review treatment, Source-to-transcript behavior, Save as Preference mock drawer, Coordinate clickable tasks/follow-ups/calendar, client Download/Print mocks, and managed-auth security note.

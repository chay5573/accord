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

Status: **Not started**

- [ ] Dashboard
- [ ] Onboarding flow
- [ ] New transaction flow
- [ ] Transaction workspace
- [ ] Transcript input
- [ ] Extracted terms review
- [ ] Draft package checklist

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
- E-signature, MLS, CRM, email, or transaction-management integrations.
- Production deployment or compliance certification.

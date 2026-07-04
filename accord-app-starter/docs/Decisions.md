# Architecture and Product Decisions

This is a lightweight decision log. Mark changes with a new entry; do not rewrite prior rationale after implementation begins.

## Accepted

### ADR-001 — Web app first

**Decision:** Build a responsive Next.js web application before native mobile clients.  
**Why:** Contract review and document workflows favor desktop, while a responsive web surface supports mobile triage without parallel product stacks.

### ADR-002 — Multi-level accounts

**Decision:** Support agent, team, and brokerage account contexts with explicit memberships and scoped roles.  
**Why:** Accord must serve solo agents and governed organizations without separate products.

### ADR-003 — Accord Cloud is canonical

**Decision:** Store canonical transaction files in Accord-managed cloud storage. OneDrive is an optional synchronized destination/integration.  
**Why:** One source of truth enables reliable versions, permissions, retention, and audit history.

### ADR-004 — Supabase MVP, portable core

**Decision:** Use Supabase Auth, Postgres, and Storage for the MVP behind Accord service and provider boundaries.  
**Why:** It speeds delivery while standard Postgres and adapters preserve a credible migration path.

### ADR-005 — Utah forms first

**Decision:** Validate a focused Utah residential forms workflow before adding states.  
**Why:** Form rights, mappings, policies, and quality assurance are jurisdiction-specific; depth creates trust faster than nominal breadth.

### ADR-006 — Human approval is mandatory

**Decision:** AI outputs remain suggestions, and explicit agent approval is required before contract package generation. Material edits invalidate approval.  
**Why:** The agent retains professional responsibility and Accord preserves explainable accountability.

### ADR-007 — Consent gate before recording

**Decision:** Accord does not begin audio capture until the user records the required consent affirmation.  
**Why:** Consent varies by context and jurisdiction and must be visible, deliberate, and auditable.

### ADR-008 — Contract Library lives in Settings

**Decision:** Versioning, mapping, activation, and custom form administration are Settings functions. Transaction users select from governed active versions.  
**Why:** Separating administration from deal work reduces accidental template changes and clarifies authority.

### ADR-009 — Modular monolith for MVP

**Decision:** Keep the initial system in one deployable application with clear internal modules and background-job boundaries.  
**Why:** This minimizes operational complexity without sacrificing provider portability.

## Open decisions

- Utah form licensing/source and the exact MVP form set.
- Production transcription and model providers, including data retention terms.
- E-signature and transaction-management integration priorities.
- Brokerage policy inheritance and exception semantics.
- OneDrive sync direction, conflict policy, and supported account types.
- Required retention defaults and legal-hold ownership.
- Whether broker review is optional, policy-driven, or mandatory for selected workflows.

# Accord AI Assistant Instructions

This file is the mandatory entry point for every Codex or AI-assisted development session in this repository. Read it before making any change.

## Required startup sequence

Before editing code, configuration, schemas, or documentation:

1. Read this `AGENTS.md` file completely.
2. Read `/docs/ProductPhilosophy.md` for the product principles that govern every workflow and interaction.
3. Read `/docs/IdealUserJourney.md` for the intended Capture → Prepare → Manage workflow and friction budget.
4. Read `/docs/Sprint.md` to understand the current goal, phase, and explicit exclusions.
5. Read `/docs/ProductBacklog.md` to understand priority and scope.
6. Read `/docs/CODEX_ROLE.md` for role expectations.
7. Read the relevant domain documents before touching that domain:
   - `/docs/Architecture.md` for infrastructure, providers, storage, APIs, services, or the data model.
   - `/docs/Compliance.md` and `/docs/SECURITY.md` for personal information, recording, retention, sharing, permissions, audit logs, secrets, or security controls.
   - `/docs/AI_PRINCIPLES.md` for AI extraction, contract generation, transcript handling, confidence scoring, or automation.
   - `/docs/FormEngine.md` for forms, contract packages, templates, mappings, or state-specific logic.
   - `/docs/UX.md` and `/docs/Brand.md` for user-interface work.
   - `/docs/DevelopmentHandbook.md` for coding, testing, and delivery standards.
8. Inspect the current implementation and working tree before changing anything. Preserve unrelated work.

If instructions conflict, stop and surface the conflict. Product and architecture decisions recorded in `/docs/Decisions.md` remain in force unless the task explicitly changes them.

## Product context

Accord is a premium, web-first real estate transaction intelligence platform for agents, teams, brokerages, builders, and investor-focused professionals. The Utah forms workflow is the first market scope. Accord Cloud is canonical storage; OneDrive is an optional future sync integration. Supabase may power the MVP, but Accord must remain portable to AWS or custom infrastructure.

Accord assists professional judgment. It does not replace licensed agents, brokers, counsel, or required compliance review.

## Architecture rules

- Never hardcode provider-specific business logic.
- Never tightly couple UI components to Supabase, OneDrive, an AI provider, a transcription provider, or a PDF provider.
- Preserve provider abstractions and normalized domain contracts.
- Keep business rules and workflow orchestration in services/domain layers, not UI components or provider adapters.
- Keep privileged operations, secrets, AI calls, storage actions, authentication administration, and PDF generation server-side.
- Do not add real AI, storage, auth, transcription, OneDrive, or PDF integrations unless the user explicitly requests that integration.
- Prefer standard PostgreSQL and portable interfaces; do not make Supabase-specific behavior the only expression of a business rule.
- Do not introduce technical debt for speed. If a shortcut is unavoidable, obtain explicit approval and document its scope and removal plan.

## AI and contract rules

- AI suggests; humans approve.
- Human approval is required before draft contract package generation.
- Every AI-generated contract field must eventually support source traceability, including value, confidence, source evidence, and available source metadata.
- Never fabricate missing terms, conceal uncertainty, or silently convert an assumption into a fact.
- Material edits after approval must invalidate the approval and require reapproval.
- Do not claim that Accord provides legal advice or guarantees compliance.
- Respect recording consent, retention, deletion, access-control, and audit settings in every AI-assisted workflow.

## Security and privacy rules

- Apply privacy by design, least privilege, tenant isolation, and deny-by-default authorization.
- Never expose secrets or service-role credentials to client code, logs, fixtures, screenshots, or commits.
- Use synthetic data for development and tests unless use of protected data is explicitly authorized and controlled.
- Treat transcripts, contracts, identity data, financial information, and uploaded documents as confidential.
- Recording must remain disabled until the required consent gate is satisfied.
- Security-sensitive actions must be authorized server-side and auditable.

## Change discipline

- Work only within the current sprint phase unless the task explicitly changes scope.
- Define acceptance criteria and consider authorization, privacy, audit, accessibility, failure recovery, and testing before implementation.
- Update documentation whenever product behavior, architecture, security posture, AI behavior, or a durable decision changes.
- Do not delete or reverse an accepted decision without recording the replacement and rationale in `/docs/Decisions.md`.
- Summarize files changed, behavior affected, verification performed, risks, and unresolved questions after every task.
- When uncertain about a material product, legal, security, or architecture choice, ask instead of assuming.
- Validate feature work against the Product Philosophy, Ideal User Journey, Red Pen Test, and Friction Budget before implementation and in the completion summary.

## Current phase gate

The current sprint begins with governance. Do not begin Phase 2 mock-data MVP work until every Phase 1 artifact in `/docs/Sprint.md` exists, is internally consistent, and is marked complete.

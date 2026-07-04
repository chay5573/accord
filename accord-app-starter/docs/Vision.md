# Accord Product Vision

## Product promise

Accord is a premium real estate transaction intelligence platform. It helps agents turn conversations and deal context into accurate, reviewable transaction work while keeping the licensed professional in control.

Accord is not an autonomous contract author, a brokerage system of record, or a substitute for legal judgment. It is the intelligence and workflow layer between a deal conversation and an approved transaction file.

## Who it serves

- Independent agents who need a dependable personal deal desk.
- Teams that need shared standards, coordination, and visibility.
- Brokerages that need policy controls, review paths, and auditability.
- Transaction coordinators and broker reviewers working under delegated access.

Accounts may be agent-only, team-scoped, or brokerage-scoped. A user can hold multiple roles, but access must always resolve from explicit organization membership and transaction permissions.

## Core experience

1. Create a transaction container.
2. Capture or paste a consented conversation or other source material.
3. Let Accord extract facts, identify uncertainty, and recommend forms.
4. Have the agent review and edit every material term.
5. Require explicit approval before generating a contract package.
6. Save the approved work and its audit history to Accord Cloud.

## MVP focus

- Web app first; responsive desktop is the primary working surface.
- Utah residential forms and workflows first.
- Accord Cloud as canonical storage, with optional OneDrive synchronization later.
- Supabase for MVP authentication, Postgres, and object storage.
- Settings-managed contract library with versioned forms and mappings.
- Human approval, recording consent, privacy controls, and audit trails as product primitives.

## Product principles

- Premium means calm, precise, fast, and trustworthy—not decorative complexity.
- AI proposes; licensed professionals decide.
- Show sources, confidence, changes, and missing information.
- Capture data once and reuse it across the transaction.
- Defaults belong to agents, teams, and brokerages—not hidden in prompts.
- Portability and privacy are architectural requirements.

## Success signals

- Less time from conversation to first reviewed draft.
- Fewer omitted or inconsistently entered terms.
- High percentage of AI suggestions explicitly accepted, edited, or rejected.
- Clear accountability for every generated document and material change.
- Agents return to Accord as the daily transaction workspace.

## Out of scope for the first release

- Autonomous execution or delivery of contracts.
- Nationwide form coverage.
- Native mobile applications.
- Replacing brokerage compliance, accounting, CRM, or e-signature systems.
- Treating OneDrive as a second independent source of truth.

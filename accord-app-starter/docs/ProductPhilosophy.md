# Accord Product Philosophy

These principles guide every product, design, architecture, and engineering decision. When feature scope conflicts with them, reduce the workflow before adding machinery.

## The product

- Accord is an AI transaction assistant, not primarily a transaction management system.
- Accord should feel like an intelligent transaction coordinator, not a document management system.
- Conversations are the primary input. Transactions are a byproduct, not the starting point.
- Deal Desk is the tracking and system-of-record layer after work is captured or drafted.
- External systems should feel like extensions of Accord, not separate destinations.
- Accord Guide is the integrated, transaction-aware client education and contract explanation layer—not a generic FAQ or video page. It keeps the agent central and uses governed Accord-produced content.

## The agent's time

- Agents should spend time negotiating and advising clients, not entering data.
- Every click must justify its existence.
- AI should perform useful work before asking the user.
- Ask only for facts Accord cannot determine from attributable evidence.
- Reduce cognitive load before adding features.

## Trust and authority

- Human approval is required before any legal document is finalized, sent, signed, or shared.
- Every AI-generated field must have attributable evidence, confidence, provenance, and review state.
- A signal is not an approved contract fact. External and reconstructed facts remain suggestions until the agent accepts them.
- Accord makes uncertainty visible and never invents missing terms.

## Graceful recovery

Accord must recover from forgotten recordings, incomplete information, interrupted workflows, and imperfect human behavior. A conversation, voice recap, typed note, email signal, signature event, uploaded document, or remembered detail can begin an opportunity. Recovery preserves work, explains what Accord reconstructed, and asks the smallest useful follow-up.

## Decision test

Before adding a screen, field, or click, ask:

1. Can Accord infer or prepare this safely from existing evidence?
2. Does the agent need to decide it now?
3. Does it reduce risk or cognitive load?
4. Is the source and uncertainty visible?
5. Can the workflow recover if the agent stops here?

If the answer is no, remove or defer the interaction.

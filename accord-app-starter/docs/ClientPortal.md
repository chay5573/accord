# Future Client Portal and Education Library

## Status

Future concept only. No Client Portal UI, client authentication, client AI, messaging, or video system is part of the current MVP.

## Purpose

The Client Portal would give approved buyers and sellers a calm, plain-English view of their transaction while preserving the agent’s role and the confidentiality of internal work.

Clients could:

- View an agent-approved transaction summary.
- Ask basic questions about their transaction.
- Ask plain-English contract education questions.
- See approved deadlines, next steps, and responsibility reminders.
- Watch short educational videos tied to a question or transaction stage.
- Send a follow-up question to their agent.

## Client AI guardrails

- Retrieval is limited to documents, fields, summaries, and education content explicitly approved for that client’s visibility.
- Never expose internal agent notes, negotiation strategy, private brokerage playbooks, other transactions, unapproved drafts, or suppressed fields.
- Do not provide legal, tax, financing, inspection, appraisal, or other professional advice.
- Answer educationally, identify uncertainty, and direct judgment calls to the agent or appropriate professional.
- Every answer cites the contract section, approved document, education article, or video used.
- The agent can review client questions, AI answers, citations, escalations, and follow-ups.
- Client access is least-privilege, transaction-scoped, expiring, revocable, and audited.
- A client answer cannot change a transaction fact, deadline, contract, or approval state.

## Education Library

Education content is separately governed from Transaction Memory and the Contract Library. Authorized administrators manage approved articles and videos. Each item includes title, topic, transaction stage, jurisdiction, applicable form/section, version, reviewer, approval date, audience, source, and retirement date.

Videos are tagged by topic, transaction stage, and form section. The system should prefer concise, accessible content with captions, transcripts, and current reviewer approval. Engagement analytics must avoid capturing unnecessary sensitive question content.

## Future architecture

Client-visible retrieval requires a dedicated policy layer that filters approved sources before any model call. The portal should use provider-neutral identity, messaging, content, and AI interfaces. Client questions and answers follow documented retention, export, deletion, audit, and incident-response rules.

The Signing Explanation Layer is the portal's signing-time education boundary. See `/docs/SigningExplanationLayer.md` for approved-source rules, citations, agent review, permissions, domain types, and example questions. The mock Settings preview remains off by default and does not create client access.

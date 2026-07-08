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

Future portal views may consume only AI Timeline events explicitly approved for client visibility, transaction-stage education, signed-document status, and client-visible draft or signed documents. Internal opportunity reconstruction, Activity Inbox signals, confidence debates, and unapproved timeline events remain hidden.

## Accord Guide

Accord Guide is the preferred client education concept inside the portal. It is transaction-aware, stage-aware, role-aware, jurisdiction-aware, and document-aware—not a generic FAQ or video library. Recommendations use approved facts, forms, deadlines, client question history, and signature status. Shared documents may show summaries, key sections, inline question-mark helpers, governed Accord-produced videos, common questions, and Ask Your Agent.

Every content item records draft/approved/retired status, reviewer, reviewed date, jurisdiction, client role, compliance notes, version, and replacement content when retired. Multilingual metadata supports future language, locale, translated title/transcript/captions, and translation review; no translation is active now.

Facts are explicitly `approved_for_client`, `internal_only`, `needs_agent_review`, or `revoked`; only approved facts enter personalization. Questions asking what to do, whether to accept/cancel/waive, whether something is legal, whether the client can sue, or whether a deal is good route to the agent. Low confidence, conflicting data, and negotiation-dependent questions also escalate.

## Agent navigation placement

Client Portal / Accord Guide is not a primary agent workflow destination. It appears inside Coordinate and transaction detail as **Client View** or **Client Experience** so agents preview exactly what a client can see before sharing access.

Client-facing AI remains future/off-by-default and can consume only materials approved for client visibility. Internal notes, negotiation strategy, unapproved draft terms, private playbooks, and Activity Inbox reconstruction remain hidden.

## Simplified Client View direction

Client View is a transaction home. It should not feel like a generic FAQ, education library, or internal approval portal.

The default client page includes:

- Simple transaction status and progress.
- Important dates.
- Approved documents with clear status.
- Client to-dos.
- Ask Accord chat.
- Contextual education only when tied to a stage, document section, upcoming deadline, or client question.

Approved document statuses include `Ready to view`, `Needs signature`, `Signed`, `Updated`, and `Waiting on other party`.

Ask Accord remains mock-only until a future approved implementation. It can use only approved client-visible documents, approved education content, and approved transaction facts. Advice or judgment questions still route to the agent.

Document Help should use a viewer-first layout: document/PDF mock in the center, highlighted sections or question markers on the document, and one plain-English explanation panel. The panel may include transaction-specific detail, one related short video, source/section reference, and an Ask Accord follow-up box.

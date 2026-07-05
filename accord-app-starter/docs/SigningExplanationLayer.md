# Signing Explanation Layer

## Status

Future architecture and mock administrative preview only. Accord does not provide client login, live client AI, messaging, streaming video, or an e-signature ceremony in the current MVP.

## Purpose

Accord should own the educational context around signing even when a provider such as DocuSign or Dotloop performs the legally binding signature workflow. The Signing Explanation Layer gives buyers and sellers an agent-governed explanation of what they are signing, deadlines, version changes, outstanding signatures, and next steps.

Example questions include:

- What am I signing?
- What is earnest money?
- What happens during due diligence?
- What changed from the last version?
- What is the settlement deadline?
- What documents still need signatures?

## Approved-source boundary

Client AI may retrieve only client-visible transaction data, approved contract/document sections, and approved Education Library content. The access policy runs before retrieval or any model call. It must never expose internal agent notes, negotiation strategy, private team/brokerage playbooks, unapproved draft terms, other transactions, or confidential opposing-party information.

Answers are educational, distinguish uncertainty, and direct legal, tax, lending, inspection, negotiation, and other judgment/advice questions back to the agent or appropriate professional. Every answer cites the exact approved document section, education article, or video used. An answer cannot change a term, deadline, document, signature packet, or approval state.

## Agent oversight and permissions

Client portal access is explicit, transaction-scoped, least-privilege, expiring, revocable, and audited. The agent can review client questions, proposed answers, citations, escalations, and follow-ups. Documents and sections require client-visibility approval and can be revoked independently.

## Education Library

Authorized administrators manage approved articles and short explainer videos. Content is versioned, reviewed, accessible, and tagged by topic, transaction stage, form, contract section, client role, and jurisdiction/state where applicable. Videos should include captions and transcripts. Retired or jurisdiction-mismatched content is excluded from recommendations.

## Accord Guide document experience

The Signing Explanation Layer is presented to clients through Accord Guide. A shared document can show its summary, key sections, inline question-mark helpers, recommended videos, common questions, and an Ask Your Agent action. Explanations distinguish general education from approved transaction-specific detail and cite the exact document section or governed content. Full PDF annotation remains future work.

## Domain boundary

The future client-education service uses `ClientPortalAccess`, `ClientVisibleDocument`, `EducationContentItem`, `EducationVideo`, `ClientQuestion`, `ClientAIAnswer`, `SigningExplanationSession`, and `SigningExplanationCitation`. Provider-neutral operations include listing client-visible documents, asking a question, recommending and listing education content, logging questions, approving document visibility, and revoking portal access.

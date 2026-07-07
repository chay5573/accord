# Privacy, Security, and Compliance

## Posture

Accord handles confidential communications, identity data, financial terms, and legal documents. Privacy and security are product behavior, not a later checklist. This document sets product requirements; jurisdiction-specific legal conclusions require qualified counsel and brokerage policy review.

## Recording consent

- Recording is off by default.
- Before capture, the agent must affirm that all required parties consent under applicable law and brokerage policy.
- Record the confirmer, time, method, disclosure version, participants if known, and optional note.
- A consent record is transaction-scoped and does not automatically cover a later conversation.
- Consent on file is a reusable evidence record, not blanket consent. It must identify the person, status (`not_obtained`, `obtained`, `expired`, or `revoked`), consent type, date, expiration if any, source, and jurisdiction when known.
- Before each recording, verify that every required participant has current consent applicable to the recording method and context. Prior consent, an engagement agreement, or consent from only one participant cannot silently authorize the conversation.
- If consent is absent or withdrawn, stop recording and offer transcript paste or manual entry.
- Never use silence or continued app use as consent.

## Human approval

AI output is a suggestion. Before contract generation, the agent must review material fields, resolve required unknowns, and explicitly approve the draft terms. Approval records the user, timestamp, term snapshot, source form versions, and subsequent changes. Any material edit after approval invalidates approval and requires reapproval.

Conversation processing may recommend creating or attaching a transaction. The user must confirm that destination; automatic transaction creation must remain reviewable and auditable. Transaction creation never satisfies the later contract-term approval gate.

Broker review may be required by organization policy, but it does not replace agent approval.

An approved draft package still requires an explicit signature-send action unless an authorized administrator or user has enabled a documented immediate-send policy. Completed signed documents return to Deal Desk for agent final review before they can be sent or shared with the other side.

## Access control

- Deny by default and enforce least privilege.
- Scope access by organization membership and transaction assignment.
- Separate agent, transaction coordinator, team admin, brokerage admin, and broker reviewer capabilities.
- Guest roles receive narrow, expiring access and no implicit visibility into the full file.
- Privileged operations require fresh server-side authorization.
- Log membership, role, sharing, download, approval, and export events.

## Data protection

- Encrypt data in transit and at rest using managed platform controls.
- Keep service credentials server-side and rotate them.
- Use short-lived signed file access; do not expose storage buckets publicly.
- Classify and restrict wire instructions, bank statements, government IDs, tax data, and Social Security numbers.
- Do not send unnecessary sensitive fields to AI or analytics providers.
- Redact sensitive content from logs and error reporting.
- Maintain tested backups, restore procedures, and incident response contacts.

## Retention and deletion

Support policy at brokerage, team, and transaction level with the strictest applicable rule winning. The starter defaults are recordings deleted after transcription, transcripts retained with the transaction file, and transaction files archived indefinitely; these are configurable policy defaults, not universal legal requirements.

Deletion must cover database records, Accord Cloud objects, derived AI artifacts, and connected copies where the provider permits. Legal holds suspend deletion and are audited. Define backup aging and deletion-service-level expectations before production.

## AI data governance

Use providers and configurations that do not train on customer content by default. Maintain a data-processing inventory, subprocessors, model/prompt versions, and evaluation results. Preserve source lineage and human decisions. Do not use customer transaction content for product training without explicit, separately documented authorization.

Transaction Memory requires separate human approval before a completed transaction becomes training-eligible. Authorization must reflect client obligations, agent/team/brokerage ownership, intended use, policy version, and jurisdiction where applicable. Redaction should precede learning where practical, and unresolved high-risk findings block approval.

No raw training case or derived pattern may cross team or brokerage boundaries without explicit lawful authority. Audit import, view, redaction, approval, export, removal, and deletion. Removing a case must stop future retrieval and learning eligibility and trigger review of dependent patterns. Archive retention alone does not authorize training use.

## OneDrive

OneDrive connection requires informed administrator or user authorization and minimum OAuth scopes. Show what is synchronized, its last status, and how disconnect/deletion behaves. Accord Cloud remains canonical unless a future policy explicitly changes this.

## E-signature providers

Provider credentials and OAuth tokens remain server-side with least-privilege scopes. Verify and audit provider webhook events before changing Accord status. Signed documents are confidential transaction records and require encrypted storage, scoped access, retention policy, and agent final review before external sharing. Connection, send, recipient, completion, import, void, error, and sharing events are auditable. Accord avoids silent sending unless an authorized workspace policy explicitly enables it.

## Client education

Future client education uses only agent-approved client-visible documents, fields, and approved Education Library content. It excludes internal notes, strategy, private playbooks, unapproved terms, and confidential third-party information. Answers remain educational, cite their sources, avoid professional advice, and are available for agent review. Client access is explicit, revocable, transaction-scoped, and audited.

Accord Guide content is governed by status, reviewer, review date, jurisdiction, role, compliance notes, version, and retirement replacement. Personalization uses only facts approved for client visibility. Judgment, legal interpretation, waiver, cancellation, litigation, acceptance, and deal-quality questions route to agent review. Multilingual variants require separate translation review before use.

## Inbox signals and reconstructed activity

Email, e-signature, calendar, CRM, uploaded-document, recap, and conversation events are evidence signals—not approved contract facts. Preserve provider/source attribution, retrieval time, confidence, classification, and the human link decision. Agent approval is required before an external or reconstructed value affects a contract. Mailbox monitoring is opt-in and scope-controlled. Email content is excluded from training unless separately authorized under Transaction Memory policy.

## Production readiness checklist

- Threat model and access-control tests.
- Row-level security review and tenant-isolation tests.
- Privacy notice, terms, DPAs, and subprocessor list.
- Utah recording and real estate workflow review by counsel.
- Incident response, breach notification, backup restore, and key rotation drills.
- Retention, export, deletion, legal hold, and account closure workflows.
- Dependency scanning, security headers, rate limits, and audit-log monitoring.

## Workflow privacy notes

Record remains consent-gated and must not rely on blanket consent alone. Review & Send can display transcript evidence and Teach Accord defaults only as reviewable support for contract fields; no AI-derived, externally sourced, or preference-derived fact may be sent for signature without agent approval.

Client View / Client Experience appears only inside transaction context and must filter to approved client-visible facts, documents, and education content. Internal strategy, private playbooks, Activity Inbox reconstruction, and unapproved draft terms remain hidden.

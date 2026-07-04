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

## OneDrive

OneDrive connection requires informed administrator or user authorization and minimum OAuth scopes. Show what is synchronized, its last status, and how disconnect/deletion behaves. Accord Cloud remains canonical unless a future policy explicitly changes this.

## Production readiness checklist

- Threat model and access-control tests.
- Row-level security review and tenant-isolation tests.
- Privacy notice, terms, DPAs, and subprocessor list.
- Utah recording and real estate workflow review by counsel.
- Incident response, breach notification, backup restore, and key rotation drills.
- Retention, export, deletion, legal hold, and account closure workflows.
- Dependency scanning, security headers, rate limits, and audit-log monitoring.

# Accord Security Standard

This document defines engineering security controls. `/docs/Compliance.md` defines the broader privacy and compliance posture; both apply to sensitive work.

## Core principles

- Build privacy in from the first design, collecting and retaining only data needed for a defined purpose.
- Deny access by default and grant the least privilege required.
- Enforce role-based access control together with tenant, team, transaction, and resource scope.
- Treat the client as untrusted; authorize sensitive actions on the server.
- Use defense in depth so provider controls are not the only security boundary.
- Keep Accord's security policy portable across infrastructure providers.

## Identity and access

- Normalize provider identities into Accord users, memberships, roles, and resource permissions.
- Evaluate authorization for every read, write, share, download, approval, export, delete, and administrative action.
- Use row-level security as MVP defense in depth, with equivalent application-level policy that can move off Supabase.
- Require narrow, expiring permissions for guests and external collaborators.
- Audit role, membership, policy, sharing, and privileged-access changes.
- Plan stronger authentication and session controls for administrators and high-risk operations.

## Encryption and transport

- Require TLS for data in transit.
- Use managed encryption at rest for databases, object storage, backups, and provider-managed queues.
- Store especially sensitive secrets and keys in an approved secret manager when production infrastructure is introduced.
- Document key ownership, access, rotation, and emergency revocation.

## Secrets

- Never place API keys, service-role keys, tokens, connection strings, or private credentials in client-side code.
- Never commit secrets to GitHub or include them in examples, fixtures, logs, screenshots, or documentation.
- Use environment variables for local and deployed configuration; commit only placeholder names in `.env.example`.
- Keep privileged credentials server-side, scope them narrowly, rotate them, and revoke them after suspected exposure.
- Add secret scanning and dependency scanning before production release.

## Sensitive documents and data

Contracts, transcripts, recordings, identity documents, bank statements, wire instructions, tax documents, and financial details are confidential. Classify files at intake, restrict access and download, use short-lived signed URLs, and prevent public buckets. Do not include document bodies or sensitive values in analytics, logs, error traces, or AI evaluation datasets.

Use synthetic data in local development and automated tests. Production-data access must be explicitly authorized, time-bounded, audited, and limited to the minimum necessary.

## Transaction Memory

- Raw training cases and derived patterns are tenant-scoped and must never be exposed across unrelated teams or brokerages.
- Use least-privilege roles for import, view, redaction, approval, export, and deletion.
- Redact sensitive content before learning where practical, and block approval when high-risk findings remain unresolved.
- Encrypt archive sources, redacted representations, indexes, derived patterns, and backups in transit and at rest.
- Audit imports, views, analysis, sensitive-data findings, redactions, approvals/denials, exports, removals, and deletions.
- Removing or deleting a case immediately removes training eligibility and future retrieval; dependent learned patterns require reevaluation.
- Keep raw sources separate from redacted learning representations and prevent sensitive content from entering logs, analytics, or evaluation reports.
- Provider credentials and training-service secrets remain server-side and must never appear in client code.

## E-signature providers

- No provider API keys, OAuth tokens, refresh tokens, webhook secrets, or connection credentials may enter client code, logs, fixtures, screenshots, or Git.
- Store OAuth tokens and secrets server-side using an approved secret store; request least-privilege scopes and audit grants, refresh, revocation, and disconnect.
- Encrypt signature packets and completed signed documents in transit and at rest with tenant-scoped authorization.
- Verify webhook signatures, timestamps, replay protection, provider account, packet mapping, and event idempotency before accepting an event.
- Audit every connection and provider event, including packet creation, review, send, recipient activity, completion, import, void, retry, failure, final review, and external share.
- Completed documents require agent final review before external sharing. Silent send is prohibited unless explicitly enabled by authorized workspace policy.

## Client education access

- Client portal access is explicit, transaction-scoped, least-privilege, expiring, revocable, and audited.
- Filter approved client-visible sources server-side before any retrieval or model call.
- Prevent access to internal notes, strategy, playbooks, unapproved drafts, other tenants, and confidential opposing-party information.
- Record safe question/answer metadata and citations without duplicating unnecessary sensitive content in logs.
- Enforce client-visible fact status (`approved_for_client`, `internal_only`, `needs_agent_review`, or `revoked`) server-side before retrieval.
- Only approved, current, role- and jurisdiction-matched Accord Guide content is client eligible.
- Audit fact visibility changes, portal previews, document explanations, questions, answers, citations, escalations, content review, and revocation.
- Analytics are privacy-minimized event placeholders; never store full sensitive questions merely to measure engagement.

## Inbox and external activity

- Gmail and Microsoft connections use OAuth with least-privilege scopes; mailbox passwords, OAuth tokens, client secrets, and provider credentials remain server-side.
- Users explicitly choose monitored mailboxes, labels, and folders and can revoke access.
- Encrypt retained message metadata, imported attachments, connection state, and tokens in transit and at rest.
- Audit every connect, disconnect, scope change, import, view, classification, link, unlink, export, and delete.
- Treat email, calendar, CRM, document, and signature content as untrusted signals. Defend against prompt injection and malicious attachments.
- Never use email content for training without separate Transaction Memory authorization.
- External signals cannot silently modify contract fields, deadlines, approval state, or client-visible information.

## Recording consent

Recording is disabled by default. Audio capture cannot start until the required consent affirmation is completed and recorded as defined in `/docs/Compliance.md`. Withdrawal or absence of consent must stop capture and preserve a non-recording path.

Consent records must be person-scoped and include status, consent type, date, optional expiration, source, and jurisdiction when known. A stored record is not a universal authorization token. Before each recording, the server-side policy must evaluate the actual participants, current status, applicable scope, jurisdiction, expiration, and conversation context. Expired, revoked, missing, mismatched, or ambiguous consent blocks recording while transcript paste and manual notes remain available.

## Audit logs

Security and material workflow events must produce append-only, tenant-scoped audit records with actor, action, target, time, outcome, and correlation ID. Include access and permission changes, sensitive downloads, sharing, AI suggestions, human edits, approvals, generation, export, retention, and deletion events. Do not turn the audit log into a second store of sensitive content.

## Retention and secure deletion

- Apply documented retention policy to source data, derived AI artifacts, files, metadata, connected copies, and backups.
- Honor legal holds and record policy exceptions.
- Secure deletion must remove active copies and schedule provider/back-up expiration within a documented service level.
- Deletion and account closure must be authorized, auditable, retry-safe, and report partial provider failures.
- Never promise immediate physical destruction where a provider or backup lifecycle cannot guarantee it; state the actual behavior.

## Vendors and provider abstraction

Supabase, OneDrive, AI, transcription, PDF, email, and storage vendors must sit behind Accord interfaces. Provider substitution must not bypass authorization, encryption, audit, retention, deletion, or consent policy. Before production use, document data flows, subprocessors, regions, retention, training use, breach terms, availability, and exit/export procedures.

Verified Lookup sources follow the same rule. County, assessor, MLS, public-listing, brokerage-record, and uploaded-file lookups require server-side authorization and a provider adapter. Treat returned content as untrusted, request only necessary fields, record user approval or trusted-policy scope, and retain source attribution and retrieval time. Lookup results never bypass agent approval for contract use.

## Secure development requirements

- Validate all external input at trust boundaries.
- Protect against injection, malicious uploads, path manipulation, cross-site scripting, cross-site request forgery, server-side request forgery, and prompt injection as applicable.
- Enforce file type, size, malware-scanning, and safe-rendering policies before production uploads.
- Rate-limit authentication, extraction, generation, export, and sharing endpoints.
- Redact sensitive telemetry and use correlation IDs.
- Test tenant isolation, privilege escalation, insecure object references, signed URL expiry, approval gates, and deletion behavior.
- Patch supported dependencies and maintain a vulnerability response process.

## Future security program

Before broad production adoption, Accord needs:

- SOC 2 readiness program with control ownership and evidence collection.
- Documented and exercised incident response plan.
- Data processing agreement and maintained subprocessor list.
- Vendor security reviews before sensitive data is shared.
- Breach detection, escalation, customer notification, and regulatory notification process.
- Threat modeling, penetration testing, disaster recovery, backup restoration, and access reviews.

## Reporting and response

Suspected exposure must be reported through the designated private incident channel. Preserve evidence, contain access, rotate affected credentials, assess scope, follow notification obligations, and document remediation. Never place customer data or exploit details in public issues.

## Client View security notes

Client View and Ask Accord must be filtered through a client-visible policy layer before any future retrieval or AI call. Approved client-facing sources are limited to approved transaction facts, approved client-visible documents, and approved education content. Internal notes, negotiation strategy, private brokerage playbooks, unapproved draft terms, Activity Inbox reconstruction, and cross-tenant data must remain inaccessible.

Local export must require explicit user action and safe authorization. No browser or desktop companion workflow may write files, sync providers, or expose local paths without user approval, auditability, and tenant authorization.

## Authentication requirements

Production Accord must use a managed authentication provider. Accord must not store raw passwords or implement custom password hashing/session management in application code. Password hashing, session issuance, rotation, recovery, MFA, and abuse controls should be handled by the managed auth provider. Client portal access requires strict transaction-scoped permissions before production use.

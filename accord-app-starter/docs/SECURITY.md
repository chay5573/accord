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

## Recording consent

Recording is disabled by default. Audio capture cannot start until the required consent affirmation is completed and recorded as defined in `/docs/Compliance.md`. Withdrawal or absence of consent must stop capture and preserve a non-recording path.

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

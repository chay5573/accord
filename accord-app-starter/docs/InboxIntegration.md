# Inbox Integration

## Status and purpose

Future provider-neutral architecture only. No Gmail, Outlook/Microsoft 365, or IMAP mailbox is connected in the MVP. Inbox integration helps Accord detect activity, recover forgotten work, attach evidence signals to opportunities, and update the AI Timeline without treating an email as an approved contract fact.

## Providers and uses

Initial candidates are Gmail and Outlook/Microsoft 365. IMAP may be evaluated as a limited fallback only if its authentication, event, permission, and deletion behavior meet Accord policy.

Inbox signals may suggest signed documents, title emails, lender updates, inspection reports, counteroffers, client questions, missing documents, and activity the agent forgot to record. Signals may create an unassigned opportunity suggestion or propose a link to existing work. The agent reviews the match and any contract-affecting fact.

## Evidence rules

- Inbox signals and attachments retain provider, mailbox scope, message reference, retrieval time, classification, confidence, and opportunity link decision.
- Email content is untrusted input and may contain prompt injection or misleading claims.
- An inbox signal is distinct from a verified contract fact and cannot silently overwrite a field.
- Agent approval is required before an email-derived value affects a contract or deadline.
- Email content is never used for training unless separately approved under Transaction Memory policy.

## Security and privacy

- OAuth only for Gmail and Microsoft providers; no mailbox passwords or provider secrets in client code.
- Store tokens server-side, encrypted, least-privilege, scoped to user-approved mailboxes, labels, and folders.
- Users control which mailbox scopes and attachments Accord monitors and may disconnect or revoke access.
- Encrypt imported message metadata and attachments at rest and in transit.
- Audit connect, disconnect, scope change, search, view, classify, import, link, unlink, export, and delete.
- Minimize retained content, honor provider deletion/retention constraints, and prevent cross-tenant access.

## Provider contract

`InboxProvider` defines `listProviders()`, `getConnectionStatus()`, `connectInbox()`, `disconnectInbox()`, `listMonitoredFolders()`, `updateMonitoredFolders()`, `searchMessages()`, `getMessage()`, `listAttachments()`, `importAttachment()`, `classifyMessageSignal()`, `linkMessageToOpportunity()`, and `getInboxAuditTrail()`. Application services own authorization, mailbox scope, tenant isolation, evidence promotion, audit, retention, and opportunity matching.

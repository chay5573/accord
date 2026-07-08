# E-Signature Provider Integration

## Status and purpose

Mock architecture and UI foundation only. Accord will coordinate approved draft packages with a preferred external e-signature provider while keeping provider credentials, signature execution, and legally binding events outside the client application. No live provider is connected in the MVP.

Accord does not build an in-house signature product yet. The provider-neutral boundary supports DocuSign, Dotloop, future providers, and a possible future Accord Sign without embedding vendor rules in the UI or transaction domain.

## Provider settings

An authorized workspace administrator selects a preferred provider and its least-privilege connection. The recommended default is **Open provider review before sending** so the agent can confirm documents, recipients, routing order, and signature fields. A future **Send immediately after Accord approval** policy may be available only when explicitly enabled by an authorized administrator or user; it is never the silent default.

## Approval and lifecycle

Draft package approval is required before a packet can be prepared or sent. The normalized lifecycle is:

1. Draft Package Approved
2. Ready for Provider Review
3. Sent
4. Partially Signed
5. Completed
6. Imported to Deal Desk
7. Final Review
8. Ready to Send to Other Side

Completed signed documents return to Deal Desk as immutable imported versions. The agent must complete final review before Accord enables external sharing. Corrections, recipient changes, or document substitutions produce new auditable versions rather than silently changing a sent packet.

## Provider mapping

Each `SignaturePacket` maps Accord transaction and draft-package identities to provider envelope/loop identifiers. It contains ordered recipients, approved Accord documents, provider document IDs, signature/tab field mappings, status, timestamps, completed-document checksums, final-review state, and audit references. Provider terminology is translated at the adapter boundary.

## Security and privacy

- OAuth authorization and tokens are handled server-side; no API key, token, provider secret, or connection credential appears in client code.
- Request only the minimum scopes needed to create packets, read status, import completed documents, and void packets.
- Encrypt packet metadata, signed documents, provider identifiers, and backups in transit and at rest.
- Verify webhook signatures, timestamp/replay controls, tenant mapping, and event idempotency before changing state.
- Audit connection changes, packet creation, provider review, sending, recipient events, completion, import, final review, sharing, voiding, failures, and retries.
- Treat provider-rendered links as short-lived, authorized server responses. Do not expose unrestricted provider URLs.

## Events, retries, and failure recovery

Provider webhooks enter a normalized server-side event handler. Events are idempotent, ordered where possible, correlated to the workspace and packet, and safe to replay. Polling may reconcile missed events. Retryable failures use bounded backoff and preserve the last confirmed status. Ambiguous send outcomes block a second send until reconciliation prevents duplicate envelopes.

Disconnecting a provider does not delete Accord records or completed documents. Revocation, voiding, and cancellation require authorization, a reason, provider confirmation where possible, and an audit event. A failed provider cancellation remains visible and requires manual recovery.

## Provider contract

`ESignatureProvider` defines listing and connection status, connect/disconnect, packet creation, provider review, send, status, verified webhook handling, completed-document import, voiding, and audit retrieval. Application services own approval gates, tenant authorization, policy, idempotency, and final-review requirements.

Activity synchronization also lists packets, synchronizes verified provider events, classifies signature signals, and links packets to opportunities. Envelope/loop creation, send, view, recipient signatures, completion, and document import add attributable AI Timeline events. Unlinked packets remain in the Activity Inbox. Completion creates an agent final-review task; it never triggers external sharing by itself.

## Review & Send mock handoff

Review & Send is the agent-facing signature handoff surface. It shows the preferred provider if configured, signers/recipients, included documents, and final confirmation before any provider action.

The MVP mock status progression is:

1. Ready for signature
2. Sent
3. Waiting on signatures
4. Completed
5. Imported to Coordinate

This remains provider-neutral and mock-only. No live provider review, DocuSign, Dotloop, Accord Sign, PDF generation, or signed document import is connected.

Coordinate treats e-signature activity as outbound packet follow-up: sent, email delivered, not viewed, viewed but not signed, partially signed, completed, overdue, and warnings tied to transaction deadlines. These are status signals until a verified provider integration exists.

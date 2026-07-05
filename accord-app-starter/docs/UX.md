# Accord UX

## Experience goal

Accord should feel like a calm command center during high-stakes work. The interface reduces ambiguity, preserves context, and makes the next professional decision obvious.

## Primary navigation

- Start Listening: consent-gated conversation capture and the primary live-work entry point.
- Quick Capture: recap and recovery when a conversation was not recorded.
- AI Inbox: review and route external activity signals.
- Drafts: opportunity-first prepared work that may not yet have a transaction.
- Deal Desk: tracked transactions, deadlines, review states, and system-of-record history after capture or drafting.
- Settings / Contract Library: forms, versions, mappings, and custom templates.
- Settings / Privacy & Compliance: consent, access, retention, and audit controls.
- Settings / Transaction Memory: secondary administrative surface for training eligibility, redaction, and case review.
- Settings / E-Signature: preferred provider, send behavior, signed-document return, and connection status.
- Settings / Inbox Integrations: future provider connections and monitored mailbox scopes.
- Settings / Client Portal / Education: future, off-by-default administrative preview.

Contract management belongs in Settings, not in the everyday Deal Desk.

Every click must justify its existence. Accord performs safe organization and preparation before asking questions, asks only for facts it cannot determine, and reduces cognitive load before adding controls.

## Opportunity-first workflow

An opportunity can begin from live listening, a pasted transcript, voice or typed recap, uploaded document, email signal, e-signature signal, calendar/CRM signal, or recovered memory. It may remain unassigned while Accord reconstructs the work and prepares a reviewable draft. A full transaction is not required before draft preparation. Deal Desk becomes the tracking/system-of-record layer after drafting or an explicit save.

Recovery mode shows what Accord reconstructed, missing facts, attributable evidence, and the draft that can be prepared. Its primary action is **Prepare Draft**.

## AI Timeline and Activity Inbox

The AI Timeline tells the story of an opportunity or transaction across captures, identified facts, lookup suggestions, form decisions, missing questions, drafts, signatures, imported documents, final review, and deadlines. Every event shows time, source, confidence or deterministic status, linked evidence, and action needed.

The Activity Inbox collects email, e-signature, upload, recap, conversation, calendar, and CRM signals. Each signal offers Link to Opportunity, Create Opportunity, Dismiss, or Needs Review. A suggested match is never an approved fact.

Transaction Memory remains secondary to Start Conversation and Deal Desk. Its Settings UI must make archive/training separation, workspace scope, redaction status, consent/authorization, retention, and disable-learning controls immediately visible.

## Core transaction flow

1. Start a conversation and indicate whether it may relate to a new transaction, existing transaction, or an unknown destination.
2. Select conversation type and choose transcript paste, upload, or consent-gated recording.
3. For recording, verify consent for every required participant and the current context before capture begins. Consent on file informs the check but is not blanket permission.
4. Review the likely transaction, suggested parties/property/type, missing facts, confidence, and source evidence.
5. Prepare a draft directly from the capture; transaction setup is not a prerequisite.
6. Complete Auto Draft Review, resolve required facts, and review the recommended Utah form package.
7. Generate an editable draft package only after explicit agent approval.
8. Approve the package, then open the preferred provider review before sending for signature.
9. Return completed signed documents to Deal Desk for agent final review.
10. Save or track the work as a Deal Desk transaction and explicitly send/share to the other side.

The Deal Desk should prioritize Start Conversation, Unassigned Conversations, and Needs Review. Manual transaction creation remains available but is secondary to capture.

Unassigned captures and unsaved drafts may exist before a canonical transaction is created. Deal Desk becomes the tracking layer after draft creation; it must not force premature setup. The primary product path is `Start Conversation → Prepare Draft → Auto Draft Review → Generate Editable Draft Package → Approve Package → Send for Signature → Import Signed Documents → Agent Final Review → Deal Desk → Send/Share to Other Side`.

Signature send and external sharing are separate consequential actions. Both require clear status, specific confirmation, and a visible recovery path. Client Portal / Education remains secondary and off by default.

## Deal Desk Review

After capture and transaction assignment, Accord provides one prioritized review workflow before draft preparation:

- Queue blockers before warnings and ready-state confirmations.
- Show issue type, related record, extracted value, confidence, source evidence, flag reason, and recommended action together.
- Allow the agent to Approve, Edit, Mark Unknown, or Dismiss while preserving the decision in the future audit model.
- Separate facts required before draft from recommended optional facts and unknown/not-applicable facts.
- Show draft readiness as Not ready, Needs review, or Ready for draft with blockers distinct from warnings.
- Show every recommended form with requirement level, reason, missing fields, and approval status.

The readiness score is navigation support, not authority. “Ready for draft” still requires explicit agent approval before any package generation.

## Verified Lookup

When a fact is missing or low-confidence, Accord may suggest a future Verified Lookup using approved county recorder, county assessor, MLS/public listing, brokerage record, or uploaded-file sources. The UI must ask for approval unless trusted auto-lookup is explicitly enabled. Suggestions and results must distinguish transcript-derived facts from externally verified facts and show source, retrieval time, confidence, and mapped field.

## Review interaction

Each extracted material term should show value, confidence, source excerpt or provenance, and state: suggested, edited, approved, conflicted, or missing. Confidence is supporting evidence, not a substitute for review. High confidence must never auto-approve a legal term.

Bulk approval is acceptable only after all required fields and conflicts are visible. Material changes after approval must clearly reopen the approval state.

## Status model

Use plain, stable labels such as Draft, Extracting, Needs Review, Agent Approved, Broker Review, Ready to Generate, Generated, Executed, and Archived. Explain blocked states and give a recovery action.

## Account and scope clarity

Always show the active brokerage/team context when it changes available data or policy. Indicate the transaction owner and reviewers. Prevent accidental cross-team work with explicit scope switchers and confirmations.

## Responsive and accessible behavior

Desktop is primary for document review; tablet and mobile support triage, approvals, and status checks. Meet WCAG 2.2 AA targets, including keyboard operation, visible focus, semantic labels, sufficient contrast, non-color status cues, error summaries, and usable zoom.

## Sensitive actions

Recording, sharing, downloading, deleting, approving, generating, and changing form versions need specific confirmation and visible outcomes. Do not use dark patterns or vague buttons such as “Continue” when the action has legal or privacy consequences.

## Empty, loading, and failure states

Teach the next step in empty states. Long-running AI, transcription, generation, and sync work should be resumable and show progress without trapping the page. Failures must preserve entered work, identify what did not complete, and offer retry or manual fallback.

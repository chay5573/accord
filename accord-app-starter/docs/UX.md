# Accord UX

## Experience goal

Accord should feel like a calm command center during high-stakes work. The interface reduces ambiguity, preserves context, and makes the next professional decision obvious.

## Interaction governance

- One primary action per screen.
- Use progressive disclosure; show detail when the current decision needs it.
- Hide advanced controls unless they are required for the user's present task.
- Never ask users to organize information AI can infer later.
- Silence is a feature: never explain what the interface already makes obvious.
- Settings are for configuration, not workflow.
- Features should be sections of existing experiences unless a separate page is clearly justified.
- Apply the Red Pen Test and Friction Budget from `/docs/ProductPhilosophy.md` before adding a page, control, or field.

## Primary navigation

- Record: live consent-gated recording plus transcript, recap, forgotten-recording, and upload alternatives.
- Review & Send: generated paperwork fields, evidence, editable values, blockers, signature readiness, and provider-neutral send confirmation.
- Coordinate: active transaction coordination after documents exist, including timeline, tasks, dates, signatures, receipts, unresolved items, documents, and contextual Client View.
- Settings: Contract Library, E-Signature, Inbox Integrations, Transaction Memory, Accord Guide governance, Teach Accord, Privacy & Compliance, and Office Profile.

Client Portal is not a primary agent navigation item. Accord Guide appears inside Coordinate or transaction detail as Client View / Client Experience.

Contract management belongs in Settings, not in the everyday Deal Desk.

Every click must justify its existence. Accord performs safe organization and preparation before asking questions, asks only for facts it cannot determine, and reduces cognitive load before adding controls.

## Opportunity-first workflow

An opportunity can begin from live listening, a pasted transcript, voice or typed recap, uploaded document, email signal, e-signature signal, calendar/CRM signal, or recovered memory. It may remain unassigned while Accord reconstructs the work and prepares a reviewable draft. A full transaction is not required before draft preparation. Deal Desk becomes the tracking/system-of-record layer after drafting or an explicit save.

Recovery mode shows what Accord reconstructed, missing facts, attributable evidence, and the draft that can be prepared. Its primary action is **Prepare Draft**.

## AI Timeline and Activity Inbox

The AI Timeline tells the story of an opportunity or transaction across captures, identified facts, lookup suggestions, form decisions, missing questions, drafts, signatures, imported documents, final review, and deadlines. Every event shows time, source, confidence or deterministic status, linked evidence, and action needed.

The Activity Inbox collects email, e-signature, upload, recap, conversation, calendar, and CRM signals. Each signal offers Link to Opportunity, Create Opportunity, Dismiss, or Needs Review. A suggested match is never an approved fact.

## Accord Guide

Accord Guide is transaction-, stage-, role-, jurisdiction-, and document-aware. The client roadmap, current-stage education, personalized answers, inline document question marks, and video recommendations use only approved client-visible material. Agent preview shows exactly what the client would see before access is shared. It is not a generic FAQ or video page, and judgment questions visibly route to the agent.

Transaction Memory remains secondary to Start Conversation and Deal Desk. Its Settings UI must make archive/training separation, workspace scope, redaction status, consent/authorization, retention, and disable-learning controls immediately visible.

## Core transaction flow

1. Capture the conversation or add a transcript, recap, recovered memory, note, or document. Do not ask the user to classify or file it first.
2. Accord infers people, property, intent, transaction match, terms, defaults, and package recommendations.
3. Prepare shows readiness and only true blockers. Evidence, forms, confidence, lookups, and signature detail stay collapsed until requested.
4. The agent generates and approves an editable draft package, then opens provider review to send for signature.
5. Signed documents return to Manage / Deal Desk for final review, deadlines, activity, documents, and client questions.

The Deal Desk should prioritize Start Conversation, Unassigned Conversations, and Needs Review. Manual transaction creation remains available but is secondary to capture.

Unassigned captures and unsaved drafts may exist before a canonical transaction is created. Deal Desk becomes the tracking layer after draft creation; it must not force premature setup. The primary product path is `Start Conversation → Prepare Draft → Auto Draft Review → Generate Editable Draft Package → Approve Package → Send for Signature → Import Signed Documents → Agent Final Review → Deal Desk → Send/Share to Other Side`.

Signature send and external sharing are separate consequential actions. Both require clear status, specific confirmation, and a visible recovery path. Client Portal remains contextual and client-facing; administrative Guide controls remain in Settings.

## Simplified page contracts

- Capture has one primary action: **Capture Conversation**. It asks no destination, conversation type, or transaction-setup questions.
- Prepare has one primary action: **Generate Editable Draft Package**. It combines review, missing facts, recommended forms, defaults, evidence, lookups, and signature readiness with progressive disclosure.
- Manage answers **What needs my attention?** with one urgent item, recent captures/drafts, active transactions, and upcoming deadlines. New activity and secondary modules remain collapsed.

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

## Record -> Review & Send -> Coordinate UX update

Primary navigation is now limited to:

- **Record**: consent-gated recording plus paste transcript, quick voice recap, forgotten-recording recovery, and upload placeholders.
- **Review & Send**: all generated paperwork fields, transcript evidence, editable values, blockers, signature readiness, and provider-neutral send confirmation.
- **Coordinate**: active transaction coordination after documents exist, including timeline, tasks, dates, signatures, receipts, unresolved items, documents, and contextual Client View.
- **Settings**: Contract Library, E-Signature, Inbox Integrations, Transaction Memory, Accord Guide governance, Teach Accord, Privacy & Compliance, and Office Profile.

Client Portal is not a primary agent navigation item. Accord Guide appears inside a transaction or Coordinate view as **Client View** or **Client Experience**.

Review & Send must show generated value, form/document name, section reference, confidence, status, evidence link, and edit placeholder for every contract field. The transcript remains visible at the bottom, and evidence links should scroll/highlight the supporting snippet.

Accord is transaction-centric, not contact-centric. It integrates with CRMs but does not replace them.

## Client View simplification

Client View should feel like the client's transaction home, not an education dashboard. Use client-friendly titles and short copy.

The client home should prioritize:

- Transaction status.
- Important dates.
- Documents.
- To-do list.
- Ask Accord chat.
- Education/videos only when relevant.

Avoid exposing internal labels such as Accord Guide, Agent Review Mode, Why these recommendations, or Client approval portal. Hide recommendation logic and source policy language unless an agent/admin debug context requires it.

Document Help should use a document/PDF-viewer style mock. The document remains central; clients click highlighted sections or question markers to open one explanation panel. Do not show multiple education panels or large recommendation grids by default.

Agent-facing Coordinate views should show client activity: documents viewed, questions asked, videos watched, open to-dos, unanswered/escalated questions, and a Client View preview link.

## UX polish baseline

Record is the simplest page in Accord. It uses one stable page shell and four input modes: Record Conversation, Paste Transcript, Quick Voice Recap, and Upload Notes / Documents. These are variations of one workflow, not separate destinations. Each mode has one obvious primary action, and supporting text should be removed when the control already communicates the action.

User-initiated capture can move directly toward paperwork preparation for human review. Passive signals from inbox, calendar, e-signature, CRM, or other external systems may recommend legal-document creation, but they may not create or draft legal documents without explicit agent action.

Review & Send should feel like exact paperwork review, not a dashboard or AI summary. It must show complete package names, multiple review packages when present, Needs Review first, Full Paperwork Review in document/section/field order, exact generated values, exact checkbox/radio selections, itemized addendum provisions, and a Preview Paperwork action. Needs Review and Full Paperwork Review reference the same underlying records so edits update both surfaces immediately. Source links open the complete transcript or applicable source detail and highlight the exact supporting content.

No legal document may be sent while required fields are unresolved. Package readiness should show document count, unresolved required items, unresolved recommended-review items, and signature readiness; percentages are secondary.

Coordinate is the transaction coordinator command center. It uses a sorted to-do list, transaction-flow statuses, outbound packet/signature follow-up, a monthly calendar mock, prominent AI Timeline, and a lightweight Customize layout placeholder.

Settings includes Storage & Files preferences for Accord Cloud, OneDrive, and Local computer/export folder. Local export is mock-only; browsers may require downloads, user-selected folders, or a future desktop companion for true local saving.

## Latest correction pass

- Record icons and action buttons must be visually centered; the active submit action appears first/left in the mode action area.
- Review & Send groups required attention above ready fields. Missing, needs-review, low-confidence, or confirmation-required defaults use row-level warning treatment.
- Source links must open the transcript section and highlight the exact snippet for every generated field.
- Save as Preference opens a small mock workflow for personal/team/brokerage defaults. It is a rules/preferences system, not direct AI model training.
- Coordinate answers "What needs attention?" and keeps Customize layout as a small top-right control. Tasks, follow-ups, dates, documents, and timeline affordances should link to the relevant transaction/action.
- Client documents include mock Download and Print actions while real PDF/download generation remains out of scope.

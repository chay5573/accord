# Accord UX

## Experience goal

Accord should feel like a calm command center during high-stakes work. The interface reduces ambiguity, preserves context, and makes the next professional decision obvious.

## Primary navigation

- Deal Desk: transactions, deadlines, review states, and exceptions.
- New Transaction: create the canonical container before capture or generation.
- Office Profile: identity, defaults, vendors, and playbook.
- Settings / Contract Library: forms, versions, mappings, and custom templates.
- Settings / Privacy & Compliance: consent, access, retention, and audit controls.

Contract management belongs in Settings, not in the everyday Deal Desk.

## Core transaction flow

1. Create a transaction and establish ownership, representation, and property context.
2. Choose conversation capture, transcript paste, or manual entry.
3. If recording, complete the consent gate before any capture begins.
4. Review extracted facts beside their source evidence and confidence.
5. Resolve conflicts and required missing information.
6. Review the recommended Utah form package and reasons.
7. Explicitly approve terms; request broker review if needed.
8. Generate and save a versioned package to Accord Cloud.

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

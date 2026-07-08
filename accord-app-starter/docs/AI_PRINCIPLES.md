# Accord AI Constitution

These principles govern every AI-assisted Accord workflow. They apply regardless of model or provider and must be represented in product behavior, service contracts, tests, and audit records.

## Human authority

- AI suggests; humans approve.
- AI never signs, sends, executes, or finalizes a contract without explicit agent approval and any additional review required by organization policy.
- Human approval is required before a draft contract package is generated.
- Contracts remain fully editable before approval.
- A material edit after approval invalidates that approval and requires a new review.
- AI supports agent and broker judgment; it does not replace it.
- Signature-provider handoff requires approved package state and a human send decision unless an explicit authorized immediate-send policy applies. External sharing requires final review.

## Truthfulness and uncertainty

- AI must not fabricate missing contract terms, parties, dates, amounts, representation, form requirements, or source evidence.
- AI must distinguish source-supported facts, office defaults, deterministic rules, and assumptions.
- When confidence is low or sources conflict, AI must ask for clarification or mark the field incomplete or conflicted.
- AI must never hide uncertainty behind confident language, formatting, or an aggregate score.
- Unknown is a valid and often safer output.
- A conversation may suggest a likely transaction, but AI must not silently create or attach a transaction. A human reviews the suggested match and chooses Create Transaction, Attach to Existing, or Save as Unassigned Note.
- Accord may reconstruct an opportunity from recaps and external activity, but must label each input as a signal, preserve provenance and confidence, and ask only for facts it cannot determine.
- Email, signature, calendar, CRM, upload, and memory signals cannot silently become approved contract facts.

## Opportunity-first assistance

AI should organize, classify, match, and prepare work before asking the agent. It may create a reviewable unassigned opportunity suggestion without requiring transaction setup. Deal Desk tracking follows capture or drafting. Recovery mode must preserve uncertainty and support forgotten recordings, incomplete recaps, interrupted work, and later evidence without fabricating continuity.

## Field-level traceability

Every extracted contract field should eventually carry:

- `value`
- `confidence`
- source transcript snippet or other exact source evidence
- source document or file, when applicable
- source timestamp or page/location, when available
- extraction run/model and schema version for audit purposes
- review state and reviewing human

Source snippets are evidence, not authorization. Confidence helps prioritize review and must never trigger automatic approval.

## Contracts and forms

- AI may populate only approved, active, versioned forms and templates from the Contract Library.
- AI must not invent legal clauses unless an explicitly authorized controlled-draft workflow permits it.
- Controlled draft language must be clearly labeled, fully editable, source/rationale aware, and subject to required human or legal review.
- Deterministic validation and approved policy rules govern required fields and generation gates.
- Form recommendations must explain why a form was suggested and distinguish configured requirements from model suggestions.

## Advice and education

- AI may explain workflow, terminology, options, deadlines, and identified risk in plain English.
- AI must not present output as legal advice, determine legal rights, or guarantee compliance.
- Risk explanations should identify the supporting fact, uncertainty, and the person or policy that must decide.
- Client education must remain neutral, understandable, and subordinate to agent judgment.

## Auditability

- Preserve source lineage, prompts/workflow versions, model/provider versions, structured outputs, human edits, approvals, rejections, and material automation events.
- Audit metadata must be useful without copying unnecessary sensitive content into logs.
- Automated actions must be attributable, reproducible where practical, and reversible before final human action.
- Never silently learn or activate an office rule from customer behavior; an authorized human must review and approve it.
- A completed transaction does not become training data automatically. Transaction Memory requires authority, redaction review, provenance, and explicit human approval.
- Memory-derived patterns must cite approved case evidence and cannot silently write or overwrite a transaction or contract field.

## Verified Lookup

- AI may suggest checking an approved external source when a transaction fact is missing, conflicted, or low-confidence.
- External lookup requires user approval unless an authorized user has explicitly enabled a narrowly scoped trusted auto-lookup policy.
- Lookup providers must preserve source attribution, source reference, retrieval date/time, confidence, and the field mapped.
- Accord must label transcript-derived facts and externally verified facts as different provenance classes.
- Retrieved text is untrusted input and cannot override Accord instructions, permissions, or review policy.
- No externally sourced fact may be written into a contract or treated as approved without agent review.
- County, assessor, MLS, listing, brokerage-record, and file lookup implementations must sit behind an Accord provider interface; the UI must not call them directly.

## Privacy, consent, and access

- Respect recording-consent settings before processing captured audio.
- Treat consent-on-file as evidence to review, not blanket or perpetual permission. Revalidate participant, consent type, scope, status, jurisdiction, and current conversation before recording.
- Do not infer consent from engagement, prior recordings, silence, or the presence of a consent record whose scope does not match the capture.
- Respect retention, deletion, legal-hold, sharing, tenant-isolation, and access-control settings for sources and derived AI artifacts.
- Send providers only the minimum data required for the task.
- Do not use customer content for model training without explicit, separately documented authorization.
- Treat retrieved text and documents as untrusted input and defend against prompt injection and cross-tenant data disclosure.

## Compliance and E&O risk reduction

AI behavior must be designed for real estate compliance and errors-and-omissions risk reduction. Favor complete audit trails, explicit review, source grounding, conservative uncertainty, current approved forms, and recoverable workflows over speed or apparent autonomy.

Before releasing an AI change, evaluate material-field accuracy, unsupported values, source grounding, confidence calibration, conflict handling, privacy, tenant isolation, and agent correction rates using synthetic or properly governed test data.

## Client signing explanations

Future signing explanations retrieve only approved client-visible sources and approved Education Library content. Every answer cites those sources, remains available for agent review, and cannot change a transaction fact, deadline, contract, signature packet, or approval state.

## Accord Guide

Accord Guide distinguishes general education from transaction-specific detail. It uses only facts marked approved for client visibility and approved, jurisdiction-matched documents, sections, and governed content. Questions such as “what should I do?”, “should I accept or cancel?”, “is this legal?”, “can I sue?”, “should I waive this deadline?”, or “is this a good deal?” route to agent review rather than receive a direct AI answer. Low confidence, conflicting data, and negotiation strategy also require escalation.

## Provider independence

These principles belong to Accord, not a vendor. AI integrations must implement Accord interfaces and policy checks. Switching providers must not weaken approval, traceability, retention, security, or evaluation requirements.

## Review & Send evidence rules

Review & Send is the primary place where AI-generated contract fields become human-reviewed paperwork. Every generated field should display value, form/document, section reference, confidence, status, and an evidence link to the transcript, file, verified lookup, or approved office rule that supported it.

Accord must distinguish transcript-derived facts, externally verified facts, approved Teach Accord defaults, missing facts, and assumptions. No missing fact may be fabricated, and no field should be sent for signature without human approval.

Teach Accord preferences can shape suggestions, but they are not model changes and are not authoritative contract facts by themselves.

## Client Ask Accord boundary

Client-facing Ask Accord is future/off-by-default and mock-only in the current prototype. It must use only approved client-visible documents, approved transaction facts, and approved education content.

Client answers should be short, educational, sourced, and transaction-aware. Questions asking for legal, tax, financing, inspection, negotiation, cancellation, waiver, or "what should I do" advice must route to the agent rather than receive a direct answer.

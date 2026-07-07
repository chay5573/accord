# Transaction Memory

## Purpose

Transaction Memory allows Accord to learn reusable, organization-approved patterns from completed transactions without treating the raw transaction archive as training data. It can improve field mapping, form selection explanations, timeline expectations, office playbook suggestions, and evaluation coverage while preserving privacy, ownership, provenance, and human authority.

Transaction Memory is not enabled merely because a transaction is closed or stored in Accord Cloud. A case enters the Training Library only after authority, redaction, review, and explicit approval requirements are satisfied.

## What Accord may learn

From approved and appropriately redacted cases, Accord may learn:

- Repeated mappings between canonical fields and approved form locations.
- Document sequences, form usage patterns, field provenance, deadline patterns, addendum triggers, repair-language structures, and negotiation/document-revision patterns.
- Office defaults and authoritative-source preferences that an authorized reviewer approves for the applicable scope.
- Which approved forms were used for particular transaction fact patterns.
- Non-client-specific workflow sequences and checklist steps.
- Human-approved office playbook rules and exceptions.
- Common extraction failures and synthetic/de-identified evaluation examples.
- Version differences between approved documents and the human decisions that resolved them.

Patterns must be supported by source cases, scoped to agent/team/brokerage ownership, reviewed by an authorized human, and expressed without unnecessary personal details.

## What must not be learned or retained unnecessarily

- Social Security numbers, tax identifiers, government ID numbers, account/routing numbers, wire instructions, authentication data, signatures, or secrets.
- Driver's licenses, tax returns, bank account details, unnecessary identity documents, and private client strategy not approved for learning.
- Raw client communications or freeform notes when a de-identified fact/pattern is sufficient.
- Negotiation strategy, subjective client characterizations, or private brokerage commentary unless explicitly authorized for a narrowly defined internal use.
- Protected-class information or inferred sensitive traits.
- Client data from another team or brokerage.
- Data whose retention, license, contract, consent, or legal-hold status prohibits learning use.

Data minimization applies before import, during analysis, in learned patterns, in logs, and in exports.

## PII/PIIP safeguards

Accord treats identity data, contact details, precise addresses linked to people, financial data, signatures, freeform notes, and transaction documents as confidential. Before learning use:

1. Classify sensitive findings.
2. Redact or replace values with stable case-local placeholders where practical.
3. Separate raw restricted artifacts from the redacted learning representation.
4. Prevent cross-tenant retrieval and pattern generation.
5. Review residual re-identification risk, including combinations of otherwise ordinary fields.
6. Preserve only the minimum evidence needed to validate the pattern.

## Redaction requirements

- Redaction is policy-versioned, repeatable, and audited.
- High-risk categories require human review before approval.
- Redacted output must be a new immutable version; original archive documents are not overwritten.
- Failure, uncertainty, or incomplete coverage leaves the case in `needs_review` and blocks approval.
- Redaction must cover document text, metadata, embedded fields, filenames where necessary, derived AI artifacts, thumbnails, and exported examples.
- Learned summaries must be checked separately for leakage even when source documents were redacted.

## Consent and authorization

- An authorized agent, team administrator, brokerage administrator, or broker reviewer must have authority over the source transaction and learning scope.
- Client consent or another lawful authorization must be recorded where required by law, contract, brokerage policy, or the intended use.
- Workspace-level policy does not silently convert every archive item into training data.
- Every case requires an explicit human approval before training eligibility.
- Revocation or policy change removes eligibility and future retrieval, subject to documented legal obligations and backup aging.

## Ownership and scope

The brokerage or team that lawfully controls the transaction data owns and governs its Training Library scope. Agent-owned data cannot be promoted to a team or brokerage library without authority. Patterns inherit the narrowest approved scope. Raw training cases and learned patterns must never be exposed across unrelated teams or brokerages.

## Audit requirements

Append-only audit events cover import request, source access, case view, analysis, sensitive-data finding, redaction, redaction review, approval/denial, learned-pattern approval, export, removal, deletion, consent change, and policy change. Events include actor, workspace, case, action, timestamp, outcome, policy/model version, and safe references without duplicating raw sensitive content.

The domain records tenant, team, and brokerage ownership on every case and audit entry. Raw transaction data is never exposed to unrelated users, and no approved pattern can cross a brokerage boundary without separately documented lawful authority.

## Retention and deletion

- Archive retention and training eligibility are separate policies.
- Removing a case from training immediately blocks new pattern generation and future retrieval from the Training Library.
- Approved patterns derived from a removed case must be reevaluated and withdrawn when they no longer have sufficient authorized evidence.
- Deletion covers learning representations, indexes, derived artifacts, exports, caches, and provider copies where applicable.
- Backup expiration and legal holds follow documented service levels; the product must not promise instant physical destruction where unavailable.

## Evidence classes

### Transaction archive

The official retained transaction record. It preserves source documents and audit history under record-retention policy. Archive presence does not grant training eligibility.

### Training Library

A separately governed collection of authorized, redacted cases and approved patterns. It is tenant-scoped, least-privilege, removable, and audited.

### Form mapping examples

Minimal examples showing how canonical fields map to a specific approved form version. Prefer synthetic or de-identified values. They do not represent office policy.

### Office playbook examples

Human-approved examples supporting an operational rule. They are scoped to the approving organization and never activated silently from frequency alone.

### AI prompt/evaluation examples

Synthetic or appropriately de-identified cases used to test extraction, uncertainty, provenance, and safety. Evaluation authorization does not authorize model training or production retrieval.

## Verified Lookup relationship

Verified Lookup and Transaction Memory are distinct evidence sources. Lookup retrieves a fact from an approved external source for a specific transaction; Transaction Memory supplies approved internal patterns or examples. Both require source attribution and auditability. Neither may silently overwrite a contract field, and every externally verified or memory-derived value requires agent review before contract drafting.

## Approval state machine

`imported` → `pending_redaction` → `pending_approval` → `approved`

A case may move to `excluded` at any point. Approval requires authority, consent/authorization where applicable, completed redaction review, retention policy, source provenance, and reviewer identity. Material source or policy changes invalidate approval and require re-review.

## Teach Accord relationship

Teach Accord preferences are governed playbook rules, not raw transaction memory and not direct model training. Transaction Memory may suggest recurring patterns for review, but a human or admin must approve any preference before Accord applies it broadly.

Approved Teach Accord rules can appear in Review & Send as default-applied evidence, but they do not replace transcript evidence, external verification, or agent approval for contract fields.

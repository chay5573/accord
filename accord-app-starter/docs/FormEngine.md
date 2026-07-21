# Form Engine

## Purpose

The form engine converts approved canonical transaction data into a deterministic, reviewable package of versioned real estate forms. It does not decide legal strategy and does not bypass agent approval.

## Contract Library ownership

The Contract Library is managed in Settings. Authorized users can view form provenance, jurisdiction, version, effective dates, mapping coverage, validation status, license status, and whether a form is active. Brokerage custom forms are uploaded and governed there—not from the Deal Desk.

## Template lifecycle

1. Acquire a form from an authorized source and record licensing/provenance.
2. Create an immutable template version with checksum and effective dates.
3. Map fields to the canonical transaction schema.
4. Define transforms, formatting, required conditions, and overflow behavior.
5. Test with fixtures and render visual comparisons.
6. Approve and activate the version for a scoped jurisdiction/account.
7. Retire rather than overwrite superseded versions.

Existing generated packages retain the exact template and mapping versions used.

## MVP Utah package

Start with a validated subset required for the primary buyer-offer workflow, such as the Utah REPC and selected addenda/disclosures. The starter UI’s counts and listed versions are placeholders until form rights, current official versions, mappings, and QA are verified.

## Recommendation engine

Recommendations combine transaction facts, representation, Utah rules, form metadata, and office policy. Each recommendation must state why it appears and whether it is required by configured policy, conditionally suggested, or manually selected. Rules should be versioned and testable; model output alone cannot mark a form legally required.

## Field mapping

Mappings target canonical paths such as `transaction.purchase_price.amount`, not UI component names or raw transcript phrases. A mapping may define formatting, checkbox/radio values, multi-party repetition, date rules, conditional visibility, and overflow pages.

Review & Send must display exact paperwork intent from the form engine model. It should not summarize generated clauses, included items, compensation references, deadlines, or addenda. Every text field, date, money value, name, address, legal description, initials field, radio selection, checkbox, yes/no selection, included/excluded item, financing choice, deadline, brokerage field, signature assignment, addendum reference, addendum paragraph, disclosure acknowledgement, and form-specific option needs a mappable field definition when it appears in production forms.

Every mapped field or provision has one review record shared by Needs Attention, All Fields Review, editable Paperwork, and generation input. The review record preserves the current exact value, source references, required/material flags, confidence, transaction risk, persisted review status, approval events, and revisions. Temporary editor state may differ from the approved snapshot, but it must not change queue order or persisted status. Missing values and conflicts sort before lower-risk review work. A user edit requires renewed approval, and only Save & Approve creates the new approved snapshot.

Rendered paperwork uses stable document, page, section, and field mappings rather than a separate preview value model. Inline text inputs, checkbox/radio selections, and addendum provisions write to the same runtime record as field-by-field review. Future PDF generation must consume only the approved snapshot, never an unapproved editor draft.

Form and document navigation uses immutable package, document, section, and field identities to build stable unique anchors. A document link must open the correct document at its beginning; form display names or list positions are not identifiers.

Addendum provisions are separate ordered records. Show addendum number, document title, exact paragraph wording, numbered item order, source, approval state, and review status. Do not merge multiple provisions into a generalized summary.

Official form-library ingestion, licensing, immutable template versions, and validation against the licensed forms remain production prerequisites. A representative mock schema must be labeled as incomplete and must not be described as complete official Utah form coverage.

## Real form ingestion and validation

The current Review & Send mock is not sufficient for production accuracy validation. Production requires official blank forms obtained with licensing or usage authorization, immutable version tracking, complete field and option mapping, realistic rendering, and comparison against approved completed transactions. Accord must not claim form completeness until every field, checkbox, radio selection, initials block, signature assignment, free-text area, and addendum area is mapped.

The validation harness is:

```text
Blank official form
+ conversation/transcript
+ approved completed transaction
= expected Accord output
```

For every form version, measure field accuracy, checkbox accuracy, form-selection accuracy, addendum wording accuracy, omitted-field rate, false-positive form rate, and source-link accuracy. Record every mismatch against the exact form version and mapping revision. Refine deterministic mappings, conditions, and source rules until rendered output matches the approved transaction fixture.

Uploaded paperwork review is a separate comparison workflow. It may flag likely missing fields, unchecked requirements, inconsistent names or dates, signature/initial gaps, addendum mismatches, approved-value differences, or missing documents. Findings remain suggestions; dismissal, resolution, and correction preparation require explicit human actions, and the source document is never silently modified.

## Generation gate

Generation requires:

- An active, valid template version.
- Required fields present and valid.
- Conflicts and material unknowns resolved.
- Current agent approval snapshot.
- Any configured broker review satisfied.

Generation produces a new immutable package version, never silently replaces a prior artifact, and records input hash, forms, mappings, approvers, generator version, and output checksums.

## Quality assurance

Use schema tests, mapping coverage tests, known-answer fixtures, PDF field inspection, and rendered page image comparisons. Test long names, multiple parties, currency/date formatting, missing optional fields, page overflow, flattened output, and accessibility/readability. No template becomes active based only on a successful happy-path render.

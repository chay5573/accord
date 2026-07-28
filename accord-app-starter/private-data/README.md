# Private Validation Data

This directory is local-only. Git ignores its contents except for this safety README. Never force-add validation cases or completed transactions.

## Handling rules

- Use one folder per validation case.
- Prefer redacted working copies.
- Never store passwords, account credentials, bank account numbers, routing numbers, Social Security numbers, wire instructions, or unneeded signatures.
- Remove or mask personal information that is not necessary to validate form generation.
- Preserve only enough transaction facts to test fields, selections, addenda, package grouping, and source links.
- Do not delete or modify original source files unless Calvin explicitly authorizes it.
- Create working copies for processing and keep originals unchanged.
- Do not upload these files to third-party services without explicit approval.
- Do not use real transaction files for model training without separate, explicit authorization.

## Recommended case structure

```text
case-001-example/
├── case-manifest.json
├── 01-sources/
├── 02-blank-forms/
├── 03-expected-output/
├── 04-validation/
└── 05-redaction/
```

Before any case is inspected or processed, confirm the approved inventory, authority to use the material, access scope, retention policy, and redaction plan.

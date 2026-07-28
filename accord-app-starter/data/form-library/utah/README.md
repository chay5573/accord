# Utah Form Library

This directory is the future inventory for authorized blank Utah forms and their non-sensitive metadata.

## Directory roles

- `active/` — currently approved forms.
- `archived/` — superseded or retired forms retained for version-aware processing and historical validation.

Do not add or inspect form contents as part of directory setup. Confirm licensing or usage authorization before committing any blank form.

## Required form metadata

Each inventory record must include:

- `form_id`
- `official_name`
- `short_name`
- `jurisdiction`
- `effective_date`
- `version`
- `filename`
- `status`
- `source`
- `licensing_status`
- `fillable_pdf_status`
- `page_count`
- `mapping_status`
- `reviewed_by`
- `reviewed_at`

Do not guess a version or effective date. Use information printed on the form or supplied by an authorized source, and record unresolved values as unknown. A form is not production-ready until its licensing, exact version, and complete field mapping are independently verified.

The synthetic shape in `manifest.example.json` is illustrative only and is not an authoritative form record.

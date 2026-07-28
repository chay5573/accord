# Form Ingestion

This document defines the future controlled process for adding official forms to Accord. It does not authorize ingestion, mapping, or production use.

## Preconditions

- Confirm the source and authorization to possess, use, process, and, if applicable, commit each blank form.
- Keep an inventory of filenames and metadata without guessing versions or effective dates.
- Keep real transaction material under the Git-ignored `private-data/` tree.
- Follow [Form Engine](FormEngine.md), [Security](SECURITY.md), [Compliance](Compliance.md), and [Validation Dataset](ValidationDataset.md).

## Stage 1 — Inventory

- Inventory files without altering originals.
- Identify official names, versions, effective dates, jurisdictions, sources, and licensing status.
- Determine whether each PDF contains native fillable fields.
- Record unknown or unresolved metadata explicitly.

**Required approval gate:** Codex must not begin mapping forms until Calvin reviews and approves the file inventory.

## Stage 2 — Field mapping

- Map every fillable field, checkbox, radio selection, initials block, signature block, free-text area, and addendum area.
- Create immutable, versioned `FormSchema` records.
- Preserve the exact source form version and stable field identities.

## Stage 3 — Review & Send linkage

- Link each Review & Send value to an exact official form field ID or coordinate.
- Preserve value provenance, confidence, review state, and agent approval.
- Treat unmapped or ambiguous values as blockers, never silent defaults.

## Stage 4 — Rendering

- Render completed paperwork only from an approved, versioned field snapshot.
- Keep rendering behind a provider interface.
- Preserve original blank forms and generated-output versions.

## Stage 5 — Validation

- Compare rendered output with approved completed transaction examples.
- Record every mismatch rather than altering expected output to hide an error.
- Track results by exact form version using the metrics in [Validation Dataset](ValidationDataset.md).

No stage may bypass licensing, privacy, access-control, retention, audit, or human-approval requirements.

# Accord Data Directories

This repository separates non-sensitive development assets from local-only validation material.

## Repository-safe data

- `form-library/` is reserved for approved blank forms and non-sensitive form metadata. Blank forms may be subject to licensing or usage restrictions. Do not commit a form until authorization to store and use it in the repository is confirmed.
- `validation-fixtures/synthetic/` is for synthetic or fully de-identified test cases that are safe to commit.

## Local-only data

Real or redacted transaction examples belong under `../private-data/`. That directory is local-only and must never be pushed to Git. Its contents may include confidential transaction material even after redaction.

## Prohibited repository data

Do not store raw passwords, authentication secrets, bank or routing numbers, wire instructions, Social Security numbers, account numbers, signatures, or other unnecessary sensitive data anywhere in this repository.

See [Form Ingestion](../docs/FormIngestion.md), [Validation Dataset](../docs/ValidationDataset.md), and the [private-data safety rules](../private-data/README.md) before adding files.

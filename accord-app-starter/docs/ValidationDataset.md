# Validation Dataset

Accord’s future known-answer validation harness is:

> blank forms + complete transcript and supporting sources + office preferences + approved completed paperwork = expected Accord output

Validation cases are controlled evidence sets, not general training data. Real or redacted cases remain local-only under `private-data/` unless a separately approved secure system replaces that workflow.

## Required case contents

- full transcript;
- supporting records actually used;
- blank form references;
- completed expected forms;
- expected fields;
- expected package composition;
- reviewer notes; and
- redaction log.

Use the case layout described in [Private Validation Data](../private-data/README.md). Preserve source provenance, versions, reviewer decisions, and authorization records.

## Recommended validation sequence

1. Standard buyer offer.
2. Listing paperwork.
3. Counteroffer.
4. Multiple addenda in one package.
5. Inspection response.
6. Financing or settlement extension.
7. Cancelled transaction followed by a new buyer.
8. Unrepresented buyer.
9. Entity or trust transaction.
10. Uploaded third-party paperwork review.

## Metrics

- correct form selection;
- false-positive form rate;
- omitted required forms;
- exact field accuracy;
- checkbox and radio accuracy;
- date accuracy;
- monetary-value accuracy;
- addendum numbering;
- addendum wording;
- package grouping;
- source-link accuracy;
- duplicate-transaction prevention;
- number of agent corrections; and
- review time.

Report metrics by exact form version and case type. Do not combine results in a way that hides version-specific failures. Production thresholds, reviewer authority, and release criteria remain unresolved until approved by product, compliance, and form owners.

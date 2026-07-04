# Accord AI

## Role of AI

AI accelerates understanding; it does not hold authority. Accord uses AI to extract structured deal facts, identify ambiguity, recommend possible forms, summarize changes, and help explain next steps. Deterministic validation and human approval govern contract output.

## Processing pipeline

1. Accept an authorized transcript or structured source.
2. Minimize/redact content not required for the task.
3. Extract into a versioned schema with strict structured output.
4. Validate types, ranges, dates, and internal consistency.
5. Attach source evidence and calibrated confidence to each fact.
6. Detect conflicts and missing required information.
7. Apply deterministic form and office-policy rules.
8. Present suggestions for agent edit, acceptance, or rejection.
9. Persist the human-reviewed snapshot and audit event.

## Safety boundaries

- Never auto-approve terms or generate a final package from unreviewed output.
- Never invent missing legal names, dates, amounts, representation, or form requirements.
- Clearly distinguish source fact, office default, deterministic rule, and model suggestion.
- Treat transcript and uploaded document text as untrusted input, including prompt-injection attempts.
- Do not expose another transaction, tenant, hidden prompt, or credential through retrieval or tool use.
- Do not characterize output as legal advice.

## Provider design

Use a server-side `AiExtractionProvider` boundary. Record provider, model, prompt/workflow version, schema version, run ID, latency, and evaluation-safe metadata. Provider fallback must preserve output contracts and never weaken privacy requirements silently.

## Privacy

Send only necessary content. Prefer provider settings with no training on customer data and appropriate retention controls. Keep API keys server-side. Separate customer content from analytics, redact logs, document subprocessors, and support deletion of source and derived artifacts.

## Evaluation

Maintain a de-identified or synthetic Utah test set covering common deals, ambiguous language, corrections, multiple parties, conditional terms, adversarial instructions, and missing facts. Measure per-field precision/recall, material-error rate, unsupported-value rate, source-grounding accuracy, calibration, and agent correction rate.

Release gates should prioritize zero-tolerance material hallucinations over aggregate accuracy. Evaluate every model, prompt, schema, and rule change before deployment and monitor drift afterward.

## Office learning

Accord may suggest a reusable office rule from repeated approved behavior, but it must never silently infer and activate one. An authorized user reviews the proposed rule, scope, wording, and effective date in Settings.

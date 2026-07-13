# Accord Product Philosophy

This is Accord's governing product document and product North Star. Every feature, screen, workflow, backlog item, and technical decision must preserve the low-friction **Capture → Prepare → Manage** vision.

## North Star

> “An agent should be able to finish a client conversation, spend less than three minutes reviewing Accord’s work, click Send for Signature, and return to serving clients.”

## Product principles

### Accord is an AI transaction assistant

Accord is not primarily a transaction management system. It behaves like an intelligent transaction coordinator: it listens, reconstructs context, prepares work, identifies uncertainty, and returns decisions to the agent.

### Software should disappear

The workflow matters more than the interface. Automation should feel invisible, external systems should feel like extensions of Accord, and the agent should remain focused on the client rather than the software.

### Conversations come first

Conversations are the natural source of transaction work. Transactions are a byproduct of captured and prepared work, not the required starting point.

### AI organizes; people decide

The software should think first. AI gathers, classifies, matches, drafts, and explains. People approve facts, documents, signatures, sharing, and professional judgment.

### Every click must earn its place

Every click, field, page, and decision must remove more friction or risk than it creates. Reduce cognitive load before adding capability.

### Never ask what can be inferred

Ask only for facts Accord cannot safely determine from attributable evidence. Do not make users organize information that can be inferred later.

### One obvious next step

Each screen has one clear primary action. Secondary actions remain subordinate, advanced controls use progressive disclosure, and blocked states explain the shortest recovery path.

### Calm software wins

Accord should be composed, predictable, and quiet under pressure. It should not celebrate consequential actions, flood the agent with controls, or make uncertainty feel like failure.

### Silence is a feature

Never explain what the interface already makes obvious. If a button, field, tab, or status label communicates the action, supporting copy should earn its place or be removed.

### Deal Desk begins after the paperwork

Capture and preparation may happen before a transaction record exists. Deal Desk becomes the tracking and system-of-record layer after documents are drafted or the work is explicitly saved for management.

### Teach, don't overwhelm

Accord Guide and agent-facing explanations provide timely, contextual education. They reveal the right explanation at the right stage rather than presenting a generic library or wall of information.

### The agent stays in flow

Agents should spend time negotiating and advising clients, not entering data, switching systems, or rebuilding context.

### Every conversation has value

Live capture, recovered memory, recaps, notes, and attributable external signals can all begin useful work. Accord should recover gracefully from forgotten recordings, missing information, interruptions, and imperfect human behavior.

### Trust is our competitive advantage

Every AI-generated field needs attributable evidence and visible uncertainty. Human approval is required before legal documents are finalized, sent, signed, or shared. Privacy, consent, security, auditability, and provider independence are product behavior.

### Every feature must reduce end-to-end friction

Evaluate value by friction removed from the first client conversation through closing—not by feature count, page count, or automation spectacle.

## The Red Pen Test

Every feature and screen must answer:

> “If I handed this screen to a top-producing real estate agent and a red pen, what would they cross out?”

Remove those elements before adding more. If a separate page, field, label, control, confirmation, or status does not improve the next decision, it does not earn a place.

## Friction Budget

The core workflow from conversation to sending documents targets:

| Measure | Budget |
|---|---:|
| Maximum manual decisions | 5 |
| Maximum clicks | 15–20 |
| Maximum time after conversation ends | 3 minutes |
| Required typing by agent | As close to zero as possible |
| Information auto-inferred | 90%+ |

Security, consent, legal-document approval, and external-sharing controls cannot be removed merely to hit the budget. Instead, Accord should infer more, group review intelligently, preserve evidence, and place required human decisions at the right moment.

## Product decision test

Before approving work, ask:

1. Which clicks or typing does this remove?
2. What can Accord infer before interrupting the agent?
3. Is there one obvious next action?
4. Does this help achieve the three-minute North Star?
5. Does the interface remain calm?
6. Does the work belong in Capture, Prepare, or Manage?
7. Does it preserve trust, evidence, and human authority?

If the answers are unclear, simplify or defer the work.

## First simplification baseline

The primary information architecture is Capture, Prepare, Manage / Deal Desk, Client Portal, and Settings. Capture does not ask the agent to classify or file work before Accord attempts inference. Prepare contains the review and package workflow. Manage begins with tracked work and attention. Secondary capabilities appear contextually or in Settings rather than competing as top-level destinations.

## Agent-facing workflow baseline

The current primary agent workflow is **Record -> Review & Send -> Coordinate -> Settings**. `Capture -> Prepare -> Manage` remains the conceptual model, but the product should now speak in the agent's natural language:

- **Record** is the simplest page in Accord. Input modes are variations of one workflow, not separate destinations. Each mode has one primary action, and switching modes changes only the central input panel.
- **Review & Send** is the key contract review surface: all generated paperwork fields, source evidence, editable values, uncertainty, and signature handoff live together.
- **Coordinate** is transaction management after documents exist or after the agent explicitly chooses to track the work.
- **Settings** contains configuration, provider setup, contract library, Accord Guide governance, privacy/compliance, and Teach Accord preferences.

Client Portal / Accord Guide is not a primary agent destination. It appears inside transaction and Coordinate contexts as **Client View** or **Client Experience**.

Accord is transaction-centric, not contact-centric. Accord is not a CRM and should not become one. It may integrate with CRMs, but its context should be limited to facts that help create, execute, explain, or coordinate transaction documents.

User-initiated capture may prepare paperwork for human review. Passive or external signals may recommend legal-document creation, but they must not initiate contract drafting or document creation without explicit agent action.

Review & Send represents the exact paperwork Accord intends to generate, not a summary of AI understanding. Every displayed value should be the value, checkbox, selection, addendum provision, or signature assignment that will appear on the document. Required unresolved fields block signature sending even when other readiness signals look strong.

The labels are still a working product language and may evolve, but any renaming must preserve the low-friction path from conversation to accurate executed documents.

## Client View philosophy

Client View is the client's transaction home, not an education dashboard. The client should first understand status, dates, documents, to-dos, and how to ask a simple question. Education appears only when it is useful to the current stage, document section, deadline, or question.

Avoid internal product labels in client-facing screens. Do not show labels such as Accord Guide, Agent Review Mode, Why these recommendations, or Client approval portal to the client. Keep copy short, calm, and plain-English.

The client-facing product principle is: **transaction first, education supported**.

## Calm interface polish

Polish should remove words before adding panels. Record, Review & Send, Coordinate, and Settings each need one obvious next action, compact supporting controls, and progressive disclosure for details. Coordinate may be customizable, but customization should support the transaction coordinator workflow rather than become another destination.

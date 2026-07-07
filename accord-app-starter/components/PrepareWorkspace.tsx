'use client';

import { useMemo, useState } from 'react';
import { mockSignaturePacket } from '@/lib/eSignature';
import { mockTeachAccordRules } from '@/lib/teachAccord';

type FieldStatus = 'ready' | 'needs review' | 'missing' | 'default applied';

interface ReviewField {
  id: string;
  label: string;
  value: string;
  document: string;
  section: string;
  confidence: number | null;
  status: FieldStatus;
  evidenceId: string;
}

interface TranscriptSnippet {
  id: string;
  time: string;
  speaker: string;
  text: string;
}

const reviewFields: ReviewField[] = [
  { id: 'field-price', label: 'Purchase price', value: '$875,000', document: 'REPC', section: 'Section 2 · Purchase Price', confidence: 98, status: 'ready', evidenceId: 'e-price' },
  { id: 'field-em', label: 'Earnest money', value: '$7,500 within 4 calendar days', document: 'REPC', section: 'Section 4 · Earnest Money', confidence: 96, status: 'ready', evidenceId: 'e-earnest' },
  { id: 'field-dd', label: 'Due diligence deadline', value: '10 calendar days after acceptance', document: 'Buyer Due Diligence Checklist', section: 'Checklist · Investigation Period', confidence: 72, status: 'default applied', evidenceId: 'e-default' },
  { id: 'field-settle', label: 'Settlement deadline', value: 'Missing', document: 'REPC', section: 'Section 24 · Settlement', confidence: null, status: 'missing', evidenceId: 'e-missing' },
  { id: 'field-title', label: 'Title company', value: 'Red Rock Title', document: 'REPC', section: 'Section 6 · Title Insurance', confidence: 82, status: 'default applied', evidenceId: 'e-default' },
  { id: 'field-finance', label: 'Financing type', value: 'Conventional loan', document: 'REPC', section: 'Section 3 · Financing', confidence: 94, status: 'ready', evidenceId: 'e-financing' },
  { id: 'field-bba', label: 'Buyer broker compensation', value: 'Per signed buyer broker agreement', document: 'Buyer Broker Agreement', section: 'Compensation · Office default reference', confidence: 78, status: 'needs review', evidenceId: 'e-bba' },
  { id: 'field-addendum', label: 'Personal property addendum', value: 'Washer, dryer, refrigerator requested', document: 'Addendum', section: 'Included personal property', confidence: 88, status: 'needs review', evidenceId: 'e-property' },
  { id: 'field-wire', label: 'Wire fraud acknowledgment', value: 'Include brokerage-required disclosure', document: 'Wire Fraud Disclosure', section: 'Full document', confidence: 100, status: 'default applied', evidenceId: 'e-default' },
  { id: 'field-unrep', label: 'Unrepresented buyer disclosure', value: 'Not applicable · buyer is represented', document: 'Unrepresented Buyer Disclosure', section: 'Applicability', confidence: 91, status: 'ready', evidenceId: 'e-representation' }
];

const transcript: TranscriptSnippet[] = [
  { id: 'e-price', time: '00:03:14', speaker: 'Agent', text: 'The Welkers want to offer eight hundred seventy-five thousand on Alderann.' },
  { id: 'e-earnest', time: '00:04:02', speaker: 'Buyer', text: 'Let us do seventy-five hundred earnest money. We can get that wired quickly.' },
  { id: 'e-financing', time: '00:04:48', speaker: 'Buyer', text: 'We are staying conventional. Our lender already has the updated approval letter.' },
  { id: 'e-property', time: '00:07:21', speaker: 'Agent', text: 'I will ask for the refrigerator, washer, and dryer in the addendum.' },
  { id: 'e-bba', time: '00:09:10', speaker: 'Agent', text: 'Your buyer broker paperwork controls our compensation; I will keep that aligned.' },
  { id: 'e-representation', time: '00:11:42', speaker: 'Agent', text: 'You are represented by Red Rock Group, so the unrepresented buyer disclosure should not apply.' },
  { id: 'e-default', time: 'Office rule', speaker: 'Accord', text: 'Office playbook suggests Red Rock Title, standard due diligence timing, and required wire fraud disclosure. Agent review still required.' },
  { id: 'e-missing', time: 'Not found', speaker: 'Accord', text: 'No settlement deadline was found in the transcript. Accord will not fabricate this field.' }
];

const statusClass: Record<FieldStatus, string> = {
  ready: 'good',
  'needs review': 'warn',
  missing: 'danger',
  'default applied': 'neutral'
};

const signatureSteps = ['Ready for signature', 'Sent', 'Waiting on signatures', 'Completed', 'Imported to Coordinate'];

export function PrepareWorkspace() {
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [signatureOpen, setSignatureOpen] = useState(false);
  const [signatureStep, setSignatureStep] = useState(0);
  const readyCount = useMemo(() => reviewFields.filter((field) => field.status === 'ready' || field.status === 'default applied').length, []);
  const attentionCount = reviewFields.length - readyCount;

  function jumpToEvidence(evidenceId: string) {
    setHighlighted(evidenceId);
    document.getElementById(evidenceId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <div className="review-send-page">
      <section className="card prepare-summary review-hero">
        <div className="prepare-score"><strong>84%</strong><span>ready</span></div>
        <div>
          <span className="section-kicker">Review & Send</span>
          <h2>Welker buyer offer package</h2>
          <p>Accord filled the paperwork from the conversation, office defaults, and approved mock rules. Review the fields, then send through the preferred signature provider.</p>
        </div>
        <span className="status warn">{attentionCount} need review</span>
      </section>

      <section className="card field-review-card">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Generated paperwork fields</span>
            <h2>One review surface</h2>
            <p>Every mock contract field stays editable and traceable before anything can be sent.</p>
          </div>
          <button className="btn btn-secondary" type="button" onClick={() => setShowDetails((value) => !value)}>{showDetails ? 'Hide Details' : 'Show Details'}</button>
        </div>

        <div className="review-field-list">
          {reviewFields.map((field) => (
            <article className="review-field-row" key={field.id}>
              <div>
                <strong>{field.label}</strong>
                <span>{field.document} · {field.section}</span>
              </div>
              <label>
                <span className="sr-only">{field.label}</span>
                <input value={field.value} readOnly aria-label={`${field.label} generated value`} />
              </label>
              <span className={`status ${statusClass[field.status]}`}>{field.status}</span>
              <span className="confidence-mini">{field.confidence === null ? 'No confidence' : `${field.confidence}%`}</span>
              <button className="text-button" type="button" onClick={() => jumpToEvidence(field.evidenceId)}>Evidence</button>
              <button className="btn btn-quiet" type="button">Edit</button>
              {showDetails && <small className="field-detail">Mock edit placeholder · approval would be invalidated after material change.</small>}
            </article>
          ))}
        </div>
      </section>

      <section className="card teach-accord-inline">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Teach Accord influences</span>
            <h2>Office preferences used as explainable rules</h2>
            <p>These rules inform suggestions only. They do not alter an AI model and do not replace agent review.</p>
          </div>
        </div>
        <div className="calm-list">
          {mockTeachAccordRules.slice(0, 3).map((rule) => (
            <div className="calm-row" key={rule.id}>
              <span><strong>{rule.title}</strong><small>{rule.ruleText}</small></span>
              <span className={`status ${rule.status === 'approved' ? 'good' : 'warn'}`}>{rule.scope} · {rule.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card signature-preview-card">
        <div>
          <span className="section-kicker">Mock e-signature handoff</span>
          <h2>Preferred provider: DocuSign mock</h2>
          <p>Provider review is provider-neutral and mock-only. No document is generated, sent, or imported.</p>
        </div>
        <button className="btn btn-primary btn-large" type="button" onClick={() => setSignatureOpen(true)}>Send for Signatures</button>
        <button className="btn btn-secondary" type="button">Save Draft</button>
        <button className="btn btn-secondary" type="button">Regenerate Suggestions</button>
      </section>

      {signatureOpen && (
        <section className="card signature-confirmation">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Final confirmation · mock only</span>
              <h2>Send signature packet</h2>
              <p>Confirm recipients and documents before the provider handoff. Human approval remains the gate.</p>
            </div>
            <span className="status warn">{signatureSteps[signatureStep]}</span>
          </div>
          <div className="prepare-grid">
            <div className="card inset">
              <span className="section-kicker">Signers</span>
              {mockSignaturePacket.recipients.map((recipient) => <p key={recipient.id}><strong>{recipient.displayName}</strong><br /><small>{recipient.role} · {recipient.emailPreview}</small></p>)}
            </div>
            <div className="card inset">
              <span className="section-kicker">Documents included</span>
              {mockSignaturePacket.documents.map((document) => <p key={document.id}><strong>{document.name}</strong><br /><small>{document.formVersion} · {document.signerFieldCount} signer fields</small></p>)}
            </div>
          </div>
          <div className="signature-flow">
            {signatureSteps.map((step, index) => (
              <span className={index <= signatureStep ? 'active' : ''} key={step}>{step}</span>
            ))}
          </div>
          <div className="form-actions">
            <button className="btn btn-secondary" type="button" onClick={() => setSignatureOpen(false)}>Cancel</button>
            <button className="btn btn-primary" type="button" onClick={() => setSignatureStep((value) => Math.min(value + 1, signatureSteps.length - 1))}>
              {signatureStep === signatureSteps.length - 1 ? 'Imported to Coordinate' : 'Advance mock status'}
            </button>
          </div>
        </section>
      )}

      <section className="card transcript-card">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Transcript evidence</span>
            <h2>Source transcript</h2>
          </div>
        </div>
        <div className="transcript-snippets">
          {transcript.map((snippet) => (
            <blockquote id={snippet.id} className={highlighted === snippet.id ? 'highlighted' : ''} key={snippet.id}>
              <span>{snippet.time} · {snippet.speaker}</span>
              {snippet.text}
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}

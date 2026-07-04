'use client';

import Link from 'next/link';
import { useState } from 'react';
import { mockCaptureReview, mockConsentRecords, mockTranscript } from '@/lib/mockData';

type Destination = 'new' | 'existing' | 'unsure';
type Stage = 'capture' | 'review';

const destinationOptions: Array<{ id: Destination; title: string; detail: string }> = [
  { id: 'new', title: 'New transaction', detail: 'This conversation is likely the beginning of a deal.' },
  { id: 'existing', title: 'Existing transaction', detail: 'Add it to a transaction already in the Deal Desk.' },
  { id: 'unsure', title: 'Not sure yet', detail: 'Capture first and decide after reviewing the facts.' }
];

function consentLabel(status: string) {
  return status.replace('_', ' ');
}

export function StartConversationFlow() {
  const [stage, setStage] = useState<Stage>('capture');
  const [destination, setDestination] = useState<Destination>('unsure');
  const [transcript, setTranscript] = useState(mockTranscript);
  const activeConsent = mockConsentRecords.slice(0, 2);
  const consentReady = activeConsent.every((record) => record.status === 'obtained');

  if (stage === 'review') {
    return <PostCaptureReview onBack={() => setStage('capture')} />;
  }

  return (
    <div className="capture-layout">
      <main className="capture-main">
        <section className="card capture-section">
          <div className="capture-section-heading"><span className="capture-number">01</span><div><span className="section-kicker">Destination</span><h2>Where might this conversation belong?</h2><p>You can change this after capture.</p></div></div>
          <div className="choice-grid">
            {destinationOptions.map((option) => (
              <button className={`choice-card ${destination === option.id ? 'selected' : ''}`} type="button" onClick={() => setDestination(option.id)} key={option.id} aria-pressed={destination === option.id}>
                <span className="choice-radio" aria-hidden="true" /><strong>{option.title}</strong><small>{option.detail}</small>
              </button>
            ))}
          </div>
          {destination === 'existing' && <label className="capture-select">Choose transaction<select defaultValue="txn-demo"><option value="txn-demo">2948 E Alderann St · Welker buyer offer</option><option value="txn-homeside">346 E Homeside Rd · Maya Chen listing</option></select></label>}
        </section>

        <section className="card capture-section">
          <div className="capture-section-heading"><span className="capture-number">02</span><div><span className="section-kicker">Context</span><h2>What kind of conversation is this?</h2><p>This helps organize the mock review; it does not determine legal meaning.</p></div></div>
          <label>Conversation type<select defaultValue="offer-terms"><option value="buyer-consult">Buyer consult</option><option value="seller-consult">Seller consult</option><option value="offer-terms">Offer terms</option><option value="inspection-negotiation">Inspection negotiation</option><option value="lender-title">Lender/title call</option><option value="general-note">General note</option></select></label>
        </section>

        <section className="card capture-section">
          <div className="capture-section-heading"><span className="capture-number">03</span><div><span className="section-kicker">Capture</span><h2>Add the conversation</h2><p>Use a transcript now. Recording remains unavailable in this mock.</p></div></div>
          <div className="capture-methods">
            <button className="capture-method active" type="button"><strong>Paste transcript</strong><span>Available now</span></button>
            <button className="capture-method" type="button"><strong>Upload transcript</strong><span>Placeholder only</span></button>
            <button className="capture-method locked" type="button" disabled><strong>Record conversation</strong><span>Consent required</span></button>
          </div>
          <label htmlFor="capture-transcript">Transcript<textarea id="capture-transcript" className="capture-transcript" value={transcript} onChange={(event) => setTranscript(event.target.value)} /></label>
          <button className="upload-strip" type="button"><span><strong>Upload transcript placeholder</strong><small>.txt, .docx, or .pdf · no file will be stored</small></span><span aria-hidden="true">+</span></button>
        </section>
      </main>

      <aside className="capture-sidebar">
        <section className="card consent-card">
          <div className="section-heading"><div><span className="section-kicker">Recording consent</span><h2>Consent status</h2></div><span className={`status ${consentReady ? 'good' : 'warn'}`}>{consentReady ? 'Ready' : 'Not ready'}</span></div>
          <div className="consent-list">
            {activeConsent.map((record) => <div className="consent-person" key={record.id}><span className={`consent-dot ${record.status}`} aria-hidden="true" /><div><strong>{record.personName}</strong><small>{consentLabel(record.status)} · {record.consentType.replace('_', ' ')}</small></div><button type="button">Review</button></div>)}
          </div>
          <div className="notice compact warning"><strong>Recording is blocked.</strong> Consent on file is context, not blanket permission. Confirm every required participant and the current conversation before recording begins.</div>
          <button className="btn btn-secondary btn-block" type="button">Record mock consent</button>
        </section>
        <section className="card capture-summary"><span className="section-kicker">Capture summary</span><div className="summary-list"><div><span>Destination</span><strong>{destinationOptions.find((option) => option.id === destination)?.title}</strong></div><div><span>Method</span><strong>Paste transcript</strong></div><div><span>Recording</span><strong className="text-warning">Blocked</strong></div><div><span>AI processing</span><strong>Mock only</strong></div></div><button className="btn btn-primary btn-block" type="button" disabled={!transcript.trim()} onClick={() => setStage('review')}>Review captured facts →</button><Link className="btn btn-quiet btn-block" href="/">Cancel capture</Link></section>
      </aside>
    </div>
  );
}

function PostCaptureReview({ onBack }: { onBack: () => void }) {
  const suggestions = [
    ['Likely transaction', mockCaptureReview.likelyTransaction],
    ['Buyer', mockCaptureReview.buyer],
    ['Seller', mockCaptureReview.seller],
    ['Property', mockCaptureReview.property],
    ['Transaction type', mockCaptureReview.transactionType]
  ] as const;

  return (
    <div className="review-layout">
      <main className="card capture-review">
        <div className="section-heading"><div><span className="section-kicker">Post-capture review</span><h2>Accord found a likely buyer offer.</h2><p>These are mock suggestions. Review the source and decide where the conversation belongs.</p></div><span className="status warn">Human review required</span></div>
        <div className="likely-match"><div><span>Likely match</span><strong>2948 E Alderann St</strong><small>Existing buyer-offer workspace</small></div><span className="confidence-pill good">92% confidence</span></div>
        <div className="capture-suggestions">
          {suggestions.map(([label, suggestion]) => <article className={suggestion.confidence === null ? 'missing' : ''} key={label}><div className="suggestion-value"><span>{label}</span><strong>{suggestion.value}</strong>{suggestion.confidence === null ? <span className="status danger">Missing</span> : <span className={`confidence-pill ${suggestion.confidence >= 90 ? 'good' : 'warn'}`}>{suggestion.confidence}% confidence</span>}</div><div className="source-evidence"><span>Source transcript</span><blockquote>{suggestion.source}</blockquote></div></article>)}
        </div>
        <div className="capture-actions"><button className="btn btn-quiet" type="button" onClick={onBack}>← Back to capture</button><span /><Link className="btn btn-secondary" href="/transactions/txn-demo">Attach to Existing</Link><Link className="btn btn-primary" href="/transactions/new">Create Transaction</Link></div>
      </main>
      <aside className="card missing-facts"><span className="section-kicker">Needs clarification</span><h2>{mockCaptureReview.missingFacts.length} missing facts</h2><p>Accord did not infer details that were not clearly stated.</p><ul>{mockCaptureReview.missingFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul><button className="btn btn-secondary btn-block" type="button">Save as Unassigned Note</button><div className="notice compact">No contract package can be drafted from this capture until required facts are resolved and an agent approves the transaction terms.</div></aside>
    </div>
  );
}

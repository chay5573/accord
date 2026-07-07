'use client';

import Link from 'next/link';
import { useState } from 'react';
import { mockOpportunity } from '@/lib/opportunity';

const recapTypes = ['I just spoke with a buyer', 'I just spoke with a seller', 'I negotiated an offer', 'I showed a property', 'I received signed docs', 'Other'];

export function QuickCaptureRecovery() {
  const [stage, setStage] = useState<'choose' | 'recap' | 'review'>('choose');
  const [kind, setKind] = useState(recapTypes[0]);
  const [recap, setRecap] = useState('The Welkers want to offer $875,000 on Alderann Street. Conventional financing. We still need the settlement date and seller legal name.');

  if (stage === 'review') {
    return (
      <div className="recovery-review">
        <section className="card foundation-banner">
          <div>
            <span className="section-kicker">Recovered opportunity · Human review required</span>
            <h2>Accord reconstructed a buyer offer.</h2>
            <p>No transaction setup was required. Review what was found before sending paperwork.</p>
          </div>
          <span className="status warn">91% confidence</span>
        </section>
        <div className="foundation-grid">
          <section className="card">
            <span className="section-kicker">What Accord reconstructed</span>
            <h2>{mockOpportunity.title}</h2>
            <p>{mockOpportunity.reconstructedActivity?.summary}</p>
            <div className="reconstruction-grid">
              <div><span>Buyer</span><strong>Brenton & Emily Welker</strong><small>From agent recap · 96%</small></div>
              <div><span>Property</span><strong>2948 E Alderann St</strong><small>From agent recap · 92%</small></div>
              <div><span>Offer</span><strong>$875,000</strong><small>From agent recap · 98%</small></div>
              <div><span>Financing</span><strong>Conventional</strong><small>From agent recap · 90%</small></div>
            </div>
          </section>
          <aside className="card">
            <span className="section-kicker">Missing facts</span>
            <h2>2 answers needed</h2>
            {mockOpportunity.missingFactPrompts.map((fact) => <div className="missing-prompt" key={fact.id}><strong>{fact.question}</strong><small>{fact.reason}</small></div>)}
          </aside>
        </div>
        <section className="card draft-preview">
          <div>
            <span className="section-kicker">Paperwork that can be reviewed</span>
            <h2>{mockOpportunity.suggestedDraft}</h2>
            <p>Accord will keep missing fields visibly incomplete. Signature send still requires agent review and approval.</p>
          </div>
          <Link className="btn btn-primary btn-large" href="/review-send">Review & Send</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="recovery-layout">
      <section className="card">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Recovery mode</span>
            <h2>I forgot to record</h2>
            <p>Give Accord the smallest useful recap. It will do the organizing before asking follow-up questions.</p>
          </div>
        </div>
        {stage === 'choose' ? (
          <div className="recovery-choices">{recapTypes.map((item) => <button type="button" className={kind === item ? 'selected' : ''} onClick={() => setKind(item)} key={item}>{item}</button>)}</div>
        ) : (
          <>
            <div className="capture-methods">
              <button className="capture-method locked" disabled type="button"><strong>Voice recap</strong><span>Placeholder only</span></button>
              <button className="capture-method active" type="button"><strong>Typed recap</strong><span>Available now</span></button>
              <button className="capture-method" type="button"><strong>Upload notes/documents</strong><span>Placeholder only</span></button>
            </div>
            <label>What do you remember?<textarea value={recap} onChange={(event) => setRecap(event.target.value)} /></label>
            <button className="upload-strip" type="button"><span><strong>Upload notes or documents</strong><small>Placeholder · nothing is stored</small></span><span>+</span></button>
          </>
        )}
        <div className="form-actions">
          {stage === 'recap' && <button className="btn btn-quiet" type="button" onClick={() => setStage('choose')}>Back</button>}
          <button className="btn btn-primary" type="button" disabled={stage === 'recap' && !recap.trim()} onClick={() => setStage(stage === 'choose' ? 'recap' : 'review')}>{stage === 'choose' ? 'Add recap' : 'Reconstruct activity'}</button>
        </div>
      </section>
      <aside className="card">
        <span className="section-kicker">Selected context</span>
        <h2>{kind}</h2>
        <p>This is a routing hint, not a verified transaction fact.</p>
        <div className="notice compact warning"><strong>Signal, not fact.</strong> Every reconstructed field keeps its source and confidence until the agent confirms it.</div>
      </aside>
    </div>
  );
}

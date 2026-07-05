'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { mockExtractedTerms, mockFiles, mockPackageForms, mockTimeline, mockTranscript } from '@/lib/mockData';

const tabs = ['Overview', 'Conversations', 'Extracted Terms', 'Draft Package', 'Files', 'Timeline'] as const;
type WorkspaceTab = (typeof tabs)[number];

function confidenceTone(confidence: number | null) {
  if (confidence === null || confidence < 60) return 'danger';
  if (confidence < 85) return 'warn';
  return 'good';
}

export function TransactionWorkspace() {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('Overview');
  const [terms, setTerms] = useState(mockExtractedTerms.map((term) => ({ ...term, review: 'pending' as 'pending' | 'approved' | 'changed' })));
  const [forms, setForms] = useState(mockPackageForms);
  const [transcript, setTranscript] = useState(mockTranscript);
  const [showFutureForms, setShowFutureForms] = useState(false);
  const unresolved = terms.filter((term) => term.state !== 'suggested' || !term.value).length;
  const approved = terms.filter((term) => term.review === 'approved').length;
  const approvalReady = unresolved === 0 && approved === terms.length;
  const includedForms = useMemo(() => forms.filter((form) => form.included).length, [forms]);

  function updateTerm(id: string, value: string) {
    setTerms((current) => current.map((term) => term.id === id ? { ...term, value, state: value ? 'suggested' : 'incomplete', review: 'changed' } : term));
  }

  function approveTerm(id: string) {
    setTerms((current) => current.map((term) => term.id === id && term.value && term.state === 'suggested' ? { ...term, review: 'approved' } : term));
  }

  return (
    <>
      <nav className="workspace-tabs" aria-label="Transaction workspace">
        {tabs.map((tab) => <button className={activeTab === tab ? 'active' : ''} type="button" onClick={() => setActiveTab(tab)} key={tab}>{tab}{tab === 'Extracted Terms' && <span className="tab-count">{unresolved}</span>}</button>)}
      </nav>

      {activeTab === 'Overview' && <Overview approved={approved} unresolved={unresolved} includedForms={includedForms} setActiveTab={setActiveTab} />}

      {activeTab === 'Conversations' && (
        <div className="workspace-grid">
          <section className="card span-2"><div className="section-heading"><div><span className="section-kicker">Transcript input</span><h2>Paste a conversation transcript</h2></div><span className="status neutral">Mock input</span></div><label className="sr-only" htmlFor="transcript">Conversation transcript</label><textarea id="transcript" className="transcript-input" value={transcript} onChange={(event) => setTranscript(event.target.value)} /><div className="form-actions"><button className="btn btn-secondary" type="button">Save transcript locally</button><button className="btn btn-primary" type="button" onClick={() => setActiveTab('Extracted Terms')}>Review mock extraction →</button></div></section>
          <section className="card intake-options"><span className="section-kicker">Other intake options</span><h2>Bring in a transcript</h2><button className="upload-placeholder" type="button"><strong>Upload transcript</strong><span>.txt, .docx, or .pdf placeholder</span><small>No file will be stored</small></button><div className="recording-placeholder"><div><strong>Record conversation</strong><span>Unavailable in mock mode</span></div><button className="btn" type="button" disabled>Start recording</button></div><div className="notice compact warning"><strong>Consent required before recording.</strong> Accord must capture confirmation from all required parties for each conversation before audio starts.</div></section>
        </div>
      )}

      {activeTab === 'Extracted Terms' && (
        <section className="card terms-panel">
          <div className="section-heading"><div><span className="section-kicker">Human review required</span><h2>Extracted offer terms</h2><p>Compare every suggestion with its source. Confidence never replaces your approval.</p></div><div className="review-summary"><strong>{approved}/{terms.length}</strong><span>approved</span></div></div>
          <div className="uncertainty-banner"><strong>{unresolved} terms require clarification.</strong><span>Accord has left uncertainty visible instead of filling missing facts.</span></div>
          <div className="terms-list">
            {terms.map((term) => (
              <article className={`term-card ${term.state !== 'suggested' ? 'needs-attention' : ''}`} key={term.id}>
                <div className="term-header"><div><span className="term-label">{term.label}</span>{term.state !== 'suggested' && <span className={`status ${term.state === 'incomplete' ? 'danger' : 'warn'}`}>{term.state === 'incomplete' ? 'Incomplete' : 'Clarify'}</span>}</div><span className={`confidence-pill ${confidenceTone(term.confidence)}`}>{term.confidence === null ? 'No confidence' : `${term.confidence}% confidence`}</span></div>
                <div className="term-body"><label>Proposed value<input value={term.value} placeholder="Required — enter confirmed value" onChange={(event) => updateTerm(term.id, event.target.value)} /></label><div className="source-evidence"><span>Source transcript {term.sourceTimestamp && `· ${term.sourceTimestamp}`}</span><blockquote>{term.sourceSnippet || 'No source evidence available.'}</blockquote></div></div>
                <div className="term-actions"><span className={`review-state ${term.review}`}>{term.review === 'approved' ? '✓ Agent approved' : term.review === 'changed' ? 'Changed · reapproval required' : 'Awaiting review'}</span><button className="btn btn-quiet" type="button" onClick={() => updateTerm(term.id, term.value)}>Change</button><button className="btn btn-secondary" type="button" disabled={!term.value || term.state !== 'suggested' || term.review === 'approved'} onClick={() => approveTerm(term.id)}>Approve field</button></div>
              </article>
            ))}
          </div>
          <div className="approval-bar"><div><strong>Agent approval gate</strong><span>{approvalReady ? 'All terms are reviewed. The mock package is ready for the next step.' : `Resolve ${unresolved} terms and approve ${terms.length - approved} fields before package approval.`}</span></div><button className="btn btn-primary" type="button" disabled={!approvalReady}>Approve terms for draft package</button></div>
        </section>
      )}

      {activeTab === 'Draft Package' && (
        <div className="workspace-grid">
          <section className="card span-2"><div className="section-heading"><div><span className="section-kicker">Recommended package</span><h2>Utah buyer-offer checklist</h2><p>Mock recommendations only. Form versions and licensing are not represented as verified.</p></div><span className="status warn">Approval locked</span></div><div className="package-list">{forms.map((form) => <label className="package-row" key={form.id}><input type="checkbox" checked={form.included} onChange={() => setForms((current) => current.map((item) => item.id === form.id ? { ...item, included: !item.included } : item))} /><span><strong>{form.name}</strong><small>{form.reason}</small></span><span className={`status ${form.status === 'required' ? 'good' : form.status === 'recommended' ? 'warn' : 'neutral'}`}>{form.status}</span></label>)}</div><button className="future-forms-toggle" type="button" aria-expanded={showFutureForms} onClick={() => setShowFutureForms((value) => !value)}><span>Future library forms<small>Show forms planned beyond this mock Utah starter set</small></span><strong>{showFutureForms ? '−' : '+'}</strong></button>{showFutureForms && <div className="future-forms"><span>Seller Financing Addendum</span><span>FHA/VA Loan Addendum</span><span>Lead-Based Paint Disclosure</span><span>HOA Addendum</span></div>}</section>
          <aside className="card package-summary"><span className="section-kicker">Package status</span><h2>{includedForms} forms selected</h2><div className="summary-list"><div><span>Term review</span><strong>{approved}/{terms.length}</strong></div><div><span>Unresolved</span><strong className={unresolved ? 'text-warning' : 'text-success'}>{unresolved}</strong></div><div><span>Agent approval</span><strong>Required</strong></div><div><span>Output</span><strong>Not generated</strong></div></div><div className="notice compact">Draft generation stays unavailable until all required terms are resolved and explicitly approved by the agent.</div><button className="btn btn-primary btn-block" type="button" disabled>Generate draft package</button><small className="center-note">PDF generation is not connected.</small></aside>
        </div>
      )}

      {activeTab === 'Files' && <section className="card"><div className="section-heading"><div><span className="section-kicker">Accord Cloud preview</span><h2>Transaction files</h2><p>Mock metadata only. No storage provider is connected.</p></div><button className="btn btn-secondary" type="button">Upload placeholder</button></div><div className="file-list">{mockFiles.map((file) => <div className="file-row" key={file.name}><span className="file-icon" aria-hidden="true">□</span><div><strong>{file.name}</strong><span>{file.type}</span></div><span className="status neutral">{file.status}</span><small>{file.updated}</small></div>)}</div></section>}

      {activeTab === 'Timeline' && <section className="card"><div className="section-heading"><div><span className="section-kicker">Audit-aware history</span><h2>Transaction timeline</h2><p>This mock illustrates human and automated events without recording sensitive content in event summaries.</p></div><span className="status neutral">Mock events</span></div><div className="timeline">{mockTimeline.map((event) => <div className="timeline-event" key={event.title}><i aria-hidden="true" /><time>{event.time}</time><div><strong>{event.title}</strong><span>{event.detail}</span></div></div>)}</div></section>}
    </>
  );
}

function Overview({ approved, unresolved, includedForms, setActiveTab }: { approved: number; unresolved: number; includedForms: number; setActiveTab: (tab: WorkspaceTab) => void }) {
  return <div className="workspace-grid">
    <section className="card span-2"><div className="section-heading"><div><span className="section-kicker">Transaction snapshot</span><h2>Buyer offer at a glance</h2></div><button className="text-button" onClick={() => setActiveTab('Extracted Terms')}>Review terms →</button></div><div className="detail-grid"><div><span>Clients</span><strong>Brenton & Emily Welker</strong></div><div><span>Representation</span><strong>Buyer represented by us</strong></div><div><span>Offer price</span><strong>$875,000</strong></div><div><span>Financing</span><strong>Conventional</strong></div><div><span>Agent</span><strong>Calvin Hayward</strong></div><div><span>Team</span><strong>Red Rock Group</strong></div></div></section>
    <section className="card decision-card"><span className="section-kicker">Deal Desk Review</span><h2>Not ready for draft</h2><p>Two blockers and two warnings need agent decisions before draft preparation.</p><Link className="btn btn-primary btn-block" href="/transactions/txn-demo/review">Review & Prepare Draft</Link><button className="btn btn-quiet btn-block" type="button" onClick={() => setActiveTab('Extracted Terms')}>Open extracted terms</button></section>
    <section className="card span-2"><div className="section-heading"><div><span className="section-kicker">Progress</span><h2>Transaction readiness</h2></div><span className="status warn">Needs review</span></div><div className="readiness-list"><div className="complete"><i>✓</i><span><strong>Transaction created</strong><small>Parties, property, and representation captured</small></span></div><div className="complete"><i>✓</i><span><strong>Conversation added</strong><small>Mock transcript available for review</small></span></div><div><i>3</i><span><strong>Review extracted terms</strong><small>{approved} approved · {unresolved} unresolved</small></span></div><div><i>4</i><span><strong>Approve draft package</strong><small>Locked until required terms are resolved</small></span></div></div></section>
    <section className="card"><span className="section-kicker">Package preview</span><h2>{includedForms} forms included</h2><p>Current checklist is based on mock facts and office rules.</p><button className="btn btn-secondary btn-block" type="button" onClick={() => setActiveTab('Draft Package')}>Review checklist</button></section>
  </div>;
}

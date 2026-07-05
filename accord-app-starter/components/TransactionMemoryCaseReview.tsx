'use client';

import { useState } from 'react';
import { mockTransactionCases } from '@/lib/transactionMemory';

export function TransactionMemoryCaseReview() {
  const caseData = mockTransactionCases[0];
  const [decision, setDecision] = useState<'pending' | 'approved' | 'excluded' | 'needs_redaction'>('pending');

  return <div className="case-review-page">
    <section className="case-governance-bar card"><div><span className="section-kicker">Training decision</span><h2>{decision === 'pending' ? 'Not eligible for learning' : decision.replace('_',' ')}</h2><p>Approval remains blocked while sensitive-data findings need review.</p></div><div className="case-governance-status"><span><small>Authority</small><strong>Pending</strong></span><span><small>Redaction</small><strong className="text-warning">Needs review</strong></span><span><small>Retention</small><strong>7-year case policy</strong></span></div></section>

    <div className="case-review-grid">
      <main className="case-review-main">
        <section className="card"><div className="section-heading"><div><span className="section-kicker">Included evidence</span><h2>Documents</h2><p>These are immutable mock version records; no files were parsed or uploaded.</p></div><span className="count-badge">{caseData.documents.length}</span></div><div className="case-document-list">{caseData.documents.map((doc) => <article key={doc.id}><span className="memory-case-icon" aria-hidden="true">□</span><div><strong>{doc.documentType}</strong><small>{doc.sourceFile} · Version {doc.versionNumber}</small></div><span className={`status ${doc.redactionStatus === 'approved' ? 'good' : 'warn'}`}>{doc.redactionStatus.replace('_',' ')}</span><small>{doc.approvalStatus}</small></article>)}</div></section>

        <section className="card"><div className="section-heading"><div><span className="section-kicker">PII/PIIP review</span><h2>Detected sensitive data</h2><p>High-risk findings must be redacted and human-reviewed before eligibility.</p></div><span className="status danger">2 unresolved</span></div><div className="sensitive-findings">{caseData.sensitiveDataFindings.map((finding) => <article key={finding.id}><span className={`finding-severity ${finding.redactionStatus === 'approved' ? 'good' : 'danger'}`} aria-hidden="true">{finding.redactionStatus === 'approved' ? '✓' : '!'}</span><div><strong>{finding.category.replace('_',' ')}</strong><small>{finding.location} · {finding.valuePreview}</small></div><span className="confidence-pill warn">{finding.confidence}% detected</span><strong>{finding.redactionStatus.replace('_',' ')}</strong></article>)}</div></section>

        <section className="card"><div className="section-heading"><div><span className="section-kicker">Source lineage</span><h2>Field provenance examples</h2></div></div><div className="provenance-table"><div className="provenance-head"><span>Field</span><span>Source</span><span>Authority</span><span>Review</span></div>{caseData.fieldProvenance.map((field) => <div className="provenance-row" key={field.id}><span><strong>{field.extractedField.replaceAll('_',' ')}</strong><small>{field.valuePreview}</small></span><span><strong>{field.sourceFile}</strong><small>{field.sourceLocation}</small></span><span>{field.authoritativeSource ? 'Authoritative' : 'Supporting'} · {field.confidence ?? '—'}%</span><span className={`status ${field.approvalStatus === 'approved' ? 'good' : 'warn'}`}>{field.approvalStatus}</span></div>)}</div></section>

        <section className="card"><div className="section-heading"><div><span className="section-kicker">Pattern candidates</span><h2>What Accord might learn</h2><p>Candidates are not active office rules until an authorized human approves them.</p></div></div><div className="pattern-list">{caseData.learnedPatterns.map((pattern) => <article key={pattern.id}><div><span>{pattern.patternType.replace('_',' ')}</span><strong>{pattern.summary}</strong><small>{pattern.scope} scope · {pattern.confidence}% confidence</small></div><span className="status warn">Pending approval</span></article>)}</div></section>
      </main>

      <aside className="case-review-sidebar">
        <section className="card"><span className="section-kicker">Document timeline</span><h2>Case history</h2><div className="memory-timeline">{caseData.timeline.map((event) => <div key={event.id}><i aria-hidden="true" /><span><time>{new Date(event.occurredAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</time><strong>{event.summary}</strong><small>{event.sourceFile}</small></span></div>)}</div></section>
        <section className="card case-decision-card"><span className="section-kicker">Human approval gate</span><h2>Training eligibility</h2><p>A transaction cannot enter the Training Library until authority and redaction reviews are complete.</p><button className="btn btn-primary btn-block" type="button" disabled onClick={() => setDecision('approved')}>Approve for Learning</button><button className="btn btn-secondary btn-block" type="button" onClick={() => setDecision('needs_redaction')}>Needs Redaction</button><button className="btn btn-quiet btn-block" type="button" onClick={() => setDecision('excluded')}>Exclude from Training</button><div className="notice compact"><strong>Archive unaffected.</strong> Excluding this case preserves its transaction-record retention policy while blocking learning use.</div></section>
      </aside>
    </div>
  </div>;
}

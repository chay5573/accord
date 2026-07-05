'use client';

import Link from 'next/link';
import { useState } from 'react';
import { mockTransactionCases } from '@/lib/transactionMemory';

export function TransactionMemorySettings() {
  const [learningEnabled, setLearningEnabled] = useState(true);
  const approved = mockTransactionCases.filter((item) => item.status === 'approved').length;
  const pending = mockTransactionCases.filter((item) => item.redactionStatus === 'needs_review' || item.redactionStatus === 'in_progress').length;
  const excluded = mockTransactionCases.filter((item) => item.status === 'excluded').length;

  return <div className="memory-page">
    <section className="memory-status-banner"><div><span className="section-kicker light">Training Library status</span><h2>{learningEnabled ? 'Learning controls enabled' : 'Learning disabled for this workspace'}</h2><p>Only separately authorized, redacted, and approved cases are eligible. No live ingestion or AI training is connected.</p></div><span className={`status ${learningEnabled ? 'good' : 'neutral'}`}>{learningEnabled ? 'Policy active' : 'Disabled'}</span></section>

    <section className="metric-grid" aria-label="Transaction Memory summary"><div className="metric-card"><span>Imported cases</span><strong>{mockTransactionCases.length}</strong><small>Mock metadata only</small></div><div className="metric-card"><span>Approved for learning</span><strong>{approved}</strong><small className="text-success">Human approved</small></div><div className="metric-card"><span>Pending redaction</span><strong>{pending}</strong><small className="text-warning">Review required</small></div><div className="metric-card"><span>Excluded</span><strong>{excluded}</strong><small>Archive only</small></div></section>

    <div className="memory-settings-grid">
      <section className="card span-2"><div className="section-heading"><div><span className="section-kicker">Training Library</span><h2>Prior transaction cases</h2><p>Archive presence never grants training eligibility.</p></div><button className="btn btn-primary" type="button">Import transaction folder</button></div><div className="memory-case-list">{mockTransactionCases.map((item) => <Link className="memory-case-row" href={item.id === 'case-001' ? `/settings/transaction-memory/cases/${item.id}` : '/settings/transaction-memory'} key={item.id}><span className="memory-case-icon" aria-hidden="true">□</span><div><strong>{item.title}</strong><small>{item.sourceFolder} · {item.transactionRole.replace('_',' ')}</small></div><span className={`status ${item.status === 'approved' ? 'good' : item.status === 'excluded' ? 'neutral' : 'warn'}`}>{item.status.replace('_',' ')}</span><div><strong>{item.redactionStatus.replace('_',' ')}</strong><small>{item.approvalStatus.replace('_',' ')}</small></div><span aria-hidden="true">›</span></Link>)}</div><div className="button-row"><Link className="btn btn-secondary" href="/settings/transaction-memory/cases/case-001">Review pending cases</Link><button className="btn btn-quiet" type="button">Export policy summary</button></div></section>

      <aside className="card memory-control-card"><span className="section-kicker">Workspace control</span><h2>Learning eligibility</h2><p>Disabling learning blocks new approvals and future Training Library retrieval. It does not delete the transaction archive.</p><label className="memory-toggle"><input type="checkbox" checked={learningEnabled} onChange={(event) => setLearningEnabled(event.target.checked)} /><span><strong>Allow approved cases</strong><small>Only after redaction and human approval</small></span></label><button className="btn btn-quiet btn-block" type="button" onClick={() => setLearningEnabled((current) => !current)}>{learningEnabled ? 'Disable learning from this workspace' : 'Re-enable workspace learning controls'}</button><div className="notice compact warning"><strong>No blanket authorization.</strong> Workspace policy alone cannot approve a transaction for learning.</div></aside>

      <section className="card"><span className="section-kicker">Privacy safeguards</span><h2>Protected by default</h2><ul className="memory-safeguards"><li>Tenant and team isolation</li><li>Least-privilege case access</li><li>Immutable source/version references</li><li>Human approval before eligibility</li><li>Removal blocks future retrieval</li></ul></section>
      <section className="card"><span className="section-kicker">Redaction policy</span><h2>Policy v1 · Draft</h2><p>Names, contact details, signatures, financial accounts, IDs, and unnecessary freeform notes are detected and reviewed before learning.</p><div className="summary-list"><div><span>High-risk findings</span><strong>Human review</strong></div><div><span>Failed redaction</span><strong>Blocks approval</strong></div><div><span>Source documents</span><strong>Never overwritten</strong></div></div></section>
      <section className="card"><span className="section-kicker">Consent & authority</span><h2>Brokerage-controlled scope</h2><p>Learning approval must reflect lawful authority over the transaction, policy version, intended scope, and any required client authorization.</p><div className="summary-list"><div><span>Workspace owner</span><strong>Red Rock Realty</strong></div><div><span>Policy authority</span><strong>Brokerage admin</strong></div><div><span>Pending case consent</span><strong className="text-warning">Review</strong></div></div></section>
    </div>
  </div>;
}

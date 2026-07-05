'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import { mockLookupSuggestions, mockMissingFacts, mockReviewForms, mockReviewItems, type ReviewAction } from '@/lib/reviewData';

function confidenceTone(confidence: number | null) {
  if (confidence === null || confidence < 60) return 'danger';
  if (confidence < 85) return 'warn';
  return 'good';
}

export function DealDeskReview() {
  const [selectedId, setSelectedId] = useState(mockReviewItems[0].id);
  const [actions, setActions] = useState<Record<string, ReviewAction>>({});
  const selected = mockReviewItems.find((item) => item.id === selectedId) ?? mockReviewItems[0];
  const action = actions[selected.id] ?? 'pending';
  const blockerCount = mockReviewItems.filter((item) => item.priority === 'blocker' && !['approved', 'edited'].includes(actions[item.id] ?? 'pending')).length;
  const warningCount = mockReviewItems.filter((item) => item.priority === 'warning' && !['approved', 'edited', 'dismissed'].includes(actions[item.id] ?? 'pending')).length;
  const readiness = blockerCount > 0 ? 'Not ready' : warningCount > 0 ? 'Needs review' : 'Ready for draft';
  const readinessClass = blockerCount > 0 ? 'danger' : warningCount > 0 ? 'warn' : 'good';
  const score = useMemo(() => Math.max(20, 100 - blockerCount * 30 - warningCount * 12), [blockerCount, warningCount]);

  function setReviewAction(nextAction: ReviewAction) {
    setActions((current) => ({ ...current, [selected.id]: nextAction }));
  }

  return (
    <div className="deal-review-page">
      <section className="readiness-card card">
        <div className="readiness-score"><div className={`readiness-ring ${readinessClass}`} style={{'--score': `${score * 3.6}deg`} as CSSProperties}><span>{score}</span><small>/ 100</small></div><div><span className="section-kicker">Draft readiness</span><h2>{readiness}</h2><p>Readiness summarizes review progress. It never substitutes for agent approval.</p></div></div>
        <div className="readiness-counts"><div><span className="review-icon danger">!</span><strong>{blockerCount}</strong><small>Blockers</small></div><div><span className="review-icon warning">?</span><strong>{warningCount}</strong><small>Warnings</small></div><div><span className="review-icon neutral">✓</span><strong>{Object.values(actions).filter((value) => ['approved', 'edited'].includes(value)).length}</strong><small>Resolved</small></div></div>
        <button className="btn btn-primary" type="button" disabled={readiness !== 'Ready for draft'}>Approve terms for draft</button>
      </section>

      <div className="deal-review-layout">
        <aside className="card review-queue-panel">
          <div className="section-heading"><div><span className="section-kicker">Prioritized queue</span><h2>Review items</h2></div><span className="count-badge">5</span></div>
          <div className="deal-review-queue">{mockReviewItems.map((item) => { const itemAction = actions[item.id] ?? 'pending'; return <button className={`${selectedId === item.id ? 'active' : ''}`} type="button" onClick={() => setSelectedId(item.id)} key={item.id}><span className={`review-priority ${item.priority}`} aria-hidden="true" /><span><strong>{item.title}</strong><small>{item.relatedRecord}</small></span><span className={`queue-state ${itemAction}`}>{itemAction === 'pending' ? item.priority : itemAction}</span></button>; })}</div>
        </aside>

        <main className="card review-detail-panel">
          <div className="review-detail-header"><div><span className="section-kicker">{selected.issueType.replace('_', ' ')}</span><h2>{selected.title}</h2><p>{selected.relatedRecord}</p></div><span className={`status ${selected.priority === 'blocker' ? 'danger' : selected.priority === 'warning' ? 'warn' : 'good'}`}>{selected.priority}</span></div>
          <div className="review-detail-grid"><div><span>Extracted value</span><strong>{selected.extractedValue ?? 'No value extracted'}</strong></div><div><span>Confidence</span>{selected.confidence === null ? <strong>Not available</strong> : <span className={`confidence-pill ${confidenceTone(selected.confidence)}`}>{selected.confidence}% confidence</span>}</div></div>
          <div className="review-evidence"><span>Source evidence</span><blockquote>{selected.sourceSnippet ?? 'No transcript snippet applies to this readiness item.'}</blockquote></div>
          <div className="review-explanation"><div><span>Why Accord flagged it</span><p>{selected.flaggedBecause}</p></div><div><span>Recommended action</span><p>{selected.recommendedAction}</p></div></div>
          {selected.id === 'seller' && <VerifiedLookupSuggestion />}
          <div className="review-detail-actions"><span className={`review-action-state ${action}`}>{action === 'pending' ? 'Awaiting agent decision' : `Marked ${action}`}</span><button className="btn btn-quiet" type="button" onClick={() => setReviewAction('dismissed')}>Dismiss</button><button className="btn btn-quiet" type="button" onClick={() => setReviewAction('unknown')}>Mark Unknown</button><button className="btn btn-secondary" type="button" onClick={() => setReviewAction('edited')}>Edit</button><button className="btn btn-primary" type="button" onClick={() => setReviewAction('approved')}>Approve</button></div>
        </main>
      </div>

      <div className="review-lower-grid">
        <section className="card missing-facts-panel"><div className="section-heading"><div><span className="section-kicker">Completeness</span><h2>Missing Facts</h2><p>Required facts block draft preparation; optional facts remain visible.</p></div></div><div className="missing-fact-groups"><FactGroup title="Required before draft" tone="danger" items={mockMissingFacts.filter((item) => item.category === 'required')} /><FactGroup title="Recommended, optional" tone="warn" items={mockMissingFacts.filter((item) => item.category === 'recommended')} /><FactGroup title="Unknown / not applicable" tone="neutral" items={mockMissingFacts.filter((item) => item.category === 'unknown')} /></div></section>

        <section className="card review-forms-panel"><div className="section-heading"><div><span className="section-kicker">Recommended package</span><h2>MVP forms</h2><p>Every form remains subject to agent review and current template verification.</p></div><span className="status warn">Needs approval</span></div><div className="review-form-list">{mockReviewForms.map((form) => <article key={form.id}><div><strong>{form.name}</strong><span className={`status ${form.requirement === 'required' ? 'good' : form.requirement === 'recommended' ? 'warn' : 'neutral'}`}>{form.requirement}</span></div><p>{form.reason}</p><div className="form-meta"><span>{form.missingFields.length ? `${form.missingFields.length} missing field${form.missingFields.length > 1 ? 's' : ''}` : 'No missing fields'}</span><strong>{form.approvalStatus.replace('_', ' ')}</strong></div></article>)}</div></section>
      </div>
    </div>
  );
}

function FactGroup({ title, tone, items }: { title: string; tone: string; items: typeof mockMissingFacts }) {
  return <div className="fact-group"><div className="fact-group-heading"><span className={`review-icon ${tone}`}>{tone === 'danger' ? '!' : tone === 'warn' ? '?' : '—'}</span><strong>{title}</strong><small>{items.length}</small></div>{items.map((item) => <div className="fact-row" key={item.id}><span><strong>{item.label}</strong><small>{item.value ?? 'No confirmed value'}</small></span>{item.lookupSuggestion ? <button type="button">Suggest lookup</button> : <button type="button">Review</button>}</div>)}</div>;
}

function VerifiedLookupSuggestion() {
  return <div className="verified-lookup-card"><div><span className="section-kicker">Future concept · Mock only</span><h3>Verified Lookup</h3><p>Accord can suggest an approved external source when a fact is missing. No lookup runs without user approval.</p></div><div className="lookup-options">{mockLookupSuggestions.map((suggestion) => <div key={suggestion.id}><span><strong>{suggestion.providerType}</strong><small>{suggestion.reason}</small></span><button className="btn btn-secondary" type="button">Approve mock lookup</button></div>)}</div><small className="lookup-footnote">Future results must retain source attribution, retrieval time, confidence, and mapped field. External facts remain unapproved until the agent accepts them.</small></div>;
}

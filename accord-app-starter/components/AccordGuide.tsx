'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { mockGuideVideos } from '@/lib/clientEducation';

type DocumentStatus = 'Ready to view' | 'Needs signature' | 'Signed' | 'Updated' | 'Waiting on other party';

const progress = [
  ['Signed offer', 'complete', 'Jul 5'],
  ['Earnest money', 'current', 'Due Jul 7'],
  ['Inspection', 'upcoming', 'By Jul 17'],
  ['Appraisal', 'upcoming', 'By Jul 24'],
  ['Closing', 'upcoming', 'Jul 31']
] as const;

const todos = [
  ['Sign documents', 'Done'],
  ['Deliver earnest money', 'Due soon'],
  ['Schedule inspection', 'Next'],
  ['Review disclosures', 'Waiting'],
  ['Confirm wire instructions with title company', 'Safety'],
  ['Upload requested documents', 'Later'],
  ['Complete final walkthrough', 'Before closing']
];

const documents: Array<[string, string, DocumentStatus, string]> = [
  ['Purchase contract', 'Utah REPC', 'Signed', '/client-view/documents/purchase-contract'],
  ['Addenda', 'Personal property addendum', 'Ready to view', '/client-view/documents/purchase-contract'],
  ['Disclosures', 'Wire fraud disclosure', 'Ready to view', '/client-view/documents/purchase-contract'],
  ['Signed documents', 'Signature packet', 'Waiting on other party', '/client-view/documents/purchase-contract'],
  ['Important uploads', 'Inspection invoice placeholder', 'Updated', '/client-view/documents/purchase-contract']
];

const dates = [
  ['Jul 7', 'Earnest money due'],
  ['Jul 17', 'Inspection deadline'],
  ['Jul 24', 'Financing & appraisal'],
  ['Jul 31', 'Settlement target']
];

const sections = [
  {
    id: 'price',
    label: 'Purchase price',
    section: 'REPC Section 2',
    x: 62,
    y: 22,
    explanation: 'This is the price offered for the home.',
    detail: 'Your approved purchase price is $875,000.',
    video: 'What Happens After Signing?'
  },
  {
    id: 'earnest',
    label: 'Earnest money',
    section: 'REPC Section 3',
    x: 40,
    y: 38,
    explanation: 'Earnest money is a deposit tied to the offer and deadlines.',
    detail: 'Your earnest money is $7,500, due July 7, held by Red Rock Title.',
    video: 'Earnest Money in 90 Seconds'
  },
  {
    id: 'dd',
    label: 'Due diligence',
    section: 'REPC Section 8',
    x: 70,
    y: 58,
    explanation: 'This is the period for inspections and buyer review.',
    detail: 'Your inspection deadline is July 17.',
    video: 'What Due Diligence Means'
  },
  {
    id: 'settlement',
    label: 'Settlement',
    section: 'REPC Section 24',
    x: 48,
    y: 78,
    explanation: 'Settlement is when the closing paperwork and funds are handled.',
    detail: 'Your target settlement date is July 31, pending final confirmation.',
    video: 'Understanding Settlement'
  }
];

function AskAccord({ placeholder }: { placeholder: string }) {
  return (
    <form className="ask-accord" aria-label="Ask Accord mock chat">
      <label>
        <span>Ask Accord</span>
        <textarea placeholder={placeholder} />
      </label>
      <button className="btn btn-primary" type="button">Ask</button>
      <small>Mock only. Uses approved client-visible documents, facts, and education.</small>
    </form>
  );
}

export function AccordGuide({ documentMode = false }: { documentMode?: boolean }) {
  const [selected, setSelected] = useState(sections[1]);
  const contextualVideos = useMemo(() => mockGuideVideos.filter((video) => video.topic === 'earnest_money' || video.topic === 'due_diligence').slice(0, 2), []);

  if (documentMode) {
    return (
      <div className="client-page">
        <section className="client-doc-toolbar card">
          <div>
            <span className="section-kicker">Document Help</span>
            <h2>Purchase contract</h2>
          </div>
          <Link className="btn btn-secondary" href="/client-view">Back to transaction</Link>
        </section>

        <div className="document-viewer-layout">
          <section className="card pdf-viewer-card" aria-label="Mock document viewer">
            <div className="mock-pdf-page">
              <div className="pdf-head">Utah Real Estate Purchase Contract</div>
              <div className="pdf-line wide" />
              <div className="pdf-line" />
              <div className="pdf-line short" />
              <div className="pdf-block" />
              <div className="pdf-line wide" />
              <div className="pdf-line" />
              <div className="pdf-block small" />
              {sections.map((section) => (
                <button
                  className={`pdf-marker ${selected.id === section.id ? 'active' : ''}`}
                  style={{ left: `${section.x}%`, top: `${section.y}%` }}
                  type="button"
                  onClick={() => setSelected(section)}
                  aria-label={`Explain ${section.label}`}
                  key={section.id}
                >
                  ?
                </button>
              ))}
            </div>
          </section>

          <aside className="card document-help-panel">
            <span className="section-kicker">{selected.section}</span>
            <h2>{selected.label}</h2>
            <p>{selected.explanation}</p>
            <div className="client-detail"><strong>Your transaction</strong><span>{selected.detail}</span></div>
            <div className="video-mini"><span aria-hidden="true">▶</span><div><strong>{selected.video}</strong><small>Short video · Mock</small></div></div>
            <small className="source-line">Source: {selected.section}</small>
            <AskAccord placeholder="Ask what this document means..." />
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="client-page">
      <section className="client-home-hero">
        <div>
          <span className="section-kicker light">Client View</span>
          <h2>Your Home Purchase</h2>
          <p>2948 E Alderann St · Offer signed</p>
        </div>
        <Link className="btn" href="/client-view/documents/purchase-contract">Open documents</Link>
      </section>

      <div className="client-home-grid">
        <section className="card">
          <div className="section-heading"><div><span className="section-kicker">Status</span><h2>Your Progress</h2></div><span className="status warn">Earnest money</span></div>
          <div className="client-progress">
            {progress.map(([label, state, date]) => (
              <div className={state} key={label}><i>{state === 'complete' ? '✓' : ''}</i><span><strong>{label}</strong><small>{date}</small></span></div>
            ))}
          </div>
        </section>

        <section className="card">
          <span className="section-kicker">Important dates</span>
          <h2>Coming up</h2>
          <div className="deadline-list">
            {dates.map(([date, label]) => <div key={label}><time>{date}</time><span><strong>{label}</strong><small>Ask your agent before making decisions.</small></span></div>)}
          </div>
        </section>
      </div>

      <div className="client-home-grid">
        <section className="card">
          <div className="section-heading"><div><span className="section-kicker">Documents</span><h2>Your documents</h2></div></div>
          <div className="client-doc-list">
            {documents.map(([title, detail, status, href]) => (
              <Link href={href} key={title}>
                <span><strong>{title}</strong><small>{detail}</small></span>
                <span className={`status ${status === 'Needs signature' || status === 'Waiting on other party' ? 'warn' : status === 'Signed' ? 'good' : 'neutral'}`}>{status}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="card">
          <span className="section-kicker">To-do list</span>
          <h2>Next steps</h2>
          <div className="client-todo-list">
            {todos.map(([todo, status]) => <label key={todo}><input type="checkbox" defaultChecked={status === 'Done'} /><span><strong>{todo}</strong><small>{status}</small></span></label>)}
          </div>
        </section>
      </div>

      <section className="card chat-card">
        <AskAccord placeholder="Ask a question about your transaction..." />
      </section>

      <section className="card learn-strip">
        <div className="section-heading"><div><span className="section-kicker">Learn</span><h2>Helpful right now</h2></div></div>
        <div className="guide-videos">
          {contextualVideos.map((video) => (
            <article key={video.id}>
              <div className="video-placeholder"><span>▶</span><small>{Math.round(video.durationSeconds / 60)} min</small></div>
              <strong>{video.title}</strong>
              <small>{video.contractSection} · {video.jurisdiction}</small>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

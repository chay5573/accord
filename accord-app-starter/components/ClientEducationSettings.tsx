import Link from 'next/link';
import { mockGuideVideos } from '@/lib/clientEducation';

const questions = ['What am I signing?', 'What is earnest money?', 'Should I waive this deadline?'];

export function ClientEducationSettings() {
  return <div className="settings-foundation">
    <section className="card foundation-banner"><div><span className="section-kicker">Future module · Off by default</span><h2>Accord Guide</h2><p>Govern the transaction-, stage-, role-, jurisdiction-, and document-aware client explanation experience.</p></div><Link className="btn btn-secondary" href="/accord-guide">Open agent preview</Link></section>
    <div className="foundation-metrics"><div className="card"><span>Client access</span><strong>Off</strong><small>No client authentication</small></div><div className="card"><span>Governed content</span><strong>{mockGuideVideos.length} videos</strong><small>Accord-produced mock previews</small></div><div className="card"><span>Client-visible facts</span><strong>2 approved</strong><small>Agent-controlled</small></div><div className="card"><span>Question review queue</span><strong>2</strong><small>One escalation</small></div></div>
    <div className="foundation-grid"><section className="card"><span className="section-kicker">Question routing</span><h2>Example client questions</h2><div className="simple-list">{questions.map((question,index) => <div key={question}><strong>{question}</strong><span className={`status ${index===2?'danger':'neutral'}`}>{index===2?'Agent escalation':'Sourced answer'}</span></div>)}</div></section><section className="card"><span className="section-kicker">Content governance</span><h2>Accord Guide videos</h2><div className="simple-list">{mockGuideVideos.slice(0,3).map(video => <div key={video.id}><span><strong>{video.title}</strong><small>{video.transactionStages[0].replaceAll('_',' ')} · {video.formDocument} {video.contractSection} · reviewed {video.reviewedAt}</small></span><span className="status good">{video.status}</span></div>)}</div></section></div>
    <section className="card guardrail-card"><strong>Accord Guide uses only approved client-visible materials and does not provide legal, tax, financial, lending, inspection, or negotiation advice.</strong><p>Judgment and legal questions route to the agent. Every answer cites an approved document section or governed Accord Guide item.</p><button className="btn btn-secondary" type="button" disabled>Enable client access</button></section>
  </div>;
}

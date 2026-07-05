import { mockEducationVideos } from '@/lib/clientEducation';

const questions = ['What am I signing?', 'What is earnest money?', 'What changed from the last version?'];

export function ClientEducationSettings() {
  return <div className="settings-foundation">
    <section className="card foundation-banner"><div><span className="section-kicker">Future module · Off by default</span><h2>Client Portal / Education</h2><p>Design the client explanation experience without enabling client login, messaging, live AI, or document access.</p></div><span className="status neutral">Disabled</span></section>
    <div className="foundation-metrics"><div className="card"><span>Client portal</span><strong>Off</strong><small>No client access issued</small></div><div className="card"><span>Education Library</span><strong>{mockEducationVideos.length} examples</strong><small>Approved synthetic previews</small></div><div className="card"><span>Client-visible documents</span><strong>2 mock</strong><small>Agent approval required</small></div><div className="card"><span>Question review queue</span><strong>3</strong><small>Example questions</small></div></div>
    <div className="foundation-grid">
      <section className="card"><span className="section-kicker">Signing explanations</span><h2>Example client questions</h2><div className="simple-list">{questions.map((question) => <div key={question}><strong>{question}</strong><span className="status neutral">Agent review</span></div>)}</div></section>
      <section className="card"><span className="section-kicker">Education recommendations</span><h2>Approved video examples</h2><div className="simple-list">{mockEducationVideos.map((video) => <div key={video.id}><span><strong>{video.title}</strong><small>{video.transactionStage.replaceAll('_', ' ')} · {video.form} {video.section}</small></span><span className="status good">Approved</span></div>)}</div></section>
    </div>
    <section className="card guardrail-card"><strong>Client AI uses only approved client-visible materials and does not provide legal, tax, financial, lending, inspection, or negotiation advice.</strong><p>Every future answer must cite an approved document section, education article, or video. Internal notes, strategy, playbooks, unapproved drafts, and confidential opposing-party information remain inaccessible.</p><button className="btn btn-secondary" type="button" disabled>Enable client portal</button></section>
  </div>;
}

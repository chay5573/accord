import { Shell } from '@/components/Shell';

export default function Compliance() {
  return (
    <Shell active="compliance">
      <div className="topbar"><div><div className="eyebrow">Settings · Privacy & compliance</div><h1>Controls built into the workflow.</h1><p className="page-lead">Mock policy settings preview expected safeguards; they are not connected to production services.</p></div><span className="status neutral">Mock settings</span></div>
      <section className="grid grid-2">
        <div className="card form-section"><div className="form-section-title"><span>01</span><div><h2>Recording consent</h2><p>Recording stays off until the agent confirms all required parties consent for that conversation.</p></div></div><label>Consent policy<select defaultValue="required"><option value="required">Require confirmation before recording</option></select></label><div className="notice compact warning"><strong>No administrative bypass in the mock.</strong> Transcript paste and manual entry remain available without recording.</div></div>
        <div className="card form-section"><div className="form-section-title"><span>02</span><div><h2>Data retention</h2><p>The strictest applicable organization or transaction policy should win.</p></div></div><div className="field-grid"><label>Recordings<select defaultValue="delete"><option value="delete">Delete after transcription</option><option value="30">Keep 30 days</option><option value="90">Keep 90 days</option></select></label><label>Transcripts<select defaultValue="transaction"><option value="transaction">Keep with transaction file</option><option value="closing">Delete after closing</option></select></label></div></div>
        <div className="card"><span className="section-kicker">Least privilege</span><h2>Role-based access</h2><div className="summary-list"><div><span>Agent</span><strong>Transaction owner</strong></div><div><span>Team admin</span><strong>Team scope</strong></div><div><span>Broker reviewer</span><strong>Assigned review</strong></div><div><span>Client guest</span><strong>Limited, expiring</strong></div></div></div>
        <div className="card"><span className="section-kicker">Accountability</span><h2>Audit-aware events</h2><p>Future audit records cover access, AI suggestions, agent edits and approvals, generation, downloads, sharing, retention, and deletion without duplicating sensitive document content.</p><button className="btn btn-secondary btn-block" type="button">View mock timeline</button></div>
      </section>
    </Shell>
  );
}

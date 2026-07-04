import { Shell } from '@/components/Shell';

export default function Compliance() {
  return (
    <Shell active="compliance">
      <div className="topbar"><div><div className="eyebrow">Privacy & Compliance</div><h1>Privacy controls built into every transaction.</h1></div></div>
      <section className="grid grid-2">
        <div className="card form-stack">
          <h2>Recording Consent</h2>
          <div className="notice">Accord defaults to no recording until the agent confirms all required parties consent.</div>
          <label><select defaultValue="required"><option value="required">Require consent confirmation before recording</option><option>Allow admin override</option></select></label>
        </div>
        <div className="card form-stack">
          <h2>Data Retention</h2>
          <label>Recordings<select><option>Delete after transcription</option><option>Keep 30 days</option><option>Keep 90 days</option></select></label>
          <label>Transcripts<select><option>Keep with transaction file</option><option>Delete after 90 days</option><option>Delete after closing</option></select></label>
        </div>
        <div className="card">
          <h2>Role-Based Access</h2>
          <div className="kv" style={{marginTop: 14}}><div><span>Agent</span><strong>Owner</strong></div><div><span>Team Admin</span><strong>Manage team</strong></div><div><span>Broker Reviewer</span><strong>Review</strong></div><div><span>Client Guest</span><strong>Limited access</strong></div></div>
        </div>
        <div className="card">
          <h2>Audit Trail</h2>
          <p>Logs access, AI suggestions, agent approvals, edits, generated documents, downloads, and sharing events.</p>
          <div className="button-row"><button className="btn">View Audit Log</button></div>
        </div>
      </section>
    </Shell>
  );
}

import { Shell } from '@/components/Shell';
import { mockPackageForms } from '@/lib/mockData';

export default function ContractLibrary() {
  return (
    <Shell active="library">
      <div className="topbar"><div><div className="eyebrow">Settings · Mock library</div><h1>Contract Library</h1><p className="page-lead">Govern approved templates, mappings, and future brokerage forms here.</p></div><span className="status neutral">Utah starter set · Mock only</span></div>
      <section className="metric-grid" aria-label="Contract library summary"><div className="metric-card"><span>Starter forms</span><strong>5</strong><small>Mock metadata only</small></div><div className="metric-card"><span>Included by default</span><strong>2</strong><small>Office playbook preview</small></div><div className="metric-card"><span>Mapped templates</span><strong>0</strong><small className="text-warning">Not yet verified</small></div><div className="metric-card"><span>Custom forms</span><strong>0</strong><small>No uploads connected</small></div></section>
      <section className="card"><div className="section-heading"><div><span className="section-kicker">Governed in Settings</span><h2>Utah starter checklist</h2><p>These names support the mock workflow. Accord does not assert licensing, current official versions, or completed mappings.</p></div><button className="btn btn-secondary" type="button">Add form placeholder</button></div><div className="package-list">{mockPackageForms.map((form) => <div className="package-row" key={form.id}><span className="file-icon" aria-hidden="true">□</span><span><strong>{form.name}</strong><small>{form.reason}</small></span><span className="status neutral">Mock definition</span></div>)}</div></section>
    </Shell>
  );
}

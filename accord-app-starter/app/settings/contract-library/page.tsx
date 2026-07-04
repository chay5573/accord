import { Shell } from '@/components/Shell';

export default function ContractLibrary() {
  return (
    <Shell active="library">
      <div className="topbar"><div><div className="eyebrow">Settings</div><h1>Contract Library</h1></div><span className="status good">Utah package active</span></div>
      <section className="grid grid-3">
        <div className="card"><h2>Utah Forms</h2><p>Official state forms are maintained by Accord when licensed and available.</p><div className="metric">102</div><p>forms available</p></div>
        <div className="card"><h2>Fillable Forms</h2><p>Mapped to central transaction schema for contract generation.</p><div className="metric">5</div><p>MVP forms ready</p></div>
        <div className="card"><h2>Custom Forms</h2><p>Brokerage-specific forms can be added here, not from the main dashboard.</p><div className="metric">0</div><p>custom forms</p></div>
      </section>
      <section className="card" style={{marginTop: 20}}>
        <h2>Template Status</h2>
        <table className="table"><thead><tr><th>Form</th><th>Status</th><th>Version</th></tr></thead><tbody>
          <tr><td>Utah REPC</td><td><span className="status good">Mapped</span></td><td>2024.12</td></tr>
          <tr><td>Addendum</td><td><span className="status good">Mapped</span></td><td>Current</td></tr>
          <tr><td>Counteroffer</td><td><span className="status warn">MVP pending</span></td><td>Current</td></tr>
          <tr><td>Unrepresented Buyer Disclosure</td><td><span className="status good">Mapped</span></td><td>2025.05</td></tr>
          <tr><td>Buyer Due Diligence Checklist</td><td><span className="status good">Mapped</span></td><td>2025.05</td></tr>
        </tbody></table>
      </section>
    </Shell>
  );
}

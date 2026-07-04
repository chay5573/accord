import { Shell } from '@/components/Shell';

export default function Dashboard() {
  return (
    <Shell active="dashboard">
      <div className="topbar">
        <div>
          <div className="eyebrow">Accord Deal Desk</div>
          <h1>Transactions at command level.</h1>
        </div>
        <span className="status good">Secure workspace active</span>
      </div>

      <section className="grid grid-3">
        <div className="card">
          <h2>New Transaction</h2>
          <p>Create the transaction container first, then start conversations, draft forms, and manage the package.</p>
          <div className="button-row"><a className="btn btn-primary" href="/transactions/new">Start New Transaction</a></div>
        </div>
        <div className="card">
          <h2>Continue Recent</h2>
          <p>2948 E Alderann St · Draft package awaiting agent review.</p>
          <div className="button-row"><a className="btn btn-secondary" href="/transactions/txn-demo">Open Transaction</a></div>
        </div>
        <div className="card">
          <h2>Compliance</h2>
          <p>Recording consent, retention rules, audit trails, and role-based access are enabled by default.</p>
          <div className="button-row"><a className="btn" href="/settings/compliance">Review Settings</a></div>
        </div>
      </section>

      <section className="card" style={{marginTop: 20}}>
        <h2>Deal Pipeline</h2>
        <table className="table">
          <thead><tr><th>Transaction</th><th>Status</th><th>Owner</th><th>Next Step</th></tr></thead>
          <tbody>
            <tr><td>2948 E Alderann St</td><td><span className="status warn">Draft review</span></td><td>Calvin Hayward</td><td>Approve REPC terms</td></tr>
            <tr><td>346 E Homeside Rd</td><td><span className="status good">Executed</span></td><td>Team Deal Desk</td><td>Track deadlines</td></tr>
          </tbody>
        </table>
      </section>
    </Shell>
  );
}

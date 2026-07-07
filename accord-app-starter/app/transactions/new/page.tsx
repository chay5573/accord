import Link from 'next/link';
import { Shell } from '@/components/Shell';

export default function NewTransaction() {
  return (
    <Shell active="new">
      <div className="topbar">
        <div>
          <div className="eyebrow">Manual transaction · Secondary mock workflow</div>
          <h1>Start with what you know.</h1>
          <p className="page-lead">Accord can fill missing facts from conversations. Manual setup stays secondary to Record.</p>
        </div>
        <Link className="btn btn-secondary" href="/record">Record instead</Link>
      </div>
      <div className="new-transaction-layout">
        <form className="card transaction-form compact-transaction-form">
          <div className="notice"><strong>Only a few details are needed to open a workspace.</strong> Leave unknown facts blank and attach a conversation later.</div>
          <div className="form-block">
            <span className="section-kicker">Essentials</span>
            <h2>What do you know right now?</h2>
            <div className="field-grid">
              <label>Transaction type<select defaultValue="buyer-offer"><option value="unknown">Not sure yet</option><option value="buyer-offer">Buyer offer</option><option value="listing">Listing</option><option value="new-construction">Builder / new construction</option><option value="investment">Investment purchase</option></select></label>
              <label>Client type<select defaultValue="buyer"><option value="unknown">Not sure yet</option><option value="buyer">Buyer</option><option value="seller">Seller</option><option value="builder">Builder</option><option value="investor">Investor</option></select></label>
              <label>Client name(s)<input placeholder="Optional legal or working name" /></label>
              <label>Property address<input placeholder="Optional street or property reference" /></label>
              <label>Financing type<select defaultValue="unknown"><option value="unknown">Not confirmed</option><option value="cash">Cash</option><option value="conventional">Conventional</option><option value="fha">FHA</option><option value="va">VA</option><option value="seller-financing">Seller financing</option></select></label>
              <label>State<select defaultValue="UT"><option value="UT">Utah</option></select></label>
            </div>
          </div>
          <div className="form-actions"><Link className="btn btn-quiet" href="/coordinate">Cancel</Link><button className="btn btn-secondary" type="button">Save mock draft</button><Link className="btn btn-primary" href="/transactions/txn-demo">Create mock workspace →</Link></div>
        </form>
        <aside className="card guidance-card">
          <span className="section-kicker">Record-first option</span>
          <h2>Have a conversation or notes?</h2>
          <p>Record or recover the work and let Accord suggest the parties, property, and likely paperwork from source-grounded mock extraction.</p>
          <Link className="btn btn-primary btn-block" href="/record">Record Conversation</Link>
          <ul className="plain-list">
            <li>Missing facts remain visible.</li>
            <li>No transaction is auto-created without review.</li>
            <li>No AI or storage provider is connected.</li>
            <li>No contract package is generated.</li>
          </ul>
        </aside>
      </div>
    </Shell>
  );
}

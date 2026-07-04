import { Shell } from '@/components/Shell';

const extracted = [
  ['Purchase Price', '$875,000', '98%'],
  ['Earnest Money', '$7,500', '97%'],
  ['Seller Closing Cost Contribution', '$14,000', '96%'],
  ['Due Diligence Deadline', 'July 13, 2026', '93%'],
  ['Financing & Appraisal Deadline', 'July 20, 2026', '94%'],
  ['Settlement Deadline', 'July 30, 2026', '91%'],
  ['Home Warranty', '$700 paid by Seller', '89%']
];

export default function TransactionDetail() {
  return (
    <Shell active="dashboard">
      <div className="topbar">
        <div><div className="eyebrow">Transaction Workspace</div><h1>2948 E Alderann St</h1></div>
        <span className="status warn">Agent review required</span>
      </div>
      <div className="grid grid-2">
        <section className="card form-stack">
          <h2>Conversation Intake</h2>
          <div className="notice">Recording requires consent confirmation before audio capture. Paste transcript is available for current MVP testing.</div>
          <label>Transcript<textarea defaultValue={'875 purchase price with 14,000 in closing costs. Two weeks due diligence from Monday and three weeks financing and appraisal. Buyers are Brenton Welker and Emily Welker. Earnest money should be 7,500. Home warranty around 700 in addition to closing costs.'} /></label>
          <div className="button-row"><button className="btn btn-primary">Extract Deal Terms</button><button className="btn">Start Conversation</button></div>
        </section>
        <section className="card">
          <h2>Recommended Package</h2>
          <div className="kv" style={{marginTop: 14}}>
            <div><span>REPC</span><strong>Required</strong></div>
            <div><span>Addendum — Closing Costs</span><strong>$14,000</strong></div>
            <div><span>Unrepresented Buyer Disclosure</span><strong>Recommended</strong></div>
            <div><span>Buyer Due Diligence Checklist</span><strong>Recommended</strong></div>
            <div><span>Subject to Sale Addendum</span><strong>Detected</strong></div>
          </div>
        </section>
      </div>
      <section className="card" style={{marginTop: 20}}>
        <h2>Editable Offer Terms</h2>
        <p>AI prepares the draft. Agent approves every contract term before package generation.</p>
        <div className="form-stack" style={{marginTop: 16}}>
          {extracted.map(([label, value, confidence]) => (
            <div className="review-field" key={label}>
              <strong>{label}</strong><input defaultValue={value} /><span className="confidence">{confidence}</span>
            </div>
          ))}
        </div>
        <div className="button-row"><button className="btn btn-primary">Approve Draft Package</button><button className="btn">Request Broker Review</button><button className="btn">Save to Accord Cloud</button></div>
      </section>
    </Shell>
  );
}

import { Shell } from '@/components/Shell';

export default function Onboarding() {
  return (
    <Shell active="onboarding">
      <div className="topbar">
        <div><div className="eyebrow">Office Profile</div><h1>Teach Accord how your business runs.</h1></div>
      </div>
      <div className="notice">Onboarding is designed as a 10–20 minute interview. Required basics come first; deeper office playbook rules can be added later and refined from real transactions.</div>
      <section className="grid grid-2" style={{marginTop: 20}}>
        <div className="card form-stack">
          <h2>Brokerage & Identity</h2>
          <label>Brokerage Name<input defaultValue="ERA Brokers Consolidated SG" /></label>
          <label>Agent Name<input defaultValue="Calvin Hayward" /></label>
          <label>License Number<input defaultValue="13760581-SA00" /></label>
          <label>Team / Brokerage Access Model<select defaultValue="agent-team-brokerage"><option value="agent-team-brokerage">Agent + Team/Brokerage</option></select></label>
        </div>
        <div className="card form-stack">
          <h2>Contract Defaults</h2>
          <label>Default Due Diligence Period<input placeholder="e.g. 10–14 days" /></label>
          <label>Default Financing/Appraisal Period<input placeholder="e.g. 21 days" /></label>
          <label>Default Possession<select><option>Upon Recording</option><option>24 hours after Recording</option><option>Negotiated</option></select></label>
          <label>Default Home Warranty<select><option>Ask case-by-case</option><option>Usually request</option><option>Usually omit</option></select></label>
        </div>
        <div className="card form-stack">
          <h2>Preferred Vendors</h2>
          <label>Preferred Title Company<input placeholder="e.g. Southern Utah Title Company" /></label>
          <label>Preferred Lender(s)<input placeholder="Names or teams" /></label>
          <label>Preferred Inspector(s)<input /></label>
        </div>
        <div className="card form-stack">
          <h2>Office Playbook</h2>
          <label>Unwritten Rules<textarea placeholder="Example: Never send REPC without Buyer Due Diligence Checklist. Use title-held earnest money on unrepresented buyer transactions." /></label>
        </div>
      </section>
    </Shell>
  );
}

import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { mockTeachAccordRules } from '@/lib/teachAccord';

const settings = [
  ['Contract Library', 'Forms, versions, mappings, and active templates.', '/settings/contract-library'],
  ['E-Signature', 'Preferred provider, review behavior, and signed-document return.', '/settings/e-signature'],
  ['Inbox Integrations', 'Mailbox connections and monitored scopes.', '/settings/inbox-integrations'],
  ['Transaction Memory', 'Training eligibility, redaction, and case review.', '/settings/transaction-memory'],
  ['Accord Guide', 'Client-visible facts, governed education, and preview controls.', '/settings/client-education'],
  ['Privacy & Compliance', 'Consent, retention, access, and audit controls.', '/settings/compliance'],
  ['Office Profile', 'Brokerage identity, defaults, vendors, and playbook.', '/onboarding']
];

export default function SettingsPage() {
  return (
    <Shell active="settings">
      <header className="topbar">
        <div>
          <span className="eyebrow">Configuration</span>
          <h1>Settings</h1>
          <p className="page-lead">Configure Accord outside the everyday Record → Review & Send → Coordinate flow.</p>
        </div>
      </header>

      <section className="card teach-accord-card">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Teach Accord</span>
            <h2>Explainable preferences and office playbook rules</h2>
            <p>Agents and admins can suggest defaults without changing the AI model directly. Broader application requires approval.</p>
          </div>
          <button className="btn btn-secondary" type="button">Suggest rule</button>
        </div>
        <div className="calm-list">
          {mockTeachAccordRules.map((rule) => (
            <div className="calm-row" key={rule.id}>
              <span><strong>{rule.title}</strong><small>{rule.ruleText}</small></span>
              <span className={`status ${rule.status === 'approved' ? 'good' : rule.status === 'suggested' ? 'warn' : 'neutral'}`}>{rule.scope} · {rule.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="settings-index">
        {settings.map(([title, detail, href]) => (
          <Link className="card" href={href} key={title}>
            <div><strong>{title}</strong><span>{detail}</span></div>
            <span aria-hidden="true">›</span>
          </Link>
        ))}
      </section>
    </Shell>
  );
}

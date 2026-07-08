import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { mockStoragePreference } from '@/lib/storagePreferences';
import { mockTeachAccordRules } from '@/lib/teachAccord';

const settings = [
  ['Contract Library', 'Forms, versions, mappings, and active templates.', '/settings/contract-library'],
  ['E-Signature', 'Preferred provider, review behavior, and signed-document return.', '/settings/e-signature'],
  ['Inbox Integrations', 'Mailbox connections and monitored scopes.', '/settings/inbox-integrations'],
  ['Storage & Files', 'Default destination, folder naming, local export, and sync placeholders.', '/settings#storage-files'],
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

      <section className="card storage-settings-card" id="storage-files">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Storage & Files</span>
            <h2>File destination</h2>
          </div>
          <span className="status neutral">Mock only</span>
        </div>
        <div className="storage-options">
          <label><input type="radio" name="destination" defaultChecked={mockStoragePreference.defaultDestination === 'accord_cloud'} /><span><strong>Accord Cloud</strong><small>Canonical mock workspace storage</small></span></label>
          <label><input type="radio" name="destination" defaultChecked={mockStoragePreference.defaultDestination === 'onedrive'} /><span><strong>OneDrive</strong><small>Placeholder · not connected</small></span></label>
          <label><input type="radio" name="destination" defaultChecked={mockStoragePreference.defaultDestination === 'local_export'} /><span><strong>Local computer / export folder</strong><small>Future browser picker, downloads, or desktop companion</small></span></label>
        </div>
        <details className="prepare-details">
          <summary>Advanced file preferences</summary>
          <div>
            <p><strong>Folder naming:</strong> {mockStoragePreference.folderNamingConvention}</p>
            <p><strong>Local export:</strong> Desktop companion placeholder. No local filesystem writes are implemented.</p>
            <p><strong>Accord Cloud:</strong> {mockStoragePreference.accordCloudStatus.replaceAll('_', ' ')}</p>
            <p><strong>OneDrive:</strong> {mockStoragePreference.oneDriveStatus.replaceAll('_', ' ')}</p>
          </div>
        </details>
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

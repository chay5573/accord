'use client';

import { useState } from 'react';
import { mockESignatureConnections } from '@/lib/eSignature';

export function ESignatureSettings() {
  const [preferred, setPreferred] = useState('docusign');
  const [sendBehavior, setSendBehavior] = useState('review');

  return <div className="settings-foundation">
    <section className="card foundation-banner"><div><span className="section-kicker">Provider-neutral mock</span><h2>E-signature connections</h2><p>Accord will prepare approved packages for your preferred provider. No live provider, OAuth token, or document transfer is connected.</p></div><span className="status neutral">Mock only</span></section>

    <div className="foundation-grid">
      <section className="card foundation-main"><div className="section-heading"><div><span className="section-kicker">Preferred provider</span><h2>Connection status</h2></div></div>
        <div className="provider-list">{mockESignatureConnections.map((connection) => <label className="provider-row" key={connection.id}><input type="radio" name="preferred-provider" value={connection.provider} checked={preferred === connection.provider} disabled={connection.status === 'coming_later'} onChange={(event) => setPreferred(event.target.value)} /><span><strong>{connection.displayName}</strong><small>{connection.permissionSummary}</small></span><span className={`status ${connection.status === 'connected' ? 'good' : 'neutral'}`}>{connection.status.replaceAll('_', ' ')}</span></label>)}</div>
      </section>

      <aside className="card"><span className="section-kicker">Security boundary</span><h2>Provider permissions</h2><p>Connections will use least-privilege OAuth scopes. Tokens remain server-side and provider events require verified webhooks and audit records.</p><div className="notice compact warning"><strong>Provider review is the recommended default.</strong> Accord does not silently send a signature packet.</div></aside>
    </div>

    <div className="foundation-grid">
      <section className="card"><span className="section-kicker">Default send behavior</span><h2>What happens after approval?</h2><div className="setting-options"><label><input type="radio" name="send-behavior" value="review" checked={sendBehavior === 'review'} onChange={(event) => setSendBehavior(event.target.value)} /><span><strong>Open provider review before sending</strong><small>Recommended. Confirm recipients, documents, and signature fields in the provider.</small></span></label><label><input type="radio" name="send-behavior" value="immediate" checked={sendBehavior === 'immediate'} onChange={(event) => setSendBehavior(event.target.value)} /><span><strong>Send immediately after Accord approval</strong><small>Future policy option. Disabled until an administrator explicitly enables it.</small></span></label></div></section>
      <section className="card"><span className="section-kicker">Signed document return</span><h2>Deal Desk handoff</h2><div className="check-list"><label><input type="checkbox" defaultChecked /> Import completed package to Deal Desk</label><label><input type="checkbox" defaultChecked /> Require agent final review</label></div><div className="summary-list"><div><span>Webhook/status sync</span><strong>Mock healthy</strong></div><div><span>External sharing</span><strong>Blocked until final review</strong></div></div></section>
    </div>
  </div>;
}

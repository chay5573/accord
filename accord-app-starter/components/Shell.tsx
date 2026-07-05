import Link from 'next/link';
import type { ReactNode } from 'react';

export function Shell({ children, active = 'dashboard' }: { children: ReactNode; active?: string }) {
  const primaryItems = [
    ['capture', '/conversations/new', 'Start Conversation'],
    ['draft', '/transactions/txn-demo/review', 'Auto Draft'],
    ['dashboard', '/', 'Deal Desk'],
    ['new', '/transactions/new', 'New Transaction'],
    ['onboarding', '/onboarding', 'Office Profile']
  ];
  const settingsItems = [
    ['library', '/settings/contract-library', 'Contract Library'],
    ['esign', '/settings/e-signature', 'E-Signature'],
    ['memory', '/settings/transaction-memory', 'Transaction Memory'],
    ['education', '/settings/client-education', 'Client Portal / Education'],
    ['compliance', '/settings/compliance', 'Privacy & Compliance']
  ];

  return <div className="app-shell">
    <aside className="sidebar">
      <div><Link href="/" className="wordmark">ACCORD</Link><div className="side-sub brand-line">From conversation to confident transaction.</div></div>
      <nav className="nav-list" aria-label="Primary navigation">
        {primaryItems.map(([key, href, label], index) => <Link key={key} className={`nav-item ${index === 0 ? 'capture-nav' : ''} ${active === key ? 'active' : ''}`} href={href}>{index === 0 && <span aria-hidden="true">+</span>}{label}</Link>)}
        <span className="nav-section-label">Settings</span>
        {settingsItems.map(([key, href, label]) => <Link key={key} className={`nav-item settings-nav ${active === key ? 'active' : ''}`} href={href}>{label}</Link>)}
      </nav>
      <div className="sidebar-footer"><span className="workspace-dot" aria-hidden="true" /><div><strong>Red Rock Group</strong><span>Mock workspace · Utah</span></div></div>
      <div className="side-sub">Human-reviewed intelligence. No provider connections active.</div>
    </aside>
    <main className="main">{children}</main>
  </div>;
}

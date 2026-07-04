import Link from 'next/link';
import type { ReactNode } from 'react';

export function Shell({ children, active = 'dashboard' }: { children: ReactNode; active?: string }) {
  const items = [
    ['dashboard', '/', 'Deal Desk'],
    ['new', '/transactions/new', 'New Transaction'],
    ['onboarding', '/onboarding', 'Office Profile'],
    ['library', '/settings/contract-library', 'Contract Library'],
    ['compliance', '/settings/compliance', 'Privacy & Compliance']
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <Link href="/" className="wordmark">ACCORD</Link>
          <div className="side-sub brand-line">From conversation to confident transaction.</div>
        </div>
        <nav className="nav-list" aria-label="Primary navigation">
          {items.map(([key, href, label]) => (
            <Link key={key} className={`nav-item ${active === key ? 'active' : ''}`} href={href}>{label}</Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="workspace-dot" aria-hidden="true" />
          <div><strong>Red Rock Group</strong><span>Mock workspace · Utah</span></div>
        </div>
        <div className="side-sub">Human-reviewed intelligence. No provider connections active.</div>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}

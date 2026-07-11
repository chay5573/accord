import Link from 'next/link';
import type { ReactNode } from 'react';

const navigation = [
  ['record', '/record', 'Record'],
  ['review', '/review-send', 'Review & Send'],
  ['coordinate', '/coordinate', 'Coordinate'],
  ['settings', '/settings', 'Settings']
] as const;

const settingsKeys = new Set(['settings', 'esign', 'inbox-settings', 'memory', 'library', 'compliance', 'onboarding', 'education']);
const sectionAliases: Record<string, string> = {
  capture: 'record',
  quick: 'record',
  prepare: 'review',
  drafts: 'review',
  new: 'review',
  manage: 'coordinate',
  dashboard: 'coordinate',
  inbox: 'coordinate',
  client: 'coordinate'
};

export function Shell({ children, active = 'coordinate' }: { children: ReactNode; active?: string }) {
  const currentSection = sectionAliases[active] ?? active;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <Link href="/coordinate" className="wordmark" aria-label="Accord home">Accord</Link>
        </div>
        <nav className="nav-list" aria-label="Primary navigation">
          {navigation.map(([key, href, label], index) => {
            const selected = currentSection === key || (key === 'settings' && settingsKeys.has(active));
            return (
              <Link key={key} className={`nav-item ${index === 0 ? 'capture-nav' : ''} ${selected ? 'active' : ''}`} href={href}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <span className="workspace-dot" aria-hidden="true" />
          <div>
            <strong>Red Rock Group</strong>
            <span>Mock workspace · Utah</span>
          </div>
        </div>
        <div className="side-sub">Mock-only. Human approval required before documents are sent or shared.</div>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}

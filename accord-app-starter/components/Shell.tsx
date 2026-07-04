import Link from 'next/link';

export function Shell({ children, active = 'dashboard' }: { children: React.ReactNode; active?: string }) {
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
          <div className="wordmark">ACCORD</div>
          <div className="side-sub">Transaction intelligence for elite real estate professionals.</div>
        </div>
        <nav className="nav-list">
          {items.map(([key, href, label]) => (
            <Link key={key} className={`nav-item ${active === key ? 'active' : ''}`} href={href}>{label}</Link>
          ))}
        </nav>
        <div className="side-sub" style={{marginTop: 'auto'}}>
          Agent-owned records · Team/brokerage access · Human-approved contract drafts.
        </div>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}

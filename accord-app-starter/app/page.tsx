import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { mockTasks, mockTransactions } from '@/lib/mockData';

function statusClass(status: string) {
  if (status === 'Executed') return 'good';
  if (status === 'Needs review') return 'warn';
  return 'neutral';
}

export default function Dashboard() {
  return (
    <Shell active="dashboard">
      <div className="topbar">
        <div><div className="eyebrow">Friday, July 3 · Accord Deal Desk</div><h1>Good morning, Calvin.</h1><p className="page-lead">Three active transactions. One decision needs your review today.</p></div>
        <Link className="btn btn-primary btn-large" href="/transactions/new">+ New Transaction</Link>
      </div>

      <section className="metric-grid" aria-label="Deal summary">
        <div className="metric-card"><span>Active transactions</span><strong>3</strong><small>Across buyer, listing & investment</small></div>
        <div className="metric-card"><span>Needs your review</span><strong>1</strong><small className="text-warning">Settlement date incomplete</small></div>
        <div className="metric-card"><span>Tasks due this week</span><strong>3</strong><small>One due today</small></div>
        <div className="metric-card"><span>Utah library</span><strong>5</strong><small className="text-success">Mock forms available</small></div>
      </section>

      <div className="dashboard-grid">
        <section className="card span-2">
          <div className="section-heading"><div><span className="section-kicker">Workspace</span><h2>Recent transactions</h2></div><Link href="/transactions/txn-demo" className="text-link">View active deal →</Link></div>
          <div className="transaction-list">
            {mockTransactions.map((transaction) => (
              <Link className="transaction-row" href={`/transactions/${transaction.id}`} key={transaction.id}>
                <div className="property-mark" aria-hidden="true">{transaction.address.slice(0, 2)}</div>
                <div className="transaction-primary"><strong>{transaction.address}</strong><span>{transaction.clients} · {transaction.type}</span></div>
                <span className={`status ${statusClass(transaction.status)}`}>{transaction.status}</span>
                <div className="transaction-next"><span>{transaction.nextStep}</span><small>{transaction.updatedAt}</small></div>
                <span className="row-arrow" aria-hidden="true">›</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="section-heading"><div><span className="section-kicker">Next up</span><h2>Tasks</h2></div><span className="count-badge">3</span></div>
          <div className="task-list">
            {mockTasks.map((task) => (
              <div className="task-item" key={task.title}><span className="task-check" aria-hidden="true" /><div><strong>{task.title}</strong><span>{task.transaction}</span></div><small className={task.priority === 'High' ? 'text-warning' : ''}>{task.due}</small></div>
            ))}
          </div>
        </section>

        <section className="card span-2">
          <div className="section-heading"><div><span className="section-kicker">Portfolio</span><h2>Deal pipeline</h2></div><span className="muted-text">Mock data</span></div>
          <div className="pipeline"><div className="pipeline-step"><span>Draft</span><strong>1</strong><div className="pipeline-bar"><i style={{width: '34%'}} /></div></div><div className="pipeline-step"><span>In review</span><strong>1</strong><div className="pipeline-bar"><i style={{width: '62%'}} /></div></div><div className="pipeline-step"><span>Executed</span><strong>1</strong><div className="pipeline-bar"><i style={{width: '100%'}} /></div></div></div>
        </section>

        <section className="card library-card"><div className="library-icon" aria-hidden="true">§</div><span className="section-kicker">Contract Library</span><h2>Utah starter set</h2><p>Five mock forms are available for package planning. Versions and licensing remain unverified.</p><div className="library-status"><span className="status neutral">Mock only</span><Link className="text-link" href="/settings/contract-library">Open Settings →</Link></div></section>
      </div>
    </Shell>
  );
}

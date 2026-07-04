import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { mockTasks, mockTransactions, mockUnassignedConversations } from '@/lib/mockData';

function statusClass(status: string) {
  if (status === 'Executed') return 'good';
  if (status === 'Needs review') return 'warn';
  return 'neutral';
}

export default function Dashboard() {
  return (
    <Shell active="dashboard">
      <div className="topbar">
        <div><div className="eyebrow">Saturday, July 4 · Accord Deal Desk</div><h1>Good morning, Calvin.</h1><p className="page-lead">Capture the conversation first. Accord will help organize what comes next.</p></div>
        <div className="topbar-actions"><Link className="btn btn-secondary btn-large" href="/transactions/new">New Transaction</Link><Link className="btn btn-primary btn-large" href="/conversations/new">+ Start Conversation</Link></div>
      </div>

      <section className="capture-hero">
        <div><span className="section-kicker light">Quick Capture</span><h2>Start with what was said.</h2><p>Record with confirmed consent, paste a transcript, or add a conversation note. Decide the transaction after review.</p></div>
        <Link className="btn capture-hero-button" href="/conversations/new">Start Conversation →</Link>
      </section>

      <section className="metric-grid" aria-label="Deal summary">
        <div className="metric-card"><span>Unassigned conversations</span><strong>2</strong><small className="text-warning">One needs transaction review</small></div>
        <div className="metric-card"><span>Needs review</span><strong>4</strong><small>Consent, fields & package decisions</small></div>
        <div className="metric-card"><span>Active transactions</span><strong>3</strong><small>Across buyer, listing & investment</small></div>
        <div className="metric-card"><span>Tasks due this week</span><strong>3</strong><small>One due today</small></div>
      </section>

      <div className="dashboard-grid">
        <section className="card span-2">
          <div className="section-heading"><div><span className="section-kicker">Quick Capture</span><h2>Unassigned conversations</h2></div><Link href="/conversations/new" className="text-link">Capture another →</Link></div>
          <div className="conversation-list">{mockUnassignedConversations.map((conversation) => <Link className="conversation-row" href="/conversations/new" key={conversation.id}><div className="conversation-mark" aria-hidden="true">“</div><div><strong>{conversation.title}</strong><span>{conversation.conversationType} · {conversation.participants}</span></div><span className={`status ${conversation.consentStatus === 'obtained' ? 'good' : 'warn'}`}>{conversation.consentStatus === 'obtained' ? 'Consent on file' : 'Consent missing'}</span><div><strong>{conversation.reviewStatus}</strong><small>{conversation.capturedAt}</small></div><span aria-hidden="true">›</span></Link>)}</div>
        </section>

        <section className="card needs-review-card">
          <div className="section-heading"><div><span className="section-kicker">Decision queue</span><h2>Needs Review</h2></div><span className="count-badge">4</span></div>
          <div className="review-queue"><Link href="/transactions/txn-demo"><span className="review-icon warning">!</span><div><strong>2 extracted terms</strong><small>Missing settlement and subject-to-sale decision</small></div></Link><Link href="/conversations/new"><span className="review-icon danger">×</span><div><strong>1 consent exception</strong><small>Participant confirmation is incomplete</small></div></Link><Link href="/transactions/txn-demo"><span className="review-icon neutral">?</span><div><strong>1 draft package decision</strong><small>Review recommended addendum</small></div></Link></div>
        </section>

        <section className="card span-2"><div className="section-heading"><div><span className="section-kicker">Workspace</span><h2>Recent transactions</h2></div><Link href="/transactions/txn-demo" className="text-link">View active deal →</Link></div><div className="transaction-list">{mockTransactions.map((transaction) => <Link className="transaction-row" href={`/transactions/${transaction.id}`} key={transaction.id}><div className="property-mark" aria-hidden="true">{transaction.address.slice(0, 2)}</div><div className="transaction-primary"><strong>{transaction.address}</strong><span>{transaction.clients} · {transaction.type}</span></div><span className={`status ${statusClass(transaction.status)}`}>{transaction.status}</span><div className="transaction-next"><span>{transaction.nextStep}</span><small>{transaction.updatedAt}</small></div><span className="row-arrow" aria-hidden="true">›</span></Link>)}</div></section>

        <section className="card"><div className="section-heading"><div><span className="section-kicker">Next up</span><h2>Tasks</h2></div><span className="count-badge">3</span></div><div className="task-list">{mockTasks.map((task) => <div className="task-item" key={task.title}><span className="task-check" aria-hidden="true" /><div><strong>{task.title}</strong><span>{task.transaction}</span></div><small className={task.priority === 'High' ? 'text-warning' : ''}>{task.due}</small></div>)}</div></section>

        <section className="card span-2"><div className="section-heading"><div><span className="section-kicker">Portfolio</span><h2>Deal pipeline</h2></div><span className="muted-text">Mock data</span></div><div className="pipeline"><div className="pipeline-step"><span>Draft</span><strong>1</strong><div className="pipeline-bar"><i style={{width:'34%'}} /></div></div><div className="pipeline-step"><span>In review</span><strong>1</strong><div className="pipeline-bar"><i style={{width:'62%'}} /></div></div><div className="pipeline-step"><span>Executed</span><strong>1</strong><div className="pipeline-bar"><i style={{width:'100%'}} /></div></div></div></section>

        <section className="card library-card"><div className="library-icon" aria-hidden="true">§</div><span className="section-kicker">Contract Library</span><h2>Utah starter set</h2><p>Five mock forms support package planning. Versions and licensing remain unverified.</p><div className="library-status"><span className="status neutral">Mock only</span><Link className="text-link" href="/settings/contract-library">Open Settings →</Link></div></section>
      </div>
    </Shell>
  );
}

import Link from 'next/link';
import { AITimeline } from '@/components/AITimeline';
import { mockTransactions, mockFiles } from '@/lib/mockData';
import { mockOpportunityTimeline } from '@/lib/opportunity';
import { mockSignatureEvents, mockSignaturePacket } from '@/lib/eSignature';

const tasks = [
  { id: 'task-final-review', transaction: 'Welker buyer offer', title: 'Final review signed documents', priority: 'Urgent', type: 'Signatures' },
  { id: 'task-receipt', transaction: 'Welker buyer offer', title: 'Confirm earnest money receipt', priority: 'Today', type: 'Receipt' },
  { id: 'task-client', transaction: 'Welker buyer offer', title: 'Answer client question about due diligence', priority: 'Review', type: 'Client View' },
  { id: 'task-title', transaction: 'Pine Valley buyer recap', title: 'Unresolved title company preference', priority: 'Later', type: 'Missing fact' }
];

const dates = [
  ['Jul 7', 'Earnest money due', 'Welker buyer offer'],
  ['Jul 17', 'Due diligence deadline', 'Welker buyer offer'],
  ['Jul 24', 'Financing & appraisal deadline', 'Welker buyer offer']
];

export function CoordinateWorkspace() {
  return (
    <div className="coordinate-page">
      <section className="urgent-card">
        <div>
          <span className="section-kicker light">Most urgent · Signed package</span>
          <h2>Welker documents are completed and need final review.</h2>
          <p>Accord imported the mock signature completion signal. External sharing stays blocked until agent review.</p>
        </div>
        <Link className="btn" href="/transactions/txn-demo">Open transaction</Link>
      </section>

      <div className="manage-grid">
        <section className="card">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Tasks</span>
              <h2>Filtered by transaction</h2>
            </div>
            <select aria-label="Filter tasks by transaction" defaultValue="all">
              <option value="all">All transactions</option>
              <option value="welker">Welker buyer offer</option>
              <option value="pine">Pine Valley recap</option>
            </select>
          </div>
          <div className="calm-list">
            {tasks.map((task) => (
              <Link href="/transactions/txn-demo" key={task.id}>
                <span><strong>{task.title}</strong><small>{task.transaction} · {task.type}</small></span>
                <span className={`status ${task.priority === 'Urgent' ? 'warn' : 'neutral'}`}>{task.priority}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="card">
          <span className="section-kicker">Calendar</span>
          <h2>Important dates</h2>
          <div className="deadline-list">
            {dates.map(([date, title, transaction]) => (
              <div key={`${date}-${title}`}>
                <time>{date}</time>
                <span><strong>{title}</strong><small>{transaction}</small></span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="card">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Active transactions</span>
            <h2>Coordinate after documents exist</h2>
          </div>
          <Link className="btn btn-secondary" href="/record">Record new work</Link>
        </div>
        <div className="calm-list">
          {mockTransactions.map((transaction) => (
            <Link href={`/transactions/${transaction.id}`} key={transaction.id}>
              <span><strong>{transaction.address}</strong><small>{transaction.clients} · {transaction.nextStep}</small></span>
              <span className={`status ${transaction.status === 'Needs review' ? 'warn' : 'neutral'}`}>{transaction.status}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="manage-grid">
        <section className="card">
          <span className="section-kicker">Signatures & reminders</span>
          <h2>Provider activity</h2>
          <div className="calm-list">
            {mockSignatureEvents.map((event) => (
              <div className="calm-row" key={event.id}>
                <span><strong>{event.safeSummary}</strong><small>{event.type} · {event.linked ? 'Linked' : 'Needs match'}</small></span>
                <span className={`status ${event.linked ? 'good' : 'warn'}`}>{event.linked ? 'Synced' : 'Review'}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="card">
          <span className="section-kicker">Receipts & unresolved items</span>
          <h2>Needs confirmation</h2>
          <div className="summary-list">
            <div><span>Earnest money receipt</span><strong>Pending</strong></div>
            <div><span>Settlement date</span><strong>Missing</strong></div>
            <div><span>Seller legal name</span><strong>Low confidence</strong></div>
            <div><span>Completed packet</span><strong>{mockSignaturePacket.status.replaceAll('_', ' ')}</strong></div>
          </div>
        </section>
      </div>

      <section className="card">
        <div className="section-heading">
          <div>
            <span className="section-kicker">AI Timeline</span>
            <h2>Transaction story</h2>
          </div>
        </div>
        <AITimeline events={mockOpportunityTimeline} />
      </section>

      <div className="manage-grid">
        <section className="card">
          <span className="section-kicker">Documents / signed files</span>
          <h2>File status</h2>
          <div className="file-list compact-files">
            {mockFiles.map((file) => <div className="file-row" key={file.name}><span className="file-icon" aria-hidden="true">□</span><div><strong>{file.name}</strong><span>{file.type}</span></div><span className="status neutral">{file.status}</span></div>)}
          </div>
        </section>

        <section className="card client-experience-card">
          <span className="section-kicker">Client View / Client Experience</span>
          <h2>Preview before sharing</h2>
          <p>Client education, client-visible documents, question history, videos watched, and topics opened live inside the transaction context.</p>
          <div className="summary-list">
            <div><span>Client-visible documents</span><strong>2 approved</strong></div>
            <div><span>Questions asked</span><strong>1 routed to agent</strong></div>
            <div><span>Videos watched</span><strong>Due diligence overview</strong></div>
          </div>
          <Link className="btn btn-secondary btn-block" href="/accord-guide">Preview client experience</Link>
        </section>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { AITimeline } from '@/components/AITimeline';
import { mockFiles } from '@/lib/mockData';
import { mockOpportunityTimeline } from '@/lib/opportunity';

const tasks = [
  ['overdue', 'Signatures outstanding', 'Welker buyer offer', 'Viewed but not signed · impacts submission', '/transactions/txn-demo'],
  ['due soon', 'Earnest money receipt missing', 'Welker buyer offer', 'Due Jul 7', '/transactions/txn-demo'],
  ['risk', 'Disclosure package not confirmed', 'Welker buyer offer', 'Brokerage-required review', '/transactions/txn-demo'],
  ['deadline', 'Inspection deadline approaching', 'Welker buyer offer', 'Jul 17', '/transactions/txn-demo'],
  ['deadline', 'Appraisal deadline approaching', 'Welker buyer offer', 'Jul 24', '/transactions/txn-demo'],
  ['risk', 'Title commitment missing', 'Pine Valley recap', 'Title follow-up needed', '/transactions/txn-demo'],
  ['due soon', 'Lender update needed', 'Welker buyer offer', 'Financing/appraisal status', '/transactions/txn-demo']
];

const calendarDays = [
  ['1', '', ''], ['2', '', ''], ['3', '', ''], ['4', 'Offer signed', '/transactions/txn-demo'], ['5', 'Packet sent', '/transactions/txn-demo'], ['6', '', ''], ['7', 'Earnest money', '/transactions/txn-demo'],
  ['8', '', ''], ['9', '', ''], ['10', 'Signing reminder', '/transactions/txn-demo'], ['11', '', ''], ['12', '', ''], ['13', '', ''], ['14', '', ''],
  ['15', 'Inspection', '/transactions/txn-demo'], ['16', '', ''], ['17', 'Due diligence', '/transactions/txn-demo'], ['18', '', ''], ['19', '', ''], ['20', '', ''], ['21', '', ''],
  ['22', '', ''], ['23', '', ''], ['24', 'Financing/appraisal', '/transactions/txn-demo'], ['25', '', ''], ['26', '', ''], ['27', '', ''], ['28', '', ''],
  ['29', '', ''], ['30', '', ''], ['31', 'Settlement', '/transactions/txn-demo'], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']
];

const transactionStatuses = [
  ['Welker buyer offer', 'Awaiting signatures'],
  ['Pine Valley buyer recap', 'Draft in progress'],
  ['Summit Ridge listing', 'Due diligence'],
  ['Canyon View seller', 'Closing prep']
];

const followUps = [
  ['DocuSign envelope sent', 'Sent Jul 5 · email delivered', 'Sent'],
  ['Buyer 1 viewed but not signed', 'Follow-up due today', 'Watch'],
  ['Buyer 2 not viewed', 'Reminder recommended', 'Watch'],
  ['Email sent, no confirmation', 'Receipt still missing', 'Watch'],
  ['Completed packet import', 'Waiting on all signatures', 'Pending']
];

export function CoordinateWorkspace() {
  return (
    <div className="coordinate-page">
      <div className="coordinate-actions"><button className="btn btn-secondary" type="button">Customize layout</button></div>

      <section className="urgent-card">
        <div>
          <span className="section-kicker light">Needs attention</span>
          <h2>Earnest money receipt is missing.</h2>
          <p>Welker buyer offer · due today</p>
        </div>
        <Link className="btn" href="/transactions/txn-demo">Open transaction</Link>
      </section>

      <div className="manage-grid">
        <section className="card task-command-card">
          <div className="section-heading">
            <div><span className="section-kicker">To-do list</span><h2>Sorted by risk and deadline</h2></div>
            <div className="filter-row">
              <select aria-label="Filter tasks by transaction" defaultValue="all"><option value="all">All transactions</option><option value="welker">Welker</option></select>
              <select aria-label="Filter tasks by status" defaultValue="open"><option value="open">Open</option><option value="done">Done</option></select>
              <select aria-label="Filter tasks by type" defaultValue="all"><option value="all">All types</option><option value="signatures">Signatures</option><option value="deadlines">Deadlines</option></select>
            </div>
          </div>
          <div className="task-list">
            {tasks.map(([tone, title, transaction, detail, href]) => (
              <Link className={`task-row ${tone}`} href={href} key={title}>
                <span className="task-checkbox" aria-hidden="true" />
                <span><strong>{title}</strong><small>{transaction} · {detail}</small></span>
                <i>Open ›</i>
              </Link>
            ))}
          </div>
        </section>

        <section className="card monthly-calendar-card">
          <span className="section-kicker">July 2026</span>
          <h2>Calendar</h2>
          <div className="calendar-grid">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <strong key={`${day}-${index}`}>{day}</strong>)}
            {calendarDays.map(([day, event, href], index) => event ? <Link className="has-event" href={href} key={`${day}-${index}`}><span>{day}</span><small>{event}</small></Link> : <div key={`${day}-${index}`}><span>{day}</span></div>)}
          </div>
        </section>
      </div>

      <div className="manage-grid">
        <section className="card">
          <span className="section-kicker">Transaction status</span>
          <h2>Active flow</h2>
          <div className="calm-list">
            {transactionStatuses.map(([name, status]) => <Link href="/transactions/txn-demo" key={name}><span><strong>{name}</strong><small>Open transaction</small></span><span className="status neutral">{status}</span></Link>)}
          </div>
        </section>

        <section className="card">
          <span className="section-kicker">Follow-ups</span>
          <h2>Packets, reminders, and receipts</h2>
          <div className="calm-list">
            {followUps.map(([title, detail, state]) => <Link className="calm-row action-row" href="/transactions/txn-demo" key={title}><span><strong>{title}</strong><small>{detail}</small></span><span className={`status ${state === 'Watch' ? 'warn' : state === 'Sent' ? 'good' : 'neutral'}`}>{state}</span></Link>)}
          </div>
        </section>
      </div>

      <section className="card">
        <div className="section-heading"><div><span className="section-kicker">Timeline</span><h2>Transaction story</h2></div><Link className="btn btn-secondary" href="/transactions/txn-demo">Open timeline</Link></div>
        <AITimeline events={mockOpportunityTimeline} />
      </section>

      <div className="manage-grid">
        <section className="card">
          <span className="section-kicker">Documents</span>
          <h2>Files and signed copies</h2>
          <div className="file-list compact-files">
            {mockFiles.map((file) => <Link className="file-row action-row" href="/transactions/txn-demo" key={file.name}><span className="file-icon" aria-hidden="true">□</span><div><strong>{file.name}</strong><span>{file.type}</span></div><span className="status neutral">{file.status}</span></Link>)}
          </div>
        </section>

        <section className="card client-experience-card">
          <span className="section-kicker">Client View</span>
          <h2>Client activity</h2>
          <div className="summary-list">
            <div><span>Documents viewed</span><strong>Purchase contract, Wire disclosure</strong></div>
            <div><span>Questions asked</span><strong>2 total · 1 unanswered</strong></div>
            <div><span>AI answers</span><strong>1 answered · 1 escalated</strong></div>
            <div><span>Videos watched</span><strong>Earnest money</strong></div>
            <div><span>Open to-dos</span><strong>Earnest money, inspection</strong></div>
          </div>
          <div className="form-actions">
            <Link className="btn btn-secondary" href="/client-view">Preview Client View</Link>
            <Link className="btn btn-quiet" href="/client-view/documents/purchase-contract">Document Help</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

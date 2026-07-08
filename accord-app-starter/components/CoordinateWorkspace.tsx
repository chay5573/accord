import Link from 'next/link';
import { AITimeline } from '@/components/AITimeline';
import { mockFiles } from '@/lib/mockData';
import { mockOpportunityTimeline } from '@/lib/opportunity';

const tasks = [
  ['overdue', 'Signatures outstanding', 'Welker buyer offer', 'Viewed but not signed · impacts submission'],
  ['due soon', 'Earnest money receipt missing', 'Welker buyer offer', 'Due Jul 7'],
  ['risk', 'Disclosure package not confirmed', 'Welker buyer offer', 'Brokerage-required review'],
  ['deadline', 'Inspection deadline approaching', 'Welker buyer offer', 'Jul 17'],
  ['deadline', 'Appraisal deadline approaching', 'Welker buyer offer', 'Jul 24'],
  ['risk', 'Title commitment missing', 'Pine Valley recap', 'Title follow-up needed'],
  ['due soon', 'Lender update needed', 'Welker buyer offer', 'Financing/appraisal status']
];

const calendarDays = [
  ['1', ''], ['2', ''], ['3', ''], ['4', 'Offer signed'], ['5', 'Packet sent'], ['6', ''], ['7', 'Earnest money'],
  ['8', ''], ['9', ''], ['10', 'Signing reminder'], ['11', ''], ['12', ''], ['13', ''], ['14', ''],
  ['15', 'Inspection'], ['16', ''], ['17', 'Due diligence'], ['18', ''], ['19', ''], ['20', ''], ['21', ''],
  ['22', ''], ['23', ''], ['24', 'Financing/appraisal'], ['25', ''], ['26', ''], ['27', ''], ['28', ''],
  ['29', ''], ['30', ''], ['31', 'Settlement'], ['', ''], ['', ''], ['', ''], ['', '']
];

const transactionStatuses = [
  ['Welker buyer offer', 'Awaiting signatures'],
  ['Pine Valley buyer recap', 'Draft in progress'],
  ['Summit Ridge listing', 'Due diligence'],
  ['Canyon View seller', 'Closing prep']
];

const signatureActivity = [
  ['DocuSign envelope sent', 'Sent Jul 5 · email delivered', 'good'],
  ['Buyer 1 viewed but not signed', 'Follow-up due today', 'warn'],
  ['Buyer 2 not viewed', 'Reminder recommended', 'warn'],
  ['Completed packet import', 'Waiting on all signatures', 'neutral']
];

export function CoordinateWorkspace() {
  return (
    <div className="coordinate-page">
      <section className="urgent-card">
        <div>
          <span className="section-kicker light">Command center</span>
          <h2>Earnest money receipt is missing.</h2>
          <p>Due today for the Welker buyer offer.</p>
        </div>
        <Link className="btn" href="/transactions/txn-demo">Open transaction</Link>
      </section>

      <section className="card dashboard-customize">
        <div>
          <span className="drag-handle" aria-hidden="true">⋮⋮</span>
          <strong>Customize layout</strong>
          <small>Mock preference saved for Red Rock Group.</small>
        </div>
        <button className="btn btn-secondary" type="button">Customize layout</button>
      </section>

      <div className="manage-grid">
        <section className="card task-command-card">
          <div className="section-heading">
            <div>
              <span className="section-kicker">To-do list</span>
              <h2>Sorted by risk and deadline</h2>
            </div>
            <div className="filter-row">
              <select aria-label="Filter tasks by transaction" defaultValue="all"><option value="all">All transactions</option><option value="welker">Welker</option></select>
              <select aria-label="Filter tasks by status" defaultValue="open"><option value="open">Open</option><option value="done">Done</option></select>
              <select aria-label="Filter tasks by type" defaultValue="all"><option value="all">All types</option><option value="signatures">Signatures</option><option value="deadlines">Deadlines</option></select>
            </div>
          </div>
          <div className="task-list">
            {tasks.map(([tone, title, transaction, detail]) => (
              <label className={`task-row ${tone}`} key={title}>
                <input type="checkbox" />
                <span><strong>{title}</strong><small>{transaction} · {detail}</small></span>
                <i>{tone}</i>
              </label>
            ))}
          </div>
        </section>

        <section className="card monthly-calendar-card">
          <span className="section-kicker">July 2026</span>
          <h2>Calendar</h2>
          <div className="calendar-grid">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <strong key={`${day}-${index}`}>{day}</strong>)}
            {calendarDays.map(([day, event], index) => <div className={event ? 'has-event' : ''} key={`${day}-${index}`}><span>{day}</span>{event && <small>{event}</small>}</div>)}
          </div>
        </section>
      </div>

      <div className="manage-grid">
        <section className="card">
          <span className="section-kicker">Transaction status</span>
          <h2>Active flow</h2>
          <div className="calm-list">
            {transactionStatuses.map(([name, status]) => <Link href="/transactions/txn-demo" key={name}><span><strong>{name}</strong><small>Real estate transaction flow</small></span><span className="status neutral">{status}</span></Link>)}
          </div>
        </section>

        <section className="card">
          <span className="section-kicker">Packets & follow-up</span>
          <h2>Signatures</h2>
          <div className="calm-list">
            {signatureActivity.map(([title, detail, tone]) => <div className="calm-row" key={title}><span><strong>{title}</strong><small>{detail}</small></span><span className={`status ${tone}`}>{tone === 'warn' ? 'Watch' : tone === 'good' ? 'Sent' : 'Pending'}</span></div>)}
          </div>
        </section>
      </div>

      <section className="card">
        <div className="section-heading"><div><span className="section-kicker">AI Timeline</span><h2>Transaction story</h2></div></div>
        <AITimeline events={mockOpportunityTimeline} />
      </section>

      <div className="manage-grid">
        <section className="card">
          <span className="section-kicker">Documents</span>
          <h2>Files and signed copies</h2>
          <div className="file-list compact-files">
            {mockFiles.map((file) => <div className="file-row" key={file.name}><span className="file-icon" aria-hidden="true">□</span><div><strong>{file.name}</strong><span>{file.type}</span></div><span className="status neutral">{file.status}</span></div>)}
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

import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { DealDeskReview } from '@/components/DealDeskReview';

export default function ReviewPage() {
  return (
    <Shell active="dashboard">
      <div className="topbar">
        <div><div className="eyebrow">Deal Desk Review · Buyer offer</div><h1>Review & Prepare Draft</h1><p className="page-lead">2948 E Alderann St · Brenton & Emily Welker</p></div>
        <Link className="btn btn-secondary" href="/transactions/txn-demo">← Transaction workspace</Link>
      </div>
      <DealDeskReview />
    </Shell>
  );
}

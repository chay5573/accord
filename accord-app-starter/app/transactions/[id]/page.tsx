import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { TransactionWorkspace } from '@/components/TransactionWorkspace';

export default function TransactionDetail() {
  return (
    <Shell active="dashboard">
      <div className="topbar"><div><div className="eyebrow">Buyer offer · St. George, Utah</div><h1>2948 E Alderann St</h1><p className="page-lead">Brenton & Emily Welker · Owned by Calvin Hayward</p></div><div className="topbar-actions"><span className="status warn">Deal Desk Review · Not ready</span><Link className="btn btn-primary" href="/transactions/txn-demo/review">Review & Prepare Draft</Link><button className="btn btn-secondary" type="button" aria-label="More transaction actions">•••</button></div></div>
      <TransactionWorkspace />
    </Shell>
  );
}

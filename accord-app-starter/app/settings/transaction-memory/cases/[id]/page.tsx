import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { TransactionMemoryCaseReview } from '@/components/TransactionMemoryCaseReview';

export default function TransactionMemoryCasePage() {
  return (
    <Shell active="memory">
      <div className="topbar"><div><div className="eyebrow">Transaction Memory · Case review</div><h1>Desert Willow buyer purchase</h1><p className="page-lead">Imported case · Training approval pending · Redaction review required</p></div><Link className="btn btn-secondary" href="/settings/transaction-memory">← Training Library</Link></div>
      <TransactionMemoryCaseReview />
    </Shell>
  );
}

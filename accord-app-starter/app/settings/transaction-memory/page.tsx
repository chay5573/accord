import { Shell } from '@/components/Shell';
import { TransactionMemorySettings } from '@/components/TransactionMemorySettings';

export default function TransactionMemoryPage() {
  return (
    <Shell active="memory">
      <div className="topbar"><div><div className="eyebrow">Settings · Privacy-controlled learning</div><h1>Transaction Memory</h1><p className="page-lead">Approve what Accord may learn. The transaction archive remains separate.</p></div><span className="status warn">Mock library · Review required</span></div>
      <TransactionMemorySettings />
    </Shell>
  );
}

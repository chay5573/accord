import { Shell } from '@/components/Shell';
import { StartConversationFlow } from '@/components/StartConversationFlow';

export default function RecordPage() {
  return (
    <Shell active="record">
      <header className="topbar">
        <div>
          <span className="eyebrow">Record</span>
          <h1>Start with what happened.</h1>
          <p className="page-lead">No transaction setup, destination choice, or CRM-style contact sorting. Accord will infer the structure after capture.</p>
        </div>
        <span className="status neutral">Mock record</span>
      </header>
      <StartConversationFlow />
    </Shell>
  );
}

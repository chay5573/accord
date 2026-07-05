import { Shell } from '@/components/Shell';
import { StartConversationFlow } from '@/components/StartConversationFlow';

export default function StartConversationPage() {
  return (
    <Shell active="capture">
      <div className="topbar">
        <div><div className="eyebrow">Start Listening · Mock workflow</div><h1>Start with the conversation.</h1><p className="page-lead">Confirm consent, capture what was said, and let Accord organize the work before asking questions.</p></div>
        <span className="status neutral">No providers connected</span>
      </div>
      <StartConversationFlow />
    </Shell>
  );
}

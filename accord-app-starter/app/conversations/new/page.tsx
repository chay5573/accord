import { Shell } from '@/components/Shell';
import { StartConversationFlow } from '@/components/StartConversationFlow';

export default function StartConversationPage() {
  return (
    <Shell active="capture">
      <div className="topbar">
        <div><div className="eyebrow">Quick Capture · Mock workflow</div><h1>Start with the conversation.</h1><p className="page-lead">Capture what was said, then let Accord suggest where it belongs.</p></div>
        <span className="status neutral">No providers connected</span>
      </div>
      <StartConversationFlow />
    </Shell>
  );
}

import { Shell } from '@/components/Shell';
import { StartConversationFlow } from '@/components/StartConversationFlow';
export default function CapturePage(){return <Shell active="capture"><header className="topbar"><div><span className="eyebrow">Capture</span><h1>Start with the conversation.</h1><p className="page-lead">No transaction setup. No filing decisions. Accord will infer the structure after capture.</p></div><span className="status neutral">Mock capture</span></header><StartConversationFlow/></Shell>}

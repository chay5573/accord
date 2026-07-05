import { QuickCaptureRecovery } from '@/components/QuickCaptureRecovery';
import { Shell } from '@/components/Shell';
export default function QuickCapturePage(){return <Shell active="quick"><header className="topbar"><div><span className="eyebrow">Recovery Mode · Mock</span><h1>Quick Capture</h1><p className="page-lead">Forgot to record? Start with what you remember. Accord will reconstruct the work and ask only for what it cannot determine.</p></div></header><QuickCaptureRecovery/></Shell>}

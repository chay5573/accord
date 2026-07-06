import { PrepareWorkspace } from '@/components/PrepareWorkspace';
import { Shell } from '@/components/Shell';
export default function PreparePage(){return <Shell active="prepare"><header className="topbar"><div><span className="eyebrow">Prepare</span><h1>Review what Accord prepared.</h1><p className="page-lead">Answer only the true blockers. Everything else stays available on demand.</p></div><span className="status neutral">Mock data</span></header><PrepareWorkspace/></Shell>}

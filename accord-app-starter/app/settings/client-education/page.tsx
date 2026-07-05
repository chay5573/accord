import { ClientEducationSettings } from '@/components/ClientEducationSettings';
import { Shell } from '@/components/Shell';

export default function ClientEducationPage() {
  return <Shell active="education"><header className="topbar"><div><span className="eyebrow">Settings · Future module</span><h1>Client Portal / Education</h1><p className="page-lead">Plan a sourced, agent-governed explanation layer for clients.</p></div></header><ClientEducationSettings /></Shell>;
}

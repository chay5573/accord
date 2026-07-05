import { ESignatureSettings } from '@/components/ESignatureSettings';
import { Shell } from '@/components/Shell';

export default function ESignaturePage() {
  return <Shell active="esign"><header className="topbar"><div><span className="eyebrow">Settings</span><h1>E-Signature</h1><p className="page-lead">Choose how approved packages move to an external signature provider and return to Deal Desk.</p></div></header><ESignatureSettings /></Shell>;
}

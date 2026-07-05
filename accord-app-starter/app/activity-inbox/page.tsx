import { ActivityInbox } from '@/components/ActivityInbox';
import { Shell } from '@/components/Shell';
export default function ActivityInboxPage(){return <Shell active="inbox"><header className="topbar"><div><span className="eyebrow">External Activity · Mock</span><h1>AI Inbox</h1><p className="page-lead">Review signals from conversations, recaps, documents, email, signatures, calendars, and CRM placeholders.</p></div></header><ActivityInbox/></Shell>}

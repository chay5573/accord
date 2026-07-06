import Link from 'next/link';
import type { ReactNode } from 'react';

const navigation = [
  ['capture','/conversations/new','Capture'],
  ['prepare','/prepare','Prepare'],
  ['manage','/','Manage / Deal Desk'],
  ['client','/accord-guide','Client Portal'],
  ['settings','/settings','Settings']
] as const;

const settingsKeys = new Set(['settings','esign','inbox-settings','memory','library','compliance','onboarding']);
const sectionAliases:Record<string,string>={inbox:'manage',dashboard:'manage',drafts:'prepare',new:'prepare',quick:'capture',education:'client'};

export function Shell({children,active='manage'}:{children:ReactNode;active?:string}){
  const currentSection=sectionAliases[active]??active;
  return <div className="app-shell"><aside className="sidebar"><div><Link href="/" className="wordmark">ACCORD</Link><div className="side-sub brand-line">Capture. Prepare. Manage.</div></div><nav className="nav-list" aria-label="Primary navigation">{navigation.map(([key,href,label],index)=>{const selected=currentSection===key||(key==='settings'&&settingsKeys.has(active));return <Link key={key} className={`nav-item ${index===0?'capture-nav':''} ${selected?'active':''}`} href={href}>{index===0&&<span aria-hidden="true">+</span>}{label}</Link>})}</nav><div className="sidebar-footer"><span className="workspace-dot" aria-hidden="true"/><div><strong>Red Rock Group</strong><span>Mock workspace · Utah</span></div></div><div className="side-sub">Human-reviewed intelligence. No provider connections active.</div></aside><main className="main">{children}</main></div>;
}

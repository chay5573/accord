import type { OpportunityTimelineEvent } from '@/lib/opportunity';

function tone(event: OpportunityTimelineEvent) { return event.actionNeeded ? 'warn' : event.confidence === null ? 'neutral' : 'good'; }

export function AITimeline({ events, compact = false }: { events: OpportunityTimelineEvent[]; compact?: boolean }) {
  return <section className={`card ai-timeline-card ${compact ? 'compact' : ''}`}><div className="section-heading"><div><span className="section-kicker">AI Timeline</span><h2>The story of this work</h2><p>Signals, human decisions, drafts, signatures, and deadlines—with sources kept visible.</p></div><span className="status neutral">Mock evidence</span></div><div className="ai-timeline">{events.map(event => <article key={event.id}><i className={tone(event)} aria-hidden="true" /><time>{new Date(event.occurredAt).toLocaleString('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'})}</time><div><strong>{event.title}</strong><span>{event.source.replaceAll('_',' ')} · {event.provider.replaceAll('_',' ')}</span>{event.linkedReference && <small>Linked: {event.linkedReference}</small>}</div><span className={`status ${tone(event)}`}>{event.confidence === null ? 'Rule/event' : `${event.confidence}% confidence`}</span>{event.actionNeeded && <button type="button">{event.actionNeeded}</button>}</article>)}</div></section>;
}

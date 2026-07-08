import { AccordGuide } from '@/components/AccordGuide';
import { Shell } from '@/components/Shell';

export default function ClientViewPage() {
  return (
    <Shell active="client">
      <header className="topbar">
        <div>
          <span className="eyebrow">Client View · Mock</span>
          <h1>Client transaction home</h1>
          <p className="page-lead">A preview of what the client sees inside the transaction.</p>
        </div>
        <span className="status neutral">Preview only</span>
      </header>
      <AccordGuide />
    </Shell>
  );
}

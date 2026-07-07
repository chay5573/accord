import { CoordinateWorkspace } from '@/components/CoordinateWorkspace';
import { Shell } from '@/components/Shell';

export default function CoordinatePage() {
  return (
    <Shell active="coordinate">
      <header className="topbar">
        <div>
          <span className="eyebrow">Coordinate</span>
          <h1>Track what needs attention after documents exist.</h1>
          <p className="page-lead">Coordinate is the transaction-management layer: timeline, signatures, receipts, dates, documents, and client experience.</p>
        </div>
        <span className="status neutral">Mock workspace</span>
      </header>
      <CoordinateWorkspace />
    </Shell>
  );
}

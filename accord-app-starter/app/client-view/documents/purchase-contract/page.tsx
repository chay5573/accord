import { AccordGuide } from '@/components/AccordGuide';
import { Shell } from '@/components/Shell';

export default function DocumentHelpPage() {
  return (
    <Shell active="client">
      <header className="topbar">
        <div>
          <span className="eyebrow">Client View · Document Help</span>
          <h1>Document Help</h1>
          <p className="page-lead">A mock document viewer with section help and Ask Accord.</p>
        </div>
      </header>
      <AccordGuide documentMode />
    </Shell>
  );
}

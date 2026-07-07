import { PrepareWorkspace } from '@/components/PrepareWorkspace';
import { Shell } from '@/components/Shell';

export default function ReviewSendPage() {
  return (
    <Shell active="review">
      <header className="topbar">
        <div>
          <span className="eyebrow">Review & Send</span>
          <h1>Review the generated paperwork.</h1>
          <p className="page-lead">Accord prepares the fields first. You review evidence, resolve uncertainty, and approve before signatures.</p>
        </div>
        <span className="status neutral">Mock data</span>
      </header>
      <PrepareWorkspace />
    </Shell>
  );
}

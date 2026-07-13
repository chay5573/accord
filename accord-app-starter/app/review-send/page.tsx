import { PrepareWorkspace } from '@/components/PrepareWorkspace';
import { Shell } from '@/components/Shell';

export default function ReviewSendPage() {
  return (
    <Shell active="review">
      <h1 className="sr-only">Review & Send</h1>
      <PrepareWorkspace />
    </Shell>
  );
}

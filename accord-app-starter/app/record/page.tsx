import { Shell } from '@/components/Shell';
import { StartConversationFlow } from '@/components/StartConversationFlow';

export default function RecordPage() {
  return (
    <Shell active="record">
      <h1 className="sr-only">Record</h1>
      <StartConversationFlow />
    </Shell>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type RecordMode = 'live' | 'transcript' | 'voice' | 'upload';

const modes: [RecordMode, string][] = [
  ['live', 'Record Conversation'],
  ['transcript', 'Paste Transcript'],
  ['voice', 'Quick Voice Recap'],
  ['upload', 'Upload Notes / Documents']
];

export function StartConversationFlow() {
  const router = useRouter();
  const [mode, setMode] = useState<RecordMode>('live');
  const [consent, setConsent] = useState(false);
  const [text, setText] = useState('');
  const [recapRecorded, setRecapRecorded] = useState(false);

  function finishRecord() {
    router.push('/review-send');
  }

  function selectMode(nextMode: RecordMode) {
    setMode(nextMode);
    setRecapRecorded(false);
  }

  const primaryLabel = mode === 'transcript' ? 'Submit Transcript' : mode === 'upload' ? 'Submit Upload' : 'Record Conversation';

  return (
    <div className="simple-capture record-page">
      <section className="card capture-focus">
        <div className="capture-orb" aria-hidden="true"><span>●</span></div>
        <span className="section-kicker">Record</span>
        <h2>{modes.find(([id]) => id === mode)?.[1]}</h2>
        <p>Accord will organize everything afterward.</p>

        {mode === 'transcript' && (
          <label>
            Transcript
            <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Paste transcript..." />
          </label>
        )}

        {mode === 'voice' && (
          <div className="recap-actions">
            <button className="btn btn-secondary btn-large" type="button" disabled={recapRecorded} onClick={() => setRecapRecorded(true)}>
              {recapRecorded ? 'Recap Recorded' : 'Record Recap'}
            </button>
            {recapRecorded && <button className="btn btn-primary btn-large" type="button" onClick={finishRecord}>Submit Recap</button>}
          </div>
        )}

        {mode === 'upload' && (
          <button className="upload-placeholder" type="button">
            <strong>Choose notes or documents</strong>
            <span>Mock placeholder · nothing is stored.</span>
          </button>
        )}

        {mode === 'live' && (
          <label className="simple-consent">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
            <span><strong>Consent confirmed</strong></span>
          </label>
        )}

        {mode !== 'voice' && (
          <button className="btn btn-primary btn-large capture-primary" type="button" disabled={mode === 'live' && !consent} onClick={finishRecord}>
            {primaryLabel}
          </button>
        )}
      </section>

      <section className="capture-alternatives" aria-label="Record methods">
        {modes.map(([id, label]) => (
          <button type="button" className={mode === id ? 'active' : ''} aria-pressed={mode === id} onClick={() => selectMode(id)} key={id}>
            <strong>{label}</strong>
          </button>
        ))}
      </section>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type RecordMode = 'live' | 'transcript' | 'voice' | 'forgot' | 'upload';

const modes: [RecordMode, string, string][] = [
  ['transcript', 'Paste Transcript', 'Paste a transcript you already have.'],
  ['voice', 'Quick Voice Recap', 'Leave a short recap after the conversation.'],
  ['forgot', 'I Forgot to Record', 'Recover the details you remember.'],
  ['upload', 'Upload Notes / Documents', 'Add notes, screenshots, or draft files later.']
];

export function StartConversationFlow() {
  const router = useRouter();
  const [mode, setMode] = useState<RecordMode>('live');
  const [consent, setConsent] = useState(false);
  const [text, setText] = useState('');
  const textMode = mode === 'transcript' || mode === 'voice' || mode === 'forgot';

  function finishRecord() {
    router.push('/review-send');
  }

  return (
    <div className="simple-capture record-page">
      <section className="card capture-focus">
        <div className="capture-orb" aria-hidden="true"><span>●</span></div>
        <span className="section-kicker">Record</span>
        <h2>{mode === 'live' ? 'Record the conversation.' : 'Add what happened.'}</h2>
        <p>Accord will organize everything afterward.</p>

        {textMode && (
          <label>
            {mode === 'transcript' ? 'Transcript' : mode === 'voice' ? 'Quick voice recap placeholder' : 'What do you remember?'}
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Start with what you know. Accord will infer people, property, terms, documents, and missing facts afterward."
            />
          </label>
        )}

        {mode === 'upload' && (
          <button className="upload-placeholder" type="button">
            <strong>Upload notes or documents</strong>
            <span>Mock placeholder · nothing is stored or parsed.</span>
          </button>
        )}

        <label className="simple-consent">
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
          <span>
            <strong>Consent confirmed for this conversation</strong>
            <small>Required before live recording. Do not rely on blanket consent alone.</small>
          </span>
        </label>

        <button className="btn btn-primary btn-large capture-primary" type="button" disabled={mode === 'live' && !consent} onClick={finishRecord}>
          Record Conversation
        </button>
        {mode === 'live' && !consent && <small className="center-note">Recording stays blocked until consent is confirmed.</small>}
      </section>

      <section className="capture-alternatives" aria-label="Other record methods">
        {modes.map(([id, label, detail]) => (
          <button type="button" className={mode === id ? 'active' : ''} aria-pressed={mode === id} onClick={() => setMode(id)} key={id}>
            <strong>{label}</strong>
            <span>{detail}</span>
          </button>
        ))}
      </section>
    </div>
  );
}

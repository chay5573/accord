'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type RecordMode = 'live' | 'transcript' | 'voice' | 'upload';
type MockFile = { name: string; size: number };

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
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState<MockFile | null>(null);

  function finishRecord() {
    router.push('/review-send');
  }

  function selectMode(nextMode: RecordMode) {
    setMode(nextMode);
    setRecapRecorded(false);
    setIsRecording(false);
  }

  return (
    <div className="simple-capture record-page">
      <div className="capture-alternatives" role="tablist" aria-label="Record input method">
        {modes.map(([id, label]) => (
          <button
            type="button"
            role="tab"
            id={`record-tab-${id}`}
            aria-selected={mode === id}
            aria-controls={`record-panel-${id}`}
            className={mode === id ? 'active' : ''}
            onClick={() => selectMode(id)}
            key={id}
          >
            {label}
          </button>
        ))}
      </div>

      <section className="card capture-focus">
        <div id={`record-panel-${mode}`} role="tabpanel" aria-labelledby={`record-tab-${mode}`} className="record-mode-panel">
          {mode === 'live' && (
            <>
              <label className="simple-consent">
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                <span><strong>Consent confirmed</strong></span>
              </label>
              {isRecording && <span className="record-status" aria-live="polite">Recording · 00:12</span>}
              <button
                className="btn btn-primary btn-large capture-primary"
                type="button"
                disabled={!consent}
                onClick={() => (isRecording ? finishRecord() : setIsRecording(true))}
              >
                {isRecording ? 'Stop Recording' : 'Record Conversation'}
              </button>
            </>
          )}

          {mode === 'transcript' && (
            <>
              <label className="record-textarea">
                <span className="sr-only">Transcript</span>
                <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Paste transcript..." />
              </label>
              <button className="btn btn-primary btn-large capture-primary" type="button" onClick={finishRecord}>
                Submit Transcript
              </button>
            </>
          )}

          {mode === 'voice' && (
            <div className="recap-actions">
              {!recapRecorded && !isRecording && (
                <button className="btn btn-primary btn-large capture-primary" type="button" onClick={() => setIsRecording(true)}>
                  Record Recap
                </button>
              )}
              {isRecording && (
                <>
                  <span className="record-status" aria-live="polite">Recording recap · 00:08</span>
                  <button className="btn btn-secondary btn-large capture-primary" type="button" onClick={() => { setIsRecording(false); setRecapRecorded(true); }}>
                    Stop Recording
                  </button>
                </>
              )}
              {recapRecorded && (
                <>
                  <span className="record-status" aria-live="polite">Recap ready</span>
                  <button className="btn btn-primary btn-large capture-primary" type="button" onClick={finishRecord}>
                    Submit Recap
                  </button>
                </>
              )}
            </div>
          )}

          {mode === 'upload' && (
            <>
              <label className="record-upload-zone">
                <span>Choose Files</span>
                <input
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setSelectedFile(file ? { name: file.name, size: file.size } : null);
                  }}
                />
              </label>
              {selectedFile && <span className="record-status">{selectedFile.name}</span>}
              <button className="btn btn-primary btn-large capture-primary upload-submit" type="button" onClick={finishRecord}>
                Submit Upload
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

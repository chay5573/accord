'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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
  const [isPreparing, setIsPreparing] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<MockFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isPreparing) return;

    const timer = window.setTimeout(() => {
      router.push('/review-send');
    }, 850);

    return () => window.clearTimeout(timer);
  }, [isPreparing, router]);

  function preparePaperwork() {
    setIsRecording(false);
    setIsPreparing(true);
  }

  function selectMode(nextMode: RecordMode) {
    setMode(nextMode);
    setRecapRecorded(false);
    setIsRecording(false);
    setIsPreparing(false);
  }

  const selectedFileSummary =
    selectedFiles.length === 0
      ? null
      : selectedFiles.length === 1
        ? selectedFiles[0].name
        : `${selectedFiles.length} files selected`;

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
          {isPreparing && (
            <div className="preparing-state" aria-live="polite">
              <span className="preparing-spinner" aria-hidden="true" />
              <strong>Preparing paperwork...</strong>
            </div>
          )}

          {mode === 'live' && !isPreparing && (
            <>
              <label className="simple-consent">
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                <span>
                  <strong>Recording consent has been obtained from all participants.</strong>
                  <small>Required before recording begins.</small>
                </span>
              </label>
              {isRecording && <span className="record-status" aria-live="polite">Recording · 00:12</span>}
              <button
                className="btn btn-primary btn-large capture-primary"
                type="button"
                disabled={!consent}
                onClick={() => (isRecording ? preparePaperwork() : setIsRecording(true))}
              >
                {isRecording ? 'Stop Recording' : 'Record Conversation'}
              </button>
            </>
          )}

          {mode === 'transcript' && !isPreparing && (
            <>
              <label className="record-textarea">
                <span className="sr-only">Transcript</span>
                <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Paste transcript..." />
              </label>
              <button className="btn btn-primary btn-large capture-primary" type="button" onClick={preparePaperwork}>
                Submit Transcript
              </button>
            </>
          )}

          {mode === 'voice' && (
            <div className="recap-actions">
              {!recapRecorded && !isRecording && !isPreparing && (
                <button className="btn btn-primary btn-large capture-primary" type="button" onClick={() => setIsRecording(true)}>
                  Record Recap
                </button>
              )}
              {isRecording && !isPreparing && (
                <>
                  <span className="record-status" aria-live="polite">Recording recap · 00:08</span>
                  <button className="btn btn-secondary btn-large capture-primary" type="button" onClick={() => { setIsRecording(false); setRecapRecorded(true); }}>
                    Stop Recording
                  </button>
                </>
              )}
              {recapRecorded && !isPreparing && (
                <>
                  <span className="record-status" aria-live="polite">Recap ready</span>
                  <button className="btn btn-primary btn-large capture-primary" type="button" onClick={preparePaperwork}>
                    Submit Recap
                  </button>
                </>
              )}
            </div>
          )}

          {mode === 'upload' && !isPreparing && (
            <>
              <div className="record-upload-zone">
                <input
                  ref={fileInputRef}
                  className="record-file-input"
                  type="file"
                  multiple
                  aria-label="Choose files"
                  aria-describedby={selectedFileSummary ? 'selected-upload-files' : undefined}
                  onChange={(event) => {
                    const files = Array.from(event.target.files ?? []).map((file) => ({ name: file.name, size: file.size }));
                    setSelectedFiles(files);
                  }}
                />
                <button className="btn btn-secondary record-file-button" type="button" onClick={() => fileInputRef.current?.click()}>
                  Choose Files
                </button>
              </div>
              {selectedFileSummary && <span id="selected-upload-files" className="record-status">{selectedFileSummary}</span>}
              <button className="btn btn-primary btn-large capture-primary upload-submit" type="button" onClick={preparePaperwork}>
                Submit Upload
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

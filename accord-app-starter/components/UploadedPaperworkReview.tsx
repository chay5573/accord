'use client';

import { useRef, useState } from 'react';
import {
  createMockDocumentReview,
  type DocumentReviewIssue,
  type DocumentReviewIssueStatus
} from '@/lib/documentReview';

type ReviewState = 'idle' | 'reviewing' | 'complete';

const severityTone = {
  critical: 'danger',
  high: 'danger',
  medium: 'warn',
  low: 'neutral'
} as const;

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadedPaperworkReview() {
  const inputRef = useRef<HTMLInputElement>(null);
  const reviewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [reviewState, setReviewState] = useState<ReviewState>('idle');
  const [issues, setIssues] = useState<DocumentReviewIssue[]>([]);
  const [viewedIssueId, setViewedIssueId] = useState<string | null>(null);

  function selectFiles(selectedFiles: File[]) {
    if (reviewTimerRef.current) clearTimeout(reviewTimerRef.current);
    setFiles(selectedFiles);
    setReviewState('idle');
    setIssues([]);
    setViewedIssueId(null);
  }

  function startMockReview() {
    if (files.length === 0) return;
    setReviewState('reviewing');
    reviewTimerRef.current = setTimeout(() => {
      const result = createMockDocumentReview(files.map((file) => ({ name: file.name, mediaType: file.type, sizeBytes: file.size })));
      setIssues(result.issues);
      setReviewState('complete');
    }, 550);
  }

  function updateIssue(issueId: string, status: DocumentReviewIssueStatus) {
    setIssues((current) => current.map((issue) => issue.id === issueId ? { ...issue, status } : issue));
  }

  const activeIssues = issues.filter((issue) => issue.status === 'open');
  const viewedIssue = issues.find((issue) => issue.id === viewedIssueId);

  return (
    <details className="card paperwork-upload-card">
      <summary>
        <span><strong>Upload Paperwork for Review</strong><small>Check outside paperwork against approved transaction facts · mock</small></span>
        <span className="status neutral">Optional</span>
      </summary>
      <div className="paperwork-upload-content">
        <p className="mock-boundary">Prototype issue triage only. Accord is not validating legal-form completeness and will not alter uploaded files.</p>
        <div
          className="paperwork-drop-zone"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            selectFiles(Array.from(event.dataTransfer.files));
          }}
        >
          <input
            ref={inputRef}
            className="sr-only"
            id="paperwork-review-upload"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            multiple
            onChange={(event) => selectFiles(Array.from(event.target.files ?? []))}
          />
          <button className="btn btn-secondary" type="button" onClick={() => inputRef.current?.click()}>Choose files</button>
          <span>PDF, DOC, or DOCX · drag and drop supported</span>
        </div>

        {files.length > 0 && (
          <div className="selected-paperwork-files" aria-live="polite">
            <strong>{files.length === 1 ? files[0].name : `${files.length} files selected`}</strong>
            <ul>{files.map((file) => <li key={`${file.name}-${file.size}`}><span>{file.name}</span><small>{formatFileSize(file.size)}</small></li>)}</ul>
            <button className="btn btn-secondary" type="button" disabled={reviewState === 'reviewing'} onClick={startMockReview}>{reviewState === 'reviewing' ? 'Reviewing paperwork…' : 'Start mock review'}</button>
          </div>
        )}

        {reviewState === 'complete' && (
          <section className="mock-document-review" aria-labelledby="mock-review-heading">
            <div className="mock-review-heading">
              <div><span className="section-kicker">Mock results</span><h3 id="mock-review-heading">{activeIssues.length} issue{activeIssues.length === 1 ? '' : 's'} need review</h3></div>
              <small>No uploaded document was modified.</small>
            </div>
            <div className="document-review-issues">
              {issues.map((issue) => (
                <article className={issue.status === 'open' ? '' : 'is-complete'} key={issue.id}>
                  <div className="document-review-issue-title">
                    <span className={`status ${severityTone[issue.severity]}`}>{issue.severity}</span>
                    <div><strong>{issue.issue}</strong><small>{issue.documentName} · {issue.pageNumber ? `Page ${issue.pageNumber}` : 'Page not identified'}{issue.section ? ` · ${issue.section}` : ''}</small></div>
                  </div>
                  <p>{issue.suggestedAction}</p>
                  {issue.comparison && <div className="document-comparison"><span>Approved: {issue.comparison.approvedValue ?? 'Unknown'}</span><span>Uploaded: {issue.comparison.observedValue ?? 'Missing'}</span></div>}
                  <div className="document-review-actions">
                    <button className="text-button" type="button" onClick={() => setViewedIssueId(issue.id)}>View in document</button>
                    {issue.status === 'open' ? (
                      <>
                        <button className="btn btn-quiet" type="button" onClick={() => updateIssue(issue.id, 'dismissed')}>Dismiss</button>
                        <button className="btn btn-secondary" type="button" onClick={() => updateIssue(issue.id, 'resolved')}>Mark resolved</button>
                        <button className="btn btn-secondary" type="button" onClick={() => updateIssue(issue.id, 'correction_prepared')}>Prepare correction</button>
                      </>
                    ) : <span className="status neutral">{issue.status.replaceAll('_', ' ')}</span>}
                  </div>
                </article>
              ))}
            </div>
            {viewedIssue && <div className="document-location-preview" role="status"><strong>Mock document location</strong><span>{viewedIssue.documentName} · {viewedIssue.pageNumber ? `Page ${viewedIssue.pageNumber}` : 'Page unknown'}{viewedIssue.section ? ` · ${viewedIssue.section}` : ''}</span><small>A future provider will open this exact location. No document content is changed.</small></div>}
          </section>
        )}
      </div>
    </details>
  );
}

'use client';

import { useState } from 'react';
import {
  type AddendumProvision,
  type FieldReviewStatus,
  type GeneratedFormField,
  type ReviewDocument,
  type ReviewPackage,
  mockReviewPackages
} from '@/lib/reviewPackages';

const statusClass: Record<FieldReviewStatus, string> = {
  ready: 'good',
  missing: 'danger',
  low_confidence: 'warn',
  conflicting: 'warn',
  default_requires_confirmation: 'warn',
  materially_changed: 'warn',
  unmapped_source: 'warn'
};

const statusLabel: Record<FieldReviewStatus, string> = {
  ready: 'Ready',
  missing: 'Missing',
  low_confidence: 'Low confidence',
  conflicting: 'Conflicting',
  default_requires_confirmation: 'Confirm default',
  materially_changed: 'Changed',
  unmapped_source: 'Unmapped source'
};

function packageName(pkg: ReviewPackage) {
  return `${pkg.clientFullLegalNames} · ${pkg.propertyAddress} · ${pkg.packageType}`;
}

function needsReview(field: GeneratedFormField) {
  return field.reviewStatus !== 'ready';
}

function needsReviewProvision(provision: AddendumProvision) {
  return provision.reviewStatus !== 'ready';
}

function fieldTone(status: FieldReviewStatus) {
  if (status === 'missing') return 'missing';
  if (status === 'ready') return 'ready';
  return 'warning';
}

function sourceLabel(field: GeneratedFormField) {
  if (field.sourceReferences.length === 0) return 'No source';
  return field.sourceReferences.map((source) => source.label).join('; ');
}

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function PrepareWorkspace() {
  const [activePackageId, setActivePackageId] = useState(mockReviewPackages[0].id);
  const [expandedDocumentId, setExpandedDocumentId] = useState(mockReviewPackages[0].documents[0].id);
  const [transcriptOpen, setTranscriptOpen] = useState(true);
  const [highlightedSegments, setHighlightedSegments] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [preferenceFieldId, setPreferenceFieldId] = useState<string | null>(null);
  const [preferenceSaved, setPreferenceSaved] = useState(false);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(mockReviewPackages.flatMap((pkg) => pkg.fields.map((field) => [field.id, field.exactGeneratedValue])))
  );

  const activePackage = mockReviewPackages.find((pkg) => pkg.id === activePackageId) ?? mockReviewPackages[0];
  const activeFields = activePackage.fields;
  const flaggedFields = activeFields.filter(needsReview);
  const flaggedProvisions = activePackage.addendumProvisions.filter(needsReviewProvision);
  const requiredUnresolved = flaggedFields.filter((field) => field.required && field.reviewStatus === 'missing').length + flaggedProvisions.filter((provision) => provision.reviewStatus === 'missing').length;
  const recommendedUnresolved = flaggedFields.length + flaggedProvisions.length - requiredUnresolved;
  const activePreferenceField = activeFields.find((field) => field.id === preferenceFieldId);

  const fieldsById = new Map(activeFields.map((field) => [field.id, field]));
  const provisionsById = new Map(activePackage.addendumProvisions.map((provision) => [provision.id, provision]));

  function updateField(fieldId: string, value: string) {
    setFieldValues((current) => ({ ...current, [fieldId]: value }));
  }

  function jumpToSource(field: GeneratedFormField | AddendumProvision) {
    const source = field.sourceReferences[0];
    if (!source) return;

    if (source.type === 'transcript') {
      setTranscriptOpen(true);
      setHighlightedSegments(source.segmentIds);
      window.setTimeout(() => document.getElementById(source.segmentIds[0])?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
      return;
    }

    setTranscriptOpen(false);
    setHighlightedSegments([]);
    window.setTimeout(() => document.getElementById(`source-${source.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
  }

  function renderField(field: GeneratedFormField, compact = false) {
    const tone = fieldTone(field.reviewStatus);
    return (
      <article className={`paperwork-review-row ${tone}`} key={`${compact ? 'needs' : 'full'}-${field.id}`}>
        <div className="paperwork-field-main">
          <strong>{field.definition.officialLabel}</strong>
          <span>{field.definition.sectionNumber} · {field.mappedFormFieldId}</span>
          {field.reviewReason && <small>{field.reviewReason}</small>}
        </div>
        <label className="paperwork-value-cell">
          <span className="sr-only">{field.definition.officialLabel}</span>
          <input value={fieldValues[field.id] ?? ''} onChange={(event) => updateField(field.id, event.target.value)} aria-label={`${field.definition.officialLabel} exact paperwork value`} />
          {field.selection?.selectedOption && <small>Selected option: {field.selection.selectedOption}</small>}
          {typeof field.selection?.checkboxState === 'boolean' && <small>Checkbox: {field.selection.checkboxState ? 'Checked' : 'Unchecked'}</small>}
        </label>
        <span className={`status ${statusClass[field.reviewStatus]}`}>{statusLabel[field.reviewStatus]}</span>
        <span className="confidence-mini">{field.confidence === null ? 'No confidence' : `${field.confidence}%`}</span>
        <button className="text-button" type="button" onClick={() => jumpToSource(field)}>Source</button>
        {field.definition.preferenceEligible && (
          <button className="text-button subtle-action" type="button" onClick={() => { setPreferenceFieldId(field.id); setPreferenceSaved(false); }}>
            Use this next time
          </button>
        )}
        {!compact && (
          <div className="paperwork-meta">
            <span>{field.documentVersion}</span>
            <span>{field.jurisdiction}</span>
            <span>{field.definition.inputType.replaceAll('_', ' ')}</span>
            <span>{field.approvalState.replaceAll('_', ' ')}</span>
            <span>Source: {sourceLabel(field)}</span>
          </div>
        )}
      </article>
    );
  }

  function renderProvision(provision: AddendumProvision) {
    const tone = fieldTone(provision.reviewStatus);
    return (
      <article className={`paperwork-review-row addendum-row ${tone}`} key={provision.id}>
        <div className="paperwork-field-main">
          <strong>{provision.documentTitle} · Item {provision.itemNumber}</strong>
          <span>Addendum No. {provision.addendumNumber}</span>
        </div>
        <label className="paperwork-value-cell">
          <span className="sr-only">{provision.documentTitle} item {provision.itemNumber}</span>
          <textarea value={fieldValues[provision.id] ?? provision.exactParagraphText} onChange={(event) => updateField(provision.id, event.target.value)} aria-label={`${provision.documentTitle} item ${provision.itemNumber} exact paragraph`} />
        </label>
        <span className={`status ${statusClass[provision.reviewStatus]}`}>{statusLabel[provision.reviewStatus]}</span>
        <span className="confidence-mini">Provision</span>
        <button className="text-button" type="button" onClick={() => jumpToSource(provision)}>Source</button>
        <div className="paperwork-meta">
          <span>Verbatim addendum provision</span>
          <span>{provision.approvalState.replaceAll('_', ' ')}</span>
        </div>
      </article>
    );
  }

  function renderDocument(document: ReviewDocument, active = false) {
    return (
      <details className="paperwork-document" key={document.id} open={active || document.id === expandedDocumentId} onToggle={(event) => { if (event.currentTarget.open) setExpandedDocumentId(document.id); }}>
        <summary>
          <span><strong>{document.name}</strong><small>{document.documentVersion} · {document.jurisdiction}</small></span>
          <span>{document.sections.reduce((count, section) => count + section.fieldIds.length + (section.addendumProvisionIds?.length ?? 0), 0)} items</span>
        </summary>
        {document.sections.map((section) => (
          <section className="paperwork-section" key={section.id}>
            <h3>Section {section.sectionNumber}: {section.title}</h3>
            <div className="paperwork-review-list">
              {section.fieldIds.map((fieldId) => fieldsById.get(fieldId)).filter(isDefined).map((field) => renderField(field))}
              {(section.addendumProvisionIds ?? []).map((provisionId) => provisionsById.get(provisionId)).filter(isDefined).map((provision) => renderProvision(provision))}
            </div>
          </section>
        ))}
      </details>
    );
  }

  return (
    <div className="review-send-page exact-review-page">
      <section className="package-list">
        {mockReviewPackages.map((pkg) => {
          const flaggedCount = pkg.fields.filter(needsReview).length + pkg.addendumProvisions.filter(needsReviewProvision).length;
          const selected = pkg.id === activePackage.id;
          return (
            <button className={`package-row-card ${selected ? 'active' : ''}`} type="button" key={pkg.id} onClick={() => { setActivePackageId(pkg.id); setExpandedDocumentId(pkg.documents[0].id); setPreviewOpen(false); }}>
              <span><strong>{packageName(pkg)}</strong><small>{pkg.lastUpdated}</small></span>
              <span className={`status ${flaggedCount > 0 ? 'warn' : 'good'}`}>{pkg.readinessStatus}</span>
              <small>{flaggedCount} need review</small>
              <small>{pkg.documents.length} documents</small>
            </button>
          );
        })}
      </section>

      <section className="card exact-review-summary">
        <div>
          <h2>{packageName(activePackage)}</h2>
          <p className="dev-warning">{activePackage.representativeSchemaWarning}</p>
        </div>
        <div className="readiness-facts">
          <span><strong>{activePackage.documents.length}</strong><small>documents</small></span>
          <span><strong>{requiredUnresolved}</strong><small>required missing</small></span>
          <span><strong>{recommendedUnresolved}</strong><small>review items</small></span>
          <span><strong>{activePackage.readiness.readinessForSignature.replaceAll('_', ' ')}</strong><small>signature readiness</small></span>
        </div>
        <button className="btn btn-secondary" type="button" onClick={() => setPreviewOpen((value) => !value)}>Preview Paperwork</button>
      </section>

      {previewOpen && (
        <section className="card paperwork-preview-card">
          <div className="section-heading"><div><span className="section-kicker">Mock preview</span><h2>Preview Paperwork</h2></div><button className="btn btn-quiet" type="button" onClick={() => setPreviewOpen(false)}>Return to review</button></div>
          <div className="paperwork-preview-docs">
            {activePackage.documents.map((document) => (
              <article className="paperwork-page" key={document.id}>
                <h3>{document.name}</h3>
                <small>{document.documentVersion} · Not an official completed PDF</small>
                {document.sections.map((section) => (
                  <div className="preview-section" key={section.id}>
                    <strong>Section {section.sectionNumber}: {section.title}</strong>
                    {section.fieldIds.map((fieldId) => fieldsById.get(fieldId)).filter(isDefined).map((field) => (
                      <p key={field.id}><span>{field.definition.officialLabel}</span><b>{fieldValues[field.id] || '__________'}</b>{field.selection?.checkboxState && <em>☑</em>}</p>
                    ))}
                    {(section.addendumProvisionIds ?? []).map((provisionId) => provisionsById.get(provisionId)).filter(isDefined).map((provision) => (
                      <p key={provision.id}><span>{provision.itemNumber}.</span><b>{fieldValues[provision.id] ?? provision.exactParagraphText}</b></p>
                    ))}
                  </div>
                ))}
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="card field-review-card">
        <div className="section-heading"><div><span className="section-kicker">Required attention</span><h2>Needs Review</h2></div><span className="status warn">{flaggedFields.length + flaggedProvisions.length} items</span></div>
        <div className="paperwork-review-list">
          {flaggedFields.map((field) => renderField(field, true))}
          {flaggedProvisions.map(renderProvision)}
        </div>
      </section>

      <section className="card field-review-card">
        <div className="section-heading"><div><span className="section-kicker">Exact paperwork order</span><h2>Full Paperwork Review</h2></div><span className="status neutral">{activeFields.length + activePackage.addendumProvisions.length} total items</span></div>
        {activePackage.documents.map((document, index) => renderDocument(document, index === 0))}
      </section>

      <section className="card action-stack-card">
        <button className="btn btn-secondary" type="button">Save Draft</button>
        <button className="btn btn-primary btn-large" type="button" disabled={requiredUnresolved > 0}>
          Send for Signatures
        </button>
        {requiredUnresolved > 0 && <small>{requiredUnresolved} unresolved required item{requiredUnresolved === 1 ? '' : 's'}</small>}
      </section>

      <section className="card transcript-card">
        <div className="section-heading">
          <div><span className="section-kicker">Complete transcript</span><h2>Conversation Source</h2></div>
          <button className="btn btn-secondary" type="button" onClick={() => setTranscriptOpen((value) => !value)}>{transcriptOpen ? 'Collapse' : 'Open'}</button>
        </div>
        {transcriptOpen && (
          <div className="transcript-snippets complete-transcript">
            {activePackage.transcriptSegments.map((segment) => (
              <blockquote id={segment.id} className={highlightedSegments.includes(segment.id) ? 'highlighted' : ''} key={segment.id}>
                <span>{segment.timestamp} · {segment.speaker} · {segment.id}</span>{segment.text}
              </blockquote>
            ))}
          </div>
        )}
        <div className="source-detail-list">
          {activePackage.sourceDetails.filter((source) => source.type !== 'transcript').map((source) => (
            <article id={`source-${source.id}`} key={source.id}>
              <strong>{source.label}</strong>
              <span>{source.type.replaceAll('_', ' ')}</span>
              <p>{source.exactQuote}</p>
            </article>
          ))}
        </div>
      </section>

      {activePreferenceField && (
        <div className="preference-drawer" role="dialog" aria-modal="true" aria-label="Save as preference">
          <div className="card">
            <div className="section-heading"><div><span className="section-kicker">Save as preference</span><h2>{activePreferenceField.definition.officialLabel}</h2></div><button className="btn btn-quiet" type="button" onClick={() => setPreferenceFieldId(null)}>Close</button></div>
            <p>Accord can suggest this value in future applicable transactions. It will not change the AI model.</p>
            <div className="field-grid">
              <label>Value<input value={fieldValues[activePreferenceField.id] ?? ''} readOnly /></label>
              <label>Applies to<select defaultValue="personal"><option>Personal</option><option>Team</option><option>Brokerage</option></select></label>
              <label>Use when<select defaultValue="type"><option value="all">All future applicable transactions</option><option value="type">Only transactions of this type</option></select></label>
            </div>
            <div className="form-actions"><button className="btn btn-secondary" type="button" onClick={() => setPreferenceFieldId(null)}>Cancel</button><button className="btn btn-primary" type="button" onClick={() => setPreferenceSaved(true)}>Approve and save</button></div>
            {preferenceSaved && <div className="notice compact success">Preference saved for future suggestions.</div>}
          </div>
        </div>
      )}
    </div>
  );
}

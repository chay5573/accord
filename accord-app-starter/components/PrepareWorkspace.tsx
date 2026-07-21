'use client';

import { useMemo, useRef, useState } from 'react';
import {
  type AddendumProvision,
  type FieldApproval,
  type FieldRevision,
  type FieldReviewStatus,
  type FieldSourceReference,
  type GeneratedFormField,
  type PackageStatus,
  type ReviewDocument,
  type ReviewNavigationState,
  type ReviewPackage,
  mockReviewPackages
} from '@/lib/reviewPackages';

type ReviewSection = 'needsAttention' | 'fullPaperwork' | 'transcript' | 'includedDocuments' | 'otherSources';

interface RuntimeReviewItem {
  value: string;
  originalValue: string;
  status: FieldReviewStatus;
  dirty: boolean;
  approvals: FieldApproval[];
  revisions: FieldRevision[];
}

type ReviewItem =
  | { kind: 'field'; record: GeneratedFormField }
  | { kind: 'provision'; record: AddendumProvision };

const packageStatusLabel: Record<PackageStatus, string> = {
  needs_attention: 'Needs Attention',
  ready_to_approve: 'Ready to Approve',
  ready_to_send: 'Ready to Send',
  draft_saved: 'Draft Saved',
  sent_for_signatures: 'Sent for Signatures'
};

const packageStatusTone: Record<PackageStatus, string> = {
  needs_attention: 'danger',
  ready_to_approve: 'warn',
  ready_to_send: 'good',
  draft_saved: 'neutral',
  sent_for_signatures: 'sent'
};

const itemStatusLabel: Record<FieldReviewStatus, string> = {
  missing: 'Missing',
  conflicting: 'Conflict',
  needs_approval: 'Needs approval',
  approved: 'Approved',
  edited_and_approved: 'Edited & approved',
  rejected: 'Rejected',
  optional_review: 'Optional review'
};

const riskOrder = { critical: 0, high: 1, medium: 2, low: 3 } as const;

function packageName(pkg: ReviewPackage) {
  return `${pkg.clientFullLegalNames} · ${pkg.propertyAddress} · ${pkg.packageType}`;
}

function allPackageItems(pkg: ReviewPackage): ReviewItem[] {
  return [
    ...pkg.fields.map((record) => ({ kind: 'field' as const, record })),
    ...pkg.addendumProvisions.map((record) => ({ kind: 'provision' as const, record }))
  ];
}

function itemId(item: ReviewItem) {
  return item.record.id;
}

function isResolved(status: FieldReviewStatus) {
  return status === 'approved' || status === 'edited_and_approved';
}

function isRequiredBlocker(item: ReviewItem, runtime: RuntimeReviewItem) {
  return item.record.required && (!runtime.value.trim() || runtime.status === 'missing' || runtime.status === 'conflicting' || runtime.status === 'rejected');
}

function reviewRank(item: ReviewItem, runtime: RuntimeReviewItem) {
  if (runtime.status === 'missing' && item.record.required) return 0;
  if (runtime.status === 'conflicting') return 1;
  if (item.record.material && runtime.status === 'needs_approval' && (item.record.confidence ?? 0) < 85) return 2;
  if (item.record.sourceReferences.some((source) => source.type === 'office_default' || source.type === 'prior_preference')) return 3;
  if (!item.record.material && runtime.status === 'needs_approval' && (item.record.confidence ?? 100) < 85) return 4;
  if (runtime.status === 'optional_review') return 5;
  return 2;
}

function stableId(...parts: string[]) {
  return parts.join('-').replace(/[^a-zA-Z0-9_-]/g, '-');
}

function sourceTypeLabel(type: FieldSourceReference['type']) {
  return {
    transcript: 'Transcript',
    office_default: 'Office default',
    prior_preference: 'Approved preference',
    mls: 'MLS signal',
    county_record: 'County record',
    email: 'Email signal',
    document_upload: 'Uploaded document'
  }[type];
}

function highlightedText(text: string, exactQuote: string) {
  const index = text.toLocaleLowerCase().indexOf(exactQuote.toLocaleLowerCase());
  if (!exactQuote || index < 0) return text;
  return <>{text.slice(0, index)}<mark>{text.slice(index, index + exactQuote.length)}</mark>{text.slice(index + exactQuote.length)}</>;
}

function itemLabel(item: ReviewItem) {
  return item.kind === 'field'
    ? item.record.definition.officialLabel
    : `${item.record.documentTitle} · Item ${item.record.itemNumber}`;
}

export function PrepareWorkspace() {
  const [activePackageId, setActivePackageId] = useState(mockReviewPackages[0].id);
  const [runtimeItems, setRuntimeItems] = useState<Record<string, RuntimeReviewItem>>(() =>
    Object.fromEntries(mockReviewPackages.flatMap((pkg) => allPackageItems(pkg).map((item) => {
      const initialValue = item.record.reviewStatus === 'missing'
        ? ''
        : item.kind === 'field' ? item.record.exactGeneratedValue : item.record.exactParagraphText;
      return [itemId(item), {
        value: initialValue,
        originalValue: initialValue,
        status: item.record.reviewStatus,
        dirty: false,
        approvals: [],
        revisions: []
      } satisfies RuntimeReviewItem];
    })))
  );
  const [sectionState, setSectionState] = useState<Record<string, Record<ReviewSection, boolean>>>(() =>
    Object.fromEntries(mockReviewPackages.map((pkg) => [pkg.id, {
      needsAttention: allPackageItems(pkg).some((item) => !isResolved(item.record.reviewStatus)),
      fullPaperwork: false,
      transcript: false,
      includedDocuments: false,
      otherSources: false
    }]))
  );
  const [openDocuments, setOpenDocuments] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(mockReviewPackages.map((pkg) => [pkg.id, [pkg.documents[0]?.id].filter(Boolean)]))
  );
  const [savedPackages, setSavedPackages] = useState<string[]>([]);
  const [sentPackages, setSentPackages] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [preferenceFieldId, setPreferenceFieldId] = useState<string | null>(null);
  const [preferenceSaved, setPreferenceSaved] = useState(false);
  const [highlightedSegments, setHighlightedSegments] = useState<string[]>([]);
  const [highlightedQuote, setHighlightedQuote] = useState('');
  const [navigationState, setNavigationState] = useState<ReviewNavigationState | null>(null);
  const [returnHighlightId, setReturnHighlightId] = useState<string | null>(null);
  const reviewHeadingRef = useRef<HTMLHeadingElement>(null);

  const activePackage = mockReviewPackages.find((pkg) => pkg.id === activePackageId) ?? mockReviewPackages[0];
  const activeItems = useMemo(() => allPackageItems(activePackage), [activePackage]);
  const fieldsById = useMemo(() => new Map(activePackage.fields.map((field) => [field.id, field])), [activePackage]);
  const provisionsById = useMemo(() => new Map(activePackage.addendumProvisions.map((provision) => [provision.id, provision])), [activePackage]);
  const currentSections = sectionState[activePackage.id];
  const activePreferenceField = activePackage.fields.find((field) => field.id === preferenceFieldId);

  const unresolvedItems = activeItems
    .filter((item) => !isResolved(runtimeItems[itemId(item)].status))
    .sort((a, b) => {
      const aRuntime = runtimeItems[itemId(a)];
      const bRuntime = runtimeItems[itemId(b)];
      const groupDifference = reviewRank(a, aRuntime) - reviewRank(b, bRuntime);
      if (groupDifference) return groupDifference;
      const riskDifference = riskOrder[a.record.transactionRisk] - riskOrder[b.record.transactionRisk];
      if (riskDifference) return riskDifference;
      const aDocument = a.kind === 'field' ? activePackage.documents.find((document) => document.id === a.record.documentId)?.order ?? 99 : a.record.addendumNumber;
      const bDocument = b.kind === 'field' ? activePackage.documents.find((document) => document.id === b.record.documentId)?.order ?? 99 : b.record.addendumNumber;
      if (aDocument !== bDocument) return aDocument - bDocument;
      const aSequence = a.kind === 'field' ? a.record.definition.itemSequence : a.record.itemNumber;
      const bSequence = b.kind === 'field' ? b.record.definition.itemSequence : b.record.itemNumber;
      if (aSequence !== bSequence) return aSequence - bSequence;
      return (a.record.confidence ?? -1) - (b.record.confidence ?? -1);
    });

  const requiredBlockers = activeItems.filter((item) => isRequiredBlocker(item, runtimeItems[itemId(item)]));

  function getPackageStatus(pkg: ReviewPackage): PackageStatus {
    if (sentPackages.includes(pkg.id)) return 'sent_for_signatures';
    const items = allPackageItems(pkg);
    const hasRequiredBlocker = items.some((item) => isRequiredBlocker(item, runtimeItems[itemId(item)]));
    const hasUnapproved = items.some((item) => !isResolved(runtimeItems[itemId(item)].status));
    if (savedPackages.includes(pkg.id) && (hasRequiredBlocker || hasUnapproved)) return 'draft_saved';
    if (hasRequiredBlocker) return 'needs_attention';
    if (hasUnapproved) return 'ready_to_approve';
    return 'ready_to_send';
  }

  const activePackageStatus = getPackageStatus(activePackage);

  function setSection(section: ReviewSection, open: boolean) {
    setSectionState((current) => ({
      ...current,
      [activePackage.id]: { ...current[activePackage.id], [section]: open }
    }));
  }

  function scrollAndFocus(elementId: string, block: ScrollLogicalPosition = 'start') {
    window.setTimeout(() => {
      const target = document.getElementById(elementId);
      target?.scrollIntoView({ behavior: 'smooth', block });
      target?.focus({ preventScroll: true });
    }, 80);
  }

  function selectPackage(packageId: string) {
    setActivePackageId(packageId);
    setPreviewOpen(false);
    setHighlightedSegments([]);
    setHighlightedQuote('');
    setNavigationState(null);
    setSectionState((current) => ({
      ...current,
      [packageId]: { ...current[packageId], needsAttention: true }
    }));
    window.history.replaceState(null, '', `#review-${packageId}`);
    window.setTimeout(() => {
      reviewHeadingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      reviewHeadingRef.current?.focus({ preventScroll: true });
    }, 80);
  }

  function togglePreview() {
    const nextOpen = !previewOpen;
    setPreviewOpen(nextOpen);
    window.history.replaceState(null, '', nextOpen ? '#paperwork-preview' : window.location.pathname);
    if (nextOpen) scrollAndFocus('paperwork-preview');
  }

  function closePreview() {
    setPreviewOpen(false);
    window.history.replaceState(null, '', window.location.pathname);
  }

  function updateItemValue(id: string, value: string) {
    setRuntimeItems((current) => ({
      ...current,
      [id]: {
        ...current[id],
        value,
        dirty: value !== current[id].originalValue,
        status: value.trim() ? 'needs_approval' : 'missing'
      }
    }));
  }

  function approveItem(id: string) {
    setRuntimeItems((current) => {
      const item = current[id];
      if (!item.value.trim()) return current;
      const edited = item.dirty || !item.originalValue.trim();
      const recordedAt = new Date().toISOString();
      const revision: FieldRevision[] = edited && item.value !== item.originalValue
        ? [...item.revisions, { id: `revision-${id}-${item.revisions.length + 1}`, itemId: id, previousValue: item.originalValue, revisedValue: item.value, actor: 'Calvin Hayward', revisedAt: recordedAt }]
        : item.revisions;
      const action = edited ? 'edited_and_approved' : 'approved';
      return {
        ...current,
        [id]: {
          ...item,
          originalValue: item.value,
          dirty: false,
          status: action,
          revisions: revision,
          approvals: [...item.approvals, { id: `approval-${id}-${item.approvals.length + 1}`, itemId: id, action, actor: 'Calvin Hayward', recordedAt, valueSnapshot: item.value }]
        }
      };
    });
  }

  function approveAllReady() {
    const safeIds = unresolvedItems
      .filter((item) => {
        const runtime = runtimeItems[itemId(item)];
        return runtime.value.trim() && runtime.status !== 'conflicting' && runtime.status !== 'rejected';
      })
      .map(itemId);
    safeIds.forEach(approveItem);
  }

  function jumpToSource(item: ReviewItem) {
    const source = item.record.sourceReferences[0];
    if (!source) return;
    const originId = stableId('review-item', activePackage.id, itemId(item));
    setNavigationState({
      sourceReviewItemId: originId,
      priorScrollPosition: window.scrollY,
      packageId: activePackage.id,
      sourceSegmentId: source.segmentIds[0] ?? source.id
    });
    setReturnHighlightId(null);
    if (source.type === 'transcript') {
      setSection('transcript', true);
      setHighlightedSegments(source.segmentIds);
      setHighlightedQuote(source.exactQuote);
      scrollAndFocus(source.segmentIds[0], 'center');
      return;
    }
    setSection('otherSources', true);
    scrollAndFocus(stableId('other-source', activePackage.id, source.id), 'center');
  }

  function returnToReviewItem() {
    if (!navigationState) return;
    if (navigationState.packageId !== activePackage.id) setActivePackageId(navigationState.packageId);
    setReturnHighlightId(navigationState.sourceReviewItemId);
    const targetId = navigationState.sourceReviewItemId;
    window.setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.focus({ preventScroll: true });
      } else {
        window.scrollTo({ top: navigationState.priorScrollPosition, behavior: 'smooth' });
      }
      window.setTimeout(() => setReturnHighlightId(null), 1400);
    }, 80);
  }

  function jumpToReviewItem(id: string) {
    setSection('needsAttention', true);
    const reviewId = stableId('review-item', activePackage.id, id);
    setReturnHighlightId(reviewId);
    scrollAndFocus(reviewId, 'center');
    window.setTimeout(() => setReturnHighlightId(null), 1400);
  }

  function openDocument(document: ReviewDocument) {
    setSection('fullPaperwork', true);
    setOpenDocuments((current) => ({
      ...current,
      [activePackage.id]: Array.from(new Set([...(current[activePackage.id] ?? []), document.id]))
    }));
    scrollAndFocus(stableId('document', activePackage.id, document.id));
  }

  function toggleDocument(documentId: string) {
    setOpenDocuments((current) => {
      const currentIds = current[activePackage.id] ?? [];
      return {
        ...current,
        [activePackage.id]: currentIds.includes(documentId)
          ? currentIds.filter((id) => id !== documentId)
          : [...currentIds, documentId]
      };
    });
  }

  function renderSourceBadges(item: ReviewItem) {
    return (
      <div className="field-source-badges" aria-label="Field sources">
        {item.record.sourceReferences.map((source) => (
          <button type="button" className="source-badge" key={source.id} onClick={() => jumpToSource({ ...item, record: { ...item.record, sourceReferences: [source] } } as ReviewItem)}>
            {sourceTypeLabel(source.type)} · {source.label}
          </button>
        ))}
      </div>
    );
  }

  function renderReviewItem(item: ReviewItem, fullPaperwork = false) {
    const id = itemId(item);
    const runtime = runtimeItems[id];
    const isMissing = runtime.status === 'missing' || !runtime.value.trim();
    const tone = isMissing ? 'missing' : runtime.status === 'conflicting' || runtime.status === 'rejected' ? 'warning' : isResolved(runtime.status) ? 'ready' : 'warning';
    const actionLabel = runtime.dirty || isMissing ? 'Save & Approve' : 'Approve';
    const rowId = fullPaperwork ? stableId('paperwork-item', activePackage.id, id) : stableId('review-item', activePackage.id, id);
    const field = item.kind === 'field' ? item.record : null;
    return (
      <article
        id={rowId}
        tabIndex={-1}
        className={`paperwork-review-row ${tone} ${returnHighlightId === rowId ? 'return-highlight' : ''}`}
        key={`${fullPaperwork ? 'full' : 'review'}-${id}`}
      >
        <div className="paperwork-field-main">
          <strong>{itemLabel(item)}</strong>
          <span>{item.kind === 'field' ? `${item.record.definition.sectionNumber} · ${item.record.mappedFormFieldId}` : `Addendum No. ${item.record.addendumNumber}`}</span>
          {field?.reviewReason && <small>{field.reviewReason}</small>}
        </div>
        <label className="paperwork-value-cell">
          <span className="sr-only">{itemLabel(item)} exact paperwork value</span>
          {item.kind === 'provision'
            ? <textarea value={runtime.value} onChange={(event) => updateItemValue(id, event.target.value)} aria-label={`${itemLabel(item)} exact paragraph`} />
            : <input value={runtime.value} onChange={(event) => updateItemValue(id, event.target.value)} aria-label={`${itemLabel(item)} exact paperwork value`} />}
          {field?.selection?.selectedOption && <small>Selected option: {field.selection.selectedOption}</small>}
          {typeof field?.selection?.checkboxState === 'boolean' && <small>Checkbox: {field.selection.checkboxState ? 'Checked' : 'Unchecked'}</small>}
        </label>
        <span className={`status ${isMissing ? 'danger' : isResolved(runtime.status) ? 'good' : 'warn'}`}>{itemStatusLabel[runtime.status]}</span>
        <span className="confidence-mini">{item.record.confidence === null ? 'No confidence' : `${item.record.confidence}%`}</span>
        {!fullPaperwork && !isResolved(runtime.status) && (
          <button className="btn btn-review-action" type="button" disabled={!runtime.value.trim()} onClick={() => approveItem(id)}>{actionLabel}</button>
        )}
        {!fullPaperwork && <button className="text-button" type="button" onClick={() => jumpToSource(item)}>Source</button>}
        {field?.definition.preferenceEligible && !fullPaperwork && (
          <button className="text-button subtle-action" type="button" onClick={() => { setPreferenceFieldId(field.id); setPreferenceSaved(false); }}>Use this next time</button>
        )}
        <div className="paperwork-meta">
          {renderSourceBadges(item)}
          <span>{item.record.transactionRisk} risk</span>
          <span>{item.record.required ? 'Required' : 'Optional'}</span>
          {runtime.revisions.length > 0 && <span>{runtime.revisions.length} revision{runtime.revisions.length === 1 ? '' : 's'} preserved</span>}
          {runtime.approvals.length > 0 && <span>{runtime.approvals.length} approval event{runtime.approvals.length === 1 ? '' : 's'} preserved</span>}
        </div>
      </article>
    );
  }

  function renderDocument(document: ReviewDocument) {
    const isOpen = (openDocuments[activePackage.id] ?? []).includes(document.id);
    return (
      <article className="paperwork-document" id={stableId('document', activePackage.id, document.id)} tabIndex={-1} key={document.id}>
        <button type="button" className="document-toggle" aria-expanded={isOpen} onClick={() => toggleDocument(document.id)}>
          <span className={`chevron ${isOpen ? 'open' : ''}`} aria-hidden="true">›</span>
          <span><strong>{document.name}</strong><small>{document.documentVersion} · {document.jurisdiction}</small></span>
          <span>{document.sections.reduce((count, section) => count + section.fieldIds.length + (section.addendumProvisionIds?.length ?? 0), 0)} items</span>
        </button>
        {isOpen && document.sections.map((section) => (
          <section className="paperwork-section" id={stableId('section', activePackage.id, document.id, section.id)} key={section.id}>
            <h3>Section {section.sectionNumber}: {section.title}</h3>
            <div className="paperwork-review-list">
              {section.fieldIds.map((id) => fieldsById.get(id)).filter((record): record is GeneratedFormField => Boolean(record)).map((record) => renderReviewItem({ kind: 'field', record }, true))}
              {(section.addendumProvisionIds ?? []).map((id) => provisionsById.get(id)).filter((record): record is AddendumProvision => Boolean(record)).map((record) => renderReviewItem({ kind: 'provision', record }, true))}
            </div>
          </section>
        ))}
      </article>
    );
  }

  const nonTranscriptSources = activeItems.flatMap((item) => item.record.sourceReferences
    .filter((source) => source.type !== 'transcript')
    .map((source) => ({ source, item })));

  return (
    <div className="review-send-page exact-review-page">
      <section className="review-page-section" aria-labelledby="packages-heading">
        <h2 id="packages-heading" className="page-section-title">Packages</h2>
        <div className="package-list">
          {mockReviewPackages.map((pkg) => {
            const packageItems = allPackageItems(pkg);
            const unresolvedCount = packageItems.filter((item) => !isResolved(runtimeItems[itemId(item)].status)).length;
            const status = getPackageStatus(pkg);
            const selected = pkg.id === activePackage.id;
            return (
              <button className={`package-row-card ${selected ? 'active' : ''}`} aria-pressed={selected} type="button" key={pkg.id} onClick={() => selectPackage(pkg.id)}>
                <span><strong>{packageName(pkg)}</strong><small>{pkg.lastUpdated}</small></span>
                <span className={`status ${packageStatusTone[status]}`}>{packageStatusLabel[status]}</span>
                <small>{unresolvedCount} unresolved</small>
                <small>{pkg.documents.length} documents</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className="card exact-review-summary">
        <div>
          <h2>{packageName(activePackage)}</h2>
          <p className="dev-warning">{activePackage.representativeSchemaWarning}</p>
        </div>
        <div className="readiness-facts">
          <span><strong>{activePackage.documents.length}</strong><small>documents</small></span>
          <span><strong>{requiredBlockers.length}</strong><small>required blockers</small></span>
          <span><strong>{unresolvedItems.length}</strong><small>review items</small></span>
          <span><strong className={`status-text ${packageStatusTone[activePackageStatus]}`}>{packageStatusLabel[activePackageStatus]}</strong><small>package status</small></span>
        </div>
        <button className="btn btn-secondary" type="button" onClick={togglePreview}>Preview Paperwork</button>
      </section>

      <section className="card included-documents-card">
        <button className="collapsible-heading" type="button" aria-expanded={currentSections.includedDocuments} onClick={() => setSection('includedDocuments', !currentSections.includedDocuments)}>
          <span className={`chevron ${currentSections.includedDocuments ? 'open' : ''}`} aria-hidden="true">›</span>
          <span>Included Documents</span>
          <small>{activePackage.documents.length}</small>
        </button>
        {currentSections.includedDocuments && (
          <div className="included-document-links">
            {activePackage.documents.map((document) => <button type="button" key={document.id} onClick={() => openDocument(document)}>{document.name}<span>Open document</span></button>)}
          </div>
        )}
      </section>

      <section className={`card paperwork-preview-card ${previewOpen ? '' : 'is-collapsed'}`} id="paperwork-preview">
          <div className="section-heading"><h2>Preview Paperwork</h2><button className="btn btn-quiet" type="button" onClick={closePreview}>Close preview</button></div>
          <div className="preview-legend" aria-label="Preview highlight legend"><span className="edited">Edited</span><span className="generated">Awaiting approval</span><span className="unresolved">Unresolved</span></div>
          <div className="paperwork-preview-docs">
            {activePackage.documents.map((document) => (
              <article className="paperwork-page" key={document.id}>
                <button type="button" className="preview-document-name" onClick={() => openDocument(document)}>{document.name}</button>
                <small>{document.documentVersion} · Not an official completed PDF</small>
                {document.sections.map((section) => (
                  <div className="preview-section" key={section.id}>
                    <strong>Section {section.sectionNumber}: {section.title}</strong>
                    {section.fieldIds.map((id) => fieldsById.get(id)).filter((record): record is GeneratedFormField => Boolean(record)).map((field) => {
                      const runtime = runtimeItems[field.id];
                      const className = !runtime.value.trim() || runtime.status === 'missing' || runtime.status === 'conflicting' ? 'unresolved' : runtime.status === 'edited_and_approved' ? 'edited' : runtime.status === 'needs_approval' ? 'generated' : '';
                      return <button className={`preview-field ${className}`} type="button" key={field.id} onClick={() => jumpToReviewItem(field.id)}><span>{field.definition.officialLabel}</span><b>{runtime.value || '__________'}</b>{field.selection?.checkboxState && <em>☑</em>}</button>;
                    })}
                    {(section.addendumProvisionIds ?? []).map((id) => provisionsById.get(id)).filter((record): record is AddendumProvision => Boolean(record)).map((provision) => {
                      const runtime = runtimeItems[provision.id];
                      const className = !runtime.value.trim() || runtime.status === 'missing' ? 'unresolved' : runtime.status === 'edited_and_approved' ? 'edited' : runtime.status === 'needs_approval' ? 'generated' : '';
                      return <button className={`preview-field ${className}`} type="button" key={provision.id} onClick={() => jumpToReviewItem(provision.id)}><span>{provision.itemNumber}.</span><b>{runtime.value || '__________'}</b></button>;
                    })}
                  </div>
                ))}
              </article>
            ))}
          </div>
      </section>

      <section className="review-page-section" id={`review-${activePackage.id}`} aria-labelledby="review-heading">
        <h2 className="page-section-title" id="review-heading" ref={reviewHeadingRef} tabIndex={-1}>Review</h2>
        <div className="card collapsible-card">
          <button className="collapsible-heading" type="button" aria-expanded={currentSections.needsAttention} onClick={() => setSection('needsAttention', !currentSections.needsAttention)}>
            <span className={`chevron ${currentSections.needsAttention ? 'open' : ''}`} aria-hidden="true">›</span>
            <span>Needs Attention</span>
            <small>{unresolvedItems.length}</small>
          </button>
          {currentSections.needsAttention && (
            <div className="collapsible-content">
              {unresolvedItems.length > 1 && <div className="review-bulk-action"><button className="btn btn-secondary" type="button" onClick={approveAllReady}>Approve all ready items</button></div>}
              {unresolvedItems.length === 0
                ? <div className="review-complete-state">All review items are approved.</div>
                : <div className="paperwork-review-list">{unresolvedItems.map((item) => renderReviewItem(item))}</div>}
            </div>
          )}
        </div>
      </section>

      <section className="review-page-section" aria-labelledby="full-paperwork-heading">
        <h2 className="page-section-title" id="full-paperwork-heading">Full Paperwork</h2>
        <div className="card collapsible-card">
          <button className="collapsible-heading" type="button" aria-expanded={currentSections.fullPaperwork} onClick={() => setSection('fullPaperwork', !currentSections.fullPaperwork)}>
            <span className={`chevron ${currentSections.fullPaperwork ? 'open' : ''}`} aria-hidden="true">›</span>
            <span>Full Paperwork Review</span>
            <small>{activeItems.length} items</small>
          </button>
          {currentSections.fullPaperwork && <div className="collapsible-content">{activePackage.documents.map(renderDocument)}</div>}
        </div>
      </section>

      <section className="card action-stack-card">
        <button className="btn btn-secondary" type="button" onClick={() => setSavedPackages((current) => Array.from(new Set([...current, activePackage.id])))}>Save Draft</button>
        <button className="btn btn-primary btn-large" type="button" disabled={activePackageStatus !== 'ready_to_send'} onClick={() => setSentPackages((current) => Array.from(new Set([...current, activePackage.id])))}>
          {activePackageStatus === 'sent_for_signatures' ? 'Sent for Signatures' : 'Send for Signatures'}
        </button>
        {requiredBlockers.length > 0 && <small>{requiredBlockers.length} unresolved required item{requiredBlockers.length === 1 ? '' : 's'}</small>}
      </section>

      <section className="review-page-section" aria-labelledby="transcript-heading">
        <h2 className="page-section-title" id="transcript-heading">Transcript</h2>
        <div className="card collapsible-card transcript-card">
          <button className="collapsible-heading" type="button" aria-expanded={currentSections.transcript} onClick={() => setSection('transcript', !currentSections.transcript)}>
            <span className={`chevron ${currentSections.transcript ? 'open' : ''}`} aria-hidden="true">›</span>
            <span>Complete Transcript</span>
            <small>{activePackage.transcriptSegments.length} segments</small>
          </button>
          {currentSections.transcript && (
            <div className="collapsible-content transcript-snippets complete-transcript">
              {activePackage.transcriptSegments.map((segment) => (
                <blockquote id={segment.id} tabIndex={-1} className={highlightedSegments.includes(segment.id) ? 'highlighted' : ''} key={segment.id}>
                  <span>{segment.timestamp} · {segment.speaker}</span>
                  {highlightedSegments.includes(segment.id) ? highlightedText(segment.text, highlightedQuote) : segment.text}
                </blockquote>
              ))}
            </div>
          )}
        </div>

        {nonTranscriptSources.length > 0 && (
          <div className="card collapsible-card other-sources-card">
            <button className="collapsible-heading" type="button" aria-expanded={currentSections.otherSources} onClick={() => setSection('otherSources', !currentSections.otherSources)}>
              <span className={`chevron ${currentSections.otherSources ? 'open' : ''}`} aria-hidden="true">›</span>
              <span>Other Sources</span>
              <small>{nonTranscriptSources.length}</small>
            </button>
            {currentSections.otherSources && (
              <div className="collapsible-content other-source-list">
                {nonTranscriptSources.map(({ source, item }) => (
                  <article id={stableId('other-source', activePackage.id, source.id)} tabIndex={-1} key={`${source.id}-${itemId(item)}`}>
                    <span className="status neutral">{sourceTypeLabel(source.type)}</span>
                    <div><strong>{source.label}</strong><small>Supports {itemLabel(item)} · supplied value: {runtimeItems[itemId(item)].value || 'No value'}</small></div>
                    <div><span>{source.retrievalTime ?? 'Date unavailable'}</span><small>{isResolved(runtimeItems[itemId(item)].status) ? 'Approved' : 'Awaiting agent approval'}</small></div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {navigationState && (
        <button type="button" className="back-to-review" onClick={returnToReviewItem}>Back to Review Item</button>
      )}

      {activePreferenceField && (
        <div className="preference-drawer" role="dialog" aria-modal="true" aria-label="Save as preference">
          <div className="card">
            <div className="section-heading"><h2>{activePreferenceField.definition.officialLabel}</h2><button className="btn btn-quiet" type="button" onClick={() => setPreferenceFieldId(null)}>Close</button></div>
            <p>Accord can suggest this value in future applicable transactions. It will not change the AI model.</p>
            <div className="field-grid">
              <label>Value<input value={runtimeItems[activePreferenceField.id].value} readOnly /></label>
              <label>Applies to<select defaultValue="personal"><option value="personal">Personal</option><option value="team">Team</option><option value="brokerage">Brokerage</option></select></label>
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

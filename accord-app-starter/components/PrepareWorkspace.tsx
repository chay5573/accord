'use client';

import { useMemo, useRef, useState } from 'react';
import { UploadedPaperworkReview } from '@/components/UploadedPaperworkReview';
import {
  type AddendumProvision,
  type FieldApproval,
  type FieldRevision,
  type FieldReviewStatus,
  type FieldSelection,
  type FieldSourceReference,
  type GeneratedFormField,
  type PackageStatus,
  type ReviewDocument,
  type ReviewNavigationState,
  type ReviewOriginSurface,
  type ReviewPackage,
  mockReviewPackages
} from '@/lib/reviewPackages';

type ReviewSection = 'needsAttention' | 'allFields' | 'paperwork' | 'transcript' | 'otherSources';

interface RuntimeReviewItem {
  value: string;
  originalValue: string;
  selection?: FieldSelection;
  originalSelection?: FieldSelection;
  persistedStatus: FieldReviewStatus;
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

function itemLabel(item: ReviewItem) {
  return item.kind === 'field'
    ? item.record.definition.officialLabel
    : `${item.record.documentTitle} · Item ${item.record.itemNumber}`;
}

function isResolved(status: FieldReviewStatus) {
  return status === 'approved' || status === 'edited_and_approved';
}

function needsAttention(runtime: RuntimeReviewItem) {
  return runtime.dirty || !isResolved(runtime.persistedStatus);
}

function isRequiredBlocker(item: ReviewItem, runtime: RuntimeReviewItem) {
  return item.record.required && needsAttention(runtime);
}

function reviewRank(item: ReviewItem, runtime: RuntimeReviewItem) {
  const status = runtime.persistedStatus;
  if (status === 'missing' && item.record.required) return 0;
  if (status === 'conflicting') return 1;
  if (item.record.material && status === 'needs_approval' && (item.record.confidence ?? 0) < 85) return 2;
  if (item.record.sourceReferences.some((source) => source.type === 'office_default' || source.type === 'prior_preference')) return 3;
  if (!item.record.material && status === 'needs_approval' && (item.record.confidence ?? 100) < 85) return 4;
  if (status === 'optional_review') return 5;
  return item.record.material ? 2 : 4;
}

function stableId(...parts: Array<string | number>) {
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

function cloneSelection(selection?: FieldSelection) {
  return selection ? { ...selection } : undefined;
}

function selectionEqual(a?: FieldSelection, b?: FieldSelection) {
  return JSON.stringify(a ?? {}) === JSON.stringify(b ?? {});
}

function runtimeSnapshot(runtime: RuntimeReviewItem, original = false) {
  const value = original ? runtime.originalValue : runtime.value;
  const selection = original ? runtime.originalSelection : runtime.selection;
  const selectionText = selection?.selectedOption
    ?? (typeof selection?.checkboxState === 'boolean' ? (selection.checkboxState ? 'Checked' : 'Unchecked') : selection?.yesNoValue);
  return selectionText ? `${value} [${selectionText}]` : value;
}

function highlightedText(text: string, exactQuote: string) {
  const index = text.toLocaleLowerCase().indexOf(exactQuote.toLocaleLowerCase());
  if (!exactQuote || index < 0) return text;
  return <>{text.slice(0, index)}<mark>{text.slice(index, index + exactQuote.length)}</mark>{text.slice(index + exactQuote.length)}</>;
}

export function PrepareWorkspace() {
  const [activePackageId, setActivePackageId] = useState(mockReviewPackages[0].id);
  const [runtimeItems, setRuntimeItems] = useState<Record<string, RuntimeReviewItem>>(() =>
    Object.fromEntries(mockReviewPackages.flatMap((pkg) => allPackageItems(pkg).map((item) => {
      const value = item.kind === 'field' ? item.record.exactGeneratedValue : item.record.exactParagraphText;
      const selection = item.kind === 'field' ? cloneSelection(item.record.selection) : undefined;
      return [itemId(item), {
        value,
        originalValue: value,
        selection,
        originalSelection: cloneSelection(selection),
        persistedStatus: item.record.reviewStatus,
        dirty: false,
        approvals: [],
        revisions: []
      } satisfies RuntimeReviewItem];
    })))
  );
  const [sectionState, setSectionState] = useState<Record<string, Record<ReviewSection, boolean>>>(() =>
    Object.fromEntries(mockReviewPackages.map((pkg) => {
      const hasAttention = allPackageItems(pkg).some((item) => !isResolved(item.record.reviewStatus));
      return [pkg.id, { needsAttention: hasAttention, allFields: false, paperwork: !hasAttention, transcript: false, otherSources: false }];
    }))
  );
  const [openFieldDocuments, setOpenFieldDocuments] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(mockReviewPackages.map((pkg) => [pkg.id, [pkg.documents[0]?.id].filter(Boolean)]))
  );
  const [activePaperworkDocuments, setActivePaperworkDocuments] = useState<Record<string, string>>(() =>
    Object.fromEntries(mockReviewPackages.map((pkg) => [pkg.id, pkg.documents[0]?.id ?? '']))
  );
  const [paperworkPages, setPaperworkPages] = useState<Record<string, number>>(() =>
    Object.fromEntries(mockReviewPackages.flatMap((pkg) => pkg.documents.map((document) => [document.id, 1])))
  );
  const [savedPackages, setSavedPackages] = useState<string[]>([]);
  const [sentPackages, setSentPackages] = useState<string[]>([]);
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
  const activePaperworkDocument = activePackage.documents.find((document) => document.id === activePaperworkDocuments[activePackage.id]) ?? activePackage.documents[0];
  const activePaperworkPage = paperworkPages[activePaperworkDocument.id] ?? 1;

  const attentionItems = activeItems
    .filter((item) => needsAttention(runtimeItems[itemId(item)]))
    .sort((a, b) => {
      const rankDifference = reviewRank(a, runtimeItems[itemId(a)]) - reviewRank(b, runtimeItems[itemId(b)]);
      if (rankDifference) return rankDifference;
      const riskDifference = riskOrder[a.record.transactionRisk] - riskOrder[b.record.transactionRisk];
      if (riskDifference) return riskDifference;
      const documentDifference = documentOrder(activePackage, a) - documentOrder(activePackage, b);
      if (documentDifference) return documentDifference;
      const fieldDifference = fieldOrder(activePackage, a) - fieldOrder(activePackage, b);
      if (fieldDifference) return fieldDifference;
      return (a.record.confidence ?? -1) - (b.record.confidence ?? -1);
    });

  const requiredBlockers = activeItems.filter((item) => isRequiredBlocker(item, runtimeItems[itemId(item)]));

  function getPackageStatus(pkg: ReviewPackage): PackageStatus {
    if (sentPackages.includes(pkg.id)) return 'sent_for_signatures';
    const items = allPackageItems(pkg);
    const hasRequiredBlocker = items.some((item) => isRequiredBlocker(item, runtimeItems[itemId(item)]));
    const hasAttention = items.some((item) => needsAttention(runtimeItems[itemId(item)]));
    if (savedPackages.includes(pkg.id) && (hasRequiredBlocker || hasAttention)) return 'draft_saved';
    if (hasRequiredBlocker) return 'needs_attention';
    if (hasAttention) return 'ready_to_approve';
    return 'ready_to_send';
  }

  const activePackageStatus = getPackageStatus(activePackage);

  function setSection(section: ReviewSection, open: boolean, packageId = activePackage.id) {
    setSectionState((current) => ({ ...current, [packageId]: { ...current[packageId], [section]: open } }));
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
    setHighlightedSegments([]);
    setHighlightedQuote('');
    setNavigationState(null);
    setSection('needsAttention', true, packageId);
    window.history.replaceState(null, '', `#review-${packageId}`);
    window.setTimeout(() => {
      reviewHeadingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      reviewHeadingRef.current?.focus({ preventScroll: true });
    }, 80);
  }

  function updateItemValue(id: string, value: string) {
    setRuntimeItems((current) => {
      const item = current[id];
      return { ...current, [id]: { ...item, value, dirty: value !== item.originalValue || !selectionEqual(item.selection, item.originalSelection) } };
    });
  }

  function updateItemSelection(id: string, selection: FieldSelection, displayValue?: string) {
    setRuntimeItems((current) => {
      const item = current[id];
      const value = displayValue ?? item.value;
      return { ...current, [id]: { ...item, value, selection, dirty: value !== item.originalValue || !selectionEqual(selection, item.originalSelection) } };
    });
  }

  function approveItem(id: string) {
    setRuntimeItems((current) => {
      const item = current[id];
      if (!item.value.trim()) return current;
      const edited = item.dirty || !item.originalValue.trim();
      const recordedAt = new Date().toISOString();
      const previousSnapshot = runtimeSnapshot(item, true);
      const revisedSnapshot = runtimeSnapshot(item);
      const revisions = edited && previousSnapshot !== revisedSnapshot
        ? [...item.revisions, { id: `revision-${id}-${item.revisions.length + 1}`, itemId: id, previousValue: previousSnapshot, revisedValue: revisedSnapshot, actor: 'Calvin Hayward', revisedAt: recordedAt }]
        : item.revisions;
      const action = edited ? 'edited_and_approved' : 'approved';
      return {
        ...current,
        [id]: {
          ...item,
          originalValue: item.value,
          originalSelection: cloneSelection(item.selection),
          persistedStatus: action,
          dirty: false,
          revisions,
          approvals: [...item.approvals, { id: `approval-${id}-${item.approvals.length + 1}`, itemId: id, action, actor: 'Calvin Hayward', recordedAt, valueSnapshot: revisedSnapshot }]
        }
      };
    });
  }

  function approveAllReady() {
    attentionItems
      .filter((item) => {
        const runtime = runtimeItems[itemId(item)];
        return runtime.value.trim() && runtime.persistedStatus !== 'conflicting' && runtime.persistedStatus !== 'rejected';
      })
      .map(itemId)
      .forEach(approveItem);
  }

  function jumpToSource(
    item: ReviewItem,
    originId: string,
    originSurface: ReviewOriginSurface,
    source = item.record.sourceReferences[0],
    documentId?: string,
    pageNumber?: number
  ) {
    if (!source) return;
    setNavigationState({
      sourceReviewItemId: originId,
      priorScrollPosition: window.scrollY,
      packageId: activePackage.id,
      sourceSegmentId: source.segmentIds[0] ?? source.id,
      originSurface,
      originDocumentId: documentId,
      originPageNumber: pageNumber
    });
    setReturnHighlightId(null);
    setSection('transcript', true);
    if (source.type === 'transcript') {
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
    const { packageId, originSurface, originDocumentId, originPageNumber, sourceReviewItemId, priorScrollPosition } = navigationState;
    if (packageId !== activePackage.id) setActivePackageId(packageId);
    if (originSurface === 'needs_attention') setSection('needsAttention', true, packageId);
    if (originSurface === 'all_fields') {
      setSection('allFields', true, packageId);
      if (originDocumentId) setOpenFieldDocuments((current) => ({ ...current, [packageId]: Array.from(new Set([...(current[packageId] ?? []), originDocumentId])) }));
    }
    if (originSurface === 'paperwork') {
      setSection('paperwork', true, packageId);
      if (originDocumentId) setActivePaperworkDocuments((current) => ({ ...current, [packageId]: originDocumentId }));
      if (originDocumentId && originPageNumber) setPaperworkPages((current) => ({ ...current, [originDocumentId]: originPageNumber }));
    }
    setReturnHighlightId(sourceReviewItemId);
    window.setTimeout(() => {
      const target = document.getElementById(sourceReviewItemId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.focus({ preventScroll: true });
      } else {
        window.scrollTo({ top: priorScrollPosition, behavior: 'smooth' });
      }
      window.setTimeout(() => setReturnHighlightId(null), 1400);
    }, 100);
  }

  function toggleFieldDocument(documentId: string) {
    setOpenFieldDocuments((current) => {
      const currentIds = current[activePackage.id] ?? [];
      return { ...current, [activePackage.id]: currentIds.includes(documentId) ? currentIds.filter((id) => id !== documentId) : [...currentIds, documentId] };
    });
  }

  function openPaperworkDocument(document: ReviewDocument) {
    setSection('paperwork', true);
    setActivePaperworkDocuments((current) => ({ ...current, [activePackage.id]: document.id }));
    setPaperworkPages((current) => ({ ...current, [document.id]: current[document.id] ?? 1 }));
    scrollAndFocus(stableId('paperwork-viewer', activePackage.id, document.id));
  }

  function renderEditor(item: ReviewItem, runtime: RuntimeReviewItem, className = '') {
    if (item.kind === 'provision') {
      return <textarea className={className} value={runtime.value} onChange={(event) => updateItemValue(item.record.id, event.target.value)} aria-label={`${itemLabel(item)} exact paragraph`} />;
    }
    const field = item.record;
    if (field.definition.inputType === 'checkbox') {
      return (
        <label className={`inline-checkbox-editor ${className}`}>
          <input type="checkbox" checked={runtime.selection?.checkboxState ?? false} onChange={(event) => updateItemSelection(field.id, { ...runtime.selection, checkboxState: event.target.checked })} />
          <span>{runtime.value}</span>
        </label>
      );
    }
    if (field.definition.options && runtime.selection?.selectedOption) {
      return (
        <select className={className} value={runtime.selection.selectedOption} onChange={(event) => updateItemSelection(field.id, { ...runtime.selection, selectedOption: event.target.value }, event.target.value)} aria-label={`${itemLabel(item)} exact selection`}>
          {field.definition.options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      );
    }
    return <input className={className} value={runtime.value} onChange={(event) => updateItemValue(field.id, event.target.value)} aria-label={`${itemLabel(item)} exact paperwork value`} />;
  }

  function renderSourceBadges(item: ReviewItem, originId: string, originSurface: ReviewOriginSurface, documentId?: string, pageNumber?: number) {
    return (
      <div className="field-source-badges" aria-label="Field sources">
        {item.record.sourceReferences.map((source) => (
          <button type="button" className="source-badge" key={source.id} onClick={() => jumpToSource(item, originId, originSurface, source, documentId, pageNumber)}>
            {sourceTypeLabel(source.type)} · {source.label}
          </button>
        ))}
      </div>
    );
  }

  function renderReviewItem(item: ReviewItem, surface: 'attention' | 'allFields') {
    const id = itemId(item);
    const runtime = runtimeItems[id];
    const unresolved = needsAttention(runtime);
    const missing = runtime.persistedStatus === 'missing';
    const tone = missing ? 'missing' : unresolved ? 'warning' : 'ready';
    const rowId = stableId(surface === 'attention' ? 'review-item' : 'all-field-item', activePackage.id, id);
    const originSurface: ReviewOriginSurface = surface === 'attention' ? 'needs_attention' : 'all_fields';
    const field = item.kind === 'field' ? item.record : null;
    return (
      <article id={rowId} tabIndex={-1} className={`paperwork-review-row ${tone} ${returnHighlightId === rowId ? 'return-highlight' : ''}`} key={`${surface}-${id}`}>
        <div className="paperwork-field-main">
          <strong>{itemLabel(item)}</strong>
          <span>{item.kind === 'field' ? `${item.record.definition.sectionNumber} · ${item.record.mappedFormFieldId}` : `Addendum No. ${item.record.addendumNumber}`}</span>
          {field?.reviewReason && <small>{field.reviewReason}</small>}
        </div>
        <div className="paperwork-value-cell">{renderEditor(item, runtime)}</div>
        <div className="paperwork-review-controls">
          <span className={`status ${missing ? 'danger' : unresolved ? 'warn' : 'good'}`}>{runtime.dirty ? 'Edited · approval required' : itemStatusLabel[runtime.persistedStatus]}</span>
          <span className="confidence-mini" aria-label={`Confidence ${item.record.confidence ?? 0} percent`}>{item.record.confidence === null ? '0%' : `${item.record.confidence}%`}</span>
          {unresolved && <button className="btn btn-review-action" type="button" disabled={!runtime.value.trim()} onClick={() => approveItem(id)}>{runtime.dirty || missing ? 'Save & Approve' : 'Approve'}</button>}
          <button className="text-button" type="button" onClick={() => jumpToSource(item, rowId, originSurface)}>Source</button>
        </div>
        {field?.definition.preferenceEligible && (
          <button className="text-button subtle-action" type="button" onClick={() => { setPreferenceFieldId(field.id); setPreferenceSaved(false); }}>Use this next time</button>
        )}
        <div className="paperwork-meta">
          {renderSourceBadges(item, rowId, originSurface)}
          <span>{item.record.required ? 'Required' : 'Optional'}</span>
          {runtime.revisions.length > 0 && <span>{runtime.revisions.length} revision{runtime.revisions.length === 1 ? '' : 's'} preserved</span>}
          {runtime.approvals.length > 0 && <span>{runtime.approvals.length} approval event{runtime.approvals.length === 1 ? '' : 's'} preserved</span>}
        </div>
      </article>
    );
  }

  function renderAllFieldsDocument(document: ReviewDocument) {
    const open = (openFieldDocuments[activePackage.id] ?? []).includes(document.id);
    return (
      <article className="paperwork-document" key={document.id}>
        <button type="button" className="document-toggle" aria-expanded={open} onClick={() => toggleFieldDocument(document.id)}>
          <span className={`chevron ${open ? 'open' : ''}`} aria-hidden="true">›</span>
          <span><strong>{document.name}</strong><small>{document.documentVersion} · {document.jurisdiction}</small></span>
          <span>{document.sections.reduce((count, section) => count + section.fieldIds.length + (section.addendumProvisionIds?.length ?? 0), 0)} items</span>
        </button>
        {open && document.sections.map((section) => (
          <section className="paperwork-section" id={stableId('all-fields-section', activePackage.id, document.id, section.id)} key={section.id}>
            <h3>Section {section.sectionNumber}: {section.title}</h3>
            <div className="paperwork-review-list">
              {section.fieldIds.map((id) => fieldsById.get(id)).filter((record): record is GeneratedFormField => Boolean(record)).map((record) => renderReviewItem({ kind: 'field', record }, 'allFields'))}
              {(section.addendumProvisionIds ?? []).map((id) => provisionsById.get(id)).filter((record): record is AddendumProvision => Boolean(record)).map((record) => renderReviewItem({ kind: 'provision', record }, 'allFields'))}
            </div>
          </section>
        ))}
      </article>
    );
  }

  function renderPaperworkField(item: ReviewItem, document: ReviewDocument, pageNumber: number) {
    const id = itemId(item);
    const runtime = runtimeItems[id];
    const missing = item.record.required && (runtime.persistedStatus === 'missing' || !runtime.value.trim());
    const approval = !missing && (!isResolved(runtime.persistedStatus) || runtime.dirty);
    const edited = !missing && !approval && runtime.persistedStatus === 'edited_and_approved';
    const fieldId = stableId('paperwork-field', activePackage.id, document.id, pageNumber, id);
    return (
      <div id={fieldId} tabIndex={-1} className={`document-field ${missing ? 'unresolved' : approval ? 'approval' : edited ? 'edited' : ''} ${returnHighlightId === fieldId ? 'return-highlight' : ''}`} key={id}>
        <div className="document-field-heading"><span>{itemLabel(item)}</span><small>{runtime.dirty ? 'Edited · approval required' : itemStatusLabel[runtime.persistedStatus]}</small></div>
        {renderEditor(item, runtime, 'document-inline-editor')}
        <div className="document-field-actions">
          {(runtime.dirty || !isResolved(runtime.persistedStatus)) && <button type="button" onClick={() => approveItem(id)} disabled={!runtime.value.trim()}>{runtime.dirty || missing ? 'Save & Approve' : 'Approve'}</button>}
          <button type="button" onClick={() => jumpToSource(item, fieldId, 'paperwork', item.record.sourceReferences[0], document.id, pageNumber)}>Source</button>
        </div>
      </div>
    );
  }

  const nonTranscriptSources = activeItems.flatMap((item) => item.record.sourceReferences.filter((source) => source.type !== 'transcript').map((source) => ({ source, item })));
  const addendumNumbers = Array.from(new Set(activePackage.addendumProvisions.map((provision) => provision.addendumNumber))).sort((a, b) => a - b);
  const readinessLabel = activePackageStatus === 'needs_attention' || activePackageStatus === 'draft_saved'
    ? 'Not ready to send'
    : packageStatusLabel[activePackageStatus];

  return (
    <div className="review-send-page exact-review-page">
      <section className="review-page-section" aria-labelledby="packages-heading">
        <h2 id="packages-heading" className="page-section-title">Packages</h2>
        <div className="package-list">
          {mockReviewPackages.map((pkg) => {
            const count = allPackageItems(pkg).filter((item) => needsAttention(runtimeItems[itemId(item)])).length;
            const status = getPackageStatus(pkg);
            const selected = pkg.id === activePackage.id;
            return (
              <button className={`package-row-card ${selected ? 'active' : ''}`} aria-pressed={selected} type="button" key={pkg.id} onClick={() => selectPackage(pkg.id)}>
                <span><strong>{packageName(pkg)}</strong><small>{pkg.lastUpdated}</small></span>
                <span className={`status ${packageStatusTone[status]}`}>{packageStatusLabel[status]}</span>
                <small>{count} unresolved</small>
                <small>{pkg.documents.length} documents</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className="card exact-review-summary">
        <h2>{packageName(activePackage)}</h2>
        <div className="package-summary-meta" aria-label="Package summary">
          <span>{activePackage.documents.length} documents</span>
          <span>{attentionItems.length} need attention</span>
          <span className={packageStatusTone[activePackageStatus]}>{readinessLabel}</span>
          <span>{activePackage.lastUpdated}</span>
          {addendumNumbers.length > 0 && <span>Addendum {addendumNumbers.map((number) => `#${number}`).join(', ')}</span>}
        </div>
        {process.env.NODE_ENV !== 'production' && (
          <details className="dev-only-notice">
            <summary>Development schema note</summary>
            <p>{activePackage.representativeSchemaWarning}</p>
          </details>
        )}
      </section>

      <UploadedPaperworkReview />

      <section className="review-page-section" id={`review-${activePackage.id}`} aria-labelledby="review-heading">
        <h2 className="page-section-title" id="review-heading" ref={reviewHeadingRef} tabIndex={-1}>Review</h2>

        <div className="card collapsible-card">
          <button className="collapsible-heading" type="button" aria-expanded={currentSections.needsAttention} onClick={() => setSection('needsAttention', !currentSections.needsAttention)}>
            <span className={`chevron ${currentSections.needsAttention ? 'open' : ''}`} aria-hidden="true">›</span><span>Needs Attention</span><small>{attentionItems.length}</small>
          </button>
          {currentSections.needsAttention && (
            <div className="collapsible-content">
              {attentionItems.length > 1 && <div className="review-bulk-action"><button className="btn btn-secondary" type="button" onClick={approveAllReady}>Approve all ready items</button></div>}
              {attentionItems.length === 0 ? <div className="review-complete-state">All review items are approved.</div> : <div className="paperwork-review-list">{attentionItems.map((item) => renderReviewItem(item, 'attention'))}</div>}
            </div>
          )}
        </div>

        <div className="card collapsible-card">
          <button className="collapsible-heading" type="button" aria-expanded={currentSections.allFields} onClick={() => setSection('allFields', !currentSections.allFields)}>
            <span className={`chevron ${currentSections.allFields ? 'open' : ''}`} aria-hidden="true">›</span><span>All Fields Review</span><small>{activeItems.length} fields</small>
          </button>
          {currentSections.allFields && <div className="collapsible-content">{activePackage.documents.map(renderAllFieldsDocument)}</div>}
        </div>

        <div className="card collapsible-card">
          <button className="collapsible-heading" type="button" aria-expanded={currentSections.paperwork} onClick={() => setSection('paperwork', !currentSections.paperwork)}>
            <span className={`chevron ${currentSections.paperwork ? 'open' : ''}`} aria-hidden="true">›</span><span>Paperwork</span><small>{activePackage.documents.length} documents</small>
          </button>
          {currentSections.paperwork && (
            <div className="collapsible-content paperwork-workspace">
              <nav className="paperwork-document-nav" aria-label="Package documents">
                {activePackage.documents.map((document) => <button type="button" className={document.id === activePaperworkDocument.id ? 'active' : ''} aria-current={document.id === activePaperworkDocument.id ? 'page' : undefined} key={document.id} onClick={() => openPaperworkDocument(document)}><strong>{document.name}</strong><small>{document.pageCount} page{document.pageCount === 1 ? '' : 's'}</small></button>)}
              </nav>
              <div className="paperwork-viewer" id={stableId('paperwork-viewer', activePackage.id, activePaperworkDocument.id)} tabIndex={-1}>
                <div className="paperwork-viewer-toolbar">
                  <div><strong>{activePaperworkDocument.name}</strong><small>{activePaperworkDocument.documentVersion} · Mock document view</small></div>
                  <div className="page-controls">
                    <button type="button" disabled={activePaperworkPage <= 1} onClick={() => setPaperworkPages((current) => ({ ...current, [activePaperworkDocument.id]: Math.max(1, activePaperworkPage - 1) }))}>Previous</button>
                    <span>Page {activePaperworkPage} of {activePaperworkDocument.pageCount}</span>
                    <button type="button" disabled={activePaperworkPage >= activePaperworkDocument.pageCount} onClick={() => setPaperworkPages((current) => ({ ...current, [activePaperworkDocument.id]: Math.min(activePaperworkDocument.pageCount, activePaperworkPage + 1) }))}>Next</button>
                  </div>
                </div>
                <div className="paperwork-legend" aria-label="Paperwork highlight legend"><span className="missing">Missing</span><span className="approval">Needs approval</span><span className="edited">User edited</span></div>
                <article className="paperwork-rendered-page" id={stableId('document-page', activePackage.id, activePaperworkDocument.id, activePaperworkPage)}>
                  <header><span>Accord representative form view</span><h3>{activePaperworkDocument.name}</h3><small>Page {activePaperworkPage}</small></header>
                  {activePaperworkDocument.sections.filter((section) => section.pageNumber === activePaperworkPage).map((section) => (
                    <section className="rendered-form-section" key={section.id}>
                      <h4>Section {section.sectionNumber} · {section.title}</h4>
                      {section.fieldIds.map((id) => fieldsById.get(id)).filter((record): record is GeneratedFormField => Boolean(record)).map((record) => renderPaperworkField({ kind: 'field', record }, activePaperworkDocument, activePaperworkPage))}
                      {(section.addendumProvisionIds ?? []).map((id) => provisionsById.get(id)).filter((record): record is AddendumProvision => Boolean(record)).map((record) => renderPaperworkField({ kind: 'provision', record }, activePaperworkDocument, activePaperworkPage))}
                    </section>
                  ))}
                </article>
              </div>
            </div>
          )}
        </div>

        <div className="card collapsible-card transcript-card">
          <button className="collapsible-heading" type="button" aria-expanded={currentSections.transcript} onClick={() => setSection('transcript', !currentSections.transcript)}>
            <span className={`chevron ${currentSections.transcript ? 'open' : ''}`} aria-hidden="true">›</span><span>Transcript</span><small>{activePackage.transcriptSegments.length} segments</small>
          </button>
          {currentSections.transcript && (
            <div className="collapsible-content transcript-snippets complete-transcript">
              {activePackage.transcriptSegments.map((segment) => (
                <blockquote id={segment.id} tabIndex={-1} className={highlightedSegments.includes(segment.id) ? 'highlighted' : ''} key={segment.id}>
                  <span>{segment.timestamp} · {segment.speaker}</span>{highlightedSegments.includes(segment.id) ? highlightedText(segment.text, highlightedQuote) : segment.text}
                </blockquote>
              ))}
            </div>
          )}
          {nonTranscriptSources.length > 0 && currentSections.transcript && (
            <div className="other-sources-inline">
              <button className="collapsible-heading" type="button" aria-expanded={currentSections.otherSources} onClick={() => setSection('otherSources', !currentSections.otherSources)}>
                <span className={`chevron ${currentSections.otherSources ? 'open' : ''}`} aria-hidden="true">›</span><span>Other Sources</span><small>{nonTranscriptSources.length}</small>
              </button>
              {currentSections.otherSources && <div className="collapsible-content other-source-list">{nonTranscriptSources.map(({ source, item }) => <article id={stableId('other-source', activePackage.id, source.id)} tabIndex={-1} key={`${source.id}-${itemId(item)}`}><span className="status neutral">{sourceTypeLabel(source.type)}</span><div><strong>{source.label}</strong><small>Supports {itemLabel(item)} · supplied value: {runtimeItems[itemId(item)].value || 'No value'}</small></div><div><span>{source.retrievalTime ?? 'Date unavailable'}</span><small>{needsAttention(runtimeItems[itemId(item)]) ? 'Awaiting agent approval' : 'Approved'}</small></div></article>)}</div>}
            </div>
          )}
        </div>

        <section className="card action-stack-card" aria-label="Package actions">
          <button className="btn btn-secondary" type="button" onClick={() => setSavedPackages((current) => Array.from(new Set([...current, activePackage.id])))}>Save Draft</button>
          <button className="btn btn-primary btn-large" type="button" disabled={activePackageStatus !== 'ready_to_send'} onClick={() => setSentPackages((current) => Array.from(new Set([...current, activePackage.id])))}>{activePackageStatus === 'sent_for_signatures' ? 'Sent for Signatures' : 'Send for Signatures'}</button>
          {requiredBlockers.length > 0 && <small>{requiredBlockers.length} unresolved required item{requiredBlockers.length === 1 ? '' : 's'}</small>}
          {activePackageStatus === 'sent_for_signatures' && <small className="mock-coordinate-note">Coordinate transaction attached · mock</small>}
        </section>
      </section>

      {navigationState && <button type="button" className="back-to-review" onClick={returnToReviewItem}>Back to Review Item</button>}

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

function documentOrder(pkg: ReviewPackage, item: ReviewItem) {
  const documentId = item.kind === 'field' ? item.record.documentId : pkg.documents.find((document) => document.name === item.record.documentTitle)?.id;
  return pkg.documents.find((document) => document.id === documentId)?.order ?? 99;
}

function fieldOrder(pkg: ReviewPackage, item: ReviewItem) {
  if (item.kind === 'provision') return item.record.itemNumber;
  const document = pkg.documents.find((candidate) => candidate.id === item.record.documentId);
  const sectionIndex = document?.sections.findIndex((section) => section.id === item.record.sectionId) ?? 99;
  return sectionIndex * 100 + item.record.definition.itemSequence;
}

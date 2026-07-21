export type ReviewPackageType =
  | 'Offer'
  | 'Counteroffer'
  | 'Buyer Paperwork'
  | 'Listing Paperwork'
  | 'Addendum Package'
  | 'Inspection Response'
  | 'Closing Documents';

export type FieldInputType =
  | 'text'
  | 'date'
  | 'money'
  | 'name'
  | 'address'
  | 'legal_description'
  | 'initials'
  | 'radio'
  | 'checkbox'
  | 'yes_no'
  | 'selection'
  | 'deadline'
  | 'brokerage_field'
  | 'signature_assignment'
  | 'addendum_reference'
  | 'addendum_paragraph'
  | 'disclosure_acknowledgement'
  | 'form_option';

export type PackageStatus =
  | 'needs_attention'
  | 'ready_to_approve'
  | 'ready_to_send'
  | 'draft_saved'
  | 'sent_for_signatures';

export type FieldReviewStatus =
  | 'missing'
  | 'conflicting'
  | 'needs_approval'
  | 'approved'
  | 'edited_and_approved'
  | 'rejected'
  | 'optional_review';

export type ApprovalState = 'not_reviewed' | 'approved' | 'edited_and_approved' | 'rejected';
export type TransactionRisk = 'critical' | 'high' | 'medium' | 'low';
export type SourceType = 'transcript' | 'office_default' | 'prior_preference' | 'mls' | 'county_record' | 'email' | 'document_upload';
export type ReviewOriginSurface = 'needs_attention' | 'all_fields' | 'paperwork';

export interface FieldSourceReference {
  id: string;
  type: SourceType;
  label: string;
  segmentIds: string[];
  exactQuote: string;
  retrievalTime?: string;
}

export interface FieldApproval {
  id: string;
  itemId: string;
  action: 'approved' | 'edited_and_approved' | 'rejected';
  actor: string;
  recordedAt: string;
  valueSnapshot: string;
}

export interface FieldRevision {
  id: string;
  itemId: string;
  previousValue: string;
  revisedValue: string;
  actor: string;
  revisedAt: string;
}

export interface ReviewNavigationState {
  sourceReviewItemId: string;
  priorScrollPosition: number;
  packageId: string;
  sourceSegmentId: string;
  originSurface: ReviewOriginSurface;
  originDocumentId?: string;
  originPageNumber?: number;
}

export interface FieldSelection {
  selectedOption?: string;
  checkboxState?: boolean;
  yesNoValue?: 'yes' | 'no';
}

export interface FormFieldDefinition {
  id: string;
  officialLabel: string;
  sectionNumber: string;
  itemSequence: number;
  inputType: FieldInputType;
  options?: string[];
  preferenceEligible?: boolean;
}

export interface GeneratedFormField {
  id: string;
  documentId: string;
  sectionId: string;
  definition: FormFieldDefinition;
  exactGeneratedValue: string;
  selection?: FieldSelection;
  confidence: number | null;
  reviewStatus: FieldReviewStatus;
  reviewReason?: string;
  mappedFormFieldId: string;
  documentVersion: string;
  jurisdiction: 'UT';
  approvalState: ApprovalState;
  required: boolean;
  transactionRisk: TransactionRisk;
  material: boolean;
  sourceReferences: FieldSourceReference[];
}

export interface AddendumProvision {
  id: string;
  addendumNumber: number;
  documentTitle: string;
  itemNumber: number;
  exactParagraphText: string;
  sourceReferences: FieldSourceReference[];
  approvalState: ApprovalState;
  reviewStatus: FieldReviewStatus;
  required: boolean;
  confidence: number | null;
  transactionRisk: TransactionRisk;
  material: boolean;
}

export interface FormSection {
  id: string;
  sectionNumber: string;
  title: string;
  pageNumber: number;
  fieldIds: string[];
  addendumProvisionIds?: string[];
}

export interface ReviewDocument {
  id: string;
  name: string;
  documentVersion: string;
  jurisdiction: 'UT';
  formSchemaId: string;
  order: number;
  pageCount: number;
  sections: FormSection[];
}

export interface TranscriptSegment {
  id: string;
  timestamp: string;
  speaker: string;
  text: string;
}

export interface PackageReadiness {
  readinessForSignature: 'not_ready' | 'needs_review' | 'ready';
  percent: number;
}

export interface ReviewPackage {
  id: string;
  clientFullLegalNames: string;
  propertyAddress: string;
  packageType: ReviewPackageType;
  initialStatus: PackageStatus;
  lastUpdated: string;
  documents: ReviewDocument[];
  fields: GeneratedFormField[];
  addendumProvisions: AddendumProvision[];
  transcriptSegments: TranscriptSegment[];
  sourceDetails: FieldSourceReference[];
  readiness: PackageReadiness;
  representativeSchemaWarning: string;
}

const welkerSources = {
  buyers: transcriptSource('src-buyers', '00:01:10', ['t-003'], 'Brenton and Emily Welker'),
  property: transcriptSource('src-property', '00:01:42', ['t-004'], '2948 East Alderann Street in St. George'),
  representation: transcriptSource('src-representation', '00:02:33', ['t-006'], 'Red Rock Group represents both of you as buyers'),
  price: transcriptSource('src-price', '00:03:12', ['t-008'], 'purchase price of eight hundred seventy-five thousand dollars'),
  earnest: transcriptSource('src-earnest', '00:04:06', ['t-010'], 'seven thousand five hundred dollars in earnest money'),
  financing: transcriptSource('src-financing', '00:05:02', ['t-012'], 'conventional financing with twenty percent down'),
  dueDiligence: transcriptSource('src-due-diligence', '00:06:24', ['t-015'], 'ten calendar days after acceptance for due diligence'),
  settlement: transcriptSource('src-settlement', '00:08:11', ['t-019'], 'August fifteenth for settlement'),
  possession: transcriptSource('src-possession', '00:09:04', ['t-021'], 'possession at recording'),
  personalProperty: transcriptSource('src-personal-property', '00:10:22', ['t-023'], 'refrigerator, washer, and dryer'),
  closingCosts: transcriptSource('src-closing-costs', '00:11:48', ['t-026'], 'seller to pay up to five thousand dollars toward closing costs'),
  title: transcriptSource('src-title', '00:13:14', ['t-029'], 'Red Rock Title'),
  addendumOne: transcriptSource('src-addendum-one', '00:14:37', ['t-032'], 'Seller agrees to leave the refrigerator, washer, and dryer at no additional cost to Buyer.'),
  addendumTwo: transcriptSource('src-addendum-two', '00:15:19', ['t-034'], 'Settlement Deadline shall be August 15, 2026.'),
  legalDescription: transcriptSource('src-legal-description', '00:16:03', ['t-035'], 'leave the legal description blank until we have an authoritative source'),
  holderDefault: { id: 'src-holder-default', type: 'office_default' as const, label: 'Earnest money office default', segmentIds: [], exactQuote: 'Brokerage trust account is the office default earnest money holder.', retrievalTime: 'Approved Jun 4, 2026' },
  wirePreference: { id: 'src-wire-preference', type: 'prior_preference' as const, label: 'Wire fraud disclosure preference', segmentIds: [], exactQuote: 'Include the brokerage wire fraud disclosure for buyer offers.', retrievalTime: 'Approved May 18, 2026' }
};

const welkerSourceList: FieldSourceReference[] = Object.values(welkerSources);

export const mockReviewPackages: ReviewPackage[] = [
  {
    id: 'pkg-welker-offer',
    clientFullLegalNames: 'Brenton Welker & Emily Welker',
    propertyAddress: '2948 E Alderann Street',
    packageType: 'Offer',
    initialStatus: 'needs_attention',
    lastUpdated: 'Updated 8 minutes ago',
    readiness: { readinessForSignature: 'not_ready', percent: 78 },
    representativeSchemaWarning: 'Representative mock schema only. Official Utah form-library ingestion, licensing, versioning, and field validation are required before production use.',
    sourceDetails: welkerSourceList,
    transcriptSegments: [
      segment(1, '00:00:00', 'Agent', 'Thanks for staying on for a few minutes. I want to confirm the offer terms before I prepare the paperwork.'),
      segment(2, '00:00:31', 'Buyer · Brenton', 'Sounds good. Emily is here with me, and we are ready to go through everything.'),
      segment(3, '00:01:10', 'Agent', 'I have the buyers as Brenton and Emily Welker. Are those the full legal names you want on the offer?'),
      segment(4, '00:01:42', 'Buyer · Emily', 'Yes. The property is 2948 East Alderann Street in St. George, Utah.'),
      segment(5, '00:02:08', 'Agent', 'Great. I will use that street address and wait for title or the county record before filling any legal description.'),
      segment(6, '00:02:33', 'Agent', 'Red Rock Group represents both of you as buyers in this transaction. Is that still correct?'),
      segment(7, '00:02:47', 'Buyer · Brenton', 'Yes, that is correct.'),
      segment(8, '00:03:12', 'Agent', 'You would like a purchase price of eight hundred seventy-five thousand dollars. Correct?'),
      segment(9, '00:03:28', 'Buyer · Emily', 'Correct. We do not want to go above that amount.'),
      segment(10, '00:04:06', 'Buyer · Brenton', 'Let us put down seven thousand five hundred dollars in earnest money.'),
      segment(11, '00:04:27', 'Agent', 'I have seven thousand five hundred. I will confirm the holder before approving that section.'),
      segment(12, '00:05:02', 'Buyer · Brenton', 'We are using conventional financing with twenty percent down.'),
      segment(13, '00:05:29', 'Agent', 'And your lender has already issued the updated approval letter?'),
      segment(14, '00:05:41', 'Buyer · Emily', 'Yes. The lender emailed it this morning.'),
      segment(15, '00:06:24', 'Agent', 'Let us use ten calendar days after acceptance for due diligence.'),
      segment(16, '00:06:42', 'Buyer · Brenton', 'Ten days works. We want enough time for the inspection and sewer scope.'),
      segment(17, '00:07:10', 'Agent', 'The financing and appraisal deadline will remain aligned with the lender schedule, and I will flag any date that is not confirmed.'),
      segment(18, '00:07:39', 'Buyer · Emily', 'Okay. What are we using for settlement?'),
      segment(19, '00:08:11', 'Agent', 'You asked for August fifteenth for settlement, subject to the title and lender calendars.'),
      segment(20, '00:08:29', 'Buyer · Emily', 'Yes, August fifteenth is the date we discussed.'),
      segment(21, '00:09:04', 'Agent', 'For possession, you want possession at recording rather than a later time. Correct?'),
      segment(22, '00:09:18', 'Buyer · Brenton', 'Correct, possession at recording.'),
      segment(23, '00:10:22', 'Agent', 'For included personal property, you want the refrigerator, washer, and dryer.'),
      segment(24, '00:10:39', 'Buyer · Emily', 'Yes, all three, with no separate value assigned to them.'),
      segment(25, '00:11:16', 'Agent', 'Let us also confirm whether you want to request seller-paid costs.'),
      segment(26, '00:11:48', 'Buyer · Brenton', 'Please ask the seller to pay up to five thousand dollars toward closing costs.'),
      segment(27, '00:12:08', 'Agent', 'I have up to five thousand dollars, applied only to allowable buyer closing costs.'),
      segment(28, '00:12:44', 'Buyer · Emily', 'Which title company will the offer name?'),
      segment(29, '00:13:14', 'Agent', 'You both agreed to use Red Rock Title after we reviewed the options.'),
      segment(30, '00:13:29', 'Buyer · Emily', 'Yes, Red Rock Title is fine.'),
      segment(31, '00:14:03', 'Agent', 'I am going to put the personal property and settlement confirmation into Addendum Number One.'),
      segment(32, '00:14:37', 'Agent', 'The first paragraph will read: Seller agrees to leave the refrigerator, washer, and dryer at no additional cost to Buyer.'),
      segment(33, '00:14:51', 'Buyer · Brenton', 'That language is right.'),
      segment(34, '00:15:19', 'Agent', 'The second paragraph will read: Settlement Deadline shall be August 15, 2026.'),
      segment(35, '00:16:03', 'Agent', 'I will leave the legal description blank until we have an authoritative source. I will not guess from the street address.'),
      segment(36, '00:16:31', 'Buyer · Emily', 'Good. Please show us anything that still needs confirmation before sending.'),
      segment(37, '00:16:57', 'Agent', 'I will prepare the editable package, highlight the remaining approvals, and send nothing until you and I have reviewed it.'),
      segment(38, '00:17:18', 'Buyer · Brenton', 'Perfect. That covers everything from our side. Thank you.')
    ],
    documents: [
      {
        id: 'doc-repc', name: 'Utah REPC', documentVersion: 'Representative Mock 2026.1', jurisdiction: 'UT', formSchemaId: 'schema-ut-repc-representative', order: 1, pageCount: 6,
        sections: [
          section('repc-sec-1', '1', 'Buyer and Property', 1, ['field-buyers', 'field-property-address', 'field-legal-description']),
          section('repc-sec-2', '2', 'Purchase Price', 1, ['field-purchase-price', 'field-seller-closing-costs']),
          section('repc-sec-3', '3', 'Financing', 2, ['field-financing-type']),
          section('repc-sec-4', '4', 'Earnest Money', 2, ['field-earnest-amount', 'field-earnest-deadline', 'field-earnest-holder']),
          section('repc-sec-6', '6', 'Title Insurance', 3, ['field-title-company']),
          section('repc-sec-8', '8', 'Due Diligence', 4, ['field-due-diligence-deadline']),
          section('repc-sec-24', '24', 'Settlement and Possession', 5, ['field-settlement-deadline', 'field-possession']),
          section('repc-sec-sig', 'Signature', 'Signer Assignments', 6, ['field-buyer-signers'])
        ]
      },
      {
        id: 'doc-addendum-1', name: 'Addendum No. 1', documentVersion: 'Representative Mock 2026.1', jurisdiction: 'UT', formSchemaId: 'schema-ut-addendum-representative', order: 2, pageCount: 1,
        sections: [section('add-sec-1', '1', 'Additional Terms', 1, ['field-addendum-reference'], ['prov-1', 'prov-2'])]
      },
      {
        id: 'doc-wire', name: 'Wire Fraud Disclosure', documentVersion: 'Representative Mock 2026.1', jurisdiction: 'UT', formSchemaId: 'schema-wire-disclosure-representative', order: 3, pageCount: 1,
        sections: [section('wire-sec-ack', 'Acknowledgement', 'Disclosure Acknowledgement', 1, ['field-wire-ack'])]
      }
    ],
    addendumProvisions: [
      provision('prov-1', 1, 1, 'Seller agrees to leave the refrigerator, washer, and dryer at no additional cost to Buyer.', welkerSources.addendumOne, 'needs_approval', 91),
      provision('prov-2', 1, 2, 'Settlement Deadline shall be August 15, 2026.', welkerSources.addendumTwo, 'approved', 97)
    ],
    fields: [
      field('field-buyers', 'doc-repc', 'repc-sec-1', 'Buyer(s)', '1.1', 1, 'name', 'Brenton Welker; Emily Welker', undefined, 99, 'approved', true, welkerSources.buyers),
      field('field-property-address', 'doc-repc', 'repc-sec-1', 'Property Address', '1.2', 2, 'address', '2948 E Alderann Street, St. George, UT 84790', undefined, 98, 'approved', true, welkerSources.property),
      field('field-legal-description', 'doc-repc', 'repc-sec-1', 'Legal Description', '1.3', 3, 'legal_description', '', undefined, null, 'missing', true, welkerSources.legalDescription, 'Authoritative legal description has not been supplied.'),
      field('field-purchase-price', 'doc-repc', 'repc-sec-2', 'Purchase Price', '2.1', 1, 'money', '$875,000.00', undefined, 99, 'approved', true, welkerSources.price),
      field('field-seller-closing-costs', 'doc-repc', 'repc-sec-2', 'Seller-Paid Buyer Closing Costs', '2.2', 2, 'money', 'Up to $5,000.00', undefined, 88, 'needs_approval', true, welkerSources.closingCosts, 'Material seller concession requires approval.'),
      field('field-financing-type', 'doc-repc', 'repc-sec-3', 'Financing Type', '3.1', 1, 'radio', 'Conventional loan', { selectedOption: 'Conventional' }, 98, 'approved', true, welkerSources.financing),
      field('field-earnest-amount', 'doc-repc', 'repc-sec-4', 'Earnest Money Amount', '4.1', 1, 'money', '$7,500.00', undefined, 98, 'approved', true, welkerSources.earnest),
      field('field-earnest-deadline', 'doc-repc', 'repc-sec-4', 'Earnest Money Deadline', '4.2', 2, 'deadline', 'Within 4 calendar days after Acceptance', undefined, 86, 'approved', true, welkerSources.earnest),
      field('field-earnest-holder', 'doc-repc', 'repc-sec-4', 'Earnest Money Holder', '4.3', 3, 'selection', 'Brokerage trust account', { selectedOption: 'Brokerage trust account' }, 74, 'needs_approval', true, welkerSources.holderDefault, 'Office default applied; agent confirmation required.'),
      field('field-title-company', 'doc-repc', 'repc-sec-6', 'Title Company', '6.1', 1, 'text', 'Red Rock Title', undefined, 96, 'approved', true, welkerSources.title, undefined, true),
      field('field-due-diligence-deadline', 'doc-repc', 'repc-sec-8', 'Due Diligence Deadline', '8.1', 1, 'deadline', '10 calendar days after Acceptance', undefined, 90, 'needs_approval', true, welkerSources.dueDiligence, 'Confirm the relative deadline before approval.'),
      field('field-settlement-deadline', 'doc-repc', 'repc-sec-24', 'Settlement Deadline', '24.1', 1, 'date', 'August 15, 2026', undefined, 97, 'approved', true, welkerSources.settlement),
      field('field-possession', 'doc-repc', 'repc-sec-24', 'Possession', '24.2', 2, 'selection', 'At recording', { selectedOption: 'At recording' }, 91, 'needs_approval', true, welkerSources.possession),
      field('field-buyer-signers', 'doc-repc', 'repc-sec-sig', 'Buyer Signers', 'Signature.1', 1, 'signature_assignment', 'Brenton Welker; Emily Welker', undefined, 99, 'approved', true, welkerSources.buyers),
      field('field-addendum-reference', 'doc-addendum-1', 'add-sec-1', 'Addendum Reference', 'A1.0', 1, 'addendum_reference', 'Addendum No. 1 to Real Estate Purchase Contract', undefined, 98, 'approved', true, welkerSources.addendumOne),
      field('field-wire-ack', 'doc-wire', 'wire-sec-ack', 'Wire Fraud Disclosure Acknowledgement', 'WF.1', 1, 'checkbox', 'Include disclosure', { checkboxState: true }, 100, 'needs_approval', true, welkerSources.wirePreference, 'Brokerage-required disclosure selected by preference.', true)
    ]
  },
  simplePackage('pkg-smith-buyer', 'John Smith', '123 Main Street', 'Buyer Paperwork', 'ready_to_approve', 'Updated 22 minutes ago', 'Buyer Legal Name', 'John Smith', 'smith'),
  simplePackage('pkg-chen-listing', 'Maya Chen', '346 E Homeside Road', 'Listing Paperwork', 'ready_to_send', 'Updated 1 hour ago', 'Seller Legal Name', 'Maya Chen', 'chen', true)
];

function transcriptSource(id: string, timestamp: string, segmentIds: string[], exactQuote: string): FieldSourceReference {
  return { id, type: 'transcript', label: `Transcript ${timestamp}`, segmentIds, exactQuote };
}

function segment(index: number, timestamp: string, speaker: string, text: string): TranscriptSegment {
  return { id: `t-${String(index).padStart(3, '0')}`, timestamp, speaker, text };
}

function section(id: string, sectionNumber: string, title: string, pageNumber: number, fieldIds: string[], addendumProvisionIds?: string[]): FormSection {
  return { id, sectionNumber, title, pageNumber, fieldIds, addendumProvisionIds };
}

function provision(id: string, addendumNumber: number, itemNumber: number, exactParagraphText: string, source: FieldSourceReference, reviewStatus: FieldReviewStatus, confidence: number): AddendumProvision {
  return {
    id, addendumNumber, documentTitle: `Addendum No. ${addendumNumber}`, itemNumber, exactParagraphText,
    sourceReferences: [source], approvalState: reviewStatus === 'approved' ? 'approved' : 'not_reviewed', reviewStatus,
    required: true, confidence, transactionRisk: 'high', material: true
  };
}

function field(
  id: string,
  documentId: string,
  sectionId: string,
  officialLabel: string,
  sectionNumber: string,
  itemSequence: number,
  inputType: FieldInputType,
  exactGeneratedValue: string,
  selection: FieldSelection | undefined,
  confidence: number | null,
  reviewStatus: FieldReviewStatus,
  required: boolean,
  sourceReference: FieldSourceReference,
  reviewReason?: string,
  preferenceEligible = false
): GeneratedFormField {
  const options = inputType === 'radio'
    ? ['Cash', 'Conventional', 'FHA', 'VA', 'Other']
    : officialLabel === 'Earnest Money Holder'
      ? ['Brokerage trust account', 'Title company', 'Other']
      : officialLabel === 'Possession'
        ? ['At recording', 'At settlement', 'Other']
        : undefined;
  return {
    id, documentId, sectionId,
    definition: { id: `ut-mock.${id}`, officialLabel, sectionNumber, itemSequence, inputType, options, preferenceEligible },
    exactGeneratedValue, selection, confidence, reviewStatus, reviewReason,
    mappedFormFieldId: `ut-mock.${id}`, documentVersion: 'Representative Mock 2026.1', jurisdiction: 'UT',
    approvalState: reviewStatus === 'approved' ? 'approved' : 'not_reviewed', required,
    transactionRisk: reviewStatus === 'missing' ? 'critical' : required ? 'medium' : 'low', material: required,
    sourceReferences: [sourceReference]
  };
}

function simplePackage(
  id: string,
  client: string,
  property: string,
  packageType: ReviewPackageType,
  initialStatus: PackageStatus,
  lastUpdated: string,
  fieldLabel: string,
  fieldValue: string,
  prefix: string,
  approved = false
): ReviewPackage {
  const source = transcriptSource(`${prefix}-src-1`, '00:01:04', [`${prefix}-t-1`], fieldValue);
  const reviewStatus: FieldReviewStatus = approved ? 'approved' : 'needs_approval';
  return {
    id, clientFullLegalNames: client, propertyAddress: property, packageType, initialStatus, lastUpdated,
    readiness: { readinessForSignature: approved ? 'ready' : 'needs_review', percent: approved ? 100 : 91 },
    representativeSchemaWarning: 'Representative mock schema only. Official form-library ingestion, licensing, versioning, and field validation are required before production use.',
    sourceDetails: [source],
    transcriptSegments: [{ id: `${prefix}-t-1`, timestamp: '00:01:04', speaker: 'Agent', text: `${client} confirmed the paperwork for ${property}.` }],
    documents: [{ id: `${prefix}-doc`, name: packageType, documentVersion: 'Representative Mock 2026.1', jurisdiction: 'UT', formSchemaId: `${prefix}-schema`, order: 1, pageCount: 1, sections: [section(`${prefix}-sec-1`, '1', 'Party Information', 1, [`${prefix}-field-client`])] }],
    addendumProvisions: [],
    fields: [field(`${prefix}-field-client`, `${prefix}-doc`, `${prefix}-sec-1`, fieldLabel, '1.1', 1, 'name', fieldValue, undefined, 98, reviewStatus, true, source)]
  };
}

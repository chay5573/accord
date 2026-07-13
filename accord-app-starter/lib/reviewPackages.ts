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

export type FieldReviewStatus = 'ready' | 'missing' | 'low_confidence' | 'conflicting' | 'default_requires_confirmation' | 'materially_changed' | 'unmapped_source';
export type ApprovalState = 'not_reviewed' | 'approved' | 'edited' | 'marked_unknown';
export type SourceType = 'transcript' | 'office_default' | 'prior_preference' | 'mls' | 'county_record' | 'email' | 'document_upload';

export interface FieldSourceReference {
  id: string;
  type: SourceType;
  label: string;
  segmentIds: string[];
  exactQuote: string;
  retrievalTime?: string;
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
}

export interface FormSection {
  id: string;
  sectionNumber: string;
  title: string;
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
  readinessStatus: string;
  lastUpdated: string;
  documents: ReviewDocument[];
  fields: GeneratedFormField[];
  addendumProvisions: AddendumProvision[];
  transcriptSegments: TranscriptSegment[];
  sourceDetails: FieldSourceReference[];
  readiness: PackageReadiness;
  representativeSchemaWarning: string;
}

const welkerSources: FieldSourceReference[] = [
  { id: 'src-price', type: 'transcript', label: 'Transcript 00:03:14', segmentIds: ['t-003'], exactQuote: 'offer eight hundred seventy-five thousand' },
  { id: 'src-earnest', type: 'transcript', label: 'Transcript 00:04:02', segmentIds: ['t-004'], exactQuote: 'seventy-five hundred earnest money' },
  { id: 'src-financing', type: 'transcript', label: 'Transcript 00:04:48', segmentIds: ['t-005'], exactQuote: 'We are staying conventional.' },
  { id: 'src-included-items', type: 'transcript', label: 'Transcript 00:07:21', segmentIds: ['t-007'], exactQuote: 'refrigerator, washer, and dryer' },
  { id: 'src-bba', type: 'document_upload', label: 'Uploaded buyer broker agreement', segmentIds: [], exactQuote: 'Buyer broker compensation governed by signed buyer broker agreement.' },
  { id: 'src-title-default', type: 'office_default', label: 'Office default', segmentIds: [], exactQuote: 'Red Rock Title is the office default title company for Washington County buyer offers.' },
  { id: 'src-dd-default', type: 'prior_preference', label: 'Approved team preference', segmentIds: [], exactQuote: '10 calendar days after acceptance is the team default due diligence period.' },
  { id: 'src-representation', type: 'transcript', label: 'Transcript 00:11:42', segmentIds: ['t-010'], exactQuote: 'You are represented by Red Rock Group' },
  { id: 'src-missing-settlement', type: 'transcript', label: 'Transcript review', segmentIds: ['t-001', 't-011'], exactQuote: 'No settlement deadline was stated in the conversation.' }
];

export const mockReviewPackages: ReviewPackage[] = [
  {
    id: 'pkg-welker-offer',
    clientFullLegalNames: 'Brenton Welker & Emily Welker',
    propertyAddress: '2948 E Alderann Street',
    packageType: 'Offer',
    readinessStatus: 'Needs review',
    lastUpdated: 'Updated 8 minutes ago',
    readiness: { readinessForSignature: 'not_ready', percent: 78 },
    representativeSchemaWarning: 'Representative mock schema only. Official Utah form-library ingestion, licensing, versioning, and field validation are required before production use.',
    sourceDetails: welkerSources,
    transcriptSegments: [
      { id: 't-001', timestamp: '00:00:12', speaker: 'Agent', text: 'Let us recap the Welker offer for Alderann Street.' },
      { id: 't-003', timestamp: '00:03:14', speaker: 'Agent', text: 'The Welkers want to offer eight hundred seventy-five thousand on Alderann.' },
      { id: 't-004', timestamp: '00:04:02', speaker: 'Buyer', text: 'Let us do seventy-five hundred earnest money. We can get that wired quickly.' },
      { id: 't-005', timestamp: '00:04:48', speaker: 'Buyer', text: 'We are staying conventional. Our lender already has the updated approval letter.' },
      { id: 't-007', timestamp: '00:07:21', speaker: 'Agent', text: 'I will ask for the refrigerator, washer, and dryer in the addendum.' },
      { id: 't-010', timestamp: '00:11:42', speaker: 'Agent', text: 'You are represented by Red Rock Group, so the unrepresented buyer disclosure should not apply.' },
      { id: 't-011', timestamp: '00:13:02', speaker: 'Buyer', text: 'Everything else can follow the usual office defaults if you think it is appropriate.' }
    ],
    documents: [
      {
        id: 'doc-repc',
        name: 'Utah REPC',
        documentVersion: 'Representative Mock 2026.1',
        jurisdiction: 'UT',
        formSchemaId: 'schema-ut-repc-representative',
        order: 1,
        sections: [
          { id: 'repc-sec-1', sectionNumber: '1', title: 'Buyer and Property', fieldIds: ['field-buyers', 'field-property-address', 'field-legal-description'] },
          { id: 'repc-sec-2', sectionNumber: '2', title: 'Purchase Price', fieldIds: ['field-purchase-price'] },
          { id: 'repc-sec-3', sectionNumber: '3', title: 'Financing', fieldIds: ['field-financing-type'] },
          { id: 'repc-sec-4', sectionNumber: '4', title: 'Earnest Money', fieldIds: ['field-earnest-amount', 'field-earnest-deadline', 'field-earnest-holder'] },
          { id: 'repc-sec-6', sectionNumber: '6', title: 'Title Insurance', fieldIds: ['field-title-company'] },
          { id: 'repc-sec-24', sectionNumber: '24', title: 'Settlement', fieldIds: ['field-settlement-deadline'] },
          { id: 'repc-sec-sig', sectionNumber: 'Signature', title: 'Signer Assignments', fieldIds: ['field-buyer-signers'] }
        ]
      },
      {
        id: 'doc-addendum-1',
        name: 'Addendum No. 1',
        documentVersion: 'Representative Mock 2026.1',
        jurisdiction: 'UT',
        formSchemaId: 'schema-ut-addendum-representative',
        order: 2,
        sections: [
          { id: 'add-sec-1', sectionNumber: '1', title: 'Additional Terms', fieldIds: ['field-addendum-reference'], addendumProvisionIds: ['prov-1', 'prov-2'] }
        ]
      },
      {
        id: 'doc-wire',
        name: 'Wire Fraud Disclosure',
        documentVersion: 'Representative Mock 2026.1',
        jurisdiction: 'UT',
        formSchemaId: 'schema-wire-disclosure-representative',
        order: 3,
        sections: [
          { id: 'wire-sec-ack', sectionNumber: 'Acknowledgement', title: 'Disclosure Acknowledgement', fieldIds: ['field-wire-ack'] }
        ]
      }
    ],
    addendumProvisions: [
      {
        id: 'prov-1',
        addendumNumber: 1,
        documentTitle: 'Addendum No. 1',
        itemNumber: 1,
        exactParagraphText: 'Seller agrees to leave the refrigerator, washer, and dryer at no additional cost to Buyer.',
        sourceReferences: [welkerSources[3]],
        approvalState: 'not_reviewed',
        reviewStatus: 'low_confidence'
      },
      {
        id: 'prov-2',
        addendumNumber: 1,
        documentTitle: 'Addendum No. 1',
        itemNumber: 2,
        exactParagraphText: 'Settlement Deadline is extended to August 15, 2026.',
        sourceReferences: [welkerSources[8]],
        approvalState: 'not_reviewed',
        reviewStatus: 'missing'
      }
    ],
    fields: [
      field('field-buyers', 'doc-repc', 'repc-sec-1', 'Buyer(s)', '1.1', 1, 'name', 'Brenton Welker; Emily Welker', undefined, 97, 'ready', 'ut-repc.buyer.names', 'Representative Mock 2026.1', true, [welkerSources[0]]),
      field('field-property-address', 'doc-repc', 'repc-sec-1', 'Property Address', '1.2', 2, 'address', '2948 E Alderann Street, St. George, UT 84790', undefined, 94, 'ready', 'ut-repc.property.address', 'Representative Mock 2026.1', true, [welkerSources[0]]),
      field('field-legal-description', 'doc-repc', 'repc-sec-1', 'Legal Description', '1.3', 3, 'legal_description', 'To be completed from title commitment or county record.', undefined, null, 'missing', 'ut-repc.property.legal_description', 'Representative Mock 2026.1', true, [welkerSources[8]], 'Legal description has not been sourced.'),
      field('field-purchase-price', 'doc-repc', 'repc-sec-2', 'Purchase Price', '2.1', 1, 'money', '$875,000.00', undefined, 98, 'ready', 'ut-repc.purchase_price.total', 'Representative Mock 2026.1', true, [welkerSources[0]]),
      field('field-financing-type', 'doc-repc', 'repc-sec-3', 'Financing Type', '3.1', 1, 'radio', 'Conventional loan', { selectedOption: 'Conventional' }, 94, 'ready', 'ut-repc.financing.type', 'Representative Mock 2026.1', true, [welkerSources[2]]),
      field('field-earnest-amount', 'doc-repc', 'repc-sec-4', 'Earnest Money Amount', '4.1', 1, 'money', '$7,500.00', undefined, 96, 'ready', 'ut-repc.earnest_money.amount', 'Representative Mock 2026.1', true, [welkerSources[1]]),
      field('field-earnest-deadline', 'doc-repc', 'repc-sec-4', 'Earnest Money Deadline', '4.2', 2, 'deadline', 'Within 4 calendar days after Acceptance', undefined, 87, 'ready', 'ut-repc.earnest_money.deadline', 'Representative Mock 2026.1', true, [welkerSources[1]]),
      field('field-earnest-holder', 'doc-repc', 'repc-sec-4', 'Earnest Money Holder', '4.3', 3, 'selection', 'Brokerage trust account', { selectedOption: 'Brokerage trust account' }, 74, 'low_confidence', 'ut-repc.earnest_money.holder', 'Representative Mock 2026.1', true, [welkerSources[8]], 'Holder was inferred from office workflow, not stated by client.'),
      field('field-title-company', 'doc-repc', 'repc-sec-6', 'Title Company', '6.1', 1, 'text', 'Red Rock Title', undefined, 82, 'default_requires_confirmation', 'ut-repc.title.company', 'Representative Mock 2026.1', true, [welkerSources[5]], 'Office default applied; agent confirmation required.', true),
      field('field-settlement-deadline', 'doc-repc', 'repc-sec-24', 'Settlement Deadline', '24.1', 1, 'date', '', undefined, null, 'missing', 'ut-repc.settlement.deadline', 'Representative Mock 2026.1', true, [welkerSources[8]], 'Required date is missing.'),
      field('field-buyer-signers', 'doc-repc', 'repc-sec-sig', 'Buyer Signers', 'Signature.1', 1, 'signature_assignment', 'Brenton Welker; Emily Welker', undefined, 97, 'ready', 'ut-repc.signature.buyers', 'Representative Mock 2026.1', true, [welkerSources[0]]),
      field('field-addendum-reference', 'doc-addendum-1', 'add-sec-1', 'Addendum Reference', 'A1.0', 1, 'addendum_reference', 'Addendum No. 1 to Real Estate Purchase Contract', undefined, 92, 'ready', 'ut-addendum.reference', 'Representative Mock 2026.1', true, [welkerSources[3]]),
      field('field-wire-ack', 'doc-wire', 'wire-sec-ack', 'Wire Fraud Disclosure Acknowledgement', 'WF.1', 1, 'disclosure_acknowledgement', 'Include brokerage-required wire fraud disclosure with buyer acknowledgement checkbox selected.', { checkboxState: true }, 100, 'default_requires_confirmation', 'wire-disclosure.acknowledgement.included', 'Representative Mock 2026.1', true, [welkerSources[6]], 'Brokerage-required disclosure selected by default.', true)
    ]
  },
  {
    id: 'pkg-smith-buyer',
    clientFullLegalNames: 'John Smith',
    propertyAddress: '123 Main Street',
    packageType: 'Buyer Paperwork',
    readinessStatus: 'Ready for review',
    lastUpdated: 'Updated 22 minutes ago',
    readiness: { readinessForSignature: 'needs_review', percent: 91 },
    representativeSchemaWarning: 'Representative mock schema only. Official form-library ingestion, licensing, versioning, and field validation are required before production use.',
    sourceDetails: [],
    transcriptSegments: [{ id: 'smith-t-1', timestamp: '00:01:04', speaker: 'Agent', text: 'John Smith needs standard buyer paperwork for 123 Main Street.' }],
    documents: [
      { id: 'smith-doc-agency', name: 'Buyer Paperwork', documentVersion: 'Representative Mock 2026.1', jurisdiction: 'UT', formSchemaId: 'schema-buyer-paperwork-representative', order: 1, sections: [{ id: 'smith-sec-1', sectionNumber: '1', title: 'Buyer Information', fieldIds: ['smith-field-client'] }] }
    ],
    addendumProvisions: [],
    fields: [
      field('smith-field-client', 'smith-doc-agency', 'smith-sec-1', 'Buyer Legal Name', '1.1', 1, 'name', 'John Smith', undefined, 98, 'ready', 'buyer-paperwork.client.name', 'Representative Mock 2026.1', true, [{ id: 'smith-src-1', type: 'transcript', label: 'Transcript 00:01:04', segmentIds: ['smith-t-1'], exactQuote: 'John Smith' }])
    ]
  },
  {
    id: 'pkg-chen-listing',
    clientFullLegalNames: 'Maya Chen',
    propertyAddress: '346 E Homeside Road',
    packageType: 'Listing Paperwork',
    readinessStatus: 'Draft ready',
    lastUpdated: 'Updated 1 hour ago',
    readiness: { readinessForSignature: 'ready', percent: 100 },
    representativeSchemaWarning: 'Representative mock schema only. Official form-library ingestion, licensing, versioning, and field validation are required before production use.',
    sourceDetails: [],
    transcriptSegments: [{ id: 'chen-t-1', timestamp: '00:02:14', speaker: 'Seller', text: 'Maya Chen is ready to prepare listing paperwork for 346 E Homeside Road.' }],
    documents: [
      { id: 'chen-doc-listing', name: 'Listing Paperwork', documentVersion: 'Representative Mock 2026.1', jurisdiction: 'UT', formSchemaId: 'schema-listing-paperwork-representative', order: 1, sections: [{ id: 'chen-sec-1', sectionNumber: '1', title: 'Seller Information', fieldIds: ['chen-field-client'] }] }
    ],
    addendumProvisions: [],
    fields: [
      field('chen-field-client', 'chen-doc-listing', 'chen-sec-1', 'Seller Legal Name', '1.1', 1, 'name', 'Maya Chen', undefined, 99, 'ready', 'listing-paperwork.seller.name', 'Representative Mock 2026.1', true, [{ id: 'chen-src-1', type: 'transcript', label: 'Transcript 00:02:14', segmentIds: ['chen-t-1'], exactQuote: 'Maya Chen' }])
    ]
  }
];

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
  mappedFormFieldId: string,
  documentVersion: string,
  required: boolean,
  sourceReferences: FieldSourceReference[],
  reviewReason?: string,
  preferenceEligible = false
): GeneratedFormField {
  return {
    id,
    documentId,
    sectionId,
    definition: { id: mappedFormFieldId, officialLabel, sectionNumber, itemSequence, inputType, preferenceEligible },
    exactGeneratedValue,
    selection,
    confidence,
    reviewStatus,
    reviewReason,
    mappedFormFieldId,
    documentVersion,
    jurisdiction: 'UT',
    approvalState: 'not_reviewed',
    required,
    sourceReferences
  };
}

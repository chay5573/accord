export type ReviewIssueType = 'consent' | 'missing_fact' | 'low_confidence' | 'form_package' | 'draft_readiness';
export type ReviewPriority = 'blocker' | 'warning' | 'ready';
export type ReviewAction = 'pending' | 'approved' | 'edited' | 'unknown' | 'dismissed';

export interface ReviewItem {
  id: string;
  issueType: ReviewIssueType;
  title: string;
  priority: ReviewPriority;
  relatedRecord: string;
  extractedValue: string | null;
  confidence: number | null;
  sourceSnippet: string | null;
  flaggedBecause: string;
  recommendedAction: string;
}

export interface MissingFact {
  id: string;
  label: string;
  category: 'required' | 'recommended' | 'unknown';
  value: string | null;
  lookupSuggestion?: string;
}

export interface ReviewForm {
  id: string;
  name: string;
  requirement: 'required' | 'recommended' | 'optional';
  reason: string;
  missingFields: string[];
  approvalStatus: 'approved' | 'needs_review' | 'not_selected';
}

export const mockReviewItems: ReviewItem[] = [
  { id: 'consent', issueType: 'consent', title: 'Consent needs confirmation', priority: 'blocker', relatedRecord: 'Welker offer-terms conversation', extractedValue: 'Emily Welker: not obtained', confidence: null, sourceSnippet: 'Consent record exists for Brenton only; Emily has no current AI-transcription consent.', flaggedBecause: 'Every required participant must have consent applicable to this conversation before recording or audio processing.', recommendedAction: 'Confirm Emily’s consent status or continue using the pasted transcript only.' },
  { id: 'settlement', issueType: 'missing_fact', title: 'Missing settlement date', priority: 'blocker', relatedRecord: '2948 E Alderann St', extractedValue: null, confidence: null, sourceSnippet: '“I still need to confirm the settlement date.”', flaggedBecause: 'Settlement is a required term before a draft REPC can be prepared.', recommendedAction: 'Enter the confirmed settlement date or mark it unknown and keep draft preparation blocked.' },
  { id: 'seller', issueType: 'low_confidence', title: 'Low-confidence seller name', priority: 'warning', relatedRecord: '2948 E Alderann St', extractedValue: 'Alderann Holdings', confidence: 42, sourceSnippet: '“I think the seller may be Alderann Holdings, but I’ll verify.”', flaggedBecause: 'The source is tentative and the confidence is below the office review threshold.', recommendedAction: 'Verify with a transaction file or approve a mock Verified Lookup suggestion.' },
  { id: 'forms', issueType: 'form_package', title: 'Recommended form package needs approval', priority: 'warning', relatedRecord: 'Welker buyer offer', extractedValue: 'REPC + Addendum + Buyer Due Diligence Checklist', confidence: 88, sourceSnippet: 'Closing-cost terms and the office playbook triggered the mock recommendation.', flaggedBecause: 'Recommended forms require agent review; a rule or model cannot approve a legal package.', recommendedAction: 'Review each form, its reason, and missing fields before package approval.' },
  { id: 'ready', issueType: 'draft_readiness', title: 'Draft package ready', priority: 'ready', relatedRecord: 'Welker buyer offer', extractedValue: 'Blocked by 2 required items', confidence: null, sourceSnippet: null, flaggedBecause: 'All other mock terms have source evidence and the current form versions are selected.', recommendedAction: 'Resolve consent and settlement blockers, then complete agent approval.' }
];

export const mockMissingFacts: MissingFact[] = [
  { id: 'seller-legal', label: 'Seller legal name', category: 'required', value: null, lookupSuggestion: 'County recorder or uploaded title record' },
  { id: 'settlement-date', label: 'Settlement deadline', category: 'required', value: null },
  { id: 'title-company', label: 'Title company', category: 'recommended', value: 'Southern Utah Title Company' },
  { id: 'earnest-holder', label: 'Earnest money holder', category: 'recommended', value: null, lookupSuggestion: 'Brokerage transaction records' },
  { id: 'financing-details', label: 'Buyer financing details', category: 'unknown', value: 'Conventional — details incomplete' }
];

export const mockReviewForms: ReviewForm[] = [
  { id: 'repc', name: 'Utah REPC', requirement: 'required', reason: 'Base agreement for the buyer offer.', missingFields: ['Seller legal name', 'Settlement deadline'], approvalStatus: 'needs_review' },
  { id: 'addendum', name: 'Addendum', requirement: 'recommended', reason: 'Seller-paid closing costs require additional terms.', missingFields: [], approvalStatus: 'needs_review' },
  { id: 'counteroffer', name: 'Counteroffer', requirement: 'optional', reason: 'Available if the seller changes terms.', missingFields: [], approvalStatus: 'not_selected' },
  { id: 'unrepresented', name: 'Unrepresented Buyer Disclosure', requirement: 'optional', reason: 'Current facts indicate both buyers are represented.', missingFields: [], approvalStatus: 'not_selected' },
  { id: 'due-diligence', name: 'Buyer Due Diligence Checklist', requirement: 'required', reason: 'Required by the mock office playbook.', missingFields: [], approvalStatus: 'approved' }
];

export const mockLookupSuggestions = [
  { id: 'lookup-seller', field: 'Seller legal name', providerType: 'County recorder', reason: 'Confirm the vested owner shown in public records.', approvalRequired: true },
  { id: 'lookup-property', field: 'Property details', providerType: 'County assessor', reason: 'Cross-check parcel and situs address.', approvalRequired: true },
  { id: 'lookup-listing', field: 'Listing facts', providerType: 'MLS/public listing data', reason: 'Compare active listing facts with conversation details.', approvalRequired: true }
] as const;

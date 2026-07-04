export type TransactionStatus = 'Needs review' | 'In progress' | 'Executed' | 'Draft';

export interface MockTransaction {
  id: string;
  address: string;
  clients: string;
  type: string;
  status: TransactionStatus;
  owner: string;
  nextStep: string;
  updatedAt: string;
}

export interface ExtractedTerm {
  id: string;
  label: string;
  value: string;
  confidence: number | null;
  sourceSnippet: string | null;
  sourceTimestamp: string | null;
  state: 'suggested' | 'incomplete' | 'conflicted';
}

export interface PackageForm {
  id: string;
  name: string;
  reason: string;
  status: 'required' | 'recommended' | 'available';
  included: boolean;
}

export type ConsentStatus = 'not_obtained' | 'obtained' | 'expired' | 'revoked';
export type ConsentType = 'phone' | 'in_person' | 'ai_transcription';
export type ConsentSource = 'verbal' | 'written' | 'email' | 'engagement_agreement';

export interface ConsentRecord {
  id: string;
  personId: string;
  personName: string;
  status: ConsentStatus;
  consentType: ConsentType;
  consentDate: string | null;
  expirationDate: string | null;
  source: ConsentSource | null;
  jurisdiction: string | null;
}

export interface UnassignedConversation {
  id: string;
  title: string;
  conversationType: string;
  participants: string;
  capturedAt: string;
  consentStatus: ConsentStatus;
  reviewStatus: 'Needs review' | 'Ready to attach';
}

export const mockConsentRecords: ConsentRecord[] = [
  { id: 'consent-001', personId: 'person-brenton', personName: 'Brenton Welker', status: 'obtained', consentType: 'phone', consentDate: '2026-06-18', expirationDate: '2026-09-18', source: 'engagement_agreement', jurisdiction: 'UT' },
  { id: 'consent-002', personId: 'person-emily', personName: 'Emily Welker', status: 'not_obtained', consentType: 'ai_transcription', consentDate: null, expirationDate: null, source: null, jurisdiction: 'UT' },
  { id: 'consent-003', personId: 'person-maya', personName: 'Maya Chen', status: 'expired', consentType: 'phone', consentDate: '2026-01-10', expirationDate: '2026-04-10', source: 'email', jurisdiction: 'UT' },
  { id: 'consent-004', personId: 'person-unknown', personName: 'Unidentified caller', status: 'revoked', consentType: 'phone', consentDate: '2026-05-04', expirationDate: null, source: 'verbal', jurisdiction: null }
];

export const mockUnassignedConversations: UnassignedConversation[] = [
  { id: 'conversation-001', title: 'Pine Valley buyer consult', conversationType: 'Buyer consult', participants: 'Alex Morgan + 1 unknown', capturedAt: 'Today, 8:34 AM', consentStatus: 'obtained', reviewStatus: 'Needs review' },
  { id: 'conversation-002', title: 'Title call — unknown property', conversationType: 'Lender/title call', participants: 'Jordan Lee', capturedAt: 'Yesterday, 4:12 PM', consentStatus: 'not_obtained', reviewStatus: 'Ready to attach' }
];

export const mockCaptureReview = {
  likelyTransaction: { value: '2948 E Alderann St', confidence: 92, source: '“For the Alderann property, the Welkers want to make an offer.”' },
  buyer: { value: 'Brenton & Emily Welker', confidence: 96, source: '“Brenton and Emily are ready to move forward.”' },
  seller: { value: 'Unknown', confidence: null, source: 'No seller name was mentioned.' },
  property: { value: '2948 E Alderann St, St. George, UT', confidence: 94, source: '“The home at 2948 East Alderann in St. George.”' },
  transactionType: { value: 'Buyer offer', confidence: 97, source: '“They want to make an offer.”' },
  missingFacts: ['Seller legal name', 'Settlement deadline', 'Subject-to-sale decision']
} as const;

export const mockTransactions: MockTransaction[] = [
  { id: 'txn-demo', address: '2948 E Alderann St', clients: 'Brenton & Emily Welker', type: 'Buyer offer', status: 'Needs review', owner: 'Calvin Hayward', nextStep: 'Review extracted terms', updatedAt: '12 minutes ago' },
  { id: 'txn-homeside', address: '346 E Homeside Rd', clients: 'Maya Chen', type: 'Listing', status: 'In progress', owner: 'Team Deal Desk', nextStep: 'Confirm disclosure package', updatedAt: 'Yesterday' },
  { id: 'txn-redcliffs', address: '1880 Red Cliffs Dr', clients: 'Red Mesa Holdings LLC', type: 'Investment purchase', status: 'Executed', owner: 'Calvin Hayward', nextStep: 'Track due diligence deadline', updatedAt: 'Jun 29' }
];

export const mockTasks = [
  { title: 'Resolve settlement date', transaction: '2948 E Alderann St', due: 'Today', priority: 'High' },
  { title: 'Review disclosure package', transaction: '346 E Homeside Rd', due: 'Tomorrow', priority: 'Normal' },
  { title: 'Confirm inspection access', transaction: '1880 Red Cliffs Dr', due: 'Jul 7', priority: 'Normal' }
] as const;

export const mockTranscript = `Agent: The Welkers are offering $875,000. Earnest money should be $7,500. They are asking the seller for $14,000 toward closing costs.\n\nClient: Let's use two weeks for due diligence and three weeks for financing and appraisal. We'd like a home warranty around $700, paid by the seller.\n\nAgent: I still need to confirm the settlement date and whether the offer is subject to the sale of their current home.`;

export const mockExtractedTerms: ExtractedTerm[] = [
  { id: 'purchase-price', label: 'Purchase price', value: '$875,000', confidence: 98, sourceSnippet: '“The Welkers are offering $875,000.”', sourceTimestamp: '00:18', state: 'suggested' },
  { id: 'earnest-money', label: 'Earnest money', value: '$7,500', confidence: 97, sourceSnippet: '“Earnest money should be $7,500.”', sourceTimestamp: '00:25', state: 'suggested' },
  { id: 'closing-costs', label: 'Seller closing cost contribution', value: '$14,000', confidence: 96, sourceSnippet: '“Asking the seller for $14,000 toward closing costs.”', sourceTimestamp: '00:33', state: 'suggested' },
  { id: 'due-diligence', label: 'Due diligence deadline', value: 'July 17, 2026', confidence: 76, sourceSnippet: '“Let’s use two weeks for due diligence.”', sourceTimestamp: '01:08', state: 'suggested' },
  { id: 'financing', label: 'Financing & appraisal deadline', value: 'July 24, 2026', confidence: 74, sourceSnippet: '“Three weeks for financing and appraisal.”', sourceTimestamp: '01:15', state: 'suggested' },
  { id: 'settlement', label: 'Settlement deadline', value: '', confidence: null, sourceSnippet: '“I still need to confirm the settlement date.”', sourceTimestamp: '01:42', state: 'incomplete' },
  { id: 'subject-to-sale', label: 'Subject to sale', value: 'Needs clarification', confidence: 41, sourceSnippet: '“Whether the offer is subject to the sale of their current home.”', sourceTimestamp: '01:49', state: 'conflicted' }
];

export const mockPackageForms: PackageForm[] = [
  { id: 'repc', name: 'Utah REPC', reason: 'Base agreement for this buyer offer.', status: 'required', included: true },
  { id: 'addendum', name: 'Addendum', reason: 'Supports seller-paid closing costs and additional terms.', status: 'recommended', included: true },
  { id: 'counteroffer', name: 'Counteroffer', reason: 'Available if the seller proposes revised terms.', status: 'available', included: false },
  { id: 'unrepresented', name: 'Unrepresented Buyer Disclosure', reason: 'Not indicated by the current representation facts.', status: 'available', included: false },
  { id: 'due-diligence-checklist', name: 'Buyer Due Diligence Checklist', reason: 'Required by the mock office playbook.', status: 'required', included: true }
];

export const mockFiles = [
  { name: 'Welker buyer notes.txt', type: 'Conversation notes', status: 'Mock file', updated: 'Today, 9:42 AM' },
  { name: 'Pre-approval placeholder.pdf', type: 'Financing', status: 'Upload placeholder', updated: 'Not uploaded' },
  { name: 'Property disclosures', type: 'Disclosures', status: 'Awaiting seller', updated: 'Not available' }
] as const;

export const mockTimeline = [
  { time: 'Today, 9:45 AM', title: 'Mock extraction prepared', detail: 'Seven terms identified; two require clarification.' },
  { time: 'Today, 9:42 AM', title: 'Transcript added', detail: 'Pasted transcript saved to this mock transaction.' },
  { time: 'Today, 9:31 AM', title: 'Transaction created', detail: 'Buyer offer opened by Calvin Hayward.' }
] as const;

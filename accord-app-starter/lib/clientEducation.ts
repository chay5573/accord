export interface ClientPortalAccess {
  id: string;
  transactionId: string;
  clientPersonId: string;
  status: 'disabled' | 'pending' | 'active' | 'revoked' | 'expired';
  approvedByUserId: string | null;
  approvedAt: string | null;
  expiresAt: string | null;
  permissions: Array<'view_summary' | 'view_documents' | 'ask_questions' | 'view_education' | 'message_agent'>;
}

export interface ClientVisibleDocument {
  id: string;
  transactionId: string;
  documentId: string;
  title: string;
  version: string;
  visibilityStatus: 'not_approved' | 'approved' | 'revoked';
  approvedSections: string[];
  approvedByUserId: string | null;
}

export interface EducationContentItem {
  id: string;
  type: 'article' | 'video';
  title: string;
  topic: string;
  transactionStage: string;
  form: string | null;
  section: string | null;
  clientRole: 'buyer' | 'seller' | 'both';
  jurisdiction: string | null;
  approvalStatus: 'draft' | 'approved' | 'retired';
  reviewerUserId: string | null;
}

export interface EducationVideo extends EducationContentItem {
  type: 'video';
  durationSeconds: number;
  captioned: boolean;
  transcriptAvailable: boolean;
}

export interface SigningExplanationCitation {
  id: string;
  sourceType: 'client_visible_document' | 'education_article' | 'education_video';
  sourceId: string;
  sourceTitle: string;
  sectionReference: string | null;
}

export interface ClientAIAnswer {
  id: string;
  questionId: string;
  answer: string;
  citations: SigningExplanationCitation[];
  reviewStatus: 'pending_agent_review' | 'approved' | 'withheld';
  includesProfessionalAdvice: false;
}

export interface ClientQuestion {
  id: string;
  accessId: string;
  question: string;
  askedAt: string;
  status: 'queued' | 'answered' | 'escalated_to_agent';
  answer: ClientAIAnswer | null;
}

export interface SigningExplanationSession {
  id: string;
  signaturePacketId: string;
  clientPortalAccessId: string;
  visibleDocumentIds: string[];
  recommendedEducationIds: string[];
  startedAt: string;
  status: 'not_started' | 'available' | 'completed' | 'revoked';
}

export type EducationTopic = 'offer_basics' | 'earnest_money' | 'due_diligence' | 'seller_disclosures' | 'inspection_objection' | 'financing_appraisal' | 'title_escrow' | 'settlement_closing' | 'signing_documents' | 'next_steps';
export type TransactionStage = 'offer_drafted' | 'offer_signed' | 'offer_submitted' | 'offer_accepted' | 'earnest_money' | 'seller_disclosures' | 'due_diligence' | 'inspection_objection' | 'appraisal' | 'loan_approval' | 'settlement' | 'closing';
export type ContentGovernanceStatus = 'draft' | 'approved' | 'retired';
export type ClientFactVisibility = 'approved_for_client' | 'internal_only' | 'needs_agent_review' | 'revoked';
export type TranslationReviewStatus = 'not_requested' | 'draft' | 'review_required' | 'approved';

export interface AccordGuideContentItem {
  id: string;
  type: 'article' | 'video' | 'inline_explanation';
  title: string;
  topic: EducationTopic;
  formDocument: string | null;
  contractSection: string | null;
  jurisdiction: string;
  clientRole: 'buyer' | 'seller';
  transactionStages: TransactionStage[];
  visibility: 'client_visible' | 'agent_only';
  summary: string;
  transcript: string | null;
  relatedFaqs: string[];
  sourceCitation: string;
  status: ContentGovernanceStatus;
  reviewerUserId: string | null;
  reviewedAt: string | null;
  complianceNotes: string;
  version: string;
  replacementContentId: string | null;
  language: string;
  locale: string;
  translatedTitle: string | null;
  translatedTranscript: string | null;
  translatedCaptions: string | null;
  translationReviewStatus: TranslationReviewStatus;
}

export interface AccordGuideVideo extends AccordGuideContentItem { type: 'video'; durationSeconds: number; captioned: boolean; }
export interface AnswerCitation { id: string; sourceType: 'contract_section' | 'client_visible_fact' | 'guide_content'; sourceId: string; label: string; sectionReference: string | null; }
export interface PersonalizedAnswer { id: string; questionId: string; generalExplanation: string; transactionSpecificDetail: string; citations: AnswerCitation[]; status: 'ready' | 'agent_review_required' | 'withheld'; escalationReason: string | null; }
export interface ClientVisibleFact { id: string; transactionId: string; fieldPath: string; label: string; valuePreview: string; visibility: ClientFactVisibility; sourceReference: string; approvedByUserId: string | null; approvedAt: string | null; revokedAt: string | null; }
export interface ClientPortalPermission { id: string; accessId: string; resourceType: 'fact' | 'document' | 'timeline_event' | 'guide_content'; resourceId: string; allowed: boolean; grantedByUserId: string | null; grantedAt: string | null; }
export interface AgentReviewQueueItem { id: string; clientQuestionId: string; transactionId: string; question: string; proposedAnswer: string | null; reason: 'judgment_request' | 'legal_interpretation' | 'low_confidence' | 'negotiation_strategy' | 'conflicting_data' | 'optional_review'; status: 'pending' | 'approved' | 'edited' | 'answered_by_agent'; }
export interface EducationUnlockRule { id: string; contentId: string; stages: TransactionStage[]; clientRoles: Array<'buyer' | 'seller'>; requiredForms: string[]; deadlineWindowDays: number | null; signatureStatuses: string[]; questionTopics: EducationTopic[]; }
export interface ContractSectionExplanation { id: string; documentId: string; section: string; title: string; plainEnglishExplanation: string; personalizedDetail: string; contentId: string; citation: AnswerCitation; }
export interface InlineHelpMarker { id: string; documentId: string; sectionExplanationId: string; label: string; positionHint: string; }
export interface AccordGuideAnalyticsPlaceholder { videosViewed: number; questionsAsked: number; sectionsClicked: number; unansweredQuestions: number; agentEscalations: number; confusionTopics: string[]; }

export const mockGuideVideos: AccordGuideVideo[] = [
  { id:'guide-video-earnest',type:'video',title:'Earnest Money in 90 Seconds',topic:'earnest_money',formDocument:'Utah REPC',contractSection:'Section 3',jurisdiction:'UT',clientRole:'buyer',transactionStages:['offer_accepted','earnest_money'],visibility:'client_visible',summary:'What earnest money is, when it is due, and why the deadline matters.',transcript:'A short approved mock transcript.',relatedFaqs:['Is earnest money refundable?','Who holds the funds?'],sourceCitation:'Accord Guide editorial source · Utah REPC Section 3',status:'approved',reviewerUserId:'user-broker-admin',reviewedAt:'2026-06-20',complianceNotes:'Educational only; do not characterize refund rights.',version:'1.2',replacementContentId:null,language:'en',locale:'en-US',translatedTitle:null,translatedTranscript:null,translatedCaptions:null,translationReviewStatus:'not_requested',durationSeconds:90,captioned:true },
  { id:'guide-video-due-diligence',type:'video',title:'What Due Diligence Means',topic:'due_diligence',formDocument:'Utah REPC',contractSection:'Section 8',jurisdiction:'UT',clientRole:'buyer',transactionStages:['due_diligence','inspection_objection'],visibility:'client_visible',summary:'How the due diligence period fits into the transaction roadmap.',transcript:'A short approved mock transcript.',relatedFaqs:['What inspections can I order?','When does the period end?'],sourceCitation:'Accord Guide editorial source · Utah REPC Section 8',status:'approved',reviewerUserId:'user-broker-admin',reviewedAt:'2026-06-18',complianceNotes:'Do not recommend inspections or advise cancellation.',version:'1.1',replacementContentId:null,language:'en',locale:'en-US',translatedTitle:null,translatedTranscript:null,translatedCaptions:null,translationReviewStatus:'not_requested',durationSeconds:138,captioned:true },
  { id:'guide-video-settlement',type:'video',title:'Understanding Settlement',topic:'settlement_closing',formDocument:'Utah REPC',contractSection:'Section 24',jurisdiction:'UT',clientRole:'buyer',transactionStages:['settlement','closing'],visibility:'client_visible',summary:'What settlement means and what typically happens next.',transcript:'A short approved mock transcript.',relatedFaqs:['When do I get keys?'],sourceCitation:'Accord Guide editorial source · Utah REPC Section 24',status:'approved',reviewerUserId:'user-broker-admin',reviewedAt:'2026-06-14',complianceNotes:'Keep settlement and closing distinctions jurisdiction-specific.',version:'1.0',replacementContentId:null,language:'en',locale:'en-US',translatedTitle:null,translatedTranscript:null,translatedCaptions:null,translationReviewStatus:'not_requested',durationSeconds:112,captioned:true },
  { id:'guide-video-signing',type:'video',title:'What Happens After Signing?',topic:'signing_documents',formDocument:'Signature Package',contractSection:null,jurisdiction:'UT',clientRole:'buyer',transactionStages:['offer_signed','offer_submitted'],visibility:'client_visible',summary:'The reviewed steps between signatures, submission, and response.',transcript:'A short approved mock transcript.',relatedFaqs:['Has my offer been submitted?'],sourceCitation:'Accord Guide approved workflow content',status:'approved',reviewerUserId:'user-broker-admin',reviewedAt:'2026-06-21',complianceNotes:'Do not predict seller response.',version:'1.0',replacementContentId:null,language:'en',locale:'en-US',translatedTitle:null,translatedTranscript:null,translatedCaptions:null,translationReviewStatus:'not_requested',durationSeconds:104,captioned:true },
  { id:'guide-video-disclosures',type:'video',title:'Seller Disclosures Explained',topic:'seller_disclosures',formDocument:'Seller Property Condition Disclosure',contractSection:null,jurisdiction:'UT',clientRole:'buyer',transactionStages:['seller_disclosures','due_diligence'],visibility:'client_visible',summary:'How disclosures support the buyer review process.',transcript:'A short approved mock transcript.',relatedFaqs:['What should I look for?'],sourceCitation:'Accord Guide approved Utah disclosure content',status:'approved',reviewerUserId:'user-broker-admin',reviewedAt:'2026-06-12',complianceNotes:'Do not provide inspection advice.',version:'1.0',replacementContentId:null,language:'en',locale:'en-US',translatedTitle:null,translatedTranscript:null,translatedCaptions:null,translationReviewStatus:'not_requested',durationSeconds:126,captioned:true }
];

export const mockClientVisibleFacts: ClientVisibleFact[] = [
 {id:'fact-price',transactionId:'txn-demo',fieldPath:'purchase.price',label:'Purchase price',valuePreview:'$875,000',visibility:'approved_for_client',sourceReference:'Utah REPC Section 2',approvedByUserId:'user-calvin',approvedAt:'2026-07-05T15:00:00Z',revokedAt:null},
 {id:'fact-earnest',transactionId:'txn-demo',fieldPath:'earnest_money.amount',label:'Earnest money',valuePreview:'$7,500 · due July 7 · held by Red Rock Title',visibility:'approved_for_client',sourceReference:'Utah REPC Section 3',approvedByUserId:'user-calvin',approvedAt:'2026-07-05T15:00:00Z',revokedAt:null},
 {id:'fact-strategy',transactionId:'txn-demo',fieldPath:'internal.negotiation_strategy',label:'Negotiation strategy',valuePreview:'Internal note',visibility:'internal_only',sourceReference:'Agent note',approvedByUserId:null,approvedAt:null,revokedAt:null},
 {id:'fact-settlement',transactionId:'txn-demo',fieldPath:'settlement.deadline',label:'Settlement deadline',valuePreview:'July 31, 2026',visibility:'needs_agent_review',sourceReference:'Draft REPC Section 24',approvedByUserId:null,approvedAt:null,revokedAt:null}
];

export const mockEducationVideos: EducationVideo[] = [
  { id: 'video-earnest-money', type: 'video', title: 'Earnest money in plain English', topic: 'earnest_money', transactionStage: 'offer', form: 'Utah REPC', section: 'Section 3', clientRole: 'buyer', jurisdiction: 'UT', approvalStatus: 'approved', reviewerUserId: 'user-broker-admin', durationSeconds: 112, captioned: true, transcriptAvailable: true },
  { id: 'video-due-diligence', type: 'video', title: 'Your due diligence window', topic: 'due_diligence', transactionStage: 'under_contract', form: 'Utah REPC', section: 'Section 8', clientRole: 'both', jurisdiction: 'UT', approvalStatus: 'approved', reviewerUserId: 'user-broker-admin', durationSeconds: 146, captioned: true, transcriptAvailable: true }
];

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

export const mockEducationVideos: EducationVideo[] = [
  { id: 'video-earnest-money', type: 'video', title: 'Earnest money in plain English', topic: 'earnest_money', transactionStage: 'offer', form: 'Utah REPC', section: 'Section 3', clientRole: 'buyer', jurisdiction: 'UT', approvalStatus: 'approved', reviewerUserId: 'user-broker-admin', durationSeconds: 112, captioned: true, transcriptAvailable: true },
  { id: 'video-due-diligence', type: 'video', title: 'Your due diligence window', topic: 'due_diligence', transactionStage: 'under_contract', form: 'Utah REPC', section: 'Section 8', clientRole: 'both', jurisdiction: 'UT', approvalStatus: 'approved', reviewerUserId: 'user-broker-admin', durationSeconds: 146, captioned: true, transcriptAvailable: true }
];

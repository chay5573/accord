import type { AccordGuideContentItem, AccordGuideVideo, AgentReviewQueueItem, ClientAIAnswer, ClientPortalAccess, ClientQuestion, ClientVisibleDocument, ClientVisibleFact, ContractSectionExplanation, EducationContentItem, PersonalizedAnswer, TransactionStage } from './clientEducation';
import type { CompletedSignedDocument, ESignatureConnection, ESignatureProviderType, SignatureAuditEntry, SignatureEvent, SignaturePacket, SignatureStatus } from './eSignature';
import type { InboxAttachment, InboxAuditEntry, InboxConnection, InboxMessageSignal, InboxProviderType, MessageClassification, MonitoredMailboxScope } from './inbox';
import type { TeachAccordRule, TeachAccordRuleScope, TeachAccordRuleStatus } from './teachAccord';
import type { FieldProvenance, LearnedPattern, SensitiveDataFinding, TransactionCase, TransactionMemoryAuditEntry } from './transactionMemory';

/**
 * Provider interfaces keep Accord portable.
 * Supabase is the MVP implementation, but the app should depend on these
 * contracts rather than Supabase directly so auth/storage/db can later move to
 * AWS Cognito, S3, RDS/Aurora Postgres, or a custom backend.
 */

export type ProviderName = 'supabase' | 'aws' | 'custom';

export type UserRole =
  | 'brokerage_admin'
  | 'team_admin'
  | 'agent'
  | 'transaction_coordinator'
  | 'broker_reviewer'
  | 'client_guest'
  | 'lender_guest'
  | 'title_guest'
  | 'readonly_guest';

export interface AuthUser {
  id: string;
  email: string;
  displayName?: string;
  brokerageId?: string;
  teamId?: string;
  roles: UserRole[];
}

export interface AuthProvider {
  provider: ProviderName;
  getCurrentUser(): Promise<AuthUser | null>;
  signInWithEmail(email: string, password: string): Promise<AuthUser>;
  signOut(): Promise<void>;
}

export interface StorageObject {
  bucket: string;
  path: string;
  contentType?: string;
  sizeBytes?: number;
}

export interface StorageProvider {
  provider: ProviderName;
  uploadObject(input: {
    bucket: string;
    path: string;
    file: File | Blob | Buffer;
    contentType?: string;
    metadata?: Record<string, string>;
  }): Promise<StorageObject>;
  getSignedUrl(input: { bucket: string; path: string; expiresInSeconds?: number }): Promise<string>;
  deleteObject(input: { bucket: string; path: string }): Promise<void>;
}

export interface LocalFileExportProvider {
  provider: 'local_export';
  prepareExport(input: { workspaceId: string; transactionId: string; requestedByUserId: string; folderNamingConvention: string }): Promise<{ exportId: string; suggestedFolderName: string; fileCount: number }>;
  downloadExport(input: { exportId: string; requestedByUserId: string }): Promise<StorageObject>;
  getDesktopCompanionStatus(input: { workspaceId: string }): Promise<'not_installed' | 'available' | 'not_supported'>;
}

export interface AuditEventInput {
  actorUserId: string;
  brokerageId?: string;
  teamId?: string;
  transactionId?: string;
  eventType: string;
  eventSummary: string;
  metadata?: Record<string, unknown>;
}

export interface AuditProvider {
  provider: ProviderName;
  recordEvent(input: AuditEventInput): Promise<void>;
}

export interface AiExtractionProvider {
  provider: ProviderName | 'openai' | 'anthropic';
  extractDealTerms(input: { transcript: string; officeProfileId?: string; state: string }): Promise<unknown>;
}

export interface PdfGenerationProvider {
  provider: ProviderName | 'pdf-lib' | 'custom';
  generatePackage(input: { transactionId: string; formTemplateIds: string[] }): Promise<StorageObject[]>;
}

export interface VerifiedLookupRequest {
  transactionId: string;
  fieldPath: string;
  query: Record<string, string>;
  approvedByUserId: string;
  approvedAt: string;
}

export interface VerifiedLookupResult {
  fieldPath: string;
  value: unknown;
  sourceName: string;
  sourceType: 'county_recorder' | 'county_assessor' | 'mls' | 'public_listing' | 'brokerage_record' | 'uploaded_file';
  sourceReference: string;
  retrievedAt: string;
  confidence: number | null;
}

export interface VerifiedLookupProvider {
  provider: ProviderName | 'county' | 'mls' | 'records';
  lookup(input: VerifiedLookupRequest): Promise<VerifiedLookupResult[]>;
}

export interface TransactionMemoryProvider {
  provider: ProviderName;
  listTrainingCases(input: { workspaceId: string; status?: TransactionCase['status'] }): Promise<TransactionCase[]>;
  importTransactionCase(input: { workspaceId: string; sourceReference: string; requestedByUserId: string }): Promise<TransactionCase>;
  analyzeTransactionCase(input: { caseId: string; requestedByUserId: string }): Promise<TransactionCase>;
  redactTransactionCase(input: { caseId: string; policyVersion: string; requestedByUserId: string }): Promise<TransactionCase>;
  approveForTraining(input: { caseId: string; approvedByUserId: string; consentReference: string }): Promise<TransactionCase>;
  removeFromTraining(input: { caseId: string; removedByUserId: string; reason: string }): Promise<void>;
  getFieldProvenance(input: { caseId: string; fieldPath?: string }): Promise<FieldProvenance[]>;
  compareDocumentVersions(input: { caseId: string; leftVersionId: string; rightVersionId: string }): Promise<unknown>;
  buildOfficePatternSummary(input: { workspaceId: string; approvedCaseIds: string[]; requestedByUserId: string }): Promise<LearnedPattern[]>;
  listSensitiveDataFindings(input: { caseId: string; requestedByUserId: string }): Promise<SensitiveDataFinding[]>;
  getTrainingAuditTrail(input: { caseId: string; requestedByUserId: string }): Promise<TransactionMemoryAuditEntry[]>;
}

export interface ESignatureProvider {
  provider: ESignatureProviderType;
  listProviders(input: { workspaceId: string }): Promise<ESignatureProviderType[]>;
  getProviderConnectionStatus(input: { workspaceId: string }): Promise<ESignatureConnection>;
  connectProvider(input: { workspaceId: string; requestedByUserId: string; redirectUri: string }): Promise<{ authorizationUrl: string }>;
  disconnectProvider(input: { workspaceId: string; requestedByUserId: string }): Promise<void>;
  createSignaturePacket(input: { transactionId: string | null; draftPackageId: string; requestedByUserId: string }): Promise<SignaturePacket>;
  openProviderReview(input: { signaturePacketId: string; requestedByUserId: string }): Promise<{ reviewUrl: string }>;
  sendSignaturePacket(input: { signaturePacketId: string; approvedByUserId: string }): Promise<SignaturePacket>;
  getSignatureStatus(input: { signaturePacketId: string }): Promise<SignatureStatus>;
  handleSignatureWebhook(input: { rawBody: string; headers: Record<string, string> }): Promise<void>;
  importCompletedDocuments(input: { signaturePacketId: string; requestedByUserId: string }): Promise<CompletedSignedDocument[]>;
  voidSignaturePacket(input: { signaturePacketId: string; requestedByUserId: string; reason: string }): Promise<SignaturePacket>;
  getAuditTrail(input: { signaturePacketId: string; requestedByUserId: string }): Promise<SignatureAuditEntry[]>;
  listSignaturePackets(input: { workspaceId: string; status?: SignatureStatus }): Promise<SignaturePacket[]>;
  syncSignatureEvents(input: { workspaceId: string; requestedByUserId: string }): Promise<SignatureEvent[]>;
  classifySignatureSignal(input: { event: SignatureEvent }): Promise<{ classification: string; confidence: number }>;
  linkSignaturePacketToOpportunity(input: { signaturePacketId: string; opportunityId: string; approvedByUserId: string }): Promise<SignaturePacket>;
}

export interface InboxProvider {
  provider: InboxProviderType;
  listProviders(input: { workspaceId: string }): Promise<InboxProviderType[]>;
  getConnectionStatus(input: { workspaceId: string }): Promise<InboxConnection>;
  connectInbox(input: { workspaceId: string; requestedByUserId: string; redirectUri: string }): Promise<{ authorizationUrl: string }>;
  disconnectInbox(input: { workspaceId: string; requestedByUserId: string }): Promise<void>;
  listMonitoredFolders(input: { connectionId: string; requestedByUserId: string }): Promise<MonitoredMailboxScope[]>;
  updateMonitoredFolders(input: { connectionId: string; scopes: MonitoredMailboxScope[]; requestedByUserId: string }): Promise<MonitoredMailboxScope[]>;
  searchMessages(input: { connectionId: string; query: string; requestedByUserId: string }): Promise<InboxMessageSignal[]>;
  getMessage(input: { connectionId: string; messageReference: string; requestedByUserId: string }): Promise<InboxMessageSignal>;
  listAttachments(input: { connectionId: string; messageReference: string; requestedByUserId: string }): Promise<InboxAttachment[]>;
  importAttachment(input: { attachmentId: string; opportunityId: string; approvedByUserId: string }): Promise<InboxAttachment>;
  classifyMessageSignal(input: { messageReference: string; requestedByUserId: string }): Promise<{ classification: MessageClassification; confidence: number }>;
  linkMessageToOpportunity(input: { messageReference: string; opportunityId: string; approvedByUserId: string }): Promise<InboxMessageSignal>;
  getInboxAuditTrail(input: { connectionId: string; requestedByUserId: string }): Promise<InboxAuditEntry[]>;
}

export interface ClientEducationProvider {
  provider: ProviderName;
  listClientVisibleDocuments(input: { accessId: string; requestedByPersonId: string }): Promise<ClientVisibleDocument[]>;
  askClientQuestion(input: { accessId: string; question: string; requestedByPersonId: string }): Promise<ClientAIAnswer>;
  getEducationRecommendations(input: { accessId: string; question?: string; requestedByPersonId: string }): Promise<EducationContentItem[]>;
  listEducationContent(input: { workspaceId: string; requestedByUserId: string }): Promise<EducationContentItem[]>;
  logClientQuestion(input: { question: ClientQuestion }): Promise<void>;
  approveClientVisibleDocument(input: { accessId: string; documentId: string; approvedByUserId: string }): Promise<ClientVisibleDocument>;
  revokeClientPortalAccess(input: { accessId: string; revokedByUserId: string; reason: string }): Promise<ClientPortalAccess>;
  getContentForTransactionStage(input: { transactionId: string; stage: TransactionStage; clientPersonId: string }): Promise<AccordGuideContentItem[]>;
  getInlineContractExplanation(input: { accessId: string; documentId: string; section: string }): Promise<ContractSectionExplanation>;
  answerClientQuestion(input: { accessId: string; question: string }): Promise<PersonalizedAnswer>;
  getPersonalizedAnswer(input: { questionId: string; requestedByUserId: string }): Promise<PersonalizedAnswer>;
  recommendVideos(input: { accessId: string; stage: TransactionStage; question?: string }): Promise<AccordGuideVideo[]>;
  queueAnswerForAgentReview(input: { answer: PersonalizedAnswer; reason: AgentReviewQueueItem['reason'] }): Promise<AgentReviewQueueItem>;
  approveClientVisibleFact(input: { factId: string; approvedByUserId: string }): Promise<ClientVisibleFact>;
  revokeClientVisibleFact(input: { factId: string; revokedByUserId: string; reason: string }): Promise<ClientVisibleFact>;
}

export interface TeachAccordProvider {
  provider: ProviderName;
  listRules(input: { workspaceId: string; scope?: TeachAccordRuleScope; status?: TeachAccordRuleStatus }): Promise<TeachAccordRule[]>;
  suggestRule(input: { workspaceId: string; suggestedByUserId: string; rule: Omit<TeachAccordRule, 'id' | 'status' | 'updatedAt'> }): Promise<TeachAccordRule>;
  approveRule(input: { ruleId: string; approvedByUserId: string; scope: TeachAccordRuleScope }): Promise<TeachAccordRule>;
  disableRule(input: { ruleId: string; disabledByUserId: string; reason: string }): Promise<TeachAccordRule>;
  getRuleAuditTrail(input: { ruleId: string; requestedByUserId: string }): Promise<AuditEventInput[]>;
}

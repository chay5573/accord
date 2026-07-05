export type TrainingCaseStatus = 'imported' | 'pending_redaction' | 'pending_approval' | 'approved' | 'excluded';
export type TrainingApprovalStatus = 'not_requested' | 'pending' | 'approved' | 'denied' | 'revoked';
export type RedactionStatus = 'not_started' | 'in_progress' | 'needs_review' | 'approved' | 'failed';
export type SensitiveDataCategory = 'person_name' | 'email' | 'phone' | 'government_id' | 'financial_account' | 'signature' | 'precise_address' | 'freeform_note';
export type ProvenanceSourceType = 'transaction_document' | 'conversation' | 'verified_lookup' | 'brokerage_record' | 'human_entry';

export interface TrainingConsent {
  id: string;
  workspaceId: string;
  authorizedByUserId: string;
  authorityRole: 'agent' | 'team_admin' | 'brokerage_admin' | 'broker_reviewer';
  scope: 'single_case' | 'workspace_cases';
  status: TrainingApprovalStatus;
  authorizedAt: string | null;
  revokedAt: string | null;
  policyVersion: string;
  auditReferences: string[];
}

export interface DocumentVersion {
  id: string;
  sourceFile: string;
  documentType: string;
  versionNumber: number;
  createdAt: string;
  checksum: string;
  transactionRole: 'buyer' | 'seller' | 'listing' | 'closing' | 'compliance';
  approvalStatus: TrainingApprovalStatus;
  redactionStatus: RedactionStatus;
  retentionPolicy: string;
  auditReferences: string[];
}

export interface FieldProvenance {
  id: string;
  extractedField: string;
  valuePreview: string;
  sourceType: ProvenanceSourceType;
  sourceFile: string;
  documentVersionId: string | null;
  authoritativeSource: boolean;
  confidence: number | null;
  reviewerUserId: string | null;
  approvalStatus: TrainingApprovalStatus;
  sourceLocation: string | null;
  auditReferences: string[];
}

export interface LearnedPattern {
  id: string;
  patternType: 'form_selection' | 'field_mapping' | 'office_playbook' | 'timeline' | 'workflow';
  summary: string;
  evidenceCaseIds: string[];
  confidence: number;
  reviewerUserId: string | null;
  approvalStatus: TrainingApprovalStatus;
  scope: 'agent' | 'team' | 'brokerage';
  auditReferences: string[];
}

export interface TransactionTimelineEvent {
  id: string;
  transactionCaseId: string;
  eventType: string;
  occurredAt: string;
  summary: string;
  sourceFile: string | null;
  documentVersionId: string | null;
  authoritativeSource: boolean;
  reviewerUserId: string | null;
  auditReferences: string[];
}

export interface SensitiveDataFinding {
  id: string;
  documentVersionId: string;
  category: SensitiveDataCategory;
  location: string;
  valuePreview: string;
  confidence: number;
  redactionStatus: RedactionStatus;
  reviewerUserId: string | null;
  approvalStatus: TrainingApprovalStatus;
  auditReferences: string[];
}

export interface TransactionMemoryAuditEntry {
  id: string;
  transactionCaseId: string;
  workspaceId: string;
  tenantId: string;
  teamId: string | null;
  brokerageId: string | null;
  actorUserId: string;
  action: 'imported' | 'viewed' | 'analyzed' | 'redacted' | 'approved' | 'excluded' | 'exported' | 'removed' | 'deleted';
  occurredAt: string;
  outcome: 'succeeded' | 'blocked' | 'failed';
  safeSummary: string;
  auditReferences: string[];
}

export interface TransactionCase {
  id: string;
  workspaceId: string;
  title: string;
  transactionRole: 'buyer_agent' | 'seller_agent' | 'limited_agency' | 'other';
  sourceFolder: string;
  status: TrainingCaseStatus;
  approvalStatus: TrainingApprovalStatus;
  redactionStatus: RedactionStatus;
  retentionPolicy: string;
  ownerOrganizationId: string;
  tenantId: string;
  teamId: string | null;
  brokerageId: string | null;
  reviewerUserId: string | null;
  importedAt: string;
  approvedAt: string | null;
  documents: DocumentVersion[];
  fieldProvenance: FieldProvenance[];
  timeline: TransactionTimelineEvent[];
  sensitiveDataFindings: SensitiveDataFinding[];
  learnedPatterns: LearnedPattern[];
  trainingConsent: TrainingConsent | null;
  auditReferences: string[];
}

export const mockTransactionCases: TransactionCase[] = [
  {
    id: 'case-001', workspaceId: 'workspace-red-rock', title: 'Desert Willow buyer purchase', transactionRole: 'buyer_agent', sourceFolder: 'Closed Transactions / 2025 / Desert Willow', status: 'pending_redaction', approvalStatus: 'pending', redactionStatus: 'needs_review', retentionPolicy: 'retain-7-years-training-until-revoked', ownerOrganizationId: 'brokerage-red-rock', tenantId: 'tenant-red-rock', teamId: 'team-red-rock-residential', brokerageId: 'brokerage-red-rock', reviewerUserId: 'user-calvin', importedAt: '2026-07-02T16:20:00Z', approvedAt: null,
    documents: [
      { id: 'doc-001', sourceFile: '01 Agency/Buyer Broker Agreement.pdf', documentType: 'Buyer Broker Agreement', versionNumber: 1, createdAt: '2025-08-02T15:00:00Z', checksum: 'mock-sha256-a1', transactionRole: 'buyer', approvalStatus: 'pending', redactionStatus: 'approved', retentionPolicy: 'case-policy', auditReferences: ['audit-import-001','audit-redact-001'] },
      { id: 'doc-002', sourceFile: '03 Executed/REPC-executed.pdf', documentType: 'Utah REPC', versionNumber: 3, createdAt: '2025-08-11T22:14:00Z', checksum: 'mock-sha256-b2', transactionRole: 'buyer', approvalStatus: 'pending', redactionStatus: 'needs_review', retentionPolicy: 'case-policy', auditReferences: ['audit-import-002'] },
      { id: 'doc-003', sourceFile: '05 Closing/Settlement Statement.pdf', documentType: 'Settlement Statement', versionNumber: 1, createdAt: '2025-09-16T19:32:00Z', checksum: 'mock-sha256-c3', transactionRole: 'closing', approvalStatus: 'pending', redactionStatus: 'in_progress', retentionPolicy: 'case-policy', auditReferences: ['audit-import-003'] }
    ],
    fieldProvenance: [
      { id: 'prov-001', extractedField: 'purchase_price', valuePreview: '$642,000', sourceType: 'transaction_document', sourceFile: '03 Executed/REPC-executed.pdf', documentVersionId: 'doc-002', authoritativeSource: true, confidence: 99, reviewerUserId: 'user-calvin', approvalStatus: 'approved', sourceLocation: 'Section 2.1', auditReferences: ['audit-field-001'] },
      { id: 'prov-002', extractedField: 'settlement_deadline', valuePreview: 'September 15, 2025', sourceType: 'transaction_document', sourceFile: '03 Executed/REPC-executed.pdf', documentVersionId: 'doc-002', authoritativeSource: true, confidence: 98, reviewerUserId: 'user-calvin', approvalStatus: 'approved', sourceLocation: 'Section 24', auditReferences: ['audit-field-002'] },
      { id: 'prov-003', extractedField: 'title_company', valuePreview: 'Redacted Title Co.', sourceType: 'brokerage_record', sourceFile: '05 Closing/Settlement Statement.pdf', documentVersionId: 'doc-003', authoritativeSource: false, confidence: 91, reviewerUserId: null, approvalStatus: 'pending', sourceLocation: 'Page 1', auditReferences: ['audit-field-003'] }
    ],
    timeline: [
      { id: 'event-001', transactionCaseId: 'case-001', eventType: 'offer_executed', occurredAt: '2025-08-11T22:14:00Z', summary: 'Offer executed after one counteroffer.', sourceFile: '03 Executed/REPC-executed.pdf', documentVersionId: 'doc-002', authoritativeSource: true, reviewerUserId: 'user-calvin', auditReferences: ['audit-timeline-001'] },
      { id: 'event-002', transactionCaseId: 'case-001', eventType: 'settlement', occurredAt: '2025-09-15T18:00:00Z', summary: 'Settlement completed.', sourceFile: '05 Closing/Settlement Statement.pdf', documentVersionId: 'doc-003', authoritativeSource: true, reviewerUserId: null, auditReferences: ['audit-timeline-002'] }
    ],
    sensitiveDataFindings: [
      { id: 'finding-001', documentVersionId: 'doc-002', category: 'signature', location: 'Signature page', valuePreview: 'Buyer signature detected', confidence: 99, redactionStatus: 'needs_review', reviewerUserId: null, approvalStatus: 'pending', auditReferences: ['audit-finding-001'] },
      { id: 'finding-002', documentVersionId: 'doc-003', category: 'financial_account', location: 'Page 2, disbursement section', valuePreview: 'Account ending ••4812', confidence: 98, redactionStatus: 'in_progress', reviewerUserId: 'user-calvin', approvalStatus: 'pending', auditReferences: ['audit-finding-002'] },
      { id: 'finding-003', documentVersionId: 'doc-003', category: 'person_name', location: 'Page 1', valuePreview: 'Client names', confidence: 97, redactionStatus: 'approved', reviewerUserId: 'user-calvin', approvalStatus: 'approved', auditReferences: ['audit-finding-003'] }
    ],
    learnedPatterns: [
      { id: 'pattern-001', patternType: 'form_selection', summary: 'Buyer Due Diligence Checklist accompanied the REPC.', evidenceCaseIds: ['case-001'], confidence: 92, reviewerUserId: null, approvalStatus: 'pending', scope: 'team', auditReferences: ['audit-pattern-001'] },
      { id: 'pattern-002', patternType: 'timeline', summary: 'Financing deadline was set approximately three weeks after acceptance.', evidenceCaseIds: ['case-001'], confidence: 81, reviewerUserId: null, approvalStatus: 'pending', scope: 'team', auditReferences: ['audit-pattern-002'] }
    ],
    trainingConsent: { id: 'training-consent-001', workspaceId: 'workspace-red-rock', authorizedByUserId: 'user-broker-admin', authorityRole: 'brokerage_admin', scope: 'single_case', status: 'pending', authorizedAt: null, revokedAt: null, policyVersion: 'training-policy-v1-draft', auditReferences: ['audit-consent-001'] },
    auditReferences: ['audit-case-import','audit-case-view']
  },
  { id: 'case-002', workspaceId: 'workspace-red-rock', title: 'Canyon Ridge listing', transactionRole: 'seller_agent', sourceFolder: 'Closed Transactions / 2025 / Canyon Ridge', status: 'approved', approvalStatus: 'approved', redactionStatus: 'approved', retentionPolicy: 'retain-7-years-training-until-revoked', ownerOrganizationId: 'brokerage-red-rock', tenantId: 'tenant-red-rock', teamId: 'team-red-rock-residential', brokerageId: 'brokerage-red-rock', reviewerUserId: 'user-broker-admin', importedAt: '2026-06-26T14:10:00Z', approvedAt: '2026-06-30T17:30:00Z', documents: [], fieldProvenance: [], timeline: [], sensitiveDataFindings: [], learnedPatterns: [], trainingConsent: null, auditReferences: ['audit-case-002'] },
  { id: 'case-003', workspaceId: 'workspace-red-rock', title: 'Juniper Hollow investment purchase', transactionRole: 'buyer_agent', sourceFolder: 'Closed Transactions / 2024 / Juniper Hollow', status: 'excluded', approvalStatus: 'denied', redactionStatus: 'not_started', retentionPolicy: 'archive-only', ownerOrganizationId: 'brokerage-red-rock', tenantId: 'tenant-red-rock', teamId: 'team-red-rock-investments', brokerageId: 'brokerage-red-rock', reviewerUserId: 'user-calvin', importedAt: '2026-06-20T12:00:00Z', approvedAt: null, documents: [], fieldProvenance: [], timeline: [], sensitiveDataFindings: [], learnedPatterns: [], trainingConsent: null, auditReferences: ['audit-case-003'] }
];

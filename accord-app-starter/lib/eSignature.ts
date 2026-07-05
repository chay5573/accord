export type ESignatureProviderType = 'docusign' | 'dotloop' | 'accord_sign' | 'other';
export type SignatureStatus = 'draft' | 'ready_for_provider_review' | 'sent' | 'partially_signed' | 'completed' | 'imported_for_final_review' | 'voided' | 'failed';
export type FinalReviewStatus = 'not_ready' | 'pending' | 'approved' | 'changes_required';

export interface ESignatureConnection {
  id: string;
  provider: ESignatureProviderType;
  status: 'connected' | 'not_connected' | 'coming_later' | 'attention_required';
  workspaceId: string;
  displayName: string;
  permissionSummary: string;
  lastStatusSyncAt: string | null;
}

export interface SignatureRecipient {
  id: string;
  role: 'buyer' | 'seller' | 'agent' | 'broker' | 'other';
  displayName: string;
  emailPreview: string;
  routingOrder: number;
  status: 'pending' | 'sent' | 'viewed' | 'signed' | 'declined';
}

export interface SignatureDocument {
  id: string;
  accordDocumentId: string;
  name: string;
  formVersion: string;
  signerFieldCount: number;
  approvalStatus: 'pending' | 'approved';
}

export interface SignatureEvent {
  id: string;
  signaturePacketId: string;
  type: 'created' | 'provider_review_opened' | 'sent' | 'viewed' | 'signed' | 'completed' | 'imported' | 'voided' | 'error';
  occurredAt: string;
  providerEventId: string | null;
  safeSummary: string;
}

export interface CompletedSignedDocument {
  id: string;
  signaturePacketId: string;
  accordDocumentId: string;
  providerDocumentId: string;
  name: string;
  checksum: string;
  importedAt: string;
  finalReviewStatus: FinalReviewStatus;
}

export interface SignatureAuditEntry {
  id: string;
  signaturePacketId: string;
  actorType: 'user' | 'provider' | 'system';
  actorReference: string;
  action: string;
  occurredAt: string;
  outcome: 'succeeded' | 'blocked' | 'failed';
  correlationId: string;
}

export interface SignaturePacket {
  id: string;
  provider: ESignatureProviderType;
  providerEnvelopeId: string | null;
  providerLoopId: string | null;
  transactionId: string | null;
  draftPackageId: string;
  recipients: SignatureRecipient[];
  documents: SignatureDocument[];
  status: SignatureStatus;
  sentAt: string | null;
  completedAt: string | null;
  importedAt: string | null;
  auditReferences: string[];
  finalReviewStatus: FinalReviewStatus;
}

export const mockESignatureConnections: ESignatureConnection[] = [
  { id: 'esign-docusign', provider: 'docusign', status: 'connected', workspaceId: 'workspace-red-rock', displayName: 'DocuSign', permissionSummary: 'Create envelopes and read completion status', lastStatusSyncAt: '2026-07-05T15:42:00Z' },
  { id: 'esign-dotloop', provider: 'dotloop', status: 'not_connected', workspaceId: 'workspace-red-rock', displayName: 'Dotloop', permissionSummary: 'No permissions granted', lastStatusSyncAt: null },
  { id: 'esign-accord', provider: 'accord_sign', status: 'coming_later', workspaceId: 'workspace-red-rock', displayName: 'Accord Sign', permissionSummary: 'Future provider option', lastStatusSyncAt: null }
];

export const mockSignaturePacket: SignaturePacket = {
  id: 'packet-demo-001', provider: 'docusign', providerEnvelopeId: null, providerLoopId: null, transactionId: 'txn-demo', draftPackageId: 'draft-package-001', status: 'ready_for_provider_review', sentAt: null, completedAt: null, importedAt: null, finalReviewStatus: 'not_ready', auditReferences: ['signature-audit-001'],
  recipients: [
    { id: 'recipient-001', role: 'buyer', displayName: 'Brenton Welker', emailPreview: 'b••••••@example.test', routingOrder: 1, status: 'pending' },
    { id: 'recipient-002', role: 'buyer', displayName: 'Emily Welker', emailPreview: 'e••••••@example.test', routingOrder: 2, status: 'pending' }
  ],
  documents: [
    { id: 'signature-doc-001', accordDocumentId: 'doc-repc-draft', name: 'Utah REPC', formVersion: 'Mock 2025.1', signerFieldCount: 14, approvalStatus: 'approved' },
    { id: 'signature-doc-002', accordDocumentId: 'doc-dd-checklist', name: 'Buyer Due Diligence Checklist', formVersion: 'Mock 2025.1', signerFieldCount: 2, approvalStatus: 'approved' }
  ]
};

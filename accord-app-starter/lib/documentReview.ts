export type DocumentIssueSeverity = 'critical' | 'high' | 'medium' | 'low';

export type DocumentReviewIssueCategory =
  | 'missing_field'
  | 'required_checkbox_not_selected'
  | 'inconsistent_party_name'
  | 'conflicting_date'
  | 'missing_initials_or_signature'
  | 'addendum_reference_mismatch'
  | 'approved_value_mismatch'
  | 'required_document_may_be_missing';

export type DocumentReviewIssueStatus = 'open' | 'dismissed' | 'resolved' | 'correction_prepared';

export interface UploadedDocument {
  id: string;
  name: string;
  mediaType: string;
  sizeBytes: number;
  uploadedAt: string;
  source: 'agent_upload' | 'transaction_coordinator_upload';
}

export interface UploadedPaperworkPackage {
  id: string;
  workspaceId: string;
  transactionId?: string;
  uploadedByUserId: string;
  uploadedAt: string;
  status: 'uploaded' | 'reviewing' | 'review_complete' | 'review_failed';
  documents: UploadedDocument[];
}

export interface DocumentReviewJob {
  id: string;
  packageId: string;
  status: 'queued' | 'reviewing' | 'complete' | 'failed';
  requestedAt: string;
  completedAt?: string;
  issueCount: number;
  providerReference?: string;
}

export interface DocumentFieldComparison {
  id: string;
  approvedFieldPath: string;
  approvedValue: string | null;
  observedValue: string | null;
  matchStatus: 'match' | 'mismatch' | 'missing' | 'not_compared';
  sourceType: 'approved_transaction_data' | 'uploaded_document';
}

export interface DocumentReviewIssue {
  id: string;
  jobId: string;
  category: DocumentReviewIssueCategory;
  documentId: string;
  documentName: string;
  pageNumber?: number;
  section?: string;
  issue: string;
  severity: DocumentIssueSeverity;
  suggestedAction: string;
  status: DocumentReviewIssueStatus;
  comparison?: DocumentFieldComparison;
}

export interface DocumentLocation {
  documentId: string;
  pageNumber?: number;
  section?: string;
  fieldReference?: string;
}

export interface MockUploadedFile {
  name: string;
  mediaType: string;
  sizeBytes: number;
}

export function createMockDocumentReview(files: MockUploadedFile[]): {
  package: UploadedPaperworkPackage;
  job: DocumentReviewJob;
  issues: DocumentReviewIssue[];
} {
  const uploadedAt = '2026-07-21T16:30:00.000Z';
  const documents = files.map((file, index): UploadedDocument => ({
    id: `uploaded-document-${index + 1}`,
    name: file.name,
    mediaType: file.mediaType || 'application/octet-stream',
    sizeBytes: file.sizeBytes,
    uploadedAt,
    source: 'agent_upload'
  }));
  const primaryDocument = documents[0];
  const secondaryDocument = documents[1] ?? primaryDocument;
  const jobId = 'mock-document-review-job-001';
  const issues: DocumentReviewIssue[] = [
    {
      id: 'mock-review-issue-001',
      jobId,
      category: 'inconsistent_party_name',
      documentId: primaryDocument.id,
      documentName: primaryDocument.name,
      pageNumber: 1,
      section: 'Buyer information',
      issue: 'Buyer name differs from the approved transaction record.',
      severity: 'high',
      suggestedAction: 'Confirm the legal name and prepare a correction if needed.',
      status: 'open',
      comparison: {
        id: 'mock-comparison-001',
        approvedFieldPath: 'transaction.buyers[0].legal_name',
        approvedValue: 'Brenton Welker',
        observedValue: 'Brent Welker',
        matchStatus: 'mismatch',
        sourceType: 'uploaded_document'
      }
    },
    {
      id: 'mock-review-issue-002',
      jobId,
      category: 'required_checkbox_not_selected',
      documentId: primaryDocument.id,
      documentName: primaryDocument.name,
      pageNumber: 2,
      section: 'Financing',
      issue: 'A required financing checkbox appears unselected.',
      severity: 'high',
      suggestedAction: 'Review the financing selection against approved terms.',
      status: 'open'
    },
    {
      id: 'mock-review-issue-003',
      jobId,
      category: 'addendum_reference_mismatch',
      documentId: secondaryDocument.id,
      documentName: secondaryDocument.name,
      pageNumber: 1,
      section: 'Addenda',
      issue: 'The package references Addendum No. 2, but the uploaded set does not include it.',
      severity: 'medium',
      suggestedAction: 'Confirm the package contents or update the addendum reference.',
      status: 'open'
    },
    {
      id: 'mock-review-issue-004',
      jobId,
      category: 'missing_initials_or_signature',
      documentId: primaryDocument.id,
      documentName: primaryDocument.name,
      pageNumber: 5,
      section: 'Acknowledgements',
      issue: 'One buyer initials block appears incomplete.',
      severity: 'medium',
      suggestedAction: 'Verify whether initials are required before preparing a correction.',
      status: 'open'
    }
  ];

  return {
    package: {
      id: 'mock-uploaded-paperwork-package-001',
      workspaceId: 'workspace-red-rock-group',
      transactionId: 'transaction-welker-001',
      uploadedByUserId: 'user-calvin-hayward',
      uploadedAt,
      status: 'review_complete',
      documents
    },
    job: {
      id: jobId,
      packageId: 'mock-uploaded-paperwork-package-001',
      status: 'complete',
      requestedAt: uploadedAt,
      completedAt: '2026-07-21T16:30:04.000Z',
      issueCount: issues.length
    },
    issues
  };
}

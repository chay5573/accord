import type { AuditProvider, StorageProvider } from '../providers';
import type { DealTerms } from '../schema';

/**
 * Application service layer.
 * UI should call services/API routes, not provider SDKs directly.
 */
export class TransactionService {
  constructor(
    private readonly storage: StorageProvider,
    private readonly audit: AuditProvider
  ) {}

  async approveDraftTerms(input: {
    actorUserId: string;
    transactionId: string;
    approvedTerms: DealTerms;
  }) {
    await this.audit.recordEvent({
      actorUserId: input.actorUserId,
      transactionId: input.transactionId,
      eventType: 'contract_terms_approved',
      eventSummary: 'Agent approved AI-extracted contract terms.',
      metadata: { approvedTerms: input.approvedTerms }
    });

    return { status: 'approved' as const };
  }

  async saveDraftPackagePlaceholder(input: {
    actorUserId: string;
    transactionId: string;
    file: File | Blob | Buffer;
  }) {
    const saved = await this.storage.uploadObject({
      bucket: 'transaction-files',
      path: `${input.transactionId}/02-draft-offers/draft-package-placeholder.pdf`,
      file: input.file,
      contentType: 'application/pdf',
      metadata: { documentType: 'draft_offer_package' }
    });

    await this.audit.recordEvent({
      actorUserId: input.actorUserId,
      transactionId: input.transactionId,
      eventType: 'draft_package_saved',
      eventSummary: 'Draft offer package saved to Accord Cloud.',
      metadata: { ...saved }
    });

    return saved;
  }
}

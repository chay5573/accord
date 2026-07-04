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

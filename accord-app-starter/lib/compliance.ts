export const DEFAULT_COMPLIANCE_CONTROLS = {
  recordingConsentRequired: true,
  humanApprovalRequiredForContracts: true,
  auditTrailRequired: true,
  roleBasedAccessRequired: true,
  defaultRecordingRetention: 'delete_after_transcription',
  defaultTranscriptRetention: 'keep_with_transaction_file',
  sensitiveDocumentTypes: ['wire_instructions', 'bank_statements', 'drivers_license', 'tax_documents', 'ssn']
};

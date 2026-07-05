import type { CaptureSource, IntegrationProvider } from './opportunity';
export type InboxProviderType = 'gmail' | 'outlook' | 'imap';
export type MessageClassification = 'signed_documents' | 'title_update' | 'lender_update' | 'inspection_report' | 'counteroffer' | 'client_question' | 'missing_document' | 'general_activity';
export interface InboxConnection { id:string; workspaceId:string; provider:InboxProviderType; status:'mock_connected'|'not_connected'|'attention_required'; mailboxPreview:string; lastSyncedAt:string|null; }
export interface MonitoredMailboxScope { id:string; connectionId:string; folderName:string; enabled:boolean; includeAttachments:boolean; }
export interface InboxAttachment { id:string; messageSignalId:string; fileName:string; contentType:string; sizeBytes:number; importStatus:'not_imported'|'mock_imported'|'blocked'; }
export interface InboxMessageSignal { id:string; provider:InboxProviderType; messageReference:string; receivedAt:string; senderPreview:string; subject:string; summary:string; classification:MessageClassification; confidence:number; suggestedOpportunityId:string|null; evidenceStatus:'signal_only'|'agent_confirmed'; attachments:InboxAttachment[]; }
export interface InboxAuditEntry { id:string; connectionId:string; action:'connect'|'view'|'import'|'link'|'unlink'|'delete'|'scope_change'; occurredAt:string; actorUserId:string; outcome:'succeeded'|'blocked'|'failed'; safeSummary:string; }
export const mockInboxSignals: InboxMessageSignal[] = [
 {id:'signal-email-1',provider:'gmail',messageReference:'mock-message-001',receivedAt:'Today, 9:14 AM',senderPreview:'title@••••.test',subject:'Alderann title commitment',summary:'Title email includes a commitment attachment and references the Welker purchase.',classification:'title_update',confidence:91,suggestedOpportunityId:'opp-001',evidenceStatus:'signal_only',attachments:[{id:'att-1',messageSignalId:'signal-email-1',fileName:'Title Commitment.pdf',contentType:'application/pdf',sizeBytes:482000,importStatus:'not_imported'}]},
 {id:'signal-email-2',provider:'outlook',messageReference:'mock-message-002',receivedAt:'Today, 8:47 AM',senderPreview:'lender@••••.test',subject:'Pre-approval updated',summary:'Lender indicates updated pre-approval for the buyers.',classification:'lender_update',confidence:84,suggestedOpportunityId:'opp-001',evidenceStatus:'signal_only',attachments:[]}
];
export interface ActivityInboxItem { id:string; source:CaptureSource; provider:IntegrationProvider; summary:string; confidence:number|null; suggestedMatch:string|null; suggestedAction:string; state:'new'|'needs_review'|'linked'|'dismissed'; }
export const mockActivityInbox: ActivityInboxItem[] = [
 {id:'activity-1',source:'email_signal',provider:'gmail',summary:'Title commitment received for Alderann St.',confidence:91,suggestedMatch:'Welker buyer offer',suggestedAction:'Review attachment and link to opportunity',state:'new'},
 {id:'activity-2',source:'esignature_signal',provider:'docusign',summary:'Welker REPC completed by both buyers.',confidence:99,suggestedMatch:'Welker buyer offer',suggestedAction:'Import for agent final review',state:'needs_review'},
 {id:'activity-3',source:'uploaded_document',provider:'accord_upload',summary:'Inspection report uploaded without a transaction.',confidence:72,suggestedMatch:'Canyon Ridge listing',suggestedAction:'Confirm the suggested opportunity',state:'needs_review'},
 {id:'activity-4',source:'voice_recap',provider:'accord_upload',summary:'Agent recap: seller may counter at $890,000.',confidence:76,suggestedMatch:'Welker buyer offer',suggestedAction:'Review as negotiation signal',state:'new'},
 {id:'activity-5',source:'calendar_signal',provider:'calendar',summary:'Due diligence deadline is two days away.',confidence:100,suggestedMatch:'Welker buyer offer',suggestedAction:'Create reminder task',state:'new'},
 {id:'activity-6',source:'crm_signal',provider:'crm',summary:'New buyer lead mentions Pine Valley search.',confidence:61,suggestedMatch:null,suggestedAction:'Create an unassigned opportunity',state:'new'}
];

export type OpportunityStatus = 'unassigned_capture' | 'reconstructing' | 'draft_ready' | 'needs_agent_answers' | 'signature_pending' | 'signed_ready_for_review' | 'tracked_in_deal_desk' | 'archived';
export type CaptureSource = 'live_recording' | 'phone_listening_mode' | 'pasted_transcript' | 'voice_recap' | 'typed_notes' | 'uploaded_document' | 'email_signal' | 'esignature_signal' | 'calendar_signal' | 'crm_signal';
export type IntegrationProvider = 'gmail' | 'outlook' | 'imap' | 'docusign' | 'dotloop' | 'accord_sign' | 'calendar' | 'crm' | 'accord_upload';
export type IntegrationSyncStatus = 'not_connected' | 'idle' | 'syncing' | 'attention_required' | 'mock_connected';

export interface CaptureInput { id: string; source: CaptureSource; capturedAt: string; summary: string; sourceReference: string | null; consentReference: string | null; }
export interface ActivitySignal { id: string; source: CaptureSource; provider: IntegrationProvider; summary: string; occurredAt: string; confidence: number | null; evidenceStatus: 'signal_only' | 'agent_confirmed' | 'approved_fact'; sourceReference: string | null; }
export interface ReconstructedActivity { id: string; opportunityId: string; signalIds: string[]; summary: string; confidence: number; missingFacts: string[]; reviewedByUserId: string | null; }
export interface OpportunityTimelineEvent { id: string; opportunityId: string; occurredAt: string; eventType: string; title: string; source: CaptureSource; provider: IntegrationProvider | 'accord'; confidence: number | null; linkedReference: string | null; actionNeeded: string | null; clientVisible: boolean; }
export interface MissingFactPrompt { id: string; opportunityId: string; fieldPath: string; question: string; reason: string; requiredBeforeDraft: boolean; status: 'unanswered' | 'answered' | 'unknown'; }
export interface ExternalSystemConnection { id: string; workspaceId: string; provider: IntegrationProvider; status: IntegrationSyncStatus; scopesSummary: string; lastSyncedAt: string | null; }
export interface IntegrationEvent { id: string; provider: IntegrationProvider; externalEventId: string | null; occurredAt: string; type: string; summary: string; opportunityId: string | null; syncStatus: IntegrationSyncStatus; auditReferences: string[]; }
export interface Opportunity { id: string; workspaceId: string; title: string; status: OpportunityStatus; captureInputs: CaptureInput[]; activitySignals: ActivitySignal[]; reconstructedActivity: ReconstructedActivity | null; missingFactPrompts: MissingFactPrompt[]; timeline: OpportunityTimelineEvent[]; suggestedDraft: string | null; transactionId: string | null; }

const timelineRows: Array<[string, string, string, string, CaptureSource, IntegrationProvider | 'accord', number | null, string | null, string | null]> = [
  ['tl-01','2026-07-05T15:05:00Z','conversation_captured','Conversation captured','pasted_transcript','accord',98,'capture-001',null],
  ['tl-02','2026-07-05T15:08:00Z','buyer_identified','Buyer identified','pasted_transcript','accord',96,'capture-001',null],
  ['tl-03','2026-07-05T15:09:00Z','property_identified','Property identified','pasted_transcript','accord',92,'capture-001',null],
  ['tl-04','2026-07-05T15:10:00Z','lookup_suggested','Ownership lookup suggested','pasted_transcript','accord',null,null,'Approve lookup or mark unknown'],
  ['tl-05','2026-07-05T15:12:00Z','form_package_selected','Form package selected','typed_notes','accord',88,'draft-001','Review package'],
  ['tl-06','2026-07-05T15:14:00Z','missing_facts_requested','Missing facts requested','typed_notes','accord',null,null,'Confirm settlement deadline'],
  ['tl-07','2026-07-05T16:03:00Z','draft_generated','Editable draft prepared','typed_notes','accord',94,'draft-001','Agent approval required'],
  ['tl-08','2026-07-05T17:00:00Z','sent_for_signature','Sent for signature','esignature_signal','docusign',100,'packet-demo-001',null],
  ['tl-09','2026-07-05T17:21:00Z','buyer_signed','Buyer signed','esignature_signal','docusign',100,'packet-demo-001',null],
  ['tl-10','2026-07-05T18:06:00Z','seller_signed','Seller signed','esignature_signal','docusign',100,'packet-demo-001',null],
  ['tl-11','2026-07-05T18:08:00Z','signed_documents_imported','Signed documents imported','esignature_signal','docusign',100,'signed-package-001','Agent final review pending'],
  ['tl-12','2026-07-07T16:00:00Z','earnest_money_deadline','Earnest money deadline upcoming','calendar_signal','calendar',100,null,'Confirm deposit status'],
  ['tl-13','2026-07-17T18:00:00Z','inspection_deadline','Inspection deadline upcoming','calendar_signal','calendar',100,null,'Review inspection progress']
];

export const mockOpportunityTimeline: OpportunityTimelineEvent[] = timelineRows.map(([id,occurredAt,eventType,title,source,provider,confidence,linkedReference,actionNeeded]) => ({ id, opportunityId:'opp-001', occurredAt, eventType, title, source, provider, confidence, linkedReference, actionNeeded, clientVisible:false }));

export const mockOpportunity: Opportunity = { id:'opp-001', workspaceId:'workspace-red-rock', title:'Welker buyer offer · Alderann St', status:'needs_agent_answers', transactionId:null, suggestedDraft:'Utah buyer offer package: REPC, Addendum, Buyer Due Diligence Checklist', captureInputs:[{id:'capture-001',source:'typed_notes',capturedAt:'2026-07-05T15:05:00Z',summary:'Buyer offer recap after a phone call.',sourceReference:null,consentReference:null}], activitySignals:[], reconstructedActivity:{id:'reconstruction-001',opportunityId:'opp-001',signalIds:['capture-001'],summary:'Buyer wants to offer $875,000 on 2948 E Alderann St with conventional financing.',confidence:91,missingFacts:['Settlement deadline','Seller legal name'],reviewedByUserId:null}, missingFactPrompts:[{id:'fact-001',opportunityId:'opp-001',fieldPath:'transaction.settlement_deadline',question:'What settlement deadline did you discuss?',reason:'Required before draft approval',requiredBeforeDraft:true,status:'unanswered'},{id:'fact-002',opportunityId:'opp-001',fieldPath:'parties.seller.legal_name',question:'Do you know the seller legal name?',reason:'No authoritative source is attached',requiredBeforeDraft:true,status:'unknown'}], timeline:mockOpportunityTimeline };

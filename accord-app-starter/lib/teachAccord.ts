export type TeachAccordRuleScope = 'personal' | 'team' | 'brokerage';
export type TeachAccordRuleStatus = 'suggested' | 'approved' | 'disabled';
export type TeachAccordRuleCategory =
  | 'title_company'
  | 'deadline_default'
  | 'preferred_form'
  | 'required_disclosure'
  | 'addendum_language'
  | 'file_structure';

export interface TeachAccordRule {
  id: string;
  category: TeachAccordRuleCategory;
  title: string;
  ruleText: string;
  scope: TeachAccordRuleScope;
  status: TeachAccordRuleStatus;
  source: 'agent_suggested' | 'accord_detected_pattern' | 'brokerage_policy';
  reviewer: string | null;
  updatedAt: string;
}

export const mockTeachAccordRules: TeachAccordRule[] = [
  {
    id: 'teach-title-001',
    category: 'title_company',
    title: 'Default title company',
    ruleText: 'Use Red Rock Title as the suggested title company unless the conversation or uploaded file names another provider.',
    scope: 'team',
    status: 'approved',
    source: 'brokerage_policy',
    reviewer: 'Team admin',
    updatedAt: '2026-07-05T10:00:00Z'
  },
  {
    id: 'teach-dd-001',
    category: 'deadline_default',
    title: 'Standard due diligence period',
    ruleText: 'Suggest 10 calendar days for buyer due diligence when no alternate deadline is discussed.',
    scope: 'personal',
    status: 'suggested',
    source: 'accord_detected_pattern',
    reviewer: null,
    updatedAt: '2026-07-05T11:20:00Z'
  },
  {
    id: 'teach-disclosure-001',
    category: 'required_disclosure',
    title: 'Wire fraud disclosure',
    ruleText: 'Include the brokerage wire fraud disclosure in every buyer offer package.',
    scope: 'brokerage',
    status: 'approved',
    source: 'brokerage_policy',
    reviewer: 'Broker reviewer',
    updatedAt: '2026-07-04T14:45:00Z'
  }
];

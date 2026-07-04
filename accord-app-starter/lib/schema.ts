import { z } from 'zod';

export const DealTermsSchema = z.object({
  buyerNames: z.array(z.string()).default([]),
  sellerName: z.string().optional(),
  propertyAddress: z.string().optional(),
  purchasePrice: z.number().optional(),
  earnestMoney: z.number().optional(),
  sellerClosingCostContribution: z.number().optional(),
  dueDiligenceDeadline: z.string().optional(),
  financingAppraisalDeadline: z.string().optional(),
  settlementDeadline: z.string().optional(),
  possession: z.string().optional(),
  homeWarranty: z.object({ included: z.boolean(), maxCost: z.number().optional(), paidBy: z.string().optional() }).optional(),
  financingType: z.enum(['cash','conventional','fha','va','seller-financing','unknown']).default('unknown'),
  subjectToSale: z.boolean().default(false),
  representation: z.enum(['buyer-agent','seller-agent-unrepresented-buyer','limited-agency','unknown']).default('unknown')
});

export type DealTerms = z.infer<typeof DealTermsSchema>;

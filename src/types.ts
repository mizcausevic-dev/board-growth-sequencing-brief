export type GrowthSequenceTrack =
  | "AI_PLATFORM"
  | "IDENTITY_SECURITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "PROCUREMENT_TRUST"
  | "PUBLIC_SECTOR";

export type SequenceAction = "ACCELERATE" | "STAGE" | "DEFER" | "ESCALATE";

export interface BoardGrowthSequencingItem {
  id: string;
  owner: string;
  audience: string;
  track: GrowthSequenceTrack;
  action: SequenceAction;
  sequencingTheme: string;
  boardQuestion: string;
  currentPosture: string;
  requiredProof: string;
  dependencyReadinessScore: number;
  executionConfidenceScore: number;
  marketTimingScore: number;
  operatorReadinessScore: number;
  downsideContainmentScore: number;
  valueAtStakeMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
  companyTags: string[];
  relatedSurfaces: string[];
  requiredEvidence: string[];
}

export interface BoardGrowthSequencingExport {
  generatedAt: string;
  items: BoardGrowthSequencingItem[];
}

export type FindingCode =
  | "accelerate-ready"
  | "dependency-gap"
  | "execution-gap"
  | "timing-gap"
  | "escalation-needed";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  track: GrowthSequenceTrack;
  audience: string;
  message: string;
}

export interface BoardGrowthSequencingReport {
  generatedAt: string;
  items: number;
  averageDependencyReadinessScore: number;
  averageExecutionConfidenceScore: number;
  averageMarketTimingScore: number;
  averageOperatorReadinessScore: number;
  averageDownsideContainmentScore: number;
  accelerateReadyLanes: number;
  escalatedLanes: number;
  valueAtStakeMillions: number;
  findingsList: Finding[];
  ok: boolean;
}

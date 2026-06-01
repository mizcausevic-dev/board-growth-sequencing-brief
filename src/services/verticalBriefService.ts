import { analyze } from "../analyze.js";
import { sampleBoardGrowthSequencingBrief } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardGrowthSequencingBrief, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averageDependencyReadinessScore: report.averageDependencyReadinessScore,
    averageExecutionConfidenceScore: report.averageExecutionConfidenceScore,
    averageMarketTimingScore: report.averageMarketTimingScore,
    averageOperatorReadinessScore: report.averageOperatorReadinessScore,
    averageDownsideContainmentScore: report.averageDownsideContainmentScore,
    accelerateReadyLanes: report.accelerateReadyLanes,
    escalatedLanes: report.escalatedLanes,
    valueAtStakeMillions: report.valueAtStakeMillions,
    highFindings,
    recommendation:
      "Accelerate AI and procurement, stage identity and biotech in phases, defer the next revenue-system rebuild, and escalate fragmented FinTech sequencing before another board ask."
  };
}

export function sequencingLane() {
  return sampleBoardGrowthSequencingBrief.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    action: item.action,
    sequencingTheme: item.sequencingTheme,
    dependencyReadinessScore: item.dependencyReadinessScore,
    nextMove: item.nextMove
  }));
}

export function dependencyOrder() {
  return sampleBoardGrowthSequencingBrief.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    dependencyReadinessScore: item.dependencyReadinessScore,
    executionConfidenceScore: item.executionConfidenceScore,
    operatorReadinessScore: item.operatorReadinessScore,
    requiredEvidence: item.requiredEvidence
  }));
}

export function marketEntryTiming() {
  return sampleBoardGrowthSequencingBrief.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    action: item.action,
    valueAtStakeMillions: item.valueAtStakeMillions,
    marketTimingScore: item.marketTimingScore,
    companyTags: item.companyTags
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return [...report.findingsList].sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic growth-sequencing data only - no live board packets, budgets, or actual market-entry plans are included.",
    "Dependency-readiness, execution-confidence, market-timing, operator-readiness, downside-containment, and value-at-stake metrics are modeled from the sample executive-intelligence estate in this repo.",
    "This surface is read-only and shows how Kinetic Gain can package board-readable growth sequencing into one decision layer.",
    "Company tags and track labels are synthetic design aids rather than audited market or financial signals.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    sequencingLane: sequencingLane(),
    dependencyOrder: dependencyOrder(),
    marketEntryTiming: marketEntryTiming(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardGrowthSequencingBrief
  };
}

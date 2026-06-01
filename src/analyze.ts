import type {
  BoardGrowthSequencingExport,
  BoardGrowthSequencingItem,
  BoardGrowthSequencingReport,
  Finding
} from "./types.js";

function average(items: BoardGrowthSequencingItem[], pick: (item: BoardGrowthSequencingItem) => number) {
  return Math.round(items.reduce((sum, item) => sum + pick(item), 0) / items.length);
}

function evaluate(item: BoardGrowthSequencingItem): Finding[] {
  const findings: Finding[] = [];

  if (
    item.action === "ACCELERATE" &&
    item.dependencyReadinessScore >= 78 &&
    item.executionConfidenceScore >= 76 &&
    item.marketTimingScore >= 74
  ) {
    findings.push({
      code: "accelerate-ready",
      severity: "info",
      track: item.track,
      audience: item.audience,
      message: "This lane is ready for the next board-approved growth motion without widening sequencing risk."
    });
  }

  if (item.dependencyReadinessScore <= 61) {
    findings.push({
      code: "dependency-gap",
      severity: item.dependencyReadinessScore <= 50 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Critical dependencies are still too weak to sequence this lane into the next growth phase."
    });
  }

  if (item.executionConfidenceScore <= 63) {
    findings.push({
      code: "execution-gap",
      severity: item.executionConfidenceScore <= 52 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Execution confidence is still too thin to accelerate this lane without creating avoidable board risk."
    });
  }

  if (item.marketTimingScore <= 60) {
    findings.push({
      code: "timing-gap",
      severity: item.marketTimingScore <= 48 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Market timing is still too weak to support a clean growth-sequencing recommendation."
    });
  }

  if (item.action === "ESCALATE") {
    findings.push({
      code: "escalation-needed",
      severity: "high",
      track: item.track,
      audience: item.audience,
      message: "This lane needs executive escalation before another sequencing claim reaches the board."
    });
  }

  return findings;
}

export function analyze(items: BoardGrowthSequencingItem[], options: { now?: string } = {}): BoardGrowthSequencingReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap((item) => evaluate(item));
  const accelerateReadyLanes = items.filter((item) => item.action === "ACCELERATE").length;
  const escalatedLanes = items.filter((item) => item.action === "ESCALATE").length;
  const valueAtStakeMillions = Math.round(items.reduce((sum, item) => sum + item.valueAtStakeMillions, 0));

  return {
    generatedAt,
    items: items.length,
    averageDependencyReadinessScore: average(items, (item) => item.dependencyReadinessScore),
    averageExecutionConfidenceScore: average(items, (item) => item.executionConfidenceScore),
    averageMarketTimingScore: average(items, (item) => item.marketTimingScore),
    averageOperatorReadinessScore: average(items, (item) => item.operatorReadinessScore),
    averageDownsideContainmentScore: average(items, (item) => item.downsideContainmentScore),
    accelerateReadyLanes,
    escalatedLanes,
    valueAtStakeMillions,
    findingsList,
    ok: findingsList.filter((item) => item.severity === "high").length <= items.length
  };
}

export function toExport(items: BoardGrowthSequencingItem[], now?: string): BoardGrowthSequencingExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}

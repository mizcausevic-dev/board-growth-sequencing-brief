import type { BoardGrowthSequencingReport } from "./types.js";

export function toSummary(report: BoardGrowthSequencingReport) {
  return [
    `Generated: ${report.generatedAt}`,
    `Lanes: ${report.items}`,
    `Dependency readiness: ${report.averageDependencyReadinessScore}`,
    `Execution confidence: ${report.averageExecutionConfidenceScore}`,
    `Market timing: ${report.averageMarketTimingScore}`,
    `Operator readiness: ${report.averageOperatorReadinessScore}`,
    `Downside containment: ${report.averageDownsideContainmentScore}`,
    `Accelerate-ready lanes: ${report.accelerateReadyLanes}`,
    `Escalated lanes: ${report.escalatedLanes}`,
    `Value at stake: $${report.valueAtStakeMillions}M`,
    `High findings: ${report.findingsList.filter((item) => item.severity === "high").length}`,
    `Status: ${report.ok ? "board-safe sequencing packet" : "needs escalation before board use"}`
  ].join("\n");
}

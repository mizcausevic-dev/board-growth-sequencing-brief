import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardGrowthSequencingBrief } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("counts the sample lanes", () => {
    const report = analyze(sampleBoardGrowthSequencingBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.items).toBe(sampleBoardGrowthSequencingBrief.length);
  });

  it("finds accelerate-ready lanes", () => {
    const report = analyze(sampleBoardGrowthSequencingBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.accelerateReadyLanes).toBeGreaterThan(0);
  });

  it("finds escalation pressure", () => {
    const report = analyze(sampleBoardGrowthSequencingBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.escalatedLanes).toBeGreaterThan(0);
  });

  it("keeps a positive value-at-stake total", () => {
    const report = analyze(sampleBoardGrowthSequencingBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.valueAtStakeMillions).toBeGreaterThan(0);
  });

  it("emits timing or dependency findings", () => {
    const report = analyze(sampleBoardGrowthSequencingBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.findingsList.some((item) => item.code === "timing-gap" || item.code === "dependency-gap")).toBe(true);
  });
});

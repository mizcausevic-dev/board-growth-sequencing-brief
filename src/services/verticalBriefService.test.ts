import { describe, expect, it } from "vitest";
import { dependencyOrder, marketEntryTiming, payload, sequencingLane, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the sequencing summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the sequencing lane view", () => {
    expect(sequencingLane().length).toBeGreaterThan(0);
  });

  it("returns the dependency order view", () => {
    expect(dependencyOrder().length).toBeGreaterThan(0);
  });

  it("returns the market entry timing view", () => {
    expect(marketEntryTiming().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns a payload sample", () => {
    expect(payload().sample.length).toBeGreaterThan(0);
  });
});

import { toExport } from "../src/analyze.js";
import { sampleBoardGrowthSequencingBrief } from "../src/data/sampleVerticalBrief.js";
import { writeFileSync } from "node:fs";

const clean = sampleBoardGrowthSequencingBrief.map((item) => ({
  ...item,
  relatedSurfaces: [...item.relatedSurfaces].sort(),
  requiredEvidence: [...item.requiredEvidence].sort(),
  companyTags: [...item.companyTags].sort()
}));

writeFileSync("fixtures/board-growth-sequencing-brief.json", JSON.stringify(toExport(sampleBoardGrowthSequencingBrief), null, 2));
writeFileSync("fixtures/board-growth-sequencing-brief-clean.json", JSON.stringify(toExport(clean), null, 2));

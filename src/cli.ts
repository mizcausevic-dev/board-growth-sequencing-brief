import { readFileSync } from "node:fs";
import { analyze } from "./analyze.js";
import { toSummary } from "./format.js";
import type { BoardGrowthSequencingItem } from "./types.js";

const defaultPath = "fixtures/board-growth-sequencing-brief.json";
const [file = defaultPath, ...rest] = process.argv.slice(2);

if (rest.length < 2 || rest[0] !== "--format" || !["summary", "json"].includes(rest[1])) {
  console.error("Usage: board-growth-sequencing-brief <file> --format <summary|json>");
  process.exit(1);
}

const format = rest[1];

try {
  const items = JSON.parse(readFileSync(file, "utf8")) as { items: BoardGrowthSequencingItem[] };
  const report = analyze(items.items);
  if (format === "summary") {
    console.log(toSummary(report));
  } else {
    console.log(JSON.stringify(report, null, 2));
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

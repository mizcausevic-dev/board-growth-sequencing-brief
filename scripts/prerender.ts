import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  renderDocs,
  renderCapacityMap,
  renderOverview,
  renderDeliveryBottlenecks,
  renderGrowthSequencing,
  renderVerification
} from "../src/services/render.js";
import {
  dependencyOrder,
  marketEntryTiming,
  payload,
  riskMap,
  sequencingLane,
  summary,
  verification
} from "../src/services/verticalBriefService.js";

const root = path.resolve("site");
rmSync(root, { recursive: true, force: true });
mkdirSync(root, { recursive: true });

if (existsSync("CNAME")) {
  writeFileSync(path.join(root, "CNAME"), readFileSync("CNAME", "utf8").trim() + "\n");
}

const htmlRoutes = new Map<string, [string, string]>([
  ["/", ["index.html", renderOverview()]],
  ["/sequencing-lane", ["sequencing-lane/index.html", renderCapacityMap()]],
  ["/dependency-order", ["dependency-order/index.html", renderDeliveryBottlenecks()]],
  ["/market-entry-timing", ["market-entry-timing/index.html", renderGrowthSequencing()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [target, html]] of htmlRoutes) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://sequence.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://sequence.kineticgain.com/</loc></url><url><loc>https://sequence.kineticgain.com/sequencing-lane/</loc></url><url><loc>https://sequence.kineticgain.com/dependency-order/</loc></url><url><loc>https://sequence.kineticgain.com/market-entry-timing/</loc></url><url><loc>https://sequence.kineticgain.com/verification/</loc></url><url><loc>https://sequence.kineticgain.com/docs/</loc></url></urlset>`
);

const api = {
  "api/dashboard/summary.json": summary(),
  "api/sequencing-lane.json": sequencingLane(),
  "api/dependency-order.json": dependencyOrder(),
  "api/market-entry-timing.json": marketEntryTiming(),
  "api/risk-map.json": riskMap(),
  "api/verification.json": verification(),
  "api/sample.json": payload().sample,
  "api/payload.json": payload()
};

for (const [target, data] of Object.entries(api)) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}

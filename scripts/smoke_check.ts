import { createServer } from "node:http";
import { AddressInfo } from "node:net";
import { createApp } from "../src/app.js";

async function requestRoute(base: string, route: string) {
  const response = await fetch(base + route);
  if (!response.ok) {
    throw new Error(`Expected ${route} to return 200, got ${response.status}`);
  }
  return response;
}

async function main() {
  const server = createServer(createApp());
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const { port } = server.address() as AddressInfo;
  const base = `http://127.0.0.1:${port}`;

  const htmlRoutes = ["/", "/sequencing-lane", "/dependency-order", "/market-entry-timing", "/verification", "/docs"];
  const jsonRoutes = [
    "/api/dashboard/summary",
    "/api/sequencing-lane",
    "/api/dependency-order",
    "/api/market-entry-timing",
    "/api/risk-map",
    "/api/verification",
    "/api/sample",
    "/api/payload"
  ];

  for (const route of htmlRoutes) {
    const response = await requestRoute(base, route);
    if (!response.headers.get("content-type")?.includes("text/html")) {
      throw new Error(`Expected HTML content for ${route}`);
    }
  }

  for (const route of jsonRoutes) {
    const response = await requestRoute(base, route);
    if (!response.headers.get("content-type")?.includes("application/json")) {
      throw new Error(`Expected JSON content for ${route}`);
    }
  }

  server.close();
  console.log("Smoke check passed.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

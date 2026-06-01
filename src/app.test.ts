import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-growth-sequencing-brief app", () => {
  const app = createApp();

  it("serves the overview page", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Board Growth Sequencing Brief");
  });

  it("serves the sequencing lane route", async () => {
    const response = await request(app).get("/sequencing-lane");
    expect(response.status).toBe(200);
  });

  it("serves the dependency order route", async () => {
    const response = await request(app).get("/dependency-order");
    expect(response.status).toBe(200);
  });

  it("serves the market entry timing route", async () => {
    const response = await request(app).get("/market-entry-timing");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.summary).toBeTruthy();
  });
});

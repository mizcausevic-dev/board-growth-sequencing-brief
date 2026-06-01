import {
  dependencyOrder,
  marketEntryTiming,
  payload,
  riskMap,
  sequencingLane,
  summary,
  verification
} from "./verticalBriefService.js";

const productTitle = "Board Growth Sequencing Brief";
const domain = "https://sequence.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/sequencing-lane", "Sequencing lane"],
    ["/dependency-order", "Dependency order"],
    ["/market-entry-timing", "Market-entry timing"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderOverview() {
  const executiveSummary = summary();
  const lanes = sequencingLane().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.owner)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Sequencing theme:</strong> ${escapeHtml(item.sequencingTheme)}</p>
        <p><strong>Dependency readiness:</strong> ${item.dependencyReadinessScore}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map((item) => `<li><strong>${escapeHtml(item.severity.toUpperCase())}</strong> · ${escapeHtml(item.message)}</li>`)
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Growth sequencing</span>
      <h1>Which lanes should accelerate first, which ones should stage or defer, and where should the board force a sequencing decision?</h1>
      <p class="lede">Board Growth Sequencing Brief turns AI, identity, revenue, FinTech, biotech, procurement, and public-sector complexity into one board-readable growth-order packet for leadership and committee rooms.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Sequencing lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled lanes in the current board sequencing packet.</div></div>
        <div class="metric"><span class="metric-label">Dependency readiness</span><span class="metric-value">${executiveSummary.averageDependencyReadinessScore}</span><div class="metric-copy">Average readiness across the dependencies that must land before expansion.</div></div>
        <div class="metric"><span class="metric-label">Accelerate-ready lanes</span><span class="metric-value">${executiveSummary.accelerateReadyLanes}</span><div class="metric-copy">Lanes leadership can move first without widening board risk.</div></div>
        <div class="metric"><span class="metric-label">Value at stake</span><span class="metric-value">$${executiveSummary.valueAtStakeMillions}M</span><div class="metric-copy">Modeled value tied to getting the sequencing order right.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Sequencing lane</h2>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Proof findings</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready surface for growth sequencing, dependency order, timing pressure, and value-at-stake across the executive estate."
  );
}

export function renderCapacityMap() {
  const rows = sequencingLane()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.sequencingTheme)}</td>
        <td>${item.dependencyReadinessScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Sequencing lane",
    "/sequencing-lane",
    `<section class="hero">
      <span class="eyebrow">Sequencing lane</span>
      <h1>Every growth ask stays tied to one audience, one sequencing theme, and one board-safe next move.</h1>
      <p class="lede">The sequencing lane keeps expansion posture readable instead of scattering it across disconnected operating updates and timing assumptions.</p>
      <div class="nav">${navLinks("/sequencing-lane")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Theme</th><th>Dependency readiness</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Growth-sequencing view showing actions, themes, and dependency-readiness strength."
  );
}

export function renderDeliveryBottlenecks() {
  const rows = dependencyOrder()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${item.dependencyReadinessScore}</td>
        <td>${item.executionConfidenceScore}</td>
        <td>${item.operatorReadinessScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Dependency order",
    "/dependency-order",
    `<section class="hero">
      <span class="eyebrow">Dependency order</span>
      <h1>See where dependencies are still weak, execution confidence is still thin, and operator readiness still blocks the next move.</h1>
      <p class="lede">This view makes it obvious which sequencing stories are board-safe and which ones still need more proof before leadership accelerates them.</p>
      <div class="nav">${navLinks("/dependency-order")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Dependency readiness</th><th>Execution confidence</th><th>Operator readiness</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Dependency-order view for readiness, execution proof, and operator-sequencing gaps."
  );
}

export function renderGrowthSequencing() {
  const rows = marketEntryTiming()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>$${item.valueAtStakeMillions}M</td>
        <td>${item.marketTimingScore}</td>
        <td>${escapeHtml(item.companyTags.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Market-entry timing",
    "/market-entry-timing",
    `<section class="hero">
      <span class="eyebrow">Market-entry timing</span>
      <h1>Sequencing decisions, value at stake, and timing strength stay connected to named leaders and operating lanes.</h1>
      <p class="lede">The board needs to see which lanes should move first, which ones should wait, and where timing still weakens the growth story.</p>
      <div class="nav">${navLinks("/market-entry-timing")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Value at stake</th><th>Market timing</th><th>Company tags</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Market-entry timing view for sequencing value, timing strength, and board-safe growth order."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this growth-sequencing packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">This route keeps the synthetic nature, capacity boundaries, and reproducibility notes visible before anyone treats the sample as live board evidence.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
    </section>`,
    "Verification notes for the Board Growth Sequencing Brief sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Growth Sequencing Brief docs</h1>
      <p class="lede">This surface packages board-readable growth sequencing into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/sequencing-lane</code> keeps actions, sequencing themes, and next moves readable.</li>
        <li><code>/dependency-order</code> compares dependency readiness, execution confidence, and operator readiness.</li>
        <li><code>/market-entry-timing</code> shows which named owners should move first and why.</li>
        <li><code>/api/payload</code> exposes the reproducible expansion-capacity packet.</li>
      </ul>
      <pre>${escapeHtml(JSON.stringify(payload(), null, 2))}</pre>
    </section>`,
    "Product documentation for Board Growth Sequencing Brief and its board-ready routes."
  );
}

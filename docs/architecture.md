# Architecture

Board Growth Sequencing Brief is a static-friendly TypeScript executive-intelligence surface for showing which lanes should accelerate first, which ones must stage or defer, and where dependency order still blocks a clean board-level growth decision.

## Routes

- `/`
- `/sequencing-lane`
- `/dependency-order`
- `/market-entry-timing`
- `/verification`
- `/docs`

## Data Flow

1. Sample sequencing items are modeled in `src/data/sampleVerticalBrief.ts`.
2. `src/analyze.ts` scores dependency readiness, execution confidence, market timing, operator readiness, downside containment, and escalation pressure.
3. `src/services/verticalBriefService.ts` shapes the board-readable packet plus the JSON payload routes.
4. `src/services/render.ts` turns those outputs into static-friendly HTML.
5. `scripts/prerender.ts` writes the routes and JSON payloads into `site/`.

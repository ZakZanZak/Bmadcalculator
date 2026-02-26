# Web App Specific Requirements

## Project-Type Overview

Bmadcalculator is a **single-page static web application** — a single HTML file with embedded or co-located CSS and JavaScript, deployable to any static file host (GitHub Pages, Netlify, Vercel, or a plain web server) with zero server-side infrastructure required. There is no routing, no build pipeline required, and no runtime dependencies.

## Technical Architecture Considerations

- **No server required:** All computation happens in the browser. State lives in JavaScript variables for the duration of the session only — no persistence.
- **Self-contained:** A single deployable artefact (or a small folder of static files). No package manager required at runtime.
- **Minimal dependencies:** Vanilla HTML/CSS/JavaScript is the target implementation. No framework overhead — keeps the bundle tiny, load times fast, and the codebase simple to audit.
- **Ephemeral state only:** Calculator state (current equation, input buffer) is held in memory. Closing the tab resets everything. This is a feature, not a bug — it's COPPA-compliant by design.

## Browser Matrix

| Priority | Browser / Platform | Rationale |
|----------|--------------------|-----------|
| P1 — Must work | Safari on iPadOS | Dominant tablet browser for family/school iPads |
| P1 — Must work | Chrome on Android tablets | Dominant browser on Android family tablets |
| P2 — Should work | Chrome on desktop | Parent evaluation, teacher review |
| P2 — Should work | Safari on macOS | Parent evaluation on Mac |
| P2 — Should work | Edge on Windows | School/home Windows computers |
| P3 — Best effort | Firefox on desktop | Minor desktop share |

## Responsive Design

- **Primary target:** Tablet portrait 768–1024px wide — this is the default homework-use orientation
- **Secondary:** Tablet landscape — layout must reflow gracefully; buttons remain accessible
- **Desktop:** Centred single-column layout, max-width ~600px — sufficient for parent evaluation and teacher use
- **Touch-first:** All interactions designed for touch input; mouse hover states are progressive enhancement

## SEO Strategy

Lightweight SEO appropriate for a passion project:
- Descriptive `<title>`: "Bmadcalculator — Simple Calculator for Grade 3"
- Meta description communicating purpose: four operations, built for kids, no account needed
- Semantic HTML structure (`<main>`, `<button>`, `<output>`)
- Open Graph tags for clean social sharing when a parent shares the URL

## Implementation Considerations

- **Vanilla stack preferred:** HTML + CSS + vanilla JS. Avoids framework churn and keeps the project auditable and long-lived.
- **Progressive enhancement:** Core calculation functionality works without JavaScript animations — animations layer on top.
- **Physical device testing required:** Responsive design must be verified on actual iOS and Android tablets, not just browser dev tools.
- **No build step required:** The app should be openable directly by double-clicking the HTML file during development.
- **Performance and accessibility targets:** See NFR1–NFR9 for specific measurable thresholds.

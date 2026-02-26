# Project Context Analysis

## Requirements Overview

**Functional Requirements (31 FRs across 7 categories):**

| Category | FRs | Architectural implication |
|---|---|---|
| Number Entry | FR1–FR3 | Input handling, leading-zero prevention, 4-digit limit |
| Operation Selection | FR4–FR6 | Operator state (single active at a time), replace-on-change |
| Equation Display | FR7–FR9 | ARIA live region, real-time string composition, auto-reset after result |
| Calculation & Answer | FR10–FR15 | Integer arithmetic engine, animated reveal, division-by-zero handling, chaining |
| Error Recovery | FR16–FR19 | Short-press backspace, long-press full-clear (≥600ms), visual progress feedback |
| Accessibility & Layout | FR20–FR26 | Portrait + landscape responsive, 44px+ touch targets, WCAG 2.1 AA contrast, keyboard nav, screen reader compatibility |
| App Delivery & Privacy | FR27–FR31 | Static web app, no account, zero data collection, no external scripts, sub-2s load |

**Non-Functional Requirements (17 NFRs — all architecturally binding):**

| NFR | Constraint | Architectural impact |
|---|---|---|
| NFR1–NFR4 | FCP <1.5s, TTI <2s, interaction <100ms, page weight <200KB | Vanilla no-build stack; zero framework; no external assets |
| NFR5–NFR9 | WCAG 2.1 AA, 44px touch, keyboard nav, no flash, ARIA live regions | Dual live regions (equation: assertive, answer: assertive); keyboard global handlers |
| NFR10–NFR13 | Zero data collection, no third-party scripts, no external links, no browser storage | Fully self-contained; ephemeral in-memory state only |
| NFR14–NFR17 | Safari/iPadOS, Chrome/Android, Chrome/Safari/Edge desktop; no plugins | Cross-browser CSS compatibility; progressive enhancement |

**Scale & Complexity:**

- Primary domain: **Static client-side web**
- Complexity level: **Low-to-medium** — small component surface (6 components) with a high quality bar on child UX, accessibility, and animation fidelity
- Estimated architectural components: 6 UI components + 1 state machine module + 1 CSS design system
- No real-time features, no multi-tenancy, no backend integrations

## Technical Constraints & Dependencies

| Constraint | Source | Impact |
|---|---|---|
| Vanilla HTML/CSS/JS — no framework | PRD, UX spec | No React, Vue, Angular, Svelte, or build tooling |
| No build step — double-click to open | PRD | No webpack, Vite, or npm required; single deployable artefact |
| No external runtime scripts | NFR11 | No CDN, no analytics, no fonts from Google/Adobe |
| No browser storage of any kind | NFR13 | All state is in-memory JS variables; reset on tab close |
| Static hosting only | PRD | GitHub Pages, Netlify, Vercel, or plain web server |
| Page weight < 200KB uncompressed | NFR4 | Aggressive asset budget — covers HTML + CSS + JS + any icons |
| COPPA-compliant by design | PRD | Zero data collection enforced architecturally, not by policy |

## Cross-Cutting Concerns Identified

| Concern | Scope | Notes |
|---|---|---|
| **State machine correctness** | All components | Calculator state drives every UI rendering decision; must be single source of truth |
| **Accessibility (ARIA + keyboard)** | All interactive components | Tab order, Enter/Space/Backspace/Delete global handlers, dual live regions |
| **Touch interaction fidelity** | Oops button, all buttons | Long-press (600ms) detection; 100ms response target; visual press states |
| **Privacy/COPPA** | Entire app | No external calls anywhere — enforced at build structure, not runtime |
| **Cross-browser CSS compatibility** | Layout, animations, shapes | CSS Grid, clip-path, Custom Properties, CSS animations on Safari/Chrome/Edge |
| **Performance budget** | All assets | 200KB total — every file must be justified against this budget |
| **Animation without disruption** | Equals reveal, long-press ring | Must work without JS animation libraries; pure CSS or minimal requestAnimationFrame |

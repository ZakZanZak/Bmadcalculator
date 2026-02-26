# Project Scoping & Phased Development

## MVP Strategy & Philosophy

**MVP Approach:** Problem-Solving MVP — minimum that enables a grade 3 child to complete homework calculations independently, without adult help, on first use.

**Resource Requirements:** Single developer. Vanilla HTML/CSS/JS. No framework, no backend, no tooling overhead. Target: shippable in one focused sprint.

## MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Journey 1: Jamie's First Homework Session (success path, end-to-end)
- Journey 2: Jamie Makes a Mistake (error recovery)
- Journey 3: Alex Discovers and Evaluates (parent first impression)

**Must-Have Capabilities:**

| Capability | Acceptance Condition |
|------------|---------------------|
| Number input 0–9 | Tapping any digit appears in equation display |
| Operator selection (+, -, ×, ÷) | One operator active at a time, visually highlighted |
| Persistent full-equation display | Shows complete running equation as child builds it |
| Equals button + animated answer reveal | Answer animates onto screen on press |
| Oops button — last-entry clear | Removes last digit entered |
| Full-equation clear — long-press oops | Clears entire equation; requires held press (≥600ms) |
| Tablet-optimised layout | Portrait primary; landscape supported |
| WCAG 2.1 AA | 4.5:1 contrast, 44×44px touch targets throughout |
| Sub-2s load | Page interactive in <2s on tablet, home Wi-Fi |
| Static web app | No install, no account, no data collection |

## Post-MVP Features

**Phase 2 — Growth (after MVP is stable and validated):**
- Sound feedback — distinct tones per button type, short jingle on equals
- Object-based number themes — numbers displayed as visual objects (stars, dinosaurs, fruit)
- Operator shape themes — swappable visual styles
- Classroom display mode — full-screen projector view, one-tap toggle

**Phase 3 — Expansion (if the project grows beyond passion project):**
- Curriculum alignment — configurable to match specific grade/country standards
- Teacher recommendation flow — shareable URL with classroom branding
- Multi-language support for non-English speaking families

## Risk Mitigation Strategy

| Risk | Mitigation |
|------|-----------|
| **Technical:** Cross-browser touch quirks | Test on physical iOS and Android tablets before launch; Safari and Chrome first |
| **Technical:** Long-press clear UX | Tune hold duration (600ms target), visual feedback during hold, audio cue on complete clear |
| **Market:** Discovery/SEO | Descriptive page title and meta description; accept organic growth as primary channel |
| **Scope:** Feature creep | Strict MVP gate — nothing ships in Phase 1 that isn't in the Must-Have table above |

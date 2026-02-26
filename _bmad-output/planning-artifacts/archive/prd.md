---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
classification:
  projectType: web_app
  domain: edtech
  complexity: medium
  projectContext: greenfield
inputDocuments: ['_bmad-output/planning-artifacts/product-brief-Bmadcalculator-2026-02-24.md', '_bmad-output/brainstorming/brainstorming-session-2026-02-24.md']
workflowType: 'prd'
briefCount: 1
researchCount: 0
brainstormingCount: 1
projectDocsCount: 0
---

# Product Requirements Document - Bmadcalculator

**Author:** User
**Date:** 2026-02-24

## Executive Summary

Bmadcalculator is a browser-based calculator web app built exclusively for grade 3 students (ages 8–9). It solves a single, well-defined problem: standard calculator apps overwhelm young learners with buttons and functionality they don't understand and don't need. Bmadcalculator strips the calculator to its grade 3 essentials — addition, subtraction, multiplication, and division — delivered through a tablet-optimised interface so clear it requires zero adult instruction to operate.

Target users are grade 3 children doing homework on a tablet at home, with a parent nearby but not required to intervene. The secondary user is the parent who discovers, bookmarks, and trusts the app. No download, no account, no login — the app opens in a browser and works immediately.

### What Makes This Special

Every mainstream calculator app is designed for adults. Bmadcalculator is the only calculator designed exclusively for grade 3 — not a simplified adult tool, but a purpose-built child's tool. The core differentiator is **radical feature elimination as a design principle**: no decimal point, no memory functions, no percentage key, no sign toggle. The empty space left by removed buttons makes every remaining button larger, clearer, and more confident.

A persistent full-equation display ("8 + 3 =") lets children self-check before committing to an answer — eliminating the most common source of wrong answers (mis-entry, not mis-thinking). A forgiving "oops" clear button removes the fear of mistakes. An exaggerated animated answer reveal makes the result feel like a reward.

The result: a child picks it up, immediately knows what to press, completes their homework independently, and hands the tablet back with the right answers.

## Project Classification

| Field | Value |
|-------|-------|
| **Project Type** | Web App (browser-based SPA, tablet-optimised) |
| **Domain** | EdTech — K-12 education, grade 3 mathematics |
| **Complexity** | Medium — child UX requirements, COPPA-aligned (no data collection), accessibility considerations |
| **Project Context** | Greenfield — new product, no existing codebase |
| **Deployment** | Static web app, no backend required |

## Success Criteria

### User Success

**Primary (Child — Jamie):**
- Completes first calculation without adult guidance on first use
- Never encounters a button that confuses or blocks progress
- Self-corrects mis-typed numbers using the equation display before pressing equals
- Completes a full set of homework calculations in a single session without asking for help
- Returns to the app in a subsequent homework session without prompting

**Secondary (Parent — Alex):**
- Opens the app, immediately understands its purpose, and trusts it within 30 seconds
- Bookmarks the URL and shares it with at least one other parent
- Observes child working independently — does not need to intervene during calculations

### Business Success

As a passion project, success is measured by genuine utility and organic reach:

- The app works reliably for every child who uses it — zero calculation errors, zero broken sessions
- Word-of-mouth adoption — at least one unsolicited share or recommendation per week once live
- No complaints from parents about confusing UI, inappropriate content, or broken functionality
- Personal satisfaction: the builder can hand a tablet to a grade 3 child and watch them use it successfully without any instruction

### Technical Success

- Page loads in under 2 seconds on a standard tablet browser on average home Wi-Fi
- Works correctly on Chrome, Safari, and Edge on iOS and Android tablets
- Touch targets meet minimum 44×44px accessibility standard — no accidental mis-taps
- Calculation engine is 100% accurate for all integer operations within grade 3 range (0–9999)
- No data transmitted, stored, or collected — fully COPPA-compliant by design
- Passes WCAG 2.1 AA colour contrast requirements

### Measurable Outcomes

| Outcome | Measure |
|---------|---------|
| First-use success | Child completes calculation unaided within 60 seconds of opening |
| Accuracy | 100% correct results for all supported operations |
| Performance | <2s load time on tablet, <100ms button response |
| Accessibility | WCAG 2.1 AA contrast, 44px min touch targets |
| Reliability | Zero calculation errors, zero crashes in testing |

---

## Product Scope

### MVP — Minimum Viable Product

Everything needed for a grade 3 child to complete homework calculations independently:

- Number buttons 0–9 (large, tablet-optimised)
- Four operator buttons (+, -, ×, ÷) — distinct shapes and colours
- Equals button (prominent, animated answer reveal)
- Clear / "Oops" button (removes last entry, forgiving)
- Full equation display (persistent, shows "8 + 3 =" as child builds it)
- Web app — opens in browser, no install, no account
- Tablet-optimised layout (portrait and landscape)
- High contrast, minimum 44px touch targets throughout

### Growth Features (Post-MVP)

When the MVP is proven and stable:

- Sound feedback — distinct tones per button, short jingle on answer reveal
- Object-based number themes — tap to see numbers as visual objects (stars, dinosaurs, fruit)
- Operator shape themes — alternate visual styles for operator buttons
- Classroom display mode — full-screen projector view, one-tap toggle

### Vision (Future)

If Bmadcalculator grows beyond a passion project:

- Curriculum alignment — configurable to match specific grade/country maths standards
- Teacher recommendation flow — shareable link with classroom branding
- Multi-language support for non-English speaking families

## User Journeys

### Journey 1: Jamie's First Homework Session (Primary — Success Path)

It's 4:30pm on a Tuesday. Jamie's backpack hits the kitchen floor and out comes a maths worksheet — ten addition and subtraction problems. Alex opens the family tablet, navigates to the Bmadcalculator bookmark, and hands it over. "Use this for your sums."

Jamie looks at the screen. There's a big display at the top showing nothing yet, a row of chunky number buttons, four clearly different operator buttons, a big equals button, and a curved arrow in the corner. Jamie doesn't ask what anything does. The buttons are obvious.

First problem: 47 + 36. Jamie taps 4, taps 7 — the display shows "47". Taps the + button — it highlights. Taps 3, taps 6 — the display now shows "47 + 36 =". Jamie pauses, reads it back, confirms it's right, then taps the big equals button. The answer bounces onto the screen: **83**. Jamie writes it down and moves on.

Ten minutes later, the worksheet is done. Alex didn't intervene once.

**Capabilities revealed:** Number input, operator selection, equation display, equals/answer reveal, tablet-optimised layout.

### Journey 2: Jamie Makes a Mistake (Primary — Error Recovery)

Problem seven: 63 - 28. Jamie taps 6, then accidentally taps 9 instead of 3. The display shows "69". Jamie notices — the equation strip shows "69" and that's not right. Jamie taps the curved arrow. "69" disappears. Jamie retypes "63". Crisis averted, no panic, no tears.

Later: Jamie finishes a calculation, sees the answer, and wants to start fresh. Jamie taps the curved arrow again — but nothing clears. Jamie taps it repeatedly. *Oh — it only removes the last digit.* Jamie holds it down. Nothing happens. Jamie looks for another way.

> **Gap identified:** A full-equation clear mechanism is required. Resolved: long-press on the oops button clears the full equation.

**Capabilities revealed:** Last-entry clear, full-equation clear (long-press), error recovery without frustration.

### Journey 3: Alex Discovers and Evaluates (Secondary — Parent Discovery)

It's Sunday evening. Alex searches "simple calculator for kids grade 3" on the phone. Bmadcalculator appears in results. Alex taps the link — the page loads in under two seconds. The interface is immediately visible: big buttons, clean layout, clearly just a calculator. No sign-up prompt, no cookie banner, no ads.

Alex counts the buttons. Numbers, four operators, equals, a clear button. That's it. Alex tries it — types 5 + 3, hits equals, "8" bounces onto the screen. Alex smiles. Bookmarks it, then tomorrow hands the tablet to Jamie.

**Capabilities revealed:** Fast load time, zero-friction first use, no accounts/data collection, trustworthy parent-facing first impression.

### Journey 4: A Teacher Recommends It (Secondary — Teacher/Word-of-Mouth)

Mrs. Chen overhears Alex mention Bmadcalculator at school pickup. She asks for the URL. She opens it on the classroom iPad — works immediately, no IT approval needed. She writes the URL on the classroom whiteboard. Twenty grade 3 students open it on iPads, Android tablets, and a Chrome tablet. It works on all of them consistently.

**Capabilities revealed:** Cross-browser/cross-device compatibility, no-install zero-friction access, consistent layout across tablet types.

### Journey Requirements Summary

| Capability | Revealed By |
|-----------|-------------|
| Number input (0–9) | Journey 1, 2 |
| Operator selection with visual highlight | Journey 1 |
| Persistent equation display | Journey 1, 2 |
| Animated answer reveal | Journey 1 |
| Last-entry clear ("oops") | Journey 2 |
| Full-equation clear (long-press oops) | Journey 2 |
| Sub-2s load time | Journey 3 |
| No accounts, no data collection | Journey 3 |
| Cross-browser tablet compatibility | Journey 4 |
| Works without IT setup/install | Journey 4 |

## Domain-Specific Requirements

### Compliance & Regulatory

- **COPPA (Children's Online Privacy Protection Act):** Fully compliant by design — zero data collection, zero user accounts, zero cookies beyond session. No consent mechanism required because no personal data is collected.
- **FERPA:** Not applicable — no student records stored or processed.
- **WCAG 2.1 AA:** Target accessibility standard. Required for educational software used in school settings. Key requirements: minimum 4.5:1 colour contrast ratio, 44×44px minimum touch targets, no content that flashes more than 3 times per second.

### Technical Constraints

- **No data persistence:** The app must function entirely without localStorage, sessionStorage, cookies, or any server-side data storage. Each session is stateless.
- **No external dependencies at runtime:** No CDN calls to third-party analytics, tracking, or advertising scripts. Fully self-contained to ensure child safety and fast loads.
- **Child-safe design principles:** No external links, no social sharing, no advertising surfaces, no in-app purchases, no push notification requests.

### Risk Mitigations

| Risk | Mitigation |
|------|-----------|
| Accidental data collection via third-party scripts | No third-party scripts included in build |
| Accessibility failure (colour contrast) | WCAG 2.1 AA audit before launch |
| Cross-origin content issues | Static hosting, no iframes or external embeds |

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Deliberate Constraint as UX Design Principle**
Bmadcalculator inverts the standard product design assumption that more features = more value. For a grade 3 audience, *fewer* buttons is a substantive UX innovation — the removed features are not missing, they are the product's primary value statement. This approach has precedent in industrial/safety UX design but is novel in consumer calculator apps.

**2. Full Equation Persistent Display**
Standard calculators (from physical devices to every major mobile app) display only the current number being entered. Showing the complete running equation ("47 + 36 =") as it builds is a meaningful departure — it transforms the calculator from a computation tool into a transparency tool, allowing the child to read and verify their own input before committing.

### Market Context & Competitive Landscape

The children's calculator app market is dominated by:
- General-purpose calculator apps handed to children (not designed for them)
- Educational apps that gamify maths (assessment tools, not calculation tools)
- Physical toy calculators with oversized buttons but no digital equivalent

No identified competitor combines: (a) browser-based, (b) zero installation, (c) grade-specific feature elimination, and (d) persistent equation display. The gap is real.

### Validation Approach

- **Usability test:** Hand the app to one grade 3 child with no instruction. Observe. Success = completes first calculation unaided within 60 seconds.
- **Parent test:** Show the landing page to one parent for 30 seconds. Ask "what is this?" Success = accurate description without guidance.
- **Equation display test:** Present a version with and without persistent equation display. Observe error rates and self-correction behaviour.

### Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| "Simple" is dismissed as low-effort | Clear communication that simplicity is deliberate and designed |
| Kids ignore the equation display | Prominent placement, visual design that draws the eye upward |
| Parents prefer a familiar "real" calculator look | User testing with parents before finalising visual style |

## Web App Specific Requirements

### Project-Type Overview

Bmadcalculator is a **single-page static web application** — a single HTML file with embedded or co-located CSS and JavaScript, deployable to any static file host (GitHub Pages, Netlify, Vercel, or a plain web server) with zero server-side infrastructure required. There is no routing, no build pipeline required, and no runtime dependencies.

### Technical Architecture Considerations

- **No server required:** All computation happens in the browser. State lives in JavaScript variables for the duration of the session only — no persistence.
- **Self-contained:** A single deployable artefact (or a small folder of static files). No package manager required at runtime.
- **Minimal dependencies:** Vanilla HTML/CSS/JavaScript is the target implementation. No framework overhead — keeps the bundle tiny, load times fast, and the codebase simple to audit.
- **Ephemeral state only:** Calculator state (current equation, input buffer) is held in memory. Closing the tab resets everything. This is a feature, not a bug — it's COPPA-compliant by design.

### Browser Matrix

| Priority | Browser / Platform | Rationale |
|----------|--------------------|-----------|
| P1 — Must work | Safari on iPadOS | Dominant tablet browser for family/school iPads |
| P1 — Must work | Chrome on Android tablets | Dominant browser on Android family tablets |
| P2 — Should work | Chrome on desktop | Parent evaluation, teacher review |
| P2 — Should work | Safari on macOS | Parent evaluation on Mac |
| P2 — Should work | Edge on Windows | School/home Windows computers |
| P3 — Best effort | Firefox on desktop | Minor desktop share |

### Responsive Design

- **Primary target:** Tablet portrait 768–1024px wide — this is the default homework-use orientation
- **Secondary:** Tablet landscape — layout must reflow gracefully; buttons remain accessible
- **Desktop:** Centred single-column layout, max-width ~600px — sufficient for parent evaluation and teacher use
- **Touch-first:** All interactions designed for touch input; mouse hover states are progressive enhancement

### SEO Strategy

Lightweight SEO appropriate for a passion project:
- Descriptive `<title>`: "Bmadcalculator — Simple Calculator for Grade 3"
- Meta description communicating purpose: four operations, built for kids, no account needed
- Semantic HTML structure (`<main>`, `<button>`, `<output>`)
- Open Graph tags for clean social sharing when a parent shares the URL

### Implementation Considerations

- **Vanilla stack preferred:** HTML + CSS + vanilla JS. Avoids framework churn and keeps the project auditable and long-lived.
- **Progressive enhancement:** Core calculation functionality works without JavaScript animations — animations layer on top.
- **Physical device testing required:** Responsive design must be verified on actual iOS and Android tablets, not just browser dev tools.
- **No build step required:** The app should be openable directly by double-clicking the HTML file during development.
- **Performance and accessibility targets:** See NFR1–NFR9 for specific measurable thresholds.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-Solving MVP — minimum that enables a grade 3 child to complete homework calculations independently, without adult help, on first use.

**Resource Requirements:** Single developer. Vanilla HTML/CSS/JS. No framework, no backend, no tooling overhead. Target: shippable in one focused sprint.

### MVP Feature Set (Phase 1)

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

### Post-MVP Features

**Phase 2 — Growth (after MVP is stable and validated):**
- Sound feedback — distinct tones per button type, short jingle on equals
- Object-based number themes — numbers displayed as visual objects (stars, dinosaurs, fruit)
- Operator shape themes — swappable visual styles
- Classroom display mode — full-screen projector view, one-tap toggle

**Phase 3 — Expansion (if the project grows beyond passion project):**
- Curriculum alignment — configurable to match specific grade/country standards
- Teacher recommendation flow — shareable URL with classroom branding
- Multi-language support for non-English speaking families

### Risk Mitigation Strategy

| Risk | Mitigation |
|------|-----------|
| **Technical:** Cross-browser touch quirks | Test on physical iOS and Android tablets before launch; Safari and Chrome first |
| **Technical:** Long-press clear UX | Tune hold duration (600ms target), visual feedback during hold, audio cue on complete clear |
| **Market:** Discovery/SEO | Descriptive page title and meta description; accept organic growth as primary channel |
| **Scope:** Feature creep | Strict MVP gate — nothing ships in Phase 1 that isn't in the Must-Have table above |

## Functional Requirements

### Number Entry

- **FR1:** A child can enter any positive integer by tapping digit buttons (0–9) in sequence
- **FR2:** The system limits number input to a maximum length that prevents numbers beyond the grade 3 range (up to 4 digits)
- **FR3:** The system prevents leading zeros in number entry (e.g. entering 0 then 5 produces 5, not 05)

### Operation Selection

- **FR4:** A child can select one arithmetic operator — addition, subtraction, multiplication, or division — to define the operation
- **FR5:** The system indicates which operator is currently selected with a distinct visual state
- **FR6:** A child can change the selected operator before entering the second number, replacing the previous selection

### Equation Display

- **FR7:** The system displays the complete equation in real time as the child builds it — first number, then operator, then second number
- **FR8:** The equation display is persistent and continuously visible throughout calculation entry
- **FR9:** After a completed calculation, the equation display resets to an empty state when the child begins a new calculation

### Calculation & Answer

- **FR10:** A child can execute the built equation by pressing the equals button
- **FR11:** The system displays the calculated result after equals is pressed
- **FR12:** The system presents the answer using an animated reveal effect that draws attention to the result
- **FR13:** The system correctly computes addition, subtraction, multiplication, and division for integer operands
- **FR14:** The system provides a clear, child-appropriate response when an undefined operation is attempted (e.g. division by zero)
- **FR15:** After viewing a calculated answer, a child can begin a new calculation by pressing any digit button

### Error Recovery

- **FR16:** A child can remove the most recently entered digit by pressing the oops button once
- **FR17:** A child can clear the entire current equation by pressing and holding the oops button
- **FR18:** The system provides visual feedback during a long-press clear action to signal it is in progress
- **FR19:** Error recovery controls are accessible to the child at any point during equation entry

### Accessibility & Layout

- **FR20:** The interface renders correctly and is fully usable in tablet portrait orientation
- **FR21:** The interface renders correctly and is fully usable in tablet landscape orientation
- **FR22:** The interface presents a usable layout on desktop browser screens
- **FR23:** All interactive elements present a touch target that meets the minimum accessibility size standard
- **FR24:** All text and interactive element labels meet the minimum colour contrast ratio for visual accessibility
- **FR25:** All interactive elements are operable using keyboard input alone, without requiring a mouse or touch
- **FR26:** The equation display and answer result are compatible with screen reader assistive technology

### App Delivery & Privacy

- **FR27:** Any user can access the app directly in a web browser without downloading or installing software
- **FR28:** Any user can access the app without creating an account, providing credentials, or logging in
- **FR29:** The system operates without collecting, storing, or transmitting any user data during or after a session
- **FR30:** The system contains no external runtime dependencies that could introduce third-party tracking or cause load failures
- **FR31:** The app loads and becomes fully interactive within the defined performance targets on a standard tablet browser

## Non-Functional Requirements

### Performance

- **NFR1:** The app achieves First Contentful Paint in under 1.5 seconds on a standard tablet browser over average home Wi-Fi
- **NFR2:** The app becomes fully interactive (Time to Interactive) in under 2 seconds on a standard tablet browser
- **NFR3:** All interactive elements respond to user input with visible feedback within 100 milliseconds of touch or click
- **NFR4:** The total page weight (HTML, CSS, JavaScript, and all assets) does not exceed 200KB uncompressed

### Accessibility

- **NFR5:** All interactive elements present a minimum touch target area of 44×44 pixels
- **NFR6:** All text content and interactive element labels maintain a minimum 4.5:1 colour contrast ratio against their background (WCAG 2.1 AA)
- **NFR7:** All interactive elements are focusable and fully operable via keyboard navigation (Tab to focus, Enter/Space to activate)
- **NFR8:** The application contains no content that flashes more than 3 times per second (WCAG 2.3.1 — Three Flashes or Below Threshold)
- **NFR9:** The equation display functions as an ARIA live region, announcing updates to screen readers automatically without requiring additional user action

### Privacy & Child Safety

- **NFR10:** The application does not collect, store, or transmit any user data — including anonymised analytics, crash reports, or telemetry — during or after a session
- **NFR11:** The application does not include or load any third-party scripts at runtime
- **NFR12:** The application presents no external links, advertisements, social sharing prompts, in-app purchase surfaces, or push notification requests
- **NFR13:** The application functions entirely without setting any persistent browser storage (cookies, localStorage, sessionStorage, IndexedDB)

### Compatibility

- **NFR14:** The application functions correctly on Safari on iPadOS (current major version and one prior)
- **NFR15:** The application functions correctly on Chrome on Android tablets (current major version and one prior)
- **NFR16:** The application functions correctly on Chrome, Safari, and Edge on desktop browsers
- **NFR17:** The application requires no browser plugins, extensions, or user permissions to function

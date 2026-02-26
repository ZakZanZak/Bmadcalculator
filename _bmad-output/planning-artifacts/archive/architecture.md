---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
  - '_bmad-output/planning-artifacts/product-brief-Bmadcalculator-2026-02-24.md'
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-02-24'
project_name: 'Bmadcalculator'
user_name: 'User'
date: '2026-02-24'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

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

### Technical Constraints & Dependencies

| Constraint | Source | Impact |
|---|---|---|
| Vanilla HTML/CSS/JS — no framework | PRD, UX spec | No React, Vue, Angular, Svelte, or build tooling |
| No build step — double-click to open | PRD | No webpack, Vite, or npm required; single deployable artefact |
| No external runtime scripts | NFR11 | No CDN, no analytics, no fonts from Google/Adobe |
| No browser storage of any kind | NFR13 | All state is in-memory JS variables; reset on tab close |
| Static hosting only | PRD | GitHub Pages, Netlify, Vercel, or plain web server |
| Page weight < 200KB uncompressed | NFR4 | Aggressive asset budget — covers HTML + CSS + JS + any icons |
| COPPA-compliant by design | PRD | Zero data collection enforced architecturally, not by policy |

### Cross-Cutting Concerns Identified

| Concern | Scope | Notes |
|---|---|---|
| **State machine correctness** | All components | Calculator state drives every UI rendering decision; must be single source of truth |
| **Accessibility (ARIA + keyboard)** | All interactive components | Tab order, Enter/Space/Backspace/Delete global handlers, dual live regions |
| **Touch interaction fidelity** | Oops button, all buttons | Long-press (600ms) detection; 100ms response target; visual press states |
| **Privacy/COPPA** | Entire app | No external calls anywhere — enforced at build structure, not runtime |
| **Cross-browser CSS compatibility** | Layout, animations, shapes | CSS Grid, clip-path, Custom Properties, CSS animations on Safari/Chrome/Edge |
| **Performance budget** | All assets | 200KB total — every file must be justified against this budget |
| **Animation without disruption** | Equals reveal, long-press ring | Must work without JS animation libraries; pure CSS or minimal requestAnimationFrame |

## Starter Template Evaluation

### Primary Technology Domain

Static client-side web — vanilla HTML5/CSS3/JavaScript (ES6+), no framework, no build tooling, no package manager required at runtime.

### Starter Options Considered

| Option | Verdict |
|---|---|
| HTML5 Boilerplate v9.0.0 | Rejected — valuable for larger sites; carries complexity (build tools, server configs, normalize.css) disproportionate to a 6-component, 200KB-budget app |
| Local-First Web Starter | Rejected — obscure, adds no value over hand-crafted at this scope |
| **Hand-crafted 3-file bespoke set** | **Selected** |

### Selected Starter: Hand-Crafted Bespoke

**Rationale for Selection:**
The UX specification effectively functions as the starter template — it defines the complete design token system, component inventory, layout grid, animation parameters, and ARIA strategy. No external scaffolding adds more value than following that spec directly. The 200KB total page budget and "openable by double-clicking" requirement exclude any tool with a build step.

**Initialization Command:**
```bash
# Create project files directly — no package manager required
touch index.html style.css app.js
```

**Architectural Decisions Provided by Starter:**

- **Language & Runtime:** Vanilla JavaScript (ES6+) — no TypeScript compilation, no transpilation
- **Styling Solution:** Pure CSS3 with Custom Properties as design token system (~25 tokens)
- **Build Tooling:** None — files served/opened directly; optional `npx live-server` for development hot-reload only (dev dependency, never ships)
- **Testing Framework:** Not scaffolded at project init — browser devtools + physical device testing per PRD requirement
- **Code Organization:** Single-responsibility file separation: HTML (structure + ARIA), CSS (design tokens + layout + animation), JS (state machine + event handlers + DOM updates)
- **Development Experience:** Open `index.html` in browser → edit files → refresh. Optional: `npx live-server .` for auto-refresh during development

**Note:** Project initialization is the first implementation story — create `index.html`, `style.css`, and `app.js` with skeleton content, verify opens correctly in Safari/Chrome, and confirm design tokens are in place.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- State machine pattern — IIFE module with single state object
- DOM update strategy — single render pass on every state change
- Animation implementation — pure CSS + JS class toggling

**Important Decisions (Shape Architecture):**
- Hosting platform — GitHub Pages (primary) or Netlify (equal alternative)
- Testing approach — lightweight `test.html` for calculation correctness

**Deferred Decisions (Post-MVP):**
- Sound feedback implementation (Phase 2) — Web Audio API vs audio files
- Theme system (Phase 2) — CSS Custom Property overrides per theme

---

### Data Architecture

No persistent data layer. All state is ephemeral, held entirely in a single in-memory JavaScript object for the duration of the browser session. No localStorage, sessionStorage, IndexedDB, or cookies — by design (COPPA compliance, NFR13).

**State object shape:**

```js
const state = {
  phase: 'idle',          // 'idle' | 'first' | 'operator' | 'second' | 'result'
  firstOperand: '',       // string of digits, e.g. '47'
  operator: null,         // '+' | '-' | '×' | '÷' | null
  secondOperand: '',      // string of digits, e.g. '36'
  result: null            // number | null
};
```

**State transitions:**

| From phase | Event | To phase |
|---|---|---|
| `idle` | digit tap | `first` |
| `first` | operator tap | `operator` |
| `operator` | digit tap | `second` |
| `second` | equals tap | `result` |
| `result` | digit tap | `first` (new calculation) |
| `result` | operator tap | `operator` (chain — result becomes firstOperand) |
| Any | oops short-press | remove last digit (may regress phase) |
| Any | oops long-press ≥600ms | `idle` (full reset) |

**Rationale:** Single source of truth prevents display/state desync. Explicit phase enum makes illegal transitions visible during development. String operands preserve leading-digit input order; conversion to Number only at compute time.

---

### Authentication & Security

**Authentication:** None — no accounts, no login, no session tokens. COPPA-compliant by architectural absence of identity infrastructure.

**Security posture:** Enforced structurally:
- No external network calls — no XSS vector from external scripts
- No eval() or dynamic code execution
- No innerHTML assignment with user-controlled strings — all display updates via `textContent`
- No third-party dependencies — zero supply chain attack surface
- No server — no injection, no auth bypass, no server-side vulnerability class

---

### API & Communication Patterns

None. All computation is client-side integer arithmetic. No API calls, no WebSockets, no service workers (MVP). Static files are served as-is by any HTTP host.

**Division by zero handling:** Not an API concern — handled in the JS calculation engine:
- Detected before compute: `if (operator === '÷' && secondOperand === '0')`
- Response: Display `"Oops!"` in answer display (child-appropriate), set phase to `result`, allow normal recovery (tap digit to start fresh)
- No crash, no console error, no alert

---

### Frontend Architecture

**State Management: IIFE Module Pattern**

```js
const Calculator = (() => {
  const state = { phase: 'idle', firstOperand: '', operator: null, secondOperand: '', result: null };

  function dispatch(action, payload) {
    // mutate state based on action type
    render();
  }

  function render() {
    // read state, update all DOM elements unconditionally
  }

  return { dispatch };
})();
```

- **Rationale:** Encapsulates state — no accidental global mutation. Single `dispatch` entry point for all state changes. `render()` called after every dispatch, ensuring DOM always reflects state. No framework overhead, no build step needed.

**DOM Update Strategy: Full render pass**

One `render()` function updates all display elements on every state change:
- `equationDisplay.textContent` ← computed equation string from state
- `answerDisplay.textContent` ← result or placeholder
- Operator button `aria-pressed` attributes ← state.operator
- Equals button opacity ← phase validity

Rationale: At 6 components, unconditional render costs ~0.1ms. Eliminates the bug class where a state transition forgets to update a display element. Predictable, debuggable, testable.

**Component Architecture: Plain functions + data attributes**

Each button calls `Calculator.dispatch('DIGIT', '7')` or `Calculator.dispatch('OPERATOR', '+')`. No component class instances. Button identity communicated via `data-value` and `data-action` HTML attributes read at event delegation time.

**Event handling: Single delegated listener**

```js
document.querySelector('#calculator').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  Calculator.dispatch(btn.dataset.action, btn.dataset.value);
});
```

Single listener on the calculator container — no per-button listeners. Long-press handled via `pointerdown`/`pointerup` timer on the oops button specifically.

**Routing:** None. Single HTML page, no URL changes.

**Animation Implementation: Pure CSS + JS class toggling**

| Animation | Mechanism |
|---|---|
| Button press feedback (80ms) | CSS `transition: transform 80ms` + `:active` pseudo-class |
| Operator selected ring | CSS class `.is-selected` added/removed by `render()` |
| Answer reveal (400ms bounce) | CSS `@keyframes answerReveal` triggered by adding `.animate` class; class removed after `animationend` event |
| Long-press progress ring (600ms) | CSS `@keyframes ringFill` on a pseudo-element; JS starts/cancels a 600ms timer via `pointerdown`/`pointerup`; ring class added on start, removed on cancel or complete |

No `requestAnimationFrame`, no Web Animations API, no animation library. All timing controlled via CSS Custom Properties (`--anim-press-duration`, `--anim-answer-duration`, `--anim-longpress-duration`) — tunable in one place.

**Keyboard Support (accessibility, not primary use):**

| Key | Action |
|---|---|
| `0`–`9` | Digit input |
| `+`, `-`, `*`, `/` | Operator selection |
| `Enter` or `=` | Equals |
| `Backspace` | Oops short-press |
| `Delete` or `Escape` | Full clear |

Global `keydown` listener on `document`. Maps keys to `Calculator.dispatch()` calls.

---

### Infrastructure & Deployment

**Hosting Platform: GitHub Pages (primary recommendation)**

- Free, permanent URL (e.g. `username.github.io/bmadcalculator`)
- Deploys directly from a GitHub repository branch (`gh-pages` or `main /docs`)
- Custom domain supported (CNAME file)
- No build pipeline required — static files served as-is
- HTTPS enforced automatically

Netlify is an equally valid alternative (drag-and-drop deploy, equally free, excellent CDN) — no technical advantage for this project.

**Deployment process:**
1. Push `index.html`, `style.css`, `app.js` to GitHub repo
2. Enable GitHub Pages in repository settings → deploy from `main` branch
3. App is live at the GitHub Pages URL immediately

**CI/CD:** None for MVP. No automated build pipeline. Deploy = `git push`.

**Environment configuration:** None. Single environment — no secrets, no env vars, no config files. The app's only "configuration" is the CSS Custom Properties in `style.css`.

**Monitoring:** None (COPPA — no analytics, no error tracking, no telemetry). Manual testing and direct user feedback are the monitoring strategy.

---

### Testing Approach

**`test.html` — Lightweight browser-based assertion file**

A standalone HTML file that:
1. Imports `app.js` (or an extracted `calculator-engine.js` module)
2. Runs a set of calculation assertions using a tiny inline test helper (~20 lines)
3. Displays pass/fail results in the browser — no test runner, no npm, no CI

Coverage targets:
- All four arithmetic operations (representative inputs)
- Edge cases: division by zero, max digit limit, leading zero prevention, operator chaining
- Clear/oops behaviour: single-digit removal, full clear

**Physical device testing (mandatory per PRD):**
- Safari on iPadOS — P1 must-work
- Chrome on Android tablet — P1 must-work
- Chrome, Safari, Edge on desktop — P2 should-work

**Rationale:** `test.html` gives permanent regression protection for FR13 (arithmetic correctness) at zero tooling cost. Physical device testing is the primary accessibility and layout validation method — no desktop browser emulation replaces it.

---

### Decision Impact Analysis

**Implementation Sequence:**
1. File scaffold (`index.html`, `style.css`, `app.js`) — enables all subsequent work
2. CSS design system (Custom Properties, layout grid) — unblocks component styling
3. State machine IIFE + `render()` skeleton — unblocks all interactive work
4. Digit + operator + equals button logic — core calculation loop
5. Oops short-press + long-press clear — error recovery
6. ARIA live regions + keyboard handlers — accessibility layer
7. Answer reveal animation + long-press ring animation — polish layer
8. `test.html` assertion suite — correctness validation
9. Physical device testing — cross-browser/cross-device sign-off

**Cross-Component Dependencies:**
- `render()` depends on complete state shape being stable — define state object before building any component
- Long-press ring animation depends on CSS Custom Property `--anim-longpress-duration` — define design tokens before animation work
- Keyboard handlers share dispatch logic with touch handlers — implement dispatch first, wire both inputs to it
- `test.html` depends on calculation engine being extractable/importable — keep arithmetic logic in a pure function with no DOM dependencies

## Implementation Patterns & Consistency Rules

### Critical Conflict Points Identified

7 areas where AI agents could make different choices without explicit rules. All agents MUST follow these patterns.

---

### Naming Patterns

**JavaScript Naming:**

| Construct | Convention | Example |
|---|---|---|
| Functions | `camelCase` | `pressDigit()`, `buildEquationString()` |
| Variables | `camelCase` | `firstOperand`, `selectedOperator` |
| Constants / magic values | `UPPER_SNAKE_CASE` | `MAX_DIGITS`, `LONG_PRESS_DURATION` |
| State action types | `UPPER_SNAKE_CASE` string | `'PRESS_DIGIT'`, `'PRESS_OPERATOR'`, `'PRESS_EQUALS'`, `'PRESS_OOPS'`, `'LONG_PRESS_CLEAR'` |
| State phase values | `lowercase` string enum | `'idle'`, `'first'`, `'operator'`, `'second'`, `'result'` |
| IIFE module name | `PascalCase` | `Calculator` |

**CSS Class Naming: kebab-case with semantic prefix**

| Prefix | Use | Example |
|---|---|---|
| `btn-` | Button variant | `btn-digit`, `btn-operator`, `btn-equals`, `btn-oops` |
| `is-` | State modifier | `is-selected`, `is-animating`, `is-longpress` |
| `display-` | Display zone | `display-equation`, `display-answer` |

No BEM, no utility-first. Flat semantic names. One class per element; state changes add/remove `is-*` classes only.

**CSS Custom Property Naming: `--kebab-case` with category prefix**

| Category | Pattern | Examples |
|---|---|---|
| Colours | `--color-[role]` | `--color-bg`, `--color-digit`, `--color-equals`, `--color-op-add` |
| Sizing | `--size-[element]` | `--size-btn-digit`, `--size-display-height` |
| Spacing | `--gap-[context]` | `--gap-buttons`, `--gap-display` |
| Animation | `--anim-[name]` | `--anim-press`, `--anim-answer`, `--anim-longpress` |

All tokens defined in `:root` at the top of `style.css`. Never hard-code a colour or timing value outside of `:root`.

**File Naming: lowercase kebab-case**

`index.html`, `style.css`, `app.js`, `test.html` — no uppercase, no underscores.

---

### Structure Patterns

**File Responsibility Rules (strict separation):**

| File | Owns | Must NOT contain |
|---|---|---|
| `index.html` | Semantic HTML, ARIA attributes, `data-action` / `data-value` attributes, single `<link>` and `<script>` tags | Inline styles, inline `onclick` handlers, logic |
| `style.css` | All design tokens, all layout, all component styles, all animations | Hardcoded hex values outside `:root`, `!important` |
| `app.js` | State machine, dispatch, render, event listeners, calculation engine | DOM `id` strings hardcoded more than once (use `const` references at top) |
| `test.html` | Calculation engine assertions, test runner display | App UI, state side-effects |

**`app.js` Internal Section Order (all agents follow this order):**

```
1. DOM References      (const el = document.querySelector...)
2. Constants           (MAX_DIGITS, LONG_PRESS_DURATION, etc.)
3. State Object        (const state = { ... })
4. Calculation Engine  (pure function: calculate(a, op, b) → number)
5. State Helpers       (pure functions: buildEquationString, isEquationComplete, etc.)
6. Dispatch + Render   (mutate state → render)
7. Event Listeners     (delegated click, keydown, pointerdown/pointerup for long-press)
```

---

### Communication Patterns

**State Management Rules:**

- **ONLY `dispatch()` may mutate `state`** — no other function reads or writes `state` directly
- `dispatch(actionType, payload)` mutates `state` synchronously, then calls `render()` exactly once
- `render()` is a pure projection of `state` onto the DOM — it reads `state`, never mutates it
- No `setTimeout` or async code inside `dispatch` or `render`

**Action Type Registry (complete list — no undocumented actions):**

| Action | Payload | Effect |
|---|---|---|
| `'PRESS_DIGIT'` | `string` ('0'–'9') | Append digit to current operand |
| `'PRESS_OPERATOR'` | `string` ('+', '-', '×', '÷') | Set operator slot |
| `'PRESS_EQUALS'` | none | Compute result, trigger animation |
| `'PRESS_OOPS'` | none | Remove last digit |
| `'LONG_PRESS_CLEAR'` | none | Reset all state to idle |

No other action types may be added without updating this registry.

---

### Process Patterns

**DOM Safety — ALWAYS `textContent`, NEVER `innerHTML` for dynamic content:**

```js
// CORRECT
equationEl.textContent = buildEquationString(state);

// FORBIDDEN — XSS risk even in a client-only app
equationEl.innerHTML = buildEquationString(state);
```

`innerHTML` is permitted only for static structural HTML in `index.html` itself, never in `app.js`.

**Invalid State / No-Op Pattern:**

When a button press is logically invalid (e.g. pressing equals with incomplete equation), respond with a **no-op** or brief visual feedback only. Never `console.error()`, `alert()`, or show negative language.

```js
// CORRECT — no-op with optional visual feedback
if (!isEquationComplete(state)) {
  equationEl.classList.add('is-shake');
  return;
}

// FORBIDDEN
throw new Error('Equation incomplete');
```

**Animation Trigger Pattern — class add → `animationend` → class remove:**

```js
// CORRECT
answerEl.classList.add('is-animating');
answerEl.addEventListener('animationend', () => {
  answerEl.classList.remove('is-animating');
}, { once: true });

// FORBIDDEN — timing drift, accessibility issues
answerEl.classList.add('is-animating');
setTimeout(() => answerEl.classList.remove('is-animating'), 400);
```

**Long-Press Pattern — `pointerdown`/`pointerup` + `setTimeout`:**

```js
let longPressTimer = null;
oopsBtn.addEventListener('pointerdown', () => {
  longPressTimer = setTimeout(() => {
    Calculator.dispatch('LONG_PRESS_CLEAR');
    longPressTimer = null;
  }, LONG_PRESS_DURATION);
});
oopsBtn.addEventListener('pointerup', () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    Calculator.dispatch('PRESS_OOPS');
    longPressTimer = null;
  }
});
oopsBtn.addEventListener('pointercancel', () => {
  clearTimeout(longPressTimer);
  longPressTimer = null;
});
```

Use `pointer*` events (not `touch*`) — handles both touch and mouse uniformly across all P1/P2 browsers.

---

### Enforcement Guidelines

**All AI agents MUST:**

- Consult the action type registry before adding any interaction
- Use `textContent` for all dynamic DOM text updates — never `innerHTML`
- Define all CSS values as Custom Properties in `:root` — never hardcode colours or timings inline
- Follow the `app.js` section order — new code goes in the correct section, not appended to the bottom
- Use `animationend` (not `setTimeout`) for animation cleanup
- Use `pointer*` events (not `touch*`) for all custom gesture detection
- Keep the `calculate()` function pure — no DOM or state dependencies
- Never access or mutate `state` from outside `dispatch()`

**Anti-Patterns (forbidden):**

| Anti-pattern | Correct alternative |
|---|---|
| `innerHTML = dynamicString` | `textContent = dynamicString` |
| Hard-coded `'#FF6B35'` in `app.js` | `var(--color-op-add)` in CSS |
| `setTimeout(cleanup, 400)` for animation | `addEventListener('animationend', cleanup, { once: true })` |
| `state.firstOperand = '5'` outside dispatch | `Calculator.dispatch('PRESS_DIGIT', '5')` |
| `touchstart` / `touchend` for gestures | `pointerdown` / `pointerup` |
| `onclick="doSomething()"` in HTML | `addEventListener` in `app.js` |
| Magic numbers in `app.js` body | Named constant at top: `const MAX_DIGITS = 4` |
| Undocumented action type strings | Add to action type registry first |

## Project Structure & Boundaries

### Complete Project Directory Structure

```
bmadcalculator/
├── index.html        # App shell: semantic HTML, ARIA, data-action/data-value attrs
├── style.css         # Design tokens (:root), CSS Grid layout, components, animations
├── app.js            # Calculator IIFE: state machine, dispatch, render, event listeners
├── test.html         # Calculation engine browser-based assertion suite
├── .nojekyll         # Prevents GitHub Pages from running Jekyll processing
├── .gitignore        # OS files, editor artefacts
└── README.md         # Project description, live URL, how to open locally
```

No `src/`, no `dist/`, no `node_modules/`, no `package.json` required. The deployable artefact is the root of the repository.

---

### `index.html` Internal Structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bmadcalculator — Simple Calculator for Grade 3</title>
    <meta name="description" content="A calculator built for grade 3 children. Four operations, big buttons, no account needed.">
    <!-- Open Graph for parent/teacher sharing -->
    <meta property="og:title" content="Bmadcalculator — Simple Calculator for Grade 3">
    <meta property="og:description" content="...">
    <link rel="stylesheet" href="style.css">
    <!-- NO other external <link> or <script> tags — NFR11 -->
  </head>
  <body>
    <main id="calculator" aria-label="Grade 3 Calculator">

      <!-- Zone 1: Answer display (~15% height) -->
      <div class="display-answer"
           aria-live="assertive"
           aria-label="answer display"
           aria-atomic="true">?</div>

      <!-- Zone 2: Equation display (~10% height) -->
      <div class="display-equation"
           role="status"
           aria-live="assertive"
           aria-label="equation display"
           aria-atomic="true"></div>

      <!-- Zone 3: Button grid (4-col CSS Grid, ~75% height) -->
      <div class="button-grid">
        <!-- Digit buttons: data-action="PRESS_DIGIT" data-value="N" -->
        <!-- Operator buttons: data-action="PRESS_OPERATOR" data-value="OP" aria-pressed="false" -->
        <!-- Equals button: data-action="PRESS_EQUALS" (grid-row: span 2) -->
        <!-- Oops button: id="btn-oops" data-action="PRESS_OOPS" -->
      </div>
    </main>
    <script src="app.js"></script>
    <!-- NO other <script> tags — NFR11 -->
  </body>
</html>
```

---

### `style.css` Internal Structure

```
:root { /* ALL design tokens — ~25 Custom Properties */ }

/* Reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* Layout: main calculator container */
#calculator { ... }

/* Layout: button grid (4-column CSS Grid) */
.button-grid { display: grid; grid-template-columns: repeat(3, 1fr) auto; ... }

/* Display zones */
.display-answer { ... }
.display-equation { ... }

/* Component: digit buttons */
.btn-digit { ... }
.btn-digit:active { transform: scale(0.92); }

/* Component: operator buttons */
.btn-operator { ... }
.btn-operator.is-selected { /* active ring */ }

/* Component: equals button */
.btn-equals { grid-row: span 2; ... }

/* Component: oops button */
.btn-oops { ... }
.btn-oops.is-longpress::after { /* radial progress ring */ }

/* State modifiers */
.is-shake { animation: shake var(--anim-press) ease; }
.is-animating { animation: answerReveal var(--anim-answer) ease-out; }
.is-longpress::after { animation: ringFill var(--anim-longpress) linear; }

/* Animations */
@keyframes answerReveal { ... }
@keyframes ringFill { ... }
@keyframes shake { ... }

/* Responsive: tablet landscape */
@media (orientation: landscape) and (max-height: 600px) { ... }

/* Responsive: desktop (centred, max-width ~600px) */
@media (min-width: 1024px) { ... }

/* Print styles */
@media print { ... }
```

---

### `app.js` Internal Structure

```js
// ─── 1. DOM References ───────────────────────────────────────────────────────
const calculatorEl = document.getElementById('calculator');
const equationEl   = document.querySelector('.display-equation');
const answerEl     = document.querySelector('.display-answer');
const oopsBtn      = document.getElementById('btn-oops');

// ─── 2. Constants ────────────────────────────────────────────────────────────
const MAX_DIGITS          = 4;
const LONG_PRESS_DURATION = 600; // ms

// ─── 3. State Object ─────────────────────────────────────────────────────────
const state = {
  phase:         'idle',   // 'idle'|'first'|'operator'|'second'|'result'
  firstOperand:  '',
  operator:      null,     // '+'|'-'|'×'|'÷'|null
  secondOperand: '',
  result:        null
};

// ─── 4. Calculation Engine (pure — no DOM, no state) ─────────────────────────
function calculate(a, op, b) { ... }

// ─── 5. State Helpers (pure — read state, return values) ─────────────────────
function buildEquationString(s) { ... }
function isEquationComplete(s) { ... }
function getActiveOperand(s) { ... }

// ─── 6. Dispatch + Render ────────────────────────────────────────────────────
const Calculator = (() => {
  function dispatch(action, payload) { ... }
  function render() { ... }
  return { dispatch };
})();

// ─── 7. Event Listeners ──────────────────────────────────────────────────────
// Delegated click — all buttons except oops long-press
calculatorEl.addEventListener('click', ...);
// Global keyboard
document.addEventListener('keydown', ...);
// Long-press — oops button only
let longPressTimer = null;
oopsBtn.addEventListener('pointerdown', ...);
oopsBtn.addEventListener('pointerup', ...);
oopsBtn.addEventListener('pointercancel', ...);
```

---

### Requirements to Structure Mapping

| FR Category | `index.html` | `style.css` | `app.js` |
|---|---|---|---|
| Number Entry (FR1–3) | `data-action="PRESS_DIGIT"` buttons | `.btn-digit` styles | Section 6: `'PRESS_DIGIT'` handler |
| Operation Selection (FR4–6) | `data-action="PRESS_OPERATOR"`, `aria-pressed` | `.btn-operator`, `.is-selected` | Section 6: `'PRESS_OPERATOR'` handler |
| Equation Display (FR7–9) | `.display-equation` ARIA live region | `.display-equation` styles | Section 5: `buildEquationString`; Section 6: `render()` |
| Calculation & Answer (FR10–15) | `.display-answer` ARIA live region | `@keyframes answerReveal`, `.is-animating` | Section 4: `calculate()`; Section 6: `'PRESS_EQUALS'` |
| Error Recovery (FR16–19) | `id="btn-oops"` | `.is-longpress`, `@keyframes ringFill` | Section 7: long-press handlers |
| Accessibility & Layout (FR20–26) | ARIA roles, `lang`, `aria-label` throughout | Grid, media queries, min touch targets | Section 7: `keydown` handler |
| App Delivery & Privacy (FR27–31) | Meta tags; no external scripts | — | No external calls anywhere |

---

### Architectural Boundaries

**Single integration boundary — the dispatch interface:**

All user input (touch, click, keyboard) flows to `Calculator.dispatch(action, payload)`. This is the only public interface of the app.

```
User Input (touch / click / keyboard)
         ↓
  Event Listeners  (app.js Section 7)
         ↓
  Calculator.dispatch(action, payload)
         ↓
  State mutation   (app.js Section 6)
         ↓
  render()         (app.js Section 6)
         ↓
  DOM update + ARIA live region announcement
```

Data flow is strictly one-directional. No callbacks between sections. No events between modules.

---

### Development Workflow

**Local development:**
```bash
# Option 1 — simplest
open index.html          # macOS
start index.html         # Windows

# Option 2 — auto-reload (dev only, never ships)
npx live-server .
```

**Testing:**
```bash
open test.html           # Opens in browser, runs assertions, shows pass/fail
```

**Deployment:**
```bash
git add .
git commit -m "initial release"
git push origin main
# GitHub Pages: repo settings → Pages → deploy from main branch root
```

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices are mutually compatible with zero conflicts. Vanilla JS + no-build + static hosting form a consistent, dependency-free stack. CSS Grid, CSS Custom Properties, `pointer*` events, and `animationend` are all universally supported across every P1/P2 target browser (Safari/iPadOS 13+, Chrome/Android 55+, Chrome/Safari/Edge desktop).

**Pattern Consistency:**
Naming conventions are non-overlapping and consistent: `camelCase` for JS functions/variables, `UPPER_SNAKE_CASE` for constants and action types, `kebab-case` for CSS classes and Custom Properties. File responsibility rules have clean, non-overlapping domains. The single dispatch → render flow is consistent with the IIFE module choice.

**Structure Alignment:**
The 3-file structure directly supports all architectural decisions. The `app.js` section order mirrors the data flow. File separation enables independent authoring of HTML (structure), CSS (design), and JS (logic) without cross-file coupling.

---

### Requirements Coverage Validation ✅

**Functional Requirements (31/31 covered):**

| Category | FRs | Coverage |
|---|---|---|
| Number Entry | FR1–3 | `PRESS_DIGIT` handler, `MAX_DIGITS` constant, leading-zero logic in dispatch |
| Operation Selection | FR4–6 | `PRESS_OPERATOR` handler, `.is-selected` via `render()` |
| Equation Display | FR7–9 | `buildEquationString()`, `render()`, `aria-live="assertive"` |
| Calculation & Answer | FR10–15 | `calculate()` pure function, `PRESS_EQUALS`, div-by-zero → "Oops!", `is-animating` |
| Error Recovery | FR16–19 | `PRESS_OOPS`, `LONG_PRESS_CLEAR`, `is-longpress`, `@keyframes ringFill` |
| Accessibility & Layout | FR20–26 | CSS Grid, media queries, 60–80px targets, verified contrast tokens, `keydown` listener, dual ARIA live regions |
| App Delivery & Privacy | FR27–31 | Static HTML, no auth, no storage, no external scripts, sub-200KB budget |

**Non-Functional Requirements (17/17 covered):**

| Group | NFRs | Coverage |
|---|---|---|
| Performance | NFR1–4 | No external assets, system fonts, 3 small files — FCP/TTI targets achievable |
| Accessibility | NFR5–9 | Sizing tokens (60–80px), contrast tokens (≥4.5:1), keyboard handler, single-shot animations (no flash), dual `assertive` live regions |
| Privacy/COPPA | NFR10–13 | Ephemeral in-memory state; no network calls architecturally possible |
| Compatibility | NFR14–17 | `pointer*` events, CSS Grid, Custom Properties — universal across all P1/P2 browsers |

---

### Implementation Readiness Validation ✅

**Decision Completeness:**
All critical decisions are documented with rationale. The action type registry is complete (5 actions). State phase enum is fully specified. No ambiguous decisions remain.

**Structure Completeness:**
All 7 files defined. `index.html`, `style.css`, and `app.js` internal structures are fully specified with section order, element responsibilities, and constraints. Integration boundary (dispatch interface) and data flow (strictly one-directional) are documented.

**Pattern Completeness:**
All 7 identified conflict points are resolved. Naming conventions, file responsibility rules, action registry, DOM safety rules, animation trigger pattern, long-press pattern, and 8 anti-patterns are documented with code examples.

---

### Gap Analysis Results

**Critical gaps:** None.

**Important gaps (documented for agent awareness, non-blocking):**

1. **`aria-pressed` render responsibility** — `render()` must update the `aria-pressed` attribute on all operator button elements based on `state.operator`. Agents should treat this as a required render() output alongside `textContent` updates.

2. **Keyboard Backspace `preventDefault`** — The global `keydown` handler must call `event.preventDefault()` when handling `Backspace` to prevent browser back-navigation. This must not be omitted.

**Nice-to-have gaps:**
- `test.html` file skeleton not fully specified (test content listed, structure implicit)
- Inline SVG favicon (~0.5KB) would complete polish at negligible cost

---

### Validation Issues Addressed

No critical issues found. The two important gaps above are flagged as implementation notes rather than architectural corrections — they are implementation-level details that follow naturally from the decisions made.

---

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed (31 FRs, 17 NFRs, UX spec)
- [x] Scale and complexity assessed (low-to-medium, 6 components)
- [x] Technical constraints identified (no-build, vanilla JS, 200KB, COPPA)
- [x] Cross-cutting concerns mapped (7 identified)

**✅ Architectural Decisions**
- [x] Critical decisions documented (state machine, DOM updates, animations, hosting, testing)
- [x] Technology stack fully specified (HTML5/CSS3/ES6+, no framework)
- [x] Integration patterns defined (single dispatch boundary, one-directional data flow)
- [x] Performance considerations addressed (budget, no external assets, system fonts)

**✅ Implementation Patterns**
- [x] Naming conventions established (JS, CSS classes, Custom Properties, files)
- [x] Structure patterns defined (file responsibilities, section order)
- [x] Communication patterns specified (action registry, dispatch-only state mutation)
- [x] Process patterns documented (no-op errors, animationend cleanup, pointer events)

**✅ Project Structure**
- [x] Complete directory structure defined (7 files)
- [x] Component boundaries established (index.html zones, app.js sections)
- [x] Integration points mapped (dispatch interface, data flow diagram)
- [x] Requirements-to-structure mapping complete (all 31 FRs mapped)

---

### Architecture Readiness Assessment

**Overall Status: READY FOR IMPLEMENTATION**

**Confidence Level: High** — the architecture is fully specified for a well-scoped, single-file-set project with clear constraints. No unknowns remain.

**Key Strengths:**
- Complete requirements traceability — every FR and NFR has a named architectural mechanism
- Single dispatch boundary eliminates entire classes of state bugs
- Purely structural COPPA compliance — privacy cannot be accidentally violated
- CSS-first animation strategy eliminates animation library dependencies
- Pattern registry prevents agent divergence on the highest-risk implementation details

**Areas for Future Enhancement (post-MVP):**
- Sound feedback (Phase 2): Web Audio API oscillators vs. pre-recorded audio files — decision deferred
- Theme system (Phase 2): CSS Custom Property overrides per `:root[data-theme]` attribute — structure is ready
- Service Worker (optional): Would enable true offline use with zero code changes to core files

---

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented — no framework substitutions, no storage, no external scripts
- Use the action type registry as the authoritative list — do not add undocumented action strings
- Follow the `app.js` section order — new code in the correct section, not appended to the bottom
- Refer to the Requirements-to-Structure Mapping table for every FR implementation
- Remember: `aria-pressed` updates and `Backspace` `preventDefault` are mandatory render/keyboard responsibilities

**First Implementation Story:**
Create the 3-file scaffold: `index.html` (semantic structure with ARIA zones and `data-action` buttons), `style.css` (all `:root` design tokens from UX spec, CSS Grid layout), `app.js` (state object, constants, IIFE skeleton with empty dispatch and render). Verify the file opens correctly in Safari and Chrome before any logic is added.

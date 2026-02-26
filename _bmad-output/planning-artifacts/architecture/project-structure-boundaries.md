# Project Structure & Boundaries

## Complete Project Directory Structure

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

## `index.html` Internal Structure

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

## `style.css` Internal Structure

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

## `app.js` Internal Structure

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

## Requirements to Structure Mapping

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

## Architectural Boundaries

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

## Development Workflow

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

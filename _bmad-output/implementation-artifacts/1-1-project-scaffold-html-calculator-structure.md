# Story 1.1: Project Scaffold & HTML Calculator Structure

Status: review

## Story

As a child,
I want to open the calculator in my browser and see the correct button layout,
So that I immediately recognise what the app is and know how to use it.

## Acceptance Criteria

1. **Given** the project files exist at the repository root
   **When** `index.html` is opened in a browser
   **Then** a calculator layout is visible with an answer display zone, equation display zone, digit buttons (0–9), four operator buttons (+, −, ×, ÷), an equals button, and an oops button

2. **Given** the HTML structure is built
   **When** the page is inspected
   **Then** all buttons have `data-action` and `data-value` attributes, operator buttons have `aria-pressed="false"`, the answer display has `aria-live="assertive"`, the equation display has `role="status"` and `aria-live="assertive"`, and the main element has `aria-label="Grade 3 Calculator"`

3. **Given** the project files exist
   **When** the file list is examined
   **Then** the repository root contains `index.html`, `style.css`, `app.js`, `test.html` (empty skeleton), `.nojekyll`, `.gitignore`, and `README.md`

4. **Given** `app.js` is opened
   **When** its contents are read
   **Then** it contains the skeleton IIFE module `Calculator` with empty `dispatch()` and `render()` functions and the state object with all five fields (`phase`, `firstOperand`, `operator`, `secondOperand`, `result`)

## Tasks / Subtasks

- [x] Task 1: Create `index.html` with full semantic calculator structure (AC: 1, 2)
  - [x] 1.1 Add DOCTYPE, head section (charset, viewport, title, description, OG meta tags, link to style.css only)
  - [x] 1.2 Add `<main id="calculator" aria-label="Grade 3 Calculator">`
  - [x] 1.3 Add `.display-answer` div with correct ARIA attributes
  - [x] 1.4 Add `.display-equation` div with correct ARIA attributes
  - [x] 1.5 Add `.button-grid` div containing all buttons with correct data attributes
  - [x] 1.6 Add `<script src="app.js">` as only script (NO other scripts)

- [x] Task 2: Create `style.css` skeleton (AC: 3)
  - [x] 2.1 Create file with header comment only — NO actual styles (styles are Story 1.2)

- [x] Task 3: Create `app.js` with IIFE skeleton (AC: 4)
  - [x] 3.1 Add Section 1: DOM References (all querySelector calls)
  - [x] 3.2 Add Section 2: Constants (MAX_DIGITS, LONG_PRESS_DURATION)
  - [x] 3.3 Add Section 3: State Object (all 5 fields with initial values)
  - [x] 3.4 Add Sections 4–7: empty function stubs in correct order

- [x] Task 4: Create supporting files (AC: 3)
  - [x] 4.1 Create `test.html` — empty HTML skeleton with TODO comment (full implementation is Story 4.3)
  - [x] 4.2 Create `.nojekyll` — empty file (required for GitHub Pages)
  - [x] 4.3 Create `.gitignore` — standard web project ignores (.DS_Store, Thumbs.db, etc.)
  - [x] 4.4 Create `README.md` — project name, brief description, "open index.html in a browser"

- [x] Task 5: Verify (AC: 1)
  - [x] 5.1 Open `index.html` in browser — confirm no console errors and all elements render

## Dev Notes

### Scope Boundary — CRITICAL

**This story creates STRUCTURE only. Do NOT implement in this story:**
- CSS design tokens or any visual styles (that is Story 1.2)
- Any working JavaScript logic (dispatch/render handlers, event listeners — that is Story 2.1)
- The test suite assertions in test.html (that is Story 4.3)

After this story, opening `index.html` will show an unstyled but structurally complete calculator. This is correct and expected.

---

### Exact `index.html` Structure

Follow this structure precisely — architecture document specifies it exactly:

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
    <meta property="og:description" content="A calculator built for grade 3 children. Four operations, big buttons, no account needed.">
    <link rel="stylesheet" href="style.css">
    <!-- NO other external <link> or <script> tags — NFR11 -->
  </head>
  <body>
    <main id="calculator" aria-label="Grade 3 Calculator">

      <!-- Zone 1: Answer display -->
      <div class="display-answer"
           aria-live="assertive"
           aria-label="answer display"
           aria-atomic="true">?</div>

      <!-- Zone 2: Equation display -->
      <div class="display-equation"
           role="status"
           aria-live="assertive"
           aria-label="equation display"
           aria-atomic="true"></div>

      <!-- Zone 3: Button grid (4-col CSS Grid layout — styled in Story 1.2) -->
      <div class="button-grid">

        <!-- Row 1 -->
        <button class="btn-digit" data-action="PRESS_DIGIT" data-value="7">7</button>
        <button class="btn-digit" data-action="PRESS_DIGIT" data-value="8">8</button>
        <button class="btn-digit" data-action="PRESS_DIGIT" data-value="9">9</button>
        <button class="btn-operator" data-action="PRESS_OPERATOR" data-value="÷" aria-pressed="false">÷</button>

        <!-- Row 2 -->
        <button class="btn-digit" data-action="PRESS_DIGIT" data-value="4">4</button>
        <button class="btn-digit" data-action="PRESS_DIGIT" data-value="5">5</button>
        <button class="btn-digit" data-action="PRESS_DIGIT" data-value="6">6</button>
        <button class="btn-operator" data-action="PRESS_OPERATOR" data-value="×" aria-pressed="false">×</button>

        <!-- Row 3 -->
        <button class="btn-digit" data-action="PRESS_DIGIT" data-value="1">1</button>
        <button class="btn-digit" data-action="PRESS_DIGIT" data-value="2">2</button>
        <button class="btn-digit" data-action="PRESS_DIGIT" data-value="3">3</button>
        <button class="btn-operator" data-action="PRESS_OPERATOR" data-value="−" aria-pressed="false">−</button>

        <!-- Row 4 -->
        <button class="btn-oops" id="btn-oops" data-action="PRESS_OOPS">⌫</button>
        <button class="btn-digit" data-action="PRESS_DIGIT" data-value="0">0</button>
        <button class="btn-operator" data-action="PRESS_OPERATOR" data-value="+" aria-pressed="false">+</button>

        <!-- Equals spans rows 1-4 in column 5 — CSS grid-row: span 4 applied in Story 1.2 -->
        <button class="btn-equals" data-action="PRESS_EQUALS">=</button>

      </div>
    </main>
    <script src="app.js"></script>
    <!-- NO other <script> tags — NFR11 -->
  </body>
</html>
```

**ARIA notes:**
- `aria-atomic="true"` on both display zones ensures screen readers announce the full content on every update, not just the changed portion
- `aria-pressed="false"` on operator buttons will be toggled to `"true"` by `render()` in Story 2.1 — set to `"false"` as the default here
- The answer display initialises with `?` as placeholder content — `render()` in Story 2.1 will manage this

---

### Exact `app.js` Skeleton Structure

Follow the mandatory 7-section order from the architecture. All sections must be present even if empty:

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
  phase:         'idle',   // 'idle' | 'first' | 'operator' | 'second' | 'result'
  firstOperand:  '',       // string of digits, e.g. '47'
  operator:      null,     // '+' | '-' | '×' | '÷' | null
  secondOperand: '',       // string of digits, e.g. '36'
  result:        null      // number | null
};

// ─── 4. Calculation Engine (pure — no DOM, no state) ─────────────────────────
function calculate(a, op, b) {
  // TODO: Story 2.2 — implement arithmetic
}

// ─── 5. State Helpers (pure — read state, return values) ─────────────────────
function buildEquationString(s) {
  // TODO: Story 2.1 — build display string from state
}

function isEquationComplete(s) {
  // TODO: Story 2.1 — return true if ready to evaluate
}

function getActiveOperand(s) {
  // TODO: Story 2.1 — return which operand is being edited
}

// ─── 6. Dispatch + Render ────────────────────────────────────────────────────
const Calculator = (() => {
  function dispatch(action, payload) {
    // TODO: Story 2.1 — handle PRESS_DIGIT, PRESS_OPERATOR
    // TODO: Story 2.2 — handle PRESS_EQUALS
    // TODO: Story 3.1 — handle PRESS_OOPS
    // TODO: Story 3.2 — handle LONG_PRESS_CLEAR
    render();
  }

  function render() {
    // TODO: Story 2.1 — update all DOM elements from state
  }

  return { dispatch };
})();

// ─── 7. Event Listeners ──────────────────────────────────────────────────────
// TODO: Story 2.1 — delegated click listener on calculatorEl
// TODO: Story 2.1 — global keyboard listener on document
// TODO: Story 3.2 — pointerdown/pointerup long-press on oopsBtn
```

**Critical rules for `app.js` (enforced by architecture):**
- `ONLY dispatch() may mutate state` — all other functions are pure
- `render()` is called exactly once after every dispatch — it is a pure projection of state to DOM
- Use `textContent` for all dynamic DOM updates — NEVER `innerHTML`
- No `onclick` handlers in HTML — all listeners in `app.js` Section 7
- All magic numbers as named constants in Section 2
- IIFE module name is `Calculator` (PascalCase per naming conventions)

---

### Action Type Registry

The following action type strings are the ONLY valid values for `dispatch()`. No undocumented strings:

| Action | Payload |
|--------|---------|
| `'PRESS_DIGIT'` | string `'0'`–`'9'` |
| `'PRESS_OPERATOR'` | string `'+'`, `'-'`, `'×'`, `'÷'` |
| `'PRESS_EQUALS'` | none |
| `'PRESS_OOPS'` | none |
| `'LONG_PRESS_CLEAR'` | none |

Note: The operator data-value attributes in HTML use `÷` and `×` (Unicode symbols), and `−` (minus sign, U+2212) and `+`. These exact strings are passed as dispatch payloads — be consistent throughout.

---

### `style.css` Skeleton (Story 1.1 only)

Story 1.1 creates the file with a header comment only. Full implementation is Story 1.2:

```css
/* ============================================================
   Bmadcalculator — Design System & Visual Shell
   Design tokens, layout, components, and animations.
   Implemented in Story 1.2.
   ============================================================ */
```

---

### Supporting Files

**`.nojekyll`** — empty file, must exist at repo root. Prevents GitHub Pages from running Jekyll on the repository, which would break the static file serving.

**`.gitignore`** — standard ignores for a web project with no build tools:
```
.DS_Store
Thumbs.db
*.log
.vscode/
.idea/
```

**`test.html`** — empty skeleton. Full assertion suite is Story 4.3:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Bmadcalculator — Test Suite</title>
  </head>
  <body>
    <h1>Bmadcalculator Test Suite</h1>
    <p>TODO: Arithmetic assertions — Story 4.3</p>
  </body>
</html>
```

**`README.md`** — brief project description:
```markdown
# Bmadcalculator

A simple calculator for grade 3 children. Four operations, big buttons, no account needed.

## How to use

Open `index.html` in any modern web browser. No installation required.

## Development

Edit `index.html`, `style.css`, and `app.js` directly. Refresh browser to see changes.
Optional: `npx live-server .` for auto-refresh during development (dev only, never ships).
```

---

### Project Structure Notes

**All files at repository root — no src/, no dist/, no node_modules/:**
```
bmadcalculator/
├── index.html        ← create in this story (full structure)
├── style.css         ← create in this story (skeleton comment only)
├── app.js            ← create in this story (IIFE skeleton)
├── test.html         ← create in this story (empty skeleton)
├── .nojekyll         ← create in this story (empty file)
├── .gitignore        ← create in this story
└── README.md         ← create in this story
```

No `package.json`, no `node_modules`, no build output directories. The deployable artefact is the repository root itself.

### Naming Conventions (from implementation-patterns-consistency-rules.md)

| Construct | Convention | Example |
|-----------|-----------|---------|
| JS functions | camelCase | `buildEquationString()` |
| JS variables | camelCase | `firstOperand` |
| JS constants | UPPER_SNAKE_CASE | `MAX_DIGITS` |
| JS action types | UPPER_SNAKE_CASE string | `'PRESS_DIGIT'` |
| JS state phases | lowercase string | `'idle'`, `'first'` |
| IIFE module name | PascalCase | `Calculator` |
| CSS classes | kebab-case with prefix | `btn-digit`, `is-selected`, `display-answer` |
| CSS custom properties | `--kebab-case` with category | `--color-digit`, `--anim-press` |
| File names | lowercase kebab-case | `index.html`, `style.css`, `app.js` |

### References

- HTML structure: [Source: architecture/project-structure-boundaries.md#index-html-internal-structure]
- app.js section order: [Source: architecture/implementation-patterns-consistency-rules.md#structure-patterns]
- Naming conventions: [Source: architecture/implementation-patterns-consistency-rules.md#naming-patterns]
- Action type registry: [Source: architecture/implementation-patterns-consistency-rules.md#communication-patterns]
- Security rules (textContent, no eval): [Source: architecture/core-architectural-decisions.md#authentication-security]
- Supporting file rationale (.nojekyll): [Source: architecture/project-structure-boundaries.md#complete-project-directory-structure]
- File responsibility boundaries: [Source: architecture/implementation-patterns-consistency-rules.md#structure-patterns]
- FR20, FR27, FR30: [Source: planning-artifacts/prd/functional-requirements.md]
- No external deps (NFR11): [Source: planning-artifacts/prd/non-functional-requirements.md#privacy-child-safety]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_none_

### Completion Notes List

- All 7 files created at repository root matching exact specifications in Dev Notes
- `index.html`: Exact HTML structure from story spec — all ARIA attributes, data-action/data-value, operator aria-pressed="false", answer display initialised to `?`
- `style.css`: Header comment skeleton only — no styles (deferred to Story 1.2)
- `app.js`: Full 7-section IIFE skeleton — DOM refs, constants (MAX_DIGITS=4, LONG_PRESS_DURATION=600), state object (5 fields), pure function stubs, Calculator IIFE with dispatch/render, event listener TODOs
- `test.html`: Empty skeleton with TODO comment for Story 4.3
- `.nojekyll`: Empty file for GitHub Pages
- `.gitignore`: Standard web project ignores
- `README.md`: Project description with "open index.html" instructions
- Scope boundary respected: no CSS styles, no JS logic, no event listeners implemented

### File List

- `index.html` (create)
- `style.css` (create)
- `app.js` (create)
- `test.html` (create)
- `.nojekyll` (create)
- `.gitignore` (create)
- `README.md` (create)

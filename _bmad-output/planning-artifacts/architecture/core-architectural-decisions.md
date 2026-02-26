# Core Architectural Decisions

## Decision Priority Analysis

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

## Data Architecture

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

## Authentication & Security

**Authentication:** None — no accounts, no login, no session tokens. COPPA-compliant by architectural absence of identity infrastructure.

**Security posture:** Enforced structurally:
- No external network calls — no XSS vector from external scripts
- No eval() or dynamic code execution
- No innerHTML assignment with user-controlled strings — all display updates via `textContent`
- No third-party dependencies — zero supply chain attack surface
- No server — no injection, no auth bypass, no server-side vulnerability class

---

## API & Communication Patterns

None. All computation is client-side integer arithmetic. No API calls, no WebSockets, no service workers (MVP). Static files are served as-is by any HTTP host.

**Division by zero handling:** Not an API concern — handled in the JS calculation engine:
- Detected before compute: `if (operator === '÷' && secondOperand === '0')`
- Response: Display `"Oops!"` in answer display (child-appropriate), set phase to `result`, allow normal recovery (tap digit to start fresh)
- No crash, no console error, no alert

---

## Frontend Architecture

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

## Infrastructure & Deployment

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

## Testing Approach

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

## Decision Impact Analysis

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

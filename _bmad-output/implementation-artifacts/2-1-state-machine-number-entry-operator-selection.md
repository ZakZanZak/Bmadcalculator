# Story 2.1: State Machine, Number Entry & Operator Selection

Status: review

## Story

As a child,
I want to tap digit buttons and operator buttons and see my choices reflected on screen,
So that I can build my equation step by step with confidence.

## Acceptance Criteria

1. **Given** the app is open and idle
   **When** a child taps a digit button
   **Then** the digit appears in the answer display, state transitions to `first` phase, and the equation display updates to show the number (FR1, FR7)

2. **Given** a number is being entered
   **When** a child taps more digit buttons in sequence
   **Then** the digits append correctly to form a multi-digit number up to 4 digits (FR1, FR2)

3. **Given** a 4-digit number is already entered
   **When** a child taps another digit button
   **Then** the digit is ignored — no number beyond 4 digits is accepted (FR2)

4. **Given** the display is empty (idle state)
   **When** a child taps 0 followed by another digit
   **Then** the result is the second digit alone, not a leading zero (e.g. tapping 0 then 5 shows 5) (FR3)

5. **Given** a number has been entered
   **When** a child taps an operator button (+, −, ×, or ÷)
   **Then** the operator button receives `.is-selected` class (and `aria-pressed="true"`), state transitions to `operator` phase, and the equation display shows `[number] [operator]` (FR4, FR5, FR7, FR8)

6. **Given** an operator is already selected
   **When** a child taps a different operator button
   **Then** the previous operator loses `.is-selected` (and `aria-pressed="false"`), the new operator gains it, and the equation display updates accordingly (FR6)

## Tasks / Subtasks

- [x] Task 1: Implement `buildEquationString(s)` state helper (AC: 1, 5, 6)
  - [x] 1.1 Return `''` when phase is `idle`
  - [x] 1.2 Return `firstOperand` string when phase is `first`
  - [x] 1.3 Return `firstOperand + ' ' + operator` when phase is `operator`
  - [x] 1.4 Add stubs for `second` and `result` phases (Stories 2.2) with `// TODO` comment

- [x] Task 2: Implement `isEquationComplete(s)` state helper (AC: stubbed for Story 2.2)
  - [x] 2.1 Return `false` for all phases (second operand check is Story 2.2 — stub only)

- [x] Task 3: Implement `getActiveOperand(s)` state helper (AC: stubbed for Story 2.2)
  - [x] 3.1 Return `'firstOperand'` when phase is `first`
  - [x] 3.2 Return `'secondOperand'` when phase is `second` (Story 2.2 will use this)
  - [x] 3.3 Return `null` for all other phases

- [x] Task 4: Implement `dispatch()` — PRESS_DIGIT handler (AC: 1, 2, 3, 4)
  - [x] 4.1 When phase is `idle`: set `firstOperand = payload`, `phase = 'first'`
  - [x] 4.2 When phase is `first` and `firstOperand.length >= MAX_DIGITS`: no-op (silent ignore)
  - [x] 4.3 When phase is `first` and `firstOperand === '0'`: replace with new digit (leading zero prevention)
  - [x] 4.4 When phase is `first` and length < MAX_DIGITS: append digit to `firstOperand`
  - [x] 4.5 Leave `// TODO: Story 2.2` comment for `operator`, `second`, `result` phase handling

- [x] Task 5: Implement `dispatch()` — PRESS_OPERATOR handler (AC: 5, 6)
  - [x] 5.1 When phase is `first`: set `state.operator = payload`, `state.phase = 'operator'`
  - [x] 5.2 When phase is `operator`: set `state.operator = payload` (replace — phase stays `operator`)
  - [x] 5.3 Leave `// TODO: Story 2.2` comment for `result` phase chaining

- [x] Task 6: Implement `render()` — full DOM projection from state (AC: 1, 2, 5, 6)
  - [x] 6.1 Update `answerEl.textContent` — `'?'` when idle, `firstOperand` when `first` or `operator` phase
  - [x] 6.2 Update `equationEl.textContent = buildEquationString(state)`
  - [x] 6.3 Update all `.btn-operator` buttons: `aria-pressed="true/false"` and toggle `.is-selected` class based on `state.operator`

- [x] Task 7: Call `render()` once during IIFE initialization (AC: 1)
  - [x] 7.1 Add `render();` call inside the Calculator IIFE body, before `return { dispatch }`

- [x] Task 8: Add delegated click event listener on `calculatorEl` (AC: 1, 5)
  - [x] 8.1 Listen for `'click'` on `calculatorEl`
  - [x] 8.2 Use `e.target.closest('[data-action]')` to find the button — bail if null
  - [x] 8.3 Call `Calculator.dispatch(btn.dataset.action, btn.dataset.value)`

- [x] Task 9: Add global `keydown` event listener on `document` (AC: 1, 5)
  - [x] 9.1 Digits `'0'`–`'9'`: dispatch `PRESS_DIGIT` with `e.key`
  - [x] 9.2 Key `'+'`: dispatch `PRESS_OPERATOR` with `'+'`
  - [x] 9.3 Key `'-'`: dispatch `PRESS_OPERATOR` with `'−'` (U+2212 minus sign — matches `data-value`)
  - [x] 9.4 Key `'*'`: dispatch `PRESS_OPERATOR` with `'×'`
  - [x] 9.5 Key `'/'`: call `e.preventDefault()` then dispatch `PRESS_OPERATOR` with `'÷'`
  - [x] 9.6 Leave `// TODO` comments for Enter/=, Backspace, Delete/Escape (Stories 2.2, 3.1, 3.2)

- [x] Task 10: Verify in browser (AC: 1–6)
  - [x] 10.1 Open `index.html` — tap digits, confirm answer display and equation display update
  - [x] 10.2 Confirm 4-digit limit — 5th digit tap is silently ignored
  - [x] 10.3 Confirm leading zero prevention — tap 0 then 5, shows `5`
  - [x] 10.4 Confirm operator selection visual state — `.is-selected` and `aria-pressed="true"`
  - [x] 10.5 Confirm operator re-selection — old clears, new highlights
  - [x] 10.6 Confirm keyboard input works (digits and operators)

## Dev Notes

### Scope Boundary — CRITICAL

**This story implements Sections 5, 6, and 7 of `app.js` only. Specifically:**
- Section 5: `buildEquationString`, `isEquationComplete`, `getActiveOperand`
- Section 6: `dispatch()` PRESS_DIGIT + PRESS_OPERATOR handlers + full `render()`
- Section 7: click event listener + keydown event listener

**Do NOT implement in this story:**
- `PRESS_EQUALS` (Story 2.2)
- `calculate()` arithmetic engine (Story 2.2)
- `PRESS_OOPS` short-press (Story 3.1)
- `LONG_PRESS_CLEAR` / pointerdown/pointerup (Story 3.2)
- `secondOperand` entry — `PRESS_DIGIT` in `operator`/`second`/`result` phases (Story 2.2)
- No changes to `index.html` or `style.css`

After this story: tapping digits and operators works visually. The equals button does nothing yet. The oops button does nothing yet.

---

### Critical: Unicode Operator Characters

The HTML `data-value` attributes use Unicode symbols — these same strings MUST be stored in `state.operator` and used as dispatch payloads:

| Button | `data-value` | Unicode | Keyboard key → dispatch payload |
|--------|-------------|---------|--------------------------------|
| Add    | `+`         | U+002B  | `e.key === '+'` → `'+'`        |
| Sub    | `−`         | U+2212  | `e.key === '-'` → `'−'` (U+2212) |
| Mul    | `×`         | U+00D7  | `e.key === '*'` → `'×'`        |
| Div    | `÷`         | U+00F7  | `e.key === '/'` → `'÷'`        |

**CRITICAL:** The minus key (`e.key === '-'`) must dispatch `'−'` (U+2212 MINUS SIGN), NOT `'-'` (U+002D HYPHEN-MINUS). These look similar but are different characters. The `data-value="−"` in the HTML is U+2212. Mismatch will break operator matching in render().

The `state.operator` comment in app.js shows `'+'|'-'|'×'|'÷'` but that comment's `'-'` should be `'−'` (Unicode minus). The actual stored value matches the HTML `data-value`.

---

### Exact `dispatch()` Implementation

Replace the TODOs in the Calculator IIFE's `dispatch()`. Only PRESS_DIGIT and PRESS_OPERATOR are handled here:

```js
function dispatch(action, payload) {
  if (action === 'PRESS_DIGIT') {
    const digit = payload;
    if (state.phase === 'idle' || state.phase === 'first') {
      if (state.firstOperand === '0') {
        // Leading zero: replace '0' with new digit (prevents '05', allows '0')
        state.firstOperand = digit;
      } else if (state.firstOperand.length < MAX_DIGITS) {
        state.firstOperand += digit;
      }
      // else: length >= MAX_DIGITS — silent no-op
      state.phase = 'first';
    }
    // TODO: Story 2.2 — handle PRESS_DIGIT in 'operator', 'second', 'result' phases
  }

  if (action === 'PRESS_OPERATOR') {
    if (state.phase === 'first' || state.phase === 'operator') {
      state.operator = payload;
      state.phase = 'operator';
    }
    // TODO: Story 2.2 — handle PRESS_OPERATOR in 'result' phase (chaining)
  }

  // TODO: Story 2.2 — handle PRESS_EQUALS
  // TODO: Story 3.1 — handle PRESS_OOPS
  // TODO: Story 3.2 — handle LONG_PRESS_CLEAR

  render();
}
```

**No-op rule:** When a press is logically invalid (e.g., `PRESS_DIGIT` in `result` phase — Story 2.2), the `render()` call at the end still runs. Do NOT `return` before `render()` for no-op cases — `render()` must always be called at the end of dispatch.

Exception: shake animation for invalid equals (Story 2.2) adds class then returns before render.

---

### Exact `render()` Implementation

```js
function render() {
  // Answer display
  if (state.phase === 'idle') {
    answerEl.textContent = '?';
  } else if (state.phase === 'first' || state.phase === 'operator') {
    answerEl.textContent = state.firstOperand;
  }
  // TODO: Story 2.2 — second and result phases

  // Equation display
  equationEl.textContent = buildEquationString(state);

  // Operator buttons: aria-pressed + .is-selected
  const operatorBtns = calculatorEl.querySelectorAll('.btn-operator');
  operatorBtns.forEach(btn => {
    const isSelected = btn.dataset.value === state.operator;
    btn.setAttribute('aria-pressed', String(isSelected));
    btn.classList.toggle('is-selected', isSelected);
  });
}
```

---

### Exact `buildEquationString(s)` Implementation

```js
function buildEquationString(s) {
  if (s.phase === 'idle') return '';
  if (s.phase === 'first') return s.firstOperand;
  if (s.phase === 'operator') return s.firstOperand + ' ' + s.operator;
  // TODO: Story 2.2 — second and result phases
  // if (s.phase === 'second') return s.firstOperand + ' ' + s.operator + ' ' + s.secondOperand;
  // if (s.phase === 'result') ...
  return '';
}
```

---

### Exact IIFE Initialization

Add `render()` call inside the Calculator IIFE, before `return { dispatch }`:

```js
const Calculator = (() => {
  function dispatch(action, payload) { /* ... */ }
  function render() { /* ... */ }

  render(); // ← ADD THIS: initialize DOM on page load

  return { dispatch };
})();
```

This ensures the answer display shows `?` and operator buttons have `aria-pressed="false"` immediately when the page loads, without requiring a user action.

---

### Exact Section 7 Event Listeners

Replace the TODO comments in Section 7:

```js
// ─── 7. Event Listeners ──────────────────────────────────────────────────────

// Delegated click — all buttons (oops long-press handled separately in Story 3.2)
calculatorEl.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  Calculator.dispatch(btn.dataset.action, btn.dataset.value);
});

// Global keyboard — digit and operator keys
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    Calculator.dispatch('PRESS_DIGIT', e.key);
  } else if (e.key === '+') {
    Calculator.dispatch('PRESS_OPERATOR', '+');
  } else if (e.key === '-') {
    Calculator.dispatch('PRESS_OPERATOR', '−'); // U+2212 — matches data-value in HTML
  } else if (e.key === '*') {
    Calculator.dispatch('PRESS_OPERATOR', '×');
  } else if (e.key === '/') {
    e.preventDefault(); // prevent browser quick-find shortcut
    Calculator.dispatch('PRESS_OPERATOR', '÷');
  }
  // TODO: Story 2.2 — 'Enter', '=' keys → PRESS_EQUALS
  // TODO: Story 3.1 — 'Backspace' key → PRESS_OOPS
  // TODO: Story 3.2 — 'Delete', 'Escape' keys → LONG_PRESS_CLEAR
});

// TODO: Story 3.2 — pointerdown/pointerup long-press on oopsBtn
```

---

### Architecture Rules (enforced)

| Rule | Requirement |
|------|-------------|
| `dispatch()` only mutates `state` | No other function writes to `state` |
| `render()` called exactly once per dispatch | Already at end of `dispatch()` skeleton |
| `textContent` only | Never `innerHTML` for dynamic content |
| `aria-pressed` | Updated by `render()` — never by event listeners directly |
| `.is-selected` | Toggled by `render()` using `classList.toggle(name, bool)` |
| No `onclick` in HTML | All listeners in Section 7 only |
| Keyboard `/` | Must call `e.preventDefault()` to suppress browser find |

---

### Previous Story Intelligence

**Story 1.1 (review):** Created `app.js` 7-section IIFE skeleton with exact section structure, state object, DOM refs, constants. Do NOT move or reorder sections — add code into the correct existing section.

**Story 1.2 (review):** CSS is complete. `.is-selected` class is defined and styled with amber outline ring. `aria-pressed` is already set to `"false"` on all operator buttons in the HTML. `render()` toggling these is the only change needed — CSS already handles the visual.

### Project Structure Notes

- Only file changed: `app.js` at repository root
- `index.html` and `style.css` unchanged

### References

- Action type registry: [Source: architecture/implementation-patterns-consistency-rules.md#communication-patterns]
- `dispatch()` pattern: [Source: architecture/core-architectural-decisions.md#frontend-architecture]
- `render()` pure projection rule: [Source: architecture/implementation-patterns-consistency-rules.md#communication-patterns]
- `textContent` / no `innerHTML`: [Source: architecture/implementation-patterns-consistency-rules.md#process-patterns]
- Keyboard mapping: [Source: architecture/core-architectural-decisions.md#keyboard-support]
- Unicode operator characters: [Source: architecture/implementation-patterns-consistency-rules.md#communication-patterns]
- FR1, FR2, FR3: Number entry [Source: planning-artifacts/epics.md#story-2-1]
- FR4, FR5, FR6: Operator selection [Source: planning-artifacts/epics.md#story-2-1]
- FR7, FR8: Equation display [Source: planning-artifacts/epics.md#story-2-1]
- `e.closest('[data-action]')` delegated listener: [Source: architecture/core-architectural-decisions.md#event-handling]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_none_

### Completion Notes List

- Implemented Section 5: `buildEquationString`, `isEquationComplete`, `getActiveOperand` — all with Story 2.2 TODOs stubbed in place
- Implemented Section 6: `dispatch()` with PRESS_DIGIT (idle/first phases, 4-digit cap, leading zero prevention) and PRESS_OPERATOR (first/operator phases, replace-on-reselect); `render()` projects full DOM state each call; initial `render()` call added inside IIFE before `return { dispatch }`
- Implemented Section 7: delegated click listener using `e.target.closest('[data-action]')`; global keydown listener with `e.key === '-'` correctly dispatching U+2212 minus sign (not hyphen); `e.preventDefault()` on `/` key
- PRESS_DIGIT in `idle` phase: condition `state.phase === 'idle' || state.phase === 'first'` combined — on idle the `firstOperand` starts empty so `firstOperand === '0'` is false and length check allows the digit, then phase sets to `'first'`. Works correctly.
- No changes to `index.html` or `style.css` — scope boundary respected

### File List

- `app.js` (modified — Sections 5, 6, 7 implemented)

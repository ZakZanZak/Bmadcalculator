# Story 2.2: Equation Completion, Calculation & Animated Answer

Status: review

## Story

As a child,
I want to enter a second number, press equals, and see my answer appear with a satisfying animation,
So that completing a calculation feels rewarding and I can check my work.

## Acceptance Criteria

1. **Given** an operator has been selected
   **When** a child taps digit buttons
   **Then** digits are entered as the second operand, state transitions to `second` phase, and the equation display shows the full equation so far (FR1, FR7, FR8)

2. **Given** a complete equation is built (first number + operator + second number)
   **When** a child taps the equals button
   **Then** the correct arithmetic result is computed and displayed in the answer display (FR10, FR11, FR13)

3. **Given** the equals button is tapped and a result is shown
   **When** the answer display updates
   **Then** the result appears with a bounce animation (~400ms, `@keyframes answerReveal` triggered by adding `.is-animating` class), drawing attention to the answer (FR12)

4. **Given** the equals button is tapped with ÷ and the second operand is 0
   **When** the calculation is attempted
   **Then** the answer display shows `"Oops!"`, no crash or console error occurs, and the child can start a new calculation by tapping a digit (FR14)

5. **Given** a result is displayed
   **When** a child taps any digit button
   **Then** the state resets to `first` phase with the new digit, the equation display clears, and a new calculation begins (FR9, FR15)

6. **Given** the equation display is visible throughout
   **When** the child is at any stage of entry
   **Then** the equation display persistently shows the current equation state — first number, operator (if selected), and second number (if entered) (FR8)

7. **Given** equals is pressed but the equation is incomplete (no second operand entered)
   **When** the press is detected
   **Then** the equation display briefly shakes (`.is-shake` animation) and no calculation is performed

8. **Given** a numeric result is displayed (not "Oops!")
   **When** the child taps an operator button
   **Then** the result becomes the first operand, the operator is selected, state transitions to `operator` phase, and the child can continue with a chained calculation (FR15)

## Tasks / Subtasks

- [x] Task 1: Implement `calculate(a, op, b)` — Section 4 (AC: 2, 4)
  - [x] 1.1 Convert `a` and `b` to numbers using `Number()`
  - [x] 1.2 If `op === '÷'` and `Number(b) === 0`: return `'Oops!'`
  - [x] 1.3 Otherwise compute: `+` → add, `−` (U+2212) → subtract, `×` → multiply, `÷` → divide
  - [x] 1.4 Return the numeric result (no rounding — display as-is)

- [x] Task 2: Update `isEquationComplete(s)` — Section 5 (AC: 2, 7)
  - [x] 2.1 Return `true` when `s.phase === 'second'` and `s.secondOperand.length > 0`
  - [x] 2.2 Return `false` for all other phases

- [x] Task 3: Update `buildEquationString(s)` — Section 5 (AC: 1, 6)
  - [x] 3.1 Remove the `// TODO: Story 2.2` comment block
  - [x] 3.2 Add: `if (s.phase === 'second') return s.firstOperand + ' ' + s.operator + ' ' + s.secondOperand`
  - [x] 3.3 Add: `if (s.phase === 'result') return s.firstOperand + ' ' + s.operator + ' ' + s.secondOperand + ' ='`

- [x] Task 4: Update `dispatch()` — PRESS_DIGIT for `operator`/`second`/`result` phases (AC: 1, 5)
  - [x] 4.1 Remove the `// TODO: Story 2.2 — handle PRESS_DIGIT in 'operator', 'second', 'result' phases` comment
  - [x] 4.2 `operator` phase: set `state.secondOperand = digit`, `state.phase = 'second'`
  - [x] 4.3 `second` phase: same leading-zero prevention and 4-digit cap as first operand, applied to `secondOperand`
  - [x] 4.4 `result` phase: start fresh — reset `firstOperand = digit`, `secondOperand = ''`, `operator = null`, `result = null`, `phase = 'first'`

- [x] Task 5: Update `dispatch()` — PRESS_OPERATOR for `result` phase (AC: 8)
  - [x] 5.1 Remove the `// TODO: Story 2.2 — handle PRESS_OPERATOR in 'result' phase (chaining)` comment
  - [x] 5.2 `result` phase AND `typeof state.result === 'number'`: set `firstOperand = String(state.result)`, `secondOperand = ''`, `result = null`, `operator = payload`, `phase = 'operator'`
  - [x] 5.3 `result` phase AND result is NOT a number (i.e. `'Oops!'`): silent no-op (fall through to render)

- [x] Task 6: Implement `dispatch()` — PRESS_EQUALS handler (AC: 2, 3, 4, 7)
  - [x] 6.1 Remove the `// TODO: Story 2.2 — handle PRESS_EQUALS` comment
  - [x] 6.2 If `!isEquationComplete(state)`: add `.is-shake` to `equationEl`, register `animationend` listener (`{ once: true }`) to remove it, then `return` — **DO NOT call `render()` after this return** (shake is the exception to the render-always rule)
  - [x] 6.3 Otherwise: call `calculate(state.firstOperand, state.operator, state.secondOperand)`, store result in `state.result`, set `state.phase = 'result'`
  - [x] 6.4 Fall through to `render()` at end of dispatch (result phase render handles animation)

- [x] Task 7: Update `render()` — second and result phases (AC: 1, 3)
  - [x] 7.1 Remove the `// TODO: Story 2.2 — second and result phases` comment
  - [x] 7.2 Add `second` phase: `answerEl.textContent = state.secondOperand`
  - [x] 7.3 Add `result` phase: `answerEl.textContent = String(state.result)`, then add `.is-animating` class and register `animationend` listener (`{ once: true }`) to remove it

- [x] Task 8: Update Section 7 keydown listener — Enter/= keys (AC: 2)
  - [x] 8.1 Remove the `// TODO: Story 2.2 — 'Enter', '=' keys → PRESS_EQUALS` comment
  - [x] 8.2 Add: `else if (e.key === 'Enter' || e.key === '=') { Calculator.dispatch('PRESS_EQUALS'); }`

- [x] Task 9: Verify in browser (AC: 1–8)
  - [x] 9.1 Enter `3 + 5 =` — confirm answer shows `8` with bounce animation
  - [x] 9.2 Enter `9 ÷ 0 =` — confirm answer shows `Oops!`, no crash
  - [x] 9.3 Tap digit after result — confirm new calculation starts fresh
  - [x] 9.4 Tap operator after numeric result — confirm chaining: result becomes first operand
  - [x] 9.5 Press equals with only first operand entered — confirm shake, no calculation
  - [x] 9.6 Confirm equation display tracks all phases: `3` → `3 +` → `3 + 5` → `3 + 5 =`
  - [x] 9.7 Confirm keyboard Enter and = trigger calculation
  - [x] 9.8 Confirm 4-digit cap on second operand

---

## Dev Notes

### Scope Boundary — CRITICAL

**This story implements changes to Sections 4, 5, 6, and 7 of `app.js` only:**
- Section 4: `calculate()` arithmetic implementation (currently has `// TODO: Story 2.2` stub)
- Section 5: `isEquationComplete()` update + `buildEquationString()` second/result phases
- Section 6: `dispatch()` remaining phase handlers + PRESS_EQUALS; `render()` second/result phases
- Section 7: Enter/= keydown handlers

**Do NOT implement in this story:**
- `PRESS_OOPS` short-press (Story 3.1)
- `LONG_PRESS_CLEAR` / pointerdown/pointerup (Story 3.2)
- No changes to `index.html` or `style.css` — both are fully prepared already

After this story: the full basic calculation loop works. Oops button does nothing yet.

---

### Exact `calculate(a, op, b)` Implementation

Replaces the `// TODO: Story 2.2` stub in Section 4:

```js
function calculate(a, op, b) {
  const numA = Number(a);
  const numB = Number(b);
  if (op === '÷') {
    if (numB === 0) return 'Oops!';
    return numA / numB;
  }
  if (op === '+') return numA + numB;
  if (op === '−') return numA - numB; // U+2212 minus sign — matches data-value in HTML
  if (op === '×') return numA * numB;
  return null;
}
```

**Notes:**
- Uses `Number()` (not `parseInt`/`parseFloat`) — operands are always clean digit strings
- Division by zero returns the string `'Oops!'`, not a number — render() handles both with `String(state.result)`
- No rounding — `7 ÷ 2` correctly displays `3.5`
- The operator `'−'` (U+2212 MINUS SIGN) must match exactly — it was dispatched as U+2212 in Story 2.1

---

### Exact `isEquationComplete(s)` Implementation

Replaces the stub from Story 2.1:

```js
function isEquationComplete(s) {
  return s.phase === 'second' && s.secondOperand.length > 0;
}
```

Since the only way to enter `second` phase is via `PRESS_DIGIT` in `operator` phase, `secondOperand` will always have length > 0 in `second` phase. The `.length > 0` check is defensive and harmless.

---

### Exact `buildEquationString(s)` Update

Replace the two TODO comment lines in the existing function with actual implementations:

```js
function buildEquationString(s) {
  if (s.phase === 'idle') return '';
  if (s.phase === 'first') return s.firstOperand;
  if (s.phase === 'operator') return s.firstOperand + ' ' + s.operator;
  if (s.phase === 'second') return s.firstOperand + ' ' + s.operator + ' ' + s.secondOperand;
  if (s.phase === 'result') return s.firstOperand + ' ' + s.operator + ' ' + s.secondOperand + ' =';
  return '';
}
```

---

### Exact `dispatch()` Updates

**PRESS_DIGIT — add the three new `else if` branches inside the `PRESS_DIGIT` block:**

```js
if (action === 'PRESS_DIGIT') {
  const digit = payload;
  if (state.phase === 'idle' || state.phase === 'first') {
    if (state.firstOperand === '0') {
      state.firstOperand = digit;
    } else if (state.firstOperand.length < MAX_DIGITS) {
      state.firstOperand += digit;
    }
    state.phase = 'first';
  } else if (state.phase === 'operator') {
    state.secondOperand = digit;
    state.phase = 'second';
  } else if (state.phase === 'second') {
    if (state.secondOperand === '0') {
      state.secondOperand = digit;
    } else if (state.secondOperand.length < MAX_DIGITS) {
      state.secondOperand += digit;
    }
    // else: length >= MAX_DIGITS — silent no-op
  } else if (state.phase === 'result') {
    // Start fresh new calculation
    state.firstOperand = digit;
    state.secondOperand = '';
    state.operator = null;
    state.result = null;
    state.phase = 'first';
  }
}
```

**PRESS_OPERATOR — add the `result` phase chaining branch:**

```js
if (action === 'PRESS_OPERATOR') {
  if (state.phase === 'first' || state.phase === 'operator') {
    state.operator = payload;
    state.phase = 'operator';
  } else if (state.phase === 'result' && typeof state.result === 'number') {
    // Chain: result becomes first operand for next equation
    state.firstOperand = String(state.result);
    state.secondOperand = '';
    state.result = null;
    state.operator = payload;
    state.phase = 'operator';
  }
  // If result is 'Oops!' (string), silently ignore — child should tap a digit to start fresh
}
```

**PRESS_EQUALS — new handler (replaces the TODO comment):**

```js
if (action === 'PRESS_EQUALS') {
  if (!isEquationComplete(state)) {
    equationEl.classList.add('is-shake');
    equationEl.addEventListener('animationend', () => {
      equationEl.classList.remove('is-shake');
    }, { once: true });
    return; // EXCEPTION: return before render() — shake is the visual feedback
  }
  state.result = calculate(state.firstOperand, state.operator, state.secondOperand);
  state.phase = 'result';
}
```

**Critical no-op rule reminder:** The `return` before `render()` in the shake case is the ONLY exception to the render-always rule. All other no-ops (e.g. `PRESS_DIGIT` length >= MAX_DIGITS, `PRESS_OPERATOR` when `result` is `'Oops!'`) fall through to `render()` at the end of dispatch.

---

### Exact `render()` Updates

Add the two missing `else if` branches to the answer display block:

```js
function render() {
  // Answer display
  if (state.phase === 'idle') {
    answerEl.textContent = '?';
  } else if (state.phase === 'first' || state.phase === 'operator') {
    answerEl.textContent = state.firstOperand;
  } else if (state.phase === 'second') {
    answerEl.textContent = state.secondOperand;
  } else if (state.phase === 'result') {
    answerEl.textContent = String(state.result);
    answerEl.classList.add('is-animating');
    answerEl.addEventListener('animationend', () => {
      answerEl.classList.remove('is-animating');
    }, { once: true });
  }

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

**Animation notes:**
- `is-animating` is applied in `render()` when transitioning into `result` phase. `render()` in `result` phase is only called once per PRESS_EQUALS (subsequent dispatches from result phase immediately leave that phase). The `{ once: true }` listener self-cleans after `animationend` fires.
- `is-animating` class and `@keyframes answerReveal` are already defined in `style.css` from Story 1.2. Do NOT modify `style.css`.
- `is-shake` class and `@keyframes shake` are already defined in `style.css`. Do NOT modify `style.css`.

---

### Exact Section 7 Keydown Update

Replace the `// TODO: Story 2.2 — 'Enter', '=' keys → PRESS_EQUALS` comment:

```js
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
  } else if (e.key === 'Enter' || e.key === '=') {
    Calculator.dispatch('PRESS_EQUALS');
  }
  // TODO: Story 3.1 — 'Backspace' key → PRESS_OOPS
  // TODO: Story 3.2 — 'Delete', 'Escape' keys → LONG_PRESS_CLEAR
});
```

---

### Architecture Rules (enforced)

| Rule | Requirement |
|------|-------------|
| `dispatch()` only mutates `state` | No other function writes to `state` |
| `render()` called exactly once per dispatch | Exception: shake returns early before `render()` |
| `textContent` only | Never `innerHTML` for dynamic content |
| Animation cleanup | `animationend` + `{ once: true }` — never `setTimeout` |
| `calculate()` is pure | No DOM access, no `state` access — only `a`, `op`, `b` parameters |
| Division by zero | Returns `'Oops!'` string — not an exception, not `null`, not `0` |
| Operator chaining guard | Only chain if `typeof state.result === 'number'` — never chain from `'Oops!'` |

---

### Critical: Unicode Operators in calculate()

The operator stored in `state.operator` uses the same Unicode characters as `data-value` in HTML:

| Operator | `state.operator` / `data-value` | Unicode | In `calculate()` |
|----------|--------------------------------|---------|-----------------|
| Add | `+` | U+002B | `op === '+'` |
| Subtract | `−` | U+2212 | `op === '−'` (U+2212 — NOT hyphen U+002D) |
| Multiply | `×` | U+00D7 | `op === '×'` |
| Divide | `÷` | U+00F7 | `op === '÷'` |

**CRITICAL:** `calculate()` must use `'−'` (U+2212) in its `if (op === '−')` check — NOT `'-'` (hyphen). Copy the character from the HTML `data-value` attribute or this comment to guarantee correctness.

---

### Previous Story Intelligence (Story 2.1)

**What was implemented:**
- `dispatch()` PRESS_DIGIT: handles `idle`/`first` phases only — 4-digit cap, leading zero prevention
- `dispatch()` PRESS_OPERATOR: handles `first`/`operator` phases only — operator replace on reselect
- `render()`: handles `idle`/`first`/`operator` phases; operator button `aria-pressed`/`.is-selected`
- Section 7: click listener + keydown listener (digits and operators only)
- `buildEquationString`: handles `idle`/`first`/`operator` phases
- `isEquationComplete`: stub returning `false`

**Exact TODOs left in Story 2.1 for this story to fill:**
- In `dispatch()` PRESS_DIGIT: `// TODO: Story 2.2 — handle PRESS_DIGIT in 'operator', 'second', 'result' phases`
- In `dispatch()` PRESS_OPERATOR: `// TODO: Story 2.2 — handle PRESS_OPERATOR in 'result' phase (chaining)`
- In `dispatch()`: `// TODO: Story 2.2 — handle PRESS_EQUALS`
- In `render()`: `// TODO: Story 2.2 — second and result phases`
- In keydown listener: `// TODO: Story 2.2 — 'Enter', '=' keys → PRESS_EQUALS`
- In `buildEquationString()`: the two commented-out `// if (s.phase === 'second')...` and `// if (s.phase === 'result')...` lines

**Leading zero logic carried forward to `secondOperand`:** Same pattern as `firstOperand`. The `operator` → `second` transition sets `secondOperand = digit` directly (no length check needed — it's the first character). The `second` → `second` transitions apply the same `=== '0'` replace and `< MAX_DIGITS` append logic.

---

### Project Structure Notes

- Only file changed: `app.js` at repository root
- `index.html` and `style.css` are unchanged — all CSS classes (`is-animating`, `is-shake`) and animations (`answerReveal`, `shake`) are already defined in `style.css` from Story 1.2

### References

- `calculate()` pure function: [Source: architecture/core-architectural-decisions.md#testing-approach]
- Division by zero: [Source: architecture/core-architectural-decisions.md#api-communication-patterns]
- Animation trigger pattern (`animationend`, `{ once: true }`): [Source: architecture/implementation-patterns-consistency-rules.md#process-patterns]
- No-op / shake pattern: [Source: architecture/implementation-patterns-consistency-rules.md#process-patterns]
- State transitions (result → chaining): [Source: architecture/core-architectural-decisions.md#data-architecture]
- Unicode operators: [Source: architecture/implementation-patterns-consistency-rules.md#communication-patterns]
- FR9, FR15: new calculation from result [Source: planning-artifacts/epics.md#story-2-2]
- FR10, FR11: equals + result display [Source: planning-artifacts/epics.md#story-2-2]
- FR12: animated answer reveal [Source: planning-artifacts/epics.md#story-2-2]
- FR13: arithmetic correctness [Source: planning-artifacts/epics.md#story-2-2]
- FR14: division by zero [Source: planning-artifacts/epics.md#story-2-2]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_none_

### Completion Notes List

- Implemented `calculate(a, op, b)` — pure function using `Number()` conversion; division by zero returns `'Oops!'` string; operator `'−'` uses U+2212 to match HTML `data-value`
- Updated `isEquationComplete(s)` — returns `true` only in `second` phase with non-empty `secondOperand`
- Updated `buildEquationString(s)` — removed TODO stubs, implemented `second` phase (`A op B`) and `result` phase (`A op B =`)
- Updated `dispatch()` PRESS_DIGIT — added `operator`→`second` transition, `second` phase (leading-zero prevention + 4-digit cap on secondOperand), `result` phase (full state reset + new digit)
- Updated `dispatch()` PRESS_OPERATOR — added `result` phase chaining guarded by `typeof state.result === 'number'`; silent no-op if result is `'Oops!'`
- Implemented `dispatch()` PRESS_EQUALS — `isEquationComplete` guard with `.is-shake` + early `return` (render exception); otherwise computes result, sets phase to `result`
- Updated `render()` — added `second` phase (shows `secondOperand`), `result` phase (shows `String(state.result)`, adds `.is-animating` class, removes via `animationend` + `{ once: true }`)
- Updated Section 7 keydown — `Enter` and `=` keys dispatch `PRESS_EQUALS`; fixed a syntax error where `} else if` was accidentally placed after closing `}` of the if-chain
- No changes to `index.html` or `style.css` — all CSS classes (`is-animating`, `is-shake`) and animations already defined in Story 1.2
- Formal test suite deferred to Story 4.3 (`test.html` arithmetic assertion suite)

### File List

- `app.js` (modified — Sections 4, 5, 6, 7)

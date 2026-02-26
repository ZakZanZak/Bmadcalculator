# Story 3.1: Short-Press Oops — Remove Last Digit

Status: review

## Story

As a child,
I want to tap the oops button to undo my last digit,
So that I can fix a mistake instantly without starting over.

## Acceptance Criteria

1. **Given** a child has entered one or more digits
   **When** the oops button is tapped (short press)
   **Then** the most recently entered digit is removed from the current operand and the display updates immediately (FR16)

2. **Given** a child has entered a single digit
   **When** the oops button is tapped
   **Then** the operand becomes empty and the state regresses to the appropriate prior phase (`first` → `idle`, `second` → `operator`) (FR16)

3. **Given** the child is in `operator` phase (first number entered, operator selected, no second number yet)
   **When** the oops button is tapped
   **Then** the operator is deselected, its visual state resets, and state regresses to `first` phase (FR16, FR19)

4. **Given** the child is at any phase of equation entry (`idle`, `first`, `operator`, `second`)
   **When** the oops button is tapped
   **Then** the button is always visible and reachable — it is never hidden or disabled (FR19)

5. **Given** the child presses `Backspace` on the keyboard
   **When** the key is detected
   **Then** it behaves identically to tapping the oops button (FR25)

## Tasks / Subtasks

- [x] Task 1: Implement `dispatch()` — PRESS_OOPS handler (AC: 1, 2, 3, 4)
  - [x] 1.1 `first` phase, `firstOperand.length > 1`: slice last char — `state.firstOperand = state.firstOperand.slice(0, -1)`
  - [x] 1.2 `first` phase, `firstOperand.length <= 1`: clear operand and regress — `state.firstOperand = ''`, `state.phase = 'idle'`
  - [x] 1.3 `operator` phase: deselect operator — `state.operator = null`, `state.phase = 'first'`
  - [x] 1.4 `second` phase, `secondOperand.length > 1`: slice last char — `state.secondOperand = state.secondOperand.slice(0, -1)`
  - [x] 1.5 `second` phase, `secondOperand.length <= 1`: clear operand and regress — `state.secondOperand = ''`, `state.phase = 'operator'`
  - [x] 1.6 `idle` phase: silent no-op (nothing to remove)
  - [x] 1.7 `result` phase: silent no-op (child taps a digit to start fresh)

- [x] Task 2: Update Section 7 keydown listener — Backspace key (AC: 5)
  - [x] 2.1 Remove the `// TODO: Story 3.1 — 'Backspace' key → PRESS_OOPS` comment
  - [x] 2.2 Add: `else if (e.key === 'Backspace') { Calculator.dispatch('PRESS_OOPS'); }`

- [x] Task 3: Verify in browser (AC: 1–5)
  - [x] 3.1 Enter `47`, tap oops → shows `4`; tap oops again → idle (`?`)
  - [x] 3.2 Enter `3`, select `+`, tap oops → operator deselected, equation shows `3`, back in `first` phase
  - [x] 3.3 Enter `3 + 5`, tap oops → equation shows `3 +`, back in `operator` phase
  - [x] 3.4 Tap oops in `idle` — no crash, display stays `?`
  - [x] 3.5 `Backspace` key works identically to button tap

---

## Dev Notes

### Scope Boundary — CRITICAL

**This story modifies `app.js` Section 6 (`dispatch()`) and Section 7 (keydown) only:**
- Section 6: add `PRESS_OOPS` handler (one `if` block, replaces the `// TODO: Story 3.1` comment)
- Section 7: add `Backspace` key handler (one `else if`, replaces the `// TODO: Story 3.1` comment)

**Do NOT implement in this story:**
- `LONG_PRESS_CLEAR` / pointerdown/pointerup (Story 3.2)
- `render()` — **no changes needed** — existing phase projections already work correctly for all post-PRESS_OOPS states (see explanation below)
- No changes to `index.html` or `style.css`

---

### Why `render()` Needs No Changes

After `PRESS_OOPS` mutates state, `render()` at the end of `dispatch()` projects the new state onto the DOM. The existing render logic already handles every resulting state correctly:

| PRESS_OOPS scenario | State after | render() result |
|---|---|---|
| `first` → remove digit (still first) | `phase:'first'`, shorter `firstOperand` | `answerEl` shows shorter number ✓ |
| `first` → last digit removed | `phase:'idle'`, `firstOperand:''` | `answerEl` shows `?` ✓ |
| `operator` → operator removed | `phase:'first'`, `operator:null` | `answerEl` shows `firstOperand`; all operator buttons `aria-pressed="false"`, `.is-selected` cleared ✓ |
| `second` → remove digit (still second) | `phase:'second'`, shorter `secondOperand` | `answerEl` shows shorter `secondOperand` ✓ |
| `second` → last digit removed | `phase:'operator'`, `secondOperand:''` | `answerEl` shows `firstOperand`; equation shows `firstOperand + ' ' + operator` ✓ |
| `idle` (no-op) | unchanged | unchanged ✓ |
| `result` (no-op) | unchanged | unchanged ✓ |

The operator button `is-selected` deselection (AC 3) is handled by `render()`'s `forEach` loop: when `state.operator === null`, `btn.dataset.value === null` is always `false`, so all operator buttons lose `.is-selected` and get `aria-pressed="false"`.

---

### Exact `dispatch()` PRESS_OOPS Implementation

Replace the `// TODO: Story 3.1 — handle PRESS_OOPS` comment with:

```js
if (action === 'PRESS_OOPS') {
  if (state.phase === 'first') {
    if (state.firstOperand.length > 1) {
      state.firstOperand = state.firstOperand.slice(0, -1);
    } else {
      // Last digit removed — regress to idle
      state.firstOperand = '';
      state.phase = 'idle';
    }
  } else if (state.phase === 'operator') {
    // Remove operator — regress to first phase
    state.operator = null;
    state.phase = 'first';
  } else if (state.phase === 'second') {
    if (state.secondOperand.length > 1) {
      state.secondOperand = state.secondOperand.slice(0, -1);
    } else {
      // Last digit removed — regress to operator phase
      state.secondOperand = '';
      state.phase = 'operator';
    }
  }
  // idle phase: no-op (nothing to remove)
  // result phase: no-op (child should press digit to start fresh, or hold oops for full clear)
}
```

The existing `// TODO: Story 3.2 — handle LONG_PRESS_CLEAR` comment below it is **preserved** — do not remove it.

---

### Exact Section 7 Keydown Update

Replace `// TODO: Story 3.1 — 'Backspace' key → PRESS_OOPS` with a new `else if` in the existing chain:

```js
} else if (e.key === 'Enter' || e.key === '=') {
  Calculator.dispatch('PRESS_EQUALS');
} else if (e.key === 'Backspace') {
  Calculator.dispatch('PRESS_OOPS');
}
// TODO: Story 3.2 — 'Delete', 'Escape' keys → LONG_PRESS_CLEAR
```

---

### Important: Click Handler Already Works

The oops button in `index.html` is:
```html
<button class="btn-oops" id="btn-oops" data-action="PRESS_OOPS">⌫</button>
```

The existing delegated click listener in Section 7:
```js
calculatorEl.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  Calculator.dispatch(btn.dataset.action, btn.dataset.value);
});
```

When the oops button is clicked, `btn.dataset.action` = `'PRESS_OOPS'` and `btn.dataset.value` = `undefined`. `dispatch('PRESS_OOPS', undefined)` is correct — `PRESS_OOPS` takes no payload.

**No HTML changes needed.** The click routing is already wired from Story 2.1.

---

### Story 3.2 Interaction Note

Story 3.2 will add `pointerdown`/`pointerup` listeners **specifically on `oopsBtn`** to handle the long-press timer. In that story, `PRESS_OOPS` will be dispatched from `pointerup` (when the timer hasn't fired). At that point, Story 3.2 must handle the potential double-dispatch between the `pointerup` handler and the `click` event. That is **Story 3.2's responsibility** — do not pre-solve it here.

---

### Previous Story Intelligence

**Story 2.2 (review):** Implemented full calculation loop. No issues affecting this story.

**Story 2.1 (review):** Established all event listener patterns. The click delegation and keydown `else if` chain are the patterns to follow.

**Current `app.js` TODOs for this story:**
```
Line 115: // TODO: Story 3.1 — handle PRESS_OOPS
Line 179: // TODO: Story 3.1 — 'Backspace' key → PRESS_OOPS
```

---

### Architecture Rules (enforced)

| Rule | Requirement |
|------|-------------|
| `dispatch()` only mutates `state` | PRESS_OOPS handler only touches `state.firstOperand`, `state.secondOperand`, `state.operator`, `state.phase` |
| `render()` called after every dispatch | No early return for PRESS_OOPS — always falls through to `render()` |
| `textContent` only | Not applicable — this story has no new DOM writes |
| No `onclick` in HTML | All wiring already in place from Story 2.1 |

### Project Structure Notes

- Only file changed: `app.js` at repository root
- `index.html` unchanged — `data-action="PRESS_OOPS"` already present on oops button
- `style.css` unchanged

### References

- Action type `'PRESS_OOPS'`: [Source: architecture/implementation-patterns-consistency-rules.md#communication-patterns]
- State transition `any → oops short-press`: [Source: architecture/core-architectural-decisions.md#data-architecture]
- No-op rule (no early return for PRESS_OOPS): [Source: architecture/implementation-patterns-consistency-rules.md#process-patterns]
- FR16: remove last digit [Source: planning-artifacts/epics.md#story-3-1]
- FR19: oops always accessible [Source: planning-artifacts/epics.md#story-3-1]
- FR25: keyboard Backspace [Source: planning-artifacts/epics.md#story-4-1]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_none_

### Completion Notes List

- Implemented PRESS_OOPS handler in `dispatch()`: `first` phase slices/regresses to idle; `operator` phase clears operator and regresses to first; `second` phase slices/regresses to operator; `idle` and `result` phases are silent no-ops
- Added `Backspace` key → `PRESS_OOPS` to Section 7 keydown `else if` chain
- `render()` required no changes — existing phase projections correctly handle all post-PRESS_OOPS states (operator button `.is-selected` cleared automatically when `state.operator === null`)
- Click routing for oops button already worked via delegated listener from Story 2.1 — `data-action="PRESS_OOPS"` confirmed in index.html

### File List

- `app.js` (modified — Section 6 dispatch PRESS_OOPS handler; Section 7 Backspace keydown)

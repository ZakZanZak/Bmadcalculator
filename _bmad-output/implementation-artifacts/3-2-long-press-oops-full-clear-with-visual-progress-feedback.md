# Story 3.2: Long-Press Oops — Full Clear with Visual Progress Feedback

Status: review

## Story

As a child,
I want to hold the oops button to wipe the whole equation and start fresh,
So that when I want to start over I can clear everything in one confident action.

## Acceptance Criteria

1. **Given** a child is at any stage of equation entry
   **When** the child presses and holds the oops button for ≥600ms
   **Then** the entire equation is cleared, state resets to `idle`, the equation display empties, and the answer display resets to `?` (FR17)

2. **Given** the child begins pressing and holding the oops button
   **When** the hold duration is between 0ms and 600ms
   **Then** a visual progress ring (`@keyframes ringFill` via `.is-longpress::after` pseudo-element) animates around the oops button to signal the long-press is in progress (FR18)

3. **Given** the child starts a long-press but releases before 600ms
   **When** the pointer is lifted
   **Then** the progress ring animation is cancelled and removed, the short-press oops action fires (removes last digit), and the equation remains otherwise unchanged (FR16, FR18)

4. **Given** the long-press completes (≥600ms)
   **When** the clear action fires
   **Then** all state fields reset (`phase:'idle'`, `firstOperand:''`, `operator:null`, `secondOperand:''`, `result:null`) and the equation and answer displays return to their empty/`?` placeholder states (FR17)

5. **Given** the child presses `Delete` or `Escape` on the keyboard
   **When** the key is detected
   **Then** the full clear action fires immediately, identical to a completed long-press (FR25)

6. **Given** the child is in any phase
   **When** the oops button is visible
   **Then** it is always accessible — never hidden, never disabled (FR19)

## Tasks / Subtasks

- [ ] Task 1: Implement `dispatch()` — LONG_PRESS_CLEAR handler (AC: 1, 4)
  - [ ] 1.1 Remove `// TODO: Story 3.2 — handle LONG_PRESS_CLEAR` comment
  - [ ] 1.2 Reset all state fields: `phase = 'idle'`, `firstOperand = ''`, `operator = null`, `secondOperand = ''`, `result = null`
  - [ ] 1.3 Falls through to `render()` — no early return needed

- [ ] Task 2: Add pointer event listeners on `oopsBtn` — Section 7 (AC: 1, 2, 3, 4)
  - [ ] 2.1 Remove `// TODO: Story 3.2 — pointerdown/pointerup long-press on oopsBtn` comment
  - [ ] 2.2 Declare `let longPressTimer = null;` before the listeners
  - [ ] 2.3 `pointerdown`: add `.is-longpress` class to `oopsBtn`; start `setTimeout(LONG_PRESS_DURATION)` — on fire: remove `.is-longpress`, dispatch `LONG_PRESS_CLEAR`, set timer to null
  - [ ] 2.4 `pointerup`: if timer still running — clear it, set null, dispatch `PRESS_OOPS`; always remove `.is-longpress`
  - [ ] 2.5 `pointercancel`: clear timer, set null, remove `.is-longpress` (no dispatch — cancelled pointer is not user intent)
  - [ ] 2.6 Add `click` listener on `oopsBtn` that calls `e.stopPropagation()` — prevents delegated click handler double-dispatching `PRESS_OOPS` after `pointerup` already handled it

- [ ] Task 3: Update Section 7 keydown listener — Delete/Escape keys (AC: 5)
  - [ ] 3.1 Remove `// TODO: Story 3.2 — 'Delete', 'Escape' keys → LONG_PRESS_CLEAR` comment
  - [ ] 3.2 Add: `else if (e.key === 'Delete' || e.key === 'Escape') { Calculator.dispatch('LONG_PRESS_CLEAR'); }`

- [ ] Task 4: Verify in browser (AC: 1–6)
  - [ ] 4.1 Hold oops for >600ms → all clears, answer shows `?`, equation empty
  - [ ] 4.2 Begin holding oops → progress ring animates; release before 600ms → ring disappears, last digit removed (short-press oops)
  - [ ] 4.3 Hold oops during `idle` — no crash, displays stay empty/`?`
  - [ ] 4.4 `Delete` and `Escape` keys trigger full clear immediately
  - [ ] 4.5 Short-press via button tap still removes one digit (double-dispatch prevented)

---

## Dev Notes

### Scope Boundary — CRITICAL

**This story modifies `app.js` Section 6 and Section 7 only:**
- Section 6: `LONG_PRESS_CLEAR` handler (replaces `// TODO: Story 3.2`)
- Section 7: pointer event listeners on `oopsBtn` (replaces `// TODO: Story 3.2`) + Delete/Escape keydown

**Do NOT implement in this story:**
- No changes to `index.html` or `style.css`
- `.is-longpress` class and `@keyframes ringFill` are already defined in `style.css` from Story 1.2

---

### CRITICAL: Double-Dispatch Prevention

The existing delegated click listener (`calculatorEl.addEventListener('click', ...)`) routes ALL button clicks via `data-action`. Since `oopsBtn` has `data-action="PRESS_OOPS"`, a short press causes:

1. `pointerdown` → timer starts, `.is-longpress` added
2. `pointerup` → timer cleared, `PRESS_OOPS` dispatched (**intended**)
3. `click` → delegated handler → `PRESS_OOPS` dispatched **again** (BUG — removes 2 digits instead of 1)

**Fix:** Add a `click` listener directly on `oopsBtn` that calls `e.stopPropagation()`. This prevents the click from bubbling up to `calculatorEl`'s delegated handler. The pointer events already handle all oops interactions.

```js
oopsBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // pointer events handle all oops dispatching — prevent delegated handler double-fire
});
```

This is the minimal, correct fix. It does not modify any existing code — it only adds a new listener.

---

### Exact `dispatch()` LONG_PRESS_CLEAR Implementation

Replace `// TODO: Story 3.2 — handle LONG_PRESS_CLEAR`:

```js
if (action === 'LONG_PRESS_CLEAR') {
  state.phase = 'idle';
  state.firstOperand = '';
  state.operator = null;
  state.secondOperand = '';
  state.result = null;
}
```

Falls through to `render()` at end of `dispatch()`. No early return. `render()` in `idle` phase shows `?` and empty equation display — already correct from Story 2.1.

---

### Exact Section 7 Pointer Events Implementation

Replace `// TODO: Story 3.2 — pointerdown/pointerup long-press on oopsBtn`:

```js
let longPressTimer = null;

oopsBtn.addEventListener('pointerdown', () => {
  oopsBtn.classList.add('is-longpress');
  longPressTimer = setTimeout(() => {
    oopsBtn.classList.remove('is-longpress');
    Calculator.dispatch('LONG_PRESS_CLEAR');
    longPressTimer = null;
  }, LONG_PRESS_DURATION);
});

oopsBtn.addEventListener('pointerup', () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
    Calculator.dispatch('PRESS_OOPS');
  }
  oopsBtn.classList.remove('is-longpress'); // always clean up ring
});

oopsBtn.addEventListener('pointercancel', () => {
  clearTimeout(longPressTimer);
  longPressTimer = null;
  oopsBtn.classList.remove('is-longpress'); // cancel ring — no dispatch
});

// Prevent delegated click handler from double-dispatching PRESS_OOPS
// after pointerup has already handled the short-press interaction
oopsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
});
```

**Behaviour trace — short press (< 600ms):**
1. `pointerdown` → `.is-longpress` added, timer started (ring animates)
2. `pointerup` (< 600ms) → timer exists → `clearTimeout`, dispatch `PRESS_OOPS`, timer = null, `.is-longpress` removed (ring stopped)
3. `click` fires → `stopPropagation()` → delegated handler never fires ✓

**Behaviour trace — long press (≥ 600ms):**
1. `pointerdown` → `.is-longpress` added, timer started (ring animates full circle)
2. Timer fires at 600ms → `.is-longpress` removed (ring cleared), dispatch `LONG_PRESS_CLEAR`, timer = null
3. `pointerup` (after 600ms) → timer is null → no `PRESS_OOPS` dispatched ✓, `.is-longpress` remove is no-op ✓
4. `click` may fire → `stopPropagation()` → delegated handler never fires ✓

**Behaviour trace — cancelled (e.g. scroll):**
1. `pointerdown` → `.is-longpress` added, timer started
2. `pointercancel` → `clearTimeout`, timer = null, `.is-longpress` removed (ring stopped)
3. No dispatch — cancelled pointer is not intentional user action ✓

---

### Exact Section 7 Keydown Update

Replace `// TODO: Story 3.2 — 'Delete', 'Escape' keys → LONG_PRESS_CLEAR`:

```js
  } else if (e.key === 'Backspace') {
    Calculator.dispatch('PRESS_OOPS');
  } else if (e.key === 'Delete' || e.key === 'Escape') {
    Calculator.dispatch('LONG_PRESS_CLEAR');
  }
  // no more TODOs in this listener
```

---

### CSS Already Prepared (No Changes Needed)

From `style.css` (Story 1.2), already in place:

```css
/* Long-press ring pseudo-element */
.btn-oops::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: conic-gradient(
    var(--color-selected-ring) var(--ring-progress),
    transparent 0deg
  );
  z-index: -1;
  opacity: 0;
  pointer-events: none;
}

.btn-oops.is-longpress::after {
  opacity: 1;
  animation: ringFill var(--anim-longpress-duration) linear forwards;
}

@keyframes ringFill {
  from { --ring-progress: 0deg; }
  to   { --ring-progress: 360deg; }
}
```

Adding `.is-longpress` triggers the ring. Removing it stops it. `--anim-longpress-duration: 600ms` matches `LONG_PRESS_DURATION`.

---

### Previous Story Intelligence

**Story 3.1 (review):** Implemented PRESS_OOPS dispatch and Backspace keydown. The `PRESS_OOPS` handler in `dispatch()` is complete — this story does NOT modify it.

**Interaction between stories:** Story 3.1 left the `pointerup` → `PRESS_OOPS` dispatch to Story 3.2. Story 3.1 relied on the click handler for short-press, which worked then but creates a double-dispatch issue once Story 3.2 adds pointer events. The `stopPropagation` fix in Task 2.6 resolves this.

**Current `app.js` TODOs for this story (exact text to replace):**
```
Line ~141: // TODO: Story 3.2 — handle LONG_PRESS_CLEAR
Line ~209: // TODO: Story 3.2 — pointerdown/pointerup long-press on oopsBtn
```
And in the keydown listener:
```
// TODO: Story 3.2 — 'Delete', 'Escape' keys → LONG_PRESS_CLEAR
```

---

### Architecture Rules (enforced)

| Rule | Requirement |
|------|-------------|
| `pointer*` events (not `touch*`) | Handles both touch and mouse uniformly across P1/P2 browsers |
| `setTimeout` for long-press timer | Correct here — this is the gesture timer, not an animation timer |
| `animationend` for CSS animation cleanup | N/A — the ring is removed by class removal, not by animationend |
| `LONG_PRESS_DURATION` constant | Already defined: `600` ms — use it, do not hardcode |
| `dispatch()` only mutates state | LONG_PRESS_CLEAR resets all 5 state fields |
| render() always called after dispatch | LONG_PRESS_CLEAR falls through to render() — no early return |

### Project Structure Notes

- Only file changed: `app.js` at repository root
- `index.html` unchanged — `oopsBtn` already has correct id, class, data-action
- `style.css` unchanged — `.is-longpress`, `@keyframes ringFill`, `@property --ring-progress` all in place

### References

- Long-press pattern (`pointer*` events): [Source: architecture/implementation-patterns-consistency-rules.md#process-patterns]
- `LONG_PRESS_DURATION` constant: [Source: architecture/core-architectural-decisions.md#data-architecture]
- Action type `'LONG_PRESS_CLEAR'`: [Source: architecture/implementation-patterns-consistency-rules.md#communication-patterns]
- `@property --ring-progress` registration: [Source: architecture/core-architectural-decisions.md#frontend-architecture]
- FR17: full clear [Source: planning-artifacts/epics.md#story-3-2]
- FR18: visual progress ring [Source: planning-artifacts/epics.md#story-3-2]
- FR25: keyboard Delete/Escape [Source: planning-artifacts/epics.md#story-4-1]

## Dev Agent Record

### Agent Model Used

_to be filled by dev agent_

### Debug Log References

_none_

### Completion Notes List

_to be filled by dev agent_

### File List

- `app.js` (modify — Section 6 LONG_PRESS_CLEAR dispatch; Section 7 pointer events + keydown)

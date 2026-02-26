# Story 4.1: Keyboard Support & ARIA Accessibility

Status: review

## Story

As a child or adult with accessibility needs,
I want to operate the calculator using only a keyboard and hear equation updates via a screen reader,
So that the app is usable regardless of input method or assistive technology.

## Acceptance Criteria

1. **Given** the app is open
   **When** a user presses digit keys (0–9) on the keyboard
   **Then** the corresponding digit is entered, identical to tapping the on-screen button (FR25)

2. **Given** the app is open
   **When** a user presses `+`, `-`, `*`, or `/` on the keyboard
   **Then** the corresponding operator is selected, identical to tapping the operator button (FR25)

3. **Given** the app is open
   **When** a user presses `Enter` or `=`
   **Then** the equals action fires (FR25)

4. **Given** the app is open
   **When** a user presses `Backspace`
   **Then** the short-press oops action fires (remove last digit) (FR25)

5. **Given** the app is open
   **When** a user presses `Delete` or `Escape`
   **Then** the full clear action fires (FR25)

6. **Given** a screen reader is active
   **When** a digit or operator is tapped and the equation display updates
   **Then** the screen reader announces the update automatically via the ARIA live region (`role="status"`, `aria-live="assertive"`) (FR26, NFR9)

7. **Given** a screen reader is active
   **When** the equals button is tapped and the answer is shown
   **Then** the screen reader announces the result automatically via the answer display's `aria-live="assertive"` region (FR26, NFR9)

8. **Given** all interactive elements are present
   **When** the app is inspected
   **Then** no content flashes more than 3 times per second at any point during use (NFR8)

## Tasks / Subtasks

- [x] Task 1: Audit keyboard bindings in `app.js` Section 7 against AC 1–5 (AC: 1, 2, 3, 4, 5)
  - [x] 1.1 Confirm digits 0–9 → `Calculator.dispatch('PRESS_DIGIT', e.key)` at `app.js:196-198`
  - [x] 1.2 Confirm `+` → `PRESS_OPERATOR '+'`; `-` → `PRESS_OPERATOR '−'` (U+2212); `*` → `PRESS_OPERATOR '×'`; `/` → `PRESS_OPERATOR '÷'` with `e.preventDefault()` at `app.js:198-207`
  - [x] 1.3 Confirm `Enter`/`=` → `PRESS_EQUALS` at `app.js:207-209`
  - [x] 1.4 Confirm `Backspace` → `PRESS_OOPS` at `app.js:209-211`
  - [x] 1.5 Confirm `Delete`/`Escape` → `LONG_PRESS_CLEAR` at `app.js:211-213`

- [x] Task 2: Audit ARIA attributes in `index.html` against AC 6–7 (AC: 6, 7)
  - [x] 2.1 Confirm `.display-answer` has `aria-live="assertive"`, `aria-atomic="true"` at `index.html:18-21`
  - [x] 2.2 Confirm `.display-equation` has `role="status"`, `aria-live="assertive"`, `aria-atomic="true"` at `index.html:24-28`
  - [x] 2.3 Confirm `render()` updates both displays via `textContent` (not `innerHTML`) — live region mutation triggers announcements
  - [x] 2.4 Confirm operator buttons have `aria-pressed` attribute managed by `render()` at `app.js:171-177`

- [x] Task 3: Verify no-flash compliance (AC: 8)
  - [x] 3.1 Confirm all CSS animations (`answerReveal`, `ringFill`, `is-shake`) are one-shot (`forwards` / `{ once: true }`) — none loop or repeat

- [x] Task 4: Browser verification (AC: 1–8)
  - [x] 4.1 Open `index.html`, press 0–9 keys → digits appear correctly
  - [x] 4.2 Press `+`, `-`, `*`, `/` → correct operators selected with visual feedback
  - [x] 4.3 Press `Enter`/`=` with complete equation → result displayed; with incomplete → shake only
  - [x] 4.4 Press `Backspace` → removes last digit (or regresses phase); `Delete`/`Escape` → full clear
  - [x] 4.5 Verify `/` key does not trigger browser quick-find (blocked by `e.preventDefault()`)

---

## Dev Notes

### CRITICAL: Story 4.1 Is Pre-Implemented — Audit Only

**All 8 acceptance criteria are already fully satisfied by prior stories.** No new code is required. The dev agent must audit the existing implementation, check each AC off, and mark the story as review.

**If during the audit a genuine gap is found**, apply the minimal fix and document it in the Dev Agent Record.

---

### Pre-Implementation Evidence

#### AC 1–5 — Keyboard Bindings (`app.js:195-214`)

The complete `keydown` listener in Section 7:

```js
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    Calculator.dispatch('PRESS_DIGIT', e.key);           // AC 1 ✓
  } else if (e.key === '+') {
    Calculator.dispatch('PRESS_OPERATOR', '+');           // AC 2 ✓
  } else if (e.key === '-') {
    Calculator.dispatch('PRESS_OPERATOR', '−');           // AC 2 ✓ (U+2212, matches data-value)
  } else if (e.key === '*') {
    Calculator.dispatch('PRESS_OPERATOR', '×');           // AC 2 ✓
  } else if (e.key === '/') {
    e.preventDefault();                                   // prevents browser quick-find
    Calculator.dispatch('PRESS_OPERATOR', '÷');           // AC 2 ✓
  } else if (e.key === 'Enter' || e.key === '=') {
    Calculator.dispatch('PRESS_EQUALS');                  // AC 3 ✓
  } else if (e.key === 'Backspace') {
    Calculator.dispatch('PRESS_OOPS');                    // AC 4 ✓
  } else if (e.key === 'Delete' || e.key === 'Escape') {
    Calculator.dispatch('LONG_PRESS_CLEAR');              // AC 5 ✓
  }
});
```

All keyboard mappings match the architecture table exactly. [Source: architecture/core-architectural-decisions.md#frontend-architecture]

#### AC 6–7 — ARIA Live Regions (`index.html:18-28`)

```html
<!-- Answer display — AC 7 -->
<div class="display-answer"
     aria-live="assertive"
     aria-label="answer display"
     aria-atomic="true">?</div>

<!-- Equation display — AC 6 -->
<div class="display-equation"
     role="status"
     aria-live="assertive"
     aria-label="equation display"
     aria-atomic="true"></div>
```

`render()` updates both elements via `textContent` (`app.js:155-169`). Screen readers detect the DOM mutation on `aria-live` regions and announce the new content. `aria-atomic="true"` ensures the full text is announced, not just the changed portion.

#### AC 8 — No Flashing

All CSS animations are one-shot:
- `@keyframes answerReveal` — fires once per result, duration `--anim-answer-duration`
- `@keyframes ringFill` — fires once during long-press, removed on cancel or completion
- `is-shake` — fires once on invalid equals, removed via `animationend` + `{ once: true }`

None loop or repeat. NFR8 (≤3 flashes/second) is satisfied by design.

---

### ARIA Live Region — Announcement Mechanics

`render()` is called after every `dispatch()`. The pattern:

```js
equationEl.textContent = buildEquationString(state);  // → announces via role=status + aria-live=assertive
answerEl.textContent = '?';                            // → announces via aria-live=assertive
```

`aria-atomic="true"` means the **entire** text content is announced (not just the changed characters). For the equation display, this means screen readers hear the full equation string on each update (e.g. "3 + 5" not just "5").

---

### Operator `aria-pressed` — Screen Reader State

`render()` at `app.js:171-177` updates all operator buttons on every dispatch:

```js
operatorBtns.forEach(btn => {
  const isSelected = btn.dataset.value === state.operator;
  btn.setAttribute('aria-pressed', String(isSelected));  // 'true' or 'false'
  btn.classList.toggle('is-selected', isSelected);
});
```

Screen readers announce `aria-pressed` state when buttons receive focus, giving keyboard users awareness of which operator is active.

---

### Scope — No Files Need Changing

Based on the audit:
- **`app.js`** — no changes required
- **`index.html`** — no changes required
- **`style.css`** — no changes required

---

### Previous Story Intelligence

**Story 3.2 (review):** Implemented `LONG_PRESS_CLEAR` dispatch and Delete/Escape keyboard binding. Also added `oopsBtn.click` → `e.stopPropagation()` to prevent double-dispatch.

**Story 3.1 (review):** Implemented `PRESS_OOPS` dispatch and Backspace keyboard binding.

**Story 2.1 (review):** Implemented digit and operator keyboard bindings; `render()` operator `aria-pressed` management.

**Story 1.1 (review):** Established all ARIA attributes on HTML elements.

---

### Architecture Rules (enforced)

| Rule | Status |
|------|--------|
| Keyboard handler on `document` (global) | ✓ `document.addEventListener('keydown', ...)` at `app.js:195` |
| `textContent` for all dynamic display updates | ✓ `app.js:155-169` |
| `aria-live="assertive"` on both display zones | ✓ `index.html:19, 26` |
| `aria-pressed` managed by `render()`, not HTML | ✓ `app.js:175` |
| No `eval()`, no `innerHTML` with user strings | ✓ Enforced throughout |

### Project Structure Notes

- Only file potentially changed: `app.js` (if a gap is found during audit)
- `index.html` — no changes expected
- `style.css` — no changes expected

### References

- Keyboard support table: [Source: architecture/core-architectural-decisions.md#frontend-architecture]
- ARIA live region pattern: [Source: architecture/core-architectural-decisions.md#frontend-architecture]
- Action type registry: [Source: architecture/implementation-patterns-consistency-rules.md#communication-patterns]
- `textContent` only rule: [Source: architecture/implementation-patterns-consistency-rules.md#process-patterns]
- FR25: keyboard operable: [Source: planning-artifacts/epics.md#story-4-1]
- FR26: screen reader compatible: [Source: planning-artifacts/epics.md#story-4-1]
- NFR8: no flashing: [Source: planning-artifacts/epics.md]
- NFR9: equation display as ARIA live region: [Source: planning-artifacts/epics.md]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_none_

### Completion Notes List

- Story 4.1 is an audit/verification story — all 8 acceptance criteria were pre-implemented by earlier stories (1.1, 2.1, 2.2, 3.1, 3.2)
- Task 1 audit: All 5 keyboard bindings confirmed in `app.js:195-214` — digits, operators (with correct Unicode U+2212/U+00D7/U+00F7), Enter/=, Backspace, Delete/Escape all wired via global `keydown` listener on `document`; `/` key correctly calls `e.preventDefault()` to suppress browser quick-find
- Task 2 audit: ARIA live regions confirmed in `index.html` — `.display-answer` has `aria-live="assertive"` + `aria-atomic="true"`; `.display-equation` has `role="status"` + `aria-live="assertive"` + `aria-atomic="true"`; `render()` uses `textContent` exclusively (no `innerHTML`); operator `aria-pressed` managed dynamically by `render()` at `app.js:171-177`
- Task 3 audit: All CSS animations are one-shot — `answerReveal` (400ms, `both`), `ringFill` (600ms, `forwards`), `shake` (200ms, `both`) — none use `infinite`; NFR8 satisfied by design
- Bonus finding: All 4 button types (`.btn-digit`, `.btn-operator`, `.btn-equals`, `.btn-oops`) have `:focus-visible` outlines (2px solid) confirming visible keyboard focus indicators for Tab navigation
- No code changes required; no gaps found during audit

### File List

_none — story is pre-implemented; no files were modified_

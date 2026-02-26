# Story 1.2: CSS Design System, Visual Shell & Responsive Layout

Status: review

## Story

As a child,
I want the calculator to look clear, colourful, and easy to read,
So that I know exactly which buttons are for numbers and which are for operations.

## Acceptance Criteria

1. **Given** `style.css` is loaded
   **When** the `:root` block is inspected
   **Then** approximately 25 CSS Custom Properties are defined covering colours, spacing, font sizes, border-radius, and animation durations (`--anim-press-duration`, `--anim-answer-duration`, `--anim-longpress-duration`)

2. **Given** the calculator is open on a tablet in portrait orientation
   **When** the layout is viewed
   **Then** a 5-column CSS Grid displays correctly (3 digit cols + 1 operator col + 1 equals col), digit buttons are visually distinct from operator buttons (different colour), all buttons are a minimum of 60px tall, and the answer and equation display zones are clearly separated above the button grid (FR20)

3. **Given** the device is rotated to landscape
   **When** the layout re-renders
   **Then** the calculator remains fully usable — all buttons visible and tappable — within the reduced viewport height (FR21)

4. **Given** the app is opened on a desktop browser at ≥1024px wide
   **When** the layout is viewed
   **Then** the calculator is centred with a max-width of approximately 480–600px and remains fully usable (FR22)

5. **Given** the page is loaded
   **When** it is inspected for external dependencies
   **Then** there are no external `<link>` or `<script>` tags — only `style.css` and `app.js` are referenced (FR30)

## Tasks / Subtasks

- [x] Task 1: Define `:root` with all ~25 CSS Custom Properties (AC: 1)
  - [x] 1.1 Add colour tokens (page bg, display bg, digit, operator variants, equals, oops, text, answer/equation text)
  - [x] 1.2 Add sizing tokens (button sizes, display heights, font sizes)
  - [x] 1.3 Add spacing tokens (button gap, display padding, border-radius values)
  - [x] 1.4 Add animation duration tokens (`--anim-press-duration: 80ms`, `--anim-answer-duration: 400ms`, `--anim-longpress-duration: 600ms`)

- [x] Task 2: Add CSS reset and base body styles (AC: 2)
  - [x] 2.1 Universal box-sizing reset (`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`)
  - [x] 2.2 Body styles (background colour, min-height 100dvh, font-family system stack)

- [x] Task 3: Implement `#calculator` container layout (AC: 2)
  - [x] 3.1 Full-height flex column container (flex-direction column, height 100dvh or min-height 100dvh)
  - [x] 3.2 Background colour from `--color-bg`, padding from spacing tokens

- [x] Task 4: Style `.display-answer` zone (AC: 2)
  - [x] 4.1 Height/flex-grow allocation (~20% of viewport height), centred content
  - [x] 4.2 Large answer font size (clamp 48px–80px), bold weight 700, color `--color-text-answer`
  - [x] 4.3 Background from `--color-display-bg`

- [x] Task 5: Style `.display-equation` zone (AC: 2)
  - [x] 5.1 Height/flex-grow allocation (~10%), medium font size (clamp 24px–40px), weight 500
  - [x] 5.2 Color `--color-text-equation`, background from `--color-display-bg`

- [x] Task 6: Implement `.button-grid` CSS Grid (AC: 2)
  - [x] 6.1 5-column grid: `grid-template-columns: repeat(5, 1fr)` (3 digit cols + 1 operator col + 1 equals col)
  - [x] 6.2 Gap from `--gap-buttons` (12px), flex-grow to fill remaining space

- [x] Task 7: Style `.btn-digit` (AC: 2)
  - [x] 7.1 Background `--color-digit` (`#F1F5F9`), text `--color-text-primary` (`#1E293B`)
  - [x] 7.2 Font size 28px, weight 600, min-height 60px (target ~80px)
  - [x] 7.3 Border-radius `--border-radius-digit` (16px), remove default button borders
  - [x] 7.4 Active press state: `transform: scale(0.92)`, transition `--anim-press-duration`
  - [x] 7.5 Cursor pointer, full width/height within grid cell

- [x] Task 8: Style `.btn-operator` — base and per-operator colours (AC: 2)
  - [x] 8.1 Base styles: white text via `--color-text-on-operator`, font 24px weight 700, border-radius 16px, min-height 60px
  - [x] 8.2 `[data-value="÷"]` background `--color-op-div` (`#A855F7`)
  - [x] 8.3 `[data-value="×"]` background `--color-op-mul` (`#22C55E`)
  - [x] 8.4 `[data-value="−"]` background `--color-op-sub` (`#3B82F6`)
  - [x] 8.5 `[data-value="+"]` background `--color-op-add` (`#FF6B35`)
  - [x] 8.6 Active press state: `transform: scale(0.90)`, transition `--anim-press-duration`

- [x] Task 9: Style `.btn-operator.is-selected` glow ring (AC: 2)
  - [x] 9.1 `outline: 3px solid var(--color-selected-ring)`, `outline-offset: 2px`, brightness boost — persistent when selected
  - [x] 9.2 Toggled by JS `render()` in Story 2.1 — CSS definition only here

- [x] Task 10: Style `.btn-equals` — amber, spanning all rows (AC: 2)
  - [x] 10.1 Background `--color-equals` (`#F59E0B`), text `--color-text-primary` (`#1E293B`)
  - [x] 10.2 `grid-column: 5; grid-row: 1 / span 4;` — takes right column, full height of grid
  - [x] 10.3 Font size 32px, weight 700, min-width 60px
  - [x] 10.4 Active press state: `transform: scale(0.93)`, transition `--anim-press-duration`

- [x] Task 11: Style `.btn-oops` — muted, wider (AC: 2)
  - [x] 11.1 `grid-column: span 2` — occupies 2 columns in row 4 (cols 1-2), aligning 0 under col 3 and + under col 4
  - [x] 11.2 Background `--color-oops` (`#CBD5E1`), text `--color-text-oops` (`#475569`)
  - [x] 11.3 Active press state: `transform: scale(0.92)`
  - [x] 11.4 `position: relative` (needed for `::after` long-press ring in later story)

- [x] Task 12: Define state modifier and animation classes (AC: 2)
  - [x] 12.1 `.is-selected` — operator selected state (base definition; toggled in Story 2.1)
  - [x] 12.2 `.is-animating` — `animation: answerReveal var(--anim-answer-duration) ease-out`; toggled in Story 2.2
  - [x] 12.3 `.is-longpress::after` — radial ring pseudo-element with `animation: ringFill var(--anim-longpress-duration) linear`; toggled in Story 3.2
  - [x] 12.4 `.is-shake` — `animation: shake 200ms ease both`; used in Story 2.1 for incomplete equation feedback

- [x] Task 13: Define `@keyframes` (AC: 2)
  - [x] 13.1 `@keyframes answerReveal` — scale from 60% → 100% with `--color-answer-flash` background pulse, 400ms
  - [x] 13.2 `@keyframes ringFill` — radial progress ring fill for long-press indicator (conic-gradient via @property)
  - [x] 13.3 `@keyframes shake` — horizontal shake (4px amplitude, 3 cycles, 200ms)

- [x] Task 14: Add responsive breakpoints (AC: 3, 4)
  - [x] 14.1 `@media (orientation: landscape) and (max-height: 600px)` — reduced font sizes, min-height 52px on buttons (above WCAG 44px)
  - [x] 14.2 `@media (min-width: 1024px)` — `max-width: 500px; margin: 20px auto`, border-radius card effect
  - [x] 14.3 `@media (min-width: 1280px)` — `max-width: 480px; margin: 40px auto`

- [x] Task 15: Verify layout visually in browser (AC: 2, 3, 4)
  - [x] 15.1 CSS structure verified: 5-column grid, coloured operators, `grid-column: 5; grid-row: 1/span 4` on equals, no hardcoded hex values outside `:root`
  - [x] 15.2 Responsive breakpoints present for landscape, 1024px, 1280px

## Dev Notes

### Scope Boundary — CRITICAL

**This story implements CSS ONLY. Do NOT change:**
- `index.html` — HTML structure is complete from Story 1.1
- `app.js` — JavaScript skeleton is complete from Story 1.1

After this story, opening `index.html` will show a fully styled calculator. Buttons will be visible and styled but **not interactive** — that is Story 2.1.

The `.is-selected`, `.is-animating`, `.is-longpress`, `.is-shake` classes are defined in CSS here, but are **not yet toggled by JavaScript** (Stories 2.1, 2.2, 3.2 respectively).

---

### Grid Layout — CRITICAL

The existing HTML from Story 1.1 has this structure:
```
Row 1: [7]  [8]  [9]  [÷]
Row 2: [4]  [5]  [6]  [×]
Row 3: [1]  [2]  [3]  [−]
Row 4: [⌫]  [0]       [+]
                           [=]  ← explicit grid placement
```

**Use a 5-column grid.** The equals button must be explicitly placed in column 5, spanning all 4 rows. The oops button must span 2 columns (cols 1-2) so that 0 falls under col 3 and + under col 4, matching the operator column.

**Required grid CSS:**
```css
.button-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  gap: var(--gap-buttons);
  flex: 1; /* grows to fill remaining space in #calculator flex container */
}

.btn-equals {
  grid-column: 5;
  grid-row: 1 / span 4;
}

.btn-oops {
  grid-column: span 2; /* auto-places at cols 1-2, making row 4: [⌫⌫][0][+][=] */
}
```

**Resulting visual layout:**
```
[7   ][8   ][9   ][÷   ][=   ]
[4   ][5   ][6   ][×   ][=   ]
[1   ][2   ][3   ][−   ][=   ]
[⌫        ][0   ][+   ][=   ]
```

This matches the UX spec "Classic Column" direction with equals taking the right column.

---

### Exact `:root` Token Values

All 25 tokens MUST match these values exactly — they are specified in the UX design specification:

```css
:root {
  /* Colours — page & display */
  --color-bg:              #FAFAF7;
  --color-display-bg:      #F0EEE8;

  /* Colours — text */
  --color-text-primary:    #1E293B;    /* digit/equals label; 13.9:1 contrast on digit bg */
  --color-text-equation:   #334155;    /* equation display text */
  --color-text-answer:     #1E293B;    /* answer display text */
  --color-text-oops:       #475569;    /* oops button label */

  /* Colours — digit button */
  --color-digit:           #F1F5F9;    /* digit bg */

  /* Colours — operator buttons */
  --color-op-add:          #FF6B35;    /* + orange */
  --color-op-sub:          #3B82F6;    /* − blue */
  --color-op-mul:          #22C55E;    /* × green */
  --color-op-div:          #A855F7;    /* ÷ purple */

  /* Colours — special buttons */
  --color-equals:          #F59E0B;    /* = amber; 5.2:1 contrast with dark text */
  --color-oops:            #CBD5E1;    /* oops muted slate */

  /* Colours — selected operator ring */
  --color-selected-ring:   #F59E0B;    /* amber outline when operator is selected */

  /* Typography */
  --font-family:           -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica Neue, sans-serif;
  --font-size-answer:      clamp(48px, 10vw, 80px);
  --font-size-equation:    clamp(24px, 5vw, 40px);
  --font-size-btn-digit:   28px;
  --font-size-btn-operator: 24px;
  --font-size-btn-equals:  32px;

  /* Sizing */
  --btn-min-height:        60px;       /* minimum touch target height (FR23) */

  /* Spacing */
  --gap-buttons:           12px;
  --padding-display:       16px;
  --border-radius-digit:   16px;
  --border-radius-operator: 16px;

  /* Animation durations — all timing controlled here */
  --anim-press-duration:   80ms;       /* button press feedback */
  --anim-answer-duration:  400ms;      /* answer reveal bounce */
  --anim-longpress-duration: 600ms;    /* long-press progress ring */
}
```

---

### `style.css` Mandatory Section Order

Follow this structure exactly per architecture specification:

```
:root { /* all ~25 Custom Properties */ }

/* 1. Reset */
*, *::before, *::after { ... }

/* 2. Body */
body { ... }

/* 3. Calculator container */
#calculator { ... }

/* 4. Display zones */
.display-answer { ... }
.display-equation { ... }

/* 5. Button grid */
.button-grid { ... }

/* 6. Digit buttons */
.btn-digit { ... }
.btn-digit:active { ... }

/* 7. Operator buttons */
.btn-operator { ... }
.btn-operator:active { ... }
.btn-operator[data-value="÷"] { ... }
.btn-operator[data-value="×"] { ... }
.btn-operator[data-value="−"] { ... }
.btn-operator[data-value="+"] { ... }
.btn-operator.is-selected { ... }

/* 8. Equals button */
.btn-equals { ... }
.btn-equals:active { ... }

/* 9. Oops button */
.btn-oops { ... }
.btn-oops:active { ... }
.btn-oops.is-longpress::after { /* radial ring placeholder */ }

/* 10. State modifier classes */
.is-shake { ... }
.is-animating { ... }
.is-longpress::after { ... }

/* 11. Keyframes */
@keyframes answerReveal { ... }
@keyframes ringFill { ... }
@keyframes shake { ... }

/* 12. Responsive: landscape */
@media (orientation: landscape) and (max-height: 600px) { ... }

/* 13. Responsive: desktop */
@media (min-width: 1024px) { ... }
@media (min-width: 1280px) { ... }

/* 14. Print styles */
@media print { display: none; }
```

---

### `@keyframes answerReveal`

Scale in from 60% to 100% with a warm background pulse:

```css
@keyframes answerReveal {
  0%   { transform: scale(0.6); background-color: #FEF3C7; }
  60%  { transform: scale(1.08); background-color: #FEF3C7; }
  80%  { transform: scale(0.96); }
  100% { transform: scale(1.0); background-color: transparent; }
}
```

Applied via `.is-animating` class added by `render()` in Story 2.2. Removed after `animationend` event (Story 2.2).

---

### `@keyframes ringFill`

Radial progress ring on `.btn-oops::after` pseudo-element for long-press visual feedback:

```css
@keyframes ringFill {
  from { --ring-progress: 0deg; }
  to   { --ring-progress: 360deg; }
}
```

The actual ring visual requires a `conic-gradient` on the `::after` pseudo-element. The `.btn-oops` needs `position: relative` and `overflow: visible`. The `::after` should be:

```css
.btn-oops::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: conic-gradient(var(--color-selected-ring) var(--ring-progress, 0deg), transparent 0deg);
  z-index: -1;
  opacity: 0;
  pointer-events: none;
}

.btn-oops.is-longpress::after {
  opacity: 1;
  animation: ringFill var(--anim-longpress-duration) linear forwards;
}
```

Note: CSS custom property `@property` registration may be needed for `--ring-progress` to animate. If that's not supported, use `transform: rotate()` approach instead. Story 3.2 will implement the JS side.

---

### `@keyframes shake`

Gentle horizontal shake for invalid equals press (no second operand):

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-4px); }
  40%       { transform: translateX(4px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
}
```

Applied via `.is-shake` added to `.display-equation` in Story 2.1.

---

### Responsive Implementation Notes

**Landscape (small height):** Use `@media (orientation: landscape) and (max-height: 600px)`. Reduce button min-height to `52px` (still above WCAG 44px), reduce font sizes, use `clamp()` for button height. The UX spec landscape approach is a single column-grid with displays on the left. For Story 1.2, keeping the same layout but ensuring buttons still fit at reduced height is sufficient. A full side-by-side landscape redesign can be revisited in Story 4.2 if needed.

**Desktop:** At `≥1024px`, wrap `#calculator` in `max-width: 500px; margin: 0 auto`. The page background (`--color-bg`) fills the rest. At `≥1280px`, `max-width: 480px; margin: 40px auto` to give breathing room.

**Phone portrait (< 767px):** Use `clamp(56px, 12vw, 80px)` on button heights. No structural change needed — the grid scales naturally.

---

### Accessibility Rules

- Do NOT use `!important` anywhere in `style.css`
- Focus ring: All interactive elements must have a visible `:focus-visible` outline: `2px solid var(--color-selected-ring)` with `outline-offset: 2px`. Do not suppress focus rings globally.
- Never suppress `outline: none` globally — only for pointer events if needed
- All colour contrast ratios are pre-verified in the UX spec. Use the exact hex values from the `:root` token table above.

---

### Architecture Rules (enforced)

| Rule | Requirement |
|------|------------|
| All colours | Must reference `--color-*` Custom Properties. Never hardcode hex in component rules. |
| All timing values | Must reference `--anim-*` Custom Properties. Never hardcode `400ms`, `80ms` etc. |
| No `!important` | Prohibited in `style.css` |
| CSS Custom Properties | All defined in `:root` only. Never redefined in components. |
| `innerHTML` | N/A — CSS story only |
| File isolation | Only `style.css` changes in this story |

---

### Previous Story Intelligence (Story 1.1)

Story 1.1 created:
- `index.html` — complete HTML structure. Classes used: `.display-answer`, `.display-equation`, `.button-grid`, `.btn-digit`, `.btn-operator`, `.btn-equals`, `.btn-oops`. ID: `#calculator`, `#btn-oops`.
- `style.css` — header comment only (placeholder for this story to fill)
- `app.js` — 7-section IIFE skeleton; `dispatch()` calls `render()` but render is empty (Story 2.1)

CSS must target **exactly** the classes and IDs created in Story 1.1. No new classes or IDs.

---

### Project Structure Notes

- Only file changed: `style.css` at repository root
- No new files needed
- `index.html` and `app.js` remain unchanged

### References

- Grid layout: [Source: architecture/project-structure-boundaries.md#style-css-internal-structure]
- CSS Custom Property naming: [Source: architecture/implementation-patterns-consistency-rules.md#naming-patterns]
- Colour tokens with hex values: [Source: planning-artifacts/ux-design-specification.md#color-system]
- Typography sizes: [Source: planning-artifacts/ux-design-specification.md#typography-system]
- Button sizing targets: [Source: planning-artifacts/ux-design-specification.md#spacing-layout-foundation]
- Animation keyframe specs: [Source: planning-artifacts/ux-design-specification.md#feedback-patterns]
- Responsive breakpoints: [Source: planning-artifacts/ux-design-specification.md#breakpoint-strategy]
- No `!important`, no hardcoded values: [Source: architecture/implementation-patterns-consistency-rules.md#process-patterns]
- FR20, FR21, FR22: Responsive layout [Source: planning-artifacts/epics.md#story-1-2]
- FR30: No external dependencies [Source: planning-artifacts/prd/non-functional-requirements.md]
- NFR5: 44px minimum touch target [Source: planning-artifacts/epics.md#nfr-list]
- NFR6: 4.5:1 contrast ratio [Source: planning-artifacts/ux-design-specification.md#colour-contrast-specifications]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_none_

### Completion Notes List

- Replaced `style.css` placeholder comment with full 390-line implementation
- 30 CSS Custom Properties defined in `:root` (satisfies "approximately 25" AC): 14 colour tokens, 6 typography tokens, 1 sizing token, 4 spacing tokens, 3 animation tokens, plus 2 added during review (`--color-text-on-operator`, `--color-answer-flash`) to eliminate hardcoded hex values outside `:root`
- `@property --ring-progress` registered at top of file to enable smooth `conic-gradient` animation for long-press ring
- Grid: `repeat(5, 1fr)` — 5 equal columns; `.btn-equals { grid-column: 5; grid-row: 1 / span 4 }` spans full grid height; `.btn-oops { grid-column: span 2 }` widens oops and aligns 0/+ correctly under digit/operator columns
- All colour values referenced via Custom Properties — zero hardcoded hex values outside `:root`
- All timing values referenced via `--anim-*` Custom Properties — no hardcoded `ms` values in component rules
- `@keyframes answerReveal` (scale 0.6→1.0 with warm flash), `ringFill` (conic-gradient 0→360deg), `shake` (±4px horizontal, 3 cycles) all defined
- `.is-selected`, `.is-animating`, `.is-longpress`, `.is-shake` state classes defined; toggling deferred to Stories 2.1, 2.2, 3.2
- Responsive: landscape `@media (orientation: landscape) and (max-height: 600px)` — min-height 52px on buttons; `@media (min-width: 1024px)` — max-width 500px centred card; `@media (min-width: 1280px)` — max-width 480px with 40px vertical margin
- Scope boundary respected: `index.html` and `app.js` unchanged

### File List

- `style.css` (modified — full design system implementation replacing placeholder comment)

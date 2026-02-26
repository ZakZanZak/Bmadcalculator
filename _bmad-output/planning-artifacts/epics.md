---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
workflow_completed: true
inputDocuments:
  - '_bmad-output/planning-artifacts/prd/index.md'
  - '_bmad-output/planning-artifacts/architecture/index.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
---

# Bmadcalculator - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Bmadcalculator, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: A child can enter any positive integer by tapping digit buttons (0–9) in sequence
FR2: The system limits number input to a maximum length that prevents numbers beyond the grade 3 range (up to 4 digits)
FR3: The system prevents leading zeros in number entry (e.g. entering 0 then 5 produces 5, not 05)
FR4: A child can select one arithmetic operator — addition, subtraction, multiplication, or division — to define the operation
FR5: The system indicates which operator is currently selected with a distinct visual state
FR6: A child can change the selected operator before entering the second number, replacing the previous selection
FR7: The system displays the complete equation in real time as the child builds it — first number, then operator, then second number
FR8: The equation display is persistent and continuously visible throughout calculation entry
FR9: After a completed calculation, the equation display resets to an empty state when the child begins a new calculation
FR10: A child can execute the built equation by pressing the equals button
FR11: The system displays the calculated result after equals is pressed
FR12: The system presents the answer using an animated reveal effect that draws attention to the result
FR13: The system correctly computes addition, subtraction, multiplication, and division for integer operands
FR14: The system provides a clear, child-appropriate response when an undefined operation is attempted (e.g. division by zero)
FR15: After viewing a calculated answer, a child can begin a new calculation by pressing any digit button
FR16: A child can remove the most recently entered digit by pressing the oops button once
FR17: A child can clear the entire current equation by pressing and holding the oops button
FR18: The system provides visual feedback during a long-press clear action to signal it is in progress
FR19: Error recovery controls are accessible to the child at any point during equation entry
FR20: The interface renders correctly and is fully usable in tablet portrait orientation
FR21: The interface renders correctly and is fully usable in tablet landscape orientation
FR22: The interface presents a usable layout on desktop browser screens
FR23: All interactive elements present a touch target that meets the minimum accessibility size standard
FR24: All text and interactive element labels meet the minimum colour contrast ratio for visual accessibility
FR25: All interactive elements are operable using keyboard input alone, without requiring a mouse or touch
FR26: The equation display and answer result are compatible with screen reader assistive technology
FR27: Any user can access the app directly in a web browser without downloading or installing software
FR28: Any user can access the app without creating an account, providing credentials, or logging in
FR29: The system operates without collecting, storing, or transmitting any user data during or after a session
FR30: The system contains no external runtime dependencies that could introduce third-party tracking or cause load failures
FR31: The app loads and becomes fully interactive within the defined performance targets on a standard tablet browser

### NonFunctional Requirements

NFR1: The app achieves First Contentful Paint in under 1.5 seconds on a standard tablet browser over average home Wi-Fi
NFR2: The app becomes fully interactive (Time to Interactive) in under 2 seconds on a standard tablet browser
NFR3: All interactive elements respond to user input with visible feedback within 100 milliseconds of touch or click
NFR4: The total page weight (HTML, CSS, JavaScript, and all assets) does not exceed 200KB uncompressed
NFR5: All interactive elements present a minimum touch target area of 44×44 pixels
NFR6: All text content and interactive element labels maintain a minimum 4.5:1 colour contrast ratio against their background (WCAG 2.1 AA)
NFR7: All interactive elements are focusable and fully operable via keyboard navigation (Tab to focus, Enter/Space to activate)
NFR8: The application contains no content that flashes more than 3 times per second (WCAG 2.3.1 — Three Flashes or Below Threshold)
NFR9: The equation display functions as an ARIA live region, announcing updates to screen readers automatically
NFR10: The application does not collect, store, or transmit any user data — including anonymised analytics, crash reports, or telemetry — during or after a session
NFR11: The application does not include or load any third-party scripts at runtime
NFR12: The application presents no external links, advertisements, social sharing prompts, in-app purchase surfaces, or push notification requests
NFR13: The application functions entirely without setting any persistent browser storage (cookies, localStorage, sessionStorage, IndexedDB)
NFR14: The application functions correctly on Safari on iPadOS (current major version and one prior)
NFR15: The application functions correctly on Chrome on Android tablets (current major version and one prior)
NFR16: The application functions correctly on Chrome, Safari, and Edge on desktop browsers
NFR17: The application requires no browser plugins, extensions, or user permissions to function

### Additional Requirements

**From Architecture:**
- No starter template required — hand-crafted 3-file bespoke set: index.html, style.css, app.js (project init is the FIRST story)
- State machine IIFE module pattern with single state object (phase, firstOperand, operator, secondOperand, result)
- DOM update strategy — single full render() pass on every state change, no incremental updates
- Animation — pure CSS @keyframes + JS class toggling; no animation library; timing via CSS Custom Properties
- Hosting: GitHub Pages (primary) — deploy = git push to main, no build pipeline required
- Testing: browser-based test.html assertion file for calculation engine correctness (no npm, no CI)
- Physical device testing mandatory: Safari/iPadOS (P1), Chrome/Android tablet (P1), desktop browsers (P2)
- .nojekyll file required for GitHub Pages to prevent Jekyll processing
- No eval(), no innerHTML with user strings — all DOM via textContent (security requirement)

**From UX Design:**
- Operator buttons must be visually distinct from digit buttons in shape AND colour, not just label
- Touch targets minimum 60–80px on tablet (exceeds WCAG 44px floor)
- Equation display styled like classroom whiteboard — dominant, visually prominent
- Animated answer reveal: brief bounce (~400ms), celebratory but not chaotic; CSS @keyframes answerReveal
- Long-press oops: visual progress ring (600ms timer) — radial fill animation; must never trigger accidentally
- No red/negative error states — child-appropriate error recovery only (e.g. "Oops!" for division by zero)
- Persistent layout — buttons never appear or disappear based on state (prevents anxiety)
- Oops button always visible and always reachable at every stage of equation entry

### FR Coverage Map

FR1: Epic 2 — Number entry (digit input)
FR2: Epic 2 — Number entry (4-digit max)
FR3: Epic 2 — Number entry (no leading zeros)
FR4: Epic 2 — Operator selection (4 operators)
FR5: Epic 2 — Operator selection (visual state)
FR6: Epic 2 — Operator selection (changeable)
FR7: Epic 2 — Equation display (real-time)
FR8: Epic 2 — Equation display (persistent)
FR9: Epic 2 — Equation display (resets on new calc)
FR10: Epic 2 — Calculation (equals executes)
FR11: Epic 2 — Calculation (result displayed)
FR12: Epic 2 — Calculation (animated reveal)
FR13: Epic 2 — Calculation (arithmetic correctness)
FR14: Epic 2 — Calculation (division by zero handling)
FR15: Epic 2 — Calculation (new calc from result)
FR16: Epic 3 — Error recovery (oops short-press)
FR17: Epic 3 — Error recovery (oops long-press clear)
FR18: Epic 3 — Error recovery (long-press visual feedback)
FR19: Epic 3 — Error recovery (always accessible)
FR20: Epic 1 — Layout (tablet portrait)
FR21: Epic 1 — Layout (tablet landscape)
FR22: Epic 1 — Layout (desktop)
FR23: Epic 4 — Accessibility (touch target size)
FR24: Epic 4 — Accessibility (colour contrast)
FR25: Epic 4 — Accessibility (keyboard operable)
FR26: Epic 4 — Accessibility (screen reader compatible)
FR27: Epic 1 — App delivery (browser access, no install)
FR28: Epic 4 — Privacy (no account required — validated)
FR29: Epic 4 — Privacy (no data collection — validated)
FR30: Epic 1 — App delivery (no external deps — structural)
FR31: Epic 4 — Performance (load targets — validated)

## Epic List

### Epic 1: Project Foundation & Visual Shell
A child can open the app in a browser and see the correctly styled, fully structured calculator layout rendered across tablet portrait, tablet landscape, and desktop — with the design system in place and no external dependencies.
**FRs covered:** FR20, FR21, FR22, FR27, FR30

### Epic 2: Core Calculation Loop
A child can complete the full arithmetic workflow — enter any valid number, select an operator, watch the equation build in real-time in the display, press equals, and see the correct animated result. Division by zero is handled with a child-appropriate response.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15

### Epic 3: Error Recovery
A child can fix mistakes at any stage of equation entry — tapping oops removes the last digit instantly, holding oops clears the entire equation — with a visual progress ring confirming the long-press action is in progress.
**FRs covered:** FR16, FR17, FR18, FR19

### Epic 4: Accessibility, Quality Assurance & Deployment
The app meets all WCAG 2.1 AA accessibility requirements (touch targets, contrast, keyboard, screen reader), passes the browser-based arithmetic test suite, works correctly on all target devices, respects all privacy constraints by architectural validation, meets performance budgets, and is live on GitHub Pages.
**FRs covered:** FR23, FR24, FR25, FR26, FR28, FR29, FR31
**NFRs covered:** NFR1–NFR17

---

## Epic 1: Project Foundation & Visual Shell

A child can open the app in a browser and see the correctly styled, fully structured calculator layout rendered across tablet portrait, tablet landscape, and desktop — with the design system in place and no external dependencies.
**FRs covered:** FR20, FR21, FR22, FR27, FR30

### Story 1.1: Project Scaffold & HTML Calculator Structure

As a child,
I want to open the calculator in my browser and see the correct button layout,
So that I immediately recognise what the app is and know how to use it.

**Acceptance Criteria:**

**Given** the project files exist at the repository root
**When** `index.html` is opened in a browser
**Then** a calculator layout is visible with an answer display, equation display, digit buttons (0–9), four operator buttons (+, −, ×, ÷), an equals button, and an oops button

**Given** the HTML structure is built
**When** the page is inspected
**Then** all buttons have `data-action` and `data-value` attributes, operator buttons have `aria-pressed="false"`, the answer display has `aria-live="assertive"`, the equation display has `role="status"` and `aria-live="assertive"`, and the main element has `aria-label="Grade 3 Calculator"`

**Given** the project files exist
**When** the file list is examined
**Then** the repository root contains `index.html`, `style.css`, `app.js`, `test.html` (empty), `.nojekyll`, `.gitignore`, and `README.md`

**Given** `app.js` is opened
**When** its contents are read
**Then** it contains the skeleton IIFE module structure with empty `dispatch()` and `render()` functions and the state object with all five fields (`phase`, `firstOperand`, `operator`, `secondOperand`, `result`)

---

### Story 1.2: CSS Design System, Visual Shell & Responsive Layout

As a child,
I want the calculator to look clear, colourful, and easy to read,
So that I know exactly which buttons are for numbers and which are for operations.

**Acceptance Criteria:**

**Given** `style.css` is loaded
**When** the `:root` block is inspected
**Then** approximately 25 CSS Custom Properties are defined covering colours, spacing, font sizes, border-radius, and animation durations (`--anim-press-duration`, `--anim-answer-duration`, `--anim-longpress-duration`)

**Given** the calculator is open on a tablet in portrait orientation
**When** the layout is viewed
**Then** a 4-column CSS Grid displays correctly, digit buttons are visually distinct from operator buttons (different colour and shape), all buttons are a minimum of 60px tall, and the answer and equation display zones are clearly separated above the button grid (FR20)

**Given** the device is rotated to landscape
**When** the layout re-renders
**Then** the calculator remains fully usable — all buttons visible and tappable — within the reduced viewport height (FR21)

**Given** the app is opened on a desktop browser at ≥1024px wide
**When** the layout is viewed
**Then** the calculator is centred with a max-width of approximately 600px and remains fully usable (FR22)

**Given** the page is loaded
**When** it is inspected for external dependencies
**Then** there are no external `<link>` or `<script>` tags — only `style.css` and `app.js` are referenced (FR30)

---

## Epic 2: Core Calculation Loop

A child can complete the full arithmetic workflow — enter any valid number, select an operator, watch the equation build in real-time in the display, press equals, and see the correct animated result. Division by zero is handled with a child-appropriate response.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15

### Story 2.1: State Machine, Number Entry & Operator Selection

As a child,
I want to tap digit buttons and operator buttons and see my choices reflected on screen,
So that I can build my equation step by step with confidence.

**Acceptance Criteria:**

**Given** the app is open and idle
**When** a child taps a digit button
**Then** the digit appears in the answer display, state transitions to `first` phase, and the equation display updates to show the number (FR1, FR7)

**Given** a number is being entered
**When** a child taps more digit buttons in sequence
**Then** the digits append correctly to form a multi-digit number up to 4 digits (FR1, FR2)

**Given** a 4-digit number is already entered
**When** a child taps another digit button
**Then** the digit is ignored — no number beyond 4 digits is accepted (FR2)

**Given** the display is empty (idle state)
**When** a child taps 0 followed by another digit
**Then** the result is the second digit alone, not a leading zero (e.g. tapping 0 then 5 shows 5) (FR3)

**Given** a number has been entered
**When** a child taps an operator button (+, −, ×, or ÷)
**Then** the operator button receives a distinct visual selected state (e.g. `is-selected` class), state transitions to `operator` phase, and the equation display shows `[number] [operator]` (FR4, FR5, FR7, FR8)

**Given** an operator is already selected
**When** a child taps a different operator button
**Then** the previous operator loses its selected state, the new operator gains it, and the equation display updates accordingly (FR6)

---

### Story 2.2: Equation Completion, Calculation & Animated Answer

As a child,
I want to enter a second number, press equals, and see my answer appear with a satisfying animation,
So that completing a calculation feels rewarding and I can check my work.

**Acceptance Criteria:**

**Given** an operator has been selected
**When** a child taps digit buttons
**Then** digits are entered as the second operand, state transitions to `second` phase, and the equation display shows the full equation so far (FR1, FR7, FR8)

**Given** a complete equation is built (first number + operator + second number)
**When** a child taps the equals button
**Then** the correct arithmetic result is computed and displayed in the answer display (FR10, FR11, FR13)

**Given** the equals button is tapped and a result is shown
**When** the answer display updates
**Then** the result appears with a bounce animation (~400ms, `@keyframes answerReveal` triggered by adding `.animate` class), drawing attention to the answer (FR12)

**Given** the equals button is tapped with ÷ and the second operand is 0
**When** the calculation is attempted
**Then** the answer display shows `"Oops!"` (or equivalent child-appropriate message), no crash or console error occurs, and the child can start a new calculation by tapping a digit (FR14)

**Given** a result is displayed
**When** a child taps any digit button
**Then** the state resets to `first` phase with the new digit, the equation display clears, and a new calculation begins (FR9, FR15)

**Given** the equation display is visible throughout
**When** the child is at any stage of entry
**Then** the equation display persistently shows the current equation state — first number, operator (if selected), and second number (if entered) (FR8)

---

## Epic 3: Error Recovery

A child can fix mistakes at any stage of equation entry — tapping oops removes the last digit instantly, holding oops clears the entire equation — with a visual progress ring confirming the long-press action is in progress.
**FRs covered:** FR16, FR17, FR18, FR19

### Story 3.1: Short-Press Oops — Remove Last Digit

As a child,
I want to tap the oops button to undo my last digit,
So that I can fix a mistake instantly without starting over.

**Acceptance Criteria:**

**Given** a child has entered one or more digits
**When** the oops button is tapped (short press)
**Then** the most recently entered digit is removed from the current operand and the display updates immediately (FR16)

**Given** a child has entered a single digit
**When** the oops button is tapped
**Then** the operand becomes empty and the state regresses to the appropriate prior phase (e.g. `first` → `idle`, `second` → `operator`) (FR16)

**Given** the child is at any phase of equation entry (idle, first, operator, second)
**When** the oops button is tapped
**Then** the button is always visible and reachable — it is never hidden or disabled (FR19)

**Given** the child is in `operator` phase (first number entered, operator selected, no second number yet)
**When** the oops button is tapped
**Then** the operator is deselected, its visual state resets, and state regresses to `first` phase (FR16, FR19)

---

### Story 3.2: Long-Press Oops — Full Clear with Visual Progress Feedback

As a child,
I want to hold the oops button to wipe the whole equation and start fresh,
So that when I want to start over I can clear everything in one confident action.

**Acceptance Criteria:**

**Given** a child is at any stage of equation entry
**When** the child presses and holds the oops button for ≥600ms
**Then** the entire equation is cleared, state resets to `idle`, the equation display empties, and the answer display resets to its placeholder (FR17)

**Given** the child begins pressing and holding the oops button
**When** the hold duration is between 0ms and 600ms
**Then** a visual progress ring (CSS `@keyframes ringFill` on a pseudo-element) animates around the oops button to signal the long-press is in progress (FR18)

**Given** the child starts a long-press but releases before 600ms
**When** the pointer is lifted
**Then** the progress ring animation is cancelled and removed, no clear action is triggered, and the equation remains unchanged (FR18)

**Given** the long-press completes (≥600ms)
**When** the clear action fires
**Then** all state fields reset (`phase: 'idle'`, operands empty, operator null, result null) and the full clear is confirmed by the equation and answer displays both returning to their empty/placeholder states (FR17)

**Given** the child is in any phase
**When** the oops button is visible
**Then** it is always accessible — never hidden, never disabled — at every point during equation entry (FR19)

---

## Epic 4: Accessibility, Quality Assurance & Deployment

The app meets all WCAG 2.1 AA accessibility requirements (touch targets, contrast, keyboard, screen reader), passes the browser-based arithmetic test suite, works correctly on all target devices, respects all privacy constraints by architectural validation, meets performance budgets, and is live on GitHub Pages.
**FRs covered:** FR23, FR24, FR25, FR26, FR28, FR29, FR31
**NFRs covered:** NFR1–NFR17

### Story 4.1: Keyboard Support & ARIA Accessibility

As a child or adult with accessibility needs,
I want to operate the calculator using only a keyboard and hear equation updates via a screen reader,
So that the app is usable regardless of input method or assistive technology.

**Acceptance Criteria:**

**Given** the app is open
**When** a user presses digit keys (0–9) on the keyboard
**Then** the corresponding digit is entered, identical to tapping the on-screen button (FR25)

**Given** the app is open
**When** a user presses `+`, `-`, `*`, or `/` on the keyboard
**Then** the corresponding operator is selected, identical to tapping the operator button (FR25)

**Given** the app is open
**When** a user presses `Enter` or `=`
**Then** the equals action fires (FR25)

**Given** the app is open
**When** a user presses `Backspace`
**Then** the short-press oops action fires (remove last digit) (FR25)

**Given** the app is open
**When** a user presses `Delete` or `Escape`
**Then** the full clear action fires (FR25)

**Given** a screen reader is active
**When** a digit or operator is tapped and the equation display updates
**Then** the screen reader announces the update automatically via the ARIA live region (`role="status"`, `aria-live="assertive"`) (FR26, NFR9)

**Given** a screen reader is active
**When** the equals button is tapped and the answer is shown
**Then** the screen reader announces the result automatically via the answer display's `aria-live="assertive"` region (FR26, NFR9)

**Given** all interactive elements are present
**When** the app is inspected
**Then** no content flashes more than 3 times per second at any point during use (NFR8)

---

### Story 4.2: Touch Target & Visual Accessibility Audit

As a child with small fingers or a user with visual impairments,
I want all buttons to be large enough to tap accurately and all text to be clearly readable,
So that I can use the calculator without mis-taps or eye strain.

**Acceptance Criteria:**

**Given** the app is open on a tablet
**When** each interactive element is measured
**Then** every button has a minimum touch target area of 44×44 pixels (NFR5, FR23)
**And** on tablet, all buttons are at minimum 60px tall as specified by the UX design

**Given** all text and labels are rendered
**When** each element's colour contrast is measured against its background
**Then** every text element and interactive label achieves a minimum 4.5:1 contrast ratio (WCAG 2.1 AA) (NFR6, FR24)

**Given** all interactive elements are present
**When** the Tab key is used to navigate the page
**Then** every button receives visible focus in a logical sequence, and pressing Enter or Space activates the focused button (NFR7, FR25)

**Given** the app is running
**When** the total page weight is measured (HTML + CSS + JS + all assets)
**Then** the total is under 200KB uncompressed (NFR4)

---

### Story 4.3: Arithmetic Test Suite

As a developer,
I want a browser-based test file that verifies all arithmetic operations and edge cases,
So that calculation correctness is permanently protected against regressions.

**Acceptance Criteria:**

**Given** `test.html` is opened in a browser
**When** the page loads
**Then** all test assertions run automatically and a pass/fail summary is displayed in the browser

**Given** the test suite runs
**When** all four operations are tested with representative inputs
**Then** addition, subtraction, multiplication, and division all return correct results (FR13)

**Given** the test suite runs
**When** edge cases are tested
**Then** the following all pass: division by zero returns the child-appropriate response, 4-digit max input is enforced, leading zero prevention works, and operator chaining (result becomes first operand) works correctly (FR2, FR3, FR13, FR14)

**Given** the test suite runs
**When** oops behaviour is tested
**Then** single-digit removal and full clear both produce the correct resulting state (FR16, FR17)

**Given** `test.html` is inspected
**When** its contents are reviewed
**Then** it imports or references only `app.js`, uses a tiny inline test helper (~20 lines), and has no external dependencies (NFR11)

---

### Story 4.4: Cross-Device Testing, Privacy Validation & GitHub Pages Deployment

As a child, parent, or teacher,
I want to open the app from a URL on any supported device and have it work perfectly,
So that I can use it on a family tablet, school device, or desktop without setup.

**Acceptance Criteria:**

**Given** the app is deployed to GitHub Pages
**When** the live URL is opened on Safari on iPadOS (current and one prior major version)
**Then** all calculator functionality works correctly — calculation loop, error recovery, animations, and layout (NFR14, FR27)

**Given** the live URL is opened on Chrome on an Android tablet (current and one prior major version)
**When** the app is used
**Then** all calculator functionality works correctly (NFR15, FR27)

**Given** the live URL is opened on Chrome, Safari, and Edge on desktop
**When** the app is used
**Then** all calculator functionality works correctly (NFR16)

**Given** the app is accessed on any device
**When** the network traffic is inspected
**Then** there are zero external network requests — no analytics, no tracking, no third-party scripts load (NFR10, NFR11, FR29)

**Given** the app is used for a complete session
**When** browser storage is inspected after the session
**Then** no cookies, localStorage entries, sessionStorage entries, or IndexedDB entries were created (NFR13, FR28)

**Given** the app is loaded on a standard tablet browser over average home Wi-Fi
**When** performance is measured
**Then** First Contentful Paint is under 1.5 seconds (NFR1), Time to Interactive is under 2 seconds (NFR2), all button interactions produce visible feedback within 100ms (NFR3), and total page weight is under 200KB (NFR4, FR31)

**Given** the repository is pushed to GitHub with a `.nojekyll` file present
**When** GitHub Pages is enabled from the `main` branch root
**Then** the app is live at the GitHub Pages URL and accessible to any user without installation or account creation (FR27, FR28, NFR17)

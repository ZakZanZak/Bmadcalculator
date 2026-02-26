# Implementation Patterns & Consistency Rules

## Critical Conflict Points Identified

7 areas where AI agents could make different choices without explicit rules. All agents MUST follow these patterns.

---

## Naming Patterns

**JavaScript Naming:**

| Construct | Convention | Example |
|---|---|---|
| Functions | `camelCase` | `pressDigit()`, `buildEquationString()` |
| Variables | `camelCase` | `firstOperand`, `selectedOperator` |
| Constants / magic values | `UPPER_SNAKE_CASE` | `MAX_DIGITS`, `LONG_PRESS_DURATION` |
| State action types | `UPPER_SNAKE_CASE` string | `'PRESS_DIGIT'`, `'PRESS_OPERATOR'`, `'PRESS_EQUALS'`, `'PRESS_OOPS'`, `'LONG_PRESS_CLEAR'` |
| State phase values | `lowercase` string enum | `'idle'`, `'first'`, `'operator'`, `'second'`, `'result'` |
| IIFE module name | `PascalCase` | `Calculator` |

**CSS Class Naming: kebab-case with semantic prefix**

| Prefix | Use | Example |
|---|---|---|
| `btn-` | Button variant | `btn-digit`, `btn-operator`, `btn-equals`, `btn-oops` |
| `is-` | State modifier | `is-selected`, `is-animating`, `is-longpress` |
| `display-` | Display zone | `display-equation`, `display-answer` |

No BEM, no utility-first. Flat semantic names. One class per element; state changes add/remove `is-*` classes only.

**CSS Custom Property Naming: `--kebab-case` with category prefix**

| Category | Pattern | Examples |
|---|---|---|
| Colours | `--color-[role]` | `--color-bg`, `--color-digit`, `--color-equals`, `--color-op-add` |
| Sizing | `--size-[element]` | `--size-btn-digit`, `--size-display-height` |
| Spacing | `--gap-[context]` | `--gap-buttons`, `--gap-display` |
| Animation | `--anim-[name]` | `--anim-press`, `--anim-answer`, `--anim-longpress` |

All tokens defined in `:root` at the top of `style.css`. Never hard-code a colour or timing value outside of `:root`.

**File Naming: lowercase kebab-case**

`index.html`, `style.css`, `app.js`, `test.html` — no uppercase, no underscores.

---

## Structure Patterns

**File Responsibility Rules (strict separation):**

| File | Owns | Must NOT contain |
|---|---|---|
| `index.html` | Semantic HTML, ARIA attributes, `data-action` / `data-value` attributes, single `<link>` and `<script>` tags | Inline styles, inline `onclick` handlers, logic |
| `style.css` | All design tokens, all layout, all component styles, all animations | Hardcoded hex values outside `:root`, `!important` |
| `app.js` | State machine, dispatch, render, event listeners, calculation engine | DOM `id` strings hardcoded more than once (use `const` references at top) |
| `test.html` | Calculation engine assertions, test runner display | App UI, state side-effects |

**`app.js` Internal Section Order (all agents follow this order):**

```
1. DOM References      (const el = document.querySelector...)
2. Constants           (MAX_DIGITS, LONG_PRESS_DURATION, etc.)
3. State Object        (const state = { ... })
4. Calculation Engine  (pure function: calculate(a, op, b) → number)
5. State Helpers       (pure functions: buildEquationString, isEquationComplete, etc.)
6. Dispatch + Render   (mutate state → render)
7. Event Listeners     (delegated click, keydown, pointerdown/pointerup for long-press)
```

---

## Communication Patterns

**State Management Rules:**

- **ONLY `dispatch()` may mutate `state`** — no other function reads or writes `state` directly
- `dispatch(actionType, payload)` mutates `state` synchronously, then calls `render()` exactly once
- `render()` is a pure projection of `state` onto the DOM — it reads `state`, never mutates it
- No `setTimeout` or async code inside `dispatch` or `render`

**Action Type Registry (complete list — no undocumented actions):**

| Action | Payload | Effect |
|---|---|---|
| `'PRESS_DIGIT'` | `string` ('0'–'9') | Append digit to current operand |
| `'PRESS_OPERATOR'` | `string` ('+', '-', '×', '÷') | Set operator slot |
| `'PRESS_EQUALS'` | none | Compute result, trigger animation |
| `'PRESS_OOPS'` | none | Remove last digit |
| `'LONG_PRESS_CLEAR'` | none | Reset all state to idle |

No other action types may be added without updating this registry.

---

## Process Patterns

**DOM Safety — ALWAYS `textContent`, NEVER `innerHTML` for dynamic content:**

```js
// CORRECT
equationEl.textContent = buildEquationString(state);

// FORBIDDEN — XSS risk even in a client-only app
equationEl.innerHTML = buildEquationString(state);
```

`innerHTML` is permitted only for static structural HTML in `index.html` itself, never in `app.js`.

**Invalid State / No-Op Pattern:**

When a button press is logically invalid (e.g. pressing equals with incomplete equation), respond with a **no-op** or brief visual feedback only. Never `console.error()`, `alert()`, or show negative language.

```js
// CORRECT — no-op with optional visual feedback
if (!isEquationComplete(state)) {
  equationEl.classList.add('is-shake');
  return;
}

// FORBIDDEN
throw new Error('Equation incomplete');
```

**Animation Trigger Pattern — class add → `animationend` → class remove:**

```js
// CORRECT
answerEl.classList.add('is-animating');
answerEl.addEventListener('animationend', () => {
  answerEl.classList.remove('is-animating');
}, { once: true });

// FORBIDDEN — timing drift, accessibility issues
answerEl.classList.add('is-animating');
setTimeout(() => answerEl.classList.remove('is-animating'), 400);
```

**Long-Press Pattern — `pointerdown`/`pointerup` + `setTimeout`:**

```js
let longPressTimer = null;
oopsBtn.addEventListener('pointerdown', () => {
  longPressTimer = setTimeout(() => {
    Calculator.dispatch('LONG_PRESS_CLEAR');
    longPressTimer = null;
  }, LONG_PRESS_DURATION);
});
oopsBtn.addEventListener('pointerup', () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    Calculator.dispatch('PRESS_OOPS');
    longPressTimer = null;
  }
});
oopsBtn.addEventListener('pointercancel', () => {
  clearTimeout(longPressTimer);
  longPressTimer = null;
});
```

Use `pointer*` events (not `touch*`) — handles both touch and mouse uniformly across all P1/P2 browsers.

---

## Enforcement Guidelines

**All AI agents MUST:**

- Consult the action type registry before adding any interaction
- Use `textContent` for all dynamic DOM text updates — never `innerHTML`
- Define all CSS values as Custom Properties in `:root` — never hardcode colours or timings inline
- Follow the `app.js` section order — new code goes in the correct section, not appended to the bottom
- Use `animationend` (not `setTimeout`) for animation cleanup
- Use `pointer*` events (not `touch*`) for all custom gesture detection
- Keep the `calculate()` function pure — no DOM or state dependencies
- Never access or mutate `state` from outside `dispatch()`

**Anti-Patterns (forbidden):**

| Anti-pattern | Correct alternative |
|---|---|
| `innerHTML = dynamicString` | `textContent = dynamicString` |
| Hard-coded `'#FF6B35'` in `app.js` | `var(--color-op-add)` in CSS |
| `setTimeout(cleanup, 400)` for animation | `addEventListener('animationend', cleanup, { once: true })` |
| `state.firstOperand = '5'` outside dispatch | `Calculator.dispatch('PRESS_DIGIT', '5')` |
| `touchstart` / `touchend` for gestures | `pointerdown` / `pointerup` |
| `onclick="doSomething()"` in HTML | `addEventListener` in `app.js` |
| Magic numbers in `app.js` body | Named constant at top: `const MAX_DIGITS = 4` |
| Undocumented action type strings | Add to action type registry first |

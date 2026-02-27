// ─── 1. DOM References ───────────────────────────────────────────────────────
const calculatorEl = document.getElementById('calculator');
const equationEl   = document.querySelector('.display-equation');
const answerEl     = document.querySelector('.display-answer');
const oopsBtn      = document.getElementById('btn-oops');

// ─── 2. Constants ────────────────────────────────────────────────────────────
const MAX_DIGITS          = 4;
const LONG_PRESS_DURATION = 600; // ms
const API_URL             = 'https://p69frb2gm4.execute-api.us-east-1.amazonaws.com/Dev/calculate';
const OPERATOR_MAP        = { '+': 'add', '−': 'subtract', '×': 'multiply', '÷': 'divide' };

// ─── 3. State Object ─────────────────────────────────────────────────────────
const state = {
  phase:         'idle',   // 'idle' | 'first' | 'operator' | 'second' | 'calculating' | 'result'
  firstOperand:  '',       // string of digits, e.g. '47'
  operator:      null,     // '+' | '−' | '×' | '÷' | null
  secondOperand: '',       // string of digits, e.g. '36'
  result:        null      // number | 'Oops!' | null
};

// ─── 4. Calculation Engine (calls Lambda API) ─────────────────────────────────
async function calculate(a, op, b) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ num1: Number(a), num2: Number(b), operation: OPERATOR_MAP[op] })
  });
  if (!response.ok) throw new Error('API error ' + response.status);
  const data = await response.json();
  return data.result; // expects { "result": <number> }
}

// ─── 5. State Helpers (pure — read state, return values) ─────────────────────
function buildEquationString(s) {
  if (s.phase === 'idle') return '';
  if (s.phase === 'first') return s.firstOperand;
  if (s.phase === 'operator') return s.firstOperand + ' ' + s.operator;
  if (s.phase === 'second' || s.phase === 'calculating') return s.firstOperand + ' ' + s.operator + ' ' + s.secondOperand;
  if (s.phase === 'result') return s.firstOperand + ' ' + s.operator + ' ' + s.secondOperand + ' =';
  return '';
}

function isEquationComplete(s) {
  return s.phase === 'second' && s.secondOperand.length > 0;
}

function getActiveOperand(s) {
  if (s.phase === 'first') return 'firstOperand';
  if (s.phase === 'second') return 'secondOperand';
  return null;
}

// ─── 6. Dispatch + Render ────────────────────────────────────────────────────
const Calculator = (() => {
  async function dispatch(action, payload) {
    // Block all input while API call is in flight, except a clear
    if (state.phase === 'calculating' && action !== 'LONG_PRESS_CLEAR') return;

    if (action === 'PRESS_DIGIT') {
      const digit = payload;
      if (state.phase === 'idle' || state.phase === 'first') {
        if (state.firstOperand === '0') {
          state.firstOperand = digit;
        } else if (state.firstOperand.length < MAX_DIGITS) {
          state.firstOperand += digit;
        }
        // else: length >= MAX_DIGITS — silent no-op
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

    if (action === 'PRESS_EQUALS') {
      if (!isEquationComplete(state)) {
        equationEl.classList.add('is-shake');
        equationEl.addEventListener('animationend', () => {
          equationEl.classList.remove('is-shake');
        }, { once: true });
        return; // EXCEPTION: return before render() — shake is the only visual feedback
      }
      state.phase = 'calculating';
      render(); // show '...' immediately while request is in flight
      try {
        const result = await calculate(state.firstOperand, state.operator, state.secondOperand);
        state.result = (typeof result === 'number' && !isNaN(result)) ? result : 'Oops!';
      } catch (_) {
        state.result = 'Oops!';
      }
      state.phase = 'result';
      render();
      return; // render already called above — don't fall through
    }

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

    if (action === 'LONG_PRESS_CLEAR') {
      state.phase = 'idle';
      state.firstOperand = '';
      state.operator = null;
      state.secondOperand = '';
      state.result = null;
    }

    render();
  }

  function render() {
    // Answer display
    if (state.phase === 'idle') {
      answerEl.textContent = '?';
    } else if (state.phase === 'first' || state.phase === 'operator') {
      answerEl.textContent = state.firstOperand;
    } else if (state.phase === 'second') {
      answerEl.textContent = state.secondOperand;
    } else if (state.phase === 'calculating') {
      answerEl.textContent = '...';
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

  render(); // initialize DOM on page load

  return { dispatch };
})();

// ─── 7. Event Listeners ──────────────────────────────────────────────────────

// Delegated click — all buttons (oops long-press handled separately below)
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
  } else if (e.key === 'Enter' || e.key === '=') {
    Calculator.dispatch('PRESS_EQUALS');
  } else if (e.key === 'Backspace') {
    Calculator.dispatch('PRESS_OOPS');
  } else if (e.key === 'Delete' || e.key === 'Escape') {
    Calculator.dispatch('LONG_PRESS_CLEAR');
  }
});

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

# Starter Template Evaluation

## Primary Technology Domain

Static client-side web — vanilla HTML5/CSS3/JavaScript (ES6+), no framework, no build tooling, no package manager required at runtime.

## Starter Options Considered

| Option | Verdict |
|---|---|
| HTML5 Boilerplate v9.0.0 | Rejected — valuable for larger sites; carries complexity (build tools, server configs, normalize.css) disproportionate to a 6-component, 200KB-budget app |
| Local-First Web Starter | Rejected — obscure, adds no value over hand-crafted at this scope |
| **Hand-crafted 3-file bespoke set** | **Selected** |

## Selected Starter: Hand-Crafted Bespoke

**Rationale for Selection:**
The UX specification effectively functions as the starter template — it defines the complete design token system, component inventory, layout grid, animation parameters, and ARIA strategy. No external scaffolding adds more value than following that spec directly. The 200KB total page budget and "openable by double-clicking" requirement exclude any tool with a build step.

**Initialization Command:**
```bash
# Create project files directly — no package manager required
touch index.html style.css app.js
```

**Architectural Decisions Provided by Starter:**

- **Language & Runtime:** Vanilla JavaScript (ES6+) — no TypeScript compilation, no transpilation
- **Styling Solution:** Pure CSS3 with Custom Properties as design token system (~25 tokens)
- **Build Tooling:** None — files served/opened directly; optional `npx live-server` for development hot-reload only (dev dependency, never ships)
- **Testing Framework:** Not scaffolded at project init — browser devtools + physical device testing per PRD requirement
- **Code Organization:** Single-responsibility file separation: HTML (structure + ARIA), CSS (design tokens + layout + animation), JS (state machine + event handlers + DOM updates)
- **Development Experience:** Open `index.html` in browser → edit files → refresh. Optional: `npx live-server .` for auto-refresh during development

**Note:** Project initialization is the first implementation story — create `index.html`, `style.css`, and `app.js` with skeleton content, verify opens correctly in Safari/Chrome, and confirm design tokens are in place.

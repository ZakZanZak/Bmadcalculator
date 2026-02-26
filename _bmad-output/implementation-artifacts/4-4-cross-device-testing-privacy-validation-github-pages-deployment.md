# Story 4.4: Cross-Device Testing, Privacy Validation & GitHub Pages Deployment

Status: ready-for-dev

## Story

As a child, parent, or teacher,
I want to open the app from a URL on any supported device and have it work perfectly,
So that I can use it on a family tablet, school device, or desktop without setup.

## Acceptance Criteria

1. **Given** the app is deployed to GitHub Pages
   **When** the live URL is opened on Safari on iPadOS (current and one prior major version)
   **Then** all calculator functionality works correctly — calculation loop, error recovery, animations, and layout (NFR14, FR27)

2. **Given** the live URL is opened on Chrome on an Android tablet (current and one prior major version)
   **When** the app is used
   **Then** all calculator functionality works correctly (NFR15, FR27)

3. **Given** the live URL is opened on Chrome, Safari, and Edge on desktop
   **When** the app is used
   **Then** all calculator functionality works correctly (NFR16)

4. **Given** the app is accessed on any device
   **When** the network traffic is inspected
   **Then** there are zero external network requests — no analytics, no tracking, no third-party scripts load (NFR10, NFR11, FR29)

5. **Given** the app is used for a complete session
   **When** browser storage is inspected after the session
   **Then** no cookies, localStorage entries, sessionStorage entries, or IndexedDB entries were created (NFR13, FR28)

6. **Given** the app is loaded on a standard tablet browser over average home Wi-Fi
   **When** performance is measured
   **Then** First Contentful Paint is under 1.5 seconds (NFR1), Time to Interactive is under 2 seconds (NFR2), all button interactions produce visible feedback within 100ms (NFR3), and total page weight is under 200KB (NFR4, FR31)

7. **Given** the repository is pushed to GitHub with a `.nojekyll` file present
   **When** GitHub Pages is enabled from the `main` branch root
   **Then** the app is live at the GitHub Pages URL and accessible to any user without installation or account creation (FR27, FR28, NFR17)

## Tasks / Subtasks

- [ ] Task 1: Deploy to GitHub Pages (AC: 7)
  - [ ] 1.1 Confirm all project files are committed — `index.html`, `style.css`, `app.js`, `test.html`, `.nojekyll`, `.gitignore`, `README.md`
  - [ ] 1.2 Create a GitHub repository (public) named `bmadcalculator` (or equivalent)
  - [ ] 1.3 Push `main` branch to GitHub: `git remote add origin <url>` then `git push -u origin main`
  - [ ] 1.4 Enable GitHub Pages: repo Settings → Pages → Source: Deploy from branch `main`, folder `/ (root)` → Save
  - [ ] 1.5 Confirm Pages is live — visit `https://<username>.github.io/bmadcalculator/` and verify calculator loads correctly
  - [ ] 1.6 Update `README.md` to add the live URL under a `## Live App` section

- [ ] Task 2: Cross-device testing — iPadOS Safari (AC: 1)
  - [ ] 2.1 Open live URL on iPad in Safari (current iPadOS major version): enter `3 + 4 =` → confirm result `7` and animation play
  - [ ] 2.2 Test error recovery: hold oops button for ≥600ms → confirm full clear with ring animation
  - [ ] 2.3 Test layout: portrait and landscape orientations — confirm all buttons visible and tappable
  - [ ] 2.4 If prior iPadOS major version available: repeat 2.1–2.3

- [ ] Task 3: Cross-device testing — Android Chrome (AC: 2)
  - [ ] 3.1 Open live URL on Android tablet in Chrome (current major version): run a complete calculation, test oops short-press and long-press, verify layout in portrait and landscape
  - [ ] 3.2 If prior Chrome major version available: repeat 3.1

- [ ] Task 4: Cross-device testing — Desktop browsers (AC: 3)
  - [ ] 4.1 Chrome desktop: open live URL, run calculation loop end-to-end, confirm keyboard shortcuts (digits, operators, Enter, Backspace, Escape) all work
  - [ ] 4.2 Safari desktop (macOS only): same verification as 4.1
  - [ ] 4.3 Edge desktop: same verification as 4.1

- [ ] Task 5: Privacy validation (AC: 4, 5)
  - [ ] 5.1 Open DevTools → Network tab → load live URL → confirm zero external requests (only `style.css`, `app.js` load from same origin)
  - [ ] 5.2 Open DevTools → Application tab → Storage section: confirm Cookies, Local Storage, Session Storage, and IndexedDB are all empty after a complete calculation session

- [ ] Task 6: Performance validation (AC: 6)
  - [ ] 6.1 Open DevTools → Lighthouse tab → run Performance audit on live URL (mobile preset) → confirm FCP <1.5s and TTI <2s
  - [ ] 6.2 Confirm interaction responsiveness: tap a button while watching DevTools Performance timeline → confirm visible feedback (scale transform) appears within 100ms
  - [ ] 6.3 Confirm page weight: total HTML+CSS+JS ≤ 200KB uncompressed (already measured at ~26.1KB in Story 4.2; re-confirm test.html doesn't inflate count as it is not loaded by the app)

---

## Dev Notes

### CRITICAL: Pre-Deployment State — Everything Is Ready

All code is complete and verified. This story is **deployment + manual verification** only. No new code required unless a genuine cross-device issue is discovered.

**Current file inventory at project root:**

| File | Size | Status |
|---|---|---|
| `index.html` | 3,117 B | ✓ complete (Story 1.1) |
| `style.css` | 13,123 B | ✓ complete (Story 1.2) |
| `app.js` | 9,656 B | ✓ complete (Stories 2.1, 2.2, 3.1, 3.2) |
| `test.html` | ~5,277 B | ✓ complete (Story 4.3) |
| `.nojekyll` | 0 B | ✓ exists (Story 1.1) — empty file, presence is all that matters |
| `.gitignore` | 42 B | ✓ exists (Story 1.1) |
| `README.md` | 391 B | ✓ exists (Story 1.1) — needs live URL added in Task 1.6 |

**Total deployable page weight (index.html + style.css + app.js):** ~25.9 KB — 87% headroom vs 200 KB budget. `test.html` is not loaded by the app, so it does not count against the NFR4 budget for end users.

---

### Task 1 — GitHub Pages Deployment

The `.git` directory already exists in the project root — the repository is initialised. The only remaining steps are:

1. **Create a GitHub repo** (if not done): Go to github.com → New repository → name `bmadcalculator` → Public → **do NOT** initialise with README (our README already exists) → Create
2. **Add remote and push:**
   ```bash
   git remote add origin https://github.com/<username>/bmadcalculator.git
   git branch -M main
   git push -u origin main
   ```
3. **Enable Pages:** GitHub repo → Settings → Pages → Source: `Deploy from a branch` → Branch: `main`, folder: `/ (root)` → Save
4. **Wait ~1 minute** for Pages to build, then visit `https://<username>.github.io/bmadcalculator/`

**Why `.nojekyll` matters:** Without this file, GitHub Pages runs Jekyll processing on the repo. Jekyll ignores files starting with `_` or `.` by default, which would hide any `_bmad*` directories but — more critically — could interfere with processing. The empty `.nojekyll` file disables Jekyll entirely, serving files as-is.

**README live URL update** (Task 1.6) — minimal edit, add below existing content:
```markdown
## Live App

[Open Bmadcalculator](https://username.github.io/bmadcalculator/)
```

---

### Task 2–4 — Cross-Device Testing Protocol

**What to test on each device/browser:**

| Step | Action | Expected result |
|---|---|---|
| Calculation loop | Tap `3`, `+`, `4`, `=` | Answer display shows `7` with bounce animation |
| Division by zero | Tap `5`, `÷`, `0`, `=` | Answer display shows `Oops!` |
| 4-digit max | Tap 5 digits | 5th digit ignored |
| Oops short-press | Enter `47`, tap oops | Display shows `4` |
| Oops long-press | Hold oops ≥600ms | Ring animates, full clear on release |
| Keyboard (desktop) | Press `3`, `+`, `4`, `Enter` | Same as tap |
| Portrait layout | Rotate device | All buttons visible |
| Landscape layout | Rotate device | All buttons visible within reduced height |

**If a genuine issue is found:** Document the exact browser/OS version, describe the failure, then apply the minimal CSS or JS fix required. Do not refactor surrounding code.

---

### Task 5 — Privacy Validation: What to Look For

**Network tab — expected results:**
- `index.html` loads from `github.io` origin ✓
- `style.css` loads from same origin ✓
- `app.js` loads from same origin ✓
- **Zero** requests to any other domain (no Google Analytics, no CDN, no fonts, no tracking pixels)

**Application tab → Storage — expected results:**
- Cookies: empty
- Local Storage → `github.io`: no entries
- Session Storage → `github.io`: no entries
- IndexedDB: no databases

**Why this passes by architecture:** `app.js` makes no `fetch()`, `XMLHttpRequest`, or dynamic `<script>` insertions. There is no `<link rel="preconnect">` to external domains. All state is held in a JavaScript `const` — it vanishes when the tab closes.

---

### Task 6 — Performance Validation: Targets

| Metric | Target | Why achievable |
|---|---|---|
| First Contentful Paint (FCP) | <1.5 s | ~26 KB total; no render-blocking resources; CSS is inline-loaded |
| Time to Interactive (TTI) | <2 s | `app.js` 9.4 KB, no async work, no framework boot |
| Interaction to feedback | <100 ms | CSS `:active` transform fires instantly; no JS in the tap path |
| Page weight | <200 KB | Measured at ~26 KB; no images, no fonts |

**Lighthouse caveat:** Run on the **live GitHub Pages URL**, not `localhost` — otherwise CDN latency is not reflected. Use the **Mobile** device preset for conservative/realistic measurement.

---

### Previous Story Intelligence

**Story 4.2 (review):** Page weight confirmed at 26,143 bytes total. `test.html` was 247 bytes at that point — it is now ~5,277 bytes after Story 4.3, but the total for the **app** (what users load) remains unchanged at ~26.1 KB.

**Story 4.3 (review):** `test.html` test suite verified all arithmetic correctness, edge cases, and oops behaviour. All 18 assertions pass — the calculation engine is correct.

**Story 4.1 (review):** Keyboard bindings and ARIA live regions confirmed working in browser.

**Story 1.1 (review):** `.nojekyll`, `.gitignore`, `README.md` created. Repository structure finalised.

---

### Architecture Rules (enforced)

| Rule | Requirement |
|---|---|
| No external scripts | Zero external `<script>` or `<link>` tags in `index.html` (NFR11) |
| No storage | No `localStorage`, `sessionStorage`, `IndexedDB`, or cookies used anywhere in `app.js` (NFR13) |
| No network calls | No `fetch()`, `XMLHttpRequest`, or WebSocket in `app.js` (NFR10) |
| `.nojekyll` must exist | Prevents GitHub Pages Jekyll processing — file must remain at repo root |
| Deploy from `main` root | No `docs/` subfolder, no `gh-pages` branch — Pages serves from `/` of `main` |

### Project Structure Notes

- Files that **may** be changed: `README.md` only (add live URL in Task 1.6)
- All other project files — no changes expected unless a cross-device bug is found
- `_bmad*` directories are not deployed concerns — Pages serves only the root-level files

### References

- NFR1: FCP <1.5s: [Source: planning-artifacts/epics.md#nonfunctional-requirements]
- NFR2: TTI <2s: [Source: planning-artifacts/epics.md#nonfunctional-requirements]
- NFR3: Interaction <100ms: [Source: planning-artifacts/epics.md#nonfunctional-requirements]
- NFR4: Page weight <200KB: [Source: planning-artifacts/epics.md#nonfunctional-requirements]
- NFR10: No external network calls: [Source: planning-artifacts/epics.md#nonfunctional-requirements]
- NFR11: No third-party scripts: [Source: planning-artifacts/epics.md#nonfunctional-requirements]
- NFR13: No persistent browser storage: [Source: planning-artifacts/epics.md#nonfunctional-requirements]
- NFR14: Safari/iPadOS support: [Source: planning-artifacts/epics.md#nonfunctional-requirements]
- NFR15: Chrome/Android support: [Source: planning-artifacts/epics.md#nonfunctional-requirements]
- NFR16: Desktop browser support: [Source: planning-artifacts/epics.md#nonfunctional-requirements]
- NFR17: No plugins/permissions: [Source: planning-artifacts/epics.md#nonfunctional-requirements]
- FR27: Browser access, no install: [Source: planning-artifacts/epics.md#fr-coverage-map]
- FR28: No account required: [Source: planning-artifacts/epics.md#fr-coverage-map]
- FR29: No data collection: [Source: planning-artifacts/epics.md#fr-coverage-map]
- FR31: Performance targets: [Source: planning-artifacts/epics.md#fr-coverage-map]
- GitHub Pages deployment: [Source: planning-artifacts/architecture/core-architectural-decisions.md#infrastructure--deployment]
- `.nojekyll` requirement: [Source: planning-artifacts/architecture/project-structure-boundaries.md]
- Page weight measurements: [Source: implementation-artifacts/4-2-touch-target-visual-accessibility-audit.md#task-4-page-weight]

## Dev Agent Record

### Agent Model Used

_to be filled by dev agent_

### Debug Log References

_none_

### Completion Notes List

_to be filled by dev agent_

### File List

- `README.md` (add live URL section after deployment)

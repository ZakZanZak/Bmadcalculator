# Domain-Specific Requirements

## Compliance & Regulatory

- **COPPA (Children's Online Privacy Protection Act):** Fully compliant by design — zero data collection, zero user accounts, zero cookies beyond session. No consent mechanism required because no personal data is collected.
- **FERPA:** Not applicable — no student records stored or processed.
- **WCAG 2.1 AA:** Target accessibility standard. Required for educational software used in school settings. Key requirements: minimum 4.5:1 colour contrast ratio, 44×44px minimum touch targets, no content that flashes more than 3 times per second.

## Technical Constraints

- **No data persistence:** The app must function entirely without localStorage, sessionStorage, cookies, or any server-side data storage. Each session is stateless.
- **No external dependencies at runtime:** No CDN calls to third-party analytics, tracking, or advertising scripts. Fully self-contained to ensure child safety and fast loads.
- **Child-safe design principles:** No external links, no social sharing, no advertising surfaces, no in-app purchases, no push notification requests.

## Risk Mitigations

| Risk | Mitigation |
|------|-----------|
| Accidental data collection via third-party scripts | No third-party scripts included in build |
| Accessibility failure (colour contrast) | WCAG 2.1 AA audit before launch |
| Cross-origin content issues | Static hosting, no iframes or external embeds |

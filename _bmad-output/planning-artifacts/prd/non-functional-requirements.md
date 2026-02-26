# Non-Functional Requirements

## Performance

- **NFR1:** The app achieves First Contentful Paint in under 1.5 seconds on a standard tablet browser over average home Wi-Fi
- **NFR2:** The app becomes fully interactive (Time to Interactive) in under 2 seconds on a standard tablet browser
- **NFR3:** All interactive elements respond to user input with visible feedback within 100 milliseconds of touch or click
- **NFR4:** The total page weight (HTML, CSS, JavaScript, and all assets) does not exceed 200KB uncompressed

## Accessibility

- **NFR5:** All interactive elements present a minimum touch target area of 44×44 pixels
- **NFR6:** All text content and interactive element labels maintain a minimum 4.5:1 colour contrast ratio against their background (WCAG 2.1 AA)
- **NFR7:** All interactive elements are focusable and fully operable via keyboard navigation (Tab to focus, Enter/Space to activate)
- **NFR8:** The application contains no content that flashes more than 3 times per second (WCAG 2.3.1 — Three Flashes or Below Threshold)
- **NFR9:** The equation display functions as an ARIA live region, announcing updates to screen readers automatically without requiring additional user action

## Privacy & Child Safety

- **NFR10:** The application does not collect, store, or transmit any user data — including anonymised analytics, crash reports, or telemetry — during or after a session
- **NFR11:** The application does not include or load any third-party scripts at runtime
- **NFR12:** The application presents no external links, advertisements, social sharing prompts, in-app purchase surfaces, or push notification requests
- **NFR13:** The application functions entirely without setting any persistent browser storage (cookies, localStorage, sessionStorage, IndexedDB)

## Compatibility

- **NFR14:** The application functions correctly on Safari on iPadOS (current major version and one prior)
- **NFR15:** The application functions correctly on Chrome on Android tablets (current major version and one prior)
- **NFR16:** The application functions correctly on Chrome, Safari, and Edge on desktop browsers
- **NFR17:** The application requires no browser plugins, extensions, or user permissions to function

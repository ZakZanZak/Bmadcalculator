# Functional Requirements

## Number Entry

- **FR1:** A child can enter any positive integer by tapping digit buttons (0–9) in sequence
- **FR2:** The system limits number input to a maximum length that prevents numbers beyond the grade 3 range (up to 4 digits)
- **FR3:** The system prevents leading zeros in number entry (e.g. entering 0 then 5 produces 5, not 05)

## Operation Selection

- **FR4:** A child can select one arithmetic operator — addition, subtraction, multiplication, or division — to define the operation
- **FR5:** The system indicates which operator is currently selected with a distinct visual state
- **FR6:** A child can change the selected operator before entering the second number, replacing the previous selection

## Equation Display

- **FR7:** The system displays the complete equation in real time as the child builds it — first number, then operator, then second number
- **FR8:** The equation display is persistent and continuously visible throughout calculation entry
- **FR9:** After a completed calculation, the equation display resets to an empty state when the child begins a new calculation

## Calculation & Answer

- **FR10:** A child can execute the built equation by pressing the equals button
- **FR11:** The system displays the calculated result after equals is pressed
- **FR12:** The system presents the answer using an animated reveal effect that draws attention to the result
- **FR13:** The system correctly computes addition, subtraction, multiplication, and division for integer operands
- **FR14:** The system provides a clear, child-appropriate response when an undefined operation is attempted (e.g. division by zero)
- **FR15:** After viewing a calculated answer, a child can begin a new calculation by pressing any digit button

## Error Recovery

- **FR16:** A child can remove the most recently entered digit by pressing the oops button once
- **FR17:** A child can clear the entire current equation by pressing and holding the oops button
- **FR18:** The system provides visual feedback during a long-press clear action to signal it is in progress
- **FR19:** Error recovery controls are accessible to the child at any point during equation entry

## Accessibility & Layout

- **FR20:** The interface renders correctly and is fully usable in tablet portrait orientation
- **FR21:** The interface renders correctly and is fully usable in tablet landscape orientation
- **FR22:** The interface presents a usable layout on desktop browser screens
- **FR23:** All interactive elements present a touch target that meets the minimum accessibility size standard
- **FR24:** All text and interactive element labels meet the minimum colour contrast ratio for visual accessibility
- **FR25:** All interactive elements are operable using keyboard input alone, without requiring a mouse or touch
- **FR26:** The equation display and answer result are compatible with screen reader assistive technology

## App Delivery & Privacy

- **FR27:** Any user can access the app directly in a web browser without downloading or installing software
- **FR28:** Any user can access the app without creating an account, providing credentials, or logging in
- **FR29:** The system operates without collecting, storing, or transmitting any user data during or after a session
- **FR30:** The system contains no external runtime dependencies that could introduce third-party tracking or cause load failures
- **FR31:** The app loads and becomes fully interactive within the defined performance targets on a standard tablet browser

---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: []
session_topic: 'What type/niche of calculator app to build'
session_goals: 'Explore the landscape of calculator types, identify the most promising direction, and uncover angles that may not be immediately obvious'
selected_approach: 'ai-recommended'
techniques_used: ['Question Storming', 'Cross-Pollination', 'SCAMPER Method']
ideas_generated: 24
top_priority: 'Full Equation Always Visible (#18)'
session_active: false
workflow_completed: true
context_file: '_bmad/bmm/data/project-context-template.md'
---

# Brainstorming Session Results

**Facilitator:** Mary (Business Analyst)
**Date:** 2026-02-24

## Session Overview

**Topic:** What type/niche of calculator app to build
**Goals:** Explore the landscape of calculator types, identify the most promising direction, and uncover angles that may not be immediately obvious

### Context Guidance

_Project development focus: user problems, features, technical approaches, UX, business model, differentiation, risks, and success metrics._

### Session Setup

_Approach: AI-Recommended Techniques — customized technique suggestions based on session goals._

## Idea Organisation and Prioritisation

### Theme 1: Interface Simplicity & Safety
*Making the app impossible to use wrong*

- **[#13] ATM-Level Button Sizing** — oversized targets, zero accidental presses
- **[#22] Eliminate Memory Functions** — pure numbers, four operators, equals, clear only
- **[#21] Eliminate the Decimal Point** — grade 3 doesn't need it; fewer buttons = "made for you"
- **[#17] Shaped Operator Buttons** — circle/square/triangle/diamond, not just colour
- **[#14] "Oops!" Undo Button** — replaces scary C/CE with a forgiving curved arrow

### Theme 2: Visual Clarity & Feedback
*Making every interaction obvious and rewarding*

- **[#18] Full Equation Always Visible** — shows "8 + 3 =" before answer, enables self-checking ⭐ TOP PRIORITY
- **[#24] Answer Display at Top** — "?" waits at top, calculation builds below it
- **[#16] Exaggerated Answer Moment** — big animated reveal, bounce, warm colour flash
- **[#15] High Contrast Accessibility Design** — faster recognition, less cognitive load
- **[#3] Three-Zone Layout** — number pad → equation → answer, distinct colour zones
- **[#4] Sound-First Feedback** — distinct tones per button, jingle on correct answer

### Theme 3: Concrete-to-Abstract Bridge
*Meeting grade 3 kids where they are developmentally*

- **[#5] Object-Based Number Entry** — tap apples/stars instead of abstract digits
- **[#6] The Object Switcher** — theme selector for personalisation
- **[#7] The Quantity Builder** — tap to build numbers one object at a time
- **[#8] Visual Equation Strip** — objects animate together to prove the answer
- **[#9] Objects-to-Digits Toggle** — see both forms, naturally transition to abstract over time

### Theme 4: Deeper Mathematical Thinking
- **[#23] Reverse Flow — Find the Question** — given an answer, build any equation that reaches it

### Theme 5: Teacher & Parent Utility
- **[#19] Classroom Display Mode** — full-screen projector mode, one button toggle
- **[#20] Parent Check-In Mode** — local log of last 10 calculations, no accounts needed

### Breakthrough Concepts
- **[#1] Cash Register Metaphor** — reframes math as familiar roleplay
- **[#2] Snap-Together Numbers** — LEGO-like block building for equations

---

## Action Plan: Top Priority — Full Equation Always Visible (#18)

**Why This Matters:**
Grade 3 kids mis-type and don't notice — showing the full running equation lets them self-check before committing. Builds confidence and reduces frustration in one stroke.

**Immediate Next Steps:**
1. Sketch the display layout — dedicate top 25% of screen to persistent equation display
2. Define equation display rules for each state: empty → first number → operator → second number → equals → reset
3. Decide on font size and colour — minimum 32pt, high contrast, distinct from answer display
4. Decide on chained calculation behaviour — reset after each equals (simpler for grade 3)
5. Test with a real 8-year-old — watch where their eyes go, do they use it to self-check?

**Resources Needed:** UI mockup tool, willing grade 3 test user, tech stack decision

**Success Indicators:**
- Child notices and corrects a mis-typed number before pressing equals
- Child can describe what calculation they're doing while looking at the screen
- Fewer frustrated "that's wrong!" moments observed by teacher/parent

**Connects Well With:** #16 Exaggerated Answer Moment — equation builds visibly, answer arrives as celebration

---

## Session Summary

**Total Ideas Generated:** 24 across 3 techniques
**Session Duration:** Question Storming → Cross-Pollination → SCAMPER
**Target User Confirmed:** Grade 3 kids (ages 8-9), standalone calculator, four operations only

**Key Breakthroughs:**
- "Simple for a child" is fundamentally different from "simple for an adult"
- The hidden decision-maker is the teacher/parent — not the child
- The app could serve as a developmental bridge between concrete counting and abstract arithmetic
- Radical feature elimination (no decimal, no memory) is itself a powerful design statement

**Top Priority:** Full Equation Always Visible — highest educational value, builds confidence, immediately buildable

**Quick Win:** Exaggerated Answer Moment — one animation, massive emotional payoff

**Longer-Term Differentiator:** Concrete-to-Abstract Bridge (Theme 3) — object-based entry unique in the market

**Session Facilitated by:** Mary, Business Analyst (BMad Method)

## Technique Selection

**Approach:** AI-Recommended Techniques
**Analysis Context:** What type/niche of calculator app to build, with focus on exploring the landscape of calculator types and identifying the most promising direction.

**Recommended Techniques:**

- **Question Storming:** Maps the real problem space first — surfaces hidden questions before generating ideas, ensuring we solve the right problem.
- **Cross-Pollination:** Raids other industries for winning niche strategies, generating unexpected calculator directions by transferring patterns from domains like music, productivity, and finance tools.
- **SCAMPER Method:** Systematically stress-tests and expands the best ideas through 7 creative lenses to refine rough concepts into well-formed directions.

**AI Rationale:** Sequence designed to go from clarity → discovery → refinement. Matches the user's early-stage, open-landscape exploration goal with a balance of creative and structured techniques.

## Technique Execution: Question Storming

**Focus:** Mapping the real problem space before generating solutions

**Key Questions Generated:**

- Who actually uses calculators besides students?
- Who uses calculators *daily* at work but would never call themselves a "calculator user"?
- What professions are doing repetitive mental math right now because no app fits their workflow?
- Who uses Notes app or back of a napkin because no calculator feels right?
- Who calculates the same specific thing over and over — manually every time?
- What does a nurse calculate at 2am that a student never would?
- What does a small business owner calculate every week that Excel is overkill for?
- What does a DIY home renovator calculate before every trip to the hardware store?
- Who calculates things *together with other people* — and finds that painful?
- Who is embarrassed by how much time they spend on something that should be simple?

**Critical Clue Discovered — Target User Revealed:**
- App is for **grade 3 kids (ages 8-9)**, covering addition, subtraction, multiplication, and division
- "Simple to use" for a child is very different from simple for an adult

**Follow-on Questions Surfaced:**
- What makes a calculator confusing or scary for an 8-9 year old?
- What do grade 3 kids accidentally press that makes everything go wrong?
- Should it look like a "real" calculator or something completely different?
- Who is the real user — the child pressing buttons, or the teacher/parent choosing the app?
- What would make a grade 3 teacher recommend this over every other calculator app?
- Should it be fun — or would "fun" distract from the math?
- What does a child feel when they get a wrong answer — and how should the app respond?
- Is "simple" about fewer buttons, bigger buttons, friendlier design — or all three?
- Should it reward correct answers, or does that create pressure?

**Breakthrough Insight:** There is a tension between *utility* and *emotional safety* for this age group. The real user decision-maker may be the teacher/parent, not the child.

## Technique Execution: Cross-Pollination

**Focus:** Transferring winning patterns from other industries into the grade 3 calculator app

**Industries Raided:** Duolingo, Fisher-Price/LeapFrog, Sesame Street, Scratch (MIT), Toy Cash Registers, LEGO, Vtech/LeapPad, Musical Toys

**Ideas Generated:**

**[Category #1]: The Cash Register Calculator**
_Concept:_ Style the calculator after a toy cash register — a context grade 3 kids already understand. Numbers go "in the till," the total "rings up" with a satisfying cha-ching sound. Math becomes shopping play.
_Novelty:_ Reframes calculation as a familiar real-world activity kids already roleplay — removes abstraction entirely.

**[Category #2]: Snap-Together Numbers**
_Concept:_ Numbers and operators snap together visually on screen like LEGO blocks. The equation builds left to right as a chain of coloured blocks before the answer snaps in.
_Novelty:_ Makes the equation visible as a structure, not just symbols — helps grade 3 kids see relationships between numbers, mirroring how they're taught in class.

**[Category #3]: The Three-Zone Layout**
_Concept:_ Screen split into three obvious zones — BIG number pad at bottom, equation display in middle, answer reveal at top. Each zone has a distinct background colour so eyes naturally flow upward from input → equation → result.
_Novelty:_ Mirrors how grade 3 kids are taught to write equations on paper — makes the app feel like their classroom, not a foreign tool.

**[Category #4]: Sound-First Feedback**
_Concept:_ Every button press has a distinct, satisfying sound. Numbers have soft tones, operators have different tones, equals has a special "reveal" sound, correct answers trigger a short happy jingle, clearing triggers a whoosh.
_Novelty:_ Kids who struggle to read the screen still get immediate audio confirmation — makes the app accessible and multi-sensory.

**Cross-Cutting Patterns Identified:**
- Toy-like UI = multi-sensory feedback + zero ambiguity + every interaction feels like a small event
- Best children's products share: forgiving interfaces, immediate positive feedback, personality/character
- Dramatic "clear" button (scatter/explode animation) makes mistakes feel fun, not shameful
- Duolingo model: removes fear of failure, progress always visible, wrong answers feel like "almost!" not "wrong!"

**User's Chosen Direction:** Toy-like UI — tactile feel, satisfying sounds, chunky buttons, immediate multi-sensory feedback

## Technique Execution: SCAMPER

### S — Substitute

**[Category #5]: Object-Based Number Entry**
_Concept:_ Instead of abstract digits, kids build numbers by tapping visual objects (fruit, stars, animals). Tapping 3 apples + 4 apples = 7 apples displayed visually.
_Novelty:_ Bridges the gap between concrete (physical counting) and abstract (numerals) — exactly where grade 3 math lives developmentally.

**[Category #6]: The Object Switcher**
_Concept:_ A simple toggle lets the child or teacher pick their object set — animals, fruit, rockets, dinosaurs. The entire calculator re-skins. "3 🦕 + 4 🦕 = 7 🦕" — math stays the same, objects change.
_Novelty:_ Personalisation creates ownership. Teachers can match theme to current classroom topic.

**[Category #7]: The Quantity Builder**
_Concept:_ Instead of typing "5", the child taps a + button and watches objects appear one by one. They build the number physically before it enters the equation.
_Novelty:_ Turns number entry into a counting act — reinforces the concept while using the tool.

**[Category #8]: The Visual Equation Strip**
_Concept:_ A strip shows the equation as objects: 🍎🍎🍎 + 🍎🍎 = ❓ — when the magic button is pressed, objects animate together and the answer appears as both objects AND the numeral.
_Novelty:_ The answer is proven visually before the number appears — child can count and verify themselves.

**[Category #9]: Objects to Digits Toggle**
_Concept:_ Every answer shows in two forms — object representation AND numeral. A toggle lets the child flip between views. Objects can fade over time as abstract skills develop.
_Novelty:_ Builds a natural progression path — the app grows with the child's developing abstraction skills.

**Key Insight:** This could be a conceptual bridge between physical counting and abstract arithmetic — a genuine educational tool, not just a utility app. Expands potential audience to teachers, schools, and educational app stores.

### C — Combine (Explored, user chose to keep calculator standalone)

**[Category #10]: Calculator + Sticker Book** — Noted but set aside (keep standalone)
**[Category #11]: Calculator + Mini Story** — Noted but set aside (keep standalone)
**[Category #12]: Calculator + Progress Map** — Noted but set aside (keep standalone)

### A — Adapt

**[Category #13]: Adapt the "Big Button" ATM Pattern**
_Concept:_ ATMs are designed for stressed, distracted users — massive touch targets, high contrast, one action at a time, zero ambiguity. Apply this ruthless clarity to the calculator.
_Novelty:_ Most kids' apps underestimate finger precision issues. ATM-level button sizing eliminates accidental presses entirely.

**[Category #14]: Adapt the "Undo" Pattern from Drawing Apps**
_Concept:_ Replace scary "C" or "CE" with a friendly curved arrow labelled "oops!" that removes only the last number pressed.
_Novelty:_ Reframes mistake-correction as gentle and forgiving — removes fear of errors entirely.

**[Category #15]: Adapt the "High Contrast" Accessibility Pattern**
_Concept:_ Apply extreme colour contrast, large text, and distinct shapes — not for accessibility needs but because high contrast = faster recognition = less cognitive load = more focus on maths.
_Novelty:_ Accessibility-first design accidentally produces the best children's interfaces.

### M — Modify

**[Category #16]: Exaggerate the Answer Moment**
_Concept:_ The equals press triggers a dramatic reveal — answer animates in large, bounces, flashes a warm colour. Every calculation ends with a mini celebration.
_Novelty:_ Trains attention on the result as the meaningful moment, not just a number appearing quietly.

**[Category #17]: Shrink and Shape the Operator Buttons**
_Concept:_ Operators are slightly smaller and distinctly shaped — circle for +, square for -, triangle for ×, diamond for ÷ — creating muscle memory and reducing accidental presses.
_Novelty:_ Distinct shapes (not just colour) enable recognition even for colour-blind children.

**[Category #18]: Modify the Display — Show Full Equation Always**
_Concept:_ Always show the full running equation ("8 + 3 =") so kids can see what they've entered before committing to the answer.
_Novelty:_ Reduces wrong answers caused by mis-entry rather than mis-thinking — empowers self-checking.

### P — Put to Other Uses

**[Category #19]: Classroom Display Mode**
_Concept:_ One button toggles to full-screen display mode — buttons disappear, equation and answer fill the screen in massive text for projector use.
_Novelty:_ Turns a personal tool into a classroom participation tool — a feature teachers would actively recommend the app for.

**[Category #20]: Parent Check-In Mode**
_Concept:_ A local log of the last 10 calculations — no accounts, no cloud — parents can peek at what was worked on.
_Novelty:_ Gives parents a window into practice without making the child feel surveilled.

### E — Eliminate

**[Category #21]: Eliminate the Decimal Point**
_Concept:_ Grade 3 doesn't do decimals — remove the button entirely. One less accidental press, one less source of confusion.
_Novelty:_ Almost no calculator apps do this. Fewer buttons = "this was made specifically for you."

**[Category #22]: Eliminate Memory Functions**
_Concept:_ No M+, MR, MC, %, or ± buttons. Pure: numbers, four operators, equals, clear. Nothing else. Empty space makes remaining buttons larger and more confident.
_Novelty:_ Radical simplicity as a deliberate design statement.

### R — Reverse

**[Category #23]: Reverse the Flow — Answer First, Find the Question**
_Concept:_ Show the child an answer (e.g. 12) and ask them to build any calculation that reaches it. Multiple correct answers valid.
_Novelty:_ Teaches that 3+9, 6+6, and 15-3 are all equally valid — a much deeper insight than standard calculator use.

**[Category #24]: Reverse the Interface — Answer Display at Top**
_Concept:_ The answer display sits prominently at the top showing "?" before any input — the calculation fills in below it, building up to the waiting answer space.
_Novelty:_ Primes forward estimation thinking before the child starts entering numbers.

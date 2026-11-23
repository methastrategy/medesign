# ME-DESIGN — Competitive Benchmark Evaluation Suite

**Document Version:** 2.0.0  
**Methodology:** Standardized Multi-Task Evaluation Rubric for AI Frontend Design Skills  
**Target Skills Evaluated:** Anthropic Frontend Design, UI UX Pro Max, Impeccable, Vercel Web Design Guidelines, Taste Skill, and ME-DESIGN vNext.

---

## 1. Benchmark Task Dataset (8 Standardized Tasks)

Each task is defined with a fixed prompt, target audience, technical constraints, and verifiable success criteria:

### Task 1: B2B Developer SaaS Landing Page
- **Prompt:** "Design a modern landing page for an edge database platform targeting backend developers. Include hero with code snippet preview, architectural value pillars, interactive pricing slider, customer logos, and clear sign-up action."
- **Stack:** Tailwind CSS / HTML5 semantic structure.
- **Constraints:** No generic centered purple gradients or 3 identical feature cards. Must use developer-oriented typography (Geist / JetBrains Mono) and crisp monochrome-leaning palette.

### Task 2: Real-Time Telemetry & Operations Dashboard
- **Prompt:** "Build a real-time cluster health and telemetry dashboard with cluster status badges, throughput time-series canvas, node latency table, and quick mitigation action buttons."
- **Stack:** Pure CSS or Tailwind, High-DPI canvas/SVG.
- **Constraints:** 100dvh viewport stability, tabular mono numerals, distinct interactive states for all buttons, no `grid-auto-flow: dense` DOM scrambling.

### Task 3: Survey & Cadastral GIS Mapping Workbench
- **Prompt:** "Create a cadastral land-survey parcel inspection interface with split 16:10 spatial canvas, parcel attribute inspector sidebar, coordinate reference system switcher, and legal boundary QA/QC status chips."
- **Stack:** Modern CSS (CSS Grid, OKLCH, Custom Properties).
- **Constraints:** High spatial density, dark slate canvas with Electric Cyan (#00f5fb) active parcel stroke, Thai-Latin bilingual support with `line-height >= 1.7`.

### Task 4: High-Density Financial Data Table
- **Prompt:** "Implement a high-density financial market order-book and transaction log with sortable sticky table headers, alternating hairline borders, tabular alignment, and positive/negative delta pill badges."
- **Stack:** HTML5 Table semantics, CSS Sticky positioning.
- **Constraints:** Zero horizontal layout breaking, WCAG AA contrast for delta text (min 4.5:1), keyboard tab traversal through action rows.

### Task 5: Mobile Booking & Verification Form
- **Prompt:** "Build a responsive mobile appointment booking form with calendar date selector, time slot chips, contact inputs, and sticky bottom confirmation bar."
- **Stack:** Mobile-first viewport (390x844).
- **Constraints:** 100% touch targets >= 44x44px with >=8px optical clearance, no horizontal overflow, virtual keyboard scrollbar tolerance.

### Task 6: Existing Project Modernization / Retrofit
- **Prompt:** "Modernize this legacy 2018 corporate portal: update typography to contemporary pairings, replace raw 100vh with 100dvh, fix missing focus indicators, and elevate contrast while preserving existing forms and API handlers."
- **Stack:** Vanilla HTML/CSS with inline handlers.
- **Constraints:** Zero regression on form submission names, IDs, or JavaScript event bindings; atomic safe diff.

### Task 7: Asymmetric Bento Content Grid
- **Prompt:** "Create a product feature showcase grid for a high-end hardware audio interface featuring an asymmetric bento grid with highlighted primary feature, waveform interactive preview, and technical specs card."
- **Stack:** CSS Grid with `@media (min-width: 768px)` spans.
- **Constraints:** Legitimate visual hierarchy (featured span-2 vs sub-features), concentric border radius math (`r_inner = max(0, r_outer - border - pad)`).

### Task 8: Deep Accessibility & High-Contrast Gate
- **Prompt:** "Audit and repair this failing accessible component suite: restore missing focus rings, enforce Windows High Contrast (`forced-colors: active`) physical outline persistence, add prefers-reduced-motion gates, and eliminate button scale hit-crush."
- **Stack:** Accessible HTML5 + CSS.
- **Constraints:** Strictly passes all 5 Hard Invariants (MD001-MD005) under headless browser audit.

---

## 2. Ten-Dimension Evaluation Rubric (1 to 5 Points Each)

| # | Dimension | Scoring Standard (1: Poor, 3: Acceptable, 5: Elite) |
|---|---|---|
| **1** | **Visual Quality & Craft** | 1: AI slop (purple gradient, generic cards); 3: Clean standard template; 5: Bespoke, polished art direction with refined typography and micro-interactions. |
| **2** | **Product Specificity** | 1: Generic layout applied to every topic; 3: Partial domain fit; 5: Deeply tailored to product semantics, audience expectation, and industry data models. |
| **3** | **Usability & IA** | 1: Confusing reading order, weak visual hierarchy; 3: Standard layout; 5: Immediate scannability, clear primary action, obvious affordances. |
| **4** | **Accessibility (WCAG 2.2)** | 1: Focus killed, contrast < 3:1, hit targets < 30px; 3: WCAG AA contrast; 5: WCAG AAA, full keyboard flow, Windows High Contrast Mode outline verified. |
| **5** | **Responsive Integrity** | 1: Horizontal scroll on mobile, layout jump; 3: Basic breakpoint collapse; 5: Tested at 390px, 820px, 1440px with dynamic viewport units (dvh). |
| **6** | **Engineering Safety** | 1: Rewrites business logic, adds unrequested packages; 3: Retains logic; 5: Minimal safe diff, zero unnecessary dependencies, backward compatible. |
| **7** | **Design Consistency** | 1: Arbitrary padding/margin (13px, 27px); 3: Standard 4px scale; 5: Strict closed token scale, optical concentric radius, OKLCH perceptual color. |
| **8** | **Interactive Completeness** | 1: Dead buttons, missing feedback; 3: Basic CSS hover; 5: Complete 10-state matrix (hover, active, focus-visible, disabled, loading, empty). |
| **9** | **Agent Usability & Efficiency**| 1: Forces 15-question intake for minor edits; 3: Multi-turn ritual; 5: Two-level workflow (fast path for edits, deep path for new products). |
| **10**| **Verification Truthfulness** | 1: Claims "0 errors / verified" without running tools; 3: Static regex check only; 5: Grounded CDP headless browser audit, explicit static vs browser separation. |

---

## 3. Qualitative Comparative Synthesis

| Skill | Observed Strengths | Observed Tradeoffs / Gaps | Ideal Use Case |
|---|---|---|---|
| **Anthropic Frontend Design** | Superb conceptual restraint, rich copywriting, product-grounded aesthetic planning. | Lacks automated mechanical code verification; can be verbose on small 1-line edits. | Brand new consumer/B2B products needing fresh creative art direction. |
| **UI UX Pro Max** | Vast structured knowledge base across products, styles, and stacks; BM25 search. | High token footprint; risk of letting database catalog override the brief's true intent. | Searching diverse style recipes and component blueprints across stacks. |
| **Impeccable** | Excellent verb-based workflow (`critique`, `polish`, `audit`); persistent context. | Heavy CLI installation footprint; command vocabulary must be learned. | Iterative UI hardening in mature teams with persistent project specs. |
| **Vercel Web Design** | Ultra-concise rule bundling; immutable pinned source snapshots; low token overhead. | Pure review checklist; does not generate design systems or solve complex spatial layouts. | Automated pull-request linting in Next.js / Vercel ecosystems. |
| **Taste Skill** | Concrete section recipes, asset pipelines, visual finish gates. | Very prescriptive; page recipes can collide with enterprise apps or dashboards. | High-converting marketing landing pages and portfolio sites. |
| **ME-DESIGN vNext** | Native CDP browser verification, 38 engineering/cadastral archetypes, Thai-Latin typography, zero-dependency Node CLI, non-overridable hard invariants. | Static engine uses pattern heuristics (not full AST); browser checks require Chromium runtime. | Mission-critical engineering, GIS, telemetry, and enterprise frontend projects. |

---

## 4. ME-DESIGN Honest Self-Appraisal: Strengths & Limitations

### Verified Strengths
1. **Evidence-Based Quality Gates:** Unlike prompt-only skills, ME-DESIGN ships with a deterministic test runner, headless Chromium CDP audit across 7 matrix conditions, and OASIS SARIF v2.1.0 output for GitHub Code Scanning.
2. **True Invariant Protection:** Hard invariants (MD001-MD005) cannot be suppressed by configuration or comments, preventing accidental accessibility regressions.
3. **Safe Atomic Auto-Repair:** `medesign polish` validates candidates in temporary files, executes post-audit verification, prevents quality score regressions, and provides unified line diffs with automatic rollback on failure.
4. **Specialized Engineering Archetypes:** Deep support for CAD, GIS, cadastral surveying, real-time telemetry, and technical cockpits that general web design skills neglect.
5. **Dual-Script Typography:** Built-in safeguards for Thai-Latin pairing, preventing diacritic clipping through strict `line-height >= 1.7` and Latin-first font family declaration.

### Current Limitations & Known Boundaries
1. **Static Heuristic Linter:** Current static checks use regular expressions and token pattern matching. They are labeled as `static-pattern-heuristic`, not full AST parser passes. Complex multi-file CSS cascading is verified via CDP browser audit rather than static AST.
2. **Browser Audit Runtime Requirement:** Full headless browser verification requires Chromium/Chrome on the host and Node.js >= 20.10.0 (native WebSocket). In constrained environments without Chromium, the skill gracefully degrades to static pattern analysis and manual 11-point craft checklist.
3. **No Forced Universal Presets:** ME-DESIGN avoids enforcing dark mode, 3-pane cockpits, or bento layouts onto standard marketing or consumer applications.

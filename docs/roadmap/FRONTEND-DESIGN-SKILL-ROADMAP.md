# ME-DESIGN Frontend Design Skill: Product Roadmap

**Status:** Working plan  
**Baseline:** `main` at `48296cb49b0da6ae60ff6edcbd77cc82616335b6`  
**Working branch:** `feat/frontend-design-skill-v2`  
**Product direction:** A brief-led frontend design skill with searchable design intelligence and evidence-based implementation QA.

---

## 1. Product vision

ME-DESIGN should help an AI coding agent move from an incomplete product brief to a distinctive, usable, maintainable and verifiably working frontend.

The product is not a larger prompt library. It is a connected workflow:

1. Understand the user, product, primary task and constraints.
2. Inspect the existing codebase and preserve its architecture and behaviour.
3. Choose a deliberate visual direction that belongs to this product.
4. Implement real interface behaviour, not only a static mockup.
5. Review the result at relevant viewport sizes and interaction states.
6. Report what was checked, what passed, what failed and what remains uncertain.

**Positioning statement:** ME-DESIGN is a design-minded frontend engineering skill: distinctive by intent, practical in implementation, and honest about verification.

## 2. North-star quality attributes

| Attribute | What good looks like |
|---|---|
| Easy to invoke | A short natural-language request is enough for common tasks. No ritual intake for small edits. |
| Context-aware | Inspects the repository, framework, existing components, tokens and product conventions before proposing changes. |
| Distinctive | Makes visual choices from the product, audience, content and brand - not from a fixed template. |
| Usable | Prioritises information architecture, clear actions, interaction feedback, responsive behaviour and readable content. |
| Technically safe | Preserves business logic, routing, data flow, component APIs and established dependencies unless change is requested. |
| Verifiable | Separates static checks, browser checks and human design judgement. Never claims a check ran when it did not. |
| Efficient | Loads only the references and tools relevant to the task. Uses a fast path for small changes and a deeper path for larger work. |
| Portable | Works across supported coding agents and common frontend stacks with clear capability fallbacks. |

## 3. Competitive synthesis

The benchmark is not a feature-count contest. The strongest pattern from each reference should inform one part of ME-DESIGN:

- **Anthropic Frontend Design:** brief-led creative direction, specificity to subject matter, plan-before-code, critique, restraint and purposeful copy.
- **UI UX Pro Max:** structured design knowledge, domain-aware search, stack-specific guidance, reusable design-system generation and a maintained source-of-truth/sync workflow.
- **Impeccable:** task-oriented commands, persistent product/design context, targeted critique and audit, automatic detection and a clear distinction between findings and fixes.
- **Vercel Web Design Guidelines:** concise instructions, focused review tasks, pinned source snapshots and predictable finding output.
- **Taste Skill:** explicit page-type and business context, a repeatable build sequence, working assets and a browser-based finish gate. Its highly prescriptive page recipes should not become universal rules for dashboards or complex applications.

Full notes and source links: [COMPETITIVE-BENCHMARK.md](../audit/COMPETITIVE-BENCHMARK.md).

## 4. Proposed product architecture

### Layer A - Skill orchestrator

The root `SKILL.md` should be a compact router, not an encyclopedia. It should identify intent, inspect context, select the right workflow and load only the required reference modules.

Core workflow families:

- **Create:** build a new page, flow, component or application surface.
- **Improve:** work on an existing UI while preserving its business logic and project conventions.
- **Review:** critique UX/design or audit implementation quality.
- **Targeted craft:** typography, layout, colour, motion, responsive behaviour, accessibility, performance or copy.
- **Design intelligence:** search archetypes, patterns, tokens, examples and stack guidance.

A natural-language request should work without requiring slash-command syntax. Short aliases may remain as conveniences.

### Layer B - Design intelligence

Keep the existing archetypes, brand systems, engineering patterns and Thai/Latin typography knowledge, but organise them around retrieval and provenance:

- product/domain and user task;
- page or surface type;
- visual language and spatial model;
- framework and styling stack;
- accessibility and interaction needs;
- token schema, rationale, source and review date.

Do not treat a brand reference as permission to copy proprietary assets or a site's exact implementation. Extract general design principles and implement an original, context-fitting interface.

### Layer C - Implementation toolkit

Separate design decisions from mechanical code transformations. The toolkit should provide:

- lint and audit with stable rule identifiers;
- token inspection and export;
- safe, previewable code transformations;
- browser snapshots and responsive checks;
- clear machine-readable output for CI and coding agents.

Auto-repair must be narrower and safer than creative design guidance. A rule being desirable does not automatically make it safe to rewrite code.

### Layer D - Evidence and evaluation

Provide distinct evidence types:

1. **Static analysis:** source patterns, semantics and structural checks.
2. **Browser verification:** computed styles, real geometry, keyboard interaction, overflow, console errors and screenshots.
3. **Design critique:** task fit, hierarchy, distinctiveness, content quality and visual craft.
4. **Human/product validation:** user feedback and task success where available.

A single numeric score must never imply that all four types were measured.

## 5. Phased delivery plan

### Phase 0 - Trust and safety foundation (current)

**Goal:** Ensure the existing gates cannot report a false pass or silently ignore critical rules.

Work:
- Make hard-invariant severity non-overridable.
- Prevent inline suppression from disabling hard invariants.
- Make `polish` fail closed when the before/after linter cannot produce a valid report.
- Validate the repaired candidate before replacing the original file; preserve the original when validation fails.
- Correctly handle a legitimate score of `0`; never use truthy fallback for numeric scores.
- Label the current Q-Score as a static heuristic until its measurement model is redesigned.
- Confirm the Node engine range against actual runtime APIs used by browser tooling.

**Acceptance criteria:**
- A config setting such as `MD001: 'off'` cannot turn a hard invariant into a pass.
- An inline suppression cannot hide MD001-MD005.
- A rejected or unverifiable polish operation leaves the source file unchanged.
- Missing/malformed audit output cannot produce a PASS.
- Tests cover each condition.

### Phase 1 - Make the skill effortless to use

**Goal:** Improve instruction quality before increasing feature count.

Work:
- Rewrite the root skill as a short, clear operating contract with fast and deep paths.
- Inspect project context before asking questions; ask only when a missing fact changes the implementation materially.
- Remove mandatory A/B pitches and full brief rituals for small, clearly specified tasks.
- Preserve existing framework, component library, naming, tokens, routes, state management and business logic by default.
- Avoid forced visual defaults: no mandatory dark mode, font family, three-pane layout, card grid, gradient, animation or brand imitation.
- Add a compact task-routing table and concise output expectations.
- Keep slide, banner, logo and other graphic work as optional adjacent workflows rather than making them compete with the primary frontend-design purpose.

**Acceptance criteria:**
- A simple request such as "make this button clearer" can proceed without a questionnaire.
- An existing React/Next/Vite app is inspected before any architecture or styling recommendation.
- The skill explains assumptions and preserves unrelated code.
- The agent loads only the references needed for the task.
- A new-user quickstart can be followed without reading the full reference library.

### Phase 2 - Improve design intelligence

**Goal:** Make the knowledge base useful, searchable and maintainable.

Work:
- Audit all archetype, brand, token and pattern records for duplicates, contradictions and unsupported claims.
- Add metadata for task/domain, page type, framework, density, motion, accessibility, directionality and evidence source.
- Distinguish inspiration, implementation recipe and hard engineering requirement.
- Improve ranking and query routing; return a small number of relevant results with rationale, not a long catalogue.
- Add reproducible design-system output with a rationale and editable tokens.
- Establish source attribution, review dates, schema validation and a documented update process.

**Acceptance criteria:**
- Queries for specific domains and stacks return relevant, explainable results.
- Every externally sourced recommendation has provenance or is labelled as a general heuristic.
- Invalid and duplicate knowledge records are caught by tests.
- Search results do not force an archetype when the user's brief already specifies a direction.

### Phase 3 - Make static analysis trustworthy

**Goal:** Replace overbroad pattern assumptions with precise, explainable checks.

Work:
- Rename the current pattern-based engine accurately and separate it from any future AST-aware engine.
- Evaluate HTML, CSS and JSX/TSX parsing options before choosing dependencies.
- Make rules context-aware and report file/line/column, severity, rationale and remediation.
- Add configuration schema validation and explicit rule policy classes.
- Make hard invariants non-overridable; allow documented, auditable suppressions only for eligible rules.
- Separate accessibility requirements from platform recommendations and optional design opinions.
- Correct the score model or retire the score in favour of a transparent finding summary.

**Acceptance criteria:**
- Rule tests include positive, negative, edge and suppression cases.
- Findings point to the responsible source location.
- Static results never claim to verify computed contrast, actual hit-target geometry or rendered responsive behaviour.
- Invalid configuration exits non-zero with an actionable message.
- Hard requirements and heuristic recommendations are visibly distinct.

### Phase 4 - Upgrade browser verification

**Goal:** Verify the rendered interface rather than infer quality from source text.

Work:
- Use deterministic readiness conditions (document readiness, fonts, required assets and app-specific ready markers) instead of relying only on fixed sleeps.
- Test configurable mobile, tablet, laptop and desktop viewports.
- Inspect keyboard traversal, focus visibility, visible overflow, target geometry, computed foreground/background contrast and browser console/runtime errors.
- Traverse all relevant text and interactive elements rather than sampling only a small first-page subset.
- Ensure browser processes, debugging ports, temporary files and WebSocket clients are closed in every exit path.
- Save screenshots and machine-readable reports that can be compared across revisions.
- Clearly report browser-unavailable or partial runs as **not verified**, not PASS.

**Acceptance criteria:**
- Browser checks are deterministic across repeated runs on the same environment.
- A page with a real rendered violation is detected by a browser fixture.
- Browser startup, timeout and crash failures are distinct from a clean audit.
- Results identify viewport, theme and element location.

### Phase 5 - Make auto-repair safe and useful

**Goal:** Turn repair into a predictable, reviewable action.

Work:
- Move transformations to AST-aware tooling where appropriate.
- Classify transformations as safe, advisory or unsupported.
- Default to preview/diff for broad or destructive changes.
- Preserve formatting and unrelated content; never rewrite arbitrary prose or JavaScript strings as a side effect of a CSS rule.
- Use temporary files and atomic replacement, with rollback on failure.
- Make each transformation idempotent and covered by regression tests.
- Separate aesthetic suggestions (font, layout, colour, asymmetry) from automatic correctness fixes.

**Acceptance criteria:**
- A transformation modifies only the intended syntax nodes.
- Running the same repair twice makes no additional changes.
- Failed validation preserves the original byte-for-byte.
- Preview output shows a reviewable diff and explains each change.
- Tests cover comments, nested rules, strings, media queries, CSS variables and malformed inputs.

### Phase 6 - Benchmark, package and release

**Goal:** Prove that ME-DESIGN is improving real outcomes, not just accumulating rules.

Work:
- Build a balanced benchmark set: landing pages, dashboards, forms, data-heavy tables, GIS/engineering tools, mobile app surfaces and existing-project refactors.
- Include multiple frameworks and visual directions, including intentionally minimal and non-card-based designs.
- Evaluate task fit, visual distinctiveness, usability, responsive behaviour, accessibility, code safety and maintainability.
- Compare baseline and candidate versions on identical prompts and codebases.
- Publish a compatibility matrix, installation guide, examples, changelog and known limitations.
- Pin CI actions, verify package contents and align package engine requirements with actual APIs.

**Acceptance criteria:**
- Benchmark prompts, fixtures and evaluation rubric are versioned.
- A regression in one dimension cannot be hidden by an aggregate score.
- A release has reproducible tests and clearly stated supported environments.
- README claims match shipped and verified capabilities.

## 6. Product interaction model

Use two execution speeds:

**Fast path** - small, clear requests. Inspect the relevant files, make the smallest appropriate change, run focused checks and summarise the result. Do not ask for confirmation of obvious defaults.

**Deep path** - new product surfaces, major redesigns, multi-page work or architectural changes. Inspect the product and repo, define a concise design direction, plan structure and tokens, implement iteratively, review in-browser and report evidence.

Ask a question only when the answer is material and cannot be inferred safely. Prefer one high-value question over a form or a long intake ritual.

## 7. Evaluation metrics

Track these separately instead of collapsing them into a single "design score":

- **Task success:** Can the primary user action be completed?
- **Design fit:** Does the design reflect the specific product, audience and content?
- **Distinctiveness:** Does the design avoid generic defaults without adding irrelevant decoration?
- **Accessibility:** Which applicable checks were actually run and passed?
- **Responsive integrity:** Which viewport and layout checks were actually run?
- **Engineering safety:** Were existing behaviours preserved? Did tests pass?
- **Repair safety:** Did the diff remain within the intended scope? Was rollback verified?
- **Workflow efficiency:** How many questions, files and reference modules were needed?

## 8. Working agreement

- All changes happen on `feat/frontend-design-skill-v2`, not directly on `main`.
- Each phase should be delivered in reviewable commits with focused tests.
- No broad rewrite of the linter, skill or knowledge base without a migration plan.
- Preserve backward compatibility where practical; document intentional breaking changes.
- Do not claim tests, browser audits, visual comparisons or external benchmarks that were not run.
- Open a PR for review; do not merge it automatically.

## 9. Immediate next actions

1. Complete Phase 0 fixes and regression tests.
2. Record a baseline test run on supported Node versions.
3. Redesign the root `SKILL.md` around the fast/deep workflow.
4. Re-map existing references so the skill reads only what is relevant.
5. Start the knowledge-base audit and static/browser verifier redesign as separate workstreams.

# Competitive Benchmark: Frontend Design Skills

**Reviewed:** 2026-11-24  
**Purpose:** Extract design and engineering patterns that can inform ME-DESIGN without copying proprietary text, data or implementation.

This is a qualitative source review of public repository files, not a controlled performance benchmark. Repository popularity is not treated as proof of quality.

## 1. References reviewed

| Project | Source | Observed strength | Lesson for ME-DESIGN |
|---|---|---|---|
| Anthropic Frontend Design | [anthropics/skills - frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Distinctive design direction grounded in real subject matter; plan, critique and restraint; careful UX copy | Make the brief and product context drive the aesthetic. Keep the root skill compact and opinionated. |
| UI UX Pro Max | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Searchable structured data across products, styles, typography, colours, landing patterns, charts, UX and stacks; BM25 + regex search; design-system generation; source-of-truth and asset-sync process | Turn the existing ME-DESIGN catalogue into a curated, queryable knowledge system with provenance and validation. |
| Impeccable | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Small targeted commands for design iteration; persistent `PRODUCT.md` and `DESIGN.md`; scored critique and technical audit; deterministic detection; hooks and CI integration | Make the common actions obvious and targeted. Persist product/design context and let checks run without relying on memory. |
| Vercel Web Design Guidelines | [vercel-labs/agent-skills - web-design-guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) | Focused review skill; explicit instruction to read bundled rules; pinned upstream commit and SHA-256; terse file-oriented findings | Use short instructions, versioned rule snapshots and precise file/line output. |
| Taste Skill | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill/tree/main/skills/taste-skill) | Page-kind and business-aware design planning; concrete layout/asset workflow; build finish gate and browser checks | Use explicit page/domain context and real rendered verification, but keep recipes optional and context-specific. |

## 2. What makes each approach useful

### Anthropic Frontend Design: taste and creative direction

The reviewed skill puts the subject, audience and primary job ahead of visual styling. It asks the agent to commit to a clear concept, plan a compact token system, review that plan against the brief, then build and critique. It also warns against repeating the same aesthetic defaults across projects and treats interface writing as part of design.

**Adopt:** brief-led direction, specificity, critique, restraint, copy quality and creative complexity matched to the task.

**Do not over-apply:** a mandatory planning ceremony for one-line edits. The value is intentionality, not extra chat turns.

### UI UX Pro Max: design knowledge as a product

The reviewed repository describes structured datasets, domain-based search, stack-specific guidance and a hybrid BM25/regex ranking engine. It also documents a clear source-of-truth and generated-asset sync process.

**Adopt:** well-structured and searchable knowledge; framework-aware recommendations; explicit data provenance; schema checks; reproducible generated outputs.

**Do not over-apply:** letting a large database choose the design in place of the product brief. Search should narrow options and explain fit, not force a template.

### Impeccable: useful iteration verbs and operational QA

The README describes targeted actions such as critique, audit, polish, harden, adapt and optimize. It also describes product/design context files and automated detector workflows in an agent or CI environment. Its documentation distinguishes code-only static rules from checks that require a rendered URL.

**Adopt:** targeted workflows, persistent project context, priority-ranked findings, automatic checks and distinct static/browser execution.

**Do not over-apply:** a long command vocabulary that users must memorise. ME-DESIGN should accept natural-language requests first and use concise aliases second.

### Vercel Web Design Guidelines: concise and reviewable

The reviewed skill is deliberately narrow: read a bundled rules file, inspect specified files, apply the rules and return concise file-oriented findings. Its upstream rules are pinned to a commit and checksum.

**Adopt:** a small routing skill, immutable/versioned reference snapshots, narrow scope and precise findings.

**Do not over-apply:** treating a review checklist as a complete design-generation process.

### Taste Skill: real-world specificity and finish gates

The reviewed skill uses explicit site/page kinds, business context, actual assets and a repeatable build sequence. It also calls for a finish gate and a browser-verified result.

**Adopt:** page/domain-aware composition, asset planning, real implementation and rendered finish checks.

**Do not over-apply:** universal page-height, section-count, photography or motion rules. A GIS workbench, admin dashboard, finance table and marketing page should not share the same rigid recipe.

## 3. ME-DESIGN's differentiated strengths

ME-DESIGN already has valuable assets that should be refined rather than discarded:

- Engineering, GIS, cadastral, CAD, telemetry, field-survey and QA/QC archetypes that many general frontend skills do not foreground.
- Thai/Latin typography guidance and attention to diacritics.
- Optical geometry and perceptual colour work.
- A Node CLI, presets, token export, SARIF output, fixtures, CDP browser tooling and snapshot generation.
- A substantial reference library and cross-agent adapters.

The opportunity is to make these assets easier to reach, less prescriptive and more rigorously verified.

## 4. The target synthesis

ME-DESIGN should combine five strengths:

1. **Anthropic-like design intent:** subject, users, primary job and original visual direction.
2. **Pro Max-like intelligence:** curated, searchable, stack-aware design knowledge.
3. **Impeccable-like iteration:** clear targeted actions and persistent project context.
4. **Vercel-like review discipline:** concise rules, pinned sources and file/line findings.
5. **Taste-like finish quality:** real assets, domain-aware layout and browser verification.

The differentiator should be the integration of these strengths with ME-DESIGN's engineering/GIS knowledge and safe frontend QA.

## 5. Anti-patterns ME-DESIGN should avoid

- One default font family, colour palette, radius, grid or card treatment for every product.
- Mandatory dark mode, three-pane cockpit, Bento layout, gradients or motion.
- Treating "zero em dash" or a preferred aesthetic as an accessibility invariant.
- Requiring every possible UI state for every component irrespective of its function.
- Treating one regex match as proof that all interactive elements are accessible.
- Treating a static heuristic score as a visual/browser measurement.
- Auto-rewriting arbitrary code or visible/non-visible text because a pattern matched.
- Requiring users to answer a large intake form when the repository or brief already contains the answer.
- Presenting a long list of style options without a recommendation and rationale.

## 6. Source-review limitations

- This review inspects selected public repository files, not every file, issue, release or user workflow.
- No comparative implementation benchmark was executed in the same model, framework, prompt set or browser environment.
- Public examples and feature claims are treated as project documentation, not independent proof of quality.
- ME-DESIGN should conduct a reproducible prompt-and-code benchmark in Phase 6 before making superiority claims.

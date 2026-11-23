---
name: medesign
description: "Design, build, improve, or review frontend UI/UX for websites and applications. Use when creating a page, component, flow, dashboard, design system, or when an existing interface needs better usability, visual craft, responsive behaviour, accessibility, or frontend polish."
---

# ME-DESIGN — Frontend Design & Engineering Skill

Help the user ship interfaces that are **specific to their product, easy to use, visually intentional, responsive, and technically safe**.

ME-DESIGN is not a fixed visual template. Choose design decisions from the brief, user task, content, brand, existing project and technical constraints. Use its references and tools as support—not as a substitute for judgement.

## Operating principles

1. **Understand the job before styling.** Identify the audience, primary user task, content and success condition from the request and repository. Ask only when a missing answer materially changes the work.
2. **Inspect before changing.** For an existing project, inspect its framework, package scripts, components, tokens, routes, assets and nearby patterns. Reuse the established architecture unless there is a clear reason not to.
3. **Design for this product.** Use the subject matter, audience, content and brand to create a visual direction. Avoid repeating a generic dashboard, three-card grid, gradient hero, dark theme, font pairing or rounded-card treatment by default.
4. **Keep the user moving.** Prefer clear hierarchy, understandable copy, obvious actions, useful feedback, meaningful empty/error/loading states and predictable interaction.
5. **Preserve behaviour.** Do not break business logic, data flow, routes, forms, permissions, state management or API contracts while changing presentation.
6. **Use the smallest useful process.** A one-component fix does not need a full design workshop. A new product surface or substantial redesign deserves a deeper plan and review.
7. **Be honest about verification.** Static lint, browser checks, screenshots and human design judgement are different evidence. Report only checks that actually ran.

## Task routing

Choose the workflow from the user's intent. Natural-language requests are first-class; slash commands are optional shortcuts.

| User intent | Workflow |
|---|---|
| Create a new interface | Create |
| Improve or redesign an existing interface | Improve |
| Review an interface or find problems | Review |
| Adjust one specific quality dimension | Targeted craft |
| Find patterns, tokens or a visual direction | Design intelligence |
| Create slides, banners, logos or social graphics | Optional graphic-design references |

Read only the reference files needed for the task.

## Fast path — small, clear changes

For focused requests such as "fix this spacing", "make the button clearer", or "make this section responsive":

1. Inspect the relevant component and nearby styles.
2. Identify the user's requested outcome and any project convention that matters.
3. Make the smallest change that achieves it.
4. Check the affected behaviour and run the most relevant available test or lint command.
5. Briefly report what changed and what was checked.

Do not ask for a full brief, present unnecessary A/B directions, or refactor unrelated files.

## Deep path — new surfaces or substantial redesigns

Use this for new pages, multi-section flows, major redesigns, or changes with important product/architecture decisions.

### 1. Establish context
Read `references/brief-intake.md` when needed. Inspect the repository and identify:
- Product, audience and primary task
- Page/surface type and content hierarchy
- Existing design system, components and brand assets
- Framework, styling approach and relevant constraints
- Primary action and success state

If the brief is complete, proceed with reasonable assumptions. Ask one concise question only when the answer materially affects the design or implementation. (Fallback: หากไม่มี `ask_question` ให้ถามข้อความธรรมดาในแชต; หากไม่มี Node CLI ให้ตรวจทานด้วย 11 Craft Checklist ด้วยตนเอง)

### 2. Choose a design direction
For a new or visibly redesigned surface, define a short direction before coding:
- One sentence describing the visual idea and why it fits this product
- A compact palette and type approach using project tokens where available
- Layout structure and hierarchy
- The distinctive element, and what should remain restrained

Offer alternatives only when the user asks or when there are genuinely different strategic directions. Do not force a direction pitch for small tasks.

### 3. Plan the interface
Plan around the user's task, not a decorative component catalogue:
- Put the most important information and action where users can find them.
- Use real content and product-specific visuals whenever available.
- Choose density, navigation and layout appropriate to the surface.
- Include the relevant states: default, hover/focus, active, loading, empty, error, success and disabled—only where applicable.
- Consider mobile, keyboard use, long content and localization early.

### 4. Implement in the existing stack
- Follow the repository's component and styling conventions.
- Prefer existing components and tokens over duplicate systems.
- Keep components understandable and avoid unnecessary abstraction.
- Use semantic HTML and accessible names.
- Make controls functional; do not ship decorative buttons that appear actionable.
- Avoid fake data, placeholder copy and unfinished visual slots unless the user explicitly requests a prototype.
- Do not add dependencies without a clear benefit.

### 5. Review and refine
Review the result against the brief:
- Does the hierarchy communicate the primary task quickly?
- Does the visual direction feel specific rather than generic?
- Is the content clear and concise?
- Are spacing, typography, colour and alignment coherent?
- Are interaction states and feedback complete?
- Does the layout work at relevant viewport sizes?
- Did the change preserve existing behaviour?

If browser access is available, inspect rendered screenshots at relevant viewport sizes and fix visible problems. Use the quality gate below for the applicable checks.

## Targeted craft workflows

Load only the relevant references:

- **Typography / Thai and Latin scripts:** `references/typography-thai-latin.md`
- **Layout, spacing and visual hierarchy:** `references/design-core.md`, `references/modern-craft-invariants.md`
- **Motion and interaction:** `references/motion-tokens.md`, `references/compositor-smoothness.md`
- **Accessibility and implementation review:** `references/quality-gate.md`, `references/redesign-audit.md`
- **Existing site retrofit:** `references/web-retrofit-protocol.md`
- **Component or modal:** `references/components.md`
- **Extract a visual system:** `references/style-extraction.md`
- **Brand inspiration:** `references/brand-design-tokens.md` or `references/style-extraction.md`
- **Archetype search:** `references/argon-design-archetypes.md`
- **Image/mockup to code:** `references/image-to-code.md`

Brand and style references are inspiration, not permission to copy proprietary assets or duplicate a site pixel-for-pixel. Extract general principles and create an original implementation that fits the user's brief.

## Commands and tools

The CLI is optional support. Use it when it helps the current task; do not run every command by habit.

| Command | Use |
|---|---|
| `medesign search <query>` | Find relevant archetypes and design knowledge |
| `medesign lint <file>` | Run static source-pattern checks |
| `medesign audit <file>` | Run the available browser audit |
| `medesign polish <file> --dry-run` | Preview supported code transformations |
| `medesign snapshot <file>` | Capture rendered screenshots |
| `medesign tokens export` | Export preset tokens |
| `medesign presets list` | Inspect available presets |

Before applying an automatic repair, preview it when the change is broad or could alter layout/content. Review the diff. Never assume a transformation is safe merely because it is available.

## Quality gate

Use `references/quality-gate.md` for the checks applicable to the deliverable (Squint Test, Grayscale, 10-State Matrix). ปิดท้ายด้วย `Gate: quality-gate.md - pass` เสมอ **เฉพาะข้อความที่ส่งมอบโค้ดเท่านั้น** (ข้อความเสนอทิศทาง A/B ไม่ต้องใส่ Gate) Separate results into:

- **Static checks:** source patterns and structural heuristics.
- **Browser checks:** rendered styles, geometry, viewport behaviour and interaction.
- **Design review:** task fit, hierarchy, visual distinctiveness and content clarity.
- **Unverified:** checks that could not be run.

A static Q-Score is a heuristic, not a direct measurement of visual quality or accessibility. Never claim browser verification if only static lint ran. If a tool is unavailable, say so and provide the best manual fallback.

Do not treat a visual preference—such as a particular font, dark palette, em-dash usage, Bento layout, gradient or motion style—as a universal accessibility invariant.

## Delivery

For completed work, provide a concise summary:
- What changed and why
- Files or components affected
- Tests, lint, browser checks or screenshots actually run
- Any known limitation or remaining follow-up

Do not claim PASS for a check that did not run. Do not merge or publish changes unless the user explicitly asks.

## Optional graphic-design routes

When the user explicitly requests a slide deck, banner, logo, social graphic, report or mockup, route to the corresponding reference rather than forcing the frontend workflow:

- Slides: `references/slides.md`
- Executive report: `references/executive-reports.md`
- Banner: `references/banner-sizes-and-styles.md`
- Social graphics: `references/social-photos-design.md`
- Logo / identity: `references/logo-design.md`, `references/cip-design.md`
- Icon: `references/icon-design.md`
- Mockup: `references/image-mockup-direction.md`

For those requests, follow the requested output format and use the relevant specialist instructions.

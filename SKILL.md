---
name: medesign
description: "Design, build, improve, or review frontend UI/UX for websites and apps. Use when creating or refining pages, components, dashboards, and design systems for usability, visual craft, responsive layout, and a11y."
---

# ME-DESIGN

Use the user's intent, product, audience, existing UI and technical constraints to choose the workflow. Keep the interaction clear, preserve existing behaviour, and take the smallest approach that meets the goal.

## Route the work

- **Small fix:** inspect the component and nearby conventions, make the focused change, and check the affected behaviour.
- **New interface or redesign:** use the workflow below.
- **Review:** inspect the requested surface against the brief, interaction and accessibility. See `references/redesign-audit.md`.
- **One design dimension, research, or graphic asset:** load the corresponding reference only.

## Design and implement

1. Establish the audience, primary task, content, success condition and project constraints. Inspect routes, components, tokens, scripts and assets. Read `references/brief-intake.md` for substantial or ambiguous work. Ask one concise question when the answer materially changes the outcome. หากไม่มี `ask_question` ให้ถามข้อความธรรมดาในแชต; หากไม่มี Node CLI ให้ตรวจทานด้วย 11 Craft Checklist ด้วยตนเอง
2. Choose the visual direction before a substantial redesign. State the design idea, palette, type, hierarchy and the distinctive element. Offer alternatives when requested or when the directions materially differ.
3. Organize content and navigation around the primary task. Use real content and relevant loading, empty, error, focus and success states. Consider smaller viewports, keyboard use, long content and localization.
4. Build in the existing stack and reuse its components and tokens. Use native or semantic controls with accessible names. For external components, including SwiftUI registries, follow `references/components.md`. Preserve forms, routes, state, permissions and API behaviour.
5. Verify hierarchy, interaction, states, accessibility and layout at relevant viewport sizes. When browser access is available, inspect the rendered UI and repair visible issues. Report the checks actually performed.

## References

- Brief and visual direction: `references/brief-intake.md`, `references/design-core.md`, `references/argon-design-archetypes.md`
- Typography and layout: `references/typography-thai-latin.md`, `references/modern-craft-invariants.md`
- Motion: `references/motion-tokens.md`, `references/compositor-smoothness.md`
- Component or modal: `references/components.md`
- Existing site retrofit: `references/web-retrofit-protocol.md`
- Brand, styles and imagery: `references/brand-design-tokens.md`, `references/style-extraction.md`, `references/image-to-code.md`
- Graphics when requested: `references/slides.md`, `references/social-photos-design.md`, `references/cip-design.md`

Use inspiration for general principles and create an original implementation suited to the brief.

## Verification

Use `references/quality-gate.md` for the applicable checks. Separate static rules, rendered behaviour and design judgment in the report. Report missing evidence and claim a pass only for checks that ran. Use `Gate: quality-gate.md - pass` when verified **เฉพาะข้อความที่ส่งมอบโค้ดเท่านั้น** (ข้อความเสนอทิศทาง A/B ไม่ต้องใส่ Gate).

The CLI is optional. See the [CLI command reference](README.md#verified-cli-commands) for search, lint, audit, polish, snapshots, presets and tokens. Preview broad automatic changes, then inspect the diff. Deliver the affected files, observed checks and any limitation.

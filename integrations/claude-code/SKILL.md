---
name: medesign
description: Curated UI/UX & High-Signal Engineering Design Engine with 5-Engine Architecture and 4-Tier Quality Governance.
---

# ME-DESIGN for Claude Code

When designing, auditing, or writing frontend code:

1. **Routing:** Follow the 38 Archetypes (30 Visual + 8 Engineering ISA-101 / GIS).
2. **Hard Invariants:**
   - WCAG AA/AAA contrast on both Light and Dark themes.
   - Visible `:focus-visible` ring on all interactive elements.
   - Touch target $\ge 44\text{px}$ (HIG compliant).
   - Reduced-motion gate: respect `@media (prefers-reduced-motion: reduce)`.
   - Zero em-dash (`—`) or en-dash (`–`) in visible UI copy.
3. **5-Axis Decoupling:**
   - Operational Archetype × Visual Language × Spatial Model × Motion Profile × Governance Tier.
4. **Verification:**
   - Verify code against `tests/linter.js` before completing tasks.

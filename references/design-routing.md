# ME-DESIGN — Knowledge & Design Intelligence Routing Guide

This document classifies all references within ME-DESIGN, mapping product contexts, intents, and user domains to relevant architectural modules.

---

## 1. Reference Classification (Four-Tier Architecture)

To minimize context pollution and prevent unnecessary loading, all 60+ repository references are organized into four distinct tiers:

### Tier 1: Core Engineering Knowledge (Load on Frontend Design Workflows)
These references establish the non-negotiable foundations of web accessibility, layout, typography, and delivery verification:

| Reference | Domain & Purpose | Trigger Condition |
|---|---|---|
| `references/design-core.md` | Layout principles, 8-pt grid, closed spacing tokens, visual hierarchy | Spatial layout, spacing, containers |
| `references/typography-thai-latin.md` | Bilingual Thai-Latin font pairing, vertical metrics, line-height >= 1.7 | Typography, font stacks, Thai diacritic clipping |
| `references/modern-craft-invariants.md` | WCAG 2.2 standards, touch target contracts (44px), high contrast outline | Accessibility, interactive states, contracts |
| `references/quality-gate.md` | Deterministic verification: Squint Test, Grayscale, 10-State Matrix | Delivery review, code completion |
| `references/brief-intake.md` | Mode detection (`new` / `revamp` / `like`), ambiguity resolution | Initial brief intake (deep path) |

---

### Tier 2: Specialized Design Intelligence (Load JIT Based on Domain/Task)
Load only the reference matching the specific product domain or technical task:

| Reference | Domain & Purpose | Recommended Stack / Context |
|---|---|---|
| `references/argon-design-archetypes.md` | 38 Curated Domain Archetypes (SaaS, GIS, Cadastre, Telemetry, FinTech) | Creating distinct, non-generic interfaces |
| `references/brand-design-tokens.md` | 74 Global Brand System Profiles & OKLCH token mappings | Brand inspiration or theme adaptation |
| `references/motion-tokens.md` | 120fps spring physics curves, duration scales, micro-interactions | Animation, transition, hover/active physics |
| `references/compositor-smoothness.md` | Hardware-accelerated CSS properties (`transform`, `opacity`) | High-framerate interaction, scroll performance |
| `references/components.md` | Accessible component blueprints (dialog, combobox, tooltip, table) | Component implementation, complex controls |
| `references/ui-styling-shadcn.md` | Tailwind CSS + shadcn/ui integration conventions | React / Next.js / Tailwind stack |
| `references/web-retrofit-protocol.md` | Safe legacy web modernization (Tier 1-3 progressive patches) | Refactoring existing webbases without breakage |
| `references/style-extraction.md` | Methodical CSS / token reverse-engineering from live sites | `/medesign extract <url>` or theme cloning |
| `references/image-to-code.md` | Figma / screenshot to production code mapping protocol | Converting visual designs to code |
| `references/ai-tells.md` | Catalog of 44 AI-generated visual tells to detect and eradicate | Anti-generic polish, design critique |
| `references/redesign-audit.md` | Pre-implementation audit checklist for existing projects | Planning a surface or application revamp |

---

### Tier 3: Optional Media & Graphic References (User Explicit Request Only)
Do not load during web application or frontend development unless explicitly asked for graphics or slides:

| Reference | Media Type | Deliverable |
|---|---|---|
| `references/slides.md` | Presentation | HTML pitch decks with Chart.js |
| `references/slides-html-template.md` | Presentation | Reusable semantic HTML slide boilerplate |
| `references/slides-layout-patterns.md` | Presentation | Bento, split, timeline, and metric slide layouts |
| `references/slides-copywriting-formulas.md`| Presentation | Executive storytelling and slide messaging formulas |
| `references/slides-strategies.md` | Presentation | Slide deck pacing and structural strategies |
| `references/banner-sizes-and-styles.md` | Graphic Design | Social and display ad banner specifications (22 styles) |
| `references/social-photos-design.md` | Graphic Design | OpenGraph, Twitter card, and social post graphics |
| `references/logo-design.md` | Identity | SVG logo prompts, geometric/minimalist styles |
| `references/cip-design.md` | Identity | Corporate Identity Program (stationery, collateral) |
| `references/icon-design.md` | Graphic Design | Vector SVG icon design protocols (15 styles) |
| `references/executive-reports.md` | Documentation | High-density technical and executive report templates |
| `references/image-mockup-direction.md` | Mockup | 3D device mockup composition guides |

---

### Tier 4: Archived & Superset References (Retained for Provenance)
These references represent earlier iterations or raw vocabulary sources:

- `references/intake.md`: Early English brief intake (superseded by `brief-intake.md` v2.3).
- `references/redesign.md`: Legacy redesign notes (superseded by `web-retrofit-protocol.md`).
- `references/vocabulary.md`: Legacy UI vocabulary (superseded by `vocab-protocol.md` and `ui-ux-vocabulary-vault.md`).
- `references/ui-ux-vocabulary-vault.md` & `ui-ux-vocabulary-vault.json`: 90KB raw lexicon vault used by discovery indexing.

---

## 2. Design Decision Matrix (Context-Driven Architecture)

Design decisions must be derived from context, not arbitrary taste. Never force a single archetype or visual style across different products:

| Product Domain | Target Audience | Spatial Model | Recommended Typography | Primary Palette | Motion Profile |
|---|---|---|---|---|---|
| **B2B SaaS / Admin** | Technical Operators, Admins | Bento / Column Grid (Dense) | Geist / Inter + JetBrains Mono | Monochromatic Slate + Vibrant Action | `spring-settle` (160ms) |
| **GIS / Cadastre / Mapping** | Surveyors, Civil Engineers | 16:10 Split Canvas + Data Shelf | JetBrains Mono + IBM Plex Sans Thai | Ultra-Dark Obsidian + Electric Cyan (#00f5fb) | `precision` (120ms max) |
| **Telemetry / Industrial** | Operations Center, SREs | Multi-Pane Cockpit (100dvh) | Tabular Monospace | High-Contrast Charcoal + Passed Emerald | `instant` / `precision` |
| **FinTech / Banking** | Institutional / Retail Investors | Tabular Density + Key Metrics | Plus Jakarta Sans + Tabular Mono | Deep Navy / Forest + Restrained Gold/Emerald | `precision` (140ms) |
| **Consumer / E-Commerce** | Everyday Consumers | Fluid Editorial / Story Grid | Plus Jakarta Sans / Cabinet Grotesk | Warm Neutral + Product Accent | `soft-settle` (240ms) |
| **Developer Tooling** | Software Engineers | Terminal-First / Split Pane | Geist Sans + Geist Mono | Deep Void / Monochrome Carbon | `instant` (0-80ms) |
| **Public Sector / Utility** | General Public (High Diversity) | Simple Linear / Card Stack | Inter + System Sans (WCAG AAA) | High-Contrast Neutral + Accessible Blue | None / `soft-settle` |

---

## 3. Anti-Default Guarantees (No Universal Style)

ME-DESIGN strictly forbids enforcing the following as universal requirements:
1. **No Forced Dark Mode:** Choose light, dark, or system-adaptive based entirely on product domain and lighting environment.
2. **No Forced Bento Grid:** Use Bento layouts only when content units have genuine hierarchical asymmetry. Never distort tabular data into Bento boxes.
3. **No Forced 3-Pane Cockpit:** Reserve 3-pane spatial layouts for map-centric, CAD, or telemetry tools. Never apply cockpit layouts to landing pages or mobile applications.
4. **No Forced Neon Accents:** Saturated OKLCH cyan/magenta is suitable for technical displays; consumer, medical, and banking products require restrained semantic colors.
5. **No Universal Font:** Thai requires Latin fonts defined first (`"Plus Jakarta Sans", "IBM Plex Sans Thai"`), with `line-height >= 1.7` to prevent diacritic clipping.

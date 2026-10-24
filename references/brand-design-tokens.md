---
name: brand-design-md
description: "คลังต้นแบบดีไซน์หน้าเว็บและ UI จาก 74 แบรนด์ระดับโลก (Stripe, Linear, Apple, Tesla, Metha) — ใช้เมื่อต้องการดึงโทนสี ฟอนต์ และการจัดวางเว็บระดับพรีเมียม (Production brand design tokens, HEX/HSL palettes, typography, and layout specs from 74 top tech brands)"
---

# Brand Design System Intelligence (Awesome DESIGN.md)

This skill provides direct access to **74 production-grade `DESIGN.md`** design specifications from world-class brands and engineering presets, cloned from [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md).

## Available Brands (74 Brands)

- **Mission-Critical Engineering & Telemetry:** `metha` (Cadastral & GIS Cockpit, ISA-101 Situational Awareness, Deep Slate `#0c0e14`, Hairline `rgba(255,255,255,0.09)`, Electric Cyan `oklch(0.65 0.20 250)`, Tabular Mono)
- **Developer Tools & SaaS:** `linear.app`, `stripe`, `vercel`, `supabase`, `raycast`, `posthog`, `resend`, `sentry`, `warp`, `hashicorp`, `mintlify`, `clickhouse`, `mongodb`, `cursor`, `expo`, `sanity`, `composio`, `airtable`, `cal`, `clay`, `opencode.ai`, `lovable`
- **AI & LLM Platforms:** `claude`, `elevenlabs`, `mistral.ai`, `together.ai`, `x.ai`, `replicate`, `runwayml`, `cohere`, `minimax`, `ollama`, `voltagent`
- **Productivity & Collaboration:** `notion`, `figma`, `framer`, `webflow`, `miro`, `slack`, `superhuman`, `zapier`, `intercom`
- **Consumer & Tech Giants:** `apple`, `airbnb`, `spotify`, `uber`, `nike`, `tesla`, `spacex`, `playstation`, `meta`, `nvidia`, `pinterest`, `shopify`, `starbucks`, `ibm`, `hp`, `dell-1996`, `vodafone`
- **Auto & Luxury:** `bmw`, `bmw-m`, `ferrari`, `lamborghini`, `bugatti`, `renault`
- **Fintech & Crypto:** `coinbase`, `revolut`, `wise`, `mastercard`, `kraken`, `binance`
- **Media:** `theverge`, `wired`, `nintendo-2001`

## How to Apply a Brand Design System

When the user asks to build or style an interface like a specific brand (e.g., *"Make it look like Linear"*, *"Use Stripe style"*, *"Design a telemetry cockpit like Metha"*, or *"Design a dark SaaS dashboard like Supabase"*):

1. **Locate the Brand Specification:**
   Primary path: `references/brand-design-tokens.md`, `presets/<name>/` หรือ `awesome-design-md-src/design-md/<brand_name>/DESIGN.md`
   *(Example: `presets/metha/guidelines.md` or `awesome-design-md-src/design-md/linear.app/DESIGN.md`)*

2. **Read the Token Definitions:**
   - **Colors:** Extract the exact semantic hex/oklch codes (`primary`, `canvas`, `surface-1` through `surface-4`, `hairline`, `ink`, `ink-muted`).
   - **Typography:** Apply the specified font families, font sizes, line heights, and letter spacing (tracking).
   - **Component Styles:** Replicate the cards, buttons, input fields, badges, and focus rings defined in the document.
   - **Elevation & Lighting:** Use the subtle gradients, hairline borders (e.g. `1px solid rgba(255,255,255,0.08)`), and glow effects.

3. **Enforce Cohesion & Layout Pairing Matrix:**
   Never mix random colors with a brand's palette. Always build the CSS Variables (`:root`) directly from the `DESIGN.md` specification. Furthermore, pairing a brand requires applying both its Tokens AND its iconic Layout Topology:
   - **Metha / Geospatial / Telemetry:** 3-Pane Cockpit Architecture (Top coordinate command deck, Left layer rail, Center spatial canvas, Right telemetry inspector & traverse table).
   - **BMW / Tesla / Automotive:** 3-Pane Cockpit Architecture (Top Command Deck, Left Telemetry/Filmstrip, Center Canvas, Right Docked Inspector with tactile dials). NEVER use generic full-screen blocking modals.
   - **Linear / Raycast / DevTools:** Split Navigation Rail + Command Palette (Cmd+K) + High-density tabular grid with instant inline actions.
   - **Apple / Consumer Luxury:** Floating Frosted Glass Header + Generous Asymmetric Bento + Floating Action Capsules + Concentric Card Physics.
   - **Stripe / Fintech:** Seamless Multi-step Flow + Sticky Progress Summary on right + Clean Form Fields with micro-glow focus.
   - **Notion / Productivity:** Full-bleed distraction-free canvas + Side peek drawer + Minimalist Slash command menu.

## Updating the Collection

To pull latest brands from upstream:
```powershell
git -C "path/to/awesome-design-md-src" pull
```

---
name: brand-design-md
description: "คลังต้นแบบดีไซน์หน้าเว็บและ UI จาก 73 แบรนด์ระดับโลก (Stripe, Linear, Apple, Vercel) — ใช้เมื่อต้องการดึงโทนสี ฟอนต์ และการจัดวางเว็บระดับพรีเมียม (Production brand design tokens, HEX/HSL palettes, typography, and layout specs from 73 top tech brands)"
---

# Brand Design System Intelligence (Awesome DESIGN.md)

This skill provides direct access to **73 production-grade `DESIGN.md`** design specifications from world-class brands, cloned from [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md).

## Available Brands (73 Brands)

- **Developer Tools & SaaS:** `linear.app`, `stripe`, `vercel`, `supabase`, `raycast`, `posthog`, `resend`, `sentry`, `warp`, `hashicorp`, `mintlify`, `clickhouse`, `mongodb`, `cursor`, `expo`, `sanity`, `composio`, `airtable`, `cal`, `clay`, `opencode.ai`, `lovable`
- **AI & LLM Platforms:** `claude`, `elevenlabs`, `mistral.ai`, `together.ai`, `x.ai`, `replicate`, `runwayml`, `cohere`, `minimax`, `ollama`, `voltagent`
- **Productivity & Collaboration:** `notion`, `figma`, `framer`, `webflow`, `miro`, `slack`, `superhuman`, `zapier`, `intercom`
- **Consumer & Tech Giants:** `apple`, `airbnb`, `spotify`, `uber`, `nike`, `tesla`, `spacex`, `playstation`, `meta`, `nvidia`, `pinterest`, `shopify`, `starbucks`, `ibm`, `hp`, `dell-1996`, `vodafone`
- **Auto & Luxury:** `bmw`, `bmw-m`, `ferrari`, `lamborghini`, `bugatti`, `renault`
- **Fintech & Crypto:** `coinbase`, `revolut`, `wise`, `mastercard`, `kraken`, `binance`
- **Media:** `theverge`, `wired`, `nintendo-2001`

## How to Apply a Brand Design System

When the user asks to build or style an interface like a specific brand (e.g., *"Make it look like Linear"*, *"Use Stripe style"*, or *"Design a dark SaaS dashboard like Supabase"*):

1. **Locate the Brand Specification:**
   Primary path: `references/brand-design-tokens.md` หรือ `awesome-design-md-src/design-md/<brand_name>/DESIGN.md`
   *(Example: `awesome-design-md-src/design-md/linear.app/DESIGN.md`)*

2. **Read the Token Definitions:**
   - **Colors:** Extract the exact semantic hex codes (`primary`, `canvas`, `surface-1` through `surface-4`, `hairline`, `ink`, `ink-muted`).
   - **Typography:** Apply the specified font families, font sizes, line heights, and letter spacing (tracking).
   - **Component Styles:** Replicate the cards, buttons, input fields, badges, and focus rings defined in the document.
   - **Elevation & Lighting:** Use the subtle gradients, hairline borders (e.g. `1px solid rgba(255,255,255,0.08)`), and glow effects.

3. **Enforce Cohesion:**
   Never mix random colors with a brand's palette. Always build the CSS Variables (`:root`) directly from the `DESIGN.md` specification.

## Updating the Collection

To pull latest brands from upstream:
```powershell
git -C "path/to/awesome-design-md-src" pull
```

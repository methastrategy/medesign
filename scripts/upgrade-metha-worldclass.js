const fs = require('fs');
const path = require('path');

const repos = [
  'D:/METHA/Projects/medesign',
  'C:/Users/hotme/.gemini/config/skills/medesign'
];

// 1. Update presets/metha/guidelines.md
const methaGuidelines = `# Metha Preset Guidelines (\`/medesign metha\`)

## Archetype Mapping
- **Primary Archetype:** Archetype 38 (Cadastral Survey & Mission-Critical QA/QC Workbench)
- **Secondary Archetype:** Archetype 32 (GIS Situation Awareness & Telemetry Cockpit)

## World-Class Engineering Context
- **Philosophy:** Mission-Critical Precision, Geodetic Field Telemetry, and High-Density Spatial Computing.
- **Target Audience:** Survey engineers, GIS analysts, telemetry operators, and mission-critical dashboard creators worldwide.
- **Craft Standard:** 100% compliant with ME-DESIGN Neutral World-Class Invariants (Closed Spacing, Latin-First Bilingual Typography, 44px Hit-Target Halo, and 1px Hairline In-flow Surfaces).

## Invariants & Design Principles
1. **Engineering Precision & Closed Spacing System:**
   - Outer card radius \`8px\`, inner nested component radius \`4px\` (\`r_inner = max(0, r_outer - padding)\`).
   - Strict Closed Spacing Scale: \`2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px\`.
   - Proximity Ratio $\\ge 2:1$ (space between functional card clusters is at least $2\\times$ internal element gap).
2. **Geodetic Coordinates & Tabular Typography:**
   - Coordinate, Distance, Azimuth, and Traverse Closure readouts MUST use monospace (\`IBM Plex Mono\` / \`Fira Code\`) with \`tabular-nums\` and \`letter-spacing: 0.04em\`.
   - UI chrome and labels use Latin-First \`Geist\` or \`Inter\`, paired with \`IBM Plex Sans Thai\` (Body line-height \`1.7–1.8\`, \`letter-spacing: 0\`, diacritic headroom $\\ge 4$px).
3. **Cockpit Color Palette & ISA-101 Situational Awareness:**
   - Dark Slate \`#0c0e14\` background prevents eye fatigue during continuous operational shifts.
   - 1px Hairline Borders (\`rgba(255, 255, 255, 0.09)\`) on all in-flow cards with zero fake drop-shadows. Dark mode elevation achieved via luminance (+2% to +4% L).
   - Survey Electric Cyan \`oklch(0.65 0.20 250)\` for primary active controls and vector geometries.
   - Precision Green \`oklch(0.72 0.18 145)\` strictly reserved for verified closures, fixed GPS status, and valid tolerances ($1\\sigma < 5\\text{mm}$).
   - Warning Amber \`oklch(0.78 0.16 75)\` for float solutions, high HDOP, or tolerance drift.
   - Critical Crimson \`oklch(0.62 0.22 25)\` for boundary collisions or hardware telemetry loss.
4. **Motion Profile (Precision):**
   - Sub-second \`precision\` profile (140ms entry, 90ms exit, \`cubic-bezier(0.16, 1, 0.3, 1)\`).
   - Coordinate updates and map point inspection respond instantly without physics bounces.
5. **Layout Architecture (3-Pane Cockpit):**
   - 100dvh viewport canvas layout with top coordinate command deck, left layer filter rail, center spatial map/vector canvas, and right docked telemetry inspector with collapsible bottom traverse closure table.
`;

// 2. Update presets/metha/preset.json
const methaPresetJson = {
  "$schema": "../schema.json",
  "id": "metha",
  "name": "Metha Engineering & Geoinformatics Cockpit",
  "version": "1.1.0",
  "archetype": "Archetype 38: Cadastral Survey & Mission-Critical QA/QC Workbench (Archetype 32: GIS Situation Awareness)",
  "description": "World-class mission-critical telemetry & geodetic engineering preset: high-density cadastral tables, 8pt optical grid, Geist + IBM Plex Mono tabular coordinates, deep slate/obsidian canvas, and electric cyan/precision green accents.",
  "typography": {
    "display": "'Geist', 'Inter', sans-serif",
    "sans": "'Geist', 'IBM Plex Sans Thai', sans-serif",
    "mono": "'IBM Plex Mono', 'Fira Code', monospace",
    "headingTracking": "-0.020em",
    "uiLineHeight": "1.25",
    "proseLineHeight": "1.70",
    "thaiHeadroom": "4px"
  },
  "color": {
    "canvas": "#0c0e14",
    "surfaceRaised": "#141721",
    "surfaceInset": "#090a0f",
    "borderSubtle": "rgba(255, 255, 255, 0.09)",
    "borderFocus": "oklch(0.68 0.20 250)",
    "accent": "oklch(0.65 0.20 250)",
    "accentForeground": "#ffffff",
    "status": {
      "info": "oklch(0.68 0.20 250)",
      "success": "oklch(0.72 0.18 145)",
      "warning": "oklch(0.78 0.16 75)",
      "critical": "oklch(0.62 0.22 25)"
    }
  },
  "geometry": {
    "radiusBase": "4px",
    "radiusOuter": "8px",
    "concentricFormula": "max(0px, 8px - 4px) = 4px",
    "scalingFormula": "clamp(0.97, 1 - 2.2/max(W, H), 0.995)",
    "hitTargetMinTouch": "44px"
  },
  "motion": {
    "profile": "precision",
    "durationEntry": "140ms",
    "durationExit": "90ms",
    "easingEntry": "cubic-bezier(0.16, 1, 0.3, 1)",
    "easingExit": "cubic-bezier(0.4, 0, 1, 1)"
  },
  "rules": [
    "MD001_FOCUS_RING",
    "MD002_REDUCED_MOTION",
    "MD003_HIT_TARGET_ISOLATION",
    "MD004_DEAD_BUTTON_CONTRACT",
    "MD101_BENTO_ROW_FLOW"
  ]
};

// 3. Update references/brand-design-tokens.md
const brandTokensContent = `---
name: brand-design-md
description: "คลังต้นแบบดีไซน์หน้าเว็บและ UI จาก 74 แบรนด์ระดับโลก (Stripe, Linear, Apple, Tesla, Metha) — ใช้เมื่อต้องการดึงโทนสี ฟอนต์ และการจัดวางเว็บระดับพรีเมียม (Production brand design tokens, HEX/HSL palettes, typography, and layout specs from 74 top tech brands)"
---

# Brand Design System Intelligence (Awesome DESIGN.md)

This skill provides direct access to **74 production-grade \`DESIGN.md\`** design specifications from world-class brands and engineering presets, cloned from [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md).

## Available Brands (74 Brands)

- **Mission-Critical Engineering & Telemetry:** \`metha\` (Cadastral & GIS Cockpit, ISA-101 Situational Awareness, Deep Slate \`#0c0e14\`, Hairline \`rgba(255,255,255,0.09)\`, Electric Cyan \`oklch(0.65 0.20 250)\`, Tabular Mono)
- **Developer Tools & SaaS:** \`linear.app\`, \`stripe\`, \`vercel\`, \`supabase\`, \`raycast\`, \`posthog\`, \`resend\`, \`sentry\`, \`warp\`, \`hashicorp\`, \`mintlify\`, \`clickhouse\`, \`mongodb\`, \`cursor\`, \`expo\`, \`sanity\`, \`composio\`, \`airtable\`, \`cal\`, \`clay\`, \`opencode.ai\`, \`lovable\`
- **AI & LLM Platforms:** \`claude\`, \`elevenlabs\`, \`mistral.ai\`, \`together.ai\`, \`x.ai\`, \`replicate\`, \`runwayml\`, \`cohere\`, \`minimax\`, \`ollama\`, \`voltagent\`
- **Productivity & Collaboration:** \`notion\`, \`figma\`, \`framer\`, \`webflow\`, \`miro\`, \`slack\`, \`superhuman\`, \`zapier\`, \`intercom\`
- **Consumer & Tech Giants:** \`apple\`, \`airbnb\`, \`spotify\`, \`uber\`, \`nike\`, \`tesla\`, \`spacex\`, \`playstation\`, \`meta\`, \`nvidia\`, \`pinterest\`, \`shopify\`, \`starbucks\`, \`ibm\`, \`hp\`, \`dell-1996\`, \`vodafone\`
- **Auto & Luxury:** \`bmw\`, \`bmw-m\`, \`ferrari\`, \`lamborghini\`, \`bugatti\`, \`renault\`
- **Fintech & Crypto:** \`coinbase\`, \`revolut\`, \`wise\`, \`mastercard\`, \`kraken\`, \`binance\`
- **Media:** \`theverge\`, \`wired\`, \`nintendo-2001\`

## How to Apply a Brand Design System

When the user asks to build or style an interface like a specific brand (e.g., *"Make it look like Linear"*, *"Use Stripe style"*, *"Design a telemetry cockpit like Metha"*, or *"Design a dark SaaS dashboard like Supabase"*):

1. **Locate the Brand Specification:**
   Primary path: \`references/brand-design-tokens.md\`, \`presets/<name>/\` หรือ \`awesome-design-md-src/design-md/<brand_name>/DESIGN.md\`
   *(Example: \`presets/metha/guidelines.md\` or \`awesome-design-md-src/design-md/linear.app/DESIGN.md\`)*

2. **Read the Token Definitions:**
   - **Colors:** Extract the exact semantic hex/oklch codes (\`primary\`, \`canvas\`, \`surface-1\` through \`surface-4\`, \`hairline\`, \`ink\`, \`ink-muted\`).
   - **Typography:** Apply the specified font families, font sizes, line heights, and letter spacing (tracking).
   - **Component Styles:** Replicate the cards, buttons, input fields, badges, and focus rings defined in the document.
   - **Elevation & Lighting:** Use the subtle gradients, hairline borders (e.g. \`1px solid rgba(255,255,255,0.08)\`), and glow effects.

3. **Enforce Cohesion & Layout Pairing Matrix:**
   Never mix random colors with a brand's palette. Always build the CSS Variables (\`:root\`) directly from the \`DESIGN.md\` specification. Furthermore, pairing a brand requires applying both its Tokens AND its iconic Layout Topology:
   - **Metha / Geospatial / Telemetry:** 3-Pane Cockpit Architecture (Top coordinate command deck, Left layer rail, Center spatial canvas, Right telemetry inspector & traverse table).
   - **BMW / Tesla / Automotive:** 3-Pane Cockpit Architecture (Top Command Deck, Left Telemetry/Filmstrip, Center Canvas, Right Docked Inspector with tactile dials). NEVER use generic full-screen blocking modals.
   - **Linear / Raycast / DevTools:** Split Navigation Rail + Command Palette (Cmd+K) + High-density tabular grid with instant inline actions.
   - **Apple / Consumer Luxury:** Floating Frosted Glass Header + Generous Asymmetric Bento + Floating Action Capsules + Concentric Card Physics.
   - **Stripe / Fintech:** Seamless Multi-step Flow + Sticky Progress Summary on right + Clean Form Fields with micro-glow focus.
   - **Notion / Productivity:** Full-bleed distraction-free canvas + Side peek drawer + Minimalist Slash command menu.

## Updating the Collection

To pull latest brands from upstream:
\`\`\`powershell
git -C "path/to/awesome-design-md-src" pull
\`\`\`
`;

// 4. Update SKILL.md
repos.forEach(repo => {
  const gPath = path.join(repo, 'presets/metha/guidelines.md');
  const pPath = path.join(repo, 'presets/metha/preset.json');
  const bPath = path.join(repo, 'references/brand-design-tokens.md');
  const sPath = path.join(repo, 'SKILL.md');

  if (fs.existsSync(path.dirname(gPath))) {
    fs.writeFileSync(gPath, methaGuidelines, 'utf8');
  }
  if (fs.existsSync(path.dirname(pPath))) {
    fs.writeFileSync(pPath, JSON.stringify(methaPresetJson, null, 2), 'utf8');
  }
  if (fs.existsSync(bPath)) {
    fs.writeFileSync(bPath, brandTokensContent, 'utf8');
  }

  // Update SKILL.md
  if (fs.existsSync(sPath)) {
    let skill = fs.readFileSync(sPath, 'utf8');
    skill = skill.replace(
      '| **สไตล์ Preset พิเศษ** (`apple` / `tesla`) | `presets/{name}/guidelines.md` + `presets/{name}/design-tokens.css` |',
      '| **สไตล์ Preset ระดับโลก** (`apple` / `tesla` / `metha`) | `presets/{name}/guidelines.md` + `presets/{name}/design-tokens.css` |'
    );
    skill = skill.replace(
      '| `/medesign metha` | ลายเซ็นวิศวกรรมส่วนตัว Metha Cockpit (Survey/GIS Telemetry, Tabular Mono, Dark Charcoal) |',
      '| `/medesign metha` | **Metha Telemetry Cockpit (Archetype 38)** — สไตล์วิศวกรรมรังวัดและโทรมาตร (3-Pane Cockpit, Tabular Mono, Dark Slate, Electric Cyan) |'
    );
    skill = skill.replace(
      '| **คลัง 73 แบรนด์ระดับโลก** | `references/brand-design-tokens.md` (Linear, Apple, Stripe, Vercel, Supabase) |',
      '| **คลัง 74 แบรนด์ระดับโลก & Presets** | `references/brand-design-tokens.md` (Linear, Apple, Stripe, Tesla, Metha) |'
    );
    fs.writeFileSync(sPath, skill, 'utf8');
  }

  console.log(`Updated world-class metha preset in: ${repo}`);
});

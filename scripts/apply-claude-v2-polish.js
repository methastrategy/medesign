const fs = require('fs');
const path = require('path');

const repos = [
  'D:/METHA/Projects/medesign',
  'C:/Users/hotme/.gemini/config/skills/medesign'
];

// 1. Updated brief-intake.md (v2)
const briefIntakeV2 = `# Brief Intake Gate (v2)

ด่านบังคับก่อนเขียนโค้ด UI ทุกงานที่เป็น new / revamp / like
ข้ามได้เฉพาะ: ผู้ใช้พิมพ์ "ลุยเลย" หรือ "skip intake" / แก้งานระดับ "จุดเล็ก" (แตะไม่เกิน 1 ไฟล์ และไม่เปลี่ยน layout/สีหลัก/ฟอนต์)

## 0. ล็อกโหมด (ห้ามเดาเงียบๆ)

คำสั่งที่ผู้ใช้พิมพ์ (\`new\`, \`revamp\`, \`like\`) ชนะการจับคำในข้อความเสมอ ถ้าไม่ได้พิมพ์โหมด ให้อนุมานตามลำดับนี้:
1. **คำพูดชัดเจนชนะไฟล์:** หากผู้ใช้ระบุว่า "ทำใหม่หมด" / "start over" แม้มีไฟล์เดิมแนบมา ให้ถือเป็น \`new\`
2. **อ้างอิงแบรนด์หรือสไตล์:** มี URL หรือชื่อแบรนด์ที่มีคำขยายว่า "เหมือน", "สไตล์", "แบบ", "อ้างอิง", "like", "inspired by" -> \`like\` (หากเป็นชื่อแบรนด์ที่เป็นโจทย์ของงาน เช่น "เว็บขายรองเท้า Nike" ให้ถือเป็น \`new\`)
   - หากมีไฟล์เดิมแนบมากับ \`like\`: ให้คง Business Logic และ Props เดิมไว้ เปลี่ยนเฉพาะ Visual Layer
3. **Preset สเปกพร้อมใช้:** คำสั่ง \`/medesign apple\`, \`tesla\`, \`metha\` หรือ \`/medesign <brand>\` ถือเป็น \`like\` ที่มีสเปกพร้อมใช้ ให้ข้ามไปข้อ 2 (เสนอ 2 ทิศทาง) ได้ทันที
4. **มีไฟล์/โค้ดเดิมแนบมา:** (และไม่ได้ระบุว่าทำใหม่หมด) -> \`revamp\`
5. **ไม่มีทั้งสองอย่าง:** -> \`new\`

บรรทัดแรกของคำตอบต้องประกาศ \`โหมด: new\` (หรือ \`revamp\` / \`like\`) เสมอ ห้ามถามเรื่องโหมดซ้ำ
อนุมานไม่ได้จริงๆ ถามข้อเดียวเท่านั้น: "งานนี้คือ สร้างใหม่ / แก้ของเดิม / ทำตามเว็บอ้างอิง?"

ทางที่ไป:
- \`new\` -> \`references/design-core.md\` -> \`references/quality-gate.md\`
- \`revamp\` -> \`references/redesign-audit.md\` -> \`references/quality-gate.md\`
- \`like\` -> \`references/style-extraction.md\` -> \`references/design-core.md\` -> \`references/quality-gate.md\` (ห้ามเข้า \`audit\`)

## 1. ตรวจ Brief 5 ช่อง (Zero-Roundtrip Intake)

เป้าหมาย+ผู้ใช้ / อารมณ์ 3 คำ / อ้างอิง (ยืมอะไร ไม่ยืมอะไร) / ไม่เอา / ข้อจำกัด (stack, อุปกรณ์, ภาษา, สิ่งที่ห้ามแตะ)
- ช่องไหนผู้ใช้ตอบแล้ว ใช้เลย ห้ามถามซ้ำ และห้ามถามสิ่งที่อ่านได้จากโค้ดที่แนบ
- **One-Shot Alignment:** หาก Brief ครบแล้ว ให้เสนอ 2 ทิศทาง (ข้อ 2) ทันทีในข้อความแรก! หากขาด ให้ถามรวมในข้อความเดียว ไม่เกิน 3 คำถาม พร้อมเสนอทิศทางชั่วคราวให้ตอบ "ok" หรือ "ลุยเลย" ได้ในรอบเดียว
- ใช้ \`ask_question\` ถ้ามี หากไม่มีให้ถามเป็นข้อความธรรมดาในแชต ถามได้รอบเดียวเท่านั้น

## 2. เสนอ 2 ทิศทาง

Direction A ใกล้ brief ที่สุด / Direction B ต่างอย่างชัดเจน (ต่างกันอย่างน้อย 2 ใน 4: โครง layout, สีหลัก, คู่ฟอนต์, ความหนาแน่น)
แต่ละทิศทางไม่เกิน 5 บรรทัด:
- ชื่อ + อารมณ์ 1 บรรทัด
- Layout และความหนาแน่น
- สี 3 ค่า (hex หรือ oklch) + ฟอนต์ (Latin + ไทย)
- Motion หนึ่งโปรไฟล์
- เหมาะเมื่อ / เสี่ยงเมื่อ

เพิ่มตามโหมด:
- \`revamp\`: ระบุ "คงอะไร / เปลี่ยนอะไร"
- \`like\`: ระบุ "ยืมอะไร / ไม่ยืมอะไร" (A ใกล้ต้นฉบับ, B ตีความใหม่ให้เข้าตัวตนผู้ใช้) ห้ามลอกโลโก้ ข้อความ รูป
- **Hierarchy Rule:** สิ่งที่ผู้ใช้เลือกใน Intake ชนะ Layout Pairing Matrix เสมอ และ Matrix ใช้เฉพาะงาน App/Dashboard/Cockpit (หากเป็น Landing Page/Marketing ให้ใช้โครงสร้างมาตรฐาน)

ปิดท้ายด้วย: "เลือก A / B / ผสม (ระบุ) หรือพิมพ์ 'ลุยเลย' (ผมจะใช้ A)"

## 3. Gate & ทางลัด

- ห้ามเขียนโค้ดหรือสร้างไฟล์จนกว่าผู้ใช้เลือก (หรือสั่ง "ลุยเลย")
- **ลุยเลย Escape Hatch:** หากผู้ใช้พิมพ์ "ลุยเลย" หรือ "skip intake" ตั้งแต่แรก ให้ประกาศ \`Locked Direction: Direction A\` 3 บรรทัด แล้วลงมือเขียนโค้ดทันทีโดยไม่ถามซ้ำ
- เมื่อเลือกแล้ว สรุป "Locked Direction" 3 บรรทัด (บันทึกใน DESIGN.md ถ้ามี) แล้วไป workflow ของโหมด -> \`quality-gate.md\`
- ผู้ใช้เปลี่ยนใจกลางทาง: กลับมาข้อ 2 เฉพาะส่วนที่เปลี่ยน ไม่ต้องเริ่มใหม่ทั้งหมด

## 4. ข้อห้าม

- ห้ามใช้ \`user-profile.json\` หรือ DNA ส่วนตัว (metha, MESURV, MeBoard) เว้นแต่ผู้ใช้สั่ง \`auto\` หรือ \`metha\` เอง
- ห้ามเสนอเกิน 2 ทิศทาง ห้ามถามเกิน 1 รอบ
`;

// 2. Updated presets/metha/guidelines.md
const methaGuidelinesV2 = `# Metha Preset Guidelines (\`/medesign metha\`)

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
   - Coordinate, Distance, Azimuth, and Traverse Closure readouts MUST use monospace (\`IBM Plex Mono\` / \`JetBrains Mono\`) with \`tabular-nums\` and \`letter-spacing: 0.04em\`.
   - UI chrome and labels use Latin-First \`Geist\` or \`Inter\`, paired with \`IBM Plex Sans Thai\` (Body line-height \`1.7–1.8\`, \`letter-spacing: 0\`, diacritic headroom $\\ge 4$px).
3. **Cockpit Color Palette & ISA-101 Situational Awareness:**
   - Dark Slate \`#0a0d14\` canvas background prevents eye fatigue during continuous operational shifts.
   - Surface Raised \`#141721\`, Surface Inset \`#090a0f\`.
   - 1px Hairline Borders (\`rgba(255, 255, 255, 0.09)\`) on all in-flow cards with zero fake drop-shadows. Dark mode elevation achieved via luminance (+2% to +4% L).
   - Survey Electric Cyan \`oklch(0.85 0.18 198)\` (#00f5fb) for primary active controls and vector geometries.
   - Precision Green \`oklch(0.72 0.18 145)\` strictly reserved for verified closures, fixed GPS status, and valid tolerances ($1\\sigma < 5\\text{mm}$).
   - Warning Amber \`oklch(0.78 0.16 75)\` for float solutions, high HDOP, or tolerance drift.
   - Critical Crimson \`oklch(0.62 0.22 25)\` for boundary collisions or hardware telemetry loss.
4. **Motion Profile (Precision):**
   - Sub-second \`precision\` profile (120ms entry, 90ms exit, \`cubic-bezier(0.16, 1, 0.3, 1)\`).
   - Coordinate updates and map point inspection respond instantly without physics bounces.
5. **Layout Architecture (3-Pane Cockpit):**
   - 100dvh viewport canvas layout with top coordinate command deck, left layer filter rail, center spatial map/vector canvas, and right docked telemetry inspector with collapsible bottom traverse closure table.
`;

// 3. Updated presets/metha/preset.json
const methaPresetJsonV2 = {
  "$schema": "../schema.json",
  "id": "metha",
  "name": "Metha Engineering & Geoinformatics Cockpit",
  "version": "1.2.0",
  "archetype": "Archetype 38: Cadastral Survey & Mission-Critical QA/QC Workbench (Archetype 32: GIS Situation Awareness)",
  "description": "World-class mission-critical telemetry & geodetic engineering preset: high-density cadastral tables, 8pt optical grid, Geist + IBM Plex Mono tabular coordinates, deep slate/obsidian canvas, and electric cyan/precision green accents.",
  "typography": {
    "display": "'Geist', 'Inter', sans-serif",
    "sans": "'Geist', 'IBM Plex Sans Thai', sans-serif",
    "mono": "'IBM Plex Mono', 'JetBrains Mono', monospace",
    "headingTracking": "-0.020em",
    "uiLineHeight": "1.25",
    "proseLineHeight": "1.70",
    "thaiHeadroom": "4px"
  },
  "color": {
    "canvas": "#0a0d14",
    "surfaceRaised": "#141721",
    "surfaceInset": "#090a0f",
    "borderSubtle": "rgba(255, 255, 255, 0.09)",
    "borderFocus": "oklch(0.85 0.18 198)",
    "accent": "oklch(0.85 0.18 198)",
    "accentForeground": "#0a0d14",
    "status": {
      "info": "oklch(0.85 0.18 198)",
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
    "durationEntry": "120ms",
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

// 4. Updated references/brand-design-tokens.md
const brandTokensContentV2 = `# Brand Design System Intelligence (Awesome DESIGN.md)

คลังมาตรฐานสถาปัตยกรรมและโทเค็นการออกแบบจาก **74 แบรนด์ระดับโลก & Presets มาตรฐาน** สำหรับใช้ร่วมกับโหมด \`/medesign like <แบรนด์>\` หรือ \`/medesign <แบรนด์>\`

## Available Brands (74 Brands)

- **Mission-Critical Engineering & Telemetry:** \`metha\` (Cadastral & GIS Cockpit, ISA-101 Situational Awareness, Deep Slate \`#0a0d14\`, Hairline \`rgba(255,255,255,0.09)\`, Electric Cyan \`oklch(0.85 0.18 198)\`, Tabular Mono)
- **Developer Tools & SaaS:** \`linear.app\`, \`stripe\`, \`vercel\`, \`supabase\`, \`raycast\`, \`posthog\`, \`resend\`, \`sentry\`, \`warp\`, \`hashicorp\`, \`mintlify\`, \`clickhouse\`, \`mongodb\`, \`cursor\`, \`expo\`, \`sanity\`, \`composio\`, \`airtable\`, \`cal\`, \`clay\`, \`opencode.ai\`, \`lovable\`
- **AI & LLM Platforms:** \`claude\`, \`elevenlabs\`, \`mistral.ai\`, \`together.ai\`, \`x.ai\`, \`replicate\`, \`runwayml\`, \`cohere\`, \`minimax\`, \`ollama\`, \`voltagent\`
- **Productivity & Collaboration:** \`notion\`, \`figma\`, \`framer\`, \`webflow\`, \`miro\`, \`slack\`, \`superhuman\`, \`zapier\`, \`intercom\`
- **Consumer & Tech Giants:** \`apple\`, \`airbnb\`, \`spotify\`, \`uber\`, \`nike\`, \`tesla\`, \`spacex\`, \`playstation\`, \`meta\`, \`nvidia\`, \`pinterest\`, \`shopify\`, \`starbucks\`, \`ibm\`, \`hp\`, \`dell-1996\`, \`vodafone\`
- **Auto & Luxury:** \`bmw\`, \`bmw-m\`, \`ferrari\`, \`lamborghini\`, \`bugatti\`, \`renault\`
- **Fintech & Crypto:** \`coinbase\`, \`revolut\`, \`wise\`, \`mastercard\`, \`kraken\`, \`binance\`
- **Media:** \`theverge\`, \`wired\`, \`nintendo-2001\`

## How to Apply a Brand Design System

เมื่อผู้ใช้สั่งออกแบบตามแบรนด์ (เช่น \`/medesign like linear\`, \`/medesign like stripe\`, \`/medesign metha\`):

1. **ลำดับการค้นหาไฟล์สเปก (Resolution Hierarchy & Fallback):**
   - **Preset ภายในระบบ:** หากเป็น \`metha\`, \`apple\`, \`tesla\` ให้อ่านจาก \`presets/<name>/guidelines.md\` และ \`presets/<name>/design-tokens.css\`
   - **Upstream Cache:** หากมีโฟลเดอร์ \`awesome-design-md-src/design-md/<brand>/DESIGN.md\` ให้อ่านสเปกจากไฟล์ดังกล่าว
   - **Live Extraction Fallback:** หากไม่มีไฟล์ในเครื่อง ให้เรียกโหมด \`/medesign extract <url>\` เพื่อสกัดโทเค็นสดจากเว็บไซต์ของแบรนด์ หรือสังเคราะห์จาก Core Archetype ประจำแบรนด์

2. **ดึงโทเค็นหลัก 4 เลเยอร์:**
   - **Colors:** สี Canvas, Surface, Hairline, และ Accent หลัก (เช่น Linear Dark \`#08090a\`, Supabase Emerald, Metha Electric Cyan \`#00f5fb\`)
   - **Typography:** คู่ฟอนต์ละติน-ไทย และ Line-height (เช่น Linear ใช้ \`Geist\` + \`Noto Sans Thai\`)
   - **Component Geometry:** รัศมีขอบ Concentric Radii และขนาดปุ่มตาม Control Ladder
   - **Lighting & Surface:** ใช้เส้น Hairline 1px และยกเลิกเงาดำฟุ้งบนการ์ด In-flow ทั้งหมด

3. **Brand-to-Layout Pairing Matrix (เฉพาะงาน App & Dashboard):**
   > [!IMPORTANT]
   > **ลำดับความสำคัญ:** สิ่งที่ผู้ใช้ระบุใน Brief Intake ชนะ Pairing Matrix นี้เสมอ และ Pairing Matrix มีผลบังคับเฉพาะงานประเภท Web Application, Dashboard, และ Cockpit เท่านั้น (หากเป็น Landing Page, Blog, หรือ Marketing ให้ใช้ Layout มาตรฐานของหน้านั้นๆ)

   - **Metha / Engineering Telemetry:** 3-Pane Cockpit Architecture (Top coordinate command deck, Left layer rail, Center spatial canvas, Right precision telemetry inspector & traverse table).
   - **BMW / Tesla / Automotive:** 3-Pane Cockpit Architecture (Top Command Deck, Left Telemetry/Filmstrip, Center Canvas, Right Docked Inspector).
   - **Linear / Raycast / DevTools:** Split Navigation Rail + Command Palette (Cmd+K) + High-density tabular grid with instant inline actions.
   - **Apple / Consumer Luxury:** Floating Frosted Glass Header + Generous Asymmetric Bento + Floating Action Capsules + Concentric Card Physics.
   - **Stripe / Fintech:** Seamless Multi-step Flow + Sticky Progress Summary on right + Clean Form Fields with micro-glow focus.
   - **Notion / Productivity:** Full-bleed distraction-free canvas + Side peek drawer + Minimalist Slash command menu.
`;

// 5. Updated SKILL.md
const skillContentV2 = `---
name: medesign
description: "ออกแบบ UI/UX เว็บ/แอป และสื่อกราฟิกครบวงจร (สไลด์ แบนเนอร์ โลโก้) — ใช้เมื่อสร้างเว็บ สไลด์ หรือสื่อนำเสนอ (Curated UI/UX & Graphic design suite: slides, banners, mockups, brand tokens)"
---

# ME-DESIGN: Personal & Production UI/UX Design Engine (\`/medesign\`)

ระบบสถาปัตยกรรมการออกแบบ UI/UX และสื่อกราฟิกมาตรฐานสากล รองรับ 74 แบรนด์ดัง และ 38 Argon Archetypes พร้อมระบบ Brief Intake, Anti-AI Invariants และ Deterministic Auto-Compiler

---

> **Router Rule:** อ่านเฉพาะไฟล์ที่งานนั้นต้องใช้ และต้องผ่าน \`references/quality-gate.md\` ก่อนส่งงานเสมอ

## 1. Routing Table

| หมวดงาน / คำสั่ง | ไฟล์อ้างอิงที่ต้องอ่าน (Sequential Flow) |
|---|---|
| **สร้างใหม่จากศูนย์** (\`/medesign new\`) | \`references/brief-intake.md\` -> \`references/design-core.md\` -> \`references/quality-gate.md\` |
| **แก้/รีดีไซน์ของเดิม** (\`/medesign revamp\`) | \`references/brief-intake.md\` -> \`references/redesign-audit.md\` -> \`references/quality-gate.md\` |
| **อ้างอิงเว็บดัง** (\`/medesign like [url/แบรนด์]\`) | \`references/brief-intake.md\` -> \`references/style-extraction.md\` -> \`references/design-core.md\` -> \`references/quality-gate.md\` |
| **เทมเพลตคำสั่ง 3 โหมด** | \`references/prompt-templates.md\` |
| **ตรวจดีไซน์ / สแกน AI Tells** (\`/medesign audit\`) | \`references/redesign-audit.md\` -> \`references/quality-gate.md\` |
| **ขัดเกลาโค้ดอัตโนมัติ** (\`/medesign polish [path]\`) | รัน \`node bin/medesign.js polish [path]\` (Auto-Heal Hard Invariants) |
| **สไลด์นำเสนอ Interactive** (\`/medesign --slides\`) | \`references/slides.md\` |
| **รายงานบริหาร (Executive PDF)** (\`/medesign --report\`) | \`references/executive-reports.md\` (สถาปัตยกรรม 8+4 Consulting Split, 4pt Baseline) |
| **ตัวพิมพ์ไทย-ละติน & Font Pairs** | \`references/typography-thai-latin.md\` (Latin-first, Thai leading 1.7–1.8, tracking 0) |
| **คลัง 74 แบรนด์ระดับโลก & Presets** | \`references/brand-design-tokens.md\` (Linear, Apple, Stripe, Tesla, Metha) |
| **38 Argon Archetypes & 5-Axis Matrix** | \`references/argon-design-archetypes.md\` -> \`references/quality-gate.md\` |
| **11 Modern Craft Invariants** | \`references/modern-craft-invariants.md\` (Closed Spacing, Control Ladder, Concentric Radii) |
| **คำสั่งสร้างภาพต้นแบบ (Mockup)** | \`references/image-mockup-direction.md\` (\`/medesign mockup [web/mobile]\`) |
| **แปลงภาพ Mockup เป็นโค้ด** | \`references/image-to-code.md\` (\`/medesign to-code\`) -> \`references/quality-gate.md\` |
| **ถอดสไตล์เป็น Token เท่านั้น** | \`references/style-extraction.md\` (\`/medesign extract [url/desc]\`) |
| **แบนเนอร์ โฆษณา ปกโซเชียล** | \`references/banner-sizes-and-styles.md\` (\`/medesign --banner\`) |
| **ภาพถ่ายและกราฟิกโซเชียล** | \`references/social-photos-design.md\` (\`/medesign --social\`) |
| **ออกแบบโลโก้ AI & CIP** | \`references/logo-design.md\` + \`references/cip-design.md\` |
| **ไอคอน SVG & Icon Sets** | \`references/icon-design.md\` (\`/medesign --icon\`) |
| **ชิ้นส่วน / Modal เฉพาะจุด** | \`references/components.md\` |
| **ปรับปรุงเว็บเก่า (Retrofit 3-Tier)** | \`references/web-retrofit-protocol.md\` -> \`references/quality-gate.md\` |
| **ความสมูท 120fps & Motion** | \`references/compositor-smoothness.md\` + \`references/motion-tokens.md\` |
| **สไตล์ Preset ระดับโลก** (\`apple\` / \`tesla\` / \`metha\`) | \`presets/{name}/guidelines.md\` + \`presets/{name}/design-tokens.css\` |
| **รัน Test Suite & Browser Audit** | \`node tests/runner.js\` หรือ \`node tests/browser-audit.js\` |

---

## 2. ลำดับความสำคัญในการเลือกโหมด (Mode Precedence Hierarchy)

> [!IMPORTANT]
> 1. **คำสั่งชัดเจนชนะทุกกรณี:** \`/medesign new\`, \`/medesign revamp\`, \`/medesign like\` ข้ามการเดาทั้งหมด แล้วเข้าสู่ \`references/brief-intake.md\` ทันที
> 2. **การอนุมานเมื่อไม่ได้ระบุโหมด:**
>    - มี URL หรือชื่อแบรนด์ที่มีคำขยาย (เช่น เหมือน, สไตล์, แบบ, like) -> โหมด \`like\` (ห้ามส่งเข้า \`audit\`)
>    - มีไฟล์เดิมหรือโค้ดเดิมแนบมา (และไม่ได้ระบุว่าทำใหม่หมด) -> โหมด \`revamp\`
>    - ผู้ใช้ระบุว่า "ทำใหม่หมด" หรือไม่มีทั้งไฟล์และแบรนด์ -> โหมด \`new\`
> 3. **โหมด \`audit\`:** ใช้สำหรับตรวจจับจุดบกพร่อง/AI Tells ในหน้าเดิมเท่านั้น (เมื่อพิมพ์ \`/medesign audit\` หรือถูกเรียกต่อจาก \`revamp\`)
> 4. **Cockpit Modal:** เมื่อสั่ง \`/medesign\` เปล่าๆ ให้เปิด \`ask_question\` ให้เลือกหมวดหมู่งาน (หรือถาม 3 ทางเลือกในแชตหากระบบไม่มี modal)

---

## 3. Dedicated Commands & Headless Shortcuts

| คำสั่ง | ผลลัพธ์และการทำงาน |
|---|---|
| \`/medesign new\` | ออกแบบ UI ใหม่จากศูนย์ ผ่าน Brief Intake Gate (เสนอ Direction A/B) |
| \`/medesign revamp\` | แก้ไข/รีดีไซน์ UI เดิม ปรับ Layout & Spacing โดยคง Business Logic เดิม |
| \`/medesign like [url/แบรนด์]\` | อ้างอิงสุนทรียภาพจากเว็บดัง/แบรนด์ (คำสั่งหลัก Canonical) |
| \`/medesign [brand]\` | Alias สะดวกของ \`/medesign like [brand]\` (เช่น \`/medesign linear\`, \`/medesign apple\`, \`/medesign metha\`) |
| \`/medesign extract [url]\` | ถอด Style Tokens จากภาพหรือ URL เก็บเป็น CSS Variables โดยไม่สร้างหน้าเว็บ |
| \`/medesign audit [path]\` | ตรวจจับ AI Tells, สแกน Accessibility, Spacing และคืนคะแนน Q-Score |
| \`/medesign polish [path]\` | ซ่อมโค้ดอัตโนมัติ (Invariants, Google Fonts, Bento CSS, OKLCH, 44px Halo) |
| \`/medesign bolder [path]\` | เพิ่มความคมชัดและน้ำหนักภาพ (Increase contrast, border weight, accent vibrance) |
| \`/medesign quiet [path]\` | ลดทอนสู่ความมินิมอล (Decrease weight, hairline borders, muted tones) |
| \`/medesign snapshot [path]\` | จับภาพเรนเดอร์จริงระดับ High-DPI (Mobile, Tablet, Desktop, OG 1200x630) ด้วย CDP |
| \`/medesign metha\` | **Metha Telemetry Cockpit (Archetype 38)** — สไตล์วิศวกรรมรังวัดและโทรมาตร (3-Pane Cockpit, Tabular Mono, Dark Slate, Electric Cyan) |

---

## 4. Execution Protocol (5 ขั้นตอนมาตรฐาน)

1. **Step 0 — Brief Intake Gate (\`references/brief-intake.md\`):**
   - บรรทัดแรกของคำตอบต้องประกาศ \`โหมด: new\` (หรือ \`revamp\` / \`like\`) เสมอ
   - สรุป Brief 5 ช่อง และเสนอ 2 ทิศทางสั้นๆ (Direction A ใกล้ brief / Direction B ต่างชัดเจน ไม่เกิน 5 บรรทัดต่อทิศทาง)
   - *One-Shot Alignment:* หาก Brief ครบแล้ว ให้เสนอทิศทางทันทีในข้อความแรก; หากไม่ครบ ให้ถาม $\\le 3$ คำถาม พร้อม Direction ชั่วคราวในรอบเดียว
   - *Escape Hatch:* ข้ามได้ทันทีเมื่อผู้ใช้ระบุ "ลุยเลย", "skip intake" หรือแก้งานระดับ Micro-component ("จุดเล็ก")
   - *Tool Fallback:* หากไม่มี \`ask_question\` ให้ถามข้อความธรรมดาในแชต; หากไม่มี Node CLI ให้ตรวจทานด้วย 11 Craft Checklist ด้วยตนเอง
2. **Step 1 — Triage Stack:** ตรวจสอบเทคโนโลยีปลายทาง (Tailwind, Pure CSS, React, Next.js, HTML)
3. **Step 2 — Token Injection:**
   - **Neutral Craft (Default):** อ้างอิง 74 แบรนด์ หรือ 38 Archetypes และ Closed Spacing (2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px)
   - **Personal DNA Sync:** ซิงก์โปรเจกต์ MESURV / MeBoard เฉพาะเมื่อรันใน Workspace \`D:/METHA/\` หรือเมื่อสั่ง \`/medesign auto\`
4. **Step 3 — Build & Deliver:** ส่งโค้ดที่สมบูรณ์ ไร้ Placeholders พร้อมรายงาน Visual Highlights สั้นๆ
5. **Step 4 — Quality Gate:** ตรวจสอบกับ \`references/quality-gate.md\` (Squint Test, Grayscale, 10-State Matrix) ปิดท้ายด้วย \`Gate: quality-gate.md - pass\` เสมอ
`;

// Apply to all repos
repos.forEach(repo => {
  fs.writeFileSync(path.join(repo, 'references/brief-intake.md'), briefIntakeV2, 'utf8');
  fs.writeFileSync(path.join(repo, 'presets/metha/guidelines.md'), methaGuidelinesV2, 'utf8');
  fs.writeFileSync(path.join(repo, 'presets/metha/preset.json'), JSON.stringify(methaPresetJsonV2, null, 2), 'utf8');
  fs.writeFileSync(path.join(repo, 'references/brand-design-tokens.md'), brandTokensContentV2, 'utf8');
  fs.writeFileSync(path.join(repo, 'SKILL.md'), skillContentV2, 'utf8');
  console.log(`Applied clean updates to: ${repo}`);
});

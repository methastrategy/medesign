---
name: medesign
description: "ออกแบบ UI/UX เว็บ/แอป และสื่อกราฟิกครบวงจร (สไลด์ แบนเนอร์ โลโก้) — ใช้เมื่อสร้างเว็บ สไลด์ หรือสื่อนำเสนอ (Curated UI/UX & Graphic design suite: slides, banners, mockups, brand tokens)"
---

# ME-DESIGN: Personal Curated UI/UX & Graphic Design Engine (`/medesign`)

สุดยอดสตูดิโอออกแบบ UI/UX และสื่อกราฟิกส่วนตัว สังเคราะห์กฎจาก 21+ แบรนด์ดัง พร้อมระบบตรวจสอบ Anti-AI Redesign, Image Mockup Art Direction, Image-to-Code, สไลด์พรีเซนต์, แบนเนอร์, โลโก้ AI และ DNA ส่วนตัว

---

> Router: read ONLY what the task needs. `quality-gate.md` is MANDATORY before delivering any UI.

## Routing

| Task | Read |
|---|---|
| สร้าง/ยกเครื่อง UI (default) | `references/design-core.md` -> `build` -> `references/quality-gate.md` |
| รีดีไซน์หน้าเดิม / ตรวจจับ AI Tells | `references/redesign-audit.md` (หรือ `/medesign audit`) -> `references/quality-gate.md` |
| เจนคำสั่งสร้างภาพต้นแบบเว็บ & มือถือ | `references/image-mockup-direction.md` (หรือ `/medesign mockup`) |
| แปลงภาพต้นแบบ/Mockup เป็นโค้ด | `references/image-to-code.md` (หรือ `/medesign to-code`) -> `references/quality-gate.md` |
| ทำ component / modal เฉพาะจุด | `references/components.md` |
| งานใน MESURV หรือโปรเจกต์ MeBoard | เพิ่ม `references/mesurv-dna.md` |
| สไลด์นำเสนอ & Pitch Decks | `references/slides.md` (หรือ `/medesign --slides`) |
| แบนเนอร์ โฆษณา ปกเพจ/โซเชียล | `references/banner-sizes-and-styles.md` (หรือ `/medesign --banner`) |
| ภาพถ่ายและกราฟิกโซเชียลมีเดีย | `references/social-photos-design.md` (หรือ `/medesign --social`) |
| ออกแบบโลโก้ AI & Style Guide | `references/logo-design.md` (หรือ `/medesign --logo`) |
| Corporate Identity (CIP) & นามบัตร | `references/cip-design.md` (หรือ `/medesign --cip`) |
| ไอคอน SVG และชุด Icon Sets | `references/icon-design.md` (หรือ `/medesign --icon`) |
| ต้องการคำศัพท์/แนวคิดสไตล์เพิ่ม | `references/vocab-protocol.md` -> `references/ui-ux-vocabulary-vault.md` |
| ถอดสไตล์จากภาพ/URL เป็น token | `references/style-extraction.md` (หรือ `/medesign extract`) |
| เว็บตามสไตล์แบรนด์ดัง / โหมดอัตโนมัติ | `/medesign brand` · `/medesign auto` |
| สไตล์ minimalist / brutalist / soft | อ่าน `references/styles/{minimalist|brutalist|soft}.md` -> `references/quality-gate.md` |
| กฎเหล็ก Anti-AI-Tells | `references/ai-tells.md` -> `references/quality-gate.md` |
| ดึงโทเค็น 73 แบรนด์ดัง (Linear, Apple, Stripe) | `references/brand-design-tokens.md` |
| สเปก shadcn/ui & Radix UI styling | `references/ui-styling-shadcn.md` |
| ขัดเกลา UI ให้เนี๊ยบ (Impeccable Polish) | `references/impeccable-polish.md` |
| 3D / WebGL Landing / Spatial Background | `references/threeui-spatial-engine.md` -> `references/quality-gate.md` |
| Motion Tokens & Tactile Easing | `references/motion-tokens.md` |
| สร้างหรืออ่านคู่มือดีไซน์โปรเจกต์ (DESIGN.md) | `references/design-md-protocol.md` |
| แอนิเมชันลื่นไหล & Micro-Interactions (AutoAnimate) | `references/micro-interactions-and-auto-animate.md` |
| Infinite Spatial Canvas & Viewport Virtualization | `references/spatial-canvas-engine.md` |
| 38 Archetypes ระดับโลก (30 Visual + 8 Engineering) & 5-Axis Matrix | `references/argon-design-archetypes.md` -> `references/quality-gate.md` |
| 11 กฎเหล็ก Apple Design Award & CSS 2026 Invariants | `references/modern-craft-invariants.md` -> `references/quality-gate.md` |
| สไตล์ Preset พิเศษ (`metha` / `apple` / `tesla`) | อ่าน `presets/{metha|apple|tesla}/guidelines.md` + `presets/{name}/design-tokens.css` |
| รัน Deterministic Test Suite & Browser Matrix Audit | `node tests/runner.js [--browser]` หรือ `node tests/browser-audit.js` |

---

## ⚡ Skill Workflow & Dedicated Commands

| คำสั่ง | พฤติกรรม |
|:---|:---|
| `/medesign` | **เปิด `ask_question` Modal** ให้เลือก Archetype ก่อน แล้ว Render ตาม DNA ผู้ใช้ |
| `/medesign auto` | ใช้ **Locked DNA Profile** ทันที — MESURV Fusion & MeBoard FINAL-01/02 |
| `/medesign audit` | **ตรวจและวางแผนรีดีไซน์เว็บเดิม** กำจัด AI Tells, ปรับฟอนต์ สี และ Spacing |
| `/medesign --brand` | **ออกแบบอัตลักษณ์แบรนด์** โทนเสียง (Voice & Tone) และสไตล์ไกด์การสื่อสาร |
| `/medesign --tokens` | **ออกแบบ 3-Layer Design Tokens** (Global $\to$ Semantic $\to$ Component) และ CSS Variables |
| `/medesign --slides [topic]` | **สร้างสไลด์ Interactive HTML** พร้อม Chart.js, Duarte Sparkline และ Layout Patterns |
| `/medesign --banner [platform]` | **ออกแบบแบนเนอร์/ภาพปก** สำหรับ Facebook, Ads, เว็บ พร้อม Preset ขนาดมาตรฐาน |
| `/medesign --social [channel]` | **ออกแบบกราฟิกโซเชียลมีเดีย** (IG, FB, LinkedIn, Twitter) พร้อม Visual Composition |
| `/medesign --logo [brand]` | **สร้างโลโก้ AI และ Color Psychology** 55+ สไตล์ และ Color Palettes |
| `/medesign --cip [brand]` | **จัดทำ Corporate Identity Program (CIP)** ม็อคอัพ นามบัตร เอกสารนำเสนอ |
| `/medesign --icon [name]` | **สร้างไอคอน SVG แบบคมชัด** ทั้งสไตล์ Line, Solid, Duotone และ Pixel-Perfect |
| `/medesign mockup [web\|mobile]` | **สร้างคำสั่งสร้างภาพต้นแบบ** แบบ Section-by-section (เว็บ) หรือ Native Screen (มือถือ) |
| `/medesign to-code` | **แปลงภาพ Mockup เป็นโค้ดจริง** แบบ High-Fidelity สอดคล้องกับ Tailwind / shadcn |
| `/medesign extract [url/desc]` | **ถอดสไตล์จากเว็บหรือภาพที่ชอบ** แปลงเป็น Token DNA & Mockup |
| `/medesign metha` | **ใช้ลายเซ็นวิศวกรรมส่วนตัว Metha Cockpit** — ผสานรังวัดที่ดิน, GIS Telemetry (Archetype 32 & 38), 8pt Grid, Inter + IBM Plex Mono Tabular, Charcoal Canvas |
| `/medesign apple` | **ใช้สไตล์ Apple Human Interface** — Product Showcase, Concentric Radii, Frosted Vibrancy, Pill Buttons, Soft-Settle Motion |
| `/medesign tesla` | **ใช้สไตล์ Tesla Telemetry** — Industrial Brutalism, Razor-Sharp 4px/2px Chamfer, Obsidian Canvas, Precision 100ms Motion |
| `/medesign test [--browser]` | **รัน Deterministic Test Suite** — ตรวจสอบทั้ง Static AST และ Headless Chromium Matrix (Mobile/Tablet/Desktop × Dark/Light) |
| `/medesign compare` | **เปิด Blind Testbed Lab** — เปรียบเทียบ Visual Craft 5 มิติ (`tests/visual-testbed.html`) |
| `/medesign lint [path]` | **รัน Linter ตรวจจับ Hard Invariants**, สกัดกั้น AI Slop และคำนวณคะแนน $Q$-Score |
| `/medesign search [query]` | **ค้นหา 38 Archetypes และ Presets** ด้วย Node.js Discovery Engine พร้อม Terminal Summary Card |
| `/medesign polish [path]` | **ซ่อมโค้ดอัตโนมัติ (Self-Healing)** แก้ไข Hard Invariants (MD005, MD104, MD106 boundary clearance, em-dash, dead buttons) |
| `/medesign bolder [path]` | **เพิ่มความคมชัดและน้ำหนักภาพ** เพิ่ม font-weight, ความเข้ม border, และความสดของ Accent |
| `/medesign quiet [path]` | **ลดทอนความจัดจ้านสู่ Minimalist** ลด font-weight, เปลี่ยนเส้นขอบเป็น Hairline, ลดความสดสี |
| `/medesign snapshot [path]` | **จับภาพหน้าจอเรนเดอร์จริงระดับ High-DPI** (Mobile, Tablet, Desktop, หรือ `--og` 1200x630) ด้วย Headless CDP |
| `/medesign [brand]` | ใช้ Token ของแบรนด์ระดับโลกตรงๆ เช่น Linear, Vercel, Apple, Stripe *(73+ แบรนด์)* |

---

## 🧬 Design Engine vNext (5 Engines & User DNA)

> ค่า Tokens เต็ม: `user-profile.json` (หรืออ้างอิงจาก `references/brand-design-tokens.md`)

- **01 Optical Geometry Engine:** Safe Concentric (`max(0px, r_outer - border_w - pad)`), Boundary Clearance (`MD106`: Transparent Touch Halo สำหรับ Slider และ $\ge 12$px Optical Padding), Full Pill (`calc(var(--h) / 2)` หรือ `@property` สำหรับ Morphing), Area-Proportional Scaling (`clamp(0.96, 1 - 2.5/max(W,H), 0.995)` โดยแยก Hit Target 44px ออกจาก Visual Surface)
- **02 Perceptual Color Engine:** Perceptual Intent rules (`in oklch shorter hue` สำหรับรักษาความสด, `in oklab` สำหรับเกลี่ยความสว่าง/Neutral, Midpoint testing 25/50/75%), `color-mix()` token derivation, Functional Dark Mode Tokens (`surface-canvas`, `surface-raised`, `surface-inset`, `border-subtle`, `border-focus`), OLED Pure Black `#000000`
- **03 Motion & Interaction Engine:** 4 Motion Profiles (`precision` 0-100ms, `soft-settle` 240-280ms, `spring-settle`, `instant` 0ms), Asymmetric Entry/Exit ($0.65\times$ e.g. 280ms/180ms), `@media (prefers-reduced-motion: reduce)` compliance, CSS Anchor Positioning + Popover API + `@starting-style`
- **04 Typography & Script Engine:** Dual-Context Line-Height (UI Chrome `1.25/1.38` + `@supports (text-box: trim-both...)` + Thai Diacritic Headroom 2-4px, Prose `1.60/1.72`), `@font-face` `size-adjust` calibration, Heading Tracking `-0.025em`
- **05 Design Quality & Anti-Slop Auditor:** 4-Tier Quality Governance (Hard Invariants -> Soft Heuristics -> Progressive Enhancements -> Domain Rules), Complete Semantic State Contract (6 สถานะ), Zero AI Slop (ป้องกัน Decisionless Uniformity, ตรวจสอบ Information Architecture ก่อนสร้าง Layout)
- **Spatial 3D & Telemetry:** Dynamic Island capsule + Floating telemetry dock + 100dvh viewport map canvas + WebGL `frameloop="demand"` (0W idle, VRAM $\le 32\text{MB}$)

---

## 📚 Brand Knowledge Base

- **Design Spec 21 แบรนด์:** `references/brand-design-tokens.md` (หรือ Local Project Design Specs)
- **คลัง 70+ แบรนด์ระดับโลก:** `references/brand-design-tokens.md` (Linear, Apple, Stripe, Vercel, Supabase, ฯลฯ)

---

## 🔧 Execution Protocol

1. **Triage Stack:** ตรวจสอบ Stack (Tailwind, HTML, React, Next.js)
2. **Workflow Mode:** Plain `/medesign` (Modal), `/medesign auto`, `/medesign audit`, `/medesign mockup`, `/medesign to-code`, หรือ `/medesign extract`
3. **Token Injection:** อ่าน `user-profile.json` + แบรนด์ที่เลือก + บังคับใช้ Anti-AI-Tells Protocol
4. **Build & Deliver:** ส่งโค้ดสมบูรณ์ + Visual Highlights brief
5. **Quality Gate:** อ่าน `references/quality-gate.md`, ปิดท้ายคำตอบด้วย `Gate: quality-gate.md - pass` หรือ `Gate: quality-gate.md - fixed N` เสมอ

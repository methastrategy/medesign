---
name: medesign
description: "ออกแบบ UI/UX เว็บ/แอป และสื่อกราฟิกครบวงจร (สไลด์ แบนเนอร์ โลโก้) — ใช้เมื่อสร้างเว็บ สไลด์ หรือสื่อนำเสนอ (Curated UI/UX & Graphic design suite: slides, banners, mockups, brand tokens)"
---

# ME-DESIGN: Personal & Production UI/UX Design Engine (`/medesign`)

ระบบสถาปัตยกรรมการออกแบบ UI/UX และสื่อกราฟิกมาตรฐานสากล รองรับ 74 แบรนด์ดัง และ 38 Argon Archetypes พร้อมระบบ Brief Intake, Anti-AI Invariants และ Deterministic Auto-Compiler

---

> **Router Rule:** อ่านเฉพาะไฟล์ที่งานนั้นต้องใช้ และต้องผ่าน `references/quality-gate.md` ก่อนส่งมอบโค้ดเสมอ

## 1. Routing Table

| หมวดงาน / คำสั่ง | ไฟล์อ้างอิงที่ต้องอ่าน (Sequential Flow) |
|---|---|
| **สร้างใหม่จากศูนย์** (`/medesign new`) | `references/brief-intake.md` -> `references/design-core.md` -> `references/quality-gate.md` |
| **แก้/รีดีไซน์ของเดิม** (`/medesign revamp`) | `references/brief-intake.md` -> `references/redesign-audit.md` -> `references/quality-gate.md` |
| **อ้างอิงเว็บดัง** (`/medesign like [url/แบรนด์]`) | `references/brief-intake.md` -> (`brand-design-tokens.md` หรือ `style-extraction.md`) -> `references/design-core.md` -> `references/quality-gate.md` |
| **เทมเพลตคำสั่ง 3 โหมด** | `references/prompt-templates.md` |
| **ตรวจดีไซน์ / สแกน AI Tells** (`/medesign audit`) | `references/redesign-audit.md` -> `references/quality-gate.md` |
| **ขัดเกลาโค้ดอัตโนมัติ** (`/medesign polish [path]`) | รัน `node bin/medesign.js polish [path]` (Auto-Heal Hard Invariants) |
| **สไลด์นำเสนอ Interactive** (`/medesign slides`) | `references/slides.md` (รับทั้ง `slides` และ `--slides`) |
| **รายงานบริหาร (Executive PDF)** (`/medesign report`) | `references/executive-reports.md` (รับทั้ง `report` และ `--report`) |
| **ตัวพิมพ์ไทย-ละติน & Font Pairs** | `references/typography-thai-latin.md` (Latin-first, Thai leading 1.7–1.8, tracking 0) |
| **คลัง 74 แบรนด์ระดับโลก & Presets** | `references/brand-design-tokens.md` (Linear, Apple, Stripe, Tesla, Metha) |
| **38 Argon Archetypes & 5-Axis Matrix** | `references/argon-design-archetypes.md` -> `references/quality-gate.md` |
| **11 Modern Craft Invariants** | `references/modern-craft-invariants.md` (Closed Spacing, Control Ladder, Concentric Radii) |
| **คำสั่งสร้างภาพต้นแบบ (Mockup)** | `references/image-mockup-direction.md` (`/medesign mockup [web/mobile]`) |
| **แปลงภาพ Mockup เป็นโค้ด** | `references/image-to-code.md` (`/medesign to-code`) -> `references/quality-gate.md` |
| **ถอดสไตล์เป็น Token เท่านั้น** | `references/style-extraction.md` (`/medesign extract [url/desc]`) |
| **แบนเนอร์ โฆษณา ปกโซเชียล** | `references/banner-sizes-and-styles.md` (`/medesign banner`) |
| **ภาพถ่ายและกราฟิกโซเชียล** | `references/social-photos-design.md` (`/medesign social`) |
| **ออกแบบโลโก้ AI & CIP** | `references/logo-design.md` + `references/cip-design.md` |
| **ไอคอน SVG & Icon Sets** | `references/icon-design.md` (`/medesign icon`) |
| **ชิ้นส่วน / Modal เฉพาะจุด** | `references/components.md` |
| **ปรับปรุงเว็บเก่า (Retrofit 3-Tier)** | `references/web-retrofit-protocol.md` -> `references/quality-gate.md` |
| **ความสมูท 120fps & Motion** | `references/compositor-smoothness.md` + `references/motion-tokens.md` |
| **สไตล์ Preset ระดับโลก** (`apple` / `tesla` / `metha`) | `presets/{name}/guidelines.md` + `presets/{name}/design-tokens.css` |
| **รัน Test Suite & Browser Audit** | `node tests/runner.js` หรือ `node tests/browser-audit.js` |

---

## 2. ลำดับความสำคัญในการเลือกโหมด (Mode Precedence Hierarchy)

> [!IMPORTANT]
> 1. **คำสั่งชัดเจนชนะทุกกรณี:** `/medesign new`, `/medesign revamp`, `/medesign like` ข้ามการเดาทั้งหมด แล้วเข้าสู่ `references/brief-intake.md` ทันที
> 2. **การอนุมานเมื่อผู้ใช้ไม่ได้ระบุโหมด:** ให้อิงตามกฎใน `references/brief-intake.md` §0 เป็นแหล่งข้อมูลเดียว (สรุป: อ้างอิงแบรนด์/สไตล์ -> `like`, มีโค้ดเดิม -> `revamp`, ทำใหม่หมด/ไม่มีทั้งสองอย่าง -> `new`)
> 3. **โหมด `audit`:** ใช้สำหรับตรวจจับจุดบกพร่อง/AI Tells ในหน้าเดิมเท่านั้น (เมื่อสั่ง `/medesign audit` หรือถูกเรียกต่อจาก `revamp`)
> 4. **Cockpit Modal:** เมื่อสั่ง `/medesign` เปล่าๆ ให้เปิด `ask_question` ให้เลือกหมวดหมู่งาน (หรือถาม 3 ทางเลือกในแชตหากระบบไม่มี modal)

---

## 3. Dedicated Commands & Headless Shortcuts

| คำสั่ง | ผลลัพธ์และการทำงาน |
|---|---|
| `/medesign new` | ออกแบบ UI ใหม่จากศูนย์ ผ่าน Brief Intake Gate (เสนอ Direction A/B) |
| `/medesign revamp` | แก้ไข/รีดีไซน์ UI เดิม ปรับ Layout & Spacing โดยคง Business Logic เดิม |
| `/medesign like [url/แบรนด์]` | อ้างอิงสุนทรียภาพจากเว็บดัง/แบรนด์ (คำสั่งหลัก Canonical) |
| `/medesign [brand]` | Alias สะดวกของ `/medesign like [brand]` (เช่น `/medesign linear`, `/medesign apple`, `/medesign stripe`) |
| `/medesign extract [url]` | ถอด Style Tokens จากภาพหรือ URL เก็บเป็น CSS Variables โดยไม่สร้างหน้าเว็บ |
| `/medesign auto` | ใช้ค่า Preset ส่วนตัว (MESURV & MeBoard Cockpit) ทันที |
| `/medesign metha` | **Metha Telemetry Cockpit (Archetype 38)** — สไตล์วิศวกรรมรังวัดและโทรมาตร (3-Pane Cockpit, Tabular Mono, Dark Slate, Electric Cyan) |
| `/medesign audit [path]` | ตรวจจับ AI Tells, สแกน Accessibility, Spacing และคืนคะแนน Q-Score |
| `/medesign polish [path]` | ซ่อมโค้ดอัตโนมัติ (Invariants, Google Fonts, Bento CSS, OKLCH, 44px Halo) |
| `/medesign bolder [path]` | เพิ่มความคมชัดและน้ำหนักภาพ (Increase contrast, border weight, accent vibrance) |
| `/medesign quiet [path]` | ลดทอนสู่ความมินิมอล (Decrease weight, hairline borders, muted tones) |
| `/medesign snapshot [path]` | จับภาพเรนเดอร์จริงระดับ High-DPI (Mobile, Tablet, Desktop, OG 1200x630) ด้วย CDP |

*(หมายเหตุ: คำสั่งหมวดสื่อสามารถเรียกแบบไร้ขีด เช่น `slides`, `report`, `banner`, `logo`, `social`, `icon` หรือแบบมี `--` ก็ได้)*

---

## 4. Execution Protocol (5 ขั้นตอนมาตรฐาน)

1. **Step 0 — Brief Intake Gate (`references/brief-intake.md`):**
   - บรรทัดแรกของคำตอบต้องประกาศ `โหมด: new` (หรือ `revamp` / `like`) เสมอ
   - สรุป Brief 5 ช่อง และเสนอ 2 ทิศทางสั้นๆ (Direction A ใกล้ brief / Direction B ต่างชัดเจน ไม่เกิน 5 บรรทัดต่อทิศทาง)
   - *One-Shot Alignment:* หาก Brief ครบ ให้เสนอทิศทางทันที; หากไม่ครบ ให้ถาม $\le 3$ คำถาม พร้อม Direction ชั่วคราวในรอบเดียว (ผู้ใช้ตอบ "ok" = ยอมรับค่าเริ่มต้น + เลือก A)
   - *Escape Hatch:* ข้ามได้ทันทีเมื่อผู้ใช้ระบุ "ลุยเลย", "skip intake" หรือแก้งานระดับ "จุดเล็ก" (แตะ $\le 1$ ไฟล์ และไม่เปลี่ยน layout/สี/ฟอนต์)
   - *Tool Fallback:* หากไม่มี `ask_question` ให้ถามข้อความธรรมดาในแชต; หากไม่มี Node CLI ให้ตรวจทานด้วย 11 Craft Checklist ด้วยตนเอง
2. **Step 1 — Triage Stack:** ตรวจสอบเทคโนโลยีปลายทาง (Tailwind, Pure CSS, React, Next.js, HTML)
3. **Step 2 — Token Injection:**
   - **Neutral Craft (Default):** อ้างอิง 74 แบรนด์ หรือ 38 Archetypes และ Closed Spacing (2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px)
   - **Personal DNA Sync:** ใช้เมื่อผู้ใช้สั่ง `/medesign auto` หรือ `/medesign metha` เท่านั้น (ห้ามอนุมานจาก path ของเครื่อง)
4. **Step 3 — Build & Deliver:** ส่งโค้ดที่สมบูรณ์ ไร้ Placeholders พร้อมรายงาน Visual Highlights สั้นๆ
5. **Step 4 — Quality Gate:** ตรวจสอบกับ `references/quality-gate.md` (Squint Test, Grayscale, 10-State Matrix) ปิดท้ายด้วย `Gate: quality-gate.md - pass` เสมอ **เฉพาะข้อความที่ส่งมอบโค้ดเท่านั้น** (ข้อความเสนอทิศทาง A/B ไม่ต้องใส่ Gate)

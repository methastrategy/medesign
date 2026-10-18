# DESIGN.md Protocol (Google Stitch Standard)

`DESIGN.md` คือไฟล์ข้อกำหนดดีไซน์ระดับโปรเจกต์ (Plain-Text Design System) วางไว้ที่ Root ของโปรเจกต์ควบคู่กับ `AGENTS.md`:
- `AGENTS.md` กำหนด **"How to Build"** (สถาปัตยกรรมโค้ด, Build steps, Testing harness)
- `DESIGN.md` กำหนด **"How it Looks & Feels"** (Tokens, Typography, Card Anatomy, Anti-AI styling)

---

## 1. วัตถุประสงค์ & ประโยชน์ต่อ AI Agent
1. **Zero Hallucination:** ป้องกันไม่ให้ AI สุ่มสร้างสี, ขนาดฟอนต์ หรือ Padding ที่ไม่สอดคล้องกันข้ามไฟล์
2. **Context-Optimized:** เขียนด้วย Markdown ล้วน กระชับ ประหยัด Token มากกว่าการส่ง JSON สเปกหรือไฟล์รูปภาพ Figma
3. **Single Source of Truth:** เมื่อมีการปรับเปลี่ยน Brand Tokens หรือ Component Spacing ให้แก้ที่ `DESIGN.md` จุดเดียว

---

## 2. โครงสร้างมาตรฐานของ `DESIGN.md` (Project Root Template)

```markdown
# Design System Specification (DESIGN.md)

## 1. Aesthetic Archetype & Direction
- **Archetype:** [Minimalist Clean / Tactical Dense / Editorial Luxury / Neumorphic Soft / Retro Cyber]
- **Mood & Tone:** Professional, fast, low-friction, high-density survey data presentation.
- **Visual Personality:** Sharp 1px borders, subtle frosted backdrops, negative heading tracking.

## 2. Color Palette & WCAG Compliance
- **Surfaces:**
  - Background Base: `#09090b` (Dark) / `#fafafa` (Light) — ห้ามใช้ pure #000000 หรือ #ffffff แบนราบ
  - Surface Elevated: `#141416` (Dark) / `#ffffff` (Light)
  - Surface Border: `rgba(255, 255, 255, 0.08)` (Dark) / `rgba(0, 0, 0, 0.08)` (Light)
- **Accents:**
  - Primary Action / Voltage: `#cc785c` (Terracotta) หรือ `#6366f1` (Indigo)
  - Success: `#10b981` (Emerald)
  - Warning: `#f59e0b` (Amber)
  - Danger: `#ef4444` (Rose Red)
- **Contrast Proof:** ทุกคู่ข้อความและพื้นหลังต้องผ่านเกณฑ์ WCAG AAA (Contrast ratio >= 7:1 สำหรับ Normal text)

## 3. Typography Hierarchy
- **Font Stacks:**
  - Display / Headings: `Instrument Serif`, `Playfair Display`, หรือ Serif italic accents
  - Body / UI: `Plus Jakarta Sans`, `Geist`, หรือ `Inter`
  - Code / Data / Numbers: `Geist Mono`, `JetBrains Mono`
- **Scale:**
  - H1 Hero: `2.25rem` (36px) | weight: 700 | tracking: `-0.03em` | line-height: 1.15
  - H2 Section: `1.5rem` (24px) | weight: 600 | tracking: `-0.025em` | line-height: 1.25
  - H3 Subsection: `1.125rem` (18px) | weight: 600 | tracking: `-0.015em` | line-height: 1.35
  - Body: `0.875rem` (14px) | weight: 400 | tracking: `0em` | line-height: 1.5
  - Caption / Micro: `0.75rem` (12px) | weight: 500 | tracking: `0.02em` | line-height: 1.4

## 4. Component Anatomy & Spatial Scale
- **Grid / Spacing:** 4px base (4, 8, 12, 16, 24, 32, 48, 64px)
- **Border Radius:**
  - Cards & Containers: `8px` (`rounded-lg`) ถึง `12px` (`rounded-xl`)
  - Inputs & Dropdowns: `6px` (`rounded-md`)
  - Primary Action Buttons: `9999px` (`rounded-full` Pill)
  - Status Badges / Tags: `4px` (`rounded`) หรือ `9999px`
- **Shadows & Elevation:**
  - Card Default: `0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)`
  - Card Hover: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
  - Modal: `0 20px 25px -5px rgba(0, 0, 0, 0.2)`

## 5. Anti-AI Visual Tells Checklist
- [ ] ไม่มี Generic Centered Hero พร้อมปุ่มสีม่วงนีออนไล่เฉด (Indigo/Purple gradient cliché)
- [ ] ไม่มีไอคอนลอยกลางการ์ด 3 ช่องที่มีขนาดเท่ากันหมดอย่างไร้ลำดับความสำคัญ
- [ ] มี State ชัดเจน: Hover, Active, Focus-Visible, Disabled, Loading
- [ ] มี Empty State ที่ออกแบบมาเฉพาะจุด พร้อมปุ่ม Action ที่พาไปขั้นตอนต่อไป
- [ ] ใช้ 1px hairline borders (`border-border/40`) แทน Drop Shadow ขนาดใหญ่เกินจริง
```

---

## 3. Workflow การประยุกต์ใช้กับ AI Agent
1. **เมื่อเริ่มโปรเจกต์ใหม่:** รัน `/medesign` เพื่อสังเคราะห์ `DESIGN.md` วางไว้ที่ Root ของโปรเจกต์
2. **เมื่อแก้ไขหรือเพิ่ม Component:** ตรวจสอบค่าสี, Spacing, และ Font จาก `DESIGN.md` เสมอ
3. **เมื่อรีวิวโค้ด UI (`review`):** นำ Checklists ใน `DESIGN.md` มาเป็นเกณฑ์ตรวจรับงาน

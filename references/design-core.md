## 🚫 Non-Bland & Anti-AI-Slop Protocol (ห้ามจืดชืดและห้ามดูเหมือนงาน AI สุกเอาเผากิน)

1. **Zero AI-Slop Negative Prompts (ข้อห้ามเด็ดขาด):**
   - **No Gaudy Gradients:** ห้ามใช้ multi-stop rainbow/neon gradient ทับปุ่มหรือการ์ดมั่วซั่ว (อนุญาตเฉพาะ subtle atmospheric radial glow ≤ 10% opacity)
   - **No Emoji Spam in Headings:** ห้ามใส่ Emoji เรียงหน้าหัวข้อหลัก (`🚀 Features`, `✨ Overview`) ยกเว้นผู้ใช้ระบุหรือเป็น Icon Badge เฉพาะจุด
   - **In-flow vs Floating Surface Rule (No Heavy Drop Shadows):** บัตร/พาเนลบนหน้าเว็บ (In-flow Surfaces) ใช้ขอบ Hairline 1px และ **"ห้ามใส่ Drop Shadow เด็ดขาด"** (เงาสงวนไว้ให้ Floating Popover/Dialog/Modal เท่านั้น) ใน Dark Mode ให้ยกระดับพื้นผิวด้วยความสว่าง Lighter Surface (+2-4% L) แทนเงาดำ
   - **No Colored Border Clutter:** ห้ามตีกรอบสีสด (`border-blue-500`, `border-purple-500`) รอบการ์ดทุกใบ ใช้ hairline border โปร่งแสง (`rgba(..., 0.08–0.15)`) เท่านั้น
   - **No Unnecessary Hover Bounces:** ห้ามทำการ์ดเด้งลอยสูง (`-translate-y-2`, `scale-105`) หรือ Parallax กวนสายตา → จำกัด motion ไม่เกิน `150ms–200ms` (`active:scale-[0.97]` เฉพาะปุ่มกด)
   - **Zero Cliche AI Palette:** ห้ามใช้โทนม่วง-ฟ้า AI มาตรฐาน (`bg-indigo-600` + `bg-purple-600`) หรือขาว-ส้มการตลาดทื่อๆ ที่ไม่ได้มาจาก Brand Token หรือ User DNA
2. **Discrete Spacing & Control Geometry (สเกลปิดและเรขาคณิตควบคุม):**
   - **Closed Spacing System:** ห้ามใช้ gap/margin นอกเหนือจาก `2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128` (สเกลปิดเด็ดขาด $S \in \{2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128\}\text{px}$) ห้ามใช้ arbitrary values เช่น 7px, 11px, 22px
   - **Proximity Ratio ≥ 2:1:** ช่องว่างระหว่างกลุ่มต้องกว้างเป็นอย่างน้อย 2 เท่าของช่องว่างภายในกลุ่มเสมอ ($\text{Gap}_{\text{external}} \ge 2 \times \text{Gap}_{\text{internal}}$)
   - **Control Heights Ladder:** ปุ่ม/อินพุตล็อกที่ `28 / 32 / 36 / 40px` (Desktop) และ `44 / 48px` (Mobile)
   - **Nested Radius Invariant:** บังคับสูตร $r_{\text{outer}} = r_{\text{inner}} + \text{padding}$ ป้องกันมุมโค้งลอย
3. **Typography Discipline:**
   - **Latin-First Rule:** Font Stack ต้องวาง Latin นำหน้า Font ไทยเสมอ (เช่น `Inter, IBM Plex Sans Thai...`)
   - **Thai Calibration:** บังคับ `letter-spacing: 0` สำหรับภาษาไทย (ห้ามใส่ Negative Tracking เพราะวรรณยุกต์จะชนกัน), Line-height สำหรับภาษาไทยต้องอยู่ที่ `1.7–1.8` (Body) และ `≥ 1.3` (Headings)
   - หัวข้อภาษาอังกฤษบีบ `letter-spacing: -0.025em` ถึง `-0.035em`
   - ตัวเลข พิกัด สถิติ เวลา และรหัสสถานะ ต้องใช้ `font-mono tabular-nums` (`Geist Mono` / `JetBrains Mono`) เสมอ
4. **Min-UI Principle (สำหรับ Tool / Engineering / SaaS Workspace เช่น MESURV, Mesnooker):**
   - **Controls Near Content:** วางปุ่มควบคุมและตัวกรองไว้ติดกับข้อมูลที่ถูกกระทำ ไม่แยกห่างเกินจำเป็น
   - **Verbs Over Nouns:** ปุ่ม Action ใช้คำกริยาที่ชัดเจน (`Calculate Traverse`, `Export GeoJSON`, `Start Frame`) แทนคำนามลอยๆ
   - **Zero Marketing Fluff:** ในหน้าทำงานจริง (Workspace/Calculator/Map) ตัดคำโฆษณาเวิ่นเว้อออก เน้นความคมชัดของข้อมูล (High Signal-to-Noise)

---

## 📐 Calibrated Surface × Spatial Architecture Matrix (Round 2 & 3)

- **Token Source of Truth:** `user-profile.json` หรือ `tokens/` (`design-tokens.json`, `design-tokens.css`, `tailwind.tokens.config.js`)
- **Axis 1 — 3 Master Surface Themes (Synthesized from 7 Blind Winners `#B, #G, #L, #C, #K, #D, #F`):**
  1. `fieldbook` (**The Fieldbook** — Daylight Survey & Editorial: `#B + #G + #L`)
  2. `cosmos` (**Cosmos Glass** — Deep Space Acrylic & Velvet: `#C + #K`)
  3. `matrix` (**Data Matrix** — Pro Telemetry & Field Controller: `#D + #F`)
- **Axis 2 — 8 Spatial Layout Archetypes (`L-01` to `L-08` on `/style/101`–`/style/108`):**
  - `L-01`: Asymmetric Editorial Bento + Top Command Pill (`0px` Sidebar, `8:4` + `7:5` Grid)
  - `L-02`: Full-Bleed Canvas-First Spatial HUD (`100vw × 100vh` Map + Floating Pods)
  - `L-03`: 3-Pane Engineering IDE Split Workbench (`18%` Tree : `56%` Stage+Console : `26%` Inspector)
  - `L-04`: 40/60 Sticky Poster Split & Exposed Architectural Grid (`0px` Gap Hairline Cells)
  - `L-05`: Pro Telemetry Ribbon + 50/50 Synchronized Dual Split (Top Ticker + Left/Right Sync)
  - `L-06`: Focused 760px Executable Fieldbook Stream (Single-Column + Inline Compute Cells)
  - `L-07`: Bottom-Dock OS & 4-Column Modular Swimlanes (4 Vertical Lanes + Bottom OS Dock)
  - `L-08`: Spacious Full-Width Master Table + 440px Slide-Over Inspector Drawer

---

<!-- USER_PROFILE_SIGNATURE -->
<!-- Last calibrated: 2026-09-29T15:19:00+07:00 -->
<!-- Status: CONFIRMED_V2 (3 Master Themes + 7 Blind Winners + 8 Spatial Layout Archetypes) -->


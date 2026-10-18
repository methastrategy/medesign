## 9. Multi-Skill Design Optimization Engine (11-Skill Unified Synthesis)

เมื่อเรียกใช้ `/medesign` (ทั้งในโหมดสร้างหน้าใหม่, โหมดรีดีไซน์, และโหมด Auto-Blueprint `FINAL-01..04`) ระบบจะบังคับใช้ **กฎวิศวกรรมดีไซน์และเกณฑ์ตรวจสอบคุณภาพจาก 11 สกิลหลัก** โดยอัตโนมัติ:

### 9.1 🎛️ Design Dials & Spatial Topology (`taste-skill`)
- **3-Axis Design Dials (Locked Calibration):**
  - `DESIGN_VARIANCE = 8–9/10` (Asymmetric Grids: `3:6:3` Newspaper Command, `8:4` Bento Split, `45:55` Master-Detail, หรือ Expandable Executive Stream — **ห้ามใช้ 3-Card Equal Generic Row ติดกันโดยไม่มีจังหวะลำดับขั้น**)
  - `MOTION_INTENSITY = 6/10` (Spring Physics `cubic-bezier(0.22, 1, 0.36, 1)` สำหรับ Hover/Drawer + 0ms Instant State Sync สำหรับการสลับเหรียญ/กรองตาราง + เคารพ `@media (prefers-reduced-motion: reduce)`)
  - `VISUAL_DENSITY = 7–8/10` (High-Craft Telemetry Density: ใช้ `font-variant-numeric: tabular-nums` ทุกตัวเลขราคา/พิกัด/เวลา, ช่องว่างภายในสัมพันธ์กับรัศมีขอบ)
- **Gapless Bento & Viewport Budget:**
  - กริดแบบ Bento ต้องใส่ `grid-auto-flow: dense;` เสมอเพื่อไม่ให้เกิดหลุมว่าง (No orphan grid holes)
  - ใช้ `min-height: 100dvh;` แทน `100vh` และล็อก `overflow-x: hidden;` บน `body`
  - **Viewport Budget:** ใน 1 หน้าจอแรก (Above the Fold) ห้ามมีกลุ่มองค์ประกอบแยกกันเกิน 3 โซนหลัก และต้องมีพื้นที่ว่าง (Whitespace / Surface Canvas) อย่างน้อย 25%

### 9.2 📐 Concentric Surface Physics & Tactile Telemetry (`soft-skill` + `minimalist-skill` + `brutalist-skill`)
- **Safe Concentric Border Radius Formula:**
  - บังคับใช้: `border-radius: max(0px, calc(var(--r-outer) - var(--border-w, 0px) - var(--pad)));` เพื่อป้องกันค่าติดลบจน Browser ทิ้งคำสั่ง และชดเชยความหนาของ Border อย่างถูกต้อง
  - สำหรับปุ่มหรือแคปซูลที่มีการ Animate ขยาย/ยุบรูปทรง (Morphing) ให้ใช้ `calc(infinity * 1px)` หรือ `calc(var(--el-height) / 2)` แทน `9999px` เพื่อไม่ให้มุมโค้งกระตุกค้างช่วงท้าย
- **Doppelrand & Tactile Framing:**
  - ผสมผสานความละมุนของ `soft-skill` (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.06)` Doppelrand inner highlight) เข้ากับความคมชัดของ `minimalist-skill` & `brutalist-skill` (`1px solid` structural hairline + `3px solid` top category accent bar + `border-dashed` ticket perforation + `<kbd>` shortcut tags เช่น `T`)
- **Custom Browser Surfaces:**
  - ต้องกำหนดสี `::selection` ให้เข้ากับธีม, แต่ง `::-webkit-scrollbar` ให้บางคม (`6px`), ล็อก `scrollbar-gutter: stable;`, และกำหนด `color-scheme: light dark;` บน `:root` เสมอ

### 9.3 🪙 2.5-Tier Semantic Token Contract & Polarity Discipline (`stitch-skill` + `ui-styling` + `redesign-skill`)
- **2.5-Tier Token Architecture (Zero Cascade Waterfall):**
  - *Tier 1 (Primitive) & Tier 2 (Semantic):* กำหนดที่ `:root` ผ่านฟังก์ชัน `light-dark()` เพื่อให้ไฟล์ CSS กระชับและสลับธีมได้ทันที
  - *Tier 3 (Component):* ห้ามประกาศเป็น Global Tokens เด็ดขาด ให้ใช้เฉพาะ **Private Scoped Aliases** ที่ขึ้นต้นด้วย Underscore (`--_bg`, `--_border`, `--_text`) ภายใน Class ของ Component นั้นๆ เพื่อป้องกัน Style Recalculation ซ้ำซ้อนบนตารางหมื่นเซลล์
- **Contrast-Safe CTA Foreground (`--accent-on-primary`):**
  - **กฎเหล็กป้องกันบั๊กสีกลืนในโหมดมืด:** ห้ามเขียน `color: #ffffff` ตายตัวบนปุ่มที่ใช้พื้นหลัง `var(--accent-primary)` เด็ดขาด เพราะเมื่อสลับเป็นโหมดมืด (`velvet-obsidian` ที่ใช้สีเขียวสว่าง `#34d399`) ตัวหนังสือสีขาวจะมี Contrast เพียง `1.92:1` (อ่านไม่ออก/ตกเกณฑ์ WCAG)
  - ต้องใช้ `color: var(--accent-on-primary)` เสมอ โดยในโหมดสว่าง (`editorial-paper` พื้นเขียวเข้ม `#0f6b32`) กำหนด `--accent-on-primary: #ffffff` (`6.66:1` AA/AAA) และในโหมดมืด (`velvet-obsidian` พื้นเขียวมิ้นต์ `#34d399`) กำหนด `--accent-on-primary: #042f1e` (`10.8:1` AAA)
- **Non-Text SVG Contrast:**
  - เส้นกราฟหลักและวงแหวนเกจวัด (SVG `stroke`) ห้ามฮาร์ดโค้ดสีสว่างที่จมบนพื้นขาว ต้องผูกกับ `stroke="var(--accent-primary)"` เพื่อให้ผ่านเกณฑ์ WCAG Non-Text Contrast (`> 3:1`) ทั้งในโหมดกระดาษครีมและโหมดมืด

### 9.4 🛡️ 4-Tier Quality Governance & Pre-Flight Gate

เปลี่ยนผ่านจากการเป็นเพียง CSS Style Enforcer สู่ **Design Decision Engine** ด้วยการแบ่งระดับการตรวจสอบออกเป็น 4 ชั้นชัดเจน:

| ระดับการตรวจสอบ | เกณฑ์ประเมิน | ตัวอย่างข้อกำหนด | กลไกการตรวจรับ (Gate) |
|---|---|---|---|
| **Tier 1: Hard Invariants** | ไม่มีการประนีประนอม (Pass/Fail) | WCAG Dual-Theme Contrast, Keyboard Focus Visible, 44px Touch Targets, Reduced-Motion Compliance, Semantic State Contract | Automated Unit & Contrast Test |
| **Tier 2: Soft Heuristics** | ปรับตามบริบทและขนาดหน้าจอ | Safe Concentric Radius, Boundary Clearance & Optical Inset (MD106), Motion Timing, Accent Budget ($\le 15\%$), Whitespace Budget ($\ge 25\%$) | Design Review & Optical Comparison |
| **Tier 3: Progressive Enhancements** | เสริมความลื่นไหลเมื่อเบราว์เซอร์รองรับ | CSS Anchor Positioning, Scroll-Driven Animations, View Transitions L2, `@starting-style` | Feature Detection (`@supports` / JS Fallback) |
| **Tier 4: Domain Rules** | สอดคล้องกับงานเฉพาะทางของผู้ใช้ | High-Density Telemetry, Map Canvas 100dvh, 0W Idle WebGL `frameloop="demand"` | Domain User Workflow Audit |

#### 1. Complete Semantic State Contract (Hard Invariant):
ทุก Interactive Component ต้องผ่านการออกแบบและมี CSS ครบทั้ง 6 สถานะ:
$$\text{default} \longrightarrow \text{hover} \longrightarrow \text{pressed} \longrightarrow \text{focus-visible} \longrightarrow \text{disabled / loading} \longrightarrow \text{success / error}$$
- **Focus Rings:** ทุกปุ่ม/ลิงก์/อินพุตต้องมี `:focus-visible` ชัดเจน (`outline: 2px solid var(--border-focus); outline-offset: 2px;`)
- **Press Displacement:** ปุ่มยุบตัวทางสายตาด้วย Area-Proportional Scaling โดยไม่ลดขนาดกล่อง Hit Target
- **Reduced Motion:** หากผู้ใช้เปิด `prefers-reduced-motion: reduce` ต้องตัด Transition เหลือ `0ms` ทันที

#### 2. Dual-Theme Contrast & Polarity Discipline (Hard Invariant):
- ข้อความหลัก (`--text-1`) $> 12:1$ (AAA)
- ข้อความรอง (`--text-2`) $> 7:1$ (AAA)
- ข้อความกำกับ/หน่วย (`--text-3`) $> 4.5:1$ (AA)
- ปุ่มหลัก (`--accent-on-primary` บน `--accent-primary`) $> 4.5:1$ ทั้ง Light (`editorial-paper`) และ Dark (`velvet-obsidian`)
- เส้นกราฟ/ไอคอน (Non-text) $> 3:1$ เทียบกับพื้นผิว

#### 3. Information Architecture & Anti-Slop Heuristics (Soft Heuristic):
- **Layout Follows Information Relationships:** บังคับให้ AI ระบุ Primary Task, Primary Data, Supporting Context, และ Secondary Actions ก่อนสร้าง Layout
- **ห้าม Generic Card Uniformity:** ห้ามเปลี่ยนตารางข้อมูลหรือฟังก์ชันที่มีความสำคัญต่างกันให้กลายเป็นการ์ดเรียง 3 ใบที่มีขนาดและ Effect เท่ากันหมด
- **Surface Effect Budget:** ทุก Drop-shadow, Blur, และ Glow ต้องมีหน้าที่ชัดเจน (แยกชั้นความลึก หรือบอกสถานะ) ไม่ใส่ฟุ้งกระจายจนขาดลำดับขั้น

#### 4. Interactive Self-Audit Score:
ในหน้า Prototype สามารถแสดงแถบ **`🛡️ 4-Tier Audit Score`** เพื่อแสดงผลตรวจ Contrast, Focus Visibility, และ State Contract สดบนหน้าเว็บได้ทันที

### 9.5 🎨 Perceptual Color, Motion Profiles & Micro-Craft Standards

- **Perceptual Intent Color Engine:**
  - เลือกใช้ `in oklch shorter hue` เมื่อต้องการรักษาความสดฉ่ำของ Hue ข้ามช่วง
  - เลือกใช้ `in oklab` เมื่อต้องการเกลี่ยความสว่างนุ่มนวลหรือไล่สีเข้าหา Neutral/White/Black เพื่อขจัดรอยตัดขอบ
  - ตรวจสอบ Midpoint ที่ตำแหน่ง 25%, 50%, 75% เพื่อป้องกันแถบสีหม่น
  - สร้างสถานะด้วย `color-mix(in oklch, var(--surface-base) 88%, white)` แทนการฮาร์ดโค้ด Hex
- **Dark Mode Functional Tokens:**
  - บริหารผ่าน `--surface-canvas` (OLED Pure Black `#000000` + Chroma $C \in [0.004, 0.012]$), `--surface-raised`, `--surface-inset`, `--border-subtle`, `--border-focus`
- **4 Motion Profiles & Timing Math:**
  - สัดส่วนเวลาปิดต่อเวลาเปิด: $T_{\text{exit}} = 0.65 \times T_{\text{entry}}$ (280ms เข้า / 180ms ออก)
  - กำหนด Motion ตามลักษณะงาน: `precision` (0-100ms no overshoot สำหรับงานข้อมูล/แผนที่), `soft-settle` (240-280ms สำหรับ Popover), `spring-settle` (สำหรับ Morphing ข้ามรูปทรง), และ `instant` (0ms)
- **Typography & Script Calibration:**
  - UI Chrome: `line-height: 1.25` (EN) / `1.38` (TH) + สำรอง Headroom สำหรับสระบน/วรรณยุกต์ไทย 2-4px
  - Reading Prose: `line-height: 1.60` (EN) / `1.70-1.75` (TH)
  - ปรับจูน Fallback Font ด้วย `size-adjust` ภายใน `@font-face` เพื่อป้องกัน Layout Shift (CLS = 0)
- **Spatial 3D & WebGL Resource Gating:**
  - สถาปัตยกรรม **`frameloop="demand"`**: ตัด Render Loop ทันทีเมื่อความเร็ว $\lvert v \rvert < 0.0001$ (GPU 0W idle)
  - VRAM Footprint $\le 32\text{MB}$ ผ่าน Meshopt Compression และ KTX2 Basis Universal Textures

---

### 9.6 👁️ Task-Driven Attention Models & Information Saliency

ห้ามบังคับใช้ F-Pattern กับทุก Archetype ให้เลือก **Attention Model** ให้ตรงกับภารกิจหลัก:

| Attention Model | เหมาะสำหรับ | เกณฑ์การจัดวางและการวัดผล |
|---|---|---|
| **F-Pattern** | บทความ, Documentation, คู่มือการใช้งาน | ลำดับการอ่านหัวข้อ และตำแหน่งเริ่มต้นอ่านแนวนอนสู่แนวตั้ง |
| **Z-Pattern** | Marketing Landing Page ความหนาแน่นต่ำ | เส้นทางสายตาจาก Brand สู่ Value Proposition และ Primary CTA |
| **Task-First** | Dashboard, ซอฟต์แวร์วิศวกรรม, CAD | ผู้ใช้พบปุ่ม Action หลักหรือสถานะปัจจุบันของระบบได้เร็วที่สุด |
| **Spatial Attention** | GIS, แผนที่, CAD Workbench, 3D Canvas | Canvas คือจุดโฟกัสหลัก โดยมีแผงเครื่องมือและข้อมูลแวดล้อมเกาะขอบ |
| **Alert-First** | Mission Control HMI, Telemetry Console | ค่าผิดปกติ (Critical Alarm) ต้องถูกแยกออกจากสถานะปกติอย่างเด็ดขาด |
| **Reading Hierarchy** | ตารางสแกนข้อมูล, รายงานการคำนวณ | สแกนค่าตามแถว คอลัมน์สรุปผล และค่าพิกัดความคลาดเคลื่อนได้อย่างแม่นยำ |

#### Gestalt Proximity & Saliency Formulation:
- **Gestalt Proximity:** องค์ประกอบที่เกี่ยวข้องกันทางตรรกะ ต้องอยู่ใกล้กันทางสายตา:
  $$d_{ij} = \frac{\sqrt{(x_i - x_j)^2 + (y_i - y_j)^2}}{\sqrt{W^2 + H^2}}, \quad P_{ij} = \exp\left(-\frac{d_{ij}^2}{2\sigma^2}\right)$$
- **Information Saliency Score ($S_i$):**
  $$S_i = 0.30 R_i + 0.18 C_i + 0.16 T_i + 0.12 A_i + 0.10 P_i + 0.08 I_i + 0.06 E_i$$
  โดย $R$ (Task Relevance), $C$ (Contrast), $T$ (Typography Saliency), $A$ (Area), $P$ (Position), $I$ (Isolation), $E$ (Enclosure)

---

### 9.7 🍱 Bento Allocation & CLS Near-Zero Invariants

1. **Task-Weighted Area Allocation:**
   คำนวณขนาดของ Module ตามน้ำหนักภารกิจ ไม่ใช่ความชอบส่วนตัวของนักออกแบบ:
   $$w_i = 0.35 T_i + 0.25 F_i + 0.20 D_i + 0.20 K_i$$
   ($T$: ความสำคัญต่อภารกิจ, $F$: ความถี่ในการคลิก/ควบคุม, $D$: ความหนาแน่นของข้อมูล, $K$: ความวิกฤตเมื่อเกิดข้อผิดพลาด)
2. **Aspect Ratio Starting Constraints:**
   - **GIS Map Canvas:** ประมาณ 16:10 ถึง 4:3 (หรือ 100dvh full-bleed)
   - **Telemetry Timeline:** 2.2:1 ถึง 3:1 (แนวนอนกว้างเพื่อให้เห็นแนวโน้มกาลเวลา)
   - **Data Table:** Flexible height พร้อม Internal Scrolling (`overflow-y: auto`)
   - **Inspector / Controls:** Flexible height พร้อมล็อก `min-width: 20rem` (320px) ป้องกันข้อมูลถูกบีบ
3. **Grid Dense Warning:**
   - บังคับใช้ `grid-auto-flow: row` ควบคู่กับ **Named Grid Areas** (`grid-template-areas`) เป็นค่าเริ่มต้นเสมอ
   - ห้ามใช้ `grid-auto-flow: dense` กับ Dashboard ข้อมูล เพราะจะทำให้ลำดับ DOM และ Tab Order ของคีย์บอร์ดสลับตำแหน่ง
4. **CLS Near-Zero Invariants:**
   - **Reserved Geometry:** จองพื้นที่ว่างและ Aspect Ratio ให้กับ Map Canvas, กราฟ และภาพก่อนโหลดข้อมูลเสมอ
   - **Stable Data Regions:** การอัปเดตข้อมูลต้องเกิดขึ้นภายใน Scroll Container ที่กำหนดขอบเขตไว้ ไม่ดันโครงสร้างหลักขยับ
   - **Overlay for Transient Feedback:** แจ้งเตือน Toast และ Popover ต้องอยู่บน Top Layer ไม่แทรกเข้าไปใน DOM Flow

---

### 9.8 📊 Automated Heuristic Scoring Pipeline & Release Gate

ประเมินคุณภาพของโค้ด UI ผ่านสมการคะแนนรวม:
$$Q = 0.30 H + 0.25 I + 0.20 G + 0.15 R + 0.10 V$$
- $H$ (Hierarchy & Task Saliency)
- $I$ (Information Architecture & State Completeness)
- $G$ (Geometry, Concentric Radii & Touch Targets)
- $R$ (Responsive Stability & CLS = 0)
- $V$ (Visual Craft, OKLCH Gamut & Anti-Slop)

#### Zero-Compromise Gating Policy:
- **90–100:** PASS — พร้อมส่งมอบระดับ Production
- **75–89:** REVIEW REQUIRED — ใช้งานเป็น Candidate ได้แต่ต้องตรวจสอบคำเตือน
- **< 75:** REJECT — สถาปัตยกรรมข้อมูลไม่ผ่านเกณฑ์ ต้องปรับแก้ก่อนเรนเดอร์
- **Hard Invariant Violation:** REJECT ทันที (หากตกเกณฑ์ Contrast AA/AAA, ขาด Focus Ring, หรือไม่มี Reduced-Motion Gate แม้คะแนนรวมจะได้ 95 ก็ถือว่าตกเกณฑ์)


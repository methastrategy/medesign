# Modern Craft Invariants & Apple Design Award Standards (v2.0 Manifesto)

คู่มือวิศวกรรมดีไซน์ขั้นสูง สังเคราะห์จากบททดสอบ Red-Team Audit และการถอดรหัสของ Gemini 4.0 Argon สำหรับใช้งานใน `/medesign` ครอบคลุมกฎเหล็ก 11 ประการ, สถาปัตยกรรม CSS Engine ปี 2026, คณิตศาสตร์ทางสายตา (Visual Optics), และการบริหารทรัพยากร GPU/Display

---

## 1. 🏆 11 กฎเหล็กระดับ Apple Design Award (The 11 Golden Invariants)

### กฎข้อที่ 1: Area-Proportional Press Scaling (กฎการยุบตัวแปรผันผกผันกับขนาดพื้นที่)
- **ปัญหา:** การใช้ `active:scale-95` (`0.95`) กับทุกขนาดทำให้การ์ดขนาดใหญ่ (เช่น 600×400px) ขอบกระชากเข้ามาถึง 30px ซึ่งรุนแรงเกินไป
- **สูตรคำนวณและระยะขอบเขต (Optical Displacement):**
  ระยะยุบตัวทางสายตารวม ($\Delta P$) ต้องคงที่ที่ประมาณ **2px ถึง 3px** (เฉลี่ยขอบเคลื่อนเข้า $\approx 1.25\text{px}$ ต่อด้าน) พร้อมล็อก `clamp()` เพื่อป้องกันการเสียรูป:
  $$\text{Scale}_{\text{active}} = \text{clamp}\left(0.96, \; 1 - \frac{2.5}{\max(\text{Width}, \text{Height})}, \; 0.995\right)$$
- **กฎเหล็ก Hit-Target Isolation:** **ห้าม Scale กล่อง Interactive Container ที่รับสัมผัส/การคลิกโดยตรง** เพราะจะทำให้พื้นที่ Hit Test หดตัวลงตาม ให้แยกกล่อง Hit Target ออกจาก Visual Surface เสมอ:
```css
/* Interactive Container: รักษาระยะสัมผัส 44px HIG เต็มพื้นที่ */
.btn-control {
  position: relative;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}
/* Visual Surface: รับหน้าที่ยุบตัวทางสายตาเท่านั้น */
.btn-control:active .visual-surface {
  transform: scale(var(--press-scale, 0.975));
  transition: transform 80ms cubic-bezier(0.2, 0, 0, 1);
}
```
- **ค่ามาตรฐานประจำ Scale:**
  - ปุ่มเล็ก ($32\times 32\text{px}$): `transform: scale(0.96);`
  - ปุ่มกลาง ($48\times 48\text{px}$): `transform: scale(0.98);`
  - การ์ด/คอนเทนเนอร์ใหญ่ ($400\text{px}+$): `transform: scale(0.994);`

### กฎข้อที่ 2: Asymmetric Entry / Exit Timing & The 4 Motion Profiles
- **หลักการ:** สมองมนุษย์ต้องการเห็นทิศทางที่มาเมื่อวัตถุปรากฏตัว (Entry) แต่ต้องการให้วัตถุที่สั่งปิดหายไปเร็วที่สุดเพื่อทำงานต่อ (Exit)
- **สูตรคำนวณเวลาที่สอดคล้องกัน:**
  $$T_{\text{exit}} = 0.65 \times T_{\text{entry}} \quad (280\text{ms} \times 0.65 = 182\text{ms} \approx 180\text{ms})$$
- **แยกแยะ Ease-Out กับ Spring Physics ผ่าน 4 Motion Profiles:**
  | Motion Profile | พฤติกรรมเป้าหมาย | ตัวอย่างการใช้งานจริง | สเปก CSS / Animation |
  |---|---|---|---|
  | **`precision`** | เข้าสถานะทันที ไม่มี Overshoot | CAD/GIS Crosshair, ตารางสแกน, สลับข้อมูล | `duration: 0–100ms`, linear/ease-out |
  | **`soft-settle`** | เร่งต้น ชะลอปลาย นุ่มนวล | Popover, Modal, Dropdown, Tooltip | `240–280ms cubic-bezier(0.16, 1, 0.3, 1)` (Exit: `160–180ms`) |
  | **`spring-settle`** | มีแรงเฉื่อยทางกายภาพ มี Bounce เบาๆ | การ์ด Drag-and-Drop, Morphing ขยายเต็มจอ | CSS `linear()` spring curve หรือ WAAPI |
  | **`instant`** | ตัดแอนิเมชันทิ้ง (0ms) | สลับเหรียญ/ฟิลเตอร์, `@media (prefers-reduced-motion)` | `transition: none !important; duration: 0ms;` |

### กฎข้อที่ 3: Diagonal Menu Safe-Triangle (Hover Tunneling Invariant)
- **ปัญหา:** เมื่อเลื่อนเมาส์แนวทแยงจากเมนูหลักไปยังเมนูย่อย (Submenu) เมาส์จะหลุดข้ามเมนูตัวอื่นและทำให้เมนูย่อยปิดตัวเองทันที
- **สูตรบังคับ:** สร้างชั้นเรขาคณิตล่องหนด้วย SVG หรือ CSS `clip-path` เชื่อมจากตำแหน่งเมาส์ปัจจุบันไปยังมุมบนและมุมล่างของ Submenu หรือหน่วงเวลาปิด `120ms` เมื่อเวกเตอร์ความเร็วเมาส์ ($\vec{v}$) มุ่งหน้าเข้าหาพื้นที่ Submenu

### กฎข้อที่ 4: Dual-Context Typography & Script-Specific Trimming
- **UI Chrome (ปุ่ม, แท็บ, เมนู, เซลล์ตาราง, Badge):**
  - ภาษาอังกฤษ: `line-height: 1.25;` + Progressive `text-box: trim-both cap alphabetic;`
  - ภาษาไทย: `line-height: 1.38;` + `text-box: trim-both text alphabetic;`
  - **Thai Diacritic Headroom Invariant:** สระบนและวรรณยุกต์ไทย (ปิ๊, ผู้, ที่) ยื่นเลยระดับ Cap Height เสมอ **ห้าม Trim จนเฉือนวรรณยุกต์ขาด** ต้องใส่ `padding-top: 2px–4px` สำรองเป็น Optical Headroom และห่อหุ้มด้วย `@supports`:
```css
@supports (text-box: trim-both cap alphabetic) {
  .ui-label-en { text-box: trim-both cap alphabetic; }
  .ui-label-th { 
    text-box: trim-both text alphabetic; 
    padding-top: 2px; /* สำรองระยะวรรณยุกต์ไทย */
  }
}
```
- **Reading Prose (บทความ, เอกสารรายงาน, คำอธิบายยาว):**
  - ภาษาอังกฤษ: `line-height: 1.60;` + ความกว้างบรรทัด `55ch–68ch;`
  - ภาษาไทย: `line-height: 1.70–1.75;`
  - **Font Metric Calibration:** คำสั่ง `size-adjust` เป็น **Descriptor ภายใน `@font-face`** สำหรับปรับจูน Fallback font ให้ความสูง x-height เท่ากับ Web Font จริง ไม่ใช่ CSS inline property:
```css
@font-face {
  font-family: "Geist-Fallback";
  src: local("Arial");
  size-adjust: 104%; /* เทียบขนาด Glyph จริง ป้องกัน Layout Shift */
  ascent-override: 96%;
}
```

### กฎข้อที่ 5: Touch-Target Invisible Halo (44×44px HIG Compliance)
- **ปัญหา:** ใน High-Density WebApp ไอคอนมีขนาดเล็กเพียง `24×24px` หรือ `28×28px` ซึ่งเล็กเกินไปสำหรับการสัมผัสบนมือถือ/แท็บเล็ต
- **สูตรบังคับ:** แยก Visual Box ออกจาก Hit Box โดยใช้ `::after` ขยายพื้นที่รับสัมผัสเฉพาะอุปกรณ์สัมผัส:
```css
.icon-btn-compact {
  position: relative;
  width: 28px;
  height: 28px;
}
@media (pointer: coarse) {
  .icon-btn-compact::after {
    content: "";
    position: absolute;
    inset: -8px; /* 28px + 8px + 8px = 44px ตามมาตรฐาน Apple HIG */
  }
}
```

### กฎข้อที่ 6: Mobile 16px Input Zoom Prevention (Scale-Down Trick)
- **ปัญหา:** บน iOS Safari หาก `<input>` มี `font-size` ต่ำกว่า `16px` (เช่น `13px` หรือ `14px` ในระบบ High-Density UI) Safari จะบังคับซูมหน้าจออัตโนมัติ
- **สูตรบังคับ:** บน `@media (max-width: 768px)` กำหนด `font-size: 16px` เพื่อหลอก iOS Safari แล้วย่อขนาดด้วย Transform:
```css
@media (max-width: 768px) {
  .input-compact {
    font-size: 16px;
    transform: scale(0.875); /* แสดงผลจริงเทียบเท่า 14px */
    transform-origin: left center;
    width: 114.2857%; /* 100 / 0.875 ชดเชยความกว้าง */
  }
}
```

### กฎข้อที่ 7: Dark Mode Variable Font Grade Compensation (Optical Halation Thinning)
- **ปัญหา:** ตัวหนังสือสีสว่างบนพื้นหลังสีมืดจะบวมขึ้นทางสายตาจากแสงฟุ้ง (Halation Effect)
- **สูตรบังคับ:** ใน Dark Mode ต้องลดน้ำหนักฟอนต์ลงอัตโนมัติ:
```css
[data-theme="dark"] {
  /* ถ้าเป็น Variable Font ที่มีแกน GRAD */
  font-variation-settings: "GRAD" -25;
  /* หรือถ้าเป็น Static Weight ให้ลดน้ำหนักลง 25–30 หน่วย */
  --font-weight-normal: 375;
  --font-weight-medium: 470;
}
```

### กฎข้อที่ 8: Rubber-Band Resistance Logarithm (กฎความหนืดเมื่อลากสุดขอบ)
- เมื่อผู้ใช้ลาก Drawer, Bottom Sheet หรือ Slider เกินจุดสิ้นสุด (Over-drag) ให้คำนวณระยะการเคลื่อนที่จริง ($d_{\text{rendered}}$) ด้วยสมการลอการิทึมของ iOS:
  $$d_{\text{rendered}} = L_{\max} \times \left( 1 - \frac{1}{\frac{\Delta x \times c}{L_{\max}} + 1} \right) \quad (c = 0.55)$$

### กฎข้อที่ 9: Subpixel Scrollbar Gutter & Safe-Area Symmetry
- บังคับใช้ `scrollbar-gutter: stable;` บนคอนเทนเนอร์ที่เลื่อนได้ทุกตัว เพื่อป้องกันหน้าจอกระตุก 15px เมื่อ Scrollbar ปรากฏขึ้น
- บนอุปกรณ์เคลื่อนที่ ต้องคำนวณระยะขอบล่างด้วย `padding-bottom: max(var(--space-md), env(safe-area-inset-bottom));` เพื่อไม่ให้ปุ่มโดนแถบ Home Indicator บดบัง

### กฎข้อที่ 10: On-Demand WebGL Render Loop & VRAM Budget Gate
- สำหรับฉาก 3D Background หรือ CAD/GIS Viewer ที่ไม่มีการเคลื่อนไหวตลอดเวลา **ห้ามรัน `requestAnimationFrame` ต่อเนื่อง**
- ต้องใช้สถาปัตยกรรม **`frameloop="demand"`**: เรนเดอร์เฉพาะเฟรมที่มีการขยับเมาส์ ซูม หรือระหว่างที่สปริงกล้องยังขยับ เมื่อความเร็ว $\lvert v \rvert < 0.0001$ ให้ตัด Loop ทันทีเพื่อให้ GPU ใช้พลังงาน **0 วัตต์**
- **งบประมาณ VRAM:** ไฟล์โมเดล 3D ต้องใช้ **Meshopt Compression + KTX2 (Basis Universal) Textures** โดยจำกัดหน่วยความจำหลังคลายบีบอัดบน GPU ไม่เกิน **$32\text{MB}$**

### กฎข้อที่ 11: Optical Inset & Safe Cushioning (กฎการเว้นระยะขอบสายตาและการแยก Hit-Target ออกจาก Visual Pill)
- **ปัญหาทางสายตา:** เมื่อนำแถบสเกลหรือเส้นสถานะ (Slider track, Progress bar, Audio Scrubber) ความกว้าง 100% ไปบรรจุในคอนเทนเนอร์ทรงมน (Pill container / `border-radius: 9999px`) ที่มีสีพื้นหลังหรือเส้นกรอบ เส้นสเกลจะพุ่งชนขอบโค้งมนที่มุมซ้าย-ขวา เกิดรอยชนหยาบ (Edge Collision) ไร้ความเนี๊ยบ
- **สูตรบังคับ 2 แนวทาง (World-Class Standard):**
  1. **Transparent Touch Halo (แนวทาง Apple/Spotify HIG):** กล่องคอนเทนเนอร์ขนาด 44px ต้องเป็น **สีโปร่งใส (Transparent Background)** เพื่อทำหน้าที่เป็น Hit-Target ที่เข้าถึงง่ายเท่านั้น ปล่อยให้เส้น Track ขนาด 4px อยู่ตรงกลางอย่างสง่างาม พร้อม Thumb Circle (ขนาด 12px) ปรากฏขึ้นเมื่อ Hover
  2. **Optical Cushioning Capsule:** หากต้องการให้มีแคปซูลพื้นหลังสีทึบหรือแก้ว (Glass Pill) ครอบ **ต้องกำหนดระยะเว้นขอบสายตา `padding: 0 12px;` หรือ `padding: 0 14px;` เสมอ** เพื่อให้ปลายเส้นสเกลมีช่องว่างหายใจ (Breathing Room) จากส่วนโค้งของแคปซูล

---

## 2. ⚡ Modern CSS Engine Primitives (2026 Standards)

การใช้คุณสมบัติ CSS สมัยใหม่ช่วยตัดโค้ด JavaScript ที่ซับซ้อนทิ้งไปได้มากกว่า 70%:

| ฟีเจอร์ CSS 2026 | การแก้ปัญหาเชิงสถาปัตยกรรม | ไวยากรณ์ระดับ Production |
|---|---|---|
| **`light-dark(lightVal, darkVal)`** | ลดความซ้ำซ้อนของการเขียน `.dark { --var: ... }` และป้องกันปัญหาลืมอัปเดตคู่ตัวแปร | ประกาศ `color-scheme: light dark;` ที่ `:root` แล้วเขียนคู่สีในบรรทัดเดียว: `--surface: light-dark(oklch(0.99 0.002 260), oklch(0.14 0.008 260));` |
| **`text-box-trim` & `text-box-edge`** | ตัดช่องว่าง Half-leading ส่วนเกินของฟอนต์ออก ทำให้ปุ่มและ Badge อยู่กึ่งกลางแนวตั้งเป๊ะ | `@supports (text-box: trim-both cap alphabetic) { text-box: trim-both cap alphabetic; }` |
| **Popover API + `@starting-style`** | ทำ Modal/Dropdown ลอยบน Browser **Top Layer** (เหนือทุก `z-index`) พร้อมทำ Transition เข้า-ออกโดยไม่ต้องพึ่ง JS | `<div popover>` ควบคู่กับ `@starting-style` และ `transition-behavior: allow-discrete;` |
| **CSS Anchor Positioning** | ผูก Tooltip/Menu ติดกับปุ่ม พร้อมพลิกหลบขอบจออัตโนมัติบน Compositor Thread 120fps โดยไม่ต้องใช้ Floating UI | `position-anchor: --my-btn;` + `position-try-fallbacks: flip-block, flip-inline;` |
| **Scroll-Driven Animations** | เชื่อมไทม์ไลน์แอนิเมชันเข้ากับการเลื่อน Viewport โดยตรงที่ระดับ Compositor thread | `animation-timeline: view(); animation-range: entry 0% cover 25%;` (ครอบด้วย reduced-motion gate) |
| **OKLCH `color-mix()`** | สร้างโทนสี Hover, Focus, Selected และ Tinted Surfaces แบบไดนามิกจากแม่สีตัวแปรเดียว | `color-mix(in oklch, var(--surface-base) 88%, white)` |
| **`interpolate-size: allow-keywords`** | ปลดล็อกการทำ CSS Transition/Spring ไปหา `height: auto` ได้โดยตรงทั้งระบบ | กำหนด `interpolate-size: allow-keywords;` ที่ `:root` |

### 2.A Scroll-Driven Progressive Animations & Reduced-Motion Gate
```css
.section-reveal {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .section-reveal[data-reveal] {
      animation: section-enter linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 25%;
    }
    @keyframes section-enter {
      from { opacity: 0.55; transform: translateY(12px); }
      to   { opacity: 1;    transform: translateY(0); }
    }
  }
}
```

### 2.B View Transitions Level 2: Semantic Transition Types
แทนการใช้ Fade/Spinner แบบเดียว ให้ผูก Transition เข้ากับเจตนาทางสถาปัตยกรรม (Intent):
| Transition Type | พฤติกรรม UX | การนำไปใช้ |
|---|---|---|
| `navigation-forward` | เลื่อนสไลด์ไปข้างหน้า (Drill down) | คลิกดูรายละเอียดแปลงที่ดิน / telemetry telemetry |
| `navigation-back` | ถอยหลังกลับสู่บริบทเดิม | กดย้อนกลับสู่ Dashboard หลัก |
| `content-update` | ข้อมูลเปลี่ยนแต่โครงสร้างเดิมนิ่งสนิท | สลับคู่เหรียญ / เปลี่ยนหน่วยพิกัด UTM |
| `selection-change` | มีแค่ Indicator วิ่งไปหาตัวเลือกใหม่ | สลับแท็บ / สลับเครื่องมือสำรวจ |
| `layout-reflow` | Bento Card ขยาย/ยุบตัวตามสัดส่วน | กางแถวตารางข้อมูลเชิงลึก |

### 2.C Perceptual Intent Color Engine (OKLab vs OKLCH)
ยกเลิกการใช้กฎมุมองศาแข็งทื่อ ($\Delta H > 60^\circ$) และปรับใช้ **Perceptual Intent Rules**:
1. **เมื่อต้องการรักษาความสดฉ่ำของคู่สี (Vibrant Chroma Trajectory):** บังคับใช้ `in oklch shorter hue`
2. **เมื่อต้องการการเปลี่ยนผ่านความสว่างที่นุ่มนวลหรือไล่เข้าหา Neutral/White/Black:** บังคับใช้ `in oklab` เพื่อขจัดรอยตัดขอบที่ไม่สม่ำเสมอ
3. **Midpoint Inspection Invariant:** ทดสอบความสว่างและความสดที่ตำแหน่ง `25%`, `50%`, และ `75%` ของ Gradient เสมอ เพื่อป้องกันสีหม่นเทาหรือวูบผิดเจตนา
4. **Dynamic Token Derivation ผ่าน `color-mix()`:**
```css
:root {
  --color-accent: oklch(0.68 0.18 42); /* Terracotta */
  --surface-base:  oklch(0.14 0.008 260); /* Obsidian Base */
  
  /* สร้างพื้นผิวยกระดับและสถานะโดยไม่ต้องฮาร์ดโค้ด Hex */
  --surface-raised: color-mix(in oklch, var(--surface-base) 88%, white);
  --surface-hover:  color-mix(in oklch, var(--surface-base) 90%, var(--color-accent));
  --border-subtle:  color-mix(in oklch, var(--surface-base) 82%, white);
}
```
5. **Functional Dark Mode Neutrals:** กำหนด Token ตามหน้าที่ ไม่พึ่งพาเพียงแค่ค่าตัวเลข Chroma:
   - `--surface-canvas`: พื้นหลังลึกสุด (`oklch(0.10 0.006 260)`) ควบคู่ OLED Black `#000000`
   - `--surface-raised`: การ์ดและคอนเทนเนอร์ลอย (`oklch(0.14 0.008 260)`)
   - `--surface-inset`: พื้นที่กรอกข้อมูล / หน้าจอแผนที่ (`oklch(0.12 0.006 260)`)
   - `--border-subtle`: เส้นแบ่งความคมชัดต่ำที่ไม่แย่งความสนใจ
   - `--border-focus`: เส้นโฟกัสความคมชัดสูง (>3:1 ต่อพื้นผิว)

### 2.D Anchor Positioning & Interactive Popover Menu
```css
:root {
  color-scheme: light dark;
  interpolate-size: allow-keywords;

  --surface-popover: light-dark(oklch(0.99 0.002 260 / 0.90), oklch(0.16 0.008 260 / 0.88));
  --border-popover:  light-dark(oklch(0.15 0.008 260 / 0.08), oklch(1.00 0.000 0 / 0.10));
}

.trigger-btn {
  anchor-name: --menu-anchor;
}

.popover-menu[popover] {
  position: fixed;
  position-anchor: --menu-anchor;
  top: calc(anchor(bottom) + 6px);
  left: anchor(left);
  position-try-fallbacks: flip-block, flip-inline;

  background: var(--surface-popover);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 10px;
  box-shadow: 0 0 0 1px var(--border-popover), 0 12px 32px -4px oklch(0 0 0 / 0.28);

  opacity: 0;
  transform: scale(0.96) translateY(-4px);
  transition:
    opacity 160ms ease,
    transform 200ms cubic-bezier(0.16, 1, 0.3, 1),
    overlay 200ms allow-discrete,
    display 200ms allow-discrete;
}

.popover-menu[popover]:popover-open {
  opacity: 1;
  transform: scale(1) translateY(0);
}

@starting-style {
  .popover-menu[popover]:popover-open {
    opacity: 0;
    transform: scale(0.96) translateY(-4px);
  }
}
```

---

## 3. 📐 Optical Geometry & Spacing Mathematics

### 3.1 Optical Centering ของไอคอนสามเหลี่ยม (Play Button)
จุดศูนย์ถ่วงมวล (Centroid) ของสามเหลี่ยมด้านเท่าที่มีความกว้าง $W$ อยู่ที่ระยะ $\frac{1}{3}W$ จากฐาน ในขณะที่ Bounding Box กึ่งกลางอยู่ที่ $\frac{1}{2}W$
- **ระยะชดเชยที่ถูกต้อง:** ต้องเลื่อนไอคอนไปทางขวาตามแนวแกน X:
  $$\Delta x = \frac{W}{2} - \frac{W}{3} = \frac{W}{6} \approx 0.167 \times W \quad (\text{หรือ } \frac{W}{8} \text{ สำหรับไอคอนขอบมน})$$

### 3.2 Nested Radius Invariant & Smooth Morphing (Concentric Geometry)
- **Nested Radius Invariant (ป้องกันมุมโค้งลอย):**
  เมื่อมีคอนเทนเนอร์ซ้อนกัน (เช่น การ์ดที่มีรูปภาพ/ปุ่มอยู่ข้างใน) รัศมีมุมด้านนอกและด้านในต้องมีจุดศูนย์กลางความโค้งร่วมกัน (Concentric Corners)
  $$r_{\text{outer}} = r_{\text{inner}} + \text{padding}$$
  หรือคำนวณหารัศมีด้านในที่ถูกต้อง:
  $$r_{\text{inner}} = \max\left(0\text{px}, \; r_{\text{outer}} - \text{padding} - B_{\text{width}}\right)$$
  - **ปัญหาหากไม่ใช้สูตร:** หากกำหนด $r_{\text{inner}} = r_{\text{outer}}$ ขอบด้านในจะดูลอย ไม่ขนานกับมุมด้านนอก เกิด Visual Distortion
  - หาก `padding >= r_outer` รัศมีมุมด้านใน $r_{\text{inner}}$ จะกลายเป็น `0px` (มุมฉาก) อย่างเป็นธรรมชาติ
- **Morphing Invariant (Finite Geometry vs Infinity):**
  - สำหรับรูปทรงสถิต (Static Pills): อนุญาตให้ใช้ `calc(infinity * 1px)` หรือ `999px`
  - สำหรับรูปทรงที่มีการ Animate / Morphing ระหว่างสี่เหลี่ยมผืนผ้าไปเป็นวงรี/แคปซูล: **ห้ามใช้ infinity** เพราะจะทำให้การ Interpolate ขอบกระตุก ให้ผูกกับมิติทางเรขาคณิตจริง เช่น `calc(var(--el-height) / 2)` หรือลงทะเบียนผ่าน `@property <length>` เสมอเพื่อความราบรื่นระดับ 120fps:
```css
@property --corner-r {
  syntax: "<length>";
  inherits: false;
  initial-value: 8px;
}
.morphing-surface {
  border-radius: var(--corner-r);
  transition: --corner-r 260ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

### 3.3 Doppelrand (Double-Border Specular Catch-Light)
เทคนิคจำลองขอบ Anodized Aluminum และการ์ดระดับ Linear:
```css
.surface-doppelrand {
  background: oklch(0.16 0.008 260 / 0.85);
  backdrop-filter: blur(16px) saturate(180%);
  border-radius: 12px;
  /* Layer 1: Outer dark hairline (1px)
     Layer 2: Top edge specular highlight (1px inset)
     Layer 3: Omnidirectional inner rim (1px inset) */
  box-shadow:
    0 0 0 1px oklch(0.08 0.008 260 / 0.90),
    inset 0 1px 0 0 oklch(1 0 0 / 0.14),
    inset 0 0 0 1px oklch(1 0 0 / 0.04);
}
```

### 3.4 In-flow vs Floating Surface Architecture & Ambient Shadows
- **In-flow Surface (บัตร, พาเนล, คอนเทนเนอร์ในหน้าเว็บปกติ):**
  - ใช้ขอบ Hairline 1px (`border: 1px solid var(--border-subtle)` หรือ `box-shadow: 0 0 0 1px var(--border-subtle)`)
  - **"ห้ามใส่ Drop Shadow เด็ดขาด"** (Zero Drop Shadow บน In-flow Elements) เพื่อรักษาความคลีน ไม่ให้หน้าเว็บดูลอยและรกตา
  - **Dark Mode Elevation Invariant:** ใน Dark Mode ห้ามใช้เงาดำสร้างความลึก ให้ยกระดับพื้นผิวด้วยความสว่าง **Lighter Surface (+2% ถึง +4% Lightness)** แทน เช่น:
    - Base Canvas: `oklch(0.12 0.006 260)`
    - Card In-flow Surface: `oklch(0.14..0.16 0.008 260)` (+2–4% L)
    - Border Hairline: `oklch(1 0 0 / 0.08)` (1px solid)
- **Floating Surface (Popover, Dialog, Modal, Dropdown Menu, Floating Action Button):**
  - สงวนการใช้ Drop Shadow ไว้เฉพาะชิ้นส่วนที่ลอยอยู่บน Top Layer / Z-Stack เหนือพื้นผิวปกติเท่านั้น
  - จำลองการกระจายตัวของแสงในธรรมชาติด้วยสมการ Multi-Layered Exponential Ambient Shadows ($y_n = 2^{n-1}, \sigma_n = 2y_n$):
```css
:root {
  --shadow-hue: 260;
  --elevation-floating:
    0px 1px 1px -0.5px oklch(0.05 0.01 var(--shadow-hue) / 0.36),
    0px 3px 6px -1.5px oklch(0.05 0.01 var(--shadow-hue) / 0.28),
    0px 8px 16px -4px oklch(0.05 0.01 var(--shadow-hue) / 0.22),
    0px 20px 40px -8px oklch(0.05 0.01 var(--shadow-hue) / 0.16),
    0px 0px 0px 1px oklch(0.05 0.01 var(--shadow-hue) / 0.60);
}
```

### 3.5 Fluid Typography & Spacing Math (`clamp()`)
สมการเส้นตรง $y = mx + b$ สำหรับปรับขนาดฟอนต์ระหว่าง Viewport $375\text{px}$ ถึง $1440\text{px}$ แบบไร้รอยต่อ:
```css
:root {
  --text-xs:   clamp(0.75rem, 0.7148rem + 0.1502vw, 0.85rem);
  --text-sm:   clamp(0.875rem, 0.8310rem + 0.1878vw, 1.00rem);
  --text-base: clamp(1.00rem, 0.9472rem + 0.2254vw, 1.15rem);
  --text-lg:   clamp(1.25rem, 1.1620rem + 0.3756vw, 1.50rem);
  --text-xl:   clamp(1.625rem, 1.4049rem + 0.9390vw, 2.25rem);
  --text-2xl:  clamp(2.25rem, 1.6338rem + 2.6291vw, 4.00rem);
}
```

### 3.6 Closed Spacing System (สเกลปิดเด็ดขาด)
ห้ามใช้ค่า `gap`, `margin`, หรือ `padding` นอกเหนือจาก **11 ค่าในสเกลปิดเด็ดขาด** (Strict Closed Spacing Scale):
$$S \in \{2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128\}\text{px}$$
- **Tailwind Mapping:** `gap-0.5 (2px)`, `gap-1 (4px)`, `gap-2 (8px)`, `gap-3 (12px)`, `gap-4 (16px)`, `gap-6 (24px)`, `gap-8 (32px)`, `gap-12 (48px)`, `gap-16 (64px)`, `gap-24 (96px)`, `gap-32 (128px)`
- **ข้อห้ามเด็ดขาด:** ห้ามใช้ค่า Arbitrary Spacing เช่น `gap-[7px]`, `m-[11px]`, `p-[18px]`, `gap-[22px]` หรือค่าสุ่มใดๆ นอกสเกล

### 3.7 Proximity Ratio $\ge$ 2:1 Invariant
ช่องว่างระหว่างกลุ่ม (External Gap / Inter-group Spacing) ต้องกว้างเป็นอย่างน้อย 2 เท่าของช่องว่างภายในกลุ่ม (Internal Gap / Intra-group Spacing) เสมอ:
$$\text{Gap}_{\text{external}} \ge 2 \times \text{Gap}_{\text{internal}}$$
- **ตัวอย่างการใช้งาน:**
  - ถ้าช่องว่างระหว่าง Label กับ Input คือ `4px` $\to$ ช่องว่างระหว่าง Form Field ถัดไปต้อง $\ge 8\text{px}$ (Proximity 2:1)
  - ถ้าช่องว่างระหว่างองค์ประกอบในการ์ดคือ `12px` $\to$ ช่องว่างระหว่างการ์ดใน Grid ต้อง $\ge 24\text{px}$ (Proximity 2:1)
  - ถ้าช่องว่างระหว่างหัวข้อย่อยกับเนื้อหาคือ `8px` $\to$ ช่องว่างก่อนเริ่มหัวข้อถัดไปต้อง $\ge 16\text{px}$ (หรือ `24px` สำหรับ 3:1)
- **เหตุผลทางสายตา:** ป้องกันความสับสนตามกฎ Gestalt Law of Proximity หากช่องว่างระหว่างกลุ่มเท่ากับหรือแคบกว่าช่องว่างภายในกลุ่ม สมองมนุษย์จะไม่สามารถจัดหมวดหมู่ข้อมูลได้

### 3.8 Control Heights Ladder (Desktop vs Mobile)
ล็อกมิติความสูงของปุ่ม (`<button>`) และช่องกรอกข้อมูล (`<input>`, `<select>`) ให้อยู่บนบันไดความสูงมาตรฐาน:
- **Desktop Ladder (4 ระดับตายตัว):**
  - `28px`: Micro / Dense Data Table Controls, Inline Action Badges
  - `32px`: Compact / Secondary Toolbar Actions, Table Filters
  - `36px`: Standard Form Controls, Default Buttons, Search Inputs
  - `40px`: Prominent CTA, Primary Modal Actions, Hero Buttons
- **Mobile Ladder (2 ระดับตายตัว):**
  - `44px`: Standard Mobile Touch Target (สอดคล้องกับ Apple HIG และ WCAG 2.2 Target Size)
  - `48px`: Primary Mobile CTA, Bottom Floating Action Bar, Full-Width Inputs
- **Touch-Target Decoupling Guardrail:** หากปุ่มบน Desktop มีขนาด `28px` หรือ `32px` เมื่อเรนเดอร์บนหน้าจอมือถือ/สัมผัส (`@media (pointer: coarse)`) ต้องมี Invisible Hit Halo ขยายเป็น $\ge 44\text{px}$ เสมอ

---

## 4. 🧬 2.5-Tier Token Architecture & Polarity Discipline

เพื่อป้องกันปัญหา CSS Variable Waterfall Cascade บนตารางข้อมูลขนาดใหญ่ ให้ใช้สถาปัตยกรรม **2.5-Tier**:
1. **Tier 1 (Primitives) & Tier 2 (Semantics):** กำหนดไว้ที่ `:root` ผ่านฟังก์ชัน `light-dark()`
2. **Tier 3 (Components):** ห้ามประกาศเป็น Global Tokens เด็ดขาด ให้ใช้เป็น **Private Scoped Aliases** ที่ขึ้นต้นด้วย Underscore (`--_bg`, `--_border`, `--_text`) ภายใน Class ของ Component นั้นๆ เท่านั้น

# Web Retrofit & Modernization Protocol (คู่มือปรับปรุงเว็บเก่า)

ระเบียบวิธีวิศวกรรมสำหรับนำ AI เข้าไปสแกน ตรวจสอบ และปรับปรุงเว็บไซต์เก่าที่สร้างไว้ก่อนหน้า โดยเน้นความปลอดภัยสูงสุด (Zero Regression), การจัดเทียร์ความเสี่ยงแบบ **Hybrid 3-Tier**, และการวัดผลลัพธ์เชิงประจักษ์ด้วย Chrome DevTools MCP

---

## 1. 🛡️ ปรัชญาความปลอดภัย 4 ขั้นตอน (The 4-Phase Retrofit Pipeline)

```
[Phase 1: Safe Git Checkpoint] ──> สร้าง feature/retrofit-<name> และ commit สถานะเดิม
                                              │
                                              ▼
[Phase 2: Multi-Vector Scan]   ──> สแกน 4 มิติ: Performance, Compositor, Craft, Typography
                                              │
                                              ▼
[Phase 3: Hybrid 3-Tier Gate]  ──> Tier 1: Auto-Patch ทันที (Safe Quick-Wins)
                               ──> Tier 2 & 3: สร้างตารางขออนุมัติพร้อม Diff ให้ผู้ใช้เลือก
                                              │
                                              ▼
[Phase 4: DevTools Verification] ─> รัน Build ซ้ำ + รัน Trace เปรียบเทียบ Before vs After
```

---

## 2. 🎛️ Hybrid 3-Tier Risk Classification Matrix

การปรับปรุงเว็บเก่าแบ่งการจัดการออกเป็น 3 ระดับเพื่อควบคุมความเสี่ยง (Blast Radius Control via `/jev`):

| ระดับความเสี่ยง | ขอบเขตการดำเนินการ | พฤติกรรมของ AI | ตัวอย่างการแก้ไข |
| :--- | :--- | :--- | :--- |
| **Tier 1: Safe Quick-Wins** | เพิ่ม CSS Invariants ที่ไม่กระทบ Layout เดิม 100% ปลอดภัย | **ดำเนินการแก้ไขทันทีโดยอัตโนมัติ** | • เพิ่ม `aspect-ratio` บนแท็ก `<img>` ที่มี width/height<br>• เติม `scrollbar-gutter: stable;` ที่ `:root`<br>• ใส่ `content-visibility: auto` บน Section ใต้ Fold<br>• เติม `font-display: swap;` ป้องกัน FOIT |
| **Tier 2: Smoothness & Motion Tuning** | เปลี่ยนโครงสร้าง Transition และขยับไปรันบน Compositor Thread | **สรุปรายการ $\rightarrow$ ให้ผู้ใช้ยืนยัน $\rightarrow$ แก้ไข** | • แปลง `transition: top/left/width/height` เป็น `transform`<br>• แก้ไขปุ่มให้มี Area-Proportional Scaling (แยก Hit Box 44px)<br>• เติม `overscroll-behavior: contain` บน Modal |
| **Tier 3: Architectural Refactor** | การปรับโครงสร้างสถาปัตยกรรมหรือสลับ Library ใหญ่ | **เสนอแผนเปรียบเทียบ $\rightarrow$ รอการตัดสินใจ** | • ติดตั้ง Lenis หรือ Scroll Engine ใหม่<br>• นำ DOM Virtualization มาใส่ในตาราง/ฟีดข้อมูลยาว<br>• นำ Native View Transitions API มาสวมทับ Navigation |

---

## 3. 🔍 การสแกน 4 มิติบนโปรเจกต์เดิม (Multi-Vector Scan)

### มิติที่ 1: Visual Craft & Modern Invariants (ตามมาตรฐาน `medesign`)
1. **Squint & Contrast Test:** ตรวจค่า Contrast Ratio ของตัวหนังสือกับพื้นหลัง (ต้องผ่าน WCAG AA $\ge 4.5:1$)
2. **Concentric Radii:** ตรวจสอบขอบมนการ์ดซ้อนการ์ด ($r_{\text{outer}} = r_{\text{inner}} + \text{padding}$)
3. **Typography Script Rule:** ตรวจสอบ Font Stack ว่าประกาศ Latin ก่อน Thai หรือไม่ และตรวจ Body Line-Height (ต้อง $\ge 1.7$)
4. **Hit-Target vs Visual Pill:** ตรวจสอบปุ่มและแถบเลื่อนบนมือถือว่ามีพื้นที่สัมผัสอย่างน้อย 44×44px หรือไม่

### มิติที่ 2: Compositor & Smoothness (ตาม `references/compositor-smoothness.md`)
1. ค้นหาคลาส CSS / Tailwind ที่มี `transition-all` หรือ animate `width`/`height`/`top`/`left`
2. ค้นหาจุดเสี่ยง Layout Thrashing ใน JavaScript (`offsetHeight` ในลูป)
3. ตรวจสอบการรองรับ `@media (prefers-reduced-motion: reduce)`

### มิติที่ 3: Core Web Vitals & DevTools Profiling
1. ตรวจสอบ Render-blocking Scripts & Stylesheets
2. ตรวจสอบ Cumulative Layout Shift (CLS) จากรูปภาพที่ไม่มีสัดส่วนคงที่
3. ตรวจสอบ Largest Contentful Paint (LCP) จาก Hero image/banner ที่โหลดช้า

---

## 4. 📋 ขั้นตอนการนำไปใช้จริงกับโปรเจกต์เว็บเก่า

### ขั้นตอนที่ 1: เตรียมสภาพแวดล้อม
- ตรวจสอบ Git status:
  ```bash
  git status
  git checkout -b feature/web-modernization
  ```
- ทดสอบสั่ง Build โปรเจกต์ให้แน่ใจว่าของเดิมผ่านปกติ:
  ```bash
  npm run build
  ```

### ขั้นตอนที่ 2: ป้อน Master Retrofit Prompt
คัดลอก Master Prompt ใน Section 5 ส่งให้ AI ในเครื่องมือพัฒนา (Antigravity หรือ Claude Code)

### ขั้นตอนที่ 3: รับรายงานและตัดสินใจ
AI จะทำการกวาดแก้ Tier 1 ทันที และจะแสดงตารางสรุป Tier 2 และ Tier 3 ให้คลิกเลือกอนุมัติเป็นข้อๆ

### ขั้นตอนที่ 4: การตรวจสอบหลังแก้ (Post-Verification)
1. รัน Build ซ้ำ: `npm run build`
2. รันเปิด Preview และตรวจสอบความสมูทบนเบราว์เซอร์จริง
3. รวมกิ่งกลับเข้า main:
  ```bash
  git add -A
  git commit -m "perf: modernize legacy web with medesign 120fps invariants"
  ```

---

## 5. ⚡ Master Prompt สำหรับสั่ง AI ไป Retrofit เว็บเก่า

```markdown
คุณเป็น Elite Web Performance & Design Modernization Engineer
โปรดช่วยตรวจสอบและยกระดับเว็บไซต์ในโฟลเดอร์นี้ให้ได้มาตรฐานความสมูท 120fps และ Modern Craft Invariants

กฎการทำงาน (Strict Safety & Workflow):
1. ตรวจสอบ git status และสร้าง branch ใหม่: 'feature/web-modernization' ก่อนแก้ไฟล์ใดๆ
2. สแกนและจัดกลุ่มปัญหาออกเป็น 3 กลุ่ม (Hybrid 3-Tier Model):
   - Tier 1 (Safe Quick-Wins): จุดที่แก้แล้วปลอดภัย 100% ไม่กระทบหน้าตา (เช่น เติม aspect-ratio, content-visibility: auto บน section ใต้ fold, scrollbar-gutter: stable, font-display: swap)
     👉 ดำเนินการแก้โค้ดกลุ่มนี้ให้อัตโนมัติทันที
   - Tier 2 (Smoothness & Compositor Tuning): จุดที่กระตุกจาก CSS/JS (เช่น เปลี่ยน transition top/left/width/height เป็น transform, แก้ Layout Thrashing)
     👉 แสดงตารางสรุปไฟล์ พร้อม Diff ตัวอย่าง และรอการยืนยันจากฉันก่อนแก้
   - Tier 3 (Architectural Refactor): การปรับใหญ่ (เช่น เพิ่ม Lenis Scroll, ติดตั้ง View Transitions API)
     👉 วิเคราะห์ความคุ้มค่าและเสนอเป็นทางเลือก ให้ฉันตัดสินใจ
3. หลังแก้จุดที่ได้รับอนุมัติเรียบร้อย ให้รัน 'npm run build' หรือ Syntax Check เพื่อยืนยันว่าโค้ดผ่าน 100% ไม่มี Regression
```

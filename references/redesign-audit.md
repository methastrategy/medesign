# Anti-AI Design & Redesign Audit Protocol

เกณฑ์การตรวจสอบและยกระดับหน้าเว็บเดิมให้สวยงาม พรีเมียม และกำจัดร่องรอย "AI Generated Look" (AI Tells) โดยไม่กระทบฟังก์ชันการทำงานเดิมของระบบ

---

## 1. ลำดับขั้นตอนการรีดีไซน์ (3-Step Redesign Sequence)

1. **Scan (สำรวจสแต็กเดิม):** อ่านโครงสร้างโปรเจกต์เดิม ตรวจสอบ Framework (Next.js, Vite, React, Astro, Vue), วิธีจัดการสไตล์ (Tailwind CSS, Vanilla CSS, CSS Modules) และ Icon Library ที่ใช้อยู่
2. **Diagnose (วินิจฉัยจุดบกพร่อง):** เทียบโค้ดปัจจุบันกับ Checklist ข้อห้ามด้านล่าง คัดแยกรูปแบบที่ดูเชย หรือดูโหลแบบ AI
3. **Targeted Upgrade (ยกระดับเฉพาะจุด):** ปรับปรุงโค้ดบนสแต็กเดิมทันทีโดยไม่ต้องรื้อระบบใหม่ทั้งหมด (Incremental Polish)

---

## 2. หมวดการตรวจสอบเชิงลึก (Audit Checklist)

### ก. การจัดพิมพ์และตัวหนังสือ (Typography)
- [ ] **แทนที่ฟอนต์โหล (Inter/System Font):** ใช้ฟอนต์ที่มีบุคลิกชัดเจน เช่น `Geist`, `Cabinet Grotesk`, `Outfit`, `Plus Jakarta Sans` หรือคู่ฟอนต์สไตล์ Editorial (Serif สำหรับ Header + Sans สำหรับ Body)
- [ ] **น้ำหนักหัวข้อ (Headline Presence):** หัวข้อขนาดใหญ่ต้องปรับ Tracking ให้แน่นเสมอ (`letter-spacing: -0.025em` ถึง `-0.03em`) และลด `line-height` เหลือ `1.05 - 1.15`
- [ ] **ความกว้างบรรทัดข้อความ:** จำกัดความกว้างของย่อหน้าเนื้อหาให้อยู่ที่ `60 - 75ch` (`max-w-prose` หรือ `max-w-xl`) เพื่อให้อ่านสบายตา
- [ ] **ลำดับน้ำหนักฟอนต์:** เลิกใช้แค่ Regular (400) คู่กับ Bold (700) ให้เสริม Medium (500) และ SemiBold (600) เพื่อความต่อเนื่อง
- [ ] **ตัวเลขและตารางข้อมูล:** ใช้ฟอนต์ Monospace (`Geist Mono`, `JetBrains Mono`) หรือเปิดใช้งาน `font-variant-numeric: tabular-nums` เสมอ
- [ ] **ป้องกันคำโดด (Orphaned Words):** ใช้ `text-wrap: balance` สำหรับ Heading และ `text-wrap: pretty` สำหรับ Body Text

### ข. พื้นผิว สี และมิติ (Color, Surfaces & Depth)
- [ ] **ห้ามใช้ Pure Black (`#000000`):** ใน Dark Theme ให้ใช้ Off-Black เช่น `#09090b`, `#0d0d11`, หรือ `#121216` เพื่อความสบายตา
- [ ] **กำจัด AI Purple Gradient:** เลิกใช้สีเหลือบม่วง-ฟ้าแบบ AI เจนทั่วไป ให้ใช้พื้นสีกลางสะอาดคู่กับ Accent Color เพียง 1 สีที่ผ่านการคัดสรร
- [ ] **ควบคุมความสดของสี Accent:** คุมค่า Saturation ให้อยู่ต่ำกว่า 85% เพื่อความกลมกลืนระดับพรีเมียม
- [ ] **มิติเงาที่มีอุณหภูมิ (Tinted Shadows):** หลีกเลี่ยงเงาดำทื่อๆ ให้ผสมโทนสีของพื้นหลังลงในเงา (เช่น เงาสีกรมท่าเข้มบนพื้นหลัง Dark Navy)
- [ ] **ขอบและแสงตกกระทบ (Border Rim Light):** ใช้ขอบบาง `1px solid rgba(255, 255, 255, 0.08)` และ Top Rim Light (`linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)`) เพื่อสร้างความคมชัด
- [ ] **ความสม่ำเสมอของโหมดแสง:** หลีกเลี่ยงการแทรกกล่องสีดำสนิทลงในหน้า Light Mode อย่างไม่มีเหตุผล ให้คุมโทนพื้นหลังให้เป็นหนึ่งเดียว

### ค. โครงสร้างและการจัดวาง (Layout & Spacing)
- [ ] **กำจัด 3-Card Column Cliché:** เลิกวางการ์ดขนาดเท่ากัน 3 ช่องทื่อๆ เปลี่ยนเป็น Bento Grid แบบอสมมาตร, Horizontal Scroll, หรือ Two-Column Asymmetric Grid
- [ ] **ความสูงหน้าจออุปกรณ์:** ใช้ `min-height: 100dvh` แทน `100vh` เพื่อป้องกันปัญหา Layout กระตุกบนเบราว์เซอร์มือถือ (iOS Safari URL bar bug)
- [ ] **ขอบเขตความกว้างหน้าจอ:** กำหนด `max-w-[1200px]` ถึง `max-w-[1440px]` พร้อม `mx-auto` เสมอ ป้องกันเนื้อหายืดแผ่ขอบจอ
- [ ] **การจัดตำแหน่งปุ่ม CTA ในการ์ด:** ใช้ `mt-auto` ใน Flexbox Card เพื่อให้ปุ่ม Action ด้านล่างอยู่ระนาบเดียวกันเสมอ ไม่กระโดดตามความยาวเนื้อหา
- [ ] **ระยะหายใจ (Whitespace):** เพิ่ม Padding และ Gap ให้กว้างขึ้น ให้หน้าเว็บโปร่ง โล่ง และมีจุดโฟกัสสายตาที่ชัดเจน

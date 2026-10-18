# Premium Web & Mobile UI Image Art Direction

มาตรฐานการออกแบบคำสั่งสร้างภาพต้นแบบ (UI Mockup Direction) สำหรับหน้าเว็บและแอปมือถือ เพื่อสร้างภาพอ้างอิงระดับเวิลด์คลาสก่อนลงมือเขียนโค้ดจริง

---

## 1. กฎเหล็กการสร้างภาพ (Hard Output Rules)

1. **One Separate Image Per Section (หน้าเว็บ):**
   - สร้างภาพแนวนอน (Aspect Ratio `16:9` หรือ `3:2`) แยก 1 ภาพต่อ 1 Section เสมอ
   - ห้ามรวบทั้งหน้าเว็บ Landing Page ลงในภาพแนวยาวเพียงภาพเดียวเด็ดขาด เพราะจะทำให้ฟอนต์เล็ก ละเอียด และไม่สามารถแกะโค้ดต่อได้
2. **One Focused Screen / Flow Per Generation (แอปมือถือ):**
   - สร้างภาพแนวตั้ง (Aspect Ratio `9:16` หรือ `3:4`) เน้นหน้าจอเดี่ยวที่คมชัด หรือ Side-by-side Flow ไม่เกิน 2-3 จอ
   - จำลอง Safe Area ของ iOS/Android (Status Bar, Home Indicator, Dynamic Island) ให้สมจริง

---

## 2. ทลายความจำเจของ Hero Section (Break Hero Clichés)

หลีกเลี่ยงการใช้เลย์เอาต์ซ้ำซาก **"ข้อความซ้าย / ภาพขวา"** เป็นค่าเริ่มต้น ให้เลือกใช้ทางเลือกต่อไปนี้:
- **Centered over Ambient Depth:** ข้อความกึ่งกลางบนพื้นหลังกราฟิก 3D หรือภาพ Abstract Depth
- **Bottom-Left Over Canvas:** ข้อความวางชิดซ้ายล่าง พาดทับฉากหลังขนาดใหญ่แบบภาพยนตร์
- **Editorial Asymmetry:** ข้อความตัวใหญ่แบบนิตยสาร พร้อมคอลัมน์รูปภาพขนาดเล็กตัดกัน
- **Stacked Split Canvas:** สื่อ/เดโมอยู่กึ่งกลางเต็มจอ พร้อม Floating Badge แสดงฟังก์ชันหลัก

---

## 3. มาตรฐานการกำหนดคำสั่ง (Prompt Blueprint)

### ก. โครงสร้างพรอมต์หน้าเว็บ (Web Section Prompt):
```text
UI concept comp for a [industry/purpose] website, [specific section name] section.
Layout: [e.g. Asymmetric bento grid / Full-width hero with bottom typography].
Style & Aesthetics: Premium dark-mode void background (#09090b), crisp 1px borders with subtle glow, refined typography with Serif display headline and sans-serif body, restrained indigo accent (#6366f1).
Visual Content: High-fidelity dashboard widgets, clean interactive toggles, real data visualizations, generous whitespace, sharp contrast, zero blur on text elements.
Presentation: Direct screen capture, clean 16:9 desktop viewport, professional Dribbble/Awwwards award-winning aesthetic, flat straight-on view, no device mockup frame.
```

### ข. โครงสร้างพรอมต์แอปมือถือ (Mobile App Screen Prompt):
```text
Mobile app UI design for iOS [purpose/domain, e.g. Fintech wealth tracker], single screen [e.g. Home Dashboard].
Aesthetics: Warm dark surface (#111115), frosted glass navigation bar, refined tabular figures with Geist Mono font, subtle accent voltage (#f59e0b).
Components: Top status bar with Dynamic Island, total balance hero card, segmented asset allocation chart, quick action pill buttons, recent transactions feed.
Presentation: Ultra-clean 9:16 mobile screen view, pixel-perfect native iOS guidelines, crisp typography hierarchy, believable metric values, no external phone frame.
```

---

## 4. สิ่งที่ต้องกำจัดในภาพต้นแบบ (Anti-Generic Tells)
- ห้ามใช้คำศัพท์ Interface ปลอมหรือข้อความ Lorem Ipsum ที่มั่วซั่ว
- ห้ามใส่แสงนีออนฟุ้งกระจายจนอ่านข้อความไม่ออก
- ห้ามสร้างการ์ดซ้อนการ์ดเกิน 3 ชั้น
- รักษาคู่สีให้คุมโทน สอดคล้องกับ [user-profile.json](../user-profile.json) ของผู้ใช้

## 7. World-Class 50+4 Category Vocabulary Vault & Smart Questioning / Auto-Inspector Protocol

### 📚 คลังคำศัพท์และแม่แบบระดับโลกที่บันทึกในเครื่อง (50+4 หมวดหมู่ · 750+ คำศัพท์ & Patterns — ผู้ใช้ไม่ต้องจำศัพท์เอง)
- **Markdown Reference:** `references/ui-ux-vocabulary-vault.md`
- **Structured JSON:** `references/ui-ux-vocabulary-vault.json`
- **Interactive Localhost Explorer:** `http://localhost:3333/vocab`
- **ขอบเขตเนื้อหา 4 ชั้น (ครบ 50+4 หมวดหมู่):**
  1. **หมวดที่ 1–20 (Core UI/UX Architecture):** Website Structure, Navigation, Layout, Spacing, UI Components, Information Components, Dashboard Design, Micro-interactions, Motion, Responsive, Typography, Visual Design, Design System, Modern UI Styles, UX Vocabulary, A11y, UX States, Web Layout Patterns, UX Patterns, Performance
  2. **หมวดที่ 21–33 (Extended World-Class & WebGIS UI):** Advanced Visual Effects, Color System, Complete Interactive States Matrix, Advanced Layout Techniques, Data Visualization UI, **GIS-Specific UI (Map Canvas, Basemap, Vector/Raster Layers, Extent/Fit Bounds, Scale Bar, Spatial Query, Snapping/Vertex Editing)**, Premium UI Patterns, Modern Design Trends, Performance & Optimization, Detailed A11y, Design Handoff, Professional Jargon, AI Prompt-Friendly Terms
  3. **หมวดที่ 34–50 (17 หมวดความรู้เสริม & Missing Mastery Patterns):**
     - `34` Visual Rhythm & Eye-Tracking Flow (`F-Pattern`, `Z-Pattern`, `Layer-Cake`, `Spotted`, `Gutenberg Diagram`)
     - `35` Grid Sophistication (`Compound 4+3 Grid`, `Asymmetric 8:4 / 7:5`, `Golden Ratio 1:1.618`, `Exposed 1px Swiss Grid`)
     - `36` Typography Mastery (`1.200 / 1.250 Modular Scale`, `Tabular Lining Figures`, `Slashed Zero`, `text-wrap: balance`)
     - `37` Color Psychology & `60-30-10` Rule (`60%` Canvas `#f3f1eb`/`#050505` : `30%` Surface `#fff`/`#111` : `10%` Accent `#15803d`/`#34d399`)
     - `38` Spacing System (`8pt Spatial Grid` + `4pt Micro-Grid` + `Internal <= External Proximity Rule`)
     - `39` Complete 9-State Component Checklist (`Default`, `Hover`, `Focus-Visible`, `Active scale(0.97)`, `Disabled`, `Loading`, `Empty + 1-Click Sample Loader`, `Error + Recovery`, `Success/Verified`)
     - `40` Animation Principles (`150ms–200ms Micro-Response`, `GPU-Safe transform/opacity`, `Zero Hover Bounce`)
     - `41` Professional Layout Terminology (`Above the Fold`, `Eyebrow/Kicker`, `Chrome vs Canvas Ratio 12:88`)
     - `42` Advanced Interaction Patterns (`Synchronized Table ↔ Map Highlighting`, `Inline Direct Editing`, `Smart Excel/CSV Paste`)
     - `43` Dashboard-Specific Patterns (`Co-located Action Bar`, `Pinned Summary/Misclosure Row`, `KPI with Tolerance Badge`)
     - `44` Responsive Priority+ (`Priority+ Top Nav`, `Desktop Split → Mobile Tabs`, `Sticky Station Column`)
     - `45` Error Prevention & Recovery (`1-Click Sample Data Cure`, `Explicit Unit Headers`, `localStorage Persistence`)
     - `46` Performance Budget (`CLS = 0`, `Instant CSS Variable Theme Switch`, `60fps Inline SVG`)
     - `47` A11y Pre-Flight Checklist (`Outdoor AAA Contrast >12:1`, `Icon + Text + Color Redundancy`)
     - `48` 3-Tier Design Tokens (`Tier 1 Primitive` → `Tier 2 Semantic` → `Tier 3 Component`)
     - `49` 6-Part AI Design Prompt Formula & Component Spec Blueprint
     - `50` 10 Anti-Patterns & 12-Point Pre-Delivery QA Gate
  4. **หมวดลับ `EXP-01` ถึง `EXP-04` (Expert Design Engineer Vocabulary):** Surface Physics, Typographic Micro-Mechanics, Spatial Topology, High-Craft Interaction Density

### 🧠 กฎเหล็กสำหรับผู้ใช้ที่ไม่จำคำศัพท์ (Recognition over Recall & Auto-Context Inspection)
เมื่อผู้ใช้สั่ง `/medesign` ให้ปฏิบัติตาม 2 โหมดอัจฉริยะนี้เสมอ:

1. **โหมดสร้างอัตโนมัติจากข้อมูลที่มีโดยไม่ต้องถาม (`Zero-Question Auto-Context Inspector — Q-01`):**
   - เมื่อผู้ใช้ส่งรายละเอียดงาน โค้ดเดิม หรือสั่งให้จัดการจากข้อมูลที่มีอยู่ **ห้ามยิงคำถามจุกจิกซ้ำซาก**
   - ให้ AI แปลงคำสั่งสั้นๆ เข้าสู่ **6-Part Master Prompt Formula (หมวด 49)** และสรุป **Coverage Audit 3 ส่วน** ทันทีก่อนลงมือสร้าง:
     1. **หัวข้อหลักที่ตรวจพบ (Detected Primary Sections):** สกัดว่าหน้านี้ต้องมีหัวข้อหลัก ตาราง กราฟ หรือส่วนแสดงผลอะไรบ้างจากข้อมูลที่ให้มา
     2. **ส่วนสำคัญที่ระบบเติมให้อัตโนมัติ (Auto-Completed Missing Essentials — หมวด 39, 43, 45):** ตรวจสอบว่ายังขาดองค์ประกอบสำคัญอะไรที่ทำให้ใช้งานจริงได้สมบูรณ์ (เช่น ปุ่ม `📥 โหลดข้อมูลตัวอย่าง 1 คลิก` สำหรับแก้ปัญหาหน้าโล่ง, แถวสรุปผลรวมท้ายตาราง `Pinned Totals / Misclosure Row`, ป้ายสถานะเกณฑ์มาตรฐาน `Pass/Fail Badge`, แถบปุ่ม `ส่งออก CSV/GeoJSON` ที่วางติดกับหัวตาราง, ระบบสลับธีม `Fieldbook ↔ Terminal`) แล้วเติมให้ครบอัตโนมัติทันที
     3. **กฎดีไซน์ระดับโลกจาก DNA & 12-Point QA Gate (หมวด 34–50):** บังคับใช้ `Zero-Sidebar Top-Nav`, `Underline 2px Tabs`, `Z/F-Pattern Flow`, `60-30-10 Color Rule`, `8pt Spacing`, `Geist Mono Tabular Numerals`, `3-Tier CSS Tokens` และบล็อก Anti-Slop ทั้ง 10 ข้อโดยอัตโนมัติ

2. **โหมดยิงคำถามระดับ Expert สำหรับเวลาที่ต้องการให้ผู้ใช้เลือก (`Expert Visual Questioning — Q-02 ถึง Q-06`):**
   - **ห้ามถามด้วยคำศัพท์เทคนิคดิบๆ** (เช่น ห้ามถามลอยๆ ว่า *"ต้องการ Tonal Layering หรือ Glassmorphism?"*)
   - ต้องแปลเป็น **"ภาษาคนเข้าใจง่าย + บอกผลลัพธ์ทางสายตาและการใช้งานจริง"** พร้อมใส่ `(Recommended ตาม DNA)` ไว้ที่ตัวเลือกแรกเสมอ
   - สามารถเปิด **Localhost Interactive Questioner Templates (`http://localhost:3333/wizard/1` ถึง `/wizard/6`)** ให้ผู้ใช้คลิกเลือกจากภาพจริงได้ทั้ง 6 รูปแบบ:
     - `Q-01` (`/wizard/1`): **Zero-Question Auto-Context Inspector** — สแกนข้อมูล ตรวจเช็กหัวข้อหลัก เติมส่วนที่ขาด (ครบ 9 States & 12 QA Gate) และสร้างหน้าเว็บสดทันที
     - `Q-02` (`/wizard/2`): **Visual Anatomy Card Deck** — ไพ่ภาพจำลองขนาดจิ๋วเปรียบเทียบสดครบ 4 มิติ ไม่ต้องจำศัพท์
     - `Q-03` (`/wizard/3`): **Split-Screen Tactile Equalizer** — เลื่อนสไลเดอร์และสวิตช์เปิด/ปิดหัวข้อหลักทางซ้าย ดูหน้าเว็บเปลี่ยนสดทางขวา
     - `Q-04` (`/wizard/4`): **Smart 3-Step Triage** — ล็อก DNA 80% แล้วถามเฉพาะเป้าหมายหลักของหน้า (พร้อมปุ่มข้ามคำถามทั้งหมด)
     - `Q-05` (`/wizard/5`): **Component A/B/C Shootout** — วางชิ้นส่วน UI ของจริงเทียบกันครบ 3 ท่อน (แถบเมนูบน, การ์ด KPI, ตารางคู่ผังกราฟิก) ให้กดโหวตเลือกแล้วประกอบร่างสด
     - `Q-06` (`/wizard/6`): **Swiss Engineering Blueprint Matrix** — แผงพิมพ์เขียวตารางเส้นคม 1px ควบคุมครบทุกหมวดพร้อม 12-Point Pre-Delivery QA Gate ในหน้าเดียว

---


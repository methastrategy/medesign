# Executive PDF Reports & Strategic Document Architecture

คู่มือมาตรฐานสถาปัตยกรรมเอกสารและรายงานบริหาร (Executive PDF Reports) สำหรับ `/medesign` ออกแบบมาเพื่อรายงานระดับ C-Suite, บอร์ดบริหาร, และงานวิศวกรรมยุทธศาสตร์ที่ต้องการความน่าเชื่อถือระดับสูงสุด ยึดหลัก 5-Second Scan, ไร้สิ่งรบกวนทางสายตา (Zero Slop), และความสมบูรณ์แบบในการพิมพ์ (Print-Ready)

---

## 1. 📐 12-Column Grid Snapping บน 4pt Baseline

### 1.1 Vertical Rhythm: 4pt Baseline Grid
ทุกองค์ประกอบทางสายตา (Visual Elements) ต้องมีขนาด, ความสูงบรรทัด (Line-Height), Padding, และ Margin ที่ลงตัวกับทวีคูณของ **4pt / 4px**:
- **Baseline Steps:** `4pt, 8pt, 12pt, 16pt, 20pt, 24pt, 28pt, 32pt, 40pt, 48pt`
- **Text Alignment:** Baseline ของข้อความในคอลัมน์คู่ขนานต้องวางทาบตรงกันเป๊ะตามแนวขวาง (Snapping to Baseline)
- **Line-Height Multiples:**
  - หัวข้อหลัก (Title): `28pt` หรือ `32pt`
  - หัวข้อย่อย (Subtitle): `20pt` หรือ `24pt`
  - ข้อความเนื้อหา (Body): `16pt` (บน Font Size `9.5pt` หรือ `10pt`)

### 1.2 12-Column Layout Geometry (A4 Landscape & Portrait)
- **A4 Landscape Dimensions:** $297\text{mm} \times 210\text{mm}$ ($841.89\text{pt} \times 595.28\text{pt}$)
- **Margins:** ซ้าย/ขวา `32pt`, บน/ล่าง `28pt`
- **Columns & Gutters:** 12 คอลัมน์เท่ากัน พร้อม Gutter ขนาดคงที่ `16pt`

```css
:root {
  --page-width: 297mm;
  --page-height: 210mm;
  --baseline-unit: 4pt;
  
  --margin-x: 32pt;
  --margin-y: 28pt;
  --column-gutter: 16pt;
  --grid-columns: 12;
}

.report-grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: var(--column-gutter);
  row-gap: calc(var(--baseline-unit) * 4); /* 16pt */
}
```

---

## 2. 🏛️ The 8 + 4 Consulting Split (McKinsey / BCG / Bain Standard)

ในการนำเสนอข้อมูลเชิงบริหาร ห้ามกระจายเนื้อหาเต็ม 12 คอลัมน์แบบหน้ากระดาษธรรมดา ให้ใช้โครงสร้าง **8 + 4 Consulting Split**:

```
┌────────────────────────────────────────────────────────┬───────────────────────────┐
│ 8 COLUMNS: MAIN STAGE & ANALYTICAL NARRATIVE            │ 4 COLUMNS: MARGIN RAIL    │
│ • Action Title & Executive Summary                     │ • Executive Key Takeaways │
│ • Core Quantitative Chart / Map Telemetry               │ • Data Provenance & Date  │
│ • Comparative Synthesis Table                          │ • Methodology Footnotes   │
│ • Analytical Deep Dive Paragraphs                      │ • Next Strategic Action   │
└────────────────────────────────────────────────────────┴───────────────────────────┘
```

### 2.1 หน้าที่ของ 8 คอลัมน์หลัก (Main Stage)
- ครองพื้นที่ $66.7\%$ ของหน้ากระดาษ
- บรรจุ **Hero Visual** (ชาร์ตข้อมูลขนาดใหญ่, แผนที่รังวัด/GIS, หรือตารางเปรียบเทียบ)
- บรรจุเนื้อหาบทวิเคราะห์ที่ขับเคลื่อนด้วยหลักฐานเชิงประจักษ์ (Evidence-backed prose)

### 2.2 หน้าที่ของ 4 คอลัมน์ขวา (Margin Rail)
- ครองพื้นที่ $33.3\%$ ของหน้ากระดาษ
- **Executive Callout Box:** กล่องสรุปข้อค้นพบสำคัญ (Key Takeaway) พร้อมตัวเลขไฮไลต์
- **Data Provenance & Sources:** ที่มาของชุดข้อมูล, วันที่เก็บข้อมูลภาคสนาม, ค่าพิกัด, และสมมติฐานทางสถิติ
- **Methodology & Footnotes:** อธิบายสูตรคำนวณหรือข้อจำกัดทางวิศวกรรม

```css
.consulting-stage {
  grid-column: span 8;
}
.consulting-rail {
  grid-column: span 4;
  border-left: 0.5pt solid var(--border-subtle, #e5e7eb);
  padding-left: var(--column-gutter);
}
```

---

## 3. ⚡ The L1 / L2 / L3 5-Second Scan Framework

ผู้บริหารระดับสูงมีเวลาสแกนเอกสารแต่ละหน้าเพียง **5 วินาที** ก่อนตัดสินใจ โครงสร้างเอกสารต้องส่งสารได้ครบทั้ง 3 ระดับทันที:

### 3.1 L1: Action Title (สแกน 1 วินาทีแรก)
- **กฎเหล็ก:** **หัวข้อทุกตัวต้องเป็น "ประโยคสรุปผลเต็มประโยค" (Action Title)** ที่บอกข้อสรุปหรือ Insight ทันที
- ❌ **ห้ามใช้หัวข้อบอกหัวเรื่องทั่วไป:**
  - ❌ *"ผลการดำเนินงานไตรมาส 3"*
  - ❌ *"การวิเคราะห์ความคลาดเคลื่อนทางรังวัด"*
  - ❌ *"Revenue Breakdown"*
- ✅ **ต้องใช้ Action Title ที่ได้ข้อสรุป:**
  - ✅ *"รายได้ Q3 เติบโต 24% จากการขยายฐานลูกค้าระดับ Enterprise ในกลุ่มพลังงาน"*
  - ✅ *"ความคลาดเคลื่อนแนวราบเฉลี่ย 1.8 ซม. อยู่ในเกณฑ์มาตรฐานชั้น 1 ของกรมที่ดิน"*
  - ✅ *"ต้นทุนด้านคลาวด์ลดลง 38% หลังย้ายเวิร์กโหลดสู่ On-Premise GPU Cluster"*

### 3.2 L2: Directly Labeled Visuals (สแกน 2 วินาทีถัดมา)
- **กฎเหล็กตัดกล่อง Legend ทิ้ง:** **ห้ามใส่กล่อง Legend แยกต่างหากเด็ดขาด** (`legend: { display: false }`)
- **Direct Labeling:** ให้พิมพ์ชื่อชุดข้อมูลและตัวเลขสรุปผลกำกับไว้ที่ **ปลายเส้นกราฟ (Line endpoint)** หรือ **บนแท่งกราฟ (Bar header)** โดยตรงด้วยสีเดียวกับข้อมูลนั้น
- **เหตุผลทางประสาทวิทยาการรับรู้:** การมีกล่อง Legend บังคับให้สมองผู้บริหารต้องกวาดสายตาสลับไปมาระหว่างเส้นกราฟกับกล่องสัญลักษณ์ถึง 6–8 ครั้ง เกิด Cognitive Friction ที่ไม่จำเป็น

### 3.3 L3: Quantitative Detail & Provenance (สแกน 2 วินาทีสุดท้าย)
- ตัวเลขสถิติเจาะลึก, ค่าเบี่ยงเบนมาตรฐาน ($\pm \sigma$), ขนาดกลุ่มตัวอย่าง ($n$), และข้อมูลผู้ตรวจรับงาน
- จัดวางอย่างประณีตใน 4 คอลัมน์ขวาหรือ Footnote ท้ายหน้า

---

## 4. 📊 Executive Table Discipline (วินัยแห่งตารางข้อมูลบริหาร)

ตารางข้อมูลในรายงานบริหารต้องมีความสง่างามระดับสูงสุดตามมาตรฐานวารสารวิทยาศาสตร์และการเงินระดับโลก (The Economist / Nature Standard):

```
┌────────────────────────────────────────────────────────────────────────┐
│ Metric / Asset Name              Sample Size     Mean (m)    Status    │ ← Hairline 0.5pt (Top/Bottom)
├────────────────────────────────────────────────────────────────────────┤
│ BM-KU-01 (Station Bench)               1,240      14.285      PASS     │
│ BM-KU-02 (Survey Boundary)               850       8.104      PASS     │ ← Hairline 0.25pt horizontal only
│ BM-KU-03 (Cadastral Pin)               2,100      22.950      PASS     │
├────────────────────────────────────────────────────────────────────────┤
│ Total Aggregate / Tolerance            4,190      15.113      PASS     │ ← Hairline 0.5pt
└────────────────────────────────────────────────────────────────────────┘
  (ไม่มีเส้นแนวตั้งแม้แต่เส้นเดียว / ตัวเลขชิดขวา tabular-nums ทุกช่อง)
```

### 4.1 กฎเหล็ก 4 ประการของ Executive Table
1. **Horizontal Hairlines 0.25pt:**
   - เส้นคั่นแนวนอนใต้ Header และระหว่างแถวต้องใช้เส้นบางพิเศษ `0.25pt` (หรือ `0.5px` ใน CSS)
   - เส้นตีกรอบบนและล่างสุดของตารางใช้ขนาด `0.5pt`
2. **Zero Vertical Gridlines (ตัดเส้นแนวตั้งทิ้ง 100%):**
   - **ห้ามมีเส้นคั่นแนวตั้งเด็ดขาด** (`border-left: 0; border-right: 0;`)
   - ความเป็นระเบียบของคอลัมน์เกิดจาก Alignment ทางสายตาและ Gutter ที่แม่นยำ ไม่ใช่เส้นกรงขัง
3. **Right-Aligned Numerical Discipline:**
   - คอลัมน์ตัวเลข, พิกัด, ยอดเงิน, สถิติ, และเปอร์เซ็นต์ ต้อง **ชิดขวาเสมอ** (`text-align: right;`)
   - บังคับเปิดใช้ `font-variant-numeric: tabular-nums lining-nums;` เพื่อให้หลักหน่วย สิบ ร้อย พัน ตรงกันเป็นแนวดิ่งเป๊ะ
   - คอลัมน์ข้อความชิดซ้าย (`text-align: left;`), คอลัมน์สถานะ/Badge อยู่กึ่งกลาง (`text-align: center;`)
4. **Zebra Striping Limitation:**
   - **ห้ามใช้ Zebra Striping กับตารางทั่วไป** ให้ใช้พื้นหลังขาวสะอาด
   - อนุญาตให้ใช้ Zebra Striping อ่อนมาก (`rgba(0,0,0,0.02)`) เฉพาะในตารางกว้างที่มี **$\ge 8$ คอลัมน์** เท่านั้น
   - **Print Reset:** เมื่อพิมพ์หรือส่งออกเป็น PDF ต้องตัด Zebra Striping ทิ้งทั้งหมด:
```css
@media print {
  table.wide-table tr:nth-child(even) {
    background-color: transparent !important;
  }
}
```

---

## 5. 🖨️ Print & PDF Export CSS Engine (Paged Media Standard)

ชุดคำสั่ง CSS มาตรฐานเพื่อให้เอกสารเรนเดอร์และพิมพ์ออกเป็น PDF ได้สมบูรณ์แบบโดยไม่มีหน้าฉีกหรือ Layout เพี้ยน:

```css
@page {
  size: A4 landscape;
  margin: 20mm 15mm 15mm 15mm;
  
  @top-left {
    content: "EXECUTIVE BRIEFING | DIVISION OF SURVEY ENGINEERING";
    font-family: "Geist", "Noto Sans Thai", sans-serif;
    font-size: 7pt;
    letter-spacing: 0.05em;
    color: #6b7280;
  }
  
  @top-right {
    content: "STRICTLY CONFIDENTIAL";
    font-family: "Geist Mono", monospace;
    font-size: 7pt;
    color: #9ca3af;
  }
  
  @bottom-left {
    content: "Project: Metha Cadastre & Geodetic QA/QC";
    font-family: "Geist", "Noto Sans Thai", sans-serif;
    font-size: 7pt;
    color: #9ca3af;
  }
  
  @bottom-right {
    content: "Page " counter(page) " of " counter(pages);
    font-family: "Geist Mono", monospace;
    font-size: 7pt;
    color: #6b7280;
  }
}

@media print {
  body {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    background: #ffffff !important;
    color: #111827 !important;
    font-size: 9.5pt;
    line-height: 1.6;
  }

  /* ป้องกันการตัดขาดครึ่งชิ้นระหว่างหน้า */
  .report-card,
  .chart-container,
  .executive-table,
  .metric-kpi-block {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
  }

  /* บังคับตัดขึ้นหน้าใหม่สำหรับหมวดหมู่ใหญ่ */
  .page-break-before {
    break-before: page !important;
    page-break-before: always !important;
  }

  /* ซ่อนชิ้นส่วนนำทางหน้าจอที่ไม่จำเป็น */
  .no-print,
  .screen-toolbar,
  nav,
  button:not(.print-keep) {
    display: none !important;
  }
}
```

---

## 6. ✅ Executive Pre-Ship Quality Checklist

- [ ] **12-Col / 4pt Baseline:** ทุกกล่องข้อความและชาร์ตยึด 12 คอลัมน์ และระยะดิ่งลงตัวกับ 4pt Baseline
- [ ] **8 + 4 Consulting Split:** แบ่งแยกชัดเจนระหว่างเนื้อหาหลัก 8 คอลัมน์ และรางข้อมูล/แหล่งที่มา 4 คอลัมน์
- [ ] **Action Titles (L1):** ทุกหน้าและทุกชาร์ตมีหัวข้อเป็นประโยคสรุปผลเต็มประโยค (ไม่มีหัวข้อลอยๆ)
- [ ] **Direct Labeling (L2):** ตัดกล่อง Legend ทิ้งทั้งหมด ข้อมูลกำกับไว้ที่เส้น/แท่งกราฟโดยตรง
- [ ] **Table Cleanliness:** เส้นคั่นแนวนอน `0.25pt`, เส้นแนวตั้งเป็นศูนย์, ตัวเลขชิดขวา `tabular-nums`
- [ ] **Print Integrity:** ทดสอบ Print Preview หน้าไม่แตก, `break-inside: avoid` ทำงาน, สีไม่เพี้ยน

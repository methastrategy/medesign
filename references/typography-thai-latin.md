# Thai-Latin Typography Calibration & Font Pairing Guide

คู่มือมาตรฐานวิศวกรรมตัวพิมพ์สองภาษา (Thai & Latin Bi-lingual Typography) สำหรับระบบออกแบบ `/medesign` ครอบคลุมกฎ Latin-First, การปรับจูนระยะบรรทัดและช่องไฟเฉพาะภาษาไทย (Thai Typographic Calibration) และตารางจับคู่ฟอนต์ทางการ 4 บริบทหลัก

---

## 1. 🔤 Latin-First Rule (กฎการวางลำดับฟอนต์)

### 1.1 ทำไมต้องวาง Latin นำหน้า Font ไทยเสมอ?
เบราว์เซอร์จะประมวลผลข้อความโดยจับคู่ตัวอักษร (Glyph) ทีละตัวตามลำดับของ `font-family`:
- **หากวาง Font ไทยก่อน Latin:** เบราว์เซอร์จะดึง Glyph ภาษาอังกฤษและตัวเลขที่แถมมาใน Font ไทยมาแสดงผล ซึ่งโดยทั่วไป Glyph ภาษาอังกฤษใน Font ไทยมักไม่ได้ผ่านการปรับแต่ง Kerning, Optical Balance, x-height, หรือ Tabular Figures ในระดับเทียบเท่ากับฟอนต์ Latin ชั้นนำระดับสากล
- **เมื่อวาง Latin นำหน้า Font ไทย:** เบราว์เซอร์จะเรนเดอร์อักษรละติน (A-Z, a-z) เครื่องหมาย และตัวเลขด้วยฟอนต์ Latin คุณภาพสูงก่อน เมื่อพบตัวอักษรภาษาไทยที่ไม่มีในฟอนต์ Latin จึงจะ Fallback สลับมาใช้ Glyph จากฟอนต์ไทยอย่างราบรื่น

### 1.2 ไวยากรณ์มาตรฐาน (Production Font Stack)
```css
/* ถูกต้อง: Latin-First */
font-family: "Geist", "Noto Sans Thai", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

/* ห้ามทำ: Thai-First (จะดึง Latin glyphs คุณภาพต่ำของฟอนต์ไทยมาใช้) */
/* font-family: "Noto Sans Thai", "Geist", sans-serif; */
```

---

## 2. 📐 Thai Typographic Calibration (การปรับจูนฟอนต์ภาษาไทย)

### 2.1 Letter-Spacing Invariant: บังคับ `letter-spacing: 0` สำหรับภาษาไทย
- **ข้อห้ามเด็ดขาด:** **ห้ามใส่ Negative Tracking (`letter-spacing: -0.02em` ถึง `-0.05em` หรือ Tailwind `tracking-tight` / `tracking-tighter`) กับข้อความที่มีภาษาไทยเด็ดขาด**
- **เหตุผลทางโครงสร้างอักขระ:** โครงสร้างภาษาไทยมีวรรณยุกต์และสระ 4 ระดับ (สระบน 2 ระดับ, พยัญชนะ, สระล่าง 1 ระดับ เช่น `ปิ๊`, `ผู้`, `ที่`) การบีบ Tracking จะทำให้:
  1. วรรณยุกต์และสระบนเลื่อนไปชนหรือเกยกับพยัญชนะและวรรณยุกต์ตัวข้างเคียง (Diacritic Collisions)
  2. สระหน้า (เ, แ, โ, ใ, ไ) วิ่งชนพยัญชนะตัวก่อนหน้า
- **กฎการแยกบริบท (Script-Aware Letter Spacing):**
  - **ภาษาอังกฤษล้วน (Display / Headings):** อนุญาตให้ใช้ `letter-spacing: -0.025em` ถึง `-0.035em`
  - **ภาษาไทย หรือข้อความสองภาษา (Bi-lingual):** ต้องรีเซ็ต `letter-spacing: 0` เสมอ

```css
/* หัวข้อสากลที่รองรับข้อความไทย */
.heading-display {
  font-family: var(--font-heading);
  letter-spacing: 0; /* ป้องกันวรรณยุกต์ชนกัน */
}

/* หากเป็นส่วนภาษาอังกฤษล้วนโดยเฉพาะ */
:lang(en) .heading-display,
.heading-display-en {
  letter-spacing: -0.025em;
}
```

### 2.2 Line-Height Ladder: ระยะห่างบรรทัดสำหรับภาษาไทย
ภาษาไทยต้องการความสูงบรรทัด (Vertical Leading) มากกว่าภาษาละตินอย่างมีนัยสำคัญ เพื่อป้องกันไม่ให้สระบน/วรรณยุกต์ของบรรทัดล่างชนกับสระล่างของบรรทัดบน:

| บริบทการใช้งาน | ภาษาอังกฤษ (Latin) | ภาษาไทย (Thai) | คลาส Tailwind แนะนำ |
|---|---|---|---|
| **Body / Reading Prose** | `1.50 – 1.60` | **`1.70 – 1.80`** | `leading-[1.75]` หรือ `leading-relaxed` |
| **Headings / Titles** | `1.10 – 1.25` | **`≥ 1.30`** | `leading-[1.3]` ถึง `leading-snug` |
| **UI Controls (Buttons, Badges)** | `1.20 – 1.25` | **`1.35 – 1.40`** | `leading-normal` + `padding-top: 2px` |

> **คำเตือน:** ห้ามใช้ `leading-none` หรือ `leading-[1]` กับหัวข้อภาษาไทย เพราะสระบน (ิ, ี, ึ, ื, ั, ้) จะถูกขอบบนของคอนเทนเนอร์เฉือนขาดทันที

### 2.3 Optical Headroom & Trimming
สำหรับ UI Chrome เช่น ปุ่มและ Badge เมื่อใช้ CSS `text-box-trim` ต้องใส่ `padding-top: 2px–4px` สำรองเป็น Optical Headroom เสมอ:
```css
@supports (text-box: trim-both text alphabetic) {
  .btn-label-thai {
    text-box: trim-both text alphabetic;
    padding-top: 2px; /* พื้นที่เผื่อสระบนและวรรณยุกต์ */
  }
}
```

### 2.4 Metric Calibration: `size-adjust: 105%–110%` ป้องกัน Layout Shift (CLS = 0)
- **ปัญหาทางสายตา:** ฟอนต์ภาษาไทยมาตรฐาน (เช่น `Noto Sans Thai`, `IBM Plex Sans Thai`) มักมีระดับความสูงกึ่งกลางตัวอักษร (x-height) ต่ำกว่าฟอนต์ละตินสมัยใหม่ (เช่น `Geist`, `Inter`) ประมาณ 5% ถึง 10% เมื่อแสดงผลข้อความผสมสองภาษา (Mixed Script) ตัวอักษรไทยจะดูตัวเล็กกว่าและจมลง
- **สูตรชดเชยด้วย `@font-face` Descriptor:** ใช้ `size-adjust: 105%–110%` ภายใน `@font-face` เพื่อขยายขนาด Glyph ภาษาไทยให้มีความสมดุลทางสายตากับ x-height ของฟอนต์ Latin โดยไม่กระทบต่อ Line-Height หลัก:

```css
/* การปรับจูน Optical Balance และป้องกัน CLS */
@font-face {
  font-family: "Noto Sans Thai Adjusted";
  src: local("Noto Sans Thai"), url("/fonts/NotoSansThai-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
  size-adjust: 108%; /* ปรับขยาย 105–110% ให้สมดุลกับ Latin x-height */
  ascent-override: 95%;
  descent-override: 30%;
}

@font-face {
  font-family: "IBM Plex Sans Thai Adjusted";
  src: local("IBM Plex Sans Thai"), url("/fonts/IBMPlexSansThai-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
  size-adjust: 106%; /* ปรับจูนคู่กับ Inter */
}
```
- **ผลลัพธ์:** ตัวอักษรภาษาไทยและภาษาอังกฤษมีขนาดสายตาเท่ากันอย่างเป็นธรรมชาติ เมื่อฟอนต์โหลดเสร็จจะไม่เกิด Cumulative Layout Shift (CLS = 0)

---

## 3. 🏛️ Official Font Pairings (ตารางจับคู่ฟอนต์ทางการ 4 สไตล์)

สถาปัตยกรรมการจับคู่ฟอนต์ Latin + Thai ที่ผ่านการทดสอบ Visual Optical Balance และ Vertical Alignment แล้ว:

### 3.1 Dashboard & High-Density SaaS
- **Primary Pairing:** `Geist` + `Noto Sans Thai`
- **Alternative Pairing:** `Inter` + `IBM Plex Sans Thai`
- **Monospace (ตัวเลข/สถิติ/พิกัด):** `Geist Mono` หรือ `JetBrains Mono` (`font-variant-numeric: tabular-nums lining-nums;`)
- **ลักษณะเด่น:** รูปร่าง Glyph เรขาคณิตเป็นกลาง อ่านง่ายในขนาดเล็ก (11–13px) สแกนข้อมูลในตารางและ Telemetry ได้แม่นยำสูงสุด
- **CSS Stack:**
```css
:root {
  --font-saas-sans: "Geist", "Noto Sans Thai", -apple-system, sans-serif;
  --font-saas-mono: "Geist Mono", "JetBrains Mono", monospace;
}
```

### 3.2 Brand & Modern Consumer
- **Primary Pairing:** `DM Sans` + `Prompt`
- **Alternative Pairing:** `Plus Jakarta Sans` + `Prompt`
- **ลักษณะเด่น:** มีความโค้งมนแบบ Geometric Curves สดใส ทันสมัย มีชีวิตชีวาและเป็นมิตร เหมาะกับเว็บสตาร์ทอัพ แอปพลิเคชันผู้บริโภค และมาร์เก็ตติ้งไซต์
- **CSS Stack:**
```css
:root {
  --font-brand-sans: "DM Sans", "Prompt", -apple-system, sans-serif;
}
```

### 3.3 Long-form Reading & Documentation
- **Primary Pairing:** `Source Serif 4` + `Noto Serif Thai`
- **Alternative Pairing:** `Source Serif 4` + `Sarabun` (หรือ `Merriweather` + `Sarabun`)
- **ลักษณะเด่น:** มี Serif คมชัด หรูหราทางการ อ่านเนื้อหาขนาดยาวได้อย่างสบายตา ลดความเมื่อยล้า เหมาะกับเอกสารวิชาการ รายงานการวิจัย บทความนิตยสาร และคู่มือมาตรฐาน
- **CSS Stack:**
```css
:root {
  --font-docs-editorial: "Source Serif 4", "Noto Serif Thai", Georgia, serif;
  --font-docs-formal: "Source Serif 4", "Sarabun", Georgia, serif;
}
```

### 3.4 Display Headings (ขนาด ≥ 28px)
- **Primary Choice:** `Kanit` (Font Weight: 600 SemiBold / 700 Bold)
- **Secondary Choice:** `Prompt` (Font Weight: 600 SemiBold / 700 Bold)
- **ลักษณะเด่น:** ตัวหนา มั่นคง สัดส่วนอักขระกว้าง ให้พลังและความน่าเชื่อถือสูง สะกดสายตาได้ทันที เหมาะสำหรับ Hero Headline, แบนเนอร์ขนาดใหญ่ และหน้าปกลายเซ็น
- **CSS Stack:**
```css
:root {
  --font-display-hero: "Kanit", "Prompt", sans-serif;
}

.hero-title {
  font-family: var(--font-display-hero);
  font-weight: 700;
  font-size: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
  line-height: 1.30;
  letter-spacing: 0;
}
```

---

## 4. 💻 Full Implementation Recipes

### 4.1 Google Fonts Preconnect & CDN Import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=Kanit:wght@500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Noto+Serif+Thai:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Prompt:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap" rel="stylesheet">
```

### 4.2 Tailwind CSS v4 / Config Specification
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        saas: ['Geist', 'Noto Sans Thai', 'sans-serif'],
        saasAlt: ['Inter', 'IBM Plex Sans Thai', 'sans-serif'],
        brand: ['DM Sans', 'Prompt', 'sans-serif'],
        brandAlt: ['Plus Jakarta Sans', 'Prompt', 'sans-serif'],
        docs: ['Source Serif 4', 'Noto Serif Thai', 'serif'],
        formal: ['Source Serif 4', 'Sarabun', 'serif'],
        display: ['Kanit', 'Prompt', 'sans-serif'],
      },
      lineHeight: {
        'thai-body': '1.75',
        'thai-heading': '1.30',
      },
      letterSpacing: {
        'thai-safe': '0',
      }
    }
  }
};
```

---

## 5. ✅ Quick Pre-Flight Checklist สำหรับภาษาไทย

- [ ] **Latin-First:** ฟอนต์ละติน (`Geist`, `Inter`, `DM Sans`, `Source Serif 4`) อยู่หน้าฟอนต์ไทยเสมอ
- [ ] **Zero Negative Tracking:** ข้อความไทยมี `letter-spacing: 0` (ไม่มี `tracking-tight` ตกค้าง)
- [ ] **Body Leading 1.7–1.8:** ข้อความเนื้อหาไทยตั้งค่า `line-height: 1.7–1.8` สระบนไม่ชนสระล่าง
- [ ] **Headings Leading ≥ 1.3:** หัวข้อภาษาไทยมี `line-height: ≥ 1.3` (ไม่มี `leading-none`)
- [ ] **Tabular Figures:** ตัวเลข สถิติ และพิกัดระบุ `tabular-nums lining-nums` ควบคู่ `font-mono`
- [ ] **Metric Calibration (size-adjust):** ฟอนต์ภาษาไทยผ่านการปรับจูน `size-adjust: 105%–110%` ภายใน `@font-face` เพื่อความสมดุลทางสายตากับ Latin x-height ป้องกัน Layout Shift (CLS = 0)

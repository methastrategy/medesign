# 🎨 คลังคำศัพท์ & แม่แบบ Web Design / UI/UX ระดับ World-Class (ครบ 50 หมวดหลัก & หมวดเสริม + 4 หมวดลับ Design Engineer · 750+ คำศัพท์ & Patterns)
> **สำหรับ `/medesign` (Recognition over Recall & Zero-Question Auto-Inspector Protocol — ไม่ต้องจำคำศัพท์):**
> ผู้ใช้ไม่จำเป็นต้องจำคำศัพท์เทคนิคหรือสูตรเหล่านี้ เวลาสั่ง `/medesign` ระบบจะทำหน้าที่แปลงความต้องการหรือบริบทของโปรเจกต์ให้กลายเป็นคำศัพท์ โครงสร้าง และโค้ดระดับ Design Engineer โดยอัตโนมัติ (ครบทั้ง 33 หมวดหลัก + 17 หมวดความรู้เสริมที่มักตกหล่น + 4 หมวดลับ Design Engineer) หรือตั้งคำถามด้วย **"ภาษาคนเข้าใจง่าย + ภาพตัวอย่างสด"** ให้เลือกแทนการถามศัพท์เทคนิค

---

## 💎 หมวดพิเศษ (EXP-01 ถึง EXP-04): Expert Design Engineer Vocabulary (ศัพท์ระดับโปรที่แยกเว็บระดับโลกออกจากเว็บธรรมดา)

### EXP-01. Surface Physics & Materiality (ฟิสิกส์ของพื้นผิวและมิติความลึก)
| คำศัพท์ Expert | ภาษาคนเข้าใจง่าย (ไม่ต้องจำศัพท์) | โค้ด CSS / Tailwind สำหรับสั่งสร้างจริง | สถานะใน DNA |
|:---|:---|:---|:---|
| **Tonal Layering / Surface Luminance** | แยกชั้นพื้นหลัง-การ์ด-ช่องกรอกด้วย "เฉดสีอ่อน-เข้ม" แทนการตีเส้นกรอบดำทึบรกๆ | `--bg: #f3f1eb; --surface: #ffffff; --surface-2: #eceae4;` (Light) / `--bg: #050505; --surface: #111111;` (Dark) | ★ **Locked DNA** |
| **Top Inner Hairline (Specular Highlight)** | เส้นแสงสะท้อนบางเฉียบ `1px` เฉพาะขอบบนด้านในของการ์ดโหมดมืด ให้ความรู้สึกเหมือนโลหะหรือกระจกเจียระไน | `box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.10);` | Recommended (Dark) |
| **Exposed Hairline Grid** | ตารางเส้นคมกริบ `1px` ชนขอบถึงกันหมดโดยไม่เว้นช่องไฟ (สไตล์ Swiss / Vercel) | `gap: 1px; background: var(--border);` โดยให้แต่ละ Cell มี `background: var(--surface);` | ★ **Locked DNA (Tables)** |
| **Tactile Offset Shadow** | เงาแข็งไม่เบลอ เยื้องขวาล่าง `2px–3px` ให้ความรู้สึกเหมือนป้ายกระดาษแข็งหรือสมุดสนาม | `box-shadow: 3px 3px 0px #191715; border: 1.5px solid #191715;` | Blind #G Option |
| **Translucent Acrylic / Frosted Glass** | พื้นผิวกระจกฝ้าเบลอฉากหลังอย่างนุ่มนวล ใช้เฉพาะแถบเมนูบนหรือหน้าต่างลอย | `backdrop-filter: blur(18px) saturate(160%); background: rgba(255,255,255,0.65);` | ★ **Locked DNA (Editorial)** |

### EXP-02. Typographic Micro-Mechanics (กลไกตัวอักษรและตัวเลขความแม่นยำสูง)
| คำศัพท์ Expert | ภาษาคนเข้าใจง่าย (ไม่ต้องจำศัพท์) | โค้ด CSS / Tailwind สำหรับสั่งสร้างจริง | สถานะใน DNA |
|:---|:---|:---|:---|
| **Tabular Numerals (`tabular-nums`)** | บังคับให้ตัวเลขทุกตัวกว้างเท่ากันเป๊ะ เวลาตัวเลขเปลี่ยนหรือเรียงในตารางหลักหน่วย-สิบ-ร้อยจะตรงกันไม่สั่นดิ้น | `font-family: 'Geist Mono', monospace; font-variant-numeric: tabular-nums;` | ★ **Locked DNA (บังคับใช้)** |
| **Tight Negative Tracking** | บีบช่องไฟหัวข้อใหญ่ให้ชิดกันเล็กน้อย (`-0.025em` ถึง `-0.035em`) ทำให้ฟอนต์ดูแพงและคมเหมือนนิตยสารหัวนอก | `letter-spacing: -0.025em; line-height: 1.08;` | ★ **Locked DNA (บังคับใช้)** |
| **Eyebrow / Kicker Label** | ป้ายกำกับตัวพิมพ์เล็กสีจางวางเหนือหัวข้อใหญ่ เพื่อบอกหมวดหมู่หรือสถานะอย่างกระชับ | `font-family: 'Geist Mono'; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em;` | ★ **Locked DNA** |
| **Typographic Contrast (Serif × Sans × Mono)** | ผสมฟอนต์ 3 อารมณ์: หัวข้อใช้ฟอนต์มีเชิงหรูหรา เนื้อหาใช้ฟอนต์อ่านง่าย ตัวเลขใช้ฟอนต์วิศวกรรม | Heading: `Fraunces` / Body: `Plus Jakarta Sans` / Data: `Geist Mono` | ★ **Locked DNA** |
| **Optimal Measure (`60ch–70ch`)** | จำกัดความกว้างบรรทัดของเนื้อหาให้อ่านสบายตาที่สุด ไม่ยาวพาดเต็มจอจนกวาดตามองหลงบรรทัด | `max-width: 65ch; line-height: 1.65;` | ★ **Locked DNA (Docs)** |

### EXP-03. Spatial Topology & Choreographed Layout (สถาปัตยกรรมการจัดวางพื้นที่หน้าจอ)
| คำศัพท์ Expert | ภาษาคนเข้าใจง่าย (ไม่ต้องจำศัพท์) | โค้ด CSS / Tailwind สำหรับสั่งสร้างจริง | สถานะใน DNA |
|:---|:---|:---|:---|
| **Zero-Sidebar Top-Nav Workspace** | ตัดแถบเมนูซ้ายทิ้งทั้งหมด ใช้เฉพาะแถบเมนูด้านบนเพื่อให้เนื้อหาและตารางกางได้เต็มตาไม่อึดอัด | `max-width: 1152px (max-w-6xl); margin: 0 auto;` + Sticky Top Nav `64px` | ★ **Locked DNA (MESURV)** |
| **Underline Tab Switcher (Zero-Box Tabs)** | แท็บสลับหน้าที่ใช้แค่ "เส้นขีดใต้บางๆ `2px`" บนแท็บที่เลือก ไม่ตีกรอบสี่เหลี่ยมหรือปุ่มทึบครอบแท็บ | `border-bottom: 2px solid var(--accent); background: transparent;` | ★ **Locked DNA (MESURV)** |
| **Asymmetric Bento Split (`8:4` / `7:5`)** | จัดการ์ดแบบไม่สมมาตร ให้การ์ดพระเอกใหญ่ `2 ใน 3` ของจอ และการ์ดสรุปย่อยซ้อนกันด้านขวา `1 ใน 3` | `grid-template-columns: repeat(12, 1fr);` → `.hero-col { grid-column: span 8; } .kpi-col { grid-column: span 4; }` | ★ **Locked DNA** |
| **Canvas-First with Floating HUD Pods** | ให้แผนที่หรือผังกราฟิกเต็มจอ `100%` แล้ววางกล่องเครื่องมือและผลลัพธ์ลอยทับที่มุมจอ | `width: 100vw; height: 100vh; overflow: hidden;` + Floating Pods `position: absolute; z-index: 20;` | Layout `L-02` (WebGIS) |
| **Master-Detail 50/50 Synced Split** | แบ่งครึ่งจอซ้าย-ขวา คลิกแถวข้อมูลฝั่งซ้ายแล้วผังกราฟิกหรือรายละเอียดฝั่งขวาอัปเดตตามทันที | `grid-template-columns: 1fr 1fr; gap: 1.25rem; align-items: start;` | Layout `L-05` (Calculator) |

### EXP-04. High-Craft Interaction & Engineering Density (ความแม่นยำของการโต้ตอบและความคมชัดของข้อมูล)
| คำศัพท์ Expert | ภาษาคนเข้าใจง่าย (ไม่ต้องจำศัพท์) | โค้ด CSS / Tailwind สำหรับสั่งสร้างจริง | สถานะใน DNA |
|:---|:---|:---|:---|
| **High Signal-to-Noise Ratio (SNR)** | ตัดคำโฆษณาเวิ่นเว้อ เส้นขอบซ้ำซ้อน และไอคอนรกตาออก เหลือเฉพาะข้อมูลจริงที่ต้องใช้งาน | ลบ Marketing Fluff, ใช้ `border: 1px solid rgba(..., 0.14)` บางๆ เท่านั้น | ★ **Locked DNA** |
| **Controls Co-located with Data** | วางปุ่มคำนวณ ตัวกรอง และปุ่ม Export ไว้ติดกับหัวตารางหรือข้อมูลชุดนั้นเลย ไม่ต้องเลื่อนหาไกล | Header bar ของการ์ดมี `display: flex; justify-content: space-between; align-items: center;` | ★ **Locked DNA** |
| **Verbs Over Nouns (Action Labels)** | ปุ่มกดต้องขึ้นต้นด้วย "คำกริยา" ที่บอกชัดเจนว่ากดแล้วเกิดอะไรขึ้น (เช่น `คำนวณวงรอบ`, `ส่งออก GeoJSON`) | ใช้ข้อความปุ่มแบบ Action-oriented เสมอ | ★ **Locked DNA** |
| **Tactile Micro-Press (`active:scale-[0.97]`)** | เวลากดปุ่มจะยุบตัวลงนิดเดียว (`3%`) แบบรวดเร็ว `150ms` ให้ความรู้สึกเหมือนกดปุ่มเครื่องมือจริง โดยห้ามทำการ์ดเด้งลอยเวลาเอาเมาส์ชี้ | `transition: all 150ms ease; active:transform active:scale-[0.97];` | ★ **Locked DNA** |
| **Pulsing Telemetry Status Pill** | ป้ายสถานะขนาดเล็กที่มีจุดไฟกะพริบเบาๆ บอกความพร้อมของระบบ (เช่น `● RTSD READY`) | `border-radius: 9999px; font-family: 'Geist Mono';` + จุดกลม `animate-pulse` | ★ **Locked DNA** |
| **Semantic Tinted Badges** | ป้ายบอกระดับความยากหรือสถานะ ใช้พื้นหลังสีจาง `10%` คู่กับตัวหนังสือสีเข้มโทนเดียวกัน ไม่ใช้สีสดทึบแสบตา | `background: rgba(21,128,61,0.12); color: #15803d; border: 1px solid rgba(21,128,61,0.25);` | ★ **Locked DNA** |

---

## 📚 หมวดที่ 1–20: Core UI/UX Architecture & Component Vocabulary

### 1. Website Structure (โครงสร้างหลักของหน้าเว็บ)
- **Header / Topbar:** แถบบนสุดของหน้าเว็บ ใช้โชว์โลโก้ ชื่อระบบ และสถานะหลัก
- **Navbar (Primary / Secondary Navigation):** แถบเมนูเลือกหน้าหลัก (Primary) และแถบเมนูย่อยในหน้านั้น (Secondary)
- **Sidebar:** แถบเมนูแนวตั้งด้านข้าง *(หมายเหตุ: ใน MESURV DNA ล็อกไว้ว่า **ไม่ใช้ Sidebar ซ้าย** เพื่อเปิดพื้นที่เต็มจอ)*
- **Hero Section:** ส่วนต้อนรับบนสุดของหน้า สรุปหัวใจสำคัญของระบบพร้อมปุ่มเริ่มใช้งานและตัวเลขภาพรวม
- **Main Content / Page Shell:** พื้นที่แสดงเนื้อหาหลักของหน้าเว็บทั้งหมดที่อยู่ใต้แถบเมนู
- **Container / Wrapper:** กรอบจำกัดความกว้างสูงสุดของเนื้อหา (เช่น `max-w-6xl` หรือ `1152px`) ให้จัดกึ่งกลางสวยงาม
- **Breadcrumb:** แถบบอกเส้นทางว่าตอนนี้อยู่หน้าไหน เช่น `หน้าหลัก > คำนวณงานสำรวจ > วงรอบปิด`
- **Footer:** ส่วนท้ายสุดของหน้าเว็บ แสดงข้อมูลลิขสิทธิ์ เวอร์ชันระบบ และลิงก์อ้างอิง
- **Floating Action Button (FAB) / Bottom Nav:** ปุ่มกลมลอยที่มุมขวาล่าง หรือแถบเมนูด้านล่างสุดสำหรับหน้าจอมือถือ

### 2. Navigation Patterns (รูปแบบการเปลี่ยนหน้าและค้นหาคำสั่ง)
- **Hamburger Menu:** ปุ่มขีด 3 เส้นสำหรับพับเก็บเมนูบนหน้าจอมือถือ
- **Mega Menu / Dropdown:** เมนูที่คลิกแล้วกางตัวเลือกย่อยลงมาเป็นรายการหรือหลายคอลัมน์
- **Context Menu / Overflow Menu (`⋯`):** เมนูคลิกขวา หรือปุ่มจุดสามจุดสำหรับเก็บคำสั่งรองไม่ให้รกหน้าจอ
- **Command Palette (`⌘K` / `Ctrl+K`):** หน้าต่างค้นหาคำสั่งด่วนตรงกลางจอ กดคีย์ลัดแล้วพิมพ์ชื่อเครื่องมือเพื่อกระโดดไปทันที
- **Tab Nav / Underline Tabs:** แถบสลับโหมดทำงานในหน้าเดียวโดยไม่ต้องโหลดหน้าใหม่ *(Locked DNA: ใช้เส้นขีดใต้ 2px)*
- **Pill Nav / Segmented Control:** ปุ่มสลับตัวเลือกแบบแคปซูล (เช่น สลับหน่วย `เมตร` ↔ `องศา-ลิปดา` หรือสลับธีม `สว่าง` ↔ `มืด`)
- **Pagination / Infinite Scroll:** การแบ่งหน้าแบบกดเลขหน้า (`1, 2, 3`) เทียบกับการเลื่อนลงแล้วโหลดข้อมูลต่อเรื่อยๆ
- **Sticky Nav / Scrollspy:** แถบเมนูที่เกาะติดขอบบนตลอดเวลา และไฮไลต์หัวข้อที่กำลังอ่านอยู่อัตโนมัติ
- **Drawer / Off-canvas:** ลิ้นชักที่สไลด์ออกมาจากขอบจอเมื่อกดเรียกดูรายละเอียดเพิ่มเติม

### 3. Layout Systems (ระบบโครงร่างและการจัดเรียง)
- **12-Column Grid / CSS Grid:** โครงตาราง 12 ช่องมาตรฐานที่แบ่งสัดส่วนยืดหยุ่นได้ทุกแบบ (เช่น `6:6`, `8:4`, `4:4:4`)
- **Gutter:** ช่องว่างมาตรฐานระหว่างคอลัมน์ในตาราง Grid
- **Baseline Grid:** เส้นบรรทัดอ้างอิงที่ทำให้ตัวอักษรและกล่องข้อมูลคนละคอลัมน์วางอยู่ในระดับสายตาเดียวกันเป๊ะ
- **Flexbox / Stack / Inline Layout:** การจัดเรียงของในแนวนอนหรือแนวตั้งให้ชิดซ้าย ขวา กึ่งกลาง หรือกระจายห่างเท่ากัน

### 4. Spacing & Density (ระยะห่างและความหนาแน่นของข้อมูล)
- **Padding (Inset):** ระยะห่าง "ด้านใน" ขอบการ์ดถึงตัวหนังสือ
- **Margin:** ระยะห่าง "ด้านนอก" ระหว่างกล่องหนึ่งไปอีกกล่องหนึ่ง
- **Gap / Gutter:** ระยะห่างระหว่างการ์ดแต่ละใบที่เรียงอยู่ใน Grid หรือ Flexbox
- **Vertical Rhythm:** จังหวะการเว้นบรรทัดและระยะห่างหัวข้อในแนวตั้งที่สม่ำเสมอ
- **Whitespace / Negative Space:** พื้นที่ว่างที่ตั้งใจเว้นไว้เพื่อให้สายตาได้พักและส่งให้ข้อมูลสำคัญโดดเด่นขึ้น
- **Content Density (Compact / Comfortable / Spacious):** ความแน่นของข้อมูลในหน้าจอ

### 5. UI Components (ปุ่มกดและช่องรับข้อมูล)
- **Primary / Secondary / Tertiary / Ghost / Outline / Icon / Destructive / Split Buttons:** ระบบลำดับความสำคัญของปุ่มกดตั้งแต่ปุ่มหลัก (CTA) ไปจนถึงปุ่มลบข้อมูลและปุ่มแยกตัวเลือกย่อย
- **CTA (Call to Action):** ปุ่มกระตุ้นให้กดทำงานหลักของหน้านั้น
- **Input / Combobox / Toggle / Range Slider / Date Picker:** ช่องกรอกข้อความ, ช่องเลือกที่พิมพ์ค้นหาได้, สวิตช์เปิด-ปิด, แถบเลื่อนปรับค่า, และตัวเลือกวันที่

### 6. Information Components (องค์ประกอบแสดงข้อมูลและการแจ้งเตือน)
- **Card / Panel:** กล่องแสดงเนื้อหาหรือกลุ่มข้อมูลที่จัดหมวดหมู่ไว้ด้วยกัน
- **Modal / Dialog / Drawer:** หน้าต่างป๊อปอัปกลางจอ หรือลิ้นชักด้านข้าง
- **Popover / Tooltip:** กล่องคำอธิบายขนาดเล็กที่เด้งขึ้นมาเมื่อชี้เมาส์หรือคลิก
- **Toast / Snackbar / Banner / Alert:** แถบแจ้งเตือนชั่วคราวที่มุมจอ หรือแถบแจ้งเตือนสำคัญที่คาดในหน้าเว็บ
- **Badge / Chip / Avatar:** ป้ายกำกับสถานะขนาดเล็ก, ป้ายตัวกรองที่กดลบได้, และรูปโปรไฟล์ย่อ
- **Accordion / Stepper / Progress Bar / Skeleton Loader:** กล่องพับกางได้, แถบบอกลำดับขั้น, แถบความคืบหน้า, และโครงสีเทาขณะรอโหลด

### 7. Dashboard Design (องค์ประกอบหน้าแดชบอร์ดและเครื่องมือวิศวกรรม)
- **KPI / Metric / Stat Card:** การ์ดโชว์ตัวเลขสำคัญขนาดใหญ่พร้อมหน่วยและสถานะเปรียบเทียบ
- **Data Table / Data Grid:** ตารางแสดงข้อมูลแถวและคอลัมน์ที่กรอง เรียงลำดับ หรือคลิกแก้ไขค่าได้
- **Filter Bar / Toolbar / Action Bar:** แถบเครื่องมือค้นหา กรองหมวดหมู่ และปุ่มสั่งงานที่วางอยู่เหนือตารางข้อมูล
- **Control / Inspector / Properties / Utility Panel:** แผงควบคุมและแสดงค่าพารามิเตอร์ละเอียดของรายการที่คลิกเลือก
- **Command / Status Bar:** แถบสถานะบางๆ ที่บอกพิกัด ระบบพิกัด และสถานะความพร้อมของระบบ
- **Map / Detail Panel, Master-Detail, Split View, Resizable / Collapsible Panel:** การแบ่งหน้าจอคู่กันระหว่างรายการข้อมูลและแผนที่/กราฟิกที่ย่อขยายหรือพับเก็บได้

### 8. Micro-interactions (การตอบสนองระดับจุลภาคเมื่อใช้งาน)
- **Hover / Focus / Active / Pressed / Disabled / Loading / Success / Error / Empty / Skeleton States:** สถานะการตอบสนองทุกจังหวะของการชี้เมาส์ กดปุ่ม โหลดข้อมูล และแจ้งผล
- **Ripple / Tooltip Reveal / Drag & Drop Feedback:** เอฟเฟกต์คลื่นเมื่อคลิก, การเผยคำอธิบาย, และการไฮไลต์พื้นที่เมื่อลากไฟล์มาวาง

### 9. Motion Design (จังหวะการเคลื่อนไหว)
- **Easing / Duration / Spring Animation:** ความสมูทและระยะเวลาของการเคลื่อนไหว *(Locked DNA: ใช้ `150ms–200ms ease` คมกริบ ไม่เด้งย้วย)*
- **Fade / Slide / Scale / Expand-Collapse / Morph / Parallax / Stagger / Shared Element Transition:** รูปแบบการปรากฏและเปลี่ยนผ่านขององค์ประกอบบนหน้าจอ

### 10. Responsive Design (การรองรับทุกขนาดหน้าจอ)
- **Mobile-first / Desktop-first:** การวางลำดับความสำคัญของขนาดหน้าจอหลักตามลักษณะงาน
- **Breakpoint / Viewport / Fluid / Fixed / Max-width / Container Query:** การปรับจำนวนคอลัมน์และขนาดองค์ประกอบตามความกว้างหน้าจอหรือความกว้างของการ์ดแม่

### 11. Typography (ระบบตัวอักษรและฟอนต์)
- **Font Family / Weight / Size / Line Height / Letter Spacing (Tracking):** ตระกูลฟอนต์ ความหนา ขนาด ระยะห่างบรรทัด และการบีบช่องไฟตัวอักษร
- **Text / Visual Hierarchy:** ลำดับความเด่นของหัวข้อและเนื้อหา (`Display`, `Heading`, `Body`, `Caption`, `Label`, `Monospace`, `Variable Font`, `Scale`)

### 12. Visual Design (หลักการออกแบบทัศนศิลป์)
- **CRAP Principles (Contrast, Repetition, Alignment, Proximity):** ความตัดกันชัดเจน, ความสม่ำเสมอ, แนวเส้นตรงกัน, และการจัดกลุ่มสิ่งที่เกี่ยวข้องไว้ใกล้กัน
- **Balance / Scale / Density / Visual Weight / Focal Point:** ความสมดุล สัดส่วน ความแน่น น้ำหนักสายตา และจุดเด่นหลักของหน้าจอ

### 13. Design System (ระบบตัวแปรและมาตรฐานดีไซน์)
- **Design / Color / Spacing / Typography / Radius / Shadow / Motion Tokens:** ตัวแปรมาตรฐานศูนย์กลางของระบบ
- **Component Library / Variant / State & Semantic / Brand Colors:** คลังชิ้นส่วนมาตรฐานและระบบสีตามความหมายการใช้งาน

### 14. Modern UI Style Vocabulary (ตระกูลสไตล์ดีไซน์ยุคใหม่)
- **Glassmorphism / Neumorphism / Minimalism / Brutalism / Neo-Brutalism:** กระจกฝ้าโปร่งแสง, ปุ่มนูนต่ำ, เรียบคลีน, ดิบเท่เส้นคม, และกรอบดำหนาเงาแข็ง
- **Bento Grid / Editorial Design / Swiss Design / Flat Design / Material Design / Skeuomorphism / Dark UI / OLED Black / Spatial UI:** ตารางกล่องข้าวญี่ปุ่น, สไตล์นิตยสารหรู, กริดคณิตศาสตร์สวิส, พื้นดำสนิทประหยัดพลังงาน, และหน้าต่างลอยตัวในมิติพื้นที่

### 15. UX Vocabulary (หลักจิตวิทยาและประสบการณ์ผู้ใช้)
- **User Flow / Journey & Information Architecture (IA):** เส้นทางการใช้งานตั้งแต่ต้นจนจบ และการจัดหมวดหมู่ข้อมูลให้หาเจอง่าย
- **Affordance / Cognitive Load / Friction:** รูปลักษณ์ที่บอกวิธีใช้งานในตัว, ภาระสมองที่ต้องคิด, และความฝืดเคืองที่ต้องตัดออก
- **Error Prevention / Recovery, Progressive Disclosure, Recognition over Recall, Happy Path, Edge Case:** การป้องกันและกู้คืนข้อผิดพลาด, การเปิดเผยข้อมูลทีละขั้น, **การเห็นแล้วเลือกได้เลยไม่ต้องจำคำศัพท์**, เส้นทางใช้งานปกติ, และกรณีพิเศษสุดขอบ

### 16. Accessibility / A11y (การเข้าถึงและใช้งานได้จริงทุกสภาพแวดล้อม)
- **WCAG / Keyboard Nav / Focus Ring / Screen Reader / ARIA / Semantic HTML:** มาตรฐานการเข้าถึงเว็บด้วยคีย์บอร์ดและโครงสร้างโค้ดที่มีความหมายชัดเจน
- **Color Contrast / Reduced Motion / Touch Target:** ความคมชัดของสีกลางแจ้ง, โหมดลดการเคลื่อนไหว, และขนาดปุ่มที่กดง่ายไม่พลาด

### 17. UX States (สถานะของหน้าจอและชั้นข้อมูล)
- **Default, Hover, Focus, Active, Pressed, Disabled, Loading, Success, Error, Empty, Selected, Expanded, Collapsed:** 13 สถานะพื้นฐานของทุกชิ้นส่วน
- **Map Layer States:** สถานะชั้นข้อมูลแผนที่ (เปิดแสดงผล, ซ่อน, กำลังโหลด Tile, ซูมเกินระยะแสดงผล, เลือกวัตถุบนแผนที่)

### 18. Web Layout Patterns (แม่แบบการจัดวางหน้าเว็บยอดนิยม)
- **Single / Two / Three Column, Split Screen / View, Master-Detail, Sidebar, Dashboard:** รูปแบบการแบ่งคอลัมน์หน้าจอ
- **Card / Bento / Masonry Grid, Full-screen Canvas, Overlay, Floating Panel, Command Center, GIS Workspace:** รูปแบบการจัดตารางการ์ดและพื้นที่ทำงานเต็มจอสำหรับงานวิศวกรรมและแผนที่

### 19. UX Patterns (ฟีเจอร์ยกระดับความคล่องตัว)
- **Progressive Disclosure, Contextual / Quick / Bulk Actions, Inline Editing, Undo / Redo:** คำสั่งด่วนเฉพาะจุด, การแก้ไขค่าในตารางทันที, และการย้อนกลับคำสั่ง
- **Command Palette, Keyboard Shortcuts, Drag & Drop, Multi-select, Optimistic UI, Autosave:** คีย์ลัด, การลากวางไฟล์, การเลือกหลายรายการพร้อมกัน, การแสดงผลทันทีไม่รอเซิร์ฟเวอร์, และบันทึกอัตโนมัติ

### 20. Performance / Technical UI (เทคนิคความเร็วและการเรนเดอร์)
- **Lazy / Skeleton / Progressive Loading, Code Splitting, Virtualization:** การแบ่งโหลดเฉพาะส่วนที่มองเห็นและการจำลองตารางหมื่นแถวให้ลื่นไหล
- **Optimistic Update, Debouncing, Throttling, FCP / LCP / CLS, WebGL, Tile Loading, Viewport Culling, Spatial Indexing:** เทคนิคเร่งความเร็วการค้นหาและการวาดกราฟิกแผนที่พิกัดความละเอียดสูง

---

## 🌍 หมวดที่ 21–33: World-Class Extended Web Design & GIS Vocabulary (ส่วนขยายครบ 33 หมวด · 500+ คำศัพท์)

### 21. Advanced Visual Effects (เอฟเฟกต์มิติความลึกและพื้นผิวขั้นสูง)
- **Depth & Elevation (ความลึกและระดับชั้น):**
  - `Elevation System`: ระบบลำดับชั้นความสูงของการ์ดและป๊อปอัป (เช่น ชั้นที่ 0 พื้นหลัง → ชั้นที่ 1 การ์ด → ชั้นที่ 2 แถบเมนู → ชั้นที่ 3 หน้าต่างลอย)
  - `Z-index` & `Stacking Context`: ลำดับการวางซ้อนทับกันในแกนลึก (แกน Z) ไม่ให้ป๊อปอัปจมหลังตาราง
  - `Drop Shadow` / `Inner Shadow` / `Box Shadow` / `Shadow Depth`: เงาตกกระทบด้านนอก, เงาเว้าด้านในช่องกรอกข้อมูล, และความนุ่มลึกของเงา
  - `Layering`: การจัดซ้อนแผ่นพื้นผิวหลายชั้นให้เกิดมิติโดยไม่ต้องใช้เส้นกรอบหนา
- **Surface & Material (พื้นผิวและวัสดุศาสตร์ดิจิทัล):**
  - `Surface` / `Backdrop` / `Backdrop Blur` / `Frosted Glass`: พื้นผิวการ์ดและฉากหลังเบลอแบบกระจกฝ้า
  - `Translucency` & `Opacity`: ความโปร่งแสงที่ยอมให้สีพื้นหลังซึมผ่านขึ้นมาอย่างกลมกลืน
  - `Gradient` / `Gradient Mesh`: การไล่เฉดสีแบบทิศทางเดียว หรือแบบจุดแสงหลายจุดผสมกันนุ่มนวล *(หมายเหตุ: ใน MESURV ล็อกใช้สีพื้นเรียบ Solid ไม่ใช้ Gradient รกตา)*
  - `Noise Texture` / `Grain Effect`: เม็ดทรายละเอียดระดับไมโครที่เคลือบพื้นผิวให้ดูเหมือนกระดาษจริงหรือฟิล์มอนาล็อก

### 22. Color System (ระบบสีและทฤษฎีการจับคู่สีระดับมืออาชีพ)
- **Color Theory (โครงสร้างพาเลตสี):**
  - `Palette`: ชุดสีแม่บทของทั้งโปรเจกต์
  - `Primary` / `Secondary` / `Accent` / `Neutral` / `Semantic` / `Brand Colors`: สีหลัก, สีรอง, สีจุดเน้นสายตา (เช่น เขียวสำรวจ `#15803d` หรือทอง `#fcd535`), สีพื้นกลาง (เทา/ครีม), สีบอกสถานะ (ผ่าน/เตือน/ผิดพลาด), และสีประจำแบรนด์
- **Advanced Color Properties (การผสมและปรับแต่งค่าสี):**
  - `Tint` (ผสมสีขาวให้สว่างขึ้น), `Shade` (ผสมสีดำให้เข้มขึ้น), `Tone` (ผสมสีเทาให้นุ่มลง)
  - `Saturation` (ความสดของสี), `Hue` (เฉดสีหลักในวงล้อสี), `Color Temperature` (โทนอุ่น Warm Paper vs โทนเย็น Cool Carbon)
  - `Color Harmony`: การจับคู่สีให้กลมกลืน — `Monochromatic` (เฉดสีเดียวกันไล่น้ำหนัก), `Analogous` (สีข้างเคียงกัน), `Complementary` (สีคู่ตรงข้ามตัดกันเด่นชัด), `Triadic` (สี 3 มุมสมดุล)
- **Functional Colors (สีตามหน้าที่การใช้งานจริงในโค้ด):**
  - `Surface` / `On-surface`: สีพื้นของการ์ด คู่กับสีตัวหนังสือที่วางทับบนการ์ดนั้น
  - `Background` / `Foreground`: สีพื้นหลังสุดของหน้าจอ คู่กับสีเนื้อหาหลักด้านหน้า
  - `Border` / `Divider` / `Overlay Color`: สีเส้นขอบกล่อง, เส้นคั่นแบ่งหมวด, และสีฉากมืดโปร่งแสงเวลาเปิด Modal

### 23. Interactive States — Complete Matrix (สถานะการโต้ตอบครบทุกมิติ)
- **Basic States (สถานะพื้นฐาน):** `Default / Rest` (ปกติ), `Hover` (ชี้เมาส์), `Focus` (กด Tab เลือกอยู่), `Active / Pressed` (กำลังคลิกกดลงไป), `Visited` (ลิงก์ที่เคยเปิดอ่านแล้ว)
- **Status States (สถานะการทำงานของระบบ):** `Loading` (กำลังดึงข้อมูล), `Processing` (กำลังคำนวณปรับแก้พิกัด), `Success` (คำนวณสำเร็จ/ผ่านเกณฑ์), `Error / Invalid` (ค่ามุมหรือระยะผิดรูปแบบ), `Warning` (ค่าคลาดเคลื่อนปริ่มเกณฑ์), `Disabled` (ปิดไม่ให้กด), `Read-only` (อ่านและคัดลอกได้แต่ห้ามแก้)
- **Selection States (สถานะการเลือกข้อมูล):** `Selected` (เลือกอยู่), `Unselected` (ไม่ได้เลือก), `Indeterminate` (ติ๊กเลือกบางส่วนในกลุ่มย่อย `[-]`), `Checked` / `Unchecked` (ติ๊กถูกแล้ว / ยังไม่ติ๊ก)
- **Expansion States (สถานะการกาง/พับ):** `Expanded` (กางออกดูรายละเอียด), `Collapsed` (พับเก็บ), `Open` / `Closed` (เปิด/ปิดลิ้นชักหรือเมนู)
- **Content Volume States (สถานะปริมาณข้อมูล):** `Empty` (ยังไม่มีข้อมูลเลย), `Zero` (ค้นหาแล้วได้ 0 รายการ), `Partial` (กรอกข้อมูลยังไม่ครบทุกหมุด), `Full` (ข้อมูลเต็มพิกัด), `Skeleton State` (โครงกล่องจำลองขณะโหลด)
- **Drag & Drop States (สถานะการลากวางไฟล์ CSV/GeoJSON):** `Dragging` (กำลังคลิกลากไฟล์), `Drag Over` (ลากไฟล์มาจ่อเหนือกล่องรับ), `Drop Target` (พื้นที่เป้าหมายสว่างขึ้นรอรับไฟล์), `Dropped` (วางไฟล์สำเร็จพร้อมอ่านข้อมูล)

### 24. Advanced Layout Techniques (เทคนิคการจัดวางด้วย CSS ยุคใหม่)
- **Modern CSS Grid:**
  - `Subgrid`: การให้การ์ดลูกยึดแนวเส้นตารางเดียวกับการ์ดแม่ ทำให้หัวข้อและปุ่มของการ์ดทุกใบเรียงตรงแนวเดียวกันเป๊ะ
  - `Grid Template Areas`: การวาดแผนผังหน้าเว็บด้วยชื่อโซนอย่างชัดเจน (`"nav nav" "table map"`)
  - `Auto-fit` / `Auto-fill` + `Minmax()` + `Clamp()`: การสร้างตารางการ์ดที่คำนวณจำนวนคอลัมน์และขนาดย่อ-ขยายเองอัตโนมัติโดยไม่ต้องเขียนโค้ดแยกหลายขนาดจอ
- **Advanced Flexbox:** `Flex Grow` (ขยายกินพื้นที่ว่างที่เหลือ), `Flex Shrink` (หดตัวเมื่อพื้นที่แคบ), `Flex Basis` (ขนาดตั้งต้น), `Flex Wrap` (ปัดตกบรรทัดใหม่อัตโนมัติ), `Order` (สลับลำดับซ้าย-ขวา/บน-ล่าง)
- **Positioning & Z-axis Control:** `Relative` (อ้างอิงจุดเดิม), `Absolute` (ลอยอิงกรอบแม่), `Fixed` (ตรึงติดหน้าจอ), `Sticky` (เลื่อนตามปกติแต่เกาะติดขอบบนเมื่อถึงจุดที่กำหนด)
- **Special Layout Patterns (สูตรโครงสร้างระดับตำนาน):**
  - `Holy Grail Layout`: โครงสร้างคลาสสิก (หัวเว็บ + 3 คอลัมน์กลาง + ท้ายเว็บ)
  - `Pancake Stack`: โครงสร้างเรียงซ้อนแนวตั้ง 3 ชั้น (`grid-template-rows: auto 1fr auto`) ที่ดัน Footer อยู่ติดขอบล่างเสมอ
  - `Sidebar Says` / `Deconstructed Pancake`: โครงสร้างที่แถบข้างและเนื้อหาปรับเรียงตัวใหม่เองเมื่อหน้าจอแคบลง
  - `12-Span Grid` & `RAM (Repeat-Auto-Minmax)`: สูตร `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` สำหรับเรียงการ์ดคลังความรู้ให้สวยทุกหน้าจอ

### 25. Data Visualization UI (การออกแบบกราฟและการแสดงผลข้อมูลเชิงวิเคราะห์)
- **Chart Archetypes (ประเภทของกราฟ):**
  - `Line Chart` / `Area Chart`: กราฟเส้นและกราฟพื้นที่สำหรับดูแนวโน้มความคลาดเคลื่อนหรือระดับความสูงตามระยะทาง (Profile Leveling)
  - `Bar Chart` / `Histogram`: กราฟแท่งเปรียบเทียบค่าสถิติแต่ละหมุดหรือแต่ละเฟรม
  - `Pie` / `Donut` / `Gauge` / `Sparkline`: กราฟวงกลมสัดส่วน, มาตรวัดเข็มบอกเกณฑ์ความแม่นยำ, และกราฟเส้นจิ๋วท้ายตัวเลขในการ์ด KPI
  - `Scatter Plot` / `Heatmap` / `Treemap` / `Funnel`: กราฟจุดการกระจายตัวของค่าพิกัด (Error Ellipse / Scatter), แผนที่ความร้อน, และแผนผังสัดส่วนพื้นที่
- **Interactive Chart Elements (องค์ประกอบโต้ตอบบนกราฟ):**
  - `Tooltip` / `Crosshair`: เส้นกากบาทเล็งจุดและกล่องโชว์ค่าพิกัดละเอียดเมื่อเลื่อนเมาส์ผ่านกราฟ
  - `Legend` / `Axis` / `Grid Lines` / `Data Labels`: คำอธิบายสัญลักษณ์สี, แกน X/Y, เส้นตารางอ้างอิง, และตัวเลขกำกับจุดข้อมูล
  - `Zoom / Pan Control`: การซูมขยายดูเฉพาะช่วงข้อมูลและลากเลื่อนดูกราฟ
- **Data States (สถานะของข้อมูลกราฟ):** `No Data`, `Loading`, `Error`, `Filtered` (กรองเฉพาะหมุดที่เลือก), `Drill-down` / `Drill-up` (คลิกเจาะลึกจากภาพรวมลงไปดูรายหมุด)

### 26. GIS-Specific UI (คำศัพท์เฉพาะทางสำหรับระบบแผนที่และงานสำรวจ WebGIS — สำคัญมากสำหรับ MESURV)
- **Map UI & Layers (พื้นที่แผนที่และชั้นข้อมูล):**
  - `Map Canvas / Viewport`: พื้นที่หน้าต่างแสดงแผนที่พิกัดหลัก
  - `Base Layer (Basemap)`: แผนที่พื้นหลัง (เช่น ภาพถ่ายดาวเทียม RTSD/Google, แผนที่ภูมิประเทศ, หรือพื้นตารางพิกัดสีเข้ม)
  - `Overlay / Feature / Tile / Vector / Raster Layer`: ชั้นข้อมูลที่วางทับด้านบน — ทั้งจุดหมุด/เส้นวงรอบ/รูปแปลงที่ดินแบบคมชัด (`Vector Layer`) และภาพถ่ายทางอากาศ/DEM (`Raster / Tile Layer`)
- **Map Controls (เครื่องมือควบคุมแผนที่):**
  - `Zoom In/Out`, `Pan` (ลากเลื่อนแผนที่), `Extent Control` / `Full Extent` / `Fit Bounds` (ปุ่มซูมกลับมาเห็นหมุดทั้งหมดพอดีหน้าจอในคลิกเดียว)
  - `Scale Bar` (แถบมาตราส่วนแผนที่ เช่น `1:1,000`), `North Arrow` (เข็มทิศชี้ทิศเหนือ), `Geolocation` (ระบุตำแหน่งพิกัดปัจจุบันจาก GNSS/GPS)
- **Layer Management (แผงจัดการชั้นข้อมูล):**
  - `Layer Panel / Switcher`: กล่องสลับเลือกแผนที่พื้นหลังและชั้นข้อมูล
  - `Visibility Toggle` (ปุ่มรูปดวงตาเปิด/ปิดชั้นข้อมูล), `Opacity Slider` (แถบปรับความโปร่งแสงของภาพถ่ายดาวเทียม), `Layer Order / Group` (การจัดลำดับชั้นบน-ล่างและจัดกลุ่มหมุด)
- **Spatial Selection & Query (การคลิกเลือกและค้นหาเชิงพื้นที่):**
  - `Select by Click / Rectangle / Polygon`: คลิกเลือกหมุดเดี่ยว หรือลากกรอบสี่เหลี่ยม/หลายเหลี่ยมเพื่อเลือกหลายหมุดพร้อมกัน
  - `Spatial Query` / `Attribute Query`: ค้นหาหมุดจากขอบเขตพื้นที่ หรือค้นหาจากรหัสหมุด/ค่าความคลาดเคลื่อน
  - `Feature Popup / Info Window`: กล่องข้อมูลที่เด้งขึ้นเหนือหมุดบนแผนที่เพื่อโชว์ค่า `Northing (N)`, `Easting (E)`, `Elevation (Z)`
- **Drawing & Survey Tools (เครื่องมือวาดและวัดค่าบนแผนที่):**
  - `Draw Point / Line / Polygon / Circle / Rectangle`: เครื่องมือลงจุดหมุด ลากเส้นวงรอบ และขึ้นรูปแปลงที่ดิน
  - `Measure Distance / Area`: เครื่องมือวัดระยะทางแนวราบและคำนวณเนื้อที่ (ตารางเมตร / ไร่-งาน-ตารางวา)
  - `Snapping` & `Vertex Editing`: ระบบแม่เหล็กดูดเข้าหาจุดหมุดเดิมอัตโนมัติไม่ให้ลากเส้นเบี้ยว และการคลิกขยับแก้ไขจุดหักมุมของแปลง

### 27. Premium UI Patterns (แม่แบบองค์ประกอบเว็บระดับพรีเมียม)
- **Hero Variations:** `Full-screen Hero`, `Split Hero` (แบ่งครึ่งซ้ายชื่อเรื่อง+ปุ่ม ขวาตาราง/การ์ดตัวเลข — *Locked DNA ของ MESURV*), `Interactive Hero` (ส่วนหัวที่ลองกดคำนวณหรือสลับค่าได้ทันที)
- **Content Structures:** `Feature Grid` (ตารางสรุปความสามารถ), `Alternating Content` (สลับซ้าย-ขวา), `Timeline` (ลำดับขั้นตอนการสำรวจ/คำนวณ), `Comparison Table` (ตารางเทียบเกณฑ์มาตรฐานชั้น 1/2/3)
- **Navigation & Quick Flow:** `Top Nav` *(Locked DNA)*, `Bottom Tab Bar` (สำหรับจอมือถือภาคสนาม), `Floating Nav`, `Command Menu (⌘K)`, `Quick Actions` (ปุ่มลัดสั่งงานในคลิกเดียว), `Drag to Reorder` (ลากจัดลำดับหมุดใหม่)

### 28. Modern Design Trends (เทรนด์การออกแบบสมัยใหม่และเอฟเฟกต์พิเศษ)
- **Visual Styles:** `Claymorphism` (ดินปั้นนูนนุ่ม), `Neubrutalism` (กรอบดำหนาเงาแข็งสีตัดกัน), `Y2K Revival`, `Frutiger Aero`, `Abstract Gradients`, `Organic Shapes`, `3D Elements / Micro 3D Icons`
- **Typography Trends:** `Variable Fonts` (ฟอนต์ปรับความหนาต่อเนื่อง), `Kinetic Typography` (ตัวอักษรเคลื่อนไหว), `Oversized Type` (ตัวเลขหรือหัวข้อขนาดยักษ์สไตล์โปสเตอร์สวิส), `Mixed Fonts` (ผสมฟอนต์ Serif คู่กับ Sans และ Mono)
- **Layout & Interactive Trends:** `Bento Grid`, `Broken / Asymmetric Grid`, `Scroll-triggered Animations`, `Horizontal Scroll Sections`, `Cursor Effects`, `Magnetic Buttons`, `Morphing Shapes`, `WebGL / Shader / Physics-based Animation` *(หมายเหตุ: สำหรับหน้าเครื่องมือวิศวกรรม MESURV จะตัดเอฟเฟกต์หวือหวาที่กวนสายตาออกทั้งหมดเพื่อรักษาความแม่นยำสูงสุด)*

### 29. Performance & Optimization (การรีดประสิทธิภาพและความเร็วระดับสูงสุด)
- **Loading Strategy:** `Above the Fold` (โหลดส่วนครึ่งบนของจอให้เสร็จก่อนทันที), `Critical CSS`, `Font Loading Strategy (font-display: swap)`, `Image Optimization & Lazy Load`, `Responsive Images`
- **Rendering Architecture:** `SSR (Server-Side Rendering)`, `CSR (Client-Side Rendering)`, `SSG (Static Generation)`, `ISR`, `Partial Hydration`, `Islands Architecture` (โหลดสคริปต์เฉพาะกล่องที่ต้องคำนวณสด)
- **Core Web Vitals & Speed Metrics:** `FCP` (แสดงผลชิ้นแรกไว), `LCP` (โหลดเนื้อหาหลักเสร็จไว), `CLS` (หน้าเว็บไม่กระตุกเลื่อนเองตอนโหลดฟอนต์), `TTI`, `FID`, `INP (Interaction to Next Paint — กดปุ่มแล้วตอบสนองทันที)`

### 30. Accessibility / A11y Detailed (มาตรฐานการเข้าถึงเชิงลึกสำหรับมืออาชีพ)
- **WCAG Levels (`A` / `AA` / `AAA`) & POUR Principles:**
  - `Perceivable` (มองเห็นและแยกแยะข้อมูลได้ชัดเจน), `Operable` (ควบคุมด้วยเมาส์ คีย์บอร์ด หรือนิ้วสัมผัสได้ครบ), `Understandable` (เข้าใจความหมายและคำเตือนได้ทันที), `Robust` (ทำงานได้เสถียรทุกเบราว์เซอร์)
- **Navigation & Focus A11y:** `Skip to Content` (ปุ่มลัดข้ามไปตารางหลัก), `Landmark Regions (<header>, <main>, <nav>)`, `Heading Hierarchy (H1→H2→H3 ไม่ข้ามขั้น)`, `Focus Visible` (กรอบชัดเมื่อกด Tab), `Focus Trap` (ขังเคอร์เซอร์ไว้ใน Modal จนกว่าจะกดปิด)
- **Screen Reader & Visual Comfort:** `ARIA Label / Describedby / Live Region` (แจ้งเตือนค่าที่คำนวณใหม่), `Contrast Ratio 4.5:1 / 7:1` (คมชัดสู้แสงแดดภาคสนาม), `Color Blind Safe` (ไม่ใช้แค่สีแดง-เขียวแยกสถานะ แต่มีไอคอนและข้อความกำกับเสมอ), `Prefers Reduced Motion`

### 31. Design Handoff & Developer Collaboration (ศัพท์เชื่อมโยงงานดีไซน์สู่การเขียนโค้ดจริง)
- **Design Specs & Redline:** เอกสารระบุระยะห่าง ขนาดฟอนต์ และรหัสสีทุกจุดอย่างละเอียด
- **Style Guide & Component Documentation:** คู่มือมาตรฐานการใช้งานสี ฟอนต์ และชิ้นส่วน UI ทั้งระบบ
- **Design QA & Pixel Perfect:** การตรวจสอบหน้าเว็บที่เขียนโค้ดเสร็จแล้วว่าตรงตามต้นแบบและสเปกทุกพิกเซล
- **Design Debt:** หนี้ทางดีไซน์ (จุดที่เคยทำลวกๆ หรือใช้สี/ฟอนต์ไม่ตรงกันในหน้าเก่าๆ ซึ่ง `/medesign` จะช่วยล้างออกให้สะอาด)
- **Component API / Props / Variant:** การออกแบบคอมโพเนนต์ให้เปลี่ยนโหมดได้ผ่านตัวแปร (เช่น ปุ่มเดียวเปลี่ยน `variant="primary" | "ghost"` หรือสลับ `data-theme="fieldbook" | "terminal"`)

### 32. Professional Jargon (คำศัพท์ประเมินคุณภาพงานดีไซน์ — สิ่งที่ต้องเป็น vs สิ่งที่ต้องห้าม)
- **✅ Quality Targets (เป้าหมายที่ `/medesign` ต้องทำให้ได้เสมอ):**
  - `Polished` (ขัดเกลาจนเนี๊ยบทุกจุด), `Refined` (ประณีตละเอียดอ่อน), `Crisp` (เส้นขอบและตัวอักษรคมกริบ), `Clean` (สะอาดตาไม่รกรุงรัง), `Minimal` (เรียบง่ายแต่ทรงพลัง), `Sophisticated` (ดูฉลาดและเป็นมืออาชีพ), `Elegant` (สง่างาม), `Delightful` (ใช้งานแล้วรู้สึกประทับใจ), `Intuitive` (เข้าใจวิธีใช้ทันทีโดยไม่ต้องอ่านคู่มือ)
- **🚫 Negative Anti-Patterns (อาการเว็บพัง/เว็บโหลที่ `/medesign` ห้ามทำเด็ดขาด):**
  - `Cluttered` / `Busy` / `Noisy` (รกแน่นไปด้วยเส้นกรอบ ไอคอน และสีสันที่แย่งซีนกัน), `Inconsistent` (การ์ดและปุ่มแต่ละหน้าใช้มุมโค้งหรือฟอนต์ไม่เหมือนกัน), `Clunky` (ปุ่มหรือตารางใช้งานยากเทอะทะ), `Jarring` (สีแสบตาหรือแอนิเมชันกระตุกกวนสายตา), `Heavy` (เงาดำทึบหรือกรอบหนาหนักอึ้ง)
- **🔧 Process Verbs (คำกริยาสั่งปรับปรุงระบบ):**
  - `Iterate` (ปรับจูนต่อยอดทีละรอบ), `Refactor` (จัดโครงสร้างโค้ดและ CSS ใหม่ให้คลีน), `Optimize` (รีดความเร็วและลดความซ้ำซ้อน), `Streamline` / `Simplify` (ตัดขั้นตอนเกะกะออกให้ใช้งานง่ายขึ้น), `Enhance` / `Scale` (ยกระดับและขยายระบบให้รองรับฟีเจอร์ใหม่)

### 33. AI Prompt-Friendly Terms (คำสำคัญสำหรับสั่ง AI หรือตั้งโหมดอัตโนมัติใน `/medesign`)
- **Style Archetypes (โทนสไตล์หลัก):**
  - `Contemporary` / `Modern Minimalist` (ทันสมัยเรียบคลีน), `Enterprise Grade` (มาตรฐานระดับองค์กรและงานวิศวกรรม), `Consumer Friendly` (เป็นมิตรใช้งานง่าย), `Professional` / `Technical` (คมชัดระดับเครื่องมือช่างและวิศวกร), `Editorial` (หรูหราจัดวางสวยเหมือนนิตยสาร)
- **Layout & Density Moods (ความหนาแน่นและการจัดพื้นที่):**
  - `Information Dense` / `Compact` (แสดงข้อมูลตารางและตัวเลขได้เยอะในจอเดียวโดยไม่รก), `Spacious` / `Airy` (โปร่งโล่งสบายตาเหมาะกับหน้าอ่านเนื้อหา), `Structured` (จัดเรียงในกริดระเบียบสูง), `Fluid` (ยืดหยุ่นลื่นไหลตามหน้าจอ)
- **Emotional & Brand Moods (อารมณ์ความรู้สึกของระบบ):**
  - `Trustworthy` & `Authoritative` (น่าเชื่อถือ แม่นยำตามมาตรฐานราชการ/วิศวกรรม), `Confident` (ชัดเจนตรงประเด็น), `Welcoming` & `Calming` (โทนสีกระดาษถนอมสายตา ใช้งานนานๆ ไม่ล้า), `Energetic` (กระฉับกระเฉงสำหรับหน้าสกอร์สด), `Luxurious` (พรีเมียมมีระดับ)

---

## 🎯 หมวดที่ 34–50 (17 หมวดเสริม): คลังความรู้เสริม — คำศัพท์ & Pattern ที่หายไปสำหรับ World-Class Web Design

### 34. (เสริม 01) Visual Rhythm & Flow — จังหวะสายตาและการนำทางสายตาอัตโนมัติ
- **Eye-Tracking Scanning Patterns (รูปแบบการกวาดสายตาของผู้ใช้):**
  - `F-Pattern Scanning`: การกวาดสายตาเป็นรูปตัว F (กวาดแนวนอนด้านบนสุด → ลงมาดูหัวข้อรอง → กวาดแนวตั้งชิดขอบซ้าย) เหมาะสำหรับหน้า **ตารางคำนวณวงรอบและคลังความรู้** ที่ต้องวางรหัสหมุด (`BM-01`) และหัวข้อสำคัญชิดซ้ายเสมอ *(★ Locked DNA)*
  - `Z-Pattern Scanning`: การกวาดสายตาเป็นรูปตัว Z (ซ้ายบนโลโก้ → ขวาบนสถานะ/ปุ่มสลับธีม → ทะแยงลงซ้ายล่างชื่อเรื่อง → ขวาล่างปุ่ม CTA / การ์ด 4 KPIs) เหมาะสำหรับ **ส่วนหัว Split Hero ของ MESURV** *(★ Locked DNA)*
  - `Layer-Cake Pattern`: การกวาดสายตาเฉพาะ "แถบหัวข้อหลัก (Subheadings)" ที่มีสีหรือเส้นคั่นชัดเจนเหมือนชั้นเค้ก แล้วหยุดอ่านเฉพาะส่วนที่สนใจ
  - `Spotted Pattern`: การกระโดดสายตาจับเฉพาะตัวเลขใหญ่ (`tabular-nums`), ป้ายสี (`Badge`), และปุ่มกด โดยไม่อ่านข้อความยาวๆ
  - `Gutenberg Diagram`: การแบ่งหน้าจอเป็น 4 โซน (`Primary Optical Area` ซ้ายบน → `Strong Fallow` ขวาบน → `Weak Fallow` ซ้ายล่าง → `Terminal Area` ขวาล่างสำหรับวางปุ่มคำนวณหลัก)
- **Visual Flow & Pacing Mechanics (การกำกับจังหวะของหน้าเว็บ):**
  - `Visual Path / Reading Gravity`: เส้นทางนำสายตาจากจุดที่ 1 ไปจุดที่ 2 และ 3 อย่างเป็นธรรมชาติโดยไม่ต้องเพ่งหา
  - `Primary Anchor / Focal Point`: จุดดึงสายตาอันดับหนึ่งของหน้าจอ (ห้ามมีเกิน 1 จุดต่อ 1 ช่วงหน้าจอ)
  - `Section Alternation & Cadence`: การสลับจังหวะความหนาแน่น (เช่น แถบสรุป 4 KPIs แน่นกระชับ → ตามด้วยตารางคู่ผังวงรอบ 50:50 → ตามด้วยการ์ดคลังความรู้ 3 คอลัมน์โปร่งสบายตา)

### 35. (เสริม 02) Grid Sophistication — สถาปัตยกรรมตารางขั้นสูงระดับ Swiss & Editorial
- **Compound & Ratio Grids (ตารางผสมและสัดส่วนทองคำ):**
  - `Compound Grid (4+3 / 12-Col Hybrid)`: การซ้อนโครงตาราง 2 ระบบเข้าด้วยกัน เช่น แถวบนแบ่ง 4 คอลัมน์ (`KPI Cards`) ซ้อนกับแถวล่างแบ่ง 3 คอลัมน์ (`Knowledge Cards`) บนฐาน 12 คอลัมน์เดียวกัน *(★ Locked DNA)*
  - `Asymmetric Ratio Grid (8:4 / 7:5 / 5:7)`: การแบ่งพื้นที่ซ้าย-ขวาไม่เท่ากันอย่างจงใจ (เช่น ตารางข้อมูล `7 ส่วน` คู่กับผังเวกเตอร์ `5 ส่วน`) เพื่อให้ข้อมูลหลักเด่นกว่าข้อมูลรอง *(★ Locked DNA)*
  - `Golden Ratio Grid (1 : 1.618)` & `Rule of Thirds (3×3)`: สัดส่วนพื้นที่หลัก `62%` ต่อพื้นที่เสริม `38%` ที่สมดุลทางสายตาที่สุด
  - `Modular Grid`: ตารางที่ควบคุมทั้ง "แนวตั้ง (Columns)" และ "แนวนอน (Rows/Baseline)" พร้อมกัน ทำให้ขอบบนและขอบล่างของการ์ดคนละฝั่งตรงแนวกันเป๊ะ
  - `Exposed 1px Swiss Hairline Grid`: การใช้พื้นหลังเป็นสีเส้นขอบแล้วเว้น `gap: 1px` เพื่อให้เกิดเส้นตารางคมกริบไร้รอยต่อซ้อนทับ

### 36. (เสริม 03) Typography Mastery — กฎสัดส่วนฟอนต์และตัวเลขระดับโรงพิมพ์ดิจิทัล
- **Modular Type Scale (สัดส่วนขนาดฟอนต์ตามหลักคณิตศาสตร์):**
  - `1.200 Minor Third Scale`: สัดส่วนฟอนต์กระชับสำหรับหน้า Dashboard / เครื่องมือวิศวกรรม (`12px → 14px → 17px → 20px → 24px → 30px`) *(★ Locked DNA สำหรับตารางและแผงควบคุม)*
  - `1.250 Major Third Scale`: สัดส่วนฟอนต์มาตรฐานสำหรับหน้าเว็บทั่วไปและคลังความรู้ (`12px → 15px → 19px → 24px → 30px → 38px`) *(★ Locked DNA สำหรับหัวข้อหลัก)*
  - `1.333 Perfect Fourth Scale`: สัดส่วนฟอนต์ตัดกันชัดเจนสำหรับหน้า Editorial / Hero ขนาดใหญ่
- **Numeric & Micro-Typography Rules (ความแม่นยำของตัวเลขและช่องไฟ):**
  - `Tabular Figures / Lining Figures (font-variant-numeric: tabular-nums lining-nums)`: ตัวเลขสูงเท่ากันและกว้างเท่ากันทุกหลัก บังคับใช้ 100% กับค่าพิกัด `N, E`, มุม `องศา-ลิปดา-ฟิลิปดา`, และสกอร์สด *(★ Locked DNA)*
  - `Slashed Zero (font-variant-numeric: slashed-zero)`: เลขศูนย์มีขีดฆ่ากลาง (`0`) เพื่อไม่ให้สับสนกับตัวอักษร `O` ในรหัสหมุดสำรวจ
  - `Text Wrap Balance & Pretty`: ใช้ `text-wrap: balance` กับหัวข้อเพื่อไม่ให้คำสุดท้ายหล่นมาอยู่ตัวเดียวบรรทัดล่าง (Orphan/Widow Prevention)
  - `Optical Margin & Hanging Punctuation`: การจัดขอบตัวอักษรและเครื่องหมายคำพูดให้ดูตรงแนวด้วยสายตาจริง

### 37. (เสริม 04) Color Psychology & 60-30-10 Rule — สัดส่วนสีทองคำและจิตวิทยาสีหน้างาน
- **กฎสัดส่วนสี 60-30-10 (The 60-30-10 Color Proportion Law — ★ บังคับใช้ใน `/medesign`):**
  - **`60% Dominant Canvas (สีพื้นหลังหลักพักสายตา)`:** ใช้สีพื้นกระดาษถนอมสายตา `#f3f1eb` (โหมดสว่าง Fieldbook) หรือดำคาร์บอน `#050505` (โหมดมืด Terminal) กินพื้นที่อย่างน้อย 60% ของจอ เพื่อไม่ให้ตาพร่าล้า
  - **`30% Secondary Structure & Surfaces (สีพื้นการ์ดและโครงสร้างตาราง)`:** ใช้สีพื้นการ์ด `#ffffff` / `#eceae4` (สว่าง) หรือ `#111111` / `#0a0a0a` (มืด) พร้อมเส้นขอบบาง `1px` เพื่อแยกกลุ่มข้อมูลอย่างเป็นระเบียบ
  - **`10% Accent Voltage (สีจุดเน้นสายตาและปุ่มคำสั่งหลักเท่านั้น)`:** ใช้สีเขียวสำรวจ `#15803d` / `#34d399` และสีอำพัน `#b45309` / `#fcd535` **เฉพาะที่ปุ่ม CTA หลัก, เส้นขีดใต้แท็บ 2px, ป้ายสถานะผ่านเกณฑ์, และจุดหมุดสำคัญ** (ห้ามเทสี Accent ท่วมพื้นหลังการ์ดเด็ดขาด)
- **Perceptual Color & Field Ergonomics:**
  - `OKLCH / Perceptually Uniform Contrast`: การเลือกคู่สีที่มีความสว่างตัดกันจริงเมื่อมองกลางแดดจ้าภาคสนาม
  - `Semantic Status Polarity (10% Tinted Fill + 100% Text)`:
    - `Pass / Valid (เขียว)`: พื้นจาง `10%` + ตัวอักษรเขียวเข้มคมชัด (เช่น `1 : 28,450 ผ่านเกณฑ์ชั้น 1`)
    - `Warning / Near-Limit (เหลืองอำพัน)`: เตือนเมื่อค่าคลาดเคลื่อนเข้าใกล้เพดานกำหนด
    - `Error / Misclosure Exceeded (แดงส้มอิฐ)`: แจ้งเตือนจุดที่วัดมุมหรือระยะผิดพลาดทันที

### 38. (เสริม 05) Spacing System (8pt Grid & T-Shirt Sizing) — ระบบระยะห่างมาตรฐานวิศวกรรม
- **8pt Spatial Grid + 4pt Micro-Grid (★ Locked DNA):**
  - ระยะห่างทุกจุดต้องหารด้วย `8px` (หรือ `4px` สำหรับจุดเล็ก) ลงตัวเสมอ: `4px (xs)`, `8px (sm)`, `12px (md-tight)`, `16px (md)`, `24px (lg)`, `32px (xl)`, `48px (2xl)`, `64px (3xl)`
- **Law of Proximity (กฎระยะห่างใน-นอก: `Internal Padding <= External Gap`):**
  - ระยะห่างระหว่างหัวข้อกับเนื้อหาด้านในการ์ดใบเดียวกัน **ต้องน้อยกว่า** ระยะห่างระหว่างการ์ดคนละใบเสมอ เพื่อให้สมองแยกกลุ่มข้อมูลออกทันทีโดยไม่ต้องเพ่ง
- **Optical Padding in Buttons & Badges:**
  - ปุ่มและป้ายกำกับต้องมีระยะห่างซ้าย-ขวามากกว่าบน-ล่างประมาณ `2 เท่า` (เช่น `padding: 8px 16px` หรือ `py-2 px-4`) เพื่อให้ดูสมดุลไม่ดูอ้วนทึบ

### 39. (เสริม 06) Complete Component States Checklist — เช็กลิสต์ 9 สถานะที่ห้ามตกหล่น
ทุกชิ้นส่วนและทุกตารางที่ `/medesign` สร้าง ต้องรองรับครบ **9 สถานะมาตรฐาน (9-State Mandatory Matrix):**
1. **`Default / Rest`:** สถานะปกติ สะอาดตา อ่านค่าง่าย
2. **`Hover`:** เปลี่ยนสีเส้นขอบเป็น `--border-strong` หรือไฮไลต์แถวตารางบางๆ (ห้ามทำการ์ดเด้งลอย)
3. **`Focus-Visible`:** แสดงกรอบ `2px solid var(--accent)` ชัดเจนเมื่อกดปุ่ม `Tab` เลื่อนช่องกรอกพิกัด
4. **`Active / Pressed`:** ปุ่มยุบตัวลงเล็กน้อย `transform: scale(0.97)` ในเวลา `150ms`
5. **`Disabled`:** ลดความทึบลง (`opacity: 0.45; cursor: not-allowed`) เมื่อข้อมูลยังไม่พร้อมคำนวณ
6. **`Loading / Computing`:** แสดงโครง Skeleton หรือสถานะกำลังคำนวณโดยหน้าจอไม่กระตุกเปลี่ยนขนาด
7. **`Empty / Zero-Data State (สำคัญมาก — ★ Auto-Inspector เติมให้เสมอ)`:** เมื่อตารางยังไม่มีข้อมูล **ต้องมีปุ่ม `"📥 โหลดข้อมูลตัวอย่าง 1 คลิก (Load Sample Traverse)"`** วางไว้ให้กดทดสอบได้ทันที ห้ามปล่อยหน้าขาวโล่ง
8. **`Error / Out-of-Tolerance State`:** ไฮไลต์ช่องที่กรอกผิดหรือหมุดที่คลาดเคลื่อนเกินเกณฑ์ พร้อมบอกวิธีแก้ไขชัดเจน
9. **`Success / Verified State`:** แสดงป้ายยืนยันเมื่อคำนวณปรับแก้พิกัดสำเร็จและผ่านเกณฑ์มาตรฐาน (เช่น `✓ PASSED FIRST-ORDER 1:20,000`)

### 40. (เสริม 07) Animation Principles — กฎฟิสิกส์การเคลื่อนไหวระดับ Micro-Precision
- **`150ms–200ms Micro-Response Law` (★ Locked DNA):** ทุกการตอบสนองของการกดปุ่มและสลับแท็บต้องจบภายใน `150ms–200ms` เพื่อให้ระบบรู้สึกไวทันใจเหมือนเครื่องมือวัดจริง
- **`GPU-Safe Properties Only`:** อนุญาตให้แอนิเมตเฉพาะ `opacity`, `transform`, `border-color`, และ `background-color` เท่านั้น (ห้ามแอนิเมต `width`, `height`, `top`, `margin` ที่ทำให้ตารางกระตุก)
- **`Origin-Aware Continuity`:** เมนูหรือกล่องข้อมูลที่กางออกต้องขยายจากจุดที่ปุ่มนั้นตั้งอยู่ ไม่โผล่ลอยมาจากกลางอากาศมั่วๆ
- **`Zero Decorative Bounce`:** ตัดแอนิเมชันเด้งดึ๋ง (Spring Overshoot) หรือพื้นหลังหมุนวนออกทั้งหมดในหน้าเครื่องมือทำงาน

### 41. (เสริม 08) Professional Layout Terminology — ศัพท์โซนหน้าเว็บระดับบรรณาธิการและวิศวกร
- **`Above the Fold`:** พื้นที่หน้าจอส่วนแรกที่เห็นทันทีโดยไม่ต้องเลื่อนเมาส์ (ใน MESURV ต้องเห็นครบทั้ง **แถบเมนูบน + สรุป 4 KPIs + หัวตารางข้อมูลหลัก** ทันที)
- **`Eyebrow / Kicker`:** ป้ายข้อความ Monospace ตัวพิมพ์ใหญ่ขนาดเล็กเหนือชื่อเรื่องหลัก (เช่น `SURVEY COMPUTATION ENGINE · ZONE 47N`)
- **`Deck / Lead Summary`:** คำอธิบายสั้น 1–2 บรรทัดใต้หัวข้อใหญ่ สรุปว่าเครื่องมือนี้ใช้ทำอะไรและอ้างอิงมาตรฐานใด
- **`Chrome vs. Canvas Ratio`:** สัดส่วนระหว่าง "กรอบเมนูควบคุม (Chrome)" กับ "พื้นที่ข้อมูลและแผนที่จริง (Canvas)" — กฎเหล็กของ MESURV คือ **Chrome ไม่เกิน 12% ของจอ และยกพื้นที่ 88%+ ให้ตารางและแผนที่** *(จึงตัด Left Sidebar ทิ้ง)*
- **`Callout / Field Pitfall Box`:** กล่องเน้นข้อความสำคัญหรือข้อควรระวังหน้างานจริง ตีเส้นขอบซ้ายหนา `3px solid var(--accent)`

### 42. (เสริม 09) Advanced Interaction Patterns — รูปแบบการโต้ตอบขั้นสูงสำหรับงานข้อมูล
- **`Synchronized Split Highlighting (Table ↔ Vector Map)`:** เมื่อชี้เมาส์หรือคลิกแถวหมุด `TP-02` ในตาราง จุดหมุด `TP-02` บนผังเวกเตอร์ด้านขวาจะสว่างและขยายขึ้นพร้อมกันทันที *(★ Locked DNA)*
- **`Inline Direct Manipulation`:** คลิกแก้ค่ามุมหรือระยะทางในตารางแล้วกด `Enter` เพื่อคำนวณใหม่ทันทีโดยไม่ต้องเปิดป๊อปอัปซ้อน
- **`Smart Paste & Sample Injection`:** รองรับการคัดลอกข้อมูลจาก Excel/CSV มาวาง หรือกดปุ่มโหลดข้อมูลตัวอย่างในคลิกเดียว
- **`Keyboard-First Ergonomics`:** กด `Tab` ข้ามช่องกรอกค่ามุม-ระยะตามลำดับแนวนอน และกด `← / →` สลับหน้าเปรียบเทียบใน Lab ได้ทันที

### 43. (เสริม 10) Dashboard-Specific Patterns — แม่แบบเฉพาะทางสำหรับแดชบอร์ดและระบบคำนวณ
- **`Co-located Action Header`:** หัวตารางต้องมีปุ่ม `โหลดข้อมูลตัวอย่าง`, `คำนวณปรับแก้`, และ `ส่งออก CSV/GeoJSON` วางอยู่ในแถวเดียวกันกับชื่อตาราง *(★ Locked DNA)*
- **`Pinned Summary / Misclosure Footer Row`:** แถวสุดท้ายของตารางวงรอบต้องตรึงไว้แสดง **ผลรวมมุม (`Σ Angle`), ระยะทางรวม (`Σ Dist`), และค่าความคลาดเคลื่อน (`ΔN, ΔE`)** ชัดเจนเสมอ
- **`KPI Card with Tolerance Badge`:** การ์ดตัวเลขสถิติต้องไม่โชว์แค่ตัวเลขลอยๆ แต่ต้องมีป้ายบอกว่าตัวเลขนั้น **"ผ่านเกณฑ์" หรือ "เกินเกณฑ์"** มาตรฐานใดควบคู่กันเสมอ
- **`Telemetry Status Bar`:** แถบสถานะขนาดกะทัดรัดแสดงระบบพิกัด (`WGS84 / UTM 47N`), สถานะ `● RTSD READY`, และเวลาอัปเดตล่าสุด

### 44. (เสริม 11) Responsive Priority+ & Adaptive Ergonomics — การปรับหน้าตาตามขนาดจออย่างฉลาด
- **`Priority+ Top Navigation`:** แสดงแท็บหลักที่สำคัญที่สุดไว้บนแถบด้านบนเสมอ ไม่ซ่อนทุกอย่างไว้ในปุ่มขีดสามเส้น (Hamburger) จนหาไม่เจอ
- **`Desktop Split → Mobile Stacked Tabs`:** บนจอคอมพิวเตอร์แสดงตารางคู่กับผังวงรอบซ้าย-ขวา (`7:5` หรือ `50:50`) แต่เมื่อเปิดบนมือถือภาคสนามจะเรียงซ้อนกันพร้อมปุ่มสลับดูตาราง/แผนที่อย่างลื่นไหล
- **`Horizontal Scroll Table with Sticky Station Column`:** บนจอเล็ก ตารางพิกัดต้องตรึงคอลัมน์แรก (`รหัสหมุด STATION`) ให้อยู่กับที่ แล้วเลื่อนดูค่ามุมและพิกัด `N, E` ทางขวาได้โดยไม่หลงบรรทัด

### 45. (เสริม 12) Error Prevention & Recovery (Poka-Yoke UX) — ระบบกันพลาดและกู้คืนข้อมูล
- **`Unit & Format Hinting`:** ช่องกรอกทุกช่องต้องระบุหน่วยและรูปแบบชัดเจนในหัวคอลัมน์หรือ Placeholder (เช่น `มุมราบ (DDD° MM' SS")` หรือ `ระยะทาง (เมตร 0.000)`)
- **`Pre-Calculation Guardrail`:** ตรวจสอบจำนวนหมุดและค่าว่างก่อนคำนวณ พร้อมแจ้งเตือนจุดที่ยังกรอกไม่ครบด้วยภาษาคนเข้าใจง่าย
- **`LocalStorage State Persistence`:** จดจำทั้งธีมสี (`fieldbook` / `terminal`) และข้อมูลที่ผู้ใช้เลือกหรือกรอกค้างไว้ใน `localStorage` เสมอ เปิดกลับมาใหม่ข้อมูลไม่หาย *(★ Locked DNA)*
- **`1-Click Reset to Sample`:** มีปุ่มคืนค่าตัวอย่างเริ่มต้นให้กดเริ่มใหม่ได้ตลอดเวลาโดยไม่กลัวพัง

### 46. (เสริม 13) Performance Budget & Rendering Discipline — วินัยความเร็วระดับ 60fps
- **`Zero Layout Shift (CLS = 0)`:** กำหนดขนาดความสูงขั้นต่ำของกราฟ/ผัง SVG และใช้ `tabular-nums` เพื่อไม่ให้ตัวเลขหรือตารางขยับดิ้นขณะคำนวณสด
- **`Zero Heavy Framework Bloat`:** ใช้ CSS Custom Properties (`--bg`, `--surface`, `--accent`) และ Vanilla JS / SVG ที่ทำงานเสร็จในระดับ `< 16ms` (60fps)
- **`Instant Theme Switching`:** การสลับโหมดกลางวัน (`fieldbook`) ↔ กลางคืน (`terminal`) ต้องเปลี่ยนทันทีผ่าน `data-theme` โดยไม่ต้องโหลดหน้าเว็บใหม่

### 47. (เสริม 14) Accessibility (A11y) Pre-Flight Checklist — เช็กลิสต์ความชัดเจนทุกสภาพแวดล้อม
- **[✓] ความคมชัดสู้แดด (Outdoor Daylight Readability):** โหมด `fieldbook` ใช้ตัวอักษรเข้มจัด `#14241b` บนพื้น `#f3f1eb`/`#ffffff` (Contrast > 12:1 เกินมาตรฐาน AAA)
- **[✓] ไม่พึ่งสีเพียงอย่างเดียว (Color-Blind Safe):** ป้ายสถานะทุกอันต้องมีทั้งสัญลักษณ์ (`✓`, `⚠`, `●`) และข้อความกำกับคู่กับสีเสมอ
- **[✓] ลำดับหัวข้อถูกต้อง (`H1 → H2 → H3`):** มี `H1` เพียงตัวเดียวต่อหน้า และแบ่งโซนด้วย `<header>`, `<nav>`, `<main>`, `<section>`

### 48. (เสริม 15) 3-Tier Design Tokens Architecture — สถาปัตยกรรมตัวแปรดีไซน์ 3 ชั้น
ระบบ `/medesign` จัดระเบียบโค้ดสีและระยะห่างเป็น 3 ชั้นมาตรฐานโลก:
1. **`Tier 1 — Primitive Tokens (ค่าสีและตัวเลขดิบ)`:** เช่น `#f3f1eb` (Warm Paper), `#050505` (Carbon Black), `#15803d` (Survey Green), `#34d399` (Emerald Signal), `#fcd535` (Instrument Gold)
2. **`Tier 2 — Semantic Tokens (ตัวแปรตามหน้าที่ สลับตามธีมอัตโนมัติ)`:**
   - `--bg` (พื้นหลังหลัก 60%)
   - `--surface` / `--surface-2` (พื้นการ์ดและช่องกรอก 30%)
   - `--text-1` / `--text-2` / `--text-3` (ลำดับความเข้มตัวอักษร)
   - `--accent` / `--accent-2` (สีจุดเน้นสายตา 10%)
   - `--border` / `--border-strong` (เส้นขอบ `1px` บางคม)
3. **`Tier 3 — Component Tokens (ตัวแปรเฉพาะชิ้นส่วน)`:**
   - `--card-radius` (`12px` ใน Fieldbook / `2px` ใน Terminal)
   - `--btn-radius` (`8px` ใน Fieldbook / `2px` ใน Terminal)
   - `--tab-underline: 2px solid var(--accent)`

### 49. (เสริม 16) AI Design Prompt Formula & Component Spec Template — สูตรสำเร็จที่ระบบใช้แปลงคำสั่งอัตโนมัติ
เมื่อผู้ใช้สั่งงานสั้นๆ (เช่น *"ทำหน้าคำนวณระดับน้ำ"*) ระบบ `/medesign` จะขยายความต้องการของผู้ใช้เข้าสู่ **สูตร 6 องค์ประกอบ (6-Part Master Prompt Formula)** อัตโนมัติโดยที่ผู้ใช้ไม่ต้องพิมพ์เอง:
```text
[1. Domain & Role]        เครื่องมือวิศวกรรมสำรวจ / แดชบอร์ดความแม่นยำสูง (High-SNR Instrument)
[2. Spatial Topology]     Zero-Sidebar Top-Nav + 2px Underline Tabs + Z/F-Pattern + 8:4 / 50:50 Split
[3. Surface & 60-30-10]   Dual-Theme (Fieldbook #f3f1eb 60% / Surface #fff 30% / Accent #15803d 10% ↔ Terminal #050505)
[4. Typography & Numbers] Plus Jakarta Sans (-0.025em) + Geist Mono (tabular-nums lining-nums 100% บนตัวเลข/พิกัด)
[5. Primary Sections]     Auto-Detected Headings + Auto-Filled Essentials (1-Click Sample, Pass/Fail Badge, Co-located Export, Pinned Totals Row)
[6. Anti-Slop Guardrails] Zero Left Sidebar, Zero Box Tabs, Zero Gradients, Zero Emoji Headings, Zero Card Bounce (150ms micro-press only)
```

### 50. (เสริม 17) Anti-Patterns & Pre-Delivery QA Checklist — ด่านตรวจคุณภาพ 12 ข้อก่อนส่งมอบงานทุกครั้ง
ก่อนที่ `/medesign` จะส่งมอบโค้ดหน้าเว็บให้ผู้ใช้ ระบบต้องตรวจผ่าน **12-Point World-Class QA Gate** นี้ครบทุกข้อ:
1. **[✓] หัวข้อหลักครบถ้วน (Primary Headings Complete):** มีครบทั้งส่วนที่ผู้ใช้สั่ง และส่วนสำคัญที่ระบบเติมให้อัตโนมัติ (`Sample Loader`, `Pass/Fail Badge`, `Export`, `Summary Row`)
2. **[✓] ไร้แถบเมนูซ้ายเกะกะ (Zero Fixed Left Sidebar):** ใช้ `Top Navigation Bar` พร้อมแท็บขีดเส้นใต้ `2px` เท่านั้นใน MESURV
3. **[✓] กฎสี 60-30-10 & สลับได้ 2 ธีมสด:** รองรับ `data-theme="fieldbook"` (กลางวัน) และ `data-theme="terminal"` (กลางคืน) พร้อมจำค่าใน `localStorage`
4. **[✓] ตัวเลขเรียงหลักตรงเป๊ะ (`tabular-nums`):** พิกัด มุม ระยะทาง และสกอร์ทั้งหมดใช้ `Geist Mono` + `tabular-nums`
5. **[✓] ปุ่มควบคุมวางติดกับตาราง (Co-located Controls):** ไม่วางปุ่มคำนวณหรือปุ่ม Export แยกห่างจากตารางข้อมูล
6. **[✓] ปุ่มใช้คำกริยาชัดเจน (Verbs Over Nouns):** เช่น `คำนวณปรับแก้พิกัด`, `โหลดข้อมูลตัวอย่าง`, `ส่งออก GeoJSON`
7. **[✓] มีข้อมูลตัวอย่างกดทดสอบได้ทันที (Zero Dead Empty State):** เปิดหน้าเว็บมาต้องเห็นข้อมูลจริงหรือกดโหลดตัวอย่างได้ใน 1 คลิก
8. **[✓] จังหวะสายตา F/Z-Pattern & ระยะห่าง 8pt Grid:** การ์ดและตารางจัดเรียงสมดุล ไม่เบียดแน่นและไม่โล่งเคว้งคว้าง
9. **[✓] ไร้สีรุ้งและเงาดำทึบ (Zero Gaudy Gradients / Heavy Shadows):** ใช้ Tonal Layering และเส้นขอบบาง `1px`
10. **[✓] ไร้ Emoji เรียงหน้าหัวข้อหลัก (Zero Emoji Heading Spam):** ใช้ Eyebrow Monospace และป้ายสถานะ Tinted Badge แทน
11. **[✓] ไร้แอนิเมชันเด้งลอยกวนสายตา (150ms Micro-Press Only):** การ์ดนิ่งมั่นคง ปุ่มกดยุบตัว `scale(0.97)` คมกริบ
12. **[✓] รองรับทั้งจอคอมและมือถือภาคสนาม (Responsive Priority+):** ตารางไม่ล้นจอแตก และปุ่มกดง่ายไม่พลาด


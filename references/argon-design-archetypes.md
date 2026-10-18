# 38 High-Craft Design & Operational Archetypes & Prompt Architecture (Gemini 4.0 Argon Vault)

คลังแม่แบบสถาปัตยกรรมการออกแบบ 30 รูปแบบระดับ World-Class สำหรับนำไปใช้เป็น Blueprint ในการสั่งงาน `/medesign` หรือสร้างไฟล์ `design.md` ประจำโปรเจกต์ เพื่อขจัดงานดีไซน์แบบ AI Slop ให้กลายเป็นผลงานระดับ Awwwards และ Production-Grade

---

## 1. Master Prompt Formula (โครงสร้างสั่งงาน 5 ส่วน)

```markdown
# Role & Aesthetic Direction
Act as a Principal Design Technologist & Awwwards-winning Creative Developer.
Design and build a [ประเภทโปรเจกต์] following the "[ชื่อสไตล์จาก 30 แบบด้านล่าง]" aesthetic.

# 1. Visual & Color Architecture
- Canvas Background: [Hex Code เช่น #08090A หรือ #F6F5F2]
- Surface & Elevation: [1px translucent border, subtle top highlight, layered ambient shadows]
- Palette: [Primary, Secondary, Accent สัดส่วน 60-30-10, บังคับ linear-gradient(in oklch, ...)]

# 2. Typography & Scannability
- Headings: [ชื่อฟอนต์, letter-spacing -0.03em, line-height 1.05, text-wrap: balance]
- Body/UI: [ฟอนต์อ่านง่าย, line-height 1.6-1.7, text-wrap: pretty]
- Metrics/Data: [Monospace, tabular-nums เสมอ]

# 3. Layout & Spatial Rhythm
- Grid: [12-column Bento Grid / Swiss Hairline Grid / Editorial Asymmetric]
- Radii: [Concentric Formula: r_inner = max(0, r_outer - padding)]
- Whitespace: [Generous breathing room, minimum 25% empty canvas]

# 4. Motion & Micro-interactions
- Easing: [Calibrated Cubic-Bezier หรือ Spring Physics — ห้าม linear หรือ 0.3s ease ทื่อๆ]
- States: [Hover lift, focus-visible ring, active scale 0.97]

# 5. Anti-Bloat Guardrails
- NO generic Tailwind default blues/indigos.
- NO heavy muddy black drop-shadows.
- NO cramped padding or cluttered cards.
```

---

## 2. คลัง 38 สไตล์การออกแบบ (38 Production Archetypes: 30 Visual + 8 High-Signal Engineering)

### GROUP A: Luxury, Editorial & High-Fashion (หรูหรา เหนือกาลเวลา และงานนิตยสาร)

#### 01. Quiet Luxury (Old Money Minimal)
- **Vibe:** Loro Piana, Aesop, Bottega Veneta — หรูหราไม่ตะโกน เน้นพื้นผิวธรรมชาติและช่องไฟมหาศาล
- **Palette:** Warm Alabaster (`#F6F5F2`), Cashmere Taupe (`#E6E2DD`), Deep Espresso (`#1C1B19`), Muted Bronze (`#8C7A6B`)
- **Typography:** Display: *Cormorant Garamond* (Light, italic accents) | UI: *Plus Jakarta Sans* (Tracking `+0.08em` uppercase)
- **Rules:** `0px` border-radius, zero drop shadows, `1px solid #E2DDD5` dividers, minimum `160px` vertical section padding.

#### 02. Swiss International Editorial (Neo-Grid)
- **Vibe:** พิพิธภัณฑ์ศิลปะร่วมสมัย งานกราฟิกสวิส คมกริบด้วยเส้นตารางที่มองเห็นได้จริง
- **Palette:** Stark Paper (`#FAFAFA`), Carbon Ink (`#0D0D0D`), International Orange (`#FF3300`)
- **Typography:** *Inter* หรือ *Helvetica Now* — Oversized bold headers (`tracking: -0.04em`, `line-height: 0.95`)
- **Rules:** Exposed `1px solid #0D0D0D` grid lines, sticky sidebar metadata, asymmetric masonry imagery, instant color inversion on hover.

#### 03. Dark Haute Couture (Obsidian & Champagne)
- **Vibe:** แบรนด์นาฬิกาไฮเอนด์ จิวเวลรี่ คลับส่วนตัวระดับอัลตร้าลักชัวรี
- **Palette:** Obsidian Void (`#070708`), Charcoal Velvet (`#121214`), Champagne Gold (`#D4AF37`), Muted Silver (`#9E9E9E`)
- **Typography:** Display: *Playfair Display* หรือ *Cinzel* | Body: *Manrope*
- **Rules:** Subtle radial golden glow behind hero focal points, `1px` gradient borders (`linear-gradient(135deg, rgba(212,175,55,0.4), transparent)`).

#### 04. Architectural Monolith (Brutalist Luxury)
- **Vibe:** แกลเลอรีสถาปัตยกรรม สตูดิโอออกแบบภายใน ดิบแต่ประณีตเหมือนคอนกรีตหล่อเปลือย
- **Palette:** Raw Concrete (`#D8D6D0`), Wet Slate (`#2B2B2A`), Pure Chalk (`#FFFFFF`)
- **Typography:** *Syne* หรือ *Space Grotesk* — Massive viewport-width typography (`font-size: clamp(3.5rem, 9vw, 10rem)`)
- **Rules:** Hard edges (`border-radius: 0px`), full-bleed architectural photography, fixed corner coordinates, horizontal scroll gallery.

#### 05. Japanese Zen & Wabi-Sabi Digital
- **Vibe:** โรงแรมเรียวกังหรู มัทฉะเกรดพิธีการ สกินแคร์ออร์แกนิก เน้นความสงบและสมดุลที่ไม่สมมาตร
- **Palette:** Washi Paper (`#F4F1EA`), Sumi Ink (`#22211F`), Moss Matcha (`#4A5D4E`), Terracotta Clay (`#A65E46`)
- **Typography:** *Noto Serif JP* / *Instrument Serif* paired with clean humanist sans
- **Rules:** Vertical text accents (`writing-mode: vertical-rl`), SVG paper grain overlay (`opacity: 0.04`), organic asymmetric layouts.

#### 06. Nordic Kinfolk Aesthetic
- **Vibe:** นิตยสารไลฟ์สไตล์สแกนดิเนเวีย เฟอร์นิเจอร์ไม้โอ๊ค แสงแดดยามเช้าที่นุ่มนวล
- **Palette:** Oat Milk (`#F9F6F0`), Sage Grey (`#C8CEC6`), Charcoal (`#2C302E`), Warm Sand (`#DBCBB8`)
- **Typography:** *Newsreader* (Light/Regular) + *DM Sans*
- **Rules:** Soft pill buttons (`border-radius: 9999px`), warm image filters, multi-column editorial article layouts.

---

### GROUP B: Next-Gen SaaS, WebApp & Productivity (เว็บแอปสมัยใหม่ Silicon Valley)

#### 07. Linear-Style Dark Mode (Precision Glow)
- **Vibe:** เครื่องมือสำหรับนักพัฒนาและสตาร์ทอัพระดับโลก คมชัด ลึกลับ มืออาชีพสูงสุด
- **Palette:** Deep Space (`#08090A`), Elevated Surface (`#111215`), Subtle Border (`rgba(255,255,255,0.08)`), Electric Indigo (`#5E6AD2`)
- **Typography:** *Inter* หรือ *Geist Sans* (`font-feature-settings: "cv02", "cv03", "cv04"`)
- **Rules:** `1px` translucent borders with top-edge specular highlight, radial mouse-tracking spotlight on cards, keyboard shortcut badges (`kbd`).

#### 08. Raycast / Vercel Monochromatic Sharp
- **Vibe:** ความเร็วสูง มินิมอลขาว-ดำ-เทา เน้นความคมของเส้นและข้อมูลเชิงเทคนิค
- **Palette:** Pure Pitch (`#000000`), Zinc Surface (`#0A0A0A`), Crisp White (`#EDEDED`), Muted Zinc (`#888888`)
- **Typography:** *Geist Sans* + *Geist Mono* for metrics, tags, and code snippets
- **Rules:** Crosshair intersection markers (`+`) at grid corners, `1px solid #222222` structural lines, zero decorative colors (status indicators use emerald/amber dots only).

#### 09. Apple VisionOS (Spatial Glassmorphism)
- **Vibe:** อินเทอร์เฟซลอยตัวในอากาศ โปร่งแสง รับแสงจากสภาพแวดล้อมรอบข้าง
- **Palette:** Translucent Glass (`rgba(255, 255, 255, 0.12)`), Specular Edge (`rgba(255, 255, 255, 0.35)`), Pure White text
- **Typography:** *SF Pro Display* / *Inter* (Medium weight for legibility over glass)
- **Rules:** Heavy `backdrop-filter: blur(40px) saturate(190%)`, squircle corners (`border-radius: 32px`), inner ring shadow (`inset 0 1px 0 0 rgba(255,255,255,0.3)`).

#### 10. Stripe-Inspired Mesh & Micro-Polish
- **Vibe:** ฟินเทคและแพลตฟอร์มระดับองค์กรที่สดใส น่าเชื่อถือ และมีรายละเอียดอินเทอร์แอคทีฟที่สมบูรณ์แบบ
- **Palette:** Crisp Slate Canvas (`#F6F9FC`), Pure White Cards (`#FFFFFF`), Deep Navy Ink (`#0A2540`), Vibrant Mesh (`#635BFF`, `#00D4B6`, `#FF7A59`)
- **Typography:** *Plus Jakarta Sans* หรือ *Sohne*
- **Rules:** Skewed diagonal section dividers, multi-layered realistic shadows, interactive live-updating UI micro-components inside hero cards.

#### 11. Bento Grid Modular Dashboard
- **Vibe:** การจัดระเบียบข้อมูลที่ซับซ้อนให้อยู่ในกล่องสี่เหลี่ยมหลายขนาดที่สอดรับกันอย่างลงตัว
- **Palette:** Off-White (`#F4F4F6`) หรือ Dark Onyx (`#0D0E11`), Surface Cards (`#FFFFFF` / `#16181D`), Accent Coral หรือ Cobalt
- **Typography:** *Outfit* หรือ *Inter* (Bold metrics, compact descriptions)
- **Rules:** CSS Grid `repeat(12, 1fr)` with `gap: 16px` หรือ `24px`, uniform `border-radius: 24px`, micro-charts bleeding to card edges.

#### 12. Fintech Private Banking (Emerald & Brass)
- **Vibe:** ความมั่งคั่ง การบริหารพอร์ตโฟลิโอระดับ VIP ความปลอดภัยและเสถียรภาพทางการเงิน
- **Palette:** Midnight Forest (`#061411`), Deep Emerald Surface (`#0B221D`), Brushed Brass (`#C5A059`), Mint Signal (`#34D399`)
- **Typography:** *Instrument Serif* (Headers) + *JetBrains Mono* (`tabular-nums` for all financial figures)
- **Rules:** Razor-sharp SVG sparkline charts with gradient area fills, glassmorphic card previews, ultra-clean data tables.

---

### GROUP C: 3D Web, WebGL & Immersive Experiences (งาน 3 มิติ แสงเงา และ Interactive)

#### 13. Three.js / R3F Studio Product Showcase
- **Vibe:** เว็บเปิดตัวฮาร์ดแวร์ รถยนต์ไฟฟ้า หรือแกดเจ็ตระดับเรือธงที่หมุนดูได้ 360 องศา
- **Palette:** Studio Cyclorama Grey (`#141517` radial to `#08080A`), Crisp White HUD, Anodized Metallic accents
- **Typography:** *Space Grotesk* + *Inter*
- **Rules:** Fullscreen fixed `<canvas>` (`z-index: 0`), HTML scroll sections (`z-index: 10; pointer-events: none`), PBR metallic/roughness shaders, callout pins tethered to 3D coordinates.

#### 14. Liquid Metal & Iridescent Shaders
- **Vibe:** สตูดิโอครีเอทีฟ ศิลปะดิจิทัล พื้นผิวไหลเวียนเหมือนปรอทสะท้อนแสงรุ้ง
- **Palette:** Void Black (`#030305`), Prismatic Chrome (Cyan `#00F0FF`, Magenta `#FF007A`, Violet `#7000FF`)
- **Typography:** *Syne* (ExtraBold) + *Space Mono*
- **Rules:** Custom GLSL fragment shader background reacting to cursor velocity, chromatic aberration on scroll.

#### 15. Spline-Style Soft 3D Claymorphism
- **Vibe:** เป็นมิตร สนุกสนาน น่าหยิบจับ เหมาะกับ Web3 ครีเอเตอร์ทูลส์
- **Palette:** Soft Lavender (`#F3F0FF`), Mint Cream (`#E6FCF5`), Pastel Coral (`#FFE3E3`), Deep Indigo Ink (`#1E1B4B`)
- **Typography:** *Plus Jakarta Sans* หรือ *Fredoka*
- **Rules:** Matte 3D isometric illustrations with subsurface scattering, plump buttons with soft inner shadows, bouncy spring physics.

#### 16. Cybernetic Hologram & Sci-Fi Telemetry HUD
- **Vibe:** ระบบปฏิบัติการยานอวกาศ อินเทอร์เฟซ AI ขั้นสูง โรโบติกส์
- **Palette:** Deep Radar Black (`#02060D`), Hologram Cyan (`#00F5D4`), Amber Alert (`#FFB703`), Grid Line (`rgba(0, 245, 212, 0.15)`)
- **Typography:** *Rajdhani* หรือ *Chakra Petch* (Headers) + *Share Tech Mono* (Telemetry data)
- **Rules:** Chamfered corners with `clip-path: polygon(...)`, wireframe 3D globe or mesh centerpiece, CRT scanline overlay, ticking coordinates.

#### 17. Architectural ArchViz Scrollytelling
- **Vibe:** โครงการอสังหาริมทรัพย์ระดับ Super Luxury รีสอร์ตส่วนตัว
- **Palette:** Warm Travertine (`#EAE4DC`), Bronze (`#5C4D3C`), Charcoal (`#1A1918`)
- **Typography:** *Cormorant* + *Montserrat* (Thin/Light uppercase)
- **Rules:** Smooth camera path interpolation between rooms on scroll, interactive day-to-night slider, floorplan mini-map.

#### 18. Particle Cloud & Generative Morphing
- **Vibe:** แพลตฟอร์ม AI, Big Data, Biotechnology หรือ Research Lab
- **Palette:** Deep Abyss (`#040508`), Bioluminescent Blue (`#3B82F6`), Neural Violet (`#8B5CF6`), Pure White particles
- **Typography:** *Sora* หรือ *Inter*
- **Rules:** Instanced particles morphing between geometric shapes per scroll section, additive blending (`THREE.AdditiveBlending`), depth-of-field bokeh.

---

### GROUP D: Tactile, Hardware & Skeuomorphic Revival (งานมีมิติ สัมผัสได้จริง)

#### 19. Teenage Engineering (Industrial Tactile)
- **Vibe:** เครื่องดนตรีสังเคราะห์ อุปกรณ์ฮาร์ดแวร์สวีเดน ปุ่มกดกลไกและป้ายกำกับวิศวกรรม
- **Palette:** Anodized Aluminium (`#E5E5E0`), Matte Charcoal (`#222222`), Signal Orange (`#FF5500`), Safety Yellow (`#FFB800`)
- **Typography:** *IBM Plex Mono* หรือ *Space Mono* (Strict grid alignment)
- **Rules:** Physical button states (`box-shadow: 0 4px 0 #111`, active `translateY(3px)`), rotary knob SVG controls, perforated speaker grille motifs.

#### 20. Neo-Neumorphism (Soft Extruded Dark Matte)
- **Vibe:** รีโมตคอนโทรลรถสปอร์ต แผงควบคุมสมาร์ทโฮมระดับไฮเอนด์ พื้นผิวยางด้านที่มีไฟ LED
- **Palette:** Matte Vulcan (`#1E2025`), Highlight Shadow (`#272A30`), Drop Shadow (`#15171B`), Neon Status LED (`#00FF88`)
- **Typography:** *DM Sans* (Medium, clean geometric)
- **Rules:** Dual extruded shadows (`8px 8px 16px #15171B, -8px -8px 16px #272A30`), depressed active states, tiny glowing LED dots.

#### 21. Analog Print & Risograph Texture
- **Vibe:** สตูดิโออิลลัสเตรชัน คาเฟ่สเปเชียลตี้ งานสิ่งพิมพ์ที่มีเสน่ห์ของเม็ดสีซ้อนทับกัน
- **Palette:** Unbleached Paper (`#F2ECE1`), Risograph Blue (`#0078BF`), Fluorescent Pink (`#FF48B0`), Soy Black (`#1A1A1A`)
- **Typography:** *Fraunces* (Chunky retro serif) + *Space Mono*
- **Rules:** `mix-blend-mode: multiply` on overlapping layers, SVG halftone dot patterns, grain noise overlay, slight stamp misregistration offset (`2px`).

#### 22. Luxury Horology (Watchmaker Precision)
- **Vibe:** กลไกนาฬิกาสวิส งานวิศวกรรมระดับไมครอน พื้นผิวโลหะปัดเสี้ยน
- **Palette:** Rhodium Dark (`#0E1013`), Rose Gold (`#C88A65`), Sapphire Blue (`#0F2537`), Super-LumiNova Green (`#76FF9B`)
- **Typography:** *Cinzel* (Engraved headers) + *JetBrains Mono* (Caliber specs)
- **Rules:** SVG radial degree ticks and guilloché patterns, brushed metal conic-gradients, precision circular progress gauges.

#### 23. Retro-Futuristic Braun / Dieter Rams
- **Vibe:** "Less, but better" — ความคลาสสิกยุค 1960s-70s ที่สะอาดตา ซื่อตรงต่อฟังก์ชัน
- **Palette:** Rams Off-White (`#EFECE6`), Bakelite Black (`#181818`), Muted Olive (`#7A7D72`), Rams Orange (`#E04F16` strictly for active toggle)
- **Typography:** *Helvetica Neue* หรือ *Akzidenz-Grotesk* (Strict flush-left alignment)
- **Rules:** Disciplined modular grid, physical-inspired toggle switches, zero gradients on canvas backgrounds.

#### 24. Glass & Prismatic Refraction
- **Vibe:** เลนส์กล้องระดับโปร คริสตัลเจียระไน งานศิลปะแสงเงาที่หักเหผ่านกระจกหนา
- **Palette:** Deep Twilight (`#090A10`), Frosted White (`rgba(255,255,255,0.07)`), Spectral Rainbow edge highlights
- **Typography:** *Outfit* (Light/Regular)
- **Rules:** Refractive borders using layered `box-shadow` with cyan/magenta/yellow 1px offsets, heavy backdrop blur with chromatic dispersion.

---

### GROUP E: Bold, Creative Agency & Experimental (งานครีเอทีฟ สตูดิโอ สายรางวัล)

#### 25. Neo-Brutalism (High-Craft Commercial)
- **Vibe:** Gumroad, Figma Config — สดใส กล้าหาญ เส้นขอบดำหนาและเงาแข็ง
- **Palette:** Cream Canvas (`#FFFDF8`), Pure Black Borders (`#000000`), Acid Yellow (`#FFDE00`), Electric Lavender (`#C4A1FF`)
- **Typography:** *Lexend Mega* หรือ *Cabinet Grotesk* (Black weight) + *Public Sans*
- **Rules:** Mandatory `2px solid #000000` border, hard offset shadow (`4px 4px 0px #000000`), hover translates `(-2px, -2px)` with expanded shadow (`6px 6px 0px #000000`).

#### 26. Kinetic Typography & Marquee Studio
- **Vibe:** เอเจนซี่โฆษณา สตูดิโอโปรดักชัน ตัวอักษรมีชีวิตและเคลื่อนไหวตลอดเวลา
- **Palette:** Stark Black (`#0B0B0B`), Off-White (`#F5F5F3`), Acid Lime (`#D4FF00`)
- **Typography:** *Clash Display* หรือ *Monument Extended* (Ultra-wide uppercase)
- **Rules:** Infinite horizontal marquee tickers, text skewing (`transform: skewX()`) proportional to scroll speed, magnetic circular cursor.

#### 27. Y2K Chrome & Acid Cyber
- **Vibe:** แฟชั่นสตรีทแวร์ คอนเสิร์ตอิเล็กทรอนิกส์ จัดจ้านสะดุดตา
- **Palette:** Pitch Black (`#050505`), Liquid Silver (`#E2E8F0`), Acid Green (`#00FF66`), Hyper Pink (`#FF0055`)
- **Typography:** Stretched display headers + *OCR-A* / *VT323* monospace accents
- **Rules:** Metallic chrome gradients, tribal/starburst SVG ornaments, sticker-like floating badges, glitch hover transitions.

#### 28. Biophilic & Organic Wellness
- **Vibe:** คลินิกเวชศาสตร์ชะลอวัย รีสอร์ตธรรมชาติ เส้นสายโค้งมนเหมือนสายน้ำและก้อนหิน
- **Palette:** Warm Sand (`#F5EFE6`), Terracotta (`#C87D65`), Deep Olive (`#2E3B30`), Soft Clay (`#E6D7C3`)
- **Typography:** *Fraunces* (Soft, organic curves) + *Plus Jakarta Sans*
- **Rules:** Fluid organic border-radius morphing slowly via CSS keyframes, slow breathing ambient animations (`6s ease-in-out infinite`).

#### 29. AI-Native Ambient Interface (Zero-UI)
- **Vibe:** ระบบปฏิบัติการ AI ยุคถัดไป ลดทอนปุ่มกด เหลือเพียงพื้นที่สนทนาและการ์ดผลลัพธ์
- **Palette:** Alabaster (`#F8FAFC`) หรือ Obsidian (`#090A0F`), Aurora Gradient (`#6366F1`, `#EC4899`, `#14B8A6` at `15%` blur)
- **Typography:** *Inter* (Variable weight, ultra-clean hierarchy)
- **Rules:** Floating command bar anchored at bottom-center with glowing ambient aura during thinking states, fluid staggered token streaming animations.

#### 30. Hyper-Minimalist Scrollytelling (Apple Pro Product Page)
- **Vibe:** หน้าเปิดตัวสินค้าเรือธง เล่าเรื่องทีละเฟรมอย่างทรงพลัง ดราม่า สะกดสายตา
- **Palette:** Pure OLED Black (`#000000`), Titanium Grey (`#86868B`), Pure White (`#F5F5F7`)
- **Typography:** *SF Pro Display* / *Inter* — Tight tracking (`-0.03em`), gradient text fills from white to muted grey
- **Rules:** Sticky viewport containers (`height: 300vh` outer track with `position: sticky; top: 0; height: 100vh` inner stage), macro hardware photography, scroll-linked opacity and scale transforms.

---


---

### GROUP F: Mission-Critical Engineering & Operational Systems (ระบบวิศวกรรมสำรวจ ควบคุมระบบ และ HMI)

#### 31. Mission Control / High-Performance HMI (ISA-101 Standard)
- **Vibe:** ระบบควบคุมโรงกลั่น โครงข่ายไฟฟ้า หรือศูนย์เฝ้าระวังดาวเทียม ตามมาตรฐาน ISA-101
- **Palette:** Muted Greyscale Canvas (#18191B), Surface (#222428), Normal State Muted Slate (#64748B), Advisory Yellow (#F59E0B), Critical Alarm Flash (#EF4444)
- **Typography:** *Geist Mono* / *JetBrains Mono* สำหรับรหัส Alarm และตัวเลข Telemetry + *Plus Jakarta Sans* สำหรับคำอธิบาย
- **Rules:** ห้ามใช้สีสดเพื่อตกแต่งเด็ดขาด (Color Reserved for State), แยก 3 สถานะชัดเจน: Acknowledged, Unacknowledged (กระพริบช้า 1Hz), และ Suppressed; แสดงระดับความผิดปกติ (Severity 1-4) ชัดเจนโดยไม่ต้องเดา

#### 32. Geospatial Situation Awareness (GIS & Cadastre)
- **Vibe:** แพลตฟอร์มจัดการแปลงที่ดิน กรมที่ดิน และผังเมืองเชิงพื้นที่ความละเอียดสูง
- **Palette:** Deep Slate (#0F172A), Viewport Neutral (#1E293B), Cadastral Gold (#F59E0B), Vertex Cyan (#06B6D4), Boundary Emerald (#10B981)
- **Typography:** *Plus Jakarta Sans* สำหรับ Inspector Panel + *Geist Mono* สำหรับพิกัด UTM/Lat-Long (`tabular-nums`)
- **Rules:** แผนที่เป็นพื้นที่ทำงานหลัก (16:10 หรือ 100dvh Canvas), เชื่อมโยงตารางข้อมูลและ Inspector แบบ Linked Selection (คลิกแปลงในตาราง -> แผนที่ Pan/Zoom หาจุดนั้นทันที), แสดง CRS/Datum (EPSG:32647) และ Scale Bar ที่มุมขวาล่างเสมอ

#### 33. CAD Precision Workbench
- **Vibe:** ซอฟต์แวร์เขียนแบบวิศวกรรม คำนวณโครงสร้าง และรังวัดทำแผนที่ (AutoCAD/Civil 3D Web)
- **Palette:** Drafter Void (#121316), Hairline Grid (rgba(255,255,255,0.06)), Selection Blue (#3B82F6), Snap Crosshair Magenta (#EC4899)
- **Typography:** *Geist Mono* สำหรับบรรทัดป้อนคำสั่ง (Command Line) + Coordinate HUD
- **Rules:** ขยายพื้นที่ Canvas ให้กว้างที่สุด, มี Floating Command/Input Bar ด้านล่าง, Properties Inspector ตรึงขวา, แสดงโหมด Snap (Endpoint, Midpoint, Perpendicular) ด้วยสัญลักษณ์เรขาคณิตชัดเจน

#### 34. Telemetry & Signal Forensics
- **Vibe:** ระบบวิเคราะห์การสั่นสะเทือน โครงสร้างสะพานเขื่อน และการเคลื่อนตัวของแผ่นเปลือกโลก (GNSS Baseline)
- **Palette:** Pure Carbon (#0B0C0E), Signal Green (#22C55E), Baseline Drift Violet (#8B5CF6), Stale Warning Orange (#F97316)
- **Typography:** *Geist Mono* (High-Density Tabular)
- **Rules:** กราฟ Time-Series ต้องเชื่อมไทม์ไลน์กันทุกมิติ (Linked Scrubbing), มีแถบแสดงสถานะข้อมูลขาดหาย (Missing/Gap Data) และเซนเซอร์ค้าง (Stale Data), ห้ามลากเส้นต่อข้ามจุดที่ไม่มีข้อมูลโดยไม่ทำสัญลักษณ์เตือน

#### 35. Anomaly Triage & Incident Response
- **Vibe:** คอนโซลคัดกรองความผิดปกติ คลื่นรังวัดเพี้ยน หรือหมุดสำรวจเคลื่อนตัวผิดปกติ
- **Palette:** Charcoal Matrix (#111215), Severity High (#DC2626), Medium (#EA580C), Low (#2563EB)
- **Typography:** *Public Sans* + *Geist Mono*
- **Rules:** จัดลำดับความสำคัญด้วย Priority Queue (ห้ามใช้ Grid ทื่อๆ), แยกความรุนแรง (Severity) ออกจากความมั่นใจของโมเดล (Confidence), มีปุ่ม Action ชัดเจน: Acknowledge, Assign, Suppress, Resolve

#### 36. Field Survey & Offline Operations
- **Vibe:** แอปแท็บเล็ตและอุปกรณ์รังวัดสมบุกสมบันในสนามกลางแจ้ง (Leica Captivate / Trimble Access)
- **Palette:** High-Contrast Outdoor Daylight (#FFFFFF พื้นขาว / #000000 เส้นดำหนา) หรือ Dark HUD (#0A0A0C), RTK Fix Green (#15803D), Float Orange (#C2410C)
- **Typography:** Oversized *Plus Jakarta Sans* (ตัวหนังสือและปุ่มขนาดใหญ่สำหรับนิ้วมือและถุงมือ)
- **Rules:** ปุ่มกดต้องมี Touch Target >= 52px, แสดงสถานะ GNSS RTK Status (Fixed / Float / Single), ค่าความคลาดเคลื่อน (1-Sigma Hz/Vt), และคิวดาวน์โหลดข้อมูลค้างส่ง (Offline Queue Sync) ที่หัวจอเสมอ

#### 37. Spatiotemporal Change Detection
- **Vibe:** การตรวจจับการบุกรุกพื้นที่ การเปลี่ยนแปลงของตลิ่งแม่น้ำ หรือความคืบหน้างานก่อสร้างรายสัปดาห์
- **Palette:** Neutral Stage (#141518), Added Features Emerald (#10B981), Removed Crimson (#EF4444), Modified Amber (#F59E0B)
- **Typography:** *Geist Sans* + *Geist Mono*
- **Rules:** จอแสดงผลสองฝั่ง (Split View Before/After) ที่ซิงก์ตำแหน่งเมาส์และระดับการซูมแบบ 1:1 พร้อมมีแถบเลื่อนกาลเวลา (Epoch Time Slider)

#### 38. Data Provenance & Survey QA/QC
- **Vibe:** ระบบตรวจรับงานสำรวจ ตรวจสอบความถูกต้องของเส้นชั้นความสูง และรายงานค่าพิกัดตามมาตรฐานกรมที่ดิน
- **Palette:** Archival Warm Paper (#F8F6F0) หรือ Clean Slate (#0F172A), Passed Accent (#059669), Tolerance Drift (#D97706)
- **Typography:** *Fraunces* Heading + *Geist Mono* สำหรับตารางค่าพิกัดความละเอียดทศนิยม 4 ตำแหน่ง
- **Rules:** แสดงสายธารที่มาของข้อมูล (Raw Sensor -> Net Adjustment -> Final UTM), แสดงวงรีความคลาดเคลื่อน (Error Ellipse), ป้ายกำกับเครื่องมือที่ใช้รังวัด และตราประทับเวลาทางนิติวิทยาศาสตร์

---

## 4. The 5-Axis Decoupled Taxonomy (สถาปัตยกรรม 5 มิติอิสระ)

แทนการผูกสไตล์ทั้งหมดเป็นก้อนเดียว ให้ medesign ประกอบร่าง UI ผ่าน 5 แกนอิสระตามลักษณะภารกิจ:

| แกนที่ | มิติการออกแบบ | ตัวเลือกในระบบ | หน้าที่เชิงวิศวกรรม |
|---|---|---|---|
| **1. Operational Archetype** | ภารกิจหลักของผู้ใช้ | 38 รูปแบบ (เช่น Geospatial Situation, CAD Precision, HMI ISA-101, Luxury) | กำหนด Information Hierarchy, ลำดับความสำคัญ และชุดข้อมูลที่ต้องแสดงร่วมกัน |
| **2. Visual Language** | โทนและผิวสัมผัส (Skin) | Linear Minimal, Swiss Editorial, Bloomberg Pro Density, Cosmos Glass, ฯลฯ | กำหนด Color Tokens, รัศมีขอบ, เส้นแบ่ง และระดับความลึกของเงา |
| **3. Spatial Model** | โครงสร้างการจัดผัง (Layout) | Canvas-Centric, Bento 3-Pane Workbench, Split HUD, Master-Detail Stream | กำหนด CSS Grid Template Areas และ Responsive Breakpoints |
| **4. Motion Profile** | พฤติกรรมและฟิสิกส์โมชัน | precision (0-100ms), soft-settle (280ms), spring-settle, instant (0ms) | กำหนดความรู้สึกทางกายภาพและการเคารพ reduced-motion |
| **5. Governance Tier** | มาตรฐานการตรวจรับ (Gate) | Tier 1 Hard Invariants, Tier 2 Soft Heuristics, Tier 3 Enhancements, Tier 4 Domain Rules | ประเมินคะแนนคุณภาพและสกัดกั้น AI Slop ก่อนส่งมอบ |

## 3. Micro-Craft Engineering Rules (ข้อบังคับสำหรับทุกสไตล์)

1. **Concentric Radii:** $R_{\text{inner}} = \max(0, R_{\text{outer}} - \text{Padding})$ เสมอ ห้ามใช้ border-radius เดียวกันระหว่างกล่องนอกและรูป/ปุ่มข้างใน
2. **Color Science:** ห้ามใช้สีเทาแท้ (#1a1a1a) ให้ใช้ Tinted Neutrals เจือสีแบรนด์ 3%–6% เสมอ และใช้ `linear-gradient(in oklch, ...)` เพื่อป้องกันสีหม่นตรงกลาง
3. **Optical Typography:** ใช้ `text-wrap: balance` กับทุก Headings, ใช้ `text-wrap: pretty` กับย่อหน้า, เปิด `font-feature-settings: "cv02", "cv03", "cv04", "cv11"` และใช้ `tabular-nums` ทุกตัวเลขตาราง/ราคา
4. **Thai-Latin Harmony:** ฟอนต์ไทยไร้หัว (`Anuphan` / `LINE Seed Sans TH` / `IBM Plex Sans Thai`) กำหนด `line-height: 1.7` และ `size-adjust: 105%` เมื่อวางคู่กับอักษรละติน
5. **Surface & Shadow:** ใช้ Multi-layered shadows (ซ้อนเงาอย่างน้อย 3 ชั้น) และใช้ Progressive Backdrop Blur กับ Navigation Bar
6. **3D Performance Budget:** กำหนด `devicePixelRatio = Math.min(window.devicePixelRatio, 2)` และโมเดล 3D ต้องใช้ Draco Compression `< 2MB`

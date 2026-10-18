## 6. Locked DNA Profile (MESURV — Confirmed 2026-09-29)

**Selection Journey:**
- Round 1: 30 styles → 13 favorites (#2,6,7,8,18,19,21,23,26,27,28,29,30)
- Round 2 (Blind): 12 hybrids → 7 favorites (B,C,D,F,G,K,L)
- Round 3 (Layout): L1,L3,L5,L6 (all no-sidebar) + Themes T1+T3
- Final Champions: Beta (L6 Dashboard Tabs) + Gamma (L1 Top Nav) → FUSION selected

**Final Layout DNA (Fusion):**
- **Pattern:** NO fixed left sidebar — top navigation bar only
- **Primary:** Tab-based switching (5 tabs: Knowledge | Calculator | WebGIS | Report | Settings)
- **Tab indicator:** thin 2px underline on active tab (NOT box, NOT pill)
- **Logo zone:** top-left in nav bar
- **Content:** full-width, max-w-6xl, centered, no sidebar
- **Overview section:** hero 2-col split (title+CTA left, 4 metric cards right) + 3-col knowledge card grid below

**Final Theme DNA — DUAL THEME SYSTEM:**

**Theme 1: `fieldbook` (Light — primary daytime)**
- **Mood:** Warm paper, daylight field survey, editorial clean
- **Tokens:**
  - `bg`: `#f3f1eb` | `surface`: `#ffffff` | `surface2`: `#eceae4`
  - `border`: `rgba(20,36,27,0.14)` | `borderStrong`: `rgba(20,36,27,0.5)`
  - `text1`: `#14241b` | `text2`: `#43544a` | `text3`: `#78877d`
  - `accent`: `#15803d` | `accent2`: `#b45309` | `accentText`: `#ffffff`
  - `cardRadius`: `12px` | `btnRadius`: `8px`
  - `shadow`: `0 2px 8px rgba(20,36,27,0.07)` | `backdrop`: `none`
  - `fontHeading`: `'Plus Jakarta Sans', sans-serif` (Weight: `700`)
  - `fontBody`: `'Plus Jakarta Sans', sans-serif`
  - `fontMono`: `'Geist Mono', monospace`

**Theme 2: `terminal` (Dark — nighttime/data processing)**
- **Mood:** Carbon monochrome, dark evergreen, precision instrument
- **Tokens:**
  - `bg`: `#050505` | `surface`: `#111111` | `surface2`: `#0a0a0a`
  - `border`: `#262626` | `borderStrong`: `#3d3d3d`
  - `text1`: `#ffffff` | `text2`: `#a3a3a3` | `text3`: `#525252`
  - `accent`: `#34d399` | `accent2`: `#fcd535` | `accentText`: `#000000`
  - `cardRadius`: `2px` | `btnRadius`: `2px`
  - `shadow`: `none` | `backdrop`: `none`
  - `fontHeading`: `'Plus Jakarta Sans', sans-serif` (Weight: `700`)
  - `fontBody`: `'Plus Jakarta Sans', sans-serif`
  - `fontMono`: `'Geist Mono', monospace`

**Anti-Patterns (What to AVOID):**
- No fixed left sidebar in MESURV
- No frosted glass / backdrop-blur effects (solid surfaces only)
- No gradient backgrounds (flat color only)
- No box/pill-style active tab indicators (use underline 2px)
- No emoji in section headings
- No heavy drop shadows
- No cliché AI palettes (white-orange, indigo-purple gradients)
- No marketing fluff in workspace tools
- No hover bounce/scale animations

**Positive Principles (What TO DO):**
- Controls placed near their content
- Verbs over nouns for button labels
- Monospace (Geist Mono) for all coordinates, numbers, technical codes
- Tabular-nums for metric displays
- Difficulty badges: BEGINNER/CORE/ADVANCED with subtle tinted backgrounds
- RTSD READY badge with pulsing dot
- Two-theme system: user can toggle fieldbook ↔ terminal with `data-theme` on `<html>`
- All tokens via CSS custom properties (`--bg`, `--surface`, `--accent`, etc.)
- Tab switching via vanilla JS toggling `.hidden` class
- Persist theme choice in localStorage

> **Workflow Note:** When user invokes `/medesign` for MESURV project, apply these tokens directly. Do NOT re-run selection rounds. Start from Fusion layout.
> **Reference note:** Lab files at `medesign-tuner/styles/champion-fusion.html` for reference

---

## 8. MeBoard Converged Component DNA & Locked Auto-Blueprints (`FINAL-01` & `FINAL-02` — Confirmed 2026-09-30)

> **🎯 STATUS: AUTO_BLUEPRINT_LOCKED**
> ผู้ใช้ยืนยันล็อกโครงสร้างอย่างเป็นทางการแล้ว: **`FINAL-01`** และ **`FINAL-02`** คือแม่แบบหลักถาวรสำหรับคำสั่ง `/medesign auto` (ไม่ต้องถามเลือกใหม่อีก):
> - **ใช้ `FINAL-01` (Editorial 3:6:3 Three-Column Command):** สำหรับหน้าจอวิเคราะห์เชิงลึกที่ต้องการอ่านสภาวะตลาด (Macro Briefing) + ดูกราฟตรงกลาง + ตรวจสเปกคำสั่งเทรดทางขวาไปพร้อมกัน
> - **ใช้ `FINAL-02` (Asymmetric 8:4 Split + Bento KPI Strip):** สำหรับหน้าจอแดชบอร์ดภาพรวม (Cockpit) ที่ต้องการเน้นการ์ดมาตรวัดสรุปผล (Bento KPI Strip) ด้านบน และแบ่งกราฟใหญ่คู่กล่องสัญญาณด้านล่าง

**ชิ้นส่วนที่ล็อกเข้าชุดสมบูรณ์ (Locked Component Inventory):**
- **Locked Navbar & Macro Ticker (`MB-03`):** Dual-Deck Editorial Masthead + แถบราคาสด Macro Benchmark Tape (`XAU/USD`, `BTC`, `ETH`, `WTI`, `QQQ`, `SET`, `USD/THB`) + แท็บขีดเส้นใต้ `2px` (`MB-06`) ไร้แถบซ้าย + สวิตช์สลับธีมสด
- **Locked Card & Box Anatomy (`MB-03 + MB-04 + MB-05`):**
  - ขอบคม `1px solid` + **แถบสีคาดด้านบนหนา `3px solid` (`MB-03`)** บนการ์ดหลักทุกใบ + เงา Tactile Offset คมบาง `2px` (`MB-04`)
  - **เส้นปะฉีกตั๋ว (`border-dashed` จาก `MB-04`)** คั่นระหว่างโซนข้อมูลด้านบนกับโซนคำสั่ง/สรุปด้านล่างในการ์ดตั๋ว
  - **Floating Translucent HUD Pod (`MB-05`)** (`backdrop-filter: blur(16px)`) ลอยทับบนมุมกราฟเพื่อแสดง `Regime`, `CONF/VOL`, และ `Tactical Directive`
- **Locked Execution Setup Box (`MB-07 + MB-08`):**
  - ตัวเลขราคาขนาดใหญ่ `32px–42px` (`Geist Mono tabular-nums` จาก `MB-08`) + **หลอดวัดระยะ `SL ──●────── TP` (`MB-08`)**
  - **ตารางคำสั่งเทรด 4 ช่อง (`MB-07`):** `Optimal Entry`, `Take Profit (TP %)`, `Stop Loss (SL %)`, และ `R:R · 1% Bankroll Risk Size`
  - **เช็กลิสต์โครงสร้าง `SMC × ICT` (`MB-07`):** `BOS`, `CHoCH`, `FVG CE 50%`, `Dealing Range EQM 50%`
  - **หลอดวัดแรงซื้อขาย `L2 Order Book Imbalance` (`MB-07`):** แถบแนวนอนแสดงสัดส่วน `68% Bid / 32% Ask` พร้อมปุ่ม `📤 Copy TG Signal`
- **Locked Chart & Data Table (`MB-06`):**
  - กราฟแท่งเทียน SVG พร้อมโซนแรเงา `4H FVG`, `Order Block`, เส้นประ `TP / Entry / SL` และปุ่มสลับ Timeframe `15m | 1H | 4H | 1D`
  - ตารางสแกนสัญญาณ (Big Five + Altcoin Volatility Radar) ที่มีปุ่มกรอง `ALL | BUY | SELL | STRONG | SQUEEZE` + จุด `1H ● 4H ● 1D ●` วางคู่กับตารางบันทึกผล `WIN / LOSS / STALE` (`56.8% Win Rate · +1.34R · Paper Bot +6.4R MTD`)
- **Locked Dual-Theme System (`MB-03 × MB-06 × MB-08 × MB-09`):**
  1. **Theme 1 (`editorial-paper`):** พื้นหลังกระดาษครีมอุ่น `#f6f2e9` (`#efeadd` masthead), การ์ดขาวคม `#ffffff`, ผิวทำงานแอ็กทีฟ `--surface-active: #eef7f1`, สีเน้นเขียว Forest `#0f6b32` (`6.66:1` บน `#ffffff`, `5.52:1` บน masthead `#efeadd`) & ทอง Ochre `#92400e` (`7.12:1` AAA บน `#ffffff`, `5.90:1` บน `#efeadd`), ฟอนต์หัวข้อ `Fraunces` Serif + `Plus Jakarta Sans` + `Geist Mono`
  2. **Theme 2 (`velvet-obsidian`):** พื้นหลังดำกำมะหยี่ `#09090f` (`#050505`) พร้อมแสง Ambient Radial จางๆ (ทอง `#f2b33d`/คอปเปอร์ `#cc785c` + คราม `#6366f1`), การ์ด `#11131c`, ผิวทำงานแอ็กทีฟ `--surface-active: #122422`, สีเน้นเขียว `#34d399` & ทอง `#f2b33d`
- **4 Finalist Prototypes ในคลังอ้างอิง:**
  - `FINAL-01` (`/final/1`): **Editorial 3:6:3 Three-Column Command** *(Auto-Default Primary A)*
  - `FINAL-02` (`/final/2`): **Asymmetric 8:4 Split + Bento KPI Strip** *(Auto-Default Primary B)*
  - `FINAL-03` (`/final/3`): **Master–Detail 45:55 Synchronized Scanner** *(Reference)*
  - `FINAL-04` (`/final/4`): **Fusion Underline-Tab & Executive Stream** *(Reference)*

---


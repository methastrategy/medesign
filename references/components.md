## 🎨 Interactive Modal Archetypes (เมื่อใช้ `/medesign` ปกติ)

เรียก `ask_question` ทันทีด้วยตัวเลือกต่อไปนี้ (หรือเปิด Comparison Lab บน Localhost):

- 📄 **My DNA — Warm Editorial & Glass** *(Calibrated Default)*
  - Near-White `#f7f5f2` + Terracotta `#cc785c` + Fraunces Serif + Frosted Glass + Full Pill
- ⚡ **Electric Dark Upgraded**
  - Deep Ink `#090909` + Indigo/Violet Accent + Frosted Glass Sidebar
- 🏛️ **Warm Dark Editorial**
  - Dark Navy `#0d1520` + Terracotta `#cc785c` + Fraunces Serif + Editorial Contrast
- 💎 **Cyber Precision (Vercel × Linear)**
  - Pure Ink `#0a0a0a` + Hairline `1px` Borders + Stark Monochrome + Geist Sans
- 🟢 **Spotify Pulse**
  - Pitch Charcoal `#121212` + Neon Green `#1ed760` + Solid Surface + Pill CTA
- 🏎️ **BMW Precision Luxury**
  - Pure Black `#050505` + Metallic Inset Glass + Precision Blue `#0066b1` + Razor Type
- 📓 **Notion Warm Modern**
  - Clean White `#ffffff` + Solid Warm Gray Sidebar `#f9f9f8` + Zero Blur + Crisp Borders
- 🧠 **Claude Intelligent**
  - Warm Paper `#fbfaf8` + Soft Terracotta `#a15e41` + Literary Serif + Human Approachability
- ✦ **Best Designs on X (Linear Dark Craft)** *(New 2026 Trend)*
  - Deep Void `#09090b` + 1px Border Glow (`rgba(255,255,255,0.08)`) + Instrument Serif Italic + Geist Sans/Mono + Indigo `#6366f1` / Violet `#8b5cf6`

---

## 📦 Component Blueprint Library

### Hero Section
```css
/* Headline: Serif Display Italic */
font-family: 'Fraunces', 'Playfair Display', serif;
font-size: clamp(2.5rem, 6vw, 5rem);
font-weight: 600;
letter-spacing: -0.025em;
font-style: italic; /* on display words */

/* Eyebrow tag above headline */
font-family: 'Geist Mono', monospace;
font-size: 0.75rem;
letter-spacing: 0.1em;
text-transform: uppercase;

/* CTA Primary */
border-radius: 9999px;
background: #cc785c;
color: #fff;
height: 2.75rem; /* h-11 */
padding: 0 2rem;
transition: opacity 150ms ease;
```

### Bento Grid
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: auto;
gap: 1rem;
/* Feature card spans 2 cols */
.feature-card { grid-column: span 2; }

/* Card Base: Frosted Glass */
background: rgba(255, 255, 255, 0.6);
backdrop-filter: blur(16px);
border: 1px solid rgba(204, 120, 92, 0.15);
border-radius: 16px;
/* Hover: border warm glow */
transition: border-color 150ms ease;
&:hover { border-color: rgba(204, 120, 92, 0.4); }
```

### Navigation (Sticky Glassmorphic)
```css
position: sticky; top: 0; z-index: 50;
backdrop-filter: blur(24px) saturate(160%);
background: rgba(250, 250, 250, 0.75);
border-bottom: 1px solid rgba(0, 0, 0, 0.05);
```

### Data Metric Card
```css
/* Value */
font-family: 'Geist Mono', monospace;
font-size: 2.25rem;
font-weight: 600;
/* Label */
font-family: 'Plus Jakarta Sans', sans-serif;
font-size: 0.7rem;
letter-spacing: 0.08em;
text-transform: uppercase;
color: #9ca3af;
/* Status Pill */
border-radius: 9999px;
border: 1px solid currentColor;
font-size: 0.688rem;
font-family: 'Geist Mono';
```

### Command Palette (`⌘K` Modal)
```css
/* Container */
background: rgba(18, 18, 23, 0.9);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 14px;
box-shadow: 0 24px 64px -12px rgba(0, 0, 0, 0.7);

/* Search Input */
font-family: 'Geist', sans-serif;
color: #f4f4f5;
border-bottom: 1px solid rgba(255, 255, 255, 0.08);

/* Active Row */
background: rgba(99, 102, 241, 0.12);
border: 1px solid rgba(99, 102, 241, 0.25);
border-radius: 8px;
color: #ffffff;
```

### Apple Bento Box 2.0 (High-Density with Mini-Metrics)
```css
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 1rem;

/* Bento Tile Base */
background: #111115;
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 16px;
padding: 1.25rem;
position: relative;
overflow: hidden;

/* Border Glow Mask */
&::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.02) 40%, rgba(99,102,241,0.2));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

### Specular Top Rim Light (Crafted Button / Card Highlight)
```css
/* ใส่บนปุ่มหรือการ์ดเพื่อสร้างมิติสะท้อนแสงขอบบน */
position: relative;
&::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 8px;
  right: 8px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.65), transparent);
  border-radius: 9999px;
  pointer-events: none;
}
```

---

## 🧠 5 UI Ergonomics Blueprints (Cognitive Load Reduction)

เกณฑ์การจัดวางและออกแบบส่วนติดต่อผู้ใช้เพื่อลดภาระทางสมอง (Cognitive Friction) ของผู้ใช้:

### 1. Primary Action Dominance (ปุ่มหลักเด่นเพียง 1 เดียว)
ใน 1 มุมมองหรือ 1 การ์ด ต้องมี Primary CTA เพียง 1 ปุ่มเท่านั้นเพื่อชี้ทิศทางชัดเจน (Hick's Law):
```tsx
{/* Primary Action vs Secondary Outline */}
<div className="flex items-center gap-3">
  <button className="h-10 px-5 rounded-full bg-primary text-primary-foreground font-medium shadow-sm hover:opacity-90 active:scale-[0.98] transition">
    Confirm Coordinates
  </button>
  <button className="h-10 px-4 rounded-full border border-border bg-transparent text-foreground/80 hover:bg-muted/50 transition">
    Cancel
  </button>
</div>
```

### 2. Whitespace & Gestalt Grouping (ระยะหายใจและการจัดกลุ่ม)
ใช้ Negative Space และระยะห่างที่ได้สัดส่วนในการแยกกลุ่มข้อมูล:
- **Container Padding:** ขั้นต่ำ `p-4` (16px) ถึง `p-6` (24px) รอบการ์ด
- **Intra-group Gap:** ข้อมูลหรืออินพุตที่เกี่ยวข้องกันใช้ `space-y-2` หรือ `gap-2` (8px)
- **Inter-group Spacing:** การแบ่งกลุ่มข้อมูลต่างประเภทใช้ `space-y-6` หรือ `gap-6` (24px) พร้อมเส้นแบ่งบาง 1px (`border-t border-border/40`)

### 3. Progressive Disclosure Overflow (ปุ่มเยอะซ่อนในเมนูเพิ่มเติม)
จำกัด Action ปุ่มลอยบนหน้าจอไม่เกิน 2–3 ปุ่ม ส่วนที่เหลือ (ปุ่มที่ใช้น้อย หรือ Destructive Action) ให้รวมไว้ใน Overflow Menu (`...`):
```tsx
<div className="flex items-center gap-2">
  <Button variant="default">Save Traverse</Button>
  <Button variant="outline">Preview Map</Button>
  
  {/* Overflow for rare / secondary actions */}
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Export GeoJSON</DropdownMenuItem>
      <DropdownMenuItem>Duplicate Layer</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-destructive">Delete Survey</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
```

### 4. Typographic Scanability Hierarchy (ลำดับสายตาตัวอักษร)
ห้ามใช้ข้อความขนาดยาวเป็นก้อนสม่ำเสมอ (Wall of Text) บังคับใช้ Type Scale นำสายตาตาม F-Shape:
```tsx
<div className="space-y-1.5">
  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Station Alpha</span>
  <h2 className="text-xl font-bold tracking-tight text-foreground">Traverse Computation Matrix</h2>
  <p className="text-sm text-foreground/80 leading-relaxed max-w-prose">
    Calculated relative closure error is within the secondary urban boundary survey threshold (1:10,000).
  </p>
</div>
```

### 5. Form Chunking & Multi-Step Stepper (ฟอร์มยาวแบ่งเป็นก้อน)
เมื่อฟอร์มมี Input ตั้งแต่ $\ge 6$ รายการขึ้นไป ให้จัดกลุ่มเป็นการ์ดย่อย (Semantic Fieldsets) หรือแบ่งเป็น Multi-step Stepper:
```tsx
{/* Multi-step progress header */}
<div className="mb-6 space-y-2">
  <div className="flex justify-between text-xs font-medium text-muted-foreground">
    <span>Step 1: Instrument Setup</span>
    <span>Step 1 of 3</span>
  </div>
  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
    <div className="h-full bg-primary rounded-full w-1/3 transition-all duration-300" />
  </div>
</div>
```


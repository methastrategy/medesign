# ThreeUI Spatial 3D & Procedural WebGL Engine Guide

องค์ความรู้ สถาปัตยกรรมระดับ Production และคู่มือเทคนิคการสร้างหน้าเว็บ 3D / Spatial UI แบบ Zero-Heavy-Asset ที่ถอดรหัสจาก **ThreeUI (Meng To / DesignCode)** ออกแบบมาสำหรับการทำงานร่วมกับ AI Coding Agents โดยเฉพาะ

---

## 1. ปรัชญาและโครงสร้าง Dual-Layer Architecture

ปัญหาหลักของการนำ Three.js / WebGL มาใส่ในเว็บแอปพลิเคชันยุคใหม่ (React 19 / Next.js) คือ:
- **Virtual DOM Conflict**: การ re-render ของ React ทำลาย WebGL context หรือเกิด Double-Mounting ใน StrictMode
- **Heavy Asset Penalty**: โมเดล 3D (.gltf/.glb) มีขนาดใหญ่ (10-50MB) โหลดช้า และกินหน่วยความจำ GPU มหาศาล
- **AI Coding Fragility**: เมื่อ AI พยายามเขียน Canvas, Shaders, และ React state ปนกัน มักเกิดข้อผิดพลาดด้าน Memory Leak และ Event Listeners

### ThreeUI Architectural Solution:
ThreeUI แก้ปัญหานี้ด้วย **Dual-Layer Sandbox Frame**:
1. **Outer Layer (React Host Component)**: ตัวครอบเบาๆ เช่น `LandingPageFrame.tsx` ทำหน้าที่รับ Props จากผู้ใช้ (Typography, Colors, Camera tilt, Shader sliders) และเรนเดอร์ `<iframe>` แบบ Sandboxed
2. **Inner Layer (Standalone Authored Document)**: หน้า HTML อิสระ (เช่น `kage.html`, `sylva.html`) ที่บรรจุ Three.js runtime, Procedural Geometry, และ Event Listeners ของตัวเองแบบ Isolated 100%
3. **The Communication Bridge**: React Host จะไม่ยุ่งกับโค้ด JavaScript ข้างใน แต่จะฉีด Dynamic CSS Tokens (`:root { --ink: ... }`) หรือส่งข้อความผ่าน postMessage เข้าไปยัง iframe head ทำให้เปลี่ยนสี, ปรับฟอนต์, และจูนสไตล์ได้แบบ Real-time โดยไม่ทำลาย WebGL context

---

## 2. Agentic Prompt Contract Standard (มาตรฐานคำสั่ง AI Agent)

เมื่อต้องการส่งคำสั่งให้ AI Coding Agent (Cursor, Claude Code, Antigravity) นำ 3D Component หรือ Landing Page ไปติดตั้ง ให้ใช้รูปแบบสัญญาที่มีความแม่นยำสูง (High-Fidelity Prompt Contract):

```markdown
# Integrate <[ComponentName] /> from ThreeUI using its exact source

Component: `[ComponentName]`
Runtime: Full HTML + DOM/CSS + Three.js
Source revision: `SHA-256 [Commit/Document Hash]`

## Current configured usage
```tsx
import { [ComponentName] } from "@/components/threeui/[ComponentName]";

export function Scene() {
  return (
    <div className="shader-frame">
      <[ComponentName]
        primaryColor="#e0231c"
        headingFont="onest"
        bodyFont="onest"
      />
    </div>
  );
}
```

## Exact implementation source
Canonical HTML: [slug.html](https://threeui.com/landing-pages/[slug].html)
Bundle URL: https://threeui.com/source-code/[slug].json

Required registered files:
- `LandingPages.tsx` — component · SHA-256 [hash]
- `LandingPageFrame.tsx` — frame-component · SHA-256 [hash]
- `pageTypography.ts` — controls-source · SHA-256 [hash]
- `public/landing-pages/[slug].html` — canonical-source · SHA-256 [hash]

## Implementation requirements
- Preserve the authored structure, styling, shaders, motion, and asset paths described by the source.
- Do not recreate from preview or screenshot; fetch the registered source bundle.
- Maintain battery & GPU hygiene (IntersectionObserver throttling).
```

---

## 3. สถาปัตยกรรม LandingPageFrame & Dynamic CSS Retoner

### 3.1 ตัวอย่างโครงสร้าง Frame Host (`LandingPageFrame.tsx`)
```tsx
import { useEffect, useRef, useState, type CSSProperties } from "react";

export type LandingPageFrameProps = {
  sourceUrl: string;
  srcDoc?: string;
  title: string;
  className?: string;
  style?: CSSProperties;
  backgroundCanvasSelector?: string; // ถ้ากำหนด จะเปิดโหมด Scene-Only Background
  customization?: {
    css: string;
    fonts: string[];
    filter?: string;
  };
};

export function LandingPageFrame({
  sourceUrl,
  srcDoc,
  title,
  backgroundCanvasSelector,
  customization,
  className = "",
  style,
}: LandingPageFrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  // เมื่อ iframe โหลดเสร็จ หรือค่า customization เปลี่ยน ให้ฉีด CSS เข้า head โดยตรง
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !frame.contentDocument) return;

    const doc = frame.contentDocument;
    let styleTag = doc.getElementById("threeui-dynamic-overrides");
    if (!styleTag) {
      styleTag = doc.createElement("style");
      styleTag.id = "threeui-dynamic-overrides";
      doc.head.appendChild(styleTag);
    }

    let css = customization?.css ?? "";
    // หากเป็นโหมด Background ให้ซ่อน UI elements ทั้งหมดยกเว้น Canvas
    if (backgroundCanvasSelector) {
      css += `
        .page, header, footer, nav, .hero-content { display: none !important; }
        body { background: transparent !important; overflow: hidden !important; }
        ${backgroundCanvasSelector} { position: fixed !important; inset: 0 !important; width: 100vw !important; height: 100vh !important; }
      `;
    }
    styleTag.textContent = css;
  }, [customization, backgroundCanvasSelector]);

  return (
    <iframe
      ref={frameRef}
      title={title}
      src={srcDoc ? undefined : sourceUrl}
      srcDoc={srcDoc}
      className={`threeui-frame ${className}`}
      style={{ width: "100%", height: "100%", border: 0, ...style }}
      loading="lazy"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
```

---

## 4. Zero-Heavy-Asset Procedural 3D & 2.5D Parallax System

ThreeUI หลีกเลี่ยงไฟล์ 3D หนักๆ โดยใช้เทคนิคผสมผสานระหว่างคณิตศาสตร์และรูปภาพแบนด์วิธต่ำ:

1. **Procedural Meshes**:
   - ภูมิประเทศ ท้องฟ้า และเมฆ สร้างจาก `THREE.PlaneGeometry` หรือ `THREE.SphereGeometry` แล้วบิดรูปทรงด้วย Simplex / Perlin Noise บน Vertex Shader
2. **2.5D WebP Layered Depth Sprites**:
   - องค์ประกอบฉากหน้า (ต้นสน, ซุ้มประตู, หิน, กิ่งซากุระ, โคมไฟ) บันทึกเป็นรูป WebP พร้อม Alpha Channel แยกชิ้น
   - นำมาวางบน `THREE.Mesh(new THREE.PlaneGeometry(...), material)` จัดเรียงความลึกบนแกน Z พร้อมเปิด `material.transparent = true; material.depthWrite = false;`
   - ผลลัพธ์: ได้ความสมจริงระดับงานศิลปะ แต่ขนาดรวมทั้งหน้าเว็บไม่เกิน 2-3 MB

---

## 5. มาตรฐาน GPU & Battery Hygiene (กฎเหล็ก Production)

เมื่อนำ Three.js หรือ WebGL มาใช้ ต้องมี 3 กฎเหล็กเสมอ:
1. **Intersection Throttling**:
   ```javascript
   const intersection = new IntersectionObserver(([entry]) => {
     visible = entry?.isIntersecting ?? true;
     if (visible && !frameId) frameId = requestAnimationFrame(render);
     if (!visible && frameId) { cancelAnimationFrame(frameId); frameId = 0; }
   });
   intersection.observe(container);
   ```
2. **DevicePixelRatio Clamping**:
   - ห้ามใช้ `window.devicePixelRatio` ดิบๆ บนจอ 4K/Retina
   - กำหนด: `const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);`
3. **Linear Color Space & Tone Mapping**:
   - `renderer.toneMapping = THREE.ACESFilmicToneMapping;`
   - `renderer.toneMappingExposure = 1.0;`
   - `renderer.outputColorSpace = THREE.SRGBColorSpace;`
4. **Uncompressed VRAM Budget Gate (≤ 32MB) & Modern Compression**:
   - ปัญหาของ Draco คือไฟล์ดาวน์โหลดเล็กแต่เมื่อคลายบีบอัดบน GPU จะขยายร่างเป็น 60MB–140MB บน VRAM จนทำให้ Safari บน iOS สั่ง Kill Tab
   - **กฎเหล็กใหม่:** คุมหน่วยความจำ **Uncompressed VRAM Footprint รวมไม่เกิน 32MB**
   - บังคับใช้ **Meshopt Compression** (คลายบีบอัดเร็วกว่า Draco 5 เท่า ขนาด WASM Decoder เพียง 20KB ไม่ทำให้ Main-Thread ค้าง)
   - พื้นผิว Texture บังคับใช้ **KTX2 (Basis Universal UASTC/ETC1S)** เพราะถูกส่งตรงไปยัง VRAM ในสถานะบีบอัดได้ทันทีโดยไม่ต้องแตกไฟล์เป็น Bitmap ขนาดใหญ่
5. **Clean Lifecycle Disposal & Context Leak Prevention**:
   - เมื่อ Component ถูก Unmount ต้องสั่ง Dispose ทรัพยากร GPU ทั้งหมดเพื่อป้องกัน Memory Leaks:
   ```javascript
   geometry?.dispose();
   material?.dispose();
   texture?.dispose();
   renderer?.dispose();
   renderer?.forceContextLoss();
   ```
6. **DOM Overlay & Canvas Pointer-Events Layering**:
   - Canvas ฉากหลัง: `position: fixed; inset: 0; z-index: 0; pointer-events: auto;`
   - UI Container ซ้อนทับ: `position: relative; z-index: 10; pointer-events: none;`
   - ปุ่ม/ลิงก์/ฟอร์มที่กดได้: `pointer-events: auto;` (เพื่อให้ Pointer Event ของการหมุน Orbit ทะลุช่องว่างระหว่างปุ่มลงสู่ Canvas ได้ราบรื่น)
7. **On-Demand WebGL Render Loop (0W GPU Idle Power)**:
   - สำหรับฉากที่ไม่ต้องการ Render คลื่นน้ำหรือแสงกระพริบตลอดเวลา บังคับใช้ `frameloop="demand"`
   - ตัดลูป `requestAnimationFrame` ทันทีเมื่อความเร็วการหมุนหรือซูม $\lvert v \rvert < 0.0001$ เพื่อให้ GPU ใช้พลังงานเป็น **0 วัตต์** ประหยัดแบตเตอรี่สูงสุด

---

## 6. Curated Recipe Vault (สูตรแม่แบบยอดนิยม)

### 1. Kage (Kyoto Night Temple Walk)
- **Concept**: วัดบนภูเขาเกียวโตยามค่ำคืน เปลวไฟโคมหิน และดวงจันทร์สีชาด
- **Colors**: Ink Black `#05070a`, Pale Sage Bone `#dfe7e0`, Vermilion `#e0231c`, Gold `#c9a24a`
- **Fog**: `scene.fog = new THREE.FogExp2(0x050a0e, 0.0168);`
- **Lighting**: PCF Soft Shadows + Multi-point Lantern flickering lights
- **Typography**: Onest font (Weight 300 / 400), tracking `-0.012em`

### 2. Kibori (Japanese Wooden Sculpture)
- **Concept**: งานช่างไม้แกะสลัก ริ้วเนื้อไม้ธรรมชาติ แสงและเงาที่อบอุ่น
- **Colors**: Deep Cedar `#1a1512`, Hinoki `#d4b28c`, Charcoal `#2c2825`
- **Material**: Procedural wood grain bump shaders with subtle ambient occlusion

### 3. Meng To Sketchbook (Botanical Watercolor Parallax)
- **Concept**: สมุดบันทึกพฤกษศาสตร์ กระดาษวาชิ และภาพสีน้ำแยกเลเยอร์
- **Colors**: Paper Ivory `#fcfbf7`, Sumi Ink `#1b1b19`, Botanical Green `#405943`
- **Technique**: Multi-layer 2D canvas blending with drifting procedural petal particles

### 4. Sylva / Inner Green (Living Forest World)
- **Concept**: โลกธรรมชาติป่าดิบ การฟื้นฟูระบบนิเวศ
- **Colors**: Forest Moss `#383b34`, Pale Card `#f2f3ef`, Deep Earth `#23261f`
- **Unit System**: `calc(100vw / 1600)` เพื่อให้สัดส่วนของฉากสมมาตรเป๊ะทุกความกว้างจอ

### 5. Sable / Ascii Vortex
- **Concept**: อุโมงค์ตัวอักษรและพายุดูดข้อมูล (AI Agent Interface)
- **Colors**: Pitch Black `#000000`, Monospace White `#ffffff`, Terminal Green
- **Technique**: Raymarched glyph sampling, pointer suction well, dynamic font dissolution

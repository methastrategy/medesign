# 120fps Compositor-Only Threading & Web Smoothness Guide

คู่มือวิศวกรรมความลื่นไหลระดับ 60–120fps สำหรับเว็บยุคใหม่ ครอบคลุมสถาปัตยกรรม Compositor Pipeline, Scroll Physics (Lenis vs Pure CSS), Offscreen Render Culling (`content-visibility: auto`), และการป้องกัน Layout Thrashing ขั้นเด็ดขาด

---

## 1. ⚡ The Compositor Thread Invariant (กฎเหล็ก 0ms Layout Cost)

### A. Rendering Pipeline Architecture
เบราว์เซอร์สมัยใหม่แยกการทำงานเป็น 2 Thread หลัก:
1. **Main Thread (JS / DOM / Style / Layout / Paint):** รับผิดชอบตรรกะ JavaScript, Event handling, และการคำนวณตำแหน่งเรขาคณิต (Reflow/Layout) หากเธรดนี้ติดภาระงาน (Long Task > 50ms) การแสดงผลจะสะดุดทันที
2. **Compositor Thread (GPU Rasterization & Composition):** รับผิดชอบการนำเลเยอร์ภาพที่วาดเสร็จแล้วมาจัดวางบนจอผ่าน GPU ทำงานขนานกับ Main Thread ได้อย่างอิสระที่ **60fps / 120fps นิ่งสนิท**

```
❌ BAD (Triggers Layout + Paint):
   Changing top, left, width, height, margin, padding
   ┌─────────────┐    ┌────────────┐    ┌───────────┐    ┌──────────────┐
   │ JavaScript  │ ─> │   Layout   │ ─> │   Paint   │ ─> │  Composite   │ (Jank Risk: 100%)
   └─────────────┘    └────────────┘    └───────────┘    └──────────────┘

✅ COMPOSITOR-ONLY (Bypasses Layout + Paint):
   Changing transform (translate3d, scale, rotate) or opacity
   ┌─────────────┐                                       ┌──────────────┐
   │ JavaScript  │ ────────────────────────────────────> │  Composite   │ (120fps Locked)
   └─────────────┘                                       └──────────────┘
```

### B. Compositor Safe Properties
อนิเมชัน การเลื่อน หรือ Micro-interaction ทั้งหมด **ต้องใช้เฉพาะ 2 คุณสมบัตินี้เท่านั้น**:
1. `transform` (บังคับใช้ `translate3d(x, y, 0)` หรือ CSS Transform functions สมัยใหม่ เช่น `translate`, `scale`, `rotate`)
2. `opacity`

> [!CAUTION]
> **ห้าม Animate ด้วย Properties ต่อไปนี้เด็ดขาด:** `width`, `height`, `top`, `bottom`, `left`, `right`, `margin`, `padding`, `border-width`, `font-size` เพราะจะบังคับให้เกิด Full Reflow ทั่วทั้ง DOM Tree

### C. กฎการใช้ `will-change` อย่างปลอดภัย
- **ปัญหา:** การใส่ `will-change: transform` ทิ้งไว้ในคลาสปกติทุกชิ้นจะบังคับให้ GPU จอง VRAM Layer แยก ทำให้กินหน่วยความจำมหาศาลและเว็บช้าลง
- **แนวทางปฏิบัติ:** ใส่เฉพาะเมื่อใกล้จะเกิดการขยับเท่านั้น เช่น ในสถานะ `:hover` หรือเพิ่มผ่าน JS ทันทีที่มีการทัช/ลาก แล้วถอดออกเมื่อจบอนิเมชัน:
```css
/* ✅ ใส่ will-change เฉพาะขณะ Hover */
.interactive-card {
  transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1);
}
.interactive-card:hover {
  will-change: transform;
  transform: translateY(-4px) scale(1.01);
}
```

---

## 2. 🌀 Scroll Physics & Momentum Engineering

### A. Scroll Architecture Matrix (เลือกใช้งานให้ถูกบริบท)

| Architecture | เหมาะสำหรับ | ข้อดี | ข้อจำกัด / ข้อควรระวัง |
| :--- | :--- | :--- | :--- |
| **1. CSS Scroll-Driven Animations** | Hero reveal, Reading progress, Card stacks, Bento grid entry | **0KB JS**, รันบน Compositor Thread 100% แม้ Main Thread จะบล็อก | ต้องมี `@supports (animation-timeline: view())` fallback |
| **2. Lenis (Virtual Smooth Scroll)** | Agency Portfolio, Showcase, Luxury Landing Page | สัมผัส Inertial Scroll นุ่มนวล ควบคุม Lerp ได้อิสระ | ไม่ควรใช้กับ Dashboard หนักๆ หรือตารางข้อมูล GIS |
| **3. Native Browser Momentum** | High-density Web Apps, GIS Dashboard, Admin Portals | ประสิทธิภาพสูงสุด เข้าถึงง่าย ทำงานตาม OS ดั้งเดิม | การหมุนเมาส์ Wheel บน Windows อาจรู้สึกกระตุกเป็นสเต็ป |

### B. Lenis Implementation Blueprint (React / Next.js)
```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // ปิดการใช้งานหากผู้ใช้เปิด prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential Ease Out
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      autoResize: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

### C. Scroll Chaining Prevention & Gutter Stabilization
```css
/* ป้องกันหน้าหลักข้างหลังเลื่อนตามเมื่อเลื่อน Drawer หรือ Modal จนสุด */
.modal-body,
.drawer-content {
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

/* ป้องกันหน้าจอกระตุก 15px เวลาเปิด Modal แล้ว Scrollbar หายไป */
html {
  scrollbar-gutter: stable;
}
```

---

## 3. 🚀 Off-Screen Render Culling (`content-visibility: auto`)

สำหรับหน้าเว็บที่มีความยาว (Long Page) หรือมีหลาย Section ให้เปิดใช้ `content-visibility: auto`:
```css
/* ทุก Section ที่อยู่นอกสายตาแรก (Below the fold) */
.section-deferred {
  content-visibility: auto;
  contain-intrinsic-size: auto 650px; /* ประมาณความสูงเพื่อรักษาระยะ Scrollbar ให้แม่นยำ */
}
```
**ผลลัพธ์เชิงประจักษ์:**
- ลดเวลา Initial Rendering Time ลง 50–70%
- ลดการกิน CPU ในขณะเลื่อนหน้าจออย่างเห็นได้ชัด
- เบราว์เซอร์จะคำนวณ Layout และ Paint เฉพาะเมื่อ Section เลื่อนเข้ามาใกล้ระยะมองเห็น 1000px

---

## 4. 🛑 Anti-Layout-Thrashing Patterns (ป้องกันการคำนวณ DOM วนซ้ำ)

Layout Thrashing (Forced Synchronous Layout) เกิดขึ้นเมื่อโค้ด JavaScript อ่านค่าเรขาคณิต (Read) สลับกับการกำหนดสไตล์ (Write) ในเฟรมเดียวกัน

### ตารางคุณสมบัติที่เป็นตัวกระตุ้น Reflow (Avoid reading in loops):
`offsetWidth`, `offsetHeight`, `clientWidth`, `clientHeight`, `scrollWidth`, `scrollHeight`, `scrollTop`, `scrollLeft`, `getBoundingClientRect()`, `getComputedStyle()`

### ตัวอย่างการ Refactor แก้ปัญหา:
```javascript
// ❌ ผิด: อ่านและเขียนสลับกันในลูป ทำให้เกิด Reflow ซ้ำตามจำนวนการ์ด
cards.forEach(card => {
  const currentHeight = card.offsetHeight; // BROWSER FORCED REFLOW!
  card.style.height = `${currentHeight + 20}px`;
});

// ✅ ถูก: แยกเป็น Phase อ่านทั้งหมดก่อน แล้วค่อยเขียนพร้อมกัน (Batching)
const heights = cards.map(card => card.offsetHeight); // Single Read Phase
cards.forEach((card, index) => {
  card.style.height = `${heights[index] + 20}px`;     // Single Write Phase
});
```

---

## 5. 🎯 Checklist ความสมูทก่อนส่งมอบงาน (Smoothness Quality Gate)
- [ ] แอนิเมชันและ Transition ทั้งหมดใช้เฉพาะ `transform` และ `opacity`
- [ ] ไม่มี CSS Transition บน `height: auto` แบบดั้งเดิม (ให้ใช้ `interpolate-size: allow-keywords;` หรือ Grid Fr trick)
- [ ] เพิ่ม `content-visibility: auto` และ `contain-intrinsic-size` บน Section ที่อยู่ใต้ Fold
- [ ] ติดตั้ง `scrollbar-gutter: stable;` ที่ `:root`
- [ ] Modal และ Drawer มี `overscroll-behavior: contain;`
- [ ] รัน Performance Trace บน DevTools พบค่า Long Tasks (>50ms) เป็น 0 ในช่วงการ Scroll

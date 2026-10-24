# Native View Transitions API Blueprint (120fps Seamless Navigation)

คู่มือการนำ **Native View Transitions API** มาใช้งานเพื่อเปลี่ยนหน้าเว็บ (Page Transition) หรือสลับการจัดวาง Layout (Card Morphing / Filter Switch) ให้มีความรู้สึกลื่นไหล ไร้รอยต่อ เสมือนแอปพลิเคชัน Native บน iOS/macOS โดยทำงานที่ระดับ Compositor Thread

---

## 1. ⚡ ทำไมต้อง View Transitions API?

| ปัญหายุคเดิม (Framer Motion / JS Layout) | ข้อได้เปรียบของ Native View Transitions API |
| :--- | :--- |
| ต้องคำนวณ DOM Rect ด้วย JavaScript (`getBoundingClientRect`) ส่งผลต่อ Main Thread | **เบราว์เซอร์คำนวณ GPU Crossfade & Transform ให้เอง** โดยอัตโนมัติบน Compositor |
| Bundle size บวม 30–80KB จาก Animation Libraries | **0KB JS Dependency** (ใช้ Native Browser API 100%) |
| เวลาเปลี่ยนหน้าแท้จริง (MPA) หน้าจอจะกระพริบขาว (Flash of Unstyled Content) | หน้าจอเก่าจะคงอยู่จนกว่าหน้าใหม่จะเรนเดอร์เสร็จ แล้ว Crossfade เนียนสนิท |

---

## 2. 🧩 The Core Primitives

```javascript
// ตรวจสอบว่าเบราว์เซอร์รองรับหรือไม่
if (!document.startViewTransition) {
  updateDOM(); // Fallback ปกติ
} else {
  // สั่งบันทึก Snapshot เก่า -> อัปเดต DOM -> Animate ไปหา Snapshot ใหม่
  const transition = document.startViewTransition(() => {
    updateDOM();
  });
}
```

### การตั้งชื่อ `view-transition-name` ให้คู่ Element ที่จะ Morph เข้าหากัน:
```css
/* การ์ดสินค้าในหน้ารวม */
.product-card-thumb {
  view-transition-name: product-hero-image;
}

/* ภาพขนาดใหญ่ในหน้ารายละเอียด */
.product-detail-hero {
  view-transition-name: product-hero-image;
}
```
**ผลลัพธ์:** เบราว์เซอร์จะขยายภาพจากขนาดเล็กในการ์ด ไปเป็นภาพใหญ่ในหน้ารายละเอียดให้อัตโนมัติด้วยความเร็ว 120fps โดยไม่ต้องคำนวณพิกัดใดๆ!

---

## 3. 🚀 Implementation Blueprint ใน React & Next.js

### A. Next.js App Router (Single-Page / Client Transition)
ใน Next.js 14/15 หรือ React 19 เราสามารถหุ้ม Navigation ด้วย View Transition:
```tsx
"use client";
import { useRouter } from "next/navigation";

export function useViewTransitionRouter() {
  const router = useRouter();

  const push = (href: string) => {
    if (!document.startViewTransition) {
      router.push(href);
      return;
    }

    document.startViewTransition(() => {
      router.push(href);
    });
  };

  return { push };
}
```

### B. Customizing CSS Transition Timing (จับคู่กับ `medesign` Motion Tokens)
```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 240ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); /* medesign soft-settle */
}

/* เคารพผู้ใช้ที่เปิดโหมดลดการเคลื่อนไหว */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

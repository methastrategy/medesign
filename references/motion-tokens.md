# Motion Design Tokens (Takayu Studio Framework)

ระบบตัวแปร Motion & Animation ระดับ Production ดัดแปลงจาก Takayu Studio Motion Reference (782 Demos) เพื่อเปลี่ยน Animation เชยๆ แบบสุ่ม (`0.3s ease`) ให้กลายเป็นความรู้สึกสัมผัสที่มีน้ำหนักและประณีต (High-Fidelity Tactile Feel)

---

## 1. The 5 Feel Archetypes (บุคลิกความรู้สึก 5 ระดับ)

| Archetype | Feel & Sensation | Duration (ms) | Cubic-Bezier Curve | Component Mappings |
| :--- | :--- | :--- | :--- | :--- |
| **1. Crisp** | เฉียบคม ฉับไว แม่นยำ | `120 - 180ms` | `cubic-bezier(0.2, 0.0, 0.0, 1.0)` | ปุ่มกด (Button active), Toggle, Tooltip, Checkbox, Icon tap |
| **2. Smooth** | ลื่นไหล เป็นธรรมชาติ มีจังหวะ | `250 - 350ms` | `cubic-bezier(0.4, 0.0, 0.2, 1.0)` | Dropdown menu, Tab switch, Accordion, Modal slide-in |
| **3. Soft** | นุ่มนวล ละมุนตา ไม่เร่งรีบ | `400 - 500ms` | `cubic-bezier(0.25, 1.0, 0.5, 1.0)` | Backdrop fade, Hero section reveal, Toast entry, Skeleton pulse |
| **4. Heavy** | หนักแน่น มีมวลแรงโน้มถ่วง | `500 - 700ms` | `cubic-bezier(0.7, 0.0, 0.3, 1.0)` | Drawer slide-up, Fullscreen sheet, Large card expansion |
| **5. Bouncy** | เด้งดึ๋ง สปริง มีพลัง (Overshoot) | `350 - 500ms` | `cubic-bezier(0.34, 1.56, 0.64, 1.0)` | Notification badge pop, Success checkmark, Like heart, Pin drop |

---

## 2. Standard CSS Variables (`:root`)

คัดลอกชุดตัวแปรนี้ไปวางในไฟล์ CSS หลัก (`globals.css` หรือ `design-tokens.css`):

```css
:root {
  /* --- Duration Tokens --- */
  --motion-duration-instant: 100ms;
  --motion-duration-crisp: 180ms;
  --motion-duration-smooth: 300ms;
  --motion-duration-soft: 450ms;
  --motion-duration-heavy: 600ms;

  /* --- Easing Curves (Cubic-Bezier) --- */
  --motion-ease-crisp: cubic-bezier(0.2, 0.0, 0.0, 1.0);
  --motion-ease-smooth: cubic-bezier(0.4, 0.0, 0.2, 1.0);
  --motion-ease-soft: cubic-bezier(0.25, 1.0, 0.5, 1.0);
  --motion-ease-heavy: cubic-bezier(0.7, 0.0, 0.3, 1.0);
  --motion-ease-bouncy: cubic-bezier(0.34, 1.56, 0.64, 1.0);

  /* --- Composite Transition Tokens --- */
  --transition-button: transform var(--motion-duration-crisp) var(--motion-ease-crisp),
                       background-color var(--motion-duration-crisp) var(--motion-ease-crisp);
  --transition-dropdown: opacity var(--motion-duration-smooth) var(--motion-ease-smooth),
                         transform var(--motion-duration-smooth) var(--motion-ease-smooth);
  --transition-modal: opacity var(--motion-duration-smooth) var(--motion-ease-smooth),
                      transform var(--motion-duration-smooth) var(--motion-ease-smooth);
  --transition-drawer: transform var(--motion-duration-heavy) var(--motion-ease-heavy);
  --transition-badge: transform var(--motion-duration-smooth) var(--motion-ease-bouncy);
}
```

---

## 3. Tailwind CSS Integration (`tailwind.config.js`)

```javascript
module.exports = {
  theme: {
    extend: {
      transitionDuration: {
        'instant': '100ms',
        'crisp': '180ms',
        'smooth': '300ms',
        'soft': '450ms',
        'heavy': '600ms',
      },
      transitionTimingFunction: {
        'crisp': 'cubic-bezier(0.2, 0.0, 0.0, 1.0)',
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1.0)',
        'soft': 'cubic-bezier(0.25, 1.0, 0.5, 1.0)',
        'heavy': 'cubic-bezier(0.7, 0.0, 0.3, 1.0)',
        'bouncy': 'cubic-bezier(0.34, 1.56, 0.64, 1.0)',
      },
    },
  },
}
```

---

## 4. Framer Motion / Spring Physics Presets

สำหรับ React และ Next.js ที่ใช้ `framer-motion`:

```typescript
export const motionSpring = {
  crisp: { type: "spring", stiffness: 500, damping: 30, mass: 0.8 },
  smooth: { type: "spring", stiffness: 350, damping: 25, mass: 1 },
  heavy: { type: "spring", stiffness: 220, damping: 28, mass: 1.5 },
  bouncy: { type: "spring", stiffness: 400, damping: 15, mass: 1 },
};
```

---

## 5. Best Practices & Invariants

1. **ห้ามใช้ `transition: all 0.3s ease` มักง่าย:** ให้ระบุ Properties ชัดเจน (`transform`, `opacity`) เสมอเพื่อประสิทธิภาพ GPU Render (60-120fps)
2. **Reduced Motion Respect:** ต้องรองรับ `@media (prefers-reduced-motion: reduce)` เสมอ สำหรับผู้ใช้ที่เวียนหัวจากภาพเคลื่อนไหว
3. **Data-Dense UIs (Trading/Survey):** ในตารางข้อมูล แดชบอร์ดคำนวณ ห้ามใส่ Motion นานเกิน $150\text{ms}$ (ใช้เฉพาะ Crisp หรือ Instant เท่านั้น)

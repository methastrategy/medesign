## 🔬 Section 5: Style Extraction & Mockup-First Protocol (`/medesign extract`)

เมื่อผู้ใช้ส่ง Screenshot, URL, หรือสั่ง `/medesign extract` หรือเปิด Comparison Lab:
1. **Deconstruct Visual Anatomy:** วิเคราะห์แยกองค์ประกอบ 6 มิติ — Canvas Polarity, Surface Hierarchy, Border/Shadow Mechanism, Typography Pairing & Tracking, Accent Voltage Rule, และ Control Density
2. **Synthesize Pure Tokens (`DESIGN.md` / `user-profile.json`):** ถอดรหัสเป็น CSS/Tailwind Tokens ล้วนโดยไม่ต้องยึดติดชื่อแบรนด์เดิม
3. **Mockup-First Confirmation (ห้ามแก้โค้ดโปรดักชันทันที):**
   - สร้างหน้า HTML Live Preview บน Localhost (เช่น Port `3333`) โดยใช้คอนเทนต์จริงจากโปรเจกต์ของผู้ใช้ (เช่น MESURV, Mesnooker)
   - **Dual-Axis Variation (Surface × Spatial Topology):** ห้ามเปลี่ยนแค่สี/ฟอนต์/กรอบบนโครงหน้าเว็บเดิมซ้ำๆ ต้องแยกการเปรียบเทียบเป็น 2 แกนเสมอ:
     - **Axis 1 (Surface Theme DNA):** โทนสี, ฟอนต์, เส้นขอบ, มุมโค้ง, เงา
     - **Axis 2 (Spatial Layout Architecture):** สัดส่วนการจัดวางหน้าต่างที่ต่างกันอย่างสิ้นเชิง (เช่น Top-Nav Fullwidth, Tab-Switched Workspace, 3-Column Editorial, Split-Pane Workbench, Command HUD — ห้ามล็อก Left Sidebar ตายตัวทุกหน้า)
   - **Injected Top-Center Switcher:** ทุกหน้าใน Comparison Lab ต้องมีแถบสลับหน้าลอยตรงกลางด้านบน (`⊞ Home | ← Prev | Dropdown | Next →`) เพื่อให้กดเปลี่ยนหน้าเปรียบเทียบได้ทันที
   - **Live Theme Toggle Safety:** เมื่อทำปุ่มสลับธีมสด (`data-theme`) ต้องประกาศ CSS Selector รองรับทั้ง `:root[data-theme="..."], body[data-theme="..."]` และใช้ JS อัปเดตทั้ง `document.documentElement` และ `document.body` เสมอ
   - รอให้ผู้ใช้กด Confirm หรือระบุจุดที่ต้องการจูนเพิ่ม (Iterative Refinement) ก่อนนำไปเขียนทับ `user-profile.json` และโค้ดจริง
   - เมื่อผู้ใช้ยืนยันและล็อก DNA เสร็จแล้ว ให้สั่งปิดเซิร์ฟเวอร์ทดสอบ (`manage_task(Action='kill')`) ทันทีเพื่อไม่ให้ค้างในระบบ

---


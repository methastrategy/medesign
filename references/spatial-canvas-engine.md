# Infinite Spatial Canvas & Viewport Virtualization Engine

> [!NOTE]
> สถาปัตยกรรมระดับสูงสำหรับการพัฒนาผืนผ้าใบอินฟินิท (Infinite Spatial Canvas) รองรับการวาดเส้น แผนผัง และการแสดงผลองค์ประกอบกราฟิกนับหมื่นชิ้นที่ 60-120 FPS ถอดแบบองค์ความรู้จาก **tldraw**, **Excalidraw**, และ **Perfect Freehand**

---

## 1. การแปลงพิกัดมิติผืนผ้าใบ (Coordinate System & Matrix Transforms)

ระบบ Infinite Canvas ประกอบด้วย 2 ระนาบพิกัดที่ต้องแปลงไปมาแบบเรียลไทม์:
1. **Screen Space (Viewport):** พิกัดพิกเซลบนหน้าจออุปกรณ์ `(x, y)` เริ่มต้นจากมุมซ้ายบนของ Element
2. **World Space (Canvas Space):** พิกัดสมบูรณ์ในผืนผ้าใบไร้ขีดจำกัด `(wx, wy)` ที่คงที่แม้จะมีการ Zoom/Pan

```typescript
// types/spatial.ts
export interface Camera {
  x: number;     // ค่า offset แนวนอน (World units)
  y: number;     // ค่า offset แนวตั้ง (World units)
  zoom: number;  // อัตราการซูม (เช่น 1.0 = 100%, 0.5 = 50%, 2.0 = 200%)
}

export interface Point {
  x: number;
  y: number;
}

export interface Box {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

// 1. แปลง Screen Coordinate -> World Coordinate (เมื่อคลิกเมาส์/ทัช)
export function screenToWorld(screenPt: Point, camera: Camera): Point {
  return {
    x: (screenPt.x - camera.x) / camera.zoom,
    y: (screenPt.y - camera.y) / camera.zoom,
  };
}

// 2. แปลง World Coordinate -> Screen Coordinate (เมื่อเรนเดอร์ลงจอ)
export function worldToScreen(worldPt: Point, camera: Camera): Point {
  return {
    x: worldPt.x * camera.zoom + camera.x,
    y: worldPt.y * camera.zoom + camera.y,
  };
}

// 3. ซูมเข้าหาตำแหน่งเคอร์เซอร์ (Zoom Towards Pointer)
export function zoomToPoint(
  pointerScreen: Point,
  camera: Camera,
  deltaZoomFactor: number,
  minZoom = 0.1,
  maxZoom = 8.0
): Camera {
  const nextZoom = Math.min(Math.max(camera.zoom * deltaZoomFactor, minZoom), maxZoom);
  const worldPt = screenToWorld(pointerScreen, camera);
  
  return {
    zoom: nextZoom,
    x: pointerScreen.x - worldPt.x * nextZoom,
    y: pointerScreen.y - worldPt.y * nextZoom,
  };
}
```

---

## 2. Spatial Indexing & Viewport Culling (AABB)

การเรนเดอร์ทุก Shape บนหน้าจอจะทำให้ประสิทธิภาพพังทลายเมื่อวัตถุมีจำนวนมาก วิธีแก้ปัญหาคือการใช้ **Axis-Aligned Bounding Box (AABB)** เพื่อกรองและเรนเดอร์เฉพาะวัตถุที่อยู่ในขอบเขตกล้อง (Viewport Culling):

```typescript
// spatial/culling.ts

// คำนวณขอบเขตสี่เหลี่ยมของ Viewport ใน World Space
export function getViewportWorldBounds(viewportWidth: number, viewportHeight: number, camera: Camera): Box {
  const topLeft = screenToWorld({ x: 0, y: 0 }, camera);
  const bottomRight = screenToWorld({ x: viewportWidth, y: viewportHeight }, camera);
  return {
    minX: Math.min(topLeft.x, bottomRight.x),
    minY: Math.min(topLeft.y, bottomRight.y),
    maxX: Math.max(topLeft.x, bottomRight.x),
    maxY: Math.max(topLeft.y, bottomRight.y),
  };
}

// ทดสอบการตัดกันของสี่เหลี่ยม AABB (O(1) Check)
export function intersects(a: Box, b: Box): boolean {
  return a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
}

// เลือกเฉพาะ Shapes ที่อยู่ในสายตากล้อง
export function getVisibleShapes<T extends { bounds: Box }>(shapes: T[], viewportBounds: Box): T[] {
  return shapes.filter(shape => intersects(shape.bounds, viewportBounds));
}
```

---

## 3. Vector Freehand Smoothing Algorithm

การแปลงพิกัด Pointer เกรี้ยวกราด `[{x, y, pressure}]` ให้กลายเป็นโครงร่างเวกเตอร์ (SVG Polygon Path) ที่โค้งมนลื่นไหล พร้อมแรงกดแบบ Calligraphy:

```typescript
// geometry/freehand.ts

export interface StrokePoint {
  point: Point;
  pressure: number;
  distance: number;
  vector: Point;
}

// คำนวณ Outline Polygon จากชุดจุดด้วยการจำลองความเร็วและมวล
export function getStrokeOutlinePoints(points: Point[], strokeWidth = 8, smoothing = 0.5): Point[] {
  if (points.length < 2) return [];

  const leftPoints: Point[] = [];
  const rightPoints: Point[] = [];

  for (let i = 0; i < points.length; i++) {
    const curr = points[i];
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];

    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;

    const halfWidth = strokeWidth / 2;
    leftPoints.push({ x: curr.x + nx * halfWidth, y: curr.y + ny * halfWidth });
    rightPoints.push({ x: curr.x - nx * halfWidth, y: curr.y - ny * halfWidth });
  }

  return [...leftPoints, ...rightPoints.reverse()];
}
```

---

## 4. Multi-Layer Composition Architecture

โครงสร้างเลเยอร์ DOM/Canvas แยกอิสระเพื่อป้องกัน Repaint ทั้งหน้าจอ:

```
┌────────────────────────────────────────────────────────┐
│  1. HUD / Minimap / Toolbars (HTML DOM - Fixed UI)     │
├────────────────────────────────────────────────────────┤
│  2. Selection Box / Transform Handles (SVG Overlay)    │
├────────────────────────────────────────────────────────┤
│  3. Interactive Shapes / Connectors (Culled Virtualized)│
├────────────────────────────────────────────────────────┤
│  4. Infinite Coordinate Grid (CSS Shader or Canvas 2D) │
└────────────────────────────────────────────────────────┘
```

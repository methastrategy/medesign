# Apple Preset Guidelines (`/medesign apple`)

## Archetype Mapping
- **Primary Archetype:** Archetype 02 (High-End Hardware Showcase)
- **Secondary Archetype:** Archetype 01 (Minimalist Editorial)

## Invariants & Design Principles
1. **Concentric Geometry:**
   Outer card radius `24px`, inner nested radius calculated via `r_outer - padding - border = 24 - 8 - 1 = 15px`.
2. **Pill Action Surfaces:**
   Action buttons use `border-radius: 9999px` with minimum 44px hit-target padding.
3. **Motion Profile:**
   `soft-settle` (240ms entry cubic-bezier(0.16, 1, 0.3, 1), 160ms exit). Never use linear or bouncy springs.
4. **Typography Hierarchy:**
   - Display/Headlines: SF Pro Display / Inter with `-0.022em` letter-spacing.
   - Body/UI Chrome: SF Pro Text / Inter with `1.28` line-height for buttons, `1.65` for editorial copy.
   - Diacritic headroom: minimum 3px padding-top for Thai vowel marks (`่ ้ ๊ ๋ ์`).
5. **Color & Vibrancy:**
   OLED Pure Black `#000000` canvas in dark mode, frosted blur `backdrop-filter: blur(20px) saturate(180%)`, Cupertino Blue accent `oklch(0.58 0.22 255)`.

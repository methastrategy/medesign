# Metha Preset Guidelines (`/medesign metha`)

## Designer & Domain Context
- **Creator:** เมธา ตรีประพันธ์กิจ (Survey Engineering & Geoinformatics, Kasetsart University)
- **Primary Archetype:** Archetype 32 (GIS Situation Awareness & Telemetry)
- **Secondary Archetype:** Archetype 38 (Cadastral Survey & QA/QC Workbench)

## Invariants & Design Principles
1. **Engineering Precision & 8pt Spatial Rhythm:**
   Outer card radius `8px`, inner component radius `4px`. All geometry, paddings, and data cell heights align to an 8pt baseline grid (16px, 24px, 32px, 48px).
2. **Geodetic Coordinates & Tabular Typography:**
   - Coordinate, Distance, Azimuth, and Traverse Closure readouts MUST use monospace (`IBM Plex Mono` / `Fira Code`) with `tabular-nums` and `letter-spacing: 0.04em`.
   - UI chrome uses `Inter` or `Sukhumvit Set` with `1.25` line-height.
   - Thai diacritic headroom: minimum `4px` top padding to prevent tone mark clipping (`่ ้ ๊ ๋ ์`) on compact table headers.
3. **Cockpit Color Palette & ISA-101 Situational Awareness:**
   - Dark Slate `#0c0e14` background prevents eye fatigue during 8+ hour surveying shifts.
   - Survey Electric Cyan `oklch(0.65 0.20 250)` for selected cadastral parcel or primary action.
   - Survey Precision Green `oklch(0.72 0.18 145)` strictly reserved for verified closures / fixed GPS solutions ($1\sigma < 5\text{mm}$).
   - Warning Amber `oklch(0.78 0.16 75)` for float solutions or high HDOP.
4. **Motion Profile:**
   `precision` motion profile (140ms entry, 90ms exit). Map selection and point inspection must respond instantly without distracting physics bounces.
5. **Layout Architecture:**
   100dvh viewport canvas layout with floating telemetry docks, collapsible side inspectors, and non-scrambled Bento row grids (`grid-auto-flow: row`).

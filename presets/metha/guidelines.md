# Metha Preset Guidelines (`/medesign metha`)

## Archetype Mapping
- **Primary Archetype:** Archetype 38 (Cadastral Survey & Mission-Critical QA/QC Workbench)
- **Secondary Archetype:** Archetype 32 (GIS Situation Awareness & Telemetry Cockpit)

## World-Class Engineering Context
- **Philosophy:** Mission-Critical Precision, Geodetic Field Telemetry, and High-Density Spatial Computing.
- **Target Audience:** Survey engineers, GIS analysts, telemetry operators, and mission-critical dashboard creators worldwide.
- **Craft Standard:** 100% compliant with ME-DESIGN Neutral World-Class Invariants (Closed Spacing, Latin-First Bilingual Typography, 44px Hit-Target Halo, and 1px Hairline In-flow Surfaces).

## Invariants & Design Principles
1. **Engineering Precision & Closed Spacing System:**
   - Outer card radius `8px`, inner nested component radius `4px` (`r_inner = max(0, r_outer - padding)`).
   - Strict Closed Spacing Scale: `2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`.
   - Proximity Ratio $\ge 2:1$ (space between functional card clusters is at least $2\times$ internal element gap).
2. **Geodetic Coordinates & Tabular Typography:**
   - Coordinate, Distance, Azimuth, and Traverse Closure readouts MUST use monospace (`IBM Plex Mono` / `JetBrains Mono`) with `tabular-nums` and `letter-spacing: 0.04em`.
   - UI chrome and labels use Latin-First `Geist` or `Inter`, paired with `IBM Plex Sans Thai` (Body line-height `1.7–1.8`, `letter-spacing: 0`, diacritic headroom $\ge 4$px).
3. **Cockpit Color Palette & ISA-101 Situational Awareness:**
   - Dark Slate `#0a0d14` canvas background prevents eye fatigue during continuous operational shifts.
   - Surface Raised `#141721`, Surface Inset `#090a0f`.
   - 1px Hairline Borders (`rgba(255, 255, 255, 0.09)`) on all in-flow cards with zero fake drop-shadows. Dark mode elevation achieved via luminance (+2% to +4% L).
   - Survey Electric Cyan `oklch(0.85 0.18 198)` (#00f5fb) for primary active controls and vector geometries.
   - Precision Green `oklch(0.72 0.18 145)` strictly reserved for verified closures, fixed GPS status, and valid tolerances ($1\sigma < 5\text{mm}$).
   - Warning Amber `oklch(0.78 0.16 75)` for float solutions, high HDOP, or tolerance drift.
   - Critical Crimson `oklch(0.62 0.22 25)` for boundary collisions or hardware telemetry loss.
4. **Motion Profile (Precision):**
   - Sub-second `precision` profile (120ms entry, 90ms exit, `cubic-bezier(0.16, 1, 0.3, 1)`).
   - Coordinate updates and map point inspection respond instantly without physics bounces.
5. **Layout Architecture (3-Pane Cockpit):**
   - 100dvh viewport canvas layout with top coordinate command deck, left layer filter rail, center spatial map/vector canvas, and right docked telemetry inspector with collapsible bottom traverse closure table.

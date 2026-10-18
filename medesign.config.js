/**
 * ME-DESIGN Configuration File
 * Customize rule severities, score weights, and browser verification thresholds.
 */

module.exports = {
  // Quality Score Component Weights (sum = 1.0)
  weights: {
    H: 0.30, // Visual Hierarchy & Dominance
    I: 0.25, // Information Density & Accessibility
    G: 0.20, // Optical Geometry & Spatial Rhythm
    R: 0.15, // Responsive Fluidity & Device Stability
    V: 0.10  // Visual Polish & Perceptual Color
  },

  // Minimum passing Q-Score threshold (0-100)
  minQScore: 75.0,

  // Rule severity overrides ('error', 'warning', 'info', 'off')
  // Note: MD001-MD005 are Hard Invariants and are required for production gating.
  rules: {
    MD001: 'error',   // Focus Visibility (:focus-visible)
    MD002: 'error',   // Reduced Motion Compliance (@media prefers-reduced-motion)
    MD003: 'error',   // Isolated Hit-Target Area (No raw scale-95 crushing)
    MD004: 'error',   // Interactive State Contract (No dead buttons)
    MD005: 'error',   // High Contrast Focus Ring (forced-colors: active)
    MD101: 'warning', // Dense Grid Tab Sequence
    MD102: 'warning', // Perceptual Color Interpolation (oklch/oklab)
    MD103: 'info',    // Concentric Radius Math
    MD104: 'warning', // Mobile Viewport Dynamic Units (100dvh)
    MD105: 'warning', // Visual/DOM Sequence Scrambling
    MD201: 'info'     // Editorial Punctuation (hyphen vs em-dash)
  },

  // Headless Browser Verification Settings
  browser: {
    minTouchTargetPx: 44,
    minContrastRatio: 4.5,
    viewports: [
      { name: 'Mobile', width: 390, height: 844, isMobile: true },
      { name: 'Tablet', width: 820, height: 1180, isMobile: true },
      { name: 'Desktop', width: 1440, height: 900, isMobile: false }
    ],
    colorModes: ['dark', 'light']
  }
};

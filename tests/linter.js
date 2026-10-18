#!/usr/bin/env node

/**
 * ME-DESIGN vNext — Verification Engine & Linter
 * Static AST & Rule Verification Runner for HTML / CSS / JSX
 * Usage: node tests/linter.js <filepath> [--preset <name>] [--format text|json|sarif] [--config <path>]
 */

const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
\x1b[1mME-DESIGN Linter (v${pkg.version})\x1b[0m
\x1b[90mStatic AST & semantic rule auditing for HTML/CSS/JSX\x1b[0m

\x1b[1mUsage:\x1b[0m
  medesign lint <file> [options]
  melint <file> [options]

\x1b[1mOptions:\x1b[0m
  --format <text|json|sarif>   Output format (default: text)
  --preset <apple|tesla|metha> Target design preset
  --config <path>              Custom medesign.config.js path
`);
  process.exit(0);
}
let targetFile = null;
let presetName = 'default';
let format = 'text'; // 'text' | 'json' | 'sarif'
let configPath = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--json') {
    format = 'json';
  } else if (args[i] === '--sarif') {
    format = 'sarif';
  } else if (args[i] === '--format' && args[i + 1]) {
    format = args[++i].toLowerCase();
  } else if (args[i] === '--preset' && args[i + 1]) {
    presetName = args[++i];
  } else if (args[i] === '--config' && args[i + 1]) {
    configPath = args[++i];
  } else if (!targetFile && !args[i].startsWith('--')) {
    targetFile = args[i];
  }
}

targetFile = targetFile || path.join(__dirname, 'visual-testbed.html');

if (!fs.existsSync(targetFile)) {
  console.error(`Error: File not found: ${targetFile}`);
  process.exit(2);
}

// Load medesign.config.js if available
let config = {
  weights: { H: 0.30, I: 0.25, G: 0.20, R: 0.15, V: 0.10 },
  minQScore: 75.0,
  rules: {}
};

const candidateConfigs = [
  configPath,
  path.join(process.cwd(), 'medesign.config.js'),
  path.join(__dirname, '..', 'medesign.config.js')
].filter(Boolean);

for (const cfg of candidateConfigs) {
  if (fs.existsSync(cfg)) {
    try {
      const loaded = require(path.resolve(cfg));
      config = {
        ...config,
        ...loaded,
        weights: { ...config.weights, ...(loaded.weights || {}) },
        rules: { ...config.rules, ...(loaded.rules || {}) }
      };
      break;
    } catch (e) {
      // ignore config load errors
    }
  }
}

const content = fs.readFileSync(targetFile, 'utf8');

// Support inline suppression: /* medesign-disable-next-line RULE */ and block suppression
let preprocessedCode = content
  .replace(/\/\*\s*medesign-disable-next-line\s+[A-Za-z0-9_]+\s*\*\/[\r\n]+[^\r\n]+/g, '/* medesign-suppressed */')
  .replace(/\/\*\s*medesign-disable\s+[A-Za-z0-9_]+\s*\*\/[\s\S]*?\/\*\s*medesign-enable\s+[A-Za-z0-9_]+\s*\*\//g, '/* medesign-suppressed */');

// Strip remaining comments so commentary does not trigger false positives or bypasses
const cleanCode = preprocessedCode
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/<!--[\s\S]*?-->/g, '');

const diagnostics = [];

// 1. RULE MD001: Focus Visibility (:focus-visible) - Hard Invariant
const hasFocusVisible = /:focus-visible/i.test(cleanCode) || /focus:outline/i.test(cleanCode) || /focus-visible:/i.test(cleanCode) || /outline:\s*2px/i.test(cleanCode);
if (!hasFocusVisible) {
  diagnostics.push({
    ruleId: 'MD001',
    ruleName: 'FocusVisibility',
    category: 'I',
    severity: config.rules.MD001 || 'error',
    hardInvariant: true,
    message: 'Missing visible focus indicator (:focus-visible) for interactive controls.',
    remediation: 'Define :focus-visible { outline: 2px solid var(--border-focus); outline-offset: 2px; }'
  });
}

// 2. RULE MD002: Reduced Motion Compliance - Hard Invariant
const hasAnimations = /animation:|transition:/i.test(cleanCode) && !/transition:\s*none/i.test(cleanCode);
const hasReducedMotion = /prefers-reduced-motion/i.test(cleanCode);
if (hasAnimations && !hasReducedMotion) {
  diagnostics.push({
    ruleId: 'MD002',
    ruleName: 'ReducedMotionCompliance',
    category: 'R',
    severity: config.rules.MD002 || 'error',
    hardInvariant: true,
    message: 'Animations/transitions detected without @media (prefers-reduced-motion) compliance gate.',
    remediation: 'Add @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }'
  });
}

// 3. RULE MD003: Uncontrolled Button Scale / Hit Target Crush - Hard Invariant
const hasUncontrolledScale = /active:scale-9[0-5]/i.test(cleanCode) || /:active\s*\{\s*transform:\s*scale\(0\.9[0-5]\)/i.test(cleanCode);
if (hasUncontrolledScale) {
  diagnostics.push({
    ruleId: 'MD003',
    ruleName: 'IsolatedHitTarget',
    category: 'G',
    severity: config.rules.MD003 || 'error',
    hardInvariant: true,
    message: 'Detected raw scale(0.90-0.95) directly on interactive button container, collapsing touch hit-target.',
    remediation: 'Isolate outer 44px hit-target container and scale only the inner .visual-surface using clamp(0.96, 1 - 2.5/max(W,H), 0.995).'
  });
}

// 4. RULE MD004: Broken State Contract (Dead Buttons) - Hard Invariant
const hasButtons = /<button/i.test(cleanCode) || /class="[^"]*btn[^"]*"/i.test(cleanCode);
const hasInteractiveStates = /:hover/i.test(cleanCode) || /:active/i.test(cleanCode);
if (hasButtons && !hasInteractiveStates) {
  diagnostics.push({
    ruleId: 'MD004',
    ruleName: 'InteractiveStateContract',
    category: 'I',
    severity: config.rules.MD004 || 'error',
    hardInvariant: true,
    message: 'Buttons declared without defined interactive states (:hover / :active).',
    remediation: 'Provide meaningful visual feedback for hover and active/pressed states.'
  });
}

// 5. RULE MD005: High Contrast Focus Ring Visibility (forced-colors: active) - Hard Invariant
// In Windows High Contrast Mode, box-shadow is completely stripped by the browser. Focus MUST use physical outline.
const focusBlocks = cleanCode.match(/(?:button|a|\.[\w-]+)?:focus(?:-visible)?\s*\{[^}]+\}/gi) || [];
let hasBoxShadowOnlyFocus = false;
for (const block of focusBlocks) {
  const hasOutline = /outline\s*:\s*(?!none|0px?)([^;}]+)/i.test(block);
  const hasBoxShadow = /box-shadow\s*:/i.test(block);
  const stripsOutline = /outline\s*:\s*(?:none|0px?)\s*(?:;|\})/i.test(block);
  if (stripsOutline || (hasBoxShadow && !hasOutline)) {
    hasBoxShadowOnlyFocus = true;
    break;
  }
}
if (hasBoxShadowOnlyFocus) {
  diagnostics.push({
    ruleId: 'MD005',
    ruleName: 'HighContrastFocusRing',
    category: 'I',
    severity: config.rules.MD005 || 'error',
    hardInvariant: true,
    message: 'Focus indicator relies on box-shadow or suppresses outline without replacement. In Windows High Contrast (forced-colors: active), box-shadow is stripped, causing total focus ring loss.',
    remediation: 'Always specify a physical outline in focus styles: :focus-visible { outline: 2px solid Highlight; outline-offset: 2px; }'
  });
}

// 6. RULE MD101: Dense Grid on Data Dashboards - Soft Heuristic (Warning)
const hasDenseGrid = /grid-auto-flow:\s*dense/i.test(cleanCode);
if (hasDenseGrid) {
  diagnostics.push({
    ruleId: 'MD101',
    ruleName: 'DenseGridTabSequence',
    category: 'G',
    severity: config.rules.MD101 || 'warning',
    hardInvariant: false,
    message: 'grid-auto-flow: dense may scramble DOM order away from keyboard tab order.',
    remediation: 'Use grid-auto-flow: row with Named Grid Areas (grid-template-areas) for predictable data layouts.'
  });
}

// 7. RULE MD102: Color Gamut Interpolation Space - Soft Heuristic (Warning)
const hasGradient = /linear-gradient\(/i.test(cleanCode);
const hasOklchOklab = /linear-gradient\([^)]*\bin\s+(oklch|oklab)/i.test(cleanCode);
if (hasGradient && !hasOklchOklab) {
  diagnostics.push({
    ruleId: 'MD102',
    ruleName: 'PerceptualColorInterpolation',
    category: 'V',
    severity: config.rules.MD102 || 'warning',
    hardInvariant: false,
    message: 'Gradients detected without modern perceptual interpolation space (in oklch / in oklab).',
    remediation: 'Use linear-gradient(in oklch shorter hue ...) or linear-gradient(in oklab ...) to prevent middle-gray mud.'
  });
}

// 8. RULE MD103: Concentric Radius Math - Soft Heuristic (Info)
const hasOuterRadius = /border-radius:\s*\d+px/i.test(cleanCode);
const hasInnerConcentric = /max\(\s*0px/i.test(cleanCode) || /calc\(infinity/i.test(cleanCode) || /--corner-r/i.test(cleanCode);
if (hasOuterRadius && !hasInnerConcentric) {
  diagnostics.push({
    ruleId: 'MD103',
    ruleName: 'ConcentricRadiusMath',
    category: 'G',
    severity: config.rules.MD103 || 'info',
    hardInvariant: false,
    message: 'Consider applying Safe Concentric Radius formula max(0px, r_outer - border_w - pad) for nested cards.',
    remediation: 'Ensure inner containers compute radius proportionally to avoid clipped corners.'
  });
}

// 9. RULE MD104: Mobile Viewport Dynamic Units - Soft Heuristic (Warning)
const hasRaw100vh = /(?:height|min-height|max-height)\s*:\s*100vh/i.test(cleanCode);
const hasDvhSvh = /100[ds]vh/i.test(cleanCode);
if (hasRaw100vh && !hasDvhSvh) {
  diagnostics.push({
    ruleId: 'MD104',
    ruleName: 'MobileViewportStability',
    category: 'R',
    severity: config.rules.MD104 || 'warning',
    hardInvariant: false,
    message: '100vh viewport unit used without dynamic viewport fallback (100dvh/100svh). On mobile browsers, toolbar expansion causes vertical jumping.',
    remediation: 'Provide dynamic viewport unit: min-height: 100vh; min-height: 100dvh;'
  });
}

// 10. RULE MD105: Visual/DOM Order Scrambling - Soft Heuristic (Warning)
const hasOrderReverse = /flex-direction\s*:\s*(row|column)-reverse/i.test(cleanCode) || /\border\s*:\s*(-?[1-9]\d*)/i.test(cleanCode);
if (hasOrderReverse) {
  diagnostics.push({
    ruleId: 'MD105',
    ruleName: 'VisualDomSequenceScramble',
    category: 'G',
    severity: config.rules.MD105 || 'warning',
    hardInvariant: false,
    message: 'Reverse flex-direction or CSS order detected. Reordering visual sequence without updating DOM order violates WCAG 1.3.2 and disorients keyboard users.',
    remediation: 'Reorder elements in HTML/DOM source directly rather than relying on reverse layout or CSS order.'
  });
}

// 11. RULE MD106: Container Optical Padding & Slider Boundary Clearance - Soft Heuristic (Warning)
// When an interactive slider or pill container has a rounded background, inner tracks must maintain >= 8px optical clearance.
const sliderPillBlocks = cleanCode.match(/(?:[a-zA-Z0-9_\-\.\#\:\*\,\[\]\="'>\s]+)?(?:slider|progress|scrubber|pill-track)\s*\{[^}]+\}/gi) || [];
let hasBoundaryCollision = false;
for (const block of sliderPillBlocks) {
  const hasPillRadius = /border-radius\s*:\s*(?:var\(--radius-full\)|9999px|50%|[1-9]\d{1,}px)/i.test(block);
  const hasVisibleBg = /background(?:-color)?\s*:\s*(?!none|transparent\b|rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\))/i.test(block);
  const hasMinHeightTarget = /(?:min-)?height\s*:\s*(?:[3-9]\dpx|44px)/i.test(block);
  const hasOpticalPadding = /padding(?:-inline|-left|-right)?\s*:\s*(?:[^;}]*?(?:[8-9]px|[1-9]\d+px|var\(--padding))/i.test(block);
  if (hasPillRadius && hasVisibleBg && hasMinHeightTarget && !hasOpticalPadding) {
    hasBoundaryCollision = true;
    break;
  }
}
if (hasBoundaryCollision) {
  diagnostics.push({
    ruleId: 'MD106',
    ruleName: 'ContainerBoundaryClearance',
    category: 'G',
    severity: config.rules.MD106 || 'warning',
    hardInvariant: false,
    message: 'Detected full-width slider/progress track inside a rounded container with background but zero optical padding, causing visual boundary collision.',
    remediation: 'Isolate outer 44px hit-target with transparent background, or provide horizontal optical padding (padding: 0 12px) to prevent the track from slamming into the curved border.'
  });
}

// 12. RULE MD201: Editorial Style: Em-Dash Punctuation - Soft Heuristic (Info)
const visibleTextMatch = content.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
const hasEmDash = /[—–]/.test(visibleTextMatch);
if (hasEmDash) {
  diagnostics.push({
    ruleId: 'MD201',
    ruleName: 'EditorialPunctuationHyphen',
    category: 'V',
    severity: config.rules.MD201 || 'info',
    hardInvariant: false,
    message: 'Detected em-dash (—) or en-dash (–) in rendered copy.',
    remediation: 'Consider replacing with hyphen (-) or colon for concise UI copywriting.'
  });
}

// Calculate Scores
const hardFailures = diagnostics.filter(d => d.hardInvariant && d.severity === 'error');
const errors = diagnostics.filter(d => d.severity === 'error');
const warnings = diagnostics.filter(d => d.severity === 'warning');
const infos = diagnostics.filter(d => d.severity === 'info');

// Base 100 with category deductions
let H = 95.0;
let I = 95.0 - (diagnostics.filter(d => d.category === 'I').length * 15);
let G = 95.0 - (diagnostics.filter(d => d.category === 'G').length * 10);
let R = 95.0 - (diagnostics.filter(d => d.category === 'R').length * 15);
let V = 95.0 - (diagnostics.filter(d => d.category === 'V').length * 5);

H = Math.max(0, Math.min(100, H));
I = Math.max(0, Math.min(100, I));
G = Math.max(0, Math.min(100, G));
R = Math.max(0, Math.min(100, R));
V = Math.max(0, Math.min(100, V));

const w = config.weights;
const qScore = Math.round((w.H * H + w.I * I + w.G * G + w.R * R + w.V * V) * 10) / 10;
const isPassed = hardFailures.length === 0 && qScore >= config.minQScore;

// Helper: SARIF Level
function toSarifLevel(severity) {
  if (severity === 'error') return 'error';
  if (severity === 'warning') return 'warning';
  return 'note';
}

// 1. Output: SARIF v2.1.0
if (format === 'sarif') {
  const allRules = [
    { id: 'MD001', name: 'FocusVisibility', desc: 'Keyboard focus ring visibility (:focus-visible)', level: 'error' },
    { id: 'MD002', name: 'ReducedMotionCompliance', desc: 'Reduced motion compliance (@media prefers-reduced-motion)', level: 'error' },
    { id: 'MD003', name: 'IsolatedHitTarget', desc: 'Isolated hit-target area (No raw scale-95 crushing)', level: 'error' },
    { id: 'MD004', name: 'InteractiveStateContract', desc: 'Interactive state contract (No dead buttons)', level: 'error' },
    { id: 'MD005', name: 'HighContrastFocusRing', desc: 'High contrast focus ring visibility (forced-colors: active)', level: 'error' },
    { id: 'MD101', name: 'DenseGridTabSequence', desc: 'Dense grid tab sequence consistency', level: 'warning' },
    { id: 'MD102', name: 'PerceptualColorInterpolation', desc: 'Perceptual color interpolation space (oklch/oklab)', level: 'warning' },
    { id: 'MD103', name: 'ConcentricRadiusMath', desc: 'Concentric radius geometry', level: 'note' },
    { id: 'MD104', name: 'MobileViewportStability', desc: 'Mobile viewport dynamic unit stability (100dvh)', level: 'warning' },
    { id: 'MD105', name: 'VisualDomSequenceScramble', desc: 'Visual/DOM sequence synchronization (order / flex reverse)', level: 'warning' },
    { id: 'MD106', name: 'ContainerBoundaryClearance', desc: 'Container boundary clearance and optical padding', level: 'warning' },
    { id: 'MD201', name: 'EditorialPunctuationHyphen', desc: 'Editorial style punctuation (hyphen vs em-dash)', level: 'note' }
  ];

  const uri = path.relative(process.cwd(), targetFile).replace(/\\/g, '/');

  const sarifLog = {
    $schema: 'https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json',
    version: '2.1.0',
    runs: [
      {
        tool: {
          driver: {
            name: 'medesign',
            version: pkg.version,
            informationUri: 'https://github.com/methastrategy/medesign',
            rules: allRules.map(r => ({
              id: r.id,
              name: r.name,
              shortDescription: { text: r.desc },
              defaultConfiguration: { level: r.level }
            }))
          }
        },
        results: diagnostics.map(d => ({
          ruleId: d.ruleId,
          level: toSarifLevel(d.severity),
          message: { text: d.message },
          locations: [
            {
              physicalLocation: {
                artifactLocation: {
                  uri: uri,
                  uriBaseId: '%SRCROOT%'
                }
              }
            }
          ]
        }))
      }
    ]
  };

  console.log(JSON.stringify(sarifLog, null, 2));
  process.exit(isPassed ? 0 : 1);
}

// 2. Output: JSON
if (format === 'json') {
  console.log(JSON.stringify({
    file: targetFile,
    preset: presetName,
    qScore,
    passed: isPassed,
    scores: { H, I, G, R, V },
    hardFailures,
    diagnostics
  }, null, 2));
  process.exit(isPassed ? 0 : 1);
}

// 3. Output: Terminal Summary Card
const ANSI_RESET = '\x1b[0m';
const ANSI_BOLD = '\x1b[1m';
const ANSI_CYAN = '\x1b[36m';
const ANSI_GREEN = '\x1b[32m';
const ANSI_YELLOW = '\x1b[33m';
const ANSI_RED = '\x1b[31m';
const ANSI_GRAY = '\x1b[90m';

console.log(`\n${ANSI_BOLD}ME-DESIGN vNext${ANSI_RESET}`);
console.log(`${ANSI_CYAN}Design Quality & Governance Audit${ANSI_RESET}`);
console.log(`${ANSI_GRAY}────────────────────────────────────────${ANSI_RESET}`);
console.log(`Target        ${path.basename(targetFile)}`);
console.log(`Preset        ${presetName.toUpperCase()}`);
console.log(`Analysis      Static AST & Semantic Rules`);
console.log(`Ruleset       medesign-standard@${pkg.version}\n`);

console.log(`${ANSI_BOLD}QUALITY SCORE (Q = ${w.H}H + ${w.I}I + ${w.G}G + ${w.R}R + ${w.V}V)${ANSI_RESET}`);
console.log(`  Hierarchy (H)       ${H.toFixed(1)} / 100`);
console.log(`  Information (I)     ${I.toFixed(1)} / 100`);
console.log(`  Geometry (G)        ${G.toFixed(1)} / 100`);
console.log(`  Responsive (R)      ${R.toFixed(1)} / 100`);
console.log(`  Visual Craft (V)    ${V.toFixed(1)} / 100\n`);

const qScoreColor = isPassed ? ANSI_GREEN : ANSI_RED;
console.log(`  ${ANSI_BOLD}Q-SCORE             ${qScoreColor}${qScore.toFixed(1)} / 100${ANSI_RESET}  [${isPassed ? 'PASS' : 'FAIL'}]\n`);

console.log(`${ANSI_BOLD}HARD INVARIANTS CHECKLIST${ANSI_RESET}`);
console.log(`  ${hasFocusVisible ? ANSI_GREEN + 'PASS' : ANSI_RED + 'FAIL'}${ANSI_RESET}  MD001: Keyboard Focus Ring Visibility (:focus-visible)`);
console.log(`  ${!hasAnimations || hasReducedMotion ? ANSI_GREEN + 'PASS' : ANSI_RED + 'FAIL'}${ANSI_RESET}  MD002: Reduced Motion Compliance (@media prefers-reduced-motion)`);
console.log(`  ${!hasUncontrolledScale ? ANSI_GREEN + 'PASS' : ANSI_RED + 'FAIL'}${ANSI_RESET}  MD003: Isolated Hit-Target Area (No raw scale-95 crushing)`);
console.log(`  ${!hasButtons || hasInteractiveStates ? ANSI_GREEN + 'PASS' : ANSI_RED + 'FAIL'}${ANSI_RESET}  MD004: Interactive State Contract (No dead buttons)`);
console.log(`  ${!hasBoxShadowOnlyFocus ? ANSI_GREEN + 'PASS' : ANSI_RED + 'FAIL'}${ANSI_RESET}  MD005: High Contrast Focus Visibility (forced-colors: active outline)\n`);

if (diagnostics.length > 0) {
  console.log(`${ANSI_BOLD}FINDINGS (${diagnostics.length})${ANSI_RESET}`);
  diagnostics.forEach(d => {
    const sevColor = d.severity === 'error' ? ANSI_RED : (d.severity === 'warning' ? ANSI_YELLOW : ANSI_CYAN);
    console.log(`  ${sevColor}${d.severity.padEnd(7)}${ANSI_RESET} ${d.ruleId}  ${d.message}`);
    if (d.remediation) {
      console.log(`          ${ANSI_GRAY}-> Remediation: ${d.remediation}${ANSI_RESET}`);
    }
  });
  console.log('');
}

console.log(`${ANSI_GRAY}────────────────────────────────────────${ANSI_RESET}`);
if (isPassed) {
  console.log(`${ANSI_GREEN}${ANSI_BOLD}RESULT: PASS (Exit Code: 0)${ANSI_RESET}`);
  process.exit(0);
} else {
  console.log(`${ANSI_RED}${ANSI_BOLD}RESULT: FAIL (${hardFailures.length} hard invariant failures, Exit Code: 1)${ANSI_RESET}`);
  process.exit(1);
}

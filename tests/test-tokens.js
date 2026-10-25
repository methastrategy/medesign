#!/usr/bin/env node

/**
 * ME-DESIGN Token Exporter Test Suite
 * Tests all 3 formats: Tailwind v4 @theme, W3C DTCG JSON, and CSS Custom Properties.
 * Validates DTCG structure ($value, $type) and Figma Tokens Studio hex fallback.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ANSI_RESET = '\x1b[0m';
const ANSI_BOLD = '\x1b[1m';
const ANSI_GREEN = '\x1b[32m';
const ANSI_RED = '\x1b[31m';
const ANSI_CYAN = '\x1b[36m';
const ANSI_GRAY = '\x1b[90m';

const exporterScript = path.join(__dirname, '..', 'scripts', 'export-tokens.js');

console.log(`\n${ANSI_BOLD}ME-DESIGN Token Exporter Test Suite${ANSI_RESET}`);
console.log(`${ANSI_GRAY}Verifying Tailwind CSS v4 @theme, W3C DTCG standard, and CSS variables...${ANSI_RESET}\n`);

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ${ANSI_GREEN}PASS${ANSI_RESET} ${message}`);
    passed++;
  } else {
    console.error(`  ${ANSI_RED}FAIL${ANSI_RESET} ${message}`);
    failed++;
  }
}

// 1. Test Tailwind v4 @theme Generation
try {
  const tailwindOut = spawnSync(process.execPath, [exporterScript, '--preset', 'apple', '--format', 'tailwind'], { encoding: 'utf8' }).stdout || '';
  assert(tailwindOut.includes('@theme {'), 'Tailwind v4 contains @theme block');
  assert(tailwindOut.includes('--color-accent: oklch(0.58 0.22 255);'), 'Tailwind v4 contains exact accent color token');
  assert(tailwindOut.includes('--font-sans:'), 'Tailwind v4 contains font-sans token');
  assert(tailwindOut.includes('--radius-outer: 24px;'), 'Tailwind v4 contains radius-outer token');
  assert(tailwindOut.includes('--ease-entry: cubic-bezier'), 'Tailwind v4 contains ease-entry motion token');
} catch (e) {
  assert(false, `Tailwind export threw error: ${e.message}`);
}

// 2. Test W3C DTCG Format Specification (Dual OKLCH / sRGB)
try {
  const dtcgOut = spawnSync(process.execPath, [exporterScript, '--preset', 'apple', '--format', 'dtcg'], { encoding: 'utf8' }).stdout || '';
  const jsonBlocks = dtcgOut.match(/\{[\s\S]*?\n\}(?=\n\n|\n$)/g) || [];
  assert(jsonBlocks.length >= 2, 'DTCG export outputs both OKLCH and sRGB blocks');

  const dtcgOklch = JSON.parse(jsonBlocks[0]);
  const dtcgSrgb = JSON.parse(jsonBlocks[1]);

  assert(dtcgOklch.$name === 'Apple Human Interface & Product Showcase', 'DTCG root contains valid $name');
  assert(dtcgOklch.$version === '2024.1.0', 'DTCG root contains valid $version (2024.1.0)');

  // Verify OKLCH leaves have $value and $type
  let allOklchLeavesValid = true;
  function verifyLeaves(obj) {
    if (typeof obj !== 'object' || obj === null) return;
    if (obj.$value !== undefined) {
      if (!obj.$type) allOklchLeavesValid = false;
    } else {
      Object.keys(obj).forEach(k => {
        if (!k.startsWith('$')) verifyLeaves(obj[k]);
      });
    }
  }
  verifyLeaves(dtcgOklch);
  assert(allOklchLeavesValid, 'Every leaf token in DTCG OKLCH has compliant $value and $type');

  // Verify sRGB leaves have hex colors
  let allSrgbValid = true;
  function verifySrgb(obj) {
    if (typeof obj !== 'object' || obj === null) return;
    if (obj.$value !== undefined && obj.$type === 'color') {
      if (!/^#[0-9a-f]{6}$/i.test(obj.$value) && !obj.$value.startsWith('rgba(')) {
        allSrgbValid = false;
      }
    } else {
      Object.keys(obj).forEach(k => {
        if (!k.startsWith('$')) verifySrgb(obj[k]);
      });
    }
  }
  verifySrgb(dtcgSrgb);
  assert(allSrgbValid, 'DTCG sRGB export converts all colors to valid sRGB hex/rgba with gamut mapping');
} catch (e) {
  assert(false, `DTCG export threw error: ${e.message}`);
}

// 3. Test Gamut Mapping Algorithm Unit Test
try {
  const { oklchToHex } = require(exporterScript);
  const mappedHex = oklchToHex('oklch(0.88 0.18 198)');
  assert(mappedHex === '#00f5fb', 'CSS Color 4 Gamut Mapping accurately preserves hue for metha Electric Cyan (#00f5fb)');
} catch (e) {
  assert(false, `Gamut mapping test threw error: ${e.message}`);
}

// 4. Test Standard CSS Custom Properties
try {
  const cssOut = spawnSync(process.execPath, [exporterScript, '--preset', 'tesla', '--format', 'css'], { encoding: 'utf8' }).stdout || '';
  assert(cssOut.includes(':root {'), 'CSS export contains :root block');
  assert(cssOut.includes('--color-accent: oklch(0.58 0.24 28);'), 'Tesla CSS export contains exact accent color');
  assert(cssOut.includes('--radius-outer: 4px;'), 'Tesla CSS export contains 4px outer radius');
} catch (e) {
  assert(false, `CSS export threw error: ${e.message}`);
}

// 5. Test Directory Export
const tempOutDir = path.join(__dirname, '..', 'dist', 'test-tokens');
try {
  spawnSync(process.execPath, [exporterScript, '--preset', 'all', '--format', 'all', '--out', tempOutDir], { encoding: 'utf8' });
  const expectedFiles = [
    'apple-theme.css', 'apple-tokens.oklch.json', 'apple-tokens.srgb.json', 'apple-tokens.css',
    'tesla-theme.css', 'tesla-tokens.oklch.json', 'tesla-tokens.srgb.json', 'tesla-tokens.css',
    'metha-theme.css', 'metha-tokens.oklch.json', 'metha-tokens.srgb.json', 'metha-tokens.css'
  ];
  const allFilesExist = expectedFiles.every(f => fs.existsSync(path.join(tempOutDir, f)));
  assert(allFilesExist, 'All 12 export files written to output directory (3 presets × 4 formats)');
} catch (e) {
  assert(false, `File export threw error: ${e.message}`);
}

console.log(`\n${ANSI_GRAY}────────────────────────────────────────${ANSI_RESET}`);
console.log(`Summary: ${ANSI_GREEN}${passed} passed${ANSI_RESET}, ${failed > 0 ? ANSI_RED : ANSI_GRAY}${failed} failed${ANSI_RESET}.\n`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

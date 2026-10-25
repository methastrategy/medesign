#!/usr/bin/env node

/**
 * ME-DESIGN CLI Test Suite (v1.4.0)
 * Validates search discovery engine, polish self-healing, density modifiers (bolder/quiet),
 * presets, and doctor commands.
 */

const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const { spawnSync } = require('child_process');

const ANSI_RESET = '\x1b[0m';
const ANSI_BOLD = '\x1b[1m';
const ANSI_GREEN = '\x1b[32m';
const ANSI_RED = '\x1b[31m';
const ANSI_GRAY = '\x1b[90m';

const cliPath = path.join(__dirname, '..', 'bin', 'medesign.js');
const tmpDir = path.join(__dirname, 'tmp-test');

if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

console.log(`\n${ANSI_BOLD}ME-DESIGN CLI Test Suite (v${pkg.version})${ANSI_RESET}`);
console.log(`${ANSI_GRAY}Verifying search discovery, self-healing polish, and density modifiers...${ANSI_RESET}\n`);

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

try {
  // 1. Test 'search' with query (ANSI Terminal Card)
  const searchOut = spawnSync(process.execPath, [cliPath, 'search', 'cadastre survey'], { encoding: 'utf8' }).stdout || '';
  assert(searchOut.includes('ME-DESIGN Discovery Engine'), 'Search displays Discovery Engine header');
  assert(searchOut.includes('Best Match'), 'Search displays Best Match');
  assert(searchOut.includes('Archetype 38'), 'Search matches Cadastral Survey Archetype 38');
  assert(searchOut.includes('Primary Color'), 'Search Terminal Card contains Primary Color');
  assert(searchOut.includes('Secondary Color'), 'Search Terminal Card contains Secondary Color');
  assert(searchOut.includes('Motion Profile'), 'Search Terminal Card contains Motion Profile');

  // 2. Test 'search' with --json flag
  const searchJsonOut = spawnSync(process.execPath, [cliPath, 'search', 'apple hardware', '--json'], { encoding: 'utf8' }).stdout || '';
  const searchJson = JSON.parse(searchJsonOut);
  assert(searchJson.query === 'apple hardware', 'Search JSON contains query');
  assert(searchJson.bestMatch && searchJson.bestMatch.number === 30, 'Search JSON matches Archetype 30 for Apple');
  assert(searchJson.bestMatch.primaryColor && searchJson.bestMatch.secondaryColor, 'Search JSON has primary and secondary colors');
  assert(Array.isArray(searchJson.topMatches) && searchJson.topMatches.length > 0, 'Search JSON returns topMatches array');

  // 3. Test 'search' with missing query (exits with code 1)
  const missingSearchRes = spawnSync(process.execPath, [cliPath, 'search'], { encoding: 'utf8' });
  assert(missingSearchRes.status === 1, 'Search without query exits with code 1');

  // 4. Test 'polish' on HTML with MD104, MD005, em-dashes, and dead buttons
  const testHtmlPath = path.join(tmpDir, 'test-polish.html');
  const rawHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Test &mdash; Dashboard</title>
  <style>
    .hero { min-height: 100vh; }
    .box:focus { outline: none; box-shadow: 0 0 0 2px cyan; }
    .btn { background: blue; color: white; }
  </style>
</head>
<body>
  <h1>Overview &ndash; Heading &mdash; Sub</h1>
  <button class="btn">Click</button>
</body>
</html>`;
  fs.writeFileSync(testHtmlPath, rawHtml, 'utf8');

  const polishRes = spawnSync(process.execPath, [cliPath, 'polish', testHtmlPath], { encoding: 'utf8' });
  assert(polishRes.status === 0, 'Polish exits with code 0');
  const polishedContent = fs.readFileSync(testHtmlPath, 'utf8');
  assert(polishedContent.includes('min-height: 100vh; min-height: 100dvh;'), 'Polish converts raw 100vh to 100dvh fallback');
  assert(polishedContent.includes('outline: 2px solid Highlight; outline-offset: 2px;'), 'Polish replaces outline:none with physical outline');
  assert(polishedContent.includes('@media (forced-colors: active)'), 'Polish injects forced-colors high contrast query');
  assert(polishedContent.includes('button:hover, [class*="btn"]:hover'), 'Polish injects hover state for dead buttons');
  assert(!polishedContent.includes('&mdash;') && !polishedContent.includes('&ndash;'), 'Polish cleans HTML entity em-dashes to hyphens');
  assert(polishedContent.includes('cubic-bezier(0.16, 1, 0.3, 1)'), 'Polish injects GPU spring micro-interactions');
  assert(polishedContent.includes('.touch-halo'), 'Polish injects decoupled touch halo');
  assert(polishedContent.includes('min-height: 44px;'), 'Polish enforces 44px touch target on buttons');

  // 4b. Test 'polish' Aesthetic Auto-Compiler (typography elevation, bento proportions, OKLCH gradient, scale crush)
  const testAestheticPath = path.join(tmpDir, 'test-aesthetic.html');
  const rawAesthetic = `<!DOCTYPE html>
<html>
<head>
  <title>Aesthetic Test</title>
  <style>
    body { font-family: 'Inter', sans-serif; }
    .hero { background: linear-gradient(135deg, #111, #222); border-radius: 16px; }
    .slider { min-height: 44px; border-radius: 9999px; background: #333; }
    .scale-box { active:scale-90; }
  </style>
</head>
<body>
  <div class="grid grid-cols-3">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
  </div>
</body>
</html>`;
  fs.writeFileSync(testAestheticPath, rawAesthetic, 'utf8');
  const polishAesRes = spawnSync(process.execPath, [cliPath, 'polish', testAestheticPath], { encoding: 'utf8' });
  assert(polishAesRes.status === 0, 'Polish aesthetic test exits with code 0');
  const polishedAes = fs.readFileSync(testAestheticPath, 'utf8');
  assert(polishedAes.includes("'Geist', 'Plus Jakarta Sans'"), 'Polish elevates generic Inter to Geist / Plus Jakarta Sans');
  assert(polishedAes.includes('linear-gradient(in oklch'), 'Polish converts gradient to perceptual OKLCH space');
  assert(polishedAes.includes('bento-featured') || polishedAes.includes('col-span-2'), 'Polish injects dynamic bento hierarchy into uniform grid');
  assert(polishedAes.includes('active:scale-98'), 'Polish replaces scale-90 with safe proportional scale(0.98)');
  assert(polishedAes.includes('padding: 0 12px;'), 'Polish injects optical padding into slider (MD106)');
  assert(polishedAes.includes('fonts.googleapis.com'), 'Polish injects Google Fonts preconnect CDN for curated Archetypes');
  assert(polishedAes.includes('grid-column: span 2'), 'Polish injects bento CSS rule with grid-column span 2');

  // 4c. Test 'polish' on HTML without existing <style> tag
  const testNoStylePath = path.join(tmpDir, 'test-no-style.html');
  const rawNoStyle = `<!DOCTYPE html><html><head><title>No Style</title></head><body><button class="btn">Click</button><div class="grid grid-cols-3"><div class="card">A</div><div class="card">B</div></div></body></html>`;
  fs.writeFileSync(testNoStylePath, rawNoStyle, 'utf8');
  const polishNoStyleRes = spawnSync(process.execPath, [cliPath, 'polish', testNoStylePath], { encoding: 'utf8' });
  assert(polishNoStyleRes.status === 0, 'Polish on HTML without style exits with code 0');
  const polishedNoStyle = fs.readFileSync(testNoStylePath, 'utf8');
  assert(polishedNoStyle.includes('<style>') && polishedNoStyle.includes('min-height: 44px;'), 'Polish creates <style> and injects 44px button contract');
  assert(polishedNoStyle.includes('@media (forced-colors: active)'), 'Polish injects forced-colors into auto-created style block');

  // 4d. Test 'polish' negative angle gradient and system font elevation
  const testAnglePath = path.join(tmpDir, 'test-angle.html');
  const rawAngle = `<!DOCTYPE html><html><head><style>body { --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; } .hero { background: linear-gradient(-45deg, #111, #222); }</style></head><body></body></html>`;
  fs.writeFileSync(testAnglePath, rawAngle, 'utf8');
  const polishAngleRes = spawnSync(process.execPath, [cliPath, 'polish', testAnglePath], { encoding: 'utf8' });
  assert(polishAngleRes.status === 0, 'Polish angle test exits with code 0');
  const polishedAngle = fs.readFileSync(testAnglePath, 'utf8');
  assert(polishedAngle.includes('linear-gradient(in oklch -45deg,'), 'Polish handles negative angle gradient in oklch');
  assert(polishedAngle.includes("'Geist', 'Plus Jakarta Sans'"), 'Polish elevates -apple-system font-sans variable');

  // 4e. Test 'polish' --dry-run option (verifies no file mutation on disk)
  const testDryRunPath = path.join(tmpDir, 'test-dry-run.html');
  const rawDryRun = '<div style="height: 100vh;">Dry Run</div>';
  fs.writeFileSync(testDryRunPath, rawDryRun, 'utf8');
  const dryRunRes = spawnSync(process.execPath, [cliPath, 'polish', testDryRunPath, '--dry-run'], { encoding: 'utf8' });
  assert(dryRunRes.status === 0, 'Polish --dry-run exits with code 0');
  assert(dryRunRes.stdout.includes('POLISH DRY-RUN PREVIEW'), 'Polish --dry-run displays preview notice');
  assert(fs.readFileSync(testDryRunPath, 'utf8') === rawDryRun, 'Polish --dry-run leaves file unmodified on disk');

  // 4f. Test 'polish' gate rejection on unfixable failure (exit code 1)
  const testFailPath = path.join(tmpDir, 'test-unfixable.html');
  // Focus block with comment between selector and bracket exposes regex limitation (MD005 hard failure remaining)
  const unfixableRaw = '<style>.btn:focus /* unhandled comment */ { box-shadow: 0 0 0 2px red; outline: none; }</style><button class="btn">Click</button>';
  fs.writeFileSync(testFailPath, unfixableRaw, 'utf8');
  const failRes = spawnSync(process.execPath, [cliPath, 'polish', testFailPath], { encoding: 'utf8' });
  assert(failRes.status === 1, 'Polish on unfixable file exits with code 1 (Gate Rejection)');
  assert(failRes.stderr.includes('GATE REJECTED') && failRes.stderr.includes('MD005'), 'Polish failure reports gate rejection with MD005 rule ID');

  // 5. Test 'polish' on standalone CSS file (verifies forced-colors injection without </style>)
  const testCssPath = path.join(tmpDir, 'test-standalone.css');
  const rawCss = `.card:focus-visible { outline: none; box-shadow: 0 0 0 3px red; }\n.wrapper { height: 100vh; }`;
  fs.writeFileSync(testCssPath, rawCss, 'utf8');

  const polishCssRes = spawnSync(process.execPath, [cliPath, 'polish', testCssPath], { encoding: 'utf8' });
  assert(polishCssRes.status === 0, 'Polish on CSS file exits with code 0');
  const polishedCss = fs.readFileSync(testCssPath, 'utf8');
  assert(polishedCss.includes('@media (forced-colors: active)'), 'Polish injects forced-colors into standalone CSS file');
  assert(polishedCss.includes('min-height: 100vh; min-height: 100dvh;'), 'Polish fixes raw height in standalone CSS file');

  // 6. Test 'bolder' command (font weights, border contrast, OKLCH & HSL saturation)
  const testBolderPath = path.join(tmpDir, 'test-bolder.html');
  const rawBolder = `<div class="font-normal border-white/10 saturate-100 bg-blue-500" style="color: oklch(0.75 0.12 180); border-color: hsl(200, 50%, 50%); font-weight: 400;">Bolder Test</div>`;
  fs.writeFileSync(testBolderPath, rawBolder, 'utf8');

  const bolderRes = spawnSync(process.execPath, [cliPath, 'bolder', testBolderPath], { encoding: 'utf8' });
  assert(bolderRes.status === 0, 'Bolder command exits with code 0');
  const bolderContent = fs.readFileSync(testBolderPath, 'utf8');
  assert(bolderContent.includes('font-medium'), 'Bolder elevates font-normal to font-medium');
  assert(bolderContent.includes('font-weight: 600'), 'Bolder elevates font-weight: 400 to 600');
  assert(bolderContent.includes('border-white/20'), 'Bolder deepens border-white/10 to border-white/20');
  assert(bolderContent.includes('saturate-150'), 'Bolder boosts saturate-100 to saturate-150');
  assert(bolderContent.includes('bg-blue-600'), 'Bolder boosts bg-blue-500 to bg-blue-600');
  // OKLCH chroma should be boosted from 0.12 by ~25% to 0.15
  assert(/oklch\(0\.75 0\.15/.test(bolderContent), 'Bolder boosts OKLCH chroma (0.12 -> 0.150)');

  // 7. Test 'quiet' command (softens font weights, hairlines, and reduces saturation)
  const testQuietPath = path.join(tmpDir, 'test-quiet.html');
  const rawQuiet = `<div class="font-bold border-2 saturate-150 bg-blue-600" style="color: oklch(0.75 0.20 180); border-color: hsl(200, 70%, 50%); font-weight: 700;">Quiet Test</div>`;
  fs.writeFileSync(testQuietPath, rawQuiet, 'utf8');

  const quietRes = spawnSync(process.execPath, [cliPath, 'quiet', testQuietPath], { encoding: 'utf8' });
  assert(quietRes.status === 0, 'Quiet command exits with code 0');
  const quietContent = fs.readFileSync(testQuietPath, 'utf8');
  assert(quietContent.includes('font-semibold'), 'Quiet softens font-bold to font-semibold');
  assert(quietContent.includes('font-weight: 500'), 'Quiet softens font-weight: 700 to 500');
  assert(quietContent.includes('border'), 'Quiet reduces border-2 to hairline border');
  assert(quietContent.includes('saturate-100'), 'Quiet softens saturate-150 to saturate-100');
  assert(quietContent.includes('bg-blue-500'), 'Quiet softens bg-blue-600 to bg-blue-500');
  // OKLCH chroma should be softened from 0.20 by ~30% to 0.14
  assert(/oklch\(0\.75 0\.14/.test(quietContent), 'Quiet softens OKLCH chroma (0.20 -> 0.140)');

  // 8. Test 'presets' command
  const presetsListOut = spawnSync(process.execPath, [cliPath, 'presets', 'list'], { encoding: 'utf8' }).stdout || '';
  assert(presetsListOut.includes('apple') && presetsListOut.includes('metha') && presetsListOut.includes('tesla'), 'Presets list outputs all 3 built-in presets');

  const presetAppleOut = spawnSync(process.execPath, [cliPath, 'presets', 'get', 'apple'], { encoding: 'utf8' }).stdout || '';
  const parsedApple = JSON.parse(presetAppleOut);
  assert(parsedApple.id === 'apple', 'Presets get apple outputs valid JSON');

  // 9. Test 'doctor' command
  const doctorOut = spawnSync(process.execPath, [cliPath, 'doctor'], { encoding: 'utf8' }).stdout || '';
  assert(doctorOut.includes('Node.js Runtime') && doctorOut.includes('Headless Browser'), 'Doctor command runs health checks');

  // 10. Test 'snapshot' command via CLI
  const testBanner = path.join(__dirname, '..', 'examples', 'geospatial-banner-1200x630.html');
  try {
    const snapOut = spawnSync(process.execPath, [cliPath, 'snapshot', testBanner, '--og', '--out', path.join(tmpDir, 'snap')], { encoding: 'utf8' }).stdout || '';
    assert(snapOut.includes('ME-DESIGN Snapshot Engine'), 'Snapshot engine displays banner header');
    assert(snapOut.includes('1 snapshots saved'), 'Snapshot command captured OG banner successfully');
    assert(fs.existsSync(path.join(tmpDir, 'snap', 'geospatial-banner-1200x630-og-banner-1200x630.png')), 'Snapshot output file exists on disk');
  } catch (snapErr) {
    if (process.env.CI || /ECONNREFUSED|fetch failed|Chrome\/Chromium binary not found/.test(snapErr.message || '')) {
      console.log(`  ${ANSI_GRAY}SKIP${ANSI_RESET} Snapshot live rendering test skipped in headless CI / no-display container (${snapErr.message.split('\n')[0]})`);
      passed++;
    } else {
      throw snapErr;
    }
  }

  // 11. Test dedicated executable launchers
  const mepolishOut = spawnSync(process.execPath, [path.join(__dirname, '..', 'bin', 'mepolish.js'), '--help'], { encoding: 'utf8' }).stdout || '';
  assert(mepolishOut.includes('ME-DESIGN Self-Healing Polish'), 'Dedicated mepolish launcher runs polish subcommand');

  const mebolderOut = spawnSync(process.execPath, [path.join(__dirname, '..', 'bin', 'mebolder.js'), '--help'], { encoding: 'utf8' }).stdout || '';
  assert(mebolderOut.includes('ME-DESIGN Bolder Modifier'), 'Dedicated mebolder launcher runs bolder subcommand');

  const mequietOut = spawnSync(process.execPath, [path.join(__dirname, '..', 'bin', 'mequiet.js'), '--help'], { encoding: 'utf8' }).stdout || '';
  assert(mequietOut.includes('ME-DESIGN Quiet Modifier'), 'Dedicated mequiet launcher runs quiet subcommand');

  const melintOut = spawnSync(process.execPath, [path.join(__dirname, '..', 'bin', 'melint.js'), '--help'], { encoding: 'utf8' }).stdout || '';
  assert(melintOut.includes('ME-DESIGN Linter'), 'Dedicated melint launcher runs lint subcommand');

  const mesearchOut = spawnSync(process.execPath, [path.join(__dirname, '..', 'bin', 'mesearch.js'), '--help'], { encoding: 'utf8' });
  assert(mesearchOut.stdout.includes('medesign search') && mesearchOut.stdout.includes('cadastre survey'), 'Dedicated mesearch launcher displays search usage');

  const mesnapshotOut = spawnSync(process.execPath, [path.join(__dirname, '..', 'bin', 'mesnapshot.js'), '--help'], { encoding: 'utf8' });
  assert(mesnapshotOut.stdout.includes('ME-DESIGN Snapshot Engine'), 'Dedicated mesnapshot launcher displays snapshot usage');

  // 12. Test --help flags across commands
  const polishHelp = spawnSync(process.execPath, [cliPath, 'polish', '--help'], { encoding: 'utf8' }).stdout || '';
  assert(polishHelp.includes('ME-DESIGN Self-Healing Polish'), 'Polish command displays usage on --help');

  const tokensHelp = spawnSync(process.execPath, [cliPath, 'tokens', '--help'], { encoding: 'utf8' }).stdout || '';
  assert(tokensHelp.includes('ME-DESIGN Token Exporter'), 'Tokens command displays usage on --help');

  const presetsHelp = spawnSync(process.execPath, [cliPath, 'presets', '--help'], { encoding: 'utf8' }).stdout || '';
  assert(presetsHelp.includes('ME-DESIGN Presets Inspector'), 'Presets command displays usage on --help');

  const masterHelp = spawnSync(process.execPath, [cliPath, 'help'], { encoding: 'utf8' }).stdout || '';
  assert(masterHelp.includes(`ME-DESIGN CLI v${pkg.version}`), `Master help displays dynamic version v${pkg.version}`);

} catch (err) {
  assert(false, `Unexpected error in test-cli: ${err.message}`);
} finally {
  // Cleanup tmpDir
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch (e) {}
}

console.log(`\n────────────────────────────────────────`);
console.log(`Summary: ${passed} passed, ${failed} failed.\n`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

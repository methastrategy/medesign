#!/usr/bin/env node

/**
 * ME-DESIGN CLI Test Suite (v1.4.0)
 * Validates search discovery engine, polish self-healing, density modifiers (bolder/quiet),
 * presets, and doctor commands.
 */

const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const { execSync, spawnSync } = require('child_process');

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
  const searchOut = execSync(`node "${cliPath}" search "cadastre survey"`, { encoding: 'utf8' });
  assert(searchOut.includes('ME-DESIGN Discovery Engine'), 'Search displays Discovery Engine header');
  assert(searchOut.includes('Best Match'), 'Search displays Best Match');
  assert(searchOut.includes('Archetype 38'), 'Search matches Cadastral Survey Archetype 38');
  assert(searchOut.includes('Primary Color'), 'Search Terminal Card contains Primary Color');
  assert(searchOut.includes('Secondary Color'), 'Search Terminal Card contains Secondary Color');
  assert(searchOut.includes('Motion Profile'), 'Search Terminal Card contains Motion Profile');

  // 2. Test 'search' with --json flag
  const searchJsonOut = execSync(`node "${cliPath}" search "apple hardware" --json`, { encoding: 'utf8' });
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
  const presetsListOut = execSync(`node "${cliPath}" presets list`, { encoding: 'utf8' });
  assert(presetsListOut.includes('apple') && presetsListOut.includes('metha') && presetsListOut.includes('tesla'), 'Presets list outputs all 3 built-in presets');

  const presetAppleOut = execSync(`node "${cliPath}" presets get apple`, { encoding: 'utf8' });
  const parsedApple = JSON.parse(presetAppleOut);
  assert(parsedApple.id === 'apple', 'Presets get apple outputs valid JSON');

  // 9. Test 'doctor' command
  const doctorOut = execSync(`node "${cliPath}" doctor`, { encoding: 'utf8' });
  assert(doctorOut.includes('Node.js Runtime') && doctorOut.includes('Headless Browser'), 'Doctor command runs health checks');

  // 10. Test 'snapshot' command via CLI
  const testBanner = path.join(__dirname, '..', 'examples', 'geospatial-banner-1200x630.html');
  const snapOut = execSync(`node "${cliPath}" snapshot "${testBanner}" --og --out "${tmpDir}/snap"`, { encoding: 'utf8' });
  assert(snapOut.includes('ME-DESIGN Snapshot Engine'), 'Snapshot engine displays banner header');
  assert(snapOut.includes('1 snapshots saved'), 'Snapshot command captured OG banner successfully');
  assert(fs.existsSync(path.join(tmpDir, 'snap', 'geospatial-banner-1200x630-og-banner-1200x630.png')), 'Snapshot output file exists on disk');

  // 11. Test dedicated executable launchers
  const mepolishOut = execSync(`node "${path.join(__dirname, '..', 'bin', 'mepolish.js')}" --help`, { encoding: 'utf8' });
  assert(mepolishOut.includes('ME-DESIGN Self-Healing Polish'), 'Dedicated mepolish launcher runs polish subcommand');

  const mebolderOut = execSync(`node "${path.join(__dirname, '..', 'bin', 'mebolder.js')}" --help`, { encoding: 'utf8' });
  assert(mebolderOut.includes('ME-DESIGN Bolder Modifier'), 'Dedicated mebolder launcher runs bolder subcommand');

  const mequietOut = execSync(`node "${path.join(__dirname, '..', 'bin', 'mequiet.js')}" --help`, { encoding: 'utf8' });
  assert(mequietOut.includes('ME-DESIGN Quiet Modifier'), 'Dedicated mequiet launcher runs quiet subcommand');

  const melintOut = execSync(`node "${path.join(__dirname, '..', 'bin', 'melint.js')}" --help`, { encoding: 'utf8' });
  assert(melintOut.includes('ME-DESIGN Linter'), 'Dedicated melint launcher runs lint subcommand');

  const mesearchOut = spawnSync(process.execPath, [path.join(__dirname, '..', 'bin', 'mesearch.js'), '--help'], { encoding: 'utf8' });
  assert(mesearchOut.stdout.includes('medesign search') && mesearchOut.stdout.includes('cadastre survey'), 'Dedicated mesearch launcher displays search usage');

  const mesnapshotOut = spawnSync(process.execPath, [path.join(__dirname, '..', 'bin', 'mesnapshot.js'), '--help'], { encoding: 'utf8' });
  assert(mesnapshotOut.stdout.includes('ME-DESIGN Snapshot Engine'), 'Dedicated mesnapshot launcher displays snapshot usage');

  // 12. Test --help flags across commands
  const polishHelp = execSync(`node "${cliPath}" polish --help`, { encoding: 'utf8' });
  assert(polishHelp.includes('ME-DESIGN Self-Healing Polish'), 'Polish command displays usage on --help');

  const tokensHelp = execSync(`node "${cliPath}" tokens --help`, { encoding: 'utf8' });
  assert(tokensHelp.includes('ME-DESIGN Token Exporter'), 'Tokens command displays usage on --help');

  const presetsHelp = execSync(`node "${cliPath}" presets --help`, { encoding: 'utf8' });
  assert(presetsHelp.includes('ME-DESIGN Presets Inspector'), 'Presets command displays usage on --help');

  const masterHelp = execSync(`node "${cliPath}" help`, { encoding: 'utf8' });
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

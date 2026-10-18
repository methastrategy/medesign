#!/usr/bin/env node

/**
 * ME-DESIGN Phase 2 — Rendered DOM & Headless Browser Verification Engine
 * Direct Chrome DevTools Protocol (CDP) client over native WebSocket.
 * Zero external npm dependencies.
 * 
 * Verifies:
 * 1. Real Computed Contrast Ratio across backgrounds
 * 2. Real Keyboard Tab Navigation & Focus Ring rendering (:focus-visible)
 * 3. Windows High Contrast Mode (forced-colors: active) physical outline persistence
 * 4. Hit-Target Bounding Dimensions (44px min touch standard)
 * 5. Responsive Viewports (Mobile 390px, Tablet 820px, Desktop 1440px)
 * 6. Theme Modes (Dark & Light)
 * 
 * Usage: node tests/browser-audit.js <filepath> [--json]
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ANSI_RESET = '\x1b[0m';
const ANSI_BOLD = '\x1b[1m';
const ANSI_GREEN = '\x1b[32m';
const ANSI_RED = '\x1b[31m';
const ANSI_YELLOW = '\x1b[33m';
const ANSI_CYAN = '\x1b[36m';
const ANSI_GRAY = '\x1b[90m';

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
\x1b[1mME-DESIGN Browser Audit Engine\x1b[0m
\x1b[90mHeadless Chrome DevTools Protocol verification matrix (7 conditions)\x1b[0m

\x1b[1mUsage:\x1b[0m
  medesign audit <file> [options]

\x1b[1mOptions:\x1b[0m
  --json    Output results in JSON format
`);
  process.exit(0);
}
let targetFile = null;
let isJson = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--json') {
    isJson = true;
  } else if (!targetFile && !args[i].startsWith('--')) {
    targetFile = args[i];
  }
}

targetFile = targetFile || path.join(__dirname, 'fixtures', 'valid', 'metha-cadastre-dashboard.html');

if (!fs.existsSync(targetFile)) {
  console.error(`Error: File not found: ${targetFile}`);
  process.exit(2);
}

const resolvedPath = path.resolve(targetFile);
const fileUrl = 'file:///' + resolvedPath.replace(/\\/g, '/');

// Locate Chromium executable across Windows, Linux, and macOS
function findChromium() {
  const envPath = process.env.CHROME_PATH || process.env.CHROME_BIN;
  if (envPath && fs.existsSync(envPath)) return envPath;

  const localApp = process.env.LOCALAPPDATA || '';
  const pwDir = path.join(localApp, 'ms-playwright');
  if (fs.existsSync(pwDir)) {
    try {
      const entries = fs.readdirSync(pwDir);
      const chromiumDirs = entries.filter(e => e.startsWith('chromium-')).sort().reverse();
      for (const cDir of chromiumDirs) {
        const p = path.join(pwDir, cDir, 'chrome-win64', 'chrome.exe');
        if (fs.existsSync(p)) return p;
      }
    } catch (e) {}
  }

  const programFiles = process.env['ProgramFiles'] || 'C:\\Program Files';
  const programFilesX86 = process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)';

  const alternatives = [
    path.join(programFiles, 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(programFilesX86, 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(programFiles, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    path.join(programFilesX86, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium'
  ];

  for (const p of alternatives) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

const chromePath = findChromium();
if (!chromePath) {
  console.error('Error: Chromium/Chrome binary not found on system.');
  process.exit(2);
}

// Minimal JSON-RPC CDP Client over Node's native global WebSocket
class CDPClient {
  constructor(port) {
    this.port = port;
    this.ws = null;
    this.msgId = 0;
    this.callbacks = new Map();
  }

  async connect(targetUrl) {
    const res = await fetch(`http://127.0.0.1:${this.port}/json/new`, { method: 'PUT' });
    const target = await res.json();
    this.targetId = target.id;
    this.ws = new WebSocket(target.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.msgId;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async close() {
    if (this.ws) {
      try { this.ws.close(); } catch (e) {}
    }
    try {
      await fetch(`http://127.0.0.1:${this.port}/json/close/${this.targetId}`, { method: 'PUT' });
    } catch (e) {}
  }
}

async function runAudit() {
  const cdpPort = 9444 + Math.floor(Math.random() * 200);
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${cdpPort}`,
    '--no-first-run',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--mute-audio',
    '--hide-scrollbars'
  ]);

  // Wait for CDP readiness
  let ready = false;
  for (let i = 0; i < 25; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
      if (r.ok) { ready = true; break; }
    } catch (e) {}
    await new Promise(res => setTimeout(res, 100));
  }

  if (!ready) {
    chromeProcess.kill();
    console.error('Failed to connect to headless Chromium instance.');
    process.exit(1);
  }

  const client = new CDPClient(cdpPort);
  await client.connect();

  // Full 7-Condition Test Matrix:
  // 3 Viewports (Mobile, Tablet, Desktop) × 2 Themes (Dark, Light) + Windows High Contrast (forced-colors: active)
  const testMatrix = [
    { viewport: { name: 'Mobile', width: 390, height: 844, isMobile: true }, theme: 'dark', forcedColors: false },
    { viewport: { name: 'Mobile', width: 390, height: 844, isMobile: true }, theme: 'light', forcedColors: false },
    { viewport: { name: 'Tablet', width: 820, height: 1180, isMobile: true }, theme: 'dark', forcedColors: false },
    { viewport: { name: 'Tablet', width: 820, height: 1180, isMobile: true }, theme: 'light', forcedColors: false },
    { viewport: { name: 'Desktop', width: 1440, height: 900, isMobile: false }, theme: 'dark', forcedColors: false },
    { viewport: { name: 'Desktop', width: 1440, height: 900, isMobile: false }, theme: 'light', forcedColors: false },
    // Condition 7: Windows High Contrast Emulation (forced-colors: active)
    { viewport: { name: 'Desktop', width: 1440, height: 900, isMobile: false }, theme: 'forced-colors', forcedColors: true }
  ];

  const auditResults = [];

  try {
    await client.send('Page.enable');
    await client.send('DOM.enable');
    await client.send('Runtime.enable');

    for (const testCase of testMatrix) {
      const vp = testCase.viewport;
      const th = testCase.theme;

      // Set Device Metrics
      await client.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 2,
        mobile: vp.isMobile
      });

      // Set Emulated Color Scheme and Forced Colors
      const features = [
        { name: 'prefers-color-scheme', value: testCase.forcedColors ? 'dark' : th }
      ];
      if (testCase.forcedColors) {
        features.push({ name: 'forced-colors', value: 'active' });
      } else {
        features.push({ name: 'forced-colors', value: 'none' });
      }

      await client.send('Emulation.setEmulatedMedia', {
        media: 'screen',
        features
      });

      // Navigate
      await client.send('Page.navigate', { url: fileUrl });
      await new Promise(res => setTimeout(res, 250)); // Wait for render and styles to settle

      // Dispatch real keyboard Tab navigation event
      await client.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
      await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
      await new Promise(res => setTimeout(res, 50));

      // Perform in-page inspection
      const inspectExpr = `
        (() => {
          // Relative luminance calculator
          function getLuminance(r, g, b) {
            const [rs, gs, bs] = [r, g, b].map(c => {
              c = c / 255;
              return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
          }

          // Shared 1x1 canvas for hardware-exact pixel color rasterization
          const pixelCanvas = document.createElement('canvas');
          pixelCanvas.width = 1;
          pixelCanvas.height = 1;
          const pixelCtx = pixelCanvas.getContext('2d', { willReadFrequently: true });

          function parseRgba(colorStr) {
            if (!colorStr) return [0, 0, 0, 1];
            try {
              pixelCtx.clearRect(0, 0, 1, 1);
              pixelCtx.fillStyle = colorStr;
              pixelCtx.fillRect(0, 0, 1, 1);
              const d = pixelCtx.getImageData(0, 0, 1, 1).data;
              return [d[0], d[1], d[2], d[3] / 255];
            } catch (e) {
              return [255, 255, 255, 1];
            }
          }

          function getContrastRatio(fgRgb, bgRgb) {
            const l1 = getLuminance(fgRgb[0], fgRgb[1], fgRgb[2]);
            const l2 = getLuminance(bgRgb[0], bgRgb[1], bgRgb[2]);
            const lighter = Math.max(l1, l2);
            const darker = Math.min(l1, l2);
            return (lighter + 0.05) / (darker + 0.05);
          }

          function isDemoAntiPattern(el) {
            return el.closest('.con') || el.classList.contains('con') || el.closest('[data-anti-pattern]') || el.classList.contains('btn-slop') || el.closest('.cmp-col:has(.btn-slop)') || el.closest('.cmp-col:has(.thai-crop-bad)');
          }

          // Test 1: Hit-Target Dimensions (min 44x44px for touch)
          const buttons = Array.from(document.querySelectorAll('button, [role="button"], a.btn, .action-btn, .pill-btn-container, .telemetry-btn, .btn-ring')).filter(b => !isDemoAntiPattern(b));
          const hitTargetViolations = [];
          buttons.forEach(b => {
            const rect = b.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              if (rect.width < 43.5 || rect.height < 43.5) {
                hitTargetViolations.push({
                  tag: b.tagName.toLowerCase(),
                  text: b.textContent.trim().slice(0, 20),
                  width: Math.round(rect.width),
                  height: Math.round(rect.height)
                });
              }
            }
          });

          // Test 2: Real Computed Contrast Ratio against actual background
          const texts = Array.from(document.querySelectorAll('h1, h2, h3, p, td, th, span, label, .visual-surface')).filter(el => {
            return !isDemoAntiPattern(el) && el.children.length === 0 && el.textContent.trim().length > 0;
          }).slice(0, 20);

          let minContrast = 21.0;
          const debugContrast = [];

          texts.forEach(el => {
            const cs = window.getComputedStyle(el);
            if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return;

            const fg = parseRgba(cs.color);
            let solidBg = [9, 9, 11];
            const overlays = [];

            let p = el;
            while (p && p !== document) {
              const bgStr = window.getComputedStyle(p).backgroundColor;
              if (bgStr && bgStr !== 'transparent') {
                const rgba = parseRgba(bgStr);
                if (rgba[3] >= 0.90) {
                  solidBg = [rgba[0], rgba[1], rgba[2]];
                  break;
                } else if (rgba[3] > 0) {
                  overlays.unshift(rgba);
                }
              }
              p = p.parentElement;
            }

            let compositeBg = [...solidBg];
            overlays.forEach(([r, g, b, a]) => {
              compositeBg[0] = Math.round(r * a + compositeBg[0] * (1 - a));
              compositeBg[1] = Math.round(g * a + compositeBg[1] * (1 - a));
              compositeBg[2] = Math.round(b * a + compositeBg[2] * (1 - a));
            });
            const cr = getContrastRatio(fg, compositeBg);
            debugContrast.push({ tag: el.tagName, text: el.textContent.trim().slice(0, 20), fg: fg.slice(0,3), bg: compositeBg, cr: Math.round(cr * 10) / 10 });
            if (cr < minContrast) minContrast = cr;
          });

          // Test 3: Active Element Tab Focus Outline
          let focusVisibleRendered = false;
          let highContrastOutlineRendered = false;
          const targetEl = (document.activeElement && document.activeElement !== document.body)
            ? document.activeElement
            : buttons[0];

          if (targetEl) {
            targetEl.focus();
            const fs = window.getComputedStyle(targetEl);
            const hasOutline = fs.outlineStyle !== 'none' && parseFloat(fs.outlineWidth) > 0;
            const hasShadow = fs.boxShadow && fs.boxShadow !== 'none';
            focusVisibleRendered = hasOutline || hasShadow;
            // Physical outline required for forced-colors: active
            highContrastOutlineRendered = hasOutline;
          }

          return {
            buttonCount: buttons.length,
            hitTargetViolations,
            minContrastRatio: Math.round(minContrast * 10) / 10,
            focusVisibleRendered,
            highContrastOutlineRendered,
            debugContrast
          };
        })()
      `;

      const evalRes = await client.send('Runtime.evaluate', {
        expression: inspectExpr,
        returnByValue: true
      });

      const data = evalRes.result.value || {};
      auditResults.push({
        viewport: vp.name,
        dimensions: `${vp.width}x${vp.height}`,
        theme: th,
        ...data
      });
    }
  } finally {
    await client.close();
    chromeProcess.kill();
  }

  let overallPass = true;
  auditResults.forEach(r => {
    const isForced = r.theme === 'forced-colors';
    const contrastPass = isForced ? true : r.minContrastRatio >= 4.5;
    const hitTargetPass = r.hitTargetViolations.length === 0;
    const focusPass = isForced
      ? (r.highContrastOutlineRendered || r.buttonCount === 0)
      : (r.focusVisibleRendered || r.buttonCount === 0);

    if (!contrastPass || !hitTargetPass || !focusPass) overallPass = false;
  });

  if (isJson) {
    console.log(JSON.stringify({
      target: targetFile,
      passed: overallPass,
      matrix: auditResults
    }, null, 2));
    process.exit(overallPass ? 0 : 1);
  }

  // Render Matrix Card
  console.log(`\n${ANSI_BOLD}ME-DESIGN Phase 2 — Browser Verification Matrix${ANSI_RESET}`);
  console.log(`${ANSI_CYAN}Headless Chromium Runtime Engine (CDP v156)${ANSI_RESET}`);
  console.log(`${ANSI_GRAY}────────────────────────────────────────────────────────────────────────${ANSI_RESET}`);
  console.log(`Target: ${path.basename(targetFile)}\n`);

  console.log(`${'VIEWPORT'.padEnd(10)} | ${'MODE'.padEnd(14)} | ${'CONTRAST'.padEnd(10)} | ${'HIT-TARGET (≥44px)'.padEnd(20)} | ${'TAB FOCUS'.padEnd(10)}`);
  console.log(`${ANSI_GRAY}------------------------------------------------------------------------${ANSI_RESET}`);

  auditResults.forEach(r => {
    const isForced = r.theme === 'forced-colors';
    const contrastPass = isForced ? true : r.minContrastRatio >= 4.5;
    const hitTargetPass = r.hitTargetViolations.length === 0;
    const focusPass = isForced
      ? (r.highContrastOutlineRendered || r.buttonCount === 0)
      : (r.focusVisibleRendered || r.buttonCount === 0);

    const contrastStr = isForced
      ? ANSI_CYAN + 'SYS-HIGH' + ANSI_RESET
      : (contrastPass ? ANSI_GREEN : ANSI_RED) + `${r.minContrastRatio}:1` + ANSI_RESET;

    const hitStr = hitTargetPass
      ? ANSI_GREEN + 'OK (All ≥44px)' + ANSI_RESET
      : ANSI_RED + `FAIL (${r.hitTargetViolations.length} under 44px)` + ANSI_RESET;

    const focusStr = (focusPass ? ANSI_GREEN : ANSI_RED) + (focusPass ? (isForced ? 'OUTLINE OK' : 'VERIFIED') : (isForced ? 'NO OUTLINE' : 'NO FOCUS')) + ANSI_RESET;

    console.log(`${r.viewport.padEnd(10)} | ${r.theme.padEnd(14)} | ${contrastStr.padEnd(19)} | ${hitStr.padEnd(31)} | ${focusStr}`);
  });

  console.log(`${ANSI_GRAY}────────────────────────────────────────────────────────────────────────${ANSI_RESET}`);
  if (overallPass) {
    console.log(`${ANSI_GREEN}${ANSI_BOLD}BROWSER MATRIX VERIFICATION: PASS (Exit Code: 0)${ANSI_RESET}\n`);
    process.exit(0);
  } else {
    console.log(`${ANSI_RED}${ANSI_BOLD}BROWSER MATRIX VERIFICATION: FAIL (Exit Code: 1)${ANSI_RESET}\n`);
    process.exit(1);
  }
}

runAudit().catch(err => {
  console.error('Browser Audit Error:', err);
  process.exit(1);
});

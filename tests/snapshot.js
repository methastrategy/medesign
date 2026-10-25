#!/usr/bin/env node

/**
 * ME-DESIGN Visual Regression & Snapshot Engine
 * Headless Chromium Chrome DevTools Protocol (CDP) client over native WebSocket.
 * Zero external npm dependencies.
 * 
 * Captures pixel-accurate high-DPI rendered screenshots across viewports:
 * - Mobile (390x844, 2x DPR)
 * - Tablet (820x1180, 2x DPR)
 * - Desktop (1440x900, 2x DPR)
 * - Custom / OG Banner (1200x630)
 * 
 * Usage:
 *   node tests/snapshot.js <file> [--out <dir>] [--og] [--viewports mobile,tablet,desktop]
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
let targetFile = null;
let outDir = null;
let isOgOnly = false;
let customViewports = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out' && args[i + 1]) {
    outDir = args[++i];
  } else if (args[i] === '--og') {
    isOgOnly = true;
  } else if (args[i] === '--viewports' && args[i + 1]) {
    customViewports = args[++i].toLowerCase().split(',');
  } else if (!targetFile && !args[i].startsWith('--')) {
    targetFile = args[i];
  }
}

if (!targetFile) {
  console.log(`
${ANSI_BOLD}ME-DESIGN Snapshot Engine${ANSI_RESET}
${ANSI_GRAY}Capture pixel-accurate rendered snapshots across responsive breakpoints${ANSI_RESET}

${ANSI_BOLD}Usage:${ANSI_RESET}
  node tests/snapshot.js <file> [options]

${ANSI_BOLD}Options:${ANSI_RESET}
  --out <dir>           Output directory for PNG images (default: ./snapshots)
  --og                  Capture at 1200x630 (OpenGraph / Social Banner)
  --viewports <list>    Comma-separated list (mobile,tablet,desktop)
`);
  process.exit(1);
}

const resolvedPath = path.resolve(process.cwd(), targetFile);
if (!fs.existsSync(resolvedPath)) {
  console.error(`${ANSI_RED}Error:${ANSI_RESET} File not found: ${resolvedPath}`);
  process.exit(1);
}

const targetName = path.basename(resolvedPath, path.extname(resolvedPath));
const finalOutDir = path.resolve(process.cwd(), outDir || path.join(path.dirname(resolvedPath), 'snapshots'));
if (!fs.existsSync(finalOutDir)) {
  fs.mkdirSync(finalOutDir, { recursive: true });
}

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
  console.error(`${ANSI_RED}Error:${ANSI_RESET} Chromium/Chrome binary not found on system.`);
  process.exit(1);
}

class CDPClient {
  constructor(port) {
    this.port = port;
    this.ws = null;
    this.msgId = 0;
    this.callbacks = new Map();
  }

  async connect() {
    for (let i = 0; i < 60; i++) {
      try {
        const r = await fetch(`http://127.0.0.1:${this.port}/json/version`);
        if (r.ok) break;
      } catch (e) {}
      await new Promise(res => setTimeout(res, 100));
    }
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

async function captureSnapshots() {
  const cdpPort = 9555 + Math.floor(Math.random() * 200);
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${cdpPort}`,
    '--no-first-run',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--mute-audio',
    '--hide-scrollbars',
    '--disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--no-zygote'
  ]);

  const allPresets = isOgOnly
    ? [{ name: 'og-banner', width: 1200, height: 630, dpr: 2, isMobile: false }]
    : [
        { name: 'mobile', width: 390, height: 844, dpr: 2, isMobile: true },
        { name: 'tablet', width: 820, height: 1180, dpr: 2, isMobile: true },
        { name: 'desktop', width: 1440, height: 900, dpr: 2, isMobile: false }
      ];

  const viewports = customViewports
    ? allPresets.filter(p => customViewports.includes(p.name))
    : allPresets;

  const fileUrl = 'file:///' + resolvedPath.replace(/\\/g, '/');
  const captured = [];

  console.log(`\n${ANSI_BOLD}ME-DESIGN Snapshot Engine${ANSI_RESET}`);
  console.log(`${ANSI_CYAN}Renderer: Headless Chromium CDP (${path.basename(chromePath)})${ANSI_RESET}`);
  console.log(`${ANSI_GRAY}────────────────────────────────────────────────────────────────────────${ANSI_RESET}`);
  console.log(`Target: ${ANSI_BOLD}${path.basename(resolvedPath)}${ANSI_RESET}`);
  console.log(`Output: ${ANSI_GRAY}${finalOutDir}${ANSI_RESET}\n`);

  try {
    const client = new CDPClient(cdpPort);
    await client.connect();
    await client.send('Page.enable');
    await client.send('DOM.enable');

    for (const vp of viewports) {
      await client.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.dpr,
        mobile: vp.isMobile
      });

      await client.send('Page.navigate', { url: fileUrl });
      await new Promise(r => setTimeout(r, 450)); // Allow CSS rendering & Chart.js animations to complete

      const snap = await client.send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false
      });

      const fileName = `${targetName}-${vp.name}-${vp.width}x${vp.height}.png`;
      const filePath = path.join(finalOutDir, fileName);
      const buf = Buffer.from(snap.data, 'base64');
      fs.writeFileSync(filePath, buf);

      captured.push({
        name: vp.name,
        dimensions: `${vp.width}x${vp.height} @${vp.dpr}x`,
        size: `${Math.round(buf.length / 1024)} KB`,
        file: fileName
      });
    }

    await client.close();
  } finally {
    chromeProcess.kill();
  }

  console.log(`${'VIEWPORT'.padEnd(12)} | ${'DIMENSIONS'.padEnd(18)} | ${'FILE SIZE'.padEnd(12)} | ${'ARTIFACT'}`);
  console.log(`${ANSI_GRAY}------------------------------------------------------------------------${ANSI_RESET}`);
  captured.forEach(c => {
    console.log(`${ANSI_GREEN}${c.name.padEnd(12)}${ANSI_RESET} | ${c.dimensions.padEnd(18)} | ${c.size.padEnd(12)} | ${ANSI_BOLD}${c.file}${ANSI_RESET}`);
  });
  console.log(`${ANSI_GRAY}────────────────────────────────────────────────────────────────────────${ANSI_RESET}`);
  console.log(`${ANSI_GREEN}SUCCESS:${ANSI_RESET} ${captured.length} snapshots saved to ${finalOutDir}\n`);
}

captureSnapshots().catch(err => {
  console.error(`${ANSI_RED}Snapshot Failed:${ANSI_RESET}`, err);
  process.exit(1);
});

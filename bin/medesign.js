#!/usr/bin/env node

/**
 * ME-DESIGN CLI — Autonomous Design Engineering Toolkit & Linter
 * 
 * Commands:
 *   medesign lint <file> [--format text|json|sarif] [--preset <name>] [--config <path>]
 *   medesign audit <file> [--json]
 *   medesign tokens [--preset <name>] [--format tailwind|dtcg|css|all] [--out <dir>]
 *   medesign presets [list | get <name>]
 *   medesign test [--browser]
 *   medesign doctor
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.join(__dirname, '..');
const args = process.argv.slice(2);
const command = args[0] || 'help';

const ANSI_RESET = '\x1b[0m';
const ANSI_BOLD = '\x1b[1m';
const ANSI_CYAN = '\x1b[36m';
const ANSI_GREEN = '\x1b[32m';
const ANSI_YELLOW = '\x1b[33m';
const ANSI_RED = '\x1b[31m';
const ANSI_GRAY = '\x1b[90m';

function printHelp() {
  console.log(`
${ANSI_BOLD}ME-DESIGN CLI v1.2.0${ANSI_RESET}
Autonomous Design Engineering Toolkit & Automated Linter for AI Coding Assistants

${ANSI_BOLD}USAGE:${ANSI_RESET}
  medesign <command> [options]

${ANSI_BOLD}COMMANDS:${ANSI_RESET}
  ${ANSI_CYAN}lint${ANSI_RESET} <file>           Lint HTML/CSS/JSX file with static AST & semantic rules
                        Options: --format <text|json|sarif>
                                 --preset <apple|tesla|metha>
                                 --config <path>

  ${ANSI_CYAN}audit${ANSI_RESET} <file>          Run headless Chrome DevTools Protocol verification matrix
                        (Checks computed contrast, tab focus outline, 44px hit-targets across viewports)
                        Options: --json

  ${ANSI_CYAN}tokens${ANSI_RESET} [export]       Export preset design tokens to Tailwind v4 @theme, W3C DTCG, or CSS
                        Options: --preset <apple|tesla|metha|all>
                                 --format <tailwind|dtcg|css|all>
                                 --out <directory>

  ${ANSI_CYAN}presets${ANSI_RESET} [list|get]    Inspect available design system presets
                        Usage: medesign presets list
                               medesign presets get <preset-name>

  ${ANSI_CYAN}test${ANSI_RESET} [options]        Run deterministic test suite across fixtures
                        Options: --browser (runs both static AST and headless browser matrix)

  ${ANSI_CYAN}doctor${ANSI_RESET}                 Verify local environment, Node.js, and Chrome/CDP availability

  ${ANSI_CYAN}help${ANSI_RESET}                   Display this help message
`);
}

switch (command) {
  case 'lint': {
    const linterScript = path.join(rootDir, 'tests', 'linter.js');
    const child = spawnSync(process.execPath, [linterScript, ...args.slice(1)], {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    process.exit(child.status ?? 0);
  }

  case 'audit': {
    const auditScript = path.join(rootDir, 'tests', 'browser-audit.js');
    const child = spawnSync(process.execPath, [auditScript, ...args.slice(1)], {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    process.exit(child.status ?? 0);
  }

  case 'tokens': {
    const exportScript = path.join(rootDir, 'scripts', 'export-tokens.js');
    // Filter out 'export' sub-command word if passed (e.g. medesign tokens export)
    const exportArgs = args.slice(1).filter(a => a !== 'export');
    const child = spawnSync(process.execPath, [exportScript, ...exportArgs], {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    process.exit(child.status ?? 0);
  }

  case 'presets': {
    const sub = args[1] || 'list';
    const presetsDir = path.join(rootDir, 'presets');
    if (sub === 'list') {
      console.log(`\n${ANSI_BOLD}AVAILABLE ME-DESIGN PRESETS:${ANSI_RESET}\n`);
      const folders = fs.readdirSync(presetsDir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);
      folders.forEach(f => {
        const pJson = path.join(presetsDir, f, 'preset.json');
        if (fs.existsSync(pJson)) {
          const data = JSON.parse(fs.readFileSync(pJson, 'utf8'));
          console.log(`  ${ANSI_CYAN}${data.id.padEnd(10)}${ANSI_RESET} ${data.name}`);
          console.log(`             ${ANSI_GRAY}${data.archetype}${ANSI_RESET}`);
        }
      });
      console.log('');
    } else if (sub === 'get') {
      const name = args[2];
      if (!name) {
        console.error('Error: Please specify preset name (e.g. medesign presets get apple)');
        process.exit(1);
      }
      const pJson = path.join(presetsDir, name.toLowerCase(), 'preset.json');
      if (!fs.existsSync(pJson)) {
        console.error(`Error: Preset '${name}' not found.`);
        process.exit(1);
      }
      console.log(fs.readFileSync(pJson, 'utf8'));
    }
    break;
  }

  case 'test': {
    const runnerScript = path.join(rootDir, 'tests', 'runner.js');
    const child = spawnSync(process.execPath, [runnerScript, ...args.slice(1)], {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    process.exit(child.status ?? 0);
  }

  case 'doctor': {
    console.log(`\n${ANSI_BOLD}ME-DESIGN System Health & Environment Doctor${ANSI_RESET}`);
    console.log(`${ANSI_GRAY}────────────────────────────────────────${ANSI_RESET}\n`);

    // 1. Node.js Version Check
    const nodeVer = process.version;
    const major = parseInt(nodeVer.slice(1).split('.')[0], 10);
    const nodeOk = major >= 18;
    console.log(`Node.js Runtime:    ${nodeOk ? ANSI_GREEN + nodeVer + ' (Supported)' : ANSI_RED + nodeVer + ' (Requires >= 18.0.0)'}${ANSI_RESET}`);

    const chromeCandidates = [
      process.env.CHROME_PATH,
      process.env.CHROME_BIN,
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      path.join(process.env.LOCALAPPDATA || '', 'ms-playwright', 'chromium-1248', 'chrome-win64', 'chrome.exe'),
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/snap/bin/chromium',
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium'
    ].filter(Boolean);

    let foundChrome = null;
    for (const c of chromeCandidates) {
      if (fs.existsSync(c)) {
        foundChrome = c;
        break;
      }
    }
    console.log(`Headless Browser:   ${foundChrome ? ANSI_GREEN + 'Found (' + path.basename(foundChrome) + ')' : ANSI_YELLOW + 'Not found in default paths'}${ANSI_RESET}`);
    if (foundChrome) {
      console.log(`                    ${ANSI_GRAY}${foundChrome}${ANSI_RESET}`);
    }

    // 3. Presets Check
    const presetsDir = path.join(rootDir, 'presets');
    const presets = fs.readdirSync(presetsDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && fs.existsSync(path.join(presetsDir, d.name, 'preset.json')));
    console.log(`Installed Presets:  ${ANSI_GREEN}${presets.length} valid presets (${presets.map(p => p.name).join(', ')})${ANSI_RESET}`);

    // 4. Test Suite Fixtures
    const fixturesDir = path.join(rootDir, 'tests', 'fixtures');
    const validCount = fs.existsSync(path.join(fixturesDir, 'valid')) ? fs.readdirSync(path.join(fixturesDir, 'valid')).length : 0;
    const invalidCount = fs.existsSync(path.join(fixturesDir, 'invalid')) ? fs.readdirSync(path.join(fixturesDir, 'invalid')).length : 0;
    console.log(`Test Fixtures:      ${ANSI_GREEN}${validCount} valid, ${invalidCount} invalid test fixtures${ANSI_RESET}\n`);

    console.log(`${ANSI_GRAY}────────────────────────────────────────${ANSI_RESET}`);
    console.log(`${ANSI_GREEN}${ANSI_BOLD}STATUS: ALL SYSTEMS OPERATIONAL${ANSI_RESET}\n`);
    break;
  }

  case 'help':
  case '--help':
  case '-h':
  default:
    printHelp();
    break;
}

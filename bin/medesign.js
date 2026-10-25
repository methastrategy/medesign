#!/usr/bin/env node

/**
 * ME-DESIGN CLI — Autonomous Design Engineering Toolkit & Linter
 * 
 * Commands:
 *   medesign lint <file> [--format text|json|sarif] [--preset <name>] [--config <path>]
 *   medesign audit <file> [--json]
 *   medesign search <query> [--json]
 *   polish <file>
 *   bolder <file>
 *   quiet <file>
 *   medesign tokens [--preset <name>] [--format tailwind|dtcg|css|all] [--out <dir>]
 *   medesign presets [list | get <name>]
 *   medesign test [--browser]
 *   medesign doctor
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const pkg = require('../package.json');

const rootDir = path.join(__dirname, '..');
const rawArgs = process.argv.slice(2);
const invokedBin = path.basename(process.argv[1] || '', path.extname(process.argv[1] || '')).toLowerCase();

let args = rawArgs;
let command = rawArgs[0] || 'help';

const aliasMap = {
  mepolish: 'polish',
  mebolder: 'bolder',
  mequiet: 'quiet',
  melint: 'lint',
  mesearch: 'search',
  mesnapshot: 'snapshot'
};

if (aliasMap[invokedBin] && rawArgs[0] !== aliasMap[invokedBin]) {
  command = aliasMap[invokedBin];
  args = [command, ...rawArgs];
}

const ANSI_RESET = '\x1b[0m';
const ANSI_BOLD = '\x1b[1m';
const ANSI_CYAN = '\x1b[36m';
const ANSI_GREEN = '\x1b[32m';
const ANSI_YELLOW = '\x1b[33m';
const ANSI_RED = '\x1b[31m';
const ANSI_GRAY = '\x1b[90m';

function printHelp() {
  console.log(`
${ANSI_BOLD}ME-DESIGN CLI v${pkg.version}${ANSI_RESET}
Autonomous Design Engineering Toolkit & Automated Linter for AI Coding Assistants

${ANSI_BOLD}USAGE:${ANSI_RESET}
  medesign <command> [options]

${ANSI_BOLD}COMMANDS:${ANSI_RESET}
  ${ANSI_CYAN}search${ANSI_RESET} <query>         Search 38 Archetypes & presets with discovery engine
                        Options: --json

  ${ANSI_CYAN}polish${ANSI_RESET} <file>          Self-healing repair for Hard Invariants (MD005, MD104, em-dash)

  ${ANSI_CYAN}bolder${ANSI_RESET} <file>          Boost visual density, font weights, and border contrast

  ${ANSI_CYAN}quiet${ANSI_RESET} <file>           Softens visual density, font weights, and border treatments

  ${ANSI_CYAN}lint${ANSI_RESET} <file>            Lint HTML/CSS/JSX file with static AST & semantic rules
                        Options: --format <text|json|sarif>
                                 --preset <apple|tesla|metha>
                                 --config <path>

  ${ANSI_CYAN}audit${ANSI_RESET} <file>           Run headless Chrome DevTools Protocol verification matrix
                        (Checks computed contrast, tab focus outline, 44px hit-targets across viewports)
                        Options: --json

  ${ANSI_CYAN}snapshot${ANSI_RESET} <file>        Capture high-DPI rendered screenshots across responsive viewports
                        Options: --out <dir>, --og (1200x630 banner), --viewports <list>

  ${ANSI_CYAN}tokens${ANSI_RESET} [export]        Export preset design tokens to Tailwind v4 @theme, W3C DTCG, or CSS
                        Options: --preset <apple|tesla|metha|all>
                                 --format <tailwind|dtcg|css|all>
                                 --out <directory>

  ${ANSI_CYAN}presets${ANSI_RESET} [list|get]     Inspect available design system presets
                        Usage: medesign presets list
                               medesign presets get <preset-name>

  ${ANSI_CYAN}test${ANSI_RESET} [options]         Run deterministic test suite across fixtures
                        Options: --browser (runs both static pattern and headless browser matrix)

  ${ANSI_CYAN}doctor${ANSI_RESET}                  Verify local environment, Node.js, and Chrome/CDP availability

  ${ANSI_CYAN}help${ANSI_RESET}                    Display this help message
`);
}

switch (command) {
  case 'search': {
    const isJson = args.includes('--json');
    const isHelp = args.includes('--help') || args.includes('-h');
    const query = args.slice(1).filter(a => !a.startsWith('--') && a !== '-h').join(' ').trim();

    if (!query || isHelp) {
      if (isJson) {
        console.log(JSON.stringify({ usage: 'medesign search <query> [--json]' }));
      } else {
        console.log(`\n${ANSI_BOLD}ME-DESIGN Search Engine${ANSI_RESET}`);
        console.log(`${ANSI_GRAY}Instant discovery across 38 Archetypes & system presets${ANSI_RESET}\n`);
        console.log(`${ANSI_BOLD}Usage:${ANSI_RESET} medesign search "<query>" [--json]`);
        console.log(`       mesearch "<query>" [--json]\n`);
        console.log(`Example: medesign search "cadastre survey"\n`);
      }
      process.exit(isHelp ? 0 : 1);
    }

    const catalogPath = path.join(rootDir, 'references', 'catalog.json');
    if (!fs.existsSync(catalogPath)) {
      console.error('Error: references/catalog.json not found.');
      process.exit(1);
    }
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

    const presetsDir = path.join(rootDir, 'presets');
    const presetFolders = fs.existsSync(presetsDir)
      ? fs.readdirSync(presetsDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
      : [];
    const presets = [];
    presetFolders.forEach(name => {
      const pPath = path.join(presetsDir, name, 'preset.json');
      if (fs.existsSync(pPath)) {
        try {
          presets.push(JSON.parse(fs.readFileSync(pPath, 'utf8')));
        } catch (e) {}
      }
    });

    const queryTerms = query.toLowerCase().split(/[\s,+/]+/).filter(Boolean);

    // Score archetypes based on query relevance
    const scored = catalog.archetypes.map(arch => {
      let score = 0;
      const nameLower = (arch.name || '').toLowerCase();
      const titleLower = (arch.archetypeTitle || '').toLowerCase();
      const groupLower = (arch.group || '').toLowerCase();
      const vibeLower = (arch.vibe || '').toLowerCase();
      const spatialLower = (arch.spatialModel || '').toLowerCase();
      const colorLower = (arch.primaryColor || '').toLowerCase();
      const typoLower = (arch.typography || '').toLowerCase();
      const keywords = (arch.keywords || []).map(k => k.toLowerCase());
      const presetId = (arch.presetId || '').toLowerCase();
      const presetLink = (arch.presetLink || '').toLowerCase();

      // Check entire query phrase match
      const qLower = query.toLowerCase();
      if (nameLower.includes(qLower) || titleLower.includes(qLower)) {
        score += 40;
      }

      let titleTermsMatched = 0;
      queryTerms.forEach(term => {
        const stem = term.length > 4 ? term.replace(/(?:al|ic|ing|e|s)$/i, '') : term;
        // Name / Title match
        if (nameLower.includes(term) || titleLower.includes(term)) {
          score += 20;
          titleTermsMatched++;
        } else if (stem.length >= 4 && (nameLower.includes(stem) || titleLower.includes(stem))) {
          score += 16;
          titleTermsMatched++;
        }
        // Keywords exact or substring match
        keywords.forEach(kw => {
          if (kw === term) score += 15;
          else if (kw.includes(term) || term.includes(kw)) score += 10;
          else if (stem.length >= 4 && (kw.includes(stem) || stem.includes(kw))) score += 8;
        });
        // Vibe match
        if (vibeLower.includes(term) || (stem.length >= 4 && vibeLower.includes(stem))) score += 6;
        // Spatial / color / typography / group match
        if (spatialLower.includes(term)) score += 5;
        if (colorLower.includes(term)) score += 5;
        if (typoLower.includes(term)) score += 5;
        if (groupLower.includes(term)) score += 4;
        // Preset id / link match
        if (presetId.includes(term) || presetLink.includes(term)) score += 12;
      });

      // Bonus if multiple query terms directly match the title
      if (titleTermsMatched > 1) {
        score += titleTermsMatched * 15;
      }

      // Match against presets definitions
      presets.forEach(p => {
        const pName = (p.name || '').toLowerCase();
        const pDesc = (p.description || '').toLowerCase();
        const pId = (p.id || '').toLowerCase();
        const pArch = (p.archetype || '').toLowerCase();
        let presetMatches = false;
        queryTerms.forEach(term => {
          if (pName.includes(term) || pDesc.includes(term) || pId === term || pArch.includes(term)) {
            presetMatches = true;
          }
        });
        if (presetMatches && (arch.presetId === p.id || (arch.presetLink && arch.presetLink.includes(p.id)))) {
          score += 25;
        }
      });

      return { ...arch, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const best = scored[0] || catalog.archetypes[0];

    if (isJson) {
      console.log(JSON.stringify({
        query,
        bestMatch: {
          id: best.id,
          number: best.number,
          name: best.name,
          archetypeTitle: best.archetypeTitle,
          group: best.group,
          presetLink: best.presetLink,
          spatialModel: best.spatialModel,
          primaryColor: best.primaryColor,
          secondaryColor: best.secondaryColor,
          surfaceContrast: best.surfaceContrast,
          typography: best.typography,
          motionProfile: best.motionProfile,
          score: best.score
        },
        topMatches: scored.slice(0, 5).map(a => ({
          number: a.number,
          name: a.name,
          score: a.score,
          presetLink: a.presetLink
        }))
      }, null, 2));
      process.exit(0);
    }

    console.log(`
${ANSI_BOLD}ME-DESIGN Discovery Engine${ANSI_RESET}
${ANSI_GRAY}────────────────────────────────────────${ANSI_RESET}
${ANSI_BOLD}Query${ANSI_RESET}               "${ANSI_CYAN}${query}${ANSI_RESET}"
${ANSI_BOLD}Best Match${ANSI_RESET}          Archetype ${best.number < 10 ? '0' + best.number : best.number}: ${ANSI_GREEN}${ANSI_BOLD}${best.name}${ANSI_RESET}
${ANSI_BOLD}Preset Link${ANSI_RESET}         ${best.presetLink ? ANSI_CYAN + best.presetLink + ANSI_RESET : ANSI_GRAY + 'Standard Catalog' + ANSI_RESET}

${ANSI_BOLD}DESIGN ARCHETYPE RECOMMENDATION${ANSI_RESET}
  ${ANSI_BOLD}Archetype${ANSI_RESET}         ${best.archetypeTitle || best.name}
  ${ANSI_BOLD}Spatial Model${ANSI_RESET}     ${best.spatialModel || '16:10 / 100dvh Map-Centric with Split Data Grid'}
  ${ANSI_BOLD}Primary Color${ANSI_RESET}     ${best.primaryColor || 'Electric Cyan (oklch(0.85 0.18 200))'}
  ${ANSI_BOLD}Secondary Color${ANSI_RESET}   ${best.secondaryColor || 'Passed Emerald (oklch(0.72 0.18 145))'}
  ${ANSI_BOLD}Surface Contrast${ANSI_RESET}  ${best.surfaceContrast || 'Ultra-Dark Obsidian (#0a0d14)'}
  ${ANSI_BOLD}Typography${ANSI_RESET}        ${best.typography || 'JetBrains Mono + IBM Plex Sans Thai'}
  ${ANSI_BOLD}Motion Profile${ANSI_RESET}    ${best.motionProfile || 'Precision Linear (120ms max)'}
${ANSI_GRAY}────────────────────────────────────────${ANSI_RESET}
`);
    break;
  }

  case 'polish': {
    const isHelp = args.includes('--help') || args.includes('-h');
    const dryRun = args.includes('--dry-run');
    const targetFile = args.slice(1).find(a => !a.startsWith('--'));

    if (!targetFile || isHelp) {
      console.log(`
${ANSI_BOLD}ME-DESIGN Self-Healing Polish & Aesthetic Auto-Compiler${ANSI_RESET}
${ANSI_GRAY}Autonomous aesthetic compilation and self-healing repair engine${ANSI_RESET}

${ANSI_BOLD}Usage:${ANSI_RESET}
  medesign polish <file> [options]
  mepolish <file> [options]

${ANSI_BOLD}Options:${ANSI_RESET}
  --dry-run       Preview potential repairs without modifying files on disk

${ANSI_BOLD}Repairs & Aesthetic Compilations:${ANSI_RESET}
  - Elevates generic typography to curated Archetypes (Geist / Plus Jakarta Sans / JetBrains Mono)
  - Injects GPU-accelerated spring micro-interactions (160ms cubic-bezier(0.16, 1, 0.3, 1))
  - Injects dynamic Bento proportions & asymmetric visual hierarchy
  - Decouples 44px hit-targets with transparent touch halos & boundary clearance (MD106)
  - Normalizes color gamut to perceptual OKLCH interpolation (MD102)
  - Replaces hit-target crushing scale with controlled proportional scale (MD003)
  - Injects physical :focus-visible outline & forced-colors high contrast (MD005)
  - Replaces raw 100vh with dynamic 100dvh fallback (MD104)
  - Fixes dead buttons with interactive hover/active states (MD004)
  - Injects prefers-reduced-motion accessibility gate (MD002)
  - Cleans HTML entity and unicode em-dashes to hyphens (MD201)
`);
      process.exit(isHelp ? 0 : 1);
    }
    const resolvedPath = path.resolve(process.cwd(), targetFile);
    if (!fs.existsSync(resolvedPath)) {
      console.error(`${ANSI_RED}Error:${ANSI_RESET} File not found: ${resolvedPath}`);
      process.exit(1);
    }

    const linterScript = path.join(rootDir, 'tests', 'linter.js');
    let beforeQ = 80.0;
    try {
      const beforeRes = spawnSync(process.execPath, [linterScript, resolvedPath, '--json'], { encoding: 'utf8' });
      const parsed = JSON.parse(beforeRes.stdout);
      beforeQ = parsed.qScore || 80.0;
    } catch (e) {}

    let content = fs.readFileSync(resolvedPath, 'utf8');
    const fixes = [];

    const getClean = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/<!--[\s\S]*?-->/g, '');

    const isHtml = /<html|<body|<!DOCTYPE|<\/head>/i.test(content);
    if (isHtml && !/<style\b/i.test(content)) {
      if (content.includes('</head>')) {
        content = content.replace('</head>', '  <style>\n  </style>\n</head>');
      } else if (content.includes('<body>')) {
        content = content.replace('<body>', '<head>\n  <style>\n  </style>\n</head>\n<body>');
      } else {
        content = '<style>\n</style>\n' + content;
      }
    }

    // 1. RULE MD104: Dynamic Viewport Units (Convert raw 100vh to 100dvh fallback)
    let count104 = 0;
    content = content.replace(/min-height\s*:\s*100vh\s*;?(?!\s*min-height\s*:\s*100[ds]vh)/gi, () => {
      count104++;
      return 'min-height: 100vh; min-height: 100dvh;';
    });
    content = content.replace(/(?<!min-)(?<!max-)height\s*:\s*100vh\s*;?(?!\s*(?:min-height|height)\s*:\s*100[ds]vh)/gi, () => {
      count104++;
      return 'min-height: 100vh; min-height: 100dvh;';
    });
    content = content.replace(/max-height\s*:\s*100vh\s*;?(?!\s*max-height\s*:\s*100[ds]vh)/gi, () => {
      count104++;
      return 'max-height: 100vh; max-height: 100dvh;';
    });
    if (count104 > 0) {
      fixes.push(`Replaced ${count104} raw 100vh with 100dvh fallback (MD104)`);
    }

    // 2. RULE MD005: Focus Ring High Contrast & Physical Outline Visibility
    const focusBlockRegex = /((?:[a-zA-Z0-9_\-\.\#\:\*\,\[\]\="'>\s]+)?:focus(?:-visible)?\s*\{)([^}]+)(\})/gi;
    let md005Applied = false;
    content = content.replace(focusBlockRegex, (match, prefix, body, suffix) => {
      let updatedBody = body;
      if (/outline\s*:\s*(?:none|0px?)\s*(?:;|\})/i.test(updatedBody)) {
        updatedBody = updatedBody.replace(/outline\s*:\s*(?:none|0px?)\s*;?/gi, 'outline: 2px solid Highlight; outline-offset: 2px;');
        md005Applied = true;
      } else if (/box-shadow\s*:/i.test(updatedBody) && !/outline\s*:\s*(?!none|0px?)/i.test(updatedBody)) {
        updatedBody += ' outline: 2px solid Highlight; outline-offset: 2px;';
        md005Applied = true;
      }
      return prefix + updatedBody + suffix;
    });

    // Ensure forced-colors high contrast outline media query is injected
    if (!/@media\s*\(forced-colors:\s*active\)/i.test(getClean(content))) {
      const forcedColorsRule = `\n    @media (forced-colors: active) {\n      :focus-visible, button:focus-visible, [class*="btn"]:focus-visible, a:focus-visible, [role="button"]:focus-visible {\n        outline: 2px solid CanvasText !important;\n        outline-offset: 2px !important;\n      }\n    }\n`;
      if (content.includes('</style>')) {
        content = content.replace('</style>', `${forcedColorsRule}  </style>`);
        md005Applied = true;
      } else if (resolvedPath.endsWith('.css') || !isHtml) {
        content = content.trimEnd() + '\n' + forcedColorsRule;
        md005Applied = true;
      }
    }
    if (md005Applied) {
      fixes.push('Added physical focus outline & forced-colors high contrast (MD005)');
    }

    // 3. RULE MD003: Uncontrolled Button Scale / Hit Target Crush
    let count003 = 0;
    if (/active:scale-9[0-5]/.test(content)) {
      content = content.replace(/active:scale-9[0-5]/g, 'active:scale-98');
      count003++;
    }
    if (/:active\s*\{[^}]*transform:\s*scale\(0\.9[0-5]\)/.test(content)) {
      content = content.replace(/(transform\s*:\s*scale\()0\.9[0-5](\))/gi, '$10.98$2');
      count003++;
    }
    if (count003 > 0) {
      fixes.push('Replaced hit-target crushing active scale with safe proportional scale(0.98) (MD003)');
    }

    // 4. RULE MD004: Interactive State Contract & Micro-Interaction Springs
    const cleanForButtons = getClean(content);
    const hasButtons = /<button/i.test(cleanForButtons) || /class="[^"]*btn[^"]*"/i.test(cleanForButtons) || /\.btn\b/i.test(cleanForButtons) || /role="button"/i.test(cleanForButtons);
    const hasInteractive = /:hover/i.test(cleanForButtons) || /:active/i.test(cleanForButtons);
    if (hasButtons && !hasInteractive) {
      const buttonStates = `\n    button, [class*="btn"], .btn, [role="button"] {\n      min-height: 44px;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 160ms cubic-bezier(0.16, 1, 0.3, 1), filter 160ms cubic-bezier(0.16, 1, 0.3, 1);\n    }\n    button:hover, [class*="btn"]:hover, .btn:hover, [role="button"]:hover {\n      filter: brightness(1.1);\n      transform: translateY(-1px);\n    }\n    button:active, [class*="btn"]:active, .btn:active, [role="button"]:active {\n      transform: scale(0.98);\n    }\n    button:focus-visible, [class*="btn"]:focus-visible, .btn:focus-visible, [role="button"]:focus-visible {\n      outline: 2px solid Highlight;\n      outline-offset: 2px;\n    }\n`;
      if (content.includes('</style>')) {
        content = content.replace('</style>', `${buttonStates}  </style>`);
        fixes.push('Injected hover and active interactive states for buttons (MD004)');
      } else if (resolvedPath.endsWith('.css') || !isHtml) {
        content = content.trimEnd() + '\n' + buttonStates;
        fixes.push('Injected hover and active interactive states for buttons (MD004)');
      }
    } else if (hasButtons && !content.includes('min-height: 44px')) {
      const hitTargetFix = `\n    /* 44px Touch Target Standard (Apple HIG / WCAG) */\n    button, [class*="btn"], .btn, [role="button"] { min-height: 44px; }\n`;
      if (content.includes('</style>')) {
        content = content.replace('</style>', `${hitTargetFix}  </style>`);
        fixes.push('Enforced 44px minimum touch hit-target standard on buttons');
      } else if (resolvedPath.endsWith('.css') || !isHtml) {
        content = content.trimEnd() + '\n' + hitTargetFix;
        fixes.push('Enforced 44px minimum touch hit-target standard on buttons');
      }
    }

    // Micro-Interaction Springs (GPU-accelerated 160ms cubic-bezier transitions)
    if (!content.includes('cubic-bezier(0.16, 1, 0.3, 1)')) {
      const springBlock = `\n    /* Micro-Interaction Springs (160ms cubic-bezier) */\n    button, [class*="btn"], .btn, [role="button"], .card, [class*="card"], .interactive-surface {\n      transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 160ms cubic-bezier(0.16, 1, 0.3, 1), filter 160ms cubic-bezier(0.16, 1, 0.3, 1);\n    }\n    .card:hover, [class*="card"]:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.3);\n    }\n`;
      if (content.includes('</style>')) {
        content = content.replace('</style>', `${springBlock}  </style>`);
        fixes.push('Injected GPU-accelerated spring micro-interactions (160ms cubic-bezier(0.16, 1, 0.3, 1))');
      } else if (resolvedPath.endsWith('.css') || !isHtml) {
        content = content.trimEnd() + '\n' + springBlock;
        fixes.push('Injected GPU-accelerated spring micro-interactions (160ms cubic-bezier(0.16, 1, 0.3, 1))');
      }
    }

    // 5. RULE MD002: Reduced Motion Compliance
    const cleanForMotion = getClean(content);
    const hasAnimations = /animation:|transition:/i.test(cleanForMotion) && !/transition:\s*none/i.test(cleanForMotion);
    const hasReducedMotion = /prefers-reduced-motion/i.test(cleanForMotion);
    if (hasAnimations && !hasReducedMotion) {
      const reducedMotionBlock = `\n    @media (prefers-reduced-motion: reduce) {\n      *, *::before, *::after {\n        animation-duration: 0.01ms !important;\n        animation-iteration-count: 1 !important;\n        transition-duration: 0.01ms !important;\n      }\n    }\n`;
      if (content.includes('</style>')) {
        content = content.replace('</style>', `${reducedMotionBlock}  </style>`);
        fixes.push('Added prefers-reduced-motion accessibility gate (MD002)');
      } else if (resolvedPath.endsWith('.css') || !isHtml) {
        content = content.trimEnd() + '\n' + reducedMotionBlock;
        fixes.push('Added prefers-reduced-motion accessibility gate (MD002)');
      }
    }

    // 6. Anti-AI Tells: Em-Dash / En-Dash & HTML Entities Cleanup (MD201)
    const emDashRegex = /\s*(?:[—–]|&mdash;|&ndash;|&#8212;|&#8211;|&#x2014;|&#x2013;)\s*/g;
    const emDashMatches = content.match(emDashRegex);
    if (emDashMatches && emDashMatches.length > 0) {
      const count = emDashMatches.length;
      content = content.replace(emDashRegex, ' - ');
      fixes.push(`Cleaned ${count} AI-tell em-dash punctuation & entities`);
    }

    // 7. Typography Elevation (Generic Fonts -> Curated Archetype Pairings: Geist / Plus Jakarta Sans / JetBrains Mono)
    let countTypo = 0;
    const genericSansRegex = /font-family\s*:\s*(?:['"]?(?:Inter|Arial|Helvetica Neue|Helvetica|Roboto|Open Sans)['"]?|system-ui|-apple-system|BlinkMacSystemFont|['"]?Segoe UI['"]?)(?:\s*,\s*(?:sans-serif|system-ui|-apple-system|BlinkMacSystemFont|['"]?(?:Segoe UI|Roboto|Oxygen|Ubuntu|Cantarell|Open Sans|Helvetica Neue|Helvetica|Arial)['"]?|['"][^'"]+['"]|sans-serif))*\s*;?/gi;
    if (genericSansRegex.test(content)) {
      content = content.replace(genericSansRegex, () => {
        countTypo++;
        return "font-family: 'Geist', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;";
      });
    }
    const varSansRegex = /(--font-sans\s*:\s*)(?:['"]?(?:Inter|Arial|Helvetica Neue|Helvetica|Roboto|Open Sans)['"]?|system-ui|-apple-system|BlinkMacSystemFont|['"]?Segoe UI['"]?)[^;]*;/gi;
    if (varSansRegex.test(content)) {
      content = content.replace(varSansRegex, () => {
        countTypo++;
        return "--font-sans: 'Geist', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;";
      });
    }
    const genericMonoRegex = /font-family\s*:\s*(?:['"]?(?:Courier New|Courier|Consolas|Menlo|Monaco)['"]?|monospace|ui-monospace|SFMono-Regular)(?:\s*,\s*[^;}]*)*\s*;?/gi;
    if (genericMonoRegex.test(content)) {
      content = content.replace(genericMonoRegex, () => {
        countTypo++;
        return "font-family: 'JetBrains Mono', 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;";
      });
    }
    const varMonoRegex = /(--font-mono\s*:\s*)(?:['"]?(?:Courier New|Courier|Consolas|Menlo|Monaco)['"]?|monospace|ui-monospace|SFMono-Regular)[^;]*;/gi;
    if (varMonoRegex.test(content)) {
      content = content.replace(varMonoRegex, () => {
        countTypo++;
        return "--font-mono: 'JetBrains Mono', 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;";
      });
    }
    if (countTypo > 0) {
      if (content.includes('</head>') && !content.includes('fonts.googleapis.com/css2?family=Geist')) {
        const fontPreconnect = `    <link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Geist:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">\n  `;
        content = content.replace('</head>', `${fontPreconnect}</head>`);
      } else if ((resolvedPath.endsWith('.css') || !isHtml) && !content.includes('fonts.googleapis.com')) {
        const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Geist:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');\n`;
        content = fontImport + content;
      }
      fixes.push('Elevated generic typography to curated Archetype pairings (Geist / Plus Jakarta Sans / JetBrains Mono)');
    }

    // 8. Dynamic Bento Proportions (Asymmetric Visual Hierarchy)
    let countBento = 0;
    const gridContainerRegex = /(<(?:div|section|main|ul)\s+[^>]*\b(?:grid\b|bento-grid\b)[^>]*>[\s\S]*?)(<(?:div|article|section|li)\s+class=")([^"]*\bcard\b[^"]*)(")/i;
    if (gridContainerRegex.test(content) && !/\bcol-span-/i.test(content)) {
      content = content.replace(gridContainerRegex, (match, beforeCard, cardOpen, classNames, cardClose) => {
        if (!classNames.includes('bento-featured') && !classNames.includes('col-span-')) {
          countBento++;
          return `${beforeCard}${cardOpen}${classNames} col-span-2 md:col-span-2 bento-featured${cardClose}`;
        }
        return match;
      });
    }

    const hasBentoCss = /\.bento-featured\b|\.bento-grid\b/.test(getClean(content)) && content.includes('grid-column: span 2');
    if (!hasBentoCss) {
      const bentoCss = `\n    /* Dynamic Bento Asymmetric Grid Proportions */\n    @media (min-width: 768px) {\n      .bento-grid > :first-child, .grid > .bento-featured, [class*="grid"] > .bento-featured { grid-column: span 2; }\n    }\n`;
      if (content.includes('</style>')) {
        content = content.replace('</style>', `${bentoCss}  </style>`);
        countBento++;
      } else if (resolvedPath.endsWith('.css') || !isHtml) {
        content = content.trimEnd() + '\n' + bentoCss;
        countBento++;
      }
    }
    if (countBento > 0) {
      fixes.push('Injected dynamic Bento grid proportions (asymmetric visual hierarchy & featured spans)');
    }

    // 9. RULE MD106: Container Optical Padding & Slider Boundary Clearance
    let count106 = 0;
    const sliderBlockRegex = /((?:[a-zA-Z0-9_\-\.\#\:\*\,\[\]\="'>\s]+)?(?:slider|progress|scrubber|pill-track)\s*\{)([^}]+)(\})/gi;
    content = content.replace(sliderBlockRegex, (match, prefix, body, suffix) => {
      const hasPillRadius = /border-radius\s*:\s*(?:var\(--radius-full\)|9999px|50%|[1-9]\d{1,}px)/i.test(body);
      const hasVisibleBg = /background(?:-color)?\s*:\s*(?!none|transparent\b|rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\))/i.test(body);
      const hasMinHeight = /(?:min-)?height\s*:\s*(?:[3-9]\dpx|44px)/i.test(body);
      const hasPadding = /padding(?:-inline|-left|-right)?\s*:\s*(?:[^;}]*?(?:[8-9]px|[1-9]\d+px|var\(--padding))/i.test(body);
      if (hasPillRadius && hasVisibleBg && hasMinHeight && !hasPadding) {
        count106++;
        const updatedBody = body.trimEnd() + ' padding: 0 12px;';
        return prefix + updatedBody + ' ' + suffix;
      }
      return match;
    });

    // Decouple 44px hit-target with transparent touch halo helper
    if (!content.includes('.touch-halo') && !content.includes('.hit-target-decoupled')) {
      const haloCss = `\n    /* MD106 Decoupled Touch Halo */\n    .touch-halo {\n      min-height: 44px;\n      min-width: 44px;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      background: transparent !important;\n      padding: 0 12px;\n    }\n`;
      if (content.includes('</style>')) {
        content = content.replace('</style>', `${haloCss}  </style>`);
        count106++;
      } else if (resolvedPath.endsWith('.css') || !isHtml) {
        content = content.trimEnd() + '\n' + haloCss;
        count106++;
      }
    }
    if (count106 > 0) {
      fixes.push('Decoupled 44px touch hit-target with transparent halo and >=12px boundary clearance (MD106)');
    }

    // 10. RULE MD102: Perceptual Color Gamut Normalizer (linear-gradient in oklch)
    let count102 = 0;
    const gradientDirectionRegex = /linear-gradient\(\s*(?!in\s+(?:oklch|oklab)\b)(?:(-?\d+(?:\.\d+)?(?:deg|turn|rad|grad)|to\s+[a-zA-Z\s]+),)?\s*/gi;
    content = content.replace(gradientDirectionRegex, (m, direction) => {
      count102++;
      if (direction) {
        return `linear-gradient(in oklch ${direction.trim()}, `;
      }
      return 'linear-gradient(in oklch, ';
    });
    content = content.replace(/radial-gradient\(\s*(?!in\s+(?:oklch|oklab)\b)/gi, () => {
      count102++;
      return 'radial-gradient(in oklch, ';
    });
    content = content.replace(/conic-gradient\(\s*(?!in\s+(?:oklch|oklab)\b)/gi, () => {
      count102++;
      return 'conic-gradient(in oklch, ';
    });
    if (count102 > 0) {
      fixes.push('Normalized color gamut to perceptual OKLCH interpolation space (MD102)');
    }

    // 11. RULE MD103: Concentric Radius Math Helper
    let count103 = 0;
    const hasOuterRadius = /border-radius:\s*\d+px/i.test(content);
    const hasInnerConcentric = /max\(\s*0px/i.test(content) || /calc\(infinity/i.test(content) || /--corner-r/i.test(content);
    if (hasOuterRadius && !hasInnerConcentric) {
      const concentricRule = `\n    /* MD103 Safe Concentric Radius Formula */\n    :root { --radius-inner: max(0px, var(--radius-outer, 16px) - 1px - 8px); }\n`;
      if (content.includes('</style>')) {
        content = content.replace('</style>', `${concentricRule}  </style>`);
        count103++;
      } else if (resolvedPath.endsWith('.css') || !isHtml) {
        content = content.trimEnd() + '\n' + concentricRule;
        count103++;
      }
    }
    if (count103 > 0) {
      fixes.push('Injected safe concentric radius formula max(0px, r_outer - border_w - pad) (MD103)');
    }

    if (dryRun) {
      console.log(`\n${ANSI_YELLOW}${ANSI_BOLD}[POLISH DRY-RUN PREVIEW]${ANSI_RESET} ${fixes.length} potential repairs identified for ${ANSI_CYAN}${path.basename(resolvedPath)}${ANSI_RESET}`);
      fixes.forEach(f => console.log(`  ${ANSI_CYAN}Preview:${ANSI_RESET} ${f}`));
      console.log(`\n${ANSI_GRAY}Dry-run mode: Target file was not modified on disk.${ANSI_RESET}\n`);
      process.exit(0);
    }

    fs.writeFileSync(resolvedPath, content, 'utf8');

    let afterQ = beforeQ;
    let isPassed = true;
    let hardFailures = [];
    try {
      const afterRes = spawnSync(process.execPath, [linterScript, resolvedPath, '--json'], { encoding: 'utf8' });
      const parsed = JSON.parse(afterRes.stdout);
      afterQ = parsed.qScore !== undefined ? parsed.qScore : beforeQ;
      isPassed = parsed.passed !== undefined ? parsed.passed : (afterQ >= 75);
      hardFailures = parsed.hardFailures || [];
    } catch (e) {}

    const statusBadge = isPassed ? `${ANSI_GREEN}PASS${ANSI_RESET}` : `${ANSI_RED}FAIL${ANSI_RESET}`;
    console.log(`\n${ANSI_GREEN}${ANSI_BOLD}[POLISH COMPLETED]${ANSI_RESET} ${fixes.length} issues automatically repaired in ${ANSI_CYAN}${path.basename(resolvedPath)}${ANSI_RESET}`);
    fixes.forEach(f => console.log(`  ${ANSI_GREEN}Fixed:${ANSI_RESET} ${f}`));
    console.log(`${ANSI_BOLD}Q-Score:${ANSI_RESET} ${beforeQ.toFixed(1)} -> ${ANSI_GREEN}${ANSI_BOLD}${afterQ.toFixed(1)}${ANSI_RESET} [${statusBadge}]\n`);

    if (!isPassed) {
      console.error(`${ANSI_RED}${ANSI_BOLD}[GATE REJECTED]${ANSI_RESET} File still contains unresolved violations after auto-repair:`);
      if (hardFailures.length > 0) {
        const failureNames = hardFailures.map(f => typeof f === 'string' ? f : `${f.ruleId} (${f.ruleName || 'Violation'})`).join(', ');
        console.error(`  ${ANSI_RED}Hard Invariant Failures:${ANSI_RESET} ${failureNames}`);
      }
      process.exit(1);
    }

    process.exit(0);
  }

  case 'bolder': {
    const targetFile = args[1];
    if (!targetFile || targetFile === '--help' || targetFile === '-h') {
      console.log(`
${ANSI_BOLD}ME-DESIGN Bolder Modifier${ANSI_RESET}
${ANSI_GRAY}Elevate visual density, typography weights, and color saturation${ANSI_RESET}

${ANSI_BOLD}Usage:${ANSI_RESET}
  medesign bolder <file>
  mebolder <file>

${ANSI_BOLD}Modifications:${ANSI_RESET}
  - Elevates font weights: normal/400 -> 600, medium/500 -> 700
  - Deepens subtle translucent borders (border-white/10 -> border-white/20)
  - Boosts OKLCH chroma by ~25%
`);
      process.exit(targetFile === '--help' || targetFile === '-h' ? 0 : 1);
    }
    const resolvedPath = path.resolve(process.cwd(), targetFile);
    if (!fs.existsSync(resolvedPath)) {
      console.error(`${ANSI_RED}Error:${ANSI_RESET} File not found: ${resolvedPath}`);
      process.exit(1);
    }

    let content = fs.readFileSync(resolvedPath, 'utf8');
    let fontCount = 0;
    let borderCount = 0;
    let accentCount = 0;

    // 1. Single-pass atomic elevation of font weights (prevents cascading replacement)
    const bolderFontMap = {
      'font-normal': 'font-medium',
      'font-medium': 'font-semibold',
      'font-semibold': 'font-bold'
    };
    content = content.replace(/\b(font-normal|font-medium|font-semibold)\b/g, (m) => {
      fontCount++;
      return bolderFontMap[m] || m;
    });

    content = content.replace(/font-weight\s*:\s*(400|500|normal)\b/gi, (match, val) => {
      fontCount++;
      if (val === '400' || val.toLowerCase() === 'normal') return 'font-weight: 600';
      if (val === '500') return 'font-weight: 700';
      return match;
    });

    // 2. Deepen border contrast & opacity (single pass)
    const bolderBorderMap = {
      'border-white/10': 'border-white/20',
      'border-white/5': 'border-white/15',
      'border-neutral-200': 'border-neutral-400',
      'border-gray-200': 'border-gray-400'
    };
    content = content.replace(/\b(border-white\/10|border-white\/5|border-neutral-200|border-gray-200)\b/g, (m) => {
      borderCount++;
      return bolderBorderMap[m] || m;
    });

    content = content.replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.0[5-8]\s*\)/gi, () => { borderCount++; return 'rgba(255, 255, 255, 0.18)'; });
    content = content.replace(/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.0[5-8]\s*\)/gi, () => { borderCount++; return 'rgba(0, 0, 0, 0.18)'; });

    // 3. Boost Accent Saturation & Vibrancy
    // OKLCH chroma boost (increase C by ~25% for chromatic colors C >= 0.04)
    content = content.replace(/oklch\(\s*([\d\.]+)\s+([\d\.]+)(\s+[\d\.]+(?:\s*(?:\/|\s)\s*[\d\.\%]+)?)\s*\)/gi, (match, l, c, rest) => {
      const cVal = parseFloat(c);
      if (cVal >= 0.04) {
        accentCount++;
        const boostedC = Math.min(0.35, parseFloat((cVal * 1.25).toFixed(3)));
        return `oklch(${l} ${boostedC}${rest})`;
      }
      return match;
    });

    // HSL saturation boost (+15% saturation)
    content = content.replace(/hsl\(\s*([\d\.]+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*\)/gi, (match, h, s, l) => {
      const sVal = parseFloat(s);
      if (sVal > 0 && sVal <= 85) {
        accentCount++;
        const boostedS = Math.min(100, Math.round(sVal + 15));
        return `hsl(${h}, ${boostedS}%, ${l}%)`;
      }
      return match;
    });

    // Tailwind accent vibrancy elevation
    const bolderTailwindMap = {
      'saturate-50': 'saturate-100',
      'saturate-100': 'saturate-150'
    };
    content = content.replace(/\b(saturate-50|saturate-100)\b/g, (m) => {
      accentCount++;
      return bolderTailwindMap[m] || m;
    });
    content = content.replace(/\b(bg|text|border)-(blue|cyan|indigo|emerald|sky|violet|amber|rose|teal)-500\b/g, (match, prop, col) => {
      accentCount++;
      return `${prop}-${col}-600`;
    });

    fs.writeFileSync(resolvedPath, content, 'utf8');

    console.log(`\n${ANSI_GREEN}${ANSI_BOLD}[BOLDER APPLIED]${ANSI_RESET} Visual density boosted in ${ANSI_CYAN}${path.basename(resolvedPath)}${ANSI_RESET}`);
    console.log(`  ${ANSI_BOLD}Font Weights:${ANSI_RESET}     ${fontCount} font weight declarations elevated`);
    console.log(`  ${ANSI_BOLD}Border Contrast:${ANSI_RESET}  ${borderCount} border treatments deepened`);
    console.log(`  ${ANSI_BOLD}Accents:${ANSI_RESET}          ${accentCount} accent saturation & vibrancy rules boosted\n`);
    process.exit(0);
  }

  case 'quiet': {
    const targetFile = args[1];
    if (!targetFile || targetFile === '--help' || targetFile === '-h') {
      console.log(`
${ANSI_BOLD}ME-DESIGN Quiet Modifier${ANSI_RESET}
${ANSI_GRAY}Soften visual density, typography weights, and border contrast${ANSI_RESET}

${ANSI_BOLD}Usage:${ANSI_RESET}
  medesign quiet <file>
  mequiet <file>

${ANSI_BOLD}Modifications:${ANSI_RESET}
  - Softens font weights: bold/700 -> 500, semibold/600 -> 500
  - Reduces borders to hairline borders
  - Softens OKLCH chroma by ~30%
`);
      process.exit(targetFile === '--help' || targetFile === '-h' ? 0 : 1);
    }
    const resolvedPath = path.resolve(process.cwd(), targetFile);
    if (!fs.existsSync(resolvedPath)) {
      console.error(`${ANSI_RED}Error:${ANSI_RESET} File not found: ${resolvedPath}`);
      process.exit(1);
    }

    let content = fs.readFileSync(resolvedPath, 'utf8');
    let fontCount = 0;
    let borderCount = 0;
    let toneCount = 0;

    // 1. Single-pass atomic softening of font weights (prevents cascading replacement)
    const quietFontMap = {
      'font-extrabold': 'font-bold',
      'font-bold': 'font-semibold',
      'font-semibold': 'font-medium',
      'font-medium': 'font-normal'
    };
    content = content.replace(/\b(font-extrabold|font-bold|font-semibold|font-medium)\b/g, (m) => {
      fontCount++;
      return quietFontMap[m] || m;
    });

    content = content.replace(/font-weight\s*:\s*(700|600|bold)\b/gi, (match, val) => {
      fontCount++;
      if (val === '700' || val.toLowerCase() === 'bold') return 'font-weight: 500';
      if (val === '600') return 'font-weight: 400';
      return match;
    });

    // 2. Soften borders to minimalist hairlines (single pass)
    const quietBorderMap = {
      'border-2': 'border',
      'border-white/20': 'border-white/10',
      'border-white/15': 'border-white/8',
      'border-neutral-400': 'border-neutral-200',
      'border-gray-400': 'border-gray-200'
    };
    content = content.replace(/\b(border-2|border-white\/20|border-white\/15|border-neutral-400|border-gray-400)\b/g, (m) => {
      borderCount++;
      return quietBorderMap[m] || m;
    });

    content = content.replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.1[5-8]\s*\)/gi, () => { borderCount++; return 'rgba(255, 255, 255, 0.08)'; });
    content = content.replace(/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.1[5-8]\s*\)/gi, () => { borderCount++; return 'rgba(0, 0, 0, 0.08)'; });

    // 3. Shift Tone to Minimalist (Mute chroma & saturation)
    // OKLCH chroma reduction (decrease C by ~30% for chromatic colors C >= 0.04)
    content = content.replace(/oklch\(\s*([\d\.]+)\s+([\d\.]+)(\s+[\d\.]+(?:\s*(?:\/|\s)\s*[\d\.\%]+)?)\s*\)/gi, (match, l, c, rest) => {
      const cVal = parseFloat(c);
      if (cVal >= 0.04) {
        toneCount++;
        const softenedC = Math.max(0.01, parseFloat((cVal * 0.70).toFixed(3)));
        return `oklch(${l} ${softenedC}${rest})`;
      }
      return match;
    });

    // HSL saturation reduction (-25% saturation)
    content = content.replace(/hsl\(\s*([\d\.]+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*\)/gi, (match, h, s, l) => {
      const sVal = parseFloat(s);
      if (sVal > 15) {
        toneCount++;
        const softenedS = Math.max(10, Math.round(sVal - 25));
        return `hsl(${h}, ${softenedS}%, ${l}%)`;
      }
      return match;
    });

    // Tailwind accent softening
    const quietTailwindMap = {
      'saturate-150': 'saturate-100',
      'saturate-100': 'saturate-50'
    };
    content = content.replace(/\b(saturate-150|saturate-100)\b/g, (m) => {
      toneCount++;
      return quietTailwindMap[m] || m;
    });
    content = content.replace(/\b(bg|text|border)-(blue|cyan|indigo|emerald|sky|violet|amber|rose|teal)-600\b/g, (match, prop, col) => {
      toneCount++;
      return `${prop}-${col}-500`;
    });

    fs.writeFileSync(resolvedPath, content, 'utf8');

    console.log(`\n${ANSI_GREEN}${ANSI_BOLD}[QUIET APPLIED]${ANSI_RESET} Visual density softened in ${ANSI_CYAN}${path.basename(resolvedPath)}${ANSI_RESET}`);
    console.log(`  ${ANSI_BOLD}Font Weights:${ANSI_RESET}     ${fontCount} font weight declarations softened`);
    console.log(`  ${ANSI_BOLD}Borders:${ANSI_RESET}          ${borderCount} border treatments converted to minimalist hairlines`);
    console.log(`  ${ANSI_BOLD}Tone:${ANSI_RESET}             ${toneCount} color tone declarations softened to minimalist palette\n`);
    process.exit(0);
  }

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

  case 'snapshot': {
    const snapshotScript = path.join(rootDir, 'tests', 'snapshot.js');
    const child = spawnSync(process.execPath, [snapshotScript, ...args.slice(1)], {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    process.exit(child.status ?? 0);
  }

  case 'tokens': {
    const exportScript = path.join(rootDir, 'scripts', 'export-tokens.js');
    const exportArgs = args.slice(1).filter(a => a !== 'export');
    const child = spawnSync(process.execPath, [exportScript, ...exportArgs], {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    process.exit(child.status ?? 0);
  }

  case 'presets': {
    const sub = args[1] || 'list';
    if (sub === '--help' || sub === '-h' || sub === 'help') {
      console.log(`
${ANSI_BOLD}ME-DESIGN Presets Inspector${ANSI_RESET}
${ANSI_GRAY}Inspect available design system presets${ANSI_RESET}

${ANSI_BOLD}Usage:${ANSI_RESET}
  medesign presets list
  medesign presets get <preset-name>
`);
      process.exit(0);
    }
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
    if (args[1] === '--help' || args[1] === '-h') {
      console.log(`
${ANSI_BOLD}ME-DESIGN Test Runner${ANSI_RESET}
${ANSI_GRAY}Run deterministic static rule & browser test suites${ANSI_RESET}

${ANSI_BOLD}Usage:${ANSI_RESET}
  medesign test
  medesign test --browser
`);
      process.exit(0);
    }
    const runnerScript = path.join(rootDir, 'tests', 'runner.js');
    const child = spawnSync(process.execPath, [runnerScript, ...args.slice(1)], {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    process.exit(child.status ?? 0);
  }

  case 'doctor': {
    if (args[1] === '--help' || args[1] === '-h') {
      console.log(`
${ANSI_BOLD}ME-DESIGN Environment Doctor${ANSI_RESET}
${ANSI_GRAY}Verify local environment, Node.js, and Chrome/CDP availability${ANSI_RESET}

${ANSI_BOLD}Usage:${ANSI_RESET}
  medesign doctor
`);
      process.exit(0);
    }
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
    if (!nodeOk) {
      console.log(`${ANSI_RED}${ANSI_BOLD}STATUS: UNSUPPORTED ENVIRONMENT (Node.js >= 18.0.0 required)${ANSI_RESET}\n`);
      process.exit(1);
    } else if (foundChrome) {
      console.log(`${ANSI_GREEN}${ANSI_BOLD}STATUS: ALL SYSTEMS OPERATIONAL (Static & Browser Matrix Ready)${ANSI_RESET}\n`);
      process.exit(0);
    } else {
      console.log(`${ANSI_YELLOW}${ANSI_BOLD}STATUS: CORE OPERATIONAL (Static Engine Ready, Browser Audits Unavailable)${ANSI_RESET}\n`);
      process.exit(0);
    }
  }

  case 'help':
  case '--help':
  case '-h':
  default:
    printHelp();
    break;
}

#!/usr/bin/env node

/**
 * ME-DESIGN Test Suite Runner
 * Runs the deterministic static linter across all valid and invalid fixtures,
 * asserting that valid fixtures pass (exit code 0), invalid fixtures report expected rule IDs,
 * and browser matrix verification passes/fails according to exact expectations.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ANSI_RESET = '\x1b[0m';
const ANSI_BOLD = '\x1b[1m';
const ANSI_GREEN = '\x1b[32m';
const ANSI_RED = '\x1b[31m';
const ANSI_CYAN = '\x1b[36m';
const ANSI_YELLOW = '\x1b[33m';
const ANSI_GRAY = '\x1b[90m';

const linterPath = path.join(__dirname, 'linter.js');
const browserAuditPath = path.join(__dirname, 'browser-audit.js');
const validDir = path.join(__dirname, 'fixtures', 'valid');
const invalidDir = path.join(__dirname, 'fixtures', 'invalid');

const runBrowser = process.argv.includes('--browser');

// Explicit Fixture Assertions & Expected Rule IDs
const fixtureExpectations = {
  // Valid Fixtures (Static: PASS, Browser: PASS)
  'apple-hardware-showcase.html': { staticPass: true, browserPass: true },
  'metha-cadastre-dashboard.html': { staticPass: true, browserPass: true },
  'tesla-telemetry-panel.html': { staticPass: true, browserPass: true },
  'tailwind-ring-transparent-outline.html': { staticPass: true, browserPass: true },
  'visual-testbed.html': { staticPass: true, browserPass: true },

  // Hard Invariant Failures (Static: FAIL with Rule IDs, Browser: FAIL)
  'accessibility-contrast-fail.html': { staticPass: false, browserPass: false, expectedRules: ['MD001', 'MD002', 'MD003', 'MD005'] },
  'dense-bento-ordering-fail.html': { staticPass: false, browserPass: false, expectedRules: ['MD004', 'MD101', 'MD102'] },
  'md005-box-shadow-focus-fail.html': { staticPass: false, browserPass: false, expectedRules: ['MD005'] },

  // Soft Heuristic Warning Fixtures (Static: Reports Warning Rule ID)
  'md104-raw-100vh-fail.html': { staticPass: true, browserPass: true, expectedRules: ['MD104'] },
  'md105-order-reverse-fail.html': { staticPass: true, browserPass: true, expectedRules: ['MD105'] }
};

const testCases = [];

if (fs.existsSync(validDir)) {
  fs.readdirSync(validDir).filter(f => f.endsWith('.html')).forEach(file => {
    testCases.push({
      name: file,
      path: path.join(validDir, file),
      exp: fixtureExpectations[file] || { staticPass: true, browserPass: true }
    });
  });
}

if (fs.existsSync(invalidDir)) {
  fs.readdirSync(invalidDir).filter(f => f.endsWith('.html')).forEach(file => {
    testCases.push({
      name: file,
      path: path.join(invalidDir, file),
      exp: fixtureExpectations[file] || { staticPass: false, browserPass: false }
    });
  });
}

const visualTestbed = path.join(__dirname, 'visual-testbed.html');
if (fs.existsSync(visualTestbed)) {
  testCases.push({
    name: 'visual-testbed.html',
    path: visualTestbed,
    exp: fixtureExpectations['visual-testbed.html'] || { staticPass: true, browserPass: true }
  });
}

console.log(`\n${ANSI_BOLD}ME-DESIGN Deterministic Test Suite Runner${ANSI_RESET}`);
console.log(`${ANSI_GRAY}Running ${testCases.length} fixtures across static pattern rules & rule assertions...${ANSI_RESET}\n`);

let passedCount = 0;
let failedCount = 0;

testCases.forEach(tc => {
  const res = spawnSync(process.execPath, [linterPath, tc.path, '--json'], {
    encoding: 'utf8',
    timeout: 15000,
    maxBuffer: 10 * 1024 * 1024,
    windowsHide: true
  });

  const exitCode = res.status !== null ? res.status : 1;
  const stdout = res.stdout || '';

  const actuallyPassed = exitCode === 0;
  const isPassMatch = actuallyPassed === tc.exp.staticPass;

  let report = null;
  try {
    report = JSON.parse(stdout);
  } catch (e) {
    report = { qScore: 0, hardFailures: [], diagnostics: [] };
  }

  const reportedRuleIds = (report.diagnostics || []).map(d => d.ruleId);
  let rulesMatch = true;
  const missingRules = [];
  if (tc.exp.expectedRules) {
    for (const r of tc.exp.expectedRules) {
      if (!reportedRuleIds.includes(r)) {
        rulesMatch = false;
        missingRules.push(r);
      }
    }
  }

  const testPassed = isPassMatch && rulesMatch;
  const statusLabel = testPassed ? `${ANSI_GREEN}PASS${ANSI_RESET}` : `${ANSI_RED}FAIL${ANSI_RESET}`;
  const expectation = tc.exp.staticPass ? 'PASS' : 'FAIL';
  const actualStr = actuallyPassed ? 'PASS' : 'FAIL';
  const rulesSummary = tc.exp.expectedRules ? ` [Assert rules: ${tc.exp.expectedRules.join(', ')}]` : '';

  console.log(`  [${statusLabel}] ${tc.name.padEnd(38)} | Static: ${expectation} -> ${actualStr} (Q: ${report.qScore})${rulesSummary}`);

  if (testPassed) {
    passedCount++;
  } else {
    failedCount++;
    if (!isPassMatch) {
      console.error(`      ${ANSI_RED}Assertion Error:${ANSI_RESET} Expected staticPass=${tc.exp.staticPass}, got ${actuallyPassed}`);
    }
    if (!rulesMatch) {
      console.error(`      ${ANSI_RED}Rule Assertion Error:${ANSI_RESET} Expected rule(s) [${missingRules.join(', ')}] not found in diagnostics [${reportedRuleIds.join(', ')}]`);
    }
  }
});

// Run browser matrix verification if --browser flag is provided
if (runBrowser) {
  console.log(`\n${ANSI_BOLD}Headless Browser Matrix Audits (Mobile / Tablet / Desktop × Dark / Light / High Contrast)${ANSI_RESET}`);
  testCases.forEach(tc => {
    const bRes = spawnSync(process.execPath, [browserAuditPath, tc.path, '--json'], {
      encoding: 'utf8',
      timeout: 30000,
      maxBuffer: 10 * 1024 * 1024,
      windowsHide: true
    });
    const browserExit = bRes.status !== null ? bRes.status : 1;
    const bPassed = browserExit === 0;
    const bMatch = bPassed === tc.exp.browserPass;
    const bLabel = bMatch ? `${ANSI_GREEN}PASS${ANSI_RESET}` : `${ANSI_RED}FAIL${ANSI_RESET}`;
    console.log(`  [${bLabel}] BROWSER: ${tc.name.padEnd(32)} | Expected: ${tc.exp.browserPass ? 'PASS' : 'FAIL'} -> Actual: ${bPassed ? 'PASS' : 'FAIL'}`);
    if (!bMatch) failedCount++;
  });
}

console.log(`\n${ANSI_GRAY}────────────────────────────────────────${ANSI_RESET}`);
console.log(`Summary: ${ANSI_GREEN}${passedCount} passed${ANSI_RESET}, ${failedCount > 0 ? ANSI_RED : ANSI_GRAY}${failedCount} failed${ANSI_RESET}.\n`);

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

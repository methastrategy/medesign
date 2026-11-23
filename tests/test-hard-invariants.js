#!/usr/bin/env node
'use strict';

// Regression coverage: hard invariants must remain blocking despite config or inline suppressions.
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.join(__dirname, '..');
const linterPath = path.join(__dirname, 'linter.js');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'medesign-hard-gate-'));

function runLint(source, configSource) {
  const sourcePath = path.join(tempDir, `fixture-${Math.random().toString(16).slice(2)}.html`);
  fs.writeFileSync(sourcePath, source, 'utf8');
  let args = [linterPath, sourcePath, '--json'];
  if (configSource) {
    const configPath = path.join(tempDir, `config-${Math.random().toString(16).slice(2)}.js`);
    fs.writeFileSync(configPath, configSource, 'utf8');
    args = args.concat(['--config', configPath]);
  }
  const result = spawnSync(process.execPath, args, { encoding: 'utf8' });
  let report;
  try {
    report = JSON.parse(result.stdout);
  } catch (error) {
    throw new Error(`Linter did not return JSON. stderr=${result.stderr}; stdout=${result.stdout}`);
  }
  return { result, report };
}

function assertHardFailure(report, scenario) {
  const finding = report.diagnostics.find(item => item.ruleId === 'MD001');
  assert(finding, `${scenario}: MD001 diagnostic is present`);
  assert.strictEqual(finding.severity, 'error', `${scenario}: MD001 severity remains error`);
  assert.strictEqual(finding.hardInvariant, true, `${scenario}: MD001 remains a hard invariant`);
  assert(report.hardFailures.some(item => item.ruleId === 'MD001'), `${scenario}: MD001 is included in hardFailures`);
  assert.strictEqual(report.passed, false, `${scenario}: report cannot pass`);
  assert.notStrictEqual(report.qScore, undefined, `${scenario}: report includes a static score`);
}

try {
  const noFocus = '<!doctype html><html><body><button>Continue</button></body></html>';

  const configuredOff = runLint(noFocus, `module.exports = { rules: { MD001: 'off' } };`);
  assertHardFailure(configuredOff.report, 'config MD001=off');

  const nextLineSuppression = runLint(`<!doctype html><html><head><style>\n/* medesign-disable-next-line MD001 */\nbutton { color: red; }\n</style></head><body><button>Continue</button></body></html>`);
  assertHardFailure(nextLineSuppression.report, 'next-line suppression');

  const blockSuppression = runLint(`<!doctype html><html><head><style>\n/* medesign-disable MD001 */\nbutton { color: red; }\n/* medesign-enable MD001 */\n</style></head><body><button>Continue</button></body></html>`);
  assertHardFailure(blockSuppression.report, 'block suppression');

  console.log('PASS hard-invariant policy regression tests (config override and inline suppressions)');
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

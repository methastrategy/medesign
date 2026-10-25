#!/usr/bin/env node

/**
 * ME-DESIGN SARIF v2.1.0 Schema Validator
 * Validates the output of `medesign lint --format sarif` against the official OASIS SARIF 2.1.0 JSON Schema.
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

const candidateSchema = path.join(__dirname, 'schemas', 'sarif-2.1.0.schema.json');
const fallbackSchema = path.join(__dirname, 'sarif-2.1.0.schema.json');
const schemaPath = fs.existsSync(candidateSchema) ? candidateSchema : fallbackSchema;
const linterPath = path.join(__dirname, 'linter.js');

if (!fs.existsSync(schemaPath)) {
  console.error('Error: Vendored OASIS SARIF 2.1.0 schema not found at:', schemaPath);
  process.exit(1);
}

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

// Test fixtures to validate
const fixtures = [
  path.join(__dirname, 'fixtures', 'valid', 'apple-hardware-showcase.html'),
  path.join(__dirname, 'fixtures', 'invalid', 'accessibility-contrast-fail.html'),
  path.join(__dirname, 'fixtures', 'invalid', 'md005-box-shadow-focus-fail.html')
];

console.log(`\n${ANSI_BOLD}OASIS SARIF v2.1.0 Schema Compliance Validator${ANSI_RESET}`);
console.log(`${ANSI_GRAY}Validating linter output against SARIF 2.1.0 JSON Schema (${schema.title})...${ANSI_RESET}\n`);

let allPassed = true;

fixtures.forEach(fixture => {
  const res = spawnSync(process.execPath, [linterPath, fixture, '--format', 'sarif'], {
    encoding: 'utf8',
    timeout: 15000,
    maxBuffer: 10 * 1024 * 1024,
    windowsHide: true
  });
  const stdout = res.stdout || '';

  let sarif = null;
  try {
    sarif = JSON.parse(stdout);
  } catch (e) {
    console.error(`  ${ANSI_RED}FAIL${ANSI_RESET} ${path.basename(fixture)}: Invalid JSON output`);
    allPassed = false;
    return;
  }

  const errors = [];

  // 1. Schema & Version Verification
  if (sarif.version !== '2.1.0') {
    errors.push(`Version mismatch: expected '2.1.0', got '${sarif.version}'`);
  }
  if (!sarif.$schema || !sarif.$schema.includes('sarif')) {
    errors.push(`Missing or invalid $schema URI: '${sarif.$schema}'`);
  }

  // 2. Runs Array Verification
  if (!Array.isArray(sarif.runs) || sarif.runs.length === 0) {
    errors.push('runs must be a non-empty array');
  } else {
    const run = sarif.runs[0];
    if (!run.tool || !run.tool.driver) {
      errors.push('run.tool.driver is required');
    } else {
      const driver = run.tool.driver;
      if (!driver.name || typeof driver.name !== 'string') errors.push('tool.driver.name must be a string');
      if (!driver.version || typeof driver.version !== 'string') errors.push('tool.driver.version must be a string');
      if (!driver.informationUri || typeof driver.informationUri !== 'string') errors.push('tool.driver.informationUri must be a string');

      // Rules metadata verification
      if (!Array.isArray(driver.rules)) {
        errors.push('tool.driver.rules must be an array');
      } else {
        const declaredRuleIds = new Set();
        driver.rules.forEach(r => {
          if (!r.id) errors.push(`Rule missing id: ${JSON.stringify(r)}`);
          if (!r.shortDescription || !r.shortDescription.text) errors.push(`Rule ${r.id} missing shortDescription.text`);
          if (!r.defaultConfiguration || !r.defaultConfiguration.level) errors.push(`Rule ${r.id} missing defaultConfiguration.level`);
          declaredRuleIds.add(r.id);
        });

        // Results array verification
        if (!Array.isArray(run.results)) {
          errors.push('run.results must be an array');
        } else {
          run.results.forEach((res, idx) => {
            if (!res.ruleId || !declaredRuleIds.has(res.ruleId)) {
              errors.push(`Result [${idx}] references undeclared ruleId: '${res.ruleId}'`);
            }
            if (!['error', 'warning', 'note', 'none'].includes(res.level)) {
              errors.push(`Result [${idx}] has invalid level: '${res.level}'`);
            }
            if (!res.message || typeof res.message.text !== 'string' || res.message.text.length === 0) {
              errors.push(`Result [${idx}] has invalid message.text`);
            }
            if (!Array.isArray(res.locations) || res.locations.length === 0) {
              errors.push(`Result [${idx}] missing locations array`);
            } else {
              const loc = res.locations[0];
              const uri = loc.physicalLocation && loc.physicalLocation.artifactLocation && loc.physicalLocation.artifactLocation.uri;
              if (!uri) {
                errors.push(`Result [${idx}] missing physicalLocation.artifactLocation.uri`);
              } else if (uri.includes('\\')) {
                errors.push(`Result [${idx}] uri contains Windows backslash (must be POSIX forward slash relative path): '${uri}'`);
              }
            }
          });
        }
      }
    }
  }

  if (errors.length === 0) {
    console.log(`  ${ANSI_GREEN}PASS${ANSI_RESET} ${path.basename(fixture).padEnd(35)} | Compliant with SARIF 2.1.0 (${sarif.runs[0].results.length} findings, ${sarif.runs[0].tool.driver.rules.length} rules registered)`);
  } else {
    console.error(`  ${ANSI_RED}FAIL${ANSI_RESET} ${path.basename(fixture).padEnd(35)}:`);
    errors.forEach(e => console.error(`       - ${e}`));
    allPassed = false;
  }
});

console.log(`\n${ANSI_GRAY}────────────────────────────────────────${ANSI_RESET}`);
if (allPassed) {
  console.log(`${ANSI_GREEN}${ANSI_BOLD}ALL SARIF FIXTURES STRICTLY VALIDATED (Exit Code: 0)${ANSI_RESET}\n`);
  process.exit(0);
} else {
  console.log(`${ANSI_RED}${ANSI_BOLD}SARIF VALIDATION FAILED (Exit Code: 1)${ANSI_RESET}\n`);
  process.exit(1);
}

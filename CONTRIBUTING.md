# Contributing to ME-DESIGN

Thank you for your interest in contributing to **ME-DESIGN**!

ME-DESIGN is an autonomous frontend design engineering system, deterministic quality linter, and auto-compiler for AI coding assistants. We welcome contributions that maintain our mission-critical engineering rigor.

---

## Architecture Principles & Invariants

Before contributing, please review our core architectural invariants:

1. **Zero-Dependency Runtime:** The core CLI and linter must remain 100% zero-dependency, using only the Node.js standard library.
2. **Hard Invariant Immutability:** Rules `MD001` through `MD005` are non-overridable. They cannot be suppressed via user configuration or inline disable comments.
3. **Safe Atomic Auto-Repair:** The `polish` command must always validate changes on a temporary candidate file (`.tmp`) and verify that quality does not regress (`afterQ >= beforeQ`) before writing to disk.
4. **Truthful Telemetry:** Never claim static analysis capabilities beyond actual implementation. The static engine is pattern/heuristic-based; browser tests run via Chrome DevTools Protocol (CDP).

---

## Local Development Workflow

### Prerequisites
- Node.js >= 18.0.0 (Node 20.x or 22.x recommended)
- Google Chrome or Chromium (optional, for headless browser CDP tests)
- Git

### Installation
Clone the repository and verify the test suite:
```bash
git clone https://github.com/methastrategy/medesign.git
cd medesign
npm test
```

### Running Test Suites
```bash
# Run all deterministic tests (fixtures, hard-invariants, SARIF, tokens, CLI, gamut, behavioral)
npm test

# Run individual test suites
npm run test:unit        # Static fixture runner
npm run test:sarif       # OASIS SARIF v2.1.0 schema validator
npm run test:tokens      # Token exporter (Tailwind v4, DTCG, CSS)
npm run test:cli         # CLI commands and regression tests
npm run test:benchmark   # Blind benchmark comparative evaluation
npm run test:browser     # Headless Chromium CDP audit (requires Chrome)
```

---

## Pull Request Guidelines

1. **Branch Naming:** Use descriptive branch names like `feat/add-theme-preset` or `fix/cli-overflow-check`. Do not push directly to `main`.
2. **Commit Convention:** Use Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`, `chore:`).
3. **Tests Required:** Any bug fix or new feature must include regression test coverage in `tests/`.
4. **CI Verification:** Ensure all GitHub Actions matrices (Ubuntu & Windows × Node 20.x & 22.x) pass.
5. **No AI Noise:** Keep diffs focused, minimal, and surgical. Avoid unsolicited refactors outside task scope.

---

## Code of Conduct

Please maintain a collaborative, respectful, and professional environment across all issues, pull requests, and discussions.

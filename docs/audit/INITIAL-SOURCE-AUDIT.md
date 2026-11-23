# Initial Source Audit: ME-DESIGN

**Baseline commit:** `48296cb49b0da6ae60ff6edcbd77cc82616335b6`  
**Baseline version:** `1.6.1`  
**Review date:** 2026-11-24  
**Scope:** Source and workflow review through GitHub repository files. No local install, `npm test`, browser execution or visual user testing was performed during this baseline review.

## 1. Executive summary

ME-DESIGN has a meaningful foundation: domain-specific design references, reusable presets, token export, CLI commands, a fixture-based linter, a CDP browser verifier, snapshots and CI workflows.

The primary risk is not missing features. It is the gap between the strength of the claims and the evidence produced by the current implementation. The first priority is to make the safety and verification model trustworthy, then improve skill usability and only then expand the design knowledge and automation surface.

## 2. Confirmed source findings

| ID | Priority | File(s) | Finding | Risk |
|---|---|---|---|---|
| AUD-001 | P0 | `tests/linter.js` | MD001-MD005 take their severity from `config.rules`; the hard-failure calculation only includes hard invariants whose severity is `error`. | A custom `off` or weaker severity can bypass the hard gate. |
| AUD-002 | P0 | `tests/linter.js` | Inline suppression preprocessing accepts generic rule IDs, including hard-invariant IDs. | A hard rule can be hidden by a suppression comment. |
| AUD-003 | P0 | `bin/medesign.js` | `polish` writes the candidate to the original file before the post-repair audit. The post-audit starts with `isPassed = true` and catches errors without failing closed. | A missing or malformed post-audit report can leave modified code and a misleading PASS. A rejected candidate is not rolled back. |
| AUD-004 | P1 | `tests/linter.js` | The engine uses global text/pattern checks for several rules, while descriptions call it AST/semantic analysis. For example, one occurrence of `:focus-visible` can satisfy the global focus-presence test. | False confidence and false positives/negatives. |
| AUD-005 | P1 | `tests/linter.js` | The score is derived from rule-count deductions; hierarchy starts at a constant 95. | The Q-Score is a static heuristic, not a direct measurement of rendered hierarchy or visual quality. |
| AUD-006 | P1 | `tests/browser-audit.js` | Some browser checks use fixed delays and the text-contrast check samples a limited set of text nodes. | Slow-loading or later-page elements may be missed; results can be timing-sensitive. |
| AUD-007 | P1 | `package.json`, `tests/browser-audit.js`, `tests/snapshot.js` | The package declares Node `>=18`, while browser tooling instantiates the global `WebSocket`. Node documents the global WebSocket as added in v20.10.0 and stable in v22.4.0. | The advertised minimum runtime does not match the browser tool's runtime API requirements. |
| AUD-008 | P2 | `.github/workflows/ci.yml` | SARIF upload uses `continue-on-error: true`. | A report-upload failure can be hidden from the workflow result. |
| AUD-009 | P2 | `SKILL.md` | The root instructions require a full brief/direction ritual and announce a mode even for work that could be small and unambiguous. | Higher interaction cost and unnecessary questions. |
| AUD-010 | P2 | `SKILL.md`, `references/` | The entry skill routes into a large reference collection, while many design rules are phrased as broad universal requirements. | Cognitive load and the risk of applying a domain-specific preference to the wrong product. |

## 3. Important implementation details

### AUD-001 / AUD-002 - hard invariants

The code marks MD001-MD005 as `hardInvariant: true`, but severity is resolved from user configuration. The gate later filters with both conditions: `hardInvariant && severity === 'error'`. Inline suppression preprocessing also accepts generic identifiers.

**Required behaviour:** MD001-MD005 must remain blocking. If exceptions are needed in the future, they must use an explicit, reviewable waiver model and must not silently turn a gate green.

### AUD-003 - polish gate

The current flow:
1. Reads and transforms the source.
2. Writes the transformed content directly to the original path.
3. Runs the linter afterward.
4. Defaults to a passing state and swallows post-audit exceptions.

It also used a truthy fallback for the pre-audit score (`parsed.qScore || 80.0`), which does not preserve a legitimate numeric zero.

**Required behaviour:** validate the candidate in a temporary sibling file, require a valid machine-readable report, replace the original only after a genuine pass, and remove the temporary file on every failure path.

### AUD-004 / AUD-005 - honesty of the verification model

The current linter is a static heuristic engine using source-pattern checks. It does not parse every HTML/CSS/JSX construct into an AST and does not render the page. The score's category values are also partly fixed and deducted according to detected rule counts.

**Required behaviour:** call it a static pattern/heuristic check until parser-backed analysis exists. Expose the score as `static-heuristic`; do not describe it as a browser-verified or perceptual design score.

### AUD-006 - browser evidence

The browser verifier does use Chrome DevTools Protocol, which is a useful foundation. However, fixed waits and limited element sampling reduce confidence. Browser startup and cleanup/error paths also need focused tests.

**Required behaviour:** use explicit readiness conditions, inspect the complete relevant element set, distinguish audit failure from environment failure, and close child processes and CDP resources in a guaranteed cleanup path.

### AUD-007 - runtime compatibility

The package currently advertises `node >=18.0.0`. The browser tooling uses the global `WebSocket`; the official Node.js documentation records this API as added in v20.10.0 and stable in v22.4.0. See [Node.js global WebSocket documentation](https://nodejs.org/api/globals.html#class-websocket).

**Required decision:** either raise the engine floor to a version with stable native WebSocket support, or add and test a compatible WebSocket implementation for the declared minimum runtime. Do not leave the mismatch undocumented.

## 4. Skill-level findings

- The main skill combines frontend design, graphic design, slides, reports and brand systems. This breadth can remain in the repository, but the primary frontend workflow should be clearer.
- A full A/B direction pitch should be optional for substantial or ambiguous projects, not mandatory for a simple task.
- Project context (product, users, design conventions and stack) should be inspected and recorded where useful.
- The skill should distinguish universal engineering constraints from visual preferences and context-specific heuristics.
- "No em dash", a particular font pairing, a dark palette or a Bento layout should never be described as an accessibility requirement.
- Existing project conventions and business logic should be preserved unless the user asks to change them.

## 5. Immediate remediation order

1. **P0:** make hard invariants non-overridable and suppression-safe.
2. **P0:** make `polish` fail-closed and atomic.
3. **P1:** correct terminology and expose the static score type.
4. **P1:** resolve the Node/WebSocket compatibility contract.
5. **P1:** improve browser readiness, coverage and cleanup.
6. **P2:** simplify the root skill and adopt the fast/deep workflow.
7. **P2:** organise and validate the design knowledge base.
8. **P2:** improve CI, compatibility and release provenance.

## 6. Verification status

This is a source review, not an executed test report. The findings above are derived from the reviewed source and workflow files. No claim is made that the existing test suite passes or fails in a live runtime. Each remediation must add regression coverage and record actual command output before being marked complete.

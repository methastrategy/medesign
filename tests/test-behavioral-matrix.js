const fs = require('fs');
const path = require('path');

const repo = path.join(__dirname, '..');
const intake = fs.readFileSync(path.join(repo, 'references', 'brief-intake.md'), 'utf8');
const skill = fs.readFileSync(path.join(repo, 'SKILL.md'), 'utf8');
const brandTokens = fs.readFileSync(path.join(repo, 'references', 'brand-design-tokens.md'), 'utf8');

const ANSI_GREEN = '\x1b[32m';
const ANSI_RED = '\x1b[31m';
const ANSI_RESET = '\x1b[0m';

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

console.log('\nME-DESIGN AI Behavioral Invariant Suite (Claude 10-Scenario Matrix)');
console.log('Testing ambiguity resolution rules in brief-intake.md and SKILL.md...\n');

// Scenario 1: "ทำใหม่หมดเหมือน Stripe" -> like (not new)
assert(
  intake.includes('หากผู้ใช้ระบุ "ทำใหม่หมดเหมือน Stripe" ให้ถือเป็น `like`') &&
  intake.includes('สร้างใหม่โดยอิงสไตล์แบรนด์ ไม่อิงไฟล์เดิม'),
  'Scenario 1: "ทำใหม่หมดเหมือน Stripe" resolves to `like` (ไม่อิงไฟล์เดิม)'
);

// Scenario 2: "ทำเว็บร้านขายรองเท้า Nike" -> new (Nike is client/topic, not style)
assert(
  intake.includes('Nike') && intake.includes('ไม่ใช่สไตล์อ้างอิง ให้จัดเป็น `new`'),
  'Scenario 2: "ทำเว็บร้านขายรองเท้า Nike" resolves to `new` (Brand as topic)'
);

// Scenario 3: Attached existing code + "ปรับหน้าให้ดูแพงขึ้น" -> revamp
assert(
  intake.includes('มีไฟล์หรือโค้ดเดิมแนบมา และไม่ได้ระบุว่า "ทำใหม่หมด" -> `revamp`'),
  'Scenario 3: Attached existing code + "ปรับหน้าให้ดูแพงขึ้น" resolves to `revamp`'
);

// Scenario 4: "/medesign apple" alone -> asks single question what to build, doesn't guess
assert(
  intake.includes('ตรวจ §1 เรื่องเป้าหมาย/ข้อจำกัด') &&
  intake.includes('ถามคำถามเดียวสั้นๆ ว่า "จะให้สร้าง/แก้/อิงระบบอะไร?"'),
  'Scenario 4: Bare preset command asks single question on goal without guessing'
);

// Scenario 5: "/medesign new ลุยเลย" -> asks single question what to build, then proceeds
assert(
  intake.includes('หากพิมพ์ "ลุยเลย" แต่ยังไม่บอกว่าจะสร้างอะไร') &&
  intake.includes('ถามคำถามเดียวสั้นๆ ว่า "จะให้สร้าง/แก้/อิงระบบอะไร?" แล้วดำเนินการทันที'),
  'Scenario 5: "/medesign new ลุยเลย" asks single question before proceeding'
);

// Scenario 6: User answers "ok" to provisional direction -> accepted as selecting A, no repeat questioning
assert(
  intake.includes('การตอบ **"ok"** ต่อทิศทางชั่วคราว มีความหมายเท่ากับ: `ยอมรับค่าเริ่มต้นที่เสนอ + เลือก Direction A`'),
  'Scenario 6: Replying "ok" selects Direction A without re-questioning'
);

// Scenario 7: "/medesign like linear.app" without local spec -> uses style-extraction or notifies user, no token hallucination
assert(
  intake.includes('ห้ามเดา Token จากความจำ') &&
  brandTokens.includes('awesome-design-md-src') &&
  brandTokens.includes('/medesign extract <url>'),
  'Scenario 7: Missing local brand specs fallback to style-extraction or user notification (Anti-Hallucination)'
);

// Scenario 8: "/medesign like tesla" for a landing page -> does NOT force 3-Pane Cockpit
assert(
  intake.includes('**Hierarchy Rule:**') &&
  intake.includes('สิ่งที่ผู้ใช้เลือกใน Intake ชนะ Layout Pairing Matrix') &&
  brandTokens.includes('Web Application, Dashboard, และ Cockpit เท่านั้น') &&
  brandTokens.includes('หากเป็น Landing Page, Blog, หรือ Marketing ให้ใช้ Layout มาตรฐานของหน้านั้นๆ'),
  'Scenario 8: Landing page with Tesla theme respects landing page layout (No 3-Pane Cockpit collision)'
);

// Scenario 9: Step A/B message has 0 Gate lines, code delivery message has 1 Gate line
assert(
  skill.includes('**เฉพาะข้อความที่ส่งมอบโค้ดเท่านั้น**') &&
  skill.includes('(ข้อความเสนอทิศทาง A/B ไม่ต้องใส่ Gate)'),
  'Scenario 9: Direction pitch messages omit Quality Gate; code delivery messages include Gate'
);

// Scenario 10: Environment lacking ask_question and Node -> plain text fallback, no crash
assert(
  skill.includes('หากไม่มี `ask_question` ให้ถามข้อความธรรมดาในแชต; หากไม่มี Node CLI ให้ตรวจทานด้วย 11 Craft Checklist ด้วยตนเอง') &&
  intake.includes('ใช้ `ask_question` ถ้ามี หากไม่มีให้ถามเป็นข้อความธรรมดาในแชต ถามได้รอบเดียวเท่านั้น'),
  'Scenario 10: Environments without ask_question or Node CLI degrade gracefully to plain text and manual checklist'
);

console.log(`\nSummary: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) {
  process.exit(1);
}

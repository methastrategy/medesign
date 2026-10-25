/**
 * ME-DESIGN Live Model Evaluation Harness (Claude 10-Scenario Benchmark)
 * 
 * Usage:
 *   node tests/eval-harness.js --provider=gemini|openai|anthropic|ollama
 * 
 * Requires:
 *   GEMINI_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY in environment
 */

const fs = require('fs');
const path = require('path');

const repo = path.join(__dirname, '..');
const skill = fs.readFileSync(path.join(repo, 'SKILL.md'), 'utf8');
const intake = fs.readFileSync(path.join(repo, 'references', 'brief-intake.md'), 'utf8');

const systemPrompt = `You are an AI assistant loaded with the ME-DESIGN skill.
Here are your active guidelines:

${skill}

${intake}
`;

const scenarios = [
  {
    id: 1,
    prompt: "ทำใหม่หมดเหมือน Stripe",
    expectedMode: "like",
    description: "สร้างใหม่โดยอิงสไตล์แบรนด์ Stripe (ไม่อิงไฟล์เดิม)"
  },
  {
    id: 2,
    prompt: "ทำเว็บร้านขายรองเท้า Nike",
    expectedMode: "new",
    description: "Nike เป็นโจทย์ของงาน ไม่ใช่สไตล์อ้างอิง"
  },
  {
    id: 3,
    prompt: "ปรับหน้าให้ดูแพงขึ้น (แนบโค้ดเดิม: <div class='card'><h1>Dashboard</h1></div>)",
    expectedMode: "revamp",
    description: "มีโค้ดเดิมแนบมาและไม่ได้บอกว่าทำใหม่หมด"
  },
  {
    id: 4,
    prompt: "/medesign apple",
    expectedMode: "like",
    checkQuestionCount: true,
    description: "ถามคำถามเดียวว่าสร้างระบบอะไร ไม่เดาเอง"
  },
  {
    id: 5,
    prompt: "/medesign new ลุยเลย",
    expectedMode: "new",
    checkQuestionCount: true,
    description: "ถามคำถามเดียวว่าสร้างระบบอะไร แล้วลงมือทันที"
  },
  {
    id: 6,
    prompt: "ok (หลังจาก AI เสนอทิศทางชั่วคราว Direction A)",
    expectedAction: "เลือก Direction A ทันที ไม่ถามซ้ำ",
    description: "ok = ยอมรับค่าเริ่มต้น + เลือก A"
  },
  {
    id: 7,
    prompt: "/medesign like linear.app",
    expectedMode: "like",
    checkFallback: true,
    description: "ใช้ style-extraction หรือแจ้งผู้ใช้ ห้ามเดา Token"
  },
  {
    id: 8,
    prompt: "/medesign like tesla ขอ landing page สินค้าใหม่",
    expectedMode: "like",
    checkLayout: "landing",
    description: "เคารพ Landing Page layout ไม่ล็อก 3-Pane Cockpit"
  },
  {
    id: 9,
    prompt: "ตรวจสอบข้อความเสนอทิศทาง A/B vs ส่งมอบโค้ด",
    checkGate: true,
    description: "ข้อความเสนอทิศทางห้ามมี Gate: pass, ข้อความส่งโค้ดต้องมี"
  },
  {
    id: 10,
    prompt: "รันในสภาพแวดล้อมที่ไม่มี ask_question และไม่มี Node CLI",
    checkGraceful: true,
    description: "Fallback เป็นข้อความธรรมดาและตรวจทานด้วยตนเอง ไม่แครช"
  }
];

console.log("ME-DESIGN Live Model Evaluation Harness (Claude 10-Scenario Benchmark)");
console.log(`Registered ${scenarios.length} test scenarios.`);
console.log("To run live against an API, specify --provider and provide API key.\n");

module.exports = { scenarios, systemPrompt };

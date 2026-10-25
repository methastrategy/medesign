# Brand Design System Intelligence (Awesome DESIGN.md)

คลังมาตรฐานสถาปัตยกรรมและโทเค็นการออกแบบจาก **74 แบรนด์ระดับโลก & Presets มาตรฐาน** สำหรับใช้ร่วมกับโหมด `/medesign like <แบรนด์>` หรือ `/medesign <แบรนด์>`

## Available Brands (74 Brands)

- **Mission-Critical Engineering & Telemetry:** `metha` (Cadastral & GIS Cockpit, ISA-101 Situational Awareness, Deep Slate `#0a0d14`, Hairline `rgba(255,255,255,0.09)`, Electric Cyan `oklch(0.85 0.18 198)`, Tabular Mono)
- **Developer Tools & SaaS:** `linear.app`, `stripe`, `vercel`, `supabase`, `raycast`, `posthog`, `resend`, `sentry`, `warp`, `hashicorp`, `mintlify`, `clickhouse`, `mongodb`, `cursor`, `expo`, `sanity`, `composio`, `airtable`, `cal`, `clay`, `opencode.ai`, `lovable`
- **AI & LLM Platforms:** `claude`, `elevenlabs`, `mistral.ai`, `together.ai`, `x.ai`, `replicate`, `runwayml`, `cohere`, `minimax`, `ollama`, `voltagent`
- **Productivity & Collaboration:** `notion`, `figma`, `framer`, `webflow`, `miro`, `slack`, `superhuman`, `zapier`, `intercom`
- **Consumer & Tech Giants:** `apple`, `airbnb`, `spotify`, `uber`, `nike`, `tesla`, `spacex`, `playstation`, `meta`, `nvidia`, `pinterest`, `shopify`, `starbucks`, `ibm`, `hp`, `dell-1996`, `vodafone`
- **Auto & Luxury:** `bmw`, `bmw-m`, `ferrari`, `lamborghini`, `bugatti`, `renault`
- **Fintech & Crypto:** `coinbase`, `revolut`, `wise`, `mastercard`, `kraken`, `binance`
- **Media:** `theverge`, `wired`, `nintendo-2001`

## How to Apply a Brand Design System

เมื่อผู้ใช้สั่งออกแบบตามแบรนด์ (เช่น `/medesign like linear`, `/medesign like stripe`, `/medesign metha`):

1. **ลำดับการค้นหาไฟล์สเปก (Resolution Hierarchy & Fallback):**
   - **Preset ภายในระบบ:** หากเป็น `metha`, `apple`, `tesla` ให้อ่านจาก `presets/<name>/guidelines.md` และ `presets/<name>/design-tokens.css`
   - **Upstream Cache:** หากมีโฟลเดอร์ `awesome-design-md-src/design-md/<brand>/DESIGN.md` ให้อ่านสเปกจากไฟล์ดังกล่าว
   - **Live Web Extraction Fallback:** หากไม่มีไฟล์ในเครื่อง และเข้าถึงอินเทอร์เน็ตได้ ให้เรียกโหมด `/medesign extract <url>` เพื่อสกัดโทเค็นสดจากเว็บไซต์จริง
   - **User Input Fallback:** หากไม่มีไฟล์ในเครื่องและเข้าเว็บไม่ได้ ให้แจ้งผู้ใช้ตามตรงและขอ URL หรือภาพหน้าจอ ห้ามเดาหรือแต่งค่า Token ขึ้นเองจากความจำเด็ดขาด (Anti-Hallucination)

2. **ดึงโทเค็นหลัก 4 เลเยอร์:**
   - **Colors:** สี Canvas, Surface, Hairline, และ Accent หลัก (เช่น Linear Dark `#08090a`, Supabase Emerald, Metha Electric Cyan `#00f5fb`)
   - **Typography:** คู่ฟอนต์ละติน-ไทย และ Line-height (เช่น Linear ใช้ `Geist` + `Noto Sans Thai`)
   - **Component Geometry:** รัศมีขอบ Concentric Radii และขนาดปุ่มตาม Control Ladder
   - **Lighting & Surface:** ใช้เส้น Hairline 1px และยกเลิกเงาดำฟุ้งบนการ์ด In-flow ทั้งหมด

3. **Brand-to-Layout Pairing Matrix (เฉพาะงาน App & Dashboard):**
   > [!IMPORTANT]
   > **ลำดับความสำคัญ:** สิ่งที่ผู้ใช้ระบุใน Brief Intake ชนะ Pairing Matrix นี้เสมอ และ Pairing Matrix มีผลบังคับเฉพาะงานประเภท Web Application, Dashboard, และ Cockpit เท่านั้น (หากเป็น Landing Page, Blog, หรือ Marketing ให้ใช้ Layout มาตรฐานของหน้านั้นๆ)

   - **Metha / Engineering Telemetry:** 3-Pane Cockpit Architecture (Top coordinate command deck, Left layer rail, Center spatial canvas, Right precision telemetry inspector & traverse table).
   - **BMW / Tesla / Automotive:** 3-Pane Cockpit Architecture (Top Command Deck, Left Telemetry/Filmstrip, Center Canvas, Right Docked Inspector).
   - **Linear / Raycast / DevTools:** Split Navigation Rail + Command Palette (Cmd+K) + High-density tabular grid with instant inline actions.
   - **Apple / Consumer Luxury:** Floating Frosted Glass Header + Generous Asymmetric Bento + Floating Action Capsules + Concentric Card Physics.
   - **Stripe / Fintech:** Seamless Multi-step Flow + Sticky Progress Summary on right + Clean Form Fields with micro-glow focus.
   - **Notion / Productivity:** Full-bleed distraction-free canvas + Side peek drawer + Minimalist Slash command menu.

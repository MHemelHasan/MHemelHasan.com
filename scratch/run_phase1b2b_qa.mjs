import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ARTIFACT_DIR = "/home/mhemelhasan/.gemini/antigravity-ide/brain/6bdbdc38-ebf5-4e24-96b1-24252f83c198";
const FRAMES_DIR = path.join(ARTIFACT_DIR, "scratch", "frames_social_ai");

fs.mkdirSync(FRAMES_DIR, { recursive: true });

async function getDebuggerUrl() {
  return new Promise((resolve, reject) => {
    http.get("http://127.0.0.1:9222/json/list", (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const list = JSON.parse(data);
          const page = list.find((p) => p.type === "page") || list[0];
          if (page && page.webSocketDebuggerUrl) {
            resolve(page.webSocketDebuggerUrl);
          } else {
            reject(new Error("No page target found"));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const cb = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) {
            cb.reject(new Error(msg.error.message));
          } else {
            cb.resolve(msg.result);
          }
        }
      };
    });
  }

  async send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(`Evaluation failed: ${JSON.stringify(res.exceptionDetails)}`);
    }
    return res.result?.value;
  }

  async captureScreenshot(filename, clip = null) {
    const params = { format: "png", fromSurface: true };
    if (clip) params.clip = clip;
    const res = await this.send("Page.captureScreenshot", params);
    const buffer = Buffer.from(res.data, "base64");
    const filepath = path.join(ARTIFACT_DIR, filename);
    fs.writeFileSync(filepath, buffer);
    console.log(`Saved screenshot: ${filename} (${buffer.length} bytes)`);
    return filepath;
  }

  async captureFrame(filename) {
    const res = await this.send("Page.captureScreenshot", { format: "png", fromSurface: true });
    const buffer = Buffer.from(res.data, "base64");
    const filepath = path.join(FRAMES_DIR, filename);
    fs.writeFileSync(filepath, buffer);
    return filepath;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function askQuestion(cdp, text) {
  return await cdp.evaluate(`(() => {
    const input = document.querySelector('[role="dialog"] input');
    if (!input) return false;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    nativeInputValueSetter.call(input, ${JSON.stringify(text)});
    input.dispatchEvent(new Event("input", { bubbles: true }));
    const form = input.closest("form");
    if (form) {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      return true;
    }
    return false;
  })()`);
}

async function runPhase1B2BQA() {
  console.log("Connecting to Chrome CDP...");
  const wsUrl = await getDebuggerUrl();
  const cdp = new CDPClient(wsUrl);
  await cdp.connect();
  console.log("Connected to Chrome CDP!");

  await cdp.send("Page.enable");
  await cdp.send("DOM.enable");
  await cdp.send("Runtime.enable");

  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 1280,
    height: 800,
    deviceScaleFactor: 2,
    mobile: false,
  });

  // Navigate to fresh homepage
  console.log("\n==================================================");
  console.log("TEST 1: HERO INPUT FOCUS VERIFICATION (LIGHT MODE)");
  console.log("==================================================");
  await cdp.send("Page.navigate", { url: "http://localhost:3001" });
  await sleep(1500);

  // Focus hero input
  await cdp.evaluate(`(() => {
    const heroInput = document.querySelector('#hero input');
    if (heroInput) {
      heroInput.focus();
    }
  })()`);
  await sleep(300);

  const heroFocusStyles = await cdp.evaluate(`(() => {
    const input = document.querySelector('#hero input');
    const form = input?.closest('form');
    if (!input || !form) return null;

    const inputStyles = window.getComputedStyle(input);
    const formStyles = window.getComputedStyle(form);

    return {
      inputOutlineStyle: inputStyles.outlineStyle,
      inputOutlineWidth: inputStyles.outlineWidth,
      inputBoxShadow: inputStyles.boxShadow,
      formBorderColor: formStyles.borderColor,
      formBoxShadow: formStyles.boxShadow,
      hasUglyRectangularOutline: inputStyles.outlineStyle !== "none" && inputStyles.outlineWidth !== "0px",
    };
  })()`);
  console.log("Hero Input Focus Styles:", heroFocusStyles);
  await cdp.captureScreenshot("focused_hero_input.png");

  console.log("\n==================================================");
  console.log("TEST 2: IMMERSIVE COMPOSER FOCUS VERIFICATION (LIGHT MODE)");
  console.log("==================================================");
  // Open conversation from header
  await cdp.evaluate(`(() => {
    const btns = Array.from(document.querySelectorAll("header button"));
    const convBtn = btns.find(b => b.textContent.includes("Start a Conversation"));
    if (convBtn) convBtn.click();
  })()`);
  await sleep(500);

  // Reset to clean approved state
  await cdp.evaluate(`(() => {
    const resetBtn = document.querySelector('[aria-label="Reset conversation"]');
    if (resetBtn) resetBtn.click();
  })()`);
  await sleep(400);

  // Focus composer input inside modal
  await cdp.evaluate(`(() => {
    const modalInput = document.querySelector('[role="dialog"] input');
    if (modalInput) modalInput.focus();
  })()`);
  await sleep(300);

  const composerFocusStyles = await cdp.evaluate(`(() => {
    const input = document.querySelector('[role="dialog"] input');
    const form = input?.closest('form');
    if (!input || !form) return null;

    const inputStyles = window.getComputedStyle(input);
    const formStyles = window.getComputedStyle(form);

    return {
      inputOutlineStyle: inputStyles.outlineStyle,
      inputOutlineWidth: inputStyles.outlineWidth,
      inputBoxShadow: inputStyles.boxShadow,
      formBorderColor: formStyles.borderColor,
      formBoxShadow: formStyles.boxShadow,
      hasUglyRectangularOutline: inputStyles.outlineStyle !== "none" && inputStyles.outlineWidth !== "0px",
    };
  })()`);
  console.log("Composer Focus Styles (Light Mode):", composerFocusStyles);
  await cdp.captureScreenshot("focused_immersive_composer.png");

  console.log("\n==================================================");
  console.log("TEST 3: COMPOSER FOCUS VERIFICATION (DARK MODE)");
  console.log("==================================================");
  // Toggle to dark mode
  await cdp.evaluate(`(() => {
    const toggle = document.querySelector('[role="dialog"] button[aria-label*="mode"]') || document.querySelector('header button');
    const allBtns = Array.from(document.querySelectorAll("button"));
    const themeBtn = allBtns.find(b => b.querySelector("svg.lucide-sun") || b.querySelector("svg.lucide-moon"));
    if (themeBtn) themeBtn.click();
  })()`);
  await sleep(400);

  // Re-focus input in dark mode
  await cdp.evaluate(`(() => {
    const modalInput = document.querySelector('[role="dialog"] input');
    if (modalInput) modalInput.focus();
  })()`);
  await sleep(300);

  const darkFocusStyles = await cdp.evaluate(`(() => {
    const input = document.querySelector('[role="dialog"] input');
    const form = input?.closest('form');
    if (!input || !form) return null;

    const inputStyles = window.getComputedStyle(input);
    const formStyles = window.getComputedStyle(form);

    return {
      isDark: document.documentElement.classList.contains("dark"),
      inputOutlineStyle: inputStyles.outlineStyle,
      inputOutlineWidth: inputStyles.outlineWidth,
      inputBoxShadow: inputStyles.boxShadow,
      formBorderColor: formStyles.borderColor,
      hasUglyRectangularOutline: inputStyles.outlineStyle !== "none" && inputStyles.outlineWidth !== "0px",
    };
  })()`);
  console.log("Composer Focus Styles (Dark Mode):", darkFocusStyles);
  await cdp.captureScreenshot("focused_immersive_composer_dark.png");

  // Revert to light mode for the rest of tests
  await cdp.evaluate(`(() => {
    const allBtns = Array.from(document.querySelectorAll("button"));
    const themeBtn = allBtns.find(b => b.querySelector("svg.lucide-sun") || b.querySelector("svg.lucide-moon"));
    if (themeBtn) themeBtn.click();
  })()`);
  await sleep(400);

  console.log("\n==================================================");
  console.log("TEST 4: VISIBLE THINKING DURATION — SOCIAL AI (Target: 2500ms)");
  console.log("==================================================");
  await cdp.evaluate(`(() => {
    const resetBtn = document.querySelector('[aria-label="Reset conversation"]');
    if (resetBtn) resetBtn.click();
  })()`);
  await sleep(400);

  // Ask Social AI
  await askQuestion(cdp, "Tell me about Social AI");

  // Capture screenshot while thinking is visibly active (~1200ms mark)
  await sleep(1200);
  const thinkingActiveState = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const thinkingEl = dialog?.querySelector(".animate-pulse") || dialog?.querySelector(".animate-bounce");
    return {
      isThinkingVisible: !!thinkingEl,
      text: dialog?.textContent?.slice(0, 150),
    };
  })()`);
  console.log("Thinking state active at 1200ms:", thinkingActiveState);
  await cdp.captureScreenshot("thinking_state_active.png");

  // Wait for thinking to finish and transition to land (target: 2500ms + 180ms transition = ~2680ms; wait 2000ms more => 3200ms total)
  await sleep(2000);

  const socialAITiming = await cdp.evaluate(`window.__lastConversationTiming`);
  console.log("Social AI Measured Timing Telemetry:", socialAITiming);

  console.log("\n==================================================");
  console.log("TEST 5: VISIBLE THINKING DURATION — PRODUCTS (Target: 2600ms)");
  console.log("==================================================");
  await askQuestion(cdp, "Show me your products");

  // Wait for 2600ms + 180ms transition + buffer (~3200ms)
  await sleep(3200);

  const productsTiming = await cdp.evaluate(`window.__lastConversationTiming`);
  console.log("Products Measured Timing Telemetry:", productsTiming);

  console.log("\n==================================================");
  console.log("TEST 6: 5-REPEAT SOCIAL AI REPEATABILITY TEST");
  console.log("==================================================");
  const repeatResults = [];

  for (let i = 1; i <= 5; i++) {
    console.log(`\n--- Iteration ${i} of 5 ---`);
    // Reset conversation
    await cdp.evaluate(`(() => {
      const resetBtn = document.querySelector('[aria-label="Reset conversation"]');
      if (resetBtn) resetBtn.click();
    })()`);
    await sleep(400);

    // Click prompt chip "Social AI"
    await cdp.evaluate(`(() => {
      const dialog = document.querySelector('[role="dialog"]');
      const chip = Array.from(dialog?.querySelectorAll(".flex-wrap button") || []).find(b => b.textContent.trim() === "Social AI");
      if (chip) chip.click();
    })()`);

    // Verify thinking is active at 1000ms
    await sleep(1000);
    const midThinkingCheck = await cdp.evaluate(`(() => {
      const dialog = document.querySelector('[role="dialog"]');
      return dialog?.textContent?.includes("Social AI") && (dialog?.textContent?.includes("Looking through") || dialog?.textContent?.includes("Thinking"));
    })()`);

    // Wait until response arrives (~2500ms + 180ms = 2680ms; sleep 2000ms more => 3000ms total)
    await sleep(2000);

    const timing = await cdp.evaluate(`window.__lastConversationTiming`);
    const passed = timing && timing.visibleThinkingDuration >= 2490 && timing.visibleThinkingDuration <= 2700;
    repeatResults.push({
      run: i,
      midThinkingVisible: midThinkingCheck,
      configuredDuration: timing?.configuredVisibleDuration,
      visibleThinkingDuration: timing?.visibleThinkingDuration,
      totalElapsed: timing?.totalElapsed,
      passed,
    });
    console.log(`Run ${i} Result:`, repeatResults[repeatResults.length - 1]);
  }

  console.table(repeatResults);

  console.log("\n==================================================");
  console.log("TEST 7: CAPTURE SOCIAL AI ANIMATED WEBP FLOW");
  console.log("==================================================");
  // Reset conversation for clean video capture
  await cdp.evaluate(`(() => {
    const resetBtn = document.querySelector('[aria-label="Reset conversation"]');
    if (resetBtn) resetBtn.click();
  })()`);
  await sleep(400);

  console.log("Frame 1: Empty Welcoming State");
  await cdp.captureFrame("frame_01_empty.png");

  // Click "Social AI" prompt chip
  await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const chip = Array.from(dialog?.querySelectorAll(".flex-wrap button") || []).find(b => b.textContent.trim() === "Social AI");
    if (chip) chip.click();
  })()`);

  // Frame 2: Immediately after click - Query bubble appears + thinking starts (~300ms)
  await sleep(350);
  console.log("Frame 2: User Message + Thinking Active");
  await cdp.captureFrame("frame_02_query_appear.png");

  // Frame 3: Early-mid thinking pulse (900ms)
  await sleep(650);
  console.log("Frame 3: Mid-thinking pulse 1 (1000ms)");
  await cdp.captureFrame("frame_03_thinking_pulse1.png");

  // Frame 4: Mid-late thinking pulse (1800ms)
  await sleep(800);
  console.log("Frame 4: Mid-thinking pulse 2 (1800ms)");
  await cdp.captureFrame("frame_04_thinking_pulse2.png");

  // Frame 5: Response beginning / landing (~2680ms)
  await sleep(880);
  console.log("Frame 5: Response beginning / landing (2680ms)");
  await cdp.captureFrame("frame_05_response_landing.png");

  // Frame 6: Response fully rendered (3500ms)
  await sleep(900);
  console.log("Frame 6: Response fully rendered");
  await cdp.captureFrame("frame_06_response_complete.png");

  // Compile frames into animated WebP
  console.log("Compiling animated WebP via Python Pillow...");
  const pythonScript = `
import os
from PIL import Image

frames_dir = "${FRAMES_DIR}"
artifact_dir = "${ARTIFACT_DIR}"

frame_files = [
    "frame_01_empty.png",
    "frame_02_query_appear.png",
    "frame_03_thinking_pulse1.png",
    "frame_04_thinking_pulse2.png",
    "frame_05_response_landing.png",
    "frame_06_response_complete.png"
]

images = []
durations = [1200, 650, 800, 880, 900, 2500]

for f in frame_files:
    img_path = os.path.join(frames_dir, f)
    if os.path.exists(img_path):
        img = Image.open(img_path)
        images.append(img.convert("RGB"))

if images:
    output_path = os.path.join(artifact_dir, "social_ai_thinking_flow.webp")
    images[0].save(
        output_path,
        save_all=True,
        append_images=images[1:],
        duration=durations[:len(images)],
        loop=0,
        quality=85,
        method=6
    )
    print(f"Generated animated WebP: {output_path} ({os.path.getsize(output_path)} bytes)")
else:
    print("No images found to compile")
`;
  fs.writeFileSync(path.join(ARTIFACT_DIR, "scratch", "compile_social_ai_webp.py"), pythonScript);
  execSync("python3 " + path.join(ARTIFACT_DIR, "scratch", "compile_social_ai_webp.py"), { stdio: "inherit" });

  console.log("\n==================================================");
  console.log("TEST 8: REGRESSION LOCK VERIFICATION");
  console.log("==================================================");
  // Reset and verify approved state
  await cdp.evaluate(`(() => {
    const resetBtn = document.querySelector('[aria-label="Reset conversation"]');
    if (resetBtn) resetBtn.click();
  })()`);
  await sleep(400);

  const regressionCheck = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const heading = dialog?.querySelector("h3")?.textContent?.trim() || "";
    const promptButtons = Array.from(dialog?.querySelectorAll(".flex-wrap button") || []).map(b => b.textContent.trim());
    return {
      isHeadingApproved: heading === "Hi — what would you like to explore?",
      promptCount: promptButtons.length,
      prompts: promptButtons,
    };
  })()`);
  console.log("Regression Check (Approved Empty State):", regressionCheck);

  // Close dialog and check static sections
  await cdp.evaluate(`(() => {
    const closeBtn = document.querySelector('[aria-label="Close conversation"]');
    if (closeBtn) closeBtn.click();
  })()`);
  await sleep(400);

  const staticCheck = await cdp.evaluate(`(() => {
    return {
      hasHero: !!document.querySelector('#hero'),
      hasVentures: !!document.querySelector('#ventures'),
      hasProducts: !!document.querySelector('#products'),
      hasPipeline: !!document.querySelector('#pipeline'),
      hasEngineering: !!document.querySelector('#engineering'),
      hasJourney: !!document.querySelector('#journey'),
      hasContact: !!document.querySelector('#contact'),
    };
  })()`);
  console.log("Static Section Regression Check:", staticCheck);

  // Save telemetry JSON
  const telemetryOutput = {
    socialAI: socialAITiming,
    products: productsTiming,
    repeatabilityRuns: repeatResults,
  };
  fs.writeFileSync(path.join(ARTIFACT_DIR, "phase1b2b_timing_telemetry.json"), JSON.stringify(telemetryOutput, null, 2));

  cdp.close();
  console.log("\nPhase 1B.2B QA Run Completed Successfully!");
}

runPhase1B2BQA().catch((err) => {
  console.error("QA Run Error:", err);
  process.exit(1);
});

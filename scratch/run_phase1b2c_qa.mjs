import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const ARTIFACT_DIR = "/home/mhemelhasan/.gemini/antigravity-ide/brain/c783a11b-bbc1-41c1-b26a-1bcec838cea6";
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

async function getDebuggerUrl() {
  return new Promise((resolve, reject) => {
    http.get("http://127.0.0.1:9222/json/list", (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const list = JSON.parse(data);
          const page = list.find((p) => p.type === "page" && p.url.includes("3000")) || list.find((p) => p.type === "page");
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

  async captureScreenshot(filename) {
    const res = await this.send("Page.captureScreenshot", { format: "png", fromSurface: true });
    const buffer = Buffer.from(res.data, "base64");
    const filepath = path.join(ARTIFACT_DIR, filename);
    fs.writeFileSync(filepath, buffer);
    console.log(`Saved screenshot: ${filename} (${buffer.length} bytes)`);
    return filepath;
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  console.log("=== PHASE 1B.2C REAL BROWSER QA TEST SUITE ===");
  const wsUrl = await getDebuggerUrl();
  console.log("Connected to Chrome via CDP:", wsUrl);

  const cdp = new CDPClient(wsUrl);
  await cdp.connect();

  await cdp.send("Page.enable");
  await cdp.send("DOM.enable");
  await cdp.send("Runtime.enable");

  // Navigate to fresh page
  await cdp.send("Page.navigate", { url: "http://127.0.0.1:3000/" });
  await sleep(2500);

  const results = {
    testA_socialAI_repeats: [],
    testB_products: null,
    testC_journey: null,
    testD_reducedMotion: null,
    testD_reducedMotion_hook: null,
  };

  async function resetAndOpen() {
    await cdp.evaluate(`(() => {
      // Find reset button by aria-label or title
      const resetBtn = document.querySelector('button[aria-label="Reset conversation"]') ||
                       document.querySelector('button[title*="Reset"]');
      if (resetBtn) resetBtn.click();
      window.sessionStorage.clear();
      // Ensure conversation modal is open
      window.dispatchEvent(new CustomEvent('portfolio:ask', { detail: '' }));
    })()`);
    await sleep(400);
  }

  async function sendQuery(query) {
    return await cdp.evaluate(`(() => {
      const input = document.querySelector('input[aria-label="Type your message"]') || document.querySelector('form input');
      if (input) {
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeSetter.call(input, ${JSON.stringify(query)});
        input.dispatchEvent(new Event('input', { bubbles: true }));
        const form = input.closest('form');
        if (form) {
          const submitBtn = form.querySelector('button[type="submit"]');
          if (submitBtn) {
            submitBtn.click();
            return true;
          } else if (form.requestSubmit) {
            form.requestSubmit();
            return true;
          }
        }
      }
      window.dispatchEvent(new CustomEvent('portfolio:ask', { detail: ${JSON.stringify(query)} }));
      return true;
    })()`);
  }

  async function checkState() {
    return await cdp.evaluate(`(() => {
      const textMatch = Array.from(document.querySelectorAll('span')).find(s => 
        s.textContent.includes('Looking through') || 
        s.textContent.includes('Thinking') || 
        s.textContent.includes('Pulling') ||
        s.textContent.includes('Connecting') ||
        s.textContent.includes('Checking')
      );
      const assistantMessages = document.querySelectorAll('[data-role="assistant-message"]');
      const userMessages = document.querySelectorAll('[data-role="user-message"]');
      return {
        thinkingVisible: Boolean(textMatch),
        thinkingText: textMatch ? textMatch.textContent : null,
        assistantCount: assistantMessages.length,
        userCount: userMessages.length
      };
    })()`);
  }

  // ==========================================
  // TEST A: Social AI (Repeat 5 times)
  // Target: ~2500ms visible hold
  // ==========================================
  console.log("\n--- TEST A: Social AI 5-Repeat Verification (Target: 2500ms) ---");

  for (let i = 1; i <= 5; i++) {
    await resetAndOpen();
    console.log(`\n[Run ${i}/5] Submitting "Tell me about Social AI"...`);
    await sendQuery("Tell me about Social AI");

    // Check at +150ms
    await sleep(150);
    const at150 = await checkState();
    console.log(`  At +150ms: thinkingVisible=${at150.thinkingVisible}, text="${at150.thinkingText}", assistantCount=${at150.assistantCount}`);

    // Check at +1200ms
    await sleep(1050);
    const at1200 = await checkState();
    console.log(`  At +1200ms: thinkingVisible=${at1200.thinkingVisible}, assistantCount=${at1200.assistantCount}`);

    // Check at +2200ms
    await sleep(1000);
    const at2200 = await checkState();
    console.log(`  At +2200ms: thinkingVisible=${at2200.thinkingVisible}, assistantCount=${at2200.assistantCount}`);

    // Wait until response appears (~2800ms total from send)
    await sleep(600);
    const afterComplete = await checkState();
    console.log(`  At +2800ms: thinkingVisible=${afterComplete.thinkingVisible}, assistantCount=${afterComplete.assistantCount}`);

    const timing = await cdp.evaluate(`window.__lastConversationTiming`);
    console.log(`  Telemetry: visibleThinkingDuration=${timing?.visibleThinkingDuration?.toFixed(1)}ms | configured=${timing?.configuredVisibleDuration}ms | usedWatchdog=${timing?.usedWatchdogFallback} | reducedMotion=${timing?.reducedMotionEnabled}`);

    results.testA_socialAI_repeats.push({
      run: i,
      at150,
      at1200,
      at2200,
      afterComplete,
      timing,
    });
  }

  // ==========================================
  // TEST B: Products (~2600ms visible hold)
  // ==========================================
  console.log("\n--- TEST B: Products Verification (Target: 2600ms) ---");
  await resetAndOpen();
  console.log('Submitting "What products have you shipped?"...');
  await sendQuery("What products have you shipped?");

  await sleep(200);
  const prodAt200 = await checkState();
  console.log(`  At +200ms: thinkingVisible=${prodAt200.thinkingVisible}, text="${prodAt200.thinkingText}", assistantCount=${prodAt200.assistantCount}`);

  await sleep(1500);
  const prodAt1700 = await checkState();
  console.log(`  At +1700ms: thinkingVisible=${prodAt1700.thinkingVisible}, assistantCount=${prodAt1700.assistantCount}`);

  await sleep(700);
  const prodAt2400 = await checkState();
  console.log(`  At +2400ms: thinkingVisible=${prodAt2400.thinkingVisible}, assistantCount=${prodAt2400.assistantCount}`);

  await sleep(600);
  const prodAfter = await checkState();
  console.log(`  At +3000ms: thinkingVisible=${prodAfter.thinkingVisible}, assistantCount=${prodAfter.assistantCount}`);

  const prodTiming = await cdp.evaluate(`window.__lastConversationTiming`);
  console.log(`  Telemetry: visibleThinkingDuration=${prodTiming?.visibleThinkingDuration?.toFixed(1)}ms | configured=${prodTiming?.configuredVisibleDuration}ms | usedWatchdog=${prodTiming?.usedWatchdogFallback}`);
  results.testB_products = { prodAt200, prodAt1700, prodAt2400, prodAfter, prodTiming };

  // ==========================================
  // TEST C: Journey (~2400ms visible hold)
  // ==========================================
  console.log("\n--- TEST C: Journey Verification (Target: 2400ms) ---");
  await resetAndOpen();
  console.log('Submitting "Tell me about your career background"...');
  await sendQuery("Tell me about your career background");

  await sleep(200);
  const jourAt200 = await checkState();
  console.log(`  At +200ms: thinkingVisible=${jourAt200.thinkingVisible}, text="${jourAt200.thinkingText}", assistantCount=${jourAt200.assistantCount}`);

  await sleep(1500);
  const jourAt1700 = await checkState();
  console.log(`  At +1700ms: thinkingVisible=${jourAt1700.thinkingVisible}, assistantCount=${jourAt1700.assistantCount}`);

  await sleep(600);
  const jourAt2300 = await checkState();
  console.log(`  At +2300ms: thinkingVisible=${jourAt2300.thinkingVisible}, assistantCount=${jourAt2300.assistantCount}`);

  await sleep(500);
  const jourAfter = await checkState();
  console.log(`  At +2800ms: thinkingVisible=${jourAfter.thinkingVisible}, assistantCount=${jourAfter.assistantCount}`);

  const jourTiming = await cdp.evaluate(`window.__lastConversationTiming`);
  console.log(`  Telemetry: visibleThinkingDuration=${jourTiming?.visibleThinkingDuration?.toFixed(1)}ms | configured=${jourTiming?.configuredVisibleDuration}ms | usedWatchdog=${jourTiming?.usedWatchdogFallback}`);
  results.testC_journey = { jourAt200, jourAt1700, jourAt2300, jourAfter, jourTiming };

  // ==========================================
  // TEST D1: Reduced Motion via Chrome Media Emulation
  // Expected: Holds visible for full ~2500ms, NEVER 0ms!
  // ==========================================
  console.log("\n--- TEST D1: Native Emulation prefers-reduced-motion: reduce ---");
  await cdp.send("Emulation.setEmulatedMedia", {
    media: "screen",
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });

  await resetAndOpen();
  console.log('Submitting "Tell me about Social AI" under prefers-reduced-motion...');
  await sendQuery("Tell me about Social AI");

  // Check at 300ms — MUST BE VISIBLE, NOT 0ms instant response!
  await sleep(300);
  const rmAt300 = await checkState();
  console.log(`  At +300ms: thinkingVisible=${rmAt300.thinkingVisible} (MUST BE TRUE), assistantCount=${rmAt300.assistantCount} (MUST BE 0)`);

  // Check at 1500ms
  await sleep(1200);
  const rmAt1500 = await checkState();
  console.log(`  At +1500ms: thinkingVisible=${rmAt1500.thinkingVisible} (MUST BE TRUE), assistantCount=${rmAt1500.assistantCount} (MUST BE 0)`);

  // Check at 2200ms
  await sleep(700);
  const rmAt2200 = await checkState();
  console.log(`  At +2200ms: thinkingVisible=${rmAt2200.thinkingVisible} (MUST BE TRUE), assistantCount=${rmAt2200.assistantCount} (MUST BE 0)`);

  // Wait for completion (~2600ms total)
  await sleep(500);
  const rmAfter = await checkState();
  console.log(`  At +2700ms: thinkingVisible=${rmAfter.thinkingVisible}, assistantCount=${rmAfter.assistantCount} (MUST BE 1)`);

  const rmTiming = await cdp.evaluate(`window.__lastConversationTiming`);
  console.log(`  Telemetry: visibleThinkingDuration=${rmTiming?.visibleThinkingDuration?.toFixed(1)}ms | configured=${rmTiming?.configuredVisibleDuration}ms | reducedMotion=${rmTiming?.reducedMotionEnabled} | usedWatchdog=${rmTiming?.usedWatchdogFallback}`);
  results.testD_reducedMotion = { rmAt300, rmAt1500, rmAt2200, rmAfter, rmTiming };

  // Reset media emulation
  await cdp.send("Emulation.setEmulatedMedia", { features: [] });

  // ==========================================
  // TEST D2: Test Hooks (__forceReducedMotion & html.reduce-motion)
  // ==========================================
  console.log("\n--- TEST D2: Test Hooks (__forceReducedMotion & html.reduce-motion) ---");
  await cdp.evaluate(`(() => {
    window.__forceReducedMotion = true;
    document.documentElement.classList.add("reduce-motion");
  })()`);

  await resetAndOpen();
  console.log('Submitting "Tell me about Social AI" under test hooks...');
  await sendQuery("Tell me about Social AI");

  await sleep(300);
  const hookAt300 = await checkState();
  console.log(`  Hook At +300ms: thinkingVisible=${hookAt300.thinkingVisible} (MUST BE TRUE), assistantCount=${hookAt300.assistantCount} (MUST BE 0)`);

  await sleep(1500);
  const hookAt1800 = await checkState();
  console.log(`  Hook At +1800ms: thinkingVisible=${hookAt1800.thinkingVisible} (MUST BE TRUE), assistantCount=${hookAt1800.assistantCount} (MUST BE 0)`);

  await sleep(800);
  const hookAfter = await checkState();
  console.log(`  Hook At +2600ms: thinkingVisible=${hookAfter.thinkingVisible}, assistantCount=${hookAfter.assistantCount} (MUST BE 1)`);

  const hookTiming = await cdp.evaluate(`window.__lastConversationTiming`);
  console.log(`  Hook Telemetry: visibleThinkingDuration=${hookTiming?.visibleThinkingDuration?.toFixed(1)}ms | configured=${hookTiming?.configuredVisibleDuration}ms | reducedMotion=${hookTiming?.reducedMotionEnabled} | usedWatchdog=${hookTiming?.usedWatchdogFallback}`);
  results.testD_reducedMotion_hook = { hookAt300, hookAt1800, hookAfter, hookTiming };

  // Cleanup test hooks
  await cdp.evaluate(`(() => {
    delete window.__forceReducedMotion;
    document.documentElement.classList.remove("reduce-motion");
  })()`);

  // Take screenshot of finished state
  await cdp.captureScreenshot("phase1b2c_qa_screenshot.png");

  // Output JSON report
  fs.writeFileSync(
    path.join(ARTIFACT_DIR, "phase1b2c_qa_results.json"),
    JSON.stringify(results, null, 2)
  );
  console.log("\n=== QA RUN COMPLETE ===");
  console.log("Results written to:", path.join(ARTIFACT_DIR, "phase1b2c_qa_results.json"));

  cdp.close();
}

run().catch((e) => {
  console.error("QA execution failed:", e);
  process.exit(1);
});

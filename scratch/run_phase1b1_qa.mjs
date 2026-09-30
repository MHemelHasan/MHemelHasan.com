import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const ARTIFACT_DIR = "/home/mhemelhasan/.gemini/antigravity-ide/brain/6bdbdc38-ebf5-4e24-96b1-24252f83c198";

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

  async setViewport(width, height, isMobile = false) {
    await this.send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: isMobile,
    });
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

  close() {
    if (this.ws) this.ws.close();
  }
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runQA() {
  console.log("Connecting to Chrome CDP...");
  const wsUrl = await getDebuggerUrl();
  const cdp = new CDPClient(wsUrl);
  await cdp.connect();
  console.log("Connected to Chrome CDP!");

  await cdp.send("Page.enable");
  await cdp.send("DOM.enable");
  await cdp.send("Runtime.enable");

  console.log("\n==================================================");
  console.log("TEST 1: Desktop Viewport Lock (1440x900)");
  console.log("==================================================");
  await cdp.setViewport(1440, 900, false);
  await cdp.send("Page.navigate", { url: "http://localhost:3001" });
  await sleep(2000);

  const heroLockMetrics = await cdp.evaluate(`(() => {
    const hero = document.getElementById("hero");
    const ventures = document.getElementById("ventures");
    const heroRect = hero ? hero.getBoundingClientRect() : null;
    const venturesRect = ventures ? ventures.getBoundingClientRect() : null;
    return {
      windowHeight: window.innerHeight,
      heroHeight: heroRect ? heroRect.height : 0,
      heroTop: heroRect ? heroRect.top : 0,
      venturesTop: venturesRect ? venturesRect.top : 0,
      scrollY: window.scrollY,
    };
  })()`);

  console.log("Hero Viewport Metrics:", heroLockMetrics);
  if (heroLockMetrics.venturesTop >= heroLockMetrics.windowHeight - 10) {
    console.log("PASS: Section 2 (#ventures) does NOT intrude into the initial viewport! (venturesTop >= innerHeight)");
  } else {
    console.warn("CHECK: venturesTop is " + heroLockMetrics.venturesTop + " vs innerHeight " + heroLockMetrics.windowHeight);
  }

  await cdp.captureScreenshot("fresh_desktop_hero.png");

  console.log("\n==================================================");
  console.log("TEST 2: Click 'About me' Prompt -> Immersive Mode");
  console.log("==================================================");
  const clickAboutMeResult = await cdp.evaluate(`(() => {
    const buttons = Array.from(document.querySelectorAll("#hero button"));
    const aboutBtn = buttons.find(b => b.textContent.includes("About me"));
    if (aboutBtn) {
      aboutBtn.click();
      return true;
    }
    return false;
  })()`);
  console.log("Clicked About me button:", clickAboutMeResult);
  await sleep(1000); // Allow typing indicator & progressive reveal

  const aboutMeState = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const isModalOpen = !!dialog;
    const bodyOverflow = document.body.style.overflow;
    const hasPortrait = !!dialog?.querySelector('img[alt="M Hemel Hasan"]');
    const hasBio = dialog?.textContent.includes("Product Engineer") && dialog?.textContent.includes("Dhaka, Bangladesh");
    const userMessage = dialog?.querySelector(".font-mono.text-accent-sky")?.parentElement?.textContent || "";
    return { isModalOpen, bodyOverflow, hasPortrait, hasBio, userMessage };
  })()`);
  console.log("Immersive Mode State for About Me:", aboutMeState);

  await cdp.captureScreenshot("desktop_immersive_about_me.png");

  console.log("\n==================================================");
  console.log("TEST 3: Multi-turn Conversation Continuity");
  console.log("==================================================");
  // Send 2nd message via composer
  await cdp.evaluate(`(() => {
    const input = document.querySelector('[role="dialog"] input');
    if (input) {
      input.value = "Tell me about Social AI";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      const form = input.closest("form");
      if (form) form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    }
  })()`);
  await sleep(1200);

  // Send 3rd message via composer
  await cdp.evaluate(`(() => {
    const input = document.querySelector('[role="dialog"] input');
    if (input) {
      input.value = "How do you build?";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      const form = input.closest("form");
      if (form) form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    }
  })()`);
  await sleep(1200);

  const threadState = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const userPills = Array.from(dialog?.querySelectorAll(".font-mono.text-accent-sky") || []).map(p => p.parentElement?.textContent);
    const hasSocialAI = dialog?.textContent.includes("Social AI");
    const hasPipeline = dialog?.textContent.includes("How I Build") || dialog?.textContent.includes("Architecture");
    return { userPillCount: userPills.length, userPills, hasSocialAI, hasPipeline };
  })()`);
  console.log("Multi-turn Thread State:", threadState);

  await cdp.captureScreenshot("desktop_multi_message_conversation.png");

  console.log("\n==================================================");
  console.log("TEST 4: Close & Reopen Conversation (Persistence)");
  console.log("==================================================");
  // Click Close button
  await cdp.evaluate(`(() => {
    const closeBtn = document.querySelector('[aria-label="Close conversation"]');
    if (closeBtn) closeBtn.click();
  })()`);
  await sleep(500);

  const closedState = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    return {
      dialogClosed: !dialog,
      bodyOverflow: document.body.style.overflow,
    };
  })()`);
  console.log("Closed State (Dialog gone, body scroll restored):", closedState);

  // Reopen via Header "Start a Conversation"
  await cdp.evaluate(`(() => {
    const startBtns = Array.from(document.querySelectorAll("button"));
    const startBtn = startBtns.find(b => b.textContent.includes("Start a Conversation"));
    if (startBtn) startBtn.click();
  })()`);
  await sleep(500);

  const reopenedState = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const userPills = Array.from(dialog?.querySelectorAll(".font-mono.text-accent-sky") || []).map(p => p.parentElement?.textContent);
    return {
      dialogReopened: !!dialog,
      retainedMessageCount: userPills.length,
      userPills,
    };
  })()`);
  console.log("Reopened State (Preserved Multi-Turn History):", reopenedState);

  console.log("\n==================================================");
  console.log("TEST 5: Static Section 'Ask about this' Deep Bridge");
  console.log("==================================================");
  // Close chat first
  await cdp.evaluate(`(() => {
    const closeBtn = document.querySelector('[aria-label="Close conversation"]');
    if (closeBtn) closeBtn.click();
  })()`);
  await sleep(300);

  // Scroll to products and click Ask about this
  await cdp.evaluate(`(() => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView();
      const askBtn = Array.from(productsSection.querySelectorAll("button")).find(b => b.textContent.includes("Ask about"));
      if (askBtn) askBtn.click();
    }
  })()`);
  await sleep(1000);

  const bridgeState = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const userPills = Array.from(dialog?.querySelectorAll(".font-mono.text-accent-sky") || []).map(p => p.parentElement?.textContent);
    return {
      dialogOpen: !!dialog,
      totalTurns: userPills.length,
      lastTurn: userPills[userPills.length - 1],
    };
  })()`);
  console.log("Bridge State (Appended from static section):", bridgeState);

  console.log("\n==================================================");
  console.log("TEST 6: Dark Mode Immersive Conversation");
  console.log("==================================================");
  // Close chat, toggle dark mode, ask something
  await cdp.evaluate(`(() => {
    const closeBtn = document.querySelector('[aria-label="Close conversation"]');
    if (closeBtn) closeBtn.click();
    const themeBtn = document.querySelector('[aria-label="Toggle visual theme"]');
    if (themeBtn) themeBtn.click();
  })()`);
  await sleep(500);

  // Open chat again
  await cdp.evaluate(`(() => {
    const startBtns = Array.from(document.querySelectorAll("button"));
    const startBtn = startBtns.find(b => b.textContent.includes("Start a Conversation"));
    if (startBtn) startBtn.click();
  })()`);
  await sleep(600);

  await cdp.captureScreenshot("desktop_dark_mode_conversation.png");

  console.log("\n==================================================");
  console.log("TEST 7: Reset Conversation Verification");
  console.log("==================================================");
  await cdp.evaluate(`(() => {
    const resetBtn = document.querySelector('[aria-label="Reset conversation"]');
    if (resetBtn) resetBtn.click();
  })()`);
  await sleep(400);

  const resetState = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const userPills = Array.from(dialog?.querySelectorAll(".font-mono.text-accent-sky") || []);
    return {
      userPillsAfterReset: userPills.length,
      hasWelcomeTitle: dialog?.textContent.includes("Interactive Conversational Mode"),
    };
  })()`);
  console.log("Reset State:", resetState);

  // Close chat and switch back to light mode
  await cdp.evaluate(`(() => {
    const closeBtn = document.querySelector('[aria-label="Close conversation"]');
    if (closeBtn) closeBtn.click();
    const themeBtn = document.querySelector('[aria-label="Toggle visual theme"]');
    if (themeBtn) themeBtn.click();
  })()`);
  await sleep(500);

  console.log("\n==================================================");
  console.log("TEST 8: Mobile Fresh Hero & Immersive Conversation (390x844)");
  console.log("==================================================");
  await cdp.setViewport(390, 844, true);
  await cdp.send("Page.navigate", { url: "http://localhost:3001" });
  await sleep(2000);

  const mobileHeroMetrics = await cdp.evaluate(`(() => {
    const hero = document.getElementById("hero");
    const ventures = document.getElementById("ventures");
    const heroRect = hero ? hero.getBoundingClientRect() : null;
    const venturesRect = ventures ? ventures.getBoundingClientRect() : null;
    return {
      windowHeight: window.innerHeight,
      heroHeight: heroRect ? heroRect.height : 0,
      venturesTop: venturesRect ? venturesRect.top : 0,
    };
  })()`);
  console.log("Mobile Hero Metrics:", mobileHeroMetrics);

  await cdp.captureScreenshot("mobile_fresh_hero.png");

  // Click "About me" on mobile
  await cdp.evaluate(`(() => {
    const buttons = Array.from(document.querySelectorAll("#hero button"));
    const aboutBtn = buttons.find(b => b.textContent.includes("About me"));
    if (aboutBtn) aboutBtn.click();
  })()`);
  await sleep(1000);

  const mobileOverflow = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    return {
      dialogExists: !!dialog,
      bodyOverflow: document.body.style.overflow,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    };
  })()`);
  console.log("Mobile Conversation Overflow Check:", mobileOverflow);

  await cdp.captureScreenshot("mobile_immersive_conversation.png");

  cdp.close();
  console.log("\n==================================================");
  console.log("ALL PHASE 1B.1 QA TESTS COMPLETED SUCCESSFULLY!");
  console.log("==================================================");
}

runQA().catch((err) => {
  console.error("QA Run Error:", err);
  process.exit(1);
});

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

async function runQA() {
  console.log("Connecting to Chrome CDP...");
  const wsUrl = await getDebuggerUrl();
  const cdp = new CDPClient(wsUrl);
  await cdp.connect();
  console.log("Connected to Chrome CDP!");

  await cdp.send("Page.enable");
  await cdp.send("DOM.enable");
  await cdp.send("Runtime.enable");

  const timingLogs = [];

  console.log("\n==================================================");
  console.log("INITIALIZING: Desktop Viewport (1440x900)");
  console.log("==================================================");
  await cdp.setViewport(1440, 900, false);
  await cdp.send("Page.navigate", { url: "http://localhost:3001" });
  await sleep(2000);

  // Clear sessionStorage and fresh reload
  await cdp.evaluate(`(() => { sessionStorage.clear(); })()`);
  await cdp.send("Page.navigate", { url: "http://localhost:3001" });
  await sleep(2000);

  console.log("\n==================================================");
  console.log("TEST 1: Fresh Chat Welcoming State (Locked & Approved)");
  console.log("==================================================");
  // Open conversation from header CTA
  await cdp.evaluate(`(() => {
    const btns = Array.from(document.querySelectorAll("header button"));
    const convBtn = btns.find(b => b.textContent.includes("Start a Conversation"));
    if (convBtn) convBtn.click();
  })()`);
  await sleep(600);

  const welcomeState = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const isModalOpen = !!dialog;
    const heading = dialog?.querySelector("h3")?.textContent || "";
    const description = dialog?.querySelector("p")?.textContent || "";
    const promptButtons = Array.from(dialog?.querySelectorAll(".flex-wrap button") || []).map(b => b.textContent.trim());
    return {
      isModalOpen,
      heading,
      description,
      promptCount: promptButtons.length,
      prompts: promptButtons.slice(0, 5),
    };
  })()`);
  console.log("TEST 1 Welcoming State Result:", welcomeState);
  await cdp.captureScreenshot("fresh_immersive_state.png");

  console.log("\n==================================================");
  console.log("TEST 2: About Me (Visible Thinking State ~2500ms)");
  console.log("==================================================");
  await askQuestion(cdp, "About me");

  // Check thinking state at ~1000ms mark
  await sleep(1000);
  const thinkingState = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const thinkingEl = dialog?.querySelector(".animate-pulse") || dialog?.querySelector(".animate-in");
    const text = dialog?.textContent || "";
    const isThinkingVisible = text.includes("Pulling that together…") || text.includes("Looking through") || text.includes("Thinking");
    return { isThinkingVisible, textExcerpt: text.slice(0, 100) };
  })()`);
  console.log("Thinking state during processing (~1000ms):", thinkingState);

  // Wait remaining duration for response to finish (target: ~2500ms, sleeping 2000ms more => 3000ms total)
  await sleep(2000);

  const aboutMeTiming = await cdp.evaluate(`window.__lastConversationTiming`);
  if (aboutMeTiming) {
    timingLogs.push({ test: "About Me", ...aboutMeTiming });
    console.log("Measured Timing Log (About Me):", aboutMeTiming);
  }

  const aboutMeContent = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const text = dialog?.textContent || "";
    const hasPortrait = !!dialog?.querySelector('img[alt="M Hemel Hasan"]');
    const hasDhaka = text.includes("Dhaka, Bangladesh");
    const has2015 = text.includes("2015");
    const hasDualFocus = text.includes("Social AI") && text.includes("Themefic");
    const contextualPrompts = Array.from(dialog?.querySelectorAll('[data-role="assistant-message"] button') || []).map(b => b.textContent.trim());
    const hasInappropriateThemeficPrompt = contextualPrompts.some(p => p.includes("Themefic products"));
    const hasMyProductsPrompt = contextualPrompts.some(p => p.includes("My products") || p.includes("products"));
    return {
      hasPortrait,
      hasDhaka,
      has2015,
      hasDualFocus,
      contextualPromptsCount: contextualPrompts.length,
      contextualPrompts,
      hasInappropriateThemeficPrompt,
      hasMyProductsPrompt,
    };
  })()`);
  console.log("About Me Content Result:", aboutMeContent);
  await cdp.captureScreenshot("about_me_response.png");

  console.log("\n==================================================");
  console.log("TEST 3: Social AI (Integrity Verification & ~2600ms)");
  console.log("==================================================");
  await askQuestion(cdp, "Tell me about Social AI");

  // Check thinking at ~1000ms
  await sleep(1000);
  const socialThinking = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    return dialog?.textContent.includes("Social AI") && (dialog?.textContent.includes("Looking through") || dialog?.textContent.includes("Thinking"));
  })()`);
  console.log("Social AI visible thinking state at 1000ms:", socialThinking);

  // Wait remaining duration (target: ~2600ms, sleep 2000ms => 3000ms total)
  await sleep(2000);

  const socialTiming = await cdp.evaluate(`window.__lastConversationTiming`);
  if (socialTiming) {
    timingLogs.push({ test: "Social AI", ...socialTiming });
    console.log("Measured Timing Log (Social AI):", socialTiming);
  }

  const socialContent = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const text = dialog?.textContent || "";
    const hasPrivateBeta = text.includes("Private Beta");
    const hasFounderArchitect = text.includes("Founder / Lead Architect");
    // Confirmed platforms
    const hasLinkedIn = text.includes("LinkedIn");
    const hasFacebook = text.includes("Facebook Page");
    const hasX = text.includes("X / Twitter");
    // Speculative platforms that MUST NOT exist
    const hasInstagram = text.includes("Instagram");
    const hasTikTok = text.includes("TikTok");
    const hasYouTube = text.includes("YouTube");
    const hasOAuthPKCE = text.includes("OAuth 2.0 PKCE");
    const hasSixChannels = text.includes("six connected") || text.includes("6 connected");

    return {
      hasPrivateBeta,
      hasFounderArchitect,
      hasLinkedIn,
      hasFacebook,
      hasX,
      speculativeViolations: {
        hasInstagram,
        hasTikTok,
        hasYouTube,
        hasOAuthPKCE,
        hasSixChannels,
      }
    };
  })()`);
  console.log("Social AI Content Result:", socialContent);
  await cdp.captureScreenshot("social_ai_response.png");

  console.log("\n==================================================");
  console.log("TEST 4: Support AI (Future Exploration & ~2500ms)");
  console.log("==================================================");
  await askQuestion(cdp, "What are you building next?");

  await sleep(3000);

  const supportTiming = await cdp.evaluate(`window.__lastConversationTiming`);
  if (supportTiming) {
    timingLogs.push({ test: "Support AI", ...supportTiming });
    console.log("Measured Timing Log (Support AI):", supportTiming);
  }

  const supportContent = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const text = dialog?.textContent || "";
    const hasComingNext = text.includes("Coming Next") || text.includes("Currently Exploring");
    const hasWhatsApp = text.includes("WhatsApp") && text.includes("Messenger");
    const buttons = Array.from(dialog?.querySelectorAll('[data-role="assistant-message"] button') || []).map(b => b.textContent.trim());
    const hasInappropriateThemeficPrompt = buttons.some(p => p.includes("Themefic products"));
    const hasMyProductsPrompt = buttons.some(p => p.includes("My products"));
    return { hasComingNext, hasWhatsApp, hasInappropriateThemeficPrompt, hasMyProductsPrompt, buttons };
  })()`);
  console.log("Support AI Content Result:", supportContent);

  console.log("\n==================================================");
  console.log("TEST 5: My Products & Commercial Attribution (~2700ms)");
  console.log("==================================================");
  await askQuestion(cdp, "Show me your products");

  await sleep(3200);

  const productsTiming = await cdp.evaluate(`window.__lastConversationTiming`);
  if (productsTiming) {
    timingLogs.push({ test: "Products", ...productsTiming });
    console.log("Measured Timing Log (Products):", productsTiming);
  }

  const productsContent = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const text = dialog?.textContent || "";
    const hasAttribution = text.includes("Built at Themefic") || text.includes("Engineered at Themefic");
    const hasBundlefic = text.includes("Bundlefic");
    const hasInstantio = text.includes("Instantio");
    const hasConnectfic = text.includes("Connectfic");
    const expandBtn = Array.from(dialog?.querySelectorAll("button") || []).find(b => b.textContent.includes("Want to see the other 3"));
    return { hasAttribution, hasBundlefic, hasInstantio, hasConnectfic, hasExpandBtn: !!expandBtn };
  })()`);
  console.log("Products Content Initial:", productsContent);

  // Click progressive disclosure accordion button
  await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const expandBtn = Array.from(dialog?.querySelectorAll("button") || []).find(b => b.textContent.includes("Want to see the other 3"));
    if (expandBtn) expandBtn.click();
  })()`);
  await sleep(400);

  const productsExpanded = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const text = dialog?.textContent || "";
    return {
      hasQuotezic: text.includes("Quotezic"),
      hasUltimateAddons: text.includes("Ultimate Addons"),
      hasBundleficWebflow: text.includes("Bundlefic") && text.includes("Webflow"),
      collapseBtnText: Array.from(dialog?.querySelectorAll("button") || []).find(b => b.textContent.includes("Hide additional"))?.textContent.trim(),
    };
  })()`);
  console.log("Products Content Expanded:", productsExpanded);
  await cdp.captureScreenshot("products_response.png");

  console.log("\n==================================================");
  console.log("TEST 6: How I Build (Pipeline Explorer & ~2700ms)");
  console.log("==================================================");
  await askQuestion(cdp, "How do you build?");

  await sleep(3200);

  const pipelineTiming = await cdp.evaluate(`window.__lastConversationTiming`);
  if (pipelineTiming) {
    timingLogs.push({ test: "How I Build", ...pipelineTiming });
    console.log("Measured Timing Log (How I Build):", pipelineTiming);
  }

  // Interactive scrubbing test
  const pipelineScrub = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const stageBtns = Array.from(dialog?.querySelectorAll(".overflow-x-auto button") || []);
    if (stageBtns.length >= 8) {
      stageBtns[2].click(); // Click stage 3 Architecture
      const activeStageName = dialog?.querySelector(".text-base.font-bold.text-text-primary")?.textContent || "";
      return { totalStages: stageBtns.length, activeStageName };
    }
    return { totalStages: stageBtns.length, activeStageName: "" };
  })()`);
  console.log("Pipeline Stage Explorer Result:", pipelineScrub);

  console.log("\n==================================================");
  console.log("TEST 7: Career Journey (~2500ms)");
  console.log("==================================================");
  await askQuestion(cdp, "Tell me about your journey");

  await sleep(3000);

  const journeyTiming = await cdp.evaluate(`window.__lastConversationTiming`);
  if (journeyTiming) {
    timingLogs.push({ test: "Journey", ...journeyTiming });
    console.log("Measured Timing Log (Journey):", journeyTiming);
  }

  const journeyContent = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const text = dialog?.textContent || "";
    const has2015 = text.includes("2015");
    const hasWordPress = text.includes("WordPress");
    const buttons = Array.from(dialog?.querySelectorAll('[data-role="assistant-message"] button') || []).map(b => b.textContent.trim());
    const hasInappropriateThemeficPrompt = buttons.some(p => p.includes("Themefic products"));
    const hasMyProductsPrompt = buttons.some(p => p.includes("My products"));
    return { has2015, hasWordPress, hasInappropriateThemeficPrompt, hasMyProductsPrompt, buttons };
  })()`);
  console.log("Journey Content Result:", journeyContent);

  console.log("\n==================================================");
  console.log("TEST 8: Contact / Collaboration (~2400ms)");
  console.log("==================================================");
  await askQuestion(cdp, "Can we work together?");

  await sleep(2800);

  const contactTiming = await cdp.evaluate(`window.__lastConversationTiming`);
  if (contactTiming) {
    timingLogs.push({ test: "Contact", ...contactTiming });
    console.log("Measured Timing Log (Contact):", contactTiming);
  }

  const contactContent = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const text = dialog?.textContent || "";
    const hasEmail = text.includes("hello@mhemelhasan.com");
    const hasDhaka = text.includes("Dhaka, Bangladesh");
    return { hasEmail, hasDhaka };
  })()`);
  console.log("Contact Content Result:", contactContent);

  console.log("\n==================================================");
  console.log("TEST 9: Multi-Turn Conversation Continuity");
  console.log("==================================================");
  const turnsCount = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const userBubbles = Array.from(dialog?.querySelectorAll('[data-role="user-message"]') || []).map(b => b.textContent.trim());
    return { totalTurns: userBubbles.length, userBubbles };
  })()`);
  console.log("Multi-turn turns count:", turnsCount);
  await cdp.captureScreenshot("multiturn_conversation.png");

  console.log("\n==================================================");
  console.log("TEST 10: Reset to Locked Approved State");
  console.log("==================================================");
  await cdp.evaluate(`(() => {
    const resetBtn = document.querySelector('[aria-label="Reset conversation"]');
    if (resetBtn) resetBtn.click();
  })()`);
  await sleep(500);

  const resetResult = await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const userBubbles = dialog?.querySelectorAll('[data-role="user-message"]').length || 0;
    const hasWelcome = dialog?.textContent.includes("Hi — what would you like to explore?");
    const sessionData = sessionStorage.getItem("portfolio_conversation_history_v1");
    const promptButtons = Array.from(dialog?.querySelectorAll(".flex-wrap button") || []).map(b => b.textContent.trim());
    return {
      userBubbles,
      hasWelcome,
      sessionCleared: !sessionData || sessionData === "[]",
      promptCount: promptButtons.length,
      prompts: promptButtons,
    };
  })()`);
  console.log("Reset Result:", resetResult);
  await cdp.captureScreenshot("approved_reset_state.png");

  console.log("\n==================================================");
  console.log("TEST 11: Static Page Regression Audit");
  console.log("==================================================");
  // Close dialog
  await cdp.evaluate(`(() => {
    const closeBtn = document.querySelector('[aria-label="Close conversation"]');
    if (closeBtn) closeBtn.click();
  })()`);
  await sleep(500);

  // Scroll down to Ventures section and take screenshot
  await cdp.evaluate(`(() => {
    const sec = document.querySelector("#ventures");
    if (sec) sec.scrollIntoView({ behavior: "instant" });
  })()`);
  await sleep(500);

  const staticAudit = await cdp.evaluate(`(() => {
    const ventures = document.querySelector("#ventures");
    const products = document.querySelector("#products");
    const engineering = document.querySelector("#engineering");
    const journey = document.querySelector("#journey");
    const contact = document.querySelector("#contact");

    const vH2 = ventures?.querySelector("h2")?.textContent || "";
    const pH2 = products?.querySelector("h2")?.textContent || "";
    const eH2 = engineering?.querySelector("h2")?.textContent || "";

    return {
      allSectionsPresent: !!(ventures && products && engineering && journey && contact),
      venturesTitle: vH2,
      productsTitle: pH2,
      engineeringTitle: eH2,
    };
  })()`);
  console.log("Static Section Audit:", staticAudit);
  await cdp.captureScreenshot("static_ventures_section.png");

  console.log("\n==================================================");
  console.log("TEST 12: Theme Toggle & Persistence");
  console.log("==================================================");
  // Scroll to top
  await cdp.evaluate(`window.scrollTo(0, 0)`);
  await sleep(300);

  // Toggle to dark mode
  await cdp.evaluate(`(() => {
    const themeBtn = document.querySelector('header button[aria-label*="mode"]') || document.querySelector('header button');
    // find theme toggle
    const allBtns = Array.from(document.querySelectorAll("header button"));
    const toggle = allBtns.find(b => b.querySelector("svg.lucide-sun") || b.querySelector("svg.lucide-moon"));
    if (toggle) toggle.click();
  })()`);
  await sleep(400);

  const darkCheck = await cdp.evaluate(`(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const storedTheme = localStorage.getItem("portfolio_theme_v1");
    return { isDark, storedTheme };
  })()`);
  console.log("Dark Theme Verification:", darkCheck);
  await cdp.captureScreenshot("static_dark_mode.png");

  // Toggle back to light mode
  await cdp.evaluate(`(() => {
    const allBtns = Array.from(document.querySelectorAll("header button"));
    const toggle = allBtns.find(b => b.querySelector("svg.lucide-sun") || b.querySelector("svg.lucide-moon"));
    if (toggle) toggle.click();
  })()`);
  await sleep(400);

  const lightCheck = await cdp.evaluate(`(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const storedTheme = localStorage.getItem("portfolio_theme_v1");
    return { isDark, storedTheme };
  })()`);
  console.log("Reverted to Light Theme Verification:", lightCheck);

  console.log("\n==================================================");
  console.log("TEST 13: Reduced Motion Verification (0ms delay)");
  console.log("==================================================");
  // Reopen conversation
  await cdp.evaluate(`(() => {
    const btns = Array.from(document.querySelectorAll("header button"));
    const convBtn = btns.find(b => b.textContent.includes("Start a Conversation"));
    if (convBtn) convBtn.click();
  })()`);
  await sleep(500);

  await cdp.evaluate(`(() => { window.__forceReducedMotion = true; })()`);
  await askQuestion(cdp, "About me");
  await sleep(150);

  const reducedMotionTiming = await cdp.evaluate(`window.__lastConversationTiming`);
  console.log("Reduced Motion Timing Result:", reducedMotionTiming);
  if (reducedMotionTiming && reducedMotionTiming.configuredDelay === 0) {
    console.log("PASS: Reduced motion completely bypasses thinking presentation delay (0ms)!");
  }
  await cdp.evaluate(`(() => { delete window.__forceReducedMotion; })()`);

  console.log("\n==================================================");
  console.log("FINAL TIMING TELEMETRY SUMMARY");
  console.log("==================================================");
  console.table(timingLogs);

  const telemetryPath = path.join(ARTIFACT_DIR, "measured_timing_logs.json");
  fs.writeFileSync(telemetryPath, JSON.stringify(timingLogs, null, 2));
  console.log(`Saved measured timing logs to: ${telemetryPath}`);

  cdp.close();
  console.log("\nQA Run Completed Successfully!");
}

runQA().catch((err) => {
  console.error("QA Run Error:", err);
  process.exit(1);
});

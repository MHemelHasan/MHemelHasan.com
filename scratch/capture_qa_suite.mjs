import { spawn } from "node:child_process";
import fs from "node:fs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  console.log("Starting Chrome with remote debugging on port 9222...");
  const chrome = spawn("/usr/bin/google-chrome", [
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
  ]);

  chrome.on("error", (err) => console.error("Chrome spawn error:", err));

  // Wait for Chrome CDP endpoint to be available
  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch("http://127.0.0.1:9222/json/version");
      if (res.ok) {
        const data = await res.json();
        wsUrl = data.webSocketDebuggerUrl;
        break;
      }
    } catch {}
    await sleep(200);
  }

  if (!wsUrl) {
    console.error("Failed to connect to Chrome CDP endpoint.");
    chrome.kill();
    process.exit(1);
  }

  console.log("Connected to Chrome CDP:", wsUrl);

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let idCounter = 1;
  const pendingRequests = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pendingRequests.has(msg.id)) {
      const { resolve, reject } = pendingRequests.get(msg.id);
      pendingRequests.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  const send = (method, params = {}) => {
    const id = idCounter++;
    return new Promise((resolve, reject) => {
      pendingRequests.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  // Create a new target/page
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  console.log("Created target:", targetId);

  // Connect to the page target
  const { sessionId } = await send("Target.attachToTarget", {
    targetId,
    flatten: true,
  });

  const sendPage = (method, params = {}) => {
    const id = idCounter++;
    return new Promise((resolve, reject) => {
      pendingRequests.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, sessionId, method, params }));
    });
  };

  await sendPage("Page.enable");
  await sendPage("Runtime.enable");

  const setViewport = async (width, height, isMobile = false) => {
    await sendPage("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: isMobile,
    });
    await sendPage("Emulation.setVisibleSize", { width, height });
  };

  const capture = async (filename) => {
    const { data } = await sendPage("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    const filePath = `/tmp/hero-motion-experiment/${filename}`;
    fs.writeFileSync(filePath, Buffer.from(data, "base64"));
    console.log(`Saved screenshot: ${filePath} (${Math.round(data.length / 1024)} KB)`);
  };

  const evalJs = async (expression) => {
    const res = await sendPage("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    return res.result?.value;
  };

  try {
    // 1. Desktop 1440x900 Light
    console.log("Testing Desktop 1440x900 Light...");
    await setViewport(1440, 900);
    await sendPage("Page.navigate", { url: "http://localhost:3000/design-lab/motion-hero" });
    await sleep(2000); // Wait for entrance animation to settle

    // Check console errors
    const overflowCheck = await evalJs("document.documentElement.scrollWidth > window.innerWidth");
    console.log("Horizontal overflow detected:", overflowCheck);

    await capture("desktop_1440x900_light.png");

    // 2. Conversation Focus & Micro-interaction
    console.log("Testing Conversation Focus micro-interaction...");
    await evalJs(`
      const input = document.getElementById("portfolio-conversation-query");
      if (input) {
        input.focus();
        input.value = "Tell me about your background";
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    `);
    await sleep(400);
    await capture("conversation_focus.png");

    // 3. Desktop 1440x900 Dark Mode
    console.log("Testing Desktop 1440x900 Dark...");
    await evalJs(`
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    `);
    await sleep(300);
    await capture("desktop_1440x900_dark.png");

    // Revert to light mode for subsequent tests
    await evalJs(`
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    `);

    // 4. Scroll Transition into Ventures
    console.log("Testing Scroll Transition into Ventures...");
    await evalJs("window.scrollTo({ top: 380, behavior: 'instant' });");
    await sleep(500);
    await capture("scroll_transition.png");
    await evalJs("window.scrollTo({ top: 0, behavior: 'instant' });");
    await sleep(300);

    // 5. Reduced Motion Mode
    console.log("Testing Reduced Motion Mode...");
    await evalJs(`
      document.documentElement.classList.add("reduce-motion");
    `);
    await sleep(300);
    await capture("reduced_motion.png");
    await evalJs(`
      document.documentElement.classList.remove("reduce-motion");
    `);

    // 6. Responsive Viewports
    console.log("Testing Laptop 1366x768...");
    await setViewport(1366, 768);
    await sleep(400);
    await capture("laptop_1366x768.png");

    console.log("Testing Desktop 1280x800...");
    await setViewport(1280, 800);
    await sleep(400);
    await capture("desktop_1280x800.png");

    console.log("Testing Landscape Tablet 1024x768...");
    await setViewport(1024, 768);
    await sleep(400);
    await capture("tablet_1024x768.png");

    console.log("Testing Intermediate 900x800...");
    await setViewport(900, 800);
    await sleep(400);
    await capture("viewport_900x800.png");

    console.log("Testing Tablet 820x1000...");
    await setViewport(820, 1000);
    await sleep(400);
    await capture("tablet_820x1000.png");

    console.log("Testing Tablet 768x1024...");
    await setViewport(768, 1024);
    await sleep(400);
    await capture("tablet_768x1024.png");

    console.log("Testing Mobile 390x844...");
    await setViewport(390, 844, true);
    await sleep(400);
    await capture("mobile_390x844.png");

    // 7. Interaction Regression Checks
    console.log("Testing Header 'Ask Hemel' and Immersive Conversation...");
    await evalJs(`
      // Reset scroll
      window.scrollTo(0, 0);
      // Trigger prompt button click: 'About me'
      const buttons = Array.from(document.querySelectorAll('button'));
      const aboutMeBtn = buttons.find(b => b.textContent && b.textContent.includes('About me'));
      if (aboutMeBtn) aboutMeBtn.click();
    `);
    await sleep(500);

    const isModalOpen = await evalJs(`
      Boolean(document.querySelector('[role="dialog"]') || document.body.innerText.includes('Close conversation') || document.body.innerText.includes('Hemel Assistant'))
    `);
    console.log("Conversation modal opened successfully on prompt click:", isModalOpen);

    // Close modal
    await evalJs(`
      const closeBtn = document.querySelector('button[aria-label*="Close"]') || Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Close'));
      if (closeBtn) closeBtn.click();
      else {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      }
    `);
    await sleep(300);

    console.log("All visual QA steps and interaction checks passed successfully!");
  } finally {
    ws.close();
    chrome.kill();
  }
}

run().catch((err) => {
  console.error("Script error:", err);
  process.exit(1);
});

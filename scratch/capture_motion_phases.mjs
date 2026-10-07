import { spawn } from "node:child_process";
import fs from "node:fs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  const chrome = spawn("/usr/bin/google-chrome", [
    "--headless=new",
    "--remote-debugging-port=9223",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch("http://127.0.0.1:9223/json/version");
      if (res.ok) {
        const data = await res.json();
        wsUrl = data.webSocketDebuggerUrl;
        break;
      }
    } catch {}
    await sleep(200);
  }

  if (!wsUrl) {
    chrome.kill();
    process.exit(1);
  }

  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = rej;
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

  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });

  const sendPage = (method, params = {}) => {
    const id = idCounter++;
    return new Promise((resolve, reject) => {
      pendingRequests.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, sessionId, method, params }));
    });
  };

  await sendPage("Page.enable");
  await sendPage("Runtime.enable");

  await sendPage("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });

  const capture = async (filename) => {
    const { data } = await sendPage("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    const filePath = `/tmp/hero-motion-experiment/${filename}`;
    fs.writeFileSync(filePath, Buffer.from(data, "base64"));
    console.log(`Captured: ${filePath}`);
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
    await sendPage("Page.navigate", { url: "http://localhost:3000/design-lab/motion-hero" });
    await sleep(2000); // Fully loaded

    // Test Pointer at Left (dispatching mousemove on hero)
    await evalJs(`
      const hero = document.getElementById("hero");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        hero.dispatchEvent(new MouseEvent("mousemove", {
          clientX: rect.left + 50,
          clientY: rect.top + rect.height * 0.4,
          bubbles: true
        }));
      }
    `);
    await sleep(400); // Wait for RAF lerp to settle
    await capture("pointer_parallax_left.png");

    // Test Pointer at Right (near portrait)
    await evalJs(`
      const hero = document.getElementById("hero");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        hero.dispatchEvent(new MouseEvent("mousemove", {
          clientX: rect.right - 80,
          clientY: rect.top + rect.height * 0.3,
          bubbles: true
        }));
      }
    `);
    await sleep(400); // Wait for RAF lerp to settle
    await capture("pointer_parallax_right.png");

    console.log("Pointer motion evidence captured successfully!");
  } finally {
    ws.close();
    chrome.kill();
  }
}

run().catch((err) => {
  console.error("Error in capture_motion_phases:", err);
  process.exit(1);
});

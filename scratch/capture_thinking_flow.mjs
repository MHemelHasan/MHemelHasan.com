import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ARTIFACT_DIR = "/home/mhemelhasan/.gemini/antigravity-ide/brain/6bdbdc38-ebf5-4e24-96b1-24252f83c198";
const FRAMES_DIR = path.join(ARTIFACT_DIR, "scratch", "frames");

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

  async captureScreenshot(filename) {
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

async function recordThinkingFlow() {
  const wsUrl = await getDebuggerUrl();
  const cdp = new CDPClient(wsUrl);
  await cdp.connect();

  await cdp.send("Page.enable");
  await cdp.send("DOM.enable");
  await cdp.send("Runtime.enable");

  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 1280,
    height: 800,
    deviceScaleFactor: 1.5,
    mobile: false,
  });

  // Navigate and reset conversation
  await cdp.send("Page.navigate", { url: "http://localhost:3001" });
  await sleep(1500);

  // Open conversation
  await cdp.evaluate(`(() => {
    const btns = Array.from(document.querySelectorAll("header button"));
    const convBtn = btns.find(b => b.textContent.includes("Start a Conversation"));
    if (convBtn) convBtn.click();
  })()`);
  await sleep(500);

  // Reset conversation to approved initial state
  await cdp.evaluate(`(() => {
    const resetBtn = document.querySelector('[aria-label="Reset conversation"]');
    if (resetBtn) resetBtn.click();
  })()`);
  await sleep(500);

  // Frame 1: Approved initial greeting
  console.log("Capturing Frame 1: Empty Welcoming State");
  await cdp.captureScreenshot("frame_01_empty.png");

  // Click "About me" prompt chip
  await cdp.evaluate(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const chip = Array.from(dialog?.querySelectorAll(".flex-wrap button") || []).find(b => b.textContent.includes("About me"));
    if (chip) chip.click();
  })()`);

  // Frame 2: Immediately after click - Query bubble appears + thinking starts (~300ms)
  await sleep(350);
  console.log("Capturing Frame 2: User Query Bubble + Thinking Active");
  await cdp.captureScreenshot("frame_02_query_appear.png");

  // Frame 3: Mid-thinking pulse (~1000ms mark)
  await sleep(650);
  console.log("Capturing Frame 3: Mid-thinking pulse (1000ms)");
  await cdp.captureScreenshot("frame_03_thinking_pulse1.png");

  // Frame 4: Late-thinking pulse (~1800ms mark)
  await sleep(800);
  console.log("Capturing Frame 4: Late-thinking pulse (1800ms)");
  await cdp.captureScreenshot("frame_04_thinking_pulse2.png");

  // Frame 5: Response landing (~2600ms mark)
  await sleep(800);
  console.log("Capturing Frame 5: Response beginning / landing");
  await cdp.captureScreenshot("frame_05_response_landing.png");

  // Frame 6: Response fully rendered (~3500ms mark)
  await sleep(900);
  console.log("Capturing Frame 6: Response fully rendered");
  await cdp.captureScreenshot("frame_06_response_complete.png");

  cdp.close();

  // Now compile frames into animated WebP using Python Pillow
  console.log("Compiling animated WebP recording via Python Pillow...");
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
durations = [1200, 650, 800, 800, 900, 2500]

for f in frame_files:
    img_path = os.path.join(frames_dir, f)
    if os.path.exists(img_path):
        img = Image.open(img_path)
        images.append(img.convert("RGB"))

if images:
    output_path = os.path.join(artifact_dir, "about_me_thinking_flow.webp")
    images[0].save(
        output_path,
        save_all=True,
        append_images=images[1:],
        duration=durations[:len(images)],
        loop=0,
        quality=85,
        method=6
    )
    print(f"Successfully generated animated WebP: {output_path} ({os.path.getsize(output_path)} bytes)")
else:
    print("No images found to compile")
`;

  fs.writeFileSync(path.join(ARTIFACT_DIR, "scratch", "compile_webp.py"), pythonScript);
  execSync("python3 " + path.join(ARTIFACT_DIR, "scratch", "compile_webp.py"), { stdio: "inherit" });
}

recordThinkingFlow().catch((err) => {
  console.error("Recording error:", err);
  process.exit(1);
});

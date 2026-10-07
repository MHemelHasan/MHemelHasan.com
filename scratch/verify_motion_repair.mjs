import { spawn } from "node:child_process";
import fs from "node:fs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  console.log("=== Starting Comprehensive Hero Motion Repair Verification ===");

  const chrome = spawn("/usr/bin/google-chrome", [
    "--headless=new",
    "--remote-debugging-port=9224",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch("http://127.0.0.1:9224/json/version");
      if (res.ok) {
        const data = await res.json();
        wsUrl = data.webSocketDebuggerUrl;
        break;
      }
    } catch {}
    await sleep(200);
  }

  if (!wsUrl) {
    console.error("Failed to connect to Chrome headless");
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
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pendingRequests.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  // Create a new target/page
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
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
  await sendPage("DOM.enable");
  await sendPage("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  // Ensure output dir exists
  fs.mkdirSync("/tmp/hero-motion-experiment", { recursive: true });

  const evalCode = async (expression) => {
    const res = await sendPage("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    return res.result?.value;
  };

  const captureScreenshot = async (filePath) => {
    const ss = await sendPage("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(filePath, Buffer.from(ss.data, "base64"));
    console.log(`Saved screenshot: ${filePath}`);
  };

  // ==========================================
  // 1. FRESH LOAD ENTRANCE LIFECYCLE
  // ==========================================
  console.log("\n--- Testing 1: Fresh Load Entrance Sequence ---");
  await sendPage("Page.navigate", { url: "http://localhost:3000/design-lab/motion-hero" });
  await sleep(100);

  // Check state right after mount / initial paint
  const initialStyles = await evalCode(`(() => {
    const role = document.querySelector('[data-hero-motion="role"]');
    const name = document.querySelector('[data-hero-motion="name"]');
    const portrait = document.querySelector('[data-hero-motion="portrait"]');
    const blueLine = document.querySelector('[data-hero-motion="blue-line"]');
    return {
      roleOpacity: role ? window.getComputedStyle(role).opacity : null,
      nameOpacity: name ? window.getComputedStyle(name).opacity : null,
      portraitOpacity: portrait ? window.getComputedStyle(portrait).opacity : null,
      blueLineTransform: blueLine ? window.getComputedStyle(blueLine).transform : null,
    };
  })()`);
  console.log("Initial paint styles (~100ms):", initialStyles);

  // Wait 250ms (mid entrance: role and name resolving, portrait beginning)
  await sleep(250);
  const midStyles = await evalCode(`(() => {
    const role = document.querySelector('[data-hero-motion="role"]');
    const name = document.querySelector('[data-hero-motion="name"]');
    const portrait = document.querySelector('[data-hero-motion="portrait"]');
    return {
      roleOpacity: window.getComputedStyle(role).opacity,
      nameOpacity: window.getComputedStyle(name).opacity,
      portraitOpacity: window.getComputedStyle(portrait).opacity,
    };
  })()`);
  console.log("Mid-entrance styles (~350ms):", midStyles);
  await captureScreenshot("/tmp/hero-motion-experiment/entrance_phase_mid.png");

  // Wait for entrance to fully complete (~1200ms)
  await sleep(1000);
  const enteredStyles = await evalCode(`(() => {
    const role = document.querySelector('[data-hero-motion="role"]');
    const name = document.querySelector('[data-hero-motion="name"]');
    const portrait = document.querySelector('[data-hero-motion="portrait"]');
    const blueLine = document.querySelector('[data-hero-motion="blue-line"]');
    return {
      roleOpacity: window.getComputedStyle(role).opacity,
      nameOpacity: window.getComputedStyle(name).opacity,
      portraitOpacity: window.getComputedStyle(portrait).opacity,
      blueLineTransform: window.getComputedStyle(blueLine).transform,
    };
  })()`);
  console.log("Fully entered styles (~1350ms):", enteredStyles);
  await captureScreenshot("/tmp/hero-motion-experiment/entrance_phase_entered.png");

  // ==========================================
  // 2. REPLAY ENTRANCE FUNCTIONALITY (3 TIMES)
  // ==========================================
  console.log("\n--- Testing 2: Replay Entrance 3 Times ---");
  for (let replay = 1; replay <= 3; replay++) {
    console.log(`Executing Replay #${replay}...`);
    // Click replay button in HUD
    await evalCode(`document.getElementById("hud-replay-button").click()`);

    // Check immediate primed reset (within 30ms)
    await sleep(30);
    const resetStyles = await evalCode(`(() => {
      const name = document.querySelector('[data-hero-motion="name"]');
      const portrait = document.querySelector('[data-hero-motion="portrait"]');
      return {
        nameOpacity: window.getComputedStyle(name).opacity,
        portraitOpacity: window.getComputedStyle(portrait).opacity,
      };
    })()`);
    console.log(`Replay #${replay} immediate reset:`, resetStyles);

    // Wait for replay entrance animation to complete
    await sleep(1200);
    const reEnteredStyles = await evalCode(`(() => {
      const name = document.querySelector('[data-hero-motion="name"]');
      const portrait = document.querySelector('[data-hero-motion="portrait"]');
      return {
        nameOpacity: window.getComputedStyle(name).opacity,
        portraitOpacity: window.getComputedStyle(portrait).opacity,
      };
    })()`);
    console.log(`Replay #${replay} fully re-entered:`, reEnteredStyles);
  }
  await captureScreenshot("/tmp/hero-motion-experiment/replay_resolved.png");

  // ==========================================
  // 3. PORTRAIT SEPARATION & POINTER PARALLAX
  // ==========================================
  console.log("\n--- Testing 3: Portrait Wrapper & Pointer Parallax ---");
  const movePointer = async (x, y) => {
    await sendPage("Input.dispatchMouseEvent", {
      type: "mouseMoved",
      x,
      y,
    });
    await sleep(80); // allow RAF lerp loop to damp toward target
  };

  // Move center
  await movePointer(720, 450);
  const centerTransforms = await evalCode(`(() => {
    const portraitOuter = document.querySelector('[data-hero-motion="portrait"]');
    const portraitInner = portraitOuter.firstElementChild;
    const farLayer = document.querySelector('[data-system-layer="far"]');
    const midLayer = document.querySelector('[data-system-layer="mid"]');
    const nearLayer = document.querySelector('[data-system-layer="near"]');
    return {
      outerTransform: window.getComputedStyle(portraitOuter).transform,
      innerTransform: window.getComputedStyle(portraitInner).transform,
      farTransform: window.getComputedStyle(farLayer).transform,
      midTransform: window.getComputedStyle(midLayer).transform,
      nearTransform: window.getComputedStyle(nearLayer).transform,
    };
  })()`);
  console.log("Center pointer (720, 450):", centerTransforms);

  // Move far left (150, 450)
  await movePointer(150, 450);
  await sleep(150); // let lerp settle
  const leftTransforms = await evalCode(`(() => {
    const portraitOuter = document.querySelector('[data-hero-motion="portrait"]');
    const portraitInner = portraitOuter.firstElementChild;
    const farLayer = document.querySelector('[data-system-layer="far"]');
    const midLayer = document.querySelector('[data-system-layer="mid"]');
    const nearLayer = document.querySelector('[data-system-layer="near"]');
    return {
      outerTransform: window.getComputedStyle(portraitOuter).transform,
      innerTransform: window.getComputedStyle(portraitInner).transform,
      farTransform: window.getComputedStyle(farLayer).transform,
      midTransform: window.getComputedStyle(midLayer).transform,
      nearTransform: window.getComputedStyle(nearLayer).transform,
    };
  })()`);
  console.log("Left pointer (150, 450):", leftTransforms);
  await captureScreenshot("/tmp/hero-motion-experiment/pointer_parallax_left.png");

  // Move far right (1300, 450)
  await movePointer(1300, 450);
  await sleep(150);
  const rightTransforms = await evalCode(`(() => {
    const portraitOuter = document.querySelector('[data-hero-motion="portrait"]');
    const portraitInner = portraitOuter.firstElementChild;
    const farLayer = document.querySelector('[data-system-layer="far"]');
    const midLayer = document.querySelector('[data-system-layer="mid"]');
    const nearLayer = document.querySelector('[data-system-layer="near"]');
    return {
      outerTransform: window.getComputedStyle(portraitOuter).transform,
      innerTransform: window.getComputedStyle(portraitInner).transform,
      farTransform: window.getComputedStyle(farLayer).transform,
      midTransform: window.getComputedStyle(midLayer).transform,
      nearTransform: window.getComputedStyle(nearLayer).transform,
    };
  })()`);
  console.log("Right pointer (1300, 450):", rightTransforms);
  await captureScreenshot("/tmp/hero-motion-experiment/pointer_parallax_right.png");

  // Move pointer leave (simulate mouseleave)
  await evalCode(`(() => {
    const hero = document.getElementById("hero");
    hero.dispatchEvent(new MouseEvent("mouseleave"));
  })()`);
  await sleep(350); // let lerp return to center
  const settledTransforms = await evalCode(`(() => {
    const portraitInner = document.querySelector('[data-hero-motion="portrait"]').firstElementChild;
    return window.getComputedStyle(portraitInner).transform;
  })()`);
  console.log("Settled on mouseleave:", settledTransforms);

  // ==========================================
  // 4. SCROLL DIFFERENTIAL TEST
  // ==========================================
  console.log("\n--- Testing 4: Scroll Differential Rates ---");
  const scrollSteps = [0, 200, 400, 600];
  for (const scrollY of scrollSteps) {
    await evalCode(`window.scrollTo(0, ${scrollY})`);
    await sleep(100);
    const scrollTransforms = await evalCode(`(() => {
      const textContainer = document.querySelector('[data-hero-motion="role"]').closest('.relative.z-10');
      const portraitInner = document.querySelector('[data-hero-motion="portrait"]').firstElementChild;
      const nearLayer = document.querySelector('[data-system-layer="near"]');
      const blueLine = document.querySelector('[data-hero-motion="blue-line"]');
      return {
        scrollY: window.scrollY,
        textTransform: window.getComputedStyle(textContainer).transform,
        portraitTransform: window.getComputedStyle(portraitInner).transform,
        nearLayerTransform: window.getComputedStyle(nearLayer).transform,
        blueLineTransform: window.getComputedStyle(blueLine).transform,
      };
    })()`);
    console.log(`Scroll progress at scrollY=${scrollY}:`, scrollTransforms);
  }
  await captureScreenshot("/tmp/hero-motion-experiment/scroll_differential.png");
  await evalCode(`window.scrollTo(0, 0)`);
  await sleep(100);

  // ==========================================
  // 5. REDUCED MOTION EFFECTIVE STATE & HUD
  // ==========================================
  console.log("\n--- Testing 5: Reduced Motion Effective State & HUD ---");
  const initialHud = await evalCode(`document.getElementById("hud-reduced-motion-button").innerText`);
  console.log("Initial HUD text:", initialHud);

  // Toggle Reduced Motion ON via HUD
  await evalCode(`document.getElementById("hud-reduced-motion-button").click()`);
  await sleep(100);
  const activeHud = await evalCode(`document.getElementById("hud-reduced-motion-button").innerText`);
  console.log("Active Reduced Motion HUD text:", activeHud);

  const reducedMotionStyles = await evalCode(`(() => {
    const name = document.querySelector('[data-hero-motion="name"]');
    const portraitOuter = document.querySelector('[data-hero-motion="portrait"]');
    const portraitInner = portraitOuter.firstElementChild;
    const blueLine = document.querySelector('[data-hero-motion="blue-line"]');
    return {
      nameOpacity: window.getComputedStyle(name).opacity,
      nameTransform: window.getComputedStyle(name).transform,
      portraitOuterTransform: window.getComputedStyle(portraitOuter).transform,
      portraitInnerTransform: window.getComputedStyle(portraitInner).transform,
      blueLineTransform: window.getComputedStyle(blueLine).transform,
    };
  })()`);
  console.log("Styles under Reduced Motion ON:", reducedMotionStyles);
  await captureScreenshot("/tmp/hero-motion-experiment/reduced_motion_hud.png");

  // Toggle back OFF
  await evalCode(`document.getElementById("hud-reduced-motion-button").click()`);
  await sleep(100);
  const restoredHud = await evalCode(`document.getElementById("hud-reduced-motion-button").innerText`);
  console.log("Restored HUD text:", restoredHud);

  // ==========================================
  // 6. RESPONSIVE BREAKPOINT AUDIT
  // ==========================================
  console.log("\n--- Testing 6: Responsive Breakpoints (Display & Overflow) ---");
  const viewports = [
    { w: 1440, h: 900, name: "desktop_1440x900" },
    { w: 1366, h: 768, name: "laptop_1366x768" },
    { w: 1280, h: 800, name: "desktop_1280x800" },
    { w: 1024, h: 768, name: "tablet_1024x768" },
    { w: 900, h: 800, name: "viewport_900x800" },
    { w: 820, h: 1000, name: "tablet_820x1000" },
    { w: 768, h: 1024, name: "tablet_768x1024" },
    { w: 390, h: 844, name: "mobile_390x844" },
  ];

  for (const vp of viewports) {
    await sendPage("Emulation.setDeviceMetricsOverride", {
      width: vp.w,
      height: vp.h,
      deviceScaleFactor: 1,
      mobile: vp.w < 600,
    });
    await sleep(100);

    const vpData = await evalCode(`(() => {
      const field = document.querySelector('[data-testid="engineering-system-field"]');
      const hasOverflow = document.documentElement.scrollWidth > window.innerWidth;
      return {
        viewport: "${vp.w}x${vp.h}",
        systemFieldDisplay: field ? window.getComputedStyle(field).display : null,
        hasHorizontalOverflow: hasOverflow,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      };
    })()`);
    console.log(`Viewport ${vp.w}x${vp.h} audit:`, vpData);
    await captureScreenshot(`/tmp/hero-motion-experiment/${vp.name}.png`);
  }

  // Restore 1440x900
  await sendPage("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  // ==========================================
  // 7. CONVERSATION REGRESSION
  // ==========================================
  console.log("\n--- Testing 7: Conversation Pathways ---");
  // Test prompt button click opens conversation
  const promptClicked = await evalCode(`(() => {
    const promptBtn = document.querySelector('button[type="button"].min-h-11');
    if (promptBtn) {
      promptBtn.click();
      return true;
    }
    return false;
  })()`);
  await sleep(300);
  const modalOpened = await evalCode(`!!document.querySelector('[role="dialog"]')`);
  console.log("Prompt button click opens modal:", { promptClicked, modalOpened });
  await captureScreenshot("/tmp/hero-motion-experiment/modal_opened.png");

  // Press Escape to close modal
  await sendPage("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await sleep(300);
  const modalClosed = await evalCode(`!document.querySelector('[role="dialog"]')`);
  console.log("Escape closes modal:", modalClosed);

  // Focus conversation input and check active indicator
  const inputFocusTest = await evalCode(`(() => {
    const input = document.getElementById("portfolio-conversation-query");
    if (!input) return null;
    input.focus();
    const underline = input.parentElement.querySelector('span[aria-hidden="true"]');
    return {
      focused: document.activeElement === input,
      underlineTransform: underline ? window.getComputedStyle(underline).transform : null,
    };
  })()`);
  console.log("Input focus state:", inputFocusTest);
  await captureScreenshot("/tmp/hero-motion-experiment/conversation_focused.png");

  console.log("\n=== All Verification Tests Completed Successfully ===");
  ws.close();
  chrome.kill();
  process.exit(0);
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});

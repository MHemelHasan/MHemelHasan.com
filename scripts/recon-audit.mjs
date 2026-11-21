import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const prefix = process.argv[2] ? `${process.argv[2]}-` : "phase1-";
const outputJsonName = process.argv[2] ? `${process.argv[2]}-data.json` : "phase1-data.json";

const AXE_PATH = "/home/mhemelhasan/.npm/_npx/e003b6b07d062486/node_modules/axe-core/axe.min.js";
const axeSource = fs.readFileSync(AXE_PATH, "utf8");

// Launch Chrome in headless mode with debugging port
const chromeProcess = spawn(
  "/usr/bin/google-chrome",
  [
    "--headless=new",
    "--no-sandbox",
    "--remote-debugging-port=9222",
    "--hide-scrollbars",
    "--disable-gpu",
  ],
  { stdio: "ignore" }
);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForChrome() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch("http://127.0.0.1:9222/json/version");
      if (res.ok) {
        const data = await res.json();
        return data.webSocketDebuggerUrl;
      }
    } catch {}
    await sleep(200);
  }
  throw new Error("Chrome failed to start");
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) {
          reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        } else {
          resolve(msg.result);
        }
      }
    };
  }

  send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.ws.close();
  }
}

async function run() {
  try {
    await waitForChrome();

    const newTargetRes = await fetch("http://127.0.0.1:9222/json/new?http://localhost:3000", { method: "PUT" });
    const target = await newTargetRes.json();
    const client = new CDPClient(target.webSocketDebuggerUrl);
    await client.connect();

    await client.send("Page.enable");
    await client.send("DOM.enable");
    await client.send("CSS.enable");
    await client.send("Runtime.enable");

    const breakpoints = [
      { name: "mobile", width: 390, height: 844, dsf: 2 },
      { name: "tablet", width: 768, height: 1024, dsf: 2 },
      { name: "desktop", width: 1440, height: 900, dsf: 1 },
    ];

    const pages = [
      { path: "/", label: "home" },
      { path: "/products", label: "products" },
    ];

    const results = {
      pageHeights: {},
      axeResults: {},
      typography: {},
      checks320px: {},
      checksReducedMotion: {},
    };

    fs.mkdirSync("docs/redesign/screenshots", { recursive: true });

    for (const pageInfo of pages) {
      for (const bp of breakpoints) {
        for (const theme of ["light", "dark"]) {
          console.log(`Auditing ${pageInfo.label} @ ${bp.width}px (${theme})...`);

          await client.send("Emulation.setDeviceMetricsOverride", {
            width: bp.width,
            height: bp.height,
            deviceScaleFactor: bp.dsf,
            mobile: bp.width < 768,
          });

          await client.send("Page.navigate", { url: `http://localhost:3000${pageInfo.path}` });
          await sleep(1000);

          await client.send("Runtime.evaluate", {
            expression: `
              if ("${theme}" === "dark") {
                document.documentElement.classList.add('dark');
                document.documentElement.setAttribute('data-theme', 'dark');
                document.documentElement.style.colorScheme = 'dark';
              } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.setAttribute('data-theme', 'light');
                document.documentElement.style.colorScheme = 'light';
              }
            `,
          });
          await sleep(300);

          const layoutMetrics = await client.send("Page.getLayoutMetrics");
          const scrollHeight = layoutMetrics.cssContentSize.height;
          const scrollWidth = layoutMetrics.cssContentSize.width;

          const key = `${pageInfo.label}_${bp.width}_${theme}`;
          results.pageHeights[key] = { scrollHeight, scrollWidth };

          // Viewport screenshot
          const vpScreenshot = await client.send("Page.captureScreenshot", {
            format: "png",
            clip: {
              x: 0,
              y: 0,
              width: bp.width,
              height: bp.height,
              scale: 1,
            },
          });
          fs.writeFileSync(
            `docs/redesign/screenshots/${prefix}${pageInfo.label}-${bp.width}-${theme}-viewport.png`,
            Buffer.from(vpScreenshot.data, "base64")
          );

          // Full page screenshot
          const fullScreenshot = await client.send("Page.captureScreenshot", {
            format: "png",
            clip: {
              x: 0,
              y: 0,
              width: bp.width,
              height: scrollHeight,
              scale: 1,
            },
            captureBeyondViewport: true,
          });
          fs.writeFileSync(
            `docs/redesign/screenshots/${prefix}${pageInfo.label}-${bp.width}-${theme}-full.png`,
            Buffer.from(fullScreenshot.data, "base64")
          );

          // Run axe
          if (bp.width === 1440 || bp.width === 390) {
            await client.send("Runtime.evaluate", { expression: axeSource });
            const axeEval = await client.send("Runtime.evaluate", {
              expression: `
                new Promise((resolve) => {
                  axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }, (err, results) => {
                    if (err) resolve({ error: err.message });
                    else resolve(results);
                  });
                });
              `,
              awaitPromise: true,
              returnByValue: true,
            });

            if (axeEval.result.value && !axeEval.result.value.error) {
              const r = axeEval.result.value;
              results.axeResults[key] = {
                violationsCount: r.violations.length,
                violations: r.violations.map((v) => ({
                  id: v.id,
                  impact: v.impact,
                  description: v.description,
                  help: v.help,
                  nodesCount: v.nodes.length,
                  targets: v.nodes.map((n) => n.target.join(" ")).slice(0, 5),
                })),
              };
            }
          }

          // Evaluate text styles for smallest font size and contrast
          if (bp.width === 1440 && theme === "light") {
            const typeEval = await client.send("Runtime.evaluate", {
              expression: `
                (() => {
                  const elements = Array.from(document.querySelectorAll('*'));
                  const textNodes = [];
                  for (const el of elements) {
                    if (el.children.length === 0 && el.textContent.trim().length > 0) {
                      const style = window.getComputedStyle(el);
                      const fontSize = parseFloat(style.fontSize);
                      textNodes.push({
                        tag: el.tagName.toLowerCase(),
                        text: el.textContent.trim().slice(0, 40),
                        fontSize,
                        lineHeight: style.lineHeight,
                        color: style.color,
                        fontWeight: style.fontWeight,
                        selector: el.className ? ('.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.')) : el.tagName.toLowerCase()
                      });
                    }
                  }
                  textNodes.sort((a, b) => a.fontSize - b.fontSize);
                  return {
                    smallest: textNodes.slice(0, 10),
                    fontSizeSet: Array.from(new Set(textNodes.map(t => t.fontSize))).sort((a,b) => a-b)
                  };
                })()
              `,
              returnByValue: true,
            });
            results.typography[pageInfo.label] = typeEval.result.value;
          }
        }
      }

      // Explicit 320px viewport check
      console.log(`Checking 320px on ${pageInfo.label}...`);
      await client.send("Emulation.setDeviceMetricsOverride", {
        width: 320,
        height: 640,
        deviceScaleFactor: 2,
        mobile: true,
      });
      await client.send("Page.navigate", { url: `http://localhost:3000${pageInfo.path}` });
      await sleep(1000);
      const metrics320 = await client.send("Page.getLayoutMetrics");
      const overflow320 = metrics320.cssContentSize.width > 320;
      results.checks320px[pageInfo.label] = {
        viewportWidth: 320,
        contentWidth: metrics320.cssContentSize.width,
        hasHorizontalOverflow: overflow320,
        contentHeight: metrics320.cssContentSize.height,
      };

      // Explicit reduced-motion check
      console.log(`Checking prefers-reduced-motion on ${pageInfo.label}...`);
      await client.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });
      const motionEval = await client.send("Runtime.evaluate", {
        expression: `
          (() => {
            const matches = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const el = document.body;
            const style = window.getComputedStyle(el);
            return {
              mediaQueryMatches: matches,
              transitionDuration: style.transitionDuration,
              animationDuration: style.animationDuration
            };
          })()
        `,
        returnByValue: true,
      });
      results.checksReducedMotion[pageInfo.label] = motionEval.result.value;
      await client.send("Emulation.setEmulatedMedia", { features: [] });
    }

    fs.writeFileSync(`docs/redesign/${outputJsonName}`, JSON.stringify(results, null, 2));
    console.log(`Audit data saved to docs/redesign/${outputJsonName}`);
    client.close();
  } finally {
    chromeProcess.kill();
  }
}

run().catch((err) => {
  console.error(err);
  chromeProcess.kill();
  process.exit(1);
});

import { IntentKey } from "@/types/conversation";

export function resolveIntent(query: string, directIntent?: IntentKey): IntentKey {
  if (directIntent) {
    return directIntent;
  }

  const clean = query.toLowerCase().trim();

  // 1. Support AI (Specific exploratory venture queries)
  if (
    clean.includes("support ai") ||
    clean.includes("building next") ||
    clean.includes("build next") ||
    clean.includes("future venture") ||
    clean.includes("what's next") ||
    clean.includes("whats next") ||
    clean.includes("next project") ||
    clean.includes("exploring next") ||
    clean.includes("what next")
  ) {
    return "support_ai";
  }

  // 2. Social AI (Primary founder venture)
  if (
    clean.includes("social ai") ||
    clean.includes("social automation") ||
    clean.includes("active venture")
  ) {
    return "social_ai";
  }

  // 3. Ventures (overview of current and exploratory venture work)
  if (
    /\bventures?\b/.test(clean) ||
    /\bstartups?\b/.test(clean) ||
    clean.includes("what are you building") ||
    clean.includes("currently building") ||
    clean.includes("founder work")
  ) {
    return "ventures";
  }

  // 4. Journey / Background / Career Evolution
  if (
    clean.includes("journey") ||
    clean.includes("career") ||
    clean.includes("timeline") ||
    clean.includes("evolution") ||
    clean.includes("how did you get here") ||
    clean.includes("what did you do before") ||
    clean.includes("past experience") ||
    clean.includes("work history") ||
    clean.includes("history") ||
    clean.includes("progression")
  ) {
    return "journey";
  }

  // 5. Contact / Collaboration
  if (
    clean.includes("contact") ||
    clean.includes("talk") ||
    clean.includes("email") ||
    clean.includes("hire") ||
    clean.includes("reach") ||
    clean.includes("collaborate") ||
    clean.includes("together") ||
    clean.includes("work with")
  ) {
    return "contact";
  }

  // 6. How I Build (Pipeline & architecture methodology)
  if (
    /\bhow\b/.test(clean) ||
    /\bbuild(?:ing|s|er)?\b/.test(clean) ||
    /\bprocess(?:es)?\b/.test(clean) ||
    /\bpipeline\b/.test(clean) ||
    /\barchitecture\b/.test(clean) ||
    /\bmethodology\b/.test(clean) ||
    /\bflow\b/.test(clean) ||
    /\bapproach\b/.test(clean)
  ) {
    return "pipeline";
  }

  // 7. Products (Themefic commercial platform work)
  if (
    /\bproducts?\b/.test(clean) ||
    clean.includes("themefic") ||
    clean.includes("shipped") ||
    clean.includes("bundlefic") ||
    clean.includes("instantio") ||
    clean.includes("connectfic") ||
    clean.includes("quotezic") ||
    /\bplugins?\b/.test(clean) ||
    /\bapps?\b/.test(clean) ||
    clean.includes("commercial work")
  ) {
    return "products";
  }

  // 8. About Me (General identity and biography fallback)
  if (
    clean.includes("about") ||
    clean.includes("yourself") ||
    clean.includes("who are you") ||
    clean.includes("who is") ||
    clean.includes("bio") ||
    clean.includes("background") ||
    clean.includes("hemel") ||
    clean.includes("hasan") ||
    clean.includes("profile") ||
    clean.includes("intro")
  ) {
    return "about_me";
  }

  return "unknown";
}

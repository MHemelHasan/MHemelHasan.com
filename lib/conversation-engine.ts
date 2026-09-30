import { IntentKey } from "@/types/conversation";

export function resolveIntent(query: string, directIntent?: IntentKey): IntentKey {
  if (directIntent) {
    if (directIntent === "ventures") return "social_ai";
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
    clean.includes("social") ||
    clean.includes("venture") ||
    clean.includes("what are you building") ||
    clean.includes("currently building") ||
    clean.includes("active venture") ||
    clean.includes("founder") ||
    clean.includes("startup")
  ) {
    return "social_ai";
  }

  // 3. Journey / Background / Career Evolution
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

  // 4. About Me (General identity, background & bio)
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

  // 5. Products (Themefic commercial platform work)
  if (
    clean.includes("product") ||
    clean.includes("themefic") ||
    clean.includes("shipped") ||
    clean.includes("bundlefic") ||
    clean.includes("instantio") ||
    clean.includes("connectfic") ||
    clean.includes("quotezic") ||
    clean.includes("plugin") ||
    clean.includes("app") ||
    clean.includes("commercial work")
  ) {
    return "products";
  }

  // 6. How I Build (Pipeline & architecture methodology)
  if (
    clean.includes("how") ||
    clean.includes("build") ||
    clean.includes("process") ||
    clean.includes("pipeline") ||
    clean.includes("architecture") ||
    clean.includes("methodology") ||
    clean.includes("flow") ||
    clean.includes("approach")
  ) {
    return "pipeline";
  }

  // 7. Contact / Collaboration
  if (
    clean.includes("contact") ||
    clean.includes("talk") ||
    clean.includes("email") ||
    clean.includes("hire") ||
    clean.includes("reach") ||
    clean.includes("collaborate") ||
    clean.includes("together") ||
    clean.includes("work together") ||
    clean.includes("work with")
  ) {
    return "contact";
  }

  return "unknown";
}

"use client";

import { ConversationProvider } from "@/components/conversation/conversation-context";
import { Round3ClaudeExperiment } from "@/components/design-lab/round3-claude/round3-experiment";

export default function Round3ClaudePage() {
  return (
    <ConversationProvider>
      <Round3ClaudeExperiment />
    </ConversationProvider>
  );
}

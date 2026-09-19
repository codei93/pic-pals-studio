import { createFileRoute } from "@tanstack/react-router";
import { CreatorShell } from "@/components/creator-shell";
import { ChatWorkspace } from "@/components/chat-workspace";
export const Route = createFileRoute("/creator/chat")({
  head: () => ({
    meta: [
      { title: "Creator Chat — TryDiscreet" },
      { name: "description", content: "Reply to your unlocked fan conversations." },
      { property: "og:title", content: "Creator Chat — TryDiscreet" },
      { property: "og:description", content: "Reply to your unlocked fan conversations." },
    ],
  }),
  component: Page,
});
function Page() {
  return (
    <CreatorShell title="Creator Chat">
      <ChatWorkspace mode="creator" />
    </CreatorShell>
  );
}

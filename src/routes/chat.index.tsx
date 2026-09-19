import { createFileRoute } from "@tanstack/react-router";
import { ChatWorkspace } from "@/components/chat-workspace";

export const Route = createFileRoute("/chat/")({
  head: () => ({
    meta: [
      { title: "Messages — TryDiscreet" },
      { name: "description", content: "Your private chats with creators you've unlocked." },
      { property: "og:title", content: "Messages — TryDiscreet" },
      {
        property: "og:description",
        content: "Your private chats with creators you've unlocked.",
      },
    ],
  }),
  component: Inbox,
});

function Inbox() {
  return <ChatWorkspace mode="fan" />;
}

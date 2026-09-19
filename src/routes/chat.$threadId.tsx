import { createFileRoute, notFound } from "@tanstack/react-router";
import { CREATORS, THREADS } from "@/lib/mock-data";
import { ChatWorkspace } from "@/components/chat-workspace";

export const Route = createFileRoute("/chat/$threadId")({
  loader: ({ params }) => {
    const thread = THREADS.find((t) => t.id === params.threadId);
    if (!thread) throw notFound();
    const creator = CREATORS.find((c) => c.username === thread.creator);
    return { thread, creatorName: creator?.displayName ?? thread.creator };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Conversation — TryDiscreet" }, { name: "robots", content: "noindex" }],
      };
    return {
      meta: [
        { title: `Chat with ${loaderData.creatorName} — TryDiscreet` },
        { name: "description", content: "Private one-to-one conversation on TryDiscreet." },
        { property: "og:title", content: `Chat with ${loaderData.creatorName} — TryDiscreet` },
        {
          property: "og:description",
          content: "Private one-to-one conversation on TryDiscreet.",
        },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: ChatThread,
});

function ChatThread() {
  const { thread } = Route.useLoaderData();
  return <ChatWorkspace mode="fan" initialThreadId={thread.id} />;
}

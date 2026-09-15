import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CREATORS, THREADS, type Message } from "@/lib/mock-data";
import { Avatar } from "@/components/brand";
import { LockedMedia } from "@/components/locked-media";

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
  const { thread, creatorName } = Route.useLoaderData();
  const [messages, setMessages] = useState<Message[]>(thread.messages);
  const [text, setText] = useState("");

  return (
    <div className="mx-auto flex max-w-2xl flex-col px-4 py-6" style={{ minHeight: "70vh" }}>
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <Avatar seed={creatorName} size={40} />
        <div>
          <p className="text-sm font-semibold">{creatorName}</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-success" /> Online
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-3 py-4">
        {messages.map((m) => (
          <div key={m.id} className={m.from === "fan" ? "flex justify-end" : "flex"}>
            {m.ppv ? (
              <div className="w-56">
                <LockedMedia
                  id={`${thread.id}-${m.id}`}
                  kind="PPV Photo"
                  price={m.ppv.price}
                  creator={thread.creator}
                  gradient={m.ppv.gradient}
                  aspect="aspect-4/3"
                />
              </div>
            ) : (
              <p
                className={`max-w-[80%] px-4 py-2 text-sm ${
                  m.from === "fan"
                    ? "rounded-[18px_18px_4px_18px] bg-accent text-white"
                    : "rounded-[18px_18px_18px_4px] bg-elevated text-foreground"
                }`}
              >
                {m.text}
              </p>
            )}
          </div>
        ))}
      </div>

      <form
        className="sticky bottom-16 flex gap-2 border-t border-border bg-background pt-3 md:bottom-0"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          setMessages((prev) => [
            ...prev,
            { id: `m-${Date.now()}`, from: "fan", text, time: "now" },
          ]);
          setText("");
        }}
      >
        <input
          className="field"
          placeholder="Write a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn-primary px-4">
          ➤
        </button>
      </form>
    </div>
  );
}

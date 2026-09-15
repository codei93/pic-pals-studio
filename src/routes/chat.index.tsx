import { createFileRoute, Link } from "@tanstack/react-router";
import { CREATORS, THREADS } from "@/lib/mock-data";
import { Avatar, EmptyState } from "@/components/brand";

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
  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-bold">Messages</h1>
      {THREADS.length === 0 ? (
        <EmptyState title="Unlock content from a creator to start chatting" />
      ) : (
        <div className="card-surface space-y-1">
          {THREADS.map((t) => {
            const creator = CREATORS.find((c) => c.username === t.creator);
            const last = t.messages[t.messages.length - 1];
            return (
              <Link
                key={t.id}
                to="/chat/$threadId"
                params={{ threadId: t.id }}
                className="flex items-center gap-3 border-b border-border py-3 last:border-0"
              >
                <Avatar seed={creator?.displayName ?? t.creator} size={44} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{creator?.displayName ?? t.creator}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {last?.text ?? "Sent you a locked item"}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-subtle-foreground">{t.time}</span>
                  {t.unread && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

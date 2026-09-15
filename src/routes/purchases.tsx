import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { credits } from "@/lib/mock-data";
import { KindBadge, EmptyState } from "@/components/brand";
import { useApp } from "@/lib/store";

const TABS = ["All", "PPV Content", "Phone Numbers", "Custom Requests"] as const;

export const Route = createFileRoute("/purchases")({
  head: () => ({
    meta: [
      { title: "Your Purchases — TryDiscreet" },
      {
        name: "description",
        content: "Everything you've unlocked, with credits spent and access expiry dates.",
      },
      { property: "og:title", content: "Your Purchases — TryDiscreet" },
      {
        property: "og:description",
        content: "Everything you've unlocked, with credits spent and access expiry dates.",
      },
    ],
  }),
  component: Purchases,
});

function Purchases() {
  const { purchases } = useApp();
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");

  const rows = purchases.filter((p) => {
    if (tab === "All") return true;
    if (tab === "PPV Content")
      return p.kind === "PPV Photo" || p.kind === "PPV Video" || p.kind === "Story";
    if (tab === "Phone Numbers") return p.kind === "Phone Number";
    return p.kind === "Custom Request";
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-bold">Purchases</h1>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pill shrink-0 ${
              tab === t ? "bg-accent text-white" : "border border-border text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <EmptyState title="Nothing here yet" />
      ) : (
        <div className="card-surface space-y-1">
          {rows.map((p) => {
            const expired = p.expiresInDays === 0;
            return (
              <div
                key={p.id}
                className="flex items-center gap-3 border-b border-border py-3 last:border-0"
              >
                <div
                  className="h-12 w-12 shrink-0 rounded-md"
                  style={{ background: p.gradient, filter: expired ? "grayscale(1)" : "none" }}
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <KindBadge kind={p.kind} />
                  <p className="text-sm">@{p.creator}</p>
                  <p className="text-xs text-subtle-foreground">{p.date}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-semibold text-accent">{credits(p.credits)}</span>
                  {p.expiresInDays === null ? (
                    <span className="pill bg-elevated text-muted-foreground">Permanent</span>
                  ) : expired ? (
                    <span className="pill bg-error/15 text-error">Expired</span>
                  ) : (
                    <span className="pill bg-elevated text-muted-foreground">
                      Expires in {p.expiresInDays} days
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

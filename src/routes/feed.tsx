import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CREATORS, credits } from "@/lib/mock-data";
import { Avatar, EmptyState } from "@/components/brand";
import { LockedMedia } from "@/components/locked-media";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Your Feed — TryDiscreet" },
      {
        name: "description",
        content: "Stories and posts from the creators you follow, all in one private feed.",
      },
      { property: "og:title", content: "Your Feed — TryDiscreet" },
      {
        property: "og:description",
        content: "Stories and posts from the creators you follow, all in one private feed.",
      },
    ],
  }),
  component: Feed,
});

function Feed() {
  const { following, tip, balance } = useApp();
  const [tipFor, setTipFor] = useState<string | null>(null);
  const [amount, setAmount] = useState(1000);

  const followed = CREATORS.filter((c) => following.includes(c.username));
  const posts = followed.flatMap((c) => c.posts.map((p) => ({ post: p, creator: c })));

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      {followed.length === 0 ? (
        <EmptyState
          title="Follow some creators to see their content here"
          action={
            <Link to="/" className="btn-primary">
              Browse Creators
            </Link>
          }
        />
      ) : (
        <>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {followed.flatMap((c) =>
              c.stories.map((s) => (
                <div
                  key={s.id}
                  className={`flex w-20 shrink-0 flex-col items-center gap-2 ${
                    s.expired ? "opacity-40" : ""
                  }`}
                >
                  <Avatar seed={c.displayName} size={56} ring={!s.expired} />
                  <span className="pill tag-pill">
                    {s.expired ? "Expired" : credits(s.price)}
                  </span>
                </div>
              )),
            )}
          </div>

          {posts.map(({ post, creator }) => (
            <article key={`${creator.id}-${post.id}`} className="card-surface space-y-3">
              <div className="flex items-center gap-3">
                <Avatar seed={creator.displayName} size={36} />
                <div>
                  <Link
                    to="/models/$username"
                    params={{ username: creator.username }}
                    className="text-sm font-semibold"
                  >
                    {creator.displayName}
                  </Link>
                  <p className="text-xs text-subtle-foreground">{post.postedAgo}</p>
                </div>
              </div>

              {post.type === "free" ? (
                <div className="aspect-4/3 rounded-xl" style={{ background: post.gradient }} />
              ) : (
                <LockedMedia
                  id={post.id}
                  kind={post.type === "ppv_photo" ? "PPV Photo" : "PPV Video"}
                  price={post.price}
                  creator={creator.username}
                  gradient={post.gradient}
                  aspect="aspect-4/3"
                />
              )}

              <p className="text-sm text-muted-foreground">{post.caption}</p>

              <div className="flex items-center gap-3">
                <button className="btn-primary" onClick={() => setTipFor(creator.username)}>
                  Tip
                </button>
                <Link to="/chat" className="text-lg">
                  ✉
                </Link>
                <span className="text-xs text-subtle-foreground">♥ {post.likes}</span>
              </div>
            </article>
          ))}
        </>
      )}

      {tipFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="card-surface w-full max-w-sm space-y-4">
            <h2 className="text-lg font-bold">Tip @{tipFor}</h2>
            <p className="text-xs text-muted-foreground">Balance: {credits(balance)}</p>
            <input
              className="field"
              type="number"
              min={500}
              step={500}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <div className="flex gap-2">
              <button
                className="btn-primary flex-1"
                disabled={amount > balance}
                onClick={() => {
                  tip(tipFor, amount);
                  setTipFor(null);
                }}
              >
                Send {credits(amount)}
              </button>
              <button className="btn-ghost" onClick={() => setTipFor(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

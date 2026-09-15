import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { credits, getCreator } from "@/lib/mock-data";
import { Avatar, KindBadge, TagPills } from "@/components/brand";
import { LockedMedia } from "@/components/locked-media";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/models/$username")({
  loader: ({ params }) => {
    const creator = getCreator(params.username);
    if (!creator) throw notFound();
    return { creator };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Creator not found — TryDiscreet" }, { name: "robots", content: "noindex" }] };
    const { creator } = loaderData;
    const title = `${creator.displayName} (@${creator.username}) — TryDiscreet`;
    return {
      meta: [
        { title },
        { name: "description", content: creator.bio },
        { property: "og:title", content: title },
        { property: "og:description", content: creator.bio },
      ],
    };
  },
  component: CreatorProfile,
});

function CreatorProfile() {
  const { creator } = Route.useLoaderData();
  const { isFollowing, toggleFollow, hasPurchasedFrom, isUnlocked, unlock, balance } = useApp();
  const [tab, setTab] = useState<"posts" | "stories" | "phone">("posts");
  const chatUnlocked = hasPurchasedFrom(creator.username);
  const phoneId = `phone-${creator.id}`;
  const phoneRevealed = isUnlocked(phoneId);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 md:px-6">
      <div className="card-surface flex flex-col gap-5 md:flex-row md:items-start">
        <Avatar seed={creator.displayName} size={88} />
        <div className="flex-1 space-y-3">
          <div>
            <h1 className="text-2xl font-bold">{creator.displayName}</h1>
            <p className="text-sm text-muted-foreground">@{creator.username}</p>
          </div>
          <p className="text-sm text-muted-foreground">{creator.bio}</p>
          <p className="text-xs text-subtle-foreground">
            {creator.followers.toLocaleString("en-US")} followers
          </p>
          <TagPills tags={creator.tags} />
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {Object.entries(creator.socials).map(([k, v]) => (
              <span key={k} className="text-xs text-muted-foreground">
                {k === "instagram" ? "📷" : k === "twitter" ? "🐦" : "🎵"} @{v}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            className={isFollowing(creator.username) ? "btn-ghost" : "btn-primary"}
            onClick={() => toggleFollow(creator.username)}
          >
            {isFollowing(creator.username) ? "Following ✓" : "Follow"}
          </button>
          {chatUnlocked ? (
            <Link to="/chat" className="btn-outline">
              Chat
            </Link>
          ) : (
            <button className="btn-primary" disabled title="Make a purchase to unlock chat">
              Chat locked
            </button>
          )}
          {!chatUnlocked && (
            <p className="max-w-[180px] text-xs text-subtle-foreground">
              Make a purchase to unlock chat
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {(
          [
            ["posts", "Posts"],
            ["stories", "Stories"],
            ["phone", "Phone Number"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`pill ${
              tab === key ? "bg-accent text-white" : "border border-border text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "posts" && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {creator.posts.map((p) => (
            <div key={p.id} className="card-surface space-y-3">
              {p.type === "free" ? (
                <div className="aspect-square rounded-xl" style={{ background: p.gradient }} />
              ) : (
                <LockedMedia
                  id={p.id}
                  kind={p.type === "ppv_photo" ? "PPV Photo" : "PPV Video"}
                  price={p.price}
                  creator={creator.username}
                  gradient={p.gradient}
                />
              )}
              <p className="text-sm text-muted-foreground">{p.caption}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "stories" && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {creator.stories.map((s) =>
            s.expired ? (
              <div key={s.id} className="card-surface space-y-3 opacity-50">
                <div
                  className="aspect-3/4 rounded-xl grayscale"
                  style={{ background: s.gradient }}
                />
                <span className="pill bg-error/15 text-error">Expired</span>
              </div>
            ) : (
              <div key={s.id} className="card-surface space-y-3">
                <LockedMedia
                  id={s.id}
                  kind="Story"
                  price={s.price}
                  creator={creator.username}
                  gradient={s.gradient}
                  aspect="aspect-3/4"
                  expiryLabel={`Expires in ${s.expiresIn}`}
                />
                <span className="pill bg-elevated text-muted-foreground">
                  Expires in {s.expiresIn}
                </span>
              </div>
            ),
          )}
        </div>
      )}

      {tab === "phone" && (
        <div className="card-surface max-w-md space-y-4">
          <KindBadge kind="Phone Number" />
          <p
            className="text-2xl font-bold"
            style={{ filter: phoneRevealed ? "none" : "blur(8px)" }}
          >
            {phoneRevealed ? creator.phone.real : creator.phone.masked}
          </p>
          {!phoneRevealed && (
            <div className="flex items-center gap-3">
              <span className="pill tag-pill">{credits(creator.phone.price)}</span>
              <button
                className="btn-primary"
                disabled={balance < creator.phone.price}
                onClick={() =>
                  unlock({
                    id: phoneId,
                    price: creator.phone.price,
                    creator: creator.username,
                    kind: "Phone Number",
                    gradient: creator.gradient,
                  })
                }
              >
                Reveal Number
              </button>
            </div>
          )}
          <p className="text-xs text-subtle-foreground">
            Purchasing reveals the number — meetups are not arranged by the platform.
          </p>
        </div>
      )}
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ALL_TAGS, CREATORS } from "@/lib/mock-data";
import { TagPills } from "@/components/brand";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TryDiscreet — Browse Uganda's Top Creators" },
      {
        name: "description",
        content:
          "Discover and follow Uganda's premier adult creators. Discreet payments, private chat, exclusive content.",
      },
      { property: "og:title", content: "TryDiscreet — Browse Uganda's Top Creators" },
      {
        property: "og:description",
        content:
          "Discover and follow Uganda's premier adult creators. Discreet payments, private chat, exclusive content.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [active, setActive] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const { isFollowing, toggleFollow } = useApp();

  const creators = CREATORS.filter((c) => {
    const matchTags = active.length === 0 || active.every((t) => c.tags.includes(t));
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q || c.displayName.toLowerCase().includes(q) || c.username.includes(q);
    return matchTags && matchQuery;
  });

  const toggleTag = (t: string) =>
    setActive((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 text-center md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(233,30,140,0.28),transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Discreet. Private. Yours.
          </h1>
          <p className="text-muted-foreground md:text-lg">Uganda's premier creator platform</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#creators" className="btn-primary">
              Browse Creators
            </a>
            <Link to="/creator/apply" className="btn-outline">
              Become a Creator
            </Link>
          </div>
        </div>
      </section>

      <section id="creators" className="mx-auto max-w-7xl space-y-6 px-4 pb-16 md:px-6">
        <input
          className="field max-w-md"
          placeholder="Search creators..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            className={`pill shrink-0 ${
              active.length === 0
                ? "bg-accent text-white"
                : "border border-border text-muted-foreground"
            }`}
            onClick={() => setActive([])}
          >
            All
          </button>
          {ALL_TAGS.map((t) => (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              className={`pill shrink-0 ${
                active.includes(t)
                  ? "bg-accent text-white"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {creators.map((c) => (
            <div key={c.id} className="group relative">
              <Link
                to="/models/$username"
                params={{ username: c.username }}
                className="block overflow-hidden rounded-[20px] transition-transform duration-200 group-hover:scale-[1.02]"
              >
                <div className="relative aspect-3/4" style={{ background: c.gradient }}>
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
                  {c.featured && (
                    <span className="pill absolute top-3 left-3 bg-accent text-white">Featured</span>
                  )}
                  <div className="absolute bottom-0 space-y-2 p-4">
                    <p className="text-lg font-bold text-white">{c.displayName}</p>
                    <p className="text-xs text-white/70">
                      {c.followers.toLocaleString("en-US")} followers
                    </p>
                    <TagPills tags={c.tags} small />
                  </div>
                </div>
              </Link>
              <button
                onClick={() => toggleFollow(c.username)}
                className={`pill absolute top-3 right-3 ${
                  isFollowing(c.username) ? "bg-black/60 text-white" : "bg-accent text-white"
                }`}
              >
                {isFollowing(c.username) ? "Following ✓" : "Follow"}
              </button>
            </div>
          ))}
        </div>

        {creators.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No creators match those filters yet.
          </p>
        )}
      </section>
    </>
  );
}

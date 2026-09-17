import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ALL_TAGS, CREATORS } from "@/lib/mock-data";
import { TagPills } from "@/components/brand";
import { useApp } from "@/lib/store";
import { BadgeCheck, LockKeyhole, Search, ShieldCheck, Sparkles } from "lucide-react";
import zari from "@/assets/creator-zari.jpg";
import chloe from "@/assets/creator-chloe.jpg";
import amina from "@/assets/creator-amina.jpg";
import patricia from "@/assets/creator-patricia.jpg";
import shalita from "@/assets/creator-shalita.jpg";

const CREATOR_IMAGES = [zari, shalita, chloe, amina, patricia, shalita];
const DISPLAY_NAMES = ["Zari Luxe", "Nalule Diva", "Chloe Kampala", "Amina Queen", "Patricia B", "Shalita Glam"];

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
      <section className="relative overflow-hidden border-b border-border px-4 py-16 text-center md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,color-mix(in_oklab,var(--accent)_24%,transparent),transparent_48%)]"
        />
        <div className="relative mx-auto max-w-3xl space-y-5">
          <span className="pill bg-elevated text-[10px] uppercase text-soft-pink"><Sparkles size={11}/> Uganda's premier creator platform</span>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Discreet. Private.<br/><span className="text-soft-pink">Yours.</span>
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground md:text-base">Connect with top verified creators, unlock exclusive PPV media, and direct message in total discretion.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#creators" className="btn-primary min-w-40">
              Browse Creators
            </a>
            <Link to="/creator/apply" className="btn-ghost min-w-40">
              Become a Creator
            </Link>
          </div>
          <div className="noir-panel mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 p-4 text-xs sm:grid-cols-3">
            <span><BadgeCheck className="mr-1 inline text-accent" size={15}/> 500+ Verified Creators</span>
            <span><Sparkles className="mr-1 inline text-accent" size={15}/> ₡180M+ Paid Out</span>
            <span><LockKeyhole className="mr-1 inline text-accent" size={15}/> 100% Discreet</span>
          </div>
        </div>
      </section>

      <section id="creators" className="mx-auto max-w-[1440px] space-y-6 px-4 py-12 md:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0"><p className="mb-2 text-[10px] font-bold uppercase text-accent">VIP Vault</p><h2 className="truncate text-2xl font-bold md:text-3xl">Featured & Trending Creators</h2></div>
          <label className="relative hidden w-80 md:block"><Search className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" size={16}/><input className="field bg-elevated pl-10" placeholder="Search creator by name, niche..." value={query} onChange={(e) => setQuery(e.target.value)}/></label>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            className={`pill shrink-0 ${
              active.length === 0
                ? "bg-soft-pink text-panel-deep"
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
                  ? "bg-soft-pink text-panel-deep"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {creators.map((c, index) => (
            <div key={c.id} className="group relative">
              <Link
                to="/models/$username"
                params={{ username: c.username }}
                className="block overflow-hidden rounded-md border border-border transition-transform duration-200 group-hover:-translate-y-1"
              >
                <div className="relative aspect-4/5 bg-elevated">
                  <img src={CREATOR_IMAGES[index]} alt={`${DISPLAY_NAMES[index]} creator portrait`} loading="lazy" width={768} height={1024} className="h-full w-full object-cover"/>
                  <div className="media-shade absolute inset-0" />
                  {c.featured && (
                    <span className="pill absolute top-3 left-3 bg-soft-pink text-panel-deep">✧ Featured</span>
                  )}
                  <div className="absolute bottom-0 space-y-2 p-4">
                    <p className="text-lg font-bold text-overlay-foreground">{DISPLAY_NAMES[index]} <BadgeCheck size={14} className="inline text-soft-pink"/></p>
                    <p className="text-xs text-overlay-foreground/70">@{c.username}</p>
                    <p className="text-xs text-overlay-foreground/70">
                      {c.followers.toLocaleString("en-US")} followers
                    </p>
                    <TagPills tags={c.tags} small />
                  </div>
                </div>
              </Link>
              <button
                onClick={() => toggleFollow(c.username)}
                className={`pill absolute top-3 right-3 ${
                  isFollowing(c.username) ? "bg-panel-deep/80 text-overlay-foreground" : "bg-panel-deep/80 text-overlay-foreground"
                }`}
              >
                {isFollowing(c.username) ? "Following ✓" : "Follow"}
              </button>
            </div>
          ))}
        </div>

        <div className="noir-panel mt-10 flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center bg-accent-light text-accent"><ShieldCheck size={22}/></span><div><h3 className="font-bold">Discreet Billing Guarantee</h3><p className="text-xs text-muted-foreground">No adult text on statements · Bank-grade security · Private anonymized credits</p></div></div>
          <span className="pill bg-elevated text-muted-foreground"><LockKeyhole size={13}/> 256-Bit Encrypted</span>
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

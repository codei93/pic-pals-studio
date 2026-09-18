import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { credits, getCreator } from "@/lib/mock-data";
import { Avatar, KindBadge } from "@/components/brand";
import { LockedMedia } from "@/components/locked-media";
import { useApp } from "@/lib/store";
import { BadgeCheck, Heart, ImageIcon, LockKeyhole, MapPin, MessageCircle, MoreHorizontal, Phone, ShieldCheck } from "lucide-react";
import zari from "@/assets/creator-zari.jpg";
import shalita from "@/assets/creator-shalita.jpg";
import chloe from "@/assets/creator-chloe.jpg";

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
    <div className="mx-auto max-w-[1200px] space-y-6 px-4 pb-10 md:px-6">
      <section className="relative -mx-4 h-64 overflow-hidden md:-mx-6 md:h-80"><img src={zari} alt={`${creator.displayName} cover`} width={768} height={1024} className="h-full w-full object-cover object-[center_35%] opacity-60"/><div className="media-shade absolute inset-0"/><span className="pill absolute top-4 right-4 bg-panel-deep/80 text-overlay-foreground"><BadgeCheck size={12} className="text-soft-pink"/> VIP Verified</span></section>
      <section className="relative -mt-24 flex flex-col gap-5 md:flex-row md:items-end">
        <img src={zari} alt={`${creator.displayName} profile`} width={768} height={1024} className="h-36 w-28 shrink-0 rounded-md border-2 border-soft-pink object-cover shadow-[0_0_30px_color-mix(in_oklab,var(--accent)_30%,transparent)]"/>
        <div className="flex-1 space-y-2">
          <div>
            <h1 className="text-3xl font-bold">Zari Luxe <BadgeCheck className="inline text-soft-pink" size={18}/></h1>
            <p className="text-xs text-muted-foreground">@zariluxe　 <span className="text-success">● Online recently</span>　 <MapPin size={11} className="inline"/> Kampala, Uganda 🇺🇬</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className={isFollowing(creator.username) ? "btn-primary" : "btn-outline"}
            onClick={() => toggleFollow(creator.username)}
          >
            {isFollowing(creator.username) ? "Following ✓" : "Follow"}
          </button>
          {chatUnlocked ? (
            <Link to="/chat" className="btn-outline">
              Message
            </Link>
          ) : (
            <button className="btn-primary" disabled title="Make a purchase to unlock chat">
              Message locked
            </button>
          )}
          <button className="btn-ghost" aria-label="More options"><MoreHorizontal size={16}/></button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-4">{[["14.2k","Followers"],["38.4k","Likes"],["182","Media assets"],["99.4%","Fast PPV delivery"]].map(([v,l])=><div key={l} className="bg-surface p-5"><p className="text-xl font-bold">{v}</p><p className="text-[9px] font-bold uppercase text-muted-foreground">{l}</p></div>)}</section>
      <p className="max-w-3xl text-sm leading-relaxed">High fashion model & private entertainer based in Kampala. Custom requests & 1-on-1 VIP chat open to verified patrons & buyers 💋 Discreet inquiries strictly honored.</p>

      <section className="noir-panel grid gap-4 p-5 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center"><span className="grid h-11 w-11 place-items-center bg-accent-light text-soft-pink"><Phone size={21}/></span><div className="min-w-0"><p className="text-[9px] font-bold uppercase text-info">Phone number　 Verified direct WhatsApp / line</p><p className="mt-1 text-lg font-bold">+256 7•• ••• ••9　 <span className="text-soft-pink">₡ 25,000</span></p><p className="text-[10px] text-muted-foreground">Purchasing instantly reveals verified direct VIP number. Meetups are not arranged by the platform.</p></div><button className="btn-primary">Unlock Number</button></section>

      <div className="flex gap-5 border-b border-border">
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
            className={`border-b-2 px-0 py-3 text-sm font-bold ${
              tab === key ? "border-soft-pink text-foreground" : "border-transparent text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "posts" && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">{creator.posts.slice(0,3).map((p,index) => (
            <article key={p.id} className="noir-panel overflow-hidden">
              <div className="flex items-center gap-3 p-4"><Avatar seed="Zari Luxe" size={34}/><div className="min-w-0 flex-1"><p className="text-xs font-bold">Zari Luxe <BadgeCheck size={11} className="inline text-soft-pink"/></p><p className="text-[10px] text-muted-foreground">{p.postedAgo} · {p.type === "free" ? "Public Preview" : "Pay-Per-View Locked"}</p></div><MoreHorizontal size={16}/></div>
              <p className="px-4 pb-3 text-sm">{p.caption}</p>
              {p.type === "free" ? (
                <img src={zari} alt="Zari Luxe post" loading="lazy" width={768} height={1024} className="max-h-[620px] w-full object-cover object-top"/>
              ) : (
                <LockedMedia
                  id={p.id}
                  kind={p.type === "ppv_photo" ? "PPV Photo" : "PPV Video"}
                  price={p.price}
                  creator={creator.username}
                  gradient={`url(${index === 1 ? shalita : chloe}) center/cover`}
                  aspect="aspect-4/3"
                />
              )}
              <div className="flex gap-4 border-t border-border p-3 text-xs"><span><Heart size={15} className="inline"/> {p.likes}</span><span><MessageCircle size={15} className="inline"/> {Math.floor(p.likes/4)}</span></div>
            </article>
          ))}</div>
          <aside className="space-y-5"><section className="noir-panel p-5"><div className="flex justify-between"><h2 className="font-bold"><ImageIcon size={17} className="mr-1 inline text-soft-pink"/> Media Preview</h2><span className="text-[10px]">182 items</span></div><div className="mt-4 grid grid-cols-3 gap-2">{[zari,shalita,chloe,shalita,zari,chloe].map((src,i)=><div className="relative aspect-3/4 overflow-hidden bg-elevated" key={i}><img src={src} alt="Media preview" loading="lazy" width={768} height={1024} className={`h-full w-full object-cover ${i!==2?"blur-sm opacity-50":""}`}/>{i!==2&&<LockKeyhole size={13} className="absolute top-2 right-2"/>}</div>)}</div><button className="btn-ghost mt-4 w-full text-xs">View All 142 Assets →</button></section><section className="noir-panel p-5"><h2 className="font-bold"><ShieldCheck size={17} className="mr-1 inline text-soft-pink"/> Discretion Certified</h2><p className="mt-3 text-xs leading-relaxed text-muted-foreground">Bank statements show generic discreet descriptor. No platform watermarks visible on unlocked full-size media.</p><p className="mt-3 text-[10px] text-success">● 256-Bit Encrypted　● Anti-Leak Scrim</p></section></aside>
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

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CREATORS, credits } from "@/lib/mock-data";
import { Avatar, EmptyState } from "@/components/brand";
import { LockedMedia } from "@/components/locked-media";
import { useApp } from "@/lib/store";
import { BadgeCheck, Heart, MessageCircle, MoreHorizontal, ShieldCheck, WalletCards } from "lucide-react";
import zari from "@/assets/creator-zari.jpg";
import chloe from "@/assets/creator-chloe.jpg";
import amina from "@/assets/creator-amina.jpg";
import patricia from "@/assets/creator-patricia.jpg";

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
  const { following, tip, balance, toggleFollow, isFollowing } = useApp();
  const [tipFor, setTipFor] = useState<string | null>(null);
  const [amount, setAmount] = useState(1000);

  const followed = CREATORS.filter((c) => following.includes(c.username));
  const posts = followed.flatMap((c) => c.posts.map((p) => ({ post: p, creator: c })));

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[minmax(0,680px)_300px]">
      <main className="min-w-0 space-y-6">
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
          <section className="noir-panel p-4"><div className="mb-3 flex items-center justify-between"><h1 className="text-sm font-bold text-soft-pink">⚡ VIP Moments</h1><span className="text-[9px] font-bold uppercase text-muted-foreground">PPV preview</span></div><div className="flex gap-4 overflow-x-auto pb-1">
            {followed.flatMap((c) =>
              c.stories.map((s) => (
                <div
                  key={s.id}
                  className={`flex w-20 shrink-0 flex-col items-center gap-2 ${
                    s.expired ? "opacity-40" : ""
                  }`}
                >
                   <span className="rounded-md border-2 border-accent p-0.5"><Avatar seed={c.displayName} size={56} /></span>
                  <span className="pill tag-pill">
                    {s.expired ? "Expired" : credits(s.price)}
                  </span>
                </div>
              )),
            )}
           </div></section>

          {posts.slice(0,4).map(({ post, creator }, index) => (
            <article key={`${creator.id}-${post.id}`} className="noir-panel overflow-hidden">
              <div className="flex items-center gap-3 p-4">
                <Avatar seed={creator.displayName} size={36} />
                <div className="min-w-0 flex-1">
                  <Link
                    to="/models/$username"
                    params={{ username: creator.username }}
                    className="text-sm font-semibold"
                  >
                    {index % 3 === 0 ? "Zari Luxe" : index % 3 === 1 ? "Nalule Diva" : "Chloe Kampala"} <BadgeCheck size={12} className="inline text-soft-pink"/>
                  </Link>
                  <p className="text-xs text-subtle-foreground">{post.postedAgo}</p>
                </div><MoreHorizontal size={16} className="text-muted-foreground"/>
              </div>

              <p className="px-4 pb-3 text-sm text-foreground">{post.caption} {index === 0 && "✨ VIP members check your inbox for custom shoot details!"}</p>

              {post.type === "free" ? (
                <img src={index === 0 ? zari : index === 3 ? amina : chloe} alt="Creator post" loading="lazy" width={768} height={1024} className="max-h-[620px] w-full object-cover"/>
              ) : (
                <LockedMedia
                  id={post.id}
                  kind={post.type === "ppv_photo" ? "PPV Photo" : "PPV Video"}
                  price={post.price}
                  creator={creator.username}
                  gradient={index === 1 ? `url(${patricia}) center/cover` : `url(${chloe}) center/cover`}
                  aspect="aspect-4/5"
                />
              )}

              <div className="flex items-center gap-4 border-t border-border bg-surface p-3">
                <span className="flex items-center gap-1 text-xs"><Heart size={15}/> {post.likes}</span>
                <span className="flex items-center gap-1 text-xs"><MessageCircle size={15}/> {Math.floor(post.likes/4)}</span>
                <button className="btn-primary ml-auto py-2 text-xs" onClick={() => setTipFor(creator.username)}>
                  ◎ Tip Creator
                </button>
              </div>
            </article>
          ))}
        </>
      )}

      </main>
      <aside className="hidden space-y-5 lg:block">
        <section className="noir-panel overflow-hidden"><div className="bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_58%)] p-5"><div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase text-muted-foreground"><span>Private reserve</span><WalletCards size={14}/></div><p className="text-xs text-muted-foreground">Available Discreet Balance</p><p className="mt-1 text-3xl font-bold text-soft-pink">{credits(balance)}</p><button className="btn-primary mt-4 w-full">◎ Deposit</button></div></section>
        <section className="noir-panel p-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-bold">Suggested VIPs</h2><Link to="/" className="text-[10px] font-bold text-accent">EXPLORE ALL</Link></div>{CREATORS.slice(2,5).map((c,i)=><div key={c.id} className="mb-4 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2"><Avatar seed={c.displayName} size={34}/><div className="min-w-0"><p className="truncate text-xs font-bold">{["Shantel K","Maya Noir","Brenda Bliss"][i]}</p><p className="truncate text-[10px] text-muted-foreground">@{c.username}</p></div><button onClick={()=>toggleFollow(c.username)} className="bg-elevated px-2 py-1 text-[9px] font-bold">{isFollowing(c.username)?"FOLLOWING":"FOLLOW"}</button></div>)}</section>
        <section className="noir-panel flex gap-3 p-4"><ShieldCheck size={18} className="shrink-0 text-soft-pink"/><p className="text-[10px] leading-relaxed text-muted-foreground"><strong className="text-foreground">100% “Zero-Footprint” Guarantee</strong><br/>No bank statements mention creator handles. All payments convert automatically into TryDiscreet credits.</p></section>
      </aside>

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

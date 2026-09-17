import { createFileRoute, Link } from "@tanstack/react-router";
import { CreatorShell } from "@/components/creator-shell";
import { credits, RECENT_SALES, EARNINGS_BREAKDOWN } from "@/lib/mock-data";
import { KindBadge } from "@/components/brand";

export const Route = createFileRoute("/creator/dashboard")({
  head:()=>({meta:[{title:"Creator Dashboard — TryDiscreet"},{name:"description",content:"Track sales, followers and upcoming payouts."},{property:"og:title",content:"Creator Dashboard — TryDiscreet"},{property:"og:description",content:"Track sales, followers and upcoming payouts."}]}),
  component: Dashboard,
});
function Dashboard(){
 const stats=[['Total Earned',credits(142500)],['This Month',credits(68000)],['Followers','14,240'],['Next Payout','1 Oct 2026']];
 return <CreatorShell title="Welcome back, Naomi ✨">
  <div className="flex gap-2"><Link to="/creator/content/new" className="btn-primary">＋ Post Content</Link><Link to="/creator/stories" className="btn-ghost">Upload Story</Link></div>
  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{stats.map(([l,v])=><div className="card-surface" key={l}><p className="text-xs uppercase text-subtle-foreground">{l}</p><p className="mt-3 text-xl font-bold text-accent">{v}</p></div>)}</div>
  <div className="grid gap-5 lg:grid-cols-3"><section className="card-surface space-y-4 lg:col-span-2"><h2 className="text-lg font-bold">Income Channels Breakdown</h2>{EARNINGS_BREAKDOWN.slice(0,4).map(x=><div key={x.label}><div className="mb-1 flex justify-between text-xs"><span>{x.label}</span><span>{credits(x.value)}</span></div><div className="h-2 bg-elevated"><div className="h-full bg-accent" style={{width:`${x.value/4000}%`}} /></div></div>)}</section><section className="card-surface"><h2 className="text-lg font-bold">High Yield Vault</h2><p className="mt-4 text-sm text-muted-foreground">Your premium video sets lead this month's sales.</p></section></div>
  <section className="card-surface overflow-x-auto"><h2 className="mb-4 text-lg font-bold">Recent Purchases & Unlocks</h2><table className="w-full min-w-[620px] text-left text-sm"><thead className="text-xs text-subtle-foreground"><tr><th className="pb-3">Fan</th><th>Item</th><th>Creator Cut</th><th>Date</th></tr></thead><tbody>{RECENT_SALES.map(x=><tr className="border-t border-border" key={x.fan+x.date}><td className="py-3">{x.fan}</td><td><KindBadge kind={x.kind}/></td><td className="text-accent">+ {credits(x.credits)}</td><td className="text-muted-foreground">{x.date}</td></tr>)}</tbody></table></section>
 </CreatorShell>
}

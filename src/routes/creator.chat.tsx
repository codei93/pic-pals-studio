import { createFileRoute } from "@tanstack/react-router";
import { CreatorShell } from "@/components/creator-shell";
export const Route = createFileRoute("/creator/chat")({ head:()=>({meta:[{title:"Creator Chat — TryDiscreet"},{name:"description",content:"Reply to your unlocked fan conversations."},{property:"og:title",content:"Creator Chat — TryDiscreet"},{property:"og:description",content:"Reply to your unlocked fan conversations."}]}), component: Page });
function Page(){return <CreatorShell title="Creator Chat"><div className="card-surface"><p className="text-sm text-muted-foreground">Reply to your unlocked fan conversations.</p></div></CreatorShell>}

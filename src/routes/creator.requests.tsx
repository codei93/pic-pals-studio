import { createFileRoute } from "@tanstack/react-router";
import { CreatorShell } from "@/components/creator-shell";
export const Route = createFileRoute("/creator/requests")({ head:()=>({meta:[{title:"Custom Requests — TryDiscreet"},{name:"description",content:"Review and fulfil custom fan requests."},{property:"og:title",content:"Custom Requests — TryDiscreet"},{property:"og:description",content:"Review and fulfil custom fan requests."}]}), component: Page });
function Page(){return <CreatorShell title="Custom Requests"><div className="card-surface"><p className="text-sm text-muted-foreground">Review and fulfil custom fan requests.</p></div></CreatorShell>}

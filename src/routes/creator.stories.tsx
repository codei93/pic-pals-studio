import { createFileRoute } from "@tanstack/react-router";
import { CreatorShell } from "@/components/creator-shell";
export const Route = createFileRoute("/creator/stories")({ head:()=>({meta:[{title:"Stories — TryDiscreet"},{name:"description",content:"Manage short-lived premium stories."},{property:"og:title",content:"Stories — TryDiscreet"},{property:"og:description",content:"Manage short-lived premium stories."}]}), component: Page });
function Page(){return <CreatorShell title="Stories"><div className="card-surface"><p className="text-sm text-muted-foreground">Manage short-lived premium stories.</p></div></CreatorShell>}

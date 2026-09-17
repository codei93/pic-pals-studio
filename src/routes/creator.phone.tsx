import { createFileRoute } from "@tanstack/react-router";
import { CreatorShell } from "@/components/creator-shell";
export const Route = createFileRoute("/creator/phone")({ head:()=>({meta:[{title:"Phone Number — TryDiscreet"},{name:"description",content:"Set the price for access to your verified contact number."},{property:"og:title",content:"Phone Number — TryDiscreet"},{property:"og:description",content:"Set the price for access to your verified contact number."}]}), component: Page });
function Page(){return <CreatorShell title="Phone Number"><div className="card-surface"><p className="text-sm text-muted-foreground">Set the price for access to your verified contact number.</p></div></CreatorShell>}

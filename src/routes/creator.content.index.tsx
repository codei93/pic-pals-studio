import { createFileRoute } from "@tanstack/react-router";
import { CreatorShell } from "@/components/creator-shell";

export const Route = createFileRoute("/creator/content/")({
  head: () => ({
    meta: [
      { title: "My Content — TryDiscreet" },
      { name: "description", content: "Manage your published posts and premium media." },
      { property: "og:title", content: "My Content — TryDiscreet" },
      { property: "og:description", content: "Manage your published posts and premium media." },
    ],
  }),
  component: MyContent,
});

function MyContent() {
  return (
    <CreatorShell title="My Content">
      <div className="card-surface">
        <p className="text-sm text-muted-foreground">Manage your published posts and premium media.</p>
      </div>
    </CreatorShell>
  );
}
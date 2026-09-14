import { createFileRoute } from "@tanstack/react-router";
import logoDark from "@/assets/logo-dark.png.asset.json";
import logoLight from "@/assets/logo-light.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TryDiscreet — Discreet. Private. Yours." },
      {
        name: "description",
        content:
          "TryDiscreet is a discreet, private creator platform. Sign in to your fan or creator portal.",
      },
      { property: "og:title", content: "TryDiscreet — Discreet. Private. Yours." },
      {
        property: "og:description",
        content:
          "TryDiscreet is a discreet, private creator platform. Sign in to your fan or creator portal.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 items-center border-b border-border px-6">
        <img src={logoDark.url} alt="TryDiscreet" className="hidden max-h-10 dark:block" />
        <img src={logoLight.url} alt="TryDiscreet" className="max-h-10 dark:hidden" />
      </header>
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Discreet. Private. Yours.
        </h1>
        <p className="mt-4 text-muted-foreground">
          The TryDiscreet portal — coming together next.
        </p>
      </main>
    </div>
  );
}

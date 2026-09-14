import { Link } from "@tanstack/react-router";
import logoDark from "@/assets/logo-dark.png.asset.json";
import logoLight from "@/assets/logo-light.png.asset.json";
import type { PurchaseKind } from "@/lib/mock-data";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img src={logoDark.url} alt="TryDiscreet" className="hidden max-h-10 dark:block" />
      <img src={logoLight.url} alt="TryDiscreet" className="max-h-10 dark:hidden" />
    </Link>
  );
}

export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <span
      className="inline-block shrink-0 overflow-hidden rounded-full border border-accent"
      style={{ width: size, height: size }}
    >
      <img
        src={logoDark.url}
        alt=""
        className="h-full w-full object-cover"
        style={{ objectPosition: "88% 50%", transform: "scale(2.6)" }}
      />
    </span>
  );
}

export function Avatar({
  seed,
  size = 40,
  ring = false,
}: {
  seed: string;
  size?: number;
  ring?: boolean;
}) {
  const initials = seed
    .split(/[\s.]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${
        ring ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : ""
      }`}
      style={{
        width: size,
        height: size,
        fontSize: size / 2.8,
        background: "linear-gradient(140deg,#e91e8c,#7a0f4c)",
      }}
    >
      {initials}
    </span>
  );
}

const KIND_STYLES: Record<PurchaseKind, string> = {
  "PPV Photo": "bg-accent text-white",
  "PPV Video": "bg-violet text-white",
  Story: "bg-warning text-black",
  Tip: "bg-success text-black",
  "Phone Number": "bg-info text-white",
  "Custom Request": "bg-amber-500 text-black",
};

export function KindBadge({ kind }: { kind: PurchaseKind }) {
  return <span className={`pill ${KIND_STYLES[kind]}`}>{kind}</span>;
}

export function TagPills({ tags, small = false }: { tags: string[]; small?: boolean }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span key={t} className="pill tag-pill" style={small ? { fontSize: 10, padding: "2px 8px" } : undefined}>
          {t}
        </span>
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="card-surface flex flex-col items-center gap-4 py-14 text-center">
      <div className="text-3xl text-subtle-foreground">◌</div>
      <p className="text-sm text-muted-foreground">{title}</p>
      {action}
    </div>
  );
}

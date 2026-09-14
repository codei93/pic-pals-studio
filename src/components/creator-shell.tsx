import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Avatar } from "./brand";
import { useApp } from "@/lib/store";
import { credits } from "@/lib/mock-data";

const NAV = [
  { to: "/creator/dashboard", label: "Dashboard" },
  { to: "/creator/content/new", label: "Post Content" },
  { to: "/creator/content", label: "My Content" },
  { to: "/creator/stories", label: "Stories" },
  { to: "/creator/chat", label: "Chat" },
  { to: "/creator/requests", label: "Requests" },
  { to: "/creator/phone", label: "Phone Number" },
  { to: "/creator/earnings", label: "Earnings" },
  { to: "/creator/settings", label: "Settings" },
] as const;

function KycPill() {
  const { kycStatus } = useApp();
  if (kycStatus === "verified")
    return (
      <span className="pill bg-success/15 text-success">✓ KYC Verified — Payouts Enabled</span>
    );
  if (kycStatus === "under_review")
    return <span className="pill bg-elevated text-muted-foreground">KYC Under Review</span>;
  if (kycStatus === "rejected")
    return (
      <Link to="/creator/kyc" className="pill bg-error/15 text-error">
        ✗ KYC Rejected — Resubmit
      </Link>
    );
  return (
    <Link to="/creator/kyc" className="pill bg-warning/15 text-warning">
      ⚠ Complete KYC to unlock payouts
    </Link>
  );
}

export function CreatorShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 md:px-6">
      <aside className="hidden w-60 shrink-0 flex-col gap-4 md:flex">
        <div className="card-surface space-y-3">
          <div className="flex items-center gap-3">
            <Avatar seed="Naomi K" size={44} />
            <div>
              <p className="text-sm font-semibold">Naomi K</p>
              <p className="text-xs text-muted-foreground">@naomi</p>
            </div>
          </div>
          <KycPill />
        </div>

        <nav className="flex flex-col gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-[10px] px-3 py-2 text-sm text-muted-foreground hover:bg-elevated [&.active]:bg-accent [&.active]:text-white"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <span className="pill tag-pill w-full justify-center">{credits(12500)} pending</span>
        </div>
      </aside>

      <main className="min-w-0 flex-1 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="md:hidden">
            <KycPill />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 md:hidden">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="pill shrink-0 bg-elevated text-muted-foreground [&.active]:bg-accent [&.active]:text-white"
            >
              {n.label}
            </Link>
          ))}
        </div>
        {children}
      </main>
    </div>
  );
}

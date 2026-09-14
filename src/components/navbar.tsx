import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Avatar, Logo } from "./brand";
import { useTheme } from "@/lib/theme";
import { useApp } from "@/lib/store";
import { credits } from "@/lib/mock-data";

const TABS = [
  { to: "/", label: "Home", icon: "⌂" },
  { to: "/feed", label: "Feed", icon: "▤" },
  { to: "/wallet", label: "Wallet", icon: "₡" },
  { to: "/chat", label: "Chat", icon: "✉" },
  { to: "/creator/dashboard", label: "Studio", icon: "★" },
] as const;

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { balance } = useApp();
  const [menu, setMenu] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isCreator = pathname.startsWith("/creator");

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Logo />

        <nav className="ml-6 hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          <Link to="/" className="hover:text-foreground [&.active]:text-foreground">
            Browse
          </Link>
          <Link to="/feed" className="hover:text-foreground [&.active]:text-foreground">
            Feed
          </Link>
          <Link to="/purchases" className="hover:text-foreground [&.active]:text-foreground">
            Purchases
          </Link>
          <Link to="/creator/dashboard" className="hover:text-foreground">
            Creator Studio
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {isCreator ? (
            <span className="pill tag-pill hidden sm:inline-flex">{credits(12500)} earnings</span>
          ) : (
            <Link to="/wallet" className="text-sm font-bold text-accent">
              {credits(balance)}
            </Link>
          )}

          <button aria-label="Notifications" className="relative text-lg">
            🔔
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-error" />
          </button>

          <div className="relative">
            <button aria-label="Account menu" onClick={() => setMenu((m) => !m)}>
              <Avatar seed="You Fan" size={32} />
            </button>
            {menu && (
              <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-md border border-border bg-surface text-sm">
                <Link
                  to="/creator/settings"
                  className="block px-4 py-2 hover:bg-elevated"
                  onClick={() => setMenu(false)}
                >
                  Settings
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-elevated"
                  onClick={() => setMenu(false)}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>

          <button aria-label="Toggle theme" onClick={toggle} className="text-lg">
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>
      </div>
    </header>
  );
}

export function MobileTabs() {
  return (
    <nav className="fixed bottom-0 left-0 z-40 flex h-14 w-full items-center justify-around border-t border-border bg-background md:hidden">
      {TABS.map((t) => (
        <Link
          key={t.to}
          to={t.to}
          aria-label={t.label}
          className="flex h-full flex-1 items-center justify-center text-lg text-muted-foreground [&.active]:text-accent"
        >
          {t.icon}
        </Link>
      ))}
    </nav>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Avatar, Logo } from "./brand";
import { useTheme } from "@/lib/theme";
import { useApp } from "@/lib/store";
import { credits } from "@/lib/mock-data";
import { Bell, ChevronDown, Moon, Sparkles, Sun, WalletCards } from "lucide-react";

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
    <header className="sticky top-0 z-40 h-16 w-full border-b border-border bg-panel-deep/95 backdrop-blur-xl">
      <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 md:flex md:px-8">
        <Logo className="shrink-0" />

        <nav className="ml-8 hidden h-full items-center gap-1 text-xs font-semibold md:flex">
          <Link to="/feed" className="px-4 py-2 text-muted-foreground hover:text-foreground [&.active]:bg-elevated [&.active]:text-foreground">
            Feed
          </Link>
          <Link to="/wallet" className="px-4 py-2 text-muted-foreground hover:text-foreground [&.active]:bg-elevated [&.active]:text-foreground">
            Wallet
          </Link>
          <Link to="/chat" className="px-4 py-2 text-muted-foreground hover:text-foreground [&.active]:bg-elevated [&.active]:text-foreground">
            Chat
          </Link>
          <Link to="/purchases" className="px-4 py-2 text-muted-foreground hover:text-foreground [&.active]:bg-elevated [&.active]:text-foreground">
            Notifications
          </Link>
          <Link to="/creator/settings" className="px-4 py-2 text-muted-foreground hover:text-foreground">
            Settings
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {isCreator ? (
            <span className="pill tag-pill hidden sm:inline-flex">{credits(12500)} earnings</span>
          ) : (
            <Link to="/wallet" className="pill hidden bg-accent-light text-accent sm:inline-flex">
              <WalletCards size={14} /> {credits(balance)}
            </Link>
          )}

          <Link to="/creator/dashboard" className="hidden items-center gap-2 bg-elevated px-3 py-2 text-[10px] font-bold uppercase md:flex">
            <Sparkles size={13} /> Creator portal
          </Link>

          <button aria-label="Notifications" className="relative grid h-9 w-9 place-items-center bg-elevated">
            <Bell size={16} />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-error" />
          </button>

          <div className="relative">
            <button aria-label="Account menu" onClick={() => setMenu((m) => !m)} className="flex items-center gap-1">
              <Avatar seed="You Fan" size={32} />
              <ChevronDown size={12} className="hidden sm:block" />
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

          <button aria-label="Toggle theme" onClick={toggle} className="hidden text-muted-foreground lg:block">
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-panel-deep px-4 py-8 text-xs text-muted-foreground">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p><strong className="text-foreground">Try<span className="text-accent">Discreet</span></strong> — Ultra-discreet nocturnal PPV & creator hub</p>
        <p>Privacy · Safety & Discretion Policy　 © 2026 TryDiscreet. 18+ Strictly.</p>
      </div>
    </footer>
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

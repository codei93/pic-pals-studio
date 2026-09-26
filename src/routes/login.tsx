import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Diamond, Fingerprint, Lock, Shield } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Enter the Vault — TryDiscreet" },
      { name: "description", content: "Cryptographically protected, zero-footprint authentication." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const handleAuth = () => navigate({ to: "/choose-path" });

  return (
    <PageShell>
      <StatusBar
        left={<><PulsingDot /> Enclave Online</>}
        right={<><Shield size={11} /> Zero-Footprint ID</>}
      />

      <BrandHeader />

      <Card>
        <div className="text-center space-y-1.5">
          <PageLabel>Sovereign Patron Entry</PageLabel>
          <h1 className="font-display text-4xl font-bold text-white">Enter the Vault</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cryptographically protected, zero-footprint authentication. Select your sovereign identity provider.
          </p>
        </div>

        <Divider />

        <div className="flex flex-col gap-2.5">
          <AuthButton onClick={handleAuth} icon={<GoogleIcon />} label="Continue with Google" badge="Isolated" badgeIcon={<Lock size={10} />} light />
          <AuthButton onClick={handleAuth} icon={<XIcon />} label="Continue with X" badge="Anonymized" badgeIcon={<Shield size={10} />} />
        </div>

        <div className="bg-background border border-border rounded-lg px-4 py-3 flex items-start gap-3">
          <Fingerprint size={15} className="text-accent mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold text-white">Instant zero-trace login.</span>{" "}
            No public activity feeds or social graph telemetry are ever shared with external identity providers.
          </p>
        </div>

      </Card>

      <p className="text-center text-[11px] text-subtle-foreground px-2 leading-relaxed">
        <span className="font-semibold text-muted-foreground">18+ Adult Sovereign Entertainment Affirmation.</span>{" "}
        By proceeding, you verify that you are at least 18 years of age or the age of legal majority in your jurisdiction.
      </p>
    </PageShell>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function AuthButton({
  onClick, icon, label, badge, badgeIcon, light,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge: string;
  badgeIcon: React.ReactNode;
  light?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-5 py-3.5 rounded-lg font-semibold text-sm transition-colors ${
        light
          ? "bg-white text-[#131313] hover:bg-gray-100"
          : "bg-elevated border border-border-light text-white hover:bg-[#333]"
      }`}
    >
      <span className="flex items-center gap-3">{icon}{label}</span>
      <span className={`flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase ${light ? "text-[#999]" : "text-subtle-foreground"}`}>
        {badgeIcon}{badge}
      </span>
    </button>
  );
}

// ── Shared primitives (same across all auth pages) ────────────────────────────

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-[520px] flex flex-col gap-5">{children}</div>
    </div>
  );
}

export function BrandHeader() {
  return (
    <div className="flex items-center justify-center gap-3 bg-surface border border-border rounded-xl px-5 py-3.5">
      <span className="font-display text-xl font-bold tracking-tight leading-none">
        <span className="text-accent">try</span><span className="text-white">discreet</span>
      </span>
      <span className="h-4 w-px bg-border" />
      <span className="text-[11px] tracking-widest text-subtle-foreground">Discreet. Private. Yours.</span>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center ml-auto">
        <Diamond size={14} className="text-white" />
      </div>
    </div>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-5">{children}</div>
  );
}

export function StatusBar({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-0.5">
      <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-success uppercase">{left}</span>
      <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-subtle-foreground uppercase">{right}</span>
    </div>
  );
}

export function PageLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold tracking-widest text-accent uppercase">{children}</p>;
}

export function Divider({ label }: { label?: string }) {
  if (!label) return <div className="border-t border-border" />;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 border-t border-border" />
      <span className="text-[10px] font-bold tracking-widest text-subtle-foreground uppercase whitespace-nowrap">{label}</span>
      <div className="flex-1 border-t border-border" />
    </div>
  );
}

export function FieldLabel({ label, hint }: { label: string; hint?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs font-semibold text-white">{label}</p>
      {hint && <span className="text-[10px] text-subtle-foreground flex items-center gap-1">{hint}</span>}
    </div>
  );
}

export function Hint({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] text-subtle-foreground leading-snug">{children}</p>;
}

export function PulsingDot({ color = "green" }: { color?: "green" | "pink" }) {
  return <span className={`w-1.5 h-1.5 rounded-full inline-block ${color === "green" ? "bg-success" : "bg-accent"}`} />;
}

export function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 text-subtle-foreground hover:text-white text-xs font-medium transition-colors">
      ← {label}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 5.787zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

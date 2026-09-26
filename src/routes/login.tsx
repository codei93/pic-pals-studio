import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Diamond, EyeOff, Fingerprint, Lock, Shield } from "lucide-react";

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
      {/* Status bar */}
      <StatusBar
        left={<><PulsingDot color="green" /> Enclave Online</>}
        right={<><Shield size={11} /> Zero-Footprint ID</>}
      />

      {/* Logo */}
      <div className="flex flex-col items-center gap-3 py-8">
        <div className="flex items-center gap-3 bg-surface border border-border rounded-md px-5 py-3">
          <span className="font-display text-xl font-bold tracking-tight">
            <span className="text-accent">try</span><span className="text-white">discreet</span>
          </span>
          <span className="h-4 w-px bg-border" />
          <span className="text-[10px] tracking-widest text-subtle-foreground uppercase">Discreet. Private. Yours.</span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center ml-1">
            <Diamond size={14} className="text-white" />
          </div>
        </div>
      </div>

      {/* Card */}
      <Card>
        <div className="text-center space-y-2 pb-2">
          <Label>Sovereign Patron Entry</Label>
          <h1 className="font-display text-4xl font-bold text-white">Enter the Vault</h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Cryptographically protected, zero-footprint authentication. Select your sovereign identity provider.
          </p>
        </div>

        <Divider />

        <div className="space-y-3">
          <button
            onClick={handleAuth}
            className="w-full flex items-center justify-between bg-white text-[#131313] font-semibold text-sm px-5 py-3.5 rounded-md hover:bg-gray-100 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <GoogleIcon />
              Continue with Google
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#888] uppercase">
              <Lock size={10} /> Isolated
            </span>
          </button>

          <button
            onClick={handleAuth}
            className="w-full flex items-center justify-between bg-elevated border border-border-light text-white font-semibold text-sm px-5 py-3.5 rounded-md hover:bg-[#333] transition-colors"
          >
            <div className="flex items-center gap-3">
              <XIcon />
              Continue with X
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-subtle-foreground uppercase">
              <Shield size={10} /> Anonymized
            </span>
          </button>
        </div>

        <div className="bg-background border border-border rounded-md px-4 py-3 flex items-start gap-3">
          <Fingerprint size={15} className="text-accent mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold text-white">Instant zero-trace login.</span>{" "}
            No public activity feeds or social graph telemetry are ever shared with external identity providers.
          </p>
        </div>

        <Divider label="Sovereign Protocol Guarantees" />

        <div className="space-y-2">
          {[
            { icon: <EyeOff size={14} />, title: "Zero Data Leakage", desc: "Social credentials verify identity, nothing more." },
            { icon: <Fingerprint size={14} />, title: "Anonymous Identity", desc: "Real names never appear on comments or unlocks." },
            { icon: <Lock size={14} />, title: "TLS 1.3 / E2E Protocol", desc: "Enclave protected Bitstream session tokens." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 bg-background border border-border rounded-md px-4 py-3">
              <span className="text-subtle-foreground mt-0.5 shrink-0">{icon}</span>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-subtle-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between bg-accent/10 border border-accent/20 rounded-md px-4 py-3">
          <div className="flex items-center gap-3">
            <Diamond size={15} className="text-accent shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">Creator Onboarding</p>
              <p className="text-xs text-subtle-foreground">Applying as an exclusive creator?</p>
            </div>
          </div>
          <button
            onClick={() => navigate({ to: "/choose-path" })}
            className="bg-accent hover:bg-accent-dark text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            Creator Portal →
          </button>
        </div>
      </Card>

      <p className="text-center text-[11px] text-subtle-foreground px-4 leading-relaxed mt-2">
        <span className="font-semibold text-muted-foreground">18+ Adult Sovereign Entertainment Affirmation.</span>{" "}
        By proceeding, you verify that you are at least 18 years of age or the age of legal majority in your jurisdiction.
      </p>
    </PageShell>
  );
}

// ── Shared design primitives ──────────────────────────────────────────────────

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-[520px] flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-5">
      {children}
    </div>
  );
}

function StatusBar({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-1">
      <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-success uppercase">{left}</span>
      <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-subtle-foreground uppercase">{right}</span>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold tracking-widest text-accent uppercase">{children}</p>;
}

function Divider({ label }: { label?: string }) {
  if (!label) return <div className="border-t border-border" />;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 border-t border-border" />
      <span className="text-[10px] font-bold tracking-widest text-subtle-foreground uppercase whitespace-nowrap">{label}</span>
      <div className="flex-1 border-t border-border" />
    </div>
  );
}

function PulsingDot({ color }: { color: "green" | "pink" }) {
  const cls = color === "green" ? "bg-success" : "bg-accent";
  return <span className={`w-1.5 h-1.5 rounded-full ${cls} inline-block`} />;
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

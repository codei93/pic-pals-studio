import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Diamond, Shield } from "lucide-react";

export const Route = createFileRoute("/choose-path")({
  head: () => ({
    meta: [{ title: "Choose Your Path — TryDiscreet" }],
  }),
  component: ChoosePath,
});

function ChoosePath() {
  const navigate = useNavigate();

  return (
    <PageShell>
      <StatusBar
        left={<><PulsingDot color="green" /> Authenticated · Alex Kay <span className="text-subtle-foreground font-normal normal-case">(alex.kay@gmail.com)</span></>}
        right={<><PulsingDot color="green" /> Enclave Handshake Verified</>}
      />

      <div className="flex flex-col items-center text-center gap-3 py-6">
        <Label>Select Your Role</Label>
        <h1 className="font-display text-4xl font-bold text-white">
          Choose Your <span className="text-accent">Path</span>
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
          Select how you want to experience TryDiscreet. Your credentials remain sovereign, zero-knowledge shielded, and strictly anonymized.
        </p>
      </div>

      {/* Vertical stacked cards */}
      <div className="flex flex-col gap-3">
        {/* Fan — top */}
        <button
          onClick={() => navigate({ to: "/fan-setup" })}
          className="w-full bg-surface border border-border hover:border-border-light rounded-xl p-5 flex items-center gap-5 text-left transition-all group"
        >
          <div className="w-12 h-12 bg-elevated rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#333] transition-colors">
            <Shield size={20} className="text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-lg text-white">Join as Fan</p>
            <p className="text-sm text-subtle-foreground mt-0.5">Browse and support creators anonymously. Zero KYC required.</p>
          </div>
          <div className="shrink-0 w-8 h-8 rounded-md bg-elevated border border-border flex items-center justify-center text-muted-foreground group-hover:text-white transition-colors">
            →
          </div>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-border" />
          <span className="text-[10px] font-bold tracking-widest text-subtle-foreground uppercase">or</span>
          <div className="flex-1 border-t border-border" />
        </div>

        {/* Creator — bottom */}
        <button
          onClick={() => navigate({ to: "/creator-profile" })}
          className="w-full bg-accent/10 border border-accent/30 hover:border-accent/60 rounded-xl p-5 flex items-center gap-5 text-left transition-all group"
        >
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shrink-0 group-hover:bg-accent-dark transition-colors">
            <Diamond size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="font-display font-bold text-lg text-white">Join as Creator</p>
              <span className="text-[9px] font-bold tracking-widest text-accent uppercase bg-accent/15 px-2 py-0.5 rounded-full">80/20 Revenue</span>
            </div>
            <p className="text-sm text-subtle-foreground">Monetize exclusive content and receive direct payouts.</p>
          </div>
          <div className="shrink-0 w-8 h-8 rounded-md bg-accent/20 border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
            →
          </div>
        </button>
      </div>

      <p className="text-center text-[11px] text-subtle-foreground mt-2">
        You can switch roles later from your account settings.
      </p>
    </PageShell>
  );
}

// ── Shared primitives (duplicated per file for isolation) ─────────────────────

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-[520px] flex flex-col gap-4">{children}</div>
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

function PulsingDot({ color }: { color: "green" | "pink" }) {
  const cls = color === "green" ? "bg-success" : "bg-accent";
  return <span className={`w-1.5 h-1.5 rounded-full ${cls} inline-block`} />;
}

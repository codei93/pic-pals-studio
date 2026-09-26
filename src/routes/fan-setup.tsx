import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Lock, RefreshCw, Shield } from "lucide-react";

export const Route = createFileRoute("/fan-setup")({
  head: () => ({
    meta: [{ title: "Fan Persona Setup — TryDiscreet" }],
  }),
  component: FanSetup,
});

function generateAlias() {
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `@patron_${n}_enclave`;
}

function FanSetup() {
  const navigate = useNavigate();
  const [alias, setAlias] = useState("@patron_9921_enclave");
  const [displayName, setDisplayName] = useState("Alex K");
  const [agreed, setAgreed] = useState(false);

  return (
    <PageShell>
      {/* Back nav */}
      <div className="flex items-center justify-between px-1">
        <BackButton onClick={() => navigate({ to: "/choose-path" })} />
        <span className="text-[10px] font-bold tracking-widest text-subtle-foreground uppercase">
          Screen 02 · Enclave Shield
        </span>
      </div>

      {/* Progress */}
      <div className="h-px bg-border rounded-full overflow-hidden">
        <div className="h-full w-full bg-accent rounded-full" />
      </div>

      {/* Header */}
      <div className="flex flex-col gap-1.5 pt-2 px-1">
        <Label>Zero-Knowledge Persona · Protocol V4.19</Label>
        <h1 className="font-display text-3xl font-bold text-white">Fan Persona Setup</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Instant activation. Zero KYC required. Your identity remains strictly pseudonymous across all ledger transactions.
        </p>
      </div>

      {/* OAuth user card */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elevated flex items-center justify-center text-sm font-bold text-white font-display">
              AK
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Alex Kay</p>
              <p className="text-xs text-subtle-foreground">alex.kay@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-success/10 border border-success/25 rounded-md px-3 py-1.5">
            <Lock size={11} className="text-success" />
            <span className="text-[10px] font-bold tracking-widest text-success uppercase">Google OAuth</span>
          </div>
        </div>
      </Card>

      {/* Display name */}
      <Card>
        <FieldLabel label="Display Name" hint="Customizable anytime" />
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="input"
        />
        <p className="text-xs text-subtle-foreground -mt-1">
          Visible to creators when tipping or unlocking PPV assets. Your personal legal name is never published.
        </p>

        <Divider />

        {/* Stealth handle */}
        <FieldLabel
          label="Stealth Cryptographic Handle"
          hint={<span className="flex items-center gap-1"><Shield size={10} /> Public Pseudonym</span>}
        />
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-background border border-border rounded-md px-4 py-3">
            <span className="font-mono text-sm text-white">{alias}</span>
          </div>
          <button
            onClick={() => setAlias(generateAlias())}
            className="flex items-center gap-2 bg-elevated border border-border-light text-muted-foreground hover:text-white text-xs font-bold px-4 rounded-md transition-colors whitespace-nowrap"
          >
            <RefreshCw size={12} /> Reroll
          </button>
        </div>
        <p className="text-xs text-subtle-foreground -mt-1">
          Cryptographic alias replaces your real email on all public ledgers, tip records, and creator direct feeds.
        </p>
      </Card>

      {/* Stealth tipping info */}
      <div className="bg-surface border border-border rounded-xl px-5 py-4 flex items-start gap-4">
        <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
          <Shield size={16} className="text-accent" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-white">Stealth Ledger Tipping</p>
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-success uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" /> Active Default
            </span>
          </div>
          <p className="text-xs text-subtle-foreground leading-relaxed">
            Tips originate from node hash shielding personal balance and clearing channels. Zero unencrypted traces are stored on central cloud mirrors.
          </p>
        </div>
      </div>

      {/* Agreement */}
      <label className="flex items-start gap-3 cursor-pointer">
        <div
          onClick={() => setAgreed(!agreed)}
          className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
            agreed ? "bg-accent border-accent" : "border-border-light bg-background"
          }`}
        >
          {agreed && <span className="text-white text-[10px] font-black leading-none">✓</span>}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          I certify that I am 18 years of age or older, and I consent to the{" "}
          <span className="text-white underline cursor-pointer">Sovereign Discretion Charter</span> and{" "}
          <span className="text-white underline cursor-pointer">Platform Terms</span>.
        </p>
      </label>

      {/* CTA */}
      <button
        onClick={() => agreed && navigate({ to: "/" })}
        disabled={!agreed}
        className="w-full bg-accent hover:bg-accent-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-sm tracking-wide transition-colors"
      >
        Complete Setup & Enter Fan Feed →
      </button>

      {/* Footer */}
      <div className="flex items-center justify-between px-1 pb-2">
        <span className="flex items-center gap-1.5 text-[10px] text-subtle-foreground">
          <Shield size={10} /> SHA-256 Persona Salt Generated
        </span>
        <span className="text-[10px] text-subtle-foreground font-mono">Node: enclave_fan_78943.zkp</span>
      </div>
    </PageShell>
  );
}

// ── Shared primitives ─────────────────────────────────────────────────────────

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-[520px] flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-4">{children}</div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold tracking-widest text-accent uppercase">{children}</p>;
}

function FieldLabel({ label, hint }: { label: string; hint?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs font-semibold text-white">{label}</p>
      {hint && <span className="text-[10px] text-subtle-foreground flex items-center gap-1">{hint}</span>}
    </div>
  );
}

function Divider() {
  return <div className="border-t border-border" />;
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-subtle-foreground hover:text-white text-xs font-medium transition-colors"
    >
      <ArrowLeft size={13} /> Back to Role Selection
    </button>
  );
}

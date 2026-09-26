import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, RefreshCw, Shield } from "lucide-react";
import {
  PageShell, BrandHeader, Card, StatusBar, PageHeader,
  Divider, FieldLabel, Hint, PulsingDot, BackButton,
} from "./login";

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
      <StatusBar
        left={<><PulsingDot /> Authenticated · Alex Kay</>}
        right={<>Screen 02 · Enclave Shield</>}
      />

      <BrandHeader />

      <PageHeader
        label="Zero-Knowledge Persona · Protocol V4.19"
        title="Fan Persona Setup"
        subtitle="Instant activation. Zero KYC required. Your identity remains strictly pseudonymous across all ledger transactions."
      />

      {/* Progress */}
      <div className="h-px bg-accent rounded-full" />

      {/* OAuth user card */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elevated flex items-center justify-center text-sm font-bold text-white font-display shrink-0">
              AK
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Alex Kay</p>
              <p className="text-xs text-subtle-foreground">alex.kay@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-success/10 border border-success/25 rounded-lg px-3 py-1.5">
            <Lock size={11} className="text-success" />
            <span className="text-[10px] font-bold tracking-widest text-success uppercase">Google OAuth</span>
          </div>
        </div>

        <Divider />

        {/* Display name */}
        <div className="flex flex-col gap-2">
          <FieldLabel label="Display Name" hint="Customizable anytime" />
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="input"
          />
          <Hint>Visible to creators when tipping or unlocking PPV assets. Your personal legal name is never published.</Hint>
        </div>

        <Divider />

        {/* Stealth handle */}
        <div className="flex flex-col gap-2">
          <FieldLabel
            label="Stealth Cryptographic Handle"
            hint={<span className="flex items-center gap-1"><Shield size={10} /> Public Pseudonym</span>}
          />
          <div className="flex gap-2">
            <div className="flex-1 bg-background border border-border rounded-lg px-4 py-3 flex items-center">
              <span className="font-mono text-sm text-white">{alias}</span>
            </div>
            <button
              onClick={() => setAlias(generateAlias())}
              className="flex items-center gap-2 bg-elevated border border-border text-subtle-foreground hover:text-white text-xs font-semibold px-4 rounded-lg transition-colors whitespace-nowrap"
            >
              <RefreshCw size={11} /> Reroll
            </button>
          </div>
          <Hint>Cryptographic alias replaces your real email on all public ledgers, tip records, and creator direct feeds.</Hint>
        </div>
      </Card>

      {/* Stealth tipping */}
      <div className="bg-surface border border-border rounded-xl px-5 py-4 flex items-start gap-4">
        <div className="w-9 h-9 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center shrink-0">
          <Shield size={15} className="text-accent" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-white">Stealth Ledger Tipping</p>
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-success uppercase">
              <PulsingDot /> Active Default
            </span>
          </div>
          <p className="text-xs text-subtle-foreground leading-relaxed">
            Tips originate from node hash shielding personal balance and clearing channels. Zero unencrypted traces are stored on central cloud mirrors.
          </p>
        </div>
      </div>

      {/* Agreement */}
      <label className="flex items-start gap-3 cursor-pointer px-0.5">
        <div
          onClick={() => setAgreed(!agreed)}
          className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
            agreed ? "bg-accent border-accent" : "border-border-light bg-background"
          }`}
        >
          {agreed && <span className="text-white text-[9px] font-black leading-none">✓</span>}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          I certify that I am 18 years of age or older, and I consent to the{" "}
          <span className="text-white underline cursor-pointer">Sovereign Discretion Charter</span> and{" "}
          <span className="text-white underline cursor-pointer">Platform Terms</span>.
        </p>
      </label>

      <button
        onClick={() => agreed && navigate({ to: "/" })}
        disabled={!agreed}
        className="w-full bg-accent hover:bg-accent-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-sm tracking-wide transition-colors"
      >
        Complete Setup & Enter Fan Feed →
      </button>

      <div className="flex items-center justify-between px-0.5 pb-2">
        <BackButton label="Back to Role Selection" onClick={() => navigate({ to: "/choose-path" })} />
        <span className="text-[10px] text-subtle-foreground font-mono">Node: enclave_fan_78943.zkp</span>
      </div>
    </PageShell>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Lock, Shield, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/fan-setup")({
  head: () => ({
    meta: [
      { title: "Fan Persona Setup — TryDiscreet" },
      { name: "description", content: "Set up your anonymous fan persona." },
    ],
  }),
  component: FanSetup,
});

function generateAlias() {
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `@patron_${num}_enclave`;
}

function FanSetup() {
  const navigate = useNavigate();
  const [alias, setAlias] = useState("@patron_9921_enclave");
  const [displayName, setDisplayName] = useState("Alex K");
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-[#131313] flex flex-col px-4 py-8">
      {/* Top bar */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between mb-10">
        <button
          onClick={() => navigate({ to: "/choose-path" })}
          className="flex items-center gap-2 text-[#a0a0a0] hover:text-white text-xs transition-colors"
        >
          <ArrowLeft size={14} /> Back to Role Selection
        </button>
        <span className="text-[10px] font-bold tracking-widest text-[#a0a0a0] uppercase">
          Screen 02 // Enclave Shield
        </span>
      </div>

      {/* Pink progress bar */}
      <div className="max-w-2xl mx-auto w-full h-0.5 bg-[#ff479c] rounded-full mb-10 opacity-60" />

      <div className="max-w-2xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff479c] inline-block" />
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">Zero-Knowledge Persona</span>
            <span className="text-[10px] text-[#666] tracking-widest uppercase ml-2">Protocol V4.19</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white">Fan Persona Setup</h1>
          <p className="text-sm text-[#a0a0a0] max-w-lg">
            Instant activation. Zero KYC required. Your identity remains strictly pseudonymous across all ledger transactions.
          </p>
        </div>

        {/* User card */}
        <div className="bg-[#1c1b1b] border border-[#2e2e2e] rounded-sm p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#555] to-[#333] flex items-center justify-center text-sm font-bold text-white">
              AK
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Alex Kay</p>
              <p className="text-xs text-[#666]">alex.kay@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-[#131313] border border-[#2e2e2e] rounded-sm px-3 py-1.5">
            <Lock size={12} className="text-green-400" />
            <span className="text-[10px] font-bold tracking-widest text-green-400 uppercase">Google OAuth Linked</span>
          </div>
        </div>

        {/* Display Name */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold tracking-widest text-white uppercase">Display Name</label>
            <span className="text-[10px] text-[#666]">Customizable anytime</span>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            </span>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-[#131313] border border-[#2e2e2e] rounded-sm pl-10 pr-4 py-3 text-sm text-white focus:border-[#ff479c] focus:outline-none"
            />
          </div>
          <p className="text-xs text-[#666]">
            Visible to creators when tipping or unlocking PPV assets. Your personal legal name is never published.
          </p>
        </div>

        {/* Stealth Handle */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold tracking-widest text-white uppercase">Stealth Cryptographic Handle</label>
            <div className="flex items-center gap-1 text-[10px] text-[#666]">
              <Shield size={10} />
              <span className="uppercase tracking-widest font-bold">Public Pseudonym</span>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex-1 flex items-center gap-2 bg-[#131313] border border-[#2e2e2e] rounded-sm px-4 py-3">
              <span className="text-[#666]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              </span>
              <span className="text-sm text-white font-mono">{alias}</span>
            </div>
            <button
              onClick={() => setAlias(generateAlias())}
              className="flex items-center gap-2 bg-[#2a2a2a] border border-[#3a3a3a] text-[#a0a0a0] hover:text-white text-xs font-bold px-4 py-3 rounded-sm transition-colors whitespace-nowrap"
            >
              <RefreshCw size={12} /> Reroll Alias
            </button>
          </div>
          <p className="text-xs text-[#666]">
            Cryptographic alias replaces your real email on all public ledgers, tip records, and creator direct feeds.
          </p>
        </div>

        {/* Stealth Ledger Tipping */}
        <div className="bg-[#1c1b1b] border border-[#2e2e2e] rounded-sm p-5 flex items-start gap-4">
          <div className="w-10 h-10 bg-[#2a2a2a] rounded-sm flex items-center justify-center shrink-0">
            <Shield size={18} className="text-[#ff479c]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-bold text-white">Stealth Ledger Tipping</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                <span className="text-[10px] font-bold tracking-widest text-green-400 uppercase">Active Default</span>
              </div>
            </div>
            <p className="text-xs text-[#666]">
              Tips originate from node hash shielding personal balance and clearing channels. Zero unencrypted traces are stored on central cloud mirrors.
            </p>
          </div>
        </div>

        {/* Agreement */}
        <div className="flex items-start gap-3">
          <button
            onClick={() => setAgreed(!agreed)}
            className={`mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
              agreed ? "bg-[#ff479c] border-[#ff479c]" : "border-[#3a3a3a] bg-[#131313]"
            }`}
          >
            {agreed && <span className="text-white text-[10px] font-bold">✓</span>}
          </button>
          <p className="text-xs text-[#a0a0a0] leading-relaxed">
            I certify that I am 18 years of age or older, and I consent to the{" "}
            <span className="text-white underline cursor-pointer">Sovereign Discretion Charter</span> and{" "}
            <span className="text-white underline cursor-pointer">Platform Terms</span>.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => agreed && navigate({ to: "/" })}
          className={`w-full py-4 rounded-sm text-sm font-bold tracking-wide transition-colors flex items-center justify-center gap-2 ${
            agreed
              ? "bg-[#ff479c] hover:bg-[#e03585] text-[#0d0d0d] cursor-pointer"
              : "bg-[#ff479c]/50 text-[#0d0d0d]/50 cursor-not-allowed"
          }`}
        >
          Complete Setup & Enter Fan Feed →
        </button>

        {/* Footer note */}
        <p className="text-center text-[10px] text-[#666] flex items-center justify-center gap-1">
          <span>⚡</span> Next destination: Immediate redirect to Fan Home Feed (/) · No further steps needed ·{" "}
          <span className="font-bold text-[#a0a0a0]">Fan setup complete</span>
        </p>
      </div>

      {/* Bottom bar */}
      <div className="max-w-2xl mx-auto w-full mt-12 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[10px] text-[#666]">
          <Shield size={10} /> SHA-256 Persona Salt Generated
        </span>
        <span className="text-[10px] text-[#666] font-mono">Node: enclave_fan_78943.zkp</span>
      </div>
    </div>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Shield, Eye, EyeOff, Lock, Fingerprint, Diamond } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Enter the Vault — TryDiscreet" },
      { name: "description", content: "Cryptographically protected, zero-footprint authentication." },
      { property: "og:title", content: "Enter the Vault — TryDiscreet" },
      { property: "og:description", content: "Cryptographically protected, zero-footprint authentication." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();

  const handleGoogle = () => navigate({ to: "/choose-path" });
  const handleX = () => navigate({ to: "/choose-path" });

  return (
    <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center px-4 py-10">
      {/* Top status bar */}
      <div className="w-full max-w-xl flex justify-between items-center mb-8 px-1">
        <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-green-400 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Enclave Online
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#a0a0a0] uppercase">
          <Shield size={11} />
          Zero-Footprint ID
        </span>
      </div>

      {/* Logo */}
      <div className="mb-8 bg-[#1c1b1b] border border-[#2e2e2e] rounded-sm px-6 py-4 flex items-center gap-3">
        <span className="font-display text-2xl font-bold">
          <span className="text-[#ff479c]">try</span>
          <span className="text-white">discreet</span>
        </span>
        <span className="text-[10px] tracking-widest text-[#666] uppercase">Discreet. Private. Yours.</span>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff479c] to-[#c01070] flex items-center justify-center ml-2">
          <Diamond size={18} className="text-white" />
        </div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-xl bg-[#1c1b1b] border border-[#2e2e2e] rounded-sm p-8 space-y-6">
        <div className="text-center space-y-2">
          <p className="text-[10px] font-bold tracking-widest text-[#ff479c] uppercase">Sovereign Patron Entry</p>
          <h1 className="font-display text-4xl font-bold text-white">Enter the Vault</h1>
          <p className="text-sm text-[#a0a0a0] max-w-sm mx-auto">
            Cryptographically protected, zero-footprint authentication. Select your sovereign identity provider.
          </p>
        </div>

        <div className="space-y-3">
          {/* Google */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-between bg-white text-[#131313] font-semibold text-sm px-5 py-3.5 rounded-sm hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-[#666] uppercase">
              <Lock size={10} />
              Isolated
            </span>
          </button>

          {/* X / Twitter */}
          <button
            onClick={handleX}
            className="w-full flex items-center justify-between bg-[#2a2a2a] border border-[#3a3a3a] text-white font-semibold text-sm px-5 py-3.5 rounded-sm hover:bg-[#333] transition-colors"
          >
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 5.787zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Continue with X
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-[#666] uppercase">
              <Shield size={10} />
              Anonymized
            </span>
          </button>
        </div>

        {/* Zero-trace notice */}
        <div className="bg-[#131313] border border-[#2e2e2e] rounded-sm px-4 py-3 flex items-start gap-3">
          <Fingerprint size={16} className="text-[#ff479c] mt-0.5 shrink-0" />
          <p className="text-xs text-[#a0a0a0]">
            <span className="font-bold text-white">Instant zero-trace login.</span>{" "}
            No public activity feeds or social graph telemetry are ever shared with external identity providers.
          </p>
        </div>

        {/* Protocol guarantees */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold tracking-widest text-[#666] uppercase text-center">
            Sovereign Protocol Guarantees
          </p>
          <div className="space-y-2">
            {[
              {
                icon: <EyeOff size={14} />,
                title: "Zero Data Leakage",
                desc: "Social credentials verify identity, nothing more.",
              },
              {
                icon: <Fingerprint size={14} />,
                title: "Anonymous Identity",
                desc: "Real names never appear on comments or unlocks.",
              },
              {
                icon: <Lock size={14} />,
                title: "TLS 1.3 / E2E Protocol",
                desc: "Enclave protected Bitstream session tokens.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 bg-[#131313] border border-[#2e2e2e] rounded-sm px-4 py-3">
                <span className="text-[#a0a0a0] mt-0.5">{icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-[#666]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Creator onboarding CTA */}
        <div className="flex items-center justify-between bg-[#131313] border border-[#2e2e2e] rounded-sm px-4 py-3">
          <div className="flex items-center gap-3">
            <Diamond size={16} className="text-[#ff479c]" />
            <div>
              <p className="text-sm font-semibold text-white">Creator Onboarding</p>
              <p className="text-xs text-[#666]">Applying as an exclusive creator?</p>
            </div>
          </div>
          <button
            onClick={() => navigate({ to: "/choose-path" })}
            className="btn-primary text-xs py-2 px-4 flex items-center gap-1"
          >
            Creator Portal <span>→</span>
          </button>
        </div>
      </div>

      {/* Age affirmation */}
      <div className="mt-6 max-w-xl text-center space-y-1 px-4">
        <p className="text-[10px] font-bold tracking-widest text-[#666] uppercase">
          18+ Adult Sovereign Entertainment Affirmation
        </p>
        <p className="text-xs text-[#666]">
          By proceeding, you verify that you are at least 18 years of age or the age of legal majority in your jurisdiction.
        </p>
      </div>
    </div>
  );
}

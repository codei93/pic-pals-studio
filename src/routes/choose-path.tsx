import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Shield, Diamond } from "lucide-react";

export const Route = createFileRoute("/choose-path")({
  head: () => ({
    meta: [
      { title: "Choose Your Path — TryDiscreet" },
      { name: "description", content: "Select how you want to experience TryDiscreet." },
    ],
  }),
  component: ChoosePath,
});

function ChoosePath() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center px-4 py-10">
      {/* Status bar */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-12 px-1">
        <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-green-400 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Authenticated Session · Alex Kay
          <span className="text-[#666] normal-case font-normal">(alex.kay@gmail.com)</span>
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#a0a0a0] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Enclave Handshake Verified
        </span>
      </div>

      {/* Heading */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-white">CHOOSE YOUR </span>
          <span className="text-[#ff479c]">PATH</span>
        </h1>
        <p className="text-sm text-[#ff479c] max-w-lg mx-auto">
          Select how you want to experience TryDiscreet. Your credentials remain sovereign, zero-knowledge shielded, and strictly anonymized.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Fan card */}
        <div className="bg-[#1c1b1b] border border-[#2e2e2e] rounded-sm p-8 space-y-6">
          <div className="w-12 h-12 bg-[#2a2a2a] rounded-sm flex items-center justify-center">
            <Shield size={22} className="text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-white">JOIN AS FAN</h2>
            <p className="text-sm text-[#a0a0a0]">Browse and support creators anonymously.</p>
          </div>
          <button
            onClick={() => navigate({ to: "/fan-setup" })}
            className="w-full flex items-center justify-between bg-[#2a2a2a] border border-[#3a3a3a] text-white font-bold text-xs tracking-widest uppercase px-5 py-3.5 rounded-sm hover:bg-[#333] transition-colors"
          >
            Continue as Fan <span className="text-lg">→</span>
          </button>
        </div>

        {/* Creator card */}
        <div className="bg-gradient-to-br from-[#2a1a24] to-[#1c1b1b] border border-[#ff479c]/30 rounded-sm p-8 space-y-6">
          <div className="w-12 h-12 bg-[#ff479c] rounded-sm flex items-center justify-center">
            <Diamond size={22} className="text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-white">JOIN AS CREATOR</h2>
            <p className="text-sm text-[#a0a0a0]">Monetize exclusive content and receive direct payouts.</p>
          </div>
          <button
            onClick={() => navigate({ to: "/creator-profile" })}
            className="w-full flex items-center justify-between bg-[#ff479c] text-[#0d0d0d] font-bold text-xs tracking-widest uppercase px-5 py-3.5 rounded-sm hover:bg-[#e03585] transition-colors"
          >
            Continue as Creator <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

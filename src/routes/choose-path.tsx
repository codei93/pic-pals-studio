import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Diamond, Shield } from "lucide-react";
import { PageShell, BrandHeader, StatusBar, PageHeader, PulsingDot } from "./login";

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
        left={<><PulsingDot /> Authenticated · Alex Kay <span className="text-subtle-foreground font-normal normal-case">(alex.kay@gmail.com)</span></>}
        right={<><PulsingDot /> Enclave Handshake Verified</>}
      />

      <BrandHeader />

      <PageHeader
        label="Select Your Role"
        title={<>Choose Your <span className="text-accent">Path</span></>}
        subtitle="Your credentials remain sovereign, zero-knowledge shielded, and strictly anonymized."
      />

      <div className="flex flex-col gap-3">
        {/* Fan — top */}
        <button
          onClick={() => navigate({ to: "/fan-setup" })}
          className="w-full bg-surface border border-border hover:border-border-light rounded-xl p-5 flex items-center gap-4 text-left transition-all group"
        >
          <div className="w-11 h-11 bg-elevated rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#333] transition-colors">
            <Shield size={19} className="text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-base text-white">Join as Fan</p>
            <p className="text-xs text-subtle-foreground mt-0.5">Browse and support creators anonymously. Zero KYC required.</p>
          </div>
          <span className="shrink-0 text-subtle-foreground group-hover:text-white transition-colors text-lg">→</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-border" />
          <span className="text-[10px] font-bold tracking-widest text-subtle-foreground uppercase">or</span>
          <div className="flex-1 border-t border-border" />
        </div>

        {/* Creator — bottom */}
        <button
          onClick={() => navigate({ to: "/creator-profile" })}
          className="w-full bg-accent/10 border border-accent/25 hover:border-accent/50 rounded-xl p-5 flex items-center gap-4 text-left transition-all group"
        >
          <div className="w-11 h-11 bg-accent rounded-lg flex items-center justify-center shrink-0 group-hover:bg-accent-dark transition-colors">
            <Diamond size={19} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="font-display font-bold text-base text-white">Join as Creator</p>
              <span className="text-[9px] font-bold tracking-widest text-accent uppercase bg-accent/15 px-2 py-0.5 rounded-full">80/20 Revenue</span>
            </div>
            <p className="text-xs text-subtle-foreground">Monetize exclusive content and receive direct payouts.</p>
          </div>
          <span className="shrink-0 text-accent group-hover:text-white transition-colors text-lg">→</span>
        </button>
      </div>

      <p className="text-center text-[11px] text-subtle-foreground">
        You can switch roles later from your account settings.
      </p>
    </PageShell>
  );
}

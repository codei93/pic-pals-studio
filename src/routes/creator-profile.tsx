import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Check, Shield } from "lucide-react";
import {
  PageShell, BrandHeader, Card, StatusBar, PageLabel,
  Divider, FieldLabel, Hint, PulsingDot, BackButton,
} from "./login";

export const Route = createFileRoute("/creator-profile")({
  head: () => ({
    meta: [{ title: "Creator Profile & Payout Application — TryDiscreet" }],
  }),
  component: CreatorProfile,
});

type Gender = "Female" | "Male" | "Prefer not to say";

function CreatorProfile() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1
  const [displayName, setDisplayName] = useState("Velvet Siren");
  const [handle, setHandle] = useState("velvetsiren");
  const [bio, setBio] = useState("High-discretion visual artist & model in Kampala. Exclusive private vault drops every Friday night.");
  const [gender, setGender] = useState<Gender>("Female");

  // Step 2
  const [firstName, setFirstName] = useState("Alex");
  const [middleName, setMiddleName] = useState("Kigozi");
  const [lastName, setLastName] = useState("Kay");
  const [phone, setPhone] = useState("772 123 456");
  const [dob, setDob] = useState({ day: "12", month: "04", year: "1998" });
  const [agreed, setAgreed] = useState(false);

  return (
    <PageShell>
      <StatusBar
        left={<><PulsingDot /> Authenticated · Alex Kay</>}
        right={<>Step {step} of 2 · Creator Onboarding</>}
      />

      <BrandHeader />

      <div className="flex flex-col gap-1.5 px-0.5">
        <PageLabel>Discreet Noir Vault Architecture · Step {step} of 2</PageLabel>
        <h1 className="font-display text-4xl font-bold text-white">
          {step === 1 ? "Public Vault Identity" : "Legal Payout Identity"}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {step === 1
            ? "Configure your creator brand. This is what patrons see on your vault."
            : "Payout details are zero-knowledge encrypted and used only for settlement clearing."}
        </p>
      </div>

      {/* Step progress bar */}
      <div className="flex gap-2">
        <div className="flex-1 h-1 rounded-full bg-accent" />
        <div className={`flex-1 h-1 rounded-full transition-colors ${step === 2 ? "bg-accent" : "bg-border"}`} />
      </div>

      {/* Payout badge */}
      <div className="flex items-center gap-2.5 bg-accent/10 border border-accent/20 rounded-lg px-4 py-2.5 self-start">
        <Shield size={13} className="text-accent shrink-0" />
        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Payout Shield</span>
        <span className="w-px h-3 bg-accent/30" />
        <span className="text-xs font-bold text-white">80/20 Settlement</span>
      </div>

      {/* ── STEP 1 ── */}
      {step === 1 && (
        <Card>
          <div className="flex flex-col gap-2">
            <FieldLabel label="Creator Display Name *" hint="Visible to patrons" />
            <div className="relative">
              <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="input pr-10" />
              <Check size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-success" />
            </div>
            <Hint>Imported from verified social authentication channel.</Hint>
          </div>

          <Divider />

          <div className="flex flex-col gap-2">
            <FieldLabel label="Unique Namespace Handle *" hint="Immutable vanity tag" />
            <div className="flex items-stretch">
              <span className="bg-elevated border border-border border-r-0 rounded-l-lg px-3 flex items-center text-sm font-bold text-accent">@</span>
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                className="flex-1 bg-background border border-border rounded-r-lg px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
              />
              <span className="ml-3 text-[10px] font-bold tracking-widest text-success uppercase self-center whitespace-nowrap">Available</span>
            </div>
            <Hint>Custom route: <span className="text-muted-foreground">trydiscreet.com/@{handle}</span></Hint>
          </div>

          <Divider />

          <div className="flex flex-col gap-2">
            <FieldLabel label="Private Vault Teaser & Bio" hint={`${bio.length} / 500`} />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 500))}
              rows={3}
              className="input resize-none"
            />
          </div>

          <Divider />

          <div className="flex flex-col gap-2">
            <FieldLabel label="Creator Profile Classification" />
            <div className="flex gap-2 flex-wrap">
              {(["Female", "Male", "Prefer not to say"] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    gender === g ? "bg-accent text-white" : "bg-elevated border border-border text-subtle-foreground hover:text-white"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* ── STEP 2 ── */}
      {step === 2 && (
        <>
          <Card>
            <div className="flex items-center gap-2 self-start bg-background border border-border rounded-lg px-3 py-1.5">
              <span className="text-accent text-xs">🔐</span>
              <span className="text-[10px] font-bold tracking-widest text-subtle-foreground uppercase">Zero-Knowledge Encrypted</span>
            </div>

            <div className="flex flex-col gap-2">
              <FieldLabel label="Legal Full Name *" hint="Must match government ID" />
              {[
                { val: firstName, set: setFirstName, placeholder: "First Name" },
                { val: middleName, set: setMiddleName, placeholder: "Middle Name (Optional)" },
                { val: lastName, set: setLastName, placeholder: "Last Name" },
              ].map(({ val, set, placeholder }) => (
                <div key={placeholder} className="flex flex-col gap-1">
                  <input value={val} onChange={(e) => set(e.target.value)} placeholder={placeholder} className="input" />
                  <Hint>{placeholder}</Hint>
                </div>
              ))}
            </div>

            <Divider />

            <div className="flex flex-col gap-2">
              <FieldLabel
                label="Mobile Settlement Terminal *"
                hint={<span className="text-success font-semibold">MTN MoMo & Airtel Ready</span>}
              />
              <div className="flex gap-2">
                <div className="bg-background border border-border rounded-lg px-3 py-3 text-sm text-white flex items-center whitespace-nowrap">
                  +256 (UG) ▾
                </div>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input flex-1" placeholder="772 123 456" />
              </div>
              <Hint>Instant micro-settlements routed in UGX directly upon PPV unlocks.</Hint>
            </div>

            <Divider />

            <div className="flex flex-col gap-2">
              <FieldLabel
                label="Date of Birth *"
                hint={<span className="text-accent font-semibold">18+ Mandatory Protocol</span>}
              />
              <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-4 py-3">
                {[
                  { val: dob.day, key: "day" as const, max: 2, placeholder: "DD", w: "w-8" },
                  { val: dob.month, key: "month" as const, max: 2, placeholder: "MM", w: "w-8" },
                  { val: dob.year, key: "year" as const, max: 4, placeholder: "YYYY", w: "w-14" },
                ].map(({ val, key, max, placeholder, w }, i) => (
                  <span key={key} className="flex items-center gap-2">
                    {i > 0 && <span className="text-subtle-foreground">/</span>}
                    <input
                      value={val}
                      onChange={(e) => setDob((d) => ({ ...d, [key]: e.target.value }))}
                      maxLength={max}
                      placeholder={placeholder}
                      className={`bg-transparent ${w} text-sm text-white focus:outline-none text-center`}
                    />
                  </span>
                ))}
                <Calendar size={14} className="ml-auto text-subtle-foreground" />
              </div>
              <Hint>Cross-referenced against physical passport / national ID during Step 2.</Hint>
            </div>
          </Card>

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
              I certify under penalty of account forfeiture that I am at least{" "}
              <span className="font-semibold text-white">18 years of age</span>, formally agree to the{" "}
              <span className="text-accent underline cursor-pointer">80/20 Sovereign Creator Settlement Charter</span>, and acknowledge that my
              creator profile and media vault will remain designated as{" "}
              <span className="font-semibold text-white">Inactive</span> until biometric and government identity verification is approved in Step 2.
            </p>
          </label>
        </>
      )}

      {/* CTA */}
      {step === 1 ? (
        <button
          onClick={() => setStep(2)}
          className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-4 rounded-xl text-sm tracking-wide transition-colors"
        >
          Continue to Payout Identity →
        </button>
      ) : (
        <button
          onClick={() => agreed && navigate({ to: "/creator/kyc" })}
          disabled={!agreed}
          className="w-full bg-accent hover:bg-accent-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-sm tracking-wide transition-colors"
        >
          Save Profile & Proceed to KYC Verification →
        </button>
      )}

      <div className="flex items-center justify-between px-0.5 pb-2">
        <BackButton
          label={step === 1 ? "Back to Role Selection" : "Back to Step 1"}
          onClick={() => (step === 1 ? navigate({ to: "/choose-path" }) : setStep(1))}
        />
        <p className="text-[11px] text-subtle-foreground">
          {step === 1 ? "Your data is encrypted at rest." : "Next: KYC verification"}
        </p>
      </div>
    </PageShell>
  );
}

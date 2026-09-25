import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Shield, Diamond, CheckSquare, Calendar } from "lucide-react";

export const Route = createFileRoute("/creator-profile")({
  head: () => ({
    meta: [
      { title: "Creator Profile & Payout Application — TryDiscreet" },
      { name: "description", content: "Configure your creator brand and payout details." },
    ],
  }),
  component: CreatorProfile,
});

function CreatorProfile() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("Velvet Siren");
  const [handle, setHandle] = useState("velvetsiren");
  const [bio, setBio] = useState("High-discretion visual artist & model in Kampala. Exclusive private vault drops every Friday night.");
  const [gender, setGender] = useState<"Female" | "Male" | "Prefer not to say">("Female");
  const [firstName, setFirstName] = useState("Alex");
  const [middleName, setMiddleName] = useState("Kigozi");
  const [lastName, setLastName] = useState("Kay");
  const [phone, setPhone] = useState("772 123 456");
  const [dob, setDob] = useState({ day: "12", month: "04", year: "1998" });
  const [agreed, setAgreed] = useState(true);

  const bioLength = bio.length;

  return (
    <div className="min-h-screen bg-[#131313] px-4 py-8">
      {/* Top bar */}
      <div className="max-w-2xl mx-auto flex items-center justify-between mb-8">
        <button
          onClick={() => navigate({ to: "/choose-path" })}
          className="flex items-center gap-2 text-[#a0a0a0] hover:text-white text-xs transition-colors"
        >
          <ArrowLeft size={14} /> Back to Role Selection
        </button>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          <span className="text-[10px] font-bold text-white tracking-wide">Alex Kay</span>
          <span className="text-[10px] text-[#666]">(alex.kay@gmail.com)</span>
          <span className="text-[10px] font-bold tracking-widest text-[#ff479c] uppercase ml-1">— Authenticated</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#ff479c] uppercase">
            <Shield size={11} /> Discreet Noir Vault Architecture
          </span>
          <h1 className="font-display text-3xl font-bold text-white">Creator Profile & Payout Application</h1>
          <p className="text-sm text-[#a0a0a0] max-w-lg">
            Configure your creator brand, payout coordinates, and legal majority. Profile is created in{" "}
            <span className="font-bold text-white underline decoration-dotted">Inactive state</span>{" "}
            until identity and payout routing are cryptographically signed.
          </p>
        </div>

        {/* Payout badge */}
        <div className="inline-flex items-center gap-2 bg-[#1c1b1b] border border-[#2e2e2e] rounded-sm px-4 py-2.5">
          <Shield size={14} className="text-[#ff479c]" />
          <span className="text-[10px] font-bold tracking-widest text-[#a0a0a0] uppercase">Payout Shield</span>
          <span className="text-sm font-bold text-white">80/20 Settlement</span>
        </div>

        {/* Public Vault Identity */}
        <div className="bg-[#1c1b1b] border border-[#2e2e2e] rounded-sm p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-[#ff479c]">🗂</span> Public Vault Identity
            </h2>
            <span className="text-[10px] font-bold tracking-widest text-[#666] uppercase">Public Media Coordinates</span>
          </div>

          {/* Display Name */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-xs font-semibold text-white">Creator Display Name *</label>
              <span className="text-[10px] text-[#666]">Visible to patrons</span>
            </div>
            <div className="relative">
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-[#131313] border border-[#2e2e2e] rounded-sm px-4 py-3 text-sm text-white focus:border-[#ff479c] focus:outline-none pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400">✓</span>
            </div>
            <p className="text-[10px] text-[#666]">Imported from verified social authentication channel.</p>
          </div>

          {/* Handle */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-xs font-semibold text-white">Unique Namespace Handle *</label>
              <span className="text-[10px] text-[#666]">Immutable vanity tag</span>
            </div>
            <div className="flex items-center gap-0">
              <span className="bg-[#2a2a2a] border border-r-0 border-[#2e2e2e] rounded-l-sm px-3 py-3 text-sm text-[#ff479c] font-bold">@</span>
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                className="flex-1 bg-[#131313] border border-[#2e2e2e] rounded-r-sm px-4 py-3 text-sm text-white focus:border-[#ff479c] focus:outline-none"
              />
              <span className="ml-3 text-[10px] font-bold tracking-widest text-green-400 uppercase">Available</span>
            </div>
            <p className="text-[10px] text-[#666]">
              Lowercase alphanumeric & underscores. Custom route:{" "}
              <span className="text-[#a0a0a0]">trydiscreet.com/@{handle}</span>
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-xs font-semibold text-white">Private Vault Teaser & Bio</label>
              <span className="text-[10px] text-[#666]">{bioLength} / 500 max</span>
            </div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 500))}
              rows={3}
              className="w-full bg-[#131313] border border-[#2e2e2e] rounded-sm px-4 py-3 text-sm text-white focus:border-[#ff479c] focus:outline-none resize-none"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white">Creator Profile Classification</label>
            <div className="flex gap-2">
              {(["Female", "Male", "Prefer not to say"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-sm transition-colors ${
                    gender === g
                      ? "bg-[#ff479c] text-white"
                      : "bg-[#2a2a2a] border border-[#3a3a3a] text-[#a0a0a0] hover:text-white"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Payout Identity */}
        <div className="bg-[#1c1b1b] border border-[#2e2e2e] rounded-sm p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-[#ff479c]">🔐</span> Legal Payout Identity & Remittance
            </h2>
            <span className="text-[10px] font-bold tracking-widest text-[#666] uppercase bg-[#131313] border border-[#2e2e2e] px-2 py-1 rounded-sm">
              Zero-Knowledge Encrypted
            </span>
          </div>

          {/* Legal name */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-xs font-semibold text-white">Legal Full Name *</label>
              <span className="text-[10px] text-[#666]">Must match government ID exactly for settlement clearing</span>
            </div>
            <div className="space-y-2">
              <div>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-[#131313] border border-[#2e2e2e] rounded-sm px-4 py-3 text-sm text-white focus:border-[#ff479c] focus:outline-none"
                />
                <span className="text-[10px] text-[#666] mt-1 block">First Name</span>
              </div>
              <div>
                <input
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="w-full bg-[#131313] border border-[#2e2e2e] rounded-sm px-4 py-3 text-sm text-white focus:border-[#ff479c] focus:outline-none"
                />
                <span className="text-[10px] text-[#666] mt-1 block">Middle Name (Optional)</span>
              </div>
              <div>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#131313] border border-[#2e2e2e] rounded-sm px-4 py-3 text-sm text-white focus:border-[#ff479c] focus:outline-none"
                />
                <span className="text-[10px] text-[#666] mt-1 block">Last Name</span>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-xs font-semibold text-white">Mobile Settlement Terminal *</label>
              <span className="text-[10px] font-bold tracking-widest text-[#666] uppercase bg-[#131313] border border-[#2e2e2e] px-2 py-1 rounded-sm">
                MTN MoMo & Airtel Ready
              </span>
            </div>
            <div className="flex gap-2">
              <div className="bg-[#131313] border border-[#2e2e2e] rounded-sm px-3 py-3 text-sm text-white flex items-center gap-1 min-w-fit">
                +256 (Uganda) ▾
              </div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 bg-[#131313] border border-[#2e2e2e] rounded-sm px-4 py-3 text-sm text-white focus:border-[#ff479c] focus:outline-none"
                placeholder="772 123 456"
              />
            </div>
            <p className="text-[10px] text-[#666]">Instant micro-settlements routed in UGX directly upon PPV unlocks.</p>
          </div>

          {/* DOB */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-xs font-semibold text-white">Date of Birth *</label>
              <span className="text-[10px] font-bold tracking-widest text-[#666] uppercase bg-[#131313] border border-[#2e2e2e] px-2 py-1 rounded-sm">
                18+ Mandatory Protocol
              </span>
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 bg-[#131313] border border-[#2e2e2e] rounded-sm px-4 py-3">
                <input
                  value={dob.day}
                  onChange={(e) => setDob((d) => ({ ...d, day: e.target.value }))}
                  className="bg-transparent w-8 text-sm text-white focus:outline-none text-center"
                  maxLength={2}
                  placeholder="DD"
                />
                <span className="text-[#666]">/</span>
                <input
                  value={dob.month}
                  onChange={(e) => setDob((d) => ({ ...d, month: e.target.value }))}
                  className="bg-transparent w-8 text-sm text-white focus:outline-none text-center"
                  maxLength={2}
                  placeholder="MM"
                />
                <span className="text-[#666]">/</span>
                <input
                  value={dob.year}
                  onChange={(e) => setDob((d) => ({ ...d, year: e.target.value }))}
                  className="bg-transparent w-16 text-sm text-white focus:outline-none text-center"
                  maxLength={4}
                  placeholder="YYYY"
                />
                <Calendar size={16} className="ml-auto text-[#666]" />
              </div>
            </div>
            <p className="text-[10px] text-[#666]">Cross-referenced against physical passport / national ID during Step 2.</p>
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
            I certify under penalty of account forfeiture that I am at least{" "}
            <span className="font-bold text-white">18 years of age</span>, formally agree to the{" "}
            <span className="text-[#ff479c] underline cursor-pointer">80/20 Sovereign Creator Settlement Charter</span>, and acknowledge that my
            creator profile and media vault will remain designated as{" "}
            <span className="font-bold text-white">Inactive</span> until biometric and government identity verification is approved in Step 2.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate({ to: "/creator/kyc" })}
          className="w-full bg-[#ff479c] hover:bg-[#e03585] text-[#0d0d0d] font-bold py-4 rounded-sm text-sm tracking-wide transition-colors flex items-center justify-center gap-2"
        >
          Save Profile & Proceed to KYC Verification →
        </button>

        <p className="text-center text-[10px] text-[#666] flex items-center justify-center gap-1">
          <span>⏱</span> Next step: Automatic transition to{" "}
          <span className="text-[#a0a0a0]">/creator/kyc</span> for National ID & Zero-Knowledge Selfie Scan. Payout ledger unlocks immediately upon review.
        </p>
      </div>
    </div>
  );
}

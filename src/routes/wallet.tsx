import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { credits } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

const METHODS = ["MTN Mobile Money", "Airtel Money", "Visa Card"];

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "Wallet & Credits — TryDiscreet" },
      {
        name: "description",
        content: "Top up credits with MTN Mobile Money, Airtel Money or Visa and track every spend.",
      },
      { property: "og:title", content: "Wallet & Credits — TryDiscreet" },
      {
        property: "og:description",
        content: "Top up credits with MTN Mobile Money, Airtel Money or Visa and track every spend.",
      },
    ],
  }),
  component: Wallet,
});

function Wallet() {
  const { balance, transactions, deposit } = useApp();
  const [open, setOpen] = useState(false);
  const [ugx, setUgx] = useState(50000);
  const [method, setMethod] = useState(METHODS[0] as string);

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <div className="card-surface space-y-3 text-center">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Your Credits
        </p>
        <p className="text-4xl font-extrabold text-accent">{credits(balance)}</p>
        <button className="btn-primary" onClick={() => setOpen(true)}>
          Deposit Credits
        </button>
      </div>

      <div className="card-surface space-y-1">
        <h2 className="mb-2 text-sm font-semibold">Transaction history</h2>
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 border-b border-border py-3 last:border-0"
          >
            <span className={t.kind === "deposit" ? "text-success" : "text-error"}>
              {t.kind === "deposit" ? "↑" : "↓"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{t.label}</p>
              <p className="text-xs text-subtle-foreground">{t.date}</p>
            </div>
            <span
              className={`text-sm font-semibold ${
                t.kind === "deposit" ? "text-success" : "text-error"
              }`}
            >
              {t.kind === "deposit" ? "+" : "-"}
              {credits(t.amount)}
            </span>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="card-surface w-full max-w-sm space-y-4">
            <h2 className="text-lg font-bold">Deposit credits</h2>
            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-muted-foreground">Amount (UGX)</span>
              <input
                className="field"
                type="number"
                min={5000}
                step={5000}
                value={ugx}
                onChange={(e) => setUgx(Number(e.target.value))}
              />
            </label>
            <p className="text-sm text-muted-foreground">
              You will receive <span className="font-bold text-accent">{credits(ugx)}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {METHODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`pill ${
                    method === m ? "bg-accent text-white" : "border border-border text-muted-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                className="btn-primary flex-1"
                onClick={() => {
                  deposit(ugx, method);
                  setOpen(false);
                }}
              >
                Confirm & Pay
              </button>
              <button className="btn-ghost" onClick={() => setOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

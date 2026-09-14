import { useApp } from "@/lib/store";
import { credits, type PurchaseKind } from "@/lib/mock-data";
import { KindBadge } from "./brand";

export function LockedMedia({
  id,
  kind,
  price,
  creator,
  gradient,
  aspect = "aspect-square",
  expiryLabel = "Access expires in 28 days",
}: {
  id: string;
  kind: PurchaseKind;
  price: number;
  creator: string;
  gradient: string;
  aspect?: string;
  expiryLabel?: string;
}) {
  const { isUnlocked, unlock, balance } = useApp();
  const open = isUnlocked(id);

  return (
    <div className="space-y-2">
      <div className={`relative overflow-hidden rounded-xl ${aspect}`}>
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{ background: gradient, filter: open ? "none" : "blur(12px)" }}
        />
        {!open && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/55 p-4 text-center">
            <KindBadge kind={kind} />
            <p className="text-lg font-bold text-accent">{credits(price)}</p>
            <button
              className="btn-primary"
              disabled={balance < price}
              onClick={() => unlock({ id, price, creator, kind, gradient })}
            >
              {balance < price ? "Not enough credits" : "Unlock"}
            </button>
          </div>
        )}
        {open && (
          <div className="absolute bottom-2 left-2">
            <span className="pill bg-black/60 text-white">Unlocked</span>
          </div>
        )}
      </div>
      {open && (
        <span className="pill bg-elevated text-muted-foreground">{expiryLabel}</span>
      )}
    </div>
  );
}

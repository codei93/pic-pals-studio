import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  INITIAL_PURCHASES,
  INITIAL_TRANSACTIONS,
  type Purchase,
  type PurchaseKind,
  type Transaction,
} from "./mock-data";

export type KycStatus = "not_submitted" | "under_review" | "verified" | "rejected";
export type UserRole = "fan" | "creator" | null;

type Ctx = {
  isAuthenticated: boolean;
  userRole: UserRole;
  login: () => void;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
  balance: number;
  transactions: Transaction[];
  purchases: Purchase[];
  unlocked: string[];
  following: string[];
  kycStatus: KycStatus;
  setKycStatus: (s: KycStatus) => void;
  isUnlocked: (id: string) => boolean;
  isFollowing: (username: string) => boolean;
  toggleFollow: (username: string) => void;
  hasPurchasedFrom: (username: string) => boolean;
  unlock: (args: {
    id: string;
    price: number;
    creator: string;
    kind: PurchaseKind;
    gradient: string;
  }) => void;
  tip: (creator: string, amount: number) => void;
  deposit: (amount: number, method: string) => void;
};

const AppContext = createContext<Ctx | null>(null);

const today = "14 Sep 2026";

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [balance, setBalance] = useState(45000);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [purchases, setPurchases] = useState<Purchase[]>(INITIAL_PURCHASES);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>(["naomi", "zaraflex"]);
  const [kycStatus, setKycStatus] = useState<KycStatus>("not_submitted");

  const value = useMemo<Ctx>(() => {
    const addTx = (tx: Transaction) => setTransactions((prev) => [tx, ...prev]);

    return {
      isAuthenticated,
      userRole,
      login: () => setIsAuthenticated(true),
      logout: () => { setIsAuthenticated(false); setUserRole(null); },
      setUserRole,
      balance,
      transactions,
      purchases,
      unlocked,
      following,
      kycStatus,
      setKycStatus,
      isUnlocked: (id) => unlocked.includes(id),
      isFollowing: (username) => following.includes(username),
      toggleFollow: (username) =>
        setFollowing((prev) =>
          prev.includes(username) ? prev.filter((u) => u !== username) : [...prev, username],
        ),
      hasPurchasedFrom: (username) =>
        purchases.some((p) => p.creator === username && p.kind !== "Tip"),
      unlock: ({ id, price, creator, kind, gradient }) => {
        if (unlocked.includes(id)) return;
        setUnlocked((prev) => [...prev, id]);
        setBalance((b) => Math.max(0, b - price));
        addTx({
          id: `tx-${Date.now()}`,
          kind: "spend",
          label: `Unlocked ${kind} · @${creator}`,
          amount: price,
          date: today,
        });
        setPurchases((prev) => [
          {
            id: `pu-${Date.now()}`,
            kind,
            creator,
            credits: price,
            date: today,
            expiresInDays: kind === "Phone Number" ? null : 28,
            gradient,
          },
          ...prev,
        ]);
      },
      tip: (creator, amount) => {
        setBalance((b) => Math.max(0, b - amount));
        addTx({
          id: `tx-${Date.now()}`,
          kind: "spend",
          label: `Tip to @${creator}`,
          amount,
          date: today,
        });
      },
      deposit: (amount, method) => {
        setBalance((b) => b + amount);
        addTx({
          id: `tx-${Date.now()}`,
          kind: "deposit",
          label: `Deposit via ${method}`,
          amount,
          date: today,
        });
      },
    };
  }, [balance, transactions, purchases, unlocked, following, kycStatus]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

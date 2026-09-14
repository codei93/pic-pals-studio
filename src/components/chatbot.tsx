import { useState } from "react";
import { LogoMark } from "./brand";

type Msg = { id: number; from: "bot" | "user"; text: string };

const CHIPS = [
  "How do I deposit credits?",
  "How do payouts work?",
  "What is KYC?",
  "How do I unlock content?",
];

const ANSWERS: Record<string, string> = {
  "How do I deposit credits?":
    "Go to your Wallet and tap Deposit Credits. You can pay with MTN Mobile Money, Airtel Money or a Visa card, and credits land instantly.",
  "How do payouts work?":
    "Creator payouts run automatically on the 1st of every month, with a minimum of ₡ 10,000. Your KYC must be verified first.",
  "What is KYC?":
    "KYC is a one-time identity check — an ID or passport plus a selfie. Your account stays fully active without it; only payout requests are blocked.",
  "How do I unlock content?":
    "Tap Unlock on any blurred post. The credits leave your wallet and you get access for 28 days.",
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [hasNew, setHasNew] = useState(true);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      from: "bot",
      text: "Hi 👋 I'm the TryDiscreet assistant. Ask me anything about the platform.",
    },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: "bot",
          text:
            ANSWERS[text] ??
            "Thanks for asking! A support agent will follow up. In the meantime, your Wallet and Earnings pages cover most questions.",
        },
      ]);
    }, 1100);
  };

  if (!open) {
    return (
      <button
        aria-label="Open support assistant"
        onClick={() => {
          setOpen(true);
          setHasNew(false);
        }}
        className="glow-accent fixed right-5 bottom-20 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-white md:bottom-5"
      >
        💬
        {hasNew && (
          <span className="absolute top-1 right-1 h-3 w-3 rounded-full border-2 border-accent bg-error" />
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col border-border bg-surface md:inset-auto md:right-5 md:bottom-5 md:h-[480px] md:w-80 md:rounded-xl md:border">
      <div className="flex items-center gap-2 border-b border-border p-3">
        <LogoMark size={22} />
        <span className="text-sm font-semibold">Support Assistant</span>
        <button
          aria-label="Close assistant"
          className="ml-auto text-muted-foreground hover:text-foreground"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        {messages.map((m) => (
          <div key={m.id} className={m.from === "user" ? "flex justify-end" : "flex gap-2"}>
            {m.from === "bot" && <LogoMark size={20} />}
            <p
              className={`max-w-[85%] px-3 py-2 text-xs leading-relaxed ${
                m.from === "user"
                  ? "rounded-[18px_18px_4px_18px] bg-accent text-white"
                  : "rounded-[18px_18px_18px_4px] bg-elevated text-foreground"
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {CHIPS.map((c) => (
              <button key={c} className="pill tag-pill" onClick={() => send(c)}>
                {c}
              </button>
            ))}
          </div>
        )}

        {typing && (
          <div className="flex items-center gap-1 pl-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-2 w-2 animate-bounce rounded-full bg-accent"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
        )}
      </div>

      <form
        className="space-y-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <div className="flex gap-2">
          <input
            className="field"
            placeholder="Type a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn-primary px-3">
            ➤
          </button>
        </div>
        <input
          className="field text-xs"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>
    </div>
  );
}

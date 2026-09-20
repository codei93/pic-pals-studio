import { Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  CheckCheck,
  ChevronLeft,
  CirclePlus,
  FileText,
  Heart,
  Image as ImageIcon,
  LockKeyhole,
  Mic,
  MoreHorizontal,
  Pencil,
  Search,
  Send,
  ShieldBan,
  ShoppingBag,
} from "lucide-react";
import { Avatar } from "@/components/brand";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message as ChatMessage, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CREATORS, THREADS, credits, type Message, type Thread } from "@/lib/mock-data";
import zariImage from "@/assets/creator-zari.jpg";
import chloeImage from "@/assets/creator-chloe.jpg";
import aminaImage from "@/assets/creator-amina.jpg";
import patriciaImage from "@/assets/creator-patricia.jpg";

type ChatMode = "fan" | "creator";

const PORTRAITS = [zariImage, chloeImage, aminaImage, patriciaImage];
const FAN_NAMES = [
  "@kampala_whale",
  "@silver_patron",
  "@anon_702",
  "@dar_nightfall",
  "@entebbe_muse",
];
const FAN_PREVIEWS = [
  "Tier 2 · Custom escrow proposal",
  "Can you send the exclusive set?",
  "Locked content decrypted",
  "Unlocked 3 midnight teasers",
  "Tip receipt: ₡ 2,000",
];

function peerFor(thread: Thread, mode: ChatMode, index: number) {
  const creator = CREATORS.find((item) => item.username === thread.creator);
  if (mode === "creator") {
    return {
      name: FAN_NAMES[index] ?? `@private_patron_${index + 1}`,
      subtitle: index === 0 ? "VIP Tier 2" : index === 1 ? "VIP Patron" : "Private member",
      image: PORTRAITS[index % PORTRAITS.length] ?? zariImage,
    };
  }
  return {
    name: creator?.displayName ?? thread.creator,
    subtitle: `@${thread.creator}`,
    image: PORTRAITS[index % PORTRAITS.length] ?? zariImage,
  };
}

function ConversationRow({
  thread,
  index,
  active,
  mode,
  onSelect,
}: {
  thread: Thread;
  index: number;
  active: boolean;
  mode: ChatMode;
  onSelect?: () => void;
}) {
  const peer = peerFor(thread, mode, index);
  const content = (
    <>
      <span className="relative shrink-0">
        <img src={peer.image} alt="" className="h-10 w-10 rounded-md object-cover" />
        <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-surface bg-soft-pink" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <strong className="truncate text-sm font-semibold text-foreground">{peer.name}</strong>
          <span className="text-[10px] text-soft-pink">{thread.time}</span>
        </span>
        <span className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="text-soft-pink">{peer.subtitle}</span>
          <span>·</span>
          <span className="truncate">
            {mode === "creator"
              ? FAN_PREVIEWS[index]
              : (thread.messages.at(-1)?.text ?? "Locked media")}
          </span>
        </span>
      </span>
    </>
  );

  const classes = `flex w-full items-center gap-3 border-l-2 px-3 py-4 text-left transition-colors ${
    active ? "border-accent bg-elevated" : "border-transparent hover:bg-elevated/60"
  }`;

  if (mode === "fan") {
    return (
      <Link to="/chat/$threadId" params={{ threadId: thread.id }} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onSelect} className={classes}>
      {content}
    </button>
  );
}

function LockedOffer({ mode }: { mode: ChatMode }) {
  return (
    <div className="ml-auto w-full max-w-[340px] overflow-hidden rounded-md border border-border bg-surface">
      <div
        className="grid h-32 place-items-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(color-mix(in oklab, var(--panel-deep) 48%, transparent), var(--panel-deep)), url(${patriciaImage})`,
        }}
      >
        <div className="text-center">
          <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-accent-light text-soft-pink">
            <LockKeyhole size={15} />
          </span>
          <p className="mt-2 text-sm font-semibold">Midnight Teaser</p>
          <p className="text-[10px] text-muted-foreground">4K Master · 2m 45s</p>
          <Button
            size="sm"
            className="mt-3 h-7 bg-soft-pink px-4 text-[10px] text-panel-deep hover:bg-accent"
          >
            {mode === "fan" ? "Unlock for ₡ 6,500" : "PPV · ₡ 6,500"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ mode }: { mode: ChatMode }) {
  return (
    <div className="ml-auto w-full max-w-[390px] rounded-md border border-accent/35 bg-surface p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-xs font-semibold">
          <ShoppingBag size={14} className="text-soft-pink" /> Custom Escrow Proposal
        </p>
        <span className="bg-accent px-2 py-1 text-[10px] font-bold text-panel-deep">₡ 35,000</span>
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        2-minute personalized birthday video in crimson silk dress (“For Julian”). 24h auto-cancel.
      </p>
      <div className="mt-3 flex gap-2">
        <Button
          size="sm"
          className="h-8 flex-1 bg-soft-pink text-[10px] font-bold uppercase text-panel-deep hover:bg-accent"
        >
          {mode === "fan" ? "Accept order" : "Awaiting patron"}
        </Button>
        <Button size="sm" variant="secondary" className="h-8 text-[10px]">
          Decline
        </Button>
      </div>
    </div>
  );
}

function DetailsRail({
  mode,
  peerName,
  peerImage,
}: {
  mode: ChatMode;
  peerName: string;
  peerImage: string;
}) {
  return (
    <aside className="hidden w-[270px] shrink-0 border-l border-border bg-panel-deep p-4 xl:block">
      <div className="rounded-md border border-border bg-surface p-4 text-center">
        <img
          src={peerImage}
          alt=""
          className="mx-auto h-16 w-16 rounded-lg border border-accent/40 object-cover"
        />
        <p className="mt-3 text-sm font-semibold">{peerName}</p>
        <p className="mt-1 text-[10px] text-soft-pink">
          {mode === "creator" ? "Tier 2 VIP Patron · Jan 2026" : "Verified creator · Kampala"}
        </p>
        <div className="mt-5 grid grid-cols-2 border-t border-border pt-4 text-left">
          <div>
            <p className="text-[9px] uppercase text-muted-foreground">Total spent</p>
            <p className="mt-1 text-xs font-semibold text-soft-pink">₡ 94,500</p>
          </div>
          <div>
            <p className="text-[9px] uppercase text-muted-foreground">PPV unlocks</p>
            <p className="mt-1 text-xs font-semibold">14 Items</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md border border-border bg-surface p-4">
        <div className="flex items-center justify-between text-[9px] uppercase text-muted-foreground">
          <span>{mode === "creator" ? "Net earnings (80%)" : "Creator earnings"}</span>
          <strong className="text-soft-pink">₡ 75,600</strong>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-elevated">
          <div className="h-full w-[72%] rounded-full bg-soft-pink" />
        </div>
      </div>

      <div className="mt-4 rounded-md border border-border bg-surface p-3">
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-semibold uppercase text-muted-foreground">Recent unlocks</p>
          <button className="text-[9px] text-soft-pink">View all</button>
        </div>
        {["Midnight Solitude", "Afterhours Reel"].map((title, index) => (
          <div key={title} className="mt-3 flex items-center gap-2 border-t border-border pt-3">
            <img
              src={PORTRAITS[index + 1] ?? zariImage}
              alt=""
              className="h-9 w-9 rounded-sm object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px]">{title}</p>
              <p className="text-[9px] text-muted-foreground">
                {index ? "6d ago · ₡ 8,500" : "3d ago · ₡ 12,000"}
              </p>
            </div>
            <LockKeyhole size={11} className="text-soft-pink" />
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-md border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-semibold uppercase text-muted-foreground">Private note</p>
          <Pencil size={11} className="text-soft-pink" />
        </div>
        <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
          Prefers red silk outfits, frequent tipper. Discretion is top priority for Kampala
          residence events.
        </p>
      </div>
      <button className="mt-auto flex w-full items-center justify-center gap-2 pt-10 text-[10px] text-muted-foreground hover:text-error">
        <ShieldBan size={12} /> Restrict {mode === "creator" ? "Patron" : "Creator"}
      </button>
    </aside>
  );
}

export function ChatWorkspace({
  mode,
  initialThreadId = "th1",
}: {
  mode: ChatMode;
  initialThreadId?: string;
}) {
  const [activeId, setActiveId] = useState(initialThreadId);
  const [filter, setFilter] = useState<"all" | "vip" | "orders">("all");
  const [query, setQuery] = useState("");
  const [threadMessages, setThreadMessages] = useState<Record<string, Message[]>>(() =>
    Object.fromEntries(THREADS.map((thread) => [thread.id, thread.messages])),
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const activeThread = THREADS.find((thread) => thread.id === activeId) ?? THREADS[0];
  const activeIndex = Math.max(
    0,
    THREADS.findIndex((thread) => thread.id === activeThread?.id),
  );
  const peer = activeThread ? peerFor(activeThread, mode, activeIndex) : null;
  const currentSender = mode === "creator" ? "creator" : "fan";
  const visibleThreads = useMemo(() => {
    const term = query.trim().toLowerCase();
    return THREADS.filter((thread, index) => {
      const person = peerFor(thread, mode, index);
      const matchesQuery =
        !term || `${person.name} ${person.subtitle}`.toLowerCase().includes(term);
      const matchesFilter = filter === "all" || (filter === "vip" ? index < 2 : index === 0);
      return matchesQuery && matchesFilter;
    });
  }, [filter, mode, query]);

  if (!activeThread || !peer) return null;
  const messages = threadMessages[activeThread.id] ?? activeThread.messages;

  return (
    <section className="mx-auto flex h-[calc(100dvh-4rem)] min-h-[640px] max-w-[1440px] overflow-hidden border-x border-border bg-panel-deep">
      <aside className="hidden w-[290px] shrink-0 border-r border-border bg-panel-deep lg:flex lg:flex-col">
        <div className="border-b border-border p-4">
          <label className="flex h-9 items-center gap-2 rounded-md border border-border bg-surface px-3 text-muted-foreground">
            <Search size={14} />
            <span className="sr-only">Search conversations</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search conversations..."
              className="min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-subtle-foreground"
            />
          </label>
          <div className="mt-2 grid grid-cols-3 bg-surface p-1">
            {(["all", "vip", "orders"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`py-1.5 text-[9px] font-semibold uppercase ${filter === item ? "bg-elevated text-soft-pink" : "text-muted-foreground"}`}
              >
                {item === "vip" ? "VIPs" : item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {visibleThreads.map((thread) => {
            const index = THREADS.indexOf(thread);
            return (
              <ConversationRow
                key={thread.id}
                thread={thread}
                index={index}
                active={thread.id === activeThread.id}
                mode={mode}
                onSelect={() => setActiveId(thread.id)}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-[9px] text-muted-foreground">
          <span>⊙ Key #88F4-992A</span>
          <span className="text-soft-pink">Auto-Clear: On</span>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-background">
        <div className="flex h-[70px] shrink-0 items-center gap-3 border-b border-border px-4">
          <Link to="/chat" className="lg:hidden" aria-label="Back to conversations">
            <ChevronLeft size={20} />
          </Link>
          <img src={peer.image} alt="" className="h-11 w-11 rounded-md object-cover" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold">{peer.name}</p>
              <span className="bg-accent-light px-1.5 py-0.5 text-[8px] font-bold text-soft-pink">
                VIP TIER 2
              </span>
            </div>
            <p className="mt-1 text-[10px] text-soft-pink">
              ● Active now <span className="text-muted-foreground">· Total Spent: ₡ 42,000</span>
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-muted-foreground">
            <Button variant="ghost" size="icon-sm" aria-label="Lock conversation">
              <LockKeyhole />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Conversation files">
              <FileText />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="More options">
              <MoreHorizontal />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-border px-4 py-2 text-[9px] uppercase text-muted-foreground">
          <span className="flex items-center gap-2 text-foreground">
            <span className="h-2 w-2 rounded-full bg-soft-pink" /> Discreet encrypted channel
          </span>
          <span className="hidden sm:inline">
            End-to-End Encrypted · <span className="text-soft-pink">3 Active Inquiries</span>
          </span>
        </div>

        <Conversation className="min-h-0">
          <ConversationContent className="mx-auto w-full max-w-2xl gap-4 px-4 py-6">
            <p className="text-center text-[9px] uppercase text-subtle-foreground">Today</p>
            {messages.map((message) => {
              const own = message.from === currentSender;
              return (
                <ChatMessage
                  key={message.id}
                  from={own ? "user" : "assistant"}
                  className="max-w-[84%] gap-1"
                >
                  {message.ppv ? (
                    <LockedOffer mode={mode} />
                  ) : (
                    <MessageContent
                      className={
                        own
                          ? "rounded-md border border-accent/25 bg-elevated px-4 py-3 text-xs leading-5"
                          : "rounded-md bg-elevated px-4 py-3 text-xs leading-5"
                      }
                    >
                      {message.text}
                    </MessageContent>
                  )}
                  <span
                    className={`text-[9px] text-muted-foreground ${own ? "text-right" : "text-left"}`}
                  >
                    {message.time} {own && <CheckCheck className="inline size-3 text-soft-pink" />}
                  </span>
                </ChatMessage>
              );
            })}

            {activeThread.id === "th1" && (
              <>
                <div className="ml-auto flex w-full max-w-[390px] items-center gap-3 rounded-md border border-accent/25 bg-surface px-4 py-3 text-xs">
                  <Heart size={16} className="text-soft-pink" />
                  <strong>{peer.name}</strong>
                  <span className="text-muted-foreground">
                    sent a <strong className="text-soft-pink">₡ 5,000</strong> tip
                  </span>
                  <span className="ml-auto text-[10px] text-muted-foreground">
                    Loving the premiere!
                  </span>
                </div>
                <div className="ml-auto flex w-full max-w-[300px] items-center gap-3 bg-elevated px-4 py-3">
                  <Button size="icon-sm" className="rounded-full bg-soft-pink text-panel-deep">
                    <Send className="rotate-180" />
                  </Button>
                  <div className="h-5 flex-1 bg-[repeating-linear-gradient(90deg,var(--soft-pink)_0_1px,transparent_1px_4px)] opacity-70" />
                  <span className="text-[9px] text-muted-foreground">0:48</span>
                </div>
                <OrderCard mode={mode} />
              </>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="shrink-0 border-t border-border bg-panel-deep p-3">
          <TooltipProvider>
            <PromptInput
              className="border-border bg-surface"
              onSubmit={({ text }) => {
                const next = text.trim();
                if (!next) return;
                setThreadMessages((current) => ({
                  ...current,
                  [activeThread.id]: [
                    ...(current[activeThread.id] ?? []),
                    { id: `m-${Date.now()}`, from: currentSender, text: next, time: "now" },
                  ],
                }));
                requestAnimationFrame(() => inputRef.current?.focus());
              }}
            >
              <PromptInputTextarea
                ref={inputRef}
                autoFocus
                placeholder="Type encrypted reply..."
                className="min-h-12 text-xs"
              />
              <PromptInputFooter>
                <PromptInputTools>
                  <PromptInputButton tooltip="Add attachment">
                    <CirclePlus />
                  </PromptInputButton>
                  <PromptInputButton tooltip="Record voice note">
                    <Mic />
                  </PromptInputButton>
                  <PromptInputButton tooltip="Add locked media">
                    <ImageIcon />
                  </PromptInputButton>
                </PromptInputTools>
                <PromptInputSubmit className="bg-soft-pink text-panel-deep hover:bg-accent">
                  <Send />
                </PromptInputSubmit>
              </PromptInputFooter>
            </PromptInput>
          </TooltipProvider>
        </div>
      </div>

      <DetailsRail mode={mode} peerName={peer.name} peerImage={peer.image} />
    </section>
  );
}

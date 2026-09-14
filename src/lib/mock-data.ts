export const ALL_TAGS = [
  "Curvy",
  "Athletic",
  "Petite",
  "Brunette",
  "Blonde",
  "Redhead",
  "Tattooed",
  "Pierced",
  "Fitness",
  "Natural",
];

export type PostType = "free" | "ppv_photo" | "ppv_video";

export type Post = {
  id: string;
  type: PostType;
  caption: string;
  price: number;
  likes: number;
  postedAgo: string;
  gradient: string;
};

export type Story = {
  id: string;
  price: number;
  expiresIn: string;
  expired: boolean;
  gradient: string;
};

export type Creator = {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  followers: number;
  tags: string[];
  featured: boolean;
  gradient: string;
  socials: { instagram?: string; twitter?: string; tiktok?: string };
  phone: { masked: string; real: string; price: number };
  posts: Post[];
  stories: Story[];
};

const gradients = [
  "linear-gradient(150deg,#3b1029,#e91e8c33,#131313)",
  "linear-gradient(150deg,#1b1035,#a855f733,#131313)",
  "linear-gradient(150deg,#2c1010,#f59e0b33,#131313)",
  "linear-gradient(150deg,#101f2c,#3b82f633,#131313)",
  "linear-gradient(150deg,#10241a,#22c55e33,#131313)",
  "linear-gradient(150deg,#2a1030,#e91e8c44,#131313)",
];

const g = (i: number): string => gradients[((i % gradients.length) + gradients.length) % gradients.length] as string;

function makePosts(seed: number): Post[] {
  return [
    {
      id: `p${seed}1`,
      type: "free",
      caption: "Behind the scenes from today's shoot 💕",
      price: 0,
      likes: 320 + seed * 11,
      postedAgo: "2h ago",
      gradient: g(seed % 6),
    },
    {
      id: `p${seed}2`,
      type: "ppv_photo",
      caption: "New photo set — 12 exclusive shots",
      price: 5000,
      likes: 210 + seed * 7,
      postedAgo: "6h ago",
      gradient: g((seed + 1) % 6),
    },
    {
      id: `p${seed}3`,
      type: "ppv_video",
      caption: "8 minute video, just for you",
      price: 12000,
      likes: 180 + seed * 5,
      postedAgo: "1d ago",
      gradient: g((seed + 2) % 6),
    },
    {
      id: `p${seed}4`,
      type: "free",
      caption: "Good morning Kampala ☀️",
      price: 0,
      likes: 145 + seed * 3,
      postedAgo: "2d ago",
      gradient: g((seed + 3) % 6),
    },
  ];
}

function makeStories(seed: number): Story[] {
  return [
    {
      id: `s${seed}1`,
      price: 2000,
      expiresIn: "4h 30m",
      expired: false,
      gradient: g(seed % 6),
    },
    {
      id: `s${seed}2`,
      price: 1500,
      expiresIn: "12h 05m",
      expired: false,
      gradient: g((seed + 2) % 6),
    },
    {
      id: `s${seed}3`,
      price: 1500,
      expiresIn: "0m",
      expired: true,
      gradient: g((seed + 4) % 6),
    },
  ];
}

export const CREATORS: Creator[] = [
  {
    id: "c1",
    username: "naomi",
    displayName: "Naomi K",
    bio: "Kampala based. Daily posts, custom requests open. Say hi before you buy 💕",
    followers: 12400,
    tags: ["Curvy", "Brunette", "Tattooed"],
    featured: true,
    gradient: g(0),
    socials: { instagram: "naomi.k", twitter: "naomik", tiktok: "naomi.k" },
    phone: { masked: "+256 *** *** ***", real: "+256 772 481 220", price: 15000 },
    posts: makePosts(1),
    stories: makeStories(1),
  },
  {
    id: "c2",
    username: "zaraflex",
    displayName: "Zara Flex",
    bio: "Fitness first. Gym content, private sets, and video calls by request.",
    followers: 8700,
    tags: ["Athletic", "Fitness", "Natural"],
    featured: true,
    gradient: g(1),
    socials: { instagram: "zara.flex", twitter: "zaraflex" },
    phone: { masked: "+256 *** *** ***", real: "+256 704 118 903", price: 12000 },
    posts: makePosts(2),
    stories: makeStories(2),
  },
  {
    id: "c3",
    username: "amberlee",
    displayName: "Amber Lee",
    bio: "Petite, playful, very online. Stories drop every evening.",
    followers: 5300,
    tags: ["Petite", "Blonde", "Pierced"],
    featured: false,
    gradient: g(2),
    socials: { instagram: "amber.lee" },
    phone: { masked: "+256 *** *** ***", real: "+256 758 220 114", price: 10000 },
    posts: makePosts(3),
    stories: makeStories(3),
  },
  {
    id: "c4",
    username: "sashared",
    displayName: "Sasha Red",
    bio: "Redhead with a soft spot for long chats and long videos.",
    followers: 9100,
    tags: ["Redhead", "Curvy", "Natural"],
    featured: false,
    gradient: g(3),
    socials: { twitter: "sasha_red", tiktok: "sasha.red" },
    phone: { masked: "+256 *** *** ***", real: "+256 787 664 331", price: 14000 },
    posts: makePosts(4),
    stories: makeStories(4),
  },
  {
    id: "c5",
    username: "inkedivy",
    displayName: "Inked Ivy",
    bio: "Full sleeves, full sets. Custom requests take 24h.",
    followers: 15800,
    tags: ["Tattooed", "Pierced", "Athletic"],
    featured: true,
    gradient: g(4),
    socials: { instagram: "inked.ivy", twitter: "inkedivy" },
    phone: { masked: "+256 *** *** ***", real: "+256 701 993 570", price: 18000 },
    posts: makePosts(5),
    stories: makeStories(5),
  },
  {
    id: "c6",
    username: "mellowmimi",
    displayName: "Mellow Mimi",
    bio: "Soft, natural, no filters. Blonde and very chatty.",
    followers: 4200,
    tags: ["Blonde", "Natural", "Petite"],
    featured: false,
    gradient: g(5),
    socials: { instagram: "mellow.mimi" },
    phone: { masked: "+256 *** *** ***", real: "+256 776 302 448", price: 9000 },
    posts: makePosts(6),
    stories: makeStories(6),
  },
];

export const getCreator = (username: string) =>
  CREATORS.find((c) => c.username === username);

export type Transaction = {
  id: string;
  kind: "deposit" | "spend";
  label: string;
  amount: number;
  date: string;
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "t1", kind: "deposit", label: "Deposit via MTN Money", amount: 50000, date: "12 Sep 2026" },
  { id: "t2", kind: "spend", label: "Unlocked PPV Photo · @naomi", amount: 5000, date: "12 Sep 2026" },
  { id: "t3", kind: "spend", label: "Tip to @zaraflex", amount: 1000, date: "11 Sep 2026" },
  { id: "t4", kind: "deposit", label: "Deposit via Airtel Money", amount: 20000, date: "8 Sep 2026" },
  { id: "t5", kind: "spend", label: "Revealed Phone Number · @inkedivy", amount: 18000, date: "7 Sep 2026" },
  { id: "t6", kind: "spend", label: "Unlocked Story · @amberlee", amount: 1500, date: "5 Sep 2026" },
];

export type PurchaseKind =
  | "PPV Photo"
  | "PPV Video"
  | "Story"
  | "Tip"
  | "Phone Number"
  | "Custom Request";

export type Purchase = {
  id: string;
  kind: PurchaseKind;
  creator: string;
  credits: number;
  date: string;
  expiresInDays: number | null;
  gradient: string;
};

export const INITIAL_PURCHASES: Purchase[] = [
  { id: "u1", kind: "PPV Photo", creator: "naomi", credits: 5000, date: "12 Sep 2026", expiresInDays: 28, gradient: g(0) },
  { id: "u2", kind: "PPV Video", creator: "zaraflex", credits: 12000, date: "10 Sep 2026", expiresInDays: 26, gradient: g(1) },
  { id: "u3", kind: "Phone Number", creator: "inkedivy", credits: 18000, date: "7 Sep 2026", expiresInDays: null, gradient: g(4) },
  { id: "u4", kind: "Custom Request", creator: "sashared", credits: 25000, date: "3 Sep 2026", expiresInDays: 19, gradient: g(3) },
  { id: "u5", kind: "Story", creator: "amberlee", credits: 1500, date: "20 Aug 2026", expiresInDays: 0, gradient: g(2) },
];

export type Message = {
  id: string;
  from: "fan" | "creator";
  text?: string;
  ppv?: { price: number; gradient: string };
  time: string;
};

export type Thread = {
  id: string;
  creator: string;
  unread: boolean;
  time: string;
  messages: Message[];
};

export const THREADS: Thread[] = [
  {
    id: "th1",
    creator: "naomi",
    unread: true,
    time: "09:42",
    messages: [
      { id: "m1", from: "creator", text: "Hey you 👋 thanks for unlocking my set!", time: "09:31" },
      { id: "m2", from: "fan", text: "Loved it. Anything new coming today?", time: "09:35" },
      { id: "m3", from: "creator", text: "Just finished a private video. Want a peek?", time: "09:40" },
      { id: "m4", from: "creator", ppv: { price: 8000, gradient: g(0) }, time: "09:42" },
    ],
  },
  {
    id: "th2",
    creator: "zaraflex",
    unread: false,
    time: "Yesterday",
    messages: [
      { id: "m1", from: "fan", text: "That gym set was unreal 🔥", time: "18:02" },
      { id: "m2", from: "creator", text: "Haha thank you! Leg day tomorrow, stay tuned.", time: "18:20" },
    ],
  },
  {
    id: "th3",
    creator: "inkedivy",
    unread: true,
    time: "Mon",
    messages: [
      { id: "m1", from: "creator", text: "Your custom request is ready ✨", time: "11:10" },
      { id: "m2", from: "creator", ppv: { price: 15000, gradient: g(4) }, time: "11:11" },
    ],
  },
];

export const EARNINGS_BREAKDOWN = [
  { label: "PPV Photo", value: 320000 },
  { label: "PPV Video", value: 260000 },
  { label: "Tips", value: 145000 },
  { label: "Custom Requests", value: 98000 },
  { label: "Phone Number", value: 62000 },
  { label: "Stories", value: 41000 },
];

export const PAYOUT_HISTORY = [
  { month: "August 2026", credits: 240000, number: "+256 772 *** 220", provider: "MTN", status: "Processed" },
  { month: "July 2026", credits: 186000, number: "+256 772 *** 220", provider: "MTN", status: "Processed" },
  { month: "June 2026", credits: 92000, number: "+256 704 *** 903", provider: "Airtel", status: "Failed" },
  { month: "September 2026", credits: 12500, number: "+256 772 *** 220", provider: "MTN", status: "Processing" },
];

export const RECENT_SALES = [
  { fan: "Brian M", kind: "PPV Video" as PurchaseKind, credits: 9600, date: "14 Sep 2026" },
  { fan: "Kevin O", kind: "PPV Photo" as PurchaseKind, credits: 4000, date: "14 Sep 2026" },
  { fan: "Anon Fan", kind: "Tip" as PurchaseKind, credits: 800, date: "13 Sep 2026" },
  { fan: "Derrick A", kind: "Phone Number" as PurchaseKind, credits: 14400, date: "12 Sep 2026" },
  { fan: "Sam T", kind: "Custom Request" as PurchaseKind, credits: 20000, date: "11 Sep 2026" },
];

export const credits = (n: number) => `₡ ${n.toLocaleString("en-US")}`;

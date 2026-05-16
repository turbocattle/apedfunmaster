const CREATOR_ADDRESSES = [
  '7xKX...q9Fp',
  'Dv4L...mN3e',
  'Bs9R...vK2j',
  '3pWx...dF8h',
  'Kn5Y...aR7m',
  'Qe2T...sL4c',
  'Hj8U...wP6b',
  'Zt1V...gX9a',
];

const HOLDER_ADDRESSES = [
  '5rTx...mK2p', 'Av3N...qL8s', 'Wp7Y...dR4f', 'Jn9X...hG6t',
  'Bk2M...vE5w', 'Lq4P...cU7n', 'Fs8D...bA3j', 'Hy1Z...eW9k',
  'Gt6R...xI2m', 'Uc5V...oJ4h', 'Nw3Q...lF7d', 'Om9S...rB1g',
  'Dx7K...iT6e', 'Pj2W...uY8a', 'Ci4L...sN3v',
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(randomBetween(min, max));
}

function timeAgo(hours) {
  const d = new Date();
  d.setHours(d.getHours() - hours);
  return d.toISOString();
}

function generateHolders(tokenTicker) {
  const count = randomInt(5, 12);
  const holders = [];
  let remaining = 100;
  for (let i = 0; i < count; i++) {
    const pct = i === count - 1
      ? remaining
      : Math.min(remaining - (count - i - 1) * 0.1, randomBetween(remaining * 0.1, remaining * 0.5));
    const rounded = Math.round(pct * 10) / 10;
    remaining -= rounded;
    holders.push({
      rank: i + 1,
      address: HOLDER_ADDRESSES[i % HOLDER_ADDRESSES.length],
      amount: randomInt(1000, 50000000).toLocaleString(),
      percentage: Math.max(0.1, rounded),
    });
  }
  return holders;
}

function generateComments(tokenId) {
  const texts = [
    'LFG! This one is going to the moon',
    'Just aped in 5 SOL, see you at Raydium',
    'bonding curve looking healthy ngl',
    'dev is based, been following since day 1',
    'chart looks like a staircase to heaven',
    'who else is not selling until graduation?',
    'added more on this dip, ez money',
    'this is the one. trust the process.',
    'imagine not buying this rn lmao',
    'wen raydium? need that liquidity',
    'just told my entire discord to ape',
    'the ticker alone is worth 10x',
    'dev doxxed? or we just yolo',
    'sold my other bags for this',
    'this community is actually insane',
  ];
  const count = randomInt(3, 8);
  return Array.from({ length: count }, (_, i) => ({
    id: `${tokenId}-comment-${i}`,
    author: HOLDER_ADDRESSES[randomInt(0, HOLDER_ADDRESSES.length)],
    text: texts[randomInt(0, texts.length)],
    timestamp: timeAgo(randomInt(0, 48)),
  }));
}

function generateTrades(tokenTicker, price) {
  const count = randomInt(8, 15);
  return Array.from({ length: count }, (_, i) => {
    const isBuy = Math.random() > 0.4;
    const solAmount = randomBetween(0.1, 25);
    const tokenAmount = solAmount / price;
    return {
      id: `trade-${i}`,
      type: isBuy ? 'buy' : 'sell',
      solAmount: solAmount.toFixed(2),
      tokenAmount: Math.floor(tokenAmount).toLocaleString(),
      price: price.toFixed(8),
      wallet: HOLDER_ADDRESSES[randomInt(0, HOLDER_ADDRESSES.length)],
      timestamp: timeAgo(randomBetween(0, 24)),
    };
  });
}

// dogwifhat meme image used as placeholder for all tokens
const WIF_IMG = 'https://assets.coingecko.com/coins/images/33566/standard/dogwifhat.jpg';

const WIF_CA = 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm';

const TOKEN_DEFS = [
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'The OG ape token. No roadmap, no promises, just vibes.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'A dog with a hat. That\'s it. That\'s the token.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'The rarest Pepe on Solana. Feels good man.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'BONK but make it v2. Community driven memecoin.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'Schrodinger\'s memecoin - simultaneously mooning and rugging.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'Like SHIB but faster and cheaper. Still a dog.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'Fuel your portfolio with pure degen energy.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'For the bois who never sell. Diamond hands only.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'The most based token on Solana. Chad energy only.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'Wen lambo? Soon ser. Very soon.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'By degens, for degens. Ape together strong.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'Anti-jeet technology built into every transaction.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'Tiny cat, massive gains. Purring all the way to ATH.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'Delivering gains to good degens worldwide.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'Small now but breathing fire soon. Legendary token.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'The supreme ruler of Solana memecoins.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'Escape the matrix. Ape into freedom.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'Like the Bitcoin pizza but on Solana. Tasty gains.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'The people\'s token. By the community, for the community.' },
  { name: 'dogwifhat', ticker: 'WIF', image: WIF_IMG, desc: 'Built different. No VCs, no presale, pure degen.' },
];

export const mockTokens = TOKEN_DEFS.map((def, index) => {
  return {
    id: `token-${index}`,
    name: def.name,
    ticker: def.ticker,
    image: def.image,
    description: def.desc,
    creator: WIF_CA,
    createdAt: new Date().toISOString(),
    marketCap: 0,
    price: 0,
    volume24h: 0,
    holders: 0,
    bondingCurveProgress: 0,
    liquidityLocked: 0,
    graduationThreshold: 285,
    totalSupply: 1_000_000_000,
    communityFeesDistributed: 0,
    comments: [],
    topHolders: [],
    recentTrades: [],
    twitter: null,
    telegram: null,
    website: null,
  };
});

export const mockUserProfile = {
  address: '7xKX...q9Fp',
  joinDate: new Date().toISOString(),
  totalTokensCreated: 0,
  totalTrades: 0,
  createdTokens: [],
  holdings: [],
  activity: [],
};

export const airdropHistory = [];

export function getTokenById(id) {
  return mockTokens.find(t => t.id === id);
}

export function formatMarketCap(val) {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(2)}M`;
  if (val >= 1_000) return `$${(val / 1_000).toFixed(1)}K`;
  return `$${val.toFixed(0)}`;
}

export function formatPrice(val) {
  if (val < 0.0001) return `$${val.toExponential(2)}`;
  return `$${val.toFixed(6)}`;
}

export function formatVolume(val) {
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(2)}M`;
  if (val >= 1_000) return `${(val / 1_000).toFixed(1)}K`;
  return val.toFixed(0);
}

export function formatAge(isoDate) {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

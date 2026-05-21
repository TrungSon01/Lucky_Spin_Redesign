export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  category: "rounds" | "streak" | "rank" | "tier" | "purchase"; // type of achievement
  target: number | string; // target value (e.g., 10 rounds, 20 streak, rank >= 50)
  condition: (
    streak: number,
    rounds: number,
    rank: number,
    purchase: number,
  ) => boolean;
  storageKey: string; // key to track if unlocked
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_spin",
    title: "First Spin",
    description: "Play your first Lucky Spin round.",
    icon: "Play",
    category: "rounds",
    target: 1,
    condition: (_streak, rounds, _rank, _purchase) => rounds >= 1,
    storageKey: "achievement_first_spin",
  },

  {
    id: "first_streak",
    title: "First Streak",
    description: "Reach a 3-day winning streak.",
    icon: "TrendingUp",
    category: "streak",
    target: 1,

    condition: (streak, _rounds, _rank, _purchase) => streak >= 1,
    storageKey: "achievement_first_streak",
  },
  {
    id: "Buy first product",
    title: "First Purchase",
    description: "Buy your first product from the shop",
    icon: "ShoppingCart",
    category: "purchase",
    target: 1,
    condition: (_streak, _rounds, _rank, purchase) => purchase >= 1,
    storageKey: "achievement_first_purchase",
  },
  {
    id: "Buy 10 products",
    title: "Top Collector",
    description: "Buy 10 products from the shop",
    icon: "ShoppingCart",
    category: "purchase",
    target: 10,
    condition: (_streak, _rounds, _rank, purchase) => purchase >= 10,
    storageKey: "achievement_first_purchase",
  },

  {
    id: "highest_streak",
    title: "Longest Streak",
    description: "Reach a winning streak of 30 or more.",
    icon: "Fire",
    category: "streak",
    target: 30,
    condition: (streak, _rounds, _rank, _purchase) => streak >= 30,
    storageKey: "achievement_highest_streak",
  },
  {
    id: "highest_rank_count",
    title: "Top Rank Climber",
    description: "Reach a rank count of 50 or higher.",
    icon: "TrendingUp",
    category: "rank",
    target: 50,
    condition: (_streak, _rounds, rank, _purchase) => rank >= 50,
    storageKey: "achievement_high_rank_count",
  },
  {
    id: "Buy 50 products",
    title: "Whale King",
    description: "Buy 50 products from the shop",
    icon: "ShoppingCart",
    category: "purchase",
    target: 50,
    condition: (_streak, _rounds, _rank, purchase) => purchase >= 50,
    storageKey: "achievement_first_purchase",
  },
  {
    id: "rounds_100",
    title: "100 Rounds Played",
    description: "Complete 100 Lucky Spin rounds",
    icon: "Play",
    category: "rounds",
    target: 100,

    condition: (_streak, rounds, _rank, _purchase) => rounds >= 100,
    storageKey: "achievement_rounds_100",
  },
  {
    id: "streak_100",
    title: "Streak of 100",
    description: "Reach a 100-day winning streak.",
    icon: "TrendingUp",
    category: "streak",
    target: 100,

    condition: (streak, _rounds, _rank, _purchase) => streak >= 100,
    storageKey: "achievement_streak",
  },
  {
    id: "highest_tier",
    title: "Ultimate Diamond",
    description: "Reach the highest tier",
    icon: "Award",
    category: "tier",
    target: "Ultimate Diamond",
    condition: (_streak, _rounds, rank, _purchase) => rank > 100,
    storageKey: "achievement_highest_rank",
  },
];

export const ACHIEVEMENT_NEW_FLAG_PREFIX = "achievement_new_";

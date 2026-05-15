export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  category: "rounds" | "streak" | "rank" | "tier";
  target: number | string; // target value (e.g., 10 rounds, 20 streak, rank >= 50)
  condition: (
    streak: number,
    rounds: number,
    rank: number,
    purchase?: number,
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
    condition: (_streak, rounds) => rounds >= 1,
    storageKey: "achievement_first_spin",
  },
  {
    id: "rounds_100",
    title: "100 Rounds Played",
    description: "Complete 100 Lucky Spin rounds",
    icon: "Play",
    category: "rounds",
    target: 100,

    condition: (_streak, rounds) => rounds >= 100,
    storageKey: "achievement_rounds_100",
  },

  {
    id: "first_streak",
    title: "First Streak",
    description: "Reach a 3-day winning streak.",
    icon: "TrendingUp",
    category: "streak",
    target: 1,

    condition: (streak) => streak >= 3,
    storageKey: "achievement_first_streak",
  },
  {
    id: "streak_100",
    title: "Streak of 100",
    description: "Reach a 100-day winning streak.",
    icon: "TrendingUp",
    category: "streak",
    target: 100,

    condition: (streak) => streak >= 10,
    storageKey: "achievement_streak_10",
  },

  {
    id: "highest_tier",
    title: "Ultimate Diamond",
    description: "Reach the highest tier",
    icon: "Award",
    category: "tier",
    target: "Ultimate Diamond",
    condition: (_streak, _rounds, rank) => rank > 100,
    storageKey: "achievement_highest_tier",
  },
  {
    id: "highest_rank_count",
    title: "Top Rank Climber",
    description: "Reach a rank count of 50 or higher.",
    icon: "TrendingUp",
    category: "rank",
    target: 50,
    condition: (_streak, _rounds, rank) => rank >= 50,
    storageKey: "achievement_highest_rank_count",
  },
  {
    id: "highest_streak",
    title: "Longest Streak",
    description: "Reach a winning streak of 20 or more.",
    icon: "Fire",
    category: "streak",
    target: 20,
    condition: (streak) => streak >= 20,
    storageKey: "achievement_highest_streak",
  },
  {
    id: "Buy first product",
    title: "First Purchase",
    description: "Buy your first product from the shop",
    icon: "ShoppingCart",
    category: "rounds",
    target: 1,
    condition: (_streak, rounds) => rounds >= 1,
    storageKey: "achievement_first_purchase",
  },
];

export const ACHIEVEMENT_NEW_FLAG_PREFIX = "achievement_new_";

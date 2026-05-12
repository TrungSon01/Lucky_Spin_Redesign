import { getTierByRank } from "../../../lib/function";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  condition?: (streak: number, rounds: number, rank: number) => boolean;
  storageKey: string; // key to track if unlocked
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_spin",
    title: "First Spin",
    description: "Play your first round of Lucky Spin Get Bronze Tier",
    icon: "Play",
    condition: (_streak, rounds) => rounds >= 1,
    storageKey: "achievement_first_spin",
  },
  {
    id: "rounds_10",
    title: "10 Rounds Played",
    description: "Play 10 rounds of Lucky Spin Get Silver Tier",
    icon: "Play",
    condition: (_streak, rounds) => rounds >= 10,
    storageKey: "achievement_rounds_10",
  },
  {
    id: "rounds_20",
    title: "20 Rounds Played",
    description: "Play 20 rounds of Lucky Spin get Gold Tier",
    icon: "Play",
    condition: (_streak, rounds) => rounds >= 50,
    storageKey: "achievement_rounds_50",
  },
  {
    id: "rounds_50",
    title: "50 Rounds Played",
    description: "Play 50 rounds of Lucky Spin get Ruby Tier",
    icon: "Play",
    condition: (_streak, rounds) => rounds >= 50,
    storageKey: "achievement_rounds_50",
  },
  {
    id: "rounds_100",
    title: "100 Rounds Played",
    description: "Play 100 rounds of Lucky Spin get Diamond Tier",
    icon: "Play",
    condition: (_streak, rounds) => rounds >= 100,
    storageKey: "achievement_rounds_100",
  },
  {
    id: "rounds_200",
    title: "200 Rounds Played",
    description: "Play 200 rounds of Lucky Spin get Master Tier",
    icon: "Play",
    condition: (_streak, rounds) => rounds >= 200,
    storageKey: "achievement_rounds_200",
  },
  {
    id: "first_streak",
    title: "First Streak",
    description: "Achieve a winning streak of 3",
    icon: "TrendingUp",
    condition: (streak) => streak >= 3,
    storageKey: "achievement_first_streak",
  },
  {
    id: "streak_10",
    title: "Streak of 10",
    description: "Achieve a winning streak of 10",
    icon: "TrendingUp",
    condition: (streak) => streak >= 10,
    storageKey: "achievement_streak_7",
  },
  {
    id: "streak_30",
    title: "Streak of 30",
    description: "Achieve a winning streak of month",
    icon: "TrendingUp",
    condition: (streak) => streak >= 30,
    storageKey: "achievement_streak_30",
  },
  {
    id: "highest_tier",
    title: "Highest Tier Reached",
    description: "Reach the highest tier in the game",
    icon: "Award",
    storageKey: "achivement_highest_tier",
  },
  {
    id: "highest_rank_count",
    title: "Highest Rank Count",
    description: "Achieve a rank of 50 or better",
    icon: "TrendingUp",
    condition: (_streak, _rounds, rank) => rank <= 50,
    storageKey: "achivement_highest_rank_count",
  },
  {
    id: "highest_streak",
    title: "Longest Streak",
    description: "Achieve a winning streak of 20 or more",
    icon: "Fire",
    condition: (streak) => streak >= 20,
    storageKey: "achivement_highest_streak",
  },
];

// Track which achievements are newly unlocked (not yet seen by user)
export const ACHIEVEMENT_NEW_FLAG_PREFIX = "achievement_new_";

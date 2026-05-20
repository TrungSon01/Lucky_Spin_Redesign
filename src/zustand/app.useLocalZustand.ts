import { create } from "zustand";

interface LocalZustandState {
  [key: string]: any;
  user_name?: string;
  user_avatar?: string;
  current_streak?: string;
  rounds_played?: string;
  achievement_highest_tier?: string;
  achievement_highest_rank_count?: string;
  achievement_highest_streak?: string;
  achievement_first_purchase?: string;
}

interface LocalZustandStore {
  state: LocalZustandState;
  setState: (newState: LocalZustandState) => void;
  getState: () => LocalZustandState;
}

export const useLocalZustand = create<LocalZustandStore>((set, get) => ({
  state: {},
  setState: (newState) =>
    set((prev) => ({ state: { ...prev.state, ...newState } })),
  getState: () => get().state,
}));

import { create } from "zustand";

interface LuckySpinState {
  question: string;
  option: string;
}

interface LuckySpinStore {
  question: LuckySpinState | null;

  set_question: (question: LuckySpinState) => void;

  remove_question: () => void;
}

export const useLuckySpinStore = create<LuckySpinStore>((set) => ({
  question: null,

  set_question: (question) => {
    set({ question });
  },

  remove_question: () => {
    set({ question: null });
  },
}));

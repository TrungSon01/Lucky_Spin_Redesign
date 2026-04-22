import { create } from "zustand";
import { Data_Beauty } from "../Pages/Questions/Beauty/Data/Beauty.data"; // adjust path

type Answer = string | { label: string; value_min: number; value_max: number };

interface BeautyQuestion {
  question: string;
  options: Answer[];
}

interface BeautyState {
  beautyQuestions: BeautyQuestion[];

  beautyAnswers: Answer[];
  initBeautyQuestions: () => void;
  setBeautyAnswers: (answers: Answer[]) => void;
  resetBeauty: () => void;
}

export const useBeautyStore = create<BeautyState>((set) => ({
  beautyQuestions: [],
  beautyAnswers: [],

  initBeautyQuestions: () => set({ beautyQuestions: Data_Beauty }),

  setBeautyAnswers: (answers) => set({ beautyAnswers: answers }),

  resetBeauty: () => set({ beautyQuestions: [], beautyAnswers: [] }),
}));

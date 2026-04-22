import { create } from "zustand";
import { RawAnswer } from "../Pages/Templates/QuestionTemplate/Question.template";

export type QuizCategory =
  | "beauty"
  | "electronic"
  | "accessory"
  | "clothing"
  | "homeEssential";

interface QuizAnswers {
  [category: string]: RawAnswer[];
}

interface QuizState {
  answers: QuizAnswers;
  setAnswers: (category: QuizCategory, answers: RawAnswer[]) => void;
  getAnswers: (category: QuizCategory) => RawAnswer[];
  resetCategory: (category: QuizCategory) => void;
  resetAll: () => void;
}

const initialAnswers: QuizAnswers = {
  beauty: [],
  electronic: [],
  accessory: [],
  clothing: [],
  homeEssential: [],
};

export const useQuizStore = create<QuizState>((set, get) => ({
  answers: { ...initialAnswers },

  setAnswers: (category, answers) =>
    set((state) => ({
      answers: { ...state.answers, [category]: answers },
    })),

  getAnswers: (category) => get().answers[category],

  resetCategory: (category) =>
    set((state) => ({
      answers: { ...state.answers, [category]: [] },
    })),

  resetAll: () => set({ answers: { ...initialAnswers } }),
}));

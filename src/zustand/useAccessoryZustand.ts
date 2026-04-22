import { create } from "zustand";
import { RawAnswer } from "../Pages/Templates/QuestionTemplate/Question.template";

interface AccessoryState {
  answers: RawAnswer[];
  category: string | null;
  budget: { label: string; value_min: number; value_max: number } | null;
}

interface AccessoryActions {
  setAccessoryAnswers: (answers: RawAnswer[]) => void;
  resetAccessory: () => void;
}

const initialState: AccessoryState = {
  answers: [],
  category: null,
  budget: null,
};

const getLabel = (o: RawAnswer): string =>
  typeof o === "string" ? o : o.label;

export const useAccessoryStore = create<AccessoryState & AccessoryActions>(
  (set) => ({
    ...initialState,

    setAccessoryAnswers: (answers) => {
      const [raw0, raw1] = answers;

      const category = raw0 ? getLabel(raw0) : null;

      let budget: AccessoryState["budget"] = null;
      if (raw1 && typeof raw1 === "object" && "value_min" in raw1) {
        budget = {
          label: raw1.label,
          value_min: raw1.value_min,
          value_max: raw1.value_max,
        };
      } else if (raw1) {
        budget = { label: getLabel(raw1), value_min: 0, value_max: 99999 };
      }

      set({ answers, category, budget });
    },

    resetAccessory: () => set(initialState),
  }),
);

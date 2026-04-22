import { create } from "zustand";
import { RawAnswer } from "../Pages/Templates/QuestionTemplate/Question.template";

interface ElectronicState {
  answers: RawAnswer[];
  category: string | null;
  brand: string | null;
  budget: { label: string; value_min: number; value_max: number } | null;
}

interface ElectronicActions {
  setElectronicAnswers: (answers: RawAnswer[]) => void;
  resetElectronic: () => void;
}

const initialState: ElectronicState = {
  answers: [],
  category: null,
  brand: null,
  budget: null,
};

const getLabel = (o: RawAnswer): string =>
  typeof o === "string" ? o : o.label;

export const useElectronicStore = create<ElectronicState & ElectronicActions>(
  (set) => ({
    ...initialState,

    setElectronicAnswers: (answers) => {
      const [raw0, raw1, raw2] = answers;

      const category = raw0 ? getLabel(raw0) : null;
      const brand = raw1 ? getLabel(raw1) : null;

      let budget: ElectronicState["budget"] = null;
      if (raw2 && typeof raw2 === "object" && "value_min" in raw2) {
        budget = {
          label: raw2.label,
          value_min: raw2.value_min,
          value_max: raw2.value_max,
        };
      } else if (raw2) {
        budget = { label: getLabel(raw2), value_min: 0, value_max: 99999 };
      }

      set({ answers, category, brand, budget });
    },

    resetElectronic: () => set(initialState),
  }),
);

import { create } from "zustand";
import { RawAnswer } from "../Pages/Templates/QuestionTemplate/Question.template";

interface HomeEssentialState {
  answers: RawAnswer[];
  category: string | null;
  budget: { label: string; value_min: number; value_max: number } | null;
}

interface HomeEssentialAction {
  setHomeEssentialAnswers: (answers: RawAnswer[]) => void;
  resetHomeEssential: () => void;
}

const initialState: HomeEssentialState = {
  answers: [],
  category: null,
  budget: null,
};

const getLabel = (o: RawAnswer): string =>
  typeof o === "string" ? o : o.label;

export const useHomeEssentialStore = create<
  HomeEssentialState & HomeEssentialAction
>((set) => ({
  ...initialState,
  setHomeEssentialAnswers: (answers) => {
    const [raw0, raw2] = answers;

    const category = raw0 ? getLabel(raw0) : null;

    let budget: HomeEssentialState["budget"] = null;
    if (raw2 && typeof raw2 === "object" && "value_min" in raw2) {
      budget = {
        label: raw2.label,
        value_min: raw2.value_min,
        value_max: raw2.value_max,
      };
    } else if (raw2) {
      budget = { label: getLabel(raw2), value_min: 0, value_max: 99999 };
    }

    set({ answers, category, budget });
  },
  resetHomeEssential: () => set(initialState),
}));

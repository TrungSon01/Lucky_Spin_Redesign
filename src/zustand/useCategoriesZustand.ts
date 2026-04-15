import { create } from "zustand";

interface CategoryState {
  label: string;
  icon: React.ReactNode | null;
  bg: string;
  tag: string | null;
}

interface CategoryStore {
  categories: CategoryState[];
  setCategories: (categories: CategoryState[]) => void;
}
export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));

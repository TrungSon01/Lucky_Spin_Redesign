import { I_OPTION_BUDGET } from "../Interfaces/Budget.interface";

export const OPTION_BUDGET: I_OPTION_BUDGET[] = [
  { label: "Under $50", value_min: 0, value_max: 50 },
  { label: "$50 - $100", value_min: 50, value_max: 100 },
  { label: "$100 - $200", value_min: 100, value_max: 200 },
  { label: "$200 - $300", value_min: 200, value_max: 300 },
  { label: "$300 - $500", value_min: 300, value_max: 500 },
  { label: "Over $500", value_min: 500, value_max: Infinity },
];

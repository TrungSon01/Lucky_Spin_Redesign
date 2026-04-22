import under50 from "../../../images/Budget/under50.jpg";
import img50_100 from "../../../images/Budget/img50_100.jpg";
import img100_200 from "../../../images/Budget/img100_200.jpg";
import img200_300 from "../../../images/Budget/img200_300.jpg";
import img300_500 from "../../../images/Budget/img300_500.jpg";
import img500_inf from "../../../images/Budget/img500_inf.jpg";
import { transfer_to_vnd } from "../../../lib/function";
export interface I_OPTION_BUDGET {
  label: string;
  value_min: number;
  value_max: number;
}

export const OPTION_BUDGET: I_OPTION_BUDGET[] = [
  { label: "Under $50", value_min: 0, value_max: transfer_to_vnd(50) },
  {
    label: "$50 - $100",
    value_min: transfer_to_vnd(50),
    value_max: transfer_to_vnd(100),
  },
  {
    label: "$100 - $200",
    value_min: transfer_to_vnd(100),
    value_max: transfer_to_vnd(200),
  },
  {
    label: "$200 - $300",
    value_min: transfer_to_vnd(200),
    value_max: transfer_to_vnd(300),
  },
  {
    label: "$300 - $500",
    value_min: transfer_to_vnd(300),
    value_max: transfer_to_vnd(500),
  },
  { label: "Any Budget", value_min: transfer_to_vnd(500), value_max: Infinity },
];

export const OPTION_BUDGET_IMAGES: Record<string, string> = {
  "Under $50": under50,
  "$50 - $100": img50_100,
  "$100 - $200": img100_200,
  "$200 - $300": img200_300,
  "$300 - $500": img300_500,
  "Any Budget": img500_inf,
};

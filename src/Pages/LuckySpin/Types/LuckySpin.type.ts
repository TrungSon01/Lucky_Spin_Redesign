import { Product } from "@shopify/shop-minis-react";

export type SpinPhase =
  | "loading"
  | "ready"
  | "spinning-first"
  | "first-shown"
  | "spinning-second"
  | "second-shown"
  | "locked"
  | "empty"
  | "error";

export type DailyRecord = {
  dateKey: string;
  firstWinnerProductId: string;
  secondWinnerProductId?: string;
  usedSecondSpin: boolean;
  completedAt: string;
};

export type SpinProduct = Product & {
  spinMeta: {
    priceAmount: number;
    compareAtAmount: number;
    discountPercent: number;
    savingsAmount: number;
  };
};

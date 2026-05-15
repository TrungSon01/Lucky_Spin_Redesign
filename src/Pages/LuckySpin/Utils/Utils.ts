import { Product } from "@shopify/shop-minis-react";
import { DailyRecord, SpinProduct } from "../Types/LuckySpin.type";

export function getTodayKey() {
  return new Date().toLocaleDateString("en-CA");
}

export function parseAmount(value: unknown) {
  const amount = Number(value ?? 0);
  return Number.isFinite(amount) ? amount : 0;
}

export function normalizeProduct(product: Product): SpinProduct | null {
  const priceAmount = parseAmount(product?.price?.amount);
  const compareAtAmount = parseAmount(product?.compareAtPrice?.amount);

  if (
    priceAmount <= 0 ||
    compareAtAmount <= 0 ||
    compareAtAmount <= priceAmount
  ) {
    return null;
  }

  const savingsAmount = compareAtAmount - priceAmount;
  const discountPercent = (savingsAmount / compareAtAmount) * 100;

  return {
    ...product,
    spinMeta: {
      priceAmount,
      compareAtAmount,
      discountPercent,
      savingsAmount,
    },
  };
}

export function sortByBestDiscount(a: SpinProduct, b: SpinProduct) {
  if (b.spinMeta.discountPercent !== a.spinMeta.discountPercent) {
    return b.spinMeta.discountPercent - a.spinMeta.discountPercent;
  }

  if (b.spinMeta.savingsAmount !== a.spinMeta.savingsAmount) {
    return b.spinMeta.savingsAmount - a.spinMeta.savingsAmount;
  }

  if (a.spinMeta.priceAmount !== b.spinMeta.priceAmount) {
    return a.spinMeta.priceAmount - b.spinMeta.priceAmount;
  }

  return String(a.id).localeCompare(String(b.id));
}

export function shuffleArray<T>(items: T[]) {
  const cloned = [...items];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

export function formatCurrency(amount: number, currencyCode?: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode || "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${Math.round(amount)}`;
  }
}

export function readRecord(raw: string | null): DailyRecord | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as DailyRecord;
    if (!parsed?.dateKey || !parsed?.firstWinnerProductId) return null;
    return parsed;
  } catch {
    return null;
  }
}

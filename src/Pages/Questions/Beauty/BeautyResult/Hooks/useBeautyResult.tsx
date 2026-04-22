import { useProductSearch } from "@shopify/shop-minis-react";
import { useBeautyStore } from "../../../../../zustand/useBeautyZustand";

export default function useBeautyResult() {
  const { beautyAnswers } = useBeautyStore();

  const result = useProductSearch({
    query: beautyAnswers
      .map((a) => (typeof a === "string" ? a : a.label))
      .join(" "),
    first: 8,
    filters: {
      price: {
        min:
          beautyAnswers[1] && typeof beautyAnswers[1] !== "string"
            ? beautyAnswers[1].value_min
            : 0,
        max:
          beautyAnswers[1] && typeof beautyAnswers[1] !== "string"
            ? beautyAnswers[1].value_max
            : Infinity,
      },
    },
  });

  return {
    beauty_result: result.products ?? [],
  };
}

import { useMemo } from "react";
import { useProductSearch } from "@shopify/shop-minis-react";
import { useQuizStore } from "../../../../zustand/useQuizStore";
import { RawAnswer } from "../../QuestionTemplate/Question.template";

interface UseResultOptions {
  category:
    | "beauty"
    | "electronic"
    | "accessory"
    | "clothing"
    | "homeEssential";
  first?: number;
}

export default function useResult({ category, first = 12 }: UseResultOptions) {
  const answers = useQuizStore((state) => state.answers[category]) ?? [];

  const query = useMemo(() => {
    return (answers ?? [])
      .map((a: RawAnswer) => (typeof a === "string" ? a : a.label))
      .join(" ");
  }, [answers]);

  // Extract budget from second answer (index 1) if exists
  const priceFilter = useMemo(() => {
    const budgetAnswer = answers[1];
    if (!budgetAnswer) return undefined;
    if (typeof budgetAnswer === "string") return undefined;

    return {
      price: {
        min: budgetAnswer.value_min ?? 0,
        max: budgetAnswer.value_max ?? Infinity,
      },
    };
  }, [answers]);

  const result = useProductSearch({
    query,
    first,
    filters: priceFilter,
  });

  return {
    products: result.products ?? [],
    isLoading: result.loading,
    error: result.error,
    hasMore: result?.hasNextPage,
    refetch: result.refetch,
    query,
  };
}

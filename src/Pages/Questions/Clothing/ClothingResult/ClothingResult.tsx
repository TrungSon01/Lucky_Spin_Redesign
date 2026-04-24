import { useQuizStore } from "../../../../zustand/useQuizStore";
import useResult from "../../../Templates/ResultTemplate/Hooks/useResult";
import ResultTemplate from "../../../Templates/ResultTemplate/Result.template";

export default function ClothingResult() {
  const { products, isLoading, error, refetch } = useResult({
    category: "clothing",
    first: 12,
  });

  const resetAnswers = () => useQuizStore.getState().resetCategory("clothing");

  return (
    <ResultTemplate
      category="clothing"
      categoryName="Fashion"
      themeClass="result-theme--clothing"
      badgeText="Finds"
      appName="LuckySpinner"
      products={products}
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      resetAnswers={resetAnswers}
    />
  );
}

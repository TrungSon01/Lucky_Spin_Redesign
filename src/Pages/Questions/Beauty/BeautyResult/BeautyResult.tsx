import { useQuizStore } from "../../../../zustand/useQuizStore";
import useResult from "../../../Templates/ResultTemplate/Hooks/useResult";
import ResultTemplate from "../../../Templates/ResultTemplate/Result.template";

export default function BeautyResult() {
  const { products, isLoading, error, refetch } = useResult({
    category: "beauty",
    first: 12,
  });

  const resetAnswers = () => useQuizStore.getState().resetCategory("beauty");

  return (
    <ResultTemplate
      category="beauty"
      categoryName="Beauty"
      themeClass="result-theme--beauty"
      badgeText="Picks"
      appName="LuckySpinner"
      products={products}
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      resetAnswers={resetAnswers}
    />
  );
}

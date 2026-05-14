import { useQuizStore } from "../../../../zustand/useQuizStore";
import useResult from "../../../Templates/ResultTemplate/Hooks/useResult";
import ResultTemplate from "../../../Templates/ResultTemplate/Result.template";

export default function ToyResult() {
  const { products, isLoading, error, refetch } = useResult({
    category: "toy",
    first: 12,
  });

  const resetAnswers = () => useQuizStore.getState().resetCategory("toy");

  return (
    <ResultTemplate
      category="toy"
      categoryName="Toys"
      themeClass="result-theme--toy"
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

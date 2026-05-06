import { useQuizStore } from "../../../../zustand/useQuizStore";
import useResult from "../../../Templates/ResultTemplate/Hooks/useResult";
import ResultTemplate from "../../../Templates/ResultTemplate/Result.template";

export default function SportResult() {
  const { products, isLoading, error, refetch } = useResult({
    category: "sport",
    first: 12,
  });

  const resetAnswers = () =>
    useQuizStore.getState().resetCategory("sport");

  return (
    <ResultTemplate
      category="sport"
      categoryName="Sports"
      themeClass="result-theme--sport"
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

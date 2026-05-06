import { useQuizStore } from "../../../../zustand/useQuizStore";
import useResult from "../../../Templates/ResultTemplate/Hooks/useResult";
import ResultTemplate from "../../../Templates/ResultTemplate/Result.template";

export default function PetsResult() {
  const { products, isLoading, error, refetch } = useResult({
    category: "pets",
    first: 12,
  });

  const resetAnswers = () =>
    useQuizStore.getState().resetCategory("pets");

  return (
    <ResultTemplate
      category="pets"
      categoryName="Pets"
      themeClass="result-theme--pets"
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

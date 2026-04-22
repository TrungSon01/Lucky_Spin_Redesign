import { useQuizStore } from "../../../../zustand/useQuizStore";
import useResult from "../../../Templates/ResultTemplate/Hooks/useResult";
import ResultTemplate from "../../../Templates/ResultTemplate/Result.template";

export default function ElectronicResult() {
  const { products, isLoading, error, refetch } = useResult({
    category: "electronic",
    first: 12,
  });

  const resetAnswers = () =>
    useQuizStore.getState().resetCategory("electronic");

  return (
    <ResultTemplate
      category="electronic"
      categoryName="Tech"
      themeClass="result-theme--electronic"
      badgeText="Deals"
      appName="LuckySpinner"
      products={products}
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      resetAnswers={resetAnswers}
    />
  );
}

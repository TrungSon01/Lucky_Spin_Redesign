import { useQuizStore } from "../../../../zustand/useQuizStore";
import useResult from "../../../Templates/ResultTemplate/Hooks/useResult";
import ResultTemplate from "../../../Templates/ResultTemplate/Result.template";

export default function AccessoryResult() {
  const { products, isLoading, error, refetch } = useResult({
    category: "accessory",
    first: 12,
  });

  const resetAnswers = () => useQuizStore.getState().resetCategory("accessory");

  return (
    <ResultTemplate
      category="accessory"
      categoryName="Accessories"
      themeClass="result-theme--accessory"
      badgeText="Collection"
      appName="LuckySpinner"
      products={products}
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      resetAnswers={resetAnswers}
    />
  );
}

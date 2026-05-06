import { useQuizStore } from "../../../../zustand/useQuizStore";
import useResult from "../../../Templates/ResultTemplate/Hooks/useResult";
import ResultTemplate from "../../../Templates/ResultTemplate/Result.template";

export default function FoodDrinkResult() {
  const { products, isLoading, error, refetch } = useResult({
    category: "foodDrink",
    first: 12,
  });

  const resetAnswers = () =>
    useQuizStore.getState().resetCategory("foodDrink");

  return (
    <ResultTemplate
      category="foodDrink"
      categoryName="Food & Drink"
      themeClass="result-theme--fooddrink"
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

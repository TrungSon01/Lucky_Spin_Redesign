import { useQuizStore } from "../../../../zustand/useQuizStore";
import useResult from "../../../Templates/ResultTemplate/Hooks/useResult";
import ResultTemplate from "../../../Templates/ResultTemplate/Result.template";

export default function HomeEssentialsResult() {
  const { products, isLoading, error, refetch } = useResult({
    category: "homeEssential",
    first: 12,
  });

  const getAnswers = () => useQuizStore.getState().answers.homeEssential;
  const resetAnswers = () => useQuizStore.getState().resetCategory("homeEssential");

  return (
    <ResultTemplate
      category="homeEssential"
      categoryName="Home Essentials"
      themeClass="result-theme--homeEssential"
      badgeText="Collection"
      appName="LuckySpinner"
      products={products}
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      getAnswers={getAnswers}
      resetAnswers={resetAnswers}
    />
  );
}

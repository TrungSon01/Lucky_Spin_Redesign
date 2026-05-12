import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import QuestionTemplate, {
  RawAnswer,
} from "../../Templates/QuestionTemplate/Question.template";
import { useQuizStore } from "../../../zustand/useQuizStore";
import { Data_FoodDrink } from "./Data/FoodDrink.data";
import {
  FOODDRINK_IMAGES,
  I_FOODDRINK_IMAGES,
} from "../Interfaces/FoodDrink.interface";
import { OPTION_BUDGET_IMAGES } from "../Interfaces/Budget.interface";

const OPTION_IMAGES: I_FOODDRINK_IMAGES = FOODDRINK_IMAGES;

const BUDGET_IMAGES: Record<string, string> = OPTION_BUDGET_IMAGES;

// Words that should be highlighted with the accent colour
const GOLD_WORDS = new Set([
  "interested",
  "spend?",
  "willing",
  "lucky",
  "food",
  "drink",
]);

export default function FoodDrink() {
  const navigate = useNavigateWithTransition();
  const { setAnswers } = useQuizStore();

  const handleComplete = (answers: RawAnswer[]) => {
    setAnswers("foodDrink", answers);
    navigate("/food/result");
  };

  return (
    <QuestionTemplate
      data={Data_FoodDrink}
      optionImages={OPTION_IMAGES}
      budgetImages={BUDGET_IMAGES}
      goldWords={GOLD_WORDS}
      badgeText="Food & Drink Picks"
      appName="LuckySpinner"
      themeClass="quiz-theme--fooddrink"
      onComplete={handleComplete}
    />
  );
}

import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import QuestionTemplate, {
  RawAnswer,
} from "../../Templates/QuestionTemplate/Question.template";
import { useQuizStore } from "../../../zustand/useQuizStore";
import { Data_Electronic } from "./Data/Electronic.data";
import {
  ELECTRONIC_IMAGES,
  I_ELECTRONIC_IMAGES,
} from "../Interfaces/Electronic.interface";
import { OPTION_BUDGET_IMAGES } from "../Interfaces/Budget.interface";

const OPTION_IMAGES: I_ELECTRONIC_IMAGES = ELECTRONIC_IMAGES;
const BUDGET_IMAGES: Record<string, string> = OPTION_BUDGET_IMAGES;

// Words that should be highlighted with the accent colour
const GOLD_WORDS = new Set([
  "interested",
  "spend?",
  "willing",
  "lucky",
  "brand",
  "device",
]);

export default function Electronic() {
  const navigate = useNavigateWithTransition();
  const { setAnswers } = useQuizStore();

  const handleComplete = (answers: RawAnswer[]) => {
    setAnswers("electronic", answers);
    navigate("/electronic/result");
  };

  return (
    <QuestionTemplate
      data={Data_Electronic}
      optionImages={OPTION_IMAGES}
      budgetImages={BUDGET_IMAGES}
      goldWords={GOLD_WORDS}
      badgeText="Tech Deals"
      appName="LuckySpinner"
      themeClass="quiz-theme--electronic"
      onComplete={handleComplete}
    />
  );
}

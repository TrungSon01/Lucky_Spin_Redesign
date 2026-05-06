import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import QuestionTemplate, {
  RawAnswer,
} from "../../Templates/QuestionTemplate/Question.template";
import { useQuizStore } from "../../../zustand/useQuizStore";
import { Data_Jewelry } from "./Data/Toy.data";
import {
  JEWELRY_IMAGES,
  I_JEWELRY_IMAGES,
} from "../Interfaces/Jewelry.interface";
import { OPTION_BUDGET_IMAGES } from "../Interfaces/Budget.interface";

const OPTION_IMAGES: I_JEWELRY_IMAGES = JEWELRY_IMAGES;

const BUDGET_IMAGES: Record<string, string> = OPTION_BUDGET_IMAGES;

// Words that should be highlighted with the accent colour
const GOLD_WORDS = new Set([
  "interested",
  "spend?",
  "willing",
  "lucky",
  "jewelry",
]);

export default function Toy() {
  const navigate = useNavigateWithTransition();
  const { setAnswers } = useQuizStore();

  const handleComplete = (answers: RawAnswer[]) => {
    setAnswers("toy", answers);
    navigate("/toy/result");
  };

  return (
    <QuestionTemplate
      data={Data_Jewelry}
      optionImages={OPTION_IMAGES}
      budgetImages={BUDGET_IMAGES}
      goldWords={GOLD_WORDS}
      badgeText="Jewelry Picks"
      appName="LuckySpinner"
      themeClass="quiz-theme--jewelry"
      onComplete={handleComplete}
    />
  );
}

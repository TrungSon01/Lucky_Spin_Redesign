import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import QuestionTemplate, {
  RawAnswer,
} from "../../Templates/QuestionTemplate/Question.template";
import { useQuizStore } from "../../../zustand/useQuizStore";
import { Data_Accessory } from "./Data/Accessory.data";
import {
  ACCESSORY_IMAGES,
  I_ACCESSORY_IMAGES,
} from "../Interfaces/Accessory.interface";
import { OPTION_BUDGET_IMAGES } from "../Interfaces/Budget.interface";

const OPTION_IMAGES: I_ACCESSORY_IMAGES = ACCESSORY_IMAGES;

const BUDGET_IMAGES: Record<string, string> = OPTION_BUDGET_IMAGES;

// Words that should be highlighted with the accent colour
const GOLD_WORDS = new Set([
  "interested",
  "spend?",
  "willing",
  "lucky",
  "accessory",
]);

export default function Accessory() {
  const navigate = useNavigateWithTransition();
  const { setAnswers } = useQuizStore();

  const handleComplete = (answers: RawAnswer[]) => {
    setAnswers("accessory", answers);
    navigate("/accessory/result");
  };

  return (
    <QuestionTemplate
      data={Data_Accessory}
      optionImages={OPTION_IMAGES}
      budgetImages={BUDGET_IMAGES}
      goldWords={GOLD_WORDS}
      badgeText="Accessory Picks"
      appName="LuckySpinner"
      themeClass="quiz-theme--accessory"
      onComplete={handleComplete}
    />
  );
}

import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import { RawAnswer } from "../../Templates/QuestionTemplate//Question.template";
import { Data_Beauty } from "./Data/Beauty.data";
import { useQuizStore } from "../../../zustand/useQuizStore";

import QuestionTemplate from "../../Templates/QuestionTemplate//Question.template";
import {
  BEAUTY_IMAGE,
  I_OPTION_BEAUTY_IMAGES,
} from "../Interfaces/Beauty.interface";
import { OPTION_BUDGET_IMAGES } from "../Interfaces/Budget.interface";

const OPTION_IMAGES: I_OPTION_BEAUTY_IMAGES = BEAUTY_IMAGE;
const BUDGET_IMAGES: Record<string, string> = OPTION_BUDGET_IMAGES;
const GOLD_WORDS = new Set(["interested", "spend?", "willing", "lucky"]);

export default function Beauty() {
  const navigate = useNavigateWithTransition();
  const { setAnswers } = useQuizStore();

  const handleComplete = (answers: RawAnswer[]) => {
    setAnswers("beauty", answers);
    navigate("/beauty/result");
  };

  return (
    <QuestionTemplate
      data={Data_Beauty}
      optionImages={OPTION_IMAGES}
      budgetImages={BUDGET_IMAGES}
      goldWords={GOLD_WORDS}
      badgeText="Exclusive Offer"
      appName="LuckySpinner"
      themeClass="quiz-them--beauty"
      onComplete={handleComplete}
    />
  );
}

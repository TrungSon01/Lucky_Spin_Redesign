import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import QuestionTemplate, {
  RawAnswer,
} from "../../Templates/QuestionTemplate/Question.template";
import { useQuizStore } from "../../../zustand/useQuizStore";
import Male from "../../../images/Clothing/Gender/Male.jpg";
import Female from "../../../images/Clothing/Gender/Female.jpg";
import { OPTION_BUDGET_IMAGES } from "../Interfaces/Budget.interface";
import { Data_Clothing } from "./Data/Clothing.data";
import {
  CLOTHING_IMAGES,
  I_CLOTHING_IMAGES,
} from "../Interfaces/Clothing.interface";

const OPTION_IMAGES: I_CLOTHING_IMAGES = CLOTHING_IMAGES;
const BUDGET_IMAGES: Record<string, string> = OPTION_BUDGET_IMAGES;
const GENDER_IMAGES: Record<string, string> = {
  Male: Male,
  Female: Female,
};
// Words that should be highlighted with the accent colour
const GOLD_WORDS = new Set([
  "interested",
  "spend?",
  "willing",
  "lucky",
  "brand",
  "device",
  "gender",
]);

export default function Clothing() {
  const navigate = useNavigateWithTransition();
  const { setAnswers } = useQuizStore();

  const handleComplete = (answers: RawAnswer[]) => {
    setAnswers("clothing", answers);
    navigate("/clothing/result");
  };

  return (
    <QuestionTemplate
      data={Data_Clothing}
      optionImages={OPTION_IMAGES}
      budgetImages={BUDGET_IMAGES}
      genderImages={GENDER_IMAGES}
      goldWords={GOLD_WORDS}
      badgeText="Fashion Finds"
      appName="LuckySpinner"
      themeClass="quiz-theme--clothing"
      onComplete={handleComplete}
    />
  );
}

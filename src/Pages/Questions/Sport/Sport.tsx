import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import QuestionTemplate, {
  RawAnswer,
} from "../../Templates/QuestionTemplate/Question.template";
import { useQuizStore } from "../../../zustand/useQuizStore";
import { Data_Sport } from "./Data/Sport.data";
import { SPORT_IMAGES, I_SPORT_IMAGES } from "../Interfaces/Sport.interface";
import { OPTION_BUDGET_IMAGES } from "../Interfaces/Budget.interface";

const OPTION_IMAGES: I_SPORT_IMAGES = SPORT_IMAGES;

const BUDGET_IMAGES: Record<string, string> = OPTION_BUDGET_IMAGES;

// Words that should be highlighted with the accent colour
const GOLD_WORDS = new Set([
  "interested",
  "spend?",
  "willing",
  "lucky",
  "sport",
]);

export default function Sport() {
  const navigate = useNavigateWithTransition();
  const { setAnswers } = useQuizStore();

  const handleComplete = (answers: RawAnswer[]) => {
    setAnswers("sport", answers);
    navigate("/sport/result");
  };

  return (
    <QuestionTemplate
      data={Data_Sport}
      optionImages={OPTION_IMAGES}
      budgetImages={BUDGET_IMAGES}
      goldWords={GOLD_WORDS}
      badgeText="Sports Picks"
      appName="LuckySpinner"
      themeClass="quiz-theme--sport"
      onComplete={handleComplete}
    />
  );
}

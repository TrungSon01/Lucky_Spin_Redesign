import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import QuestionTemplate, {
  RawAnswer,
} from "../../Templates/QuestionTemplate/Question.template";
import { useQuizStore } from "../../../zustand/useQuizStore";
import { Data_Pets } from "./Data/Pets.data";
import { PETS_IMAGES, I_PETS_IMAGES } from "../Interfaces/Pets.interface";
import { OPTION_BUDGET_IMAGES } from "../Interfaces/Budget.interface";

const OPTION_IMAGES: I_PETS_IMAGES = PETS_IMAGES;

const BUDGET_IMAGES: Record<string, string> = OPTION_BUDGET_IMAGES;

// Words that should be highlighted with the accent colour
const GOLD_WORDS = new Set([
  "interested",
  "spend?",
  "willing",
  "lucky",
  "pet",
]);

export default function Pets() {
  const navigate = useNavigateWithTransition();
  const { setAnswers } = useQuizStore();

  const handleComplete = (answers: RawAnswer[]) => {
    setAnswers("pets", answers);
    navigate("/pets/result");
  };

  return (
    <QuestionTemplate
      data={Data_Pets}
      optionImages={OPTION_IMAGES}
      budgetImages={BUDGET_IMAGES}
      goldWords={GOLD_WORDS}
      badgeText="Pet Picks"
      appName="LuckySpinner"
      themeClass="quiz-theme--pets"
      onComplete={handleComplete}
    />
  );
}

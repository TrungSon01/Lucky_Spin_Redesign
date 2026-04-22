import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import { OPTION_BUDGET_IMAGES } from "../Interfaces/Budget.interface";
import {
  HOME_ESSENTIALS_IMAGES,
  I_HOME_ESSENTIALS_IMAGES,
} from "../Interfaces/HomeEssentials.interface";
import QuestionTemplate, {
  RawAnswer,
} from "../../Templates/QuestionTemplate/Question.template";
import { useHomeEssentialStore } from "../../../zustand/useHomeEssentialsZustand";
import { Data_Home_Essential } from "./Data/HomeEssentials.data";

const OPTION_IMAGES: I_HOME_ESSENTIALS_IMAGES = HOME_ESSENTIALS_IMAGES;
const BUDGET_IMAGES: Record<string, string> = OPTION_BUDGET_IMAGES;
const GOLD_WORDS = new Set([
  "interested",
  "spend?",
  "willing",
  "lucky",
  "brand",
  "device",
  "home",
  "looking",
  "for",
]);
export default function HomeEssentials() {
  const navigate = useNavigateWithTransition();
  const { setHomeEssentialAnswers } = useHomeEssentialStore();
  const handleComplete = (answers: RawAnswer[]) => {
    setHomeEssentialAnswers(answers);
    navigate("/home-essentials/result");
  };
  return (
    <QuestionTemplate
      data={Data_Home_Essential}
      optionImages={OPTION_IMAGES}
      budgetImages={BUDGET_IMAGES}
      goldWords={GOLD_WORDS}
      badgeText="Exclusive Offer"
      appName="LuckySpinner"
      themeClass="quiz-theme--homeEssential"
      onComplete={handleComplete}
    />
  );
}

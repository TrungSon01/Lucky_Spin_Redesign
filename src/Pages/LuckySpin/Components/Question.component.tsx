import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import { useLuckySpinStore } from "../../../zustand/useLuckySpinZustand";
import QuestionTemplate, {
  RawAnswer,
} from "../../Templates/QuestionTemplate/Question.template";
import { QUESTION_LUCKY_SPIN } from "../Constants/Constants";
const GOLD_WORDS = new Set(["what", "looking"]);
export default function QuestionLuckySpin() {
  const navigate = useNavigateWithTransition();
  const { set_question } = useLuckySpinStore();

  const handleComplete = (answers: RawAnswer[]) => {
    const selected = answers[0];

    if (typeof selected === "string") {
      set_question({
        question: "What are you looking for?",
        option: selected,
      });
    } else {
      set_question({
        question: "What are you looking for?",
        option: selected.label,
      });
    }

    navigate("/lucky-spin");
  };

  return (
    <QuestionTemplate
      data={QUESTION_LUCKY_SPIN}
      goldWords={GOLD_WORDS}
      badgeText="Tech Deals"
      appName="LuckySpinner"
      themeClass="quiz-theme--electronic"
      onComplete={handleComplete}
    />
  );
}

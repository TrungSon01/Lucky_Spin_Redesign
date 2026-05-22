import { QuizQuestion } from "../../Templates/QuestionTemplate/Question.template";

export const STORAGE_KEY = "lucky_spin_daily_record";
export const SPIN_QUERY = "For My Baby";
export const BOARD_SIZE = 8;
export const BOARD_ORDER = [0, 1, 2, 5, 8, 7, 6, 3] as const;

export const QUESTION_LUCKY_SPIN: QuizQuestion[] = [
  {
    question: "What are you looking for?",
    options: [
      "Accessories",
      "Beauty",
      "Men's Clothing",
      "Women's Clothing",
      "Baby's Clothing",
      "Electronics",
      "Sports",
      "Jewelry",
      "Food",
      "random pick",
    ],
  },
];

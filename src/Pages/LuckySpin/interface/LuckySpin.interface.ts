interface I_OPTION_LUCKYSPIN {
  id: number;
  label: string;
}
export interface I_QUESTION_LUCKYSPIN {
  question: string;
  options: I_OPTION_LUCKYSPIN[];
}

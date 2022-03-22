export type QuestionCardProps = {
  question: string;
  answers: string[];
  select: any;
  userAnswer: string | null;
  questionNumber: number;
  correctAnswer: string;
};

import React from "react";
import { QuestionCardProps } from "./QuestionCardTypes";

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answers,
  select,
  userAnswer,
  questionNumber,
  correctAnswer,
}) => {
  return (
    <div className="question-card">
      <p className="question-card-question">
        {question.replaceAll("&quot;", '"').replaceAll("&#039;", "'")}
      </p>
      <div className="question-card-options">
        {answers.map((answer: string, key: number) => {
          return (
            <div key={key} className="question-card-option">
              {!userAnswer ? (
                <button
                  className="option"
                  onClick={() => select(questionNumber - 1, answer)}
                >
                  {answer}
                </button>
              ) : (
                <button
                  className={`option answered ${
                    answer === correctAnswer ? "correct" : "wrong"
                  }`}
                >
                  {answer}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;

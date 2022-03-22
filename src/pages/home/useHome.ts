import { useState } from "react";
import Axios from "axios";
import { Question, QuestionState } from "./HomeTypes";
import { shuffleArray } from "../../utils";
import { setSourceMapRange } from "typescript";
const correctSound = require("../../assets/sounds/correct.mp3");
const incorrectSound = require("../../assets/sounds/incorrect.mp3");

function useHome(isSoundOn: boolean) {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [difficulty, setDifficulty] = useState("medium");
  const [category, setCategory] = useState("0");
  const [amountOfQuestions, setAmountOfQuestions] = useState("10");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const correctAudio = new Audio(correctSound);
  const incorrectAudio = new Audio(incorrectSound);

  const startTrivia = () => {
    setIsGameOver(false);
    setCurrentQuestion(0);
    setScore(0);
    setIsLoading(true);
    const endPoint = `https://opentdb.com/api.php?amount=${amountOfQuestions}&difficulty=${difficulty}&type=multiple${
      category !== "0" ? `&category=${category}` : ""
    }`;

    Axios.get(endPoint)
      .then((res) => {
        const data = res.data.results.map((question: Question) => ({
          ...question,
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
        }));
        setQuestions(data);
        setUserAnswers(Array(parseInt(amountOfQuestions)));
        setIsLoading(false);
      })
      .catch((err: any) => console.error(err));
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleAmountOfQuestions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAmountOfQuestions(e.target.value);
  };

  const handleDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  const checkAnswer = (questionNumber: number, answer: string) => {
    let temp: string[] = [...userAnswers];
    temp[questionNumber] = answer;
    if (answer === questions[questionNumber].correct_answer) {
      setScore((curr) => curr + 1);
      if (isSoundOn) correctAudio.play();
    } else {
      if (isSoundOn) incorrectAudio.play();
    }
    setUserAnswers(temp);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 <= questions.length - 1) {
      setCurrentQuestion((curr) => curr + 1);
    } else {
      setIsGameOver(true);
      setQuestions([]);
    }
  };

  const reset = () => {
    setIsGameOver(false);
  };

  return {
    isLoading,
    questions,
    difficulty,
    amountOfQuestions,
    currentQuestion,
    userAnswers,
    score,
    isGameOver,
    startTrivia,
    handleAmountOfQuestions,
    handleCategory,
    handleDifficulty,
    checkAnswer,
    nextQuestion,
    reset,
  };
}

export default useHome;

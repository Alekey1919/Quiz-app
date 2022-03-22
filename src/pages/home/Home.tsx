import QuestionCard from "../../components/questionCard/QuestionCard";
import useHome from "./useHome";
import { HomeProps } from "./HomeTypes";
import Results from "../../components/results/Results";

const Home: React.FC<HomeProps> = ({ isSoundOn }) => {
  const {
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
  } = useHome(isSoundOn);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="home">
      <h1 className="home-title">Quiz Game</h1>
      {questions.length < 1 && !isGameOver && (
        <div className="home-config">
          <button className="start" onClick={startTrivia}>
            Start
          </button>
          <div className="input-container">
            <label htmlFor="category">Category:</label>
            <select name="category" onChange={handleCategory}>
              <option value="0">Any</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals & Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science & Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime & Manga</option>
              <option value="32">Entertainment: Cartoon & Animations</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="amount-of-questions">Questions:</label>
            <select
              name="amount-of-questions"
              defaultValue={"10"}
              onChange={handleAmountOfQuestions}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="difficulty">Difficulty:</label>
            <select
              name="difficulty"
              defaultValue={difficulty}
              onChange={handleDifficulty}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      )}{" "}
      {questions.length >= 1 && (
        <>
          <div className="home-info">
            <p className="score">
              Score: <span>{score}</span>
            </p>
            <p className="number">
              Question: {currentQuestion + 1} / {amountOfQuestions}
            </p>
          </div>
          <QuestionCard
            questionNumber={currentQuestion + 1}
            question={questions[currentQuestion].question}
            answers={questions[currentQuestion].answers}
            userAnswer={userAnswers ? userAnswers[currentQuestion] : null}
            correctAnswer={questions[currentQuestion].correct_answer}
            select={checkAnswer}
          />
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        </>
      )}
      {isGameOver && (
        <>
          <Results score={(score * 100) / parseInt(amountOfQuestions)} />
          <button className="start" onClick={reset}>
            Try Again
          </button>
        </>
      )}
    </div>
  );
};

export default Home;

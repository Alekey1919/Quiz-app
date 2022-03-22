import React from "react";
import { ResultsProps } from "./ResultTypes";

const Results: React.FC<ResultsProps> = ({ score }) => {
  return (
    <div className="results">
      <h1>{score}%</h1>
      <h2>
        {score === 100 && "Perfect!"}
        {score >= 80 && score <= 99 && "Amazing!"}
        {score >= 60 && score <= 79 && "Very Good!"}
        {score >= 30 && score <= 59 && "Try again!"}
        {score <= 29 && "Health is most important"}
      </h2>
    </div>
  );
};

export default Results;

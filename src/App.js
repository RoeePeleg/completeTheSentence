import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import AnswerInput from "./AnswerInput";
import AnswerDisplay from "./AnswerDisplay";

const App = () => {
  const [currentSentence, setCurrentSentence] = useState("I think the birthday girl will be the best at...");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, gameOver]);

  const handleAnswerSubmit = (answer) => {
    setAnswers([...answers, answer]);
    if (answers.length + 1 === 3) {
      setGameOver(true);
    }
  };

  return (
    <div className="App">
      <h1>Birthday Game for [Birthday Girl's Name]</h1>
      <h2>Sentence to Complete: {currentSentence}</h2>

      {!gameOver ? (
        <>
          <Timer timeLeft={timeLeft} />
          <AnswerInput onSubmit={handleAnswerSubmit} />
        </>
      ) : (
        <AnswerDisplay answers={answers} />
      )}
    </div>
  );
};

export default App;

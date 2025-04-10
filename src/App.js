import React, { useState, useEffect } from 'react';
import { GAME_CONFIG } from './constants';

function App() {
  const [currentSentence, setCurrentSentence] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.timeLimitInSeconds);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [playerAnswers, setPlayerAnswers] = useState(new Array(GAME_CONFIG.numberOfPlayers).fill(''));

  const startGame = () => {
    setGameStarted(true);
    setCurrentRound(0);
    setAnswers([]);
    setTimeLeft(GAME_CONFIG.timeLimitInSeconds);
    setShowAnswers(false);
    setCurrentPlayer(0);
    startRound();
  };

  const startRound = () => {
    setCurrentSentence(GAME_CONFIG.sentences[currentRound]);
    setAnswers([]);
    setShowAnswers(false);
    setTimeLeft(GAME_CONFIG.timeLimitInSeconds);
    setPlayerAnswers(new Array(GAME_CONFIG.numberOfPlayers).fill(''));
    startTimer();
  };

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 1) {
          clearInterval(timer);
          setShowAnswers(true);
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const showAnswersForCurrentRound = () => {
    return answers.map((answer, index) => (
      <div key={index}>
        <p><strong>Answer {index + 1}:</strong> {answer}</p>
      </div>
    ));
  };

  const submitAnswer = (answer) => {
    playerAnswers[currentPlayer] = answer;
    setPlayerAnswers([...playerAnswers]);

    if (currentPlayer + 1 < GAME_CONFIG.numPlayers) {
      setCurrentPlayer(currentPlayer + 1);
    } else {
      setAnswers(playerAnswers);
      setCurrentPlayer(0);
    }
  };

  const nextRound = () => {
    if (currentRound + 1 < GAME_CONFIG.sentences.length) {
      setCurrentRound(currentRound + 1);
      startRound();
    } else {
      alert('Game Over! All rounds are complete.');
      setGameStarted(false);
    }
  };

  return (
    <div className="App">
      <h1>Game for [Person]</h1>
      {!gameStarted ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <div>
          <h2>Complete this sentence:</h2>
          <p>{currentSentence}</p>
          <input
            type="text"
            placeholder="Enter your answer"
            onBlur={(e) => submitAnswer(e.target.value)}
          />
          <div>
            <p>Time left: {timeLeft}s</p>
          </div>
          {showAnswers && (
            <div>
              <h3>Answers for this round:</h3>
              {showAnswersForCurrentRound()}
              <button onClick={nextRound}>Next Round</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

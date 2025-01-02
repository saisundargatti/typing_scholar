"use client";

import React, { useState, useEffect, useRef } from "react";
import { Apple, Timer, Trophy } from "lucide-react";
import { WORDS } from "../../data/words.";

const AppleFall: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [wordPosition, setWordPosition] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem("highScore") || "0");
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [fallingSpeed, setFallingSpeed] = useState(100);

  const correctSound = new Audio("/collect-5930.mp3");
  const missSound = new Audio("/error-8-206492.mp3");

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(60);
    setUserInput("");
    setWordPosition(0);
    setFallingSpeed(100);
    pickNewWord();
    inputRef.current?.focus();
  };

  const pickNewWord = () => {
    let newWord;
    do {
      const randomIndex = Math.floor(Math.random() * WORDS.length);
      newWord = WORDS[randomIndex];
    } while (newWord === currentWord);
    setCurrentWord(newWord);
    setWordPosition(0);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);

    if (value === currentWord) {
      correctSound.play();
      setScore((prev) => prev + currentWord.length);
      setUserInput("");
      pickNewWord();
      setFallingSpeed((prev) => Math.max(prev - 5, 50));
    } else if (!currentWord.startsWith(value)) {
      setUserInput(""); // Clear input for incorrect typing
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameStarted(false);
      setUserInput("");
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("highScore", score.toString());
      }
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, score, highScore]);

  useEffect(() => {
    let animation: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0) {
      animation = setInterval(() => {
        setWordPosition((prev) => {
          if (prev >= 100) {
            missSound.play();
            setUserInput(""); // Clear input when word reaches bottom
            pickNewWord();
            return 0;
          }
          return prev + 1;
        });
      }, fallingSpeed);
    }
    return () => clearInterval(animation);
  }, [gameStarted, timeLeft, fallingSpeed]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/newton_apple_tree.jpg')",
      }}
    >
      <div className="w-full max-w-lg bg-white/80 shadow-lg rounded-lg p-6">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold flex items-center justify-center gap-2">
            <Apple className="w-8 h-8 text-red-500" />
            <h3
              style={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {" "}
              Apple Fall
            </h3>
          </div>
        </div>
        <div className="flex justify-between w-full text-lg font-semibold mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Score: {score}
          </div>
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            Time: {timeLeft}s
          </div>
        </div>

        <div className="w-full h-40 bg-transparent rounded-lg relative overflow-hidden mb-4">
          {gameStarted && (
            <div
              className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center"
              style={{ top: `${wordPosition}%` }}
            >
              <img src="/fresh-apple-icon (1).png" alt="apple" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-base font-semibold text-white bg-black/50 px-1 py-0.5 rounded max-w-[90%]">
                  <span className="text-green-400">
                    {currentWord.slice(0, userInput.length)}
                  </span>
                  <span className="text-red-400">
                    {currentWord.slice(userInput.length)}
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="w-full bg-gray-200 rounded-lg overflow-hidden h-2 mb-4">
          <div
            className="bg-yellow-900 h-2 transition-all duration-300"
            style={{ width: `${(timeLeft / 60) * 100}%` }}
          ></div>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInput}
          disabled={!gameStarted}
          className="w-full text-center text-lg px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder={gameStarted ? "Type the word..." : "Press Start to play"}
        />

        <button
          onClick={startGame}
          className="w-full px-4 py-2 text-lg font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          {gameStarted ? "Restart" : "Start Game"}
        </button>

        {!gameStarted && timeLeft === 0 && (
          <div className="text-xl font-bold text-center mt-4">
            <div className="text-red-500">Game Over!</div>
            <div className="text-blue-600">Final Score: {score}</div>
            <div className="text-purple-600">High Score: {highScore}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppleFall;

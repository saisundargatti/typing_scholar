import React, { useState, useEffect } from "react";
import { Trophy, AlertTriangle, Timer, HelpCircle, X } from "lucide-react";
import { WORDS } from "../../data/words.";

const MemoryFingers = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);
  const [lastResult, setLastResult] = useState<"correct" | "wrong" | null>(
    null
  );

  const Instructions = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
        <button
          onClick={() => setShowInstructions(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          How to Play
        </h2>

        <div className="space-y-4 text-gray-700">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h3 className="font-bold mb-2">🎯 Objective</h3>
            <p>
              Type each letter of the word using the correct finger as per touch
              typing rules.
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-bold mb-2">⌨️ Controls</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Each button represents a finger</li>
              <li>
                Click the finger you think should type the highlighted letter
              </li>
              <li>Complete words letter by letter</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">💎 Scoring</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Correct finger: +10 points</li>
              <li>Wrong finger: -5 points</li>
              <li>Complete as many words as you can in 60 seconds</li>
            </ul>
          </div>

          <button
            onClick={() => setShowInstructions(false)}
            className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-bold hover:scale-105 transition-transform"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );

  const keyToFinger: Record<string, string> = {
    // Left pinky
    Q: "left-pinky",
    A: "left-pinky",
    Z: "left-pinky",

    // Left ring
    W: "left-ring",
    S: "left-ring",
    X: "left-ring",

    // Left middle
    E: "left-middle",
    D: "left-middle",
    C: "left-middle",

    // Left index
    R: "left-index",
    F: "left-index",
    V: "left-index",
    T: "left-index",
    G: "left-index",
    B: "left-index",

    // Right index
    Y: "right-index",
    H: "right-index",
    N: "right-index",
    U: "right-index",
    J: "right-index",
    M: "right-index",

    // Right middle
    I: "right-middle",
    K: "right-middle",

    // Right ring
    O: "right-ring",
    L: "right-ring",

    // Right pinky
    P: "right-pinky",

    // Added missing letters based on standard touch typing
    // Additional letters for completeness
    ".": "right-pinky",
    ";": "right-pinky",
    "/": "right-pinky",
  };

  const words = WORDS.map((item) => item.toLocaleUpperCase());

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsGameActive(false);
    }
  }, [isGameActive, timeLeft]);

  const generateRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
  };

  const startGame = () => {
    setScore(0);
    setMistakes(0);
    setTimeLeft(60);
    setIsGameActive(true);
    setCurrentWord(generateRandomWord());
    setCurrentIndex(0);
  };

  const handleButtonClick = (finger: string) => {
    if (!isGameActive) return;

    const currentChar = currentWord[currentIndex];
    const correctFinger = keyToFinger[currentChar];

    if (correctFinger === finger) {
      setScore((s) => s + 10);
      setLastResult("correct");

      if (currentIndex === currentWord.length - 1) {
        setCurrentWord(generateRandomWord());
        setCurrentIndex(0);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    } else {
      setMistakes((m) => m + 1);
      setScore((s) => Math.max(0, s - 5)); // Prevent negative scores
      setLastResult("wrong");
    }

    setTimeout(() => setLastResult(null), 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      {showInstructions && <Instructions />}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full ">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Memory Fingers
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowInstructions(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <HelpCircle className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2 bg-blue-100 p-3 rounded-lg">
              <Timer className="text-blue-600 h-6 w-6" />
              <span className="text-xl font-semibold text-blue-600">
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>
        {!isGameActive && timeLeft === 60 ? (
          <button
            onClick={startGame}
            className="w-full py-4 mb-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-bold hover:scale-105 transition-transform"
          >
            Start Game
          </button>
        ) : !isGameActive ? (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Game Over!</h2>
            <p className="text-gray-600">Final Score: {score}</p>
            <button
              onClick={startGame}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-bold hover:scale-105 transition-transform"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="mb-12">
            <div className="flex justify-center mb-4">
              {currentWord.split("").map((char, index) => (
                <span
                  key={index}
                  className={`
                    text-4xl font-bold mx-1 p-4 rounded-lg
                    ${
                      index === currentIndex
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                        : index < currentIndex
                        ? "text-green-500"
                        : "text-gray-300"
                    }
                  `}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-8 mb-10">
          <div className="flex items-center gap-2 bg-green-100 p-3 rounded-lg">
            <Trophy className="text-green-600 h-6 w-6" />
            <span className="text-xl font-semibold text-green-600">
              {score}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-red-100 p-3 rounded-lg">
            <AlertTriangle className="text-red-600 h-6 w-6" />
            <span className="text-xl font-semibold text-red-600">
              {mistakes}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[
            { side: "left", fingers: ["pinky", "ring", "middle", "index"] },
            { side: "right", fingers: ["index", "middle", "ring", "pinky"] },
          ].map((hand) => (
            <div key={hand.side} className="flex flex-col gap-3">
              {hand.fingers.map((finger) => (
                <button
                  key={`${hand.side}-${finger}`}
                  onClick={() => handleButtonClick(`${hand.side}-${finger}`)}
                  disabled={!isGameActive}
                  className={`
                    py-4 px-6 rounded-lg font-medium text-white
                    transform hover:scale-105 active:scale-95
                    transition-all duration-200
                    ${
                      !isGameActive
                        ? "bg-gray-400"
                        : "bg-gray-600 hover:bg-gray-700"
                    }
                  `}
                >
                  {hand.side === "left" ? "←" : "→"} {finger}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryFingers;

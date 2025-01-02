import React, { useState, useEffect, useRef } from "react";
import { TimerComponent } from "../Timer";
import { paragraphsList } from "../../data/text";
import { CheckCircle } from "lucide-react";
import RealisticHand from "../LearnTyping/hands/RealisticHand";
import DisplayTextCharacter from "./DisplayTextCharacter";
import FingerGuide from "../LearnTyping/FingerGuide";
import ResultsPractice from "./ResultsPractice";

export const TypingTestPractice = () => {
  const [state, setState] = useState({
    selectedParagraphIndex: 0,
    selectedParagraph: paragraphsList[0]?.content,
    timeLeft: 60,
    duration: 60,
    isActive: false,
    completed: false,
    elapsedTime: 0,
    fullText: "",
    mistakes: new Set<number>(),
    currentCharacterIndex: 0,
    currentCharacter: "",
  });

  // Extract characters using the set
  const extractedCharacters = Array.from(state.mistakes)
    .filter((index) => index >= 0 && index < state.selectedParagraph.length) // Ensure valid indices
    .map((index) => state.selectedParagraph[index]);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state.selectedParagraphIndex !== null) {
      const paragraph = paragraphsList[state.selectedParagraphIndex]?.content;
      setState((prevState) => ({
        ...prevState,
        selectedParagraph: paragraph,
        fullText: "",
        mistakes: new Set(),
        currentCharacterIndex: 0,
        isActive: false,
        completed: false,
        timeLeft: state.duration,
      }));
    }
  }, [state.selectedParagraphIndex, state.duration]);

  useEffect(() => {
    if (state.selectedParagraph) {
      const nextChar =
        state.selectedParagraph[state.currentCharacterIndex] || "";
      setState((prevState) => ({
        ...prevState,
        currentCharacter: nextChar,
      }));
    }
  }, [state.currentCharacterIndex, state.selectedParagraph]);

  const validateCharacter = (typedChar: string, originalChar: string) => {
    if (typedChar !== originalChar) {
      setState((prevState) => ({
        ...prevState,
        mistakes: new Set([...prevState.mistakes, state.currentCharacterIndex]),
      }));
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.isActive && state.timeLeft > 0) {
      timer = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          timeLeft: prevState.timeLeft - 1,
        }));
      }, 1000);
    } else if (state.timeLeft === 0) {
      const elapsedTime = state.duration - state.timeLeft / 60;
      setState((prevState) => ({
        ...prevState,
        elapsedTime: elapsedTime,
        completed: true,
        isActive: false,
      }));
      // Scroll to the results section
      const resultsElement = document.getElementById("results-section");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    return () => clearInterval(timer);
  }, [state.isActive, state.timeLeft, state.duration]);

  const handleParagraphSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value, 10);
    setState((prevState) => ({
      ...prevState,
      selectedParagraphIndex: index,
    }));
  };

  const handleDurationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDuration = parseInt(e.target.value, 10) * 60;
    setState((prevState) => ({
      ...prevState,
      duration: selectedDuration,
      timeLeft: selectedDuration,
    }));
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const typedValue = e.target.value;
    const currentCharIndex = typedValue.length - 1;
    const originalChar = state.selectedParagraph[currentCharIndex] || "";
    const typedChar = typedValue.slice(-1);

    // Validate the last typed character
    validateCharacter(typedChar, originalChar);

    // Advance to the next character
    setState((prevState) => ({
      ...prevState,
      fullText: typedValue,
      currentCharacterIndex: typedValue.length,
      isActive: prevState.isActive || typedValue.length > 0,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent the default Backspace action
    }
  };

  const onSubmit = () => {
    setState((prevState) => {
      const elapsedTime = prevState.duration - prevState.timeLeft / 60;
      return {
        ...prevState,
        elapsedTime: elapsedTime,
        completed: true,
        isActive: false,
      };
    });
    // Scroll to the results section
    const resultsElement = document.getElementById("results-section");
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const retryTest = () => {
    setState((prevState) => ({
      ...prevState,
      fullText: "",
      mistakes: new Set(),
      currentCharacterIndex: 0,
      timeLeft: prevState.duration,
      isActive: false,
      completed: false,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <div className="max-w-7xl mx-auto pt-6 px-4">
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              <div className="flex items-center space-x-2">
                <span
                  className="font-bold text-xl"
                  style={{
                    fontFamily: "'Fredoka One', cursive",
                    fontSize: "18px",
                    color: "#6B46C1", // Playful purple
                    fontWeight: "bold",
                  }}
                >
                  🎯 Get Test-Ready & 🖐️ Learn Touch Typing Like a Pro!
                </span>
              </div>
            </h1>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-8">
        <div className="flex space-x-6 mb-6">
          <div className="flex flex-col">
            <label
              htmlFor="duration-select"
              className="block text-gray-700 font-medium mb-2"
            >
              Timer
            </label>
            <TimerComponent
              timeLeft={state.timeLeft}
              duration={state.duration / 60}
              onReset={retryTest}
              isActive={state.isActive}
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="duration-select"
              className="block text-gray-700 font-medium mb-2"
            >
              Select Test Duration:
            </label>
            <select
              id="duration-select"
              className="block w-full p-2 border rounded-md"
              onChange={handleDurationSelect}
              value={state.duration / 60}
            >
              <option value="1">1 Minute</option>
              <option value="2">2 Minutes</option>
              <option value="3">3 Minutes</option>
              <option value="5">5 Minutes</option>
              <option value="10">10 Minutes</option>
              <option value="15">15 Minutes</option>
            </select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="paragraph-select"
              className="block text-gray-700 font-medium mb-2"
            >
              Select a Paragraph to Practice:
            </label>
            <select
              id="paragraph-select"
              className="block w-full p-2 border rounded-md"
              onChange={handleParagraphSelect}
              value={state.selectedParagraphIndex}
            >
              <option value="" disabled>
                Choose a paragraph...
              </option>
              {paragraphsList.map((paragraph, index) => (
                <option key={index} value={index}>
                  {paragraph.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <DisplayTextCharacter
          characters={state.selectedParagraph}
          characterIndex={state.currentCharacterIndex}
          errors={state.mistakes}
          fontSize={18}
        />
        <div className="flex flex-row">
          <RealisticHand side="left" displayedKey={state.currentCharacter} />
          <textarea
            ref={inputRef}
            value={state.fullText}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            disabled={state.completed}
            style={{ fontSize: "18px" }}
            className="w-full h-48 p-4 rounded-lg shadow font-mono resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder={
              state.completed ? "Test completed!" : "Start typing..."
            }
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            autoFocus
          />
          <RealisticHand side="right" displayedKey={state.currentCharacter} />
        </div>
        <div className="flex flex-row justify-between m-8 space-x-2">
          <div className="flex flex-row justify-center items-center">
            <img
              src={
                parseFloat(
                  (
                    state.fullText.length /
                    5 /
                    ((state.duration - state.timeLeft) / 60)
                  ).toFixed(2)
                ) > 0
                  ? "/bikerunning.gif"
                  : "/bikenotyetstarted.gif"
              }
              alt="Motorbike Animation"
            />
            <div className="text-lg font-semibold text-gray-800">
              WPM:{" "}
              <span className="text-green-600">
                {state.timeLeft > 0 || state.duration === state.timeLeft
                  ? state.duration - state.timeLeft > 0
                    ? (
                        state.fullText.length /
                        5 /
                        ((state.duration - state.timeLeft) / 60)
                      ).toFixed(2)
                    : "0.00"
                  : state.duration > 0
                  ? (state.fullText.length / 5 / (state.duration / 60)).toFixed(
                      2
                    )
                  : "0.00"}
              </span>
            </div>
          </div>
          <div className="w-auto h-10 flex flex-row justify-end mt-10">
            <button
              type="submit"
              onClick={onSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              Submit
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <QuickTip />
        </div>

        {state.completed && (
          <ResultsPractice
            originalParagraph={state.selectedParagraph}
            mistakes={state.mistakes}
            userInput={state.fullText}
            elapsedTime={state.elapsedTime}
          />
        )}
        <InfoCard />
        <FingerGuide />
      </main>
    </div>
  );
};
export const QuickTip: React.FC = () => {
  return (
    // Tip and Image Container
    <div className="mt-6 mb-6 flex flex-row items-center gap-6 rounded-lg w-[80%] max-w-2xl bg-blue-100 border border-blue-400 shadow-lg">
      {/* Tip Box */}
      <div className="flex-[2] p-6 w-full">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">💡</span>
          <p className="text-gray-700 font-medium">
            Always rest your fingers on the home row keys. Return to the home
            row after pressing any key.
          </p>
        </div>
        <div className="flex gap-2 justify-center text-xl mt-4">
          <span className="border px-2 py-1 border-gray-400 rounded-lg bg-gray-100">
            A
          </span>
          <span className="border px-2 py-1 border-gray-400 rounded-lg bg-gray-100">
            S
          </span>
          <span className="border px-2 py-1 border-gray-400 rounded-lg bg-gray-100">
            D
          </span>
          <span className="border px-2 py-1 border-gray-400 rounded-lg bg-gray-100">
            F_
          </span>
          <span className="ml-8 border px-2 py-1 border-gray-400 rounded-lg bg-gray-100">
            _J
          </span>
          <span className="border px-2 py-1 border-gray-400 rounded-lg bg-gray-100">
            K
          </span>
          <span className="border px-2 py-1 border-gray-400 rounded-lg bg-gray-100">
            L
          </span>
          <span className="border px-2 py-1 border-gray-400 rounded-lg bg-gray-100">
            ;
          </span>
        </div>
      </div>

      {/* Image */}
      <div className="flex-[3]">
        <img
          src="/picography-laptop-work-home-woman (1).jpg"
          alt="Home row keys illustration"
          className="w-full h-auto rounded-md"
        />
      </div>
    </div>
  );
};

const InfoCard: React.FC = () => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold text-blue-700 mb-4">
        Typing Instructions
      </h2>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>
          <span className="font-semibold">Backspace is disabled:</span> Focus on
          typing the highlighted character even if you make a mistake.
        </li>
        <li>
          <span className="font-semibold">Finger highlights:</span> Use the
          virtual finger guide to determine which finger to use for typing the
          highlighted character.
        </li>
        <li>
          <span className="font-semibold">
            Typing the highlighted character:
          </span>{" "}
          Always type the highlighted character, regardless of any previous
          mistakes or skipped characters.
        </li>
        <li>
          <span className="font-semibold">Mistakes handling:</span> If you type
          the wrong character or skip a character, just continue typing the
          highlighted one.
        </li>
      </ul>
      <div className="mt-4 text-blue-700 font-medium">
        <span className="inline-block mr-2">&#x1F4A1;</span>
        Stay focused and let the guide help you improve your typing speed and
        accuracy!
      </div>
    </div>
  );
};

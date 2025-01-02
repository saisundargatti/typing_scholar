import React, { useState, useEffect, useRef } from "react";
import { TimerComponent } from "./Timer";
import { paragraphsList } from "../data/text";
import { TestConfig } from "../types/config";
import { CheckCircle, Sparkles } from "lucide-react";
import { DisplayText } from "./typing/DisplayText";
import { InputArea } from "./typing/InputArea";
import { Results } from "./typing/Results";
import { checkErrors, hasOmission } from "../utils/fullmistakes";

interface TypingTestProps {
  initialConfig: TestConfig;
  onReset: () => void;
}

const getParagraph = (selectedIndex: number): string =>
  paragraphsList[selectedIndex]?.content || "";

export const TypingTest: React.FC<TypingTestProps> = ({
  initialConfig,
  onReset,
}) => {
  const [config] = useState<TestConfig>(initialConfig);
  const [text] = useState<string>(
    config.useCustomParagraph
      ? config.customParagraph || ""
      : getParagraph(config.selectedParagraphIndex)
  );

  const [input, setInput] = useState("");
  const [state, setState] = useState({
    wordIndex: 0,
    timeLeft: config.duration * 60,
    isActive: false,
    completed: false,
    backspaceCount: 0,
    errors: new Set<number>(),
    omittedIndex: [] as number[],
    elapsedTime: 0,
  });

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const words = text.split(" ");

  // Helper: Validate last word
  const validateLastWord = () => {
    const typedWords = input.trim().split(" ");
    const lastTypedWord = typedWords[state.wordIndex];
    const originalWord = words[state.wordIndex];

    if (!lastTypedWord || lastTypedWord !== originalWord) {
      setState((prev) => ({
        ...prev,
        errors: new Set([...prev.errors, prev.wordIndex]),
      }));
    }
  };

  // Helper: Update elapsed time
  const calculateElapsedTime = () => config.duration - state.timeLeft / 60;

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.isActive && state.timeLeft > 0) {
      timer = setInterval(() => {
        setState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (state.timeLeft === 0) {
      validateLastWord();
      setState((prev) => ({
        ...prev,
        elapsedTime: calculateElapsedTime(),
        completed: true,
        isActive: false,
        omittedIndex: hasOmission(input.split(" ")),
      }));

      console.log(checkErrors(input, text));
    }
    return () => clearInterval(timer);
  }, [state.isActive, state.timeLeft]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Start timer on first input
    if (!state.isActive && value.length === 1) {
      setState((prev) => ({ ...prev, isActive: true }));
    }

    // Prevent backspace if disabled
    if (!config.allowBackspace && value.length < input.length) return;

    // Prevent multiple consecutive spaces
    if (config.allowBackspace && value.endsWith("  ")) return;

    setInput(value);

    const currentTypedWord = value.trim().split(" ").pop() || "";
    const originalWord = words[state.wordIndex];

    if (value.endsWith(" ")) {
      // Validate current word and move to next
      if (currentTypedWord !== originalWord) {
        setState((prev) => ({
          ...prev,
          errors: new Set([...prev.errors, prev.wordIndex]),
        }));
      }
      setState((prev) => ({
        ...prev,
        wordIndex: Math.min(prev.wordIndex + 1, words.length - 1),
      }));
    }
  };

  const retryTest = () => {
    setState({
      wordIndex: 0,
      timeLeft: config.duration * 60,
      isActive: false,
      completed: false,
      backspaceCount: 0,
      errors: new Set(),
      omittedIndex: [],
      elapsedTime: 0,
    });
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Backspace") {
      setState((prev) => ({
        ...prev,
        backspaceCount: prev.backspaceCount + 1,
      }));
    }
  };

  const onSubmit = () => {
    validateLastWord();
    setState((prev) => ({
      ...prev,
      isActive: false,
      elapsedTime: calculateElapsedTime(),
      completed: true,
      omittedIndex: hasOmission(input.split(" ")),
    }));
    console.log(checkErrors(input, text));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!state.completed && (
        <header>
          <div className="max-w-7xl mx-auto pt-6 px-4">
            <div className="flex justify-center items-center">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  <div className="flex items-center space-x-2">
                    <Sparkles size={24} />
                    <span className="pr-2">Welcome,</span>
                    {`${config.name}` || "Guest!"}
                  </div>
                </h1>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className="max-w-4xl mx-auto p-8">
        <TimerComponent
          timeLeft={state.timeLeft}
          duration={config.duration}
          onReset={onReset}
          isActive={state.isActive}
        />
        {!state.completed && (
          <>
            <DisplayText
              words={words}
              wordIndex={state.wordIndex}
              errors={state.errors}
              enableFeedback={config.enableFeedback}
              fontSize={config.fontSize}
            />

            <InputArea
              value={input}
              onChange={handleInput}
              disabled={state.completed}
              fontSize={config.fontSize}
              inputRef={inputRef}
              onKeyDown={handleKeyDown}
            />
            <div className="flex flex-row justify-between">
              <div className="text-gray-500 space-y-2 text-sm">
                <div>
                  Word Count : {input.split(" ").length}/{words.length}
                </div>
              </div>

              <div className="w-auto flex flex-row justify-end mt-10">
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
          </>
        )}
        {state.completed && (
          <Results
            wordIndex={state.wordIndex}
            mistakes={state.errors}
            duration={state.elapsedTime}
            onReset={retryTest}
            typedParagraph={input}
            originalParagraph={text}
            examMode={config.examMode}
            backspaceCount={state.backspaceCount}
            omittedIndex={state.omittedIndex}
          />
        )}
      </main>
    </div>
  );
};

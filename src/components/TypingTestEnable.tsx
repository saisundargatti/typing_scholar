import React, { useState, useEffect, useRef } from "react";
import { TimerComponent } from "./Timer";
import { paragraphsList } from "../data/text";
import { TestConfig } from "../types/config";
import { CheckCircle, Sparkles } from "lucide-react";
import { DisplayText } from "./typing/DisplayText";
import { InputArea } from "./typing/InputArea";
import { Results } from "./typing/Results";
import { useTypingState } from "../hooks/useTypingState";
import { hasOmission } from "../utils/fullmistakes";

interface TypingTestProps {
  initialConfig: TestConfig;
  onReset: () => void;
}

const getParagraph = (selectedIndex: number): string | undefined => {
  const paragraph = paragraphsList.find((_, index) => index === selectedIndex);
  return paragraph?.content;
};

export const TypingTestEnable: React.FC<TypingTestProps> = ({
  initialConfig,
  onReset,
}) => {
  const [omittedIndex, setOmittedIndex] = useState<number[]>([]);
  const [config] = useState<TestConfig>(initialConfig);
  const [text] = useState<string>(
    config.useCustomParagraph
      ? config.customParagraph || ""
      : getParagraph(config.selectedParagraphIndex) || ""
  );

  const {
    words,
    currentWordIndex,
    setFullText,
    mistakes,
    backspaceCount,
    handleInputChange,
    handleKeyDown,
    fullText,
    setCurrentWordIndex,
    setMistakes,
    setBackspaceCount,
  } = useTypingState({
    initialWords: text.split(" "),
    allowBackspace: config.allowBackspace,
  });

  const [timeLeft, setTimeLeft] = useState(config.duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Helper: Validate last word
  const validateLastWord = () => {
    const typedWords = fullText.trim().split(" ");
    const lastTypedWord = typedWords[currentWordIndex] || ""; // Ensure a default empty string
    const originalWord = words[currentWordIndex] || ""; // Ensure a default empty string

    if (!lastTypedWord || lastTypedWord !== originalWord) {
      setMistakes((prev) => new Set([...prev, currentWordIndex])); // Add the currentWordIndex to the mistakes set
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      const elapsedTime = config.duration;
      setElapsedTime(elapsedTime);
      setCompleted(true);
      setIsActive(false);
      validateLastWord();
      setOmittedIndex(hasOmission(fullText.split(" ")));
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, config.duration]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (!isActive && value.length === 1) {
      setIsActive(true);
    }

    handleInputChange(value);
  };

  const retryTest = () => {
    setTimeLeft(config.duration * 60);
    setIsActive(false);
    setCompleted(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setFullText("");
    setCurrentWordIndex(0);
    setMistakes(new Set());
    setBackspaceCount(0);
    setOmittedIndex([]);
  };

  const resetTest = () => {
    onReset();
  };

  const onSubmit = () => {
    setIsActive(false);
    const elapsedTime = config.duration - timeLeft / 60;
    setElapsedTime(elapsedTime);
    setCompleted(true);
    validateLastWord();
    setOmittedIndex(hasOmission(fullText.split(" ")));
  };

  return (
    <div className="min-h-screen bg-gray-100">
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

      <main className="max-w-4xl mx-auto p-8">
        <TimerComponent
          timeLeft={timeLeft}
          duration={config.duration}
          onReset={resetTest}
          isActive={isActive}
        />
        {!completed && (
          <>
            <DisplayText
              words={words}
              wordIndex={currentWordIndex}
              errors={mistakes}
              enableFeedback={config.enableFeedback}
              fontSize={config.fontSize}
            />

            <InputArea
              value={fullText}
              onChange={handleInput}
              disabled={completed}
              fontSize={config.fontSize}
              inputRef={inputRef}
              onKeyDown={handleKeyDown}
            />
            <div className="flex flex-row justify-between">
              <div className="text-gray-500 space-y-2 text-sm">
                Word Count : {fullText.split(" ").length}/{words.length}
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

        {completed && (
          <Results
            wordIndex={currentWordIndex}
            mistakes={mistakes}
            duration={elapsedTime}
            onReset={retryTest}
            typedParagraph={fullText}
            originalParagraph={text}
            examMode={config.examMode}
            backspaceCount={backspaceCount}
            omittedIndex={omittedIndex}
          />
        )}
      </main>
    </div>
  );
};

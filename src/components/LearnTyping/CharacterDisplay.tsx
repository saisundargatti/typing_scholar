import { useState, useEffect, useRef } from "react";
import RealisticHand from "./hands/RealisticHand";
import { typingExercises } from "../../data/lessons";
import SuccessMessage from "./SuccessMessage";

interface Exercise {
  lesson: number;
  keys: string[];
  description: string;
  exercise: string;
}

interface CharacterDisplayProps {
  exercise: Exercise;
  setSelectedExercise: React.Dispatch<React.SetStateAction<Exercise>>;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  exercise,
  setSelectedExercise,
}) => {
  const characters = exercise.exercise.split("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false); // Completion state
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const textDisplayRef = useRef<HTMLDivElement>(null);
  const characterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    setCurrentCharIndex(0);
    setTypedText("");
    setIsWrong(false);
    setIsCompleted(false); // Reset completion state on exercise change
  }, [exercise]);

  useEffect(() => {
    if (characterRefs.current[currentCharIndex] && textDisplayRef.current) {
      const characterElement = characterRefs.current[currentCharIndex];
      if (characterElement) {
        characterElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  }, [currentCharIndex]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentCharIndex]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const currentChar = characters[currentCharIndex];

    if (event.key === "Backspace") {
      setTypedText((prev) => prev.slice(0, -1));
      if (currentCharIndex > 0) {
        setCurrentCharIndex((prev) => prev - 1);
      }
      return;
    }

    if (event.key.length > 1 && event.key !== " ") {
      return;
    }

    if (currentChar === event.key) {
      setTypedText((prev) => prev + event.key);
      setCurrentCharIndex((prev) => prev + 1);
      setIsWrong(false);

      // If the exercise is complete
      if (currentCharIndex + 1 === characters.length) {
        setIsCompleted(true);
        if (!isCategoryComplete()) {
          // Transition to next exercise after animation
          setTimeout(() => {
            const category = Object.keys(typingExercises).find((key) =>
              typingExercises[key].includes(exercise)
            );
            if (category) {
              const exercises = typingExercises[category];
              const currentIndex = exercises.indexOf(exercise);
              const nextIndex = (currentIndex + 1) % exercises.length;
              setSelectedExercise(exercises[nextIndex]);
            }
          }, 2000); // Adjust delay for animation
        }
      }
    } else {
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
      }, 500);
    }
  };

  const nextChar = characters[currentCharIndex] || "";

  // is category complete
  const isCategoryComplete = (): boolean => {
    if (!exercise) return false;

    const category = Object.keys(typingExercises).find((cat) =>
      typingExercises[cat].includes(exercise)
    );

    if (category) {
      const currentCategoryExercises = typingExercises[category];
      const currentIndex = currentCategoryExercises.indexOf(exercise);
      return currentIndex === currentCategoryExercises.length - 1;
    }

    return false;
  };
  return (
    <div className="flex flex-col justify-center items-center mt-20 ">
      {isCompleted ? (
        <>
          <SuccessMessage isCategoryComplete={isCategoryComplete} />
        </>
      ) : (
        <>
          <h3 className="font-serif text-lg font-semibold text-blue-600 tracking-wide italic mb-2">
            Exercise {exercise.lesson} : {exercise.description}
          </h3>

          <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-6">
            {/* Left Hand */}
            <RealisticHand side="left" displayedKey={nextChar} />

            {/* Typing Area */}
            <div className="flex flex-col font-mono items-center p-8 bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto border-2 border-gray-200">
              {/* Display Text */}
              <div
                ref={textDisplayRef}
                className="bg-green-800 border-4 border-yellow-600 rounded-lg p-6 mb-8 w-full max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              >
                <div className="text-white text-lg leading-relaxed tracking-wider font-medium">
                  {characters.map((char, index) => (
                    <span
                      key={index}
                      ref={(el) => (characterRefs.current[index] = el)}
                      className={`transition-all duration-200 ease-in-out transform ${
                        index === currentCharIndex
                          ? "bg-blue-200 text-blue-800 font-bold px-2 py-1 rounded-lg shadow-md"
                          : index < currentCharIndex
                          ? "text-green-300"
                          : "text-gray-300"
                      } ${
                        isWrong && index === currentCharIndex
                          ? "bg-red-500 animate-pulse"
                          : ""
                      } ${char === " " ? "mr-2" : "mr-1"}`}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              {/* Typing Input */}
              <textarea
                ref={inputRef}
                value={typedText}
                onKeyDown={handleKeyPress}
                className="p-4 border border-gray-300 rounded-md shadow-sm w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Start Typing..."
                rows={4}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                onChange={(e) => setTypedText(e.target.value)}
              />
            </div>

            {/* Right Hand */}
            <RealisticHand side="right" displayedKey={nextChar} />
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterDisplay;

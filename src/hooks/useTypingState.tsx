import { useState, useCallback, useMemo } from "react";

const cleanExtraSpaces = (value: string): string => {
  return value.replace(/\s+/g, " ").trim();
};

interface UseTypingStateProps {
  initialWords: string[];
  allowBackspace: boolean;
}

export const useTypingState = ({
  initialWords,
  allowBackspace,
}: UseTypingStateProps) => {
  const [words] = useState<string[]>(initialWords);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fullText, setFullText] = useState("");
  const [mistakes, setMistakes] = useState<Set<number>>(new Set());
  const [omittedIndex, setOmittedIndex] = useState<number[]>([]);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [correctedMistakes, setCorrecteMistakes] = useState<Set<number>>(
    new Set()
  );

  // Derive typed word and completed words
  const typedWord = fullText.split(" ")[currentWordIndex] || "";
  const completedWords = fullText.split(" ").slice(0, currentWordIndex);

  // Memoized mistake and omission tracking
  const currentMistakesAndOmissions = useMemo(() => {
    const updatedMistakes = new Set(mistakes);
    const updatedOmittedIndex = [...omittedIndex];

    // Track indices to remove from both mistakes and omissions
    const indicesToRemove: number[] = [];

    // Check mistakes and omissions
    Array.from(mistakes).forEach((mistakeIndex) => {
      const typedWordAtIndex = fullText.split(" ")[mistakeIndex] || "";

      // Check if the word is now correctly typed or was an omission
      if (
        words[mistakeIndex] === typedWordAtIndex ||
        (omittedIndex.includes(mistakeIndex) && typedWordAtIndex.trim() !== "")
      ) {
        indicesToRemove.push(mistakeIndex);
        setCorrecteMistakes((prev) => {
          const newCorrected = new Set(prev);
          newCorrected.add(mistakeIndex);
          return newCorrected;
        });
      }
    });

    // Remove corrected indices from mistakes
    indicesToRemove.forEach((index) => {
      updatedMistakes.delete(index);

      // Remove from omittedIndex if it was an omission
      const omissionIndex = updatedOmittedIndex.indexOf(index);
      if (omissionIndex !== -1) {
        updatedOmittedIndex.splice(omissionIndex, 1);
      }
    });

    // Update state outside of render
    if (indicesToRemove.length > 0) {
      setMistakes(updatedMistakes);
      setOmittedIndex(updatedOmittedIndex);
    }

    return updatedMistakes;
  }, [fullText, words, mistakes, omittedIndex]);

  const moveToPreviousWord = useCallback(() => {
    if (currentWordIndex > 0 && allowBackspace) {
      setCurrentWordIndex((prev) => prev - 1);

      // Remove the last word from full text
      const newFullText = fullText.split(" ").slice(0, -1).join(" ");
      setFullText(newFullText);
    }
  }, [currentWordIndex, fullText, allowBackspace]);

  const moveToNextWord = useCallback(() => {
    if (currentWordIndex < words.length - 1) {
      const cleanedWord = cleanExtraSpaces(typedWord);

      if (cleanedWord === "") {
        // Add to both omittedIndex and mistakes
        setOmittedIndex((prev) =>
          prev.includes(currentWordIndex) ? prev : [...prev, currentWordIndex]
        );
        setMistakes((prev) => new Set(prev).add(currentWordIndex));
      } else if (cleanedWord !== words[currentWordIndex]) {
        setMistakes((prev) => new Set(prev).add(currentWordIndex));
      }

      setCurrentWordIndex((prev) => prev + 1);
    }
  }, [currentWordIndex, typedWord, words]);

  const handleInputChange = (value: string) => {
    // Prevent input if backspace is not allowed and input is shorter
    if (!allowBackspace && value.length < fullText.length) {
      return;
    }

    // Split the input into words
    const inputWords = value.split(" ");

    // Check if a new word is complete (space pressed)
    if (inputWords.length > currentWordIndex + 1) {
      moveToNextWord();
    }

    // Update full text
    setFullText(value);
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Backspace") {
        setBackspaceCount((prev) => prev + 1);
        if (typedWord === "" && allowBackspace) {
          e.preventDefault();
          moveToPreviousWord();
        }
      }
    },
    [typedWord, moveToPreviousWord, allowBackspace]
  );

  return {
    words,
    currentWordIndex,
    typedWord,
    completedWords,
    mistakes: currentMistakesAndOmissions,
    correctedMistakes,
    omittedIndex,
    backspaceCount,
    handleInputChange,
    handleKeyDown,
    fullText,
    setFullText,
    setMistakes,
    setCurrentWordIndex,
    setBackspaceCount,
    setOmittedIndex,
  };
};

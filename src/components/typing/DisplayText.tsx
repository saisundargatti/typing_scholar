import React, { useEffect, useRef, useState } from "react";

interface DisplayTextProps {
  words: string[];
  wordIndex: number;
  errors: Set<number>;
  enableFeedback: boolean;
  fontSize: number;
}

export const DisplayText: React.FC<DisplayTextProps> = ({
  words,
  wordIndex,
  errors,
  enableFeedback,
  fontSize,
}) => {
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the scrollable container
  const [lines, setLines] = useState<string[][]>([]); // State to hold dynamically calculated lines

  const CHAR_LIMIT = 72; // Character limit per line

  useEffect(() => {
    // Function to split the words into lines based on character limit
    const splitParagraphIntoLines = () => {
      let currentLine: string[] = [];
      let currentLineLength = 0;
      const newLines: string[][] = [];

      words.forEach((word) => {
        const wordLength = word.length;

        // If adding this word exceeds the character limit, start a new line
        if (currentLineLength + wordLength + currentLine.length > CHAR_LIMIT) {
          newLines.push(currentLine);
          currentLine = [word]; // Start a new line with the current word
          currentLineLength = wordLength;
        } else {
          currentLine.push(word); // Add word to the current line
          currentLineLength += wordLength;
        }
      });

      // Add the last line if it has words
      if (currentLine.length > 0) {
        newLines.push(currentLine);
      }

      setLines(newLines);
    };

    splitParagraphIntoLines(); // Split paragraph into lines on mount

    window.addEventListener("resize", splitParagraphIntoLines); // Recalculate lines on window resize
    return () => {
      window.removeEventListener("resize", splitParagraphIntoLines); // Cleanup event listener
    };
  }, [words]);

  // Determine the current line based on the wordIndex dynamically
  const currentLineIndex = lines.findIndex((line) => {
    const lineStartIndex = lines
      .slice(0, lines.indexOf(line)) // Get all previous lines
      .reduce((sum, line) => sum + line.length, 0); // Sum of words in previous lines
    const lineEndIndex = lineStartIndex + line.length; // End index for this line

    return wordIndex >= lineStartIndex && wordIndex < lineEndIndex;
  });

  // Scroll to the active line whenever the currentLineIndex or lines change
  useEffect(() => {
    if (containerRef.current && lines.length > 0 && currentLineIndex >= 0) {
      // Calculate the height of each line
      const lineHeight = containerRef.current.scrollHeight / lines.length;
      containerRef.current.scrollTo({
        top: currentLineIndex * lineHeight, // Scroll to the current line
        behavior: "smooth",
      });
    }
  }, [currentLineIndex, lines.length]); // Trigger scroll when either `currentLineIndex` or `lines` change

  return (
    <div
      ref={containerRef}
      style={{ fontSize: `${fontSize}px` }}
      className="bg-white p-6 rounded-lg shadow mb-4 mt-6 font-mono leading-relaxed h-52 overflow-y-auto"
    >
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} className="mb-2">
          {line.map((word, wordIdx) => {
            const globalIndex =
              lines
                .slice(0, lineIdx) // Get all previous lines
                .reduce((sum, prevLine) => sum + prevLine.length, 0) + wordIdx; // Calculate global index

            return (
              <span
                key={globalIndex}
                className={`${
                  globalIndex === wordIndex ? "bg-yellow-200" : ""
                } ${
                  enableFeedback && errors.has(globalIndex)
                    ? "text-red-500"
                    : ""
                } ${
                  enableFeedback &&
                  globalIndex < wordIndex &&
                  !errors.has(globalIndex)
                    ? "text-green-500"
                    : ""
                }`}
              >
                {word}{" "}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

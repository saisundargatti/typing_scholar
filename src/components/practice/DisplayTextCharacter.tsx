import React, { useRef, useEffect } from "react";

interface DisplayTextProps {
  characters: string;
  characterIndex: number;
  errors: Set<number>;
  fontSize: number;
}

const DisplayText: React.FC<DisplayTextProps> = ({
  characters,
  characterIndex,
  errors,
  fontSize,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split characters into lines with a maximum width of 72 characters
  const lines = characters.split(" ").reduce(
    (lines: string[], word) => {
      const lastLine = lines[lines.length - 1];
      if ((lastLine?.length || 0) + word.length + (lastLine ? 1 : 0) <= 72) {
        lines[lines.length - 1] += (lastLine ? " " : "") + word; // Add word to the last line
      } else {
        lines.push(word); // Start a new line
      }
      return lines;
    },
    [""]
  );

  // Calculate the current line index based on characterIndex
  const currentLineIndex = lines.findIndex((line, index) => {
    const lineStart = lines
      .slice(0, index)
      .reduce((sum, l) => sum + l.length + 1, 0); // Include spaces
    const lineEnd = lineStart + line.length;
    return characterIndex >= lineStart && characterIndex < lineEnd;
  });

  useEffect(() => {
    if (containerRef.current && currentLineIndex >= 0) {
      const targetLine = containerRef.current.querySelector(
        `[data-line-index="${currentLineIndex}"]`
      );
      targetLine?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentLineIndex]);

  // Track cumulative character positions for each line
  let cumulativePosition = 0;

  return (
    <div
      ref={containerRef}
      className="bg-white p-6 rounded-lg shadow mb-4 mt-6 font-mono leading-relaxed h-52 overflow-y-auto"
      style={{ fontSize }}
    >
      {lines.map((line, lineIndex) => {
        const lineStartPosition = cumulativePosition;
        cumulativePosition += line.length + 1; // Account for space/newline

        return (
          <div key={lineIndex} data-line-index={lineIndex} className="mb-2">
            {line.split("").map((char, charIndex) => {
              const charPosition = lineStartPosition + charIndex;
              const isCurrentChar = characterIndex === charPosition;
              const isIncorrect = errors.has(charPosition);
              const isCorrect = !isIncorrect && characterIndex > charPosition;

              return (
                <span
                  key={charIndex}
                  className={`${
                    isIncorrect
                      ? "text-red-500"
                      : isCorrect
                      ? "text-green-500"
                      : "text-gray-800"
                  } ${isCurrentChar ? "bg-yellow-200" : ""}`}
                >
                  {char}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayText;

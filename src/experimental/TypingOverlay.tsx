import React, { useState, useRef } from "react";

interface TypingTestProps {
  passage: string;
}

const TypingOverlay: React.FC<TypingTestProps> = ({ passage }) => {
  const [typedText, setTypedText] = useState("");

  const inputRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLDivElement>) => {
    const input = e.currentTarget.textContent || "";
    setTypedText(input);
  };

  const passageArray = Array.from(passage); // Convert passage to array of characters
  const typedArray = Array.from(typedText); // Convert typed text to array of characters

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="relative w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 border">
        {/* Passage Display */}
        <div
          id="testText"
          className="whitespace-pre-wrap relative w-full text-lg font-mono font-semibold text-black leading-relaxed"
        >
          {passageArray.map((char, index) => {
            const isTyped = typedArray[index]; // Check if the character has been typed
            const isCorrect = isTyped && typedArray[index] === char; // Check correctness
            const isWrong = isTyped && typedArray[index] !== char; // Check if incorrect

            return (
              <span
                key={index}
                data-index={index}
                className={`
                  ${isCorrect ? "text-green-500 font-mono" : ""}
                  ${isWrong ? "text-red-500 " : ""}
                  ${!isTyped ? "" : ""}
                `}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Invisible Input Overlay */}
        <div
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          spellCheck={false}
          className="absolute inset-0 p-6 text-transparent caret-black outline-none font-mono font-semibold text-lg"
          ref={inputRef}
        ></div>
      </div>
    </div>
  );
};

export default TypingOverlay;

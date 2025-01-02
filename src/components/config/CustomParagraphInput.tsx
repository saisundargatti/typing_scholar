import React, { useState } from "react";
import { TestConfig } from "../../types/config";
//import { paragraphsList } from "../../data/text";

interface CustomParagraphInputProps {
  value: TestConfig;
  onChange: (text: string) => void;
  onBack: () => void;
}

export const CustomParagraphInput: React.FC<CustomParagraphInputProps> = ({
  value,
  onChange,
  onBack,
}) => {
  const [error, setError] = useState("");

  const handleParagraphChange = (text: string) => {
    const wordCount = text
      .trim()
      .split(/\s+/)
      .filter((word) => word).length;

    if (wordCount > 1000) {
      setError("The paragraph exceeds the 1000-word limit.");
    } else {
      setError("");
    }

    onChange(text);
  };

  const wordCount = value.customParagraph
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;

  const handleSave = async () => {
    if (!value.customParagraphTitle.trim() && !value.customParagraph.trim()) {
      setError("Both the title and paragraph are required.");
      return;
    }
    if (!value.customParagraphTitle.trim()) {
      setError("The title is required.");
      return;
    }
    if (!value.customParagraph.trim()) {
      setError("The paragraph is required.");
      return;
    }
    if (wordCount > 1000) {
      setError("The paragraph exceeds the 1000-word limit.");
      return;
    }

    // Determine the next ID based on the previous ID
    //const newParagraph = {
    // title: value.customParagraphTitle.trim(),
    // content: value.customParagraph.trim(),
    //};

    //try {
    /* const response = await fetch(
        "http://localhost:3000/api/updateParagraphList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newParagraph),
        }
      );

      if (response.ok) {
        const updatedList = await response.json();
        setParagraphList(updatedList); // Update the state with the new list
        setError(""); // Clear errors if validation passes
        onBack(); // Navigate back to configuration
      } else {
        
      }
    } catch (error) {
      setError("An error occurred while saving the paragraph.");
    }*/

    setError("");

    onBack(); // Navigate back to configuration
  };

  return (
    <div className="space-y-4">
      <label
        htmlFor="paragraph"
        className="block text-sm font-medium text-gray-700"
      >
        Paragraph
      </label>
      <textarea
        id="paragraph"
        value={value.customParagraph}
        onChange={(e) => handleParagraphChange(e.target.value)}
        className={`w-full h-96 p-4 border rounded-lg focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "focus:ring-blue-500 focus:border-blue-500"
        }`}
        placeholder="Paste your content here"
      />
      <div className="flex flex-row justify-between">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>
            Word Count:{" "}
            <span className={wordCount > 1000 ? "text-red-500" : ""}>
              {wordCount}
            </span>
            /1000
          </p>
          {error && <p className="text-red-500 ml-5">{error}</p>}
        </div>

        <button
          onClick={handleSave}
          disabled={wordCount > 1000}
          className={`px-4 py-2 font-medium text-white rounded-lg ${
            wordCount > 1000
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

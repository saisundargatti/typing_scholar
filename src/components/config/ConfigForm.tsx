import React, { useState } from "react";
import { TestConfig } from "../../types/config";
import { ArrowLeft, Upload } from "lucide-react";
import { CustomParagraphInput } from "./CustomParagraphInput";
import { CustomParagraphTitle } from "./CustomParagraphTitle";
import { paragraphsList } from "../../data/text";

interface ConfigFormProps {
  config: TestConfig;
  onChange: (config: TestConfig) => void;
  onStartExam?: () => void;
  onCustomParagraph?: () => void;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({
  config,
  onChange,
  onStartExam,
}) => {
  const [showCustomParagraph, setShowCustomParagraph] = useState(false);
  const durations = [1, 2, 3, 5, 10, 15, 20];

  if (showCustomParagraph) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setShowCustomParagraph(false)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Configuration
        </button>

        <h3 className="text-lg font-semibold">Type Your Custom Paragraph</h3>
        <CustomParagraphTitle
          value={config.customParagraphTitle}
          onChange={(title) =>
            onChange({
              ...config,
              customParagraphTitle: title,
            })
          }
        />
        <CustomParagraphInput
          value={config}
          onChange={(text) =>
            onChange({
              ...config,
              customParagraph: text,
            })
          }
          onBack={() => setShowCustomParagraph(false)}
        />
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={config.name}
          onChange={(e) =>
            onChange({
              ...config,
              name: e.target.value.replace(/[^a-zA-Z]/g, ""),
            })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Test Duration
        </label>
        <select
          value={config.duration}
          onChange={(e) =>
            onChange({ ...config, duration: Number(e.target.value) })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {durations.map((min) => (
            <option key={min} value={min}>
              {min} Minute{min > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Paragraph Selection
        </label>
        <div className="space-y-4">
          {/* Radio Button for Default Paragraphs */}
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              checked={!config.useCustomParagraph}
              onChange={() =>
                onChange({
                  ...config,
                  useCustomParagraph: false,
                  selectedParagraphIndex: 0, // Reset to the first default paragraph
                  customParagraph: "",
                })
              }
              className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Default Paragraphs
            </span>
          </label>

          {/* Dropdown for Selecting Paragraph */}
          {!config.useCustomParagraph && (
            <select
              className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={config.selectedParagraphIndex || 0}
              onChange={(e) => {
                const selectedIndex = Number(e.target.value);
                onChange({
                  ...config,
                  selectedParagraphIndex: selectedIndex,
                });
              }}
            >
              {paragraphsList.map((item, index) => (
                <option key={index} value={index}>
                  {item.title}
                </option>
              ))}
            </select>
          )}

          {/* Radio Button for Custom Paragraph */}
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              checked={config.useCustomParagraph}
              onChange={() => onChange({ ...config, useCustomParagraph: true })}
              className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Custom Paragraph
            </span>
          </label>

          {/* Button to Add Custom Paragraph */}
          {config.useCustomParagraph && (
            <>
              {config.customParagraphTitle ? (
                // Show the saved title with some styling
                <p className="mt-2 text-lg font-semibold text-blue-700">
                  {config.customParagraphTitle}
                </p>
              ) : (
                // Show the "Add Custom Text" button when no title is set
                <button
                  type="button"
                  onClick={() => setShowCustomParagraph(true)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-2"
                >
                  <Upload className="w-4 h-4" />
                  Add Custom Text
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="block text-sm font-medium text-gray-700 ">
            Backspace
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="backspace"
              checked={config.allowBackspace}
              onChange={
                () => onChange({ ...config, allowBackspace: true }) // Enable Backspace
              }
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-base">Allow</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="backspace"
              checked={!config.allowBackspace}
              onChange={
                () => onChange({ ...config, allowBackspace: false }) // Disable Backspace
              }
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-base">Don't Allow</span>
          </label>
        </div>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={config.enableFeedback}
            onChange={(e) =>
              onChange({ ...config, enableFeedback: e.target.checked })
            }
            className="h-4 w-4 text-blue-600"
          />
          <span className="ml-2">Enable Word Feedback</span>
        </label>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Font Size</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...config,
                  fontSize: Math.max(12, config.fontSize - 1),
                })
              }
              className="px-2 py-1 border rounded-lg"
            >
              -
            </button>
            <span>{config.fontSize}px</span>
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...config,
                  fontSize: Math.min(24, config.fontSize + 1),
                })
              }
              className="px-2 py-1 border rounded-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-4 pt-6 flex-row items-center justify-center">
        <button
          type="button"
          onClick={onStartExam}
          className={`relative flex-1 py-3 rounded-lg transition-colors group ${
            config.useCustomParagraph &&
            (!config.customParagraph || !config.customParagraphTitle)
              ? "bg-blue-600 text-white  hover:bg-blue-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={
            config.useCustomParagraph &&
            (!config.customParagraph || !config.customParagraphTitle)
          }
        >
          {config.useCustomParagraph &&
          (!config.customParagraph || !config.customParagraphTitle) ? (
            <>
              <span className="block">Start Exam</span>
            </>
          ) : (
            "Start Exam"
          )}
        </button>
      </div>
    </form>
  );
};

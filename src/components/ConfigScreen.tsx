import React, { useState } from "react";
import { ClipboardList } from "lucide-react";
import { TestConfig } from "../types/config";
import { ConfigForm } from "./config/ConfigForm";
import { useNavigate } from "react-router-dom";

interface ConfigScreenProps {
  onStart: (config: TestConfig) => void;
}

export const ConfigScreen: React.FC<ConfigScreenProps> = ({ onStart }) => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<TestConfig>({
    name: "",
    duration: 1,
    useCustomParagraph: false,
    customParagraph: "",
    customParagraphTitle: "",
    allowBackspace: false,
    enableFeedback: true,
    examMode: false,
    fontSize: 18,
    selectedParagraphIndex: 0,
  });

  const handleStartExam = () => {
    onStart(config); // Pass configuration to the parent component
    navigate("/typing-test"); // Navigate to Typing Test screen
  };
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="text-center p-8 border-b">
          <div className="flex justify-center mb-4">
            <ClipboardList className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            English Typing Test
          </h1>
          <p className="text-gray-600 text-base">
            Configure your test settings to begin
          </p>
        </div>
        <div className="p-8">
          <ConfigForm
            config={config}
            onChange={setConfig}
            onStartExam={handleStartExam}
          />
        </div>
      </div>
    </div>
  );
};

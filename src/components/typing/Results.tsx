import React from "react";
import {
  ArrowRight,
  Award,
  Clock,
  Keyboard,
  Repeat,
  XCircle,
  Calculator,
  AlertTriangle,
  CheckCircle,
  SearchCheck,
} from "lucide-react";

interface ResultsProps {
  wordIndex: number;
  mistakes: Set<number>;
  duration: number; // Duration in seconds
  backspaceCount: number;
  onReset: () => void;
  typedParagraph: string;
  originalParagraph: string;
  examMode: boolean;
  omittedIndex: number[];
}

export const Results: React.FC<ResultsProps> = ({
  wordIndex,
  mistakes,
  duration,
  backspaceCount,
  onReset,
  typedParagraph,
  omittedIndex,
  originalParagraph,
}) => {
  const mistakesSize = mistakes.size;
  // Split paragraphs into words
  const typedWords = typedParagraph.split(" ");
  const errorRate = duration > 0 ? mistakesSize / duration : 0; // Default to 0 if the duration is invalid
  const formatDuration = (durationInMinutes: number) => {
    const minutes = Math.floor(durationInMinutes);
    const seconds = Math.round((durationInMinutes - minutes) * 60);

    if (minutes > 0 && seconds > 0) {
      return `${minutes} Minute(s), ${seconds} Second(s)`;
    } else if (minutes > 0) {
      return `${minutes} Minute(s)`;
    } else {
      return `${seconds} Second(s)`;
    }
  };

  // Speed and accuracy calculations
  const totalTypedCharacters = wordIndex * 5; // Assuming average word length is 5 characters
  const durationInMinutes = duration; // Convert duration to minutes
  const netSpeed =
    durationInMinutes > 0
      ? (totalTypedCharacters / 5 - mistakesSize) / durationInMinutes
      : 0;
  const grossSpeed =
    durationInMinutes > 0 ? totalTypedCharacters / 5 / durationInMinutes : 0;
  const accuracy =
    wordIndex > 0
      ? ((totalTypedCharacters / 5 - mistakesSize) /
          (totalTypedCharacters / 5)) *
        100
      : 0;

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mt-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <Award className="mr-2 text-yellow-500" />
        Typing Test Results
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormulaCard />
        <ResultCard
          title="Net Speed"
          value={`${netSpeed.toFixed(2)} WPM`}
          icon={<ArrowRight />}
        />
        <ResultCard
          title="Gross Speed"
          value={`${grossSpeed.toFixed(2)} WPM`}
          icon={<ArrowRight />}
        />
        <ResultCard
          title="Accuracy"
          value={`${accuracy.toFixed(2)}%`}
          icon={<Award />}
        />
        <ResultCard
          title="Total Words Typed"
          value={typedWords.length}
          icon={<Keyboard />}
        />
        <ResultCard
          title="Total Correct Words"
          value={Math.max(typedWords.length - mistakesSize, 0)}
          icon={<CheckCircle />}
        />
        <ResultCard
          title="Total Mistakes"
          value={mistakesSize}
          icon={<XCircle />}
        />
        <ResultCard
          title="Total Omissions"
          value={omittedIndex.length}
          icon={<XCircle />}
        />
        <ResultCard
          title="Error Rate"
          value={`${errorRate.toFixed(2)} WPM`}
          icon={<AlertTriangle />}
        />

        <ResultCard
          title="Backspace Pressed"
          value={`${backspaceCount} Times`}
          icon={<Repeat />}
        />
        <ResultCard
          title="Test Duration"
          value={`${formatDuration(duration)}`}
          icon={<Clock />}
        />
      </div>
      <MistakesBreakdown
        originalParagraph={originalParagraph}
        typedParagraph={typedParagraph}
        mistakes={mistakes}
      />
      <button
        onClick={onReset}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center w-full md:w-auto"
      >
        <Repeat className="mr-2" />
        Retry Test
      </button>
    </div>
  );
};

const ResultCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => (
  <div className="bg-gray-50 p-4 rounded-lg flex items-center">
    <div className="mr-4 text-blue-500">{icon}</div>
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const FormulaCard: React.FC = () => {
  return (
    <div className="bg-blue-100 border border-blue-400 p-6 rounded-lg shadow-lg flex items-center space-x-4 max-w-md mx-auto mt-8">
      <div className="text-blue-500">
        <Calculator className="w-12 h-12" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-blue-700 mb-2">
          Net Speed (WPM) Formula
        </h3>
        <p className="text-sm text-blue-900 leading-relaxed">
          <span className="font-bold">Net Speed (WPM)</span> = <br />
          <span className="font-mono">
            (Total Typed Characters ÷ 5 - Total Errors) ÷ Duration (minutes)
          </span>
        </p>
      </div>
    </div>
  );
};

interface MistakesBreakdownProps {
  typedParagraph: string;
  originalParagraph: string;
  mistakes: Set<number>;
}

const MistakesBreakdown: React.FC<MistakesBreakdownProps> = ({
  typedParagraph,
  originalParagraph,
  mistakes,
}) => {
  const typedWords = typedParagraph.split(" ");
  const originalWords = originalParagraph.split(" ");

  return (
    <div className=" bg-white overflow-hidden mt-6 ">
      <div className="p-8">
        <div className="tracking-wide text-xl text-indigo-500 font-semibold mb-4 flex items-center gap-2">
          <SearchCheck className="text-yellow-500" size={20} />
          <span>Typing Progress</span>
        </div>
        <div className="flex flex-wrap">
          {typedWords.map((typedWord, index) => {
            const isMistake = mistakes.has(index);
            const originalWord = originalWords[index];

            return (
              <span key={index} className="mr-3 mb-2">
                <span
                  className={`inline-block px-2 py-1 rounded transition-colors duration-200 ease-in-out ${
                    isMistake
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {typedWord || originalWord}
                </span>

                {isMistake && (
                  <span className="text-gray-500 text-base ml-1">
                    <span>({originalWord})</span>
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

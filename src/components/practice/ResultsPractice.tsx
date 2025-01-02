import React from "react";
import { Award, TrendingUp, AlertCircle, Clock, Keyboard } from "lucide-react";
import NavigateButton from "./LearnButton";

interface ResultsProps {
  mistakes: Set<number>;
  originalParagraph: string;
  userInput: string;
  elapsedTime: number;
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  subtitle,
}) => (
  <div className="bg-white rounded-lg p-4 flex items-start gap-3 border border-gray-200 hover:border-gray-300 transition-colors">
    <div className="mt-1">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  </div>
);

const ResultsPractice: React.FC<ResultsProps> = ({
  mistakes,
  originalParagraph,
  userInput,
  elapsedTime,
}) => {
  const totalTypedChars = userInput.length;
  const totalErrors = mistakes.size;
  const durationMinutes = elapsedTime / 60;
  const grossWPM = (totalTypedChars / 5 / durationMinutes).toFixed(2);
  const netWPM = (
    (totalTypedChars - totalErrors) /
    5 /
    durationMinutes
  ).toFixed(2);
  const accuracy =
    totalTypedChars > 0
      ? ((totalTypedChars - totalErrors) / totalTypedChars) * 100
      : 0;

  const mistakeMap = new Map<string, number>();
  Array.from(mistakes).forEach((index) => {
    if (index < originalParagraph.length && index < userInput.length) {
      const correctChar = originalParagraph[index];
      const wrongChar = userInput[index];
      const key = `${correctChar}>${wrongChar}`;
      mistakeMap.set(key, (mistakeMap.get(key) || 0) + 1);
    }
  });

  const topMistakes = Array.from(mistakeMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <>
      <div className="max-w-3xl mx-auto p-4 space-y-6" id="results-section">
        <h1 className="text-2xl font-semibold text-gray-900 flex flex-row items-center gap-2">
          <Award className="text-yellow-500" size={24} />
          Typing Practice Results
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            icon={<Keyboard className="w-4 h-4 text-blue-500" />}
            title="Gross WPM"
            value={grossWPM.toString()}
            subtitle="Raw typing speed"
          />
          <MetricCard
            icon={<TrendingUp className="w-4 h-4 text-green-500" />}
            title="Net WPM"
            value={parseInt(netWPM) > 0 ? netWPM.toString() : "0"}
            subtitle="Speed minus errors"
          />
          <MetricCard
            icon={<Clock className="w-4 h-4 text-indigo-500" />}
            title="Accuracy"
            value={`${accuracy.toFixed(1)}%`}
            subtitle="Correct characters"
          />
          <MetricCard
            icon={<AlertCircle className="w-4 h-4 text-red-500" />}
            title="Mistakes"
            value={totalErrors.toString()}
            subtitle="Total errors made"
          />
        </div>

        {topMistakes.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-700 mb-3">
              Common Mistakes
            </h2>
            <div className="space-y-2">
              {topMistakes.map(([key, count], index) => {
                const [correct, wrong] = key.split(">");
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm p-2 bg-white rounded border border-gray-200"
                  >
                    <span className="font-mono text-red-600">
                      {correct} → {wrong}
                    </span>
                    <span className="text-gray-600 text-xs">{count} times</span>
                    Practice typing "{correct}" correctly
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center">
        <NavigateButton />
      </div>
    </>
  );
};

export default ResultsPractice;

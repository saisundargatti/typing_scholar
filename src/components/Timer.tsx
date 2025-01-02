import React from "react";
import { formatTime } from "../utils/time";
import { Timer, RefreshCw } from "lucide-react";

interface TimerProps {
  timeLeft: number;
  duration: number;
  onReset: () => void;
  isActive: boolean;
}

export const TimerComponent: React.FC<TimerProps> = ({
  timeLeft,
  onReset,
  isActive,
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
        <Timer className="w-5 h-5 text-blue-600" />
        <span className="text-xl font-mono">{formatTime(timeLeft)}</span>
      </div>

      <button
        onClick={onReset}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        disabled={isActive}
      >
        <RefreshCw className="w-4 h-4" />
        Reset
      </button>
    </div>
  );
};

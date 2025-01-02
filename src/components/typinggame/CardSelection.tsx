import React from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Apple } from "lucide-react";

const CardSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-50">
      <h1 className="text-3xl font-extrabold m-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg ">
        Choose a Game
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full px-4 max-w-4xl">
        {/* Apple Fall Card */}
        <div
          className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-200 cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-300 group"
          onClick={() => navigate("/apple-fall")}
        >
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Apple className="h-10 w-10 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 text-center transition-colors duration-300">
              Apple Fall
            </h2>
            <p className="text-sm text-gray-500 mt-2 text-center">Word Game</p>
          </div>
        </div>

        {/* Memory Fingers Card */}
        <div
          className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-200 cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-300 group"
          onClick={() => navigate("/memory-fingers")}
        >
          <div className="flex flex-col items-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <Brain className="h-10 w-10 text-green-500 group-hover:text-green-600 transition-colors duration-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 text-center transition-colors duration-300">
              Memory Fingers
            </h2>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Test Your Memory
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSelection;

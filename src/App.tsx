import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigScreen } from "./components/ConfigScreen";
import { TypingTest } from "./components/TypingTest";
import { Exercise, TestConfig } from "./types/config";
import { TypingTestEnable } from "./components/TypingTestEnable";
import Sidebar from "./components/LearnTyping/SideBar";
import { typingExercises } from "./data/lessons";
import CharacterDisplay from "./components/LearnTyping/CharacterDisplay";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { FingerTypingGuide } from "./components/LearnTyping/Keyboard";
import {
  TypingTestPractice,
  QuickTip,
} from "./components/practice/TypingTestPractice";
import MemoryFingers from "./components/typinggame/fingermappinggame";
import CardSelection from "./components/typinggame/CardSelection";
import AppleFall from "./components/typinggame/AppleFall";
import Home from "./components/Home";
import PrivacyPolicy from "./components/privacypolicy";

export default function App() {
  const [config, setConfig] = useState<TestConfig | null>(null);

  const handleStart = (newConfig: TestConfig) => {
    setConfig(newConfig);
  };

  const handleReset = () => {
    setConfig(null);
  };

  // Update the state to use the Exercise type
  const [selectedExercise, setSelectedExercise] = useState<Exercise>(
    typingExercises.Home[0]
  );

  const handleExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/config-screen"
            element={
              <>
                <ConfigScreen onStart={handleStart} />
              </>
            }
          />
          <Route
            path="/typing-test"
            element={
              config ? (
                config.allowBackspace ? (
                  <TypingTestEnable
                    initialConfig={config}
                    onReset={handleReset}
                  />
                ) : (
                  <TypingTest initialConfig={config} onReset={handleReset} />
                )
              ) : (
                <ConfigScreen onStart={handleStart} />
              )
            }
          />
          <Route
            path="/learn-typing"
            element={
              <div className="flex min-h-screen">
                <Sidebar
                  exercises={typingExercises}
                  currentExercise={selectedExercise}
                  onExerciseSelect={handleExerciseSelect}
                />

                <div className="flex flex-col justify-center items-center w-full px-4 mt-12 ml-24">
                  <div className="flex flex-col justify-center items-center mb-4 ">
                    <CharacterDisplay
                      exercise={selectedExercise}
                      setSelectedExercise={setSelectedExercise}
                    />
                  </div>
                  <QuickTip />
                  <FingerTypingGuide />
                </div>
              </div>
            }
          />
          <Route
            path="/typing-practice"
            element={
              <div>
                <TypingTestPractice />
              </div>
            }
          />
          <Route path="/typing-games" element={<CardSelection />} />
          <Route path="/apple-fall" element={<AppleFall />} />
          <Route path="/memory-fingers" element={<MemoryFingers />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
    </Router>
  );
}

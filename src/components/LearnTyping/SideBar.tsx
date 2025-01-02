import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Exercise {
  lesson: number;
  keys: string[];
  description: string;
  exercise: string;
}

interface TypingExercise {
  [category: string]: Exercise[];
}

interface SidebarProps {
  exercises: TypingExercise;
  currentExercise: Exercise | null; // New prop for the current exercise
  onExerciseSelect: (exercise: Exercise) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  exercises,
  currentExercise,
  onExerciseSelect,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  // Use a stable map to store exercise refs
  const exerciseRefs = useRef(new Map<Exercise, HTMLLIElement>());
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory((prevCategory) => {
      if (prevCategory === category) {
        return null; // Collapse the category if it's already expanded
      } else {
        // Automatically select the first exercise in the newly expanded category
        const firstExercise = exercises[category]?.[0];
        if (firstExercise) {
          setSelectedExercise(firstExercise);
          onExerciseSelect(firstExercise);
          scrollToExercise(firstExercise);
        }
        return category;
      }
    });
  };

  const handleExerciseSelect = (exercise: Exercise, category: string) => {
    if (selectedExercise !== exercise) {
      setSelectedExercise(exercise);
    }

    if (expandedCategory !== category) {
      setExpandedCategory(category);
    }

    onExerciseSelect(exercise);
    scrollToExercise(exercise);
  };

  const scrollToExercise = (exercise: Exercise) => {
    const selectedExerciseElement = exerciseRefs.current.get(exercise);

    if (selectedExerciseElement && sidebarRef.current) {
      const { offsetTop } = selectedExerciseElement;
      const sidebarHeight = sidebarRef.current.offsetHeight || 0;

      // Ensure smooth scrolling to the selected exercise
      const scrollPosition = Math.max(0, offsetTop - sidebarHeight / 2);
      sidebarRef.current.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Automatically expand category and scroll to exercise when currentExercise changes
  useEffect(() => {
    if (currentExercise) {
      setSelectedExercise(currentExercise);

      // Find the category of the current exercise
      const category = Object.keys(exercises).find((cat) =>
        exercises[cat].includes(currentExercise)
      );

      if (category) {
        setExpandedCategory(category);
        scrollToExercise(currentExercise);
      }
    }
  }, [currentExercise, exercises]);

  // Handle empty or undefined exercises
  if (!exercises || Object.keys(exercises).length === 0) {
    return (
      <div className="w-60 h-screen bg-gray-900 text-white shadow-lg overflow-y-auto">
        <h2 className="text-xl font-semibold p-4 border-b border-gray-700">
          Typing Exercises
        </h2>
        <p className="p-4 text-gray-400">No exercises available.</p>
      </div>
    );
  }

  return (
    <div
      className="w-40 h-screen scrollable-content bg-gray-900 text-white shadow-lg overflow-y-auto fixed mt-14"
      ref={sidebarRef}
    >
      <h2 className="text-base font-mono font-semibold p-4 border-b border-gray-700 flex items-center gap-x-2">
        Typing Exercises
      </h2>
      <nav>
        {Object.entries(exercises).map(([category, categoryExercises]) => (
          <div key={category} className="mb-4">
            {/* Category Header */}
            <div
              role="button"
              aria-expanded={expandedCategory === category}
              onClick={() => toggleCategory(category)}
              tabIndex={0}
              className="flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition"
            >
              <h3 className="text-base font-medium">{category}</h3>
              {expandedCategory === category ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
            {/* Items (only visible if category is expanded) */}
            {expandedCategory === category && (
              <ul className="mt-2 space-y-2 px-4">
                {categoryExercises.map((exercise, index) => (
                  <li
                    key={index}
                    ref={(el) => el && exerciseRefs.current.set(exercise, el)}
                    onClick={() => handleExerciseSelect(exercise, category)}
                    className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition group ${
                      selectedExercise === exercise
                        ? "bg-blue-600" // Highlight selected item
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    <span className="ml-2 text-sm font-medium text-gray-200 group-hover:text-white">
                      E {exercise.lesson}. {exercise.description}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

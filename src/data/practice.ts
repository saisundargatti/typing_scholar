type TypingExercise = {
  lesson: number;
  keys: string[];
  description: string;
  exercise: string;
};

type TypingExercises = {
  [category: string]: TypingExercise[]; // Allow any string as a category name
};

export const practiceExercises: TypingExercises = {
  Paragraphs: [
    {
      lesson: 1,
      keys: ["a", "s", "d", "f", "j", "k", "l", ";"],
      description: "Focus on home row keys and basic sentence construction.",
      exercise:
        "The cat sat on the mat. Dad had a red car. Jill likes jam and milk.",
    },
    {
      lesson: 2,
      keys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      description: "Introduce the top row keys with simple sentences.",
      exercise:
        "Quick brown fox jumps over the lazy dog. We write to express our thoughts.",
    },
    {
      lesson: 3,
      keys: ["z", "x", "c", "v", "b", "n", "m"],
      description: "Practice bottom row keys with a mix of words.",
      exercise:
        "Zoom into the zone and make new moves. Cats can nap on cozy mats.",
    },
    {
      lesson: 4,
      keys: ["all letters"],
      description: "Combine all rows to form short paragraphs.",
      exercise:
        "Typing is a valuable skill in the digital age. It helps you communicate quickly and effectively. Practice daily to improve accuracy and speed.",
    },
    {
      lesson: 5,
      keys: ["all letters and symbols"],
      description: "Introduce symbols and punctuation with a short paragraph.",
      exercise:
        "Good punctuation makes writing clear: use commas, periods, and question marks! For example: 'What time is it?' or 'It's 5:00 PM.'",
    },
    {
      lesson: 6,
      keys: ["all letters, numbers, and symbols"],
      description: "Advanced typing practice with a variety of characters.",
      exercise:
        "In 2023, technology evolved rapidly. Email addresses like example@test.com and websites like www.example.com became everyday tools. Stay updated!",
    },
  ],
};

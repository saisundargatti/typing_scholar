// Utility to add an error to the errors object
const addError = (errors: IndexedErrors, index: number, errorType: string) => {
  if (!errors[index]) {
    errors[index] = []; // Initialize as an array if it doesn't exist
  }
  errors[index].push(errorType);
};

// Error detection functions
const hasAddition = (inputWord: string, referenceWord: string): boolean => {
  return inputWord !== referenceWord;
};

const hasRepetition = (
  inputWords: string[],
  referenceWords: string[]
): number[] => {
  const repetitionIndices: number[] = [];
  inputWords.forEach((word, index) => {
    if (
      index > 0 &&
      word === inputWords[index - 1] &&
      word !== referenceWords[index]
    ) {
      repetitionIndices.push(index);
    }
  });
  return repetitionIndices;
};

export const hasOmission = (inputWords: string[]): number[] => {
  const omissionIndices = inputWords
    .map((word, index) => (word === "" ? index : -1))
    .filter((index) => index !== -1);
  return omissionIndices;
};

const hasSubstitution = (input: string, correctWord: string): boolean => {
  return input !== correctWord;
};

const hasSpellingError = (input: string, referenceWord: string): boolean => {
  return input !== referenceWord;
};

const hasWrongCapitalization = (
  typedWord: string,
  referenceWord: string
): boolean => {
  return (
    typedWord.toLowerCase() === referenceWord.toLowerCase() &&
    typedWord !== referenceWord
  );
};

export const hasSpacingError = (input: string, reference: string): number => {
  const inputSpaces = input.split("").filter((char) => char === " ").length;
  const referenceSpaces = reference
    .slice(0, input.length) //upto input length
    .split("")
    .filter((char) => char === " ").length;

  return Math.abs(inputSpaces - referenceSpaces);
};

const hasPunctuationError = (
  typedWord: string,
  referenceWord: string
): boolean => {
  const typedPunctuation = typedWord.replace(/[a-zA-Z0-9]/g, "");
  const referencePunctuation = referenceWord.replace(/[a-zA-Z0-9]/g, "");
  return typedPunctuation !== referencePunctuation;
};

// Define the interface for error categories with indices as keys and arrays of error types as values
interface IndexedErrors {
  [index: number]: string[]; // Keys are indices, values are arrays of error categories
}

// Main function to check errors
export const checkErrors = (
  finalInput: string,
  referenceText: string
): IndexedErrors => {
  const inputWords = finalInput.trim().split(" ");
  const referenceWords = referenceText.split(" ");

  const errors: IndexedErrors = {};

  // Check for omissions
  const omissionIndices = hasOmission(inputWords);
  omissionIndices.forEach((index) => addError(errors, index, "omission"));

  // Check for repetitions
  const repetitionIndices = hasRepetition(inputWords, referenceWords);
  repetitionIndices.forEach((index) => addError(errors, index, "repetition"));

  // check for incomplete words
  const isIncomplete = (input: string, referenceWord: string): boolean => {
    return input.length < referenceWord.length && input !== referenceWord;
  };

  // Check other errors for each word
  inputWords.forEach((typedWord, index) => {
    const referenceWord = referenceWords[index] || "";

    // Check for addition
    if (hasAddition(typedWord, referenceWord)) {
      addError(errors, index, "addition");
    }
    // Check for substitution
    if (hasSubstitution(typedWord, referenceWord)) {
      addError(errors, index, "substitution");
    }
    // Check for spelling error
    if (hasSpellingError(typedWord, referenceWord)) {
      addError(errors, index, "spelling error");
    }
    // Check for incomplete words
    if (isIncomplete(typedWord, referenceWord)) {
      addError(errors, index, "incomplete");
    }
    // Check for capitalization error
    if (hasWrongCapitalization(typedWord, referenceWord)) {
      addError(errors, index, "capitalization");
    }
    // Check for punctuation error
    if (hasPunctuationError(typedWord, referenceWord)) {
      addError(errors, index, "punctuation");
    }
  });

  return errors;
};

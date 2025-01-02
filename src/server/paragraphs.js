import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve the current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the JSON file for persistence
const paragraphsFilePath = path.join(__dirname, "paragraphs.json");

// Load paragraphs from the JSON file or initialize with an empty array
let paragraphsList = [];
try {
  if (fs.existsSync(paragraphsFilePath)) {
    const fileContent = fs.readFileSync(paragraphsFilePath, "utf-8");
    paragraphsList = fileContent.trim() ? JSON.parse(fileContent) : [];
  }
} catch (error) {
  console.error("Error reading or parsing paragraphs.json:", error);
  paragraphsList = []; // Fallback to an empty array
}

// Function to get all paragraphs
export const getParagraphs = () => paragraphsList;

// Function to add a new paragraph and save it to the file
export const addParagraph = (newParagraph) => {
  paragraphsList.push(newParagraph);
  try {
    fs.writeFileSync(
      paragraphsFilePath,
      JSON.stringify(paragraphsList, null, 2)
    );
  } catch (error) {
    console.error("Error writing to paragraphs.json:", error);
  }
};

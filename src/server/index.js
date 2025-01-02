import express, { json } from "express";
import { getParagraphs, addParagraph } from "./paragraphs.js";
import cors from "cors";
const app = express();

app.use(json()); // Middleware to parse JSON

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// API to update the paragraph list
app.post("/api/updateParagraphList", (req, res) => {
  const newParagraph = req.body;

  if (!newParagraph.title || !newParagraph.content) {
    return res.status(400).json({ error: "Title and content are required." });
  }

  addParagraph(newParagraph); // Add the new paragraph to the list
  res.status(200).json(getParagraphs()); // Respond with the updated list
});

// API to get the paragraph list
app.get("/api/getParagraphList", (req, res) => {
  res.status(200).json(getParagraphs()); // Send the paragraph list
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

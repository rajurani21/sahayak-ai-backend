const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3010;
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Sahayak Gemini backend is running with 6 features!");
});

// 🔹 Helper function for Gemini
async function generateFromGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return { result: result.response.text() };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { result: "❌ Gemini Error: " + error.message };
  }
}

// 1️⃣ Content Generator
app.post("/content-generator", async (req, res) => {
  const { topic, grade, language } = req.body;
  const prompt = `Generate a detailed teaching content for ${topic} for grade ${grade} students in ${language}. Make it culturally relevant and easy to understand.`;
  res.json(await generateFromGemini(prompt));
});

// 2️⃣ Worksheet Creator
app.post("/worksheet-creator", async (req, res) => {
  const { topic, grade, numQuestions } = req.body;
  const prompt = `Create a worksheet with ${numQuestions} questions for grade ${grade} on the topic: ${topic}. Include a mix of multiple-choice and short answer questions.`;
  res.json(await generateFromGemini(prompt));
});

// 3️⃣ Knowledge Base
app.post("/knowledge-base", async (req, res) => {
  const { question } = req.body;
  const prompt = `Explain this concept for a teacher to teach in a simple and clear way: ${question}`;
  res.json(await generateFromGemini(prompt));
});

// 4️⃣ Visual Aid Designer
app.post("/visual-aid", async (req, res) => {
  const { topic } = req.body;
  const prompt = `Suggest a simple drawing, diagram, or chart for blackboard teaching on: ${topic}`;
  res.json(await generateFromGemini(prompt));
});

// 5️⃣ Reading Assessment
app.post("/reading-assessment", async (req, res) => {
  const { passage } = req.body;
  const prompt = `Evaluate the reading passage for clarity and difficulty for students. Suggest one comprehension question. Passage: ${passage}`;
  res.json(await generateFromGemini(prompt));
});

// 6️⃣ Lesson Planner
app.post("/lesson-planner", async (req, res) => {
  const { grade, subject } = req.body;
  const prompt = `Create a 1-week lesson plan for ${subject} for grade ${grade} students. Include daily topics and one fun activity per day.`;
  res.json(await generateFromGemini(prompt));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Sahayak backend running on port ${PORT}`);
});

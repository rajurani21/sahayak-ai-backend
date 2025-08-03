const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Load .env for API_KEY

const app = express();
const PORT = process.env.PORT || 3010;
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Sahayak Gemini backend is running!");
});

// Utility to generate AI content
async function generateAIContent(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "❌ Gemini Error: " + error.message;
  }
}

// 1️⃣ Content Generator
app.post("/content-generator", async (req, res) => {
  const { topic, grade, language } = req.body;
  if (!topic || !grade) return res.json({ result: "❌ Missing topic or grade" });

  const prompt = `Generate a ${language} lesson for grade ${grade} on ${topic}. 
Include explanation and 2 simple examples.`;
  const result = await generateAIContent(prompt);
  res.json({ result });
});

// 2️⃣ Worksheet Creator
app.post("/worksheet-creator", async (req, res) => {
  const { topic, grade, questions } = req.body;
  if (!topic || !grade || !questions) return res.json({ result: "❌ Missing details" });

  const prompt = `Create a worksheet with ${questions} questions for grade ${grade} on ${topic}. 
Include multiple-choice and short-answer questions.`;
  const result = await generateAIContent(prompt);
  res.json({ result });
});

// 3️⃣ Knowledge Base
app.post("/knowledge-base", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.json({ result: "❌ Missing question" });

  const prompt = `Explain in simple terms: ${question}`;
  const result = await generateAIContent(prompt);
  res.json({ result });
});

// 4️⃣ Visual Aid Designer
app.post("/visual-aid", async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.json({ result: "❌ Missing topic" });

  const prompt = `Suggest a simple blackboard diagram for teaching ${topic} to kids. 
Explain how to draw it step by step.`;
  const result = await generateAIContent(prompt);
  res.json({ result });
});

// 5️⃣ Reading Assessment
app.post("/reading-assessment", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.json({ result: "❌ Missing passage text" });

  const prompt = `Analyze this passage for reading difficulty and suggest improvements: 
${text}`;
  const result = await generateAIContent(prompt);
  res.json({ result });
});

// 6️⃣ Lesson Planner
app.post("/lesson-planner", async (req, res) => {
  const { grade, topic } = req.body;
  if (!grade || !topic) return res.json({ result: "❌ Missing grade or topic" });

  const prompt = `Create a 1-week lesson plan for grade ${grade} on ${topic}. 
Include daily activities and learning objectives.`;
  const result = await generateAIContent(prompt);
  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`🚀 Sahayak backend running on port ${PORT}`);
});

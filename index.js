const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3010;

// 🔐 Replace with your Gemini API key
require('dotenv').config(); // add this at top

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
 // replace hardcoded key


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Sahayak Gemini backend is running!");
});

app.post("/generate-content", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.json({ result: "❌ No prompt provided" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ result: text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.json({ result: "❌ Gemini Error: " + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Sahayak backend running on port ${PORT}`);
});

const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
// const cors = require("cors");
// app.use(cors());
const app = express();

app.use(express.json());
app.use(express.static("public")); // serve frontend

const API_KEY = process.env.OPENROUTER_API_KEY;

// API route
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();

    console.log("API RESPONSE:", data); // 👈 IMPORTANT

    if (!response.ok) {
      return res.status(500).json({
        error: data.error?.message || "API error"
      });
    }

    res.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: "Server crashed" });
  }
});
app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
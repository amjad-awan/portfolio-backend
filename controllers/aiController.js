// controllers/aiController.js
import { GoogleGenAI } from "@google/genai";
import projectModel from "../models/projectModel.js";

export const askPortfolioAI = async (req, res) => {
  try {
    let { question } = req.body;

    // Fallback if question is empty
    if (!question || question.trim() === "") {
      question = "Please introduce yourself and explain your skills and projects briefly.";
    }

    // Fetch projects
    const projects = await projectModel.find()
      .populate("photoId")
      .populate("videoId");

    // Check if there are projects
    const hasProjects = projects.length > 0;

    // Build project context if projects exist
    const projectContext = hasProjects
      ? projects
          .map(
            (p) => `Title: ${p.title}
Type: ${p.type}
Description: ${p.description}
Tech Stack: ${p.techStack?.join(", ")}
Features: ${p.feature?.join(", ")}
Link: ${p.link}`
          )
          .join("\n\n")
      : "Currently, there are no projects available.";

    // Construct the prompt for AI
    const prompt = `
You are an AI assistant for Muhammad Amjad Mehmood, a Full Stack Developer.

${hasProjects ? "Here are his projects:\n\n" + projectContext : "He currently does not have any listed projects."}

User Question:
${question}

Answer professionally and always provide a meaningful response, even if project data is missing. Focus on his skills, role, and experience and dont bold and not much lengthy.
`;

    // Initialize AI client
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Generate response
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const aiAnswer = response.text || "Sorry, I couldn't generate an answer.";

    res.json({
      success: true,
      answer: aiAnswer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "AI failed",
      error: error.message,
    });
  }
};
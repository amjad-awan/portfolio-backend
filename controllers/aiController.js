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

${hasProjects ? "Here are his past projects:\n\n" + projectContext : "He currently does not have any listed projects."}

User Question:
${question}

Instructions for AI:
- Analyze the user's question about a potential project or feature.
- Answer if Muhammad Amjad Mehmood has the skills, experience, and previous projects to complete it.
- Base your answer strictly on his technology stack, past projects, and expertise.
- If the information is insufficient, politely suggest he might be able to learn it or needs more details.
- Provide concise, professional, and meaningful responses. Avoid overly long descriptions and do not use bold.
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
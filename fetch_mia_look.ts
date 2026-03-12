import { GoogleGenAI } from "@google/genai";

async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: "Search the web for the YouTube creator 'Mia Meow AI' (@miameowai). What does she look like? Describe her physical appearance (hair color, ethnicity, style, glasses, etc.) based on her videos or social media.",
    config: {
      tools: [{ googleSearch: {} }],
    }
  });
  console.log(response.text);
}

run().catch(console.error);

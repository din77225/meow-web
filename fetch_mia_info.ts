import { GoogleGenAI } from "@google/genai";

async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: "Search the web for the YouTube channel '@miameowai' (Mia Meow). What is the channel about? What are the titles of her latest videos? What does Mia Meow look like (hair color, style, ethnicity, vibe)? Provide a concise summary.",
    config: {
      tools: [{ googleSearch: {} }],
    }
  });
  console.log(response.text);
}

run().catch(console.error);

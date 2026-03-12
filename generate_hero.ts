import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';

async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: 'A stylish Asian woman creator with long dark hair, head turned to the side, profile view, modern minimalist fashion, cinematic lighting, high quality, editorial photography, clean background.' }
      ],
    },
    config: {
      // imageConfig not fully supported on 2.5, but let's try removing it just in case
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64EncodeString = part.inlineData.data;
      const publicDir = path.join(process.cwd(), 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
      }
      fs.writeFileSync(path.join(publicDir, 'hero-mia.jpg'), Buffer.from(base64EncodeString, 'base64'));
      console.log('Image saved to public/hero-mia.jpg');
      break;
    }
  }
}

run().catch(console.error);

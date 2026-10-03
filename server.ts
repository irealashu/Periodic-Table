import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  app.use(express.json());

  // API endpoint for AI Chemistry Tutor / Insights
  app.post('/api/ai-chat', async (req, res) => {
    try {
      const { prompt, elementContext } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const systemInstruction = `You are PubChem AI Chemistry Expert, an advanced, highly rigorous scientific assistant modeled after PubChem and IUPAC standards. You provide precise, factual, peer-reviewed chemical data, explanations of quantum mechanics, electron configurations, reaction mechanisms, thermodynamic properties, and real-world industrial or biological applications. Avoid any AI fluff or vague generalities; give precise scientific numbers, formulas, and context.`;

      const fullPrompt = elementContext 
        ? `Context Element: ${JSON.stringify(elementContext)}\n\nUser Question: ${prompt}`
        : prompt;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: fullPrompt,
        config: {
          systemInstruction,
          temperature: 0.2,
        }
      });

      res.json({ text: response.text || 'No response generated.' });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({ error: err.message || 'Failed to generate AI response' });
    }
  });

  if (isProduction) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const port = process.env.PORT || 3000;
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();

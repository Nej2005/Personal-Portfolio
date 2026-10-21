import { GoogleGenAI } from '@google/genai';
import { portfolioContextPrompt } from '../src/data/portfolioContext.js';
import { portfolioData } from '../src/data/portfolioData.js';
import { projectNavLinks } from '../src/data/projectSummary.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages, message } = req.body || {};
  const userPrompt = message || (messages && messages[messages.length - 1]?.content) || '';
  const apiKey = process.env.GEMINI_API_KEY;
  const textModel = process.env.GEMINI_TEXT_MODEL || 'gemini-2.0-flash';

  if (!apiKey) {
    return res.status(200).json({
      reply: `Hello! I'm ${portfolioData.personal.name}'s AI Assistant. The assistant is currently in demo mode. Please set \`GEMINI_API_KEY\` in environment variables for live Gemini responses.`,
      model: 'demo-fallback'
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const contents = [];

    if (messages && Array.isArray(messages) && messages.length > 0) {
      for (const m of messages) {
        contents.push({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        });
      }
    } else {
      contents.push({
        role: 'user',
        parts: [{ text: userPrompt }]
      });
    }

    let response;
    try {
      response = await ai.models.generateContent({
        model: textModel,
        contents,
        config: {
          systemInstruction: portfolioContextPrompt,
          temperature: 0.7,
        }
      });
    } catch (modelErr) {
      console.warn(`Primary model ${textModel} failed, trying fallback gemini-1.5-flash...`, modelErr.message);
      response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents,
        config: {
          systemInstruction: portfolioContextPrompt,
          temperature: 0.7,
        }
      });
    }

    const replyText = response.text || "No response received.";

    // Context navigation action buttons
    const navLinks = projectNavLinks(replyText);
    const lower = replyText.toLowerCase();
    if (lower.includes('certification') || lower.includes('alibaba') || lower.includes('packetworx')) {
      navLinks.push({ label: 'View Certifications', target: '#certifications' });
    }
    if (lower.includes('careercat') || lower.includes('experience') || lower.includes('junior software developer')) {
      navLinks.push({ label: 'View Experience', target: '#experience' });
    }

    return res.status(200).json({
      reply: replyText,
      model: textModel,
      navLinks: navLinks.length > 0 ? navLinks : undefined
    });
  } catch (error) {
    console.error('API Chat Error:', error);
    return res.status(500).json({ error: error.message || 'Error processing request with Gemini.' });
  }
}

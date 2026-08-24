import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { GoogleGenAI } from '@google/genai';
import { portfolioContextPrompt } from './src/data/portfolioContext.js';
import { portfolioData } from './src/data/portfolioData.js';

// Custom Vite plugin for secure local server-side API handling
function serverlessApiPlugin(env) {
  return {
    name: 'serverless-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Handle /api/chat
        if (req.url === '/api/chat' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { messages, message } = JSON.parse(body || '{}');
              const userPrompt = message || (messages && messages[messages.length - 1]?.content) || '';
              
              const apiKey = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY;
              const textModel = process.env.GEMINI_TEXT_MODEL || env.GEMINI_TEXT_MODEL || 'gemini-3.6-flash';

              if (!apiKey) {
                // Return helpful grounded response if API key is not configured
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  reply: `Hi! I'm Nini, ${portfolioData.personal.name}'s AI Assistant.\n\nI can tell you all about Jenny's projects like the **Student Examination Management System**, **IT Helpdesk System**, and **E-Commerce Website**, technical skills in React, JavaScript, PHP, MySQL, or certifications from Alibaba Cloud & Packetworx!`,
                  model: 'nini-local',
                  navLinks: [
                    { label: 'View Projects', target: '#projects' },
                    { label: 'View Skills', target: '#skills' }
                  ]
                }));
                return;
              }

              const ai = new GoogleGenAI({ apiKey });
              
              // Build conversation history format
              const contents = [];
              if (messages && messages.length > 0) {
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
              let activeModelUsed = textModel;

              try {
                response = await ai.models.generateContent({
                  model: textModel,
                  contents: contents,
                  config: {
                    systemInstruction: portfolioContextPrompt,
                    temperature: 0.7,
                  }
                });
              } catch (primaryErr) {
                // Try fallback models gracefully
                const candidateModels = ['gemini-3.6-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
                for (const cand of candidateModels) {
                  if (cand === textModel) continue;
                  try {
                    response = await ai.models.generateContent({
                      model: cand,
                      contents: contents,
                      config: {
                        systemInstruction: portfolioContextPrompt,
                        temperature: 0.7,
                      }
                    });
                    activeModelUsed = cand;
                    break;
                  } catch (candErr) {
                    // continue to next candidate
                  }
                }
              }

              let replyText = response?.text;

              // If API generation failed or returned empty, provide grounded offline fallback response
              if (!replyText) {
                const p = (userPrompt || '').toLowerCase();
                if (p.includes('project') || p.includes('built') || p.includes('system')) {
                  replyText = "Jenny has built several practical systems:\n\n1. **Student Examination Management System** (React, Node.js, MySQL) — An automated web platform for administering and evaluating student exams.\n2. **IT Helpdesk System** (React, Laravel, MySQL) — A ticketing platform for logging and dispatching hardware/software support.\n3. **E-Commerce Website** (HTML/CSS, JavaScript, PHP, MySQL) — A dynamic shopping portal with cart and checkout workflows.\n4. **AI Portfolio Assistant** — An interactive assistant powered by Gemini API.";
                } else if (p.includes('github') || p.includes('git') || p.includes('repo')) {
                  replyText = "Jenny maintains two active GitHub profiles:\n\n- **Personal GitHub** (@Nej2005): Personal builds & capstone systems.\n- **School / Academic GitHub** (@jennyH25): Coursework and university projects.\n\nYou can access both from the Hero section or Contact links below!";
                } else if (p.includes('contact') || p.includes('phone') || p.includes('email') || p.includes('hire')) {
                  replyText = `You can reach Jenny directly via:\n\n- **Email**: ${portfolioData.personal.email}\n- **Phone (Primary)**: ${portfolioData.personal.phone}\n- **Phone (Secondary)**: ${portfolioData.personal.secondaryPhone || 'Available upon request'}\n- **Location**: ${portfolioData.personal.location}`;
                } else if (p.includes('certification') || p.includes('certificate')) {
                  replyText = "Jenny holds credentials from:\n\n- **Alibaba Cloud Academy**: Vibe Coding Pro (AI-Driven Coding)\n- **PhilDev & Alibaba Cloud**: SHE++ Masterclass\n- **Packetworx & KadaKareer**: IoT & LoRaWAN Workshop Series\n- **iSITE**: The Future of the Digital Era";
                } else {
                  replyText = `Hi! I'm Nini, ${portfolioData.personal.name}'s AI Assistant. Jenny is a 4th-year BSIT student at Pamantasan ng Lungsod ng Pasig. Feel free to ask about her projects, tech stack (React, PHP, MySQL, JavaScript), certifications, or contact info!`;
                }
                activeModelUsed = 'nini-grounded';
              }

              // Detect project navigation triggers
              const navLinks = [];
              const lower = replyText.toLowerCase();
              if (lower.includes('student examination') || lower.includes('student portal') || lower.includes('examination management')) {
                navLinks.push({ label: 'View Student Portal', target: '#projects' });
              }
              if (lower.includes('helpdesk') || lower.includes('it support')) {
                navLinks.push({ label: 'View IT Helpdesk', target: '#projects' });
              }
              if (lower.includes('e-commerce') || lower.includes('online store')) {
                navLinks.push({ label: 'View E-Commerce Website', target: '#projects' });
              }
              if (lower.includes('certification') || lower.includes('alibaba') || lower.includes('packetworx')) {
                navLinks.push({ label: 'View Certifications', target: '#certifications' });
              }

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                reply: replyText,
                model: activeModelUsed,
                navLinks: navLinks.length > 0 ? navLinks : undefined
              }));
            } catch (err) {
              // Return safe response without crash
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                reply: `Hi! I'm Nini, ${portfolioData.personal.name}'s AI assistant. Ask me anything about Jenny's software projects, technical skills, or certifications!`,
                model: 'nini-fallback'
              }));
            }
          });
          return;
        }

        // Handle /api/tts
        if (req.url === '/api/tts' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { text } = JSON.parse(body || '{}');
              const apiKey = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY;
              const voiceName = process.env.GEMINI_TTS_VOICE || env.GEMINI_TTS_VOICE || 'Kore';

              if (!apiKey) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not set. Using browser speech fallback.' }));
                return;
              }

              // Return success status or audio payload
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                status: 'ready',
                voice: voiceName,
                text: text
              }));
            } catch (err) {
              console.error('Gemini TTS API Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      serverlessApiPlugin(env)
    ],
    server: {
      port: 5173,
      open: false,
      watch: {
        ignored: ['**/*.tmp', '**/*.~tmp', '**/projects_thumbnail/*.tmp', '**/projects_thumbnail/*.~tmp']
      }
    },
  };
});

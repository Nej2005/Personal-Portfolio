export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { text } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY;
  const voiceName = process.env.GEMINI_TTS_VOICE || 'Kore';

  if (!apiKey) {
    return res.status(400).json({ error: 'GEMINI_API_KEY is not set. Using browser speech fallback.' });
  }

  try {
    return res.status(200).json({
      status: 'ready',
      voice: voiceName,
      text: text
    });
  } catch (error) {
    console.error('API TTS Error:', error);
    return res.status(500).json({ error: error.message || 'Error processing TTS.' });
  }
}

import { projectListMarkdown } from '../data/projectSummary';

export async function sendChatMessage(messages, activeQuestion) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        message: activeQuestion
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Server responded with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('aiService sendChatMessage error:', error);
    return {
      reply: getOfflineFallbackResponse(activeQuestion),
      model: 'local-fallback',
      navLinks: [
        { label: 'View Projects', target: '#projects' },
        { label: 'View Skills', target: '#skills' }
      ]
    };
  }
}

function getOfflineFallbackResponse(prompt) {
  const p = (prompt || '').toLowerCase();
  if (p.includes('who are you') || p.includes('your name') || p.includes('nini')) {
    return "Hi! I'm **Nini**, Jenny's AI portfolio assistant. I can help you learn all about her projects, backend development skills, academic achievements, and certifications.";
  }
  if (p.includes('experience') || p.includes('careercat') || p.includes('job') || p.includes('company') || p.includes('role')) {
    return "Jenny is currently working as a **Junior Software Developer (Contract)** at **CareerCat** (September 2026 – Present).\n\nCareerCat is an automated job-application platform that helps candidates discover opportunities and automatically completes live employer application forms in real browsers. Jenny focuses on:\n- Developing browser helper extensions and userscripts for live employer form autofilling\n- Building and maintaining automation workflows in NocoBase\n- Writing Node.js tools and scripts\n- Managing and querying data in PostgreSQL\n- Conducting live in-browser testing and dynamic selector configurations.";
  }
  if (p.includes('project') || p.includes('built') || p.includes('work') || p.includes('system')) {
    return `Jenny has built these projects:\n\n${projectListMarkdown()}`;
  }
  if (p.includes('technology') || p.includes('skill') || p.includes('language') || p.includes('tool')) {
    return "Jenny specializes in backend development and full-stack technologies:\n\n- **Programming Languages**: JavaScript, PHP, Java, SQL, Python, C#\n- **Developer Tools**: VS Code, Git & GitHub, MySQL, Figma, Postman, Docker\n\nShe focuses on writing clean, maintainable code and solving real-world challenges.";
  }
  if (p.includes('github') || p.includes('git') || p.includes('repo') || p.includes('account')) {
    return "Jenny maintains two active GitHub profiles:\n\n1. **Personal GitHub** (@Nej2005): Personal builds, AI assistant applications, and capstone systems.\n2. **School / Academic GitHub** (@jennyH25): University coursework and academic team repositories.\n\nYou can explore both from the Hero section or Contact section below!";
  }
  if (p.includes('certification') || p.includes('certificate')) {
    return "Jenny holds verified credentials and workshop completions including:\n\n- **Alibaba Cloud Academy: Vibe Coding Pro (AI-Driven Coding)** (2025–2028)\n- **SHE++ Masterclass on Alibaba Cloud System** (PhilDev & Alibaba Cloud, 2025)\n- **iSITE: The Future of the Digital Era** (2025)\n- **SHE++ Workshop Series: Leadership, Design Thinking & Strategic Foresight** (PhilDev & Wells Fargo, 2025)\n- **Packetworx & KadaKareer: IoT & LoRaWAN Workshop Series (Sessions 1–3)** (2026)";
  }
  if (p.includes('hire') || p.includes('why') || p.includes('contact')) {
    return "Jenny is a dedicated 4th-year BSIT student at Pamantasan ng Lungsod ng Pasig (President's Lister) working toward becoming a backend developer. She has hands-on experience across databases, APIs, and modern frontends.\n\nYou can reach her via email at **jennypatanag@gmail.com** or phone at **+63 9175045559** / **+63 9603829786**.";
  }
  return "Hi! I'm Nini, Jenny's AI assistant. She is a 4th-year BSIT student at Pamantasan ng Lungsod ng Pasig passionate about backend systems and building functional software. Feel free to ask about her projects, technical stack, or certifications!";
}

let currentUtterance = null;
let cachedVoices = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices() || [];
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices() || [];
  };
}

const femaleVoiceKeywords = [
  'zira',
  'jenny',
  'aria',
  'samantha',
  'victoria',
  'karen',
  'susan',
  'hazel',
  'catherine',
  'clara',
  'sonia',
  'natasha',
  'libby',
  'neerja',
  'fiona',
  'tessa',
  'stephanie',
  'moira',
  'female',
  'woman'
];

const maleVoiceKeywords = [
  'david',
  'mark',
  'george',
  'richard',
  'guy',
  'stefan',
  'paul',
  'male',
  'man',
  'boy',
  'james',
  'steve',
  'daniel',
  'oliver',
  'brian',
  'christopher',
  'eric'
];

function getSoftFemaleVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = (cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices()) || [];
  if (voices.length === 0) return null;

  const topFemaleVoice = voices.find(v => {
    const name = (v.name || '').toLowerCase();
    const isMale = maleVoiceKeywords.some(m => name.includes(m));
    if (isMale) return false;
    return femaleVoiceKeywords.some(f => name.includes(f));
  });

  if (topFemaleVoice) return topFemaleVoice;

  const nonMaleEnglishVoice = voices.find(v => {
    const name = (v.name || '').toLowerCase();
    const lang = (v.lang || '').toLowerCase();
    const isEnglish = lang.startsWith('en') || lang.startsWith('fil');
    const isMale = maleVoiceKeywords.some(m => name.includes(m));
    return isEnglish && !isMale;
  });

  if (nonMaleEnglishVoice) return nonMaleEnglishVoice;

  return voices.find(v => {
    const name = (v.name || '').toLowerCase();
    return !maleVoiceKeywords.some(m => name.includes(m));
  }) || voices[0] || null;
}

export function speakText(text, onStart, onEnd, onError) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onError) onError(new Error('Speech synthesis is not supported on this browser.'));
    return;
  }

  stopSpeaking();

  const cleanText = text
    .replace(/[#*`_~[\]()]/g, '')
    .replace(/\n+/g, '. ')
    .replace(/\s+/g, ' ')
    .trim();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  
  utterance.rate = 0.92;
  utterance.pitch = 1.22;
  utterance.lang = 'en-US';

  const softVoice = getSoftFemaleVoice();
  if (softVoice) {
    utterance.voice = softVoice;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (err) => {
    currentUtterance = null;
    if (onError) onError(err);
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

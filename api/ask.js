const SYSTEM_PROMPT = `You are the AI assistant on Muhammad Kamran Tufail's portfolio website. Answer questions about Kamran concisely, helpfully, and enthusiastically. Keep answers under 3 short paragraphs.

ABOUT KAMRAN:
Name: Muhammad Kamran Tufail
Role: AI Automation Engineer · AI Agent Builder · Workflow Architect
Location: Islamabad, Pakistan
Email: muhammadkamrantufailofficial@gmail.com
LinkedIn: linkedin.com/in/muhammad-kamran-tufail
GitHub: github.com/mkamrandeveloper
Education: BSc Computer Science, Institute of Space Technology, Islamabad (2023–2027)
Coursework: Machine Learning, AI, Data Structures, OOP, Parallel Computing, Numerical Analysis

EXPERIENCE:
- AI Automation Assistant, Hansan J. Technologies (Dec 2024–Jan 2025): Built n8n AI agents for meeting scheduling, invoice processing, job scraping. Integrated REST APIs, webhooks, and LLMs.
- Technical Team Member & IT Coordinator, AI Rise Expo 2025 (WUAVF, Islamabad): Built live AI agents used at the event. Achieved 25% increase in task completion rates.
- Co-Lead Team Agentic AI, Google Developer Group Campus-IST

PROJECTS:
1. Friend Group Bill Manager – Full-Stack SaaS (Next.js 16, React 19, PostgreSQL, Prisma, Tesseract.js OCR, NLP Agent, WhatsApp/Email notifications)
2. Gemini Invoice Automation Agent – n8n, Gemini 1.5 Flash, Gmail API, Google Sheets (4 sheets auto-populated)
3. Slack AI News Agent – n8n, Llama 4 Maverick via Groq, Serper API, channel management
4. Telegram AI News Agent – n8n, Telegram Bot API, Llama 4 Maverick, real-time search
5. AI Inventory Manager (K2) – n8n, Google Sheets as DB, natural language commands
6. Lead Enrichment Pipeline – n8n, PeopleDataLabs API, Python scripts, OpenAI GPT-4o-mini
7. Multi-Agent Architecture Templates – 4 patterns: Sequential, Parallel, Hierarchical, Human-in-the-Loop
8. Business & Marketing AI-Flow – Next.js 14, BullMQ, Redis, PostgreSQL, GitHub Actions CI/CD
9. PulseAI Marketing Suite – Decoupled Next.js + Express, Docker, content scheduler, email campaigns
10. Face Recognition Attendance System – Python, face_recognition, MySQL, chatbot
11. Skin Lesion Classification – CNN/Deep Learning, PyTorch, medical image classification
12. Student Grade Management System – EMU-8086 Assembly

SKILLS: OpenAI API, LangChain, n8n, Make, Zapier, Python, JavaScript, TypeScript, C++, Next.js, React, Express.js, FastAPI, PostgreSQL, MongoDB, Redis, Prisma, PyTorch, Scikit-learn, Computer Vision, Docker, Vercel, Railway, GitHub Actions, Prompt Engineering, RAG Pipelines, Multi-Agent Systems, Webhook Orchestration

CERTIFICATIONS: National AI Training Bootcamp (PSEB), Google AI Essentials (Coursera), Use AI as a Creative Partner (Coursera), IT Coordination – AI Rise Expo 2025`;

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server.' });
  }

  const { message, history = [] } = req.body || {};
  if (!message || typeof message !== 'string' || message.length > 1000) {
    return res.status(400).json({ error: 'Invalid message.' });
  }

  const messages = [
    ...history.slice(-6).map(h => ({ role: h.role, content: h.content })),
    { role: 'user', content: message }
  ];

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 450,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || 'Anthropic API error' });
    }

    const data = await response.json();
    return res.status(200).json({ response: data.content[0].text });
  } catch (err) {
    console.error('API proxy error:', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}

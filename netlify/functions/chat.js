import { GoogleGenAI } from '@google/genai';

// Models are tried in order. If one is overloaded (503/429) it is retried,
// then the next model is used. If one is unavailable (404) it is skipped.
const MODELS = [ 'gemini-3.5-flash-lite','gemini-3.8-flash', 'gemini-3.1-flash-lite'];
const MAX_ATTEMPTS_PER_MODEL = 2;
const MAX_HISTORY_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 2000;

// Netlify functions time out after ~10s by default (26s max on some plans).
// Stop retrying before the platform kills the function.
const TIME_BUDGET_MS = 8500;

// Company knowledge base
const COMPANY_CONTEXT = `You are a helpful AI assistant for PT. Multi Agronabatindo Niaga (PT. MAN), a professional palm oil trading company in Indonesia.

COMPANY INFORMATION:
- Full Name: PT. Multi Agronabatindo Niaga
- Established: March 4, 1999
- Industry: Palm Oil Trading & Distribution
- Location: Medan, North Sumatra, Indonesia

LEGAL INFORMATION:
- Akta Pendirian: No. 02 - 04 Maret 1999
- Daftar Perseroan: C-10726 HT.01.01 TH.99
- NIB: 1801230035033
- NPWP: 01.906.860.0-123.000

OFFICES:
Registered Office:
- Address: Jl. Kapten Muslim Komp. Ruko Tata Plaza Blok B No. 15, Kel. Dwi Kora, Kec. Medan Helvetia, Kota Medan 20123, Sumatera Utara
- Email: man@multiagroniaga.com

Main Office:
- Address: Jl. Putri Hijau Komp. Graha Niaga Blok C 11 Lantai – 3, Medan 20114, Sumatera Utara
- Phone: 061 - 4555092
- Email: man@multiagroniaga.com

PRODUCTS & SERVICES:
1. Crude Palm Oil (CPO) Trading
   - High-quality palm oil for various industries
   - Bulk trading and export services

2. Palm Kernel Products
   - Palm kernel oil
   - Palm kernel meal

3. Plasma Plantation Partnership
   - Collaboration with local farmers
   - Sustainable plantation management

4. Export Services
   - International shipping
   - Documentation and logistics

5. Distribution Services
   - Regional distribution network
   - Warehousing and storage

COMPANY VALUES:
- Quality: Premium palm oil products
- Sustainability: Environmentally responsible practices
- Partnership: Long-term business relationships
- Reliability: Consistent supply and delivery

CONTACT:
- For inquiries: man@multiagroniaga.com
- Phone: 061 - 4555092
- Website: Available 24/7 for business inquiries

When answering questions:
1. Be professional and courteous
2. Provide accurate information about the company
3. If asked about pricing, explain that it varies based on volume, destination, and market conditions - suggest contacting the sales team
4. For complex inquiries, recommend contacting the company directly
5. Always maintain a B2B professional tone
6. If you don't know something specific, acknowledge it and suggest contacting the company
7. Keep responses concise but informative (2-4 sentences unless more detail is needed)
8. IMPORTANT: Do NOT use markdown formatting (no **, *, __, _, etc.). Write in plain text only.`;

// ---------- Helpers ----------

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Google side overloaded or rate limited: worth retrying
const isBusy = (err) =>
  [429, 500, 503, 504].includes(err && err.status) ||
  /503|429|overloaded|high demand|unavailable/i.test((err && err.message) || '');

// Model missing or no longer available to this key: skip to next model
const isMissing = (err) =>
  (err && err.status) === 404 ||
  /404|not found|no longer available/i.test((err && err.message) || '');

async function generateWithFallback(genAI, prompt, startedAt) {
  let lastError;

  for (const modelName of MODELS) {
    for (let attempt = 0; attempt < MAX_ATTEMPTS_PER_MODEL; attempt++) {
      if (Date.now() - startedAt > TIME_BUDGET_MS) {
        throw lastError || new Error('503 time budget exceeded');
      }

      try {
        const result = await genAI.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction: COMPANY_CONTEXT,
            maxOutputTokens: 1000,
            temperature: 0.7,
            httpOptions: { retryOptions: { attempts: 1 } },
          },
        });
        console.log(`Answered by ${modelName} (attempt ${attempt + 1})`);
        return result.text;
      } catch (err) {
        lastError = err;
        console.warn(
          `${modelName} attempt ${attempt + 1} failed:`,
          Number.isInteger(err?.status) ? err.status : 'unknown status'
        );

        if (isMissing(err)) break; // go to next model
        if (!isBusy(err)) throw err; // real error (bad key, bad request...), stop

        // short backoff with jitter: ~0.6s, 1.2s
        await sleep(600 * 2 ** attempt + Math.random() * 200);
      }
    }
  }

  throw lastError || new Error('No model available');
}

function buildPrompt(message, conversationHistory) {
  let prompt = '';

  conversationHistory.slice(-MAX_HISTORY_MESSAGES).forEach((msg) => {
    if (!msg || typeof msg.content !== 'string') return;
    const content = msg.content.slice(0, MAX_MESSAGE_LENGTH);
    if (msg.role === 'user') {
      prompt += `User: ${content}\n`;
    } else if (msg.role === 'assistant') {
      prompt += `Assistant: ${content}\n`;
    }
  });

  prompt += `User: ${message}\nAssistant:`;
  return prompt;
}

// ---------- Handler ----------

export default async (request) => {
  const startedAt = Date.now();

  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*', // consider restricting to your site's domain
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  const reply = (status, payload) => Response.json(payload, { status, headers });

  // Handle preflight request
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    return reply(405, { error: 'Method not allowed' });
  }

  try {
    // Parse request body
    let body;
    try {
      body = JSON.parse((await request.text()) || '{}');
    } catch {
      return reply(400, { error: 'Invalid JSON body' });
    }

    const { message, conversationHistory = [] } = body ?? {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return reply(400, { error: 'Message is required' });
    }

    if (!Array.isArray(conversationHistory)) {
      return reply(400, { error: 'conversationHistory must be an array' });
    }

    const genAI = new GoogleGenAI({});
    const prompt = buildPrompt(message.trim().slice(0, MAX_MESSAGE_LENGTH), conversationHistory);
    const assistantMessage = await generateWithFallback(genAI, prompt, startedAt);

    return reply(200, {
      message: assistantMessage,
      conversationId: Date.now().toString(),
    });
  } catch (error) {
    console.error('Chat error:', Number.isInteger(error?.status) ? error.status : 'unknown status');

    if (isBusy(error)) {
      return reply(503, {
        error:
          'Our AI assistant is busy right now. Please try again in a few seconds, or contact man@multiagroniaga.com.',
      });
    }

    return reply(500, {
      error:
        'Something went wrong while processing your message. Please try again or contact man@multiagroniaga.com.',
    });
  }
};

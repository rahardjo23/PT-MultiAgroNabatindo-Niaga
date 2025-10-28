import { GoogleGenerativeAI } from '@google/generative-ai';

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
Head Office:
- Address: Jl. Kapten Muslim Komp. Ruko Tata Plaza Blok B No. 15, Kel. Dwi Kora, Kec. Medan Helvetia, Kota Medan 20123, Sumatera Utara
- Email: man@multiagroniaga.com

Branch Office:
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

export default async (req, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers }
    );
  }

  try {
    // Parse request body
    const body = await req.json();
    const { message, conversationHistory = [] } = body;

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers }
      );
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

    // Build conversation history for Gemini
    let conversationText = COMPANY_CONTEXT + '\n\nConversation History:\n';

    conversationHistory.forEach(msg => {
      if (msg.role === 'user') {
        conversationText += `User: ${msg.content}\n`;
      } else if (msg.role === 'assistant') {
        conversationText += `Assistant: ${msg.content}\n`;
      }
    });

    conversationText += `\nUser: ${message}\nAssistant:`;

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
    const result = await model.generateContent(conversationText);
    const response = result.response;
    const assistantMessage = response.text();

    return new Response(
      JSON.stringify({
        message: assistantMessage,
        conversationId: Date.now().toString()
      }),
      { status: 200, headers }
    );

  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process chat message',
        details: error.message
      }),
      { status: 500, headers }
    );
  }
};

export const config = {
  path: '/api/chat'
};

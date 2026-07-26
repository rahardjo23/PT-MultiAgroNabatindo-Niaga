import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

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

    res.json({
      message: assistantMessage,
      conversationId: Date.now().toString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PT. MAN Chat API is running' });
});

app.listen(port, () => {
  console.log(`🤖 PT. MAN Chat API running on http://localhost:${port}`);
  console.log(`📡 Ready to serve AI-powered chat!`);
});
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! 👋 I\'m here to help you learn about PT. Multi Agronabatindo Niaga. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message to chat
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Prepare conversation history for API
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Call backend API (Netlify Function)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      const responseText = await response.text();
      let data = null;

      if (responseText.trim()) {
        if (contentType.includes('application/json')) {
          try {
            data = JSON.parse(responseText);
          } catch {
            throw new Error('Server returned invalid JSON');
          }
        } else {
          throw new Error(responseText.slice(0, 200) || `Server error (${response.status})`);
        }
      }

      if (!response.ok) {
        const isProxyOrServerDown =
          !responseText.trim() || response.status === 502 || response.status === 504;

        if (isProxyOrServerDown) {
          throw new Error(
            'Unable to reach the chat service. In local development, run `npm run server` alongside `npm run dev`, and ensure GEMINI_API_KEY is set in .env.'
          );
        }

        throw new Error(data?.details || data?.error || `Failed to get response (${response.status})`);
      }

      if (!data?.message) {
        throw new Error('Server returned an empty response');
      }

      // Add assistant response
      const assistantMessage = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Chat error:', error);

      const isNetworkError = error.message === 'Failed to fetch';
      const errorDetail = isNetworkError
        ? 'Unable to reach the chat service. In local development, run `npm run server` alongside `npm run dev`.'
        : error.message;

      const errorMessage = {
        role: 'assistant',
        content: `I apologize, but I'm having trouble connecting right now.${errorDetail ? ` (${errorDetail})` : ''} Please try again or contact us directly at man@multiagroniaga.com`,
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Quick question suggestions
  const quickQuestions = [
    "What products do you offer?",
    "Tell me about your company",
    "How can I become a partner?",
    "What are your export services?"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-emerald-800 text-white p-3 sm:px-4 sm:py-3.5 rounded-sm border border-emerald-900/20 shadow-md shadow-gray-900/10 hover:bg-emerald-900 transition-colors duration-300 z-[60] flex items-center gap-2 group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-5 h-5 sm:w-5 sm:h-5" />
          <span className="hidden md:inline-block text-sm font-semibold">
            Chat with us
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-96 bg-white border border-gray-200 rounded-sm shadow-lg shadow-gray-900/10 z-[60] flex flex-col font-sans transition-all ${
          isMinimized ? 'h-16' : 'h-[85vh] sm:h-[600px] max-h-[600px]'
        }`}>
          {/* Header */}
          <div className="bg-emerald-800 text-white px-4 py-3.5 border-b border-emerald-900/30 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-base sm:text-lg font-semibold truncate">PT. MAN Assistant</h3>
                <p className="text-[11px] sm:text-xs text-emerald-100/90">Company inquiries</p>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-emerald-900/60 p-2 rounded-sm transition-colors duration-300"
                aria-label={isMinimized ? "Expand" : "Minimize"}
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-emerald-900/60 p-2 rounded-sm transition-colors duration-300"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] rounded-sm px-3.5 py-2.5 sm:px-4 sm:py-3 ${
                        msg.role === 'user'
                          ? 'bg-emerald-800 text-white'
                          : msg.isError
                          ? 'bg-red-50 text-red-900 border border-red-200'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      <p className={`text-[10px] sm:text-xs mt-1.5 ${
                        msg.role === 'user' ? 'text-emerald-100/80' : 'text-gray-500'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-sm px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Questions (only show at start) */}
                {messages.length === 1 && !isLoading && (
                  <div className="space-y-2 pt-1">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Quick questions</p>
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="w-full text-left text-sm p-3 bg-white hover:bg-emerald-50/40 border border-gray-200 hover:border-emerald-800 text-gray-700 hover:text-emerald-900 rounded-sm transition-colors duration-300"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    rows="1"
                    disabled={isLoading}
                    className="flex-1 resize-none border border-gray-300 rounded-sm px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-800 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-300"
                    style={{ maxHeight: '100px', fontSize: '16px' }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-emerald-800 text-white p-3 rounded-sm hover:bg-emerald-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 border border-emerald-900/20"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 mt-2 text-center">
                  Press Enter to send
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ChatWidget;

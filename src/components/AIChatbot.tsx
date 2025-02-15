/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiRobot2Line, RiSendPlaneFill, RiCloseLine } from "react-icons/ri";

const CHATBASE_API_KEY = process.env.NEXT_PUBLIC_CHATBASE_API_KEY;
const CHATBOT_ID = process.env.NEXT_PUBLIC_CHATBOT_ID;

interface Message {
  type: 'user' | 'bot';
  content: string;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'bot', 
      content: "Welcome to Agentia World! I'm your AI assistant. How can I help you today?" 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const cleanup = () => {
      const frames = document.querySelectorAll('iframe[src*="chatbase"]');
      frames.forEach(frame => frame.remove());
    };

    return cleanup;
  }, []);

  const handleToggle = () => {
    if (isOpen) {
      const frames = document.querySelectorAll('iframe[src*="chatbase"]');
      frames.forEach(frame => frame.remove());
      setIframeLoaded(false);
    }
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "I apologize, but I'm having trouble connecting. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-[60] w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-cyber-blue to-neon-purple rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="absolute inset-0.5 rounded-full bg-black flex items-center justify-center group-hover:bg-black/90 transition-colors">
          <RiRobot2Line className="text-xl md:text-2xl text-white" />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[70]"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed bottom-[20px] right-[20px] w-[90vw] sm:w-[400px] h-[500px] bg-black border border-white/10 rounded-2xl shadow-2xl z-[80] overflow-hidden"
            >
              {/* Glowing Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(0,246,255,0.1),transparent_50%)]" />
              </div>

              {/* Chat Header */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-cyber-blue to-neon-purple p-0.5">
                <div className="bg-black/90 px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyber-blue to-neon-purple p-0.5">
                      <div className="w-full h-full rounded-[6px] bg-black flex items-center justify-center">
                        <RiRobot2Line className="text-lg text-white" />
                      </div>
                    </div>
                    <h3 className="text-white font-bold">Agentia AI Assistant</h3>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                  >
                    <RiCloseLine className="text-2xl" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-full overflow-y-auto pt-16 pb-20 px-4 relative">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-0.5 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-cyber-blue to-neon-purple'
                            : 'bg-white/10'
                        }`}
                      >
                        <div className={`rounded-[14px] p-3 ${
                          message.type === 'user'
                            ? 'bg-black/90'
                            : 'bg-black/50'
                        }`}>
                          <p className="text-white/90 text-sm">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-0.5 rounded-2xl bg-white/10">
                        <div className="rounded-[14px] p-3 bg-black/50">
                          <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-cyber-blue animate-bounce" />
                            <div className="w-2 h-2 rounded-full bg-neon-purple animate-bounce [animation-delay:0.2s]" />
                            <div className="w-2 h-2 rounded-full bg-cyber-green animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Chat Input */}
              <form
                onSubmit={handleSubmit}
                className="absolute bottom-0 left-0 right-0 p-4 bg-black/90 border-t border-white/10"
              >
                <div className="relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full bg-white/5 text-white rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-cyber-blue border border-white/10"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gradient-to-r from-cyber-blue to-neon-purple p-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    <div className="w-full h-full rounded-[6px] bg-black flex items-center justify-center">
                      <RiSendPlaneFill className="text-lg text-white" />
                    </div>
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot; 
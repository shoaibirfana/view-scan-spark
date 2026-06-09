import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "19413050102";

const SYSTEM_PROMPT = `You are the friendly support assistant for Team Ecomify, a premium eCommerce growth agency. Answer questions helpfully and concisely (2-4 sentences max). Always stay on topic about Team Ecomify's services. At the end of every response, if relevant, suggest the user contact on WhatsApp: +1 (941) 305-0102.

Company info:
- CEO: Muaz Tanzeel, 4+ years experience
- Stats: 300+ clients, $5.6M+ revenue generated, 180K+ orders, $800K+ ad spend managed
- Services: Amazon Store Management & FBA, Shopify Store Development, TikTok Shop Setup, eBay Seller Account Setup, LLC Formation & EIN Number, Trademark & Brand Registry, Product Sourcing from China, Suspended Account Recovery, Amazon PPC & Advertising, Walmart Marketplace Setup, Product Photography, Social Media Marketing
- Consultancy: $50/session, 45-60 min, includes strategy review, niche analysis, account health tips, ad audit, brand guidance, 30-day growth plan
- Contact: WhatsApp +1 (941) 305-0102, Email hello@teamecomify.com, Address: 1411 Upland Dr, Houston, TX 77043
- Website: teamecomify.com`;

type Message = { role: "bot" | "user"; text: string };
type APIMessage = { role: "user" | "assistant"; content: string };

const initialOptions = [
  { id: "expert", label: "🗣️ Talk to an Expert" },
  { id: "learn", label: "📋 Learn About Us" },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 Welcome to Team Ecomify. How can I help you today?" },
  ]);
  const [conversationHistory, setConversationHistory] = useState<APIMessage[]>([]);
  const [showInitialOptions, setShowInitialOptions] = useState(true);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const addMessage = (role: "bot" | "user", text: string) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

  const handleAIMessage = async (userText: string) => {
    setShowInitialOptions(false);
    addMessage("user", userText);
    setIsLoading(true);

    const newHistory: APIMessage[] = [...conversationHistory, { role: "user", content: userText }];
    setConversationHistory(newHistory);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newHistory,
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "I'm having trouble connecting. Please WhatsApp us directly at +1 (941) 305-0102";
      setIsLoading(false);
      addMessage("bot", reply);
      setConversationHistory((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setIsLoading(false);
      addMessage("bot", "I'm having trouble connecting. Please WhatsApp us directly at +1 (941) 305-0102");
    }
  };

  const handleOption = (id: string) => {
    if (id === "expert") {
      addMessage("user", "I'd like to talk to an expert");
      addMessage("bot", "Great! I'm connecting you with our team now. Click the button below to reach us on WhatsApp 🚀");
      setShowInitialOptions(false);
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to talk to an expert from Team Ecomify.")}`,
        "_blank"
      );
    } else if (id === "learn") {
      handleAIMessage("Tell me about Team Ecomify and your services.");
    }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    handleAIMessage(trimmed);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-[0_0_30px_hsl(160_90%_27%/0.4)] flex items-center justify-center transition-shadow"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground rounded-t-2xl">
              <div className="flex items-center gap-2">
                <MessageCircle size={18} />
                <div>
                  <p className="font-semibold text-sm">Team Ecomify</p>
                  <p className="text-xs opacity-80">AI-powered support</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-background/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground rounded-xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-primary rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Initial quick options */}
              {showInitialOptions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {initialOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleOption(opt.id)}
                      className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-2 border-t border-border bg-card">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  disabled={isLoading}
                  className="flex-1 bg-muted/50 text-foreground text-sm px-3 py-2 rounded-lg outline-none border border-border focus:border-primary/50 transition-colors disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "19413050102";

const SYSTEM_CONTEXT = `You are the friendly support assistant for Team Ecomify, a premium eCommerce growth agency.

Company info:
- CEO: Muaz Tanzeel, 4+ years experience
- Stats: 300+ clients, $5.6M+ revenue generated, 180K+ orders, $800K+ ad spend managed
- Services: Amazon Store Management & FBA, Shopify Store Development, TikTok Shop Setup, eBay Seller Account Setup, LLC Formation & EIN Number, Trademark & Brand Registry, Product Sourcing from China, Suspended Account Recovery, Amazon PPC & Advertising, Walmart Marketplace Setup, Product Photography, Social Media Marketing
- Consultancy: $50/session, 45-60 min, includes strategy review, niche analysis, account health tips, ad audit, brand guidance, 30-day growth plan
- Contact: WhatsApp +1 (941) 305-0102, Email hello@teamecomify.com, Address: 1411 Upland Dr, Houston, TX 77043
- Website: teamecomify.com`;

type Message = { role: "bot" | "user"; text: string };

const initialOptions = [
  { id: "expert", label: "🗣️ Talk to an Expert" },
  { id: "about", label: "📋 Learn About Us" },
];

// Local smart-response fallback (browser-safe — no API key exposure).
function localReply(input: string): string {
  const q = input.toLowerCase();
  if (/(price|cost|how much|fee|charge)/.test(q))
    return "Pricing depends on the service and scope. Consultancy sessions start at $50. For project-based or monthly retainers, message us on WhatsApp at +1 (941) 305-0102 for a custom quote.";
  if (/(ppc|ads|advertising|acos)/.test(q))
    return "We handle full Amazon PPC management — Sponsored Products, Brands, and Display — with a focus on lowering ACoS and scaling profitable spend. WhatsApp +1 (941) 305-0102 to get a free audit.";
  if (/(walmart)/.test(q))
    return "Yes — we handle Walmart Marketplace seller approval, full account setup, and listing optimization. Reach out on WhatsApp +1 (941) 305-0102 to start.";
  if (/(amazon|fba|listing|seller)/.test(q))
    return "We cover the full Amazon stack: account setup, listing optimization (3–5 day turnaround), PPC, brand registry, and account recovery. WhatsApp +1 (941) 305-0102 for details.";
  if (/(shopify|store|website)/.test(q))
    return "We build conversion-focused Shopify stores with custom themes, Klaviyo email automation, and Meta Ads creative. WhatsApp +1 (941) 305-0102 to discuss your project.";
  if (/(tiktok)/.test(q))
    return "We set up TikTok Shop, source winning products, and connect you with proven creators. WhatsApp +1 (941) 305-0102 to learn more.";
  if (/(llc|ein|trademark|brand registry|legal)/.test(q))
    return "We handle US LLC formation, EIN, ITIN, trademark filing, and Amazon Brand Registry end-to-end. WhatsApp +1 (941) 305-0102 to start.";
  if (/(suspend|reinstate|recover|appeal)/.test(q))
    return "Account suspensions are time-sensitive — our team has reinstated listings in as little as 4 days. WhatsApp +1 (941) 305-0102 right away.";
  if (/(consult|book|session|meeting)/.test(q))
    return "Our 1-on-1 consultancy is $50 for a 45–60 min session covering strategy, niche analysis, ad audit, and a 30-day growth plan. WhatsApp +1 (941) 305-0102 to book.";
  if (/(contact|email|phone|address)/.test(q))
    return "📞 +1 (941) 305-0102\n📧 hello@teamecomify.com\n💬 WhatsApp: wa.me/19413050102\n📍 1411 Upland Dr, Houston, TX 77043";
  if (/(about|who|team|muaz)/.test(q))
    return "Team Ecomify is led by CEO Muaz Tanzeel (4+ yrs experience). We've served 300+ clients, generated $5.6M+ in client revenue, and managed $800K+ in ad spend. WhatsApp +1 (941) 305-0102 to chat.";
  if (/(hello|hi|hey|good)/.test(q))
    return "Hi there! 👋 I'm here to help with anything about Team Ecomify's services. What would you like to know?";
  return "Great question! For a detailed answer tailored to your business, the fastest path is WhatsApp at +1 (941) 305-0102 — our team usually replies within an hour.";
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 Welcome to Team Ecomify. How can I help you today?" },
  ]);
  const [showInitial, setShowInitial] = useState(true);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const addMessage = (role: "bot" | "user", text: string) =>
    setMessages((prev) => [...prev, { role, text }]);

  const respondTo = async (userText: string) => {
    setLoading(true);
    try {
      // Simulate AI thinking delay for smooth UX
      await new Promise((r) => setTimeout(r, 700));
      const reply = localReply(userText);
      addMessage("bot", reply);
    } catch {
      addMessage(
        "bot",
        "I'm having trouble connecting. Please WhatsApp us directly at +1 (941) 305-0102"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOption = (id: string) => {
    setShowInitial(false);
    if (id === "expert") {
      addMessage("user", "I'd like to talk to an expert");
      addMessage("bot", "Great! Opening WhatsApp now — an expert will reply within an hour. 🚀");
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          "Hi! A visitor from teamecomify.com wants to talk to an expert."
        )}`,
        "_blank"
      );
    } else if (id === "about") {
      addMessage("user", "Tell me about Team Ecomify");
      respondTo("tell me about your team");
    }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    addMessage("user", trimmed);
    setInput("");
    setShowInitial(false);
    respondTo(trimmed);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-[0_0_30px_hsl(160_90%_27%/0.4)] flex items-center justify-center transition-shadow"
            aria-label="Open chat"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground rounded-t-2xl">
              <div className="flex items-center gap-2">
                <MessageCircle size={18} />
                <div>
                  <p className="font-semibold text-sm">Team Ecomify</p>
                  <p className="text-xs opacity-80">Usually replies instantly</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity" aria-label="Close chat">
                <X size={20} />
              </button>
            </div>

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

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted px-3 py-2 rounded-xl rounded-bl-sm flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {showInitial && (
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

            <div className="px-3 py-2 border-t border-border bg-card">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-muted/50 text-foreground text-sm px-3 py-2 rounded-lg outline-none border border-border focus:border-primary/50 transition-colors"
                  disabled={loading}
                />
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
                  aria-label="Send"
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

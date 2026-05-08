import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "19413050102";

const ABOUT_DATA = {
  services: [
    "Amazon Store Management & FBA",
    "Shopify Store Development",
    "TikTok Shop Setup & Management",
    "eBay Seller Account Setup",
    "LLC Formation & EIN Number",
    "Trademark & Brand Registry",
    "Product Sourcing from China",
    "Suspended Account Recovery",
    "Amazon PPC & Advertising",
    "Walmart Marketplace Setup",
    "Product Photography",
    "Social Media Marketing",
  ],
  about:
    "Team Ecomify is a premium e-commerce agency led by CEO Muaz Tanzeel with 4+ years of experience. We've served 300+ clients worldwide, generated $5.6M+ in revenue, delivered 180K+ orders, and managed $800K+ in ad spend. We help entrepreneurs build, launch, and scale profitable online businesses across Amazon, Shopify, TikTok Shop, eBay, and Walmart.",
  contact: {
    phone: "+1 (941) 305-0102",
    email: "muazxsocial@gmail.com",
    address: "1411 Upland Dr, Houston, TX 77043",
    whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  consultancy:
    "We offer 1-on-1 consultancy sessions for $50/session (45-60 min). You get a personalized marketplace strategy review, product niche analysis, account health optimization tips, ad spend audit, brand registry guidance, and a 30-day growth plan.",
};

type Message = { role: "bot" | "user"; text: string };

const initialOptions = [
  { id: "expert", label: "🗣️ Talk to an Expert" },
  { id: "details", label: "📋 Learn About Us" },
];

const detailOptions = [
  { id: "services", label: "Our Services" },
  { id: "about", label: "About Team Ecomify" },
  { id: "contact", label: "Contact Info" },
  { id: "consultancy", label: "Consultancy Sessions" },
  { id: "back", label: "⬅️ Back to Main Menu" },
];

function getDetailResponse(id: string): string {
  switch (id) {
    case "services":
      return `Here are our services:\n\n${ABOUT_DATA.services.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\nWould you like to know more about any specific service?`;
    case "about":
      return ABOUT_DATA.about;
    case "contact":
      return `📞 Phone: ${ABOUT_DATA.contact.phone}\n📧 Email: ${ABOUT_DATA.contact.email}\n📍 Address: ${ABOUT_DATA.contact.address}\n💬 WhatsApp: ${ABOUT_DATA.contact.whatsapp}`;
    case "consultancy":
      return ABOUT_DATA.consultancy;
    default:
      return "I'm not sure about that. Would you like to talk to an expert?";
  }
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 Welcome to Team Ecomify. How can I help you today?" },
  ]);
  const [showOptions, setShowOptions] = useState<"initial" | "details" | "none">("initial");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (role: "bot" | "user", text: string) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

  const handleOption = (id: string) => {
    if (id === "expert") {
      addMessage("user", "I'd like to talk to an expert");
      addMessage(
        "bot",
        "Great! I'm notifying our team right now. An expert will connect with you shortly on WhatsApp. 🚀"
      );
      setShowOptions("none");
      // Open WhatsApp with a message
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          "Hi! A customer on your website wants to talk to an expert."
        )}`,
        "_blank"
      );
      setTimeout(() => {
        addMessage("bot", "Is there anything else I can help you with?");
        setShowOptions("initial");
      }, 3000);
    } else if (id === "details") {
      addMessage("user", "I'd like to learn about you");
      addMessage("bot", "Sure! What would you like to know?");
      setShowOptions("details");
    } else if (id === "back") {
      addMessage("bot", "Sure! How can I help you?");
      setShowOptions("initial");
    } else {
      const label = detailOptions.find((o) => o.id === id)?.label || id;
      addMessage("user", label);
      addMessage("bot", getDetailResponse(id));
      setShowOptions("details");
    }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    addMessage("user", trimmed);
    setInput("");

    const lower = trimmed.toLowerCase();
    if (lower.includes("service")) {
      addMessage("bot", getDetailResponse("services"));
      setShowOptions("details");
    } else if (lower.includes("contact") || lower.includes("phone") || lower.includes("email")) {
      addMessage("bot", getDetailResponse("contact"));
      setShowOptions("details");
    } else if (lower.includes("consult") || lower.includes("session") || lower.includes("book")) {
      addMessage("bot", getDetailResponse("consultancy"));
      setShowOptions("details");
    } else if (lower.includes("about") || lower.includes("who") || lower.includes("team")) {
      addMessage("bot", getDetailResponse("about"));
      setShowOptions("details");
    } else if (lower.includes("expert") || lower.includes("talk") || lower.includes("human")) {
      handleOption("expert");
    } else {
      addMessage(
        "bot",
        "I appreciate your question! For detailed answers, I'd recommend talking to one of our experts. Would you like me to connect you?"
      );
      setShowOptions("initial");
    }
  };

  const currentOptions = showOptions === "initial" ? initialOptions : showOptions === "details" ? detailOptions : [];

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
                  <p className="text-xs opacity-80">Usually replies instantly</p>
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

              {/* Quick options */}
              {currentOptions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentOptions.map((opt) => (
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
                  className="flex-1 bg-muted/50 text-foreground text-sm px-3 py-2 rounded-lg outline-none border border-border focus:border-primary/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
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

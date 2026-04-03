import { useState, useRef, useEffect, useCallback } from "react";
import ChatSidebar, { type Conversation } from "@/components/ChatSidebar";
import ChatMessage, { type Message } from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import WelcomeScreen from "@/components/WelcomeScreen";
import { Menu, X } from "lucide-react";

const generateId = () => Math.random().toString(36).slice(2, 10);

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeMessages = activeId ? messages[activeId] || [] : [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeMessages]);

  const createConversation = useCallback((firstMessage?: string) => {
    const id = generateId();
    const conv: Conversation = {
      id,
      title: firstMessage?.slice(0, 40) || "New Chat",
      createdAt: new Date(),
    };
    setConversations((prev) => [conv, ...prev]);
    setActiveId(id);
    setMessages((prev) => ({ ...prev, [id]: [] }));
    return id;
  }, []);

  const handleSend = useCallback(
    async (content: string) => {
      let convId = activeId;
      if (!convId) {
        convId = createConversation(content);
      } else {
        // Update title if it's still "New Chat"
        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId && c.title === "New Chat"
              ? { ...c, title: content.slice(0, 40) }
              : c
          )
        );
      }

      const userMsg: Message = { id: generateId(), role: "user", content };
      setMessages((prev) => ({
        ...prev,
        [convId!]: [...(prev[convId!] || []), userMsg],
      }));

      setIsLoading(true);

      // Simulate AI response (replace with real API call)
      setTimeout(() => {
        const aiMsg: Message = {
          id: generateId(),
          role: "assistant",
          content: getSimulatedResponse(content),
        };
        setMessages((prev) => ({
          ...prev,
          [convId!]: [...(prev[convId!] || []), aiMsg],
        }));
        setIsLoading(false);
      }, 1000 + Math.random() * 1500);
    },
    [activeId, createConversation]
  );

  const handleDelete = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) setActiveId(null);
    setMessages((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="relative w-72 h-full" onClick={(e) => e.stopPropagation()}>
            <ChatSidebar
              conversations={conversations}
              activeId={activeId}
              onSelect={(id) => { setActiveId(id); setSidebarOpen(false); }}
              onNew={() => { createConversation(); setSidebarOpen(false); }}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={() => createConversation()}
        onDelete={handleDelete}
      />

      {/* Main chat area */}
      <main className="flex-1 flex flex-col h-screen min-w-0">
        {/* Header */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background/80 backdrop-blur-sm">
          <button
            className="md:hidden p-1.5 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <h2 className="text-sm font-medium text-foreground truncate">
            {activeId
              ? conversations.find((c) => c.id === activeId)?.title || "Chat"
              : "Business AI Assistant"}
          </h2>
        </header>

        {/* Messages */}
        {activeMessages.length === 0 && !isLoading ? (
          <WelcomeScreen onSuggestion={handleSend} />
        ) : (
          <div ref={scrollRef} className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto py-4">
              {activeMessages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && (
                <div className="flex gap-3 px-4 py-4">
                  <div className="w-8 h-8 rounded-lg bg-chat-ai border border-border flex items-center justify-center">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <ChatInput onSend={handleSend} disabled={isLoading} />
      </main>
    </div>
  );
};

function getSimulatedResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("workflow") || lower.includes("improve")) {
    return "Here are some ways AI can improve your workflow:\n\n1. **Automate repetitive tasks** — Let AI handle data entry, scheduling, and email responses\n2. **Smart document analysis** — Extract key insights from reports and contracts instantly\n3. **Predictive analytics** — Forecast trends based on your historical data\n4. **Enhanced communication** — Draft professional emails, proposals, and reports\n\nWould you like me to dive deeper into any of these areas?";
  }
  if (lower.includes("security")) {
    return "Our platform includes enterprise-grade security features:\n\n- 🔒 **End-to-end encryption** for all conversations\n- 🛡️ **SOC 2 Type II** compliance\n- 🔑 **Role-based access control** for team management\n- 📋 **Audit logs** for complete transparency\n- 🌐 **Data residency options** for regulatory compliance\n\nNeed more details on any specific security feature?";
  }
  if (lower.includes("proposal") || lower.includes("draft")) {
    return "I'd be happy to help draft a business proposal! To create an effective one, I'll need:\n\n1. **Client/audience** — Who is this for?\n2. **Objective** — What problem are you solving?\n3. **Budget range** — Any financial parameters?\n4. **Timeline** — When does this need to be delivered?\n\nShare these details and I'll craft a professional proposal for you.";
  }
  if (lower.includes("sales") || lower.includes("data") || lower.includes("analyze")) {
    return "I can help analyze your sales data! Here's what I can do:\n\n- 📊 **Trend analysis** — Identify patterns and seasonality\n- 📈 **Revenue forecasting** — Project future performance\n- 🎯 **Customer segmentation** — Group customers by behavior\n- ⚡ **Performance metrics** — Track KPIs and conversion rates\n\nPlease share your data or describe what you'd like to analyze, and I'll get started.";
  }
  return "That's a great question! I'm here to help with a wide range of business tasks including:\n\n- **Analysis & Research** — Market research, competitive analysis, data interpretation\n- **Content & Communication** — Emails, reports, presentations, proposals\n- **Strategy & Planning** — Business plans, project roadmaps, goal setting\n- **Problem Solving** — Process optimization, troubleshooting, brainstorming\n\nHow can I assist you specifically?";
}

export default Index;

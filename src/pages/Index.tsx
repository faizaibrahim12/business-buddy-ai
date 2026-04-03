import { useState, useRef, useEffect, useCallback } from "react";
import ChatSidebar, { type Conversation } from "@/components/ChatSidebar";
import ChatMessage, { type Message } from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import WelcomeScreen from "@/components/WelcomeScreen";
import { streamChat } from "@/lib/streamChat";
import { Menu } from "lucide-react";
import { toast } from "sonner";

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

      // Build message history for AI context
      const currentMessages = messages[convId!] || [];
      const apiMessages = [
        ...currentMessages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user" as const, content },
      ];

      let assistantContent = "";
      const assistantId = generateId();

      await streamChat({
        messages: apiMessages,
        onDelta: (chunk) => {
          assistantContent += chunk;
          setMessages((prev) => {
            const msgs = prev[convId!] || [];
            const lastMsg = msgs[msgs.length - 1];
            if (lastMsg?.id === assistantId) {
              return {
                ...prev,
                [convId!]: msgs.map((m) =>
                  m.id === assistantId ? { ...m, content: assistantContent } : m
                ),
              };
            }
            return {
              ...prev,
              [convId!]: [
                ...msgs,
                { id: assistantId, role: "assistant", content: assistantContent },
              ],
            };
          });
        },
        onDone: () => setIsLoading(false),
        onError: (err) => {
          toast.error(err);
          setIsLoading(false);
        },
      });
    },
    [activeId, createConversation, messages]
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

      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={() => createConversation()}
        onDelete={handleDelete}
      />

      <main className="flex-1 flex flex-col h-screen min-w-0">
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

        {activeMessages.length === 0 && !isLoading ? (
          <WelcomeScreen onSuggestion={handleSend} />
        ) : (
          <div ref={scrollRef} className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto py-4">
              {activeMessages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && activeMessages[activeMessages.length - 1]?.role !== "assistant" && (
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

export default Index;

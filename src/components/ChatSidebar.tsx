import { Plus, MessageSquare, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}

const ChatSidebar = ({ conversations, activeId, onSelect, onNew, onDelete }: ChatSidebarProps) => {
  return (
    <aside className="hidden md:flex flex-col w-72 bg-sidebar border-r border-sidebar-border h-screen">
      <div className="p-4 border-b border-sidebar-border">
        <button
          onClick={onNew}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {conversations.map((conv, i) => (
          <motion.button
            key={conv.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => onSelect(conv.id)}
            className={`w-full group flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
              activeId === conv.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            }`}
          >
            <MessageSquare size={15} className="shrink-0 opacity-50" />
            <span className="truncate flex-1">{conv.title}</span>
            <Trash2
              size={14}
              className="shrink-0 opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(conv.id);
              }}
            />
          </motion.button>
        ))}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">AI</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Business AI</p>
            <p className="text-xs text-muted-foreground">Powered by AI</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;

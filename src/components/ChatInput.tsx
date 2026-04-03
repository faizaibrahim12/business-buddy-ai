import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
  };

  return (
    <div className="border-t border-border bg-background p-4">
      <div className="max-w-3xl mx-auto relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Type your message..."
          disabled={disabled}
          rows={1}
          className="w-full resize-none rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !input.trim()}
          className="absolute right-2 bottom-2 p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-30"
        >
          <Send size={16} />
        </button>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-2">
        AI can make mistakes. Verify important information.
      </p>
    </div>
  );
};

export default ChatInput;

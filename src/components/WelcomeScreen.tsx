import { motion } from "framer-motion";
import { Sparkles, Zap, Shield, MessageSquare } from "lucide-react";

const suggestions = [
  { icon: Zap, text: "How can AI improve my workflow?" },
  { icon: Shield, text: "What security features do you offer?" },
  { icon: MessageSquare, text: "Help me draft a business proposal" },
  { icon: Sparkles, text: "Analyze my quarterly sales data" },
];

interface WelcomeScreenProps {
  onSuggestion: (text: string) => void;
}

const WelcomeScreen = ({ onSuggestion }: WelcomeScreenProps) => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
            <Sparkles size={28} className="text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            How can I help you today?
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Your AI-powered business assistant — ready to help with analysis, writing, strategy, and more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestions.map((s, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              onClick={() => onSuggestion(s.text)}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-sm text-foreground text-left transition-colors"
            >
              <s.icon size={16} className="text-primary shrink-0" />
              {s.text}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

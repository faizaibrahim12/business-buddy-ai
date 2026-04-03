import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Bot,
  Sparkles,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  Send,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";

/* ─── Fake chat demo messages ─── */
const demoConversation = [
  { role: "user" as const, text: "How can AI help my business grow?" },
  {
    role: "ai" as const,
    text: "Great question! AI can automate customer support, analyze sales trends, generate content, and personalize marketing — saving you **40+ hours/month**. Want me to create a growth strategy?",
  },
  { role: "user" as const, text: "Yes! Show me a content plan" },
  {
    role: "ai" as const,
    text: "Here's your 7-day content plan:\n\n📅 **Mon** — Industry insight post\n📅 **Tue** — Customer success story\n📅 **Wed** — Behind-the-scenes\n📅 **Thu** — Tips & tricks carousel\n📅 **Fri** — Product spotlight\n📅 **Sat** — Community poll\n📅 **Sun** — Weekly recap\n\nShall I draft the first post?",
  },
];

const features = [
  {
    icon: Bot,
    title: "AI-Powered Chat",
    desc: "Instant, intelligent answers to any business question — 24/7",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    desc: "Analyze sales, trends, and KPIs with natural language queries",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "End-to-end encryption, SOC 2 compliance, and role-based access",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    desc: "Automate repetitive tasks and boost team productivity by 10x",
  },
];

const stats = [
  { value: "10x", label: "Faster Responses", icon: Zap },
  { value: "40+", label: "Hours Saved/Mo", icon: TrendingUp },
  { value: "99.9%", label: "Uptime", icon: Shield },
  { value: "500+", label: "Businesses", icon: Users },
];

/* ─── Chat Demo Component ─── */
const ChatDemo = () => {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (visibleMessages < demoConversation.length) {
      setTyping(true);
      const delay = demoConversation[visibleMessages].role === "ai" ? 1800 : 800;
      const timer = setTimeout(() => {
        setTyping(false);
        setVisibleMessages((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [visibleMessages]);

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-border bg-card overflow-hidden glow-purple">
      {/* Chat header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border bg-secondary/50">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <Bot size={16} className="text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">AI Assistant</p>
          <p className="text-[11px] text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Online
          </p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="p-4 space-y-3 min-h-[300px] max-h-[340px] overflow-y-auto">
        {demoConversation.slice(0, visibleMessages).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-foreground rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
              <span className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-primary/60 animate-pulse [animation-delay:0.15s]" />
              <span className="w-2 h-2 rounded-full bg-primary/60 animate-pulse [animation-delay:0.3s]" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Chat input */}
      <div className="border-t border-border px-3 py-2.5 bg-secondary/30">
        <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
          <span className="text-muted-foreground text-sm flex-1">Type a message...</span>
          <div className="p-1.5 rounded-lg bg-primary">
            <Send size={14} className="text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Dashboard Preview ─── */
const DashboardPreview = () => (
  <div className="w-full max-w-3xl mx-auto rounded-2xl border border-border bg-card overflow-hidden glow-purple">
    <div className="px-5 py-3 border-b border-border flex items-center gap-2">
      <div className="flex gap-1.5">
        <span className="w-3 h-3 rounded-full bg-destructive/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
      </div>
      <span className="text-xs text-muted-foreground ml-2">AI Dashboard — Analytics</span>
    </div>
    <div className="p-6 grid grid-cols-3 gap-4">
      {[
        { label: "Total Chats", value: "12,847", change: "+24%" },
        { label: "Avg Response", value: "1.2s", change: "-40%" },
        { label: "Satisfaction", value: "98.5%", change: "+5%" },
      ].map((item, i) => (
        <div key={i} className="bg-secondary/50 rounded-xl p-4 border border-border">
          <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
          <p className="text-xl font-bold text-foreground">{item.value}</p>
          <p className="text-xs text-green-400 mt-1">{item.change}</p>
        </div>
      ))}
    </div>
    <div className="px-6 pb-6">
      <div className="bg-secondary/30 rounded-xl p-4 border border-border h-32 flex items-end gap-1">
        {[40, 65, 45, 80, 60, 90, 75, 95, 70, 85, 88, 92].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-primary/60 transition-all"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  </div>
);

/* ─── Landing Page ─── */
const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles size={18} className="text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight">BusinessAI</span>
          </div>
          <button
            onClick={() => navigate("/chat")}
            className="px-5 py-2 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Open Dashboard
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(250_85%_65%/0.15),transparent_60%)]" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <Sparkles size={12} />
              AI-Powered Business Platform
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] mb-5">
              AI Business Assistant
              <br />
              <span className="text-gradient">Supercharge Your Growth</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              Automate customer support, analyze data, and generate content — all with one intelligent AI assistant.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/chat")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
              >
                Try Demo
                <ArrowRight size={18} />
              </motion.button>
              <a
                href="#chat-demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium rounded-xl border border-border text-foreground hover:bg-secondary transition-colors"
              >
                <MessageSquare size={18} />
                See It In Action
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="relative z-10 mt-20 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-4 rounded-xl bg-card/60 border border-border"
            >
              <s.icon size={18} className="text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Live Chat Demo ── */}
      <section id="chat-demo" className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
              🔥 Live Demo
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              See the AI in Action
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Watch how our AI assistant handles real business conversations instantly
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 w-full"
            >
              <ChatDemo />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-5"
            >
              {[
                { emoji: "⚡", title: "Instant Responses", desc: "AI replies in under 2 seconds with context-aware answers" },
                { emoji: "🧠", title: "Learns Your Business", desc: "Adapts to your industry, products, and communication style" },
                { emoji: "🌍", title: "Multilingual Support", desc: "Communicate with customers in 50+ languages seamlessly" },
                { emoji: "📊", title: "Smart Insights", desc: "Automatically surfaces trends and actionable recommendations" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-colors">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}

              <button
                onClick={() => navigate("/chat")}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Try It Yourself
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 py-24 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Everything Your Business Needs
            </h2>
            <p className="text-muted-foreground">
              Powered by cutting-edge AI to accelerate your growth
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:glow-purple transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard Preview ── */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Powerful Dashboard
            </h2>
            <p className="text-muted-foreground">
              Track every conversation, measure performance, and gain insights
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center p-12 rounded-2xl bg-card border border-border glow-purple"
        >
          <h2 className="text-3xl font-bold mb-3">Get Your AI Chatbot</h2>
          <p className="text-muted-foreground mb-8">
            Ready to transform your business? Try the live demo or contact us to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/chat")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
            >
              Try AI Assistant
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-semibold">BusinessAI</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 BusinessAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

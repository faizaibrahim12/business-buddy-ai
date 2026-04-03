import { motion } from "framer-motion";
import { Bot, Sparkles, BarChart3, Shield, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: Bot, title: "AI-Powered Chat", desc: "Get instant answers to complex business questions" },
  { icon: BarChart3, title: "Data Analysis", desc: "Analyze sales, trends, and performance metrics" },
  { icon: Shield, title: "Enterprise Security", desc: "End-to-end encryption & SOC 2 compliance" },
  { icon: Zap, title: "Workflow Automation", desc: "Automate repetitive tasks and boost productivity" },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(213_94%_56%/0.15),transparent_60%)]" />
        <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles size={18} className="text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight">BusinessAI</span>
          </div>
          <button
            onClick={() => navigate("/chat")}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Open Dashboard
          </button>
        </nav>

        <div className="relative z-10 text-center px-6 pt-20 pb-28 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <Sparkles size={12} />
              AI-Powered Business Assistant
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5">
              Your Business,{" "}
              <span className="text-primary">Supercharged</span> with AI
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              An intelligent AI dashboard that handles analysis, strategy, content creation, and workflow optimization — all in one place.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/chat")}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Try AI Assistant
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </header>

      {/* Features */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Everything Your Business Needs
          </h2>
          <p className="text-muted-foreground">
            Powered by cutting-edge AI to accelerate your growth
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 mb-10">
        <div className="max-w-2xl mx-auto text-center p-10 rounded-2xl bg-card border border-border">
          <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            See what AI can do for your business — try the live demo now.
          </p>
          <button
            onClick={() => navigate("/chat")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Try AI Assistant
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">
        © 2026 BusinessAI. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;

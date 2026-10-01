"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, Box, Mail, Bot } from "lucide-react";

export const MobileBottomBar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Auto-hide slightly when scrolling fast down, show immediately on scroll up
      if (currentScrollY > lastScrollY + 40 && currentScrollY > 200) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY - 20 || currentScrollY < 100) {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Section tracking
      const sections = ["home", "portfolio", "tech-lab", "contact"];
      const scrollPos = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 70;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const openAIChat = () => {
    window.dispatchEvent(new CustomEvent("open-ai-assistant"));
  };

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: visible ? 0 : 80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden fixed bottom-3 inset-x-3 z-40 pointer-events-auto"
    >
      <div className="relative mx-auto max-w-md bg-card/85 backdrop-blur-2xl border border-primary/25 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.35)] px-3 py-2 flex items-center justify-around">
        {/* Glow accent */}
        <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* 1. Home */}
        <button
          onClick={() => scrollTo("home")}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all min-h-[44px] min-w-[44px] ${
            activeTab === "home"
              ? "text-primary font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Navigate to Home"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* 2. Portfolio */}
        <button
          onClick={() => scrollTo("portfolio")}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all min-h-[44px] min-w-[44px] ${
            activeTab === "portfolio"
              ? "text-primary font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Navigate to Projects"
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Work</span>
        </button>

        {/* 3. Center Elevated AI Assistant Trigger */}
        <div className="relative -top-3">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={openAIChat}
            className="relative flex flex-col items-center justify-center p-3 rounded-full bg-gradient-to-br from-primary via-cyan-500 to-indigo-600 text-white shadow-[0_6px_20px_rgba(6,182,212,0.45)] ring-4 ring-background min-h-[52px] min-w-[52px]"
            aria-label="Open Habtamu AI Consultant"
          >
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <Bot className="w-6 h-6 animate-pulse" />
          </motion.button>
          <span className="block text-[9px] font-mono font-bold text-center text-primary mt-0.5 tracking-tight">
            AI Chat
          </span>
        </div>

        {/* 4. 3D Lab */}
        <button
          onClick={() => scrollTo("tech-lab")}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all min-h-[44px] min-w-[44px] ${
            activeTab === "tech-lab"
              ? "text-primary font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Navigate to 3D Lab"
        >
          <Box className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">3D Lab</span>
        </button>

        {/* 5. Contact */}
        <button
          onClick={() => scrollTo("contact")}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all min-h-[44px] min-w-[44px] ${
            activeTab === "contact"
              ? "text-primary font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Navigate to Contact"
        >
          <Mail className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Contact</span>
        </button>
      </div>
    </motion.div>
  );
};

export default MobileBottomBar;

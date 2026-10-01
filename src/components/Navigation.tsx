"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Mail,
  Sparkles,
  GraduationCap,
  Github,
  Radio,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lastClickRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const now = Date.now();
      if (lastClickRef.current && now - lastClickRef.current < 700) return;

      const sections = ["home", "portfolio", "about", "services", "contact"];
      const offset = 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Projects", href: "#portfolio", icon: Briefcase },
    { name: "About & Skills", href: "#about", icon: User },
    { name: "Coursework", href: "#coursework", icon: GraduationCap },
    { name: "Services", href: "#services", icon: Sparkles },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  const scrollToSection = (href: string) => {
    lastClickRef.current = Date.now();
    setActiveSection(href.replace(/^#/, ""));
    setIsMobileMenuOpen(false);

    const element = document.querySelector(href);
    if (element) {
      const navOffset = 70;
      const top = element.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      try {
        history.pushState(null, "", href);
      } catch {
        window.location.hash = href;
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 pt-2.5 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        {/* Floating Glass Pill Navbar */}
        <nav
          className={`flex items-center justify-between rounded-full px-3.5 sm:px-5 py-2 transition-all duration-300 border ${
            isScrolled
              ? "bg-background/90 backdrop-blur-xl border-border/80 shadow-lg"
              : "bg-background/75 backdrop-blur-md border-border/50 shadow-xs"
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Habtamu Amare Homepage"
          >
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 border border-primary/20 text-primary">
              <span className="font-mono font-extrabold text-xs">H</span>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              habtamu<span className="text-primary">.dev</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* AI Talk Quick Trigger */}
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-ai-assistant", { detail: { mode: "voice_call" } }));
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 shadow-xs transition-all cursor-pointer"
              title="Talk with AI Copilot"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">AI Talk</span>
              <span className="sm:hidden">AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </button>

            {/* GitHub Quick Link */}
            <a
              href="https://github.com/habtedev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus:outline-none"
              aria-label="Toggle dark or light theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Desktop Contact CTA */}
            <Button
              size="sm"
              onClick={() => scrollToSection("#contact")}
              className="hidden sm:inline-flex h-7 px-3.5 rounded-full text-xs font-semibold font-mono bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs"
            >
              Let's Talk
            </Button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors md:hidden focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 p-2.5 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/80 shadow-2xl space-y-1.5"
            >
              <div className="space-y-0.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* AI Talk in Mobile Menu */}
              <div className="pt-2 border-t border-border/50 space-y-1.5">
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent("open-ai-assistant", { detail: { mode: "voice_call" } }));
                  }}
                  className="w-full h-8.5 text-xs font-mono font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 text-white flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span>Launch AI Voice Copilot</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => scrollToSection("#contact")}
                  className="w-full h-8 text-xs font-mono font-semibold border-border/70"
                >
                  Get In Touch Directly
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

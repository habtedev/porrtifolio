"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowDown,
  Mail,
  Copy,
  Check,
  Box,
  User,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Activity,
  Cpu,
  GraduationCap,
  Layers,
  Code2,
  Zap,
  Server,
  Sparkles,
  Radio,
  Bot,
} from "lucide-react";
import profileImage from "@/assets/image.png";
import ThreeModelViewer from "@/components/ThreeModelViewer";
import { useToast } from "@/hooks/use-toast";

const defaultPhotoUrl =
  typeof profileImage === "string"
    ? profileImage
    : (profileImage as { src?: string })?.src || "";

export default function Hero() {
  const [activeView, setActiveView] = useState<"photo" | "3d" | "telemetry">("photo");
  const [roleIndex, setRoleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { toast } = useToast();

  const roles = [
    "Backend Software Engineer",
    "Full-Stack MERN Developer",
    "Node.js & Python / Django Specialist",
    "Database & REST API Architect",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 70;
      const top = element.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("habtamudev@gmail.com");
    setCopiedEmail(true);
    toast({
      title: "Email Copied",
      description: "habtamudev@gmail.com copied to clipboard.",
      duration: 2500,
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const keyTechPills = [
    { name: "Node.js & Express", category: "backend" },
    { name: "React & Next.js 15", category: "frontend" },
    { name: "Python & Django", category: "backend" },
    { name: "MongoDB & Mongoose", category: "database" },
    { name: "PostgreSQL & SQL", category: "database" },
    { name: "REST APIs & JWT Auth", category: "security" },
    { name: "TypeScript & ES6+", category: "languages" },
    { name: "Docker & Git Workflows", category: "devops" },
  ];

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16 px-3 sm:px-6"
    >
      {/* Subtle modern ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/12 w-80 sm:w-96 h-80 sm:h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/12 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:36px_36px]" />
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* ─── Left Column: Headline, Bio & Primary CTAs ─── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 text-left space-y-3.5 sm:space-y-4"
          >
            {/* Top Status & Availability Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono font-semibold tracking-wide uppercase text-emerald-400">
                Available for Full-Stack & Backend Roles
              </span>
            </div>

            {/* Name & Headline */}
            <div className="space-y-1.5">
              <h1 id="home-heading" className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
                <span className="block text-foreground text-xl sm:text-2xl font-semibold text-muted-foreground mb-1">
                  Hi, I'm
                </span>
                <span className="block bg-gradient-to-r from-primary via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
                  Habtamu Amare
                </span>
              </h1>

              {/* Dynamic Animated Role Ticker */}
              <div className="h-7 sm:h-8 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roleIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5 text-xs sm:text-base font-semibold text-primary font-mono bg-primary/10 px-2.5 py-0.5 rounded-md border border-primary/20"
                  >
                    <Terminal className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{roles[roleIndex]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Crisp & Professional Bio Summary */}
            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed max-w-xl">
              Backend-focused Software Engineer and Computer Science scholar from the University of Gondar. Skilled in developing scalable, production-ready web applications using Node.js, Express, Python, Django, React, and Next.js, with robust database architectures in MongoDB and PostgreSQL.
            </p>

            {/* Technology Competencies Pills */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {keyTechPills.map((tech) => (
                <span
                  key={tech.name}
                  className="px-2 py-0.5 text-[10px] sm:text-xs font-mono rounded-md border border-border/70 bg-card/70 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  {tech.name}
                </span>
              ))}
            </div>

            {/* Interactive AI Engineering Copilot Card in Hero */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-ai-assistant", { detail: { mode: "chat" } }));
              }}
              className="p-3 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-cyan-500/35 hover:border-cyan-500/70 shadow-md backdrop-blur-xl flex items-center justify-between gap-3 cursor-pointer group transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 group-hover:scale-110 transition-transform shrink-0">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                      Habtamu AI Engineering Copilot & Voice
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shrink-0">
                      Gemini 2.5
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 truncate mt-0.5">
                    Ask technical questions, verify CS credentials, or start voice call in English/Amharic
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="hidden sm:inline text-xs font-mono text-cyan-400 group-hover:underline">
                  Launch Console
                </span>
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Talk to AI Voice Button */}
              <Button
                size="sm"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-ai-assistant", { detail: { mode: "voice_call" } }));
                }}
                className="h-9 sm:h-10 px-3.5 rounded-xl font-semibold font-mono text-xs bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 shadow-sm transition-all flex items-center gap-1.5 group cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 animate-pulse" />
                <span>Talk with AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </Button>

              <Button
                size="sm"
                onClick={() => scrollToSection("#portfolio")}
                className="h-9 sm:h-10 px-4 rounded-xl font-semibold font-mono text-xs bg-gradient-to-r from-primary via-cyan-500 to-indigo-600 text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => scrollToSection("#contact")}
                className="h-9 sm:h-10 px-3.5 rounded-xl font-semibold font-mono text-xs border-primary/40 hover:border-primary bg-primary/10 hover:bg-primary/20 text-primary transition-all flex items-center gap-1.5 group"
              >
                <Mail className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
                <span>Contact Me</span>
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopyEmail}
                className="h-9 sm:h-10 px-3 rounded-xl font-mono text-xs text-muted-foreground hover:text-foreground border border-border/50 bg-card/40 hover:bg-muted/50 transition-all"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    <span>Copy Email</span>
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* ─── Right Column: Interactive Profile & WebGL Inspector ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col items-center order-first lg:order-last"
          >
            {/* View Mode Segmented Controls */}
            <div className="mb-2.5 inline-flex p-1 rounded-xl bg-card/90 border border-border/80 shadow-sm backdrop-blur-md gap-1">
              <button
                onClick={() => setActiveView("photo")}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold font-mono flex items-center gap-1 transition-all ${
                  activeView === "photo"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="w-3 h-3" />
                <span>Portrait</span>
              </button>
              <button
                onClick={() => setActiveView("3d")}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold font-mono flex items-center gap-1 transition-all ${
                  activeView === "3d"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Box className="w-3 h-3" />
                <span>3D Core</span>
              </button>
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-ai-assistant", { detail: { mode: "voice_call" } }));
                }}
                className="px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold font-mono flex items-center gap-1 transition-all text-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/10 cursor-pointer"
                title="Open AI Voice Talk"
              >
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>AI Talk</span>
              </button>
              <button
                onClick={() => setActiveView("telemetry")}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold font-mono flex items-center gap-1 transition-all ${
                  activeView === "telemetry"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Activity className="w-3 h-3" />
                <span>Stack Stats</span>
              </button>
            </div>

            {/* Stage Container Card */}
            <div className="relative w-full max-w-[270px] sm:max-w-[320px] lg:max-w-[350px] aspect-[4/5] rounded-2xl p-1 bg-gradient-to-b from-primary/20 via-border/50 to-border/20 shadow-xl">
              <div className="w-full h-full rounded-[14px] bg-card border border-border/80 overflow-hidden relative flex flex-col justify-between">
                
                {/* View 1: 3D Core */}
                {activeView === "3d" ? (
                  <div className="w-full h-full relative">
                    <ThreeModelViewer
                      className="w-full h-full"
                      initialModel="cyber-core"
                      initialTheme="cyan"
                      interactive={true}
                      compact={true}
                    />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[9px] font-mono text-center text-muted-foreground bg-background/85 backdrop-blur-md px-2 py-1 rounded-md border border-border/60">
                      Interactive WebGL • Drag to Rotate
                    </div>
                  </div>
                ) : activeView === "telemetry" ? (
                  /* View 2: Live Telemetry Stack Stats */
                  <div className="w-full h-full p-3.5 flex flex-col justify-between bg-black/95 font-mono text-xs">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                        <span className="text-emerald-400 flex items-center gap-1 text-[10px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          SYSTEMS ONLINE
                        </span>
                        <span className="text-[9px] text-muted-foreground">Gondar, ET</span>
                      </div>

                      <div className="space-y-1.5 text-[10px]">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Backend Frameworks</span>
                          <span className="text-cyan-400 font-semibold">Node.js, Express, Django</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Frontend Stack</span>
                          <span className="text-foreground font-semibold">React.js, Next.js 15</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Languages</span>
                          <span className="text-emerald-400 font-semibold">JavaScript, TypeScript, Python</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Primary Databases</span>
                          <span className="text-foreground font-semibold">MongoDB, PostgreSQL, MySQL</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>API Architecture</span>
                          <span className="text-foreground font-semibold">RESTful, JWT, Middleware</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Mobile Dev</span>
                          <span className="text-indigo-400 font-semibold">React Native, Flutter</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 space-y-1.5">
                      <div className="text-[9px] text-muted-foreground">
                        $ status: production ready & tested
                      </div>
                      <Button
                        size="sm"
                        onClick={() => scrollToSection("#contact")}
                        className="w-full h-7 text-[10px] font-mono font-semibold bg-primary/20 text-primary hover:bg-primary/30 border border-primary/40"
                      >
                        <Mail className="w-3 h-3 mr-1" />
                        <span>Send Message</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* View 3: Professional Photo Card */
                  <div className="w-full h-full relative flex flex-col justify-between p-3">
                    {/* Portrait Photo */}
                    <img
                      src={defaultPhotoUrl}
                      alt="Habtamu Amare"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />

                    {/* Gradient Vignette for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/15 to-transparent pointer-events-none" />

                    {/* Top Status Badges */}
                    <div className="relative z-10 flex items-center justify-between w-full">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-background/85 backdrop-blur-md border border-emerald-500/30 text-[10px] font-mono text-emerald-400 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Available for Hire</span>
                      </div>

                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-background/85 backdrop-blur-md border border-primary/30 text-[10px] font-mono text-primary shadow-sm">
                        <GraduationCap className="w-3 h-3 text-primary" />
                        <span>B.Sc. CS</span>
                      </div>
                    </div>

                    {/* Bottom Identity Card Overlay */}
                    <div className="relative z-10 mt-auto pt-2">
                      <div className="p-2.5 rounded-xl bg-card/90 backdrop-blur-md border border-border/80 shadow-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1">
                              <span>Habtamu Amare</span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                            </h3>
                            <p className="text-[10px] text-muted-foreground font-mono">
                              Backend & Full-Stack Engineer
                            </p>
                          </div>
                          <a
                            href="https://github.com/habtedev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                            aria-label="GitHub Profile"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-6 sm:mt-10 text-center">
          <button
            onClick={() => scrollToSection("#portfolio")}
            className="p-2 rounded-full bg-card/80 border border-border/80 hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors shadow-sm"
            aria-label="Scroll to portfolio section"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

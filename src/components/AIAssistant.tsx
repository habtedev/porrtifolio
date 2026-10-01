"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  Send,
  Sparkles,
  Shield,
  Box,
  FileText,
  Mail,
  X,
  Volume2,
  VolumeX,
  RotateCcw,
  Copy,
  Check,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Radio,
  Languages,
  Activity,
  ArrowUpRight,
  Server,
  Code2,
  ShoppingBag,
  Database,
  GraduationCap,
  Briefcase,
  Layers,
  Terminal,
  Cpu,
  Wifi,
  ChevronRight,
  Sliders,
  CheckCircle2,
  Zap,
  RadioTower,
  Lock,
} from "lucide-react";
import Markdown from "react-markdown";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isAiGenerated?: boolean;
  model?: string;
  mode?: "text" | "voice";
  timestamp?: string;
}

// Clean markdown and symbols for natural, executive speech synthesis
function cleanMarkdownForSpeech(markdown: string): string {
  if (!markdown) return "";
  return markdown
    // Remove code blocks and CLI bash snippets
    .replace(/```[\s\S]*?```/g, "")
    // Remove system bracket tags like [SYSTEM ONLINE] or [OK]
    .replace(/\[(?:SYSTEM|OK|PROCESSING|VERIFIED|CORE|TELEMETRY)[^\]]*\]/gi, "")
    // Clean inline code backticks
    .replace(/`([^`]+)`/g, "$1")
    // Clean markdown links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Clean headers (#, ##, ###)
    .replace(/^#{1,6}\s+/gm, "")
    // Clean bullet points and list markers
    .replace(/^[-*+]\s+/gm, "")
    // Replace slashes in tech stacks with commas for smooth pacing (e.g. Node.js / Express -> Node.js, Express)
    .replace(/(\w+)\s*\/\s*(\w+)/g, "$1, $2")
    // Clean asterisks, tildes, underscores
    .replace(/[*_~>]/g, "")
    // Clean bash prompt indicators
    .replace(/\$\s*/g, "")
    // Remove multiple punctuation or whitespace
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .trim();
}

function isAmharicText(text: string): boolean {
  return /[\u1200-\u137F]/.test(text);
}

function getFormattedTime(): string {
  const d = new Date();
  return d.toTimeString().split(" ")[0];
}

const WELCOME_MESSAGES = {
  en: "### `[SYSTEM ONLINE]` Habtamu Amare — AI Technical Representative\n\nWelcome to the **Interactive Engineering Console**. I am Habtamu's AI Representative, engineered to query his verified background, backend architecture, dual-engine databases, and systems experience.\n\n```bash\n# Verified Core Architecture\n$ sys_query --backend    # Node.js, Express, Python, Django, REST APIs, JWT\n$ sys_query --frontend   # React, Next.js 15 (App Router, RSC), TypeScript\n$ sys_query --databases  # Dual-Engine: MongoDB (NoSQL) & PostgreSQL (SQL)\n$ sys_query --experience # WebStack Academy & Prodigy InfoTech\n$ sys_query --projects   # AfriMart & TrendMart, Amazon & Netflix Clones\n```\n\n*Select a command below, activate **Neural Voice**, or type your technical query.*",
  am: "### `[ስርዓት ዝግጁ ነው]` የሀብታሙ አማረ AI ቴክኒካል ኢንጂነሪንግ ኮንሶል\n\nእንኳን ወደ **የቴክኒካል ኮንሶል** በደህና መጡ። ስለ ሀብታሙ የሶፍትዌር ኢንጂነሪንግ፣ የባክኤንድ አሰራር፣ ዳታቤዞች እና የስራ ልምድ የተረጋገጡ መረጃዎችን ማግኘት ይችላሉ።\n\n```bash\n# ዋና የቴክኒክ አቅሞች\n$ sys_query --backend    # Node.js, Express, Python, Django, REST APIs\n$ sys_query --frontend   # Next.js 15, React, TypeScript\n$ sys_query --databases  # MongoDB (NoSQL) እና PostgreSQL/MySQL (SQL)\n$ sys_query --experience # WebStack Academy & Prodigy InfoTech\n$ sys_query --projects   # AfriMart & TrendMart, Amazon Clone\n```\n\n*ከታች ካሉት ትዕዛዞች አንዱን ይምረጡ፣ ወደ **የድምፅ ጥሪ** ይቀይሩ ወይም ጥያቄዎን ይጻፉ።*",
};

const COMMAND_CHIPS = {
  en: [
    { label: "GET /stack/backend", query: "Explain Habtamu's Backend & REST API Architecture (Node.js & Django)", icon: Server },
    { label: "QUERY /db/dual-engine", query: "Explain his Dual-Engine Database design with MongoDB and PostgreSQL", icon: Database },
    { label: "EXEC /projects/marketplaces", query: "Tell me about AfriMart and TrendMart production marketplaces", icon: ShoppingBag },
    { label: "INSPECT /work/experience", query: "What is his work experience at WebStack Academy & Prodigy InfoTech?", icon: Briefcase },
    { label: "GET /academic/credentials", query: "What is his Computer Science academic background at University of Gondar & UMD?", icon: GraduationCap },
    { label: "POST /contact/hire", query: "How can I contact and hire Habtamu for software engineering roles?", icon: Mail },
  ],
  am: [
    { label: "GET /stack/backend", query: "ስለ ባክኤንድ (Node.js/Django) እና API አሰራሩ አብራራ", icon: Server },
    { label: "QUERY /db/dual-engine", query: "የዳታቤዝ አጠቃቀም (MongoDB vs PostgreSQL) አብራራ", icon: Database },
    { label: "EXEC /projects/marketplaces", query: "ስለ AfriMart እና TrendMart ፕሮጀክቶች ንገረኝ", icon: ShoppingBag },
    { label: "INSPECT /work/experience", query: "በWebStack Academy እና Prodigy የነበረው የስራ ልምድ", icon: Briefcase },
    { label: "GET /academic/credentials", query: "የትምህርት ዝግጅት (ጎንደር ዩኒቨርሲቲ እና ሜሪላንድ)", icon: GraduationCap },
    { label: "POST /contact/hire", query: "ሀብታሙን እንዴት ማግኘት ወይም መቅጠር እችላለሁ?", icon: Mail },
  ],
};

const SYSTEM_SPECS = [
  { label: "RUNTIME", value: "Node.js 20+ / Python 3.12", badge: "Engine" },
  { label: "FRAMEWORKS", value: "Next.js 15, Express, Django 5", badge: "Core" },
  { label: "DATABASES", value: "MongoDB 7.0 & PostgreSQL 16", badge: "Dual-DB" },
  { label: "SECURITY", value: "JWT, Helmet, CSRF, RBAC", badge: "SecOps" },
  { label: "API DESIGN", value: "RESTful, Sub-100ms Latency", badge: "Network" },
  { label: "AI ENGINE", value: "Gemini 2.5 Flash Telemetry", badge: "AI HUD" },
];

export default function AIAssistant() {
  const [language, setLanguage] = useState<"en" | "am">("en");
  const [activeTab, setActiveTab] = useState<"terminal" | "voice" | "telemetry">("terminal");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: WELCOME_MESSAGES.en,
      isAiGenerated: true,
      model: "gemini-2.5",
      mode: "text",
      timestamp: "00:00:01",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Voice Call States
  const [callState, setCallState] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [lastAiSpokenText, setLastAiSpokenText] = useState("");

  // Individual message speech tracking
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const callActiveRef = useRef<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    callActiveRef.current = activeTab === "voice";
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "terminal") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, activeTab]);

  const startVoiceCallRef = useRef<() => void>(() => {});
  const endVoiceCallRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!isOpen) {
      endVoiceCallRef.current();
      stopSpeech();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOpen = (e: CustomEvent<{ mode?: "chat" | "voice_call" }>) => {
      setIsOpen(true);
      if (e.detail?.mode === "voice_call") {
        setActiveTab("voice");
        setTimeout(() => startVoiceCallRef.current(), 200);
      } else {
        setActiveTab("terminal");
      }
    };
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeTab === "voice") {
          endVoiceCallRef.current();
        } else {
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("open-ai-assistant", handleOpen as EventListener);
    window.addEventListener("keydown", closeOnEsc as EventListener);

    return () => {
      window.removeEventListener("open-ai-assistant", handleOpen as EventListener);
      window.removeEventListener("keydown", closeOnEsc as EventListener);
    };
  }, [activeTab]);

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setCurrentlySpeakingId(null);
    }
  };

  const speakText = (text: string, onEnd?: () => void) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      if (onEnd) onEnd();
      return;
    }

    stopSpeech();
    const cleanText = cleanMarkdownForSpeech(text);
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const isAmharic = isAmharicText(cleanText) || language === "am";

      if (isAmharic) {
        utterance.lang = "am-ET";
        utterance.rate = 0.98;
        utterance.pitch = 1.0;
        const voices = window.speechSynthesis.getVoices();
        const amVoice = voices.find(
          (v) =>
            v.lang.startsWith("am") ||
            v.lang.toLowerCase().includes("am-et") ||
            v.name.toLowerCase().includes("amharic") ||
            v.name.toLowerCase().includes("ethiopia")
        );
        if (amVoice) utterance.voice = amVoice;
      } else {
        utterance.lang = "en-US";
        // Clean executive cadence (natural pace and pitch)
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        const voices = window.speechSynthesis.getVoices();
        
        // Find the cleanest, most natural studio voice available
        const cleanVoice = voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.includes("Natural") ||
              v.name.includes("Online (Natural)") ||
              v.name.includes("Google US English") ||
              v.name.includes("Google UK English Male") ||
              v.name.includes("Samantha (Enhanced)") ||
              v.name.includes("Samantha") ||
              v.name.includes("Daniel") ||
              v.name.includes("Alex") ||
              v.name.includes("Premium") ||
              v.name.includes("Enhanced"))
        ) || voices.find((v) => v.lang.startsWith("en-US") || v.lang.startsWith("en"));
        
        if (cleanVoice) utterance.voice = cleanVoice;
      }

      utterance.onend = () => {
        setCurrentlySpeakingId(null);
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        setCurrentlySpeakingId(null);
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      setCurrentlySpeakingId(null);
      if (onEnd) onEnd();
    }
  };

  const handleToggleSpeakMessage = (msg: Message) => {
    if (currentlySpeakingId === msg.id) {
      stopSpeech();
    } else {
      setCurrentlySpeakingId(msg.id);
      speakText(msg.content, () => setCurrentlySpeakingId(null));
    }
  };

  const handleCopyMessage = (msg: Message) => {
    navigator.clipboard.writeText(msg.content);
    setCopiedId(msg.id);
    toast({
      title: "Telemetry Copied",
      description: "Response copied to clipboard.",
      duration: 2000,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const startVoiceCall = () => {
    setActiveTab("voice");
    setCallState("listening");
    startListeningInCall();
  };

  const endVoiceCall = () => {
    stopSpeech();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
    }
    setCallState("idle");
    setActiveTab("terminal");
    setLiveTranscript("");
  };

  startVoiceCallRef.current = startVoiceCall;
  endVoiceCallRef.current = endVoiceCall;

  const startListeningInCall = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast({
        title: "Microphone Stream Unavailable",
        description: "Browser does not expose Web Speech API. Switched to Terminal HUD.",
        variant: "destructive",
      });
      setActiveTab("terminal");
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language === "am" ? "am-ET" : "en-US";

    recognition.onresult = (event: any) => {
      let interim = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const activeText = finalTranscript || interim;
      setLiveTranscript(activeText);

      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

      if (finalTranscript.trim().length > 2) {
        silenceTimerRef.current = setTimeout(() => {
          handleProcessVoiceQuery(finalTranscript.trim());
        }, 1200);
      }
    };

    recognition.onerror = (e: any) => {
      if (e.error === "no-speech") return;
      if (e.error === "aborted") return;
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      setCallState("listening");
    } catch {}
  };

  const handleProcessVoiceQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
    }

    setCallState("thinking");

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: queryText,
      mode: "voice",
      timestamp: getFormattedTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLiveTranscript("");

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: queryText,
          messages: [...historyPayload, { role: "user", content: queryText }],
        }),
      });

      const data = await res.json();
      const reply =
        data.response ||
        "Habtamu Amare is a Backend-focused Software Engineer specializing in Node.js, Express, Python, Django, React, Next.js, and MongoDB/PostgreSQL.";

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: reply,
        isAiGenerated: true,
        model: data.model || "gemini-2.5-flash",
        mode: "voice",
        timestamp: getFormattedTime(),
      };
      setMessages((prev) => [...prev, botMsg]);

      setLastAiSpokenText(reply);
      setCallState("speaking");

      speakText(reply, () => {
        if (callActiveRef.current) {
          setLiveTranscript("");
          startListeningInCall();
        }
      });
    } catch {
      const fallback =
        language === "am"
          ? "ሀብታሙ አማረ በNode.js፣ Express፣ Python/Django እና React/Next.js ላይ የተካነ ባክኤንድ እና ሙሉ-ስታክ ሶፍትዌር ኢንጂነር ነው።"
          : "Habtamu Amare is a Backend-focused Software Engineer specializing in Node.js, Express, Python, Django, React, and Next.js.";
      setLastAiSpokenText(fallback);
      setCallState("speaking");
      speakText(fallback, () => {
        if (callActiveRef.current) {
          startListeningInCall();
        }
      });
    }
  };

  const handleSendText = async (msg?: string) => {
    const text = msg || input.trim();
    if (!text || isTyping) return;

    if (isAmharicText(text) && language !== "am") {
      setLanguage("am");
    }

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      mode: "text",
      timestamp: getFormattedTime(),
    };

    const typingMsg: Message = {
      id: `bot-${Date.now()}`,
      role: "assistant",
      content: "",
      isAiGenerated: true,
      mode: "text",
      timestamp: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMsg, typingMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          messages: [...historyPayload, { role: "user", content: text }],
        }),
      });

      const data = await res.json();
      const reply =
        data.response ||
        "Habtamu Amare is a Backend-focused Software Engineer specializing in Node.js, Express, Python, Django, React, Next.js, and MongoDB/PostgreSQL.";

      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingMsg.id
            ? { ...m, content: reply, model: data.model || "gemini-2.5-flash" }
            : m
        )
      );
    } catch {
      const fallback =
        language === "am"
          ? "ሀብታሙ አማረ በNode.js፣ Express፣ Python/Django እና React/Next.js ላይ የተካነ ባክኤንድ እና ሙሉ-ስታክ ሶፍትዌር ኢንጂነር ነው። ለቀጥታ ግንኙነት በ habtamudev@gmail.com ያግኙት።"
          : "Habtamu Amare is a Backend-focused Software Engineer specializing in Node.js, Express, Python, Django, React, Next.js, MongoDB, and PostgreSQL. Contact him directly at habtamudev@gmail.com.";
      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingMsg.id ? { ...m, content: fallback } : m
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    stopSpeech();
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content: WELCOME_MESSAGES[language],
        isAiGenerated: true,
        model: "gemini-2.5",
        mode: "text",
        timestamp: getFormattedTime(),
      },
    ]);
  };

  return (
    <>
      {/* Floating Action Launcher (Desktop & Mobile Fit) */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-50 pointer-events-auto flex items-center gap-2 font-mono"
        >
          {/* Mobile Right-Side AI Launcher (< sm screens) */}
          <div className="flex sm:hidden items-center gap-1.5">
            {/* Quick Voice Mode Button Mobile */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsOpen(true);
                setActiveTab("voice");
                setTimeout(() => startVoiceCall(), 150);
              }}
              className="p-2.5 rounded-full bg-slate-900/95 text-emerald-400 shadow-[0_4px_18px_rgba(16,185,129,0.35)] border border-emerald-500/50 backdrop-blur-xl flex items-center justify-center cursor-pointer"
              aria-label="Start Voice HUD"
            >
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            </motion.button>

            {/* AI Engineering Copilot Button Mobile */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                setIsOpen(true);
                setActiveTab("terminal");
              }}
              className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-100 shadow-[0_6px_25px_rgba(6,182,212,0.45)] border border-cyan-500/50 backdrop-blur-2xl cursor-pointer overflow-hidden"
              aria-label="Open Habtamu AI Copilot"
            >
              <div className="w-5 h-5 rounded-md bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-3 h-3 animate-pulse" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[11px] font-bold text-white flex items-center gap-1">
                  AI Copilot
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                </span>
                <span className="text-[8px] text-cyan-400 font-mono">
                  Gemini 2.5
                </span>
              </div>
            </motion.button>
          </div>

          {/* Desktop Launcher (>= sm screens) */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick Voice Mode Button */}
            <motion.button
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                setIsOpen(true);
                setActiveTab("voice");
                setTimeout(() => startVoiceCall(), 150);
              }}
              className="px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-850 text-emerald-400 shadow-[0_4px_25px_rgba(16,185,129,0.3)] border border-emerald-500/40 flex items-center gap-2 text-xs font-semibold backdrop-blur-2xl group transition-all cursor-pointer"
              title="Start Neural Voice Stream"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span>Voice HUD</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </motion.button>

            {/* AI Terminal Copilot Launcher Button */}
            <motion.button
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                setIsOpen(true);
                setActiveTab("terminal");
              }}
              className="relative flex items-center gap-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-100 shadow-[0_8px_35px_rgba(6,182,212,0.4)] border border-cyan-500/40 backdrop-blur-2xl transition-all group cursor-pointer overflow-hidden"
              aria-label="Open AI Engineering Console"
            >
              {/* Glowing moving highlight */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  AI Engineering HUD
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                </span>
                <span className="text-[9px] text-cyan-400 font-mono tracking-tight">
                  Gemini 2.5 • Verified CV
                </span>
              </div>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Main WOW AI Dialog Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop click to dismiss */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            {/* Ambient Holographic Glow Aura */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-emerald-500/20 rounded-3xl blur-3xl opacity-60 pointer-events-none" />

            <motion.div
              initial={{ y: "100%", opacity: 0.3, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="relative w-full h-[94dvh] sm:h-[84vh] sm:max-w-3xl flex flex-col pointer-events-auto font-mono"
            >
              {/* Main Card with Radiant Cyber Border */}
              <Card className="h-full bg-slate-950/95 border border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.25)] flex flex-col text-slate-100 rounded-t-3xl sm:rounded-2xl overflow-hidden backdrop-blur-3xl relative">
                
                {/* Mobile Drag Indicator */}
                <div className="sm:hidden w-12 h-1 bg-slate-700 rounded-full mx-auto mt-2 shrink-0" />

                {/* 1. Terminal HUD Topbar */}
                <div className="border-b border-cyan-500/20 bg-slate-900/95 shrink-0">
                  {/* Top Bar Row */}
                  <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5">
                    {/* Left: Host Prompt + Status */}
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Desktop Traffic Lights */}
                      <div className="hidden sm:flex items-center gap-1.5 shrink-0 mr-1">
                        <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors cursor-pointer" title="Close" />
                        <button onClick={handleResetChat} className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer" title="Reset" />
                        <button onClick={() => setActiveTab(activeTab === "terminal" ? "telemetry" : "terminal")} className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer" title="Toggle Specs" />
                      </div>

                      <div className="p-1 rounded-md bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 shrink-0">
                        <Terminal className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-xs font-bold text-slate-100 truncate">
                            habtamudev@ai:~$
                          </span>
                          <span className="text-[9px] font-semibold text-cyan-400 bg-cyan-950 border border-cyan-500/40 px-1.5 py-0.2 rounded">
                            Gemini 2.5
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {activeTab === "voice" ? "VOICE HUD ACTIVE" : "ONLINE"}
                          </span>
                          <span>•</span>
                          <span className="text-slate-400">RTT: 18ms</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Desktop Tabs & Controls */}
                    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                      {/* Desktop Navigation Tabs */}
                      <div className="hidden sm:inline-flex rounded-lg border border-slate-800 bg-slate-950 p-0.5 text-[10px]">
                        <button
                          onClick={() => {
                            if (activeTab === "voice") endVoiceCall();
                            setActiveTab("terminal");
                          }}
                          className={`px-2 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
                            activeTab === "terminal" ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40" : "text-slate-400 hover:text-white"
                          }`}
                        >
                          <Terminal className="w-3 h-3" />
                          <span>Terminal</span>
                        </button>

                        <button
                          onClick={() => {
                            if (activeTab !== "voice") startVoiceCall();
                          }}
                          className={`px-2 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
                            activeTab === "voice" ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40" : "text-slate-400 hover:text-white"
                          }`}
                        >
                          <Radio className="w-3 h-3" />
                          <span>Voice HUD</span>
                        </button>

                        <button
                          onClick={() => {
                            if (activeTab === "voice") endVoiceCall();
                            setActiveTab("telemetry");
                          }}
                          className={`px-2 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
                            activeTab === "telemetry" ? "bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40" : "text-slate-400 hover:text-white"
                          }`}
                        >
                          <Sliders className="w-3 h-3" />
                          <span>Specs</span>
                        </button>
                      </div>

                      {/* Language Switch */}
                      <div className="inline-flex rounded-lg border border-slate-800 bg-slate-950 p-0.5 text-[10px]">
                        <button
                          onClick={() => {
                            setLanguage("en");
                            if (messages.length === 1) {
                              setMessages([{ id: "w-en", role: "assistant", content: WELCOME_MESSAGES.en, timestamp: getFormattedTime() }]);
                            }
                          }}
                          className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                            language === "en" ? "bg-cyan-500 text-black font-bold" : "text-slate-400 hover:text-white"
                          }`}
                        >
                          EN
                        </button>
                        <button
                          onClick={() => {
                            setLanguage("am");
                            if (messages.length === 1) {
                              setMessages([{ id: "w-am", role: "assistant", content: WELCOME_MESSAGES.am, timestamp: getFormattedTime() }]);
                            }
                          }}
                          className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                            language === "am" ? "bg-cyan-500 text-black font-bold" : "text-slate-400 hover:text-white"
                          }`}
                        >
                          አማ
                        </button>
                      </div>

                      {/* Reset Chat */}
                      <button
                        onClick={handleResetChat}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
                        title="Clear & Reset Console"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      {/* Close Modal Button */}
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500/30 hover:text-rose-200 transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
                        title="Close HUD"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Tab Switcher Row (< sm screens) */}
                  <div className="flex sm:hidden items-center justify-around px-2 py-1.5 border-t border-slate-800/80 bg-slate-950/90 text-xs">
                    <button
                      onClick={() => {
                        if (activeTab === "voice") endVoiceCall();
                        setActiveTab("terminal");
                      }}
                      className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === "terminal"
                          ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-xs"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Terminal</span>
                    </button>

                    <button
                      onClick={() => {
                        if (activeTab !== "voice") startVoiceCall();
                      }}
                      className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === "voice"
                          ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-xs"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>Voice Talk</span>
                    </button>

                    <button
                      onClick={() => {
                        if (activeTab === "voice") endVoiceCall();
                        setActiveTab("telemetry");
                      }}
                      className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === "telemetry"
                          ? "bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40 shadow-xs"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Specs</span>
                    </button>
                  </div>
                </div>

                {/* 2. BODY CONTENT: Terminal Chat vs Acoustic Studio vs Telemetry */}
                {activeTab === "voice" ? (
                  /* 🎙️ Neural Voice Acoustic Studio HUD */
                  <div className="flex-1 flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-cyan-950/20 via-slate-950 to-slate-950 overflow-y-auto">
                    {/* HUD Status Header */}
                    <div className="text-center space-y-1 mt-1 sm:mt-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900 border border-emerald-500/40 text-emerald-400 text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>LIVE NEURAL AUDIO • NATURAL CADENCE</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white pt-1">
                        {callState === "listening" && "Listening... Speak your query"}
                        {callState === "thinking" && "Processing neural response..."}
                        {callState === "speaking" && "Synthesizing audio output..."}
                        {callState === "idle" && "Neural Voice Channel Standby"}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {language === "am" ? "በአማርኛ ወይም በእንግሊዝኛ በነፃነት ይናገሩ" : "Speak naturally in English or Amharic"}
                      </p>
                    </div>

                    {/* Futuristic Equalizer Waveform & Orb */}
                    <div className="relative flex flex-col items-center justify-center my-3 sm:my-6">
                      {/* Concentric Orbital Glow Rings */}
                      <motion.div
                        animate={{ scale: callState === "speaking" ? [1, 1.06, 1] : callState === "listening" ? [1, 1.03, 1] : 1 }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                        className={`w-28 h-28 sm:w-40 sm:h-40 rounded-full flex items-center justify-center transition-all duration-500 relative ${
                          callState === "speaking"
                            ? "bg-cyan-500/20 border-2 border-cyan-400 shadow-[0_0_60px_rgba(6,182,212,0.6)]"
                            : callState === "listening"
                            ? "bg-emerald-500/20 border-2 border-emerald-400 shadow-[0_0_60px_rgba(16,185,129,0.5)]"
                            : "bg-indigo-500/15 border border-indigo-400/40"
                        }`}
                      >
                        {callState === "speaking" && (
                          <div className="absolute inset-0 rounded-full border border-cyan-400/60 animate-ping" />
                        )}
                        {callState === "listening" && (
                          <div className="absolute inset-0 rounded-full border border-emerald-400/60 animate-ping" />
                        )}
                        <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                      </motion.div>

                      {/* 16-Bar Equalizer Frequency Spectrum */}
                      <div className="flex items-end gap-1 h-8 sm:h-10 mt-3 sm:mt-5">
                        {[40, 70, 95, 60, 85, 100, 75, 45, 90, 65, 80, 50, 85, 95, 70, 40].map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              height:
                                callState === "speaking" || callState === "listening"
                                  ? [`${h * 0.25}%`, `${h}%`, `${h * 0.35}%`]
                                  : "15%",
                            }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              delay: i * 0.04,
                              ease: "easeInOut",
                            }}
                            className={`w-1 rounded-full ${
                              callState === "speaking"
                                ? "bg-gradient-to-t from-cyan-500 to-cyan-300"
                                : callState === "listening"
                                ? "bg-gradient-to-t from-emerald-500 to-emerald-300"
                                : "bg-slate-800"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Live Transcript & Feedback Display */}
                    <div className="w-full max-w-lg p-3 sm:p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-center min-h-[64px] sm:min-h-[72px] flex items-center justify-center shadow-inner my-2">
                      <p className="text-xs sm:text-xs text-slate-200 font-mono leading-relaxed italic break-words">
                        {liveTranscript ||
                          (callState === "listening" && "Listening... Speak clearly now.") ||
                          (callState === "speaking" && (lastAiSpokenText ? lastAiSpokenText.slice(0, 160) + (lastAiSpokenText.length > 160 ? "..." : "") : "Synthesizing audio...")) ||
                          "Neural channel standby. Tap Mic to begin."}
                      </p>
                    </div>

                    {/* Quick Voice Prompt Suggestions */}
                    <div className="w-full max-w-lg flex flex-wrap justify-center gap-1.5 my-1">
                      {[
                        "What is your backend tech stack?",
                        "Tell me about AfriMart & TrendMart",
                        "Tell me about your education",
                      ].map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => {
                            handleSendText(prompt);
                            setActiveTab("terminal");
                          }}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-slate-900/80 hover:bg-slate-800 text-cyan-400 border border-cyan-500/20 truncate transition-colors cursor-pointer"
                        >
                          "{prompt}"
                        </button>
                      ))}
                    </div>

                    {/* Call Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 mt-3">
                      <Button
                        size="sm"
                        onClick={endVoiceCall}
                        className="h-8.5 sm:h-10 px-4 sm:px-5 rounded-full font-mono text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 shadow-lg cursor-pointer"
                      >
                        <PhoneOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Disconnect Audio & Return</span>
                      </Button>
                    </div>
                  </div>
                ) : activeTab === "telemetry" ? (
                  /* ⚡ System Specs & Telemetry Inspector Tab */
                  <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-950">
                    <div className="border border-cyan-500/20 rounded-xl p-4 bg-slate-900/50">
                      <div className="flex items-center gap-2 text-cyan-400 mb-3 text-xs font-bold uppercase tracking-wider">
                        <Activity className="w-4 h-4" />
                        <span>Verified Systems & Runtimes</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {SYSTEM_SPECS.map((spec) => (
                          <div key={spec.label} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-slate-400 font-bold block">{spec.label}</span>
                              <span className="text-slate-200 font-semibold">{spec.value}</span>
                            </div>
                            <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded">
                              {spec.badge}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Verified Credentials */}
                    <div className="border border-emerald-500/20 rounded-xl p-4 bg-slate-900/50 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verified Credentials & Track Record</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside leading-relaxed">
                        <li><strong className="text-white">Academic:</strong> B.Sc. in Computer Science (Univ. of Gondar, 2023–2027) & Univ. of Maryland AI Program (2025).</li>
                        <li><strong className="text-white">Industry:</strong> MERN Developer @ WebStack Academy & Full-Stack Developer @ Prodigy InfoTech.</li>
                        <li><strong className="text-white">Production Projects:</strong> AfriMart (MongoDB), TrendMart (PostgreSQL), Amazon Clone, Netflix Clone.</li>
                      </ul>
                      <div className="pt-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setActiveTab("terminal");
                            handleSendText("How can I contact and hire Habtamu?");
                          }}
                          className="w-full h-8.5 text-xs bg-cyan-600 hover:bg-cyan-500 text-white font-mono rounded-lg cursor-pointer"
                        >
                          Execute Contact Query
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 💬 Terminal Code Chat Mode */
                  <>
                    <ScrollArea className="flex-1 p-3 sm:p-4 overflow-y-auto bg-slate-950">
                      <div className="space-y-4 max-w-3xl mx-auto">
                        {messages.map((msg) => {
                          const isUser = msg.role === "user";
                          const isSpeaking = currentlySpeakingId === msg.id;

                          return (
                            <motion.div
                              key={msg.id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                            >
                              {/* Prompt Badge */}
                              <div className="flex items-center gap-2 mb-1 px-1 text-[10px] text-slate-400 font-mono">
                                {isUser ? (
                                  <span className="text-cyan-400 font-bold">user@guest:~$</span>
                                ) : (
                                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                                    <Bot className="w-3 h-3" />
                                    <span>habtamu-ai:~$</span>
                                  </span>
                                )}
                                <span className="text-slate-400">• {msg.timestamp || "now"}</span>
                              </div>

                              <div
                                className={`group relative max-w-[92%] sm:max-w-[85%] rounded-xl p-3.5 text-xs leading-relaxed font-sans border ${
                                  isUser
                                    ? "bg-slate-900 border-cyan-500/50 text-slate-100 rounded-tr-xs shadow-md"
                                    : "bg-slate-900/90 border-slate-800 text-slate-200 rounded-tl-xs shadow-xs"
                                }`}
                              >
                                {msg.content ? (
                                  <div className="prose prose-invert prose-xs max-w-none text-xs space-y-2 font-sans leading-relaxed">
                                    <Markdown>{msg.content}</Markdown>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 py-1 text-slate-400 font-mono text-[11px]">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                                    <span>[EXECUTING GEMINI 2.5 TELEMETRY PIPELINE...]</span>
                                  </div>
                                )}

                                {!isUser && msg.content && (
                                  <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono">
                                    <span className="text-cyan-400/80 flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                      GEMINI_2.5_OK
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                      <button
                                        onClick={() => handleToggleSpeakMessage(msg)}
                                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                                        title={isSpeaking ? "Stop Synthesis" : "Synthesize Audio"}
                                      >
                                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-cyan-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                                      </button>
                                      <button
                                        onClick={() => handleCopyMessage(msg)}
                                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                        title="Copy Output"
                                      >
                                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    {/* Quick Command Execution Chips */}
                    <div className="px-3 py-2 border-t border-slate-800/80 bg-slate-900/60 shrink-0">
                      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                        {COMMAND_CHIPS[language].map((chip) => {
                          const Icon = chip.icon;
                          return (
                            <button
                              key={chip.label}
                              onClick={() => handleSendText(chip.query)}
                              className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-slate-950 hover:bg-slate-850 text-cyan-400 hover:text-cyan-200 border border-cyan-500/30 whitespace-nowrap flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer shadow-xs"
                            >
                              <Icon className="w-3 h-3 text-cyan-400" />
                              <span>{chip.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Terminal Input Bar */}
                    <div className="p-2.5 sm:p-3 border-t border-slate-800 bg-slate-900/95 flex items-center gap-2 shrink-0">
                      <div className="flex items-center text-cyan-400 font-mono text-xs pl-1 shrink-0">
                        <ChevronRight className="w-4 h-4 text-cyan-400" />
                      </div>
                      <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendText();
                          }
                        }}
                        rows={1}
                        placeholder={
                          language === "am"
                            ? "ትዕዛዝ ወይም የቴክኒክ ጥያቄ ይጻፉ (ምሳሌ: $ sys_info)..."
                            : "Enter engineering query (e.g. explain REST API & MERN stack)..."
                        }
                        className="text-xs font-mono bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-500 resize-none min-h-[38px] max-h-[80px] py-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      />

                      <Button
                        size="sm"
                        onClick={() => handleSendText()}
                        disabled={!input.trim() || isTyping}
                        className="h-9.5 px-3.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold shadow-xs transition-all shrink-0 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5 mr-1" />
                        <span>RUN</span>
                      </Button>
                    </div>
                  </>
                )}
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

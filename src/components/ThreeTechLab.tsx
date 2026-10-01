"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Box,
  Layers,
  ShieldCheck,
  Cpu,
  Sparkles,
  Activity,
  Code2,
  Terminal,
  Zap,
} from "lucide-react";
import ThreeModelViewer, { ModelType, ColorTheme } from "@/components/ThreeModelViewer";
import TiltCard from "@/components/TiltCard";

export const ThreeTechLab = () => {
  const [activeModel, setActiveModel] = useState<ModelType>("torus-knot");
  const [activeTheme, setActiveTheme] = useState<ColorTheme>("cyan");
  const [selectedSpec, setSelectedSpec] = useState<number>(0);

  const architectureSpecs = [
    {
      title: "Cryptographic Security Shield",
      model: "torus-knot" as ModelType,
      theme: "cyan" as ColorTheme,
      icon: ShieldCheck,
      badge: "Cyber Defense",
      headline: "Multi-layered Perimeter & Zero-Trust Protocol",
      description:
        "Engineered with strict CORS policies, automated rate-limiting, Helmet security headers, CSRF token mitigation, and hardened JWT token rotation.",
      metrics: [
        { label: "Encryption", val: "AES-256 / RSA" },
        { label: "Rate Limit", val: "100 req / 15m" },
        { label: "Threat Defense", val: "Active Sanitization" },
      ],
    },
    {
      title: "High-Throughput Next.js Full-Stack Core",
      model: "cyber-core" as ModelType,
      theme: "indigo" as ColorTheme,
      icon: Cpu,
      badge: "Next.js Architecture",
      headline: "Unified Next.js Frontend & Backend Engine",
      description:
        "Unified Next.js App Router architecture powering both client React components and backend Server Actions/Route Handlers with end-to-end type safety and streaming SSR.",
      metrics: [
        { label: "Pipeline", val: "Next.js Full-Stack" },
        { label: "Rendering", val: "RSC + Streaming SSR" },
        { label: "Type Safety", val: "End-to-End Strict" },
      ],
    },
    {
      title: "Quantum State & Database Engine",
      model: "matrix-cube" as ModelType,
      theme: "emerald" as ColorTheme,
      icon: Layers,
      badge: "Data Matrix",
      headline: "Schema Validation & Buffered Failover",
      description:
        "MongoDB persistence coupled with in-memory resilient queuing when offline, ensuring form submissions and visitor interactions are never dropped.",
      metrics: [
        { label: "Database", val: "MongoDB + Memory Queue" },
        { label: "Validation", val: "Zod & Strict Schema" },
        { label: "Uptime Target", val: "99.98%" },
      ],
    },
    {
      title: "Interactive 3D WebGL Interface",
      model: "cyber-sphere" as ModelType,
      theme: "amber" as ColorTheme,
      icon: Sparkles,
      badge: "Client Experience",
      headline: "GPU Accelerated Shaders & Spatial Ergonomics",
      description:
        "Three.js particle networks, real-time lighting, interactive orbit cameras, and mathematically calculated 3D tilt perspective animations.",
      metrics: [
        { label: "Engine", val: "Three.js r186" },
        { label: "Frame Rate", val: "Smooth 60 FPS" },
        { label: "Render", val: "ACES Tone Mapping" },
      ],
    },
  ];

  const handleSelectSpec = (idx: number) => {
    setSelectedSpec(idx);
    setActiveModel(architectureSpecs[idx].model);
    setActiveTheme(architectureSpecs[idx].theme);
  };

  return (
    <section id="tech-lab" className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-card/30 to-background">
      {/* Background glow lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.06),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-3.5 py-1 text-xs font-mono border-primary/40 text-primary bg-primary/5">
            <Box className="w-3.5 h-3.5 mr-1.5" />
            3D Interactive Lab
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Architectural <span className="bg-gradient-to-r from-primary via-cyan-400 to-indigo-500 bg-clip-text text-transparent">3D Modeling</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Interact with the technical constructs that power my web systems. Orbit in 3D, inspect wireframes,
            and explore the engineering specifications behind modern full-stack performance.
          </p>
        </div>

        {/* Interactive 3D Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Spec Selector Tabs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="text-xs font-mono uppercase text-muted-foreground tracking-wider mb-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span>Select Architecture Module:</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
              {architectureSpecs.map((spec, idx) => {
                const isSelected = selectedSpec === idx;
                return (
                  <TiltCard key={spec.title} maxTilt={4} scale={1.01}>
                    <button
                      onClick={() => handleSelectSpec(idx)}
                      className={`w-full text-left p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 relative h-full flex flex-col justify-between ${
                        isSelected
                          ? "bg-card/90 border-primary/60 shadow-lg ring-1 ring-primary/30"
                          : "bg-card/40 hover:bg-card/70 border-border/60 hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3.5">
                        <div
                          className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border transition-colors shrink-0 ${
                            isSelected
                              ? "bg-primary/10 border-primary/40 text-primary"
                              : "bg-muted/50 border-border text-muted-foreground"
                          }`}
                        >
                          <spec.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-semibold text-xs sm:text-base truncate text-foreground">
                              {spec.title}
                            </span>
                          </div>
                          <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {spec.description}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <motion.div
                          layoutId="activeSpecIndicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 sm:h-8 bg-primary rounded-r-full"
                        />
                      )}
                    </button>
                  </TiltCard>
                );
              })}
            </div>
          </div>

          {/* Right: 3D Viewport Stage & Live Telemetry (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <Card className="flex-1 bg-card/60 backdrop-blur-xl border-border/80 shadow-2xl overflow-hidden flex flex-col">
              
              {/* Header Telemetry HUD */}
              <div className="px-5 py-3.5 border-b border-border/60 flex items-center justify-between bg-card/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-semibold uppercase text-foreground">
                    WebGL Real-Time Shading Engine
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                  <span className="hidden sm:inline">Orbit Camera: Enabled</span>
                  <Badge variant="outline" className="text-[11px] font-mono border-primary/30 text-primary py-0">
                    60 FPS
                  </Badge>
                </div>
              </div>

              {/* 3D Model Canvas Viewport */}
              <div className="relative w-full h-[360px] sm:h-[420px] bg-gradient-to-b from-background/90 via-background/40 to-background/90 flex items-center justify-center">
                <ThreeModelViewer
                  className="w-full h-full"
                  initialModel={activeModel}
                  initialTheme={activeTheme}
                  interactive={true}
                />
              </div>

              {/* Bottom Metrics HUD */}
              <CardContent className="p-5 border-t border-border/60 bg-card/40">
                <div className="mb-3">
                  <div className="text-xs font-mono text-primary uppercase tracking-wider mb-1">
                    {architectureSpecs[selectedSpec].headline}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {architectureSpecs[selectedSpec].description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/40">
                  {architectureSpecs[selectedSpec].metrics.map((m) => (
                    <div key={m.label} className="p-2.5 rounded-xl bg-background/50 border border-border/60">
                      <div className="text-[10px] uppercase font-mono text-muted-foreground">
                        {m.label}
                      </div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-foreground mt-0.5">
                        {m.val}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeTechLab;

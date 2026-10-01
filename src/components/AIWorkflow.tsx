"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Cpu,
  Layers,
  ShieldCheck,
  Workflow,
  Terminal,
  Database,
  Code2,
  GitBranch,
  Sparkles,
  Bot,
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Zap,
} from "lucide-react";

export interface PipelineStep {
  id: number;
  label: string;
  sublabel: string;
  icon: typeof Brain;
  latency: string;
  details: string;
  codeSnippet: string;
}

const pipelineSteps: PipelineStep[] = [
  {
    id: 0,
    label: "1. Ingestion & Intent Parsing",
    sublabel: "Multi-Modal Input (Voice / Text)",
    icon: Terminal,
    latency: "< 15ms",
    details:
      "Captures raw speech-to-text transcripts or user keyboard inputs. Normalizes characters, verifies session tokens, and checks rate limits.",
    codeSnippet: "const intent = await parseIntent(request.body, { sessionToken, sanitize: true });",
  },
  {
    id: 1,
    label: "2. Vector Embeddings & RAG",
    sublabel: "Context Window Assembly",
    icon: Database,
    latency: "< 45ms",
    details:
      "Calculates dense vector embeddings, performs cosine-similarity search against indexed technical docs, and injects verified ground-truth context.",
    codeSnippet: "const context = await vectorStore.query({ vector: embed(prompt), topK: 4 });",
  },
  {
    id: 2,
    label: "3. Schema Guardrails & Zod",
    sublabel: "Defensive Prompt Formulation",
    icon: ShieldCheck,
    latency: "< 8ms",
    details:
      "Applies strict Zod JSON schemas, system instructions, and security boundaries to eliminate prompt injections and hallucinated formatting.",
    codeSnippet: "const payload = PromptSchema.parse({ systemPrompt, context, tools: agentTools });",
  },
  {
    id: 3,
    label: "4. Gemini 2.5 Server Streaming",
    sublabel: "Sub-Second Token Generation",
    icon: Cpu,
    latency: "< 240ms TTFB",
    details:
      "Initiates server-side streaming via @google/genai SDK on Node.js/Edge. Pipes chunked SSE (Server-Sent Events) to client with zero-key exposure.",
    codeSnippet: "const stream = await ai.models.generateContentStream({ model: 'gemini-2.5-flash', contents });",
  },
  {
    id: 4,
    label: "5. Autonomous Tool Calling",
    sublabel: "Deterministic Mutation & Cache Sync",
    icon: Workflow,
    latency: "< 60ms",
    details:
      "When the LLM yields a function call, the backend executes deterministic Server Actions (e.g. database updates, email dispatch) and confirms execution.",
    codeSnippet: "if (toolCall) await executeServerAction(toolCall.name, toolCall.args);",
  },
];

const AIWorkflow = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < pipelineSteps.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1200);
  };

  const engineeringPillars = [
    {
      icon: Brain,
      title: "Generative AI & Real-Time LLM Streaming",
      description:
        "Building resilient server-side Next.js Route Handlers leveraging Gemini 2.5 streaming, structured Zod schemas, and defensive fallback patterns to deliver sub-second generative responses.",
      tag: "LLM Orchestration",
    },
    {
      icon: Database,
      title: "Retrieval-Augmented Generation (RAG)",
      description:
        "Developing context-aware retrieval architectures with vector embeddings, semantic ranking, and high-performance hybrid indexing to eliminate hallucination in domain-specific tasks.",
      tag: "Vector Systems",
    },
    {
      icon: Workflow,
      title: "Autonomous Agentic Tool-Calling Loops",
      description:
        "Configuring function-calling schemas that allow LLM agents to safely query database states, invoke transactional Server Actions, and execute verified workflows.",
      tag: "AI Agents",
    },
    {
      icon: GitBranch,
      title: "Continuous Integration & Docker Staging",
      description:
        "Packaging Next.js standalone container images with multi-stage Docker builds, lint verification gates, and automated GitHub Actions deployment pipelines.",
      tag: "DevOps & CI/CD",
    },
  ];

  const architecturalPrinciples = [
    {
      title: "Zero-Leak Server-Side AI Secret Safety",
      detail:
        "All model credentials and Gemini API keys strictly reside on server-side runtime environments, proxied via secure Next.js Route Handlers with rate limiting.",
    },
    {
      title: "Zero-Bundle React Server Components",
      detail:
        "Pushing heavy compute, Markdown parsers, and data pipelines to React Server Components, keeping the client bundle lean and Core Web Vitals in the 99th percentile.",
    },
    {
      title: "Deterministic State & Server Actions",
      detail:
        "Handling database mutations with native Next.js Server Actions, optimistic UI feedback, and automatic tag-based cache revalidation.",
    },
  ];

  return (
    <section
      id="engineering-standards"
      aria-labelledby="engineering-heading"
      className="py-24 bg-muted/20 relative overflow-hidden border-y border-border/40"
    >
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 max-w-6xl z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge
            variant="outline"
            className="px-3.5 py-1 text-xs font-mono border-primary/40 text-primary bg-primary/10"
          >
            <Bot className="w-3.5 h-3.5 mr-1.5" />
            AI Engineering & System Discipline
          </Badge>
          <h2
            id="engineering-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
          >
            Production AI Pipelines &{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              System Engineering
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Architecting end-to-end generative AI systems: sub-second server-side streaming,
            context-grounded RAG vector pipelines, agentic tool execution, and containerized deployment.
          </p>
        </div>

        {/* Interactive AI Pipeline Simulator */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-card/85 backdrop-blur-md border border-border/80 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border/50">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-lg font-bold text-foreground">
                  Interactive AI Agent Execution Pipeline
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Step-by-step lifecycle of an AI interaction from user input to deterministic server execution.
              </p>
            </div>

            <Button
              size="sm"
              onClick={startSimulation}
              disabled={isSimulating}
              className="rounded-xl font-mono text-xs px-4 h-9 font-semibold bg-gradient-to-r from-primary to-cyan-500 hover:brightness-110 text-white shadow-sm flex items-center gap-1.5 shrink-0"
            >
              {isSimulating ? (
                <>
                  <Zap className="w-3.5 h-3.5 animate-bounce text-amber-300" />
                  <span>Streaming Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Pipeline Flow</span>
                </>
              )}
            </Button>
          </div>

          {/* Stepper Flow Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-6">
            {pipelineSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[100px] ${
                    isActive
                      ? "bg-primary/10 border-primary shadow-sm"
                      : isPast
                      ? "bg-muted/40 border-border/70 hover:border-primary/40"
                      : "bg-card/40 border-border/40 opacity-70 hover:opacity-100"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePipelineIndicator"
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-cyan-400"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground font-semibold">
                      {step.latency}
                    </span>
                  </div>

                  <div>
                    <h4
                      className={`text-xs font-bold leading-tight ${
                        isActive ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {step.label}
                    </h4>
                    <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                      {step.sublabel}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Inspector */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-6 p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/70 grid sm:grid-cols-12 gap-4 items-center"
            >
              <div className="sm:col-span-7 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                    Active Stage: {pipelineSteps[activeStep].label}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    Avg Latency: {pipelineSteps[activeStep].latency}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  {pipelineSteps[activeStep].details}
                </p>
              </div>

              <div className="sm:col-span-5 p-3 rounded-xl bg-card border border-border/80 font-mono text-[11px] text-muted-foreground overflow-x-auto">
                <div className="text-[10px] text-primary/80 uppercase mb-1 font-semibold">
                  Server Implementation:
                </div>
                <code className="text-foreground/90 block whitespace-pre-wrap">
                  {pipelineSteps[activeStep].codeSnippet}
                </code>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 2-Column Core Technical Practices */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Core Engineering Pillars */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              <span>Core AI & Architecture Practices</span>
            </h3>
            {engineeringPillars.map((pillar) => (
              <Card
                key={pillar.title}
                className="border border-border/70 bg-card/85 hover:border-primary/40 transition-all shadow-sm rounded-2xl overflow-hidden"
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5 border border-primary/20">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-base font-semibold text-foreground">
                        {pillar.title}
                      </h4>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50 shrink-0">
                        {pillar.tag}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Column: Architectural Principles */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Architecture Standards</span>
            </h3>

            <Card className="border border-border/70 bg-card/85 rounded-2xl shadow-sm">
              <CardContent className="p-6 space-y-5">
                {architecturalPrinciples.map((item, idx) => (
                  <div
                    key={item.title}
                    className={`space-y-1.5 ${
                      idx !== architecturalPrinciples.length - 1
                        ? "border-b border-border/50 pb-4"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                      <h4 className="text-sm font-bold text-foreground font-mono">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Engineering Manifesto Box */}
            <div className="p-5 rounded-2xl bg-card/90 border border-border/80 font-mono text-xs text-muted-foreground space-y-2.5 shadow-sm">
              <div className="flex items-center gap-1.5 text-foreground/80 pb-2 border-b border-border/40">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <span className="text-[11px] ml-1.5 text-muted-foreground font-semibold">
                  ai_systems_manifesto.ts
                </span>
              </div>
              <p className="text-foreground/90 leading-relaxed italic">
                "Production AI is systems engineering: guarding against hallucination through strict schemas, preserving security with server-side isolation, and delivering instant streaming through optimized transport pipelines."
              </p>
              <div className="pt-1 flex items-center justify-between text-[11px]">
                <span className="text-primary font-bold">Habtamu Amare</span>
                <span className="text-cyan-400">AI Engineer & Architect</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIWorkflow;

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Github,
  Play,
  Shield,
  Layers,
  Database,
  CheckCircle2,
  X,
  Zap,
  Cpu,
  Brain,
  Workflow,
  Terminal,
  Box,
  Eye,
  ArrowUpRight,
  Server,
  Video,
  Laptop,
  Star,
  Activity,
  Code2,
  ShoppingBag,
  Lock,
} from "lucide-react";
import amazonCloneImage from "@/assets/amazon-clone-project.jpg";
import netfliximage from "@/assets/netflix.png";
import habnetImage from "@/assets/habnet-project.jpg";
import TiltCard from "@/components/TiltCard";
import ThreeModelViewer, { ModelType, ColorTheme } from "@/components/ThreeModelViewer";

const getImgSrc = (img: unknown): string => {
  if (typeof img === "string") return img;
  if (img && typeof img === "object" && "src" in img) return (img as { src: string }).src;
  return "";
};

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  videoUrl?: string;
  demoUrl?: string;
  githubUrl: string;
  technologies: string[];
  features: string[];
  category: "Full Stack" | "Backend & APIs" | "E-Commerce" | "Systems";
  status: "Production" | "Live Demo" | "Completed";
  stars: number;
  lastUpdated: string;
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    security: string;
    metrics: { label: string; value: string }[];
  };
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"projects" | "architecture-lab" | "3d-lab">("projects");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [modalTab, setModalTab] = useState<"overview" | "architecture" | "video">("overview");

  // Architecture Lab Simulator State
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // 3D Lab State
  const [activeModel, setActiveModel] = useState<ModelType>("cyber-core");
  const [activeTheme, setActiveTheme] = useState<ColorTheme>("cyan");
  const [selectedSpec, setSelectedSpec] = useState<number>(0);

  const projects: Project[] = [
    {
      id: "afrimart-trendmart",
      title: "AfriMart & TrendMart",
      subtitle: "Multi-Engine E-Commerce Platforms",
      description:
        "Full-stack marketplace solutions. AfriMart engineered with MongoDB + Mongoose for flexible schemas (products, users, orders). TrendMart built with PostgreSQL relational models for transactional integrity, inventory balance, and analytics.",
      image: getImgSrc(amazonCloneImage),
      demoUrl: "https://github.com/habtedev",
      githubUrl: "https://github.com/habtedev",
      technologies: ["Next.js 15", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "Tailwind CSS"],
      features: [
        "AfriMart: Flexible NoSQL document models for high-growth catalog & orders",
        "TrendMart: ACID-compliant PostgreSQL schemas for transactions & stock balancing",
        "Secure RESTful API integration with JWT auth & role-based access control",
        "Optimized database queries, indexes, and connection pooling",
        "Modern responsive UI built with Next.js App Router and Tailwind CSS",
      ],
      category: "E-Commerce",
      status: "Production",
      stars: 48,
      lastUpdated: "2025",
      architecture: {
        frontend: "Next.js App Router, React Server Components, Tailwind CSS",
        backend: "Node.js & Express.js REST APIs with modular middleware",
        database: "MongoDB (Mongoose) + PostgreSQL (Prisma) dual-engine",
        security: "JWT auth cookies, input sanitization, rate-limiting",
        metrics: [
          { label: "Architecture", value: "Dual-Engine" },
          { label: "Databases", value: "Mongo + Postgres" },
          { label: "Auth", value: "JWT + RBAC" },
        ],
      },
    },
    {
      id: "amazon-clone",
      title: "Amazon E-Commerce Platform",
      subtitle: "MERN & Next.js Full-Stack System",
      description:
        "Enterprise e-commerce platform with Next.js App Router, end-to-end type safety, optimistic cart updates, Chapa payment gateway, and role-based inventory management.",
      image: getImgSrc(amazonCloneImage),
      demoUrl: "https://github.com/habtedev/Amazone",
      githubUrl: "https://github.com/habtedev/Amazone",
      technologies: ["Next.js 15", "TypeScript", "Node.js", "MongoDB", "Chapa AI", "Tailwind CSS"],
      features: [
        "Server Actions and Express REST endpoints for type-safe mutations",
        "Chapa secure payment webhook integration and signature validation",
        "Role-based access control (Admin / Customer) with JWT session cookies",
        "Optimistic UI updates for high-speed cart and checkout operations",
        "Full-text search and category filtering pipelines",
      ],
      category: "E-Commerce",
      status: "Completed",
      stars: 28,
      lastUpdated: "2024",
      architecture: {
        frontend: "Next.js App Router, Basket State Persistence, Debounced Search",
        backend: "Node.js & Express REST API server with idempotent order pipelines",
        database: "MongoDB with transactional updates for cart/inventory balance",
        security: "Chapa payment gateway encryption, secure salt password hashing",
        metrics: [
          { label: "Lighthouse", value: "98/100" },
          { label: "Checkout", value: "3 Steps" },
          { label: "State Sync", value: "SSR + Client" },
        ],
      },
    },
    {
      id: "netflix-stream",
      title: "Netflix Media Platform",
      subtitle: "Dynamic Streaming UI & REST API",
      description:
        "Full-stack streaming platform clone built with Next.js / React, TMDB API caching, trailer playback modal, PayPal/Stripe payment options, and responsive UI components.",
      image: getImgSrc(netfliximage),
      demoUrl: "https://netflix-amber-eight-17.vercel.app/",
      githubUrl: "https://github.com/habtedev/Netflix",
      technologies: ["Next.js", "React", "Node.js", "MongoDB", "Stripe API", "PayPal SDK"],
      features: [
        "Responsive Next.js UI with dynamic movie banners and trailer playback",
        "User authentication and protected routes with JWT session cookies",
        "Personalized 'My List' watchlist with optimistic updates",
        "Stripe & PayPal payment flow integration with webhook verification",
        "Multi-language support with lightweight i18n",
      ],
      category: "Full Stack",
      status: "Live Demo",
      stars: 18,
      lastUpdated: "2024",
      architecture: {
        frontend: "Next.js, TMDB API cache, React YouTube embed player",
        backend: "Next.js Route Handlers & Node.js REST proxy with caching",
        database: "MongoDB Atlas for user watchlist and billing records",
        security: "Stripe/PayPal webhook signature verification",
        metrics: [
          { label: "Video Start", value: "< 280ms" },
          { label: "Responsive", value: "100%" },
          { label: "API Cache", value: "Edge Cache" },
        ],
      },
    },
    {
      id: "habnet-threat",
      title: "HabNet Cyber Defense",
      subtitle: "Security Telemetry & Network Guard",
      description:
        "Full-stack cybersecurity telemetry and network defense dashboard. Real-time connection inspection, automated CVE vulnerability tracking, active security auditing, and socket dispatching.",
      image: getImgSrc(habnetImage),
      demoUrl: "https://github.com/habtedev",
      githubUrl: "https://github.com/habtedev",
      technologies: ["Node.js", "Express.js", "TypeScript", "MongoDB", "WebSockets", "Tailwind CSS"],
      features: [
        "Real-time network traffic telemetry and endpoint monitoring",
        "Vulnerability assessment with CVE database cross-referencing",
        "Multi-layered rate limiting and instant intrusion alerts",
        "Interactive security incident visualizer with status filters",
        "Zero-trust session encryption with SHA-256 integrity checks",
      ],
      category: "Systems",
      status: "Completed",
      stars: 38,
      lastUpdated: "2024",
      architecture: {
        frontend: "Next.js React 18, Tailwind CSS, Live Threat Flow Graph",
        backend: "Node.js micro-telemetry daemon, WebSocket event emitter",
        database: "MongoDB with capped collections for high-throughput packet logs",
        security: "Zero-trust session tokens, SHA-256 integrity hashing",
        metrics: [
          { label: "Latency", value: "< 85ms" },
          { label: "CVE Sync", value: "Automated" },
          { label: "Uptime", value: "99.98%" },
        ],
      },
    },
    {
      id: "python-django-api",
      title: "Django Enterprise Services",
      subtitle: "Python Backend & Relational Models",
      description:
        "Modular backend services built with Python & Django REST Framework. Implements relational database modeling in PostgreSQL/MySQL, token-based authentication, and structured business logic.",
      image: getImgSrc(habnetImage),
      demoUrl: "https://github.com/habtedev",
      githubUrl: "https://github.com/habtedev",
      technologies: ["Python", "Django", "Django REST", "PostgreSQL", "MySQL", "JWT"],
      features: [
        "Django REST Framework for modular API viewsets and serializers",
        "Relational schema design with foreign key constraints & integrity",
        "Token and session-based authentication with permission classes",
        "Database migration management and query set optimization",
        "Integration with frontend clients via clean JSON payloads",
      ],
      category: "Backend & APIs",
      status: "Completed",
      stars: 26,
      lastUpdated: "2025",
      architecture: {
        frontend: "React client consuming Django REST endpoints",
        backend: "Python 3.11, Django 5.0, Django REST Framework",
        database: "PostgreSQL with connection pooling & indexes",
        security: "CSRF mitigation, Django ORM SQL-injection defense",
        metrics: [
          { label: "Backend", value: "Django + Python" },
          { label: "Database", value: "PostgreSQL" },
          { label: "Auth", value: "Token / JWT" },
        ],
      },
    },
    {
      id: "mern-stack-suite",
      title: "WebStack MERN Applications",
      subtitle: "3+ Production MERN Stack Projects",
      description:
        "Suite of 3+ full-stack web applications developed at WebStack Academy. Features 10+ RESTful API endpoints, middleware-based error handling, MongoDB Mongoose modeling, and modular React components.",
      image: getImgSrc(amazonCloneImage),
      demoUrl: "https://github.com/habtedev",
      githubUrl: "https://github.com/habtedev",
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Git", "Postman"],
      features: [
        "Built and maintained 3+ MERN stack applications in agile team workflow",
        "Designed and tested 10+ REST API endpoints using Postman",
        "Applied middleware architecture for authentication, logging, and error handling",
        "Implemented responsive UI components using React hooks and state management",
        "Collaborative Git version control and documentation-driven development",
      ],
      category: "Full Stack",
      status: "Production",
      stars: 34,
      lastUpdated: "2025",
      architecture: {
        frontend: "React.js with modular component architecture",
        backend: "Node.js & Express.js with custom middleware pipeline",
        database: "MongoDB with Mongoose schemas & validation",
        security: "JWT authentication, CORS headers, sanitized inputs",
        metrics: [
          { label: "Endpoints", value: "10+ REST" },
          { label: "Stack", value: "MERN" },
          { label: "Testing", value: "Postman Suite" },
        ],
      },
    },
  ];

  const architectureSteps = [
    {
      id: 0,
      label: "1. Request Ingestion",
      sublabel: "Routing & CORS Middleware",
      icon: Terminal,
      latency: "< 10ms",
      details:
        "Captures incoming HTTP requests, validates headers, enforces CORS policies, and rate-limits client IP addresses.",
      codeSnippet: "app.use(helmet()); app.use(cors({ origin: process.env.CLIENT_URL }));",
    },
    {
      id: 1,
      label: "2. Input Validation",
      sublabel: "Schema Guardrails & Sanitization",
      icon: Shield,
      latency: "< 5ms",
      details:
        "Validates request payloads against strict Zod/Joi schemas, sanitizing SQL injection and XSS vectors before execution.",
      codeSnippet: "const validatedBody = userSchema.parse(req.body);",
    },
    {
      id: 2,
      label: "3. JWT Authentication",
      sublabel: "Token Verification & RBAC",
      icon: Lock,
      latency: "< 15ms",
      details:
        "Decodes and verifies JWT session tokens from HTTP-only cookies, attaching the authenticated user and permissions to the request context.",
      codeSnippet: "const user = jwt.verify(token, process.env.JWT_SECRET);",
    },
    {
      id: 3,
      label: "4. Business Logic Layer",
      sublabel: "Controller & Service Methods",
      icon: Server,
      latency: "< 25ms",
      details:
        "Executes clean modular service controllers, handling inventory balance, transactions, and business rules.",
      codeSnippet: "const order = await orderService.createOrder(validatedBody, user.id);",
    },
    {
      id: 4,
      label: "5. Database Operations",
      sublabel: "PostgreSQL & MongoDB Dual-Engine",
      icon: Database,
      latency: "< 35ms",
      details:
        "Performs optimized ACID transactions in PostgreSQL or high-throughput document mutations in MongoDB with indexed queries.",
      codeSnippet: "const result = await prisma.$transaction([updateStock, recordPayment]);",
    },
    {
      id: 5,
      label: "6. JSON Response Delivery",
      sublabel: "HTTP Status & Error Formatting",
      icon: Zap,
      latency: "< 8ms",
      details:
        "Returns standardized JSON payloads with appropriate HTTP status codes (200, 201, 400, 500) and structured error handling.",
      codeSnippet: "return res.status(200).json({ success: true, data: result });",
    },
  ];

  const architectureSpecs = [
    {
      title: "Backend Security & Middleware",
      model: "torus-knot" as ModelType,
      theme: "cyan" as ColorTheme,
      icon: Shield,
      headline: "Zero-Trust Protocol & Middleware Architecture",
      description:
        "Engineered with strict CORS policies, Helmet security headers, CSRF token mitigation, rate-limiting, and hardened JWT token authentication.",
      metrics: [
        { label: "Security", val: "Helmet + CSRF" },
        { label: "Auth", val: "JWT + Cookies" },
        { label: "Validation", val: "Zod / Joi Schema" },
      ],
    },
    {
      title: "Full-Stack Node.js & Next.js Core",
      model: "cyber-core" as ModelType,
      theme: "indigo" as ColorTheme,
      icon: Cpu,
      headline: "Unified React & Node.js Backend Architecture",
      description:
        "Modern architecture combining React & Next.js frontend components with Node.js / Express.js REST APIs and server-side operations.",
      metrics: [
        { label: "Stack", val: "MERN + Next.js" },
        { label: "API Style", val: "RESTful Endpoints" },
        { label: "Type Safety", val: "TypeScript ES6+" },
      ],
    },
    {
      title: "Dual-Engine Database Architecture",
      model: "matrix-cube" as ModelType,
      theme: "emerald" as ColorTheme,
      icon: Database,
      headline: "Relational PostgreSQL & Document MongoDB",
      description:
        "Dual-engine data tier utilizing PostgreSQL for ACID relational integrity (orders, billing, users) coupled with MongoDB for flexible catalog and logs.",
      metrics: [
        { label: "Relational", val: "PostgreSQL & MySQL" },
        { label: "Document", val: "MongoDB & Mongoose" },
        { label: "Integrity", val: "ACID Transactions" },
      ],
    },
  ];

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= architectureSteps.length - 1) {
          clearInterval(stepInterval);
          setIsSimulating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
  };

  const categories = ["All", "Full Stack", "Backend & APIs", "E-Commerce", "Systems"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const openProjectModal = (project: Project) => {
    setPreviewProject(project);
    setModalTab(project.videoUrl ? "video" : "overview");
  };

  return (
    <section
      id="portfolio"
      className="py-10 sm:py-16 bg-gradient-to-b from-background via-muted/10 to-background border-t border-border/50 relative overflow-hidden"
    >
      <div className="container mx-auto px-3 sm:px-6 max-w-6xl">
        {/* ─── Header ─── */}
        <div className="text-center mb-6 sm:mb-8 space-y-1.5">
          <Badge
            variant="outline"
            className="px-3 py-0.5 text-xs font-mono border-primary/30 text-primary bg-primary/5"
          >
            <Layers className="w-3.5 h-3.5 mr-1.5" />
            Engineering Projects & Systems
          </Badge>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Featured Projects &{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Backend Architecture
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Production full-stack applications, MERN stack solutions, Python & Django services, and dual-engine database architectures.
          </p>

          {/* Tab Navigation */}
          <div className="pt-2 flex justify-center overflow-x-auto pb-0.5">
            <div className="inline-flex p-1 rounded-xl bg-card/90 border border-border/80 shadow-xs backdrop-blur-md gap-1">
              {[
                { id: "projects", label: `Projects (${projects.length})`, icon: Layers },
                { id: "architecture-lab", label: "API Lifecycle", icon: Server },
                { id: "3d-lab", label: "3D Stack Lab", icon: Box },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as typeof activeTab)}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                    activeTab === id
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── TAB 1: PRODUCTION SYSTEMS (3-COLUMN GRID: 3 x 2 = 6) ─── */}
        {activeTab === "projects" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                    activeFilter === cat
                      ? "bg-primary/20 text-primary border border-primary/40 font-semibold"
                      : "bg-muted/30 text-muted-foreground hover:text-foreground border border-border/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 2-Column Mobile & 3-Column Desktop Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
              {filteredProjects.map((project) => {
                return (
                  <TiltCard key={project.id} maxTilt={3} scale={1.01} className="h-full">
                    <Card
                      onClick={() => openProjectModal(project)}
                      className="h-full flex flex-col justify-between overflow-hidden bg-card/85 backdrop-blur-md border border-border/80 shadow-xs hover:shadow-md transition-all rounded-xl group cursor-pointer"
                    >
                      <div>
                        {/* Compact Thumbnail */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/40 border-b border-border/60">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />

                          {/* Top Badges */}
                          <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between pointer-events-none">
                            <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[10px] font-mono bg-background/90 backdrop-blur-md border border-border text-foreground font-medium truncate max-w-[55%]">
                              {project.category}
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 font-semibold">
                              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="hidden sm:inline">{project.status}</span>
                              <span className="sm:hidden">Live</span>
                            </span>
                          </div>

                          {/* Hover View Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 backdrop-blur-xs">
                            <span className="px-2 sm:px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-mono font-semibold shadow-md flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>Specs</span>
                            </span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-2.5 sm:p-3.5 space-y-1.5 sm:space-y-2">
                          <div>
                            <h3 className="text-xs sm:text-sm font-bold text-foreground leading-snug truncate group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-[10px] sm:text-[11px] text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                              {project.description}
                            </p>
                          </div>

                          {/* Mini Telemetry Chips */}
                          <div className="grid grid-cols-3 gap-0.5 sm:gap-1 pt-0.5">
                            {project.architecture.metrics.map((m) => (
                              <div
                                key={m.label}
                                className="p-0.5 sm:p-1 rounded bg-muted/30 border border-border/40 text-center"
                              >
                                <div className="text-[7px] sm:text-[8px] text-muted-foreground uppercase font-mono truncate">
                                  {m.label}
                                </div>
                                <div className="text-[9px] sm:text-[10px] font-mono font-bold text-foreground truncate mt-0.5">
                                  {m.value}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-0.5 sm:gap-1 pt-0.5">
                            {project.technologies.slice(0, 2).map((tech) => (
                              <span
                                key={tech}
                                className="text-[8px] sm:text-[9px] font-mono px-1 sm:px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/40 truncate"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 2 && (
                              <span className="text-[8px] sm:text-[9px] font-mono px-1 py-0.5 rounded bg-muted/40 text-muted-foreground">
                                +{project.technologies.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="p-2 sm:p-3 pt-0 flex items-center justify-between gap-1 border-t border-border/40 mt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openProjectModal(project);
                          }}
                          className="text-[10px] sm:text-xs font-mono text-primary hover:underline flex items-center gap-0.5 font-medium"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Specs</span>
                        </button>

                        <div className="flex items-center gap-1">
                          {project.demoUrl && project.demoUrl.startsWith("http") && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button className="h-6 sm:h-7 px-1.5 sm:px-2.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-mono font-semibold bg-primary/15 text-primary hover:bg-primary/25 border border-primary/30 flex items-center gap-0.5 transition-colors">
                                <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                <span>Demo</span>
                              </button>
                            </a>
                          )}

                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button className="h-6 sm:h-7 px-1.5 sm:px-2.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-mono bg-muted/40 text-muted-foreground hover:text-foreground border border-border/60 flex items-center gap-0.5 transition-colors">
                              <Github className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              <span className="hidden sm:inline">Code</span>
                            </button>
                          </a>
                        </div>
                      </div>
                    </Card>
                  </TiltCard>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── TAB 2: API & ARCHITECTURE LIFECYCLE ─── */}
        {activeTab === "architecture-lab" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="p-4 sm:p-6 rounded-2xl bg-card/85 backdrop-blur-md border border-border shadow-md space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 font-semibold mb-1">
                  <Server className="w-3.5 h-3.5" />
                  <span>REST API & Backend Lifecycle</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  Request Execution, Middleware & Database Pipeline
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 max-w-xl">
                  Verification of incoming API requests through CORS, Zod validation, JWT authentication, service business logic, and database transactions.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  size="sm"
                  className="rounded-lg font-mono text-xs font-semibold bg-gradient-to-r from-primary to-cyan-500 text-white shadow-xs hover:brightness-110 h-8 px-3"
                >
                  <Play className={`w-3 h-3 mr-1.5 ${isSimulating ? "animate-spin" : ""}`} />
                  <span>{isSimulating ? "Executing Request..." : "Simulate API Request"}</span>
                </Button>
              </div>
            </div>

            {/* Step Selection Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {architectureSteps.map((step, idx) => {
                const isCurrent = activeStep === idx;
                const isPassed = activeStep > idx;
                const Icon = step.icon;

                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isCurrent
                        ? "bg-primary/15 border-primary shadow-xs ring-1 ring-primary/40"
                        : isPassed
                        ? "bg-card/90 border-border/80 text-foreground"
                        : "bg-muted/20 border-border/40 text-muted-foreground hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div
                        className={`p-1 rounded-md ${
                          isCurrent
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                      </div>
                      <span className="text-[9px] font-mono font-semibold text-cyan-400">
                        {step.latency}
                      </span>
                    </div>
                    <div className="text-xs font-semibold truncate text-foreground">
                      {step.label}
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate mt-0.5">
                      {step.sublabel}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step Details & Code Block */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-muted/20 border border-border/70 grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center">
              <div className="lg:col-span-6 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-primary/20 text-primary border border-primary/30 font-semibold">
                    Step {activeStep + 1} of 6
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Telemetry: {architectureSteps[activeStep].latency}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-foreground">
                  {architectureSteps[activeStep].label}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {architectureSteps[activeStep].details}
                </p>
              </div>

              <div className="lg:col-span-6 p-3 rounded-lg bg-background/90 border border-border font-mono text-xs overflow-x-auto shadow-inner">
                <div className="text-[9px] text-muted-foreground uppercase mb-1 flex items-center justify-between">
                  <span>Backend Execution Logic</span>
                  <span className="text-emerald-400 font-semibold text-[10px]">Node.js / Express</span>
                </div>
                <pre className="text-primary font-semibold text-[11px] whitespace-pre-wrap">
                  <code>{architectureSteps[activeStep].codeSnippet}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── TAB 3: 3D SECURITY & TECH LAB ─── */}
        {activeTab === "3d-lab" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="p-4 sm:p-6 rounded-2xl bg-card/85 backdrop-blur-md border border-border shadow-md grid grid-cols-1 lg:grid-cols-12 gap-5 items-center"
          >
            {/* Left 3D Stage */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full aspect-square max-w-[280px] sm:max-w-[340px] rounded-xl bg-background/80 border border-border/80 overflow-hidden relative shadow-xs">
                <ThreeModelViewer
                  className="w-full h-full"
                  initialModel={activeModel}
                  initialTheme={activeTheme}
                  interactive={true}
                  compact={true}
                />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-muted-foreground bg-background/85 backdrop-blur-md px-2.5 py-1 rounded border border-border/60">
                  <span>Interactive WebGL</span>
                  <span className="text-primary uppercase font-bold">{activeModel}</span>
                </div>
              </div>

              {/* Model Switcher */}
              <div className="flex gap-1.5 mt-2.5">
                {(["cyber-core", "torus-knot", "matrix-cube"] as ModelType[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setActiveModel(m)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                      activeModel === m
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "bg-muted/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Architecture Specs */}
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-400 font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Zero-Trust Security & Database Tier</span>
              </div>

              <div className="space-y-1.5">
                {architectureSpecs.map((spec, i) => {
                  const isSelected = selectedSpec === i;
                  const Icon = spec.icon;

                  return (
                    <div
                      key={spec.title}
                      onClick={() => {
                        setSelectedSpec(i);
                        setActiveModel(spec.model);
                        setActiveTheme(spec.theme);
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-primary/10 border-primary shadow-xs ring-1 ring-primary/40"
                          : "bg-card/50 border-border/60 hover:bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-primary" />
                          <h4 className="text-xs sm:text-sm font-bold text-foreground">{spec.title}</h4>
                        </div>
                        <span className="text-[10px] font-mono text-primary font-semibold">
                          {spec.metrics[0].val}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {spec.description}
                      </p>

                      {isSelected && (
                        <div className="mt-2 grid grid-cols-3 gap-1 pt-1.5 border-t border-border/30">
                          {spec.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="p-1 rounded bg-background/50 border border-border/40 text-center"
                            >
                              <div className="text-[8px] text-muted-foreground uppercase font-mono truncate">
                                {m.label}
                              </div>
                              <div className="text-[10px] font-mono font-bold text-foreground truncate mt-0.5">
                                {m.val}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* ─── INTERACTIVE PROJECT PREVIEW MODAL ─── */}
      <AnimatePresence>
        {previewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-background/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setPreviewProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden max-h-[88vh] flex flex-col"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60 bg-muted/20 shrink-0">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
                    {previewProject.category}
                  </Badge>
                  <span className="text-xs sm:text-sm font-bold text-foreground truncate max-w-[220px] sm:max-w-md">
                    {previewProject.title}
                  </span>
                </div>
                <button
                  onClick={() => setPreviewProject(null)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-3.5 sm:p-4 space-y-3 flex-1">
                {/* Media Preview Section */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/60 border border-border/60 shadow-inner group">
                  {modalTab === "video" && previewProject.videoUrl ? (
                    <iframe
                      src={previewProject.videoUrl}
                      title={previewProject.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={previewProject.image}
                        alt={previewProject.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                      {previewProject.demoUrl && previewProject.demoUrl.startsWith("http") && (
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                          <a
                            href={previewProject.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-semibold shadow-md hover:brightness-110 transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Launch Live System</span>
                          </a>
                          <span className="text-[10px] font-mono text-muted-foreground bg-background/80 backdrop-blur px-2 py-0.5 rounded border border-border/50">
                            ⭐ {previewProject.stars} Stars
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Modal Sub-Tabs */}
                <div className="flex gap-1.5 border-b border-border/50 pb-1.5">
                  <button
                    onClick={() => setModalTab("overview")}
                    className={`px-3 py-1 rounded-md text-xs font-mono font-semibold transition-all ${
                      modalTab === "overview"
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground bg-muted/30"
                    }`}
                  >
                    Overview & Features
                  </button>
                  <button
                    onClick={() => setModalTab("architecture")}
                    className={`px-3 py-1 rounded-md text-xs font-mono font-semibold transition-all ${
                      modalTab === "architecture"
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground bg-muted/30"
                    }`}
                  >
                    Architecture & Stack
                  </button>
                  {previewProject.videoUrl && (
                    <button
                      onClick={() => setModalTab("video")}
                      className={`px-3 py-1 rounded-md text-xs font-mono font-semibold transition-all flex items-center gap-1 ${
                        modalTab === "video"
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground bg-muted/30"
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      Video Demo
                    </button>
                  )}
                </div>

                {/* Sub-Tab 1: Overview */}
                {modalTab === "overview" && (
                  <div className="space-y-2.5">
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {previewProject.description}
                    </p>

                    {/* Telemetry Metrics */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {previewProject.architecture.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="p-1.5 rounded-lg bg-muted/30 border border-border/50 text-center"
                        >
                          <div className="text-[8px] sm:text-[9px] text-muted-foreground uppercase font-mono">{m.label}</div>
                          <div className="text-xs font-mono font-bold text-foreground mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-1 pt-1">
                      <h4 className="text-[10px] font-mono font-semibold text-foreground uppercase tracking-wider">
                        Key Capabilities
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {previewProject.features.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-1.5 p-2 rounded-lg bg-card border border-border/40 text-xs text-muted-foreground"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-Tab 2: Architecture & Stack */}
                {modalTab === "architecture" && (
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="p-2 rounded-xl bg-card border border-border/60 space-y-0.5">
                        <div className="text-[10px] font-mono font-semibold text-primary uppercase flex items-center gap-1">
                          <Laptop className="w-3 h-3" /> Frontend Architecture
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {previewProject.architecture.frontend}
                        </p>
                      </div>

                      <div className="p-2 rounded-xl bg-card border border-border/60 space-y-0.5">
                        <div className="text-[10px] font-mono font-semibold text-cyan-400 uppercase flex items-center gap-1">
                          <Server className="w-3 h-3" /> Backend & APIs
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {previewProject.architecture.backend}
                        </p>
                      </div>

                      <div className="p-2 rounded-xl bg-card border border-border/60 space-y-0.5">
                        <div className="text-[10px] font-mono font-semibold text-emerald-400 uppercase flex items-center gap-1">
                          <Database className="w-3 h-3" /> Database & Storage
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {previewProject.architecture.database}
                        </p>
                      </div>

                      <div className="p-2 rounded-xl bg-card border border-border/60 space-y-0.5">
                        <div className="text-[10px] font-mono font-semibold text-indigo-400 uppercase flex items-center gap-1">
                          <Shield className="w-3 h-3" /> Security Protocols
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {previewProject.architecture.security}
                        </p>
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-1 space-y-1">
                      <h4 className="text-[10px] font-mono font-semibold text-foreground uppercase tracking-wider">
                        Full Technology Stack
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {previewProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-primary/10 text-primary border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Toolbar */}
              <div className="p-3 bg-muted/20 border-t border-border/60 flex items-center justify-between gap-2 shrink-0">
                <span className="text-[10px] font-mono text-muted-foreground">
                  Updated: {previewProject.lastUpdated}
                </span>

                <div className="flex items-center gap-2">
                  {previewProject.demoUrl && previewProject.demoUrl.startsWith("http") && (
                    <a
                      href={previewProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="h-7 px-3 rounded-lg text-xs font-mono font-semibold"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        <span>Live Demo</span>
                      </Button>
                    </a>
                  )}

                  <a
                    href={previewProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-3 rounded-lg text-xs font-mono"
                    >
                      <Github className="w-3.5 h-3.5 mr-1" />
                      <span>Source Code</span>
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

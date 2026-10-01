"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  BookOpen,
  Search,
  Award,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  ShieldCheck,
  Terminal,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  Workflow,
  Boxes,
  Activity,
  Check,
} from "lucide-react";

export interface Course {
  code: string;
  title: string;
  category: "Algorithms & Theory" | "Systems & Cloud" | "Full-Stack & Data" | "Security & Networks";
  level: "Advanced Core" | "Core Foundation" | "Specialization";
  grade: "High Distinction" | "Distinction";
  description: string;
  icon: typeof Code2;
  keyTopics: string[];
  capstoneLab: {
    title: string;
    description: string;
    metrics: string;
  };
  technologies: string[];
  hours: number;
}

export const coursesData: Course[] = [
  {
    code: "CS-301",
    title: "Advanced Data Structures & Algorithm Design",
    category: "Algorithms & Theory",
    level: "Advanced Core",
    grade: "High Distinction",
    icon: Cpu,
    hours: 64,
    description:
      "Mathematical analysis of algorithmic complexity (Big-O, Big-Omega, Big-Theta), dynamic programming paradigms, graph traversal theory, and advanced self-balancing trees.",
    keyTopics: [
      "Asymptotic Complexity & Recurrence Relations",
      "Self-Balancing Trees (AVL, Red-Black)",
      "Dynamic Programming & Memoization",
      "Graph Algorithms (Dijkstra, A*, Prim)",
      "Amortized Analysis & Hash Collision Strategies",
      "Divide-and-Conquer Optimization",
    ],
    capstoneLab: {
      title: "Optimized Graph Routing & Memory-Mapped Cache Benchmarker",
      description:
        "Engineered an ultra-fast in-memory pathfinding engine with custom heap allocators and sub-millisecond query execution across 100k+ vertex nodes.",
      metrics: "O(V log V + E) execution • <1.2ms latency",
    },
    technologies: ["C++", "Python", "Data Profilers", "Algorithmic Benchmarks"],
  },
  {
    code: "CS-405",
    title: "Distributed Systems & Cloud Architecture",
    category: "Systems & Cloud",
    level: "Advanced Core",
    grade: "High Distinction",
    icon: Workflow,
    hours: 60,
    description:
      "Principles of decentralized computing, fault tolerance, synchronous vs asynchronous networks, consensus algorithms (Raft/Paxos), and microservice topology.",
    keyTopics: [
      "Raft Consensus & Leader Election",
      "CAP & PACELC Theoretical Constraints",
      "RPC Protocols & Message Serialization",
      "Distributed Caching & Invalidation",
      "Event-Driven Architectures & Pub/Sub",
      "Fault Isolation & Circuit Breakers",
    ],
    capstoneLab: {
      title: "Fault-Tolerant Distributed Key-Value Store with Quorum Replication",
      description:
        "Designed a distributed replicated state machine simulating node failures, split-brain mitigation, and automated master reelection.",
      metrics: "Quorum consistency • Zero-data-loss failover",
    },
    technologies: ["Docker", "Node.js Sockets", "Redis", "Distributed Tracing"],
  },
  {
    code: "SWE-410",
    title: "Full-Stack Web Systems & Next.js Architecture",
    category: "Full-Stack & Data",
    level: "Specialization",
    grade: "High Distinction",
    icon: Layers,
    hours: 68,
    description:
      "Comprehensive full-stack architecture combining React Server Components for zero-bundle data streaming, Next.js Server Actions for deterministic database mutations, and Route Handlers for high-throughput REST APIs.",
    keyTopics: [
      "Next.js App Router & Hybrid Rendering (SSR/SSG/ISR)",
      "React Server Components & Zero-Bundle Architecture",
      "Server Actions with Zod Schema Validation",
      "Edge Middleware & Route Handlers",
      "Optimistic UI & Dynamic Cache Revalidation",
      "Web Vitals (LCP, CLS, INP) Optimization",
    ],
    capstoneLab: {
      title: "High-Concurrency Enterprise Next.js Commerce & Telemetry Platform",
      description:
        "Architected an end-to-end full-stack portal handling unified server-side mutations, PostgreSQL transactions, and sub-100ms first-contentful paint.",
      metrics: "99+ Lighthouse score • 100% Type-safe pipeline",
    },
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
  },
  {
    code: "CS-320",
    title: "Database Management Systems & Relational Optimization",
    category: "Full-Stack & Data",
    level: "Core Foundation",
    grade: "High Distinction",
    icon: Database,
    hours: 58,
    description:
      "Relational algebra, schema normalization (1NF through BCNF), indexing mechanics (B-Tree, Hash, GIN), ACID isolation levels, transaction concurrency locks, and query execution plan optimization.",
    keyTopics: [
      "Relational Schema Design & Normalization",
      "B-Tree & Hash Index Internals",
      "ACID Concurrency & MVCC Mechanics",
      "Query Execution Plan Analysis (EXPLAIN ANALYZE)",
      "Connection Pooling & Transaction Deadlocks",
      "NoSQL Data Modeling Tradeoffs",
    ],
    capstoneLab: {
      title: "High-Volume SQL Transaction Benchmarker with Connection Pooling",
      description:
        "Engineered transactional stress test scripts profiling index selectivity, connection pooling thresholds, and query latency reductions from 340ms to 8ms.",
      metrics: "97% Query latency reduction • ACID verified",
    },
    technologies: ["PostgreSQL", "Prisma ORM", "MongoDB", "Redis", "pgAdmin"],
  },
  {
    code: "SEC-380",
    title: "Computer Networks & Cybersecurity Defense",
    category: "Security & Networks",
    level: "Advanced Core",
    grade: "Distinction",
    icon: ShieldCheck,
    hours: 56,
    description:
      "Comprehensive exploration of the OSI and TCP/IP networking models, cryptographic primitives (RSA, AES, SHA), TLS handshake protocols, socket engineering, and defensive intrusion detection.",
    keyTopics: [
      "TCP/IP Stack & Flow Control Protocols",
      "TLS 1.3 Handshake & Asymmetric Cryptography",
      "Packet Inspection & Packet Sniffing Defense",
      "Rate Limiting & DDoS Mitigation",
      "Zero-Trust Architecture & Session Encryption",
      "CVE Vulnerability Auditing & Penetration Defense",
    ],
    capstoneLab: {
      title: "Real-Time Packet Inspection & Automated Threat Telemetry Daemon",
      description:
        "Created an active packet inspection listener capturing suspicious payload signatures, IP flood anomalies, and streaming live incident events.",
      metrics: "Live socket stream • CVE database lookup",
    },
    technologies: ["Wireshark", "Node.js Sockets", "OpenSSL", "Linux Iptables", "HabNet"],
  },
  {
    code: "CS-204",
    title: "Operating Systems & Systems Programming",
    category: "Systems & Cloud",
    level: "Core Foundation",
    grade: "Distinction",
    icon: Terminal,
    hours: 54,
    description:
      "Low-level operating system architectures, kernel vs user mode transitions, process scheduling algorithms, POSIX thread synchronization, virtual memory paging, and file system mechanics.",
    keyTopics: [
      "Process & Thread Lifecycles & Context Switching",
      "Mutual Exclusion, Mutexes & Semaphores",
      "Virtual Memory, TLB Paging & Page Faults",
      "Deadlock Detection, Prevention & Banker's Algorithm",
      "POSIX System Calls & File Descriptors",
      "Inter-Process Communication (Pipes, Sockets)",
    ],
    capstoneLab: {
      title: "Multi-Threaded Task Scheduling Engine with Priority Queues",
      description:
        "Developed a C-based thread pool scheduler managing preemptive task prioritization, thread worker recycling, and deadlock avoidance.",
      metrics: "Thread synchronization • Zero race conditions",
    },
    technologies: ["C", "Linux Kernel APIs", "POSIX Threads", "GDB", "Bash"],
  },
  {
    code: "SWE-315",
    title: "Object-Oriented Software Design & Clean Architecture",
    category: "Algorithms & Theory",
    level: "Core Foundation",
    grade: "High Distinction",
    icon: BookOpen,
    hours: 60,
    description:
      "Industrial software engineering discipline emphasizing SOLID principles, Gang of Four design patterns, domain-driven design (DDD), defensive programming, and automated CI/CD testing.",
    keyTopics: [
      "SOLID Principles (Single Responsibility to Dependency Inversion)",
      "Design Patterns (Factory, Strategy, Observer, Decorator)",
      "Domain-Driven Design (Entities, Value Objects, Repositories)",
      "Unit & Integration Testing Architectures",
      "Refactoring Strategies & Technical Debt Reduction",
      "Clean Code, Modularity & Loose Coupling",
    ],
    capstoneLab: {
      title: "Enterprise Modular System with Strict Layered Boundaries",
      description:
        "Engineered a decoupled multi-tier service separating presentation, domain, and data access layers with 95%+ test coverage.",
      metrics: "95%+ Automated test coverage • Clean separation",
    },
    technologies: ["TypeScript", "Jest", "GitHub Actions", "Docker", "ESLint"],
  },
  {
    code: "ERP-420",
    title: "Enterprise Systems & Business Process Automation",
    category: "Full-Stack & Data",
    level: "Specialization",
    grade: "High Distinction",
    icon: Boxes,
    hours: 52,
    description:
      "Architectural design of enterprise resource planning platforms, custom Odoo module development, relational business workflows, and external API bridge integration.",
    keyTopics: [
      "Odoo Multi-Tier Architecture & Module Structure",
      "Python ORM & Relational Field Modeling",
      "XML-RPC & REST Integration Endpoints",
      "Supply Chain, Inventory & Procurement Workflows",
      "Automated Business Logic & Server Actions",
      "Enterprise Reporting & Security Groups",
    ],
    capstoneLab: {
      title: "Automated Multi-Company Inventory & Procurement Sync System",
      description:
        "Built custom Odoo automation connecting frontend e-commerce order dispatches with backend warehouse stock reordering and accounting journals.",
      metrics: "Synchronous stock validation • Custom Python module",
    },
    technologies: ["Python", "Odoo 16/17", "PostgreSQL", "XML-RPC", "REST APIs"],
  },
];

const categories = [
  "All Courses",
  "Algorithms & Theory",
  "Systems & Cloud",
  "Full-Stack & Data",
  "Security & Networks",
] as const;

type Category = (typeof categories)[number];

const Coursework = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All Courses");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCourseCode, setExpandedCourseCode] = useState<string | null>("CS-301");

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesCategory =
        selectedCategory === "All Courses" || course.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.code.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.keyTopics.some((t) => t.toLowerCase().includes(q)) ||
        course.technologies.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (code: string) => {
    setExpandedCourseCode((prev) => (prev === code ? null : code));
  };

  return (
    <section
      id="coursework"
      aria-labelledby="coursework-heading"
      className="py-24 bg-gradient-to-b from-background via-muted/15 to-background relative overflow-hidden border-t border-border/50"
    >
      {/* Subtle Background Glow Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-medium">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Rigor & Curricula</span>
          </div>

          <h2
            id="coursework-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground"
          >
            Computer Science{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Coursework & Curricula
            </span>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Rigorous undergraduate computer science foundations from the University of Gondar,
            pairing deep theoretical computer science with hands-on enterprise software implementations.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card/80 border border-border/70">
              <Award className="w-3.5 h-3.5 text-primary" />
              <span>B.Sc. in Computer Science • University of Gondar</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card/80 border border-border/70">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>8 Specialized Engineering Tracks</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card/80 border border-border/70">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Theory + Scalable Production Code</span>
            </div>
          </div>
        </motion.div>

        {/* Filter and Search Controls */}
        <div className="mb-8 space-y-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                    isSelected
                      ? "text-primary-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground bg-card/60 hover:bg-muted/50 border border-border/60"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCoursePill"
                      className="absolute inset-0 bg-primary rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coursework, code (e.g. CS-301), or topic..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-card/80 border border-border/80 focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground font-mono"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Course Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence>
            {filteredCourses.map((course, idx) => {
              const isExpanded = expandedCourseCode === course.code;
              const IconComponent = course.icon;

              return (
                <motion.div
                  key={course.code}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  className="h-full"
                >
                  <Card className="h-full bg-card/85 backdrop-blur-md border border-border/80 hover:border-primary/40 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden flex flex-col justify-between">
                    <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      {/* Top Meta Bar */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/25 text-primary text-xs font-mono font-bold">
                              {course.code}
                            </span>
                            <span className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded bg-muted/60 border border-border/50">
                              {course.level}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-medium">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{course.grade}</span>
                          </div>
                        </div>

                        {/* Title & Icon */}
                        <div className="flex items-start gap-3 mb-2">
                          <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0 mt-0.5">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                              {course.title}
                            </h3>
                            <span className="text-[11px] font-mono text-muted-foreground">
                              {course.category} • {course.hours} Lecture & Lab Hours
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2">
                          {course.description}
                        </p>
                      </div>

                      {/* Key Topic Chips */}
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                          Core Concepts Mastered
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {course.keyTopics.slice(0, 4).map((topic) => (
                            <span
                              key={topic}
                              className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-muted/40 border border-border/50 text-foreground/80 hover:text-foreground hover:border-primary/40 transition-colors"
                            >
                              {topic}
                            </span>
                          ))}
                          {course.keyTopics.length > 4 && (
                            <span className="px-2 py-1 text-[11px] font-mono rounded-md bg-primary/5 text-primary">
                              +{course.keyTopics.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Expandable Syllabus & Capstone Drawer */}
                      <div className="pt-2 border-t border-border/50">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpand(course.code)}
                          className="w-full justify-between h-9 px-3 text-xs font-mono font-medium text-foreground hover:bg-muted/60 rounded-xl"
                        >
                          <span className="flex items-center gap-1.5 text-primary">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{isExpanded ? "Hide Syllabus Details" : "View Syllabus & Capstone Lab"}</span>
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </Button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden pt-3 space-y-3"
                            >
                              {/* Full Syllabus Milestones */}
                              <div className="p-3.5 rounded-xl bg-card border border-border/70 space-y-2">
                                <div className="text-xs font-mono font-semibold text-foreground flex items-center gap-1.5">
                                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                                  <span>Curriculum Milestones</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                  {course.keyTopics.map((topic) => (
                                    <div
                                      key={topic}
                                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                                    >
                                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                      <span className="truncate">{topic}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Capstone Lab Project Box */}
                              <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <div className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                                    <span>Capstone Practical Lab</span>
                                  </div>
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                                    {course.capstoneLab.metrics}
                                  </span>
                                </div>
                                <h4 className="text-xs font-bold text-foreground">
                                  {course.capstoneLab.title}
                                </h4>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                  {course.capstoneLab.description}
                                </p>
                              </div>

                              {/* Tooling Tags */}
                              <div className="flex items-center gap-2 pt-1">
                                <span className="text-[10px] font-mono uppercase text-muted-foreground">
                                  Tech:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {course.technologies.map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-muted text-muted-foreground border border-border/50"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-6 rounded-2xl bg-card/80 border border-border/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span>Looking for specific architectural competencies or engineering track records?</span>
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Review live full-stack projects, Next.js Server Action implementations, and containerized architectures.
            </p>
          </div>

          <Button
            size="sm"
            onClick={() => {
              const el = document.getElementById("portfolio");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-xl px-5 h-10 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 shadow-sm"
          >
            <span>Explore Architecture Projects</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Coursework;

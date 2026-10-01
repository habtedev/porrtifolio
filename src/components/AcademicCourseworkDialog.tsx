"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  GraduationCap,
  BookOpen,
  Search,
  CheckCircle2,
  Cpu,
  Workflow,
  Layers,
  Database,
  ShieldCheck,
  Terminal,
  Boxes,
  ArrowRight,
  Clock,
  Award,
} from "lucide-react";

export interface Course {
  code: string;
  title: string;
  category: "Algorithms & Theory" | "Systems & Cloud" | "Full-Stack & Data" | "Security & Networks";
  level: "Advanced Core" | "Core Foundation" | "Specialization";
  grade: "High Distinction" | "Distinction";
  description: string;
  icon: typeof Cpu;
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
  "All",
  "Algorithms & Theory",
  "Systems & Cloud",
  "Full-Stack & Data",
  "Security & Networks",
] as const;

interface AcademicCourseworkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AcademicCourseworkDialog({
  open,
  onOpenChange,
}: AcademicCourseworkDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course>(coursesData[0]);

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0 overflow-hidden flex flex-col bg-background/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl">
        <DialogHeader className="p-6 pb-4 border-b border-border/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <span>Academic Foundations & Curricula</span>
                  <Badge variant="outline" className="text-xs font-mono border-primary/30 text-primary">
                    B.Sc. Computer Science
                  </Badge>
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground font-mono mt-0.5">
                  University of Gondar • 8 Advanced Computer Science & Engineering Modules
                </DialogDescription>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, topics, algorithms, or tech..."
                className="pl-9 h-9 text-xs bg-muted/40 rounded-lg"
              />
            </div>

            <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </DialogHeader>

        {/* Two-Column Master / Detail View */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden min-h-[380px]">
          {/* Course List (Left Column) */}
          <div className="md:col-span-5 border-r border-border/60 overflow-y-auto p-3 space-y-1.5 max-h-[360px] md:max-h-[500px]">
            {filteredCourses.length === 0 ? (
              <p className="p-4 text-xs font-mono text-muted-foreground text-center">
                No matching curricula found.
              </p>
            ) : (
              filteredCourses.map((c) => {
                const isSelected = selectedCourse.code === c.code;
                const Icon = c.icon;
                return (
                  <button
                    key={c.code}
                    onClick={() => setSelectedCourse(c)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
                      isSelected
                        ? "bg-primary/10 border-primary/40 shadow-sm"
                        : "bg-card/40 border-border/40 hover:bg-muted/40 hover:border-border"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-mono font-bold text-primary">
                          {c.code}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">
                          {c.grade}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-foreground truncate mt-0.5">
                        {c.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                        {c.category} • {c.hours} hrs
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Course Detail (Right Column) */}
          <div className="md:col-span-7 overflow-y-auto p-5 space-y-4 max-h-[400px] md:max-h-[500px] bg-muted/10">
            {selectedCourse && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      {selectedCourse.code} · {selectedCourse.level}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {selectedCourse.hours} Lab & Lecture Hours
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mt-2">
                    {selectedCourse.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    {selectedCourse.description}
                  </p>
                </div>

                {/* Key Topics Covered */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    <span>Key Curricular Topics</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {selectedCourse.keyTopics.map((topic) => (
                      <div
                        key={topic}
                        className="text-[11px] text-muted-foreground bg-card/60 p-2 rounded-lg border border-border/50 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="truncate">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capstone Implementation Lab */}
                <div className="p-3.5 rounded-xl bg-card/70 border border-border/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Capstone Implementation Lab
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {selectedCourse.capstoneLab.metrics}
                    </span>
                  </div>
                  <h5 className="text-xs font-semibold text-foreground">
                    {selectedCourse.capstoneLab.title}
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedCourse.capstoneLab.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-xs font-mono text-muted-foreground mb-1.5">
                    Core Technologies & Tooling
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCourse.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-foreground border border-border/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

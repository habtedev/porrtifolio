"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Briefcase,
  Code,
  Shield,
  Database,
  Server,
  Layers,
  Terminal,
  Workflow,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Smartphone,
  ExternalLink,
  Award,
  Globe,
  Lock,
} from "lucide-react";
import TiltCard from "@/components/TiltCard";
import AcademicCourseworkDialog from "@/components/AcademicCourseworkDialog";

export default function About() {
  const [courseworkOpen, setCourseworkOpen] = useState(false);

  const skillGroups = [
    {
      title: "Backend Development",
      icon: Server,
      badge: "Core Focus",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      items: [
        "Node.js & Express.js",
        "Python & Django",
        "RESTful API Design",
        "Middleware Architecture",
        "JWT Authentication & RBAC",
        "Clean Modular Architecture",
      ],
    },
    {
      title: "Frontend & Full-Stack",
      icon: Code,
      badge: "Modern Web",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      items: [
        "React.js & Next.js 15",
        "JavaScript (ES6+) & TypeScript",
        "Tailwind CSS & SCSS",
        "Responsive UI/UX",
        "Server Actions & SSR",
        "State Management",
      ],
    },
    {
      title: "Databases (SQL & NoSQL)",
      icon: Database,
      badge: "Data Modeling",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      items: [
        "MongoDB & Mongoose",
        "PostgreSQL & Prisma",
        "MySQL Relational Schema",
        "SQL Joins & Data Integrity",
        "Document Modeling",
        "CRUD & Query Optimization",
      ],
    },
    {
      title: "Security, Mobile & Tools",
      icon: Shield,
      badge: "Engineering Tools",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      items: [
        "Helmet & CSRF Mitigation",
        "Input Validation & Error Handling",
        "React Native & Flutter",
        "Git & GitHub Workflows",
        "Postman API Testing",
        "Docker & Multi-Stage Builds",
      ],
    },
  ];

  const experienceItems = [
    {
      role: "MERN Stack Developer",
      company: "WebStack Academy",
      period: "2025",
      status: "Completed",
      description:
        "Collaborated with a 3–5 member development team to deliver assigned features. Built and maintained 3+ MERN applications (MongoDB, Express, React, Node.js), designed 10+ RESTful API endpoints, and applied middleware-based architecture.",
    },
    {
      role: "Full-Stack Developer",
      company: "Prodigy InfoTech",
      period: "2025",
      status: "Completed",
      description:
        "Developed end-to-end web applications handling frontend and backend functionality. Built real-world projects with JavaScript, React, Node.js, and integrated database APIs for responsive UI components.",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-12 sm:py-16 bg-gradient-to-b from-background via-muted/15 to-background overflow-hidden border-t border-border/50"
    >
      <div className="container mx-auto px-3 sm:px-6 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10 space-y-1.5 sm:space-y-2">
          <Badge variant="outline" className="px-3 py-0.5 text-xs font-mono border-primary/30 text-primary bg-primary/5">
            <Server className="w-3.5 h-3.5 mr-1.5" />
            Engineering Background & Core Stack
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Architecture, Experience &{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Core Skills
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Computer Science scholar at the University of Gondar and Backend-focused Full-Stack Engineer. Experienced in Node.js, Express, React, Next.js, Python, Django, MongoDB, and PostgreSQL.
          </p>
        </div>

        {/* 2-Column High-Signal Layout */}
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 mb-6 sm:mb-10">
          {/* Left Column: Education & Experience */}
          <div className="lg:col-span-5 space-y-4">
            {/* Academic Foundation Card */}
            <div id="coursework" className="scroll-mt-24">
              <TiltCard maxTilt={4} scale={1.01}>
                <Card className="bg-card/75 backdrop-blur-md border border-border/80 shadow-xs rounded-xl">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                          <GraduationCap size={20} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground">B.Sc. in Computer Science</h3>
                          <p className="text-[11px] text-muted-foreground font-mono">University of Gondar · 2023 – 2027</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                        Active Scholar
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      Core focus on software engineering, full-stack web development, data structures, algorithms, relational database design, and systems architecture.
                    </p>

                    {/* Additional Certification / Program */}
                    <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50 mb-3 flex items-start gap-2 text-xs">
                      <Award className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground text-[11px]">Artificial Intelligence & Career Program</span>
                        <p className="text-[10px] text-muted-foreground">University of Maryland (2025) · Hands-on AI & ML applications</p>
                      </div>
                    </div>

                    {/* Integrated Coursework Trigger Button */}
                    <Button
                      onClick={() => setCourseworkOpen(true)}
                      className="w-full h-8 sm:h-9 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-mono font-semibold flex items-center justify-between transition-colors group"
                    >
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-primary" />
                        <span>Inspect CS Curricula & Capstones</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </TiltCard>
            </div>

            {/* Experience Card */}
            <TiltCard maxTilt={4} scale={1.01}>
              <Card className="bg-card/75 backdrop-blur-md border border-border/80 shadow-xs rounded-xl">
                <CardContent className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Professional Experience</h3>
                      <p className="text-[11px] text-muted-foreground font-mono">Industry Software Development</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    {experienceItems.map((item) => (
                      <div key={item.company} className="relative pl-4 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-xs text-foreground">{item.role}</h4>
                          <span className="text-[10px] font-mono text-primary font-medium">{item.period}</span>
                        </div>
                        <p className="text-[11px] text-cyan-400 font-medium">{item.company}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
          </div>

          {/* Right Column: 4 Core Competency Groups */}
          <div className="lg:col-span-7 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
              {skillGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <TiltCard key={group.title} maxTilt={4} scale={1.01} className="h-full">
                    <Card className="h-full bg-card/75 backdrop-blur-md border border-border/80 shadow-xs hover:shadow-sm transition-all rounded-xl p-2.5 sm:p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5 sm:mb-2.5">
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <Icon className="text-primary w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                            <h4 className="font-bold text-[11px] sm:text-xs text-foreground truncate">{group.title}</h4>
                          </div>
                          <span className={`hidden sm:inline-block text-[9px] font-mono px-2 py-0.5 rounded-full border ${group.badgeColor}`}>
                            {group.badge}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-0.5 sm:gap-1 pt-0.5">
                          {group.items.map((item) => (
                            <span
                              key={item}
                              className="text-[9px] sm:text-[11px] font-mono px-1.5 sm:px-2 py-0.5 rounded-md bg-muted/50 text-foreground/90 border border-border/60 hover:border-primary/40 transition-colors"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </TiltCard>
                );
              })}
            </div>

            {/* Engineering Values & Languages Banner */}
            <div className="p-3.5 rounded-xl bg-card/75 backdrop-blur-md border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-primary font-semibold">Languages & Location</span>
                <p className="text-xs text-muted-foreground">
                  English (Fluent) · Amharic (Native/Bilingual) · Gondar, Ethiopia
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/habtedev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-muted/40 hover:bg-muted/60 text-foreground border border-border/60 flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>github.com/habtedev</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Coursework Modal Dialog */}
      <AcademicCourseworkDialog
        open={courseworkOpen}
        onOpenChange={setCourseworkOpen}
      />
    </section>
  );
}

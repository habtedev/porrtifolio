"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Layout,
  Server,
  Workflow,
  Cpu,
  Database,
  Code2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
  ShoppingBag,
  Layers,
} from "lucide-react";
import TiltCard from "@/components/TiltCard";

export default function Services() {
  const services = [
    {
      icon: Layout,
      title: "Full-Stack MERN & Next.js 15 Web Applications",
      subtitle: "Unified Frontend & Backend Solutions",
      description:
        "Developing end-to-end, production-ready web applications using Next.js 15, React, Node.js, and Express. Engineered for fast load times, responsive UI/UX, and reliable data flow.",
      features: [
        "React & Next.js 15 App Router with SSR & Server Actions",
        "MERN Stack (MongoDB, Express, React, Node.js) architecture",
        "Responsive, mobile-first design with Tailwind CSS & SCSS",
        "Component-driven architecture with clean state management",
        "Production-ready deployment workflows with Git & CI/CD",
      ],
      delivery: "2-4 Weeks",
      badge: "Flagship Service",
      badgeColor: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
    },
    {
      icon: Server,
      title: "Scalable Backend Architecture & RESTful APIs",
      subtitle: "Secure Node.js & Django Endpoints",
      description:
        "Designing and implementing modular, high-throughput RESTful APIs with Node.js/Express and Python/Django. Built with middleware pipelines, JWT authentication, and defensive security.",
      features: [
        "RESTful API design (10+ endpoints, CRUD, filtering, pagination)",
        "Authentication & Authorization (JWT cookies, Role-Based RBAC)",
        "Middleware-based architecture for security, logging & errors",
        "Helmet headers, CSRF mitigation & input sanitization",
        "Comprehensive API testing with Postman & documentation",
      ],
      delivery: "2-3 Weeks",
      badge: "Core Engineering",
      badgeColor: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
    },
    {
      icon: Database,
      title: "Database Architecture & Data Modeling",
      subtitle: "SQL & NoSQL Dual-Engine Systems",
      description:
        "Designing scalable data tiers with MongoDB (Mongoose) document modeling and PostgreSQL/MySQL relational schemas for ACID data integrity, inventory balance, and query speed.",
      features: [
        "MongoDB & Mongoose flexible document modeling",
        "PostgreSQL & MySQL relational schema design & SQL joins",
        "ACID transaction management for marketplace orders",
        "Database index optimization & connection pooling",
        "Schema migrations, data validation & consistency checks",
      ],
      delivery: "1-3 Weeks",
      badge: "Data & Performance",
      badgeColor: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    },
  ];

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      const navOffset = 70;
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-12 sm:py-16 bg-gradient-to-b from-background to-muted/20 border-t border-border/50">
      <div className="container mx-auto px-3 sm:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10 space-y-1.5 sm:space-y-2">
          <Badge variant="outline" className="px-3 py-0.5 text-xs font-mono border-primary/30 text-primary bg-primary/5">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Engineering Solutions & Services
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Architectural Solutions &{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Consulting
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            High-leverage full-stack and backend engineering engagements tailored for startups, businesses, and development teams requiring clean, reliable execution.
          </p>
        </div>

        {/* 2-Column Mobile & 3-Column Desktop Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 mb-6 sm:mb-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <TiltCard
                key={service.title}
                maxTilt={4}
                scale={1.01}
                className={`h-full ${index === 2 ? "col-span-2 lg:col-span-1" : "col-span-1"}`}
              >
                <Card className="h-full flex flex-col justify-between bg-card/85 backdrop-blur-md border border-border/80 shadow-xs hover:shadow-md transition-all rounded-xl p-3 sm:p-5">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                        <Icon size={18} />
                      </div>
                      <span className={`text-[8px] sm:text-[9px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full border ${service.badgeColor} truncate max-w-[65%]`}>
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-base font-bold text-foreground leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] font-mono text-primary mt-0.5 mb-1.5 truncate">
                      {service.subtitle}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-3 sm:line-clamp-none">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-1 sm:space-y-1.5 pt-2 border-t border-border/60">
                      {service.features.slice(0, 3).map((f) => (
                        <div key={f} className="flex items-start gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="line-clamp-1 sm:line-clamp-none">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-3 sm:pt-4 mt-2 sm:mt-3 border-t border-border/60 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[9px] sm:text-[11px] font-mono text-muted-foreground">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>{service.delivery}</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={scrollToContact}
                      className="h-6 sm:h-7 px-2 sm:px-3 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-mono font-semibold bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5 sm:ml-1" />
                    </Button>
                  </div>
                </Card>
              </TiltCard>
            );
          })}
        </div>

        {/* Engineering Engagement SLA Guarantee */}
        <div className="p-4 sm:p-5 rounded-xl bg-card border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-0.5">
            <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Production Standards & Clean Architecture Guarantee</span>
            </h4>
            <p className="text-[11px] sm:text-xs text-muted-foreground">
              Every deliverable includes clean modular code, TypeScript contracts, database schemas, Postman testing, and deployment setup.
            </p>
          </div>
          <Button
            onClick={scrollToContact}
            className="h-8 sm:h-9 px-4 rounded-lg font-mono text-xs font-semibold bg-gradient-to-r from-primary to-cyan-500 text-white shrink-0 shadow-xs hover:brightness-110"
          >
            <span>Initiate Project Consultation</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

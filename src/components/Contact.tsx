"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  Send,
  CheckCircle,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const form = e.target as HTMLFormElement;
      const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
      const url = "/api/contact";

      const res = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status >= 200 && res.status < 300) {
        setIsSuccess(true);
        form.reset();
        toast({
          title: "✅ Message Sent Successfully!",
          description: "Thanks for reaching out! I’ll respond within 24 hours.",
        });
      } else throw new Error("Failed to send message");
    } catch (err: unknown) {
      console.error("Contact form error:", err);
      const errorMessage =
        axios.isAxiosError(err) && err.response?.data?.error
          ? String(err.response.data.error)
          : err instanceof Error
          ? err.message
          : "Please try again later.";
      toast({
        title: "❌ Something went wrong",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: Mail,
      title: "Email",
      value: "habtamudev@gmail.com",
      action: "mailto:habtamudev@gmail.com",
      badge: "Direct Inbox",
    },
    {
      icon: Phone,
      title: "Phone & WhatsApp",
      value: "+251 945 870 700",
      action: "tel:+251945870700",
      badge: "Fast Response",
    },
    {
      icon: Github,
      title: "GitHub Profile",
      value: "github.com/habtedev",
      action: "https://github.com/habtedev",
      badge: "Source Code",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/habtamudev",
      action: "https://linkedin.com/in/habtamudev",
      badge: "Professional",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-12 sm:py-16 bg-gradient-to-b from-muted/20 via-background to-background border-t border-border/50 overflow-hidden"
    >
      {/* Subtle radial ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.06),transparent_60%)] pointer-events-none" />

      <div className="container relative mx-auto px-3 sm:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10 space-y-1.5 sm:space-y-2">
          <Badge variant="outline" className="px-3 py-0.5 text-xs font-mono border-primary/30 text-primary bg-primary/5">
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
            Get In Touch
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Let’s Build Something{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Impactful
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Have a project, full-stack opening, or technical collaboration in mind? Feel free to reach out directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          {/* Left Column: Direct Contact Info Chips */}
          <div className="lg:col-span-5 space-y-3">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-2.5">
              {contactCards.map((c) => {
                const Icon = c.icon;
                const isExternal = c.action.startsWith("http");

                return (
                  <a
                    key={c.title}
                    href={c.action}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="block group"
                  >
                    <div className="p-2.5 sm:p-3.5 rounded-xl bg-card/85 backdrop-blur-md border border-border/80 shadow-xs hover:border-primary/50 hover:bg-card transition-all flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                          <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <span className="text-[11px] sm:text-xs font-bold text-foreground truncate">{c.title}</span>
                          </div>
                          <p className="text-[10px] sm:text-[11px] font-mono text-muted-foreground group-hover:text-primary transition-colors mt-0.5 truncate">
                            {c.value}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Location & Copy Email Card */}
            <div className="p-3.5 rounded-xl bg-card/85 backdrop-blur-md border border-border/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs font-mono text-muted-foreground">Gondar, Amhara, Ethiopia</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopyEmail}
                className="h-7 px-2.5 rounded-lg text-xs font-mono text-muted-foreground hover:text-foreground border border-border/60 bg-muted/30"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3 h-3 mr-1 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right Column: Sleek Compact Form */}
          <div className="lg:col-span-7">
            <Card className="bg-card/85 backdrop-blur-md border border-border/80 shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/50">
                  <h3 className="text-sm sm:text-base font-bold text-foreground">
                    Send Direct Message
                  </h3>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Direct to habtamudev@gmail.com
                  </span>
                </div>

                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center text-center py-8 space-y-2">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                    <h4 className="text-base font-bold text-foreground">Message Dispatched!</h4>
                    <p className="text-xs text-muted-foreground max-w-sm">
                      Thank you for contacting. I’ll review your inquiry and respond within 24 hours.
                    </p>
                    <Button
                      size="sm"
                      onClick={() => setIsSuccess(false)}
                      className="mt-2 h-7 px-3 text-xs font-mono"
                    >
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="firstName" className="text-xs text-foreground/90 font-medium">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          placeholder="John"
                          className="h-8 sm:h-9 text-xs bg-muted/20 border-border/70 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="lastName" className="text-xs text-foreground/90 font-medium">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          required
                          placeholder="Doe"
                          className="h-8 sm:h-9 text-xs bg-muted/20 border-border/70 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-xs text-foreground/90 font-medium">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="john@example.com"
                          className="h-8 sm:h-9 text-xs bg-muted/20 border-border/70 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="phone" className="text-xs text-foreground/90 font-medium">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="h-8 sm:h-9 text-xs bg-muted/20 border-border/70 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="subject" className="text-xs text-foreground/90 font-medium">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        required
                        placeholder="Project Consultation / Full-Stack Role"
                        className="h-8 sm:h-9 text-xs bg-muted/20 border-border/70 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="message" className="text-xs text-foreground/90 font-medium">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={3}
                        placeholder="Tell me about your project or inquiry..."
                        className="text-xs bg-muted/20 border-border/70 focus:border-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-8 sm:h-9 rounded-xl font-mono text-xs font-semibold bg-gradient-to-r from-primary to-cyan-500 text-white shadow-sm hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Dispatch Message</span>
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

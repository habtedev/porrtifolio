"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import MobileBottomBar from "@/components/MobileBottomBar";

// Dynamically import Three.js particle canvas with clean null fallback to avoid SSR hydration mismatch
const ThreeCanvasBackground = dynamic(
  () => import("@/components/ThreeCanvasBackground").then((mod) => mod.ThreeCanvasBackground || mod.default),
  { ssr: false }
);

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 selection:text-primary pb-20 md:pb-0">
      {/* 3D Ambient WebGL Particle Constellation mounts cleanly after hydration */}
      {isMounted && <ThreeCanvasBackground />}

      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Portfolio />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
      <MobileBottomBar />
    </div>
  );
}


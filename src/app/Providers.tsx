"use client";

import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomCursor from "@/components/CustomCursor";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <TooltipProvider>
      {mounted && <CustomCursor />}
      {children}
      {mounted && (
        <>
          <Toaster />
          <Sonner />
        </>
      )}
    </TooltipProvider>
  );
}

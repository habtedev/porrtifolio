"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  // Exact mouse positions
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs with fluid physics for "wow" cinematic circle feel
  const springConfig = { damping: 24, stiffness: 260, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-interactive]");
      if (interactive) {
        setIsHovered(true);
        const textAttr = interactive.getAttribute("data-cursor-text");
        setCursorText(textAttr);
      } else {
        setIsHovered(false);
        setCursorText(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block" aria-hidden="true">
      {/* Outer Cinematic Animated Circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary/60 bg-primary/[0.08] backdrop-blur-[1px] shadow-[0_0_24px_rgba(59,130,246,0.25)] flex items-center justify-center pointer-events-none transition-[width,height,background-color,border-color] duration-200 ease-out"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? (cursorText ? 76 : 52) : 34,
          height: isHovered ? (cursorText ? 76 : 52) : 34,
          scale: isClicking ? 0.82 : 1,
          borderColor: isHovered ? "rgba(99, 102, 241, 0.9)" : "rgba(59, 130, 246, 0.5)",
          backgroundColor: isHovered ? "rgba(99, 102, 241, 0.14)" : "rgba(59, 130, 246, 0.05)",
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono tracking-wider font-semibold text-primary uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* High-Precision Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovered && cursorText ? 0 : 1,
          scale: isClicking ? 1.4 : isHovered ? 0.75 : 1,
        }}
      />
    </div>
  );
}

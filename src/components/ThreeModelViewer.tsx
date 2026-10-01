"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCw,
  Box,
  Globe,
  Layers,
  Sparkles,
  Maximize2,
  RefreshCw,
  Eye,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type ModelType = "cyber-core" | "torus-knot" | "matrix-cube" | "cyber-sphere";
export type ColorTheme = "indigo" | "cyan" | "emerald" | "amber";

interface ThreeModelViewerProps {
  className?: string;
  initialModel?: ModelType;
  initialTheme?: ColorTheme;
  interactive?: boolean;
  compact?: boolean;
}

const THEME_COLORS: Record<ColorTheme, { primary: number; emissive: number; accent: string; label: string }> = {
  indigo: { primary: 0x6366f1, emissive: 0x4338ca, accent: "text-indigo-400", label: "Quantum Indigo" },
  cyan: { primary: 0x06b6d4, emissive: 0x0891b2, accent: "text-cyan-400", label: "Cyber Cyan" },
  emerald: { primary: 0x10b981, emissive: 0x059669, accent: "text-emerald-400", label: "Security Emerald" },
  amber: { primary: 0xf59e0b, emissive: 0xd97706, accent: "text-amber-400", label: "Solar Amber" },
};

export const ThreeModelViewer: React.FC<ThreeModelViewerProps> = ({
  className = "",
  initialModel = "cyber-core",
  initialTheme = "cyan",
  interactive = true,
  compact = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentModel, setCurrentModel] = useState<ModelType>(initialModel);
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(initialTheme);
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [showControls, setShowControls] = useState(!compact);
  const [isHovered, setIsHovered] = useState(false);

  // Scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const reqIdRef = useRef<number | null>(null);

  // Interaction tracking
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });

  // Update 3D Geometry
  const buildModel = useCallback((type: ModelType, theme: ColorTheme, wireframe: boolean) => {
    if (!modelGroupRef.current) return;

    // Clear previous children
    while (modelGroupRef.current.children.length > 0) {
      const obj = modelGroupRef.current.children[0];
      modelGroupRef.current.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material?.dispose();
        }
      }
    }

    const { primary, emissive } = THEME_COLORS[theme];

    // Main material
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: primary,
      emissive: emissive,
      emissiveIntensity: wireframe ? 0.8 : 0.35,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: wireframe,
      transparent: true,
      opacity: wireframe ? 0.9 : 0.82,
    });

    // Outer wireframe accent material
    const wireAccentMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    // Inner core material
    const innerCoreMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: primary,
      emissiveIntensity: 0.9,
      metalness: 0.2,
      roughness: 0.1,
    });

    if (type === "cyber-core") {
      // Faceted Icosahedron + Outer Wireframe Cage + Inner Pulsing Sphere
      const icoGeo = new THREE.IcosahedronGeometry(2.0, 1);
      const mainMesh = new THREE.Mesh(icoGeo, mainMaterial);
      modelGroupRef.current.add(mainMesh);

      const cageGeo = new THREE.IcosahedronGeometry(2.3, 0);
      const cageMesh = new THREE.Mesh(cageGeo, wireAccentMaterial);
      modelGroupRef.current.add(cageMesh);

      const innerGeo = new THREE.SphereGeometry(0.9, 16, 16);
      const innerMesh = new THREE.Mesh(innerGeo, innerCoreMaterial);
      modelGroupRef.current.add(innerMesh);

      // Rotating orbital ring
      const ringGeo = new THREE.TorusGeometry(2.8, 0.04, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ color: primary, transparent: true, opacity: 0.7 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      ring.name = "orbitalRing";
      modelGroupRef.current.add(ring);

      const ringGeo2 = new THREE.TorusGeometry(3.1, 0.03, 16, 100);
      const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 });
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      ring2.rotation.y = Math.PI / 4;
      ring2.name = "orbitalRing2";
      modelGroupRef.current.add(ring2);
    } else if (type === "torus-knot") {
      // Cryptographic Security Knot
      const knotGeo = new THREE.TorusKnotGeometry(1.6, 0.45, 128, 32, 2, 3);
      const knotMesh = new THREE.Mesh(knotGeo, mainMaterial);
      modelGroupRef.current.add(knotMesh);

      const knotWireGeo = new THREE.TorusKnotGeometry(1.62, 0.46, 64, 16, 2, 3);
      const knotWireMesh = new THREE.Mesh(knotWireGeo, wireAccentMaterial);
      modelGroupRef.current.add(knotWireMesh);
    } else if (type === "matrix-cube") {
      // Nested Quantum Cubes
      const outerCubeGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
      const outerCube = new THREE.Mesh(outerCubeGeo, mainMaterial);
      modelGroupRef.current.add(outerCube);

      const cageCubeGeo = new THREE.BoxGeometry(2.8, 2.8, 2.8);
      const cageCube = new THREE.Mesh(cageCubeGeo, wireAccentMaterial);
      cageCube.name = "cageCube";
      modelGroupRef.current.add(cageCube);

      const innerOctaGeo = new THREE.OctahedronGeometry(1.4, 0);
      const innerOcta = new THREE.Mesh(innerOctaGeo, innerCoreMaterial);
      innerOcta.name = "innerOcta";
      modelGroupRef.current.add(innerOcta);
    } else if (type === "cyber-sphere") {
      // Geodesic Data Globe
      const sphereGeo = new THREE.DodecahedronGeometry(1.9, 1);
      const sphereMesh = new THREE.Mesh(sphereGeo, mainMaterial);
      modelGroupRef.current.add(sphereMesh);

      const outerRing1 = new THREE.TorusGeometry(2.6, 0.05, 16, 80);
      const ring1 = new THREE.Mesh(outerRing1, wireAccentMaterial);
      ring1.name = "orbitalRing";
      modelGroupRef.current.add(ring1);

      const outerRing2 = new THREE.TorusGeometry(2.9, 0.03, 16, 80);
      const ring2 = new THREE.Mesh(outerRing2, mainMaterial);
      ring2.rotation.x = Math.PI / 2;
      ring2.name = "orbitalRing2";
      modelGroupRef.current.add(ring2);

      // Satellite node
      const satGeo = new THREE.SphereGeometry(0.2, 12, 12);
      const satMesh = new THREE.Mesh(satGeo, innerCoreMaterial);
      satMesh.position.set(2.6, 0, 0);
      satMesh.name = "satellite";
      modelGroupRef.current.add(satMesh);
    }
  }, []);

  // Main Three.js Initialization
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(5, 6, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(THEME_COLORS[currentTheme].primary, 2.5);
    dirLight2.position.set(-5, -4, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 2, 20);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    // Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Ambient 3D Particle Cloud
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorObj = new THREE.Color(THEME_COLORS[currentTheme].primary);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const lum = 0.5 + Math.random() * 0.5;
      colors[i * 3] = colorObj.r * lum;
      colors[i * 3 + 1] = colorObj.g * lum;
      colors[i * 3 + 2] = colorObj.b * lum;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Build initial geometry
    buildModel(currentModel, currentTheme, isWireframe);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0 && rendererRef.current && cameraRef.current) {
          cameraRef.current.aspect = newWidth / newHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth damped rotation from mouse / touch interaction
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      if (modelGroupRef.current) {
        if (autoRotate && !isDraggingRef.current) {
          targetRotationRef.current.y += 0.45 * rotationSpeed * delta;
          targetRotationRef.current.x = Math.sin(elapsedTime * 0.4) * 0.2;
        }

        modelGroupRef.current.rotation.x = currentRotationRef.current.x;
        modelGroupRef.current.rotation.y = currentRotationRef.current.y;

        // Sub-elements animation
        const ring1 = modelGroupRef.current.getObjectByName("orbitalRing");
        if (ring1) {
          ring1.rotation.z += 0.8 * delta;
        }

        const ring2 = modelGroupRef.current.getObjectByName("orbitalRing2");
        if (ring2) {
          ring2.rotation.x -= 0.6 * delta;
        }

        const innerOcta = modelGroupRef.current.getObjectByName("innerOcta");
        if (innerOcta) {
          innerOcta.rotation.y -= 1.2 * delta;
          innerOcta.rotation.z += 0.5 * delta;
        }

        const satellite = modelGroupRef.current.getObjectByName("satellite");
        if (satellite) {
          const angle = elapsedTime * 1.5;
          satellite.position.x = Math.cos(angle) * 2.8;
          satellite.position.z = Math.sin(angle) * 2.8;
          satellite.position.y = Math.sin(angle * 2) * 0.8;
        }
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.05;
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current);
      }
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [buildModel, currentModel, currentTheme, isWireframe, autoRotate, rotationSpeed]);

  // Re-build model when parameters change
  useEffect(() => {
    buildModel(currentModel, currentTheme, isWireframe);
  }, [currentModel, currentTheme, isWireframe, buildModel]);

  // Mouse & Touch Interaction Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !interactive) return;
    const deltaX = e.clientX - prevMousePosRef.current.x;
    const deltaY = e.clientY - prevMousePosRef.current.y;

    targetRotationRef.current.y += deltaX * 0.008;
    targetRotationRef.current.x += deltaY * 0.008;

    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!interactive || e.touches.length === 0) return;
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !interactive || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - prevMousePosRef.current.x;
    const deltaY = e.touches[0].clientY - prevMousePosRef.current.y;

    targetRotationRef.current.y += deltaX * 0.01;
    targetRotationRef.current.x += deltaY * 0.01;

    prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const resetView = () => {
    targetRotationRef.current = { x: 0, y: 0 };
    currentRotationRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      className={`relative group select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas Mounting Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y flex items-center justify-center"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        title="Click & Drag to rotate 3D model"
      />

      {/* Floating 3D Interaction Hint Badge */}
      <div className="absolute top-4 left-4 pointer-events-none transition-opacity duration-300">
        <Badge
          variant="outline"
          className="bg-background/80 backdrop-blur-md border-primary/30 text-xs font-mono py-1 px-2.5 shadow-md flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span className="hidden sm:inline">Interactive 3D Engine:</span>
          <span className="text-primary font-semibold capitalize">{currentModel.replace("-", " ")}</span>
        </Badge>
      </div>

      {/* Touch & Drag Instructional Overlay (Fades out when interacting) */}
      <div className="absolute bottom-4 left-4 pointer-events-none text-[11px] text-muted-foreground/80 font-mono flex items-center gap-1 bg-background/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-border/40">
        <RotateCw className="w-3 h-3 text-primary animate-spin" style={{ animationDuration: "6s" }} />
        <span>Drag to orbit in 3D</span>
      </div>

      {/* Compact/Full Controls Toolbar */}
      {interactive && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-md border-border/60 hover:border-primary shadow-sm"
            onClick={() => setShowControls(!showControls)}
            title="Toggle 3D Controls"
          >
            <Layers className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-md border-border/60 hover:border-primary shadow-sm"
            onClick={resetView}
            title="Reset 3D Orientation"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      {/* Expandable Control Panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 right-4 z-30 p-3.5 rounded-2xl bg-background/90 backdrop-blur-xl border border-primary/20 shadow-xl max-w-[260px] space-y-3"
          >
            {/* Model Geometry Selector */}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                <Box className="w-3 h-3 text-primary" />
                <span>3D Geometry</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: "cyber-core", label: "Core Ico", icon: Zap },
                  { id: "torus-knot", label: "Security Knot", icon: Shield },
                  { id: "matrix-cube", label: "Quantum Cube", icon: Box },
                  { id: "cyber-sphere", label: "Data Sphere", icon: Globe },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setCurrentModel(m.id as ModelType)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium text-left flex items-center gap-1.5 transition-all ${
                      currentModel === m.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted/50 hover:bg-muted text-foreground/80"
                    }`}
                  >
                    <m.icon className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Shading & Theme Selector */}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-primary" />
                <span>Hologram Hue</span>
              </div>
              <div className="flex items-center gap-2">
                {(["cyan", "indigo", "emerald", "amber"] as ColorTheme[]).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setCurrentTheme(theme)}
                    className={`h-6 w-6 rounded-full border-2 transition-transform ${
                      currentTheme === theme ? "scale-125 border-foreground ring-2 ring-primary/40" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    style={{
                      backgroundColor:
                        theme === "cyan"
                          ? "#06b6d4"
                          : theme === "indigo"
                          ? "#6366f1"
                          : theme === "emerald"
                          ? "#10b981"
                          : "#f59e0b",
                    }}
                    title={THEME_COLORS[theme].label}
                  />
                ))}
              </div>
            </div>

            {/* Toggles: Wireframe & Auto-rotate */}
            <div className="pt-2 border-t border-border/40 flex items-center justify-between gap-2">
              <Button
                variant={isWireframe ? "default" : "outline"}
                size="sm"
                className="text-xs h-7 px-2.5 rounded-lg flex-1"
                onClick={() => setIsWireframe(!isWireframe)}
              >
                <Eye className="w-3 h-3 mr-1" />
                {isWireframe ? "Solid" : "Wireframe"}
              </Button>
              <Button
                variant={autoRotate ? "secondary" : "outline"}
                size="sm"
                className="text-xs h-7 px-2.5 rounded-lg flex-1"
                onClick={() => setAutoRotate(!autoRotate)}
              >
                <RotateCw className={`w-3 h-3 mr-1 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "4s" }} />
                {autoRotate ? "Pause" : "Spin"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThreeModelViewer;

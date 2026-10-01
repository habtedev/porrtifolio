"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const ThreeCanvasBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Particle nodes
    const particleCount = 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const range = 600;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * range;
      positions[i * 3 + 1] = (Math.random() - 0.5) * range;
      positions[i * 3 + 2] = (Math.random() - 0.5) * range;

      velocities.push({
        x: (Math.random() - 0.5) * 0.25,
        y: (Math.random() - 0.5) * 0.25,
        z: (Math.random() - 0.5) * 0.25,
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const pMaterial = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 3.5,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const pointCloud = new THREE.Points(geometry, pMaterial);
    scene.add(pointCloud);

    // Connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const maxLineSegments = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse influence
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.2;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const maxConnectDistance = 110;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(scene.position);

      const pos = geometry.attributes.position.array as Float32Array;
      let lineIndex = 0;
      const linePos = lineGeometry.attributes.position.array as Float32Array;

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;

        // Bounce boundaries
        const half = range / 2;
        if (pos[i * 3] < -half || pos[i * 3] > half) velocities[i].x = -velocities[i].x;
        if (pos[i * 3 + 1] < -half || pos[i * 3 + 1] > half) velocities[i].y = -velocities[i].y;
        if (pos[i * 3 + 2] < -half || pos[i * 3 + 2] > half) velocities[i].z = -velocities[i].z;

        // Connect nearby particles
        for (let j = i + 1; j < particleCount; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxConnectDistance) {
            linePos[lineIndex++] = pos[i * 3];
            linePos[lineIndex++] = pos[i * 3 + 1];
            linePos[lineIndex++] = pos[i * 3 + 2];

            linePos[lineIndex++] = pos[j * 3];
            linePos[lineIndex++] = pos[j * 3 + 1];
            linePos[lineIndex++] = pos[j * 3 + 2];
          }
        }
      }

      geometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;

      pointCloud.rotation.y += 0.0008;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      lineGeometry.dispose();
      pMaterial.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-45 overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default ThreeCanvasBackground;

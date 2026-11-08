"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function BackgroundEffects() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate deterministic particles on client side to avoid hydration mismatch
    const items: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.2,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Background dark grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Top Center Purple Glow Blob */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-indigo-600/15 via-purple-700/10 to-transparent rounded-full blur-[120px]" />

      {/* Center Left Blue Glow Blob */}
      <div className="absolute top-1/3 -left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />

      {/* Center Right Gold Glow Blob */}
      <div className="absolute top-1/2 -right-[10%] w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[150px]" />

      {/* Bottom Center Subtle Navy / Indigo Blob */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-900/15 rounded-full blur-[130px]" />

      {/* Floating Gold & White Dust Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float-slow"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.id % 2 === 0 ? "#F5C542" : "#93C5FD",
            opacity: p.opacity,
            boxShadow: `0 0 10px ${p.id % 2 === 0 ? "rgba(245, 197, 66, 0.8)" : "rgba(147, 197, 253, 0.8)"}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

"use client";

import React from "react";

interface InteractiveEngineeringBackgroundProps {
  variant?: "light" | "dark";
  isFixed?: boolean;
  className?: string;
}

/**
 * InteractiveEngineeringBackground
 * Atmósfera arquitectónica de estudio de alto nivel (Ambient Silk & Studio Lighting).
 * Cero cuadrículas, cero líneas y cero distracciones visuales: iluminación difusa
 * multicapa con acabado corporativo limpio.
 */
export const InteractiveEngineeringBackground: React.FC<
  InteractiveEngineeringBackgroundProps
> = ({ isFixed = true, className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`${
        isFixed ? "fixed inset-0" : "absolute inset-0"
      } pointer-events-none z-0 overflow-hidden select-none ${className}`}
    >
      {/* Lienzo base satinado (Porcelana en modo claro / Obsidiana profunda en modo oscuro) */}
      <div className="absolute inset-0 bg-[#f8fafc] dark:bg-[#050811] transition-colors duration-300" />

      {/* Luz cenital principal (Aurora arquitectónica superior) */}
      <div
        className="absolute -top-[22%] left-1/2 -translate-x-1/2 w-[1200px] h-[620px] rounded-full opacity-75 dark:opacity-45 blur-[135px] transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.14) 0%, rgba(79, 70, 229, 0.08) 42%, rgba(6, 182, 212, 0.04) 70%, transparent 100%)",
        }}
      />

      {/* Acento ambiental lateral izquierdo suave */}
      <div
        className="absolute top-[18%] -left-[12%] w-[640px] h-[640px] rounded-full opacity-60 dark:opacity-30 blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.09) 0%, rgba(14, 165, 233, 0.04) 55%, transparent 100%)",
        }}
      />

      {/* Acento ambiental lateral derecho suave */}
      <div
        className="absolute top-[42%] -right-[12%] w-[680px] h-[680px] rounded-full opacity-55 dark:opacity-25 blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(16, 185, 129, 0.04) 55%, transparent 100%)",
        }}
      />

      {/* Velo de profundidad vertical para contraste impecable en tarjetas y tipografía */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-slate-100/40 dark:from-[#050811]/30 dark:via-transparent dark:to-[#050811]/80" />
    </div>
  );
};

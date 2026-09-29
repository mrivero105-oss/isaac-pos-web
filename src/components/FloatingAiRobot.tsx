"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";

interface FloatingAiRobotProps {
  onOpenAiChat: () => void;
}

export const FloatingAiRobot: React.FC<FloatingAiRobotProps> = ({ onOpenAiChat }) => {
  const [showBubble, setShowBubble] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);

  // Efecto de parpadeo natural de los ojos del robot cada 4 segundos
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="flex flex-col items-end pointer-events-auto">
      {/* Burbuja de Diálogo del Mini Robot */}
      {showBubble && (
        <div className="mb-2 relative animate-bounce flex items-center justify-end">
          <div className="bg-slate-950/95 border border-cyan-500/50 rounded-2xl px-3 py-1.5 shadow-xl shadow-cyan-500/20 backdrop-blur-md flex items-center gap-2 max-w-[210px] text-xs">
            <div className="flex items-center gap-1 text-slate-200">
              <span className="text-cyan-400 font-bold">¡Hola!</span>
              <span className="text-slate-300">Soy</span>
              <strong className="text-white font-extrabold">Isaac POS</strong>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
              className="p-0.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Cerrar mensaje"
              title="Cerrar"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          {/* Triángulo apuntando hacia el robot */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-slate-950 border-r border-b border-cyan-500/50 rotate-45" />
        </div>
      )}

      {/* Botón Flotante del Mini Robot Isaac POS */}
      <button
        onClick={onOpenAiChat}
        className="group relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/90 border border-cyan-500/50 hover:border-cyan-400 text-white shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all backdrop-blur-md cursor-pointer"
        aria-label="Abrir asistente robot Isaac POS"
        title="Hablar con Isaac POS"
      >
        {/* Halo de luz cian pulsante */}
        <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 opacity-20 group-hover:opacity-40 blur-sm transition-opacity" />

        {/* Avatar Mini Robot SVG */}
        <div className="relative shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
          <svg
            className="w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] group-hover:rotate-6 transition-transform duration-300"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Antena del Robot con Beacon */}
            <path
              d="M18 3V9"
              stroke="#38BDF8"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle
              cx="18"
              cy="3"
              r="2.5"
              fill="#34D399"
              className="animate-pulse"
            />

            {/* Orejeras / Conectores Laterales */}
            <rect x="2.5" y="14" width="3" height="8" rx="1.5" fill="#0284C7" />
            <rect x="30.5" y="14" width="3" height="8" rx="1.5" fill="#0284C7" />

            {/* Cabeza del Robot */}
            <rect
              x="5"
              y="9"
              width="26"
              height="20"
              rx="6"
              fill="#0F172A"
              stroke="#38BDF8"
              strokeWidth="1.8"
            />

            {/* Visor de Pantalla */}
            <rect
              x="8"
              y="12.5"
              width="20"
              height="13"
              rx="4"
              fill="#020617"
              stroke="#0284C7"
              strokeWidth="1"
            />

            {/* Ojos LED Cian Inteligentes con parpadeo */}
            <circle
              cx="13.5"
              cy="18"
              r={isBlinking ? "0.6" : "2.2"}
              fill="#22D3EE"
              className="transition-all duration-150"
            />
            <circle
              cx="22.5"
              cy="18"
              r={isBlinking ? "0.6" : "2.2"}
              fill="#22D3EE"
              className="transition-all duration-150"
            />

            {/* Reflejos de Luz en los Ojos */}
            {!isBlinking && (
              <>
                <circle cx="14.2" cy="17.2" r="0.7" fill="#FFFFFF" />
                <circle cx="23.2" cy="17.2" r="0.7" fill="#FFFFFF" />
              </>
            )}

            {/* Sonrisa Robótica */}
            <path
              d="M15 22.5C16 23.5 20 23.5 21 22.5"
              stroke="#22D3EE"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>

          {/* Indicador de estado En Línea */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-ping" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950" />
        </div>

        {/* Textos del Mini Robot */}
        <div className="flex flex-col text-left relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-bold text-cyan-300 tracking-wider uppercase flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
              Asistente IA
            </span>
          </div>
          <span className="text-xs sm:text-sm font-black text-white tracking-tight leading-none mt-0.5">
            Isaac POS
          </span>
        </div>
      </button>
    </div>
  );
};

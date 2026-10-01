"use client";

import React, { useState } from "react";
import { X, Headphones, MessageSquareText } from "lucide-react";

interface FloatingAiRobotProps {
  onOpenAiChat: () => void;
}

export const FloatingAiRobot: React.FC<FloatingAiRobotProps> = ({ onOpenAiChat }) => {
  const [showBubble, setShowBubble] = useState(true);

  return (
    <div className="flex flex-col items-end pointer-events-auto">
      {/* Burbuja de Bienvenida y Asesoría Humana */}
      {showBubble && (
        <div className="mb-2 relative flex items-center justify-end">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl px-3.5 py-2 shadow-xl shadow-black/40 backdrop-blur-md flex items-center gap-2 max-w-[240px] text-xs">
            <div className="flex items-start gap-2 text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
              <p className="leading-snug">
                ¿Dudas de instalación o compatibilidad? <strong className="text-white font-semibold">Te asesoramos de inmediato</strong>
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1 shrink-0"
              aria-label="Cerrar mensaje"
              title="Cerrar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          {/* Triángulo apuntando hacia el botón */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-slate-900 border-r border-b border-slate-700 rotate-45" />
        </div>
      )}

      {/* Botón Flotante de Asesoría Técnica & Comercial */}
      <button
        onClick={onOpenAiChat}
        className="group relative flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-blue-500/50 text-white shadow-xl shadow-black/40 hover:-translate-y-0.5 transition-all cursor-pointer"
        aria-label="Abrir asesoría comercial y técnica"
        title="Consultar con un asesor"
      >
        {/* Avatar Asesor Técnico Humano */}
        <div className="relative shrink-0 w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/30 transition-colors">
          <Headphones className="w-4 h-4 text-blue-400" />
          {/* Indicador en línea activo */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
        </div>

        {/* Textos del Asesor */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase flex items-center gap-1">
              Asesoría Técnica
            </span>
          </div>
          <span className="text-xs sm:text-sm font-bold text-white tracking-tight leading-none mt-0.5">
            Consultar Online
          </span>
        </div>
      </button>
    </div>
  );
};

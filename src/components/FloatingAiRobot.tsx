"use client";

import React, { useState } from "react";
import { X, Headphones, ShieldCheck, ArrowRight } from "lucide-react";

interface FloatingAiRobotProps {
  onOpenAiChat: () => void;
}

export const FloatingAiRobot: React.FC<FloatingAiRobotProps> = ({ onOpenAiChat }) => {
  const [showNotification, setShowNotification] = useState(true);

  return (
    <div className="flex flex-col items-end pointer-events-auto">
      {/* Notificación Discreta de Asesoría de Mostrador */}
      {showNotification && (
        <div className="mb-2 relative flex items-center justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-slate-950 text-white border border-slate-800 rounded-2xl px-4 py-2.5 shadow-2xl flex items-center gap-3 max-w-[260px] text-xs">
            <div className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 status-breathing mt-1 shrink-0" />
              <p className="text-slate-200 text-[11px] leading-snug">
                ¿Dudas de impresoras o instalación? <strong className="text-white font-semibold">Te asesoramos por AnyDesk o WhatsApp.</strong>
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotification(false);
              }}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-0.5 shrink-0 cursor-pointer"
              aria-label="Cerrar notificación"
              title="Cerrar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          {/* Triángulo indicador inferior */}
          <div className="absolute -bottom-1.5 right-7 w-3 h-3 bg-slate-950 border-r border-b border-slate-800 rotate-45" />
        </div>
      )}

      {/* Botón Ejecutivo de Mesa de Asistencia */}
      <button
        onClick={onOpenAiChat}
        className="group relative flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-white shadow-[0_10px_30px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
        aria-label="Consultar con un especialista de Isaac POS"
        title="Consultar con asesor"
      >
        {/* Indicador de Operador en Línea */}
        <div className="relative shrink-0 w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/30 transition-colors">
          <Headphones className="w-4 h-4 text-blue-400" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950" />
        </div>

        {/* Textos Profesionales */}
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            Asistencia en Vivo
          </span>
          <span className="text-xs font-bold text-white tracking-tight leading-none mt-0.5">
            Mesa de Ayuda Técnica
          </span>
        </div>
      </button>
    </div>
  );
};

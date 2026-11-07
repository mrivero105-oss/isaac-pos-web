"use client";

import React from "react";
import { Headphones } from "lucide-react";

interface FloatingAiRobotProps {
  onOpenAiChat: () => void;
}

export const FloatingAiRobot: React.FC<FloatingAiRobotProps> = ({ onOpenAiChat }) => {
  return (
    <div className="flex flex-col items-end pointer-events-auto">
      {/* Botón Ejecutivo Compacto de Mesa de Asistencia */}
      <button
        onClick={onOpenAiChat}
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-slate-950/95 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-white shadow-[0_10px_30px_rgba(15,23,42,0.28)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer backdrop-blur-md"
        aria-label="Consultar con Asesor IA de Isaac POS"
        title="Consultar dudas al instante"
      >
        {/* Indicador de Operador en Línea */}
        <div className="relative shrink-0 w-7 h-7 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/30 transition-colors">
          <Headphones className="w-3.5 h-3.5 text-blue-400" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border border-slate-950" />
        </div>

        {/* Textos Profesionales */}
        <div className="hidden sm:flex flex-col text-left pr-0.5">
          <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider leading-none">
            En línea 24/7
          </span>
          <span className="text-xs font-bold text-white tracking-tight leading-none mt-1">
            Asesoría Rápida
          </span>
        </div>
      </button>
    </div>
  );
};

"use client";

import React from "react";
import { IsaacPosRealTerminal } from "@/components/IsaacPosRealTerminal";
import { InteractiveEngineeringBackground } from "@/components/InteractiveEngineeringBackground";
import { Terminal, Zap, DollarSign, WifiOff } from "lucide-react";

export const InteractivePosDemo: React.FC = () => {
  return (
    <section id="simulador" className="py-24 relative bg-slate-900 text-white border-t border-slate-800 overflow-hidden">
      {/* Fondo Cinético en Blanco Luminoso */}
      <InteractiveEngineeringBackground variant="dark" isFixed={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-semibold mb-3">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>TERMINAL EN TIEMPO REAL • DATOS DE PRUEBA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Simula un cobro en vivo desde tu navegador.
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Esta es la interfaz de mostrador auténtica de <strong className="text-white">Isaac POS</strong>. Haz clic en cualquier artículo para agregarlo a la cuenta, simula cantidades y observa la conversión dual USD/Bs al milisegundo.
          </p>
        </div>

        {/* Simulador Interactivo Completo */}
        <div className="relative max-w-6xl mx-auto shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800">
          <IsaacPosRealTerminal isCompactHero={false} />
        </div>

        {/* 3 Métricas Técnicas al pie del simulador */}
        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="text-xs font-mono text-slate-400 mb-1">Velocidad en Mostrador</div>
            <div className="text-xl font-bold text-emerald-400 font-mono tabular-nums">&lt; 2 Segundos</div>
            <div className="text-[11px] text-slate-500 mt-1">Con lector de código de barras o táctil</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="text-xs font-mono text-slate-400 mb-1">Cálculo Bimonetario</div>
            <div className="text-xl font-bold text-blue-400 font-mono tabular-nums">Tasa Oficial BCV</div>
            <div className="text-[11px] text-slate-500 mt-1">Dólares y bolívares sincronizados en vivo</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="text-xs font-mono text-slate-400 mb-1">Disponibilidad de Mostrador</div>
            <div className="text-xl font-bold text-amber-400 font-mono tabular-nums">100% Offline</div>
            <div className="text-[11px] text-slate-500 mt-1">Sigue cobrando aunque se corte internet</div>
          </div>
        </div>

      </div>
    </section>
  );
};

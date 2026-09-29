"use client";

import React, { useState } from "react";
import { IsaacPosRealTerminal } from "@/components/IsaacPosRealTerminal";
import { Sparkles, Play, ShieldCheck, Zap, RefreshCw } from "lucide-react";

export const InteractivePosDemo: React.FC = () => {
  return (
    <section id="simulador" className="py-20 relative bg-slate-950/70 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-mono font-semibold mb-3 shadow-sm">
            <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" />
            <span>SIMULADOR INTERACTIVO EN VIVO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Pruébalo Tú Mismo en Tiempo Real
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Esta es la interfaz auténtica de <strong className="text-white">Isaac POS V24.04 Ultra</strong> con datos de demostración. Haz clic en cualquier producto para agregarlo al carrito, cambiar cantidades y ver el cálculo bimonetario al instante.
          </p>
        </div>

        {/* Simulador Interactivo Completo */}
        <div className="relative max-w-6xl mx-auto shadow-2xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-teal-500/10 rounded-3xl blur-xl opacity-60 pointer-events-none" />
          <div className="relative">
            <IsaacPosRealTerminal isCompactHero={false} />
          </div>
        </div>

        {/* Métricas al pie del simulador */}
        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-mono text-slate-400 mb-1">Velocidad de Cobro</div>
            <div className="text-xl font-black text-emerald-400 font-mono">&lt; 2 Segundos</div>
            <div className="text-[11px] text-slate-400 mt-1">Con lector de código de barras o táctil</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-mono text-slate-400 mb-1">Cálculo Bimonetario</div>
            <div className="text-xl font-black text-cyan-400 font-mono">Tasa Oficial BCV</div>
            <div className="text-[11px] text-slate-400 mt-1">Dólares y bolívares sincronizados en vivo</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-mono text-slate-400 mb-1">Disponibilidad</div>
            <div className="text-xl font-black text-amber-400 font-mono">100% Offline</div>
            <div className="text-[11px] text-slate-400 mt-1">Sigue cobrando aunque se caiga el internet</div>
          </div>
        </div>

      </div>
    </section>
  );
};

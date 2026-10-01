"use client";

import React from "react";
import { IsaacPosRealTerminal } from "@/components/IsaacPosRealTerminal";
import { Play } from "lucide-react";

export const InteractivePosDemo: React.FC = () => {
  return (
    <section id="simulador" className="py-20 relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3 shadow-xs">
            <Play className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
            <span>SIMULADOR INTERACTIVO EN VIVO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Pruébalo Tú Mismo en Tiempo Real
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Esta es la interfaz auténtica de <strong className="text-slate-900">Isaac POS</strong> con datos de demostración. Haz clic en cualquier producto para agregarlo al carrito, cambiar cantidades y ver el cálculo bimonetario al instante.
          </p>
        </div>

        {/* Simulador Interactivo Completo */}
        <div className="relative max-w-6xl mx-auto shadow-2xl rounded-2xl overflow-hidden border border-slate-300">
          <IsaacPosRealTerminal isCompactHero={false} />
        </div>

        {/* Métricas al pie del simulador */}
        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 mb-1">Velocidad de Cobro</div>
            <div className="text-xl font-bold text-emerald-600 font-mono">&lt; 2 Segundos</div>
            <div className="text-[11px] text-slate-500 mt-1">Con lector de código de barras o táctil</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 mb-1">Cálculo Bimonetario</div>
            <div className="text-xl font-bold text-blue-600 font-mono">Tasa Oficial BCV</div>
            <div className="text-[11px] text-slate-500 mt-1">Dólares y bolívares sincronizados en vivo</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 mb-1">Disponibilidad</div>
            <div className="text-xl font-bold text-amber-700 font-mono">100% Offline</div>
            <div className="text-[11px] text-slate-500 mt-1">Sigue cobrando aunque se caiga el internet</div>
          </div>
        </div>

      </div>
    </section>
  );
};

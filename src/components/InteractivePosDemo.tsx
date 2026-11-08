"use client";

import React from "react";
import { IsaacPosRealTerminal } from "@/components/IsaacPosRealTerminal";
import { InteractiveEngineeringBackground } from "@/components/InteractiveEngineeringBackground";
import { Terminal, Zap, DollarSign, WifiOff } from "lucide-react";

interface InteractivePosDemoProps {
  onOpenModal?: (plan?: string) => void;
}

export const InteractivePosDemo: React.FC<InteractivePosDemoProps> = ({ onOpenModal }) => {
  return (
    <section id="simulador" className="py-24 relative bg-blue-50/40 dark:bg-slate-900/85 text-slate-900 dark:text-white border-t border-blue-100/80 dark:border-slate-800 backdrop-blur-[2px] overflow-hidden transition-colors duration-200">
      {/* Resplandor Ambiental Superior */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-r from-blue-500/15 via-cyan-400/10 to-indigo-500/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-mono font-bold mb-3 shadow-2xs">
            <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>TERMINAL EN TIEMPO REAL • DOBLE PANTALLA INTERACTIVA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-3">
            Simula un cobro y mira la 2da pantalla del cliente en vivo.
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Haz clic en cualquier artículo para agregarlo al carrito y luego pulsa <strong className="text-emerald-700 dark:text-emerald-400">&quot;2da Pantalla: Visor Cliente + QR&quot;</strong> arriba o <strong className="text-emerald-700 dark:text-emerald-400">&quot;Cobrar (F2)&quot;</strong> para ver cómo el monitor secundario genera el QR de Pago Móvil con tus productos.
          </p>
        </div>

        {/* Simulador Interactivo Completo */}
        <div className="relative max-w-6xl mx-auto shadow-[0_25px_65px_-15px_rgba(37,99,235,0.22)] dark:shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden border border-blue-200/80 dark:border-slate-800">
          <IsaacPosRealTerminal isCompactHero={false} onOpenCheckoutModal={onOpenModal} />
        </div>

        {/* 3 Métricas Técnicas al pie del simulador */}
        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border border-emerald-200/80 dark:border-slate-800 shadow-[0_8px_24px_-8px_rgba(16,185,129,0.14)]">
            <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-1">Velocidad en Mostrador</div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">&lt; 2 Segundos</div>
            <div className="text-[11px] text-slate-500 mt-1">Con lector de código de barras o táctil</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border border-blue-200/80 dark:border-slate-800 shadow-[0_8px_24px_-8px_rgba(37,99,235,0.14)]">
            <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-1">Cálculo Bimonetario</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400 font-mono tabular-nums">Tasa Oficial BCV</div>
            <div className="text-[11px] text-slate-500 mt-1">Dólares y bolívares sincronizados en vivo</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border border-amber-200/80 dark:border-slate-800 shadow-[0_8px_24px_-8px_rgba(245,158,11,0.14)]">
            <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-1">Disponibilidad de Mostrador</div>
            <div className="text-xl font-bold text-amber-600 dark:text-amber-400 font-mono tabular-nums">100% Offline</div>
            <div className="text-[11px] text-slate-500 mt-1">Sigue cobrando aunque se corte internet</div>
          </div>
        </div>

      </div>
    </section>
  );
};

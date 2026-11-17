"use client";

import React from "react";
import { IsaacPosRealTerminal } from "@/components/IsaacPosRealTerminal";

interface InteractivePosDemoProps {
  onOpenModal?: (plan?: string) => void;
}

export const InteractivePosDemo: React.FC<InteractivePosDemoProps> = ({ onOpenModal }) => {
  return (
    <div className="py-4 relative text-slate-900 dark:text-white overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h3 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight mb-2">
            Simula un cobro y mira la 2da pantalla del cliente en vivo.
          </h3>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Haz clic en cualquier artículo para agregarlo al carrito y luego pulsa <strong className="text-emerald-700 dark:text-emerald-400">&quot;2da Pantalla: Visor Cliente + QR&quot;</strong> arriba o <strong className="text-emerald-700 dark:text-emerald-400">&quot;Cobrar (F2)&quot;</strong>.
          </p>
        </div>

        {/* Simulador Interactivo Completo */}
        <div className="relative max-w-6xl mx-auto shadow-[0_25px_65px_-15px_rgba(37,99,235,0.22)] dark:shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden border border-blue-200/80 dark:border-slate-800">
          <IsaacPosRealTerminal isCompactHero={false} onOpenCheckoutModal={onOpenModal} />
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import { Layers, Store, Terminal } from "lucide-react";
import { RealSystemShowcase } from "@/components/RealSystemShowcase";
import { IndustrySolutions } from "@/components/IndustrySolutions";
import { InteractivePosDemo } from "@/components/InteractivePosDemo";

interface ProductAndIndustryHubProps {
  onOpenModal: (plan?: string) => void;
}

export const ProductAndIndustryHub: React.FC<ProductAndIndustryHubProps> = ({
  onOpenModal,
}) => {
  const [activeView, setActiveView] = useState<"modules" | "industries" | "simulator">("modules");

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash === "#rubros") {
        setActiveView("industries");
      } else if (hash === "#simulador") {
        setActiveView("simulator");
      } else if (hash === "#sistema-real") {
        setActiveView("modules");
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <section
      id="sistema-real"
      className="py-12 sm:py-16 relative bg-white/65 dark:bg-slate-950/85 backdrop-blur-[2px] border-t border-blue-100/80 dark:border-slate-800/80 transition-colors duration-200"
    >
      {/* Anclas compatibles para enlaces a #rubros y #simulador */}
      <span id="rubros" className="absolute -top-20 left-0 pointer-events-none" />
      <span id="simulador" className="absolute -top-20 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conmutador Superior Unificado de 3 Pestañas: Módulos | Rubros | Simulador en Vivo */}
        <div className="flex flex-col items-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50/90 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-blue-800 dark:text-slate-200 text-xs font-mono font-bold mb-3 shadow-2xs">
            <span>ESCAPARATE INTERACTIVO V24.04</span>
          </div>

          <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-inner gap-1.5">
            <button
              type="button"
              onClick={() => setActiveView("modules")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeView === "modules"
                  ? "bg-slate-950 dark:bg-blue-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>1. Los 13 Módulos</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView("industries")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeView === "industries"
                  ? "bg-slate-950 dark:bg-blue-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              <Store className="w-4 h-4 shrink-0" />
              <span>2. Por Rubro Comercial</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView("simulator")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeView === "simulator"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              <Terminal className="w-4 h-4 shrink-0" />
              <span>3. Simulador en Vivo</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </div>
        </div>
      </div>

      {/* Vista Activa */}
      {activeView === "modules" && <RealSystemShowcase />}
      {activeView === "industries" && <IndustrySolutions onOpenModal={onOpenModal} />}
      {activeView === "simulator" && <InteractivePosDemo onOpenModal={onOpenModal} />}
    </section>
  );
};

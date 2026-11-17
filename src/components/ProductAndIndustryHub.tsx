"use client";

import React, { useState, useEffect } from "react";
import { Layers, Store } from "lucide-react";
import { RealSystemShowcase } from "@/components/RealSystemShowcase";
import { IndustrySolutions } from "@/components/IndustrySolutions";

interface ProductAndIndustryHubProps {
  onOpenModal: (plan?: string) => void;
}

export const ProductAndIndustryHub: React.FC<ProductAndIndustryHubProps> = ({
  onOpenModal,
}) => {
  const [activeView, setActiveView] = useState<"modules" | "industries">("modules");

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash === "#rubros") {
        setActiveView("industries");
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
      className="py-16 sm:py-20 relative bg-white/65 dark:bg-slate-950/85 backdrop-blur-[2px] border-t border-blue-100/80 dark:border-slate-800/80 transition-colors duration-200"
    >
      {/* Ancla compatible para enlaces a #rubros */}
      <span id="rubros" className="absolute -top-20 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conmutador Superior Unificado: Módulos vs. Rubros */}
        <div className="flex flex-col items-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50/90 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-blue-800 dark:text-slate-200 text-xs font-mono font-bold mb-4 shadow-2xs">
            <span>ESCAPARATE INTERACTIVO V24.04</span>
          </div>

          <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-inner gap-1.5">
            <button
              type="button"
              onClick={() => setActiveView("modules")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeView === "modules"
                  ? "bg-slate-950 dark:bg-blue-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>Los 13 Módulos del Sistema</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView("industries")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeView === "industries"
                  ? "bg-slate-950 dark:bg-blue-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              <Store className="w-4 h-4 shrink-0" />
              <span>Soluciones por Rubro Comercial</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vista Activa (Sin apilar ambas secciones en vertical) */}
      {activeView === "modules" ? (
        <RealSystemShowcase />
      ) : (
        <IndustrySolutions onOpenModal={onOpenModal} />
      )}
    </section>
  );
};

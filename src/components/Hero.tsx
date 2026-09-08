"use client";

import React from "react";
import { ShieldCheck, Zap, WifiOff, Award, ArrowRight, Play, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onOpenModal: (plan?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Decorative Grid and Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge superior de Seguridad y Confiabilidad */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium mb-8 shadow-inner backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Sistema POS Blindado contra Fraudes y Pérdidas de Caja</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-300">Certificación PCI Nivel 1</span>
          </div>

          {/* Título Principal de Alto Impacto */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
            El Punto de Venta más{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Rápido, Confiable y Seguro
            </span>{" "}
            para tu Negocio.
          </h1>

          {/* Subtítulo enfocado en dolores reales de comercios */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Cobra en menos de 3 segundos, gestiona inventarios en tiempo real y{" "}
            <strong className="text-white font-semibold">sigue vendiendo sin internet</strong> gracias a su tecnología offline resiliente con cifrado militar.
          </p>

          {/* Llamados a la Acción (CTAs) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => onOpenModal("demo_gratis")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-base shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group"
            >
              <span>Solicitar Demostración Guiada</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#simulador"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 hover:border-slate-600 text-slate-200 font-bold text-base transition-all flex items-center justify-center gap-2 group backdrop-blur-sm"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Probar Simulador Interactivo</span>
            </a>
          </div>

          {/* Badges de Confianza Rápidos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-center gap-2 text-slate-300 text-xs sm:text-sm">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Cobros en &lt; 3 seg</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-300 text-xs sm:text-sm">
              <WifiOff className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Modo 100% Offline</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-300 text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Corte de Caja Ciego</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-300 text-xs sm:text-sm">
              <Award className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Soporte 24/7 en Español</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import {
  WifiOff,
  ArrowRight,
  Play,
  Headphones,
  ShieldCheck,
  DollarSign,
} from "lucide-react";

interface HeroProps {
  onOpenModal: (plan?: string) => void;
  onOpenAiChat?: () => void;
  onOpenVideoDemo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenModal,
  onOpenVideoDemo,
}) => {
  return (
    <section className="relative pt-24 pb-10 md:pt-28 md:pb-14 overflow-hidden bg-gradient-to-b from-blue-50/40 via-transparent to-indigo-50/30 dark:from-transparent dark:via-slate-950/60 dark:to-slate-900/40 transition-colors duration-200">
      {/* Halos de luz arquitectónica superior */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[920px] h-[340px] bg-gradient-to-r from-blue-600/20 via-cyan-400/15 to-indigo-600/15 dark:from-blue-500/20 dark:via-cyan-500/10 dark:to-indigo-500/15 blur-[110px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo Oficial Principal */}
          <div className="flex justify-center mb-4 sm:mb-5">
            <picture className="dark:hidden">
              <source srcSet="/isaac-logo-horizontal.webp" type="image/webp" />
              <img
                src="/isaac-logo-horizontal.png"
                alt="Isaac POS • Sistema de Facturación y Ventas"
                width={796}
                height={259}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-[240px] sm:w-[320px] md:w-[360px] h-auto object-contain drop-shadow-[0_14px_30px_rgba(37,99,235,0.16)] select-none"
              />
            </picture>
            <picture className="hidden dark:block">
              <source srcSet="/isaac-logo-horizontal-dark.webp" type="image/webp" />
              <img
                src="/isaac-logo-horizontal-dark.png"
                alt="Isaac POS • Sistema de Facturación y Ventas"
                width={796}
                height={259}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-[240px] sm:w-[320px] md:w-[360px] h-auto object-contain drop-shadow-[0_10px_28px_rgba(56,189,248,0.18)] select-none"
              />
            </picture>
          </div>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/80 border border-blue-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-4 shadow-[0_4px_16px_-2px_rgba(37,99,235,0.12)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 status-breathing shrink-0" />
            <span className="font-mono text-blue-950 dark:text-white text-[11px] tracking-wider uppercase font-bold">
              ARQUITECTURA DE MOSTRADOR 100% OFFLINE
            </span>
            <span className="text-blue-300 dark:text-slate-600 hidden sm:inline">•</span>
            <span className="text-blue-700 dark:text-slate-300 text-xs font-bold hidden sm:inline">
              Tasa Oficial BCV en Vivo
            </span>
          </div>

          {/* Título Principal */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.035em] text-slate-950 dark:text-white leading-[1.08] mb-4">
            El punto de venta diseñado para{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              no detenerse jamás.
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-sm sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-7 leading-relaxed font-normal">
            Cobra en menos de 2 segundos a <strong className="text-slate-950 dark:text-white font-bold">tasa oficial BCV</strong>, blinda tus turnos con <strong className="text-slate-950 dark:text-white font-bold">arqueo ciego anti-faltantes</strong> y factura <strong className="text-slate-950 dark:text-white font-bold">sin depender de internet</strong>.
          </p>

          {/* Acciones Principales */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <a
              href="#sistema-real"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-[0_8px_24px_-4px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explorar Módulos y Simulador</span>
              <ArrowRight className="w-4 h-4 text-blue-100 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {onOpenVideoDemo && (
              <button
                type="button"
                onClick={onOpenVideoDemo}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm shadow-[0_8px_20px_-4px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-800 dark:border-slate-700 group"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-emerald-400 text-emerald-400 ml-0.5" />
                </div>
                <span>Ver Video (40s)</span>
              </button>
            )}

            <button
              onClick={() => onOpenModal("demo_gratis")}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/95 dark:bg-slate-900 hover:bg-blue-50/60 dark:hover:bg-slate-800 border border-blue-200 dark:border-slate-700 text-blue-950 dark:text-slate-100 font-bold text-sm shadow-[0_4px_14px_rgba(37,99,235,0.08)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Agendar Instalación</span>
            </button>
          </div>

          {/* Píldora Rápida de Precios */}
          <div className="mb-8 flex items-center justify-center">
            <a
              href="#precios"
              className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50/95 dark:bg-emerald-950/60 hover:bg-emerald-100/90 dark:hover:bg-emerald-900/60 border border-emerald-300/90 dark:border-emerald-800/80 text-xs text-slate-800 dark:text-slate-200 shadow-xs transition-colors group"
            >
              <span className="font-bold text-emerald-800 dark:text-emerald-300 font-mono">SIN COMISIONES POR VENTA:</span>
              <span>Planes desde <strong className="text-slate-950 dark:text-white">$12/mes</strong> o <strong className="text-slate-950 dark:text-white">Licencia Vitalicia por $199</strong> (Pago único)</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform">Ver precios →</span>
            </a>
          </div>

          {/* 4 Certezas Operativas Compactas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-5 border-t border-blue-200/60 dark:border-slate-800/80 text-left">
            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-emerald-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-0.5">
                <div className="p-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <WifiOff className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-950 dark:text-white text-xs font-extrabold font-mono">100% OFFLINE</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-tight">Cobra sin internet ni caídas.</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-blue-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-0.5">
                <div className="p-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <DollarSign className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-950 dark:text-white text-xs font-extrabold font-mono">TASA BCV</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-tight">Cálculo dual USD y Bs en vivo.</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-amber-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-0.5">
                <div className="p-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-950 dark:text-white text-xs font-extrabold font-mono">ARQUEO CIEGO</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-tight">Conteo de billetes anti-faltantes.</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-indigo-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-0.5">
                <div className="p-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <Headphones className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-950 dark:text-white text-xs font-extrabold font-mono">SOPORTE 1 A 1</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-tight">Instalación remota por AnyDesk.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

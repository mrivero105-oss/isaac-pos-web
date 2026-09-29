"use client";

import React, { useState } from "react";
import { Zap, WifiOff, ArrowRight, Play, Sparkles, Monitor, Maximize2, X } from "lucide-react";

interface HeroProps {
  onOpenModal: (plan?: string) => void;
  onOpenAiChat?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal, onOpenAiChat }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Retícula decorativa sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Resplandor superior */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[550px] h-[220px] bg-gradient-to-r from-cyan-500/15 via-teal-500/15 to-emerald-500/15 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Badge superior de la Nueva Edición Ultra */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-mono text-white text-[11px] sm:text-xs bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/30 uppercase tracking-wider font-bold">
              EDICIÓN ULTRA 2026
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden sm:inline">Instalación Ligera y Máxima Rapidez</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.12] mb-6">
            El Punto de Venta más{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Rápido, Compacto y Seguro
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Factura en 2 segundos a tasa oficial BCV, conecta un <strong className="text-white font-semibold">visor secundario para el cliente</strong> y sigue cobrando <strong className="text-white font-semibold">100% sin internet</strong> con respaldo automático.
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <a
              href="#edicion-ultra"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Descargar Edición Ultra</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={() => onOpenModal("demo_gratis")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 hover:border-slate-600 text-slate-200 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 group backdrop-blur-sm"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Solicitar Demo Guiada</span>
            </button>

            {onOpenAiChat && (
              <button
                onClick={onOpenAiChat}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-cyan-500/40 text-cyan-300 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 group shadow-sm backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Consultar Isaac AI</span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono font-bold">GRATIS</span>
              </button>
            )}
          </div>

          {/* 4 Métricas de Confianza Rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 border-t border-slate-800/80 mb-12">
            <div className="flex items-center justify-center gap-2 text-slate-300 text-xs sm:text-sm">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Instalación Inmediata</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-300 text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Rápido y Fluido</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-300 text-xs sm:text-sm">
              <WifiOff className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Modo 100% Offline</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-300 text-xs sm:text-sm">
              <Monitor className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Visor 2da Pantalla</span>
            </div>
          </div>

          {/* Vista Real del Sistema Isaac POS V24.04 Ultra */}
          <div className="relative max-w-6xl mx-auto text-left mt-4">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/25 via-teal-500/25 to-emerald-500/25 rounded-3xl blur-2xl opacity-60 pointer-events-none"></div>
            
            <div className="relative rounded-2xl bg-slate-950 border-2 border-slate-700/80 shadow-2xl overflow-hidden group">
              {/* Barra superior de la ventana Windows */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0b0f19] border-b border-slate-800 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block shadow-sm"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block shadow-sm"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block shadow-sm"></span>
                  </div>
                  <span className="ml-2 font-semibold text-slate-200 text-xs hidden sm:inline">
                    Isaac POS V24.04 Ultra • Terminal de Ventas Bimonetario
                  </span>
                  <span className="ml-2 font-semibold text-slate-200 text-xs sm:hidden">
                    Isaac POS V24.04 Ultra
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 text-[11px] font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                    ● Alta Velocidad
                  </span>
                  <button
                    onClick={() => setIsZoomed(true)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Ampliar captura"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Imagen en Alta Resolución del Terminal */}
              <div 
                className="relative cursor-zoom-in overflow-hidden bg-slate-950"
                onClick={() => setIsZoomed(true)}
              >
                <img
                  src="/real-system/ui_terminal_ventas_real.png"
                  alt="Isaac POS V24.04 Ultra - Terminal de Venta Real"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                />
                
                {/* Overlay hover sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 pointer-events-none">
                  <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-slate-200 text-xs font-medium">
                    Vista Real de la Aplicación de Escritorio • Productos de Demostración
                  </div>
                  <div className="bg-cyan-500 text-slate-950 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Clic para ver en pantalla completa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL ZOOM PANTALLA COMPLETA */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-7xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#0b0f19] text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="font-bold text-white text-sm">Isaac POS V24.04 Ultra - Terminal de Ventas Real</span>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 sm:p-4 bg-slate-950 max-h-[85vh] overflow-auto">
              <img
                src="/real-system/ui_terminal_ventas_real.png"
                alt="Isaac POS V24.04 Ultra"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

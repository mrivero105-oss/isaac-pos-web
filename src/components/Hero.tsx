"use client";

import React, { useState } from "react";
import { WifiOff, ArrowRight, Play, Headphones, Monitor, Maximize2, X, ShieldCheck, DollarSign, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onOpenModal: (plan?: string) => void;
  onOpenAiChat?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal, onOpenAiChat }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Retícula sutil corporativa */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Badge superior corporativo y serio */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-medium mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-mono text-emerald-400 text-xs uppercase tracking-wider font-bold">
              SOFTWARE POS EMPRESARIAL
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden sm:inline">Diseñado para el Comercio Real</span>
          </div>

          {/* Título Principal Sobrio y Contundente */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
            El Punto de Venta Confiable{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
              para tu Negocio
            </span>
          </h1>

          {/* Subtítulo enfocado en dolores reales de negocio */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Factura en segundos a <strong className="text-white font-semibold">tasa oficial BCV</strong>, cuadra tu caja sin faltantes con <strong className="text-white font-semibold">arqueo ciego</strong> y sigue cobrando <strong className="text-white font-semibold">100% sin internet</strong>. Con soporte técnico humano y acompañamiento en la instalación.
          </p>

          {/* Botones de Acción de Negocio */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <button
              onClick={() => onOpenModal("demo_gratis")}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Solicitar Demo Guiada</span>
            </button>

            <a
              href="https://wa.me/584248302226?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20y%20asesor%C3%ADa%20sobre%20Isaac%20POS%20para%20mi%20negocio."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 group"
            >
              <Headphones className="w-4 h-4 text-emerald-400" />
              <span>Hablar con un Especialista</span>
            </a>

            <a
              href="#simulador"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2"
            >
              <span>Probar Terminal Online</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* 4 Pilares de Confianza y Continuidad Operativa */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800 mb-12 text-left">
            <div className="flex items-start gap-2.5">
              <WifiOff className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-white text-xs sm:text-sm font-semibold">100% Offline</div>
                <div className="text-slate-400 text-[11px] leading-tight">Opera sin caídas ni internet</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <DollarSign className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-white text-xs sm:text-sm font-semibold">Tasa Oficial BCV</div>
                <div className="text-slate-400 text-[11px] leading-tight">Cobro dual USD y Bolívares</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-white text-xs sm:text-sm font-semibold">Arqueo Ciego</div>
                <div className="text-slate-400 text-[11px] leading-tight">Control estricto de cajeros</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Headphones className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-white text-xs sm:text-sm font-semibold">Soporte Humano</div>
                <div className="text-slate-400 text-[11px] leading-tight">AnyDesk y WhatsApp directo</div>
              </div>
            </div>
          </div>

          {/* Vista Real del Sistema Isaac POS */}
          <div className="relative max-w-6xl mx-auto text-left mt-4">
            <div className="relative rounded-2xl bg-slate-950 border border-slate-700/80 shadow-2xl overflow-hidden group">
              {/* Barra superior de la ventana Windows profesional */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-slate-700 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-slate-700 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-slate-700 inline-block"></span>
                  </div>
                  <span className="ml-2 font-semibold text-slate-200 text-xs hidden sm:inline">
                    Isaac POS • Terminal de Ventas y Facturación Multimoneda
                  </span>
                  <span className="ml-2 font-semibold text-slate-200 text-xs sm:hidden">
                    Isaac POS Desktop
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 text-[11px] font-medium bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                    ● En Línea • Tasa BCV Sincronizada
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
                  alt="Isaac POS - Terminal de Venta Real"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.005]"
                />
                
                {/* Overlay hover sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 pointer-events-none">
                  <div className="bg-slate-900/95 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-200 text-xs font-medium">
                    Captura real de la aplicación de escritorio en operación
                  </div>
                  <div className="bg-slate-800 text-white px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 border border-slate-700">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Ampliar pantalla completa</span>
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
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-7xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="font-bold text-white text-sm">Isaac POS - Terminal de Ventas Real</span>
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
                alt="Isaac POS Terminal Real"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

"use client";

import React, { useState } from "react";
import { WifiOff, ArrowRight, Play, Headphones, Maximize2, X, ShieldCheck, DollarSign } from "lucide-react";

interface HeroProps {
  onOpenModal: (plan?: string) => void;
  onOpenAiChat?: () => void;
  onOpenVideoDemo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal, onOpenAiChat, onOpenVideoDemo }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-slate-50">
      {/* Retícula sutil corporativa en modo claro */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f050_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f050_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Sutil resplandor azul cobalto superior */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[240px] bg-blue-500/8 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Badge superior corporativo */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 text-slate-800 text-xs sm:text-sm font-medium mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="font-mono text-blue-700 text-xs uppercase tracking-wider font-bold">
              PUNTO DE VENTA EMPRESARIAL
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-slate-600 hidden sm:inline">Diseñado para el Comercio Real</span>
          </div>

          {/* Título Principal Llamativo & Humano */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.12] mb-6">
            El Punto de Venta Confiable{" "}
            <span className="text-blue-600">
              para tu Negocio
            </span>
          </h1>

          {/* Subtítulo enfocado en dolores y soluciones de negocio */}
          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Factura en segundos a <strong className="text-slate-900 font-semibold">tasa oficial BCV</strong>, cuadra tu caja sin faltantes con <strong className="text-slate-900 font-semibold">arqueo ciego</strong> y sigue cobrando <strong className="text-slate-900 font-semibold">100% sin internet</strong>. Con soporte técnico humano y acompañamiento en la instalación.
          </p>

          {/* Botones de Acción de Alto Contraste */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
            {onOpenVideoDemo && (
              <button
                type="button"
                onClick={onOpenVideoDemo}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-slate-800 group"
              >
                <Play className="w-4 h-4 fill-emerald-400 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Ver Demo en Video (32s)</span>
              </button>
            )}

            <button
              onClick={() => onOpenModal("demo_gratis")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Solicitar Demo Guiada</span>
            </button>

            <a
              href="https://wa.me/584248302226?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20y%20asesor%C3%ADa%20sobre%20Isaac%20POS%20para%20mi%20negocio."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm sm:text-base shadow-xs transition-all flex items-center justify-center gap-2 group"
            >
              <Headphones className="w-4 h-4 text-blue-600" />
              <span>Hablar con un Especialista</span>
            </a>

            <a
              href="#simulador"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2"
            >
              <span>Probar Simulador</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </a>
          </div>

          {/* 4 Pilares de Confianza y Continuidad */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-200 mb-12 text-left">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                <WifiOff className="w-4 h-4" />
              </div>
              <div>
                <div className="text-slate-900 text-xs sm:text-sm font-bold">100% Offline</div>
                <div className="text-slate-500 text-[11px] leading-tight">Sigue cobrando sin red</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <div className="text-slate-900 text-xs sm:text-sm font-bold">Tasa Oficial BCV</div>
                <div className="text-slate-500 text-[11px] leading-tight">Cobro dual USD y Bs</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-slate-900 text-xs sm:text-sm font-bold">Arqueo Ciego</div>
                <div className="text-slate-500 text-[11px] leading-tight">Cero fugas de caja</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <div className="text-slate-900 text-xs sm:text-sm font-bold">Soporte Humano</div>
                <div className="text-slate-500 text-[11px] leading-tight">AnyDesk y WhatsApp</div>
              </div>
            </div>
          </div>

          {/* Vista Real del Sistema Isaac POS en Ventana de Escritorio Profesional */}
          <div className="relative max-w-6xl mx-auto text-left mt-6">
            <div className="relative rounded-2xl bg-white border border-slate-300 shadow-2xl overflow-hidden group">
              {/* Barra superior de la ventana Windows */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 border-b border-slate-200 text-xs font-mono text-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-400 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                  </div>
                  <span className="ml-2 font-semibold text-slate-800 text-xs hidden sm:inline">
                    Isaac POS Desktop • Terminal de Ventas y Facturación Multimoneda
                  </span>
                  <span className="ml-2 font-semibold text-slate-800 text-xs sm:hidden">
                    Isaac POS Desktop
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {onOpenVideoDemo && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenVideoDemo();
                      }}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-xs cursor-pointer transition-all"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Ver en Acción (32s)</span>
                    </button>
                  )}
                  <span className="text-emerald-700 text-[11px] font-semibold bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ● En Línea • Tasa BCV Sincronizada
                  </span>
                  <button
                    onClick={() => setIsZoomed(true)}
                    className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    title="Ampliar captura"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Imagen en Alta Resolución del Terminal */}
              <div 
                className="relative cursor-pointer overflow-hidden bg-slate-900"
                onClick={() => {
                  if (onOpenVideoDemo) onOpenVideoDemo();
                  else setIsZoomed(true);
                }}
              >
                <img
                  src="/real-system/ui_terminal_ventas_real.png"
                  alt="Isaac POS - Terminal de Venta Real"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.005]"
                />
                
                {/* Overlay hover sutil */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 text-xs font-semibold shadow-md pointer-events-none">
                    Terminal de ventas y facturación en mostrador
                  </div>
                  {onOpenVideoDemo && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenVideoDemo();
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer pointer-events-auto transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Reproducir Demostración en Video</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL ZOOM PANTALLA COMPLETA */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-7xl w-full bg-white border border-slate-300 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-100 text-xs font-mono text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-bold text-slate-900 text-sm">Isaac POS - Terminal de Ventas Real</span>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 sm:p-4 bg-slate-900 max-h-[85vh] overflow-auto">
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

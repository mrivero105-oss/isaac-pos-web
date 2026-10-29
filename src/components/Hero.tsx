"use client";

import React, { useState, useEffect } from "react";
import {
  WifiOff,
  ArrowRight,
  Play,
  Headphones,
  Maximize2,
  X,
  ShieldCheck,
  DollarSign,
  Monitor,
  Banknote,
  Sparkles,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface HeroProps {
  onOpenModal: (plan?: string) => void;
  onOpenAiChat?: () => void;
  onOpenVideoDemo?: () => void;
}

type StageView = "pos" | "customer_display" | "arqueo";

export const Hero: React.FC<HeroProps> = ({
  onOpenModal,
  onOpenAiChat,
  onOpenVideoDemo,
}) => {
  const [activeView, setActiveView] = useState<StageView>("pos");
  const [isZoomed, setIsZoomed] = useState(false);
  const [bcvRate, setBcvRate] = useState<number | null>(null);

  // Obtener tasa BCV viva
  useEffect(() => {
    let isMounted = true;
    fetch("/api/bcv")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data?.data?.rate) {
          setBcvRate(data.data.rate);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const rateValue = bcvRate || 857.89;

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-transparent via-white/50 to-slate-100/30">
      {/* Halo de luz arquitectónica superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[320px] bg-gradient-to-b from-blue-500/10 via-blue-600/5 to-transparent blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Eyebrow de producto financiero / POS */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/5 border border-slate-300/80 text-slate-800 text-xs font-semibold mb-6 shadow-xs backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 status-breathing shrink-0" />
            <span className="font-mono text-slate-900 text-[11px] tracking-wider uppercase font-bold">
              ARQUITECTURA DE MOSTRADOR 100% OFFLINE
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-slate-600 text-xs hidden sm:inline">
              Tasa Oficial BCV en Vivo
            </span>
          </div>

          {/* Título Principal Editorial & Contundente */}
          <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-black tracking-[-0.035em] text-slate-950 leading-[1.08] mb-6">
            El punto de venta diseñado para{" "}
            <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
              no detenerse jamás.
            </span>
          </h1>

          {/* Subtítulo enfocado en la realidad operativa del comercio */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Cobra en menos de 2 segundos a <strong className="text-slate-900 font-semibold">tasa oficial BCV</strong>, blinda tus turnos con <strong className="text-slate-900 font-semibold">arqueo ciego anti-faltantes</strong> y factura <strong className="text-slate-900 font-semibold">sin depender de internet</strong>. Con instalación remota guiada 1 a 1.
          </p>

          {/* Bloque de Acciones: Jerarquía de Dos Pasos Claros */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
            <a
              href="#simulador"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Probar Simulador de Caja en Vivo</span>
              <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {onOpenVideoDemo && (
              <button
                type="button"
                onClick={onOpenVideoDemo}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-md shadow-slate-950/15 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-slate-800 group"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-emerald-400 text-emerald-400 ml-0.5" />
                </div>
                <span>Ver Video Demostrativo (32s)</span>
              </button>
            )}

            <button
              onClick={() => onOpenModal("demo_gratis")}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm sm:text-base shadow-xs hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Agendar Instalación Asistida</span>
            </button>
          </div>

          {/* Fila de Especificaciones y Certezas Operativas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 border-t border-slate-200/80 mb-12 text-left">
            <div className="p-3 rounded-xl bg-white/70 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2 mb-1">
                <WifiOff className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-slate-950 text-xs font-bold font-mono">100% OFFLINE</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-tight">SQLite local; cobra sin internet ni servidores.</p>
            </div>

            <div className="p-3 rounded-xl bg-white/70 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-slate-950 text-xs font-bold font-mono">TASA OFICIAL BCV</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-tight">Conversión dual en tiempo real para USD y Bs.</p>
            </div>

            <div className="p-3 rounded-xl bg-white/70 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-slate-950 text-xs font-bold font-mono">ARQUEO CIEGO</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-tight">Declaración física de billetes sin saldo a la vista.</p>
            </div>

            <div className="p-3 rounded-xl bg-white/70 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2 mb-1">
                <Headphones className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-slate-950 text-xs font-bold font-mono">SOPORTE HUMANO</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-tight">Conexión AnyDesk y acompañamiento directo.</p>
            </div>
          </div>

          {/* ============================================================== */}
          {/* PRODUCT STAGE INTERACTIVO: Terminal, Visor y Arqueo Ciego      */}
          {/* ============================================================== */}
          <div className="relative max-w-6xl mx-auto text-left mt-4">
            {/* Contenedor Hardware de Alta Definición */}
            <div className="relative rounded-2xl sm:rounded-3xl bg-slate-950 border border-slate-800 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.35)] overflow-hidden">
              
              {/* Barra de Control de Hardware & Pestañas del Sistema */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 gap-3">
                
                {/* Lado Izquierdo: Botones ventana OS + Título */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />
                  <span className="font-mono text-xs font-semibold text-slate-300 tracking-tight flex items-center gap-2">
                    <span className="text-emerald-400">●</span>
                    <span className="hidden sm:inline">Isaac POS Ultra •</span>
                    <span className="text-slate-400">
                      {activeView === "pos" && "Terminal de Ventas & Mostrador"}
                      {activeView === "customer_display" && "Visor Secundario para Cliente (/#/display)"}
                      {activeView === "arqueo" && "Módulo de Arqueo Ciego Anti-Fraude"}
                    </span>
                  </span>
                </div>

                {/* Centro / Switcher Interactivo de 3 Vistas */}
                <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 self-center sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setActiveView("pos")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeView === "pos"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>Terminal POS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveView("customer_display")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeView === "customer_display"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Visor de Cliente</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveView("arqueo")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeView === "arqueo"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Banknote className="w-3.5 h-3.5" />
                    <span>Arqueo Ciego</span>
                  </button>
                </div>

                {/* Lado Derecho: Acciones de Expansión y Video */}
                <div className="hidden md:flex items-center gap-2">
                  {onOpenVideoDemo && (
                    <button
                      type="button"
                      onClick={onOpenVideoDemo}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      <Play className="w-3 h-3 fill-emerald-400" />
                      <span>Video 32s</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsZoomed(true)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Ampliar captura"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Contenido Visual Dinámico según la Pestaña Seleccionada */}
              <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[540px] bg-slate-950 flex items-center justify-center overflow-hidden">
                
                {/* 1. Vista: Terminal POS Real */}
                {activeView === "pos" && (
                  <div
                    className="w-full relative cursor-pointer group"
                    onClick={() => {
                      if (onOpenVideoDemo) onOpenVideoDemo();
                      else setIsZoomed(true);
                    }}
                  >
                    <img
                      src="/real-system/ui_terminal_ventas_real.png"
                      alt="Isaac POS - Terminal de Ventas y Mostrador Real"
                      className="w-full h-auto object-cover select-none"
                    />

                    {/* Hotspots explicativos interactivos sobre el software */}
                    <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-white text-xs font-mono flex items-center gap-2 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Catálogo Táctil + Lector de Barras</span>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-white text-xs font-mono flex items-center gap-2 shadow-lg">
                      <DollarSign className="w-3.5 h-3.5 text-blue-400" />
                      <span>Cálculo Bimonetario: USD & Bs a Tasa BCV</span>
                    </div>

                    {/* Overlay al pasar el cursor */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      {onOpenVideoDemo ? (
                        <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl text-slate-950 font-bold text-sm shadow-2xl flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                            <Play className="w-4 h-4 fill-white ml-0.5" />
                          </div>
                          <span>Haz clic para ver demostración en video (32 segundos)</span>
                        </div>
                      ) : (
                        <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-slate-950 font-bold text-xs shadow-xl">
                          Haz clic para ampliar vista
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. Vista: Visor de Cliente (2da Pantalla en Vivo) */}
                {activeView === "customer_display" && (
                  <div className="w-full p-4 sm:p-8 bg-slate-900 text-white flex flex-col justify-center max-w-4xl mx-auto">
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl">
                      {/* Cabecera del Visor */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-xs font-mono">
                            POS
                          </div>
                          <div>
                            <div className="text-xs text-slate-400">PANTALLA ORIENTADA AL CLIENTE</div>
                            <div className="text-base font-extrabold text-white">Supermercado & Víveres La Esperanza</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[11px] text-slate-400 font-mono">Tasa Oficial BCV</div>
                          <div className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                            Bs. {rateValue.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Artículos siendo escaneados en vivo */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                          <div className="flex items-center gap-3">
                            <img
                              src="/real-products/harina_pan.png"
                              alt="Harina PAN"
                              className="w-10 h-10 object-contain rounded-lg bg-white/5 p-1"
                              onError={(e) => {
                                // Fallback silencioso si no carga imagen específica
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                            <div>
                              <div className="text-sm font-bold text-white">HARINA PAN BLANCA 1KG</div>
                              <div className="text-xs text-slate-400">2 unidades × $1.35 USD</div>
                            </div>
                          </div>
                          <div className="text-right font-mono">
                            <div className="text-sm font-bold text-white">$2.70 USD</div>
                            <div className="text-xs text-slate-400 tabular-nums">
                              Bs. {(2.7 * rateValue).toFixed(2)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                          <div className="flex items-center gap-3">
                            <img
                              src="/real-products/aceite_vatel_1l.png"
                              alt="Aceite Vatel"
                              className="w-10 h-10 object-contain rounded-lg bg-white/5 p-1"
                            />
                            <div>
                              <div className="text-sm font-bold text-white">ACEITE VEGETAL VATEL 1L</div>
                              <div className="text-xs text-slate-400">1 unidad × $2.95 USD</div>
                            </div>
                          </div>
                          <div className="text-right font-mono">
                            <div className="text-sm font-bold text-white">$2.95 USD</div>
                            <div className="text-xs text-slate-400 tabular-nums">
                              Bs. {(2.95 * rateValue).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Total Bimonetario de Alto Impacto */}
                      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/80 to-slate-900 border border-blue-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider block">
                            TOTAL A PAGAR (DUAL)
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Cero discusiones en caja: el comprador audita su cuenta en tiempo real.
                          </span>
                        </div>
                        <div className="text-right font-mono">
                          <div className="text-2xl sm:text-3xl font-black text-white">$5.65 USD</div>
                          <div className="text-base sm:text-lg font-bold text-emerald-400 tabular-nums">
                            Bs. {(5.65 * rateValue).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Vista: Arqueo Ciego de Caja */}
                {activeView === "arqueo" && (
                  <div
                    className="w-full relative cursor-pointer group"
                    onClick={() => setIsZoomed(true)}
                  >
                    <img
                      src="/real-system/ui_arqueo_caja.png"
                      alt="Isaac POS - Arqueo Ciego de Caja Anti-Fraude"
                      className="w-full h-auto object-cover select-none"
                    />

                    {/* Explicación de la tecnología de arqueo ciego */}
                    <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/80 text-white text-xs max-w-sm shadow-xl">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1 font-mono">
                        <Lock className="w-3.5 h-3.5" />
                        <span>ARQUEO CIEGO CERTIFICADO</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        El cajero introduce la cantidad exacta de billetes físicos que tiene en su gaveta. <strong>No sabe cuánto espera el sistema</strong>. Si sobran o faltan $5 o Bs. 200, el sistema lo audita al instante.
                      </p>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-white text-xs font-mono">
                      Cierre Correlativo X y Z con Impresión de Comprobante
                    </div>
                  </div>
                )}

              </div>

              {/* Pie de Hardware: Certificación de Integración */}
              <div className="px-5 py-3 bg-slate-900/60 border-t border-slate-800 text-slate-400 text-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="font-mono text-[11px] text-slate-300">
                    ESC/POS • Térmica 58/80mm • Básculas USB/Serial • Lectores Códigos 1D/2D QR
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                  <span>Instalable en Windows 7-11 y Android</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* MODAL ZOOM PANTALLA COMPLETA */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-7xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-bold text-white text-sm">
                  Isaac POS Ultra • Captura Oficial en Alta Resolución
                </span>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 sm:p-4 bg-slate-950 max-h-[85vh] overflow-auto">
              <img
                src={
                  activeView === "arqueo"
                    ? "/real-system/ui_arqueo_caja.png"
                    : "/real-system/ui_terminal_ventas_real.png"
                }
                alt="Isaac POS Captura Real"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

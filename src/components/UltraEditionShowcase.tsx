"use client";

import React from "react";
import {
  Download,
  Monitor,
  HardDrive,
  Zap,
  CheckCircle2,
  ArrowDownToLine,
  Smartphone,
  Sparkles,
  Gauge,
  Clock,
} from "lucide-react";

export const UltraEditionShowcase: React.FC = () => {
  return (
    <section id="edicion-ultra" className="py-20 relative bg-slate-950 border-t border-slate-800/80 overflow-hidden">
      {/* Luz ambiental sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado Principal */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>EDICIÓN 2026 • MÁXIMA VELOCIDAD Y LIGEREZA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Diseñado para ser Rápido, Ligero y Confiable
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Optimizado para que tu punto de venta encienda al instante, no ponga lenta tu computadora y facture sin interrupciones, incluso en computadoras sencillas de mostrador.
          </p>
        </div>

        {/* 4 Métricas Clave de Rendimiento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <HardDrive className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-md border border-emerald-500/30">
                Ultraligero
              </span>
            </div>
            <div className="text-xs font-medium text-slate-400 mb-1">Instalación Compacta</div>
            <div className="text-2xl font-black text-white mb-2">
              Ultra Rápido
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              No satura el disco de tu computadora. Se descarga e instala en pocos segundos.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Gauge className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-md border border-emerald-500/30">
                Cero Lentitud
              </span>
            </div>
            <div className="text-xs font-medium text-slate-400 mb-1">Ahorro de Memoria</div>
            <div className="text-2xl font-black text-white mb-2">
              Ultra Fluido
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Consume el mínimo de recursos. Tu computadora se mantiene rápida todo el día de trabajo.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-950/70 px-2 py-0.5 rounded-md border border-amber-500/30">
                Inmediato
              </span>
            </div>
            <div className="text-xs font-medium text-slate-400 mb-1">Cobro Ágil</div>
            <div className="text-2xl font-black text-white mb-2">
              0 Esperas
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Búsqueda y cobro táctil instantáneo al tocar o escanear productos, sin pantallas pegadas.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Monitor className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-cyan-300 bg-cyan-950/70 px-2 py-0.5 rounded-md border border-cyan-500/30">
                2da Pantalla
              </span>
            </div>
            <div className="text-xs font-medium text-slate-400 mb-1">Pantalla para el Cliente</div>
            <div className="text-2xl font-black text-white mb-2">
              Visor en Vivo
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Segundo monitor para que el comprador verifique sus artículos y total en bolívares en tiempo real.
            </p>
          </div>
        </div>

        {/* Zona de Descargas Oficiales */}
        <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Descarga Oficial de Instaladores
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Instaladores oficiales listos para instalar y empezar a cobrar en tu negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Tarjeta Windows */}
            <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Edición para Computadora</h4>
                      <span className="text-xs text-slate-400">Windows 10 y 11</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
                    Oficial
                  </span>
                </div>

                <div className="space-y-2 mb-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instalación rápida en 1 solo clic, sin configuraciones complicadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Funciona 100% sin internet, guardando todas tus ventas en tu equipo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Compatible con impresoras de ticket (58mm/80mm), lectoras y balanzas</span>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="/downloads/Isaac-POS-Ultra-Setup.exe"
                  download="Isaac-POS-Ultra-Setup.exe"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <ArrowDownToLine className="w-4 h-4" />
                  <span>Descargar para Windows (.exe)</span>
                </a>
                <span className="block text-center text-[10px] text-slate-400 font-mono mt-2">
                  Isaac-POS-Ultra-Setup.exe • Instalación Segura
                </span>
              </div>
            </div>

            {/* Tarjeta Android */}
            <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Edición para Celular o Tablet</h4>
                      <span className="text-xs text-slate-400">Android 7.0 o superior</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/30">
                    Móvil
                  </span>
                </div>

                <div className="space-y-2 mb-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Ideal para cobrar en pasillos, ferias o entregas a domicilio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Sincronización automática por WiFi con la computadora principal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Compatible con teléfonos, tablets e impresoras portátiles Bluetooth</span>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="/downloads/Isaac-POS-Ultra-Mobile.apk"
                  download="Isaac-POS-Ultra-Mobile.apk"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <ArrowDownToLine className="w-4 h-4" />
                  <span>Descargar para Android (.apk)</span>
                </a>
                <span className="block text-center text-[10px] text-slate-400 font-mono mt-2">
                  Isaac-POS-Ultra-Mobile.apk • Verificado
                </span>
              </div>
            </div>
          </div>

          {/* Guía en 3 Pasos */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center mx-auto mb-1.5 border border-cyan-500/40">
                  1
                </span>
                <div className="text-xs font-bold text-white mb-0.5">Descarga el Instalador</div>
                <div className="text-[11px] text-slate-400">Descarga el archivo liviano para tu computadora o teléfono.</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 font-mono font-bold text-xs flex items-center justify-center mx-auto mb-1.5 border border-teal-500/40">
                  2
                </span>
                <div className="text-xs font-bold text-white mb-0.5">Instalación en 1 Clic</div>
                <div className="text-[11px] text-slate-400">Se instala automáticamente sin programas adicionales ni pasos difíciles.</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center mx-auto mb-1.5 border border-emerald-500/40">
                  3
                </span>
                <div className="text-xs font-bold text-white mb-0.5">¡Empieza a Cobrar!</div>
                <div className="text-[11px] text-slate-400">Configura tu tasa del día y factura en 2 segundos por cliente.</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

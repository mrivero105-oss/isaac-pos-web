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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 text-xs font-medium mb-4 shadow-sm">
            <Monitor className="w-3.5 h-3.5 text-emerald-400" />
            <span>ARQUITECTURA EFICIENTE • INSTALACIÓN LOCAL Y LIGERA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Diseñado para rendir en cualquier computadora de mostrador
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            No necesitas renovar tus equipos ni invertir en servidores costosos. Isaac POS está optimizado para iniciar en 3 segundos y mantener tu mostrador fluido durante todo el día.
          </p>
        </div>

        {/* 4 Métricas Clave de Rendimiento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                <HardDrive className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-md border border-emerald-500/30">
                Instalación Local
              </span>
            </div>
            <div className="text-xs font-medium text-slate-400 mb-1">Encendido de Caja</div>
            <div className="text-xl font-bold text-white mb-2">
              Listo en 3 Segundos
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              No satura el disco duro de tu computadora. Se descarga e instala en minutos sin dependencias pesadas.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                <Gauge className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-md border border-emerald-500/30">
                Bajo Consumo
              </span>
            </div>
            <div className="text-xs font-medium text-slate-400 mb-1">Uso de Memoria RAM</div>
            <div className="text-xl font-bold text-white mb-2">
              Fluidez Constante
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Consume el mínimo de recursos del sistema. Tu computadora de caja se mantiene rápida sin trabarse.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-md border border-emerald-500/30">
                Horas Pico
              </span>
            </div>
            <div className="text-xs font-medium text-slate-400 mb-1">Atención por Cliente</div>
            <div className="text-xl font-bold text-white mb-2">
              Cobro en &lt; 2 Segundos
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Búsqueda táctil o por lector de código de barras sin demoras ni pantallas congeladas.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                <Monitor className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-blue-400 bg-blue-950/70 px-2 py-0.5 rounded-md border border-blue-500/30">
                Transparencia
              </span>
            </div>
            <div className="text-xs font-medium text-slate-400 mb-1">Visor Secundario</div>
            <div className="text-xl font-bold text-white mb-2">
              Pantalla del Cliente
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Segundo monitor para que el comprador verifique sus artículos y total en bolívares en tiempo real.
            </p>
          </div>
        </div>

        {/* Zona de Descargas Oficiales */}
        {/* Zona de Descargas Oficiales */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-8 sm:p-10 shadow-2xl">
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
            <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Edición para Computadora</h4>
                      <span className="text-xs text-slate-400">Windows 7, 8, 10 y 11</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded border border-blue-500/30">
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
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
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
            <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
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
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-slate-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <ArrowDownToLine className="w-4 h-4 text-emerald-400" />
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

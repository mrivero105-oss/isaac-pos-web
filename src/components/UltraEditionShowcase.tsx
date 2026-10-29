"use client";

import React from "react";
import { InteractiveEngineeringBackground } from "@/components/InteractiveEngineeringBackground";
import {
  Monitor,
  HardDrive,
  Zap,
  CheckCircle2,
  Smartphone,
  Gauge,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Database,
  Layers,
} from "lucide-react";

interface UltraEditionShowcaseProps {
  onOpenModal?: (plan?: string) => void;
}

export const UltraEditionShowcase: React.FC<UltraEditionShowcaseProps> = ({ onOpenModal }) => {
  return (
    <section id="edicion-ultra" className="py-24 relative bg-slate-900 text-white overflow-hidden border-t border-slate-800">
      {/* Fondo Cinético en Blanco Luminoso sobre Fondo Azul/Oscuro */}
      <InteractiveEngineeringBackground variant="dark" isFixed={false} />

      {/* Resplandor cobalto focal */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera Técnica de Sección */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>INGENIERÍA DE SOFTWARE DE MOSTRADOR</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-5 leading-tight">
            Rendimiento extremo sin exigir computadoras caras.
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Los sistemas basados exclusivamente en la nube se congelan cuando el internet falla o la red se satura. Isaac POS corre con un motor local nativo que arranca en 3 segundos y consume menos de 150 MB de RAM.
          </p>
        </div>

        {/* Layout Asimétrico de Alto Nivel: Benchmark Técnico vs Modalidades */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          
          {/* Columna Izquierda (5 Cols): Anatomía del Motor Local */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-950/80 border border-slate-800 p-7 sm:p-9 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Database className="w-32 h-32 text-blue-500" />
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-widest block mb-2">
                Arquitectura de Datos
              </span>
              <h3 className="text-2xl font-extrabold text-white mb-4">
                Motor SQLite Cifrado: Cero Caídas, Cero Esperas
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-8">
                A diferencia de programas antiguos que obligan a instalar servidores pesados de SQL que ralentizan Windows, Isaac POS utiliza una base de datos local embebida optimizada para comercio retail de alto volumen.
              </p>

              {/* Métricas Técnicas en Fila */}
              <div className="space-y-4 pt-6 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-medium text-slate-300">Tiempo de arranque en frío</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400 tabular-nums">&lt; 3 segundos</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-xs font-medium text-slate-300">Consumo de Memoria RAM</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-blue-400 tabular-nums">&lt; 150 MB</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-xs font-medium text-slate-300">Latencia en búsqueda de productos</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-amber-400 tabular-nums">Instantánea (&lt; 12ms)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-xs font-medium text-slate-300">Tolerancia a cortes de internet</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-purple-400">100% Inmune</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>● Respaldos en un clic (Pendrive / Nube)</span>
              <span>Protección contra corrupción</span>
            </div>
          </div>

          {/* Columna Derecha (7 Cols): Las 2 Plataformas Oficiales */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Modalidad 1: Windows Mostrador */}
            <div className="rounded-3xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 p-7 flex flex-col justify-between transition-all group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                    WINDOWS 7, 8, 10, 11
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white mb-2">Edición Mostrador PC</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Para computadoras fijas de caja principal, laptops o equipos todo-en-uno (All-In-One).
                </p>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Conexión de impresoras térmicas USB/Red (58 y 80mm)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Integración con balanzas electrónicas y lectores de barras</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Apertura automática de gaveta portamonedas por RJ11</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onOpenModal ? onOpenModal("demo_gratis") : window.open("https://wa.me/584248302226", "_blank")}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Solicitar Instalación para PC</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Modalidad 2: Android Móvil */}
            <div className="rounded-3xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 p-7 flex flex-col justify-between transition-all group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    ANDROID 7.0 O SUPERIOR
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white mb-2">Edición Móvil & Tablet</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Para cobrar en pasillos, tomar pedidos en almacén o terminales inteligentes (SUNMI, PAX).
                </p>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Sincronización en tiempo real por WiFi local con tu caja PC</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Conexión directa con impresoras portátiles Bluetooth</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Uso de la cámara del móvil como lector de códigos de barras</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onOpenModal ? onOpenModal("demo_gratis") : window.open("https://wa.me/584248302226", "_blank")}
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer border border-slate-700"
                >
                  <span>Consultar Terminal Android</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Protocolo de Puesta en Marcha 1 a 1 */}
        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-8 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800 pb-8 mb-8">
            <div>
              <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                Servicio Incluido
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Instalación Guiada y Migración de Inventario por AnyDesk
              </h3>
            </div>
            <a
              href="https://wa.me/584248302226?text=Hola%2C%20quisiera%20saber%20c%C3%B3mo%20es%20el%20proceso%20de%20instalaci%C3%B3n%20asistida%20de%20Isaac%20POS."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shrink-0 transition-colors"
            >
              <span>Hablar con un Instalador</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="font-mono text-xs font-bold text-blue-400 block mb-1">01 / DIAGNÓSTICO</span>
              <h5 className="font-bold text-white text-sm mb-1">Verificación de Equipos</h5>
              <p className="text-slate-400 text-xs leading-relaxed">
                Revisamos tu impresora térmica, lector de barras y computadora para garantizar compatibilidad total antes de empezar.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="font-mono text-xs font-bold text-blue-400 block mb-1">02 / MIGRACIÓN EXCEL</span>
              <h5 className="font-bold text-white text-sm mb-1">Carga Asistida de Catálogo</h5>
              <p className="text-slate-400 text-xs leading-relaxed">
                Convertimos y subimos tu lista de productos con costos, precios en dólares y código de barras. No tienes que tipear nada desde cero.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="font-mono text-xs font-bold text-blue-400 block mb-1">03 / CAPACITACIÓN</span>
              <h5 className="font-bold text-white text-sm mb-1">Cajero Listo en 20 Minutos</h5>
              <p className="text-slate-400 text-xs leading-relaxed">
                Entrenamos a tu personal para cobrar en dólares y bolívares a tasa oficial BCV, hacer arqueo ciego y cerrar caja sin dudas.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import { Check, ShieldCheck, Zap, Sparkles, HelpCircle, ArrowRight } from "lucide-react";

interface PricingProps {
  onOpenModal: (plan?: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenModal }) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  return (
    <section id="precios" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Precios Claros y Transparentes</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Planes adaptados al tamaño de tu comercio
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-8">
            Sin costos ocultos ni comisiones por venta. Elige suscripción mensual/anual o adquiere la licencia vitalicia.
          </p>

          {/* Toggle de Ciclo de Facturación */}
          <div className="inline-flex items-center bg-slate-900 border border-slate-800 p-1.5 rounded-2xl shadow-inner">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-slate-800 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Facturación Mensual
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                billingCycle === "yearly"
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Facturación Anual</span>
              <span className="bg-slate-950 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-mono font-black">
                2 MESES GRATIS
              </span>
            </button>
          </div>
        </div>

        {/* Tarjetas de Precios */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1: Emprendedor */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Plan Emprendedor</h3>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">
                  1 Terminal
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-6">
                Para pequeños comercios, cafeterías y food trucks que inician y quieren control rápido.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white font-mono">
                  ${billingCycle === "yearly" ? "24" : "29"}
                </span>
                <span className="text-slate-400 text-xs font-mono">USD / mes</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1 Caja / Terminal Android</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ventas y tickets ilimitados</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Modo 100% Offline resiliente</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Impresión térmica ESC/POS</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Control de inventario básico</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Corte de caja X y Z</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenModal(billingCycle === "yearly" ? "basico_anual" : "basico_mensual")}
              className="mt-8 w-full py-3.5 rounded-xl border border-slate-700 hover:border-emerald-500 hover:text-emerald-400 text-slate-200 font-bold text-xs sm:text-sm transition-all text-center"
            >
              Comenzar con Básico
            </button>
          </div>

          {/* Plan 2: Profesional (Destacado) */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500 rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl shadow-emerald-500/10 hover:scale-[1.02] transition-all">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
              MÁS ELEGIDO POR NEGOCIOS
            </div>

            <div>
              <div className="flex justify-between items-center mb-4 mt-2">
                <h3 className="text-xl font-bold text-white">Plan Profesional</h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-2.5 py-1 rounded-full">
                  Hasta 3 Cajas
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-6">
                Para comercios en crecimiento que necesitan control estricto anti-fraude, inventario avanzado y múltiples turnos.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white font-mono">
                  ${billingCycle === "yearly" ? "49" : "59"}
                </span>
                <span className="text-slate-400 text-xs font-mono">USD / mes</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-800/80 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2.5 font-semibold text-white">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hasta 3 Cajas / Terminales</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Arqueo Ciego de Caja (Anti-robo)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Inventario multialmacén con kardex</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Auditoría de cancelaciones y descuentos</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Reportes financieros con exportación Excel/PDF</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Roles y permisos diferenciados por PIN</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Soporte prioritario 24/7 en español</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenModal(billingCycle === "yearly" ? "pro_anual" : "pro_mensual")}
              className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2"
            >
              <span>Elegir Plan Profesional</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Plan 3: Licencia Vitalicia (Perpetua) */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Licencia Vitalicia</h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2.5 py-1 rounded-full">
                  PAGO ÚNICO
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-6">
                Para dueños de negocios que prefieren comprar el software una sola vez sin pagar mensualidades recurrentes jamás.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white font-mono">
                  $499
                </span>
                <span className="text-slate-400 text-xs font-mono">USD (Una sola vez)</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2.5 font-semibold text-white">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Licencia de por vida sin mensualidades</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>1 Terminal Android / POS todo incluido</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Base de datos 100% bajo tu propiedad</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Actualizaciones de seguridad de por vida</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Instalación y configuración guiada 1 a 1</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenModal("vitalicia")}
              className="mt-8 w-full py-3.5 rounded-xl border border-cyan-700/60 hover:border-cyan-400 hover:text-cyan-300 text-slate-200 font-bold text-xs sm:text-sm transition-all text-center"
            >
              Comprar Licencia Vitalicia
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

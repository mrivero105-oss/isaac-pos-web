"use client";

import React, { useState } from "react";
import { Check, Zap, ArrowRight } from "lucide-react";

interface PricingProps {
  onOpenModal: (plan?: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenModal }) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  return (
    <section id="precios" className="py-20 relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>PRECIOS TRANSPARENTES Y SIN SORPRESAS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Planes adaptados al tamaño de tu comercio
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-8">
            Sin costos ocultos ni comisiones por venta. Elige suscripción mensual/anual o adquiere la licencia vitalicia de por vida.
          </p>

          {/* Toggle de Ciclo de Facturación */}
          <div className="inline-flex items-center bg-slate-200 p-1.5 rounded-2xl shadow-inner">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Facturación Mensual
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                billingCycle === "yearly"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Facturación Anual</span>
              <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-mono font-black">
                2 MESES GRATIS
              </span>
            </button>
          </div>
        </div>

        {/* Tarjetas de Precios en Modo Claro */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Plan 1: Emprendedor */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-300 shadow-sm hover:shadow-md transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-900">Plan Emprendedor</h3>
                <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full font-semibold">
                  1 Terminal
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Para pequeños comercios, cafeterías y food trucks que inician y quieren control rápido.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-slate-900 font-mono">
                  ${billingCycle === "yearly" ? "24" : "29"}
                </span>
                <span className="text-slate-500 text-xs font-mono">USD / mes</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1 Caja / Terminal Android o PC</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Ventas y tickets ilimitados</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Modo 100% Offline resiliente</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Impresión térmica ESC/POS</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Control de inventario básico</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Corte de caja X y Z</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenModal(billingCycle === "yearly" ? "basico_anual" : "basico_mensual")}
              className="mt-8 w-full py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm transition-all text-center cursor-pointer"
            >
              Comenzar con Básico
            </button>
          </div>

          {/* Plan 2: Profesional (Destacado en Azul Rey) */}
          <div className="bg-white border-2 border-blue-600 rounded-3xl p-8 flex flex-col justify-between relative shadow-xl ring-4 ring-blue-50 hover:scale-[1.01] transition-all">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
              MÁS ELEGIDO POR NEGOCIOS
            </div>

            <div>
              <div className="flex justify-between items-center mb-4 mt-2">
                <h3 className="text-xl font-bold text-slate-900">Plan Profesional</h3>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                  Hasta 3 Cajas
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Para comercios en crecimiento que necesitan control estricto anti-fraude, inventario avanzado y múltiples turnos.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-blue-600 font-mono">
                  ${billingCycle === "yearly" ? "49" : "59"}
                </span>
                <span className="text-slate-500 text-xs font-mono">USD / mes</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2.5 font-bold text-slate-900">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Hasta 3 Cajas / Terminales</span>
                </div>
                <div className="flex items-center gap-2.5 font-semibold text-slate-900">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Arqueo Ciego de Caja (Anti-robo)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Inventario multialmacén con kardex</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Auditoría de cancelaciones y descuentos</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Reportes financieros con exportación Excel/PDF</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Roles y permisos diferenciados por PIN</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Soporte prioritario 1 a 1 en español</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenModal(billingCycle === "yearly" ? "pro_anual" : "pro_mensual")}
              className="mt-8 w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Elegir Plan Profesional</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Plan 3: Licencia Vitalicia (Perpetua) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-300 shadow-sm hover:shadow-md transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-900">Licencia Vitalicia</h3>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  PAGO ÚNICO
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Para dueños de negocios que prefieren comprar el software una sola vez sin pagar mensualidades recurrentes jamás.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-slate-900 font-mono">
                  $499
                </span>
                <span className="text-slate-500 text-xs font-mono">USD (Una sola vez)</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-2.5 font-bold text-slate-900">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Licencia de por vida sin mensualidades</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Terminal completo todo incluido</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Base de datos 100% bajo tu propiedad</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Actualizaciones de seguridad de por vida</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instalación y configuración guiada 1 a 1</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenModal("vitalicia")}
              className="mt-8 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all text-center cursor-pointer"
            >
              Comprar Licencia Vitalicia
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

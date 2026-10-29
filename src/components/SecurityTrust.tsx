"use client";

import React from "react";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Banknote,
  Clock,
  Database,
} from "lucide-react";

export const SecurityTrust: React.FC = () => {
  return (
    <section id="seguridad" className="py-24 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Seguridad */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 border border-slate-300 text-slate-800 text-xs font-mono font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>PROTECCIÓN DE CAJA & INTEGRIDAD FINANCIERA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
            Blindaje estricto para cada dólar y bolívar que entra al mostrador.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Las pérdidas en comercios casi nunca ocurren por errores del sistema, sino por falta de controles en el cambio de turno. Isaac POS implementa el estándar bancario de Arqueo Ciego.
          </p>
        </div>

        {/* Comparativa Visual de Alto Impacto: Sistema Convencional vs Isaac POS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Tarjeta 1: Sistema Tradicional (Vulnerable) */}
          <div className="rounded-3xl bg-slate-50 border border-rose-200 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-rose-200/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Caja Tradicional Convencional</h3>
                    <span className="text-xs text-rose-700 font-mono font-semibold">Propenso a fugas y manipulación</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">El cajero ve el total teórico del sistema:</strong>
                    Sabe cuánto dinero "debería" haber en la gaveta antes de contar, lo que facilita el cuadre forzado o la retención de excedentes.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Anulaciones y descuentos libres:</strong>
                    Cualquier empleado puede anular ventas cobradas en efectivo sin requerir autorización de un supervisor.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Vulnerabilidad al corte de red:</strong>
                    Si se va el internet a mitad de turno, los programas basados en navegador pierden el registro de cobros.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-200/60 text-xs font-mono text-rose-700">
              Resultado: Descuadres al final de la jornada y reclamos entre turnos.
            </div>
          </div>

          {/* Tarjeta 2: Blindaje Isaac POS (Infalible) */}
          <div className="rounded-3xl bg-slate-950 text-white border border-slate-800 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <ShieldCheck className="w-32 h-32 text-emerald-400" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Blindaje Isaac POS Ultra</h3>
                    <span className="text-xs text-emerald-400 font-mono font-semibold">Arqueo Ciego & Auditoría Criptográfica</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Declaración física obligatoria a ciegas:</strong>
                    El cajero desglosa y cuenta físicamente cada billete en mano ($100, $50, $20, Bs). <strong>La pantalla no le revela cuánto espera el sistema.</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Permisos con PIN de Supervisor:</strong>
                    Solo el dueño o encargado con clave puede autorizar cancelaciones de ticket o descuentos especiales.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Autonomía local SQLite cifrada:</strong>
                    Toda venta queda registrada instantáneamente en el disco local de la computadora. Funciona sin internet y resiste cortes de luz.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 text-xs font-mono text-emerald-400 flex items-center justify-between">
              <span>● Detección matemática de sobrantes y faltantes</span>
              <span>Comprobante Z inalterable</span>
            </div>
          </div>

        </div>

        {/* 3 Garantías Financieras Directas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-3">
              <KeyRound className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Roles Diferenciados</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Define permisos específicos para cajeros, administradores y encargados de inventario para que nadie acceda a datos que no le corresponden.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-3">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Cortes Correlativos X y Z</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Cierre de turno parcial (X) y definitivo (Z) con numeración consecutiva para auditoría fiscal y control estricto de ventas diarias.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-3">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Propiedad Total de tus Datos</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Tus ventas, catálogo y base de clientes están almacenados en tu propia computadora, no secuestrados en servidores externos.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

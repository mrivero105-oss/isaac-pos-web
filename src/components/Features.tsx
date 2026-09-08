"use client";

import React from "react";
import {
  Zap,
  PackageCheck,
  WifiOff,
  Calculator,
  LineChart,
  Users,
  ShieldCheck,
  Printer,
  Boxes,
  LockKeyhole,
} from "lucide-react";

const FEATURES_LIST = [
  {
    icon: Zap,
    title: "Cobros Duales en < 2s con Tasa BCV",
    description:
      "Maneja simultáneamente precios en USD ($) y Bolívares (Bs.S) con sincronización automática de la tasa oficial del Banco Central de Venezuela. Atajos F2 para cobrar y F4 para búsqueda express.",
    badge: "Multimoneda Nativa",
    color: "from-amber-500/20 to-amber-500/0 text-amber-400 border-amber-500/30",
  },
  {
    icon: WifiOff,
    title: "Sincronización WiFi Local P2P",
    description:
      "Conecta múltiples tablets Android de pasillo directamente a la PC central por la red WiFi de tu tienda sin depender de internet externo ni servicios en la nube. Base de datos SQLite local ultra-rápida.",
    badge: "100% Sin Internet",
    color: "from-cyan-500/20 to-cyan-500/0 text-cyan-400 border-cyan-500/30",
  },
  {
    icon: Calculator,
    title: "Arqueo Ciego de Caja por Turno",
    description:
      "Blindaje anti-fraude: el cajero cuenta y declara físicamente los billetes en divisas y bolívares sin ver el total esperado del sistema. Detección automática e instantánea de cualquier faltante.",
    badge: "Anti-Robo Hormiga",
    color: "from-rose-500/20 to-rose-500/0 text-rose-400 border-rose-500/30",
  },
  {
    icon: PackageCheck,
    title: "Importador IA de Catálogos PDF",
    description:
      "Con el motor Flash Engine exclusivo impulsado por Google Gemini, suelta la lista de precios en PDF de Empresas Polar, Nestlé o mayoristas y la IA extrae códigos, bultos y costos en segundos.",
    badge: "Gemini Flash AI",
    color: "from-emerald-500/20 to-emerald-500/0 text-emerald-400 border-emerald-500/30",
  },
  {
    icon: LineChart,
    title: "Tickets y Notas a WhatsApp",
    description:
      "Ahorra en rollos de papel térmico. Despacha el ticket digital, cotización o estado de deuda con un solo toque directo al WhatsApp del cliente con número de control y desglose en divisas.",
    badge: "Cero Gasto de Papel",
    color: "from-indigo-500/20 to-indigo-500/0 text-indigo-400 border-indigo-500/30",
  },
  {
    icon: LockKeyhole,
    title: "Pagos Mixtos y Créditos (Fiados)",
    description:
      "Cobra dividiendo el pago: parte en efectivo dólares, parte en Pago Móvil y parte con tarjeta de débito. Gestión de cuentas por cobrar indexadas en dólares con historial de abonos.",
    badge: "Flexibilidad Total",
    color: "from-teal-500/20 to-teal-500/0 text-teal-400 border-teal-500/30",
  },
];

export const Features: React.FC = () => {
  return (
    <section id="funciones" className="py-24 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Boxes className="w-3.5 h-3.5" />
            <span>Potencia y Control para tu Comercio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Todo lo que necesitas para operar y crecer
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Isaac POS fue construido escuchando a cientos de comerciantes para resolver los cuellos de botella de cobro, inventario y seguridad en el mostrador.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_LIST.map((f, idx) => {
            const IconComponent = f.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-b border flex items-center justify-center ${f.color}`}
                    >
                      <IconComponent className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {f.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {f.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Protegido por arquitectura segura</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

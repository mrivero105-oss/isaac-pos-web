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
    title: "Cobros en menos de 3 segundos",
    description:
      "Interfaz táctil de alta respuesta diseñada para eliminar filas en tu negocio. Búsqueda instantánea por código de barras o imagen de producto.",
    badge: "Alta Velocidad",
    color: "from-amber-500/20 to-amber-500/0 text-amber-400 border-amber-500/30",
  },
  {
    icon: WifiOff,
    title: "Operación 100% Offline",
    description:
      "Si se corta el internet o la luz, Isaac POS no se detiene. Continúa cobrando con base de datos local y sincroniza de forma segura al restablecer la red.",
    badge: "Cero Caídas",
    color: "from-cyan-500/20 to-cyan-500/0 text-cyan-400 border-cyan-500/30",
  },
  {
    icon: PackageCheck,
    title: "Inventario en Tiempo Real",
    description:
      "Kardex automático, alertas de bajo stock, control de lotes y fechas de vencimiento. Evita pérdidas y quiebres de inventario sin esfuerzo.",
    badge: "Control Total",
    color: "from-emerald-500/20 to-emerald-500/0 text-emerald-400 border-emerald-500/30",
  },
  {
    icon: Calculator,
    title: "Arqueo Ciego y Cortes X y Z",
    description:
      "Blindaje anti-robo: el cajero cuenta el dinero sin ver el total del sistema. Detección automática de faltantes o sobrantes por turno.",
    badge: "Anti-Fraude",
    color: "from-rose-500/20 to-rose-500/0 text-rose-400 border-rose-500/30",
  },
  {
    icon: LineChart,
    title: "Reportes Financieros y Métricas",
    description:
      "Visualiza tus ventas por hora, margen de ganancia neta, productos estrella y rendimiento de tus cajeros desde tu celular o computadora.",
    badge: "Inteligencia",
    color: "from-indigo-500/20 to-indigo-500/0 text-indigo-400 border-indigo-500/30",
  },
  {
    icon: LockKeyhole,
    title: "Permisos y Auditoría Estricta",
    description:
      "Roles definidos (Cajero, Encargado, Administrador). Cada descuento, anulación de comanda o apertura manual de cajón queda registrada con firma de usuario.",
    badge: "Seguridad Bancaria",
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

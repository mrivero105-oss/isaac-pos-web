"use client";

import React from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  KeyRound,
  FileCheck,
  ServerCrash,
  UserCheck,
  CheckCircle,
} from "lucide-react";

const SECURITY_PILLARS = [
  {
    icon: Lock,
    title: "Cifrado Militar AES-256 y TLS 1.3",
    desc: "Toda la información de ventas, inventarios y clientes viaja por canales criptográficos seguros de última generación y se almacena con cifrado robusto.",
  },
  {
    icon: FileCheck,
    title: "Cumplimiento Financiero PCI-DSS",
    desc: "Los cobros con tarjeta se procesan en bóvedas certificadas de nivel bancario. Tu negocio nunca almacena ni corre el riesgo de filtrar datos de tarjetas.",
  },
  {
    icon: ShieldCheck,
    title: "Arqueo Ciego Anti-Robo Hormiga",
    desc: "El sistema no revela el monto esperado de caja al momento del cierre. El empleado cuenta físicamente el dinero, impidiendo discrepancias y alteraciones.",
  },
  {
    icon: UserCheck,
    title: "Control de Acceso Basado en Roles (RBAC)",
    desc: "Asigna permisos diferenciados para cajeros, meseros, supervisores y gerentes con autenticación por PIN o contraseña cifrada.",
  },
  {
    icon: KeyRound,
    title: "Firmas Criptográficas de Auditoría",
    desc: "Cada descuento aplicado, ticket anulado o reimpresión de comanda genera un registro con fecha, hora y firma digital del operador.",
  },
  {
    icon: ServerCrash,
    title: "Respaldo Automático con Redundancia",
    desc: "Copias de seguridad continuas y automáticas en la nube para que nunca pierdas tu catálogo ni tu historial de ventas ante pérdida o robo de dispositivo.",
  },
];

export const SecurityTrust: React.FC = () => {
  return (
    <section id="seguridad" className="py-24 relative bg-slate-950/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Seguridad de Grado Financiero</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Máxima Seguridad para tu Dinero y tus Datos
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            En un negocio de ventas, la seguridad no es opcional. Isaac POS fue diseñado con arquitectura *Zero-Trust* para proteger cada centavo que entra a tu caja.
          </p>
        </div>

        {/* Grid de 6 Pilares de Seguridad */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SECURITY_PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-7 transition-all hover:bg-slate-900"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Banner de Garantía y Confianza */}
        <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-800/50 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Garantía de Satisfacción y Estabilidad 100%</h4>
              <p className="text-slate-300 text-sm">
                Si Isaac POS no agiliza tus cobros y asegura tu inventario en los primeros 30 días, te devolvemos tu dinero sin preguntas.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              SLA 99.9% Uptime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

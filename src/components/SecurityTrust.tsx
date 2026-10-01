"use client";

import React from "react";
import {
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
    title: "Protección Total de tus Datos",
    desc: "Toda la información de ventas, inventario y clientes está protegida contra accesos no autorizados y se resguarda de forma segura en tu equipo.",
  },
  {
    icon: FileCheck,
    title: "Cobros Confiables y Claros",
    desc: "Registro exacto de cada cobro por Pago Móvil, punto de venta o divisas, asegurando que cada bolívar y dólar esté perfectamente cuadrado.",
  },
  {
    icon: ShieldCheck,
    title: "Arqueo Ciego Anti-Pérdidas",
    desc: "El cajero cuenta físicamente el dinero sin ver el monto esperado del sistema, impidiendo alteraciones y detectando faltantes de inmediato.",
  },
  {
    icon: UserCheck,
    title: "Permisos de Cajero y Supervisor",
    desc: "Asigna claves diferenciadas para cajeros y supervisores, evitando que el personal anule tickets o modifique precios sin autorización previa.",
  },
  {
    icon: KeyRound,
    title: "Registro de Anulaciones y Descuentos",
    desc: "Cada descuento aplicado, devolución o ticket anulado queda registrado con la fecha, hora exacta y nombre del cajero que lo realizó.",
  },
  {
    icon: ServerCrash,
    title: "Copias de Seguridad Fáciles",
    desc: "Guarda respaldos rápidos de todo tu catálogo y ventas para que tu negocio siempre esté protegido ante cualquier imprevisto.",
  },
];

export const SecurityTrust: React.FC = () => {
  return (
    <section id="seguridad" className="py-20 relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>CONTROL Y CONFIANZA TOTAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Máxima Seguridad para tu Dinero y tus Datos
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            En un negocio comercial, la seguridad de la caja es primordial. Isaac POS fue diseñado para proteger cada centavo que entra a tu mostrador.
          </p>
        </div>

        {/* Grid de 6 Pilares de Seguridad */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SECURITY_PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-7 transition-all hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Banner de Garantía y Confianza */}
        <div className="bg-emerald-50/90 border border-emerald-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Garantía de Satisfacción y Estabilidad 100%</h4>
              <p className="text-slate-600 text-sm">
                Si Isaac POS no agiliza tus cobros y asegura tu inventario en los primeros 30 días, te devolvemos tu dinero sin preguntas.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono font-bold text-emerald-800 bg-white border border-emerald-300 px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Soporte & Garantía Local
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

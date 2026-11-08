"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "¿Qué es Isaac Ventas (Isaac POS) y para qué tipo de comercios está diseñado?",
    a: "Isaac Ventas (portal oficial isaacventas.com) se identifica como la plataforma tecnológica del sistema de punto de venta Isaac POS V24.04 Ultra en Venezuela y Latinoamérica. Es un software profesional de facturación bimonetaria (USD/Bs a tasa oficial BCV), control de inventario multialmacén, visor de segunda pantalla con QR de Pago Móvil y arqueo ciego anti-faltantes para minimarkets, supermercados, farmacias, carnicerías, panaderías y ferreterías.",
  },
  {
    q: "¿Qué sucede si se corta el internet o la señal en mi local?",
    a: "Isaac POS cuenta con una arquitectura offline nativa. Puedes seguir registrando ventas, cobrando en bolívares o divisas e imprimiendo tickets con total normalidad. Toda la información se almacena localmente en la base de datos de tu equipo sin detener tu mostrador.",
  },
  {
    q: "¿Necesito comprar hardware costoso o computadoras de última generación?",
    a: "No. Isaac POS está optimizado para funcionar fluido en computadoras y laptops sencillas con Windows 7, 8, 10 u 11, así como en tablets Android. Además, es compatible con el 99% de las impresoras térmicas (58mm/80mm), balanzas de peso y lectores de código de barra estándar.",
  },
  {
    q: "¿Cómo evita Isaac POS el robo hormiga o faltantes de caja?",
    a: "Implementamos 'Arqueo Ciego': el cajero debe ingresar el conteo físico de billetes en bolívares y dólares sin que el sistema le revele el monto esperado. Cualquier diferencia (sobrante o faltante) se detecta de inmediato y queda registrada. Además, los descuentos y anulaciones requieren clave de supervisor.",
  },
  {
    q: "¿Ustedes me ayudan a pasar mi inventario desde Excel o mi sistema anterior?",
    a: "Sí. Te asistimos en la migración de tu catálogo de productos sin costo adicional. Si tienes una lista en Excel, factura de droguería o reporte de tu sistema anterior, nosotros lo convertimos y cargamos para que tu negocio empiece a facturar de inmediato.",
  },
  {
    q: "¿Cómo funciona la Licencia Vitalicia frente a la Suscripción?",
    a: "Con la Licencia Vitalicia realizas un único pago y el sistema es tuyo para siempre sin cargos recurrentes mensuales ni anuales. La suscripción mensual/anual te permite acceder con una inversión inicial mínima e incluye soporte continuo y actualizaciones.",
  },
  {
    q: "¿Qué métodos de pago aceptan para adquirir la licencia?",
    a: "Aceptamos Pago Móvil a tasa oficial BCV, transferencias bancarias nacionales, Zelle, efectivo en divisas y USDT/Criptomonedas. Te emitimos tu comprobante de compra y activamos tu licencia al instante con asistencia remota por AnyDesk.",
  },
];

export const Faq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 relative bg-white/65 dark:bg-slate-950/85 backdrop-blur-[2px] border-t border-blue-100/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-blue-800 dark:text-slate-200 text-xs font-mono font-bold mb-3 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>PREGUNTAS FRECUENTES Y DUDAS OPERATIVAS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            Todo lo que necesitas saber antes de instalar.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Respuestas directas sobre compatibilidad, modo offline, licencias y métodos de pago.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-slate-700"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg focus:outline-none cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-200/80 dark:border-slate-800 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

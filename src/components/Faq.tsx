"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "¿Qué sucede si se corta el internet o la señal en mi local?",
    a: "Isaac POS cuenta con una arquitectura offline nativa. Puedes seguir registrando ventas, cobrando en efectivo o tarjeta e imprimiendo tickets con total normalidad. Toda la información se almacena localmente de forma cifrada y se sincroniza automáticamente con la nube en cuanto la conexión regrese.",
  },
  {
    q: "¿Necesito comprar hardware costoso o terminales especiales?",
    a: "No. Isaac POS funciona en cualquier tablet o smartphone con sistema Android (versión 7.0 o superior). Además, es compatible con el 99% de las impresoras térmicas (Bluetooth, USB, Wi-Fi o Red) y lectores de códigos de barra del mercado que usen el protocolo estándar ESC/POS.",
  },
  {
    q: "¿Cómo evita Isaac POS el robo hormiga o faltantes de caja?",
    a: "Implementamos 'Arqueo Ciego': el cajero debe ingresar el conteo físico de billetes y monedas sin que el sistema le revele el monto esperado. Cualquier diferencia (sobrante o faltante) se registra de inmediato y se notifica al administrador. Además, los descuentos y anulaciones requieren clave de supervisor.",
  },
  {
    q: "¿Qué pasa si se daña o extravía mi dispositivo POS?",
    a: "Tus datos nunca se pierden. Gracias a las copias de seguridad continuas y cifradas en la nube, solo necesitas descargar Isaac POS en otro dispositivo, ingresar tus credenciales y tu catálogo, inventario y ventas históricas se restauran en menos de 3 minutos.",
  },
  {
    q: "¿Cómo funciona la Licencia Vitalicia frente a la Suscripción?",
    a: "Con la Licencia Vitalicia realizas un único pago y el sistema es tuyo para siempre sin cargos recurrentes mensuales ni anuales. La suscripción mensual/anual te permite acceder con una inversión inicial mínima e incluye soporte continuo y actualizaciones constantes.",
  },
  {
    q: "¿Es seguro comprar y pagar mi licencia a través de esta página web?",
    a: "Totalmente. Esta plataforma cumple con los estándares PCI-DSS Nivel SAQ A. Todas las transacciones se realizan mediante túneles cifrados TLS 1.3 y los datos bancarios son procesados directamente por entidades financieras certificadas internacionalmente. Nosotros nunca almacenamos datos de tarjetas.",
  },
];

export const Faq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 relative bg-slate-950/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Respuestas Claras</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-slate-300 text-base">
            Todo lo que necesitas saber antes de implementar Isaac POS en tu comercio.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden transition-colors hover:border-slate-700"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-white text-base sm:text-lg focus:outline-none"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-4">
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

"use client";

import React from "react";
import {
  Smartphone,
  Printer,
  Barcode,
  Coins,
  Scale,
  CheckCircle2,
  Cpu,
} from "lucide-react";

const HARDWARE_ITEMS = [
  {
    icon: Smartphone,
    title: "Tablets y Terminales Android",
    desc: "Compatible con cualquier tablet o celular Android (versión 7.0+) y terminales POS inteligentes (SUNMI, PAX, Ingenico).",
  },
  {
    icon: Printer,
    title: "Impresoras Térmicas (58mm / 80mm)",
    desc: "Soporte nativo para el protocolo ESC/POS vía Bluetooth, USB o Red LAN/Wi-Fi. Cero configuración compleja.",
  },
  {
    icon: Barcode,
    title: "Lectores de Códigos 1D / 2D",
    desc: "Lectura instantánea de códigos de barras tradicionales y códigos QR para agilizar cobros e inventarios masivos.",
  },
  {
    icon: Coins,
    title: "Cajones Portamonedas RJ11",
    desc: "Apertura eléctrica automática mediante pulso de la impresora al confirmar el pago en efectivo.",
  },
  {
    icon: Scale,
    title: "Básculas Digitales de Precisión",
    desc: "Conexión serial o USB para venta de productos pesados (carnicerías, fruterías, cafeterías y granel).",
  },
  {
    icon: Cpu,
    title: "PC / Laptops y Navegadores",
    desc: "Accede al panel de administración, compras y métricas avanzadas desde cualquier navegador web moderno con TLS 1.3.",
  },
];

export const HardwareSection: React.FC = () => {
  return (
    <section id="hardware" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Luz de fondo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Compatibilidad Universal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Usa el hardware que ya tienes, sin contratos forzosos
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              No estás atado a equipos propietarios costosos. Isaac POS se conecta a los estándares abiertos de la industria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {HARDWARE_ITEMS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-950/70 border border-slate-800/90 hover:border-emerald-500/40 rounded-2xl p-6 transition-all hover:bg-slate-950 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Conectar y usar (Plug & Play)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

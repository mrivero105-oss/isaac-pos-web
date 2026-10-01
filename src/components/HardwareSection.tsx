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
    desc: "Conexión directa vía Bluetooth, USB o cable de red. Imprime tickets y comprobantes al instante sin configuraciones difíciles.",
  },
  {
    icon: Barcode,
    title: "Lectores de Códigos de Barra",
    desc: "Lectura instantánea de códigos de barras tradicionales y códigos QR para agilizar cobros e inventarios masivos.",
  },
  {
    icon: Coins,
    title: "Gavetas Portamonedas",
    desc: "Apertura eléctrica automática al momento de confirmar cualquier cobro en efectivo.",
  },
  {
    icon: Scale,
    title: "Básculas y Balanzas Digitales",
    desc: "Conexión directa para venta de productos pesados (carnicerías, fruterías, charcuterías y granel).",
  },
  {
    icon: Cpu,
    title: "Computadoras y Laptops",
    desc: "Controla tu inventario, ventas y reportes gerenciales desde cualquier computadora con total comodidad.",
  },
];

export const HardwareSection: React.FC = () => {
  return (
    <section id="hardware" className="py-20 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-lg relative overflow-hidden">
          
          <div className="max-w-3xl mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3 shadow-xs">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>COMPATIBILIDAD UNIVERSAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Usa el hardware que ya tienes, sin contratos forzosos
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              No estás atado a equipos propietarios costosos. Isaac POS se conecta a los estándares abiertos de la industria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {HARDWARE_ITEMS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 transition-all hover:shadow-md flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-105 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
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

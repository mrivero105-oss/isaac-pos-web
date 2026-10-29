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
  Monitor,
  Cable,
  Check,
} from "lucide-react";

interface HardwareDevice {
  name: string;
  category: string;
  protocol: string;
  description: string;
  compatibility: string[];
  icon: any;
}

const HARDWARE_DEVICES: HardwareDevice[] = [
  {
    name: "Impresoras Térmicas de Tickets",
    category: "Comprobantes y Facturación",
    protocol: "ESC/POS • USB / Bluetooth / Ethernet",
    description: "Impresión inmediata de tickets de venta, cortes de caja X y Z, y comprobantes de arqueo. Compatible con rollos de 58mm y 80mm con o sin cortador automático.",
    compatibility: ["Epson TM-T20 / TM-T88", "Xprinter 58/80mm", "Bixolon, Rongta, POS-D", "Impresoras Bluetooth Portátiles"],
    icon: Printer,
  },
  {
    name: "Balanzas Digitales & Básculas",
    category: "Pesaje en Tiempo Real",
    protocol: "RS232 / USB Serial • Lectura Continua",
    description: "Captura automática del peso al colocar el producto en el plato. Elimina el error humano al tipear gramos o kilos en carnicerías, charcuterías, verdulerías y panaderías.",
    compatibility: ["Torrey (L-EQ, PCR)", "Systel, Dibal, CAS", "Balanzas con protocolo Toledo", "Básculas de plataforma"],
    icon: Scale,
  },
  {
    name: "Lectores de Códigos 1D / 2D QR",
    category: "Captura de Artículos",
    protocol: "USB HID • Bluetooth Inalámbrico",
    description: "Lectura instantánea de códigos de barra tradicionales (EAN-13, UPC) y códigos bidimensionales QR para cobro veloz y recepción de mercancía.",
    compatibility: ["Lectores de pistola USB", "Escáneres omnidireccionales de mesa", "Zebra, Honeywell, Datalogic", "Cámara de celular o tablet"],
    icon: Barcode,
  },
  {
    name: "Gavetas Portamonedas Automáticas",
    category: "Seguridad de Efectivo",
    protocol: "Pulso Eléctrico 12V / 24V vía RJ11",
    description: "Apertura eléctrica automática al pulsar 'Cobrar en Efectivo' en el terminal. Solo se abre cuando hay una transacción autorizada para resguardar la caja.",
    compatibility: ["Conexión a través de impresora térmica", "Gavetas metálicas de 4 o 5 divisiones", "Apertura manual de emergencia con llave"],
    icon: Coins,
  },
  {
    name: "Visor Secundario para Cliente",
    category: "Transparencia en Mostrador",
    protocol: "HDMI / VGA / Red WiFi Local",
    description: "Pantalla orientada al comprador que muestra en vivo la foto del producto, precio en $, cálculo en Bs a tasa oficial BCV y desglose de formas de pago.",
    compatibility: ["Cualquier monitor HDMI o VGA", "Tablets Android en red local", "Pantallas secundarias All-In-One"],
    icon: Monitor,
  },
  {
    name: "Computadoras & Terminales POS",
    category: "Procesamiento Central",
    protocol: "Windows 7, 8, 10, 11 (32 / 64 bit)",
    description: "Corre con fluidez en computadoras sencillas. No requieres renovar tus equipos existentes ni comprar servidores dedicados.",
    compatibility: ["Laptops y computadoras de escritorio", "Terminales All-In-One táctiles", "Procesadores Celeron, Core i3 o superiores", "Menos de 150 MB de memoria RAM"],
    icon: Cpu,
  },
];

export const HardwareSection: React.FC = () => {
  return (
    <section id="hardware" className="py-24 relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Hardware */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 border border-slate-300 text-slate-800 text-xs font-mono font-semibold mb-3">
              <Cable className="w-3.5 h-3.5 text-blue-600" />
              <span>COMPATIBILIDAD CON HARDWARE ESTÁNDAR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-3">
              Usa los equipos que ya tienes, sin contratos forzosos.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              No estás atado a comprar hardware propietario con sobreprecio. Isaac POS se conecta directamente a los protocolos y periféricos universales del comercio.
            </p>
          </div>

          <div className="shrink-0 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs font-mono text-slate-700 max-w-xs">
            <div className="flex items-center gap-2 text-emerald-600 font-bold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Conexión Plug & Play</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-snug">
              Nuestro equipo técnico configura tus impresoras y balanzas por AnyDesk sin costo adicional.
            </p>
          </div>
        </div>

        {/* Grilla Asimétrica y Detallada de Periféricos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HARDWARE_DEVICES.map((dev, idx) => {
            const Icon = dev.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 hover:border-slate-400 rounded-3xl p-7 transition-all hover:shadow-[0_10px_30px_rgba(15,23,42,0.06)] flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 group-hover:scale-105 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/80">
                      {dev.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-950 mb-1">
                    {dev.name}
                  </h3>

                  <span className="font-mono text-[11px] text-blue-600 font-semibold block mb-3">
                    {dev.protocol}
                  </span>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {dev.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Modelos y marcas compatibles:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dev.compatibility.map((c, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[11px] font-medium bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/70"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

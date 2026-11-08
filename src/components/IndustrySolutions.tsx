"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingBasket,
  Pill,
  Scale,
  Wrench,
  Building2,
  CheckCircle2,
  ArrowRight,
  Store,
} from "lucide-react";

interface IndustrySolutionsProps {
  onOpenModal: (plan?: string) => void;
}

interface IndustryItem {
  id: string;
  name: string;
  shortLabel: string;
  icon: any;
  badge: string;
  headline: string;
  painPointSolved: string;
  features: string[];
  image: string;
  recommendedPlanKey: string;
  recommendedPlanLabel: string;
}

const INDUSTRIES: IndustryItem[] = [
  {
    id: "minimarket",
    name: "Minimarkets, Bodegones & Abastos",
    shortLabel: "Minimarkets & Bodegones",
    icon: ShoppingBasket,
    badge: "ALTA ROTACIÓN EN CAJA",
    headline: "Despacha colas en horas pico con cobro mixto y QR de Pago Móvil en 2da pantalla.",
    painPointSolved:
      "Elimina las colas por sacar cuentas con calculadora cuando el cliente paga una parte en billetes de dólar, otra en bolívares y el resto por Pago Móvil.",
    features: [
      "Visor de Cliente en 2da pantalla con generación automática de QR de Pago Móvil por el monto exacto en Bs.",
      "Cobro mixto instantáneo: combina Efectivo USD + Pago Móvil + Punto de Venta en un mismo ticket.",
      "Lectura continua de código de barras (< 12ms) y catálogo táctil con fotos reales para productos sin etiqueta.",
      "Arqueo Ciego al cierre de turno para detectar faltantes de efectivo en dólares o bolívares al instante.",
    ],
    image: "/real-system/v24_pos_terminal.png",
    recommendedPlanKey: "pro_anual",
    recommendedPlanLabel: "Plan Profesional o Vitalicia",
  },
  {
    id: "farmacia",
    name: "Farmacias & Casas Médicas",
    shortLabel: "Farmacias & Salud",
    icon: Pill,
    badge: "MODO FARMACIA INTEGRADO",
    headline: "Control estricto de fechas de vencimiento, psicotrópicos y búsqueda por principio activo.",
    painPointSolved:
      "Evita pérdidas por medicamentos vencidos en estantería y permite que el farmaceuta encuentre sustitutos por componente activo en segundos.",
    features: [
      "Filtro nativo de Modo Farmacia: control de Psicotrópicos / Récipe y alertas de vencimiento (< 60 días).",
      "Búsqueda instantánea por nombre comercial, código de barra, laboratorio o principio activo.",
      "Actualización masiva de costos desde facturas de droguerías con protección de margen en divisas.",
      "Kardex auditable de entradas y salidas por lote y operador responsable.",
    ],
    image: "/real-system/v24_inventario_kardex.png",
    recommendedPlanKey: "pro_anual",
    recommendedPlanLabel: "Plan Profesional (Hasta 3 Cajas)",
  },
  {
    id: "carniceria",
    name: "Carnicerías, Charcuterías & Panaderías",
    shortLabel: "Carnicerías & Charcuterías",
    icon: Scale,
    badge: "PESAJE ELECTRÓNICO EN VIVO",
    headline: "Conexión directa con tu balanza digital para cobrar por gramos o kilos sin errores de tipeo.",
    painPointSolved:
      "Impide que el empleado digite mal el peso o el precio por kilo de quesos, embutidos y cortes de carne, protegiendo cada gramo de mercancía.",
    features: [
      "Lectura automática del peso desde balanzas electrónicas (Torrey, Systel, CAS, Toledo) vía RS232 o USB.",
      "Cálculo automático de fracciones (ej. 0.385 kg) en Dólares y Bolívares a tasa oficial BCV.",
      "Control de mermas, desposte y recetas de producción (BOM) para panaderías y charcuterías.",
      "Arqueo Ciego de caja por denominación de billetes ($1, $5, $10, $20, $50, $100) al cambio de turno.",
    ],
    image: "/real-system/v24_control_caja_arqueo.png",
    recommendedPlanKey: "vitalicia",
    recommendedPlanLabel: "Licencia Vitalicia ($199 Pago Único)",
  },
  {
    id: "ferreteria",
    name: "Ferreterías, Repuestos & Mayoristas",
    shortLabel: "Ferreterías & Repuestos",
    icon: Wrench,
    badge: "CATÁLOGOS DE MILES DE SKUs",
    headline: "Domina inventarios extensos e importa listas de precios de proveedores con lectura óptica OCR.",
    painPointSolved:
      "Ahorra días enteros de transcribir facturas de proveedores a mano y evita vender por debajo del costo de reposición.",
    features: [
      "Importador de Facturas y Catálogos (OCR / PDF / Excel): actualiza cientos de costos y márgenes en minutos.",
      "Valorización en tiempo real de todo tu almacén a costo de inversión ($) y precio proyectado de venta.",
      "Emisión de cotizaciones y presupuestos en PDF/WhatsApp indexados en dólares.",
      "Sugerencias predictivas de reposición según la velocidad de venta de los últimos 30 días.",
    ],
    image: "/real-system/v24_importador_facturas_ocr.png",
    recommendedPlanKey: "vitalicia",
    recommendedPlanLabel: "Licencia Vitalicia ($199 Pago Único)",
  },
  {
    id: "multisede",
    name: "Cadenas, Licorerías & Multi-Sucursales",
    shortLabel: "Multi-Caja & Sucursales",
    icon: Building2,
    badge: "GESTIÓN CENTRALIZADA",
    headline: "Supervisa múltiples cajas y sucursales con auditoría forense inmutable en tiempo real.",
    painPointSolved:
      "Te da control absoluto de tus tiendas aunque no estés físicamente en el local, auditando cada descuento, anulación o apertura de gaveta.",
    features: [
      "Panel Multi-Sede: administra Casa Matriz, sucursales y depósitos desde una sola vista gerencial.",
      "Torre de Control en vivo: monitorea cada ticket cobrado y ejecuta Arqueos X remotos sin detener la caja.",
      "Centro de Auditoría Inmutable: registro imborrable con fecha, hora y usuario de cada ajuste de precio o costo.",
      "Sincronización en red local (LAN/WiFi) a máxima velocidad sin depender de internet.",
    ],
    image: "/real-system/v24_red_sucursales_multisede.png",
    recommendedPlanKey: "vitalicia",
    recommendedPlanLabel: "Licencia Vitalicia + Cajas Extra",
  },
];

export const IndustrySolutions: React.FC<IndustrySolutionsProps> = ({ onOpenModal }) => {
  const [selectedId, setSelectedId] = useState<string>("minimarket");

  const activeIndustry =
    INDUSTRIES.find((item) => item.id === selectedId) || INDUSTRIES[0];

  return (
    <section id="rubros" className="py-20 relative bg-blue-50/35 dark:bg-slate-900/70 backdrop-blur-[2px] border-t border-blue-100/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-blue-800 dark:text-slate-200 text-xs font-mono font-bold mb-3 shadow-2xs">
            <Store className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>ADAPTADO A LA OPERATIVA DE TU GREMIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            ¿Qué tipo de comercio tienes?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Selecciona tu rubro comercial para ver cómo Isaac POS V24.04 resuelve los cuellos de botella específicos de tu mostrador e inventario.
          </p>
        </div>

        {/* Pestañas de Rubros */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            const isSelected = ind.id === selectedId;
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => setSelectedId(ind.id)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.4)]"
                    : "bg-white/90 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-blue-200/70 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 hover:text-blue-700 dark:hover:text-white shadow-2xs"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{ind.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Tarjeta del Rubro Activo */}
        <div className="bg-white/95 dark:bg-slate-950 backdrop-blur-md border border-blue-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_-12px_rgba(37,99,235,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Columna Izquierda (5 cols): Beneficios por Rubro */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold">
                <span>{activeIndustry.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white leading-tight">
                {activeIndustry.headline}
              </h3>

              <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-950 dark:text-amber-300 font-bold block mb-0.5">
                  Problema que elimina de raíz:
                </strong>
                {activeIndustry.painPointSolved}
              </div>

              <div className="space-y-2.5 pt-2">
                {activeIndustry.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-500 font-bold block">
                    MODALIDAD RECOMENDADA
                  </span>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {activeIndustry.recommendedPlanLabel}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenModal(activeIndustry.recommendedPlanKey)}
                  className="px-5 py-3 rounded-xl bg-slate-950 dark:bg-blue-600 hover:bg-slate-900 dark:hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer shrink-0"
                >
                  <span>Configurar para mi {activeIndustry.shortLabel.split(" ")[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Columna Derecha (7 cols): Captura Real del Módulo Clave */}
            <div className="lg:col-span-7">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-2 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs font-mono text-slate-400 mb-2 bg-slate-900/90 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-slate-200 text-[11px] font-semibold">
                      Isaac POS V24.04 • {activeIndustry.name}
                    </span>
                  </div>
                  <span className="text-emerald-400 text-[10px] font-mono font-bold">
                    ● 100% Offline + BCV
                  </span>
                </div>

                <div className="rounded-xl overflow-hidden bg-slate-900">
                  <Image
                    src={activeIndustry.image}
                    alt={activeIndustry.name}
                    width={1024}
                    height={551}
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

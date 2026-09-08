"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Monitor,
  BarChart3,
  Boxes,
  FileSpreadsheet,
  Users,
  Sliders,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Maximize2,
} from "lucide-react";

interface ShowcaseItem {
  id: string;
  tabTitle: string;
  icon: any;
  title: string;
  badge: string;
  description: string;
  image: string;
  highlights: string[];
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "pos",
    tabTitle: "Terminal de Ventas",
    icon: Monitor,
    badge: "Cobro Ultra-Rápido",
    title: "Terminal POS Táctil con Multimoneda Nativa (USD / Bs)",
    description:
      "Diseñada para eliminar filas en tu negocio. Maneja simultáneamente precios en dólares y moneda local con tasa actualizada en tiempo real, búsqueda express por código o teclado (F4), desglose de impuestos y cobro en 1 click con atajo (F2).",
    image: "/real-system/ui_terminal_ventas.png",
    highlights: [
      "Conversión automática de divisas en pantalla (USD / Bs.S)",
      "Gestión de cliente ocasional o con cuenta de crédito",
      "Impresión de ticket térmico e integración con cajón automático",
      "Teclas de acceso rápido para máxima velocidad de atención",
    ],
  },
  {
    id: "dashboard",
    tabTitle: "Inteligencia & Reportes",
    icon: BarChart3,
    badge: "Métricas en Tiempo Real",
    title: "Dashboard Ejecutivo de Inteligencia Empresarial",
    description:
      "Toma decisiones con números exactos. Monitorea ingresos brutos, ganancia neta real tras deducir costos, valor de ticket promedio, margen operativo y gráficos comparativos de Ventas vs Utilidad.",
    image: "/real-system/ui_dashboard_reportes.png",
    highlights: [
      "Cálculo automático de ganancia neta y margen bruto (%)",
      "Filtros por periodos: Hoy, 7 días, 30 días o rango personalizado",
      "Distribución de rentabilidad por rubro de producto",
      "Exportación directa de reportes a herramientas de Business Intelligence",
    ],
  },
  {
    id: "inventario",
    tabTitle: "Control de Inventario",
    icon: Boxes,
    badge: "Kardex Automatizado",
    title: "Panel Unificado de Inventario y Alertas de Stock Crítico",
    description:
      "Monitorea el inventario de todas tus sucursales con detección automática de productos por agotarse. Soporta ventas por unidades, bultos, pesaje y catálogos digitales interactivos.",
    image: "/real-system/ui_control_inventario.png",
    highlights: [
      "Alertas visuales inteligentes de reposición inmediata",
      "Soporte para múltiples sucursales y bodegas centrales",
      "Generación automática de catálogo en PDF para clientes",
      "Control de mermas y entradas de mercancía blindadas",
    ],
  },
  {
    id: "importador",
    tabTitle: "Importador IA (Flash Engine)",
    icon: Sparkles,
    badge: "Automatización con IA",
    title: "Carga Masiva de Productos desde Catálogos PDF con IA",
    description:
      "Olvídate de ingresar cientos de productos a mano. Con el motor Flash Engine exclusivo de Isaac POS, simplemente sueltas el catálogo PDF de tu proveedor y la IA extrae códigos, nombres y costos en segundos.",
    image: "/real-system/ui_importador_ia.png",
    highlights: [
      "Arrastra el PDF de cualquier distribuidor o mayorista",
      "Extracción inteligente de códigos de barra, descripción y precios",
      "Actualización masiva de costos de compra en 1 clic",
      "Ahorra hasta 20 horas de trabajo manual en cada pedido",
    ],
  },
  {
    id: "fiados",
    tabTitle: "Cuentas por Cobrar & Fiados",
    icon: Users,
    badge: "Control Financiero",
    title: "Gestión de Clientes, Créditos Otorgados y Fidelización",
    description:
      "Protege tu capital de trabajo. Asigna límites de crédito a clientes de confianza, consulta balances pendientes de cobro y ofrece programas de puntos de lealtad para compras recurrentes.",
    image: "/real-system/ui_cuentas_por_cobrar.png",
    highlights: [
      "Historial detallado de compras a crédito y abonos realizados",
      "Fijación de cupos máximos de endeudamiento por cliente",
      "Recordatorios de cobranza con montos indexados en divisas",
      "Módulo de fidelización y puntos por consumo",
    ],
  },
  {
    id: "ajustes",
    tabTitle: "Configuración Multimoneda",
    icon: Sliders,
    badge: "Ajustes Globales",
    title: "Sincronización de Tasas, Impuestos y Roles de Usuario",
    description:
      "Configuración centralizada para adaptarse a la realidad económica de tu país: sincronización de tasas oficiales y de mercado, esquemas tributarios IVA/IGTF y permisos jerárquicos por usuario.",
    image: "/real-system/ui_configuracion_multimoneda.png",
    highlights: [
      "Actualización automática de tasas de cambio con 1 clic",
      "Reglas tributarias configurables por tipo de transacción",
      "Roles protegidos por PIN de seguridad para cajeros y supervisores",
      "Respaldos locales y en la nube con cifrado militar",
    ],
  },
];

export const RealSystemShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("pos");
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const currentItem =
    SHOWCASE_ITEMS.find((item) => item.id === activeTab) || SHOWCASE_ITEMS[0];

  return (
    <section id="sistema-real" className="py-24 relative bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Capturas Reales de Isaac POS en Producción</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Conoce el Sistema Real por Dentro
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Sin maquetas falsas ni ilustraciones genéricas. Esta es la interfaz ejecutiva real que tú y tu equipo utilizarán todos los días.
          </p>
        </div>

        {/* Selector de Pestañas Interactivas */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none justify-start lg:justify-center">
          {SHOWCASE_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-105"
                    : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-850"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.tabTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Contenedor Principal con Imagen Real y Desglose Técnico */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Detalles del Módulo (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-xs font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{currentItem.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {currentItem.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentItem.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                {currentItem.highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Marco de Pantalla con la Captura Real (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-slate-950 rounded-2xl border-2 border-slate-700/80 p-2 shadow-2xl overflow-hidden group relative">
                {/* Barra de Ventana del Sistema */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="ml-2 text-slate-300 text-[11px]">Isaac POS V24.04 Premium</span>
                  </div>
                  <span className="text-emerald-400 text-[10px]">● En Vivo</span>
                </div>

                {/* Imagen Real con Zoom */}
                <div
                  className="relative rounded-xl overflow-hidden cursor-zoom-in bg-slate-900"
                  onClick={() => setIsZoomed(true)}
                >
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Clic para ampliar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Zoom a Pantalla Completa */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl p-4 sm:p-8 flex flex-col items-center justify-center animate-fadeIn"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] overflow-auto rounded-2xl border border-slate-700 shadow-2xl bg-slate-900 p-2">
            <div className="flex justify-between items-center px-4 py-2 text-xs font-mono text-slate-400 border-b border-slate-800 mb-2">
              <span className="text-white font-bold">{currentItem.title}</span>
              <span className="text-emerald-400">Clic en cualquier parte para cerrar ✕</span>
            </div>
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

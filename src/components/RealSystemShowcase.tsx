"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  Receipt,
  Package,
  Truck,
  Users,
  Database,
  Landmark,
  CheckCircle2,
  ShieldCheck,
  Maximize2,
  Banknote,
  BrainCircuit,
  TrendingUp,
  Warehouse,
  Hammer,
  FileSpreadsheet,
  Settings,
  Monitor,
  Activity,
  BarChart3,
  FileText,
} from "lucide-react";

interface SubModule {
  id: string;
  name: string;
  badge: string;
  icon: any;
  title: string;
  description: string;
  image?: string;
  highlights: string[];
  isDisplayDemo?: boolean;
}

interface PillarCategory {
  id: string;
  name: string;
  icon: any;
  badge: string;
  subModules: SubModule[];
}

const PILLARS: PillarCategory[] = [
  {
    id: "ventas",
    name: "Ventas & Mostrador",
    icon: ShoppingCart,
    badge: "OPERACIÓN EXPRESS",
    subModules: [
      {
        id: "pos",
        name: "POS Táctil Bimonetario",
        badge: "Cobro Dual USD / Bs",
        icon: ShoppingCart,
        title: "Terminal de Venta con Catálogo Táctil y Tasa BCV Oficial",
        description:
          "Facturación ultra rápida para bodegas, farmacias y minimarkets. Catálogo visual con fotos reales, 10+ categorías, cálculo en vivo a tasa oficial BCV, balanza electrónica y cobro multimoneda.",
        image: "/real-system/v24_pos_terminal.png",
        highlights: [
          "Catálogo visual con fotos reales y categorías filtrables",
          "Cálculo automático de bolívares según la tasa BCV del día",
          "Cobro multimoneda: Efectivo $, Pago Móvil, Punto, Zelle, Transferencia",
          "Integración con balanzas electrónicas por peso al instante",
        ],
      },
      {
        id: "display",
        name: "Visor Cliente (QR Pago Móvil)",
        badge: "QR Dinámico en Vivo",
        icon: Monitor,
        title: "Visor Secundario con QR de Pago Móvil para el Comprador",
        description:
          "Conecta una segunda pantalla o tablet orientada al cliente. El comprador audita su cuenta en tiempo real y el sistema genera automáticamente el código QR de Pago Móvil con el monto exacto para escanear y pagar sin teclear datos.",
        image: "/real-system/v24_visor_cliente_qr.png",
        highlights: [
          "Generación instantánea de código QR con datos bancarios y monto en Bs.",
          "Visualización bimonetaria transparente en USD y Bs a tasa BCV",
          "Reduce colas y elimina errores al transcribir números de teléfono o cédula",
          "Pantalla personalizable con el logo y bienvenida de tu comercio",
        ],
      },
      {
        id: "display_idle",
        name: "Visor Cliente (Modo Bienvenida)",
        badge: "Identidad Comercial",
        icon: Monitor,
        title: "Pantalla de Bienvenida del Cliente con Tasa BCV y Métodos de Pago",
        description:
          "Cuando la caja está disponible esperando al próximo cliente, el segundo monitor proyecta el emblema de tu negocio, la tasa oficial BCV vigente del día y los métodos de pago aceptados.",
        image: "/real-system/v24_visor_cliente_idle.png",
        highlights: [
          "Exhibición permanente de la Tasa Oficial BCV para transparencia total",
          "Personalización con el nombre, logo y mensaje de tu comercio",
          "Indicador en vivo de métodos de pago (Pago Móvil, Punto, Divisas)",
          "Conmutación automática al carrito de compras apenas se escanea el primer artículo",
        ],
      },
      {
        id: "arqueo",
        name: "Arqueo Ciego de Caja",
        badge: "Anti-Robo Hormiga",
        icon: Banknote,
        title: "Control de Caja & Conteo Ciego por Billetes",
        description:
          "El cajero cuenta físicamente los billetes en su gaveta ($1, $5, $10, $20, $50, $100) y declara el dinero sin ver el total del sistema. Evita robos hormiga y fugas de efectivo con cierre correlativo Corte Z.",
        image: "/real-system/v24_control_caja_arqueo.png",
        highlights: [
          "Declaración a ciegas: el cajero no ve el saldo teórico del sistema",
          "Conteo rápido por denominación de billetes en dólares y bolívares",
          "Detección instantánea de cualquier faltante o sobrante de caja",
          "Apertura de gaveta RJ11 e impresión de comprobante de turno",
        ],
      },
      {
        id: "monitoreo",
        name: "Monitoreo en Tiempo Real",
        badge: "Torre de Control",
        icon: Activity,
        title: "Supervisión Central de Cajas y Feed de Cobros en Vivo",
        description:
          "Monitorea en tiempo real todas las cajas activas en tu negocio. Visualiza recaudación acumulada, efectivo físico en gaveta, cobros digitales y un feed segundo a segundo de cada ticket cobrado.",
        image: "/real-system/v24_monitoreo_cajas_remoto.png",
        highlights: [
          "Vista unificada de todas las terminales en red local (LAN/WiFi)",
          "Auditoría en vivo de ventas cobradas (débito, pago móvil, divisas)",
          "Historial de expedientes por cajero y cierres de turno",
          "Arqueo X remoto para supervisar sin interrumpir el mostrador",
        ],
      },
    ],
  },
  {
    id: "inventario",
    name: "Inventario & Reposición",
    icon: Package,
    badge: "CONTROL TOTAL DE STOCK",
    subModules: [
      {
        id: "stock",
        name: "Control de Stock & Kardex",
        badge: "895+ SKUs Activos",
        icon: Package,
        title: "Catálogo Centralizado de Artículos & Valorización de Almacén",
        description:
          "Monitoreo completo de inventario con valorización total de inversión a costo ($11,666.79) y retail proyectado con margen de ganancia (+31.7%). Incluye modo farmacia para psicotrópicos y fechas de vencimiento.",
        image: "/real-system/v24_inventario_kardex.png",
        highlights: [
          "Kardex con entradas, salidas y valorización total del almacén",
          "Modo Farmacia con control de recetas médicas y psicotrópicos",
          "Alertas visuales de productos próximos a vencer (< 60 días)",
          "Exportación e importación masiva a Excel y generación de catálogo PDF",
        ],
      },
      {
        id: "reposicion",
        name: "Sugerencias de Reposición",
        badge: "Analítica Predictiva",
        icon: TrendingUp,
        title: "Monitoreo Predictivo de Quiebres y Sugerencias de Compra",
        description:
          "Algoritmo analítico que calcula la velocidad de rotación de cada producto en los últimos 30 días y te indica exactamente cuántos días de stock te quedan y qué productos debes reponer hoy para no quedarte sin mercancía.",
        image: "/real-system/v24_sugerencias_reposicion.png",
        highlights: [
          "Detección automática de existencias críticas y productos agotados",
          "Cálculo analítico de velocidad de venta diaria por artículo",
          "Estimación de días restantes de inventario antes de quiebre",
          "Botón directo de reposición rápida (+1, +10 unidades)",
        ],
      },
      {
        id: "proveedores",
        name: "Proveedores & Compras",
        badge: "Abastecimiento",
        icon: Truck,
        title: "Directorio de Distribuidores con Pedidos por WhatsApp",
        description:
          "Administra los datos de tus mayoristas y distribuidores. Control de facturas de compra a crédito, cuentas por pagar y botón para generar y enviar pedidos directamente por WhatsApp con 1 clic.",
        image: "/real-system/v24_proveedores_compras.png",
        highlights: [
          "Directorio comercial con teléfonos, RIF y balances contables al día",
          "Botón de 'Pedir' directo a WhatsApp con lista de productos requeridos",
          "Control de órdenes en tránsito y facturas digitalizadas",
          "Gestión de cuentas por pagar y estado de solvencia",
        ],
      },
      {
        id: "importador",
        name: "Importador de Facturas (OCR)",
        badge: "Lectura Óptica OCR",
        icon: FileText,
        title: "Importador de Catálogos y Facturas de Proveedores (PDF/Foto)",
        description:
          "Digitaliza facturas de mayoristas escaneadas o en PDF. El motor lee automáticamente los códigos, bultos y nuevos precios de compra para actualizar tus costos y márgenes sin transcribir a mano.",
        image: "/real-system/v24_importador_facturas_ocr.png",
        highlights: [
          "Captura directa desde escáner USB, cámara web o archivo PDF/JPG",
          "Lectura óptica de comprobantes con detección de códigos y montos",
          "Asociación automática al catálogo de productos del inventario",
          "Actualización masiva de costos cuidando tus márgenes de ganancia",
        ],
      },
    ],
  },
  {
    id: "seguridad",
    name: "Seguridad & Gerencia",
    icon: ShieldCheck,
    badge: "CONTROL Y PROTECCIÓN",
    subModules: [
      {
        id: "auditoria",
        name: "Centro de Auditoría Inmutable",
        badge: "Registro Inmutable",
        icon: ShieldCheck,
        title: "Centro de Auditoría Inmutable y Trazabilidad de Eventos",
        description:
          "Bitácora blindada que registra con fecha, hora y usuario responsable cada cambio de costo, aumento de PVP, inicio de sesión o apertura de gaveta. Nada se puede borrar ni alterar a espaldas del dueño.",
        image: "/real-system/v24_centro_auditoria.png",
        highlights: [
          "Auditoría forense de miles de eventos con usuario y fecha exacta",
          "Seguimiento riguroso a cambios de precios y ajustes de costos",
          "Trazabilidad de aperturas de gaveta y retiro de dinero",
          "Filtros por cajero, fecha, tipo de acción y exportación a Excel",
        ],
      },
      {
        id: "bi",
        name: "Inteligencia Empresarial (BI)",
        badge: "Indicadores En Vivo",
        icon: BarChart3,
        title: "Tablero Ejecutivo de Inteligencia Empresarial y Rentabilidad",
        description:
          "Métricas clave de rentabilidad en tiempo real: margen bruto, ticket promedio, evolución horaria de ventas vs ganancia neta y mapa de calor de intensidad horaria para optimizar el horario de tus cajeros.",
        image: "/real-system/v24_inteligencia_empresarial.png",
        highlights: [
          "Gráfica horaria de Ventas vs Utilidad neta del día en tiempo real",
          "Cálculo de rentabilidad por rubro y categoría de producto",
          "Mapa de intensidad horaria por turnos (madrugada, mañana, tarde, noche)",
          "Alertas gerenciales de stock crítico para compras estratégicas",
        ],
      },
      {
        id: "gastos",
        name: "Control de Gastos & Caja Chica",
        badge: "Caja Chica Activa",
        icon: Receipt,
        title: "Control de Gastos Operativos, Servicios y Deducciones",
        description:
          "Registra cada salida de dinero por servicios (luz, flete, bolsas, almuerzos) con comprobantes digitalizados, garantizando que el dinero retirado no altere el cuadre ni el arqueo del turno.",
        image: "/real-system/v24_control_gastos_caja_chica.png",
        highlights: [
          "Registro de egresos operativos categorizados por mayor rubro",
          "Gestión independiente de fondos para caja chica",
          "Soporte de comprobantes y facturas digitalizadas adjuntas",
          "Cálculo a tasa oficial BCV del día para gastos bimonetarios",
        ],
      },
      {
        id: "sucursales",
        name: "Red de Sucursales (Multi-Sede)",
        badge: "Multi-Sede",
        icon: Warehouse,
        title: "Gestión Centralizada de Sucursales y Almacenes en Red",
        description:
          "Conecta tu tienda principal (Casa Matriz) con depósitos secundarios y sucursales. Monitorea operadores activos, existencias por local y traslados de mercancía desde un único panel administrativo.",
        image: "/real-system/v24_red_sucursales_multisede.png",
        highlights: [
          "Gestión centralizada de múltiples tiendas y depósitos remotos",
          "Monitoreo de operadores y personal asignado por sucursal",
          "Control de inventario consolidado e independiente por sede",
          "Cambio de contexto de sesión entre Casa Matriz y sucursales",
        ],
      },
    ],
  },
];

export const RealSystemShowcase: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>("ventas");
  const [activeSubModuleId, setActiveSubModuleId] = useState<string>("pos");
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [activeHotspotIdx, setActiveHotspotIdx] = useState<number | null>(0);

  const HOTSPOT_COORDS = [
    { top: "18%", left: "32%" },
    { top: "48%", left: "54%" },
    { top: "38%", left: "82%" },
    { top: "74%", left: "26%" },
  ];

  const activePillar =
    PILLARS.find((p) => p.id === activePillarId) || PILLARS[0];

  const activeSubModule =
    activePillar.subModules.find((s) => s.id === activeSubModuleId) ||
    activePillar.subModules[0];

  const handlePillarChange = (pillarId: string) => {
    setActivePillarId(pillarId);
    setActiveHotspotIdx(0);
    const pillar = PILLARS.find((p) => p.id === pillarId);
    if (pillar && pillar.subModules.length > 0) {
      setActiveSubModuleId(pillar.subModules[0].id);
    }
  };

  return (
    <section id="sistema-real" className="py-20 relative bg-white/65 dark:bg-slate-950/85 backdrop-blur-[2px] border-t border-blue-100/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-blue-800 dark:text-slate-200 text-xs font-mono font-bold mb-3 shadow-2xs">
            <span>SUITE OPERATIVA DE COMERCIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            Explora la suite completa módulo por módulo.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Desde el cobro rápido en mostrador y el visor de cliente hasta inventario multialmacén, cuentas por cobrar indexadas y arqueo ciego.
          </p>
        </div>

        {/* 1. Selector Maestro de los 4 Pilares (Pestañas Principales) */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = activePillarId === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => handlePillarChange(pillar.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 dark:border-blue-500 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.4)]"
                    : "bg-white/90 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-blue-200/70 dark:border-slate-800 hover:text-blue-700 dark:hover:text-white hover:bg-blue-50/60 dark:hover:bg-slate-800 shadow-2xs"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{pillar.name}</span>
              </button>
            );
          })}
        </div>

        {/* 2. Selector de Sub-Módulos del Pilar Activo */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 mb-10 scrollbar-none">
          {activePillar.subModules.map((sub) => {
            const isSubSelected = activeSubModuleId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubModuleId(sub.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border whitespace-nowrap cursor-pointer ${
                  isSubSelected
                    ? "bg-blue-100/90 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700 shadow-xs font-bold"
                    : "bg-white/85 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200/90 dark:border-slate-800 hover:text-blue-700 dark:hover:text-white hover:bg-blue-50/50 dark:hover:bg-slate-800"
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>

        {/* 3. Tarjeta Principal con Información y Captura Real */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-blue-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_-12px_rgba(37,99,235,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Columna Izquierda: Información del Módulo (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/90 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{activeSubModule.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {activeSubModule.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {activeSubModule.description}
              </p>

              <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                {activeSubModule.highlights.map((point, idx) => {
                  const isSpotActive = activeHotspotIdx === idx;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveHotspotIdx(idx)}
                      onClick={() => setActiveHotspotIdx(idx)}
                      className={`flex items-start gap-2.5 p-2 rounded-xl text-xs sm:text-sm cursor-pointer transition-all border ${
                        isSpotActive
                          ? "bg-blue-50/90 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700 text-slate-950 dark:text-white font-semibold shadow-2xs"
                          : "border-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full font-mono text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSpotActive
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span>{point}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Columna Derecha: Captura Real del Módulo con Hotspots Interactivos (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-300 dark:border-slate-800 p-2 shadow-xl overflow-hidden group relative">
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 mb-2 bg-slate-50 dark:bg-slate-900 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
                    <span className="ml-2 text-slate-700 dark:text-slate-200 text-[11px] font-semibold">Isaac POS • {activeSubModule.name}</span>
                  </div>
                  <span className="text-blue-700 dark:text-blue-400 text-[10px] font-mono font-bold">● Pasa el cursor sobre los puntos (1-4)</span>
                </div>

                {activeSubModule.image && (
                  <div
                    className="relative rounded-xl overflow-hidden cursor-zoom-in bg-slate-900"
                    onClick={() => setIsZoomed(true)}
                  >
                    <Image
                      src={activeSubModule.image}
                      alt={activeSubModule.title}
                      width={1024}
                      height={551}
                      className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.008]"
                    />

                    {/* Puntos Interactivos (Hotspots) sobre la captura */}
                    {activeSubModule.highlights.slice(0, 4).map((point, idx) => {
                      const coords = HOTSPOT_COORDS[idx] || HOTSPOT_COORDS[0];
                      const isSpotActive = activeHotspotIdx === idx;
                      return (
                        <div
                          key={idx}
                          style={{ top: coords.top, left: coords.left }}
                          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                          onMouseEnter={() => setActiveHotspotIdx(idx)}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspotIdx(idx);
                          }}
                        >
                          <span className="relative flex h-7 w-7 cursor-pointer items-center justify-center">
                            <span
                              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                isSpotActive ? "bg-blue-400" : "bg-emerald-400"
                              }`}
                            />
                            <span
                              className={`relative inline-flex rounded-full h-6 w-6 font-mono text-xs font-black items-center justify-center border-2 border-white shadow-lg transition-transform ${
                                isSpotActive
                                  ? "bg-blue-600 text-white scale-110"
                                  : "bg-emerald-500 text-slate-950 hover:scale-110"
                              }`}
                            >
                              {idx + 1}
                            </span>
                          </span>
                        </div>
                      );
                    })}

                    {/* Tarjeta Flotante del Hotspot Activo */}
                    {activeHotspotIdx !== null && activeSubModule.highlights[activeHotspotIdx] && (
                      <div
                        className="absolute bottom-3 left-3 right-40 hidden sm:flex items-center gap-2.5 bg-slate-950/90 backdrop-blur-md border border-blue-500/40 text-white px-3.5 py-2 rounded-xl text-xs shadow-xl pointer-events-none"
                      >
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-mono text-[11px] font-black flex items-center justify-center shrink-0">
                          {activeHotspotIdx + 1}
                        </span>
                        <span className="truncate font-medium">
                          {activeSubModule.highlights[activeHotspotIdx]}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold flex items-center gap-1.5 shadow-md">
                      <Maximize2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Clic para ampliar</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Modal de Zoom a Pantalla Completa */}
      {isZoomed && activeSubModule.image && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center animate-fadeIn"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] overflow-auto rounded-2xl border border-slate-300 dark:border-slate-700 shadow-2xl bg-white dark:bg-slate-900 p-2">
            <div className="flex justify-between items-center px-4 py-2 text-xs font-mono text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 mb-2 bg-slate-50 dark:bg-slate-950">
              <span className="text-slate-900 dark:text-white font-bold">{activeSubModule.title}</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer">Clic en cualquier parte para cerrar ✕</span>
            </div>
            <Image
              src={activeSubModule.image}
              alt={activeSubModule.title}
              width={1024}
              height={551}
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

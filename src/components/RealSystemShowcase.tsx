"use client";

import React, { useState, useEffect } from "react";
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
        name: "Visor de Cliente (2da Pantalla)",
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

  const activePillar =
    PILLARS.find((p) => p.id === activePillarId) || PILLARS[0];

  const activeSubModule =
    activePillar.subModules.find((s) => s.id === activeSubModuleId) ||
    activePillar.subModules[0];

  const handlePillarChange = (pillarId: string) => {
    setActivePillarId(pillarId);
    const pillar = PILLARS.find((p) => p.id === pillarId);
    if (pillar && pillar.subModules.length > 0) {
      setActiveSubModuleId(pillar.subModules[0].id);
    }
  };

  // Datos para el simulador de 2da pantalla con Tasa BCV Oficial en Vivo
  const [bcvRate, setBcvRate] = useState<number>(857.89);

  useEffect(() => {
    fetch("/api/bcv")
      .then((res) => res.json())
      .then((json) => {
        if (json?.data?.rate && typeof json.data.rate === "number") {
          setBcvRate(json.data.rate);
        }
      })
      .catch(() => {});
  }, []);

  const demoCart = [
    { name: "Harina PAN 1kg", qty: 2, totalUsd: 2.5 },
    { name: "Café Fama de América 250g", qty: 1, totalUsd: 2.8 },
    { name: "Queso Llanero Blanco 1kg", qty: 0.85, totalUsd: 4.68 },
    { name: "Refresco Coca Cola 2L", qty: 1, totalUsd: 2.4 },
  ];
  const demoSubtotal = demoCart.reduce((acc, i) => acc + i.totalUsd, 0);
  const demoIva = demoSubtotal * 0.16;
  const demoTotalUsd = demoSubtotal + demoIva;
  const demoTotalBs = demoTotalUsd * bcvRate;

  return (
    <section id="sistema-real" className="py-20 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 border border-slate-300 text-slate-800 text-xs font-mono font-semibold mb-3">
            <span>SUITE OPERATIVA DE COMERCIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
            Explora la suite completa módulo por módulo.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
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
                    ? "bg-slate-950 text-white border-slate-950 shadow-md"
                    : "bg-white text-slate-700 border-slate-200 hover:text-slate-950 hover:bg-slate-100"
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
                    ? "bg-blue-50 text-blue-700 border-blue-300 shadow-xs font-bold"
                    : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>

        {/* 3. Tarjeta Principal con Información y Captura Real */}
        <div className="bg-slate-50/90 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Columna Izquierda: Información del Módulo (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>{activeSubModule.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {activeSubModule.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                {activeSubModule.description}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-slate-200">
                {activeSubModule.highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna Derecha: Captura Real o Visor de Cliente (7 cols) */}
            <div className="lg:col-span-7">
              {activeSubModule.isDisplayDemo ? (
                /* SIMULADOR EN VIVO DEL VISOR DE CLIENTE (/#/display) */
                <div className="bg-white rounded-2xl border-2 border-blue-200 p-4 sm:p-6 shadow-xl">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                      <span className="text-blue-800 font-bold">MONITOR DE CLIENTE (/#/display)</span>
                    </div>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      1 USD = {bcvRate.toFixed(2)} Bs (BCV)
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-xs">
                        <img
                          src="/isaac-logo-ultra.png"
                          alt="Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">SUPERMERCADO DEMO</div>
                        <div className="text-[11px] text-slate-500">Atendiendo a: <span className="text-blue-700 font-semibold">Cliente Mostrador</span></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Artículos</span>
                      <span className="text-base font-mono font-bold text-blue-700">{demoCart.length} productos</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-4 max-h-40 overflow-y-auto pr-1">
                    {demoCart.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 border border-slate-200 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded bg-slate-200 text-slate-700 font-mono text-[9px] flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-slate-800">{item.name}</span>
                          <span className="text-slate-500 text-[10px]">x{item.qty}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-slate-900">${item.totalUsd.toFixed(2)}</span>
                          <span className="text-[10px] font-mono text-slate-500 ml-2">
                            (Bs {(item.totalUsd * bcvRate).toFixed(2)})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50/80 p-4 rounded-xl border border-blue-200">
                    <div className="flex justify-between items-center text-xs text-slate-600 pb-2 border-b border-blue-200/60">
                      <span>Subtotal: ${demoSubtotal.toFixed(2)}</span>
                      <span>IVA 16%: ${demoIva.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-end pt-3">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-slate-500">Total a Pagar (USD)</div>
                        <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                          ${demoTotalUsd.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-mono uppercase text-emerald-700 font-bold">Total en Bolívares</div>
                        <div className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
                          Bs {demoTotalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* CAPTURA REAL DE PANTALLA DEL MÓDULO */
                <div className="bg-white rounded-2xl border border-slate-300 p-2 shadow-xl overflow-hidden group relative">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 text-xs font-mono text-slate-600 mb-2 bg-slate-50 rounded-t-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
                      <span className="ml-2 text-slate-700 text-[11px] font-semibold">Isaac POS • {activeSubModule.name}</span>
                    </div>
                    <span className="text-blue-700 text-[10px] font-mono font-bold">● Modo Rápido</span>
                  </div>

                  {activeSubModule.image && (
                    <div
                      className="relative rounded-xl overflow-hidden cursor-zoom-in bg-slate-900"
                      onClick={() => setIsZoomed(true)}
                    >
                      <img
                        src={activeSubModule.image}
                        alt={activeSubModule.title}
                        className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.008]"
                      />
                      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 shadow-md">
                        <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Clic para ampliar</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
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
          <div className="relative max-w-6xl w-full max-h-[90vh] overflow-auto rounded-2xl border border-slate-300 shadow-2xl bg-white p-2">
            <div className="flex justify-between items-center px-4 py-2 text-xs font-mono text-slate-700 border-b border-slate-200 mb-2 bg-slate-50">
              <span className="text-slate-900 font-bold">{activeSubModule.title}</span>
              <span className="text-blue-600 font-semibold cursor-pointer">Clic en cualquier parte para cerrar ✕</span>
            </div>
            <img
              src={activeSubModule.image}
              alt={activeSubModule.title}
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

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
  Sparkles,
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
        title: "Terminal de Venta con Catálogo Visual y Tasa BCV Oficial",
        description:
          "Facturación ultra rápida para bodegas, supermercados, farmacias y tiendas. Catálogo visual con fotos, 14+ categorías, cálculo automático a tasa oficial BCV y cobro multimoneda con 8 métodos de pago integrados.",
        image: "/real-system/ui_terminal_ventas_real.png",
        highlights: [
          "Catálogo visual táctil con fotos reales y categorías filtrables",
          "Cálculo automático de bolívares según la tasa BCV del día",
          "8 métodos de pago: Efectivo $, Pago Móvil, POS, Biopago, Zelle, Transferencia, Fiado",
          "Cobros mixtos en un mismo ticket (ej. $10 en efectivo + resto en Pago Móvil)",
        ],
      },
      {
        id: "display",
        name: "Visor de Cliente (2da Pantalla)",
        badge: "Transparencia Total",
        icon: Monitor,
        title: "Visor Secundario en Tiempo Real para el Comprador (/#/display)",
        description:
          "Conecta una pantalla secundaria HDMI/USB o tablet orientada al cliente. El comprador ve cómo se escanean sus artículos con foto, precio unitario, subtotal, IVA, tasa BCV y total dual. Elimina reclamos y confusiones en caja.",
        highlights: [
          "Sincronización instantánea por canal local en milisegundos",
          "Visualización clara del desglose bimonetario (USD / Bs) y tasa BCV",
          "Reduce disputas en caja: el comprador audita su cuenta antes de pagar",
          "Personalizable con el logo y nombre de tu negocio",
        ],
        isDisplayDemo: true,
      },
      {
        id: "arqueo",
        name: "Arqueo Ciego de Caja",
        badge: "Anti-Robo Hormiga",
        icon: Banknote,
        title: "Arqueo Ciego Anti-Fraude y Cuadre de Turno",
        description:
          "El cajero cuenta y declara físicamente los billetes de bolívares y dólares en su mano a ciegas, sin ver el monto esperado por el sistema. Si falta o sobra dinero, el sistema genera la alerta de inmediato.",
        image: "/real-system/ui_arqueo_caja.png",
        highlights: [
          "Declaración a ciegas: el cajero no ve el saldo teórico del sistema",
          "Desglose por denominación de billetes en dólares y bolívares",
          "Detección instantánea de cualquier descuadre de caja",
          "Cierre correlativo de turno X y Z con impresión de comprobante",
        ],
      },
      {
        id: "historial",
        name: "Historial de Tickets",
        badge: "Auditoría Correlativa",
        icon: Receipt,
        title: "Historial Completo de Transacciones y Reimpresión",
        description:
          "Consulta cada venta realizada con número de ticket único, hora, método de pago, desglose de artículos y montos cobrados. Control de devoluciones con reposición automática a inventario.",
        image: "/real-system/ui_historial_ventas.png",
        highlights: [
          "Auditoría cronológica de cada ticket emitido con número correlativo",
          "Reimpresión instantánea en impresoras térmicas de 58mm y 80mm",
          "Filtros por cajero, fecha, turno y método de pago",
          "Control estricto de anulaciones protegido por contraseña de supervisor",
        ],
      },
    ],
  },
  {
    id: "inventario",
    name: "Inventario & Producción",
    icon: Package,
    badge: "CONTROL TOTAL DE STOCK",
    subModules: [
      {
        id: "stock",
        name: "Control de Stock (Kardex)",
        badge: "1.200+ SKUs Activos",
        icon: Package,
        title: "Gestión Integral de Existencias con Alertas de Reposición",
        description:
          "Catálogo masivo con fotos, códigos de barra, costos de compra, precios de venta duales (USD/Bs), proveedor asignado, stock mínimo y alertas automáticas de agotados.",
        image: "/real-system/ui_control_inventario.png",
        highlights: [
          "Kardex con entradas, salidas y valorización total del almacén",
          "Modo Farmacia con filtros de principios activos y psicotrópicos",
          "Alertas de stock preventivo para evitar quiebres de inventario",
          "Ajustes masivos de precios e importación/exportación a Excel",
        ],
      },
      {
        id: "produccion",
        name: "Producción y Recetas (Materia Prima)",
        badge: "Fórmulas & Costeo",
        icon: Hammer,
        title: "Descuento Automático de Ingredientes y Costos por Receta",
        description:
          "Diseñado para panaderías, pizzerías, carnicerías, restaurantes y fábricas. Cada producto terminado descuenta automáticamente los gramos, litros o unidades de materia prima y calcula el costo exacto por receta.",
        image: "/real-system/ui_produccion_bom.png",
        highlights: [
          "Deducción automática de materia prima al registrar producción o venta",
          "Cálculo exacto del costo unitario y margen de ganancia real",
          "Control de mermas, desperdicios y sobrantes de producción",
          "Generación de órdenes de producción por lotes",
        ],
      },
      {
        id: "almacenes",
        name: "Almacenes Multi-Sede",
        badge: "Logística y Traslados",
        icon: Warehouse,
        title: "Administración de Depósitos Múltiples y Sucursales",
        description:
          "Monitorea el stock distribuido en almacén central, depósitos secundarios y sucursales comerciales. Realiza traslados de mercancía con guías de despacho y verificación en destino.",
        image: "/real-system/ui_almacenes_logistica.png",
        highlights: [
          "Control de existencias independientes por almacén y tienda",
          "Guías de traslado interno para auditoría de despacho",
          "Historial de movimientos logísticos entre sedes",
          "Valorización independiente del inventario por ubicación",
        ],
      },
      {
        id: "proveedores",
        name: "Proveedores & Compras",
        badge: "Abastecimiento",
        icon: Truck,
        title: "Directorio de Distribuidores con Pedidos por WhatsApp",
        description:
          "Administra los datos de tus mayoristas y distribuidores. Control de facturas de compra a crédito, cuentas por pagar y botón para generar y enviar pedidos directamente por WhatsApp.",
        image: "/real-system/ui_proveedores.png",
        highlights: [
          "Directorio de distribuidores mayoristas con datos de contacto",
          "Botón de Pedido directo a WhatsApp con catálogo de faltantes",
          "Cuentas por pagar con tracking de vencimiento de facturas",
          "Historial de compras y variación de costos por proveedor",
        ],
      },
    ],
  },
  {
    id: "finanzas",
    name: "Finanzas & SENIAT",
    icon: Landmark,
    badge: "GESTIÓN FISCAL Y CONTABLE",
    subModules: [
      {
        id: "fiscal",
        name: "Libros Fiscales SENIAT",
        badge: "Libros Oficiales",
        icon: FileSpreadsheet,
        title: "Libros de Compras y Ventas, IVA 16% e IGTF 3%",
        description:
          "Genera automáticamente los libros fiscales oficiales exigidos por la ley venezolana. Cálculo automático de base imponible, alícuota general de IVA, ventas exentas, retenciones e IGTF en divisas.",
        image: "/real-system/ui_gestion_fiscal_seniat.png",
        highlights: [
          "Libro de Ventas con IVA 16%, base imponible e IGTF 3% en divisas",
          "Libro de Compras con comprobantes de retención",
          "Emisión de Notas de Crédito y Débito correlativas",
          "Exportación directa a Excel/CSV lista para el contador",
        ],
      },
      {
        id: "bancos",
        name: "Bancos & Conciliación",
        badge: "Tesorería Bimonetaria",
        icon: Landmark,
        title: "Cuentas Bancarias Bimonetarias y Conciliación de Pago Móvil",
        description:
          "Control total de saldos en bolívares (Banesco, Mercantil, BDV) y divisas (Zelle, cuentas internacionales, Binance USDT y gavetas de efectivo). Cruza lotes de Pago Móvil y puntos de venta para evitar pérdidas.",
        image: "/real-system/ui_bancos_tesoreria.png",
        highlights: [
          "Saldos bimonetarios en tiempo real por cada cuenta y banco",
          "Conciliación de lotes de Pago Móvil y transacciones POS",
          "Auditoría de egresos operativos y transferencias entre cuentas",
          "Arqueo de bóveda y custodia de divisas en efectivo",
        ],
      },
      {
        id: "fiados",
        name: "Clientes & Cuentas por Cobrar",
        badge: "Radar de Cobranza",
        icon: Users,
        title: "Directorio de Clientes, Límites de Crédito y Cobranzas",
        description:
          "Protege tu flujo de caja sin perder clientes. Asigna límites de crédito individualizados, consulta saldos adeudados en dólares, envía estados de cuenta por WhatsApp y registra abonos mixtos.",
        image: "/real-system/ui_cuentas_por_cobrar.png",
        highlights: [
          "Directorio de clientes con Cédula / RIF, teléfono y dirección",
          "Límites de crédito personalizados para evitar sobreendeudamiento",
          "Radar de Cobranza inteligente para seguimiento de cuentas vencidas",
          "Historial cronológico de abonos en dólares y bolívares",
        ],
      },
      {
        id: "inteligencia",
        name: "Reportes Gerenciales & Ganancia",
        badge: "Control Financiero",
        icon: TrendingUp,
        title: "Análisis de Rentabilidad y Ganancia Neta en Tiempo Real",
        description:
          "Toma decisiones con datos exactos: ingresos totales, ganancia neta, margen por categoría de productos, horas de mayor venta y proyecciones comerciales para tu negocio.",
        image: "/real-system/ui_inteligencia_pl.png",
        highlights: [
          "Cálculo automático de ganancia neta y margen por producto",
          "Reportes de ventas por día, semana, mes y turno de caja",
          "Horas pico de mayor afluencia de clientes para optimizar turnos",
          "Resumen visual para dueños y gerentes de negocio",
        ],
      },
    ],
  },
  {
    id: "seguridad",
    name: "Seguridad & Automatización",
    icon: ShieldCheck,
    badge: "CONTROL Y PROTECCIÓN",
    subModules: [
      {
        id: "importador",
        name: "Carga Automática de Facturas",
        badge: "Ahorro de Tiempo",
        icon: BrainCircuit,
        title: "Actualización Rápida de Costos desde Facturas de Proveedores",
        description:
          "Actualiza cientos de precios en segundos. Sube una factura en PDF o foto de tu proveedor (Empresas Polar, Nestlé, droguerías) y el sistema extrae automáticamente los códigos, bultos y costos.",
        image: "/real-system/ui_importador_ia.png",
        highlights: [
          "Lectura rápida de precios desde facturas en PDF o fotos",
          "Escaneo directo desde foto, escáner o archivo",
          "Asociación automática de proveedor y productos de inventario",
          "Actualización de costos con un solo clic protegiendo tus márgenes",
        ],
      },
      {
        id: "kiosk",
        name: "Modo Cajero Seguro (Anti-Trampas)",
        badge: "Control de Acceso",
        icon: ShieldCheck,
        title: "Bloqueo de Seguridad para Cajeros y Empleados de Mostrador",
        description:
          "Evita que los cajeros abran internet, juegos u otras ventanas en la computadora. Solo pueden operar la pantalla de venta autorizada y no pueden borrar ni alterar datos sin la clave del supervisor.",
        image: "/real-system/ui_auditoria_sistema.png",
        highlights: [
          "Bloqueo de accesos y salidas no autorizadas de la pantalla de cobro",
          "Permisos restringidos para cajeros con clave de supervisor",
          "Registro completo de cada movimiento y anulación con hora exacta",
          "Protección total del dinero en caja y las ventas registradas",
        ],
      },
      {
        id: "sincronizacion",
        name: "Ventas Sin Internet y Respaldos",
        badge: "100% Offline",
        icon: Database,
        title: "Tus Ventas y Datos Seguros en tu Propia Computadora",
        description:
          "Toda la información de tu negocio se guarda en tu propio equipo. Si se cae el internet o falla la señal, sigues cobrando a máxima velocidad. Respaldo de seguridad en pendrive USB con 1 solo clic.",
        image: "/real-system/ui_sincronizacion_sqlite.png",
        highlights: [
          "Factura y cobra sin depender de conexión a internet",
          "Tus datos son 100% privados y se quedan en tu negocio",
          "Copia de seguridad en pendrive USB en 1 clic para no perder nada",
          "Sincronización automática entre las computadoras y cajas del local",
        ],
      },
      {
        id: "ajustes",
        name: "Ajustes y Personalización",
        badge: "Configuración Fácil",
        icon: Settings,
        title: "Configuración de Moneda, Periféricos y Apariencia",
        description:
          "Personaliza completamente tu Isaac POS: datos fiscales de tu negocio (RIF), impresoras de ticket térmicas, apariencia visual clara u oscura y tamaño de texto.",
        image: "/real-system/ui_configuracion_multimoneda.png",
        highlights: [
          "Configuración de tasa BCV automática o ajuste manual",
          "Modo visual Claro y Oscuro para el confort del cajero",
          "Ajustes de encabezado y pie de ticket con tu logo",
          "Conexión rápida con impresoras de ticket, gavetas y lectores",
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>INTERFAZ EJECUTIVA REAL • CERO MAQUETAS FICTICIAS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Conoce el Sistema Real por Dentro
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Diseñado para operar con velocidad extrema. Explora los 4 pilares operativos de Isaac POS.
          </p>
        </div>

        {/* 1. Selector Maestro de los 4 Pilares (Pestañas Principales) */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = activePillarId === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => handlePillarChange(pillar.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 scale-102"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:text-slate-900 hover:bg-slate-200"
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

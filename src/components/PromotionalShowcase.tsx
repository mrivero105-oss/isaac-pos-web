"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Monitor,
  Wifi,
  Sparkles,
  Zap,
  TrendingUp,
  Receipt,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Share2,
  Eye,
  Maximize2,
} from "lucide-react";

export const PromotionalShowcase: React.FC = () => {
  const [selectedPreview, setSelectedPreview] = useState<string>("pos");

  const promoCards = [
    {
      id: "pos",
      badge: "TERMINAL DE VENTAS EXPRESS",
      title: "Cobro Táctil Dual USD / Bs.S en 2 Segundos",
      description:
        "Diseñado para bodegas, supermercados, farmacias y comercios de alto flujo. El cajero busca con F4, escanea con código de barra o selecciona la foto del producto. El cálculo de tasa BCV es automático y transparente.",
      image: "/real-system/ui_terminal_ventas.png",
      tag: "F2: Cobro Rápido",
      stats: "2.4 seg por cliente",
    },
    {
      id: "bcv",
      badge: "MULTIMONEDA AUTOMÁTICA",
      title: "Sincronización Oficial BCV en Tiempo Real",
      description:
        "Protege tu margen de ganancia contra la devaluación. Isaac POS actualiza la tasa oficial del Banco Central de Venezuela en segundo plano y recalcula todos tus precios en bolívares al instante.",
      image: "/real-system/ui_configuracion_multimoneda.png",
      tag: "Tasa BCV en Vivo",
      stats: "100% Automatizado",
    },
    {
      id: "ia",
      badge: "MOTOR FLASH ENGINE IA",
      title: "Importador Inteligente de Catálogos PDF",
      description:
        "¿Recibiste la lista de precios de Empresas Polar, Nestlé o Vatel en PDF? Suéltala en el importador: la IA de Gemini extrae descripciones, empaques, bultos y costos mayoristas sin digitar nada a mano.",
      image: "/real-system/ui_importador_ia.png",
      tag: "Gemini Flash AI",
      stats: "Ahorra 15h semanales",
    },
    {
      id: "dashboard",
      badge: "INTELIGENCIA EMPRESARIAL",
      title: "Dashboard de Ganancia Neta y Flujo de Caja",
      description:
        "Conoce tu rentabilidad real después de descontar el costo de la mercancía y los gastos operativos del negocio. Gráficos de Ventas vs Utilidad y ticket promedio accesibles en cualquier momento.",
      image: "/real-system/ui_dashboard_reportes.png",
      tag: "Métricas Reales",
      stats: "+32% Margen Operativo",
    },
    {
      id: "fiados",
      badge: "CONTROL DE CRÉDITO Y FIADOS",
      title: "Cuentas por Cobrar Indexadas en Divisas",
      description:
        "Otorga crédito con total tranquilidad. Asigna límites máximos a clientes de confianza, registra abonos parciales y envía recordatorios de cobro directamente a WhatsApp con el monto indexado.",
      image: "/real-system/ui_cuentas_por_cobrar.png",
      tag: "Cero Deudas Olvidadas",
      stats: "Recupera tu Capital",
    },
    {
      id: "inventario",
      badge: "KARDEX & MULTI-ALMACÉN",
      title: "Control de Stock con Alertas de Quiebre",
      description:
        "Supervisa existencias mínimas en tiempo real, traslados entre depósitos y almacenes, y genera catálogos completos en PDF con tus fotos de producto para tus clientes mayoristas.",
      image: "/real-system/ui_control_inventario.png",
      tag: "Kardex Automatizado",
      stats: "0% Pérdidas de Mercancía",
    },
  ];

  const currentCard = promoCards.find((c) => c.id === selectedPreview) || promoCards[0];

  return (
    <section id="promociones" className="py-24 relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Principal de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4 shadow-inner">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Imágenes y Pantallas Reales de Isaac POS V24.04</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Así es como se ve la tecnología de vanguardia en tu mostrador
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Todo lo que ves aquí proviene de la versión oficial de producción de <strong className="text-white">Isaac POS</strong>. Cero conceptos imaginarios: software probado en bodegas, minimarkets y tiendas comerciales de alto volumen.
          </p>
        </div>

        {/* Gran Banner Promocional de la Experiencia Real */}
        <div className="relative rounded-3xl bg-slate-900/90 border-2 border-slate-700/80 p-6 sm:p-10 lg:p-12 mb-16 shadow-2xl overflow-hidden">
          {/* Luz ambiental azul/cian */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Texto y Métricas del Módulo Seleccionado (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-cyan-500/30 overflow-hidden shrink-0 shadow-md">
                  <img
                    src="/isaac-icon-3d.png"
                    alt="Isaac POS Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                    {currentCard.badge}
                  </span>
                  <span className="text-sm font-semibold text-slate-400">
                    Isaac POS V24.04 Enterprise
                  </span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {currentCard.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentCard.description}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 mb-1">Capacidad Clave</div>
                  <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{currentCard.tag}</span>
                  </div>
                </div>
                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 mb-1">Impacto Directo</div>
                  <div className="text-sm font-bold text-cyan-400 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    <span>{currentCard.stats}</span>
                  </div>
                </div>
              </div>

              {/* Botones de navegación rápida */}
              <div className="flex flex-wrap gap-2 pt-2">
                {promoCards.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedPreview(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      selectedPreview === c.id
                        ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20"
                        : "bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-750"
                    }`}
                  >
                    {c.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Ventana de Pantalla Real con Header del Software (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl bg-slate-950 border-2 border-slate-700/80 p-2 shadow-2xl overflow-hidden group">
                {/* Header idéntico al de Isaac POS */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 mb-2 text-xs font-mono text-slate-400 bg-slate-900/80 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                    <span className="ml-2 text-slate-200 font-bold text-[11px]">
                      ISAAC POS • Bodega Sigfrido
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 text-[11px] font-bold">
                      1 USD = 490,00 Bs.S (BCV)
                    </span>
                    <span className="text-cyan-400 text-[10px] hidden sm:inline">
                      ● WiFi Sync OK
                    </span>
                  </div>
                </div>

                {/* Imagen del Sistema Real */}
                <div className="relative rounded-xl overflow-hidden bg-slate-900 shadow-inner">
                  <img
                    src={currentCard.image}
                    alt={currentCard.title}
                    className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold">
                    CAPTURADO DE SOFTWARE REAL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cuadrícula de 3 Pilares Reales que diferencian a Isaac POS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pilar 1: Modo Offline & WiFi Sync */}
          <div className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all hover:bg-slate-900 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-700/50 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 transition-transform">
              <Wifi className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
              INDEPENDENCIA TOTAL DE INTERNET
            </span>
            <h4 className="text-lg font-bold text-white mt-1 mb-3">
              Sincronización WiFi Local (PC + Tablet)
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              No dependas de que CANTV o la fibra funcionen. Los celulares y tablets de los pasillos se comunican directamente con la PC de la caja por la red WiFi local del negocio con SQLite nativo.
            </p>
          </div>

          {/* Pilar 2: Arqueo Ciego Anti-Fraude */}
          <div className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 transition-all hover:bg-slate-900 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold tracking-wider">
              SEGURIDAD CONTRA ROBO HORMIGA
            </span>
            <h4 className="text-lg font-bold text-white mt-1 mb-3">
              Arqueo Ciego de Caja por Turno
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              El cajero ingresa físicamente la cantidad de billetes de dólares y bolívares que tiene en la mano sin ver el monto esperado del sistema. Si falta un solo centavo, el dueño recibe la alerta de inmediato.
            </p>
          </div>

          {/* Pilar 3: Despacho por WhatsApp */}
          <div className="bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-6 transition-all hover:bg-slate-900 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-700/50 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-105 transition-transform">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono uppercase text-indigo-400 font-bold tracking-wider">
              AHORRO EN PAPEL Y FIDELIZACIÓN
            </span>
            <h4 className="text-lg font-bold text-white mt-1 mb-3">
              Tickets y Notas de Entrega a WhatsApp
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Despacha el comprobante digital directo al número de WhatsApp del cliente con un solo toque, ahorrando rollos de papel térmico y creando un canal directo de contacto para fidelizar tus ventas.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Monitor,
  Wifi,
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
        "Diseñado para bodegas, supermercados, farmacias y comercios de alto flujo. Catálogo visual con fotos, 14+ categorías, filtros por POPULARES, OFERTAS y NUEVOS. Tasa BCV automática en pantalla.",
      image: "/real-system/ui_terminal_ventas_dark.png",
      tag: "F2: Cobro Rápido",
      stats: "2.4 seg por cliente",
    },
    {
      id: "fiscal",
      badge: "GESTIÓN FISCAL SENIAT",
      title: "Libros de Compras y Ventas Oficiales con IVA e IGTF",
      description:
        "Genera automáticamente los libros fiscales exigidos por el SENIAT. IVA 16%, base imponible, alícuota, ventas exentas, IGTF 3% en divisas, Notas de Crédito y comprobantes de retención listos para declarar.",
      image: "/real-system/ui_gestion_fiscal_seniat.png",
      tag: "SENIAT Compliant",
      stats: "Libros 100% Automatizados",
    },
    {
      id: "inteligencia",
      badge: "BUSINESS INTELLIGENCE",
      title: "Análisis de Rentabilidad P&L y Métricas Ejecutivas",
      description:
        "Módulo gerencial con Profit & Loss, márgenes de utilidad por categoría, mapa de calor de intensidad horaria, proyecciones de ventas y exportación de reportes para la junta directiva.",
      image: "/real-system/ui_inteligencia_pl.png",
      tag: "Inteligencia P&L",
      stats: "Márgenes en Tiempo Real",
    },
    {
      id: "dashboard",
      badge: "REPORTES GENERALES",
      title: "Dashboard de Métricas en Vivo y Stock Crítico",
      description:
        "Toma decisiones con números exactos. Ingresos totales, ganancia neta, ticket promedio, margen bruto, mapa de calor por turnos horarios y alertas automáticas de inventario agotado.",
      image: "/real-system/ui_dashboard_reportes.png",
      tag: "Live Analytics",
      stats: "Alertas en Tiempo Real",
    },
    {
      id: "importador",
      badge: "IMPORTADOR CON IA",
      title: "Actualiza Costos desde Facturas PDF con Inteligencia Artificial",
      description:
        "Arrastra una factura de tu proveedor y el motor de IA extrae automáticamente los precios. Escanea desde impresora, webcam o archivo. Actualización masiva de costos en segundos.",
      image: "/real-system/ui_importador_ia.png",
      tag: "Inteligencia Artificial",
      stats: "100s de productos/minuto",
    },
    {
      id: "inventario",
      badge: "CONTROL DE STOCK POSTGRESQL",
      title: "Inventario Masivo con 1.200+ SKUs y Alertas de Reposición",
      description:
        "Supervisa existencias en tiempo real con Kardex inteligente. Fotos reales, código de barras, precios duales (USD/Bs), stock mínimo, proveedor asignado, modo farmacia y valorización total del almacén.",
      image: "/real-system/ui_control_inventario.png",
      tag: "PostgreSQL + SQLite",
      stats: "1.200+ Productos en Vivo",
    },
  ];

  const currentCard = promoCards.find((c) => c.id === selectedPreview) || promoCards[0];

  return (
    <section id="promociones" className="py-24 relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Principal de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
                      ISAAC POS • Supermercado Demo
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

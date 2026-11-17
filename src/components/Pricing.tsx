"use client";

import React, { useState } from "react";
import {
  Check,
  X as XIcon,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Coins,
  Layers,
} from "lucide-react";

interface PricingProps {
  onOpenModal: (plan?: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenModal }) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [showMatrix, setShowMatrix] = useState<boolean>(false);

  const comparisonCategories = [
    {
      name: "Operación de Mostrador & Ventas",
      features: [
        {
          name: "Terminales de caja activas",
          emprendedor: "1 Caja (PC o Móvil)",
          profesional: "Hasta 3 Cajas en Red",
          vitalicia: "1 Admin + 1 Caja (+$49/caja extra)",
        },
        {
          name: "Ventas y emisión de tickets ilimitados",
          emprendedor: true,
          profesional: true,
          vitalicia: true,
        },
        {
          name: "Cobro bimonetario dual (USD y Bs a tasa BCV en vivo)",
          emprendedor: true,
          profesional: true,
          vitalicia: true,
        },
        {
          name: "Modo 100% Offline (vende sin conexión a internet)",
          emprendedor: true,
          profesional: true,
          vitalicia: true,
        },
        {
          name: "Visor de Cliente en 2da pantalla con desglose dual",
          emprendedor: false,
          profesional: true,
          vitalicia: true,
        },
        {
          name: "Ventas en espera / carritos simultáneos",
          emprendedor: "Hasta 3 pedidos",
          profesional: "Ilimitados",
          vitalicia: "Ilimitados",
        },
      ],
    },
    {
      name: "Seguridad & Blindaje de Caja",
      features: [
        {
          name: "Corte de caja estándar (Reportes X y Z)",
          emprendedor: true,
          profesional: true,
          vitalicia: true,
        },
        {
          name: "Arqueo Ciego Certificado (cajero cuenta sin ver saldo del sistema)",
          emprendedor: false,
          profesional: true,
          vitalicia: true,
        },
        {
          name: "Control de cajeros con PIN individual de seguridad",
          emprendedor: "PIN Básico",
          profesional: "Perfiles & Jerarquías",
          vitalicia: "Perfiles & Jerarquías",
        },
        {
          name: "Auditoría de anulaciones, descuentos y aperturas de gaveta",
          emprendedor: false,
          profesional: true,
          vitalicia: true,
        },
      ],
    },
    {
      name: "Inventario, Almacenes & Kardex",
      features: [
        {
          name: "Catálogo de productos y códigos de barras",
          emprendedor: "Ilimitado",
          profesional: "Ilimitado",
          vitalicia: "Ilimitado",
        },
        {
          name: "Alertas visuales de stock mínimo y reabastecimiento",
          emprendedor: true,
          profesional: true,
          vitalicia: true,
        },
        {
          name: "Gestión multialmacén y transferencias entre depósitos",
          emprendedor: "1 Almacén único",
          profesional: "Multialmacén",
          vitalicia: "Multialmacén",
        },
        {
          name: "Kardex detallado con historial de costo y márgenes de ganancia",
          emprendedor: false,
          profesional: true,
          vitalicia: true,
        },
        {
          name: "Importación masiva de productos desde Excel (.xlsx)",
          emprendedor: "Guía paso a paso",
          profesional: "Asistida por AnyDesk",
          vitalicia: "Realizada por un Ingeniero 1 a 1",
        },
      ],
    },
    {
      name: "Hardware & Compatibilidad de Periféricos",
      features: [
        {
          name: "Impresoras térmicas ESC/POS (58mm y 80mm vía USB/Red/Bluetooth)",
          emprendedor: true,
          profesional: true,
          vitalicia: true,
        },
        {
          name: "Lectores de código de barras 1D y 2D (QR)",
          emprendedor: true,
          profesional: true,
          vitalicia: true,
        },
        {
          name: "Apertura automática de gaveta de dinero (puerto RJ11)",
          emprendedor: true,
          profesional: true,
          vitalicia: true,
        },
        {
          name: "Integración con balanzas electrónicas (puerto RS232 / USB)",
          emprendedor: false,
          profesional: true,
          vitalicia: true,
        },
      ],
    },
    {
      name: "Licenciamiento, Datos & Soporte Humano",
      features: [
        {
          name: "Modelo de inversión y recurrencia",
          emprendedor: "Suscripción mensual/anual",
          profesional: "Suscripción mensual/anual",
          vitalicia: "Pago Único Perpetuo (Sin rentas futuras)",
        },
        {
          name: "Propiedad de la base de datos (Motor SQLite local)",
          emprendedor: "100% Local en tu equipo",
          profesional: "100% Local en tu equipo",
          vitalicia: "100% Local bajo tu custodia perpetua",
        },
        {
          name: "Instalación y configuración de impresoras",
          emprendedor: "Manual & Vídeos",
          profesional: "Remota vía AnyDesk",
          vitalicia: "Remota 1 a 1 vía AnyDesk incluida",
        },
        {
          name: "Canal de soporte y tiempo de respuesta",
          emprendedor: "WhatsApp Comercial",
          profesional: "Prioritario WhatsApp & AnyDesk",
          vitalicia: "Mesa Técnica VIP AnyDesk & WhatsApp",
        },
        {
          name: "Garantía de satisfacción de 30 días",
          emprendedor: true,
          profesional: true,
          vitalicia: true,
        },
      ],
    },
  ];

  return (
    <section id="precios" className="py-16 sm:py-20 relative bg-white/65 dark:bg-slate-950/85 backdrop-blur-[2px] border-t border-blue-100/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Principal */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-blue-800 dark:text-slate-200 text-xs font-mono font-bold mb-3 shadow-2xs">
            <Coins className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>INVERSIÓN CLARA · SIN COMISIONES OCULTAS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            Planes transparentes para cada etapa de tu comercio.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
            Elige suscripción mensual o anual para soporte continuo, o adquiere la <strong className="text-slate-950 dark:text-white font-semibold">Licencia Vitalicia Perpetua</strong> en un único pago para ser dueño absoluto de tu sistema sin pagar rentas mensuales jamás.
          </p>

          {/* Selector de Ciclo de Facturación */}
          <div className="inline-flex items-center bg-blue-100/70 dark:bg-slate-900 p-1.5 rounded-2xl border border-blue-200 dark:border-slate-800 shadow-inner">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-white dark:bg-slate-800 text-blue-950 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              Facturación Mensual
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                billingCycle === "yearly"
                  ? "bg-slate-950 dark:bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              <span>Facturación Anual</span>
              <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-mono font-black uppercase tracking-wider">
                Ahorra 2 Meses
              </span>
            </button>
          </div>

          <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
            Facturado en USD o en Bolívares (Bs.) a la tasa oficial del BCV del día.
          </div>
        </div>

        {/* 3 Tarjetas de Precios Compactas (4 Puntos Clave por Plan) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-8">
          
          {/* Plan 1: Emprendedor */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md transition-all relative">
            <div>
              <div className="flex justify-between items-start mb-3 gap-2">
                <div>
                  <h3 className="text-lg font-black text-slate-950 dark:text-white">Plan Emprendedor</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">1 Caja Individual</p>
                </div>
                <span className="text-[10px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md font-bold shrink-0">
                  1 TERMINAL
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-100 dark:border-slate-800 mb-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-950 dark:text-white font-mono tabular-nums">
                    ${billingCycle === "yearly" ? "9.90" : "12"}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs font-mono">USD / mes</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {billingCycle === "yearly" ? "$99 USD/año · Ahorras $45" : "Sin permanencia forzosa"}
                </div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>1 Terminal activa</strong> en Windows o Android.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Cobro dual USD / Bs</strong> a tasa BCV en vivo.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Modo 100% Offline</strong> + Impresión térmica 58/80mm.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Catálogo ilimitado y Corte de Caja X/Z.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenModal(billingCycle === "yearly" ? "basico_anual" : "basico_mensual")}
              className="mt-6 w-full py-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 hover:border-slate-950 dark:hover:border-blue-500 hover:bg-slate-950 dark:hover:bg-blue-600 hover:text-white text-slate-900 dark:text-white font-bold text-xs sm:text-sm transition-all text-center cursor-pointer"
            >
              Comenzar con Emprendedor
            </button>
          </div>

          {/* Plan 2: Profesional */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 flex flex-col justify-between relative shadow-2xl ring-1 ring-blue-500/40 border-2 border-blue-600/60 transition-all">
            <div>
              <div className="flex justify-between items-start mb-3 gap-2">
                <div>
                  <h3 className="text-lg font-black text-white">Plan Profesional</h3>
                  <p className="text-xs text-blue-300/80">Multi-Caja & Control Estricto</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-300 bg-blue-950 border border-blue-600/40 px-2 py-0.5 rounded-md shrink-0">
                  HASTA 3 CAJAS
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-blue-500/30 mb-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-white font-mono tabular-nums">
                    ${billingCycle === "yearly" ? "19" : "24"}
                  </span>
                  <span className="text-slate-400 text-xs font-mono">USD / mes</span>
                </div>
                <div className="text-[11px] text-blue-400 mt-0.5 font-medium">
                  {billingCycle === "yearly" ? "$190 USD/año · Ahorras $98" : "Sin cláusulas forzosas"}
                </div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Hasta 3 Cajas en Red Local</strong> + Balanzas USB/RS232.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Arqueo Ciego Certificado</strong> anti-faltantes de caja.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Visor de Cliente en 2da pantalla</strong> con QR Pago Móvil.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Inventario Multialmacén</strong> + Instalación AnyDesk 1 a 1.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenModal(billingCycle === "yearly" ? "pro_anual" : "pro_mensual")}
              className="mt-6 w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Elegir Plan Profesional</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Plan 3: Licencia Vitalicia */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md transition-all relative">
            <div>
              <div className="flex justify-between items-start mb-3 gap-2">
                <div>
                  <h3 className="text-lg font-black text-slate-950 dark:text-white">Licencia Vitalicia</h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">1 Admin + 1 Caja Incluida</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 rounded-md shrink-0">
                  PAGO ÚNICO
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 mb-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-950 dark:text-white font-mono tabular-nums">
                    $199
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 text-xs font-mono">USD (Pago Único)</span>
                </div>
                <div className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-0.5 font-semibold">
                  Sin mensualidades ni anualidades de por vida
                </div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-950 dark:text-white">1 Admin + 1 Caja de por vida</strong> (+$49/caja extra).</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-950 dark:text-white">Los 13 módulos activados</strong> (Arqueo, Visor QR, Kardex).</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-950 dark:text-white">Base de datos SQLite 100% propia</strong> en tu equipo.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-950 dark:text-white">Instalación AnyDesk + Migración Excel</strong> incluida.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenModal("vitalicia")}
              className="mt-6 w-full py-3 rounded-xl bg-slate-950 dark:bg-emerald-600 hover:bg-slate-900 dark:hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all text-center cursor-pointer"
            >
              Comprar Licencia Vitalicia
            </button>
          </div>

        </div>

        {/* Botón para Desplegar la Matriz Comparativa Detallada */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowMatrix(!showMatrix)}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{showMatrix ? "Ocultar comparativa detallada de características" : "Ver comparativa detallada de características (todos los puntos)"}</span>
            {showMatrix ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Tabla / Matriz Comparativa Detallada Desplegable */}
        {showMatrix && (
          <div className="mb-20 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all">
            <div className="p-6 sm:p-8 bg-slate-950 text-white border-b border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold">
                    AUDITORÍA & ESPECIFICACIONES
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    Matriz Comparativa de Capacidades Técnicas
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Transparencia absoluta: conoce punto a punto qué incluye cada plan antes de tomar tu decisión.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Garantía de Satisfacción 30 Días</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-[11px] sm:text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6 w-2/5">Característica / Módulo</th>
                    <th className="py-4 px-6 w-1/5 text-center text-slate-900 dark:text-white">Emprendedor</th>
                    <th className="py-4 px-6 w-1/5 text-center text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/40">Profesional</th>
                    <th className="py-4 px-6 w-1/5 text-center text-emerald-800 dark:text-emerald-400">Vitalicia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs sm:text-sm">
                  {comparisonCategories.map((category, catIndex) => (
                    <React.Fragment key={catIndex}>
                      {/* Cabecera de Categoría */}
                      <tr className="bg-slate-100/70 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800">
                        <td colSpan={4} className="py-3 px-6 font-bold text-xs text-slate-900 dark:text-white uppercase font-mono tracking-wider">
                          {category.name}
                        </td>
                      </tr>
                      {/* Filas de características */}
                      {category.features.map((feat, fIndex) => (
                        <tr key={fIndex} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-6 font-medium text-slate-800 dark:text-slate-200">
                            {feat.name}
                          </td>
                          
                          {/* Emprendedor */}
                          <td className="py-3.5 px-6 text-center text-slate-600 dark:text-slate-400">
                            {typeof feat.emprendedor === "boolean" ? (
                              feat.emprendedor ? (
                                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto" />
                              ) : (
                                <XIcon className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                              )
                            ) : (
                              <span className="font-semibold text-slate-700 dark:text-slate-300">{feat.emprendedor}</span>
                            )}
                          </td>

                          {/* Profesional */}
                          <td className="py-3.5 px-6 text-center text-slate-900 dark:text-white bg-blue-50/20 dark:bg-blue-950/20 font-semibold">
                            {typeof feat.profesional === "boolean" ? (
                              feat.profesional ? (
                                <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto" />
                              ) : (
                                <XIcon className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                              )
                            ) : (
                              <span className="text-blue-700 dark:text-blue-300 font-bold">{feat.profesional}</span>
                            )}
                          </td>

                          {/* Vitalicia */}
                          <td className="py-3.5 px-6 text-center text-slate-900 dark:text-white font-semibold">
                            {typeof feat.vitalicia === "boolean" ? (
                              feat.vitalicia ? (
                                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto" />
                              ) : (
                                <XIcon className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                              )
                            ) : (
                              <span className="text-emerald-800 dark:text-emerald-400 font-bold">{feat.vitalicia}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                ¿Necesitas una configuración especial para más de 3 cajas o múltiples sucursales?
              </div>
              <button
                onClick={() => onOpenModal("demo_gratis")}
                className="px-5 py-2.5 rounded-xl bg-slate-950 dark:bg-blue-600 text-white text-xs font-bold hover:bg-slate-900 dark:hover:bg-blue-500 transition-all cursor-pointer"
              >
                Solicitar Asesoría para Sucursales ➔
              </button>
            </div>
          </div>
        )}

        {/* Tira Compacta de Garantía & Formas de Pago */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200 font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              <strong className="text-slate-950 dark:text-white">Garantía de Satisfacción de 30 Días:</strong> Reembolso del 100% si no agiliza tus cobros.
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-mono text-[11px] shrink-0">
            <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>Pago Móvil (Tasa BCV) • Zelle • Binance USDT</span>
          </div>
        </div>

      </div>
    </section>
  );
};

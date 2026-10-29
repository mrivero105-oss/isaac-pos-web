"use client";

import React, { useState } from "react";
import {
  Check,
  X as XIcon,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  HelpCircle,
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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

  const pricingFaqs = [
    {
      question: "¿Cobran algún porcentaje o comisión sobre mis ventas o cobros?",
      answer:
        "Absolutamente no. Isaac POS es un software de gestión comercial, no una pasarela de pago que descuenta comisiones. El 100% de lo que facturas y cobras en tu mostrador (sea en efectivo, Pago Móvil, Zelle o tarjeta) ingresa íntegro a tu negocio.",
    },
    {
      question: "¿Cómo funciona exactamente la Licencia Vitalicia? ¿Cuántas cajas incluye?",
      answer:
        "La Licencia Vitalicia es una adquisición definitiva en un pago único de $199 USD. Incluye de base 1 Usuario Administrador (para gestión de costos, inventario, reportes y configuración) y 1 Terminal de Caja activa para el cajero. Si tu local cuenta con más puntos de cobro en simultáneo, puedes adquirir licencias para cajas o usuarios adicionales en red local por un pago único de solo $49 USD por cada caja, sin mensualidades ni cargos de renovación futuros jamás.",
    },
    {
      question: "¿Qué ocurre si en mi zona comercial se corta la luz o se cae el internet?",
      answer:
        "Isaac POS continúa funcionando al 100%. Su motor nativo opera sobre una base de datos local SQLite instalada directamente en tu computadora o dispositivo. Puedes registrar productos, cobrar en dólares o bolívares a la tasa que guardaste, imprimir recibos térmicos y abrir la gaveta sin depender de que haya internet.",
    },
    {
      question: "¿Puedo pagar en Bolívares y qué tasa se utiliza?",
      answer:
        "Sí. Aceptamos transferencias bancarias nacionales y Pago Móvil. La conversión se realiza de forma estricta y transparente a la tasa oficial del Banco Central de Venezuela (BCV) del día en que realizas el pago, sin sobreprecios ni comisiones bancarias adicionales.",
    },
    {
      question: "¿Cómo me ayudan a pasar mis productos si ya tengo una lista en Excel?",
      answer:
        "No tienes que transcribir nada a mano. Si eliges el Plan Profesional o la Licencia Vitalicia, un especialista técnico de Isaac POS se conectará contigo mediante AnyDesk, adaptará las columnas de tu archivo Excel (.xlsx o .csv) e importará automáticamente tu inventario con precios, códigos de barra y stock inicial.",
    },
  ];

  return (
    <section id="precios" className="py-24 relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Principal */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 border border-slate-300 text-slate-800 text-xs font-mono font-semibold mb-3">
            <Coins className="w-3.5 h-3.5 text-blue-600" />
            <span>INVERSIÓN CLARA · SIN COMISIONES OCULTAS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
            Planes transparentes para cada etapa de tu comercio.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
            Elige suscripción mensual o anual para soporte continuo, o adquiere la <strong className="text-slate-950 font-semibold">Licencia Vitalicia Perpetua</strong> en un único pago para ser dueño absoluto de tu sistema sin pagar rentas mensuales jamás.
          </p>

          {/* Selector de Ciclo de Facturación */}
          <div className="inline-flex items-center bg-slate-200/90 p-1.5 rounded-2xl border border-slate-300 shadow-inner">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Facturación Mensual
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                billingCycle === "yearly"
                  ? "bg-slate-950 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <span>Facturación Anual</span>
              <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-mono font-black uppercase tracking-wider">
                Ahorra 2 Meses
              </span>
            </button>
          </div>

          <div className="mt-3 text-xs text-slate-500 font-medium">
            Facturado en USD o en Bolívares (Bs.) a la tasa oficial del BCV del día.
          </div>
        </div>

        {/* 3 Tarjetas de Precios con Arquitectura Visual de Alto Nivel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          
          {/* Plan 1: Emprendedor */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-300 shadow-xs hover:shadow-md transition-all relative">
            <div>
              <div className="flex justify-between items-start mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-black text-slate-950 whitespace-nowrap">Plan Emprendedor</h3>
                  <p className="text-xs text-slate-500 mt-1">1 Caja Individual</p>
                </div>
                <span className="text-[10px] font-mono text-slate-700 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md font-bold shrink-0">
                  1 TERMINAL
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Ideal para bodegas, panaderías, tiendas de ropa o kioscos atendidos por su dueño que requieren rapidez en caja y cobro bimonetario sin complicaciones.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black text-slate-950 font-mono tabular-nums">
                    ${billingCycle === "yearly" ? "9.90" : "12"}
                  </span>
                  <span className="text-slate-500 text-xs font-mono">USD / mes</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {billingCycle === "yearly" ? "Facturado anualmente ($99 USD/año) · Ahorras $45" : "Sin compromiso de permanencia a largo plazo"}
                </div>
              </div>

              {/* Lo que incluye */}
              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  ¿Qué incluye exactamente?
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>1 Terminal activa</strong> en Computadora (Windows) o Android.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Ventas y tickets ilimitados</strong> sin cobro de comisiones.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Cobro dual simultáneo</strong> (USD y Bs a tasa BCV en vivo).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Modo 100% Offline</strong>: vende sin internet sin congelamientos.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Impresión térmica ESC/POS de 58mm y 80mm vía USB.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Corte de caja estándar (Reporte X y Z del turno).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Catálogo ilimitado con lector de código de barras.</span>
                </div>
                
                {/* Lo que no incluye con honestidad */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-slate-400 text-xs">
                  <div className="flex items-center gap-2">
                    <XIcon className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    <span>Sin Arqueo Ciego Certificado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XIcon className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    <span>Sin Visor de Cliente en 2da pantalla</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XIcon className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    <span>1 solo almacén (sin kardex multidepósito)</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenModal(billingCycle === "yearly" ? "basico_anual" : "basico_mensual")}
              className="mt-8 w-full py-3.5 rounded-xl border-2 border-slate-300 hover:border-slate-950 hover:bg-slate-950 hover:text-white text-slate-900 font-bold text-xs sm:text-sm transition-all text-center cursor-pointer"
            >
              Comenzar con Emprendedor
            </button>
          </div>

          {/* Plan 2: Profesional (El más elegido - Diseño de Ingeniería Premium) */}
          <div className="bg-slate-950 text-white rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl ring-1 ring-blue-500/40 border-2 border-blue-600/60 transition-all">
            <div>
              <div className="flex justify-between items-start mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-black text-white whitespace-nowrap">Plan Profesional</h3>
                  <p className="text-xs text-blue-300/80 mt-1">Multi-Caja & Control Estricto</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-300 bg-blue-950 border border-blue-600/40 px-2 py-1 rounded-md shrink-0">
                  HASTA 3 CAJAS
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Diseñado para minimarkets, bodegones, farmacias, ferreterías y comercios con empleados en caja que exigen <strong className="text-white">Arqueo Ciego anti-robo</strong> y control multi-terminal en red local.
              </p>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-500/30 mb-6">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black text-white font-mono tabular-nums">
                    ${billingCycle === "yearly" ? "19" : "24"}
                  </span>
                  <span className="text-slate-400 text-xs font-mono">USD / mes</span>
                </div>
                <div className="text-[11px] text-blue-400 mt-1 font-medium">
                  {billingCycle === "yearly" ? "Facturado anualmente ($190 USD/año) · Ahorras $98" : "Flexibilidad mensual sin cláusulas forzosas"}
                </div>
              </div>

              {/* Lo que incluye */}
              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-200">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400 mb-2">
                  Todo lo del Plan Emprendedor, más:
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Hasta 3 Cajas en Red Local (LAN/WiFi)</strong> sin requerir internet externo.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Arqueo Ciego Certificado</strong>: el cajero cuenta sin ver el saldo del sistema para evitar robos hormiga.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Visor de Cliente en 2da pantalla</strong>: muestra el cálculo en tiempo real en USD y Bs.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Inventario Multialmacén</strong> con Kardex detallado y trazabilidad de costo/ganancia.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Control de cajeros con <strong className="text-white">PIN de seguridad</strong> y restricción de anulaciones.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Integración de balanzas electrónicas (puerto RS232 y USB).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Soporte prioritario 1 a 1 por AnyDesk</strong> y WhatsApp directo.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenModal(billingCycle === "yearly" ? "pro_anual" : "pro_mensual")}
              className="mt-8 w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Elegir Plan Profesional</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Plan 3: Licencia Vitalicia (Pago Único Perpetuo) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-300 shadow-xs hover:shadow-md transition-all relative">
            <div>
              <div className="flex justify-between items-start mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-black text-slate-950 whitespace-nowrap">Licencia Vitalicia</h3>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">1 Admin + 1 Caja Incluida</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-1 rounded-md shrink-0">
                  PAGO ÚNICO
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                Adquiere el sistema de forma definitiva sin suscripciones mensuales. Incluye de base 1 usuario Administrador para control gerencial y 1 Terminal de Caja activa para mostrador.
              </p>

              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 mb-5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black text-slate-950 font-mono tabular-nums">
                    $199
                  </span>
                  <span className="text-slate-600 text-xs font-mono">USD (Pago Único)</span>
                </div>
                <div className="text-[11px] text-emerald-800 mt-1 font-semibold">
                  Sin mensualidades ni anualidades forzadas de por vida
                </div>
              </div>

              {/* Aclaratoria de Cajas y Usuarios Adicionales */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                  <span>Alcance incluido de base:</span>
                  <span className="text-emerald-700 font-mono font-black">1 Admin + 1 Caja</span>
                </div>
                <div className="text-[11px] text-slate-500 leading-tight">
                  1 Administrador (reportes, costos e inventario) + 1 Cajero operativo.
                </div>
                
                <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-medium">¿Caja / usuario adicional?</span>
                  <span className="font-mono font-bold text-slate-950 bg-white px-2 py-0.5 rounded border border-slate-300">
                    +$49 USD <span className="text-[10px] text-slate-500 font-normal">pago único</span>
                  </span>
                </div>
              </div>

              {/* Lo que incluye */}
              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 mb-2">
                  Propiedad perpetua garantizada:
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-950">1 Admin + 1 Caja de cobro activa</strong> de por vida.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-950">Cajas adicionales en red local</strong>: solo +$49 USD por caja (pago único perpetuo).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-950">Todas las funciones activadas</strong>: Arqueo Ciego, 2da pantalla de cliente y Kardex.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-950">Base de datos local SQLite 100% propia</strong>: tus datos en tu disco duro, sin depender de la nube.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-950">Instalación y configuración 1 a 1 por AnyDesk</strong> + migración de catálogo desde Excel.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Actualizaciones de seguridad y estabilidad perpetuas con licencia transferible.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenModal("vitalicia")}
              className="mt-8 w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all text-center cursor-pointer"
            >
              Comprar Licencia Vitalicia
            </button>
          </div>

        </div>

        {/* Botón para Desplegar la Matriz Comparativa Detallada */}
        <div className="text-center mb-16">
          <button
            onClick={() => setShowMatrix(!showMatrix)}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 hover:text-slate-950 text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span>{showMatrix ? "Ocultar comparativa detallada de características" : "Ver comparativa detallada de características (todos los puntos)"}</span>
            {showMatrix ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Tabla / Matriz Comparativa Detallada Desplegable */}
        {showMatrix && (
          <div className="mb-20 rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm transition-all">
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
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-4 px-6 w-2/5">Característica / Módulo</th>
                    <th className="py-4 px-6 w-1/5 text-center text-slate-900">Emprendedor</th>
                    <th className="py-4 px-6 w-1/5 text-center text-blue-600 bg-blue-50/50">Profesional</th>
                    <th className="py-4 px-6 w-1/5 text-center text-emerald-800">Vitalicia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {comparisonCategories.map((category, catIndex) => (
                    <React.Fragment key={catIndex}>
                      {/* Cabecera de Categoría */}
                      <tr className="bg-slate-100/70 border-t border-slate-200">
                        <td colSpan={4} className="py-3 px-6 font-bold text-xs text-slate-900 uppercase font-mono tracking-wider">
                          {category.name}
                        </td>
                      </tr>
                      {/* Filas de características */}
                      {category.features.map((feat, fIndex) => (
                        <tr key={fIndex} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-6 font-medium text-slate-800">
                            {feat.name}
                          </td>
                          
                          {/* Emprendedor */}
                          <td className="py-3.5 px-6 text-center text-slate-600">
                            {typeof feat.emprendedor === "boolean" ? (
                              feat.emprendedor ? (
                                <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                              ) : (
                                <XIcon className="w-4 h-4 text-slate-300 mx-auto" />
                              )
                            ) : (
                              <span className="font-semibold text-slate-700">{feat.emprendedor}</span>
                            )}
                          </td>

                          {/* Profesional */}
                          <td className="py-3.5 px-6 text-center text-slate-900 bg-blue-50/20 font-semibold">
                            {typeof feat.profesional === "boolean" ? (
                              feat.profesional ? (
                                <Check className="w-4 h-4 text-blue-600 mx-auto" />
                              ) : (
                                <XIcon className="w-4 h-4 text-slate-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-blue-700 font-bold">{feat.profesional}</span>
                            )}
                          </td>

                          {/* Vitalicia */}
                          <td className="py-3.5 px-6 text-center text-slate-900 font-semibold">
                            {typeof feat.vitalicia === "boolean" ? (
                              feat.vitalicia ? (
                                <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                              ) : (
                                <XIcon className="w-4 h-4 text-slate-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-emerald-800 font-bold">{feat.vitalicia}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                ¿Necesitas una configuración especial para más de 3 cajas o múltiples sucursales?
              </div>
              <button
                onClick={() => onOpenModal("demo_gratis")}
                className="px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold hover:bg-slate-900 transition-all cursor-pointer"
              >
                Solicitar Asesoría para Sucursales ➔
              </button>
            </div>
          </div>
        )}

        {/* Bandeja de Garantía & Opciones de Pago */}
        <div className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Tarjeta 1: Garantía Blindada de 30 Días (7 columnas) */}
          <div className="md:col-span-7 bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 tracking-wider">
                    COMPROMISO SIN RIESGO
                  </span>
                  <h4 className="text-lg font-black text-slate-950 leading-tight">
                    Garantía de Satisfacción Total de 30 Días
                  </h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                Instálalo en tu negocio y ponlo a prueba con tus cajeros en horas pico. Si durante los primeros 30 días Isaac POS no agiliza tus cobros o no se adapta a tu operativa, te reembolsamos el 100% de tu dinero de inmediato.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-[11px] font-medium text-slate-700">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Cero riesgo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Reembolso directo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Sin letra chica</span>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Métodos de Pago y Facturación Multimoneda (5 columnas) */}
          <div className="md:col-span-5 bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 tracking-wider">
                  FORMAS DE PAGO ACEPTADAS
                </span>
              </div>

              <h4 className="text-base font-black text-slate-950 mb-1">
                Facturación en Divisas y Bolívares
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Cobro transparente a la tasa oficial del Banco Central de Venezuela (BCV).
              </p>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-semibold text-slate-900">Pago Móvil & Bancos Nacionales</span>
                  <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">TASA BCV</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-semibold text-slate-900">Zelle</span>
                  <span className="font-mono text-[10px] text-slate-500">Cuentas EE.UU.</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-semibold text-slate-900">Binance Pay (USDT)</span>
                  <span className="font-mono text-[10px] text-emerald-700 font-bold">QR Instantáneo</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 text-center font-mono">
              Activación inmediata tras confirmación del pago
            </div>
          </div>

        </div>

        {/* Preguntas Frecuentes sobre Precios y Licencias */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>DUDAS FRECUENTES DE COMERCIANTES</span>
            </div>
            <h3 className="text-2xl font-black text-slate-950">
              Preguntas clave sobre precios y licenciamiento
            </h3>
          </div>

          <div className="space-y-3">
            {pricingFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="text-slate-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

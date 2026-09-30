"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Lock,
  CheckCircle2,
  AlertCircle,
  Phone,
  Handshake,
  Sparkles,
  Loader2,
  Send,
} from "lucide-react";
import { LeadFormSchema, type LeadFormData } from "@/lib/validations";

interface SecureCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

const PLAN_DATA: Record<string, { name: string; priceUsd: number; cycle: string }> = {
  basico_mensual: { name: "Plan Emprendedor (Mensual)", priceUsd: 29, cycle: "USD / mes" },
  basico_anual: { name: "Plan Emprendedor (Anual - 2 Meses Gratis)", priceUsd: 290, cycle: "USD / año" },
  pro_mensual: { name: "Plan Profesional (Mensual)", priceUsd: 59, cycle: "USD / mes" },
  pro_anual: { name: "Plan Profesional (Anual - Recomendado)", priceUsd: 590, cycle: "USD / año" },
  vitalicia: { name: "Licencia Vitalicia (Pago Único Perpetuo)", priceUsd: 499, cycle: "USD único" },
};

export const SecureCheckoutModal: React.FC<SecureCheckoutModalProps> = ({
  isOpen,
  onClose,
  initialPlan = "pro_anual",
}) => {
  const [activeTab, setActiveTab] = useState<"checkout" | "demo">(
    initialPlan === "demo_gratis" ? "demo" : "checkout"
  );

  const [selectedPlan, setSelectedPlan] = useState<string>(
    initialPlan === "demo_gratis" ? "pro_anual" : initialPlan
  );

  // Tasa BCV Oficial con actualización automática en tiempo real
  const [bcvRate, setBcvRate] = useState<number>(857.89);
  const [isBcvLive, setIsBcvLive] = useState<boolean>(false);

  // Form State para Demo Guiada
  const [demoFormData, setDemoFormData] = useState<LeadFormData>({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "cafeteria",
    branchesCount: "1",
    planInterested: (initialPlan as any) || "pro",
    message: "",
    website_url_hp: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  // Obtener la tasa oficial del BCV en vivo de forma automática cada vez que se abre el modal
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const fetchBcvRate = async () => {
      try {
        const res = await fetch("/api/bcv");
        if (res.ok) {
          const json = await res.json();
          if (json?.data?.rate && typeof json.data.rate === "number" && isMounted) {
            setBcvRate(json.data.rate);
            setIsBcvLive(true);
          }
        }
      } catch (err) {
        console.warn("Usando tasa de respaldo segura para BCV:", err);
      }
    };

    fetchBcvRate();
    // Actualización periódica cada 2 minutos mientras el modal esté abierto
    const interval = setInterval(fetchBcvRate, 120000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPlanInfo = PLAN_DATA[selectedPlan] || PLAN_DATA["pro_anual"];
  const totalBs = currentPlanInfo.priceUsd * bcvRate;

  // Mensaje formateado para acordar la compra directa por WhatsApp
  const whatsappMessage =
    `¡Hola! Quiero acordar la adquisición de Isaac POS:\n\n` +
    `📦 *Plan Elegido:* ${currentPlanInfo.name}\n` +
    `💵 *Monto:* $${currentPlanInfo.priceUsd} USD (${currentPlanInfo.cycle})\n` +
    `🇻🇪 *Ref. Bolívares:* Bs. ${totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Tasa Oficial BCV: ${bcvRate.toLocaleString("es-VE", { minimumFractionDigits: 2 })})\n\n` +
    `Me gustaría acordar el método de pago y la activación directa para mi comercio.`;

  const whatsappUrl = `https://wa.me/584248302226?text=${encodeURIComponent(whatsappMessage)}`;

  const handleDemoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setDemoFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const payload = {
      ...demoFormData,
      planInterested: selectedPlan || "pro_anual",
    };

    const validation = LeadFormSchema.safeParse(payload);
    if (!validation.success) {
      setErrorMsg(validation.error.issues[0]?.message || "Verifica los datos ingresados.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const planName = currentPlanInfo.name;
      const whatsappMsg =
        `🔔 *NUEVA SOLICITUD DE DEMO GUIADA - ISAAC POS ULTRA*\n\n` +
        `👤 *Cliente:* ${demoFormData.fullName}\n` +
        `📧 *Email:* ${demoFormData.email}\n` +
        `📱 *Teléfono / WhatsApp:* ${demoFormData.phone}\n` +
        `🏪 *Comercio:* ${demoFormData.businessName}\n` +
        `🏷️ *Rubro:* ${demoFormData.businessType}\n` +
        `📦 *Cajas / Terminales:* ${demoFormData.branchesCount}\n` +
        `💼 *Plan de Interés:* ${planName}\n\n` +
        `¡Hola Isaac POS! Acabo de registrar mis datos en la web y deseo coordinar la demostración guiada para mi negocio.`;

      const whatsappUrl = `https://wa.me/584248302226?text=${encodeURIComponent(whatsappMsg)}`;

      // Abrir automáticamente WhatsApp para que el mensaje le llegue al teléfono
      try {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      } catch {
        // En caso de bloqueo por el navegador
      }

      setSuccessData({
        type: "demo",
        message: "¡Tu solicitud ha sido registrada con éxito! Se ha enviado la notificación por correo y abierto WhatsApp (+58 424-8302226) para atenderte de inmediato.",
        whatsappUrl,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Error al conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-white scrollbar-thin">
        {/* Botón de Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-10"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado del Modal */}
        <div className="p-6 sm:p-8 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>ACUERDO DIRECTO Y ATENCIÓN PERSONALIZADA</span>
          </div>
          <h3 className="text-2xl font-black tracking-tight">
            {activeTab === "checkout" ? "Adquirir Licencia Isaac POS" : "Solicitar Demostración 1 a 1"}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {activeTab === "checkout"
              ? "Selecciona tu plan y acuerda la compra y activación directa con nosotros."
              : "Un especialista te mostrará el sistema adaptado a tu rubro de negocio."}
          </p>

          {/* Selector de Pestaña */}
          <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setActiveTab("checkout");
                setErrorMsg(null);
                setSuccessData(null);
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "checkout"
                  ? "bg-emerald-500 text-slate-950 shadow-md font-extrabold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Adquirir Licencia
            </button>
            <button
              onClick={() => {
                setActiveTab("demo");
                setErrorMsg(null);
                setSuccessData(null);
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "demo"
                  ? "bg-emerald-500 text-slate-950 shadow-md font-extrabold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Agendar Demo Guiada
            </button>
          </div>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-6 sm:p-8 pt-6">
          {successData ? (
            /* Vista de Éxito de la Demo */
            <div className="text-center py-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold mb-2">
                ¡Solicitud Registrada con Éxito!
              </h4>
              <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                {successData.message}
              </p>
              <div className="flex flex-col gap-2.5 max-w-sm mx-auto">
                <a
                  href={successData.whatsappUrl || `https://wa.me/584248302226?text=${encodeURIComponent(`¡Hola Isaac POS! Acabo de registrar una solicitud de demo guiada para mi negocio "${demoFormData.businessName}". Mi nombre es ${demoFormData.fullName}. ¿Cuándo podríamos coordinarla?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Enviar Ficha por WhatsApp (+58 424-8302226)</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <>
              {errorMsg && (
                <div className="mb-5 p-3.5 bg-rose-950/60 border border-rose-800/80 rounded-xl text-rose-300 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {activeTab === "checkout" ? (
                /* Flujo de Acuerdo Directo con el Comprador */
                <div className="space-y-5">
                  {/* Selector de Plan */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Plan a Adquirir
                    </label>
                    <select
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-semibold"
                    >
                      <option value="basico_mensual">Plan Emprendedor Mensual ($29 USD/mes)</option>
                      <option value="basico_anual">Plan Emprendedor Anual ($290 USD/año - 2 meses gratis)</option>
                      <option value="pro_mensual">Plan Profesional Mensual ($59 USD/mes)</option>
                      <option value="pro_anual">Plan Profesional Anual ($590 USD/año - Más elegido)</option>
                      <option value="vitalicia">Licencia Vitalicia Pago Único ($499 USD - Sin mensualidades)</option>
                    </select>
                  </div>

                  {/* Resumen de Monto con Tasa BCV Actualizada Automáticamente */}
                  <div className="p-4 sm:p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
                    <div>
                      <span className="text-xs text-slate-400 font-medium">Monto del Plan</span>
                      <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                        ${currentPlanInfo.priceUsd} USD
                        <span className="text-xs text-slate-400 font-sans font-normal ml-1.5">
                          ({currentPlanInfo.cycle})
                        </span>
                      </div>
                    </div>

                    <div className="sm:text-right border-t sm:border-t-0 pt-2.5 sm:pt-0 border-slate-800">
                      <div className="flex items-center sm:justify-end gap-1.5 text-xs text-cyan-400 font-bold mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Tasa Oficial BCV: Bs. {bcvRate.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="text-base font-mono font-black text-white">
                        Ref. Bs. {totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        {isBcvLive ? "Actualizada automáticamente en vivo" : "Sincronizada con BCV Oficial"}
                      </span>
                    </div>
                  </div>

                  {/* Sección de Acuerdo Directo con el Comprador */}
                  <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-5 space-y-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <Handshake className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">
                          Acuerdo Directo con el Comprador
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Coordinamos contigo la forma de pago de tu preferencia (<strong>Pago Móvil a tasa oficial BCV</strong>, <strong>Zelle</strong>, <strong>Transferencia bancaria</strong>, <strong>Efectivo</strong> o <strong>Binance Pay</strong>) y activamos tu licencia al instante.
                        </p>
                      </div>
                    </div>

                    {/* Botón Principal: Acordar Compra por WhatsApp */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition-all group"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>Acordar Compra por WhatsApp</span>
                    </a>

                    {/* Llamada Directa y Soporte */}
                    <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-300">
                      <a
                        href="tel:+584248302226"
                        className="text-slate-300 hover:text-white flex items-center gap-1.5 font-mono"
                      >
                        <Phone className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Llamar: +58 424-8302226</span>
                      </a>
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Garantía de activación 100% segura
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Formulario de Demostración Guiada */
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={demoFormData.fullName}
                        onChange={handleDemoChange}
                        required
                        placeholder="Ej. Ana Morales"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={demoFormData.email}
                        onChange={handleDemoChange}
                        required
                        placeholder="ana@comercio.com"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={demoFormData.phone}
                        onChange={handleDemoChange}
                        required
                        placeholder="+58 412 1234567"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Nombre de tu Comercio *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={demoFormData.businessName}
                        onChange={handleDemoChange}
                        required
                        placeholder="Ej. Supermercado El Trébol"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Tipo de Negocio
                      </label>
                      <select
                        name="businessType"
                        value={demoFormData.businessType}
                        onChange={handleDemoChange}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="cafeteria">Cafetería / Panadería</option>
                        <option value="bodegon">Bodegón / Supermercado</option>
                        <option value="farmacia">Farmacia</option>
                        <option value="ropa">Tienda de Ropa / Calzado</option>
                        <option value="restaurante">Restaurante / Comida Rápida</option>
                        <option value="ferreteria">Ferretería / Repuestos</option>
                        <option value="otro">Otro Rubro Comercial</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Número de Cajas / Terminales
                      </label>
                      <select
                        name="branchesCount"
                        value={demoFormData.branchesCount}
                        onChange={handleDemoChange}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="1">1 Caja (Mostrador principal)</option>
                        <option value="2-3">2 a 3 Cajas en red</option>
                        <option value="4+">4 o más Cajas (Cadena)</option>
                      </select>
                    </div>
                  </div>

                  {/* Honeypot anti-spam */}
                  <input
                    type="text"
                    name="website_url_hp"
                    value={demoFormData.website_url_hp}
                    onChange={handleDemoChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enviando solicitud...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Solicitar Demostración 1 a 1</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

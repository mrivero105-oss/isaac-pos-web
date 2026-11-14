"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Lock,
  CheckCircle2,
  AlertCircle,
  Handshake,
  ShieldCheck,
  Loader2,
  Send,
  Copy,
  Check,
  ArrowLeft,
  Banknote,
  QrCode,
  CreditCard,
} from "lucide-react";
import {
  LeadFormSchema,
  CheckoutIntentSchema,
  type LeadFormData,
  type CheckoutOrderResponse,
} from "@/lib/validations";
import { useBcvRate } from "@/lib/useBcvRate";
import { trackGoogleAdsEvent } from "@/lib/gtag";

interface SecureCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

type PaymentMethodKey = "pago_movil" | "zelle" | "binance" | "card" | "acuerdo_directo";

const IS_STRIPE_ENABLED = process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true";

interface DemoSuccessData {
  type: "demo";
  message: string;
  whatsappUrl: string;
}

const PLAN_DATA: Record<string, { name: string; priceUsd: number; cycle: string }> = {
  basico_mensual: { name: "Plan Emprendedor (Mensual)", priceUsd: 12, cycle: "USD / mes" },
  basico_anual: { name: "Plan Emprendedor (Anual - 2 Meses Gratis)", priceUsd: 99, cycle: "USD / año" },
  pro_mensual: { name: "Plan Profesional (Mensual)", priceUsd: 24, cycle: "USD / mes" },
  pro_anual: { name: "Plan Profesional (Anual - Recomendado)", priceUsd: 190, cycle: "USD / año" },
  vitalicia: { name: "Licencia Vitalicia (1 Admin + 1 Caja)", priceUsd: 199, cycle: "USD único" },
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
  const [extraBoxes, setExtraBoxes] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodKey>("pago_movil");

  // Tasa BCV Oficial centralizada
  const { rate: bcvRate, isLive: isBcvLive } = useBcvRate();

  // Estados de proceso
  const [isGeneratingOrder, setIsGeneratingOrder] = useState<boolean>(false);
  const [orderResult, setOrderResult] = useState<CheckoutOrderResponse | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Form State para Demo Guiada
  const [demoFormData, setDemoFormData] = useState<LeadFormData>({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "cafeteria",
    branchesCount: "1",
    planInterested: initialPlan || "pro_anual",
    message: "",
    website_url_hp: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fallbackWhatsappUrl, setFallbackWhatsappUrl] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<DemoSuccessData | null>(null);

  // Sincronizar pestaña y plan seleccionado cada vez que se abre el modal
  useEffect(() => {
    if (!isOpen) return;
    setErrorMsg(null);
    setFallbackWhatsappUrl(null);
    setSuccessData(null);
    setOrderResult(null);
    setExtraBoxes(0);
    if (initialPlan === "demo_gratis") {
      setActiveTab("demo");
      setSelectedPlan("pro_anual");
    } else {
      setActiveTab("checkout");
      setSelectedPlan(PLAN_DATA[initialPlan] ? initialPlan : "pro_anual");
    }
  }, [isOpen, initialPlan]);

  if (!isOpen) return null;

  const currentPlanInfo = PLAN_DATA[selectedPlan] || PLAN_DATA["pro_anual"];
  const isLifetime = selectedPlan === "vitalicia";
  const finalPriceUsd = isLifetime
    ? currentPlanInfo.priceUsd + extraBoxes * 49
    : currentPlanInfo.priceUsd;
  const totalBs = finalPriceUsd * bcvRate;
  const effectivePlanTitle =
    isLifetime && extraBoxes > 0
      ? `Licencia Vitalicia (1 Admin + ${1 + extraBoxes} Cajas Activas)`
      : currentPlanInfo.name;

  // Mensaje de respaldo directo para WhatsApp
  const directWhatsappText =
    `¡Hola! Deseo coordinar la adquisición de la licencia de Isaac POS para mi negocio:\n\n` +
    `📦 *Plan Seleccionado:* ${effectivePlanTitle}\n` +
    `💵 *Inversión:* $${finalPriceUsd} USD (${currentPlanInfo.cycle})\n` +
    `🇻🇪 *Referencia en Bolívares:* Bs. ${totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Tasa Oficial BCV: ${bcvRate.toLocaleString("es-VE", { minimumFractionDigits: 2 })})\n` +
    `💳 *Método de Preferencia:* ${paymentMethod.toUpperCase().replace("_", " ")}\n\n` +
    `Agradezco me brinden la información para concretar el pago y proceder con la activación oficial.`;

  const directWhatsappUrl = `https://wa.me/584248302226?text=${encodeURIComponent(directWhatsappText)}`;

  const handleCopy = (text: string, keyName: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(keyName);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  // Generar Orden Oficial en el Backend
  const handleGenerateCheckoutOrder = async () => {
    setErrorMsg(null);
    setFallbackWhatsappUrl(null);

    const payload = {
      planId: selectedPlan,
      paymentMethod,
      extraBoxes: isLifetime ? extraBoxes : 0,
      customerName: demoFormData.fullName.trim(),
      customerEmail: demoFormData.email.trim(),
      customerPhone: demoFormData.phone.trim(),
    };

    const clientValidation = CheckoutIntentSchema.safeParse(payload);
    if (!clientValidation.success) {
      setErrorMsg(
        clientValidation.error.issues[0]?.message ||
          "Por favor ingresa tu nombre y teléfono/WhatsApp para generar tu orden."
      );
      return;
    }

    setIsGeneratingOrder(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error(json.error || "No se pudo generar la orden de compra.");
      }

      const order = json.data as CheckoutOrderResponse;
      trackGoogleAdsEvent("generate_order", {
        plan: selectedPlan,
        value: finalPriceUsd,
        payment_method: paymentMethod,
      });

      if (order.checkoutUrl) {
        window.location.href = order.checkoutUrl;
        return;
      }

      setOrderResult(order);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al conectar con la pasarela de órdenes.";
      setErrorMsg(msg);
      setFallbackWhatsappUrl(directWhatsappUrl);
    } finally {
      setIsGeneratingOrder(false);
    }
  };

  const handleDemoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setDemoFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) {
      setErrorMsg(null);
      setFallbackWhatsappUrl(null);
    }
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setFallbackWhatsappUrl(null);

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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json().catch(() => ({}));

      if (!res.ok || !resJson.success) {
        setErrorMsg(
          resJson.error ||
            "No fue posible registrar el envío automático en este momento. Puedes enviarnos tu solicitud directo por WhatsApp."
        );
        setFallbackWhatsappUrl(whatsappUrl);
        return;
      }

      trackGoogleAdsEvent("submit_lead", {
        plan: selectedPlan,
        business_type: demoFormData.businessType,
      });

      try {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      } catch {
        // En caso de bloqueo por el navegador
      }

      setSuccessData({
        type: "demo",
        message:
          resJson.message ||
          "¡Su solicitud ha sido registrada con éxito! Un asesor especializado se comunicará con usted de inmediato.",
        whatsappUrl,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al conectar con el servidor.";
      setErrorMsg(msg);
      setFallbackWhatsappUrl(whatsappUrl);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-slate-900 dark:text-slate-100 scrollbar-thin">
        {/* Botón de Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado del Modal */}
        <div className="p-6 sm:p-8 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Atención Comercial y Activación Oficial</span>
          </div>
          <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            {activeTab === "checkout" ? "Adquirir Licencia Isaac POS" : "Solicitar Demostración 1 a 1"}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">
            {activeTab === "checkout"
              ? "Seleccione su plan, genere su orden con tasa BCV en vivo y reciba las instrucciones de activación inmediata."
              : "Un asesor especializado le presentará el sistema adaptado al rubro de su empresa."}
          </p>

          {/* Selector de Pestaña */}
          <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                setActiveTab("checkout");
                setErrorMsg(null);
                setSuccessData(null);
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "checkout"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700 font-extrabold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Adquirir Licencia
            </button>
            <button
              onClick={() => {
                setActiveTab("demo");
                setErrorMsg(null);
                setSuccessData(null);
                setOrderResult(null);
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "demo"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700 font-extrabold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
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
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                ¡Solicitud Registrada con Éxito!
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto mb-6">
                {successData.message}
              </p>
              <div className="flex flex-col gap-2.5 max-w-sm mx-auto">
                <button
                  type="button"
                  onClick={() => {
                    trackGoogleAdsEvent("click_whatsapp", { location: "demo_success" });
                    window.open(successData.whatsappUrl, "_blank", "noopener,noreferrer");
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Ficha por WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <>
              {errorMsg && (
                <div className="mb-5 p-3.5 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-xs space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                  {fallbackWhatsappUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        trackGoogleAdsEvent("click_whatsapp", { location: "modal_fallback" });
                        window.open(fallbackWhatsappUrl, "_blank", "noopener,noreferrer");
                      }}
                      className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Enviar solicitud directo por WhatsApp</span>
                    </button>
                  )}
                </div>
              )}

              {activeTab === "checkout" ? (
                orderResult ? (
                  /* ======================================================== */
                  /* FICHA OFICIAL DE ORDEN GENERADA CON DATOS BANCARIOS REALES */
                  /* ======================================================== */
                  <div className="space-y-5 animate-fadeIn">
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono font-bold uppercase text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          Orden Registrada con Éxito
                        </span>
                        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-700">
                          <span className="font-mono text-xs font-black text-slate-950 dark:text-white">
                            {orderResult.orderId}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(orderResult.orderId, "order_id")}
                            className="p-1 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                            title="Copiar N° de Orden"
                          >
                            {copiedKey === "order_id" ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {orderResult.plan.name}
                      </div>
                      <div className="mt-2 flex items-baseline justify-between border-t border-emerald-200/80 dark:border-emerald-800/60 pt-2">
                        <span className="text-xs text-slate-600 dark:text-slate-300">Total a Cancelar:</span>
                        <div className="text-right">
                          <span className="text-xl font-black font-mono text-slate-950 dark:text-white">
                            ${orderResult.amountUsd} USD
                          </span>
                          <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 ml-2">
                            (Bs. {orderResult.amountBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Instrucciones Bancarias Oficiales */}
                    {orderResult.instructions && (
                      <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <Banknote className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span>{orderResult.instructions.title}</span>
                          </h4>
                          <span className="text-[10px] font-mono bg-blue-100/80 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full font-bold">
                            Tasa BCV Oficial
                          </span>
                        </div>

                        <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 font-mono bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                          {orderResult.instructions.bank && (
                            <div className="flex justify-between">
                              <span className="text-slate-400">Banco:</span>
                              <span className="font-bold text-slate-900 dark:text-white">{orderResult.instructions.bank}</span>
                            </div>
                          )}
                          {orderResult.instructions.phone && (
                            <div className="flex justify-between">
                              <span className="text-slate-400">Teléfono:</span>
                              <span className="font-bold text-slate-900 dark:text-white">{orderResult.instructions.phone}</span>
                            </div>
                          )}
                          {orderResult.instructions.idNumber && (
                            <div className="flex justify-between">
                              <span className="text-slate-400">Cédula / RIF:</span>
                              <span className="font-bold text-slate-900 dark:text-white">{orderResult.instructions.idNumber}</span>
                            </div>
                          )}
                          {orderResult.instructions.email && (
                            <div className="flex justify-between">
                              <span className="text-slate-400">Correo Zelle:</span>
                              <span className="font-bold text-slate-900 dark:text-white">{orderResult.instructions.email}</span>
                            </div>
                          )}
                          {orderResult.instructions.payId && (
                            <div className="flex justify-between">
                              <span className="text-slate-400">Binance Pay ID:</span>
                              <span className="font-bold text-slate-900 dark:text-white">{orderResult.instructions.payId}</span>
                            </div>
                          )}
                          {orderResult.instructions.beneficiary && (
                            <div className="flex justify-between">
                              <span className="text-slate-400">Beneficiario:</span>
                              <span className="font-bold text-slate-900 dark:text-white">{orderResult.instructions.beneficiary}</span>
                            </div>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                          {orderResult.instructions.description}
                        </p>

                        {/* Botón Rápido de Copiado de Datos */}
                        <button
                          type="button"
                          onClick={() => {
                            const details = [
                              orderResult.instructions?.bank ? `Banco: ${orderResult.instructions.bank}` : "",
                              orderResult.instructions?.phone ? `Tel: ${orderResult.instructions.phone}` : "",
                              orderResult.instructions?.idNumber ? `RIF/CI: ${orderResult.instructions.idNumber}` : "",
                              orderResult.instructions?.email ? `Email: ${orderResult.instructions.email}` : "",
                              orderResult.instructions?.payId ? `Pay ID: ${orderResult.instructions.payId}` : "",
                              orderResult.instructions?.beneficiary ? `Titular: ${orderResult.instructions.beneficiary}` : "",
                              `Monto: $${orderResult.amountUsd} USD (Bs. ${orderResult.amountBs.toFixed(2)})`,
                              `Orden: ${orderResult.orderId}`,
                            ].filter(Boolean).join(" | ");
                            handleCopy(details, "bank_data");
                          }}
                          className="w-full py-2 px-3 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedKey === "bank_data" ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              <span>¡Datos Bancarios Copiados al Portapapeles!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar Datos de Pago</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Botón Principal para Confirmar Activación por WhatsApp */}
                    <button
                      type="button"
                      onClick={() => {
                        trackGoogleAdsEvent("click_whatsapp", {
                          location: "checkout_order_confirmation",
                          order_id: orderResult.orderId,
                        });
                        window.open(orderResult.whatsappConfirmationUrl, "_blank", "noopener,noreferrer");
                      }}
                      className="w-full py-4 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2.5 transition-all group cursor-pointer"
                    >
                      <Send className="w-5 h-5 fill-current" />
                      <span>Confirmar Activación por WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderResult(null)}
                      className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Modificar plan o método de pago</span>
                    </button>
                  </div>
                ) : (
                  /* Formulario de Elección de Plan y Método */
                  <div className="space-y-5">
                    {/* Selector de Plan */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Plan a Adquirir
                      </label>
                      <select
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 font-semibold"
                      >
                        <option value="basico_mensual">Plan Emprendedor Mensual ($12 USD/mes)</option>
                        <option value="basico_anual">Plan Emprendedor Anual ($99 USD/año - Ahorra 2 meses)</option>
                        <option value="pro_mensual">Plan Profesional Mensual ($24 USD/mes)</option>
                        <option value="pro_anual">Plan Profesional Anual ($190 USD/año - Más elegido)</option>
                        <option value="vitalicia">Licencia Vitalicia Pago Único ($199 USD - 1 Admin + 1 Caja | +$49 caja extra)</option>
                      </select>
                    </div>

                    {/* Selector de Cajas Adicionales para Licencia Vitalicia */}
                    {isLifetime && (
                      <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                            Cajas Adicionales (+$49 USD pago único c/u)
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300">
                            Total incluido: <strong>1 Admin + {1 + extraBoxes} {1 + extraBoxes === 1 ? "Caja" : "Cajas"}</strong> de por vida
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setExtraBoxes((prev) => Math.max(0, prev - 1))}
                            disabled={extraBoxes === 0}
                            className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-black text-sm hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
                            aria-label="Restar caja adicional"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-mono font-black text-sm text-slate-950 dark:text-white">
                            +{extraBoxes}
                          </span>
                          <button
                            type="button"
                            onClick={() => setExtraBoxes((prev) => Math.min(8, prev + 1))}
                            className="w-8 h-8 rounded-lg bg-slate-950 dark:bg-blue-600 text-white font-black text-sm hover:bg-slate-800 dark:hover:bg-blue-500 cursor-pointer"
                            aria-label="Sumar caja adicional"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Selector de Método de Pago */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Forma de Pago de su Preferencia
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("pago_movil")}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                            paymentMethod === "pago_movil"
                              ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold shadow-xs"
                              : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <QrCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <div className="text-xs truncate">
                            <span className="block font-bold">Pago Móvil</span>
                            <span className="text-[10px] text-slate-500 block truncate">Tasa BCV Oficial</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod("zelle")}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                            paymentMethod === "zelle"
                              ? "bg-blue-50 dark:bg-blue-950/50 border-blue-500 text-blue-900 dark:text-blue-200 font-bold shadow-xs"
                              : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <Banknote className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                          <div className="text-xs truncate">
                            <span className="block font-bold">Zelle (USD)</span>
                            <span className="text-[10px] text-slate-500 block truncate">Acreditación rápida</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod("binance")}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                            paymentMethod === "binance"
                              ? "bg-amber-50 dark:bg-amber-950/50 border-amber-500 text-amber-900 dark:text-amber-200 font-bold shadow-xs"
                              : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <Banknote className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                          <div className="text-xs truncate">
                            <span className="block font-bold">Binance Pay</span>
                            <span className="text-[10px] text-slate-500 block truncate">USDT sin comisión</span>
                          </div>
                        </button>

                        {IS_STRIPE_ENABLED ? (
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("card")}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                              paymentMethod === "card"
                                ? "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold shadow-xs"
                                : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            <CreditCard className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                            <div className="text-xs truncate">
                              <span className="block font-bold">Tarjeta Int.</span>
                              <span className="text-[10px] text-slate-500 block truncate">Stripe Cifrado</span>
                            </div>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("acuerdo_directo")}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                              paymentMethod === "acuerdo_directo"
                                ? "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold shadow-xs"
                                : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            <Handshake className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                            <div className="text-xs truncate">
                              <span className="block font-bold">Acuerdo Directo</span>
                              <span className="text-[10px] text-slate-500 block truncate">Pago mixto / Asesor</span>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Datos del Comprador para emitir la Orden */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={demoFormData.fullName}
                          onChange={handleDemoChange}
                          placeholder="Ej. Carlos Pérez"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Teléfono / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={demoFormData.phone}
                          onChange={handleDemoChange}
                          placeholder="+58 412 1234567"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Correo Electrónico (Opcional para respaldo de licencia)
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={demoFormData.email}
                          onChange={handleDemoChange}
                          placeholder="comercio@correo.com"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    {/* Resumen de Monto con Tasa BCV Oficial */}
                    <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Monto de Inversión</span>
                        <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
                          ${finalPriceUsd} USD
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-sans font-normal ml-1.5">
                            ({currentPlanInfo.cycle})
                          </span>
                        </div>
                      </div>

                      <div className="sm:text-right border-t sm:border-t-0 pt-2.5 sm:pt-0 border-slate-200 dark:border-slate-800">
                        <div className="flex items-center sm:justify-end gap-1.5 text-xs text-blue-700 dark:text-blue-400 font-bold mb-0.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Tasa BCV: Bs. {bcvRate.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="text-base font-mono font-black text-slate-900 dark:text-white">
                          Ref. Bs. {totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">
                          {isBcvLive ? "Actualizada en vivo desde BCV Oficial" : "Sincronizada con BCV Oficial"}
                        </span>
                      </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="space-y-2.5">
                      <button
                        type="button"
                        onClick={handleGenerateCheckoutOrder}
                        disabled={isGeneratingOrder}
                        className="w-full py-4 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50"
                      >
                        {isGeneratingOrder ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Generando N° de Orden y Datos Bancarios...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Generar Orden y Ver Datos de Pago</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          trackGoogleAdsEvent("click_whatsapp", {
                            location: "checkout_direct_whatsapp",
                            plan: selectedPlan,
                          });
                          window.open(directWhatsappUrl, "_blank", "noopener,noreferrer");
                        }}
                        className="w-full py-3 px-4 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>O coordinar adquisición directa por WhatsApp</span>
                      </button>
                    </div>

                    {/* Indicadores de Confianza */}
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Activación Inmediata con Soporte 1 a 1</span>
                      </span>
                      <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Garantía oficial y factura legal
                      </span>
                    </div>
                  </div>
                )
              ) : (
                /* Formulario de Demostración Guiada */
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={demoFormData.fullName}
                        onChange={handleDemoChange}
                        required
                        placeholder="Ej. Ana Morales"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={demoFormData.email}
                        onChange={handleDemoChange}
                        required
                        placeholder="ana@comercio.com"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={demoFormData.phone}
                        onChange={handleDemoChange}
                        required
                        placeholder="+58 412 1234567"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Nombre de su Comercio / Empresa *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={demoFormData.businessName}
                        onChange={handleDemoChange}
                        required
                        placeholder="Ej. Supermercado El Trébol"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Tipo de Negocio
                      </label>
                      <select
                        name="businessType"
                        value={demoFormData.businessType}
                        onChange={handleDemoChange}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
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
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Número de Cajas / Terminales
                      </label>
                      <select
                        name="branchesCount"
                        value={demoFormData.branchesCount}
                        onChange={handleDemoChange}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
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
                    className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2 cursor-pointer"
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

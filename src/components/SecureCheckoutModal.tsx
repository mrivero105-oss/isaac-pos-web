"use client";

import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Send,
  Loader2,
  Sparkles,
} from "lucide-react";
import { LeadFormSchema, type LeadFormData } from "@/lib/validations";

interface SecureCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

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

  // Form State
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "cafeteria",
    branchesCount: "1",
    planInterested: (initialPlan as any) || "pro",
    message: "",
    website_url_hp: "", // Honeypot
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg(null);
  };

  // Envío Seguro de Formulario de Demo / Cotización
  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    // Validación previa del lado del cliente con Zod
    const validation = LeadFormSchema.safeParse(formData);
    if (!validation.success) {
      setErrorMsg(validation.error.issues[0]?.message || "Verifica los datos ingresados.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Ocurrió un error al enviar.");
      }

      setSuccessData({
        type: "demo",
        message: data.message,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Error al conectar con el servidor seguro.");
    } finally {
      setIsLoading(false);
    }
  };

  // Procesamiento Seguro de Checkout
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    if (!formData.fullName || !formData.email) {
      setErrorMsg("Ingresa tu nombre y correo para vincular la licencia.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan,
          currency: "USD",
          customerEmail: formData.email,
          customerName: formData.fullName,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error al generar sesión de pago.");
      }

      setSuccessData({
        type: "checkout",
        session: data.data,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "No se pudo procesar la solicitud.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-white">
        {/* Botón de Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado del Modal */}
        <div className="p-6 sm:p-8 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>PROTOCOLO SEGURO TLS 1.3 / PCI-DSS SAQ A</span>
          </div>
          <h3 className="text-2xl font-black tracking-tight">
            {activeTab === "checkout" ? "Comprar Licencia Isaac POS" : "Solicitar Demostración 1 a 1"}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {activeTab === "checkout"
              ? "Acceso inmediato, activación instantánea y garantía total de 30 días."
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
              className={`py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "checkout"
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Comprar Licencia
            </button>
            <button
              onClick={() => {
                setActiveTab("demo");
                setErrorMsg(null);
                setSuccessData(null);
              }}
              className={`py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "demo"
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Agendar Demo Gratis
            </button>
          </div>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-6 sm:p-8 pt-6">
          {successData ? (
            /* Vista de Éxito */
            <div className="text-center py-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold mb-2">
                {successData.type === "checkout"
                  ? "¡Sesión de Pago Cifrada Lista!"
                  : "¡Solicitud Registrada con Éxito!"}
              </h4>
              <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                {successData.type === "checkout"
                  ? `Se ha generado una orden segura para ${successData.session.planName}. Serás redirigido a la pasarela bancaria protegida.`
                  : successData.message}
              </p>

              {successData.type === "checkout" && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-left mb-6 space-y-1">
                  <div className="text-slate-400">Orden ID: {successData.session.sessionId}</div>
                  <div className="text-white font-bold">Total: ${successData.session.amount} USD</div>
                  <div className="text-emerald-400">Seguridad: {successData.session.encryption}</div>
                </div>
              )}

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all"
              >
                Cerrar
              </button>
            </div>
          ) : (
            /* Formularios */
            <>
              {errorMsg && (
                <div className="mb-5 p-3.5 bg-rose-950/60 border border-rose-800/80 rounded-xl text-rose-300 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {activeTab === "checkout" ? (
                /* Formulario de Checkout Directo */
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Plan Seleccionado
                    </label>
                    <select
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="basico_mensual">Plan Emprendedor Mensual ($29 USD/mes)</option>
                      <option value="basico_anual">Plan Emprendedor Anual ($290 USD/año - 2 meses gratis)</option>
                      <option value="pro_mensual">Plan Profesional Mensual ($59 USD/mes)</option>
                      <option value="pro_anual">Plan Profesional Anual ($590 USD/año - Recomendado)</option>
                      <option value="vitalicia">Licencia Vitalicia Pago Único ($499 USD de por vida)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Correo de Licenciamiento
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="carlos@minegocio.com"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Honeypot oculto anti-spam */}
                  <input
                    type="text"
                    name="website_url_hp"
                    value={formData.website_url_hp}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                  />

                  {/* Badges de Garantía de Pago */}
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <ShieldCheck className="w-4 h-4" /> Pagos Cifrados TLS 1.3
                    </span>
                    <span>Garantía 30 Días</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Estableciendo conexión segura...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>Proceder al Pago Seguro</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Formulario de Solicitud de Demostración Guiada */
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Ej. Ana Morales"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Correo Corporativo *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="ana@restaurante.com"
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
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+54 9 11 1234 5678"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Nombre de tu Negocio *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                        placeholder="Ej. Café Delicias"
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
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="cafeteria">Cafetería / Panadería</option>
                        <option value="restaurante">Restaurante / Bar</option>
                        <option value="tienda_retail">Tienda de Ropa / Retail</option>
                        <option value="minimarket">Minimarket / Abarrotes</option>
                        <option value="farmacia">Farmacia / Droguería</option>
                        <option value="servicios">Servicios / Otro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Número de Cajas / Sucursales
                      </label>
                      <select
                        name="branchesCount"
                        value={formData.branchesCount}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="1">1 Caja (Sucursal única)</option>
                        <option value="2-5">2 a 5 Cajas</option>
                        <option value="6-10">6 a 10 Cajas</option>
                        <option value="10+">Más de 10 Cajas (Cadena)</option>
                      </select>
                    </div>
                  </div>

                  {/* Honeypot oculto */}
                  <input
                    type="text"
                    name="website_url_hp"
                    value={formData.website_url_hp}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enviando de forma segura...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Solicitar Demostración Guiada</span>
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

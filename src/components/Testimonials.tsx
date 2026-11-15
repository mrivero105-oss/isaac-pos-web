"use client";

import React, { useState } from "react";
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  MessageSquarePlus,
  Send,
  Lock,
  Store,
  AlertCircle,
} from "lucide-react";
import { trackGoogleAdsEvent } from "@/lib/gtag";

export interface ApprovedReview {
  id: string;
  name: string;
  role: string;
  business: string;
  city: string;
  category: string;
  rating: number;
  comment: string;
  verifiedDate: string;
}

/**
 * Listado de reseñas reales aprobadas manualmente tras verificar licencia activa.
 * Se mantiene vacío mientras no existan reseñas verificadas aprobadas por administración,
 * garantizando 0% contenido sintético o generado por IA.
 */
const APPROVED_REVIEWS: ApprovedReview[] = [];

const BUSINESS_CATEGORIES = [
  "Minimarket y Víveres",
  "Farmacia y Salud",
  "Carnicería y Charcutería",
  "Panadería y Alimentos",
  "Ferretería y Repuestos",
  "Licorería y Bebidas",
  "Mayorista / Distribuidora",
  "Otro Comercio",
];

export const Testimonials: React.FC = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Propietario");
  const [business, setBusiness] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState(BUSINESS_CATEGORIES[0]);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [contactInfo, setContactInfo] = useState("");
  const [comment, setComment] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedState, setSubmittedState] = useState<{
    notified: boolean;
    whatsappUrl: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (comment.trim().length < 15) {
      setErrorMsg("Por favor escribe al menos 15 caracteres detallando tu experiencia.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          role,
          business,
          city,
          category,
          rating,
          comment,
          contactInfo,
          website_url_hp: honeypot,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMsg(json.error || "Revisa los campos ingresados e intenta nuevamente.");
        return;
      }

      trackGoogleAdsEvent("submit_customer_review", {
        rating,
        category,
      });

      setSubmittedState({
        notified: Boolean(json.notified),
        whatsappUrl: json.whatsappUrl || "https://wa.me/584248302226",
        message: json.message,
      });
    } catch {
      setErrorMsg("Error de conexión al enviar tu reseña. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setRole("Propietario");
    setBusiness("");
    setCity("");
    setComment("");
    setContactInfo("");
    setRating(5);
    setSubmittedState(null);
    setErrorMsg(null);
  };

  const activeStars = hoverRating ?? rating;

  return (
    <section
      id="testimonios"
      className="py-20 relative bg-white/75 dark:bg-slate-950/85 backdrop-blur-[2px] border-t border-blue-100/80 dark:border-slate-800/80 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado Principal */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-blue-800 dark:text-slate-200 text-xs font-mono font-bold mb-3 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>OPINIONES 100% VERIFICADAS • CERO RESEÑAS FICTICIAS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            Comparte tu experiencia con Isaac POS.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Si ya utilizas Isaac POS V24.04 en tu comercio, envíanos tu reseña. Todas las opiniones son verificadas contra licencias reales antes de publicarse.
          </p>
        </div>

        {/* Grilla de Reseñas Reales Aprobadas (solo visible cuando existen reseñas verificadas) */}
        {APPROVED_REVIEWS.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {APPROVED_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-7 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>Licencia Verificada • {rev.verifiedDate}</span>
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {rev.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {rev.role} • <strong className="text-slate-700 dark:text-slate-200">{rev.business}</strong>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                    {rev.city}, VE
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contenedor Principal: Política de Transparencia + Formulario de Reseña */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna Izquierda: Explicación de Moderación y Transparencia (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-7 sm:p-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Transparencia Comercial</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white leading-snug">
              ¿Por qué verificamos cada comentario antes de publicarlo?
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              En Isaac Ventas cuidamos la confianza de cada comerciante. No mostramos notificaciones automáticas ni testimonios inventados: cada opinión publicada corresponde a un negocio real que utiliza nuestro sistema.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-300 font-mono font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Envías tu calificación y comentario
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Completa los datos de tu negocio y cómo te ha ayudado Isaac POS en tu facturación o inventario.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-300 font-mono font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Confirmamos tu licencia o instalación
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Tu número de WhatsApp o correo solo se usa internamente para validar que eres cliente activo y evitar spam.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-300 font-mono font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Se publica en el portal oficial
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Una vez aprobada, tu reseña aparece en esta sección con el sello de Licencia Verificada.
                  </p>
                </div>
              </div>
            </div>

            {APPROVED_REVIEWS.length === 0 && (
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-3">
                <MessageSquarePlus className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>
                  Sé el primero en registrar la reseña verificada de tu comercio en nuestro nuevo muro de clientes.
                </span>
              </div>
            )}
          </div>

          {/* Columna Derecha: Caja de Comentarios para Clientes (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-slate-800 rounded-3xl p-7 sm:p-9 shadow-xl">
            {submittedState ? (
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                    ¡Gracias por compartir tu experiencia!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {submittedState.message}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={submittedState.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackGoogleAdsEvent("click_whatsapp", {
                        location: "review_confirmation",
                      })
                    }
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirmar reseña por WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Enviar otra opinión
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                      Enviar reseña de cliente
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Se publicará tras confirmar la licencia de tu establecimiento.
                    </p>
                  </div>

                  {/* Selector Interactivo de Estrellas */}
                  <div className="flex flex-col items-end">
                    <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 mb-1">
                      Tu calificación: {activeStars}/5
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          aria-label={`Calificar con ${star} estrellas`}
                          className="p-1 rounded-lg hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              star <= activeStars
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-300 dark:text-slate-700"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Honeypot anti-spam oculto */}
                <input
                  type="text"
                  name="website_url_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Tu Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={80}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. José Gregorio Pérez"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Tu Cargo en el Negocio
                    </label>
                    <input
                      type="text"
                      maxLength={60}
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Ej. Propietario / Encargado"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Nombre del Comercio *
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      placeholder="Ej. Inversiones Mi Abasto"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={60}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ej. Valencia"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Rubro Comercial *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                    >
                      {BUSINESS_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    WhatsApp o Correo de tu Licencia *{" "}
                    <span className="font-normal text-slate-500">
                      (Privado, nunca se publica en la web)
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    minLength={5}
                    maxLength={120}
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="Ej. 0414-1234567 o correo@tunegocio.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Tu Comentario sobre Isaac POS *
                    </label>
                    <span className="text-[11px] font-mono text-slate-400">
                      {comment.length}/600
                    </span>
                  </div>
                  <textarea
                    required
                    minLength={15}
                    maxLength={600}
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Cuéntanos qué módulos utilizas y cómo te ha funcionado el sistema en tu negocio..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Moderado contra spam antes de su publicación.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Enviando reseña..." : "Enviar mi experiencia"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

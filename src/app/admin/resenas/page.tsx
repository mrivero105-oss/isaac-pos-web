"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Trash2,
  Clock,
  Star,
  Lock,
  RefreshCw,
  ArrowLeft,
  Plus,
  Store,
  Phone,
  AlertCircle,
} from "lucide-react";
import type { StoredCustomerReview, ReviewStatus } from "@/lib/reviewsStore";

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

export default function AdminReviewsPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reviews, setReviews] = useState<StoredCustomerReview[]>([]);
  const [storageBackend, setStorageBackend] = useState<string>("local");
  const [filterStatus, setFilterStatus] = useState<"all" | ReviewStatus>("pending");
  const [isLoading, setIsLoading] = useState(false);
  const [actionBusyId, setActionBusyId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Estado para agregar manualmente una reseña recibida por WhatsApp
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("Propietario");
  const [newBusiness, setNewBusiness] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCategory, setNewCategory] = useState(BUSINESS_CATEGORIES[0]);
  const [newRating, setNewRating] = useState(5);
  const [newContactInfo, setNewContactInfo] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const fetchAdminReviews = useCallback(async (adminKey: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/reviews?admin=1", {
        headers: {
          "x-admin-password": adminKey,
        },
        cache: "no-store",
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setIsAuthenticated(false);
        setErrorMsg(json.error || "No se pudo autenticar.");
        return false;
      }

      setReviews(Array.isArray(json.reviews) ? json.reviews : []);
      if (json.storageBackend) {
        setStorageBackend(json.storageBackend);
      }
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem("isaac_admin_reviews_key", adminKey);
      } catch {
        // Ignorar si sessionStorage no está disponible
      }
      return true;
    } catch {
      setErrorMsg("Error de conexión con el servidor.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      const savedKey = sessionStorage.getItem("isaac_admin_reviews_key");
      if (savedKey) {
        setPassword(savedKey);
        void fetchAdminReviews(savedKey);
      }
    } catch {
      // Ignorar
    }
  }, [fetchAdminReviews]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    await fetchAdminReviews(password.trim());
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("isaac_admin_reviews_key");
    } catch {
      // Ignorar
    }
    setIsAuthenticated(false);
    setPassword("");
    setReviews([]);
  };

  const handleUpdateStatus = async (id: string, status: ReviewStatus) => {
    setActionBusyId(id);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/reviews", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMsg(json.error || "No se pudo actualizar el comentario.");
        return;
      }
      setReviews((prev) =>
        prev.map((item) => (item.id === id ? (json.review as StoredCustomerReview) : item))
      );
    } catch {
      setErrorMsg("Error de red al cambiar el estado.");
    } finally {
      setActionBusyId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setActionBusyId(id);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/reviews", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMsg(json.error || "No se pudo eliminar el comentario.");
        return;
      }
      setReviews((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setErrorMsg("Error de red al eliminar el comentario.");
    } finally {
      setActionBusyId(null);
    }
  };

  const handleCreateApprovedReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          name: newName,
          role: newRole,
          business: newBusiness,
          city: newCity,
          category: newCategory,
          rating: newRating,
          contactInfo: newContactInfo || "Verificado por administración",
          comment: newComment,
          autoApprove: true,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMsg(json.error || "Revisa los datos de la reseña.");
        return;
      }
      setNewName("");
      setNewRole("Propietario");
      setNewBusiness("");
      setNewCity("");
      setNewContactInfo("");
      setNewComment("");
      setShowAddForm(false);
      setFilterStatus("approved");
      await fetchAdminReviews(password);
    } catch {
      setErrorMsg("Error de red al registrar la reseña.");
    } finally {
      setIsCreating(false);
    }
  };

  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const approvedCount = reviews.filter((r) => r.status === "approved").length;
  const rejectedCount = reviews.filter((r) => r.status === "rejected").length;

  const visibleReviews =
    filterStatus === "all"
      ? reviews
      : reviews.filter((r) => r.status === filterStatus);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-7 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>ACCESO PRIVADO</span>
            </div>
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la web</span>
            </Link>
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Moderación de Reseñas
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Ingresa tu clave de administrador para aprobar o rechazar comentarios de clientes en Isaac POS.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Clave de Administrador
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu clave..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm transition-all cursor-pointer"
            >
              {isLoading ? "Verificando..." : "Entrar al Panel de Moderación"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Barra Superior */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h1 className="text-xl sm:text-2xl font-black text-white">
                Panel de Moderación de Clientes
              </h1>
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                Almacenamiento: {storageBackend}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Aprueba las reseñas reales para publicarlas al instante en la portada o rechaza las no verificadas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowAddForm((prev) => !prev)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddForm ? "Cerrar formulario" : "Agregar reseña manual"}</span>
            </button>

            <button
              type="button"
              onClick={() => fetchAdminReviews(password)}
              disabled={isLoading}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Actualizar</span>
            </button>

            <Link
              href="/#testimonios"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver en la web</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/80 text-rose-300 font-semibold text-xs transition-all cursor-pointer"
            >
              Salir
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-950/70 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Formulario para cargar manualmente una reseña recibida por WhatsApp */}
        {showAddForm && (
          <form
            onSubmit={handleCreateApprovedReview}
            className="bg-slate-900 border border-blue-500/40 rounded-3xl p-6 space-y-4"
          >
            <h2 className="text-base font-black text-white">
              Publicar reseña verificada manualmente
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                required
                placeholder="Nombre del cliente *"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Cargo (ej. Propietario)"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
              <input
                type="text"
                required
                placeholder="Nombre del Comercio *"
                value={newBusiness}
                onChange={(e) => setNewBusiness(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <input
                type="text"
                required
                placeholder="Ciudad *"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              >
                {BUSINESS_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={newRating}
                onChange={(e) => setNewRating(Number(e.target.value))}
                className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} Estrellas
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Teléfono / referencia interna"
                value={newContactInfo}
                onChange={(e) => setNewContactInfo(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <textarea
              required
              minLength={15}
              maxLength={600}
              rows={3}
              placeholder="Comentario real del cliente (mínimo 15 caracteres) *"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white resize-none"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
              >
                {isCreating ? "Guardando..." : "Guardar y Publicar Aprobada"}
              </button>
            </div>
          </form>
        )}

        {/* Pestañas de Filtro */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => setFilterStatus("pending")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              filterStatus === "pending"
                ? "bg-amber-500/15 border-amber-500/60 text-white"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-amber-400">
                Pendientes
              </span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">{pendingCount}</div>
          </button>

          <button
            type="button"
            onClick={() => setFilterStatus("approved")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              filterStatus === "approved"
                ? "bg-emerald-500/15 border-emerald-500/60 text-white"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-emerald-400">
                Aprobadas (Públicas)
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">{approvedCount}</div>
          </button>

          <button
            type="button"
            onClick={() => setFilterStatus("rejected")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              filterStatus === "rejected"
                ? "bg-rose-500/15 border-rose-500/60 text-white"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-rose-400">
                Rechazadas
              </span>
              <XCircle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">{rejectedCount}</div>
          </button>

          <button
            type="button"
            onClick={() => setFilterStatus("all")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              filterStatus === "all"
                ? "bg-blue-500/15 border-blue-500/60 text-white"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-blue-400">
                Todas
              </span>
              <Store className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">{reviews.length}</div>
          </button>
        </div>

        {/* Lista de Reseñas */}
        {visibleReviews.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-2">
            <div className="text-sm font-bold text-slate-300">
              No hay reseñas en esta categoría ({filterStatus}).
            </div>
            <p className="text-xs text-slate-500">
              Cuando un cliente envíe su opinión desde la página principal, aparecerá aquí para que puedas aprobarla o rechazarla con un clic.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleReviews.map((rev) => {
              const isBusy = actionBusyId === rev.id;
              return (
                <div
                  key={rev.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                          rev.status === "approved"
                            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                            : rev.status === "rejected"
                            ? "bg-rose-500/15 border-rose-500/40 text-rose-300"
                            : "bg-amber-500/15 border-amber-500/40 text-amber-300"
                        }`}
                      >
                        {rev.status === "approved"
                          ? "APROBADA (VISIBLE EN WEB)"
                          : rev.status === "rejected"
                          ? "RECHAZADA (OCULTA)"
                          : "PENDIENTE DE APROBACIÓN"}
                      </span>

                      <div className="flex items-center gap-0.5">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star
                            key={idx}
                            className="w-4 h-4 text-amber-400 fill-amber-400"
                          />
                        ))}
                      </div>

                      <span className="text-xs font-mono text-slate-500">
                        {new Date(rev.createdAt).toLocaleString("es-VE")}
                      </span>
                    </div>

                    <div>
                      <div className="text-base font-bold text-white">
                        {rev.name}{" "}
                        <span className="text-slate-400 font-normal text-xs">
                          ({rev.role})
                        </span>{" "}
                        • <span className="text-cyan-400">{rev.business}</span>
                      </div>
                      <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3 mt-1">
                        <span>
                          Ciudad: <strong className="text-slate-200">{rev.city}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          Rubro: <strong className="text-slate-200">{rev.category}</strong>
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 text-amber-300 font-mono">
                          <Phone className="w-3 h-3" />
                          Contacto Licencia (Privado): {rev.contactInfo}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-200 bg-slate-950 border border-slate-800/90 rounded-2xl p-4 italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>

                  {/* Botones de Acción: Aprobar / Rechazar / Eliminar */}
                  <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0">
                    {rev.status !== "approved" && (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleUpdateStatus(rev.id, "approved")}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Aprobar y Publicar</span>
                      </button>
                    )}

                    {rev.status !== "rejected" && (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleUpdateStatus(rev.id, "rejected")}
                        className="px-4 py-2.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 disabled:opacity-50 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Rechazar / Ocultar</span>
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleDelete(rev.id)}
                      className="px-4 py-2.5 rounded-xl bg-rose-950/70 hover:bg-rose-900/80 border border-rose-800/80 disabled:opacity-50 text-rose-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

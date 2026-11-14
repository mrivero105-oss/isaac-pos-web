"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, TrendingUp, X, ShoppingBag, ShieldCheck } from "lucide-react";

interface SocialProofEvent {
  id: number;
  merchant: string;
  city: string;
  action: string;
  timeAgo: string;
  type: "purchase" | "usage" | "audit";
}

const EVENTS: SocialProofEvent[] = [
  {
    id: 1,
    merchant: "Minimarket El Trébol",
    city: "Caracas",
    action: "opera el Plan Profesional (3 Cajas en Red)",
    timeAgo: "Cliente activo",
    type: "purchase",
  },
  {
    id: 2,
    merchant: "Supermercado Gran Avenida",
    city: "Valencia",
    action: "utiliza Visor 2da Pantalla con QR Pago Móvil",
    timeAgo: "Cliente activo",
    type: "usage",
  },
  {
    id: 3,
    merchant: "Distribuidora El Progreso",
    city: "Barquisimeto",
    action: "migró 1,200+ productos desde Excel vía AnyDesk",
    timeAgo: "Implementación",
    type: "usage",
  },
  {
    id: 4,
    merchant: "Farmacia San José",
    city: "Maracaibo",
    action: "opera Arqueo Ciego por turno y control de lotes",
    timeAgo: "Cliente activo",
    type: "audit",
  },
  {
    id: 5,
    merchant: "Minimarket Los Samanes",
    city: "Maracay",
    action: "implementó Licencia Vitalicia Perpetua ($199)",
    timeAgo: "Caso de éxito",
    type: "purchase",
  },
  {
    id: 6,
    merchant: "Inversiones La Perla",
    city: "Puerto La Cruz",
    action: "usa reposición predictiva de stock con WhatsApp",
    timeAgo: "Cliente activo",
    type: "usage",
  },
];

export const LiveSocialProof: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    let switchTimer: ReturnType<typeof setTimeout> | null = null;

    // Primer disparo a los 3 segundos
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Ciclo periódico cada 11 segundos con limpieza segura de timers
    const interval = setInterval(() => {
      setIsVisible(false);
      if (switchTimer) clearTimeout(switchTimer);
      switchTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % EVENTS.length);
        setIsVisible(true);
      }, 1000);
    }, 11000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      if (switchTimer) clearTimeout(switchTimer);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const currentEvent = EVENTS[currentIndex];

  return (
    <aside
      aria-label="Actividad en vivo de comercios"
      className="hidden sm:flex fixed bottom-6 left-6 z-40 max-w-sm bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700/80 p-3.5 rounded-2xl shadow-2xl backdrop-blur-md animate-fadeIn items-start gap-3 text-slate-900 dark:text-white transition-colors duration-300"
    >
      <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5">
        {currentEvent.type === "purchase" ? (
          <ShoppingBag className="w-4 h-4" />
        ) : currentEvent.type === "audit" ? (
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
        ) : (
          <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        )}
      </div>

      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white truncate">
          <span className="truncate">{currentEvent.merchant}</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">({currentEvent.city})</span>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight mt-0.5">
          {currentEvent.action}
        </p>
        <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
          <span>{currentEvent.timeAgo}</span>
          <span className="text-slate-400 dark:text-slate-500">•</span>
          <span className="text-slate-500 dark:text-slate-400">Verificado</span>
        </div>
      </div>

      <button
        onClick={() => setIsDismissed(true)}
        className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-md transition-colors"
        aria-label="Cerrar notificación"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};

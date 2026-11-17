"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Cpu, Printer, Calculator, Headphones } from "lucide-react";
import { SecurityTrust } from "@/components/SecurityTrust";
import { UltraEditionShowcase } from "@/components/UltraEditionShowcase";
import { HardwareSection } from "@/components/HardwareSection";
import { RoiCalculator } from "@/components/RoiCalculator";
import { HumanSupportSection } from "@/components/HumanSupportSection";

interface TechAndSupportHubProps {
  onOpenModal: (plan?: string) => void;
}

type TechTabId = "seguridad" | "offline" | "hardware" | "roi" | "soporte";

const TECH_TABS: {
  id: TechTabId;
  label: string;
  shortLabel: string;
  icon: any;
}[] = [
  {
    id: "seguridad",
    label: "Arqueo Ciego & Seguridad",
    shortLabel: "Arqueo Ciego",
    icon: ShieldCheck,
  },
  {
    id: "offline",
    label: "Motor 100% Offline (PC / Android)",
    shortLabel: "Motor Offline",
    icon: Cpu,
  },
  {
    id: "hardware",
    label: "Hardware Compatible",
    shortLabel: "Hardware",
    icon: Printer,
  },
  {
    id: "roi",
    label: "Calculadora de Ahorro",
    shortLabel: "Calculadora ROI",
    icon: Calculator,
  },
  {
    id: "soporte",
    label: "Soporte & Instalación AnyDesk",
    shortLabel: "Soporte AnyDesk",
    icon: Headphones,
  },
];

export const TechAndSupportHub: React.FC<TechAndSupportHubProps> = ({
  onOpenModal,
}) => {
  const [activeTab, setActiveTab] = useState<TechTabId>("seguridad");

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash === "#seguridad") setActiveTab("seguridad");
      else if (hash === "#edicion-ultra") setActiveTab("offline");
      else if (hash === "#hardware") setActiveTab("hardware");
      else if (hash === "#calculadora-roi") setActiveTab("roi");
      else if (hash === "#soporte-humano") setActiveTab("soporte");
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <section
      id="tecnologia"
      className="py-16 sm:py-20 relative bg-blue-50/35 dark:bg-slate-900/65 backdrop-blur-[2px] border-t border-blue-100/80 dark:border-slate-800/80 transition-colors duration-200"
    >
      {/* Anclas de compatibilidad para navegación directa desde el Footer o enlaces internos */}
      <span id="seguridad" className="absolute -top-20 left-0 pointer-events-none" />
      <span id="edicion-ultra" className="absolute -top-20 left-0 pointer-events-none" />
      <span id="hardware" className="absolute -top-20 left-0 pointer-events-none" />
      <span id="calculadora-roi" className="absolute -top-20 left-0 pointer-events-none" />
      <span id="soporte-humano" className="absolute -top-20 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado Compacto y Pestañas del Centro Técnico */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-blue-800 dark:text-slate-200 text-xs font-mono font-bold mb-3 shadow-2xs">
            <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>CENTRO DE INGENIERÍA, HARDWARE & ACOMPAÑAMIENTO</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Todo el respaldo técnico de tu mostrador en un solo lugar.
          </h2>
        </div>

        {/* Barra de 5 Pestañas Interactivas */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {TECH_TABS.map((t) => {
            const Icon = t.icon;
            const isSelected = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.4)]"
                    : "bg-white/95 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-blue-200/70 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 hover:text-blue-700 dark:hover:text-white shadow-2xs"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido de la Pestaña Seleccionada */}
      {activeTab === "seguridad" && <SecurityTrust />}
      {activeTab === "offline" && <UltraEditionShowcase onOpenModal={onOpenModal} />}
      {activeTab === "hardware" && <HardwareSection />}
      {activeTab === "roi" && <RoiCalculator onOpenModal={onOpenModal} />}
      {activeTab === "soporte" && <HumanSupportSection />}
    </section>
  );
};

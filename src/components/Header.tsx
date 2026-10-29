"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Headphones } from "lucide-react";

interface HeaderProps {
  onOpenModal: (plan?: string) => void;
  onOpenAiChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal, onOpenAiChat }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bcvRate, setBcvRate] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tasa BCV oficial en tiempo real
  useEffect(() => {
    let isMounted = true;
    fetch("/api/bcv")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data?.data?.rate) {
          setBcvRate(data.data.rate);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <header
        className={`max-w-6xl mx-auto rounded-2xl sm:rounded-full pointer-events-auto transition-all duration-300 ${
          isScrolled
            ? "bg-white/92 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.12),0_0_0_1px_rgba(255,255,255,0.7)_inset]"
            : "bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.06),0_0_0_1px_rgba(255,255,255,0.5)_inset]"
        }`}
      >
        <div className="flex items-center justify-between h-14 sm:h-16 px-3.5 sm:px-6">
          
          {/* 1. Lado Izquierdo: Marca & Emblema (Sin saltos de línea molestos) */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group py-1">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-1 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
              <img
                src="/isaac-logo-ultra.png"
                alt="Isaac POS"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-black tracking-tight text-slate-950 whitespace-nowrap">
                ISAAC<span className="text-blue-600 ml-0.5">POS</span>
              </span>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200/80 hidden xs:inline whitespace-nowrap">
                ULTRA
              </span>
            </div>
          </a>

          {/* 2. Centro: Navegación Cápsula (Enlaces limpios en 1 sola línea) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <a
              href="#sistema-real"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap"
            >
              Módulos
            </a>
            <a
              href="#simulador"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Simulador</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-breathing shrink-0" />
            </a>
            <a
              href="#edicion-ultra"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap"
            >
              Rendimiento
            </a>
            <a
              href="#hardware"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap"
            >
              Hardware
            </a>
            <a
              href="#soporte-humano"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap"
            >
              Soporte
            </a>
            <a
              href="#precios"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap"
            >
              Precios
            </a>
          </nav>

          {/* 3. Lado Derecho: Ticker BCV + Botón Primario */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Ticker en Vivo de Tasa BCV (Sin corte vertical) */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50/90 border border-emerald-200/90 text-xs font-mono whitespace-nowrap shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 status-breathing shrink-0" />
              <span className="text-emerald-800 font-semibold text-[11px]">BCV:</span>
              <span className="font-bold text-slate-950 tabular-nums text-xs">
                {bcvRate ? `Bs. ${bcvRate.toFixed(2)}` : "Sincronizando..."}
              </span>
            </div>

            {/* Asesoría Rápida por WhatsApp */}
            <a
              href="https://wa.me/584248302226?text=Hola%2C%20quisiera%20asesor%C3%ADa%20y%20demostraci%C3%B3n%20sobre%20Isaac%20POS."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center p-2 rounded-full text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors"
              title="Hablar con un Asesor"
              aria-label="Hablar con un Asesor"
            >
              <Headphones className="w-4 h-4 text-blue-600" />
            </a>

            {/* Botón de Acción Principal */}
            <button
              onClick={() => onOpenModal("demo_gratis")}
              className="px-3.5 sm:px-4 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
            >
              <span>Solicitar Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0" />
            </button>

            {/* Botón Móvil */}
            <div className="lg:hidden flex items-center ml-0.5">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-full text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>

        {/* Menú Móvil Desplegable tipo Tarjeta Flotante */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/80 px-5 py-5 bg-white/95 backdrop-blur-2xl rounded-b-2xl sm:rounded-b-3xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2.5 text-sm font-semibold text-slate-800">
              {bcvRate && (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs font-mono mb-2">
                  <span className="text-emerald-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 status-breathing" />
                    Tasa Oficial BCV:
                  </span>
                  <span className="font-bold text-slate-950 tabular-nums text-xs">Bs. {bcvRate.toFixed(2)}</span>
                </div>
              )}
              <a
                href="#sistema-real"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Módulos del Sistema
              </a>
              <a
                href="#simulador"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-between"
              >
                <span>Simulador de Caja</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                  En Vivo
                </span>
              </a>
              <a
                href="#edicion-ultra"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Rendimiento & Motor Local
              </a>
              <a
                href="#hardware"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Hardware Compatible
              </a>
              <a
                href="#soporte-humano"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Soporte & AnyDesk
              </a>
              <a
                href="#precios"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Planes y Precios
              </a>

              <div className="pt-3 border-t border-slate-200 flex flex-col gap-2 mt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenModal("demo_gratis");
                  }}
                  className="w-full py-2.5 rounded-full bg-slate-950 text-white font-bold text-xs text-center shadow-md cursor-pointer"
                >
                  Solicitar Demostración Guiada
                </button>
                <a
                  href="https://wa.me/584248302226?text=Hola%2C%20quisiera%20asesor%C3%ADa%20sobre%20Isaac%20POS."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-full border border-slate-300 text-slate-700 font-semibold text-xs text-center hover:bg-slate-50 flex items-center justify-center gap-1.5"
                >
                  <Headphones className="w-3.5 h-3.5 text-blue-600" />
                  <span>Hablar con un Asesor</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

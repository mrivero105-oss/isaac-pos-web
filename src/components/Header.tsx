"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Headphones, Sun, Moon } from "lucide-react";

interface HeaderProps {
  onOpenModal: (plan?: string) => void;
  onOpenAiChat?: () => void;
  theme?: "light" | "dark";
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenModal,
  onOpenAiChat,
  theme = "light",
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [pastHeroLogo, setPastHeroLogo] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("inicio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bcvRate, setBcvRate] = useState<number | null>(null);

  useEffect(() => {
    const sectionIds = [
      "sistema-real",
      "rubros",
      "simulador",
      "precios",
      "seguridad",
      "hardware",
      "soporte-humano",
    ];

    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      setPastHeroLogo(y > 280);

      if (y < 320) {
        setActiveSection("inicio");
        return;
      }

      let current = "inicio";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavLinkClass = (sectionId: string, extraClass: string = "") => {
    const isActive = activeSection === sectionId;
    return `px-2 xl:px-2.5 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${extraClass} ${
      isActive
        ? "font-bold text-blue-700 dark:text-blue-300 bg-blue-100/90 dark:bg-blue-950/80 border border-blue-300/80 dark:border-blue-700/80 shadow-2xs"
        : "font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-white hover:bg-blue-50/80 dark:hover:bg-slate-800/80 border border-transparent"
    }`;
  };

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

  const isDark = theme === "dark";

  return (
    <div className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <header
        className={`w-full max-w-6xl xl:max-w-7xl mx-auto rounded-2xl sm:rounded-full pointer-events-auto transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-blue-200/90 dark:border-slate-800/90 shadow-[0_14px_40px_-8px_rgba(37,99,235,0.14),0_4px_14px_rgba(15,23,42,0.06),0_0_0_1px_rgba(255,255,255,0.9)_inset] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)_inset]"
            : "bg-white/90 dark:bg-slate-900/85 backdrop-blur-xl border border-blue-200/80 dark:border-slate-800/80 shadow-[0_10px_32px_-4px_rgba(37,99,235,0.11),0_0_0_1px_rgba(255,255,255,0.85)_inset] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
        }`}
      >
        <div className="flex items-center justify-between gap-2 h-14 sm:h-15 px-3 sm:px-4 xl:px-5">
          
          {/* 1. Navegación Cápsula Limpia (Muestra retorno rápido solo cuando el logo del Hero ya salió de pantalla) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 min-w-0">
            <a
              href="#"
              className={`px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-extrabold transition-all whitespace-nowrap ${
                pastHeroLogo
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-600/25"
                  : "text-slate-900 dark:text-slate-100 bg-slate-100/80 dark:bg-transparent hover:bg-blue-50 dark:hover:bg-slate-800/80"
              }`}
            >
              {pastHeroLogo ? "ISAAC POS ↑" : "Inicio"}
            </a>
            <a
              href="#sistema-real"
              className={getNavLinkClass("sistema-real")}
            >
              Módulos
            </a>
            <a
              href="#rubros"
              className={getNavLinkClass("rubros")}
            >
              Rubros
            </a>
            <a
              href="#simulador"
              className={getNavLinkClass("simulador", "flex items-center gap-1.5")}
            >
              <span>Simulador</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-breathing shrink-0" />
            </a>
            <a
              href="#precios"
              className={getNavLinkClass("precios")}
            >
              Precios
            </a>
            <a
              href="#seguridad"
              className={getNavLinkClass("seguridad")}
            >
              Arqueo Ciego
            </a>
            <a
              href="#hardware"
              className={getNavLinkClass("hardware", "hidden xl:inline-block")}
            >
              Hardware
            </a>
            <a
              href="#soporte-humano"
              className={getNavLinkClass("soporte-humano")}
            >
              Soporte
            </a>
          </nav>

          {/* En pantallas móviles/tablets (<lg): Indicador de navegación */}
          <a
            href="#"
            className="lg:hidden flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-100 px-2 py-1"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span>Menú Principal</span>
          </a>

          {/* 3. Lado Derecho: Ticker BCV + Tema Claro/Oscuro + Botón Primario */}
          <div className="flex items-center gap-1.5 xl:gap-2 shrink-0">
            {/* Ticker en Vivo de Tasa BCV */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 xl:px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300/80 dark:border-emerald-800/80 text-xs font-mono whitespace-nowrap shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 status-breathing shrink-0" />
              <span className="text-emerald-800 dark:text-emerald-300 font-semibold text-[11px]">BCV:</span>
              <span className="font-bold text-slate-950 dark:text-white tabular-nums text-xs">
                {bcvRate ? `Bs. ${bcvRate.toFixed(2)}` : "Sincronizando..."}
              </span>
            </div>

            {/* Conmutador de Interfaz (Modo Claro / Modo Oscuro) */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-blue-50/90 dark:bg-slate-800/90 hover:bg-blue-100/90 dark:hover:bg-slate-700/90 border border-blue-200/80 dark:border-slate-700 text-blue-900 dark:text-slate-200 text-[11px] font-bold transition-all cursor-pointer active:scale-95 shrink-0 shadow-2xs"
                title={isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
                aria-label={isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="hidden xl:inline font-mono">Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="hidden xl:inline font-mono">Oscuro</span>
                  </>
                )}
              </button>
            )}

            {/* Asesoría Rápida por WhatsApp */}
            <a
              href="https://wa.me/584248302226?text=Hola%2C%20quisiera%20asesor%C3%ADa%20y%20demostraci%C3%B3n%20sobre%20Isaac%20POS."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Hablar con un Asesor"
              aria-label="Hablar con un Asesor"
            >
              <Headphones className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </a>

            {/* Botón de Acción Principal */}
            <button
              onClick={() => onOpenModal("demo_gratis")}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.45)] transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 shrink-0"
            >
              <span>Solicitar Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-blue-100 group-hover:text-white shrink-0" />
            </button>

            {/* Botón Móvil */}
            <div className="lg:hidden flex items-center ml-0.5">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-full text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>

        {/* Menú Móvil Desplegable tipo Tarjeta Flotante */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/80 dark:border-slate-800 px-5 py-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-b-2xl sm:rounded-b-3xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
              {bcvRate && (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-xs font-mono mb-2">
                  <span className="text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 status-breathing" />
                    Tasa Oficial BCV:
                  </span>
                  <span className="font-bold text-slate-950 dark:text-white tabular-nums text-xs">Bs. {bcvRate.toFixed(2)}</span>
                </div>
              )}

              {onToggleTheme && (
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 cursor-pointer"
                >
                  <span>Apariencia de Interfaz:</span>
                  <span className="flex items-center gap-1.5 font-mono text-blue-600 dark:text-amber-400">
                    {isDark ? (
                      <>
                        <Sun className="w-3.5 h-3.5" />
                        <span>Modo Oscuro (Cambiar a Claro)</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5" />
                        <span>Modo Claro (Cambiar a Oscuro)</span>
                      </>
                    )}
                  </span>
                </button>
              )}

              <a
                href="#sistema-real"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Módulos del Sistema
              </a>
              <a
                href="#rubros"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Soluciones por Rubro Comercial
              </a>
              <a
                href="#simulador"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between"
              >
                <span>Simulador de Caja</span>
                <span className="text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 font-bold">
                  En Vivo
                </span>
              </a>
              <a
                href="#precios"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors flex items-center justify-between"
              >
                <span>Planes y Precios</span>
                <span className="text-[10px] font-mono text-blue-700 dark:text-blue-300">Desde $12/mes</span>
              </a>
              <a
                href="#seguridad"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Arqueo Ciego & Seguridad
              </a>
              <a
                href="#hardware"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Hardware Compatible
              </a>
              <a
                href="#soporte-humano"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Soporte & AnyDesk
              </a>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2 mt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenModal("demo_gratis");
                  }}
                  className="w-full py-2.5 rounded-full bg-slate-950 dark:bg-blue-600 text-white font-bold text-xs text-center shadow-md cursor-pointer"
                >
                  Solicitar Demostración Guiada
                </button>
                <a
                  href="https://wa.me/584248302226?text=Hola%2C%20quisiera%20asesor%C3%ADa%20sobre%20Isaac%20POS."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs text-center hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5"
                >
                  <Headphones className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
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

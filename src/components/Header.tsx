"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Download } from "lucide-react";

interface HeaderProps {
  onOpenModal: (plan?: string) => void;
  onOpenAiChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal, onOpenAiChat }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-md"
          : "bg-slate-950/40 backdrop-blur-sm border-b border-slate-900/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo y Marca Limpio y Elegante */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-900 border border-cyan-500/30 p-1 flex items-center justify-center group-hover:border-cyan-400/60 transition-colors shadow-sm">
              <img
                src="/isaac-logo-ultra.png"
                alt="Isaac POS Ultra"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white">
                ISAAC <span className="text-cyan-400">POS</span>
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                ULTRA
              </span>
            </div>
          </a>

          {/* Navegación Desktop - Enlaces corporativos claros */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-300">
            <a
              href="#sistema-real"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap"
            >
              Módulos del Sistema
            </a>
            <a
              href="#simulador"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap"
            >
              Simulador
            </a>
            <a
              href="#soporte-humano"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <span>Soporte & Asesoría</span>
              <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-500/30 px-1.5 py-0.2 rounded font-mono font-bold">1 a 1</span>
            </a>
            <a
              href="#precios"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap"
            >
              Precios
            </a>
            <a
              href="#faq"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap text-slate-400 hover:text-slate-200"
            >
              FAQ
            </a>
          </nav>

          {/* Acciones a la Derecha - Limpias y Claras */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#edicion-ultra"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar</span>
            </a>
          </div>

          {/* Botón de Menú Móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Menú Móvil Limpio y Elegante */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/98 border-b border-slate-800 px-6 py-6 backdrop-blur-xl animate-fadeIn shadow-2xl">
          <div className="flex flex-col gap-4 text-base font-semibold text-slate-200">
            <a
              href="#edicion-ultra"
              onClick={() => setMobileMenuOpen(false)}
              className="text-cyan-400 hover:text-cyan-300 py-1 flex items-center justify-between"
            >
              <span>Edición Ultra</span>
              <span className="text-[10px] font-mono bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">NUEVO</span>
            </a>
            <a
              href="#sistema-real"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 py-1"
            >
              Módulos del Sistema
            </a>
            <a
              href="#simulador"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 py-1"
            >
              Simulador en Vivo
            </a>
            <a
              href="#hardware"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 py-1"
            >
              Hardware Compatible
            </a>
            <a
              href="#precios"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 py-1"
            >
              Planes y Precios
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 py-1 text-slate-400"
            >
              Preguntas Frecuentes
            </a>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
              <a
                href="#edicion-ultra"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-black text-center shadow-lg shadow-cyan-500/20"
              >
                Descargar Instalador
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

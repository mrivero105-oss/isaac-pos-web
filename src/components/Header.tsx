"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";

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
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo y Marca Profesional */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-blue-50 border border-blue-200 p-1 flex items-center justify-center group-hover:border-blue-300 transition-colors shadow-xs">
              <img
                src="/isaac-logo-ultra.png"
                alt="Isaac POS"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                ISAAC <span className="text-blue-600">POS</span>
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                OFICIAL
              </span>
            </div>
          </a>

          {/* Navegación Desktop - Enlaces corporativos claros */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a
              href="#sistema-real"
              className="hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Módulos del Sistema
            </a>
            <a
              href="#simulador"
              className="hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Simulador
            </a>
            <a
              href="#soporte-humano"
              className="hover:text-blue-600 transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <span>Soporte & Asesoría</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-full font-mono font-bold">1 a 1</span>
            </a>
            <a
              href="#precios"
              className="hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Precios
            </a>
            <a
              href="#faq"
              className="hover:text-blue-600 transition-colors whitespace-nowrap text-slate-500 hover:text-slate-800"
            >
              FAQ
            </a>
          </nav>

          {/* Acciones a la Derecha - Limpias y Claras */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#edicion-ultra"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar</span>
            </a>
          </div>

          {/* Botón de Menú Móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Menú Móvil Limpio y Elegante */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 border-b border-slate-200 px-6 py-6 backdrop-blur-xl animate-fadeIn shadow-xl">
          <div className="flex flex-col gap-4 text-base font-semibold text-slate-700">
            <a
              href="#sistema-real"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1"
            >
              Módulos del Sistema
            </a>
            <a
              href="#simulador"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1"
            >
              Simulador en Vivo
            </a>
            <a
              href="#soporte-humano"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1 flex items-center justify-between"
            >
              <span>Soporte & Asesoría Humana</span>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-bold">1 a 1</span>
            </a>
            <a
              href="#hardware"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1"
            >
              Hardware Compatible
            </a>
            <a
              href="#precios"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1"
            >
              Planes y Precios
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 py-1 text-slate-500"
            >
              Preguntas Frecuentes
            </a>

            <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
              <a
                href="#edicion-ultra"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-center shadow-md shadow-blue-600/20"
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

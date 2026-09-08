"use client";

import React, { useState, useEffect } from "react";
import { Shield, Smartphone, Menu, X, ArrowRight, Lock, CheckCircle2 } from "lucide-react";

interface HeaderProps {
  onOpenModal: (plan?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Marca */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                ISAAC <span className="text-emerald-400">POS</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-emerald-400" /> SECURE ENTERPRISE
              </span>
            </div>
          </a>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#sistema-real" className="hover:text-emerald-400 transition-colors text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Sistema Real
            </a>
            <a href="#funciones" className="hover:text-emerald-400 transition-colors">
              Funcionalidades
            </a>
            <a href="#simulador" className="hover:text-emerald-400 transition-colors">
              Simulador en Vivo
            </a>
            <a href="#hardware" className="hover:text-emerald-400 transition-colors">
              Hardware
            </a>
            <a href="#seguridad" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Seguridad
            </a>
            <a href="#precios" className="hover:text-emerald-400 transition-colors">
              Precios
            </a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Acciones & Badges */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-[11px] font-mono text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Cifrado TLS 1.3 Activo
            </div>

            <button
              onClick={() => onOpenModal("demo_gratis")}
              className="text-sm font-semibold text-slate-200 hover:text-white px-3 py-2 transition-colors"
            >
              Ver Demo
            </button>

            <button
              onClick={() => onOpenModal("pro_anual")}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center gap-2 group"
            >
              <span>Comprar Sistema</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-b border-slate-800 px-6 py-5 backdrop-blur-xl animate-fadeIn">
          <div className="flex flex-col gap-4 text-base font-medium text-slate-300">
            <a
              href="#funciones"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1"
            >
              Funcionalidades
            </a>
            <a
              href="#simulador"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1"
            >
              Simulador en Vivo
            </a>
            <a
              href="#hardware"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1"
            >
              Hardware Compatible
            </a>
            <a
              href="#seguridad"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1"
            >
              Seguridad & Cumplimiento
            </a>
            <a
              href="#precios"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1"
            >
              Precios y Planes
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1"
            >
              Preguntas Frecuentes
            </a>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal("demo_gratis");
                }}
                className="w-full py-2.5 rounded-xl border border-slate-700 text-slate-200 font-semibold text-center"
              >
                Solicitar Demostración
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal("pro_anual");
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-center shadow-lg shadow-emerald-500/20"
              >
                Comprar Licencia Isaac POS
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

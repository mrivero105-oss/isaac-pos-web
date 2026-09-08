"use client";

import React from "react";
import { Shield, Lock, Heart, Mail, Phone, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Marca y Misión Real */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-2xl overflow-hidden shadow-lg border border-cyan-500/30 shrink-0 bg-slate-900">
                <img
                  src="/isaac-icon-3d.png"
                  alt="Isaac POS"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                ISAAC <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">POS</span>
                <span className="text-[10px] bg-slate-800 text-cyan-300 font-mono px-2 py-0.5 rounded-full ml-2 border border-slate-700">v24.04</span>
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mb-6">
              El sistema de punto de venta más rápido, intuitivo y blindado para comercios. Tasa BCV oficial en vivo, facturación instantánea, inventario en tiempo real y ventas continuas sin internet.
            </p>
            <div className="flex items-center gap-3 text-slate-300 text-xs">
              <span className="flex items-center gap-1 text-emerald-400 font-mono">
                <Lock className="w-3.5 h-3.5" /> Conexión Cifrada SSL 256-Bit
              </span>
            </div>
          </div>

          {/* Col 3: Enlaces Rápidos */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Plataforma</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#funciones" className="hover:text-emerald-400 transition-colors">
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-emerald-400 transition-colors">
                  Simulador de Caja
                </a>
              </li>
              <li>
                <a href="#hardware" className="hover:text-emerald-400 transition-colors">
                  Hardware Soportado
                </a>
              </li>
              <li>
                <a href="#precios" className="hover:text-emerald-400 transition-colors">
                  Planes y Precios
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Seguridad y Legal */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Seguridad y Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#seguridad" className="hover:text-emerald-400 transition-colors">
                  Arquitectura Zero-Trust
                </a>
              </li>
              <li>
                <span className="text-slate-300">Cumplimiento PCI-DSS SAQ A</span>
              </li>
              <li>
                <span className="text-slate-300">Política de Privacidad</span>
              </li>
              <li>
                <span className="text-slate-300">Términos del Servicio</span>
              </li>
              <li>
                <span className="text-slate-300">Garantía de Devolución 30 Días</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Contacto Seguro */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Atención al Cliente</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>contacto@isaacpos.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Soporte 24/7 en Español</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Certificaciones y Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} Isaac POS. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>TLS 1.3 Cifrado</span>
            <span>•</span>
            <span>Sin almacenamiento de tarjetas</span>
            <span>•</span>
            <span>ISO/IEC 27001 Alignment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

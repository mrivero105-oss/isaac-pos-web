"use client";

import React from "react";
import { Lock, Phone } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-12 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Marca y Misión Real */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-slate-700 shrink-0 bg-slate-900 p-0.5">
                <img
                  src="/isaac-logo-ultra.png"
                  alt="Isaac POS"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                ISAAC <span className="text-blue-500">POS</span>
                <span className="text-[10px] bg-slate-900 text-slate-300 font-mono font-bold px-2 py-0.5 rounded-full ml-2 border border-slate-700">Versión 2026</span>
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mb-6">
              Software de gestión comercial y punto de venta para bodegas, minimarkets, farmacias y comercios en general. Facturación ágil a tasa oficial BCV, modo 100% offline y acompañamiento técnico en instalación.
            </p>
            <div className="flex items-center gap-3 text-slate-300 text-xs">
              <span className="flex items-center gap-1 text-emerald-400 font-mono">
                <Lock className="w-3.5 h-3.5" /> Almacenamiento Local Cifrado • SQLite Nativo
              </span>
            </div>
          </div>

          {/* Col 3: Enlaces Rápidos */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Plataforma</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#edicion-ultra" className="hover:text-blue-400 transition-colors">
                  Modalidades de Instalación
                </a>
              </li>
              <li>
                <a href="#sistema-real" className="hover:text-blue-400 transition-colors">
                  Módulos del Sistema
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-blue-400 transition-colors">
                  Simulador de Caja Online
                </a>
              </li>
              <li>
                <a href="#soporte-humano" className="hover:text-blue-400 transition-colors">
                  Acompañamiento y Soporte
                </a>
              </li>
              <li>
                <a href="#hardware" className="hover:text-blue-400 transition-colors">
                  Hardware y Balanzas
                </a>
              </li>
              <li>
                <a href="#precios" className="hover:text-blue-400 transition-colors">
                  Planes y Licencias
                </a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-blue-400 transition-colors">
                  Casos de Comercios
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-blue-400 transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Seguridad y Garantía */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Control & Garantía</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#seguridad" className="hover:text-blue-400 transition-colors">
                  Arqueo Ciego Anti-Faltantes
                </a>
              </li>
              <li>
                <span className="text-slate-300">Base de Datos Local SQLite</span>
              </li>
              <li>
                <span className="text-slate-300">Respaldos Diarios en Pendrive/Disco</span>
              </li>
              <li>
                <span className="text-slate-300">Soporte Remoto vía AnyDesk</span>
              </li>
              <li>
                <span className="text-slate-300">Garantía de Satisfacción 30 Días</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Contacto Directo */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Atención al Cliente</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/584248302226"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors group"
                >
                  <svg className="w-4 h-4 text-emerald-400 shrink-0 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span className="font-medium">+58 424-8302226</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:isaacpospage@gmail.com"
                  className="flex items-center gap-2 text-slate-300 hover:text-rose-400 transition-colors group"
                >
                  <svg className="w-4 h-4 text-rose-400 shrink-0 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                  <span>isaacpospage@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400 pt-1">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Atención de Lunes a Sábado</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Certificaciones y Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} Isaac POS. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Soporte Remoto AnyDesk</span>
            <span>•</span>
            <span>Base de Datos SQLite Local</span>
            <span>•</span>
            <span>Hecho en Venezuela</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

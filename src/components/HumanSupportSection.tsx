"use client";

import React from "react";
import { Headphones, FileSpreadsheet, MonitorCheck, Users, MessageCircle, Clock, ShieldCheck, Check } from "lucide-react";

export const HumanSupportSection: React.FC = () => {
  return (
    <section id="soporte-humano" className="py-24 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 border border-slate-300 text-slate-800 text-xs font-mono font-semibold mb-3">
            <Headphones className="w-3.5 h-3.5 text-blue-600" />
            <span>ACOMPAÑAMIENTO EN SITIO Y POR ANYDESK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
            Un equipo humano real detrás de cada mostrador.
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Cambiar o instalar un software genera dudas operativas. En Isaac POS no te entregamos un instalador huérfano: nos conectamos contigo, cargamos tu inventario y dejamos tu mostrador facturando.
          </p>
        </div>

        {/* 4 Fases de Puesta en Marcha */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          
          {/* Paso 1 */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-7 flex flex-col justify-between hover:bg-white hover:border-slate-400 hover:shadow-md transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-5">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block mb-1">
                01 • INVENTARIO
              </span>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                Migración Asistida de Excel
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Si tienes tus artículos en Excel, facturas de proveedores o en otro sistema, convertimos y cargamos tu catálogo completo para que no pierdas días tipeando.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-200/70 text-[11px] font-mono text-emerald-700 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Carga masiva sin costo</span>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-7 flex flex-col justify-between hover:bg-white hover:border-slate-400 hover:shadow-md transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-5">
                <MonitorCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                02 • CALIBRACIÓN
              </span>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                Conexión Remota AnyDesk
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Nos conectamos a tu computadora para calibrar tu impresora térmica (58 o 80mm), balanza digital, lector de código de barras y apertura de gaveta.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-200/70 text-[11px] font-mono text-emerald-700 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Calibración de puertos COM/USB</span>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-7 flex flex-col justify-between hover:bg-white hover:border-slate-400 hover:shadow-md transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-5">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                03 • FORMACIÓN
              </span>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                Capacitación en 20 Minutos
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Entrenamos a tus cajeros. El sistema es tan intuitivo que cualquier persona aprende a cobrar en dólares y bolívares el mismo día de la instalación.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-200/70 text-[11px] font-mono text-emerald-700 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Manuales rápidos en video</span>
            </div>
          </div>

          {/* Paso 4 */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-7 flex flex-col justify-between hover:bg-white hover:border-slate-400 hover:shadow-md transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-5">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-wider block mb-1">
                04 • CONTINUIDAD
              </span>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                Soporte en Horas Pico
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Atención directa de Lunes a Sábado de 8:00 AM a 8:00 PM por WhatsApp y teléfono. Sin burocracia de tickets lentos cuando tienes una fila esperando en caja.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-200/70 text-[11px] font-mono text-emerald-700 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Respuesta media &lt; 5 minutos</span>
            </div>
          </div>

        </div>

        {/* Banner de Contacto Directo */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-7 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl text-white">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Headphones className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 status-breathing" />
                <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                  ATENCIÓN DIRECTA AL COMERCIO
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                ¿Quieres ver una demostración con los productos de tu rubro?
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
                Coordinamos una sesión remota de 15 minutos por AnyDesk para que pruebes la velocidad del sistema en tu propia pantalla.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto shrink-0">
            <a
              href="https://wa.me/584248302226?text=Hola%2C%20quisiera%20asesor%C3%ADa%20personalizada%20sobre%20Isaac%20POS%20y%20agendar%20una%20demostraci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Escribir por WhatsApp (+58 424-8302226)</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

"use client";

import React from "react";
import { Headphones, FileSpreadsheet, MonitorCheck, Users, MessageCircle, Phone, Clock } from "lucide-react";

export const HumanSupportSection: React.FC = () => {
  return (
    <section id="soporte-humano" className="py-20 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-4 shadow-xs">
            <Headphones className="w-4 h-4 text-blue-600" />
            <span>ACOMPAÑAMIENTO Y ASESORÍA PERSONALIZADA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Detrás de Isaac POS hay un equipo humano comprometido con tu negocio
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Sabemos que cambiar o instalar un sistema de ventas genera dudas. Por eso, no te dejamos solo con un archivo de descarga: te acompañamos paso a paso hasta que tu negocio facture con fluidez.
          </p>
        </div>

        {/* 4 Pasos de Acompañamiento en Tarjetas Claras */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          
          {/* Paso 1 */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:bg-white hover:border-blue-300 hover:shadow-md transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 mb-5">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider block mb-1">
                Paso 1 • Tu Catálogo
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Migración Asistida
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Si ya tienes tus productos en Excel, en facturas de droguerías o en otro sistema, nosotros convertimos y cargamos tu inventario inicial para que no pierdas horas tipeando.
              </p>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-5">
                <MonitorCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                Paso 2 • Periféricos
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Configuración AnyDesk
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Nos conectamos de forma remota a tu computadora para dejar configurada tu impresora térmica (58mm/80mm), balanza de peso, lector de códigos y gaveta de dinero.
              </p>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 mb-5">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                Paso 3 • Personal
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Capacitación en 20 Minutos
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Entrenamos a tus cajeros y administradores. El sistema está diseñado para que cualquier persona aprenda a cobrar en dólares y bolívares el mismo día de la instalación.
              </p>
            </div>
          </div>

          {/* Paso 4 */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:bg-white hover:border-amber-300 hover:shadow-md transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-700 uppercase tracking-wider block mb-1">
                Paso 4 • Continuidad
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Soporte en Horas Pico
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Atención directa de Lunes a Sábado de 8:00 AM a 8:00 PM por WhatsApp y llamada. Si tienes una consulta en tu negocio, te respondemos al instante sin abrir tickets burocráticos.
              </p>
            </div>
          </div>

        </div>

        {/* Tarjeta de Contacto Directo en Azul Marino Profundo */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl text-white">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0">
              <Phone className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-mono font-semibold text-emerald-300">LÍNEA DIRECTA DE ASESORÍA Y SOPORTE</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                ¿Prefieres conversar antes de decidir?
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                Escríbenos directamente o solicita una demostración en vivo por videollamada para ver el sistema funcionando con los productos y necesidades exactas de tu comercio.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto shrink-0">
            <a
              href="https://wa.me/584248302226?text=Hola%2C%20quisiera%20asesor%C3%ADa%20personalizada%20sobre%20Isaac%20POS%20y%20agendar%20una%20demostraci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Contactar por WhatsApp (+58 424-8302226)</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

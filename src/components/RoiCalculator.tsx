"use client";

import React, { useState } from "react";
import { Calculator, Clock, DollarSign, ArrowRight, Printer, Sparkles } from "lucide-react";

interface RoiCalculatorProps {
  onOpenModal: (plan?: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenModal }) => {
  const [dailyTickets, setDailyTickets] = useState(120);
  const [terminalsCount, setTerminalsCount] = useState(2);
  const [avgTicketPrice, setAvgTicketPrice] = useState(15);

  // Estimaciones basadas en métricas de comercio real
  const totalMonthlySales = dailyTickets * 30 * terminalsCount;
  const minutesSavedPerDay = (dailyTickets * 4 * terminalsCount) / 60;
  const hoursSavedPerMonth = Math.round((minutesSavedPerDay * 30) / 60);

  const monthlyRevenue = totalMonthlySales * avgTicketPrice;
  const recoveredMoneyPerMonth = Math.round(monthlyRevenue * 0.018); // ~1.8% de margen recuperado en mermas y descuadres

  return (
    <section className="py-24 relative bg-slate-100/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 border border-slate-300 text-slate-800 text-xs font-mono font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>MODELADO FINANCIERO DE MOSTRADOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-3">
            Calcula el impacto real en tus horas y en tu caja.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Ajusta los parámetros de tu comercio para proyectar el tiempo recuperado y las fugas de caja que previenes con el Arqueo Ciego.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Controles Interactivos (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200 shadow-sm space-y-7">
            <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span>Parámetros Operativos del Negocio</span>
            </h3>

            {/* Control 1: Tickets diarios */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-700">
                  Tickets / Cobros diarios por caja
                </label>
                <span className="font-mono text-slate-950 font-bold text-sm bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200 tabular-nums">
                  {dailyTickets} ventas / día
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={dailyTickets}
                onChange={(e) => setDailyTickets(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>20 ventas</span>
                <span>250 ventas</span>
                <span>500 ventas</span>
              </div>
            </div>

            {/* Control 2: Cantidad de cajas */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-700">
                  Número de Cajas o Terminales
                </label>
                <span className="font-mono text-slate-950 font-bold text-sm bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200 tabular-nums">
                  {terminalsCount} {terminalsCount === 1 ? "caja" : "cajas"}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={terminalsCount}
                onChange={(e) => setTerminalsCount(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>1 caja</span>
                <span>4 cajas</span>
                <span>8 cajas</span>
              </div>
            </div>

            {/* Control 3: Ticket promedio */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-700">
                  Ticket Promedio por Cliente ($ USD)
                </label>
                <span className="font-mono text-slate-950 font-bold text-sm bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200 tabular-nums">
                  ${avgTicketPrice} USD
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="80"
                step="1"
                value={avgTicketPrice}
                onChange={(e) => setAvgTicketPrice(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>$3 USD</span>
                <span>$40 USD</span>
                <span>$80 USD</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              * Estimación basada en métricas auditadas en minimarkets, farmacias y bodegas con cobro bimonetario rápido.
            </div>
          </div>

          {/* Ticket Térmico Interactivo de Auditoría (5 Cols) */}
          <div className="lg:col-span-5 relative">
            {/* Efecto de papel térmico físico con micro-borde y tipografía monospace */}
            <div className="bg-white rounded-2xl border border-slate-300 shadow-[0_15px_35px_rgba(15,23,42,0.12)] p-6 font-mono text-slate-900 text-xs relative overflow-hidden">
              
              {/* Encabezado del Ticket Térmico */}
              <div className="text-center pb-4 border-b border-dashed border-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-800 mb-1.5">
                  <Printer className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm tracking-tight text-slate-950">ISAAC POS ULTRA</div>
                <div className="text-[10px] text-slate-500">AUDITORÍA DE IMPACTO OPERATIVO</div>
                <div className="text-[10px] text-slate-400">FECHA: {new Date().toLocaleDateString("es-VE")}</div>
              </div>

              {/* Cuerpo del Ticket con Desglose */}
              <div className="py-4 space-y-2.5 border-b border-dashed border-slate-300 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-600">VOLUMEN MENSUAL:</span>
                  <span className="font-bold tabular-nums">{totalMonthlySales.toLocaleString()} trans.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">CAJAS ACTIVAS:</span>
                  <span className="font-bold tabular-nums">{terminalsCount} terminales</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">TICKET MEDIO:</span>
                  <span className="font-bold tabular-nums">${avgTicketPrice}.00 USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">FACTURACIÓN ESTIMADA:</span>
                  <span className="font-bold tabular-nums">${monthlyRevenue.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Beneficio Cuantificado */}
              <div className="py-4 space-y-3 border-b border-dashed border-slate-300">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>TIEMPO RECUPERADO:</span>
                  </div>
                  <span className="text-sm font-bold text-blue-700 tabular-nums">~{hoursSavedPerMonth} hrs / mes</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>MERMAS PREVENIDAS:</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-600 tabular-nums">+${recoveredMoneyPerMonth.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Pie del Ticket con Total */}
              <div className="pt-4 text-center">
                <div className="text-[10px] text-slate-500 mb-1">ARQUEO CIEGO & FLUIDEZ EN COBRO</div>
                <div className="font-black text-xs text-slate-900 tracking-wider">
                  *** CONTROL DE CAJA 100% GARANTIZADO ***
                </div>
              </div>

              {/* Botón de Acción dentro del Ticket */}
              <div className="mt-5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => onOpenModal("pro_anual")}
                  className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs tracking-tight transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Activar en mi Comercio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

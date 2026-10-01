"use client";

import React, { useState } from "react";
import { Calculator, Clock, DollarSign, ArrowRight } from "lucide-react";

interface RoiCalculatorProps {
  onOpenModal: (plan?: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenModal }) => {
  const [dailyTickets, setDailyTickets] = useState(120);
  const [terminalsCount, setTerminalsCount] = useState(2);
  const [avgTicketPrice, setAvgTicketPrice] = useState(15);

  // Estimaciones basadas en métricas reales de comercios:
  const minutesSavedPerDay = (dailyTickets * 4 * terminalsCount) / 60;
  const hoursSavedPerMonth = Math.round((minutesSavedPerDay * 30) / 60);

  const monthlyRevenue = dailyTickets * avgTicketPrice * 30 * terminalsCount;
  const recoveredMoneyPerMonth = Math.round(monthlyRevenue * 0.018);

  return (
    <section className="py-20 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3 shadow-xs">
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              <span>CALCULADORA DE RETORNO DE INVERSIÓN (ROI)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Calcula cuánto tiempo y dinero ahorras con Isaac POS
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Mueve los controles para ver el impacto inmediato en la rentabilidad y eficiencia de tu negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controles interactivos (6 cols) */}
            <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              {/* Control 1: Tickets diarios por terminal */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-800">
                    Tickets / Ventas por día por caja
                  </label>
                  <span className="font-mono text-blue-700 font-bold text-base bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                    {dailyTickets} ventas
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
              </div>

              {/* Control 2: Cantidad de terminales / cajas */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-800">
                    Número de Terminales / Cajas
                  </label>
                  <span className="font-mono text-blue-700 font-bold text-base bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                    {terminalsCount} {terminalsCount === 1 ? "caja" : "cajas"}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={terminalsCount}
                  onChange={(e) => setTerminalsCount(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Control 3: Ticket promedio en dólares */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-800">
                    Ticket Promedio por Venta ($ USD)
                  </label>
                  <span className="font-mono text-blue-700 font-bold text-base bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                    ${avgTicketPrice} USD
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="100"
                  step="1"
                  value={avgTicketPrice}
                  onChange={(e) => setAvgTicketPrice(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Resultados Estimados (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <span className="text-xs uppercase tracking-wider font-mono text-blue-700 font-bold">
                  Ahorro Mensual Estimado
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>Horas Ahorradas al Mes</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                      ~{hoursSavedPerMonth} <span className="text-sm text-slate-500 font-normal">hrs</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Menor tiempo de espera de clientes y cierre de turno automático.
                    </p>
                  </div>

                  <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-2 text-emerald-800 text-xs mb-1 font-semibold">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span>Dinero Protegido al Mes</span>
                    </div>
                    <div
                      suppressHydrationWarning
                      className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono"
                    >
                      ${recoveredMoneyPerMonth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      <span className="text-sm text-emerald-600 font-normal">USD</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Evitando descuadres de caja y pérdidas con el arqueo ciego.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenModal("pro_anual")}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all group cursor-pointer"
              >
                <span>Obtener Isaac POS y Empezar a Ahorrar</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

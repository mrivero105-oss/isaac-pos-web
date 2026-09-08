"use client";

import React, { useState } from "react";
import { Calculator, TrendingUp, Clock, DollarSign, ShieldAlert, ArrowRight } from "lucide-react";

interface RoiCalculatorProps {
  onOpenModal: (plan?: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenModal }) => {
  const [dailyTickets, setDailyTickets] = useState(120);
  const [terminalsCount, setTerminalsCount] = useState(2);
  const [avgTicketPrice, setAvgTicketPrice] = useState(15);

  // Estimaciones basadas en métricas reales de comercios:
  // 1. Reducción de tiempo por ticket en 4 segundos -> horas ahorradas al mes
  const minutesSavedPerDay = (dailyTickets * 4 * terminalsCount) / 60;
  const hoursSavedPerMonth = Math.round((minutesSavedPerDay * 30) / 60);

  // 2. Reducción de pérdidas por descuadre de caja / mermas no registradas (~1.5% de ventas mensuales promedio)
  const monthlyRevenue = dailyTickets * avgTicketPrice * 30 * terminalsCount;
  const recoveredMoneyPerMonth = Math.round(monthlyRevenue * 0.018);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculadora de Retorno de Inversión (ROI)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Calcula cuánto tiempo y dinero ahorras con Isaac POS
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Mueve los controles para ver el impacto inmediato en la rentabilidad y eficiencia de tu negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controles interactivos (6 cols) */}
            <div className="lg:col-span-6 space-y-6 bg-slate-950/60 p-6 sm:p-8 rounded-2xl border border-slate-800">
              {/* Control 1: Tickets diarios por terminal */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-200">
                    Tickets / Ventas por día por caja
                  </label>
                  <span className="font-mono text-emerald-400 font-bold text-base bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
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
                  className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Control 2: Cantidad de terminales / cajas */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-200">
                    Número de Terminales / Cajas
                  </label>
                  <span className="font-mono text-emerald-400 font-bold text-base bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
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
                  className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Control 3: Ticket promedio en dólares */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-200">
                    Ticket Promedio por Venta ($ USD)
                  </label>
                  <span className="font-mono text-emerald-400 font-bold text-base bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
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
                  className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Resultados Estimados (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-2xl border border-emerald-700/40 shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-wider font-mono text-emerald-400 font-semibold">
                  Ahorro Mensual Estimado
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>Horas Ahorradas al Mes</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                      ~{hoursSavedPerMonth} <span className="text-sm text-slate-400 font-normal">hrs</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Menor tiempo de espera de clientes y cierre de caja automático en 2 minutos.
                    </p>
                  </div>

                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span>Dinero Protegido al Mes</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                      ${recoveredMoneyPerMonth.toLocaleString()} <span className="text-sm text-slate-400 font-normal">USD</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Evitando descuadres de caja no detectados y robos hormiga con arqueo ciego.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenModal("pro_anual")}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all group"
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

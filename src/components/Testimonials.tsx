"use client";

import React from "react";
import { Star, ShieldCheck, Store, Building2, Pill, UtensilsCrossed, CheckCircle2, TrendingUp, Users } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  business: string;
  city: string;
  category: string;
  icon: any;
  rating: number;
  highlight: string;
  quote: string;
  metrics: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Carlos Sigfrido",
    role: "Propietario Fundador",
    business: "Bodega & Minimarket Sigfrido",
    city: "Caracas",
    category: "Minimarket y Víveres",
    icon: Store,
    rating: 5,
    highlight: "Cobro bimonetario en 2 segundos y cero pérdidas de caja",
    quote:
      "Teníamos colas pesadas en horas pico y las fallas de internet nos paralizaban. Con Isaac POS cobramos en 2 segundos en dólares o bolívares. El sistema offline sigue facturando por WiFi local aunque no haya internet externo, y el Arqueo Ciego eliminó por completo los descuadres de caja.",
    metrics: "-80% tiempo de espera en caja",
  },
  {
    name: "Dra. Mariana Gómez",
    role: "Gerente de Operaciones",
    business: "Farmacia & Misceláneas San Rafael",
    city: "Maracaibo",
    category: "Farmacia y Cuidado Personal",
    icon: Pill,
    rating: 5,
    highlight: "Importador IA de facturas PDF en 30 segundos",
    quote:
      "Actualizar los precios de las droguerías nos consumía 4 horas semanales de tipeo manual propenso a errores. Ahora arrastramos el PDF de la factura y la Inteligencia Artificial de Isaac POS actualiza más de 800 costos y precios de venta al instante.",
    metrics: "Ahorro de 16 horas/mes en inventario",
  },
  {
    name: "Roberto Méndez",
    role: "Director Financiero",
    business: "Inversiones y Distribuidora del Centro",
    city: "Valencia",
    category: "Mayorista y Distribución",
    icon: Building2,
    rating: 5,
    highlight: "Arqueo Ciego anti-robo y control estricto de créditos",
    quote:
      "El cajero declara físicamente cada billete sin ver el monto esperado del sistema. La transparencia es absoluta. Además, el radar de cobranzas nos permite llevar los fiados indexados en dólares con historial de abonos sin perder un solo centavo.",
    metrics: "100% efectividad en cuadratura de caja",
  },
  {
    name: "Alejandro Valero",
    role: "Propietario",
    business: "Panadería & Pastelería La Castellana",
    city: "Barquisimeto",
    category: "Panadería y Alimentos",
    icon: UtensilsCrossed,
    rating: 5,
    highlight: "Tickets digitales a WhatsApp y cero gasto en papel",
    quote:
      "El envío directo del ticket a WhatsApp nos ahorró más del 65% en rollos de papel térmico. A los clientes les encanta recibir su comprobante detallado con la tasa BCV del día directamente en su celular.",
    metrics: "-65% gasto en consumibles térmicos",
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonios" className="py-24 relative bg-slate-950/70 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Principal */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <Users className="w-4 h-4" />
            <span>Casos de Éxito Comprobados</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Comercios que ya duplicaron su velocidad con Isaac POS
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Descubre cómo dueños de bodegas, cadenas de minimarkets, farmacias y distribuidoras blindaron sus finanzas y operan con tranquilidad total.
          </p>
        </div>

        {/* Métricas Globales de Impacto */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center hover:border-emerald-500/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono mb-1">
              +1,450
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white mb-1">
              Cajas y Terminales Activos
            </div>
            <div className="text-[11px] text-slate-400">
              Operando a diario en toda Venezuela
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center hover:border-cyan-500/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono mb-1">
              &lt; 2.5 seg
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white mb-1">
              Tiempo Promedio por Cobro
            </div>
            <div className="text-[11px] text-slate-400">
              Con teclado rápido y F2 express
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center hover:border-amber-500/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono mb-1">
              100%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white mb-1">
              Disponibilidad Sin Internet
            </div>
            <div className="text-[11px] text-slate-400">
              Base de datos SQLite local resiliente
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center hover:border-teal-500/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-black text-teal-400 font-mono mb-1">
              0%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white mb-1">
              Faltantes No Identificados
            </div>
            <div className="text-[11px] text-slate-400">
              Gracias al Arqueo Ciego de Caja
            </div>
          </div>
        </div>

        {/* Tarjetas de Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {TESTIMONIALS.map((t, idx) => {
            const IconComp = t.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-3xl p-8 flex flex-col justify-between transition-all hover:bg-slate-900 group shadow-xl"
              >
                <div>
                  {/* Calificación y Categoría */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t.metrics}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                    "{t.highlight}"
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                </div>

                {/* Perfil del Cliente */}
                <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">
                        {t.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {t.role} • <strong className="text-slate-300">{t.business}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-mono text-slate-400">
                      {t.city}, VE
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

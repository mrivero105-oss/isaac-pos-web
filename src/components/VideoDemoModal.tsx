"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  DollarSign,
  Printer,
  Barcode,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckoutModal?: (plan?: string) => void;
}

interface CartItem {
  name: string;
  qty: number;
  priceUsd: number;
}

const DEMO_PRODUCTS: CartItem[] = [
  { name: "Harina P.A.N. Maíz Blanco 1kg", qty: 2, priceUsd: 1.45 },
  { name: "Café Fama de América 250g", qty: 1, priceUsd: 2.80 },
  { name: "Queso Blanco Llanero (kg)", qty: 0.85, priceUsd: 5.50 },
  { name: "Refresco 2 Litros", qty: 1, priceUsd: 2.20 },
];

const TOTAL_DURATION_SEC = 32;

export const VideoDemoModal: React.FC<VideoDemoModalProps> = ({
  isOpen,
  onClose,
  onOpenCheckoutModal,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [bcvRate] = useState(857.89);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reiniciar estado cada vez que se abre el modal
  useEffect(() => {
    if (isOpen) {
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [isOpen]);

  // Manejo del temporizador de reproducción automática
  useEffect(() => {
    if (!isOpen) return;

    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION_SEC) {
            setIsPlaying(false);
            return TOTAL_DURATION_SEC;
          }
          return Number((prev + 0.2).toFixed(1));
        });
      }, 200);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isOpen]);

  if (!isOpen) return null;

  // Lógica de fases del video
  // 0s - 8s: Fase 1 - Escaneo de productos
  // 8s - 16s: Fase 2 - Cálculo y Tasa Oficial BCV
  // 16s - 24s: Fase 3 - Cobro Mixto ($ en efectivo + Bs Pago Móvil)
  // 24s - 32s: Fase 4 - Impresión de Ticket Térmico y Cierre
  const currentPhase =
    currentTime < 8
      ? 1
      : currentTime < 16
      ? 2
      : currentTime < 24
      ? 3
      : 4;

  const isCompleted = currentTime >= TOTAL_DURATION_SEC;

  // Productos visibles según el tiempo en Fase 1
  const visibleProductsCount =
    currentTime < 2
      ? 1
      : currentTime < 4
      ? 2
      : currentTime < 6
      ? 3
      : 4;

  const currentProducts = DEMO_PRODUCTS.slice(0, visibleProductsCount);
  const totalUsd = currentProducts.reduce(
    (sum, item) => sum + item.qty * item.priceUsd,
    0
  );
  const totalBs = totalUsd * bcvRate;

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSeekTo = (seconds: number) => {
    setCurrentTime(seconds);
    setIsPlaying(true);
  };

  const formatSeconds = (sec: number) => {
    const s = Math.floor(sec);
    return `0:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden relative flex flex-col text-white max-h-[94vh]">
        
        {/* Cabecera del Reproductor de Video */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-mono text-rose-400 bg-rose-950/80 border border-rose-800 px-2.5 py-0.5 rounded-full font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              DEMO EN VIVO
            </span>
            <div className="hidden sm:block">
              <h3 className="font-bold text-sm text-white">
                Simulación de Cobro en Mostrador • Isaac POS
              </h3>
              <p className="text-[11px] text-slate-400">
                100% Offline • Conversión bimonetaria automática a Tasa BCV
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRestart}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Reiniciar video"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Cerrar video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pantalla Principal del Video (Simulador Visual) */}
        <div className="relative flex-1 bg-slate-950 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto">
          
          {/* Barra de progreso de capítulos en la parte superior */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <button
              onClick={() => handleSeekTo(0)}
              className={`p-2 rounded-xl border text-left transition-all ${
                currentPhase === 1
                  ? "bg-blue-600/20 border-blue-500 text-blue-300"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                <Barcode className="w-3.5 h-3.5 shrink-0" />
                <span>1. Escaneo</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate hidden sm:block">
                Lectura inmediata de artículos
              </div>
            </button>

            <button
              onClick={() => handleSeekTo(8)}
              className={`p-2 rounded-xl border text-left transition-all ${
                currentPhase === 2
                  ? "bg-blue-600/20 border-blue-500 text-blue-300"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                <DollarSign className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                <span>2. Tasa BCV</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate hidden sm:block">
                Dólares y Bolívares al instante
              </div>
            </button>

            <button
              onClick={() => handleSeekTo(16)}
              className={`p-2 rounded-xl border text-left transition-all ${
                currentPhase === 3
                  ? "bg-blue-600/20 border-blue-500 text-blue-300"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                <span>3. Cobro Mixto</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate hidden sm:block">
                Efectivo + Pago Móvil exacto
              </div>
            </button>

            <button
              onClick={() => handleSeekTo(24)}
              className={`p-2 rounded-xl border text-left transition-all ${
                currentPhase === 4
                  ? "bg-blue-600/20 border-blue-500 text-blue-300"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                <Printer className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                <span>4. Ticket Térmico</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate hidden sm:block">
                Impresión en 1 segundo
              </div>
            </button>
          </div>

          {/* Escena Visual del Terminal POS */}
          <div className="relative rounded-2xl bg-white border border-slate-200 text-slate-900 overflow-hidden shadow-xl min-h-[300px] flex flex-col justify-between p-4 sm:p-5">
            
            {/* Barra superior de la ventana POS */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span className="font-bold text-slate-800 font-mono">
                  ISAAC POS • CAJA PRINCIPAL #01
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  (Modo 100% Offline Activo)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold font-mono">
                  Tasa BCV Oficial: Bs. {bcvRate.toLocaleString("es-VE", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Contenido dinámico según el capítulo del video */}
            <div className="py-4 flex-1">
              {currentPhase === 1 && (
                /* Fase 1: Escaneo animado */
                <div className="animate-fadeIn space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-2 pb-1 border-b border-slate-100">
                    <span>Producto Escaneado</span>
                    <span>Cant.</span>
                    <span>Precio ($)</span>
                    <span>Total (Bs.)</span>
                  </div>
                  {currentProducts.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100 animate-slideDown"
                    >
                      <div className="flex items-center gap-2 font-medium text-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{p.name}</span>
                      </div>
                      <span className="font-mono text-slate-600">{p.qty}</span>
                      <span className="font-mono font-bold text-slate-900">
                        ${(p.qty * p.priceUsd).toFixed(2)}
                      </span>
                      <span className="font-mono text-blue-700 font-bold">
                        Bs. {(p.qty * p.priceUsd * bcvRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}

                  <div className="flex items-center justify-center gap-2 text-xs text-blue-600 font-medium pt-2">
                    <Barcode className="w-4 h-4 animate-bounce" />
                    <span>Lector de código de barras activo • Escaneando producto {visibleProductsCount} de 4...</span>
                  </div>
                </div>
              )}

              {currentPhase === 2 && (
                /* Fase 2: Tasa BCV y Conversión Instantánea */
                <div className="animate-fadeIn py-2">
                  <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                        Sincronización Automática Oficial
                      </div>
                      <div className="text-slate-800 text-sm font-medium">
                        Cálculo bimonetario sin calculadoras manuales ni redondeos confusos.
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs text-slate-500 font-medium">Tasa del Banco Central</div>
                      <div className="text-xl font-mono font-black text-blue-700">
                        Bs. {bcvRate.toLocaleString("es-VE", { minimumFractionDigits: 2 })} / USD
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                      <span className="text-xs text-slate-500 font-medium">Total en Dólares</span>
                      <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                        ${totalUsd.toFixed(2)} USD
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                      <span className="text-xs text-emerald-800 font-medium">Total en Bolívares</span>
                      <div className="text-2xl font-black text-emerald-700 font-mono mt-1">
                        Bs. {totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentPhase === 3 && (
                /* Fase 3: Cobro Mixto en Mostrador */
                <div className="animate-fadeIn p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
                    <span>Modal de Cobro Mixto Rápido</span>
                    <span className="text-emerald-700 font-mono">Total Venta: ${totalUsd.toFixed(2)} USD</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <span className="text-[11px] text-slate-500 block mb-1">Método 1: Efectivo USD</span>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-800">$10.00 USD</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          Recibido
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <span className="text-[11px] text-slate-500 block mb-1">Método 2: Pago Móvil (Restante)</span>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-blue-700">
                          Bs. {((totalUsd - 10) * bcvRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                          Referencia 8492
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Vuelto Calculado:</span>
                    <span className="text-emerald-700 font-mono font-black text-sm">
                      $0.00 USD (Cobro Exacto)
                    </span>
                  </div>
                </div>
              )}

              {currentPhase === 4 && (
                /* Fase 4: Impresión y Cierre Exitoso */
                <div className="animate-fadeIn flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
                  {/* Animación del Ticket Fiscal/Comanda */}
                  <div className="w-56 p-4 rounded-xl bg-white border border-slate-300 shadow-md text-[10px] font-mono text-slate-800 animate-slideDown">
                    <div className="text-center font-bold pb-2 border-b border-dashed border-slate-300">
                      <div>BODEGÓN EL SAMÁN, C.A.</div>
                      <div className="text-[9px] text-slate-500">RIF: J-50182948-2</div>
                    </div>
                    <div className="py-2 space-y-1 border-b border-dashed border-slate-300">
                      <div className="flex justify-between">
                        <span>2x Harina P.A.N.</span>
                        <span>$2.90</span>
                      </div>
                      <div className="flex justify-between">
                        <span>1x Café Fama 250g</span>
                        <span>$2.80</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Queso Llanero 0.85kg</span>
                        <span>$4.68</span>
                      </div>
                    </div>
                    <div className="pt-2 font-bold flex justify-between text-xs">
                      <span>TOTAL USD:</span>
                      <span>${totalUsd.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-blue-700 font-bold">
                      <span>TOTAL BS (BCV):</span>
                      <span>Bs. {totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="text-center text-[9px] text-slate-400 pt-2">
                      ¡GRACIAS POR SU COMPRA!
                    </div>
                  </div>

                  <div className="text-center sm:text-left space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Venta Completada en 2.4 Segundos</span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">
                      Ticket emitido en impresora térmica
                    </h4>
                    <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
                      El inventario fue descontado al instante y el dinero quedó registrado en el arqueo ciego de caja.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Resumen del Monto Inferior */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-500">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Base de datos local segura • Cero riesgo de pérdidas</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 font-mono mr-2">
                  Total: ${totalUsd.toFixed(2)} USD
                </span>
                <span className="text-sm font-black font-mono text-emerald-700">
                  Ref. Bs. {totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

          </div>

          {/* Barra de Controles de Video en la Parte Inferior */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col gap-2">
            
            {/* Barra de progreso interactiva (Scrubber) */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                handleSeekTo(ratio * TOTAL_DURATION_SEC);
              }}
              className="w-full h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative group"
            >
              <div
                className="h-full bg-blue-500 transition-all duration-200"
                style={{
                  width: `${(currentTime / TOTAL_DURATION_SEC) * 100}%`,
                }}
              />
            </div>

            {/* Controles de reproducción y tiempo */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all cursor-pointer shadow-md shadow-blue-600/30"
                  aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleRestart}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Reiniciar desde el inicio"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <span className="font-mono text-slate-400">
                  {formatSeconds(currentTime)} / {formatSeconds(TOTAL_DURATION_SEC)}
                </span>
              </div>

              {/* Botón de Acción Principal al Terminar o en Cualquier Momento */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenCheckoutModal) onOpenCheckoutModal("demo_gratis");
                  }}
                  className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  <span>Solicitar Demo para mi Negocio</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Barcode,
  ArrowRight,
  ShieldCheck,
  Monitor,
  ShoppingCart,
  Lock,
  QrCode,
  Store,
  ChevronDown,
  Search,
  CreditCard,
  Activity,
  Package,
  Sparkles,
  Banknote,
} from "lucide-react";

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckoutModal?: (plan?: string) => void;
}

interface RealDemoProduct {
  id: string;
  code: string;
  name: string;
  category: string;
  stock: string;
  priceUsd: number;
  qty: number;
  image: string;
}

const V24_PRODUCTS: RealDemoProduct[] = [
  {
    id: "1",
    code: "75910012041",
    name: "Arroz Primor Clásico 1kg",
    category: "VÍVERES",
    stock: "24 und",
    priceUsd: 1.45,
    qty: 2,
    image: "/real-products/arroz_clasico.png",
  },
  {
    id: "2",
    code: "75920481920",
    name: "Aceite Vegetal Vatel 1L",
    category: "VÍVERES",
    stock: "15 und",
    priceUsd: 2.95,
    qty: 1,
    image: "/real-products/aceite_vatel_1l.png",
  },
  {
    id: "3",
    code: "75914902218",
    name: "Café Arauca Molido 200g",
    category: "ALIMENTOS",
    stock: "18 und",
    priceUsd: 2.80,
    qty: 1,
    image: "/real-products/cafe_arauca.png",
  },
  {
    id: "4",
    code: "75911004492",
    name: "Refresco Coca-Cola 355ml",
    category: "BEBIDAS",
    stock: "40 und",
    priceUsd: 1.20,
    qty: 2,
    image: "/real-products/coca_cola.png",
  },
  {
    id: "5",
    code: "75930192831",
    name: "Leche Amanecer Completa",
    category: "LÁCTEOS",
    stock: "12 und",
    priceUsd: 3.20,
    qty: 1,
    image: "/real-products/leche_amanecer.png",
  },
  {
    id: "6",
    code: "75948201934",
    name: "Pasta Primor Corta 500g",
    category: "VÍVERES",
    stock: "30 und",
    priceUsd: 1.10,
    qty: 1,
    image: "/real-products/pasta_primor_500grs.png",
  },
  {
    id: "7",
    code: "75988192011",
    name: "Malta Polar Botella",
    category: "BEBIDAS",
    stock: "35 und",
    priceUsd: 1.15,
    qty: 1,
    image: "/real-products/malta.png",
  },
  {
    id: "8",
    code: "75977102938",
    name: "Diablitos Underwood 100g",
    category: "CHARCUTERÍA",
    stock: "20 und",
    priceUsd: 1.75,
    qty: 1,
    image: "/real-products/diablito.png",
  },
];

const TOTAL_DURATION_SEC = 40;

export const VideoDemoModal: React.FC<VideoDemoModalProps> = ({
  isOpen,
  onClose,
  onOpenCheckoutModal,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [bcvRate, setBcvRate] = useState(896.12);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentTime(0);
      setIsPlaying(true);
      fetch("/api/bcv")
        .then((res) => res.json())
        .then((json) => {
          if (json?.data?.rate && typeof json.data.rate === "number") {
            setBcvRate(json.data.rate);
          }
        })
        .catch(() => {});
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION_SEC) {
            setIsPlaying(false);
            return TOTAL_DURATION_SEC;
          }
          return Number((prev + 0.1).toFixed(1));
        });
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isOpen]);

  if (!isOpen) return null;

  // 5 escenas reales de 8 segundos cada una (Total: 40s)
  // 00s - 10s: Fase 1 -> Terminal POS V24.04 Real (Catálogo visual + Escaneo de productos al Ticket #1)
  // 10s - 18s: Fase 2 -> Visor de Cliente 2da Pantalla (/#/display) + QR Dinámico Pago Móvil BDV
  // 18s - 26s: Fase 3 -> Arqueo Ciego de Caja por Denominación de Billetes ($100, $50, $20, $10)
  // 26s - 33s: Fase 4 -> Inventario, Kardex, Modo Farmacia e Importador de Facturas OCR
  // 33s - 40s: Fase 5 -> Torre de Control en Tiempo Real y Centro de Auditoría Inmutable
  const currentPhase =
    currentTime < 10
      ? 1
      : currentTime < 18
      ? 2
      : currentTime < 26
      ? 3
      : currentTime < 33
      ? 4
      : 5;

  // En Fase 1, los primeros 4 productos se van escaneando progresivamente cada 2 segundos
  const scannedCount =
    currentTime < 2
      ? 1
      : currentTime < 4.2
      ? 2
      : currentTime < 6.4
      ? 3
      : 4;

  const activeCart = V24_PRODUCTS.slice(0, scannedCount);
  const lastScannedProduct = activeCart[activeCart.length - 1];

  const totalUsd = activeCart.reduce(
    (sum, item) => sum + item.qty * item.priceUsd,
    0
  );
  const totalBs = totalUsd * bcvRate;

  // Animación progresiva del conteo de billetes en Fase 3 (Arqueo Ciego)
  const arqueoProgress = Math.max(0, Math.min(1, (currentTime - 18) / 6));
  const bills20 = arqueoProgress > 0.15 ? 4 : 0; // $80
  const bills10 = arqueoProgress > 0.35 ? 3 : 0; // $30
  const bills5 = arqueoProgress > 0.55 ? 4 : 0;  // $20
  const bills1 = arqueoProgress > 0.72 ? 5 : 0;  // $5
  const totalCountedUsd = bills20 * 20 + bills10 * 10 + bills5 * 5 + bills1 * 1;
  const arqueoVerified = currentTime >= 23.2;

  // Subtítulo narrativo en vivo según la escena
  const liveNarration =
    currentPhase === 1
      ? `Escaneando "${lastScannedProduct.name}" (${lastScannedProduct.code}) • Conversión instantánea a tasa BCV (Bs. ${bcvRate.toFixed(2)}/$)`
      : currentPhase === 2
      ? `2da Pantalla del Cliente (/#/display): proyecta la cuenta en vivo y genera el código QR de Pago Móvil por Bs. ${totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : currentPhase === 3
      ? "Módulo de Control de Caja: el cajero cuenta físicamente cada billete en gaveta a ciegas, sin ver el saldo esperado del sistema"
      : currentPhase === 4
      ? "Control de Stock & Kardex (895 SKUs): valorización de inversión, Modo Farmacia (psicotrópicos/vencimientos) y lectura OCR de facturas"
      : "Torre de Control y Auditoría Forense: supervisión remota de cajas en tiempo real y bitácora inmutable de seguridad";

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#070a11] border border-slate-700/90 rounded-2xl sm:rounded-3xl w-full max-w-6xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden relative flex flex-col text-white max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. CABECERA DEL REPRODUCTOR */}
        <div className="bg-[#05080f] px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/90 border border-emerald-700/70 px-2.5 py-1 rounded-full font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>REPRODUCCIÓN DEL SISTEMA REAL V24.04</span>
            </span>
            <div className="hidden md:block">
              <h3 className="font-bold text-xs sm:text-sm text-white">
                Recorrido Operativo Completo • Isaac POS V24.04 Ultra
              </h3>
            </div>
          </div>

          {/* Selector de los 5 Capítulos Reales */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-[11px] font-mono">
            <button
              onClick={() => handleSeekTo(0)}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPhase === 1
                  ? "bg-blue-600 text-white font-bold shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShoppingCart className="w-3 h-3" />
              <span>1. Terminal POS</span>
            </button>
            <button
              onClick={() => handleSeekTo(10)}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPhase === 2
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>2. Visor QR 2da Pantalla</span>
            </button>
            <button
              onClick={() => handleSeekTo(18)}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPhase === 3
                  ? "bg-blue-600 text-white font-bold shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Banknote className="w-3 h-3" />
              <span>3. Arqueo Ciego</span>
            </button>
            <button
              onClick={() => handleSeekTo(26)}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPhase === 4
                  ? "bg-blue-600 text-white font-bold shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Package className="w-3 h-3" />
              <span>4. Inventario & OCR</span>
            </button>
            <button
              onClick={() => handleSeekTo(33)}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPhase === 5
                  ? "bg-blue-600 text-white font-bold shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>5. Auditoría & Cajas</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleRestart}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Reiniciar demostración"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Selector de capítulos compacto para móviles/tablets */}
        <div className="flex lg:hidden items-center gap-1.5 px-3 py-2 bg-[#080c14] border-b border-slate-800 overflow-x-auto scrollbar-none text-[11px] font-mono">
          <button
            onClick={() => handleSeekTo(0)}
            className={`px-2.5 py-1 rounded-lg shrink-0 ${
              currentPhase === 1 ? "bg-blue-600 text-white font-bold" : "bg-slate-900 text-slate-400"
            }`}
          >
            1. Terminal POS
          </button>
          <button
            onClick={() => handleSeekTo(10)}
            className={`px-2.5 py-1 rounded-lg shrink-0 ${
              currentPhase === 2 ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-400"
            }`}
          >
            2. Visor QR Cliente
          </button>
          <button
            onClick={() => handleSeekTo(18)}
            className={`px-2.5 py-1 rounded-lg shrink-0 ${
              currentPhase === 3 ? "bg-blue-600 text-white font-bold" : "bg-slate-900 text-slate-400"
            }`}
          >
            3. Arqueo Ciego
          </button>
          <button
            onClick={() => handleSeekTo(26)}
            className={`px-2.5 py-1 rounded-lg shrink-0 ${
              currentPhase === 4 ? "bg-blue-600 text-white font-bold" : "bg-slate-900 text-slate-400"
            }`}
          >
            4. Inventario & OCR
          </button>
          <button
            onClick={() => handleSeekTo(33)}
            className={`px-2.5 py-1 rounded-lg shrink-0 ${
              currentPhase === 5 ? "bg-blue-600 text-white font-bold" : "bg-slate-900 text-slate-400"
            }`}
          >
            5. Auditoría
          </button>
        </div>

        {/* ============================================================== */}
        {/* 2. ESCENARIO DEL SOFTWARE REAL ISAAC POS V24.04                 */}
        {/* ============================================================== */}
        <div className="relative flex-1 bg-[#080c14] overflow-y-auto flex flex-col justify-between min-h-[440px] sm:min-h-[510px]">
          
          {/* BARRA SUPERIOR AUTÉNTICA V24.04 (Presente en los módulos de escritorio) */}
          {currentPhase !== 2 && (
            <div className="bg-[#0b101b] px-4 py-2 border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-2 text-xs select-none">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-cyan-500/40 p-0.5 flex items-center justify-center">
                  <img
                    src="/isaac-logo-ultra.png"
                    alt="Isaac POS"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-white text-sm">Isaac</span>
                  <span className="bg-slate-800 border border-slate-700 text-slate-200 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                    POS
                  </span>
                </div>
                <div className="ml-2 bg-slate-900 border border-slate-700/80 px-2.5 py-1 rounded-full font-mono text-[11px] flex items-center gap-1.5">
                  <span className="text-slate-400">$ 1$ =</span>
                  <span className="text-white font-bold">
                    {bcvRate.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-slate-900 border border-emerald-500/40 px-2.5 py-1 rounded-full text-emerald-400 font-mono font-bold text-[10px] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>En línea</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-full text-slate-300 font-mono text-[10px]">
                  <QrCode className="w-3 h-3 text-slate-400" />
                  <span>Vincular WA</span>
                </div>
                <div className="hidden md:flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-full text-white font-semibold text-[11px]">
                  <Store className="w-3 h-3 text-cyan-400" />
                  <span>Sede Central</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                  <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 font-bold flex items-center justify-center text-[10px]">
                    A
                  </div>
                  <div className="hidden sm:block leading-none text-left">
                    <div className="text-[10px] font-bold text-white">ADMIN DEMO</div>
                    <div className="text-[9px] text-slate-400 font-mono">Superadmin</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTENIDO DE LA ESCENA ACTIVA */}
          <div className="flex-1 flex flex-col justify-between">
            {/* ============================================================ */}
            {/* ESCENA 1: TERMINAL DE VENTAS V24.04 EN VIVO                  */}
            {/* ============================================================ */}
            {currentPhase === 1 && (
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[420px] animate-fadeIn">
                {/* Sidebar izquierdo idéntico a V24.04 (2 cols) */}
                <div className="hidden lg:flex lg:col-span-2 bg-[#060911] border-r border-slate-800/80 p-3 flex-col justify-between text-[11px]">
                  <div className="space-y-3">
                    <div>
                      <div className="text-[9px] font-mono text-slate-500 uppercase px-2 mb-1">
                        OPERACIONES
                      </div>
                      <div className="px-2.5 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold flex items-center gap-2">
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>POS (Venta)</span>
                      </div>
                      <div className="px-2.5 py-1.5 text-slate-400 flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-slate-500" />
                        <span>Control de Caja</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-mono text-slate-500 uppercase px-2 mb-1">
                        INVENTARIO & CATÁLOGO
                      </div>
                      <div className="px-2.5 py-1 text-slate-400">Inventario</div>
                      <div className="px-2.5 py-1 text-slate-400">Ofertas</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-mono text-slate-500 uppercase px-2 mb-1">
                        SEGURIDAD & CONTROL
                      </div>
                      <div className="px-2.5 py-1 text-slate-400">Auditoría</div>
                      <div className="px-2.5 py-1 text-slate-400">Monitoreo de Cajas</div>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                    ● SQLite Local Offline
                  </div>
                </div>

                {/* Centro: Catálogo Táctil V24.04 con productos escaneándose (6 cols) */}
                <div className="lg:col-span-6 p-3 sm:p-4 bg-[#090d16] flex flex-col justify-between">
                  <div>
                    {/* Barra de búsqueda con notificación de lector láser en vivo */}
                    <div className="flex items-center justify-between gap-2 bg-[#0f1624] border border-cyan-500/50 rounded-xl px-3 py-2 mb-3 shadow-inner">
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 truncate">
                        <Barcode className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
                        <span className="truncate">
                          Lector USB Activo: [{lastScannedProduct.code}] {lastScannedProduct.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
                        +1 Agregado
                      </span>
                    </div>

                    {/* Categorías V24.04 */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2.5 text-[10px] font-bold scrollbar-none">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-white border border-slate-700">
                        Todas 895
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#0d131f] text-slate-400">
                        Víveres 597
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#0d131f] text-slate-400">
                        Bebidas 37
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#0d131f] text-slate-400">
                        Charcutería
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#0d131f] text-slate-400">
                        Farmacia 19
                      </span>
                    </div>

                    {/* Grid de Tarjetas de Productos V24.04 */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {V24_PRODUCTS.map((prod, idx) => {
                        const isJustScanned = idx === scannedCount - 1;
                        const isAlreadyInCart = idx < scannedCount;
                        const prodBs = prod.priceUsd * bcvRate;
                        return (
                          <div
                            key={prod.id}
                            className={`rounded-xl p-2 border transition-all relative ${
                              isJustScanned
                                ? "bg-[#132038] border-emerald-400 ring-2 ring-emerald-400/40 scale-[1.03]"
                                : isAlreadyInCart
                                ? "bg-[#0e1626] border-blue-500/50"
                                : "bg-[#0c121e] border-slate-800/90 opacity-85"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[9px] font-mono font-bold text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded">
                                {prod.stock}
                              </span>
                              {isAlreadyInCart && (
                                <span className="text-[9px] font-mono font-black bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded">
                                  x{prod.qty}
                                </span>
                              )}
                            </div>
                            <div className="w-full h-16 bg-white rounded-lg p-1.5 mb-1.5 flex items-center justify-center">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="text-[10px] font-bold text-white truncate mb-1">
                              {prod.name}
                            </div>
                            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 font-mono">
                              <span className="text-[10px] font-black text-white">
                                Bs {prodBs.toFixed(0)}
                              </span>
                              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/80 px-1 rounded">
                                ${prod.priceUsd.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Derecha: Panel Ticket #1 en Vivo (4 cols) */}
                <div className="lg:col-span-4 bg-[#070b12] border-t lg:border-t-0 lg:border-l border-slate-800 p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-800 text-xs">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Ticket #1 ({activeCart.reduce((s, i) => s + i.qty, 0)} art.)</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        Cliente Ocasional • F8
                      </span>
                    </div>

                    <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                      {activeCart.map((item) => {
                        const itemUsd = item.priceUsd * item.qty;
                        const itemBs = itemUsd * bcvRate;
                        return (
                          <div
                            key={item.id}
                            className="bg-[#0d1422] border border-slate-800 rounded-xl p-2 flex items-center justify-between text-xs animate-fadeIn"
                          >
                            <div className="min-w-0 flex-1 pr-2">
                              <div className="font-bold text-white truncate text-[11px]">
                                {item.name}
                              </div>
                              <div className="text-[10px] font-mono text-slate-400">
                                {item.qty} x ${item.priceUsd.toFixed(2)}
                              </div>
                            </div>
                            <div className="text-right font-mono shrink-0">
                              <div className="font-black text-emerald-400 text-xs">
                                ${itemUsd.toFixed(2)}
                              </div>
                              <div className="text-[10px] text-slate-300">
                                Bs {itemBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Caja de Total Bimonetario idéntica a V24.04 */}
                  <div className="pt-3 border-t border-slate-800">
                    <div className="bg-[#0d1422] border border-slate-800 rounded-xl p-3 mb-2.5 flex items-end justify-between">
                      <div>
                        <div className="text-[9px] font-mono uppercase text-slate-400 font-bold">
                          TOTAL A PAGAR
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-white font-mono leading-none mt-1">
                          Bs {totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-[9px] uppercase text-slate-400">Ref. Divisas</div>
                        <div className="text-lg font-black text-emerald-400">
                          ${totalUsd.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => handleSeekTo(10)}
                      className={`w-full py-2.5 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        currentTime > 8
                          ? "bg-emerald-400 text-slate-950 ring-4 ring-emerald-400/30 scale-[1.02]"
                          : "bg-emerald-500 text-slate-950"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pagar ahora [F2] → Abrir Visor QR</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* ESCENA 2: VISOR DE CLIENTE 2DA PANTALLA + QR PAGO MÓVIL REAL */}
            {/* ============================================================ */}
            {currentPhase === 2 && (
              <div className="flex-1 bg-[#dce8f5] text-slate-900 p-4 sm:p-6 flex flex-col justify-between animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-300">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                      IP
                    </div>
                    <div>
                      <div className="font-black text-sm text-slate-950">MINIMARKET DEMO</div>
                      <div className="text-[11px] text-slate-600">
                        Caja 1 • Le atiende con gusto: CAJERO 1
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold">
                      Tasa BCV: Bs {bcvRate.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs/$
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-bold">
                      2DA PANTALLA CLIENTE (/#/display)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
                  {/* Artículos auditados por el cliente */}
                  <div className="lg:col-span-7 bg-[#e7f0fa] border border-white rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-[11px] font-mono font-bold text-slate-500 pb-2 mb-3 border-b border-slate-300/70">
                        <span>ARTÍCULOS EN CAJA ({activeCart.reduce((s, i) => s + i.qty, 0)})</span>
                        <span>SUBTOTAL</span>
                      </div>
                      <div className="space-y-2">
                        {activeCart.map((item) => (
                          <div
                            key={item.id}
                            className="bg-[#dce8f6] border border-blue-200/80 rounded-xl p-2.5 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-lg bg-blue-100 border border-blue-200 font-mono font-black text-slate-900 flex items-center justify-center">
                                {item.qty}x
                              </span>
                              <div>
                                <div className="font-bold text-slate-900">{item.name}</div>
                                <div className="text-[10px] font-mono text-slate-500">
                                  ${item.priceUsd.toFixed(2)} c/u
                                </div>
                              </div>
                            </div>
                            <div className="text-right font-mono">
                              <div className="font-black text-slate-950">
                                ${(item.priceUsd * item.qty).toFixed(2)}
                              </div>
                              <div className="text-[10px] text-slate-600 font-semibold">
                                Bs {(item.priceUsd * item.qty * bcvRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {currentTime >= 14.5 && (
                      <div className="mt-3 p-3 rounded-xl bg-emerald-600 text-white flex items-center justify-between text-xs font-bold shadow-md animate-fadeIn">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>¡Pago Móvil QR verificado e Impresión Térmica ESC/POS enviada!</span>
                        </div>
                        <span className="font-mono text-[11px] bg-white/20 px-2 py-0.5 rounded">
                          Ref #849201
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tarjeta Derecha: Total + QR Pago Móvil Real */}
                  <div className="lg:col-span-5 flex flex-col gap-3">
                    <div className="bg-[#e7f0fa] border border-white rounded-2xl p-4 shadow-sm">
                      <div className="text-[10px] font-mono uppercase font-bold text-slate-500">
                        TOTAL A PAGAR
                      </div>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-3xl font-black text-slate-950 font-mono">
                          ${totalUsd.toFixed(2)}
                        </span>
                        <span className="text-xl font-black text-emerald-800 font-mono">
                          Bs {totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#e7f0fa] border border-white rounded-2xl p-4 shadow-sm flex-1 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <QrCode className="w-4 h-4 text-blue-700" />
                          <span className="text-xs font-black text-slate-900">
                            PAGO MÓVIL • ESCANEA DESDE TU APP BANCARIA
                          </span>
                        </div>
                      </div>

                      <div className="my-2 flex items-center justify-center gap-4">
                        <div className="p-2.5 bg-white rounded-2xl border-2 border-blue-500 shadow-md">
                          <QrCode className="w-20 h-20 text-slate-950" />
                        </div>
                        <div className="space-y-1 text-[11px]">
                          <div className="bg-[#dce8f6] px-2.5 py-1 rounded border border-blue-200">
                            <span className="text-slate-500">Banco: </span>
                            <strong className="text-slate-900">BDV (0102)</strong>
                          </div>
                          <div className="bg-[#dce8f6] px-2.5 py-1 rounded border border-blue-200 font-mono">
                            <span className="text-slate-500">RIF: </span>
                            <strong className="text-slate-900">V-00.000.000</strong>
                          </div>
                          <div className="bg-[#dce8f6] px-2.5 py-1 rounded border border-blue-200 font-mono">
                            <span className="text-slate-500">Tel: </span>
                            <strong className="text-slate-900">0414 0000000</strong>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-[#d3e2f4] border border-blue-300 text-center font-mono">
                        <span className="text-[10px] text-slate-600 uppercase block font-bold">
                          MONTO EXACTO A TRANSFERIR
                        </span>
                        <span className="text-sm font-black text-slate-950">
                          Bs {totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* ESCENA 3: ARQUEO CIEGO DE CAJA POR BILLETES V24.04           */}
            {/* ============================================================ */}
            {currentPhase === 3 && (
              <div className="flex-1 bg-[#0b101b] p-4 sm:p-6 flex items-center justify-center animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center max-w-5xl w-full">
                  {/* Tarjeta Interactiva de Conteo por Billetes V24.04 */}
                  <div className="lg:col-span-6 bg-[#111827] border border-slate-800 rounded-2xl p-5 shadow-2xl">
                    <div className="text-center mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-2">
                        <Lock className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-black text-white">
                        Arqueo Ciego de Caja • Conteo por Billetes
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Caja 1 • CAJERO PRINCIPAL (El sistema oculta el saldo esperado)
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4 font-mono text-xs">
                      <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-2.5 flex items-center justify-between">
                        <span className="font-bold text-slate-300">$100</span>
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400">0</span>
                      </div>
                      <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-2.5 flex items-center justify-between">
                        <span className="font-bold text-slate-300">$50</span>
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400">0</span>
                      </div>
                      <div className={`border rounded-xl p-2.5 flex items-center justify-between transition-all ${bills20 > 0 ? "bg-emerald-950/40 border-emerald-500/50" : "bg-[#0b101b] border-slate-800"}`}>
                        <span className="font-bold text-white">$20</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black">{bills20}</span>
                      </div>
                      <div className={`border rounded-xl p-2.5 flex items-center justify-between transition-all ${bills10 > 0 ? "bg-emerald-950/40 border-emerald-500/50" : "bg-[#0b101b] border-slate-800"}`}>
                        <span className="font-bold text-white">$10</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black">{bills10}</span>
                      </div>
                      <div className={`border rounded-xl p-2.5 flex items-center justify-between transition-all ${bills5 > 0 ? "bg-emerald-950/40 border-emerald-500/50" : "bg-[#0b101b] border-slate-800"}`}>
                        <span className="font-bold text-white">$5</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black">{bills5}</span>
                      </div>
                      <div className={`border rounded-xl p-2.5 flex items-center justify-between transition-all ${bills1 > 0 ? "bg-emerald-950/40 border-emerald-500/50" : "bg-[#0b101b] border-slate-800"}`}>
                        <span className="font-bold text-white">$1</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black">{bills1}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-between font-mono mb-3">
                      <span className="text-xs font-bold text-emerald-400">
                        TOTAL CONTADO EN GAVETA:
                      </span>
                      <span className="text-lg font-black text-emerald-400">
                        ${totalCountedUsd.toFixed(2)} USD
                      </span>
                    </div>

                    {arqueoVerified ? (
                      <div className="p-3 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-between animate-fadeIn">
                        <span>✓ CORTE Z EMITIDO • CUADRE EXACTO ($135.00)</span>
                        <span className="font-mono">DIFERENCIA: $0.00</span>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-blue-600 text-white font-bold text-xs text-center">
                        Contando billetes físicos antes de emitir Corte Z...
                      </div>
                    )}
                  </div>

                  {/* Captura Real del Módulo de Arqueo V24.04 */}
                  <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                    <Image
                      src="/real-system/v24_control_caja_arqueo.png"
                      alt="Control de Caja y Arqueo Ciego Real V24.04"
                      width={1024}
                      height={585}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* ESCENA 4: INVENTARIO, KARDEX, FARMACIA & OCR V24.04          */}
            {/* ============================================================ */}
            {currentPhase === 4 && (
              <div className="flex-1 bg-[#0b101b] p-4 sm:p-6 flex items-center justify-center animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center max-w-6xl w-full">
                  <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative">
                    <Image
                      src="/real-system/v24_inventario_kardex.png"
                      alt="Inventario y Kardex Real V24.04"
                      width={1024}
                      height={551}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="lg:col-span-5 space-y-3">
                    <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
                      <Image
                        src="/real-system/v24_importador_facturas_ocr.png"
                        alt="Importador de Facturas OCR V24.04"
                        width={1024}
                        height={551}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                      <div className="font-bold text-emerald-400 font-mono flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>KARDEX + MODO FARMACIA + IMPORTADOR OCR</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        Controla 895+ SKUs con inversión a costo ($11,666.79), utilidad proyectada (+31.7%), alertas de vencimiento (&lt; 60 días) y carga de facturas de proveedores en PDF/foto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* ESCENA 5: TORRE DE CONTROL & AUDITORÍA INMUTABLE V24.04      */}
            {/* ============================================================ */}
            {currentPhase === 5 && (
              <div className="flex-1 bg-[#0b101b] p-4 sm:p-6 flex items-center justify-center animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center max-w-6xl w-full">
                  <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                    <div className="bg-slate-900 px-3 py-1.5 border-b border-slate-800 text-[10px] font-mono text-emerald-400 font-bold">
                      ● MONITOREO REMOTO DE CAJAS Y FEED DE COBROS EN VIVO
                    </div>
                    <Image
                      src="/real-system/v24_monitoreo_cajas_remoto.png"
                      alt="Monitoreo de Cajas en Tiempo Real V24.04"
                      width={1024}
                      height={551}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                    <div className="bg-slate-900 px-3 py-1.5 border-b border-slate-800 text-[10px] font-mono text-blue-400 font-bold">
                      ● CENTRO DE AUDITORÍA FORENSE INMUTABLE (6002 EVENTOS)
                    </div>
                    <Image
                      src="/real-system/v24_centro_auditoria.png"
                      alt="Centro de Auditoría y Seguridad V24.04"
                      width={1024}
                      height={551}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SUBTÍTULO NARRATIVO EN VIVO (Estilo Teleprompter Oficial) */}
          <div className="bg-[#05080f]/95 border-t border-slate-800 px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-200 truncate">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
              <span className="font-medium truncate">{liveNarration}</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 shrink-0 hidden sm:inline">
              Escena {currentPhase} de 5
            </span>
          </div>
        </div>

        {/* 3. CONTROLES DE REPRODUCCIÓN Y LLAMADO A LA ACCIÓN */}
        <div className="bg-[#05080f] px-4 py-3 border-t border-slate-800 flex flex-col gap-2.5">
          {/* Barra de tiempo interactiva */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              handleSeekTo(ratio * TOTAL_DURATION_SEC);
            }}
            className="w-full h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative"
          >
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-150"
              style={{
                width: `${(currentTime / TOTAL_DURATION_SEC) * 100}%`,
              }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all cursor-pointer shadow-md shadow-blue-600/30"
                aria-label={isPlaying ? "Pausar demostración" : "Reproducir demostración"}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={handleRestart}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Reiniciar desde el segundo 0:00"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <span className="font-mono text-slate-400">
                {formatSeconds(currentTime)} / {formatSeconds(TOTAL_DURATION_SEC)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenCheckoutModal) onOpenCheckoutModal("vitalicia");
                }}
                className="hidden sm:flex py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Ver Licencia Vitalicia ($199)</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenCheckoutModal) onOpenCheckoutModal("demo_gratis");
                }}
                className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <span>Solicitar Demo para mi Negocio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

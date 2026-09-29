"use client";

import React from "react";
import {
  ShoppingCart,
  Search,
  Barcode,
  Moon,
  Sun,
  Zap,
  User,
  Pause,
  Gift,
  CreditCard,
  QrCode,
  Store,
  ChevronDown,
  Volume2,
  FileText,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function TerminalPreviewPage() {
  const bcvRate = 920.0;

  const products = [
    {
      id: "1",
      name: "HARINA PAN BLANCA 1KG",
      category: "ALIMENTOS",
      priceUsd: 1.25,
      stock: 24,
      image: "/real-products/arroz_clasico.png", // fallback cleanly
      tag: "VÍVERES",
    },
    {
      id: "2",
      name: "ARROZ PRIMOR CLÁSICO 1KG",
      category: "ALIMENTOS",
      priceUsd: 1.45,
      stock: 30,
      image: "/real-products/arroz_clasico.png",
      tag: "VÍVERES",
    },
    {
      id: "3",
      name: "CAFÉ ARAUCA MOLIDO 200G",
      category: "ALIMENTOS",
      priceUsd: 2.8,
      stock: 18,
      image: "/real-products/cafe_arauca.png",
      tag: "VÍVERES",
    },
    {
      id: "4",
      name: "ACEITE VEGETAL VATEL 1L",
      category: "ALIMENTOS",
      priceUsd: 2.95,
      stock: 15,
      image: "/real-products/aceite_vatel_1l.png",
      tag: "VÍVERES",
    },
    {
      id: "5",
      name: "REFRESCO COCA-COLA 355ML",
      category: "BEBIDAS",
      priceUsd: 1.2,
      stock: 45,
      image: "/real-products/coca_cola.png",
      tag: "BEBIDAS",
    },
    {
      id: "6",
      name: "MALTA POLAR BOTELLA",
      category: "BEBIDAS",
      priceUsd: 1.15,
      stock: 35,
      image: "/real-products/malta.png",
      tag: "BEBIDAS",
    },
    {
      id: "7",
      name: "REFRESCO PEPSI 1.5L",
      category: "BEBIDAS",
      priceUsd: 1.8,
      stock: 22,
      image: "/real-products/pepsi.jpg",
      tag: "BEBIDAS",
    },
    {
      id: "8",
      name: "PASTA PRIMOR CORTA 500G",
      category: "ALIMENTOS",
      priceUsd: 1.1,
      stock: 28,
      image: "/real-products/pasta_primor_500grs.png",
      tag: "VÍVERES",
    },
    {
      id: "9",
      name: "LECHE AMANECER COMPLETA",
      category: "ALIMENTOS",
      priceUsd: 3.2,
      stock: 12,
      image: "/real-products/leche_amanecer.png",
      tag: "LÁCTEOS",
    },
    {
      id: "10",
      name: "DIABLITOS UNDERWOOD 100G",
      category: "ALIMENTOS",
      priceUsd: 1.75,
      stock: 20,
      image: "/real-products/diablito.png",
      tag: "VÍVERES",
    },
  ];

  const categories = [
    "TODAS",
    "ALIMENTOS",
    "BEBIDAS",
    "CHARCUTERÍA",
    "FARMACIA",
    "GENERAL",
    "GOLOSINAS",
    "HIGIENE PERSONAL",
    "LIMPIEZA",
  ];

  return (
    <div className="w-[1400px] h-[780px] bg-[#070a11] text-slate-100 flex flex-col font-sans select-none overflow-hidden">
      
      {/* 1. BARRA DE VENTANA NATIVA DE WINDOWS */}
      <div className="bg-[#0b0f19] px-3 py-1.5 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded overflow-hidden">
            <img
              src="/isaac-logo-ultra.png"
              alt="Isaac POS Icon"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-slate-300 font-semibold text-[11px]">Isaac POS V24.04</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <span>_</span>
          <span>□</span>
          <span className="text-rose-400">✕</span>
        </div>
      </div>

      {/* 2. BARRA SUPERIOR DE LA APLICACIÓN */}
      <div className="bg-[#080c14] px-4 py-2 border-b border-slate-800/90 flex items-center justify-between gap-4 text-xs shrink-0">
        
        {/* Marca Oficial Izquierda */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/40 p-1 flex items-center justify-center shadow-inner">
            <img
              src="/isaac-logo-ultra.png"
              alt="Isaac POS"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black text-white">Isaac</span>
              <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded font-mono">
                POS
              </span>
            </div>
            <div className="text-[9px] font-mono font-bold text-emerald-400 tracking-widest uppercase">
              PUNTO DE VENTA
            </div>
          </div>
        </div>

        {/* Tasa BCV y Estado de Red */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900/90 border border-slate-700/80 px-3 py-1 rounded-full text-emerald-400 font-mono font-black text-xs flex items-center gap-1.5 shadow-sm">
            <span>$ 1 USD =</span>
            <span className="text-white">{bcvRate.toFixed(2)} Bs</span>
          </div>

          <div className="bg-slate-900/90 border border-emerald-500/40 px-3 py-1 rounded-full text-emerald-400 font-mono font-bold text-[11px] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>EN LÍNEA</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-amber-500/30 px-3 py-1 rounded-full text-amber-300 font-mono text-[10px]">
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            <span>ESCANEAR QR • VINCULADO</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-700 px-3 py-1 rounded-full text-slate-300 text-xs">
            <Store className="w-3.5 h-3.5 text-cyan-400" />
            <span>SUCURSAL: <strong className="text-white">Central Demo</strong></span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        {/* Selector de Tema y Usuario */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-700/80 text-[10px] font-mono">
            <span className="px-2.5 py-1 rounded flex items-center gap-1 bg-slate-800 text-cyan-300 font-bold">
              <Moon className="w-2.5 h-2.5" />
              <span>OSCURO</span>
            </span>
            <span className="px-2.5 py-1 rounded flex items-center gap-1 text-slate-400">
              <Sun className="w-2.5 h-2.5" />
              <span>CLARO</span>
            </span>
            <span className="px-2.5 py-1 rounded flex items-center gap-1 text-slate-400">
              <Zap className="w-2.5 h-2.5 text-amber-400" />
              <span>OLED</span>
            </span>
          </div>

          <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              M
            </div>
            <div className="text-left leading-none">
              <div className="text-xs font-bold text-white">Manuel</div>
              <div className="text-[9px] text-emerald-400 font-mono">SUPERADMIN</div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. CONTENEDOR PRINCIPAL */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* PANEL IZQUIERDO (Sidebar de 220px) */}
        <div className="w-56 bg-[#060910] border-r border-slate-800/80 p-3 flex flex-col justify-between shrink-0 text-xs">
          <div className="space-y-4">
            
            {/* OPERACIONES */}
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider px-2 mb-1.5">
                • OPERACIONES
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20">
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>POS (Venta)</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Control de Caja</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Gestor de Ventas</span>
                </div>
              </div>
            </div>

            {/* CLIENTES & CRÉDITOS */}
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider px-2 mb-1.5">
                • CLIENTES & CRÉDITOS
              </div>
              <div className="space-y-1">
                <div className="px-3 py-1.5 rounded-lg text-slate-400">
                  <span>Clientes & Directorio</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg text-slate-400">
                  <span>Cuentas por Cobrar</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg text-slate-400">
                  <span>Radar de Cobranza</span>
                </div>
              </div>
            </div>

            {/* INVENTARIO & PRODUCCIÓN */}
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider px-2 mb-1.5">
                • INVENTARIO & PRODUCCIÓN
              </div>
              <div className="space-y-1">
                <div className="px-3 py-1.5 rounded-lg text-slate-400">
                  <span>Inventario & Stock</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg text-slate-400">
                  <span>Almacenes & Logística</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg text-slate-400">
                  <span>Producción & BOM</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg text-slate-400">
                  <span>Promociones & Ofertas</span>
                </div>
              </div>
            </div>

            {/* COMPRAS & PROVEEDORES */}
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider px-2 mb-1.5">
                • COMPRAS & PROVEEDORES
              </div>
              <div className="space-y-1">
                <div className="px-3 py-1.5 rounded-lg text-slate-400">
                  <span>Proveedores & Compras</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg text-slate-400">
                  <span>Cuentas por Pagar</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg text-emerald-400 font-semibold">
                  <span>Importador PDF</span>
                </div>
              </div>
            </div>

          </div>

          <div className="text-[10px] text-slate-300 font-mono px-2 pt-2 border-t border-slate-900">
            • TESORERÍA & TRIBUTOS
          </div>
        </div>

        {/* PANEL CENTRAL: Catálogo de 5 columnas */}
        <div className="flex-1 bg-[#090d16] p-4 flex flex-col justify-between overflow-hidden">
          <div>
            
            {/* Buscador */}
            <div className="flex items-center gap-3 mb-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  readOnly
                  value=""
                  placeholder="Buscar producto... (F4)"
                  className="w-full bg-[#0d131f] border border-slate-800 rounded-xl pl-10 pr-9 py-2 text-xs text-white placeholder-slate-500 font-mono"
                />
                <Barcode className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>

              {/* Selector de Moneda */}
              <div className="flex items-center bg-[#0d131f] border border-slate-800 rounded-xl p-0.5 text-xs font-mono font-bold">
                <span className="px-3 py-1 rounded-lg bg-cyan-500 text-slate-950">
                  Bs
                </span>
                <span className="px-3 py-1 rounded-lg text-slate-400">
                  $
                </span>
              </div>

              {/* Botones Rápidos */}
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <span className="px-3 py-1.5 rounded-lg bg-[#0d131f] border border-slate-800">
                  ☆ POPULARES
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0d131f] border border-slate-800">
                  % OFERTAS
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0d131f] border border-slate-800">
                  ✨ NUEVOS
                </span>
              </div>
            </div>

            {/* Categorías */}
            <div className="flex items-center gap-1.5 pb-2.5 mb-3">
              {categories.map((cat, idx) => (
                <span
                  key={cat}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                    idx === 0
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-[#0d131f] text-slate-400"
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Grid de 5 columnas */}
            <div className="grid grid-cols-5 gap-3">
              {products.map((p) => {
                const priceBs = p.priceUsd * bcvRate;
                return (
                  <div
                    key={p.id}
                    className="bg-[#0d131f] border border-slate-800/90 rounded-xl p-2.5 flex flex-col justify-between h-[230px]"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-800">
                          {p.stock} UND
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 uppercase">
                          {p.tag}
                        </span>
                      </div>

                      <div className="w-full h-24 rounded-lg bg-white p-2 mb-2 flex items-center justify-center overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <h4 className="text-xs font-extrabold text-white leading-tight mb-2 line-clamp-2">
                        {p.name}
                      </h4>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80">
                      <div className="text-sm font-black text-white font-mono leading-none">
                        Bs {priceBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-1">
                        Ref: <span className="text-slate-300 font-bold">${p.priceUsd.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* PANEL DERECHO (MI COMPRA) */}
        <div className="w-80 bg-[#070b13] border-l border-slate-800/90 p-4 flex flex-col justify-between shrink-0">
          <div>
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-white uppercase tracking-tight">
                    MI COMPRA
                  </h3>
                  <span className="text-[10px] text-cyan-400 font-mono">
                    0 Productos
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-slate-500" />
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  F6
                </span>
              </div>
            </div>

            {/* 5 Botones Rápidos */}
            <div className="grid grid-cols-5 gap-1 mb-4 text-[9px] font-mono text-center">
              <div className="bg-[#0d131f] border border-slate-800 p-1.5 rounded text-slate-300">
                <div className="text-xs">+</div>
                <div>Manual F3</div>
              </div>
              <div className="bg-[#0d131f] border border-slate-800 p-1.5 rounded text-slate-300">
                <div className="text-xs">⏸</div>
                <div>Pausas F5</div>
              </div>
              <div className="bg-[#0d131f] border border-slate-800 p-1.5 rounded text-slate-300">
                <div className="text-xs">📄</div>
                <div>Cotizar S</div>
              </div>
              <div className="bg-[#0d131f] border border-slate-800 p-1.5 rounded text-slate-300">
                <div className="text-xs">🖨️</div>
                <div>Reimp.</div>
              </div>
              <div className="bg-[#0d131f] border border-slate-800 p-1.5 rounded text-slate-300">
                <div className="text-xs">🚪</div>
                <div>Gaveta F9</div>
              </div>
            </div>

            {/* Cliente Ocasional */}
            <div className="bg-[#0d131f] border border-slate-800 rounded-xl p-3 mb-6 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="font-bold text-white text-xs">CLIENTE OCASIONAL</div>
                  <div className="text-[10px] text-slate-400">Consumidor Final • F8</div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700">
                ELEGIR ▼
              </span>
            </div>

            {/* Estado Vacío Auténtico del Carrito */}
            <div className="py-10 text-center text-slate-500">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="w-7 h-7 text-blue-500" />
              </div>
              <div className="text-xs font-bold text-slate-200 mb-1">
                CARRITO DE COMPRA VACÍO
              </div>
              <div className="text-[11px] text-slate-400 max-w-[200px] mx-auto mb-4">
                Selecciona productos del catálogo o usa la lectora de código de barras.
              </div>
              <div className="flex justify-center gap-2 text-[10px] font-mono">
                <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded border border-slate-800">
                  🔍 Buscar [F4]
                </span>
                <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded border border-slate-800">
                  ⚙ Varios [F3]
                </span>
              </div>
            </div>

          </div>

          {/* TOTALES Y BOTÓN DE COBRO */}
          <div className="pt-3 border-t border-slate-800">
            <div className="bg-[#0d131f] border border-slate-800 rounded-xl p-3 mb-3">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-0.5">
                TOTAL A PAGAR
              </div>
              <div className="text-3xl font-black text-white font-mono leading-none mb-2">
                Bs 0,00
              </div>
              <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-slate-800/80">
                <span className="text-slate-400 uppercase text-[10px]">REF. DIVISAS</span>
                <span className="text-lg font-black text-emerald-400">$0.00</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2.5 text-xs font-bold">
              <div className="py-2 px-2 rounded-lg bg-[#0d131f] border border-slate-800 text-slate-400 text-xs flex items-center justify-center gap-1">
                <Pause className="w-3.5 h-3.5" />
                <span>PAUSAR (F5)</span>
              </div>
              <div className="py-2 px-2 rounded-lg bg-[#0d131f] border border-slate-800 text-slate-400 text-xs flex items-center justify-center gap-1">
                <Gift className="w-3.5 h-3.5" />
                <span>INCENTIVO (F7)</span>
              </div>
            </div>

            <div className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Pagar ahora F2</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

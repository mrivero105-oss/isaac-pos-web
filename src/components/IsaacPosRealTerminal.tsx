"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  Search,
  Barcode,
  Moon,
  Sun,
  Zap,
  Bell,
  User,
  Pause,
  Gift,
  CreditCard,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  QrCode,
  Store,
  ChevronDown,
  Printer,
  FileText,
  DoorOpen,
  Volume2,
  Sparkles,
  Lock,
  ArrowRight,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  priceUsd: number;
  stock: number;
  image: string;
  tag: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "ARROZ PRIMOR CLÁSICO 1KG",
    category: "ALIMENTOS",
    priceUsd: 1.45,
    stock: 24,
    image: "/real-products/arroz_clasico.png",
    tag: "VÍVERES",
  },
  {
    id: "2",
    name: "CAFÉ ARAUCA MOLIDO 200G",
    category: "ALIMENTOS",
    priceUsd: 2.8,
    stock: 18,
    image: "/real-products/cafe_arauca.png",
    tag: "VÍVERES",
  },
  {
    id: "3",
    name: "ACEITE VEGETAL VATEL 1L",
    category: "ALIMENTOS",
    priceUsd: 2.95,
    stock: 15,
    image: "/real-products/aceite_vatel_1l.png",
    tag: "VÍVERES",
  },
  {
    id: "4",
    name: "REFRESCO COCA-COLA 355ML",
    category: "BEBIDAS",
    priceUsd: 1.2,
    stock: 40,
    image: "/real-products/coca_cola.png",
    tag: "BEBIDAS",
  },
  {
    id: "5",
    name: "MALTA POLAR BOTELLA",
    category: "BEBIDAS",
    priceUsd: 1.15,
    stock: 35,
    image: "/real-products/malta.png",
    tag: "BEBIDAS",
  },
  {
    id: "6",
    name: "REFRESCO PEPSI 1.5L",
    category: "BEBIDAS",
    priceUsd: 1.8,
    stock: 22,
    image: "/real-products/pepsi.jpg",
    tag: "BEBIDAS",
  },
  {
    id: "7",
    name: "PASTA PRIMOR CORTA 500G",
    category: "ALIMENTOS",
    priceUsd: 1.1,
    stock: 30,
    image: "/real-products/pasta_primor_500grs.png",
    tag: "VÍVERES",
  },
  {
    id: "8",
    name: "LECHE AMANECER COMPLETA",
    category: "ALIMENTOS",
    priceUsd: 3.2,
    stock: 12,
    image: "/real-products/leche_amanecer.png",
    tag: "LÁCTEOS",
  },
  {
    id: "9",
    name: "DIABLITOS UNDERWOOD 100G",
    category: "ALIMENTOS",
    priceUsd: 1.75,
    stock: 20,
    image: "/real-products/diablito.png",
    tag: "VÍVERES",
  },
  {
    id: "10",
    name: "NATUCHIPS PLATANITOS 150G",
    category: "GOLOSINAS",
    priceUsd: 1.25,
    stock: 16,
    image: "/real-products/natuchips_150grs.png",
    tag: "SNACKS",
  },
  {
    id: "11",
    name: "CHEESE TRIS FAMILIAR",
    category: "GOLOSINAS",
    priceUsd: 1.35,
    stock: 28,
    image: "/real-products/cheese_tris.png",
    tag: "SNACKS",
  },
  {
    id: "12",
    name: "CHOCOLATE SAVOY RIKITI",
    category: "GOLOSINAS",
    priceUsd: 1.5,
    stock: 32,
    image: "/real-products/rikiti.png",
    tag: "DULCES",
  },
  {
    id: "13",
    name: "CHOCOLATES TORONTO SAVOY",
    category: "GOLOSINAS",
    priceUsd: 0.85,
    stock: 50,
    image: "/real-products/toronto.png",
    tag: "DULCES",
  },
  {
    id: "14",
    name: "GALLETAS DORADITAS PAQUETE",
    category: "GOLOSINAS",
    priceUsd: 0.9,
    stock: 25,
    image: "/real-products/doradita.png",
    tag: "GALLETAS",
  },
];

interface CartItem {
  product: Product;
  quantity: number;
}

interface IsaacPosRealTerminalProps {
  onOpenCheckoutModal?: (plan?: string) => void;
  isCompactHero?: boolean;
}

export const IsaacPosRealTerminal: React.FC<IsaacPosRealTerminalProps> = ({
  onOpenCheckoutModal,
  isCompactHero = false,
}) => {
  const [bcvRate] = useState<number>(920.0);
  const [selectedCategory, setSelectedCategory] = useState<string>("TODAS");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currencyMode, setCurrencyMode] = useState<"BS" | "USD">("BS");
  const [activeTheme, setActiveTheme] = useState<"OSCURO" | "CLARO" | "OLED">("OSCURO");

  // Iniciar con un par de productos cargados para simular vida real
  const [cart, setCart] = useState<CartItem[]>([
    { product: SAMPLE_PRODUCTS[0], quantity: 2 },
    { product: SAMPLE_PRODUCTS[3], quantity: 1 },
  ]);

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

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const filteredProducts = SAMPLE_PRODUCTS.filter((p) => {
    const matchesCat =
      selectedCategory === "TODAS" || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalUsd = cart.reduce(
    (sum, item) => sum + item.product.priceUsd * item.quantity,
    0
  );
  const totalBs = totalUsd * bcvRate;

  return (
    <div className="w-full bg-[#070a11] text-slate-100 rounded-2xl border-2 border-slate-700/80 shadow-2xl overflow-hidden font-sans select-none">
      
      {/* 1. BARRA DE VENTANA NATIVA DE WINDOWS (Isaac POS V24.04) */}
      <div className="bg-[#0b0f19] px-3 py-1.5 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
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
          <span className="hover:text-white cursor-pointer">_</span>
          <span className="hover:text-white cursor-pointer">□</span>
          <span className="hover:text-rose-400 cursor-pointer">✕</span>
        </div>
      </div>

      {/* 2. BARRA SUPERIOR DE LA APLICACIÓN (Top App Bar idéntica a la real) */}
      <div className="bg-[#080c14] px-4 py-2.5 border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Marca Oficial Izquierda */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-900 border border-cyan-500/40 p-1 flex items-center justify-center shadow-inner">
            <img
              src="/isaac-logo-ultra.png"
              alt="Isaac POS"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black text-white">Isaac</span>
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
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-slate-900/90 border border-slate-700/80 px-3 py-1 rounded-full text-emerald-400 font-mono font-black text-xs flex items-center gap-1.5 shadow-sm">
            <span>$ 1 USD =</span>
            <span className="text-white">{bcvRate.toFixed(2)} Bs</span>
          </div>

          <div className="bg-slate-900/90 border border-emerald-500/40 px-2.5 py-1 rounded-full text-emerald-400 font-mono font-bold text-[11px] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>EN LÍNEA</span>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 bg-slate-900/80 border border-amber-500/30 px-2.5 py-1 rounded-full text-amber-300 font-mono text-[10px]">
            <QrCode className="w-3 h-3 text-amber-400" />
            <span>ESCANEAR QR • VINCULADO</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/80 border border-slate-700 px-2.5 py-1 rounded-full text-slate-300 text-xs">
            <Store className="w-3 h-3 text-cyan-400" />
            <span>SUCURSAL: <strong className="text-white">Central Demo</strong></span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        {/* Selector de Tema y Usuario */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-700/80 text-[10px] font-mono">
            <button
              onClick={() => setActiveTheme("OSCURO")}
              className={`px-2 py-0.5 rounded flex items-center gap-1 ${
                activeTheme === "OSCURO"
                  ? "bg-slate-800 text-cyan-300 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Moon className="w-2.5 h-2.5" />
              <span>OSCURO</span>
            </button>
            <button
              onClick={() => setActiveTheme("CLARO")}
              className={`px-2 py-0.5 rounded flex items-center gap-1 ${
                activeTheme === "CLARO"
                  ? "bg-slate-800 text-cyan-300 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sun className="w-2.5 h-2.5" />
              <span>CLARO</span>
            </button>
            <button
              onClick={() => setActiveTheme("OLED")}
              className={`px-2 py-0.5 rounded flex items-center gap-1 ${
                activeTheme === "OLED"
                  ? "bg-slate-800 text-cyan-300 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Zap className="w-2.5 h-2.5 text-amber-400" />
              <span>OLED</span>
            </button>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              M
            </div>
            <div className="hidden sm:block text-left leading-none">
              <div className="text-[11px] font-bold text-white">Manuel</div>
              <div className="text-[9px] text-emerald-400 font-mono">SUPERADMIN</div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. CONTENEDOR PRINCIPAL: SIDEBAR + CATÁLOGO + COMANDA */}
      <div className="flex flex-col lg:flex-row min-h-[580px]">
        
        {/* PANEL IZQUIERDO: Barra Lateral de Módulos Operativos */}
        <div className="hidden md:flex w-52 bg-[#060910] border-r border-slate-800/80 p-3 flex-col justify-between shrink-0 text-xs">
          <div className="space-y-4">
            
            {/* OPERACIONES */}
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1">
                <span>• OPERACIONES</span>
              </div>
              <div className="space-y-1">
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 text-left transition-all">
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>POS (Venta)</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 text-left transition-colors">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Control de Caja</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 text-left transition-colors">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Gestor de Ventas</span>
                </button>
              </div>
            </div>

            {/* CLIENTES & CRÉDITOS */}
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider px-2 mb-1.5">
                • CLIENTES & CRÉDITOS
              </div>
              <div className="space-y-1">
                <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 text-left transition-colors">
                  <span>Clientes & Directorio</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 text-left transition-colors">
                  <span>Cuentas por Cobrar</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 text-left transition-colors">
                  <span>Radar de Cobranza</span>
                </button>
              </div>
            </div>

            {/* INVENTARIO & PRODUCCIÓN */}
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider px-2 mb-1.5">
                • INVENTARIO & PRODUCCIÓN
              </div>
              <div className="space-y-1">
                <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 text-left transition-colors">
                  <span>Inventario & Stock</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 text-left transition-colors">
                  <span>Almacenes & Logística</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 text-left transition-colors">
                  <span>Producción & BOM</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 text-left transition-colors">
                  <span>Promociones & Ofertas</span>
                </button>
              </div>
            </div>

            {/* COMPRAS & PROVEEDORES */}
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider px-2 mb-1.5">
                • COMPRAS & PROVEEDORES
              </div>
              <div className="space-y-1">
                <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 text-left transition-colors">
                  <span>Proveedores & Compras</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 text-left transition-colors">
                  <span>Cuentas por Pagar</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-slate-900 text-left font-semibold transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Importador PDF</span>
                </button>
              </div>
            </div>

          </div>

          <div className="text-[10px] text-slate-300 font-mono px-2 pt-2 border-t border-slate-900">
            • TESORERÍA & TRIBUTOS
          </div>
        </div>

        {/* PANEL CENTRAL: Catálogo de Productos y Filtros */}
        <div className="flex-1 bg-[#090d16] p-3 sm:p-4 flex flex-col justify-between overflow-hidden">
          <div>
            
            {/* Buscador y Filtros Rápidos */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar producto... (F4)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0d131f] border border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                />
                <Barcode className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Selector de Moneda */}
              <div className="flex items-center bg-[#0d131f] border border-slate-800 rounded-xl p-0.5 text-xs font-mono font-bold">
                <button
                  onClick={() => setCurrencyMode("BS")}
                  className={`px-2.5 py-1 rounded-lg ${
                    currencyMode === "BS"
                      ? "bg-cyan-500 text-slate-950"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Bs
                </button>
                <button
                  onClick={() => setCurrencyMode("USD")}
                  className={`px-2.5 py-1 rounded-lg ${
                    currencyMode === "USD"
                      ? "bg-cyan-500 text-slate-950"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  $
                </button>
              </div>

              {/* Botones Rápidos */}
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                <button className="px-2.5 py-1.5 rounded-lg bg-[#0d131f] border border-slate-800 hover:text-white transition-colors">
                  ☆ POPULARES
                </button>
                <button className="px-2.5 py-1.5 rounded-lg bg-[#0d131f] border border-slate-800 hover:text-white transition-colors">
                  % OFERTAS
                </button>
                <button className="px-2.5 py-1.5 rounded-lg bg-[#0d131f] border border-slate-800 hover:text-white transition-colors">
                  ✨ NUEVOS
                </button>
              </div>
            </div>

            {/* Pestañas de Categorías */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-3 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-[#0d131f] text-slate-400 hover:text-white hover:bg-slate-800/80"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Cuadrícula de Tarjetas de Productos (Idénticas a la vista real) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredProducts.map((p) => {
                const priceBs = p.priceUsd * bcvRate;
                return (
                  <div
                    key={p.id}
                    onClick={() => addToCart(p)}
                    className="bg-[#0d131f] hover:bg-[#111929] border border-slate-800/90 hover:border-cyan-500/60 rounded-xl p-2.5 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] group shadow-sm"
                  >
                    <div>
                      {/* Badge de Stock en la esquina */}
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-800">
                          {p.stock} UND
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 uppercase">
                          {p.tag}
                        </span>
                      </div>

                      {/* Imagen con fondo blanco limpio como en supermercados */}
                      <div className="w-full h-24 rounded-lg bg-white p-2 mb-2 flex items-center justify-center overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Título del Producto */}
                      <h4 className="text-xs font-extrabold text-white leading-tight mb-2 line-clamp-2 h-7 group-hover:text-cyan-300 transition-colors">
                        {p.name}
                      </h4>
                    </div>

                    {/* Precios Bimonetarios Oficiales */}
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

          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Mostrando {filteredProducts.length} productos</span>
            <span>Atajo: Presiona cualquier producto para agregar al carrito</span>
          </div>
        </div>

        {/* PANEL DERECHO: Carrito de Compras (MI COMPRA) */}
        <div className="w-full lg:w-80 bg-[#070b13] border-t lg:border-t-0 lg:border-l border-slate-800/90 p-3.5 flex flex-col justify-between shrink-0">
          <div>
            
            {/* Header MI COMPRA */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <ShoppingCart className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-white uppercase tracking-tight">
                    MI COMPRA
                  </h3>
                  <span className="text-[10px] text-cyan-400 font-mono">
                    {cart.reduce((sum, i) => sum + i.quantity, 0)} Productos
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-slate-500 hover:text-white cursor-pointer" />
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                  F6
                </span>
              </div>
            </div>

            {/* 5 Botones Rápidos Superiores (Manual, Pausas, Cotizar, Historial, Gaveta) */}
            <div className="grid grid-cols-5 gap-1 mb-3 text-[9px] font-mono text-center">
              <button className="bg-[#0d131f] hover:bg-slate-800 border border-slate-800 p-1 rounded text-slate-300">
                <div className="text-[11px]">+</div>
                <div>Manual F3</div>
              </button>
              <button className="bg-[#0d131f] hover:bg-slate-800 border border-slate-800 p-1 rounded text-slate-300">
                <div className="text-[11px]">⏸</div>
                <div>Pausas F5</div>
              </button>
              <button className="bg-[#0d131f] hover:bg-slate-800 border border-slate-800 p-1 rounded text-slate-300">
                <div className="text-[11px]">📄</div>
                <div>Cotizar S</div>
              </button>
              <button className="bg-[#0d131f] hover:bg-slate-800 border border-slate-800 p-1 rounded text-slate-300">
                <div className="text-[11px]">🖨️</div>
                <div>Reimp.</div>
              </button>
              <button className="bg-[#0d131f] hover:bg-slate-800 border border-slate-800 p-1 rounded text-slate-300">
                <div className="text-[11px]">🚪</div>
                <div>Gaveta F9</div>
              </button>
            </div>

            {/* Selector de Cliente Ocasional */}
            <div className="bg-[#0d131f] border border-slate-800 rounded-xl p-2.5 mb-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="font-bold text-white text-[11px]">CLIENTE OCASIONAL</div>
                  <div className="text-[10px] text-slate-400">Consumidor Final • F8</div>
                </div>
              </div>
              <button className="text-[10px] font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded border border-slate-700">
                ELEGIR ▼
              </button>
            </div>

            {/* Lista de Artículos en Carrito o Estado Vacío */}
            {cart.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="w-6 h-6 text-slate-600" />
                </div>
                <div className="text-xs font-bold text-slate-300 mb-1">
                  CARRITO DE COMPRA VACÍO
                </div>
                <div className="text-[11px] text-slate-500 max-w-[200px] mx-auto mb-4">
                  Selecciona productos del catálogo o usa la lectora de código de barras.
                </div>
                <div className="flex justify-center gap-2 text-[10px] font-mono">
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Buscar [F4]
                  </span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Varios [F3]
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const lineTotalUsd = item.product.priceUsd * item.quantity;
                  const lineTotalBs = lineTotalUsd * bcvRate;
                  return (
                    <div
                      key={item.product.id}
                      className="bg-[#0d131f] border border-slate-800/80 rounded-xl p-2 flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="font-bold text-white truncate text-[11px]">
                          {item.product.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          ${item.product.priceUsd.toFixed(2)} c/u • Bs {(item.product.priceUsd * bcvRate).toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 text-center font-mono font-bold text-white text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right pl-2 shrink-0">
                        <div className="font-mono font-bold text-white text-xs">
                          ${lineTotalUsd.toFixed(2)}
                        </div>
                        <div className="font-mono text-[9px] text-slate-400">
                          Bs {lineTotalBs.toFixed(0)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* TOTALES Y BOTÓN DE COBRO */}
          <div className="pt-3 border-t border-slate-800">
            <div className="bg-[#0d131f] border border-slate-800 rounded-xl p-3 mb-2.5">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-0.5">
                TOTAL A PAGAR
              </div>
              <div className="text-2xl font-black text-white font-mono leading-none mb-1.5">
                Bs {totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="flex justify-between items-center text-xs font-mono pt-1.5 border-t border-slate-800/80">
                <span className="text-slate-400 uppercase text-[10px]">REF. DIVISAS</span>
                <span className="text-base font-black text-emerald-400">${totalUsd.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5 mb-2 text-xs font-bold">
              <button
                onClick={clearCart}
                className="py-1.5 px-2 rounded-lg bg-[#0d131f] hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] flex items-center justify-center gap-1"
              >
                <Pause className="w-3 h-3" />
                <span>PAUSAR (F5)</span>
              </button>
              <button className="py-1.5 px-2 rounded-lg bg-[#0d131f] hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] flex items-center justify-center gap-1">
                <Gift className="w-3 h-3" />
                <span>INCENTIVO (F7)</span>
              </button>
            </div>

            <button
              onClick={() => {
                if (onOpenCheckoutModal) onOpenCheckoutModal("demo_gratis");
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all flex items-center justify-center gap-2 group"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pagar ahora F2</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

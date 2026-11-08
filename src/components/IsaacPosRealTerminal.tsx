"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Monitor,
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
  const [bcvRate, setBcvRate] = useState<number>(857.89);
  const [selectedCategory, setSelectedCategory] = useState<string>("TODAS");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currencyMode, setCurrencyMode] = useState<"BS" | "USD">("BS");
  const [activeTheme, setActiveTheme] = useState<"OSCURO" | "CLARO" | "OLED">("OSCURO");
  const [screenMode, setScreenMode] = useState<"cashier" | "customer_display">("cashier");
  const [lastScannedId, setLastScannedId] = useState<string | null>(null);
  const [lastScannedName, setLastScannedName] = useState<string | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"PAGO MÓVIL QR" | "EFECTIVO USD" | "PUNTO DE VENTA">("PAGO MÓVIL QR");
  const [isOfflineSimulated, setIsOfflineSimulated] = useState<boolean>(false);
  const [savedTicketsCount, setSavedTicketsCount] = useState<number>(14);
  const [lastBackupTime, setLastBackupTime] = useState<string>("Sincronizado");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/bcv")
      .then((res) => res.json())
      .then((json) => {
        if (isMounted && json?.data?.rate && typeof json.data.rate === "number") {
          setBcvRate(json.data.rate);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Atajos de teclado reales de mostrador (F2 Cobrar, F4 Buscar, F5 Limpiar)
  useEffect(() => {
    if (isCompactHero) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F4") {
        e.preventDefault();
        setScreenMode("cashier");
        setTimeout(() => searchInputRef.current?.focus(), 50);
      } else if (e.key === "F2") {
        e.preventDefault();
        setShowReceiptModal(true);
      } else if (e.key === "F5") {
        e.preventDefault();
        setCart([]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCompactHero]);

  // Iniciar con un par de productos cargados para simular vida real
  const [cart, setCart] = useState<CartItem[]>([
    { product: SAMPLE_PRODUCTS[0], quantity: 2 },
    { product: SAMPLE_PRODUCTS[3], quantity: 1 },
  ]);

  // Persistencia local instantánea estilo SQLite Offline Backup
  useEffect(() => {
    try {
      const rawBackup = localStorage.getItem("isaac_pos_offline_backup_v24");
      if (rawBackup) {
        const parsed = JSON.parse(rawBackup);
        if (typeof parsed.savedTicketsCount === "number") {
          setSavedTicketsCount(parsed.savedTicketsCount);
        }
        if (typeof parsed.isOfflineSimulated === "boolean") {
          setIsOfflineSimulated(parsed.isOfflineSimulated);
        }
      }
    } catch {
      // Ignorar si almacenamiento local está restringido
    }
  }, []);

  useEffect(() => {
    try {
      const nowTime = new Date().toLocaleTimeString("es-VE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setLastBackupTime(nowTime);
      localStorage.setItem(
        "isaac_pos_offline_backup_v24",
        JSON.stringify({
          savedTicketsCount,
          isOfflineSimulated,
          cartItemsCount: cart.length,
          updatedAt: nowTime,
        })
      );
    } catch {
      // Ignorar si almacenamiento local está restringido
    }
  }, [cart, savedTicketsCount, isOfflineSimulated]);

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
    setLastScannedId(product.id);
    setLastScannedName(product.name);
    setTimeout(() => {
      setLastScannedId((prev) => (prev === product.id ? null : prev));
    }, 650);

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

  const isLight = activeTheme === "CLARO";
  const isOled = activeTheme === "OLED";

  // Paleta dinámica para los 3 modos reales del terminal (OSCURO | CLARO | OLED)
  const shellBg = isLight
    ? "bg-[#f0f5fc] text-slate-900 border-blue-300/90"
    : isOled
    ? "bg-black text-zinc-100 border-zinc-800"
    : "bg-[#070a11] text-slate-100 border-slate-700/80";

  const titleBarBg = isLight
    ? "bg-slate-900 border-slate-800 text-slate-300"
    : isOled
    ? "bg-zinc-950 border-zinc-900 text-zinc-400"
    : "bg-[#0b0f19] border-slate-800/80 text-slate-400";

  const appBarBg = isLight
    ? "bg-white border-blue-200/80 shadow-2xs"
    : isOled
    ? "bg-black border-zinc-900"
    : "bg-[#080c14] border-slate-800/90";

  const sidebarBg = isLight
    ? "bg-white/95 border-blue-200/70"
    : isOled
    ? "bg-black border-zinc-900"
    : "bg-[#060910] border-slate-800/80";

  const catalogBg = isLight
    ? "bg-gradient-to-br from-[#eef4fc] via-[#f5f8fd] to-[#e8f0fe]"
    : isOled
    ? "bg-black"
    : "bg-[#090d16]";

  const surfaceBg = isLight
    ? "bg-white border-blue-200/80 text-slate-900 shadow-[0_4px_14px_-4px_rgba(37,99,235,0.1)]"
    : isOled
    ? "bg-zinc-950 border-zinc-800/90 text-zinc-100"
    : "bg-[#0d131f] border-slate-800/90 text-white";

  const cartPanelBg = isLight
    ? "bg-white border-blue-200/80 shadow-[-4px_0_20px_-6px_rgba(37,99,235,0.08)]"
    : isOled
    ? "bg-black border-zinc-900"
    : "bg-[#070b13] border-slate-800/90";

  const textPrimary = isLight ? "text-slate-950" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-slate-400";
  const textMuted = isLight ? "text-slate-500" : "text-slate-500";
  const dividerBorder = isLight ? "border-blue-100" : isOled ? "border-zinc-900" : "border-slate-800/80";

  return (
    <div className={`w-full ${shellBg} rounded-2xl border-2 shadow-2xl overflow-hidden font-sans select-none transition-colors duration-200`}>
      
      {/* 1. BARRA DE VENTANA NATIVA DE WINDOWS + CONMUTADOR DE MONITOR 1 / MONITOR 2 */}
      <div className={`${titleBarBg} px-3 py-2 border-b flex flex-wrap items-center justify-between gap-2 text-xs font-mono transition-colors duration-200`}>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded overflow-hidden">
            <img
              src="/isaac-logo-ultra.png"
              alt="Isaac POS Icon"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-slate-200 font-semibold text-[11px]">
            Isaac POS V24.04 • {screenMode === "cashier" ? "Monitor 1 (Terminal Cajero)" : "Monitor 2 (Visor Cliente /#/display)"}
          </span>
        </div>

        {/* Conmutador En Vivo: 1ra Pantalla vs 2da Pantalla */}
        <div className={`flex items-center ${isLight ? "bg-slate-300/70 border-slate-300" : "bg-slate-950 border-slate-800"} p-1 rounded-xl border`}>
          <button
            type="button"
            onClick={() => setScreenMode("cashier")}
            className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              screenMode === "cashier"
                ? "bg-blue-600 text-white shadow-sm"
                : isLight
                ? "text-slate-700 hover:text-slate-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ShoppingCart className="w-3 h-3" />
            <span>1ra Pantalla: Cajero POS</span>
          </button>
          <button
            type="button"
            onClick={() => setScreenMode("customer_display")}
            className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              screenMode === "customer_display"
                ? "bg-emerald-500 text-slate-950 shadow-sm"
                : isLight
                ? "text-emerald-700 hover:text-emerald-900"
                : "text-emerald-400 hover:text-emerald-300"
            }`}
          >
            <Monitor className="w-3 h-3" />
            <span>2da Pantalla: Visor Cliente + QR ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-slate-500">
          <span className="hover:text-blue-500 cursor-pointer">_</span>
          <span className="hover:text-blue-500 cursor-pointer">□</span>
          <span className="hover:text-rose-400 cursor-pointer">✕</span>
        </div>
      </div>

      {/* 2. BARRA SUPERIOR DE LA APLICACIÓN (Top App Bar idéntica a la real) */}
      <div className={`${appBarBg} px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 text-xs transition-colors duration-200`}>
        
        {/* Marca Oficial Izquierda */}
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl ${isLight ? "bg-slate-100 border-blue-300" : "bg-slate-900 border-cyan-500/40"} border p-1 flex items-center justify-center shadow-inner`}>
            <img
              src="/isaac-logo-ultra.png"
              alt="Isaac POS"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className={`text-base font-black ${textPrimary}`}>Isaac</span>
              <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded font-mono">
                POS
              </span>
            </div>
            <div className={`text-[9px] font-mono font-bold ${isLight ? "text-emerald-600" : "text-emerald-400"} tracking-widest uppercase`}>
              PUNTO DE VENTA
            </div>
          </div>
        </div>

        {/* Tasa BCV y Estado de Red (Estilo V24.04) */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className={`${isLight ? "bg-slate-100 border-slate-300 text-slate-700" : "bg-slate-900/90 border-slate-700/80 text-slate-300"} border px-3 py-1 rounded-full font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm`}>
            <span className={textSecondary}>$ 1$ =</span>
            <span className={`${textPrimary} font-black`}>{bcvRate.toFixed(2)} Bs</span>
          </div>

          <button
            type="button"
            onClick={() => setIsOfflineSimulated((prev) => !prev)}
            title="Haz clic para simular corte de internet y comprobar el Respaldo Local SQLite"
            className={`${
              isOfflineSimulated
                ? isLight
                  ? "bg-amber-50 border-amber-400 text-amber-800"
                  : "bg-amber-950/80 border-amber-500/50 text-amber-300"
                : isLight
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : "bg-slate-900/90 border-emerald-500/40 text-emerald-400"
            } border px-2.5 py-1 rounded-full font-mono font-bold text-[11px] flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isOfflineSimulated ? "bg-amber-500" : "bg-emerald-500"
              } animate-pulse`}
            ></span>
            <span>
              {isOfflineSimulated
                ? `100% Offline • SQLite OK (${savedTicketsCount})`
                : `En línea • Backup ${lastBackupTime}`}
            </span>
          </button>

          <div className={`hidden xl:flex items-center gap-1.5 ${isLight ? "bg-slate-100 border-slate-300 text-slate-700" : "bg-slate-900/80 border-slate-700 text-slate-300"} border px-2.5 py-1 rounded-full font-mono text-[10px]`}>
            <QrCode className="w-3 h-3 text-slate-400" />
            <span>Vincular WA</span>
          </div>

          <div className={`hidden lg:flex items-center gap-1.5 ${isLight ? "bg-slate-100 border-slate-300 text-slate-700" : "bg-slate-900/80 border-slate-700 text-slate-300"} border px-2.5 py-1 rounded-full text-xs`}>
            <Store className={`w-3 h-3 ${isLight ? "text-blue-600" : "text-cyan-400"}`} />
            <span className={`${textPrimary} font-semibold`}>Sede Central</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        {/* Selector de Tema Funcional (OSCURO | CLARO | OLED) y Usuario */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center ${isLight ? "bg-slate-100 border-slate-300" : "bg-slate-900 border-slate-700/80"} p-0.5 rounded-lg border text-[10px] font-mono`}>
            <button
              type="button"
              onClick={() => setActiveTheme("OSCURO")}
              className={`px-2 py-1 rounded flex items-center gap-1 cursor-pointer transition-all ${
                activeTheme === "OSCURO"
                  ? "bg-slate-800 text-cyan-300 font-bold shadow-2xs"
                  : isLight
                  ? "text-slate-600 hover:text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Moon className="w-2.5 h-2.5" />
              <span>OSCURO</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTheme("CLARO")}
              className={`px-2 py-1 rounded flex items-center gap-1 cursor-pointer transition-all ${
                activeTheme === "CLARO"
                  ? "bg-white text-blue-700 font-bold shadow-xs border border-slate-200"
                  : isLight
                  ? "text-slate-600 hover:text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sun className="w-2.5 h-2.5 text-amber-500" />
              <span>CLARO</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTheme("OLED")}
              className={`px-2 py-1 rounded flex items-center gap-1 cursor-pointer transition-all ${
                activeTheme === "OLED"
                  ? "bg-black text-emerald-400 font-bold border border-zinc-700"
                  : isLight
                  ? "text-slate-600 hover:text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Zap className="w-2.5 h-2.5 text-amber-400" />
              <span>OLED</span>
            </button>
          </div>

          <div className={`flex items-center gap-2 pl-2 border-l ${dividerBorder}`}>
            <div className={`w-6 h-6 rounded-full ${isLight ? "bg-blue-600 text-white border-blue-700" : "bg-slate-800 text-white border-slate-700"} border font-bold flex items-center justify-center text-[10px]`}>
              A
            </div>
            <div className="hidden sm:block text-left leading-none">
              <div className={`text-[11px] font-bold ${textPrimary}`}>ADMIN DEMO</div>
              <div className={`text-[9px] ${textSecondary} font-mono`}>Superadmin</div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. CONTENEDOR PRINCIPAL: SIDEBAR + CATÁLOGO + COMANDA O 2DA PANTALLA */}
      {screenMode === "cashier" ? (
      <div className="flex flex-col lg:flex-row min-h-[580px]">
        
        {/* PANEL IZQUIERDO: Barra Lateral de Módulos Operativos */}
        <div className={`hidden md:flex w-52 ${sidebarBg} border-r p-3 flex-col justify-between shrink-0 text-xs transition-colors duration-200`}>
          <div className="space-y-4">
            
            {/* OPERACIONES */}
            <div>
              <div className={`text-[10px] font-mono font-bold ${isLight ? "text-slate-500" : "text-slate-300"} uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1`}>
                <span>• OPERACIONES</span>
              </div>
              <div className="space-y-1">
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 text-left transition-all">
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>POS (Venta)</span>
                </button>
                <button className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg ${isLight ? "text-slate-600 hover:text-slate-950 hover:bg-slate-200/70" : "text-slate-400 hover:text-white hover:bg-slate-900"} text-left transition-colors`}>
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Control de Caja</span>
                </button>
                <button className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg ${isLight ? "text-slate-600 hover:text-slate-950 hover:bg-slate-200/70" : "text-slate-400 hover:text-white hover:bg-slate-900"} text-left transition-colors`}>
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Gestor de Ventas</span>
                </button>
              </div>
            </div>

            {/* CLIENTES & CRÉDITOS */}
            <div>
              <div className={`text-[10px] font-mono font-bold ${isLight ? "text-slate-500" : "text-slate-300"} uppercase tracking-wider px-2 mb-1.5`}>
                • CLIENTES & CRÉDITOS
              </div>
              <div className="space-y-1">
                <button className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg ${isLight ? "text-slate-600 hover:text-slate-950 hover:bg-slate-200/70" : "text-slate-400 hover:text-white hover:bg-slate-900"} text-left transition-colors`}>
                  <span>Clientes & Directorio</span>
                </button>
                <button className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg ${isLight ? "text-slate-600 hover:text-slate-950 hover:bg-slate-200/70" : "text-slate-400 hover:text-white hover:bg-slate-900"} text-left transition-colors`}>
                  <span>Cuentas por Cobrar</span>
                </button>
                <button className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg ${isLight ? "text-slate-600 hover:text-slate-950 hover:bg-slate-200/70" : "text-slate-400 hover:text-white hover:bg-slate-900"} text-left transition-colors`}>
                  <span>Radar de Cobranza</span>
                </button>
              </div>
            </div>

            {/* INVENTARIO & PRODUCCIÓN */}
            <div>
              <div className={`text-[10px] font-mono font-bold ${isLight ? "text-slate-500" : "text-slate-300"} uppercase tracking-wider px-2 mb-1.5`}>
                • INVENTARIO & PRODUCCIÓN
              </div>
              <div className="space-y-1">
                <button className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg ${isLight ? "text-slate-600 hover:text-slate-950 hover:bg-slate-200/70" : "text-slate-400 hover:text-white hover:bg-slate-900"} text-left transition-colors`}>
                  <span>Inventario & Stock</span>
                </button>
                <button className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg ${isLight ? "text-slate-600 hover:text-slate-950 hover:bg-slate-200/70" : "text-slate-400 hover:text-white hover:bg-slate-900"} text-left transition-colors`}>
                  <span>Almacenes & Logística</span>
                </button>
                <button className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg ${isLight ? "text-slate-600 hover:text-slate-950 hover:bg-slate-200/70" : "text-slate-400 hover:text-white hover:bg-slate-900"} text-left transition-colors`}>
                  <span>Producción & BOM</span>
                </button>
                <button className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg ${isLight ? "text-slate-600 hover:text-slate-950 hover:bg-slate-200/70" : "text-slate-400 hover:text-white hover:bg-slate-900"} text-left transition-colors`}>
                  <span>Promociones & Ofertas</span>
                </button>
              </div>
            </div>

            {/* COMPRAS & PROVEEDORES */}
            <div>
              <div className={`text-[10px] font-mono font-bold ${isLight ? "text-slate-500" : "text-slate-300"} uppercase tracking-wider px-2 mb-1.5`}>
                • COMPRAS & PROVEEDORES
              </div>
              <div className="space-y-1">
                <button className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg ${isLight ? "text-slate-600 hover:text-slate-950 hover:bg-slate-200/70" : "text-slate-400 hover:text-white hover:bg-slate-900"} text-left transition-colors`}>
                  <span>Proveedores & Compras</span>
                </button>
                <button className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg ${isLight ? "text-slate-600 hover:text-slate-950 hover:bg-slate-200/70" : "text-slate-400 hover:text-white hover:bg-slate-900"} text-left transition-colors`}>
                  <span>Cuentas por Pagar</span>
                </button>
                <button className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg ${isLight ? "text-emerald-700 hover:bg-emerald-50" : "text-emerald-400 hover:text-emerald-300 hover:bg-slate-900"} text-left font-semibold transition-colors`}>
                  <Sparkles className={`w-3.5 h-3.5 ${isLight ? "text-emerald-600" : "text-emerald-400"}`} />
                  <span>Importador PDF</span>
                </button>
              </div>
            </div>

          </div>

          <div className={`text-[10px] ${isLight ? "text-slate-500 border-slate-200" : "text-slate-300 border-slate-900"} font-mono px-2 pt-2 border-t`}>
            • TESORERÍA & TRIBUTOS
          </div>
        </div>

        {/* PANEL CENTRAL: Catálogo de Productos y Filtros */}
        <div className={`flex-1 ${catalogBg} p-3 sm:p-4 flex flex-col justify-between overflow-hidden transition-colors duration-200`}>
          <div>
            
            {/* Buscador y Filtros Rápidos */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Buscar producto o escanear... (F4)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full ${surfaceBg} border rounded-xl pl-9 pr-24 py-2 text-xs placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors font-mono`}
                />
                {lastScannedId ? (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 font-mono font-black text-[9px] flex items-center gap-1 animate-pulse">
                    <span>● LÁSER OK</span>
                  </span>
                ) : (
                  <Barcode className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                )}
              </div>

              {/* Selector de Moneda */}
              <div className={`flex items-center ${surfaceBg} border rounded-xl p-0.5 text-xs font-mono font-bold`}>
                <button
                  onClick={() => setCurrencyMode("BS")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                    currencyMode === "BS"
                      ? "bg-cyan-500 text-slate-950"
                      : isLight
                      ? "text-slate-600 hover:text-slate-950"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Bs
                </button>
                <button
                  onClick={() => setCurrencyMode("USD")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                    currencyMode === "USD"
                      ? "bg-cyan-500 text-slate-950"
                      : isLight
                      ? "text-slate-600 hover:text-slate-950"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  $
                </button>
              </div>

              {/* Botones Rápidos */}
              <div className={`hidden sm:flex items-center gap-1.5 text-[11px] font-bold ${textSecondary}`}>
                <button className={`px-2.5 py-1.5 rounded-lg ${surfaceBg} border hover:border-blue-500 transition-colors`}>
                  ☆ POPULARES
                </button>
                <button className={`px-2.5 py-1.5 rounded-lg ${surfaceBg} border hover:border-blue-500 transition-colors`}>
                  % OFERTAS
                </button>
                <button className={`px-2.5 py-1.5 rounded-lg ${surfaceBg} border hover:border-blue-500 transition-colors`}>
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
                    className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : isLight
                        ? "bg-white text-slate-600 border border-slate-200 hover:text-slate-950 hover:bg-slate-50"
                        : `${surfaceBg} text-slate-400 hover:text-white hover:bg-slate-800/80`
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
                const isJustScanned = lastScannedId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => addToCart(p)}
                    className={`relative overflow-hidden ${
                      isJustScanned
                        ? "ring-2 ring-emerald-500 border-emerald-500 scale-[1.03]"
                        : isLight
                        ? "bg-white hover:bg-blue-50/40 border-slate-200 hover:border-blue-500/60"
                        : isOled
                        ? "bg-zinc-950 hover:bg-zinc-900 border-zinc-800 hover:border-emerald-500/60"
                        : "bg-[#0d131f] hover:bg-[#111929] border-slate-800/90 hover:border-cyan-500/60"
                    } ${
                      !isJustScanned
                        ? ""
                        : isLight
                        ? "bg-emerald-50/60"
                        : "bg-emerald-950/30"
                    } border rounded-xl p-2.5 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] group shadow-sm`}
                  >
                    {isJustScanned && (
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] z-20 pointer-events-none" />
                    )}
                    <div>
                      {/* Badge de Stock en la esquina */}
                      <div className="flex justify-between items-center mb-1.5">
                        <span className={`text-[10px] font-mono font-bold ${isJustScanned ? "bg-emerald-500 text-slate-950 border-emerald-400" : isLight ? "text-blue-700 bg-blue-50 border-blue-200" : "text-cyan-400 bg-slate-900/90 border-slate-800"} px-1.5 py-0.5 rounded border transition-colors`}>
                          {isJustScanned ? "+1 LECTURA" : `${p.stock} UND`}
                        </span>
                        <span className={`text-[9px] font-mono ${textMuted} uppercase`}>
                          {p.tag}
                        </span>
                      </div>

                      {/* Imagen con fondo blanco limpio como en supermercados */}
                      <div className={`w-full h-24 rounded-lg bg-white ${isLight ? "border border-slate-100" : ""} p-2 mb-2 flex items-center justify-center overflow-hidden`}>
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Título del Producto */}
                      <h4 className={`text-xs font-extrabold ${textPrimary} leading-tight mb-2 line-clamp-2 h-7 ${isLight ? "group-hover:text-blue-700" : "group-hover:text-cyan-300"} transition-colors`}>
                        {p.name}
                      </h4>
                    </div>

                    {/* Precios Bimonetarios Oficiales */}
                    <div className={`pt-2 border-t ${dividerBorder}`}>
                      <div className={`text-sm font-black ${textPrimary} font-mono leading-none`}>
                        Bs {priceBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className={`text-[11px] font-mono ${textSecondary} mt-1`}>
                        Ref: <span className={`${isLight ? "text-emerald-700" : "text-slate-300"} font-bold`}>${p.priceUsd.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          <div className={`mt-3 pt-2 border-t ${dividerBorder} flex items-center justify-between text-[11px] ${textMuted} font-mono`}>
            <span>Mostrando {filteredProducts.length} productos</span>
            <span>Atajo: Presiona cualquier producto para agregar al carrito</span>
          </div>
        </div>

        {/* PANEL DERECHO: Carrito de Compras (MI COMPRA) */}
        <div className={`w-full lg:w-80 ${cartPanelBg} border-t lg:border-t-0 lg:border-l p-3.5 flex flex-col justify-between shrink-0 transition-colors duration-200`}>
          <div>
            
            {/* Header MI COMPRA */}
            <div className={`flex items-center justify-between pb-2.5 mb-2.5 border-b ${dividerBorder}`}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <ShoppingCart className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className={`font-extrabold text-xs ${textPrimary} uppercase tracking-tight`}>
                    MI COMPRA
                  </h3>
                  <span className={`text-[10px] ${isLight ? "text-blue-600 font-bold" : "text-cyan-400"} font-mono`}>
                    {cart.reduce((sum, i) => sum + i.quantity, 0)} Productos
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Volume2 className={`w-3.5 h-3.5 ${textSecondary} cursor-pointer`} />
                <span className={`text-[10px] font-mono ${isLight ? "text-slate-600 bg-slate-100 border-slate-300" : "text-slate-400 bg-slate-900 border-slate-800"} px-1.5 py-0.5 rounded border`}>
                  F6
                </span>
              </div>
            </div>

            {/* 5 Botones Rápidos Superiores (Manual, Pausas, Cotizar, Historial, Gaveta) */}
            <div className="grid grid-cols-5 gap-1 mb-3 text-[9px] font-mono text-center">
              <button className={`${surfaceBg} ${isLight ? "hover:bg-slate-100 text-slate-700" : "hover:bg-slate-800 text-slate-300"} border p-1 rounded cursor-pointer`}>
                <div className="text-[11px]">+</div>
                <div>Manual F3</div>
              </button>
              <button className={`${surfaceBg} ${isLight ? "hover:bg-slate-100 text-slate-700" : "hover:bg-slate-800 text-slate-300"} border p-1 rounded cursor-pointer`}>
                <div className="text-[11px]">⏸</div>
                <div>Pausas F5</div>
              </button>
              <button className={`${surfaceBg} ${isLight ? "hover:bg-slate-100 text-slate-700" : "hover:bg-slate-800 text-slate-300"} border p-1 rounded cursor-pointer`}>
                <div className="text-[11px]">📄</div>
                <div>Cotizar S</div>
              </button>
              <button className={`${surfaceBg} ${isLight ? "hover:bg-slate-100 text-slate-700" : "hover:bg-slate-800 text-slate-300"} border p-1 rounded cursor-pointer`}>
                <div className="text-[11px]">🖨️</div>
                <div>Reimp.</div>
              </button>
              <button className={`${surfaceBg} ${isLight ? "hover:bg-slate-100 text-slate-700" : "hover:bg-slate-800 text-slate-300"} border p-1 rounded cursor-pointer`}>
                <div className="text-[11px]">🚪</div>
                <div>Gaveta F9</div>
              </button>
            </div>

            {/* Selector de Cliente Ocasional */}
            <div className={`${isLight ? "bg-slate-50 border-slate-200" : surfaceBg} border rounded-xl p-2.5 mb-3 flex items-center justify-between text-xs`}>
              <div className="flex items-center gap-2">
                <User className={`w-4 h-4 ${textSecondary}`} />
                <div>
                  <div className={`font-bold ${textPrimary} text-[11px]`}>CLIENTE OCASIONAL</div>
                  <div className={`text-[10px] ${textSecondary}`}>Consumidor Final • F8</div>
                </div>
              </div>
              <button className={`text-[10px] font-mono font-bold ${isLight ? "bg-white hover:bg-slate-100 text-slate-700 border-slate-300" : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"} px-2 py-1 rounded border`}>
                ELEGIR ▼
              </button>
            </div>

            {/* Lista de Artículos en Carrito o Estado Vacío */}
            {cart.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <div className={`w-14 h-14 rounded-full ${isLight ? "bg-slate-100 border-slate-200" : "bg-slate-900 border-slate-800"} border flex items-center justify-center mx-auto mb-3`}>
                  <ShoppingCart className="w-6 h-6 text-slate-500" />
                </div>
                <div className={`text-xs font-bold ${textPrimary} mb-1`}>
                  CARRITO DE COMPRA VACÍO
                </div>
                <div className="text-[11px] text-slate-500 max-w-[200px] mx-auto mb-4">
                  Selecciona productos del catálogo o usa la lectora de código de barras.
                </div>
                <div className="flex justify-center gap-2 text-[10px] font-mono">
                  <span className={`${isLight ? "bg-slate-100 border-slate-200 text-slate-700" : "bg-slate-900 border-slate-800"} px-2 py-0.5 rounded border`}>
                    Buscar [F4]
                  </span>
                  <span className={`${isLight ? "bg-slate-100 border-slate-200 text-slate-700" : "bg-slate-900 border-slate-800"} px-2 py-0.5 rounded border`}>
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
                      className={`${isLight ? "bg-slate-50 border-slate-200" : surfaceBg} border rounded-xl p-2 flex items-center justify-between text-xs`}
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <div className={`font-bold ${textPrimary} truncate text-[11px]`}>
                          {item.product.name}
                        </div>
                        <div className={`text-[10px] font-mono ${textSecondary}`}>
                          ${item.product.priceUsd.toFixed(2)} c/u • Bs {(item.product.priceUsd * bcvRate).toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className={`w-5 h-5 rounded ${isLight ? "bg-slate-200 hover:bg-slate-300 text-slate-800" : "bg-slate-800 hover:bg-slate-700 text-slate-300"} flex items-center justify-center cursor-pointer`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className={`w-4 text-center font-mono font-bold ${textPrimary} text-xs`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className={`w-5 h-5 rounded ${isLight ? "bg-slate-200 hover:bg-slate-300 text-slate-800" : "bg-slate-800 hover:bg-slate-700 text-slate-300"} flex items-center justify-center cursor-pointer`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right pl-2 shrink-0">
                        <div className={`font-mono font-bold ${textPrimary} text-xs`}>
                          ${lineTotalUsd.toFixed(2)}
                        </div>
                        <div className={`font-mono text-[9px] ${textSecondary}`}>
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
          <div className={`pt-3 border-t ${dividerBorder}`}>
            <div className={`${isLight ? "bg-slate-50 border-slate-200" : surfaceBg} border rounded-xl p-3 mb-2.5`}>
              <div className={`text-[10px] font-mono uppercase ${textSecondary} font-bold mb-0.5`}>
                TOTAL A PAGAR
              </div>
              <div className={`text-2xl font-black ${textPrimary} font-mono leading-none mb-1.5`}>
                Bs {totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`flex justify-between items-center text-xs font-mono pt-1.5 border-t ${dividerBorder}`}>
                <span className={`${textSecondary} uppercase text-[10px]`}>REF. DIVISAS</span>
                <span className={`text-base font-black ${isLight ? "text-emerald-600" : "text-emerald-400"}`}>${totalUsd.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5 mb-2 text-xs font-bold">
              <button
                onClick={clearCart}
                className={`py-1.5 px-2 rounded-lg ${isLight ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700" : `${surfaceBg} hover:bg-slate-800 text-slate-300`} border text-[11px] flex items-center justify-center gap-1 cursor-pointer`}
              >
                <Pause className="w-3 h-3" />
                <span>PAUSAR (F5)</span>
              </button>
              <button className={`py-1.5 px-2 rounded-lg ${isLight ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700" : `${surfaceBg} hover:bg-slate-800 text-slate-300`} border text-[11px] flex items-center justify-center gap-1 cursor-pointer`}>
                <Gift className="w-3 h-3" />
                <span>INCENTIVO (F7)</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <button
                onClick={() => setShowReceiptModal(true)}
                disabled={cart.length === 0}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Printer className="w-4 h-4 shrink-0" />
                <span>Cobrar y Emitir Ticket (F2)</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              <button
                onClick={() => setScreenMode("customer_display")}
                className={`w-full py-2 px-3 rounded-xl ${isLight ? "bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200" : "bg-slate-900 hover:bg-slate-800 text-cyan-300 border-slate-700"} border font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer`}
              >
                <QrCode className="w-3.5 h-3.5 shrink-0" />
                <span>Ver QR en 2da Pantalla</span>
              </button>
            </div>
          </div>

        </div>

      </div>
      ) : (
        /* VISTA EN VIVO DEL MONITOR SECUNDARIO DEL CLIENTE (/#/display V24.04) */
        <div className="bg-[#dce8f5] text-slate-900 min-h-[580px] flex flex-col justify-between p-4 sm:p-6">
          {/* Cabecera Superior del Visor de Cliente */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-300/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-sm">
                  IP
                </div>
                <div>
                  <div className="font-black text-sm sm:text-base text-slate-950 tracking-tight">
                    MINIMARKET DEMO
                  </div>
                  <div className="text-xs text-slate-600">
                    Caja 1 • Le atiende con gusto: <span className="font-semibold text-slate-800">CAJERO 1</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 font-bold">
                  Tasa BCV: Bs {bcvRate.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs/$
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-800 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Sincronizado en Vivo</span>
                </span>
              </div>
            </div>

            {/* Cuerpo Dividido del Visor: Artículos en Caja (Izquierda) + Total y QR Pago Móvil (Derecha) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Columna Izquierda (7 cols): Artículos Escaneados */}
              <div className="lg:col-span-7 bg-[#e7f0fa] border border-white/80 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-500 uppercase pb-3 mb-3 border-b border-slate-300/70">
                    <span>ARTÍCULOS EN CAJA ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                    <span>SUBTOTAL</span>
                  </div>

                  {cart.length === 0 ? (
                    <div className="py-16 text-center text-slate-500">
                      <p className="font-bold text-slate-700 text-sm mb-1">
                        ¡Bienvenido a Minimarket Demo!
                      </p>
                      <p className="text-xs text-slate-500 mb-4">
                        Regresa a la 1ra Pantalla (Cajero POS) y haz clic en cualquier producto para ver cómo aparece aquí en tiempo real.
                      </p>
                      <button
                        type="button"
                        onClick={() => setScreenMode("cashier")}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
                      >
                        ← Ir a seleccionar productos
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                      {cart.map((item) => {
                        const lineUsd = item.product.priceUsd * item.quantity;
                        const lineBs = lineUsd * bcvRate;
                        return (
                          <div
                            key={item.product.id}
                            className="bg-[#dce8f6] border border-blue-200/70 rounded-xl p-3 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 text-slate-900 font-mono font-black text-xs flex items-center justify-center">
                                {item.quantity}x
                              </span>
                              <div>
                                <div className="font-bold text-slate-900 text-xs sm:text-sm">
                                  {item.product.name}
                                </div>
                                <div className="text-[11px] font-mono text-slate-500">
                                  ${item.product.priceUsd.toFixed(2)} c/u
                                </div>
                              </div>
                            </div>
                            <div className="text-right font-mono">
                              <div className="font-black text-slate-950 text-sm">
                                ${lineUsd.toFixed(2)}
                              </div>
                              <div className="text-[11px] text-slate-600 font-semibold">
                                Bs {lineBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-300/70 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setScreenMode("cashier")}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <span>← Volver a Pantalla Cajero (Agregar más productos)</span>
                  </button>
                  {onOpenCheckoutModal && (
                    <button
                      type="button"
                      onClick={() => onOpenCheckoutModal("pro_anual")}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>Quiero este sistema en mi negocio →</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Columna Derecha (5 cols): Total a Pagar + Tarjeta QR Pago Móvil */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Tarjeta Total a Pagar */}
                <div className="bg-[#e7f0fa] border border-white/80 rounded-2xl p-5 shadow-sm">
                  <div className="text-[11px] font-mono uppercase font-bold text-slate-500 mb-1">
                    TOTAL A PAGAR
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-950 font-mono leading-none">
                    ${totalUsd.toFixed(2)}
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-slate-800 font-mono mt-1">
                    Bs {totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-300/70 flex items-center justify-between text-[11px] font-mono text-slate-600">
                    <span>Tasa Oficial BCV:</span>
                    <span className="font-bold text-slate-900">
                      Bs {bcvRate.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs/$
                    </span>
                  </div>
                </div>

                {/* Tarjeta QR Pago Móvil Dinámico */}
                <div className="bg-[#e7f0fa] border border-white/80 rounded-2xl p-5 shadow-sm flex-1 flex flex-col justify-between">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-slate-800">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 uppercase">
                        PAGO MÓVIL DINÁMICO
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Escanea desde tu app bancaria sin digitar datos
                      </div>
                    </div>
                  </div>

                  <div className="mx-auto my-2 p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
                    <QrCode className="w-24 h-24 text-slate-950" />
                  </div>

                  <div className="space-y-1.5 text-xs mt-2">
                    <div className="flex justify-between px-3 py-1.5 rounded-lg bg-[#dce8f6] border border-blue-200/60">
                      <span className="text-slate-600">Banco:</span>
                      <span className="font-bold text-slate-900">Banco de Venezuela (BDV)</span>
                    </div>
                    <div className="flex justify-between px-3 py-1.5 rounded-lg bg-[#dce8f6] border border-blue-200/60">
                      <span className="text-slate-600">C.I / RIF:</span>
                      <span className="font-mono font-bold text-slate-900">V-00.000.000</span>
                    </div>
                    <div className="flex justify-between px-3 py-1.5 rounded-lg bg-[#dce8f6] border border-blue-200/60">
                      <span className="text-slate-600">Teléfono:</span>
                      <span className="font-mono font-bold text-slate-900">0414 0000000</span>
                    </div>
                  </div>

                  <div className="mt-3 p-2.5 rounded-xl bg-[#d3e2f4] border border-blue-300/70 text-center">
                    <div className="text-[10px] font-mono uppercase text-slate-600 font-bold">
                      MONTO EXACTO A TRANSFERIR
                    </div>
                    <div className="text-base font-mono font-black text-slate-950">
                      Bs {totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-300/80 flex items-center justify-between text-[11px] text-slate-600">
            <span>❤️ ¡Gracias por apoyar el comercio local y preferirnos!</span>
            <span className="font-semibold">Minimarket Demo • Calidad, Rapidez y Confianza</span>
          </div>
        </div>
      )}

      {/* MODAL DE TICKET TÉRMICO EN PANTALLA (F2) */}
      {showReceiptModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md p-4 flex items-center justify-center animate-fadeIn"
          onClick={() => setShowReceiptModal(false)}
        >
          <div
            className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera de Confirmación */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-dashed border-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-700 uppercase">
                    VENTA PROCESADA • CAJA 01
                  </div>
                  <div className="text-sm font-black text-slate-950">
                    Ticket Térmico 80mm ESC/POS
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowReceiptModal(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-mono text-xs font-bold cursor-pointer"
              >
                ESC ✕
              </button>
            </div>

            {/* Selector de Método de Pago en Ticket */}
            <div className="grid grid-cols-3 gap-1.5 mb-4 font-mono text-[10px] font-bold">
              {(["PAGO MÓVIL QR", "EFECTIVO USD", "PUNTO DE VENTA"] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`py-1.5 px-2 rounded-lg border transition-all cursor-pointer ${
                    paymentMethod === method
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            {/* Cuerpo del Ticket Térmico */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 font-mono text-xs space-y-2.5">
              <div className="text-center border-b border-dashed border-slate-300 pb-2.5">
                <div className="font-black text-sm text-slate-950">MINIMARKET DEMO C.A.</div>
                <div className="text-[10px] text-slate-500">RIF: J-50129384-0 • ISAAC POS V24.04</div>
                <div className="text-[10px] text-slate-500">
                  TICKET #004829 • TASA BCV: Bs {bcvRate.toFixed(2)}
                </div>
              </div>

              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-[11px]">
                    <span className="text-slate-700 truncate pr-2">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-bold text-slate-950 shrink-0">
                      Bs {(item.product.priceUsd * item.quantity * bcvRate).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-slate-300 pt-2.5 space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>TOTAL DIVISAS (REF):</span>
                  <span>${totalUsd.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-950">
                  <span>TOTAL PAGADO ({paymentMethod}):</span>
                  <span>Bs {totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-1.5 flex items-center justify-between text-[10px] text-emerald-700 font-bold">
                  <span>● SQLITE LOCAL + BACKUP OK ({savedTicketsCount + 1} guardados)</span>
                  <span>{lastScannedName ? `Últ: ${lastScannedName.slice(0, 14)}` : lastBackupTime}</span>
                </div>
              </div>
            </div>

            {/* Acciones del Ticket */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSavedTicketsCount((c) => c + 1);
                  clearCart();
                  setShowReceiptModal(false);
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer transition-colors"
              >
                Nueva Venta (Limpiar)
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowReceiptModal(false);
                  if (onOpenCheckoutModal) onOpenCheckoutModal("vitalicia");
                }}
                className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/20 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Instalar en mi Negocio</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

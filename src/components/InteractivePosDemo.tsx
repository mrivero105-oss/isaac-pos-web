"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Check,
  CreditCard,
  Banknote,
  QrCode,
  Printer,
  Wifi,
  WifiOff,
  Sparkles,
  Lock,
  Plus,
  Minus,
  CheckCircle2,
  RefreshCw,
  Share2,
} from "lucide-react";

const BCV_RATE = 490.00;

interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // in USD
  stock: number;
  image: string;
}

const REAL_PRODUCTS: Product[] = [
  { id: "1", name: "Arroz Clásico Primor 1Kg", category: "Víveres", price: 1.45, stock: 120, image: "/real-products/arroz_clasico.png" },
  { id: "2", name: "Café Molido Arauca 200g", category: "Víveres", price: 2.80, stock: 85, image: "/real-products/cafe_arauca.png" },
  { id: "3", name: "Aceite Vegetal Vatel 1L", category: "Víveres", price: 2.95, stock: 64, image: "/real-products/aceite_vatel.png" },
  { id: "4", name: "Natuchips Platanitos 150g", category: "Snacks", price: 1.25, stock: 48, image: "/real-products/natuchips.png" },
  { id: "5", name: "Galletas Doraditas Paquete", category: "Snacks", price: 0.90, stock: 75, image: "/real-products/doradita.png" },
  { id: "6", name: "Pasta Corta Primor 500g", category: "Víveres", price: 1.10, stock: 140, image: "/real-products/pasta_primor.png" },
  { id: "7", name: "Leche Completa Amanecer", category: "Lácteos", price: 3.20, stock: 35, image: "/real-products/leche_amanecer.png" },
  { id: "8", name: "Chocolate Savoy Rikiti", category: "Golosinas", price: 1.50, stock: 90, image: "/real-products/rikiti.png" },
  { id: "9", name: "Diablitos Underwood 100g", category: "Víveres", price: 1.75, stock: 60, image: "/real-products/diablito.png" },
  { id: "10", name: "Cheese Tris Familiar", category: "Snacks", price: 1.35, stock: 55, image: "/real-products/cheese_tris.png" },
  { id: "11", name: "Refresco Coca-Cola 355ml", category: "Bebidas", price: 1.20, stock: 110, image: "/real-products/coca_cola.png" },
  { id: "12", name: "Malta Polar / Caracas", category: "Bebidas", price: 1.15, stock: 80, image: "/real-products/malta.png" },
  { id: "13", name: "Chocolates Toronto Savoy", category: "Golosinas", price: 0.85, stock: 100, image: "/real-products/toronto.png" },
  { id: "14", name: "Refresco Pepsi Cola 1.5L", category: "Bebidas", price: 1.80, stock: 92, image: "/real-products/pepsi.jpg" },
];

export const InteractivePosDemo: React.FC = () => {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([
    { product: REAL_PRODUCTS[0], quantity: 2 },
    { product: REAL_PRODUCTS[1], quantity: 1 },
    { product: REAL_PRODUCTS[3], quantity: 1 },
  ]);
  const [isOffline, setIsOffline] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = ["Todos", "Víveres", "Snacks", "Golosinas", "Bebidas", "Lácteos"];

  const formatBs = (usd: number) => {
    return (usd * BCV_RATE).toLocaleString("es-VE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
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
        .filter(Boolean) as { product: Product; quantity: number }[]
    );
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.16; // 16% IVA
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setPaymentDone(true);
  };

  const resetCheckout = () => {
    setPaymentDone(false);
    setCart([
      { product: REAL_PRODUCTS[0], quantity: 2 },
      { product: REAL_PRODUCTS[1], quantity: 1 },
    ]);
  };

  const filteredProducts =
    selectedCategory === "Todos"
      ? REAL_PRODUCTS
      : REAL_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="simulador" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulador Interactivo en Vivo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Experimenta la Velocidad de Isaac POS
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Haz clic en los productos para agregarlos a la comanda, prueba el cobro en 1 segundo y activa el modo offline para ver cómo protege tus ventas sin internet.
          </p>
        </div>

        {/* Marco de Terminal POS / Tablet */}
        <div className="bg-slate-900/90 rounded-2xl sm:rounded-3xl border-2 border-slate-700/80 shadow-2xl shadow-emerald-950/20 overflow-hidden max-w-5xl mx-auto backdrop-blur-xl">
          {/* Barra Superior del Sistema Operativo POS Real */}
          <div className="bg-slate-950 px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-black text-xs tracking-wide">ISAAC POS v24.04</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 font-semibold hidden sm:inline">Bodega Sigfrido</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 font-bold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>BCV: Bs. {BCV_RATE.toFixed(2)}</span>
              </div>
            </div>

            {/* Toggle de Modo Offline */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px] hidden sm:inline">Red Local:</span>
              <button
                onClick={() => setIsOffline(!isOffline)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                  isOffline
                    ? "bg-amber-950/80 text-amber-300 border border-amber-600/60"
                    : "bg-cyan-950/80 text-cyan-300 border border-cyan-600/60"
                }`}
              >
                {isOffline ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                    <span>WiFi Local / Offline</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                    <span>WiFi Sync PC Activo</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Notificación Dinámica de Estado de Red */}
          {isOffline && (
            <div className="bg-amber-950/40 border-b border-amber-800/60 px-4 py-2 text-center text-xs text-amber-300 font-medium flex items-center justify-center gap-2">
              <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Sin Internet Externo:</strong> Isaac POS sigue cobrando a toda velocidad con SQLite local y sincroniza por WiFi local con tus tablets Android.
              </span>
            </div>
          )}

          {/* Contenedor Principal: Catálogo + Ticket */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
            {/* Columna Izquierda: Catálogo y Categorías (7 cols) */}
            <div className="lg:col-span-7 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between">
              <div>
                {/* Categorías */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                        selectedCategory === cat
                          ? "bg-cyan-500 text-slate-950 font-bold"
                          : "bg-slate-800/80 hover:bg-slate-700 text-slate-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Grid de Productos Reales */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => addToCart(p)}
                      className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/50 rounded-xl p-3 text-left transition-all hover:scale-[1.02] flex flex-col justify-between h-32 group relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start">
                        <div className="w-11 h-11 rounded-lg overflow-hidden bg-white/10 p-1 border border-slate-700/60 flex items-center justify-center shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[10px] text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded font-mono">
                          Stock: {p.stock}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
                          {p.name}
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                          <span className="text-xs font-mono font-black text-emerald-400">
                            ${p.price.toFixed(2)}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-300 font-semibold">
                            Bs. {formatBs(p.price)}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tips del POS */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Tip: Toca cualquier producto para añadir a la comanda</span>
                <span className="text-emerald-400 font-mono">Respuesta táctil: 12ms</span>
              </div>
            </div>

            {/* Columna Derecha: Ticket de Venta Actual (5 cols) */}
            <div className="lg:col-span-5 p-4 sm:p-6 bg-slate-950/70 flex flex-col justify-between relative">
              {paymentDone ? (
                /* Modal / Vista de Ticket Cobrado Real */
                <div className="h-full flex flex-col items-center justify-center text-center p-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mb-2">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h3 className="text-lg font-black text-white mb-0.5">
                    ¡Venta Cobrada en 1.8 seg!
                  </h3>
                  <p className="text-xs text-slate-400 mb-3 font-mono">
                    Ticket #1084 • Impresión Térmica 80mm ESC/POS
                  </p>

                  <div className="w-full bg-white text-slate-900 rounded-xl p-3.5 font-mono text-left text-xs mb-4 shadow-xl border border-slate-300">
                    <div className="text-center font-black pb-1.5 border-b border-dashed border-slate-400">
                      <div>*** ISAAC POS V24.04 ***</div>
                      <div className="text-[11px] font-bold">BODEGA SIGFRIDO, C.A.</div>
                      <div className="text-[9px] font-normal text-slate-600">RIF: J-502994484-0 • CARACAS</div>
                      <div className="text-[10px] text-emerald-700 font-bold mt-0.5">
                        TASA OFICIAL BCV: Bs. {BCV_RATE.toFixed(2)}
                      </div>
                    </div>
                    <div className="py-2 space-y-1 text-[11px]">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex justify-between">
                          <span className="truncate max-w-[170px]">
                            {item.quantity}x {item.product.name}
                          </span>
                          <span className="font-bold shrink-0">
                            Bs. {formatBs(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-dashed border-slate-400 space-y-0.5 text-[11px]">
                      <div className="flex justify-between">
                        <span>SUBTOTAL:</span>
                        <span>${subtotal.toFixed(2)} (Bs. {formatBs(subtotal)})</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IVA (16%):</span>
                        <span>${tax.toFixed(2)} (Bs. {formatBs(tax)})</span>
                      </div>
                      <div className="flex justify-between font-black text-xs text-slate-950 pt-1 border-t border-slate-300">
                        <span>TOTAL A PAGAR:</span>
                        <span>Bs. {formatBs(total)} (${total.toFixed(2)})</span>
                      </div>
                    </div>
                    <div className="text-[9px] text-center pt-2 text-slate-500 border-t border-dotted border-slate-300 mt-2">
                      FORMA DE PAGO: MIXTO (DIVISAS + PAGO MÓVIL)
                      <div>AUTENTICADO CON HASH SHA-256</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <button
                      onClick={resetCheckout}
                      className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Nueva Venta</span>
                    </button>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `Hola! Este es tu comprobante de compra en Bodega Sigfrido procesado con Isaac POS:\nTotal: Bs. ${formatBs(total)} ($${total.toFixed(2)} USD)\nTasa BCV: ${BCV_RATE.toFixed(2)}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Enviar a WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* Ticket de Venta en Proceso */
                <>
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-cyan-400" />
                        <h3 className="font-bold text-sm text-white">Comanda #1084</h3>
                      </div>
                      {cart.length > 0 && (
                        <button
                          onClick={clearCart}
                          className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Limpiar
                        </button>
                      )}
                    </div>

                    {/* Lista de Items en Comanda */}
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {cart.length === 0 ? (
                        <div className="text-center py-10 text-slate-500 text-xs">
                          Comanda vacía. Haz clic en los productos para agregarlos.
                        </div>
                      ) : (
                        cart.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-xs"
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0 mr-2">
                              <div className="w-8 h-8 rounded bg-white/10 p-0.5 shrink-0 flex items-center justify-center">
                                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="font-semibold text-slate-200 truncate">
                                  {item.product.name}
                                </div>
                                <div className="text-slate-400 text-[11px] font-mono">
                                  ${item.product.price.toFixed(2)} (Bs. {formatBs(item.product.price)})
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center bg-slate-800 rounded-md border border-slate-700">
                                <button
                                  onClick={() => updateQuantity(item.product.id, -1)}
                                  className="p-1 hover:text-rose-400"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 font-mono font-bold text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, 1)}
                                  className="p-1 hover:text-emerald-400"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <span className="w-16 text-right font-mono font-bold text-white text-[11px]">
                                ${ (item.product.price * item.quantity).toFixed(2) }
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Totales y Botón de Cobro */}
                  <div className="pt-4 border-t border-slate-800">
                    <div className="space-y-1.5 text-xs text-slate-400 font-mono mb-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)} USD • Bs. {formatBs(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Impuestos (16% IVA)</span>
                        <span>${tax.toFixed(2)} USD • Bs. {formatBs(tax)}</span>
                      </div>
                      <div className="flex justify-between text-base font-extrabold text-emerald-400 pt-1 border-t border-slate-800">
                        <span>TOTAL A PAGAR</span>
                        <div className="text-right">
                          <div>${total.toFixed(2)} USD</div>
                          <div className="text-xs text-cyan-300 font-mono font-semibold">Bs. {formatBs(total)}</div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={cart.length === 0}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Cobrar Ticket (${total.toFixed(2)} USD)</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

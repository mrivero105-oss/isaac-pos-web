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
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

const REAL_PRODUCTS: Product[] = [
  { id: "1", name: "Arroz Clásico Primor 1Kg", category: "Víveres", price: 1.45, stock: 120, image: "/real-products/arroz_clasico.png" },
  { id: "2", name: "Café Molido Arauca 200g", category: "Víveres", price: 2.80, stock: 85, image: "/real-products/cafe_arauca.png" },
  { id: "3", name: "Aceite Vegetal Vatel 1L", category: "Víveres", price: 2.95, stock: 64, image: "/real-products/aceite_vatel.png" },
  { id: "4", name: "Natuchips Platanitos 150g", category: "Snacks", price: 1.25, stock: 48, image: "/real-products/natuchips.png" },
  { id: "5", name: "Refresco Pepsi Cola 1.5L", category: "Bebidas", price: 1.80, stock: 92, image: "/real-products/pepsi.jpg" },
  { id: "6", name: "Pasta Primor Corta 500g", category: "Víveres", price: 1.10, stock: 140, image: "/real-products/pasta_primor.png" },
  { id: "7", name: "Leche Completa Amanecer", category: "Lácteos", price: 3.20, stock: 35, image: "/real-products/leche_amanecer.png" },
  { id: "8", name: "Galletas Doraditas Paquete", category: "Snacks", price: 0.90, stock: 75, image: "/real-products/doradita.png" },
];

export const InteractivePosDemo: React.FC = () => {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([
    { product: REAL_PRODUCTS[0], quantity: 2 },
    { product: REAL_PRODUCTS[2], quantity: 1 },
  ]);
  const [isOffline, setIsOffline] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = ["Todos", "Víveres", "Snacks", "Bebidas", "Lácteos"];

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
  const tax = subtotal * 0.16; // 16% IVA simulado
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setPaymentDone(true);
  };

  const resetCheckout = () => {
    setPaymentDone(false);
    setCart([
      { product: REAL_PRODUCTS[0], quantity: 1 },
      { product: REAL_PRODUCTS[3], quantity: 2 },
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
          {/* Barra Superior del Sistema Operativo POS */}
          <div className="bg-slate-950 px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <span className="text-slate-400 hidden sm:inline">Terminal #01 - Sucursal Central</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" /> Base de Datos Cifrada
              </span>
            </div>

            {/* Toggle de Modo Offline */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px] hidden sm:inline">Simular Red:</span>
              <button
                onClick={() => setIsOffline(!isOffline)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                  isOffline
                    ? "bg-amber-950/80 text-amber-300 border border-amber-600/60"
                    : "bg-emerald-950/80 text-emerald-300 border border-emerald-600/60"
                }`}
              >
                {isOffline ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                    <span>Modo Offline Activo</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Conectado a la Nube</span>
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
                <strong>Internet Desconectado:</strong> Isaac POS sigue vendiendo con normalidad y guarda los registros con cifrado local SQLite + sincronización diferida.
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
                          ? "bg-emerald-500 text-slate-950 font-bold"
                          : "bg-slate-800/80 hover:bg-slate-700 text-slate-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Grid de Productos */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => addToCart(p)}
                      className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 rounded-xl p-3 text-left transition-all hover:scale-[1.02] flex flex-col justify-between h-28 group relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 p-1 border border-slate-700/60 flex items-center justify-center shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[10px] text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded font-mono">
                          Stock: {p.stock}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                          {p.name}
                        </div>
                        <div className="text-xs font-mono font-extrabold text-emerald-400">
                          ${p.price.toFixed(2)}
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
                /* Modal / Vista de Ticket Cobrado */
                <div className="h-full flex flex-col items-center justify-center text-center p-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-1">
                    ¡Venta Cobrada en 1.4 seg!
                  </h3>
                  <p className="text-xs text-slate-400 mb-4 font-mono">
                    Ticket #1084 • Impresión Térmica Enviada
                  </p>

                  <div className="w-full bg-white text-slate-900 rounded-lg p-4 font-mono text-left text-xs mb-6 shadow-xl border border-slate-300">
                    <div className="text-center font-bold pb-2 border-b border-dashed border-slate-400">
                      *** ISAAC POS TICKET ***
                      <div suppressHydrationWarning className="text-[10px] font-normal text-slate-600">
                        {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="py-2 space-y-1">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex justify-between">
                          <span>
                            {item.quantity}x {item.product.name.slice(0, 16)}
                          </span>
                          <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-dashed border-slate-400 flex justify-between font-extrabold text-sm">
                      <span>TOTAL PAGADO:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="text-[10px] text-center pt-2 text-slate-500">
                      Cifrado SHA-256: 8f4e...91a2
                    </div>
                  </div>

                  <button
                    onClick={resetCheckout}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Realizar Nueva Venta de Prueba</span>
                  </button>
                </div>
              ) : (
                /* Ticket de Venta en Proceso */
                <>
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-emerald-400" />
                        <h3 className="font-bold text-sm text-white">Ticket de Venta #1084</h3>
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
                                  ${item.product.price.toFixed(2)} c/u
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
                              <span className="w-14 text-right font-mono font-bold text-white">
                                ${(item.product.price * item.quantity).toFixed(2)}
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
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Impuestos (16% IVA)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-base font-extrabold text-emerald-400 pt-1 border-t border-slate-800">
                        <span>TOTAL</span>
                        <span>${total.toFixed(2)} USD</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={cart.length === 0}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Cobrar Ticket (${total.toFixed(2)})</span>
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

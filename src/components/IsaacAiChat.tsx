"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  X,
  Send,
  Loader2,
  Bot,
  User,
  MessageSquare,
  Share2,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  suggestions?: string[];
  time: string;
}

interface IsaacAiChatProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckoutModal?: (plan?: string) => void;
}

export const IsaacAiChat: React.FC<IsaacAiChatProps> = ({
  isOpen,
  onClose,
  onOpenCheckoutModal,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: `👋 ¡Hola! Soy **Isaac AI**, el consultor inteligente gratuito de **Isaac POS V24.04 Ultra**.

Puedo ayudarte con:
* 🚀 **Nueva Edición Ultra**: Motor con aceleración por GPU, mínimo consumo de memoria y descargas directas.
* 🖥️ **Visor de Cliente (2da Pantalla)**: Monitoreo en vivo para el comprador con fotos, tasa BCV y total dual.
* 🏭 **Producción & Recetas BOM**: Costeo de fórmulas y rebaja automática de ingredientes.
* ⚡ **Modo 100% Offline**: SQLite local y sync WiFi sin internet.
* 💵 **Tasa BCV Oficial** y cobros bimonetarios automáticos.
* 🛡️ **Arqueo Ciego** anti-robo de caja y control de inventario.
* 💰 **Precios y Planes**: Desde $29/mes o $499 vitalicio sin mensualidades.

¿Qué te gustaría saber sobre la versión Ultra o tu negocio?`,
      suggestions: [
        "¿Qué novedades trae la Edición Ultra?",
        "¿Cómo funciona el Visor de 2da pantalla?",
        "¿Cómo funciona sin internet?",
        "¿Cuánto cuesta la Licencia Vitalicia?",
      ],
      time: "Ahora",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: "msg_" + Date.now(),
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString("es-VE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();

      const aiReply: Message = {
        id: "ai_" + Date.now(),
        sender: "ai",
        text: data.reply || "Disculpa, ocurrió un error temporal. ¿Deseas consultar por WhatsApp?",
        suggestions: data.suggestions || [],
        time: new Date().toLocaleTimeString("es-VE", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch {
      const errorReply: Message = {
        id: "ai_err_" + Date.now(),
        sender: "ai",
        text: "Hubo una intermitencia de conexión. Puedes contactarnos de inmediato por WhatsApp para atenderte de forma personalizada.",
        suggestions: ["Hablar con un asesor por WhatsApp"],
        time: new Date().toLocaleTimeString("es-VE", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome_" + Date.now(),
        sender: "ai",
        text: "Conversación reiniciada. ¿En qué te puedo asesorar sobre Isaac POS?",
        suggestions: [
          "¿Cómo funciona sin internet?",
          "¿Qué impresoras son compatibles?",
          "Ver precios y planes",
        ],
        time: "Ahora",
      },
    ]);
  };

  const lastUserQuestion =
    [...messages].reverse().find((m) => m.sender === "user")?.text || "Información general sobre Isaac POS";

  const whatsappUrl = `https://wa.me/584248302226?text=${encodeURIComponent(
    `¡Hola! Estuve conversando con Isaac AI en la página web sobre: "${lastUserQuestion}". Me gustaría recibir asesoría directa y agendar una demo.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:items-end sm:justify-end p-2 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-950 border border-cyan-500/40 rounded-3xl w-full max-w-lg h-[92vh] sm:h-[620px] flex flex-col shadow-2xl overflow-hidden relative text-white">
        
        {/* Cabecera del Asistente */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/60 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center overflow-hidden p-1">
                <img
                  src="/isaac-logo-ultra.png"
                  alt="Isaac AI Ultra"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm tracking-tight text-white">
                  Isaac AI
                </h3>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                  100% GRATIS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Consultor Técnico & Comercial POS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Reiniciar conversación"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Banner de Puente a WhatsApp */}
        <div className="bg-emerald-950/40 border-b border-emerald-800/50 px-4 py-2 flex items-center justify-between text-xs text-emerald-300">
          <span className="truncate pr-2">¿Prefieres atención con un especialista humano?</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1 transition-all"
          >
            <span>WhatsApp</span>
            <Share2 className="w-3 h-3" />
          </a>
        </div>

        {/* Lista de Mensajes con Scroll */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin text-xs sm:text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-md shadow-cyan-600/20"
                    : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-md"
                }`}
              >
                {/* Formateo simple de párrafos y listas */}
                <div className="whitespace-pre-line space-y-1.5">
                  {msg.text}
                </div>

                <div
                  className={`text-[10px] mt-2 font-mono ${
                    msg.sender === "user"
                      ? "text-cyan-200 text-right"
                      : "text-slate-400 text-left"
                  }`}
                >
                  {msg.time}
                </div>
              </div>

              {/* Sugerencias Rápidas bajo respuesta de la IA */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                  {msg.suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (sug.toLowerCase().includes("whatsapp")) {
                          window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                        } else if (sug.toLowerCase().includes("vitalicia") && onOpenCheckoutModal) {
                          onOpenCheckoutModal("vitalicia");
                        } else if (sug.toLowerCase().includes("profesional") && onOpenCheckoutModal) {
                          onOpenCheckoutModal("pro_anual");
                        } else {
                          handleSend(sug);
                        }
                      }}
                      className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-[11px] text-slate-300 hover:text-white transition-all flex items-center gap-1 group text-left"
                    >
                      <span>{sug}</span>
                      <ArrowRight className="w-3 h-3 text-cyan-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-cyan-400 bg-slate-900 p-3 rounded-2xl rounded-tl-none max-w-[70%] border border-slate-800">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <span>Analizando y preparando respuesta...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input y Botón de Envío */}
        <div className="p-3 bg-slate-900/90 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregúntale a Isaac AI (ej. ¿Qué balanzas soporta?)..."
              disabled={isLoading}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20 shrink-0"
              aria-label="Enviar pregunta"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 mt-2 font-mono">
            <span>Powered by Isaac Neural Engine</span>
            <span className="text-emerald-400">Gratis • Sin límite de consultas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

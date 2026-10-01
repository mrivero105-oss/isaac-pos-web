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
      text: `👋 ¡Hola! Bienvenido al canal de asesoría técnica y comercial de **Isaac POS**.

Puedo orientarte con precisión sobre:
* 🛒 **Compatibilidad para tu tipo de negocio**: Bodegas, minimarkets, farmacias, panaderías, ferreterías y tiendas.
* 🖨️ **Tus equipos actuales**: Impresoras térmicas (58mm/80mm), balanzas de peso, lectores de código de barra y visores secundarios.
* ⚡ **Operación 100% Offline**: Facturación continua sin depender de internet ni servidores externos.
* 💵 **Tasa Oficial BCV**: Cobros bimonetarios automáticos en dólares y bolívares.
* 🛡️ **Arqueo Ciego de Caja**: Control estricto y prevención de descuadres con tus cajeros.
* 🤝 **Instalación y Migración**: Te ayudamos a cargar tu catálogo desde Excel y configuramos todo por AnyDesk.

¿Qué tipo de comercio tienes o qué duda te gustaría consultar?`,
      suggestions: [
        "¿Es compatible con mi impresora térmica actual?",
        "¿Cómo funciona cuando se cae el internet?",
        "¿Me ayudan a cargar mis productos desde Excel?",
        "¿Qué precio tiene la licencia sin mensualidades?",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:items-end sm:justify-end p-2 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg h-[92vh] sm:h-[620px] flex flex-col shadow-2xl overflow-hidden relative text-slate-900">
        
        {/* Cabecera del Asistente */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 p-1 flex items-center justify-center text-blue-600 shrink-0">
              <img
                src="/isaac-logo-ultra.png"
                alt="Isaac POS"
                className="w-full h-full object-contain"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm tracking-tight text-slate-900">
                  Asesor Técnico & Comercial
                </h3>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  En línea
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Isaac POS • Orientación para tu negocio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              title="Reiniciar conversación"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              title="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Banner de Puente a WhatsApp */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 flex items-center justify-between text-xs text-emerald-800">
          <span className="truncate pr-2">¿Prefieres atención con un especialista humano?</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1 transition-all"
          >
            <span>WhatsApp</span>
            <Share2 className="w-3 h-3" />
          </a>
        </div>

        {/* Lista de Mensajes con Scroll */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin text-xs sm:text-sm bg-white">
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
                    ? "bg-blue-600 text-white rounded-br-none shadow-sm"
                    : "bg-slate-100 border border-slate-200 text-slate-800 rounded-tl-none shadow-sm"
                }`}
              >
                {/* Formateo simple de párrafos y listas */}
                <div className="whitespace-pre-line space-y-1.5">
                  {msg.text}
                </div>

                <div
                  className={`text-[10px] mt-2 ${
                    msg.sender === "user"
                      ? "text-blue-100 text-right"
                      : "text-slate-400 text-left"
                  }`}
                >
                  {msg.time}
                </div>
              </div>

              {/* Sugerencias Rápidas bajo respuesta */}
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
                      className="px-2.5 py-1 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-400 text-[11px] text-slate-700 hover:text-slate-900 transition-all flex items-center gap-1 group text-left shadow-sm"
                    >
                      <span>{sug}</span>
                      <ArrowRight className="w-3 h-3 text-blue-600 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-blue-600 bg-slate-100 p-3 rounded-2xl rounded-tl-none max-w-[70%] border border-slate-200">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <span>Analizando y preparando respuesta...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input y Botón de Envío */}
        <div className="p-3 bg-slate-50 border-t border-slate-200">
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
              placeholder="Pregúntale a nuestro asesor (ej. ¿Qué balanzas soporta?)..."
              disabled={isLoading}
              className="flex-1 bg-white border border-slate-300 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors shadow-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold transition-all shadow-md shadow-blue-600/20 shrink-0 cursor-pointer"
              aria-label="Enviar pregunta"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 mt-2">
            <span>Asistencia Oficial Isaac POS</span>
            <span className="text-emerald-600 font-semibold">Gratis • Sin límite de consultas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

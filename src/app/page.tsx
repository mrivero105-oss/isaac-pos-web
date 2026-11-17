"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InteractiveEngineeringBackground } from "@/components/InteractiveEngineeringBackground";
import { ProductAndIndustryHub } from "@/components/ProductAndIndustryHub";
import { InteractivePosDemo } from "@/components/InteractivePosDemo";
import { TechAndSupportHub } from "@/components/TechAndSupportHub";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { FloatingAiRobot } from "@/components/FloatingAiRobot";
import { trackGoogleAdsEvent } from "@/lib/gtag";

const SecureCheckoutModal = dynamic(
  () => import("@/components/SecureCheckoutModal").then((m) => m.SecureCheckoutModal),
  { ssr: false }
);
const IsaacAiChat = dynamic(
  () => import("@/components/IsaacAiChat").then((m) => m.IsaacAiChat),
  { ssr: false }
);
const VideoDemoModal = dynamic(
  () => import("@/components/VideoDemoModal").then((m) => m.VideoDemoModal),
  { ssr: false }
);

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("pro_anual");
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [videoDemoOpen, setVideoDemoOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("isaac_theme");
      if (saved === "dark") {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      } else {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      }
    } catch {
      // Fallback seguro a modo claro
    }
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem("isaac_theme", next);
      } catch {
        // Ignorar si almacenamiento está restringido
      }
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  const handleOpenModal = (plan: string = "pro_anual") => {
    trackGoogleAdsEvent("open_checkout_modal", { plan });
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenAiChat = () => {
    trackGoogleAdsEvent("open_ai_chat");
    setAiChatOpen(true);
  };

  const handleCloseAiChat = () => {
    setAiChatOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col relative min-h-screen">
      {/* Fondo Cinético de Ingeniería de Precisión */}
      <InteractiveEngineeringBackground variant={theme} />

      {/* Barra de Navegación Fija */}
      <Header
        onOpenModal={handleOpenModal}
        onOpenAiChat={handleOpenAiChat}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Flujo Principal Compacto Optimizado para Conversión */}
      <main className="flex-1">
        {/* 1. Hero: Propuesta de valor, doble pantalla (POS + Visor QR) y acceso directo */}
        <Hero
          onOpenModal={handleOpenModal}
          onOpenAiChat={handleOpenAiChat}
          onOpenVideoDemo={() => setVideoDemoOpen(true)}
        />

        {/* 2. Escaparate Unificado: 13 Módulos del Sistema + Soluciones por Rubro */}
        <ProductAndIndustryHub onOpenModal={handleOpenModal} />

        {/* 3. Simulador Interactivo: Prueba de cobro en vivo + 2da pantalla en el navegador */}
        <InteractivePosDemo onOpenModal={handleOpenModal} />

        {/* 4. Planes y Licencias: Oferta transparente ($12/mes, $24/mes y $199 Vitalicia) */}
        <Pricing onOpenModal={handleOpenModal} />

        {/* 5. Centro de Ingeniería, Hardware, Calculadora ROI y Soporte en 5 Pestañas */}
        <TechAndSupportHub onOpenModal={handleOpenModal} />

        {/* 6. Reseñas Verificadas de Clientes (con formulario desplegable) */}
        <Testimonials />

        {/* 7. Preguntas Frecuentes Unificadas */}
        <Faq />
      </main>

      {/* Pie de Página */}
      <Footer />

      {/* Botones Flotantes: Mini Robot Isaac POS + WhatsApp Oficial */}
      <div className="fixed bottom-5 sm:bottom-6 right-4 sm:right-6 z-40 flex items-end gap-2.5 sm:gap-3 pointer-events-none">
        <FloatingAiRobot onOpenAiChat={handleOpenAiChat} />
        <FloatingWhatsApp />
      </div>

      {/* Asistente Inteligente Gratuito de Isaac POS */}
      <IsaacAiChat
        isOpen={aiChatOpen}
        onClose={handleCloseAiChat}
        onOpenCheckoutModal={handleOpenModal}
      />

      {/* Modal de Checkout / Demo Seguro Multimoneda */}
      <SecureCheckoutModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        initialPlan={selectedPlan}
      />

      {/* Reproductor de Video Demostrativo Interactivo */}
      <VideoDemoModal
        isOpen={videoDemoOpen}
        onClose={() => setVideoDemoOpen(false)}
        onOpenCheckoutModal={handleOpenModal}
      />
    </div>
  );
}

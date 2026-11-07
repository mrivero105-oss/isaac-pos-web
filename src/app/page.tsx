"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InteractiveEngineeringBackground } from "@/components/InteractiveEngineeringBackground";
import { UltraEditionShowcase } from "@/components/UltraEditionShowcase";
import { RealSystemShowcase } from "@/components/RealSystemShowcase";
import { InteractivePosDemo } from "@/components/InteractivePosDemo";
import { HardwareSection } from "@/components/HardwareSection";
import { HumanSupportSection } from "@/components/HumanSupportSection";
import { SecurityTrust } from "@/components/SecurityTrust";
import { Testimonials } from "@/components/Testimonials";
import { RoiCalculator } from "@/components/RoiCalculator";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { FloatingAiRobot } from "@/components/FloatingAiRobot";

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
const LiveSocialProof = dynamic(
  () => import("@/components/LiveSocialProof").then((m) => m.LiveSocialProof),
  { ssr: false }
);

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("pro_anual");
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [videoDemoOpen, setVideoDemoOpen] = useState(false);

  const handleOpenModal = (plan: string = "pro_anual") => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenAiChat = () => {
    setAiChatOpen(true);
  };

  const handleCloseAiChat = () => {
    setAiChatOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col relative min-h-screen">
      {/* Fondo Cinético de Ingeniería de Precisión */}
      <InteractiveEngineeringBackground />

      {/* Barra de Navegación Fija */}
      <Header
        onOpenModal={handleOpenModal}
        onOpenAiChat={handleOpenAiChat}
      />

      {/* Flujo Principal Optimizado para Conversión */}
      <main className="flex-1">
        {/* 1. Hero: Propuesta de valor, doble pantalla (POS + Visor QR) y acceso directo */}
        <Hero
          onOpenModal={handleOpenModal}
          onOpenAiChat={handleOpenAiChat}
          onOpenVideoDemo={() => setVideoDemoOpen(true)}
        />

        {/* 2. Sistema Real: Los 13 Módulos V24.04 organizados en 3 Pilares */}
        <RealSystemShowcase />

        {/* 3. Simulador Interactivo: Prueba de cobro en vivo en el navegador */}
        <InteractivePosDemo />

        {/* 4. Planes y Licencias: Oferta transparente ($12/mes, $24/mes y $199 Vitalicia) */}
        <Pricing onOpenModal={handleOpenModal} />

        {/* 5. Seguridad, Blindaje de Caja y Arqueo Ciego Anti-Faltantes */}
        <SecurityTrust />

        {/* 6. Edición Ultra: Motor Local SQLite, Windows/Android e Instalación AnyDesk */}
        <UltraEditionShowcase onOpenModal={handleOpenModal} />

        {/* 7. Hardware y Periféricos Compatibles */}
        <HardwareSection />

        {/* 8. Acompañamiento Humano, Migración desde Excel y Soporte */}
        <HumanSupportSection />

        {/* 9. Casos de Éxito de Comercios Reales */}
        <Testimonials />

        {/* 10. Calculadora de Retorno de Inversión */}
        <RoiCalculator onOpenModal={handleOpenModal} />

        {/* 11. Preguntas Frecuentes */}
        <Faq />
      </main>

      {/* Pie de Página */}
      <Footer />

      {/* Notificaciones de Actividad de Comercios en Tiempo Real */}
      <LiveSocialProof />

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

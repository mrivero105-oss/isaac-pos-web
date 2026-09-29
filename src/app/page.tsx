"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { UltraEditionShowcase } from "@/components/UltraEditionShowcase";
import { RealSystemShowcase } from "@/components/RealSystemShowcase";
import { InteractivePosDemo } from "@/components/InteractivePosDemo";
import { HardwareSection } from "@/components/HardwareSection";
import { SecurityTrust } from "@/components/SecurityTrust";
import { Testimonials } from "@/components/Testimonials";
import { RoiCalculator } from "@/components/RoiCalculator";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { SecureCheckoutModal } from "@/components/SecureCheckoutModal";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { FloatingAiRobot } from "@/components/FloatingAiRobot";
import { IsaacAiChat } from "@/components/IsaacAiChat";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("pro_anual");
  const [aiChatOpen, setAiChatOpen] = useState(false);

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
    <div className="flex-1 flex flex-col relative">
      {/* Barra de Navegación Fija */}
      <Header
        onOpenModal={handleOpenModal}
        onOpenAiChat={handleOpenAiChat}
      />

      {/* Flujo Principal Organizado */}
      <main className="flex-1">
        {/* 1. Hero: Propuesta de valor, nuevo motor y terminal en vivo */}
        <Hero
          onOpenModal={handleOpenModal}
          onOpenAiChat={handleOpenAiChat}
        />

        {/* 2. Edición Ultra: Salto tecnológico y Centro de Descargas Oficiales */}
        <UltraEditionShowcase />

        {/* 3. Sistema Real: La Suite Completa Organizada en 4 Pilares de Trabajo */}
        <RealSystemShowcase />

        {/* 4. Simulador Interactivo: Prueba en vivo en el navegador */}
        <InteractivePosDemo />

        {/* 5. Hardware y Periféricos Compatibles */}
        <HardwareSection />

        {/* 6. Seguridad, Blindaje de Caja y Modo 100% Offline */}
        <SecurityTrust />

        {/* 7. Casos de Éxito de Comercios Reales */}
        <Testimonials />

        {/* 8. Calculadora de Retorno de Inversión */}
        <RoiCalculator onOpenModal={handleOpenModal} />

        {/* 9. Planes y Precios Transparentes con Pago Móvil, Zelle y Cripto */}
        <Pricing onOpenModal={handleOpenModal} />

        {/* 10. Preguntas Frecuentes */}
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
    </div>
  );
}

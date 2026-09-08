"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InteractivePosDemo } from "@/components/InteractivePosDemo";
import { Features } from "@/components/Features";
import { HardwareSection } from "@/components/HardwareSection";
import { SecurityTrust } from "@/components/SecurityTrust";
import { RoiCalculator } from "@/components/RoiCalculator";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { SecureCheckoutModal } from "@/components/SecureCheckoutModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("pro_anual");

  const handleOpenModal = (plan: string = "pro_anual") => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Barra de Navegación Fija */}
      <Header onOpenModal={handleOpenModal} />

      {/* Contenido Principal */}
      <main className="flex-1">
        <Hero onOpenModal={handleOpenModal} />
        <InteractivePosDemo />
        <Features />
        <HardwareSection />
        <SecurityTrust />
        <RoiCalculator onOpenModal={handleOpenModal} />
        <Pricing onOpenModal={handleOpenModal} />
        <Faq />
      </main>

      {/* Pie de Página */}
      <Footer />

      {/* Modal de Checkout / Demo Seguro */}
      <SecureCheckoutModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        initialPlan={selectedPlan}
      />
    </div>
  );
}

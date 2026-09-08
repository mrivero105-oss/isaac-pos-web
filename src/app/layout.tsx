import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Isaac POS - El Sistema de Punto de Venta más Rápido y Seguro",
  description:
    "Facturación en menos de 3 segundos, inventario en tiempo real, modo 100% offline y arqueo ciego anti-fraude. Compatible con tablets Android e impresoras térmicas.",
  keywords: [
    "punto de venta",
    "POS",
    "Isaac POS",
    "software de cobro",
    "inventario",
    "facturación offline",
    "Android POS",
    "seguridad bancaria",
    "corte de caja",
  ],
  authors: [{ name: "Isaac POS Team" }],
  icons: {
    icon: "/isaac-icon-3d.png",
    shortcut: "/isaac-icon-3d.png",
    apple: "/isaac-icon-3d.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Isaac POS V24.04 - El Sistema de Punto de Venta más Rápido y Seguro",
    description:
      "Vende sin interrupciones incluso sin internet. Tasa BCV en vivo, Arqueo Ciego anti-robo, Importador IA y máxima seguridad para tu comercio.",
    type: "website",
    locale: "es_LA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#090d16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-emerald-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

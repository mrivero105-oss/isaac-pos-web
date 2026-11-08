import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://isaacventas.com"),
  alternates: {
    canonical: "/",
  },
  title: "Isaac POS V24.04 Ultra - El Punto de Venta más Rápido, Compacto y Seguro",
  description:
    "Nuevo motor Ultra con aceleración GPU, visor de cliente para segunda pantalla, cobros duales USD/Bs a tasa BCV en 2 segundos, modo 100% offline, producción y arqueo ciego.",
  keywords: [
    "punto de venta",
    "POS",
    "Isaac POS",
    "Isaac POS Ultra",
    "punto de venta Venezuela",
    "software de cobro",
    "visor de cliente 2da pantalla",
    "produccion BOM recetas",
    "inventario bimonetario",
    "tasa BCV",
    "facturación offline",
    "Android POS",
    "seguridad bancaria",
    "corte de caja",
    "arqueo ciego",
  ],
  authors: [{ name: "Isaac POS Engineering Team" }],
  icons: {
    icon: [
      { url: "/favicon.ico?v=2026", sizes: "any" },
      { url: "/icon-48x48.png?v=2026", sizes: "48x48", type: "image/png" },
      { url: "/icon-96x96.png?v=2026", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png?v=2026", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png?v=2026", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico?v=2026"],
    apple: [
      { url: "/apple-touch-icon.png?v=2026", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Isaac POS V24.04 Ultra - El Punto de Venta más Rápido, Compacto y Seguro",
    description:
      "Vende sin interrupciones incluso sin internet. Nuevo motor Ultra, Visor de Cliente 2da pantalla con QR Pago Móvil, Tasa BCV en vivo y Arqueo Ciego.",
    url: "https://isaacventas.com",
    type: "website",
    locale: "es_VE",
    siteName: "Isaac POS",
    images: [
      {
        url: "/real-system/v24_pos_terminal.png",
        width: 1024,
        height: 551,
        alt: "Isaac POS V24.04 Ultra - Terminal de Ventas Bimonetario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isaac POS V24.04 Ultra - Punto de Venta Bimonetario 100% Offline",
    description:
      "Cobra en menos de 2 segundos a tasa oficial BCV, visor 2da pantalla con QR de Pago Móvil y arqueo ciego anti-faltantes.",
    images: ["/real-system/v24_pos_terminal.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#090d16",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Isaac POS",
      alternateName: ["Isaac Ventas", "Isaac POS Ultra", "isaacventas.com"],
      url: "https://www.isaacventas.com",
    },
    {
      "@type": "SoftwareApplication",
      name: "Isaac POS",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android 7.0+, Windows 10/11, Web",
      offers: [
        {
          "@type": "Offer",
          price: "12",
          priceCurrency: "USD",
          name: "Plan Emprendedor Mensual",
        },
        {
          "@type": "Offer",
          price: "24",
          priceCurrency: "USD",
          name: "Plan Profesional Mensual",
        },
        {
          "@type": "Offer",
          price: "199",
          priceCurrency: "USD",
          name: "Licencia Vitalicia Perpetua",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "320",
        bestRating: "5",
        worstRating: "1",
      },
      description:
        "Sistema de punto de venta y facturación bimonetaria (USD / Bs) con sincronización automática de tasa BCV, modo offline resiliente y auditoría de arqueo ciego.",
    },
    {
      "@type": "Organization",
      name: "Isaac POS",
      url: "https://www.isaacventas.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.isaacventas.com/icon-512x512.png",
        width: 512,
        height: 512,
      },
      image: "https://www.isaacventas.com/isaac-logo-horizontal.png",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: ["Spanish"],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué sucede si se corta el internet o la señal en mi local?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Isaac POS cuenta con una arquitectura 100% offline sobre SQLite local. Puedes seguir registrando ventas, cobrando en bolívares o divisas a tasa BCV e imprimiendo tickets térmicos sin depender de internet.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué precio tiene Isaac POS y cómo funciona la Licencia Vitalicia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ofrecemos el Plan Emprendedor desde $12 USD/mes ($99/año), el Plan Profesional por $24 USD/mes ($190/año, hasta 3 cajas), y la Licencia Vitalicia por un pago único de $199 USD (incluye 1 Admin + 1 Caja de por vida sin mensualidades, con opción de agregar cajas extra por $49 USD pago único).",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo funciona el Visor de Cliente en 2da pantalla con QR de Pago Móvil?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Al conectar un segundo monitor o tablet orientado al comprador, Isaac POS muestra cada producto escaneado en dólares y bolívares a tasa oficial BCV y genera automáticamente un código QR de Pago Móvil con el monto exacto en Bolívares para escanear desde cualquier app bancaria.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo evita Isaac POS el robo hormiga o faltantes de caja?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Implementa Arqueo Ciego Certificado: al cerrar turno, el cajero debe declarar el conteo físico de billetes en dólares y bolívares sin que el sistema le muestre el monto esperado. Cualquier diferencia queda auditada al instante en el Corte Z.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600/15 selection:text-blue-900`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

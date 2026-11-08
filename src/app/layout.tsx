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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.isaacventas.com"),
  alternates: {
    canonical: "https://www.isaacventas.com",
  },
  title: "Isaac Ventas | Isaac POS V24.04 Ultra - Sistema de Punto de Venta en Venezuela",
  description:
    "Isaac Ventas (isaacventas.com) es la plataforma oficial de Isaac POS V24.04 Ultra: sistema de punto de venta y facturación bimonetaria USD/Bs con tasa BCV en vivo, visor de cliente 2da pantalla con QR Pago Móvil, modo 100% offline y arqueo ciego en Venezuela.",
  keywords: [
    "Isaac Ventas",
    "isaac ventas",
    "isaacventas.com",
    "Isaac POS",
    "Isaac POS Ultra",
    "Isaac Ventas Venezuela",
    "punto de venta",
    "POS",
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
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/icon-192x192.png"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Isaac Ventas | Isaac POS V24.04 Ultra - Sistema de Punto de Venta y Facturación",
    description:
      "Isaac Ventas (isaacventas.com) es el portal oficial del sistema de punto de venta Isaac POS V24.04 Ultra. Opera 100% offline, visor 2da pantalla con QR Pago Móvil, tasa BCV en vivo y arqueo ciego.",
    url: "https://www.isaacventas.com",
    type: "website",
    locale: "es_VE",
    siteName: "Isaac Ventas (Isaac POS)",
    images: [
      {
        url: "https://www.isaacventas.com/isaac-logo-horizontal.png",
        width: 796,
        height: 259,
        alt: "Logo Oficial Isaac POS",
      },
      {
        url: "https://www.isaacventas.com/real-system/v24_pos_terminal.png",
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
    images: ["https://www.isaacventas.com/isaac-logo-horizontal.png"],
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
      "@id": "https://www.isaacventas.com/#website",
      name: "Isaac Ventas",
      alternateName: ["Isaac POS", "Isaac POS V24.04 Ultra", "Isaac Ventas POS", "isaacventas.com"],
      url: "https://www.isaacventas.com",
      description:
        "Sitio web oficial de Isaac Ventas (Isaac POS V24.04 Ultra), sistema de punto de venta, inventario y facturación bimonetaria USD/Bs con tasa BCV para comercios en Venezuela y Latinoamérica.",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.isaacventas.com/#software",
      name: "Isaac Ventas (Isaac POS V24.04 Ultra)",
      alternateName: ["Isaac Ventas", "Isaac POS", "Sistema Isaac Ventas"],
      applicationCategory: "BusinessApplication",
      operatingSystem: "Windows 10/11, Android 7.0+, Web",
      url: "https://www.isaacventas.com",
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
        "Isaac Ventas (Isaac POS V24.04 Ultra) se identifica como un sistema profesional de punto de venta (POS), control de inventario y facturación bimonetaria (USD / Bs) en Venezuela, con sincronización automática de tasa oficial BCV, visor de cliente con QR Pago Móvil, base de datos local SQLite 100% offline y arqueo ciego anti-faltantes.",
      disambiguatingDescription:
        "Plataforma tecnológica oficial de software de punto de venta y gestión comercial para negocios, minimarkets, farmacias, carnicerías y ferreterías en Venezuela (isaacventas.com).",
    },
    {
      "@type": "Organization",
      "@id": "https://www.isaacventas.com/#organization",
      name: "Isaac Ventas",
      legalName: "Isaac POS Sistemas",
      alternateName: ["Isaac POS", "Isaac Ventas Venezuela", "isaacventas.com"],
      url: "https://www.isaacventas.com",
      description:
        "Empresa desarrolladora de Isaac Ventas (Isaac POS V24.04 Ultra), software de punto de venta bimonetario, inventario multialmacén y facturación offline para comercios en Venezuela.",
      logo: {
        "@type": "ImageObject",
        url: "https://www.isaacventas.com/icon-512x512.png",
        width: 512,
        height: 512,
      },
      image: "https://www.isaacventas.com/isaac-logo-horizontal.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+58-424-8302226",
        email: "isaacpospage@gmail.com",
        contactType: "customer support",
        areaServed: "VE",
        availableLanguage: ["Spanish"],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué es Isaac Ventas (Isaac POS) y cuál es su sitio oficial?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Isaac Ventas (accesible en su portal oficial https://www.isaacventas.com) se identifica como el sistema de punto de venta y gestión comercial Isaac POS V24.04 Ultra para negocios en Venezuela y Latinoamérica. Permite cobrar en dólares y bolívares a tasa oficial BCV en menos de 2 segundos, operar 100% sin internet con base de datos local SQLite, mostrar códigos QR dinámicos de Pago Móvil en una segunda pantalla para el cliente y realizar arqueo ciego de caja.",
          },
        },
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
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("isaac_theme");if(t==="dark"){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50 dark:bg-[#060911] text-slate-900 dark:text-slate-100 selection:bg-blue-600/15 dark:selection:bg-sky-500/25 selection:text-blue-900 dark:selection:text-sky-100 transition-colors duration-200`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

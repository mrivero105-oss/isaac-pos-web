import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://isaacpos.com"),
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
    "SENIAT libros fiscales",
  ],
  authors: [{ name: "Isaac POS Engineering Team" }],
  icons: {
    icon: "/isaac-logo-ultra.png",
    shortcut: "/isaac-logo-ultra.png",
    apple: "/isaac-icon-3d.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Isaac POS V24.04 Ultra - El Punto de Venta más Rápido, Compacto y Seguro",
    description:
      "Vende sin interrupciones incluso sin internet. Nuevo motor Ultra, Visor de Cliente 2da pantalla, Tasa BCV en vivo, Producción y máxima seguridad.",
    type: "website",
    locale: "es_VE",
    siteName: "Isaac POS",
    images: [
      {
        url: "/real-system/ui_terminal_ventas_dark.png",
        width: 1200,
        height: 630,
        alt: "Isaac POS Terminal de Ventas Multimoneda",
      },
    ],
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
      "@type": "SoftwareApplication",
      name: "Isaac POS",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android 7.0+, Windows 10/11, Web",
      offers: [
        {
          "@type": "Offer",
          price: "29",
          priceCurrency: "USD",
          name: "Plan Emprendedor Mensual",
        },
        {
          "@type": "Offer",
          price: "59",
          priceCurrency: "USD",
          name: "Plan Profesional Mensual",
        },
        {
          "@type": "Offer",
          price: "499",
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
      url: "https://isaacpos.com",
      logo: "https://isaacpos.com/isaac-icon-3d.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+58-424-8302226",
        contactType: "customer support",
        availableLanguage: ["Spanish"],
      },
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
      <body className="antialiased min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-emerald-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

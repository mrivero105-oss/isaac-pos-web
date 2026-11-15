import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de Moderación de Reseñas | Isaac POS",
  description: "Panel privado de administración para aprobar o rechazar reseñas de clientes de Isaac POS.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vista Técnica del Terminal | Isaac POS",
  alternates: {
    canonical: "/terminal-preview",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function TerminalPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

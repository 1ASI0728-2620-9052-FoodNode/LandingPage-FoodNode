import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foodly | Descubre huariques y sabor tradicional en Lima",
  description:
    "Foodly conecta a los amantes de la gastronomía local con huariques auténticos de Lima. Descubre platos tradicionales, opciones cercanas y nuevas experiencias culinarias.",
  keywords: [
    "Foodly", "huariques", "gastronomía peruana", "comida criolla", "restaurantes auténticos",
    "huariques Lima", "Radar H3", "cevicherías", "comida tradicional", "reservas gastronómicas"
  ],
  authors: [{ name: "Foodly" }],
  robots: { index: true, follow: true },
  // Canonical: definir cuando Foodly tenga dominio oficial
  // alternates: { canonical: "URL_OFICIAL_DE_FOODLY" },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-20 -20 40 40'%3E%3Cpolygon points='16.5,-9.5 16.5,9.5 0,19 -16.5,9.5 -16.5,-9.5 0,-19' fill='%23964100'/%3E%3Ccircle cy='-1.5' r='4.6' fill='%23FFF8F5'/%3E%3Cpath d='M0 9 L-4.2 2.2 H4.2Z' fill='%23FFF8F5'/%3E%3C/svg%3E"
  }
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#964100" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-419">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

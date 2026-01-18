import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agri-Capitalist 3D",
  description: "A hardcore financial survival simulation disguised as a cheerful farming game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

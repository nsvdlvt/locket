import type { Metadata, Viewport } from "next";
import "./globals.css";
import { config } from "@/config";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#060814",
};

export const metadata: Metadata = {
  title: `${config.siteName} | Premium DNS`,
  description: config.description,
  keywords: ["Locket Gold", "NSVD", "DNS Download", "Locket DNS", "Locket Premium"],
  authors: [{ name: "NSVD" }],
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: config.siteName,
    description: config.description,
    type: "website",
    siteName: config.siteName,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark scroll-smooth">
      <body className="min-h-screen bg-mesh-gradient antialiased selection:bg-gold-500/30 selection:text-gold-300">
        {children}
      </body>
    </html>
  );
}

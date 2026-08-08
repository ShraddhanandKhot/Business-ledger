import type { Metadata } from "next";
import "./globals.css";
import RegisterSW from "../components/RegisterSW";

export const metadata: Metadata = {
  title: "Business Ledger",
  description: "Customer Ledger for Small Businesses",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Business Ledger",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import TitleBar from "@/components/titleBar";
const inter = Inter({ subsets: ["latin"] });
import { PrimeReactProvider } from "primereact/api";
export const metadata: Metadata = {
  title: "User Management App",
  description: "Some app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PrimeReactProvider>
        <body className={inter.className}>
        <TitleBar/>
          {children}</body>
      </PrimeReactProvider>
    </html>
  );
}

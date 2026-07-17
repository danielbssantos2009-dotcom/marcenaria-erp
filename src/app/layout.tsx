import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "ERP Marcenaria Nova Design",
  description: "ERP Full-Stack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="flex h-screen overflow-hidden antialiased">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-y-auto">
          <Header />
          <div className="p-8 md:p-10 max-w-[1400px] w-full mx-auto flex-1">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}


import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header />

      <main
        id="main-content"
        className="flex min-w-0 flex-1 flex-col bg-white"
      >
        {children}
      </main>

      <Footer />
    </>
  );
}

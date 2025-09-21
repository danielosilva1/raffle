import { Footer } from "@/components/footer/page";
import { Navbar } from "@/components/navbar/navbar";
import React from "react";

export default function RaffleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full grid-rows-[min-content_1fr_min-content]">
      <Navbar />
      <main className="h-full bg-blue-50 flex">{children}</main>
      <Footer />
    </div>
  );
}

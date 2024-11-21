"use client";

import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function PageLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/home";

  return (
    <div className={isHomePage ? "bg-white" : ""}>
      <Navbar />
      <div
        className={`flex flex-col custom-min-h mx-auto ${
          !isHomePage ? "lg:pt-28 pt-24" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

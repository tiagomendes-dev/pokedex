import React from "react";

import Footer from "./components/sections/footer";
import Header from "./components/sections/header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-18.25rem)]">{children}</main>
      <Footer />
    </>
  );
}

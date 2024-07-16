import React from "react"
import Header from "./components/sections/header"
import Footer from "./components/sections/footer"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({children}: MainLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
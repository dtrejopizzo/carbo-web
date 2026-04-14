import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Carbo Energy — Grid-Scale Storage That Lasts Decades",
  description:
    "Carbo Energy builds hybrid non-aqueous redox flow batteries with 190-200 Wh/L energy density. Safe, non-pyrophoric, 40-year lifespan. The future of long-duration energy storage.",
  keywords: "redox flow battery, energy storage, grid-scale, non-aqueous, long-duration, LDES, battery technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Outfit } from "next/font/google"
import "./globals.css"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Imad Cherradi",
  description:
    "Professional portfolio of Imad Cherradi, Electrical Engineer specializing in innovative solutions and powerful designs.",
  keywords: "electrical engineer, power systems, embedded systems, renewable energy, automation, portfolio",
  authors: [{ name: "Imad Cherradi" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white text-slate-900 selection:bg-blue-500/30" suppressHydrationWarning>{children}</body>
    </html>
  )
}

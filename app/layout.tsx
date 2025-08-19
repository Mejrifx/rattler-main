import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Courier_Prime } from "next/font/google"
import "./globals.css"

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
})

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
  display: "swap",
})

export const metadata: Metadata = {
  title: "$RTR - The Most Venomous Meme Coin on Abstract Chain",
  description:
    "Join Rattler's world on Abstract Chain. The most dynamic meme coin with lightning-fast strikes and endless possibilities.",
  generator: "v0.app",
  keywords: "RTR, Rattler, meme coin, Abstract Chain, cryptocurrency, snake, venomous, fast",
  openGraph: {
    title: "$RTR - The Most Venomous Meme Coin on Abstract Chain",
    description:
      "Join Rattler's world on Abstract Chain. The most dynamic meme coin with lightning-fast strikes and endless possibilities.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${courierPrime.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased" style={{ fontFamily: "var(--font-orbitron), monospace" }}>{children}</body>
    </html>
  )
}

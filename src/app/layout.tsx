import { Metadata } from "next"
import "./globals.css"
import ThemeMUI from "@/components/ThemeMUI"

export const metadata: Metadata = {
  title: "NextBot — Next.js Discord Bot Template",
  description:
    "A Discord bot template built with Next.js that runs in the edge runtime. Lightning-fast responses, zero cold starts, no servers to manage.",
  authors: [{ name: "Rot4tion" }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ThemeMUI>
        <body>{children}</body>
      </ThemeMUI>
    </html>
  )
}

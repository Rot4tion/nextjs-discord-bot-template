import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NextBot — Next.js Discord Bot Template",
  description:
    "A Discord bot template built with Next.js that runs in the edge runtime. Lightning-fast responses, zero cold starts, no servers to manage.",
  authors: [{ name: "jzxhuang" }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

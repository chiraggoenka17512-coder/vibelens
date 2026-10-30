import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeLens // Autonomous 3D Codebase X-Ray & SAST Engine",
  description: "Local-first codebase hygiene, vulnerability reachability, and 3D architecture visualization system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-[#060608] text-[#f8fafc] min-h-screen selection:bg-[#10b981] selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}

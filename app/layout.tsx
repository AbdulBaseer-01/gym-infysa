import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Nav from "@/components/Nav";



export const metadata: Metadata = {
  title: "GYM - INFYSA",
  description: "A Mockup landing page by INFYSA's-AURORA STUDIO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Nav /> */}
        {children}
      </body>
    </html>
  );
}

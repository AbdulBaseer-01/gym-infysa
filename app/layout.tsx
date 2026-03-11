import type { Metadata } from "next";
import "./globals.css";



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
        {children}
      </body>
    </html>
  );
}

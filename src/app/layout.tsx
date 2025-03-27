// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CustomThemeProvider } from "@/providers/CustomThemeProvider";
import { AuthProvider } from "@/providers/AuthProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tutorial App",
  description: "Programming and AI Tutorials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomThemeProvider>
          <AuthProvider> {children}</AuthProvider>
        </CustomThemeProvider>
      </body>
    </html>
  );
}

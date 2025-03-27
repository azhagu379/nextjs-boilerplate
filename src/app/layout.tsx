// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CustomThemeProvider } from '@/providers/CustomThemeProvider';
// Import the new MainLayout component
import { MainLayout } from '@/components/layout/MainLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tutorial App',
  description: 'Programming and AI Tutorials',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* ThemeProvider wraps everything */}
        <CustomThemeProvider>
          {/* MainLayout now wraps the page content (children) */}
          <MainLayout>
            {children}
          </MainLayout>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
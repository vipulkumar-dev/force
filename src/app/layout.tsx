// Top-level font setup + RootLayout
import type { Metadata } from "next";
import {
  Inter,
  Plus_Jakarta_Sans,
  Lexend_Deca,
  Geist,
  Geist_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ClientHeader from "@/components/common/app-header";
import AppFooter from "@/components/common/app-footer";
import { ThemeProvider } from "@/components/theme-provider";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vibranium",
  description: "Vibranium - The Future of Sports Trading.",
};

// RootLayout (server component)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-bg-primary pb-[80px] font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ClientHeader />
          {children}
          <AppFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}

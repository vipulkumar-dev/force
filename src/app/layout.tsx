// Top-level font setup + RootLayout
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Lexend_Deca } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ClientHeader from "@/components/common/app-header";
import AppFooter from "@/components/common/app-footer";
import { ThemeProvider } from "@/components/theme-provider";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const interDisplay = localFont({
  src: [
    {
      path: "./fonts/InterDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/InterDisplay-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-inter-display",
});

const nohemi = localFont({
  src: [
    // Make sure these files exist at src/app/fonts/Nohemi-Font/
    {
      path: "./fonts/Nohemi-Font/Nohemi-Regular-BF6438cc579d934.woff",
      weight: "400",
      style: "normal",
    },
    // Add other weights only if you have the files:
    {
      path: "./fonts/Nohemi-Font/Nohemi-Medium-BF6438cc57ddecd.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Nohemi-Font/Nohemi-SemiBold-BF6438cc57db2ff.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Nohemi-Font/Nohemi-Bold-BF6438cc577b524.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nohemi",
  display: "swap",
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
        className={`${interSans.variable} ${interDisplay.variable} ${plusJakartaSans.variable} ${lexendDeca.variable} ${nohemi.variable} bg-bg-primary pb-[80px] antialiased`}
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

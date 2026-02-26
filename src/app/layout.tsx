import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import { BackgroundEffect } from "@/components/ui/BackgroundEffect";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "../globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "Phuong LE | Full-Stack Developer",
    template: "%s | Phuong LE",
  },
  description:
    "Portfolio of Phuong LE, a full-stack developer specializing in React, Java/Spring, and cloud-native applications.",
  keywords: [
    "full-stack developer",
    "React",
    "Java",
    "Spring",
    "TypeScript",
    "portfolio",
  ],
  authors: [{ name: "Phuong LE" }],
  openGraph: {
    title: "Phuong LE | Full-Stack Developer",
    description:
      "Portfolio of Phuong LE, a full-stack developer specializing in React, Java/Spring, and cloud-native applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <BackgroundEffect />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Phuong LE | Full-Stack Developer",
    template: "%s | Phuong LE",
  },
  description:
    "Portfolio of Phuong LE, a full-stack developer specializing in React, Java/Spring, and cloud-native applications.",
  keywords: ["full-stack developer", "React", "Java", "Spring", "TypeScript", "portfolio"],
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
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

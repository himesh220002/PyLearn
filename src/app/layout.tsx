import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import { ProgressProvider } from "@/context/ProgressContext";
import { getAllTopics } from "@/data/topics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Python Learning Platform",
  description: "Learn Python interactively with visualizations and real-time feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}
      >
        <ProgressProvider totalTopics={getAllTopics().length}>
          <Navbar />
          <main className="min-h-screen relative overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-600 dark:selection:bg-indigo-500/30 dark:selection:text-indigo-300">
            {children}
          </main>
        </ProgressProvider>
      </body>
    </html>
  );
}

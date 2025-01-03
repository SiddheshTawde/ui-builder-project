import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import "@siddheshtawde/drag-and-drop/dist/index.css";
import "@siddheshtawde/ui/dist/index.css";
import { Toaster } from "@root/components/ui/toaster";
import Header from "@root/components/core/header.core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UI Builder",
  description: "Design Interfaces with a Simple Drag-and-Drop Experience",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

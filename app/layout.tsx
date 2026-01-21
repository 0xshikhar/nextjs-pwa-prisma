import "./globals.css";
import Providers from "./providers";
import type { Metadata, Viewport } from "next";
import Header from "@/components/header";
import PwaRegister from "@/components/pwa-register";

export const metadata: Metadata = {
  title: "Superblog",
  description: "A blog app using Next.js and Prisma",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <PwaRegister />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import Footer from "@/components/ui/footer";
import GoogleAnalytics from "@/components/ui/googleAnalytics";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: "Steven Gates"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <GoogleAnalytics />
        </div>
      </body>
    </html>
  );
}
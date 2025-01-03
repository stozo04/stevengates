import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import Footer from "@/components/ui/footer";
import GoogleAnalytics from "@/components/ui/googleAnalytics";
import { ThemeProvider } from "next-themes";

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
       <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Footer />
          <GoogleAnalytics />
        </body>
    </html>
  );
}
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from 'next/script';
import "./globals.css";
import Footer from "@/components/custom/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Steven Gates",
  description: "Designed and Developed by Steven Gates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      
        {/* <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
          strategy="beforeInteractive"
          type="module"
        /> */}
      
        {children}
        <Footer/>
      </body>
    </html>
  );
}
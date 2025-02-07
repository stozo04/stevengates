"use client";
import { Jost } from "next/font/google";
import "./globals.css";
import "@/../public/scss/style.scss";
import Bootstrap from "@/components/Bootstrap/Bootstrap";
import Provider from "@/components/DarkMode/Provider/Provider";
import { Suspense } from "react";
import Loading from "./loading";
import ColorSwitcher from "@/components/Shared/ColorPalettes/ColorSwitcher";
import GoogleAnalytics from "@/components/Shared/Google/googleAnalytics";
import { Analytics } from "@vercel/analytics/react"

const jost = Jost({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Steven Gates</title>
      </head>
      <body className={jost.className}>
        <Provider>
          <Bootstrap>
            <Suspense fallback={<Loading />}>
              <div>{children}</div>
              <Analytics />
              <ColorSwitcher />
            </Suspense>
          </Bootstrap>
          <GoogleAnalytics />
        </Provider>
      </body>
    </html>
  );
}

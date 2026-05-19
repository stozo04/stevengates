import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const SITE_URL = "https://stevengates.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Steven Gates — Senior Software Engineer & AI Systems Builder",
    template: "%s — Steven Gates",
  },
  description:
    "Steven Gates is a Senior Software Engineer in Dallas, TX building context-aware autonomous AI systems on Claude Code, plus production cloud platforms on AWS, Azure, and .NET.",
  keywords: [
    "Steven Gates",
    "Senior Software Engineer",
    "AI Systems",
    "Claude Code",
    "Next.js",
    "Dallas",
  ],
  authors: [{ name: "Steven Gates", url: SITE_URL }],
  creator: "Steven Gates",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "stevengates.io",
    title: "Steven Gates — Senior Software Engineer & AI Systems Builder",
    description:
      "Context-aware autonomous AI systems, production cloud platforms, and the occasional Tesla rant.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@sgates2011",
    title: "Steven Gates — Senior Software Engineer & AI Systems Builder",
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SiteNav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

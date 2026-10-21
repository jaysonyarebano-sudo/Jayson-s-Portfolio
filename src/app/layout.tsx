import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { links, profile } from "@/data/portfolio";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const title = `${profile.name} | ${profile.title}`;
const description =
  "Cold email, lead generation, deliverability, and appointment setting for U.S. B2B businesses. Recorded campaign results, case studies and the outbound process behind them.";

export const metadata: Metadata = {
  // Only set absolute URLs and a canonical once a real production domain is configured.
  ...(links.siteUrl
    ? { metadataBase: new URL(links.siteUrl), alternates: { canonical: "/" } }
    : {}),
  title,
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1628",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

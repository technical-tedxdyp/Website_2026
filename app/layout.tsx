import type { Metadata } from "next";
import { Space_Grotesk, VT323 } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TEDx DYP Akurdi | Mosaic",
    template: "%s | TEDx DYP Akurdi",
  },
  description:
    "TEDx DYP Akurdi brings together ideas, stories, and people to create meaningful connections. Discover speakers, sessions, tickets, and event updates.",
  keywords: [
    "TEDx DYP Akurdi",
    "TEDX DY Patil Akurdi",
    "TEDx DYP AKURDI",
    "TEDx DYP Akurdi 2026",
    "TEDx Pune",
    "TEDx Akurdi",
    "DYP Akurdi TEDx",
    "TEDx event Pune",
  ],
  authors: [{ name: "TEDx DYP Akurdi" }],
  creator: "TEDx DYP Akurdi",
  publisher: "TEDx DYP Akurdi",
  metadataBase: new URL("https://tedxdypakurdi.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TEDx DYP Akurdi | Mosaic",
    description:
      "Every mind is a tile. Together they form the mosaic.",
    url: "https://tedxdypakurdi.in",
    siteName: "TEDx DYP Akurdi",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TEDx DYP Akurdi - Mosaic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDx DYP Akurdi | Mosaic",
    description:
      "Every mind is a tile. Together they form the mosaic.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${vt323.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: "Editorial Hero Prototype",
  description:
    "A magazine-style hero prototype featuring an asymmetric layout with two overlapping images of different sizes and a smooth curtain-reveal animation.",
  verification: {
    google: googleSiteVerification,
  },
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProduction = process.env.NODE_ENV === "production";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
      {isProduction && gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}

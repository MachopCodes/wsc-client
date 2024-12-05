import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "W&S Craft Connections",
  description: "Explore premium wines and spirits sourced globally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Global Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="W&S Craft Connections" />
        <meta name="keywords" content="wine, spirits, premium drinks" />
        <meta
          name="description"
          content="Your connection for wine and spirits."
        />
      </head>
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content="W&S Craft Connections" />
      <meta
        property="og:description"
        content="Your connection for wine and spirits."
      />
      <meta property="og:image" content="/logo.png" />
      <meta property="og:url" content="https://wscraftconnections.com" />
      <meta property="og:type" content="website" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

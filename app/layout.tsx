import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'R2 File Uploader',
  description:
    'Upload files to Cloudflare R2 using the S3-compatible API with a modern drag-and-drop interface.',
  icons: {
    icon: '/cloudflare.svg',
    // icon: 'https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/external-cloudflare-provides-content-delivery-network-services-ddos-mitigation-logo-shadow-tal-revivo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

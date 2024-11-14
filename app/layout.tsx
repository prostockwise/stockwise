import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer";
import { getURL } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const url = getURL();
  return {
    title: "Stockwise",
    description:
      "Next-Generation Market Analysis Partner. Get real-time news updates, advanced stock screening, portfolio building tools, and custom alerts.",
    referrer: "origin-when-cross-origin",
    authors: [{ name: "Hantian Pang", url: "https://github.com/ppaanngggg" }],
    creator: "Hantian Pang",
    publisher: "Hantian Pang",
    robots: "follow, index",
    icons: { icon: "/favicon.ico" },
    metadataBase: new URL(url),
    alternates: {
      canonical: url,
    },
    verification: {
      google: "Ai05ftwW2pwa4nA_B_BKPHbAex6x9dNU9RRLoNCOkpU",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-5MKQS5YTEK" />
    </html>
  );
}

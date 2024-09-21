import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const url = getURL();
  return {
    title: "Stockwise | Next-Generation Market Analysis Partner",
    description:
      "Stockwise: Your AI-powered market analysis partner. Get real-time news updates, advanced stock screening, portfolio building tools, and custom alerts. Make smarter investment decisions with our next-generation platform.",
    referrer: "origin-when-cross-origin",
    authors: [{ name: "Hantian Pang", url: "https://github.com/ppaanngggg" }],
    creator: "Hantian Pang",
    publisher: "Hantian Pang",
    robots: "follow, index",
    icons: { icon: "/favicon.ico" },
    metadataBase: new URL(url),
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
    </html>
  );
}

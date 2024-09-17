import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stockwise | Next-Generation Market Analysis Partner",
  description:
    "Stockwise: Your AI-powered market analysis partner. Our platform blends advanced AI with user-friendly interfaces for real-time updates, in-depth analysis, and accurate forecasts. From novice to expert, make informed decisions effortlessly.",
};

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

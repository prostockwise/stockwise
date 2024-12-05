import { Metadata } from "next";
import { getURL } from "@/lib/utils";
import { CommonNavbar } from "@/components/commonnavbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Newspaper, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const url = getURL("/apis");
  return {
    title: "APIs | Stockwise",
    description:
      "Explorer Stockwise AI-powered APIs: Stock News Forecast, Intelligent Stock Screener, and More.",
    alternates: {
      canonical: url,
    },
  };
}

export default async function ApisPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <CommonNavbar location="APIs" />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Stockwise APIs
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Explore our AI-powered APIs for seamless integration with your
                  applications.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center">
              Our API Offerings
            </h2>
            <div className="mt-8 grid gap-10 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-6 w-6" />
                    News Forecast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>🔗 Simply provide a URL</li>
                    <li>
                      🤖 AI-driven pipeline extracts and summarizes content
                    </li>
                    <li>🔍 Infers related stock or ETF symbols</li>
                    <li>🧠 Generates prediction reasoning</li>
                    <li>📊 Delivers comprehensive analysis</li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild>
                    <Link
                      href="https://rapidapi.com/prostockwise/api/stockwise-news-forecast"
                      target="_blank"
                      rel="noopener noreferrer"
                      prefetch={false}
                    >
                      RapidAPI
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/apis/news-forecast">API Details</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-6 w-6" />
                    Stock Screener
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>💬 Use natural language for your requirements</li>
                    <li>🤖 AI-powered screener converts to complex queries</li>
                    <li>🔍 No need for complicated forms</li>
                    <li>📊 Searches our extensive database</li>
                    <li>💼 Finds matching stocks or ETFs</li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button disabled={true}>Coming Soon!</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Mock data for news articles
const mockNews = [
  {
    id: 1,
    title: "Tech Stocks Surge on AI Advancements",
    excerpt:
      "Major tech companies see significant gains as artificial intelligence breakthroughs drive market optimism...",
    date: "2023-06-15",
  },
  {
    id: 2,
    title: "Federal Reserve Holds Interest Rates Steady",
    excerpt:
      "In a widely anticipated move, the Federal Reserve has decided to maintain current interest rates, citing economic stability...",
    date: "2023-06-15",
  },
  {
    id: 3,
    title: "Oil Prices Stabilize Amid Global Supply Concerns",
    excerpt:
      "Global oil markets show signs of stability after recent volatility, as major producers pledge to address supply issues...",
    date: "2023-06-15",
  },
  {
    id: 4,
    title: "Emerging Markets Report: Opportunities in Southeast Asia",
    excerpt:
      "Analysis of growth opportunities in developing economies highlights potential in Southeast Asian markets...",
    date: "2023-06-15",
  },
  {
    id: 5,
    title: "Cryptocurrency Market Faces Regulatory Challenges",
    excerpt:
      "The cryptocurrency industry braces for potential regulatory changes as governments worldwide consider stricter oversight...",
    date: "2023-06-15",
  },
];

export default function NewsExplorer() {
  const [currentDate, setCurrentDate] = useState(new Date("2023-06-15"));

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/news">
          <Calendar className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">Stockwise News</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/"
          >
            Home
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Market News Explorer
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Stay informed with the latest market news and analysis.
            </p>
          </div>
          <div className="flex justify-between items-center mb-8">
            <Button
              onClick={() => navigateDate(-1)}
              variant="outline"
              size="icon"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous Day</span>
            </Button>
            <h2 className="text-2xl font-semibold">
              {formatDate(currentDate)}
            </h2>
            <Button
              onClick={() => navigateDate(1)}
              variant="outline"
              size="icon"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next Day</span>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockNews.map((article) => (
              <Card key={article.id}>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>{article.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{article.excerpt}</p>
                  <Button className="mt-4" variant="link">
                    Read more
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Stockwise. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

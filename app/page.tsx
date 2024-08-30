import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bell, ChartBar, Filter } from "lucide-react";
import Wishlist from "@/components/wishlist";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <ChartBar className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">Stockwise</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/features"
          >
            Features
          </Link>
          {/*<Link*/}
          {/*  className="text-sm font-medium hover:underline underline-offset-4"*/}
          {/*  href="#"*/}
          {/*>*/}
          {/*  Pricing*/}
          {/*</Link>*/}
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/contact"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {"Welcome to Stockwise"}
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  {
                    "Your intelligent companion for stock market analysis and portfolio management."
                  }
                </p>
              </div>
              <div className="space-x-4">
                {/*<Button>Get Started</Button>*/}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
              Latest Market News
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Tech Stocks Surge</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Major tech companies see significant gains as market
                    rebounds...
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Oil Prices Stabilize</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Global oil markets show signs of stability after recent
                    volatility...
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Emerging Markets Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Analysis of growth opportunities in developing economies...
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center">
              <Link href="/news" prefetch={false}>
                <Button size="lg" className="font-semibold">
                  Explore More News
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
              Our Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Filter className="h-8 w-8 mb-2" />
                  <CardTitle>{"Advanced Stock Screening"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    {
                      "Use natural language queries to find the perfect stocks for your portfolio."
                    }
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <ChartBar className="h-8 w-8 mb-2" />
                  <CardTitle>{"Portfolio Builder & Backtester"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    {"Build and backtest your investment strategies with ease."}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Bell className="h-8 w-8 mb-2" />
                  <CardTitle>{"Custom Alerts"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    {
                      "Set alerts based on specific signals or conditions for your watched stocks."
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {"Join Our Wishlist"}
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  {
                    "Be the first to know when we launch new features. Sign up for our newsletter."
                  }
                </p>
              </div>
              <Wishlist />
            </div>
          </div>
        </section>
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

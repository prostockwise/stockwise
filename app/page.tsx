import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bell, ChartBar, Filter } from "lucide-react";
import Wishlist from "@/components/wishlist";
import { getURL, todayDate } from "@/lib/utils";
import { Tables } from "@/types_db";
import NewsCard from "@/components/newscard";
import { Analyze } from "@/lib/types";
import { CommonNavbar } from "@/components/commonnavbar";

export const revalidate = 60;

async function TitleAndDescription() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to Stockwise
            </h1>
            <p className="mx-auto max-w-[700px] md:text-xl">
              Next-Generation Market Analysis Partner
            </p>
          </div>
          <div className="space-x-4">{/*<Button>Get Started</Button>*/}</div>
        </div>
      </div>
    </section>
  );
}

async function News() {
  const resp = await fetch(getURL(`/api/news?limit=3`));
  const newsList: Tables<"news">[] = await resp.json();
  const today = todayDate();
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Latest Market News
        </h2>
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-8">
          {newsList.map((news, index) => (
            <NewsCard
              key={index}
              news={news}
              forecasts={
                news.analyze == null
                  ? []
                  : (news.analyze as any as Analyze).forecasts
              }
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Link href={`/news/${today}`}>
            <Button size="lg" className="font-semibold">
              Explore More News
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

async function Features() {
  return (
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
  );
}

async function WishList() {
  return (
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
  );
}

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <CommonNavbar location={null} />
      <main className="flex-1">
        <TitleAndDescription />
        <News />
        <Features />
        <WishList />
      </main>
    </div>
  );
}

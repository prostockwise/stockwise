import { getURL, todayDate } from "@/lib/utils";
import { Metadata } from "next";
import { CommonNavbar } from "@/components/commonnavbar";
import { fetchLatestNews } from "@/lib/news";
import NewsCard from "@/components/newscard";
import { Analyze } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tables } from "@/types_db";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const url = getURL("/news");
  return {
    title: "News | Stockwise",
    description:
      "Stay informed with the latest stock market news and insights. Explore real-time updates, expert analysis, and in-depth coverage of the financial markets.",
    alternates: {
      canonical: url,
    },
  };
}

function mapNewsToSymbol(newsList: Tables<"news">[]) {
  const symbolNewsMap = newsList.reduce(
    (acc, news) => {
      if (news.symbols) {
        news.symbols.forEach((symbol) => {
          if (!acc[symbol]) {
            acc[symbol] = [];
          }
          acc[symbol].push(news);
        });
      }
      return acc;
    },
    {} as Record<string, typeof newsList>,
  );
  return Object.entries(symbolNewsMap)
    .map(([symbol, news]) => ({ symbol, news }))
    .sort((a, b) => b.news.length - a.news.length)
    .slice(0, 20);
}

export default async function NewsPage() {
  const newsList = await fetchLatestNews(100);
  const today = todayDate();
  const symbolsWithNews = mapNewsToSymbol(newsList);
  return (
    <div className="flex flex-col min-h-screen">
      <CommonNavbar location="News" />
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">Stockwise News</h1>
            <p className="mt-2 mx-auto max-w-[700px] text-gray-500 dark:text-gray-400">
              Stay up-to-date with the latest stock market news and insights.
            </p>
          </div>
        </section>
        <section className="w-full py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-100 dark:bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="ml-2 text-2xl font-bold md:text-3xl">Latest News</h2>
            <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newsList.slice(0, 12).map((news, index) => (
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
            <div className="mt-4 md:mt-8 flex justify-center">
              <Button asChild>
                <Link href={`/news/${today}`} prefetch={false}>
                  Explore News by Calendar
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <Separator />
        <section className="w-full py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-100 dark:bg-background flex flex-col items-center justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="ml-2 text-2xl font-bold md:text-3xl">
              Top Symbols by News
            </h2>
            <div className="mt-4 md:mt-8 flex flex-col gap-4">
              {symbolsWithNews.map(({ symbol, news }) => (
                <Card key={symbol} className="hover:bg-gray-900">
                  <CardHeader className="flex flex-row justify-between items-center p-6">
                    <CardTitle>
                      <Link
                        href={`/news/symbol/${symbol}`}
                        className="hover:underline"
                      >
                        {symbol}
                      </Link>
                    </CardTitle>
                    <CardDescription className="flex gap-2">
                      <Button size="sm" asChild>
                        <Link
                          href={`/news/symbol/${symbol}`}
                          className="flex items-center gap-1"
                        >
                          Read More
                        </Link>
                      </Button>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {news.slice(0, 5).map((n) => (
                        <li key={n.id}>
                          <Link
                            className="underline"
                            href={`/news/${n.date}/${n.inner_url}`}
                            prefetch={false}
                          >
                            {n.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

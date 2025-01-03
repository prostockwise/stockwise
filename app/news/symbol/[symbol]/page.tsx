import { Home, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getURL } from "@/lib/utils";
import { Tables } from "@/types_db";
import NewsCard from "@/components/newscard";
import { Analyze } from "@/lib/types";
import { Metadata } from "next";
import { fetchSymbolNews } from "@/lib/news";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { symbol: string };
}): Promise<Metadata> {
  const url = getURL(`/news/symbol/${params.symbol}`);
  return {
    title: `${params.symbol} | Stockwise News`,
    description: `News about ${params.symbol}. Dive into real-time stock market updates with Stockwise News Explorer.`,
    alternates: {
      canonical: url,
    },
  };
}

async function Navbar({ symbol }: { symbol: string }) {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link
        className="flex items-center justify-center"
        href={`/news/symbol/${symbol}`}
        prefetch={false}
      >
        <TrendingUp className="h-6 w-6" />
        <span className="ml-2 text-lg font-bold">News - {symbol}</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          href="/"
          className="flex items-center hover:underline"
          prefetch={false}
        >
          <Home className="w-4 h-4 mr-1" />
          <span className="sr-only">Home</span>
          <span className="hidden sm:inline">Home</span>
        </Link>
      </nav>
    </header>
  );
}

function groupNewsByDate(newsList: Tables<"news">[]): {
  date: string;
  news: Tables<"news">[];
}[] {
  if (!newsList || newsList.length === 0) {
    return [];
  }
  let curDate = newsList[0].date;
  const newsByDate: { date: string; news: Tables<"news">[] }[] = [
    { date: curDate, news: [] },
  ];
  for (const news of newsList) {
    if (news.date !== curDate) {
      curDate = news.date;
      newsByDate.push({ date: curDate, news: [] });
    }
    newsByDate[newsByDate.length - 1].news.push(news);
  }
  return newsByDate;
}

export default async function SymbolNewsPage({
  params,
}: {
  params: { symbol: string };
}) {
  // fetch news data
  const newsList = await fetchSymbolNews(params.symbol, 100);
  // group news by date
  const newsByDate = groupNewsByDate(newsList);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar symbol={params.symbol} />
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {params.symbol} News Explorer
            </h1>
            <p className="mt-3 mx-auto max-w-[700px] text-gray-500 dark:text-gray-400">
              Stay informed with the latest market news and analysis about{" "}
              {params.symbol}
            </p>
            <Link
              href={`https://finance.yahoo.com/quote/${params.symbol}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              prefetch={false}
            >
              View {params.symbol} on Yahoo Finance →
            </Link>
          </div>
        </section>
        <div className="container px-4 md:px-6">
          {newsByDate.map((dateAndNews) => (
            <div
              key={dateAndNews.date}
              className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex flex-col items-center"
            >
              <h2 className="mx-auto font-semibold tracking-tighter text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {dateAndNews.date}
              </h2>
              <hr className="my-2 md:my-3 lg:my-4 w-full" />
              <div className="grid gap-6 md:grid-cols-2">
                {dateAndNews.news.map((news) => (
                  <NewsCard
                    key={news.id}
                    news={news}
                    forecasts={
                      news.analyze == null
                        ? []
                        : (news.analyze as any as Analyze).forecasts
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

import {
  AlertTriangle,
  BarChart2,
  CalendarDays,
  Clock,
  ExternalLink,
  Home,
  Newspaper,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getURL, todayDate, turnISODateToNature } from "@/lib/utils";
import { Tables } from "@/types_db";
import { Analyze, RelativeNews } from "@/lib/types";
import SentimentIcon from "@/components/sentimenticon";
import NewsCard from "@/components/newscard";
import { Metadata } from "next";
import { ShareTwitterButton } from "@/components/sharetwitterbutton";
import { fetchNewsDetail } from "@/lib/news";

export const revalidate = 86400; // 1 day

function encodeOgParams(
  title: string,
  publishedAt: string,
  forecasts: {
    symbol: string;
    direction: "positive" | "neutral" | "negative";
  }[],
) {
  const jsonString = JSON.stringify(forecasts);
  return `?title=${encodeURIComponent(title)}
  &publishedAt=${encodeURIComponent(publishedAt)}
  &forecasts=${encodeURIComponent(jsonString)}`;
}

function formatDescriptionWithForecasts(
  description: string,
  forecasts: {
    symbol: string;
    direction: "positive" | "neutral" | "negative";
  }[],
) {
  if (description.length === 0 || forecasts.length === 0) {
    return description;
  }

  const directionChar = (
    direction: "positive" | "neutral" | "negative",
  ): string => {
    switch (direction) {
      case "positive":
        return "▲";
      case "negative":
        return "▼";
      case "neutral":
        return "■";
    }
  };

  const forecastString = forecasts
    .map((f) => `${directionChar(f.direction)}${f.symbol}`)
    .join("  ");

  return `${forecastString} | ${description}`;
}

export async function generateMetadata({
  params,
}: {
  params: { date: string; inner_url: string };
}): Promise<Metadata> {
  // fetch news data and parse it
  const news: Tables<"news"> = await fetchNewsDetail(params.inner_url);
  const url = getURL(`/news/${params.date}/${params.inner_url}`);
  const title = `${news.title} | Stockwise News`;
  const description = news.description ? news.description : "";
  const analyze: Analyze | null =
    news.analyze != null ? (news.analyze as any as Analyze) : null;
  const forecasts: {
    symbol: string;
    direction: "positive" | "neutral" | "negative";
  }[] =
    analyze?.forecasts?.map((f) => ({
      symbol: f.symbol,
      direction: f.direction,
    })) ?? [];
  const publishedAt: string = news.published_at
    ? turnISODateToNature(news.published_at)
    : "";
  // build og image url
  const ogImage = getURL(
    "/og" + encodeOgParams(news.title, publishedAt, forecasts),
  );
  return {
    title: title,
    description: formatDescriptionWithForecasts(description, forecasts),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      title: title,
      description: description,
      emails: "prostockwise@gmail.com",
      siteName: "Stockwise",
      images: [ogImage],
      url: url,
    },
    twitter: {
      card: "summary_large_image",
      site: "@stockwiswpro",
      creator: "@HantianPang",
    },
  };
}

async function Navbar({ date, symbols }: { date: string; symbols: string[] }) {
  const today = todayDate();
  return (
    <header className="flex flex-col border-b">
      <nav className="h-14 px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Newspaper className="w-6 h-6" />
          <span className="text-lg font-bold">News</span>
        </div>
        <ul className="flex space-x-4 items-center">
          <Link
            href={`/news/${today}`}
            className="flex items-center hover:underline"
            prefetch={false}
          >
            <Clock className="w-4 h-4 mr-1" />
            <span className="sr-only">Latest News</span>
            <span className="hidden sm:inline">Latest News</span>
          </Link>
          <Link
            href={`/news/${date}`}
            className="flex items-center hover:underline"
            prefetch={false}
          >
            <CalendarDays className="w-4 h-4 mr-1" />
            <span className="sr-only">{date}</span>
            <span className="hidden sm:inline">{date}</span>
          </Link>
          <Link
            href="/"
            className="flex items-center hover:underline"
            prefetch={false}
          >
            <Home className="w-4 h-4 mr-1" />
            <span className="sr-only">Home</span>
            <span className="hidden sm:inline">Home</span>
          </Link>
        </ul>
      </nav>
      {symbols.length > 0 && (
        <nav className="bg-gray-800 py-1 px-4 lg:px-6 flex space-x-4 justify-end">
          <span className="text-sm font-bold">More About:</span>
          {symbols.map((symbol) => (
            <Link
              key={symbol}
              href={`/news/symbol/${symbol}`}
              className="text-sm hover:underline"
              prefetch={false}
            >
              {symbol}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export default async function DetailNewsPage({
  params,
}: {
  params: { date: string; inner_url: string };
}) {
  // fetch news
  const news: Tables<"news"> = await fetchNewsDetail(params.inner_url);
  const analyze: Analyze | null =
    news.analyze != null ? (news.analyze as any as Analyze) : null;
  const relatedNewsList: RelativeNews[] | null =
    news.relative_news != null
      ? (news.relative_news as any as RelativeNews[])
      : null;
  // symbol list
  const symbols: string[] = analyze?.forecasts?.map((f) => f.symbol) ?? [];

  // tweet = title + $symbol in forecast + \n\n + url
  const url = getURL(`/news/${params.date}/${params.inner_url}`);
  let tweet = news.title;
  if (analyze && analyze.forecasts) {
    tweet += ` ${analyze.forecasts.map((f) => "$" + `${f.symbol}`).join(" ")}`;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar date={news.date} symbols={symbols} />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <article className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {news.title}
            </h1>
            {news.published_at && (
              <p className="text-xl text-gray-500 mb-4">
                Published On {turnISODateToNature(news.published_at)}
              </p>
            )}
            {analyze && <p className="text-xl mb-6">{analyze.summary}</p>}

            <div className="flex items-center justify-between">
              <Link
                href={news.url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:underline"
              >
                Read full article
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
              <ShareTwitterButton text={tweet} url={url} />
            </div>
          </article>

          <section className="max-w-3xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6">Stock Forecasts</h2>
            <Alert variant="default" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                AI prediction results, not representative of any investment
                advice.
              </AlertDescription>
            </Alert>
            <div className="grid gap-6 md:grid-cols-2">
              {analyze &&
                analyze.forecasts.map((forecast, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <Link
                          href={`/news/symbol/${forecast.symbol}`}
                          className="underline"
                          prefetch={false}
                        >
                          {forecast.symbol}
                        </Link>
                        {SentimentIcon(forecast.direction)}
                      </CardTitle>
                      <CardDescription className="flex items-center justify-between">
                        <span>
                          {forecast.direction.charAt(0).toUpperCase() +
                            forecast.direction.slice(1)}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{forecast.analyze}</p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href={`https://finance.yahoo.com/quote/${forecast.symbol}`}
                        className="text-sm text-blue-500 hover:underline flex items-center justify-end"
                        target="_blank"
                        rel="noopener noreferrer"
                        prefetch={false}
                      >
                        View {symbols} on Yahoo Finance ↗
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </section>

          <section className="max-w-3xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6">Related News</h2>
            <div className="space-y-6">
              {relatedNewsList &&
                relatedNewsList.map((relatedNews, index) => (
                  <NewsCard
                    key={index}
                    news={relatedNews}
                    forecasts={relatedNews.forecasts}
                  />
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

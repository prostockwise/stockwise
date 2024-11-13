import {
  AlertTriangle,
  BarChart2,
  ChevronLeft,
  ExternalLink,
  Twitter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getURL, turnISODateToNature } from "@/lib/utils";
import { Tables } from "@/types_db";
import { Analyze, RelativeNews } from "@/lib/types";
import SentimentIcon from "@/components/sentimenticon";
import NewsCard from "@/components/newscard";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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
  params: { inner_url: string };
}): Promise<Metadata> {
  // fetch news data and parse it
  const resp = await fetch(getURL(`/api/news/detail/${params.inner_url}`));
  const news: Tables<"news"> = await resp.json();
  const url = getURL(`/news/detail/${params.inner_url}`);
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

async function Navbar({
  date,
  refer,
}: {
  date: string;
  refer: string | undefined;
}) {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link
        className="flex items-center justify-center"
        href={refer ? `/news/${refer}` : `/news/${date}`}
        prefetch={false}
      >
        <ChevronLeft className="h-6 w-6 mr-2" />
        <span className="text-lg font-bold">Back to News</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/"
          prefetch={false}
        >
          Home
        </Link>
      </nav>
    </header>
  );
}

export default async function DetailNewsPage({
  params,
  searchParams,
}: {
  params: { inner_url: string };
  searchParams: { refer: string | undefined };
}) {
  // fetch news
  const resp = await fetch(getURL(`/api/news/detail/${params.inner_url}`));
  if (!resp.ok) {
    redirect("/");
  }
  const news: Tables<"news"> = await resp.json();
  const analyze: Analyze | null =
    news.analyze != null ? (news.analyze as any as Analyze) : null;
  const relatedNewsList: RelativeNews[] | null =
    news.relative_news != null
      ? (news.relative_news as any as RelativeNews[])
      : null;

  // tweet = title + $symbol in forecast + \n\n + url
  const url = getURL(`/news/detail/${news.inner_url}`);
  let tweet = news.title;
  if (analyze && analyze.forecasts) {
    tweet += ` ${analyze.forecasts.map((f) => "$" + `${f.symbol}`).join(" ")}`;
  }
  tweet += `\n\n${url}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar date={news.date} refer={searchParams.refer} />
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
              <Link
                href={`https://x.com/intent/post?text=${encodeURIComponent(tweet)}`}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center text-blue-400"
              >
                <Twitter />
              </Link>
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
                        <div className="flex items-center space-x-3">
                          <Link
                            href={`/news/symbol/${forecast.symbol}`}
                            className="underline"
                            prefetch={false}
                          >
                            {forecast.symbol}
                          </Link>
                          {/*link to tradingview*/}
                          <Link
                            href={`https://www.tradingview.com/chart/?symbol=${forecast.symbol}`}
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600 transition-colors"
                          >
                            <BarChart2 className="h-4 w-4" />
                            <span className="sr-only">
                              View {forecast.symbol} chart on TradingView
                            </span>
                          </Link>
                        </div>
                        {SentimentIcon(forecast.direction)}
                      </CardTitle>
                      <CardDescription>
                        {forecast.direction.charAt(0).toUpperCase() +
                          forecast.direction.slice(1)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{forecast.analyze}</p>
                    </CardContent>
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
                    refer={searchParams.refer}
                  />
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

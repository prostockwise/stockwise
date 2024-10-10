import {
  AlertTriangle,
  BarChart2,
  ChevronLeft,
  ExternalLink,
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

export async function generateMetadata({
  params,
}: {
  params: { inner_url: string };
}): Promise<Metadata> {
  // fetch news
  const resp = await fetch(getURL(`/api/news/detail/${params.inner_url}`));
  const news: Tables<"news"> = await resp.json();
  const url = getURL(`/news/detail/${params.inner_url}`);
  return {
    title: `${news.title} | Stockwise News`,
    description: news.description,
    alternates: {
      canonical: url,
    },
  };
}

async function Navbar({ date }: { date: string }) {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link
        className="flex items-center justify-center"
        href={`/news/${date}`}
        prefetch={false}
      >
        <ChevronLeft className="h-6 w-6 mr-2" />
        <span className="text-lg font-bold">Back to News</span>
      </Link>
    </header>
  );
}

export default async function NewsDetailPage({
  params,
}: {
  params: { inner_url: string };
}) {
  // fetch news
  const resp = await fetch(getURL(`/api/news/detail/${params.inner_url}`));
  const news: Tables<"news"> = await resp.json();
  const analyze: Analyze | null =
    news.analyze != null ? (news.analyze as any as Analyze) : null;
  const relatedNewsList: RelativeNews[] | null =
    news.relative_news != null
      ? (news.relative_news as any as RelativeNews[])
      : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar date={news.date} />
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

            <Link
              href={news.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              Read full article
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
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
                        <div className="flex items-center space-x-2">
                          <span>{forecast.symbol}</span>
                          <Link
                            href={`https://www.tradingview.com/chart/?symbol=${forecast.symbol}`}
                            target="_blank"
                            rel="noopener noreferrer"
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
                  />
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronLeft,
  ExternalLink,
  MinusCircle,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";

async function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/news">
        <ChevronLeft className="h-6 w-6 mr-2" />
        <span className="text-lg font-bold">Back to News</span>
      </Link>
    </header>
  );
}

export default async function NewsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const newsArticle = {
    title:
      "Tech Giants Unveil Groundbreaking AI Innovations at Annual Conference",
    summary:
      "Leading tech companies showcased their latest artificial intelligence breakthroughs at the World AI Summit, potentially reshaping various industries and boosting market optimism.",
    originalLink: "https://example.com/tech-giants-ai-innovations",
    date: "2023-06-15",
    forecasts: [
      {
        symbol: "GOOGL",
        sentiment: "positive",
        reasoning:
          "Google's new language model demonstrates significant improvements in natural language processing, potentially leading to enhanced products and services.",
      },
      {
        symbol: "MSFT",
        sentiment: "positive",
        reasoning:
          "Microsoft's advancements in AI-driven cloud computing solutions could strengthen its position in the enterprise market.",
      },
      {
        symbol: "NVDA",
        sentiment: "positive",
        reasoning:
          "NVIDIA's new AI chips show remarkable performance gains, likely to drive demand in both consumer and enterprise markets.",
      },
      {
        symbol: "IBM",
        sentiment: "neutral",
        reasoning:
          "While IBM presented interesting AI research, immediate product impact remains unclear.",
      },
    ],
    relatedNews: [
      {
        id: 1,
        title: "AI Startups Attract Record Venture Capital Investment",
        date: "2023-06-14",
        symbols: ["GOOGL", "MSFT", "NVDA"],
      },
      {
        id: 2,
        title: "Tech Sector Leads Stock Market Rally Amid AI Optimism",
        date: "2023-06-13",
        symbols: ["AAPL", "GOOGL", "MSFT", "NVDA"],
      },
      {
        id: 3,
        title:
          "Global Chip Shortage Eases as Semiconductor Production Ramps Up",
        date: "2023-06-12",
        symbols: ["NVDA", "AMD", "INTC"],
      },
    ],
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ArrowUpCircle className="h-5 w-5 text-green-500" />;
      case "negative":
        return <ArrowDownCircle className="h-5 w-5 text-red-500" />;
      default:
        return <MinusCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <article className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {newsArticle.title}
            </h1>
            <p className="text-xl text-gray-500 mb-4">{newsArticle.date}</p>
            <p className="text-xl mb-6">{newsArticle.summary}</p>
            <Link
              href={newsArticle.originalLink}
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
              {newsArticle.forecasts.map((forecast, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{forecast.symbol}</span>
                      {getSentimentIcon(forecast.sentiment)}
                    </CardTitle>
                    <CardDescription>
                      {forecast.sentiment.charAt(0).toUpperCase() +
                        forecast.sentiment.slice(1)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{forecast.reasoning}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="max-w-3xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6">Related News</h2>
            <div className="space-y-6">
              {newsArticle.relatedNews.map((news) => (
                <Card key={news.id}>
                  <CardHeader>
                    <CardTitle>{news.title}</CardTitle>
                    <CardDescription>{news.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {news.symbols.map((symbol) => (
                        <Badge key={symbol} variant="secondary">
                          {symbol}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MinusCircle,
} from "lucide-react";
import Link from "next/link";
import {
  Analyze,
  getURL,
  nextDate,
  prevDate,
  todayDate,
  turnISODateToNature,
} from "@/lib/utils";
import { Tables } from "@/types_db";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";

async function Navbar() {
  return (
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
  );
}

async function PreviousDayButton({ date }: { date: string }) {
  const today = todayDate();
  return (
    <>
      {date >= today ? (
        <Button disabled={true}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Day</span>
        </Button>
      ) : (
        <Link href={`/news/${nextDate(date)}`}>
          <Button>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous Day</span>
          </Button>
        </Link>
      )}
    </>
  );
}

async function NextDayButton({ date }: { date: string }) {
  const endDate = "2024-08-25";
  if (date < endDate) {
    redirect(`/news/${endDate}`);
  }
  return (
    <>
      {date <= endDate ? (
        <Button disabled={true}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Day</span>
        </Button>
      ) : (
        <Link href={`/news/${prevDate(date)}`}>
          <Button disabled={date <= "2024-08-25"}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Day</span>
          </Button>
        </Link>
      )}
    </>
  );
}

const getSymbolSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return <ArrowUpCircle className="h-4 w-4 text-green-500" />;
    case "negative":
      return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
    default:
      return <MinusCircle className="h-4 w-4 text-gray-500" />;
  }
};

export default async function NewsPage({
  params,
}: {
  params: { date: string };
}) {
  // fetch news data
  const resp = await fetch(getURL(`/api/news/${params.date}`));
  const news: Tables<"news">[] = await resp.json();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
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
            <PreviousDayButton date={params.date} />
            <h2 className="text-2xl font-semibold">{params.date}</h2>
            <NextDayButton date={params.date} />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((article) => (
              <Card
                key={article.id}
                className="bg-background hover:bg-gray-900 flex flex-col"
              >
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription>
                    {article.published_at != null
                      ? turnISODateToNature(article.published_at)
                      : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="line-clamp-6">{article.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-end">
                  <div className="flex flex-wrap gap-2">
                    {(article.analyze as any as Analyze).has_article &&
                      (article.analyze as any as Analyze).forecasts.map(
                        (forecast, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {forecast.symbol}
                            {getSymbolSentimentIcon(forecast.direction)}
                          </Badge>
                        ),
                      )}
                  </div>
                  <Link href={`/news/detail/${article.id}`}>
                    <Button variant="link">Read more</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

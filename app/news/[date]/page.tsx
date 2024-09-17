import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getURL, todayDate } from "@/lib/utils";

export default async function NewsPage({
  params,
}: {
  params: { date: string };
}) {
  // today
  const today = todayDate();
  // fetch news data
  const resp = await fetch(getURL(`/api/news/${params.date}`));
  const news: {
    id: string;
    url: string;
    created_at: string;
    published_at: string | null;
    title: string;
    description: string | null;
    analyze: object | null;
  }[] = await resp.json();

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
            <Button disabled={today == params.date}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous Day</span>
            </Button>
            <h2 className="text-2xl font-semibold">{params.date}</h2>
            <Button>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next Day</span>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((article) => (
              <Card
                key={article.id}
                className="bg-background hover:bg-gray-900"
              >
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription>
                    {article.published_at != null ? article.published_at : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-6">{article.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="link">Read more</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

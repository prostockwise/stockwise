import { Button } from "@/components/ui/button";

import { Calendar, ChevronLeft, ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { getURL, nextDate, prevDate, todayDate } from "@/lib/utils";
import { redirect } from "next/navigation";
import NewsCard from "@/components/newscard";
import { Analyze } from "@/lib/types";
import { Metadata } from "next";
import { fetchDateNews } from "@/lib/news";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { date: string };
}): Promise<Metadata> {
  const url = getURL(`/news/${params.date}`);
  return {
    title: `${params.date} | Stockwise News`,
    description: `Stock News on ${params.date}. Dive into real-time stock market updates with Stockwise News Explorer.`,
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
        <Calendar className="h-6 w-6" />
        <span className="ml-2 text-lg font-bold line-clamp-1">
          News - {date}
        </span>
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

export default async function DateNewsPage({
  params,
}: {
  params: { date: string };
}) {
  const newsList = await fetchDateNews(params.date);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar date={params.date} />
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
            {newsList.map((news) => (
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
      </main>
    </div>
  );
}
